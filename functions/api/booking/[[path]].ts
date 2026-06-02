import { handleBookingRequest } from '../../../src/lib/booking/handlers';
import { getBookingStore, type BookingEnv } from '../../../src/lib/booking/store';

/**
 * Cloudflare Pages Function — routes:
 *   GET  /api/booking/config
 *   GET  /api/booking/availability?date=YYYY-MM-DD&timezone=...
 *   GET  /api/booking/availability/month?year=2026&month=6
 *   POST /api/booking
 */
export const onRequest: PagesFunction<BookingEnv> = async (context) => {
	const store = getBookingStore(context.env);
	return handleBookingRequest(context.request, { store, env: context.env });
};
