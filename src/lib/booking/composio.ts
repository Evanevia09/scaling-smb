/**
 * Composio REST client for Cloudflare Pages Functions.
 *
 * Calls the Composio action-execute endpoint directly (no MCP/SSE).
 * Used to create Calendar events with Google Meet and send confirmation emails
 * after a booking is submitted.
 *
 * Env vars set in Cloudflare Pages dashboard:
 *   COMPOSIO_API_KEY  (secret) — from ~/.composio/user_data.json
 *   COMPOSIO_GCAL_ID           — connected account ID for Google Calendar
 *   COMPOSIO_GMAIL_ID          — connected account ID for Gmail
 */

const COMPOSIO_BASE = 'https://backend.composio.dev/api/v3.1';
const COMPOSIO_USER_ID = 'scaling-smb-evan';

interface ComposioEnv {
  COMPOSIO_API_KEY: string;
  COMPOSIO_GCAL_ID: string;
  COMPOSIO_GMAIL_ID: string;
}

function requireEnv(env: Record<string, unknown>): ComposioEnv & { apiKey: string } {
  const apiKey = env.COMPOSIO_API_KEY as string | undefined;
  const gcalId = env.COMPOSIO_GCAL_ID as string | undefined;
  const gmailId = env.COMPOSIO_GMAIL_ID as string | undefined;

  if (!apiKey) throw new Error('Missing COMPOSIO_API_KEY env var');
  if (!gcalId) throw new Error('Missing COMPOSIO_GCAL_ID env var');
  if (!gmailId) throw new Error('Missing COMPOSIO_GMAIL_ID env var');

  return { COMPOSIO_API_KEY: apiKey, COMPOSIO_GCAL_ID: gcalId, COMPOSIO_GMAIL_ID: gmailId, apiKey };
}

