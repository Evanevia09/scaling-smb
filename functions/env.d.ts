/** Cloudflare Pages / Workers bindings — extend when you add D1 or KV */
interface Env {
	// BOOKINGS_KV?: KVNamespace;
	// BOOKINGS_D1?: D1Database;
	NOTIFY_EMAIL?: string;
	/** Composio API key (from ~/.composio/user_data.json) */
	COMPOSIO_API_KEY?: string;
	/** Google Calendar connected account ID from Composio */
	COMPOSIO_GCAL_ID?: string;
	/** Gmail connected account ID from Composio */
	COMPOSIO_GMAIL_ID?: string;
}
