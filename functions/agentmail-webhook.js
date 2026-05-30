// Cloudflare Pages Function — AgentMail webhook receiver
// Receives message.received events when someone emails scalingsmb@agentmail.to
//
// GET  /agentmail-webhook  → returns latest event (polling for Hermes)
// POST /agentmail-webhook  → receives webhook from AgentMail

let latestEvent = null; // in-memory, shared across requests in same isolate

export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Agentmail-Signature, X-Agentmail-Timestamp',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // GET — return latest event for polling
  if (context.request.method === 'GET') {
    return new Response(
      JSON.stringify({ ok: true, latestEvent }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // POST — receive webhook from AgentMail
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await context.request.json();

    // Only process message.received events
    if (body.type !== 'message.received') {
      return new Response(JSON.stringify({ ok: true, ignored: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const d = body.data || {};

    // Build a clean event summary
    const event = {
      received_at: new Date().toISOString(),
      type: body.type,
      inbox_id: d.inbox_id || 'unknown',
      message_id: d.message_id || 'unknown',
      thread_id: d.thread_id || 'unknown',
      from: d.from || {},
      to: d.to || [],
      subject: d.subject || '(no subject)',
      body: d.extracted_text || d.text || '',
      raw: body,
    };

    // Store in memory (shared across requests in same isolate)
    latestEvent = event;

    console.log(`AgentMail webhook: message from ${event.from.address} — "${event.subject}"`);

    // Forward to Hermes webhook if configured
    const hermesWebhookUrl = context.env?.HERMES_WEBHOOK_URL;
    if (hermesWebhookUrl) {
      try {
        await fetch(hermesWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
        });
      } catch (e) {
        console.error('Failed to forward to Hermes webhook:', e.message);
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('AgentMail webhook error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
