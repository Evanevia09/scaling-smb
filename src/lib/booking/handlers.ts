import { getMonthAvailability, getSlotsForDateAsync } from './availability';
import { getBookingConfig } from './config';
import { isValidDateKey } from './dates';
import { BOOKING_API_PREFIX, errorResponse, handleOptions, jsonResponse } from './http';
import { getBookingStore, type BookingEnv } from './store';
import type { BookingStore } from './store/types';
import { validateCreateBookingBody } from './validate';
import { createBookingEvent } from './composio';

export type BookingHandlerContext = {
	store: BookingStore;
	env?: BookingEnv;
};

function routeFromPathname(pathname: string): string {
	const normalized = pathname.replace(/\/+$/, '');
	const prefix = BOOKING_API_PREFIX.replace(/\/+$/, '');
	if (!normalized.startsWith(prefix)) return '';
	return normalized.slice(prefix.length).replace(/^\//, '').replace(/\/$/, '');
}

export async function handleBookingRequest(
	request: Request,
	ctx?: Partial<BookingHandlerContext>,
): Promise<Response> {
	if (request.method === 'OPTIONS') return handleOptions();

	const store = ctx?.store ?? getBookingStore(ctx?.env);
	const route = routeFromPathname(new URL(request.url).pathname);

	try {
		if (request.method === 'GET' && (route === 'config' || route === '')) {
			return jsonResponse(getBookingConfig());
		}

		if (request.method === 'GET' && route === 'availability') {
			const url = new URL(request.url);
			const date = url.searchParams.get('date');
			const timezone = url.searchParams.get('timezone') ?? undefined;

			if (!date || !isValidDateKey(date)) {
				return errorResponse('Query param "date" is required (YYYY-MM-DD)', 400, 'INVALID_DATE');
			}

			const availability = await getSlotsForDateAsync(date, store, { timezone });
			return jsonResponse(availability);
		}

		if (request.method === 'GET' && route === 'availability/month') {
			const url = new URL(request.url);
			const year = Number(url.searchParams.get('year'));
			const month = Number(url.searchParams.get('month'));

			if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
				return errorResponse('Query params "year" and "month" are required', 400, 'INVALID_MONTH');
			}

			return jsonResponse(getMonthAvailability(year, month));
		}

		if (request.method === 'POST' && (route === '' || route === 'bookings')) {
			let body: unknown;
			try {
				body = await request.json();
			} catch {
				return errorResponse('Invalid JSON body', 400, 'INVALID_JSON');
			}

			const validation = validateCreateBookingBody(body);
			if (!validation.ok) {
				return errorResponse(validation.error, 400, 'VALIDATION_ERROR', validation.details);
			}

			const availability = await getSlotsForDateAsync(validation.data.date, store, {
				timezone: validation.data.timezone,
			});
			const slot = availability.slots.find((s) => s.time === validation.data.time);
			if (!slot?.available) {
				return errorResponse('That time slot is not available', 409, 'SLOT_UNAVAILABLE', {
					time: validation.data.time,
				});
			}

			try {
				const booking = await store.createBooking(validation.data);

				// Fire-and-forget Composio: create Calendar event + send confirmation email
				// We do NOT block the response on this — the booking is already stored.
				let meetLink: string | undefined;
				if (ctx?.env) {
					try {
						const result = await createBookingEvent(ctx.env, validation.data);
						meetLink = result.meetLink ?? undefined;
					} catch (compErr) {
						console.error('[booking] Composio integration failed:', compErr);
						// Non-blocking — booking is stored regardless
					}
				}

				return jsonResponse({ booking, meetLink }, 201);
			} catch (err) {
				if (err instanceof Error && err.message === 'TIME_SLOT_TAKEN') {
					return errorResponse('That time slot was just booked', 409, 'SLOT_TAKEN');
				}
				throw err;
			}
		}

		return errorResponse('Not found', 404, 'NOT_FOUND');
	} catch (err) {
		console.error('[booking-api]', err);
		return errorResponse('Internal server error', 500, 'INTERNAL_ERROR');
	}
}
