/** Cloudflare Pages / Workers bindings — extend when you add D1 or KV */
interface Env {
	// BOOKINGS_KV?: KVNamespace;
	// BOOKINGS_D1?: D1Database;
	NOTIFY_EMAIL?: string;
}
