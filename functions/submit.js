// Cloudflare Pages Function — handles form submissions
// Sends lead via Composio Gmail + Google Sheets backup

const MCP_URL = 'https://backend.composio.dev/tool_router/trs_E5EkB5-prW6w/mcp';
const SHEET_ID = '1HZD4yIk3xq-2S9DdR4gVPcxUbBXp-KfgT5vmK-QS2_M';
const GMAIL_TO = 'scalingsmb@gmail.com';

async function composeLeadPayload(data) {
  const { name, email, whatsapp, department, message } = data;
  const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Macau' });
  const timestamp = new Date().toISOString();

  const emailHtml = [
    `<div style="font-family: system-ui, sans-serif; max-width: 600px;">`,
    `  <h2 style="color: #2563eb;">📥 New Lead — ${department}</h2>`,
    `  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">`,
    `    <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 110px;">Name</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>${name}</strong></td></tr>`,
    `    <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Email</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td></tr>`,
    ...(whatsapp ? [`    <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">WhatsApp</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${whatsapp}</td></tr>`] : []),
    `    <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Department</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>${department}</strong></td></tr>`,
    `    <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Message</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${message.replace(/\n/g, '<br>')}</td></tr>`,
    `  </table>`,
    `  <p style="color: #9ca3af; font-size: 12px;">Received: ${now} (Macau) · scalingsmb.com</p>`,
    `</div>`,
  ].join('\n');

  return {
    tools: [
      {
        tool_slug: 'GMAIL_SEND_EMAIL',
        arguments: {
          recipient_email: GMAIL_TO,
          subject: `📥 New Lead: ${name} — ${department}`,
          body: emailHtml,
          is_html: true,
        },
      },
      {
        tool_slug: 'GOOGLESHEETS_SPREADSHEETS_VALUES_APPEND',
        arguments: {
          spreadsheetId: SHEET_ID,
          range: 'Sheet1!A:F',
          valueInputOption: 'USER_ENTERED',
          values: [[timestamp, name, email, whatsapp ? "'" + whatsapp : '', department, message]],
        },
      },
    ],
    sync_response_to_workbench: false,
    thought: 'Recording website lead submission via Gmail + Sheets',
  };
}

async function submitToComposio(apiKey, data) {
  const payload = await composeLeadPayload(data);

  const mcpPayload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'COMPOSIO_MULTI_EXECUTE_TOOL',
      arguments: payload,
    },
  };

  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(mcpPayload),
  });

  const text = await res.text();
  const lines = text.split('\n');
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      try {
        const parsed = JSON.parse(line.slice(6));
        if (parsed.result) {
          const content = parsed.result.content || [];
          for (const c of content) {
            if (c.type === 'text') {
              const d = JSON.parse(c.text);
              if (d?.data?.successful || d?.successful) return true;
            }
          }
        }
      } catch (_) { /* skip */ }
    }
  }
  return false;
}

export async function onRequest(context) {
  const COMPOSIO_API_KEY = context.env?.COMPOSIO_API_KEY;

  if (!COMPOSIO_API_KEY) {
    return new Response(JSON.stringify({ error: 'Server misconfiguration' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await context.request.json();
    const { name, email, department, message } = body;

    if (!name || !email || !department || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ok = await submitToComposio(COMPOSIO_API_KEY, body);

    if (ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Failed to record submission' }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
