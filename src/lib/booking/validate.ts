import { getBookingConfig } from './config';
import { isValidDateKey, parseDateKey } from './dates';
import type { CreateBookingRequest } from './types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ValidationResult =
	| { ok: true; data: CreateBookingRequest }
	| { ok: false; error: string; details?: Record<string, string> };

export function validateCreateBookingBody(body: unknown): ValidationResult {
	if (!body || typeof body !== 'object') {
		return { ok: false, error: 'Request body must be a JSON object' };
	}

	const raw = body as Record<string, unknown>;
	const config = getBookingConfig();

	const date = typeof raw.date === 'string' ? raw.date.trim() : '';
	const time = typeof raw.time === 'string' ? raw.time.trim() : '';
	const timezone = typeof raw.timezone === 'string' ? raw.timezone.trim() : '';
	const name = typeof raw.name === 'string' ? raw.name.trim() : '';
	const email = typeof raw.email === 'string' ? raw.email.trim() : '';
	const phone = typeof raw.phone === 'string' ? raw.phone.trim() : '';
	const service = typeof raw.service === 'string' ? raw.service.trim() : '';
	const message = typeof raw.message === 'string' ? raw.message.trim() : '';

	const details: Record<string, string> = {};

	if (!isValidDateKey(date)) details.date = 'Invalid date (use YYYY-MM-DD)';
	if (!config.timeSlots.includes(time)) details.time = 'Invalid time slot';
	if (!config.timezones.some((t) => t.value === timezone)) details.timezone = 'Invalid timezone';
	if (!name) details.name = 'Name is required';
	if (!email) details.email = 'Email is required';
	else if (!EMAIL_RE.test(email)) details.email = 'Invalid email address';
	if (!service) details.service = 'Service is required';
	else if (!config.serviceOptions.includes(service)) details.service = 'Invalid service';

	if (Object.keys(details).length > 0) {
		return { ok: false, error: 'Validation failed', details };
	}

	if (!parseDateKey(date)) {
		return { ok: false, error: 'Validation failed', details: { date: 'Invalid date' } };
	}

	if (config.blockedTimeSlots.includes(time)) {
		return { ok: false, error: 'That time slot is not available', details: { time: 'blocked' } };
	}

	return {
		ok: true,
		data: {
			date,
			time,
			timezone,
			name,
			email,
			phone: phone || undefined,
			service,
			message: message || undefined,
		},
	};
}
