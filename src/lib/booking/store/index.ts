import { getMemoryBookingStore } from './memory';
import type { BookingStore } from './types';

/**
 * Resolve the booking persistence layer.
 * On Cloudflare, swap for D1/KV using env bindings (see wrangler.jsonc).
 */
export type BookingEnv = {
	// BOOKINGS_KV?: KVNamespace;
	// BOOKINGS_D1?: D1Database;
	COMPOSIO_API_KEY?: string;
	COMPOSIO_GCAL_ID?: string;
	COMPOSIO_GMAIL_ID?: string;
};

export function getBookingStore(_env?: BookingEnv): BookingStore {
	// TODO: if (env?.BOOKINGS_D1) return new D1BookingStore(env.BOOKINGS_D1);
	return getMemoryBookingStore();
}