async function callComposio(
  toolSlug: string,
  params: Record<string, unknown>,
  connectedAccountId: string,
  apiKey: string,
): Promise<unknown> {
  const url = `${COMPOSIO_BASE}/tools/execute/${toolSlug}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      connected_account_id: connectedAccountId,
      user_id: COMPOSIO_USER_ID,
      arguments: params,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => `${res.status} ${res.statusText}`);
    throw new Error(`Composio ${toolSlug} failed (${res.status}): ${err}`);
  }

  const json: unknown = await res.json();
  return json;
}

function extractMeetLink(response: unknown): string | null {
  if (!response || typeof response !== 'object') return null;

  const data = (response as Record<string, unknown>).data as Record<string, unknown> | undefined;
  const responseData = data?.response_data as Record<string, unknown> | undefined;

  // Try conferenceData.entryPoints[0].uri (v3.1 API)
  const confData = responseData?.conferenceData as Record<string, unknown> | undefined;
  const entryPoints = confData?.entryPoints as Array<Record<string, unknown>> | undefined;
  const uri = entryPoints?.[0]?.uri;
  if (typeof uri === 'string') return uri;

  // Fallback: hangoutLink
  const hangoutLink =
    typeof responseData?.hangoutLink === 'string'
      ? responseData.hangoutLink
      : typeof data?.hangoutLink === 'string'
        ? data.hangoutLink
        : null;
  if (hangoutLink) return hangoutLink;

  return null;
}

function toNaiveDatetime(dateStr: string, timeStr: string): string {
  const [raw, period] = timeStr.split(' ');
  const [h, m] = raw.split(':').map(Number);
  let hour = h;
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return `${dateStr}T${String(hour).padStart(2, '0')}:${String(m ?? 0).padStart(2, '0')}:00`;
}

function addMinutes(naiveDt: string, mins: number): string {
  const [datePart, timePart] = naiveDt.split('T');
  const [h, m, s] = timePart.split(':').map(Number);
  const totalMs = new Date(0, 0, 0, h, m, s).getTime() + mins * 60_000;
  const d = new Date(totalMs);
  return `${datePart}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

export interface ComposioResult {
  meetLink: string | null;
  calendarEventId: string | null;
}

/**
 * Create a Google Calendar event with Google Meet, then send a confirmation email.
 * Both run independently — if one fails the other still completes.
 */
export async function createBookingEvent(
  env: Record<string, unknown>,
  params: {
    date: string;
    time: string;
    timezone: string;
    name: string;
    email: string;
    phone?: string;
    service: string;
    message?: string;
  },
): Promise<ComposioResult> {
  const { COMPOSIO_API_KEY, COMPOSIO_GCAL_ID, COMPOSIO_GMAIL_ID, apiKey } = requireEnv(env);

  const startDateTime = toNaiveDatetime(params.date, params.time);
  const endDateTime = addMinutes(startDateTime, 30);

  // Format date nicely for the email
  const formattedDate = new Date(startDateTime).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: params.timezone,
  });

  // Step 1: Create Calendar event with Google Meet
  let meetLink: string | null = null;
  let calendarEventId: string | null = null;
  let calendarError: unknown = null;

  try {
    const calResponse = await callComposio(
      'GOOGLECALENDAR_CREATE_EVENT',
      {
        calendarId: 'primary',
        summary: `Strategy Call — ${params.name} (${params.service})`,
        description: [
          `Strategy call booked via scalingsmb.com`,
          ``,
          `Client: ${params.name}`,
          `Email: ${params.email}`,
          params.phone ? `Phone: ${params.phone}` : null,
          `Service: ${params.service}`,
          `Time zone: ${params.timezone}`,
          params.message ? `\nMessage:\n${params.message}` : null,
        ]
          .filter(Boolean)
          .join('\n'),
        start_datetime: startDateTime,
        end_datetime: endDateTime,
        timezone: params.timezone,
        attendees: [params.email, 'scalingsmb@gmail.com'],
        create_meeting_room: true,
        send_updates: 'all',
      },
      COMPOSIO_GCAL_ID,
      COMPOSIO_API_KEY,
    );

    meetLink = extractMeetLink(calResponse);

    // Extract event ID from response — v3.1 API puts it in data.response_data
    const responseData = (calResponse as Record<string, unknown>).data as Record<string, unknown> | undefined;
    const respData = responseData?.response_data as Record<string, unknown> | undefined;
    calendarEventId =
      typeof respData?.id === 'string'
        ? respData.id
        : typeof responseData?.id === 'string'
          ? responseData.id
          : null;
  } catch (err) {
    calendarError = err;
    console.error('[composio] Calendar create failed:', err);
  }

  // Step 2: Send confirmation email
  let emailError: unknown = null;
  try {
    const emailBody = [
      `Hi ${params.name},`,
      ``,
      `Your strategy call with Scaling SMB has been confirmed!`,
      ``,
      `📅 Date: ${formattedDate}`,
      `⏰ Time: ${params.time} (${params.timezone})`,
      meetLink ? `🎥 Google Meet: ${meetLink}` : ``,
      ``,
      meetLink
        ? `Click the Meet link above at your scheduled time to join the call.`
        : `We'll send you the meeting link closer to the date.`,
      ``,
      `Service: ${params.service}`,
      params.message ? `\nYour note: ${params.message}` : ``,
      ``,
      `Best regards,`,
      `The Scaling SMB Team`,
      `scalingsmb@gmail.com`,
    ]
      .filter(Boolean)
      .join('\n');

    await callComposio(
      'GMAIL_SEND_EMAIL',
      {
        recipient_email: params.email,
        cc: ['scalingsmb@gmail.com'],
        subject: `✅ Strategy Call Confirmed — ${formattedDate} at ${params.time}`,
        body: emailBody,
        is_html: false,
      },
      COMPOSIO_GMAIL_ID,
      COMPOSIO_API_KEY,
    );
  } catch (err) {
    emailError = err;
    console.error('[composio] Email send failed:', err);
  }

  // If both failed, throw the calendar error (more relevant)
  if (calendarError && emailError) {
    throw calendarError;
  }

  return { meetLink, calendarEventId };
}
