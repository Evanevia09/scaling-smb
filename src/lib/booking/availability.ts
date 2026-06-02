import { getBookingConfig } from './config';
import { isWeekday, parseDateKey, startOfDay, toDateKey } from './dates';
import type { AvailabilityResponse, MonthAvailabilityResponse, SlotAvailability } from './types';
import type { BookingStore } from './store/types';

export async function getSlotsForDateAsync(
	dateKey: string,
	store: BookingStore,
	options: { timezone?: string; now?: Date } = {},
): Promise<AvailabilityResponse> {
	const config = getBookingConfig();
	const date = parseDateKey(dateKey);
	if (!date) throw new Error('Invalid date');

	const now = options.now ?? new Date();
	const today = startOfDay(now);
	const blocked = new Set(config.blockedTimeSlots);
	const existing = await store.getBookingsForDate(dateKey);
	const booked = new Set(existing.map((b) => b.time));

	const slots: SlotAvailability[] = config.timeSlots.map((time) => {
		if (blocked.has(time)) {
			return { time, available: false, reason: 'blocked' };
		}
		if (date < today || !isWeekday(date)) {
			return { time, available: false, reason: 'past' };
		}
		if (booked.has(time)) {
			return { time, available: false, reason: 'booked' };
		}
		return { time, available: true };
	});

	return {
		date: dateKey,
		timezone: options.timezone ?? config.timezones[0]?.value ?? 'Asia/Macau',
		slots,
	};
}

export function getMonthAvailability(
	year: number,
	month: number,
	now: Date = new Date(),
): MonthAvailabilityResponse {
	const today = startOfDay(now);
	const days: MonthAvailabilityResponse['days'] = [];
	const daysInMonth = new Date(year, month, 0).getDate();

	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(year, month - 1, day);
		const key = toDateKey(date);
		days.push({
			date: key,
			available: date >= today && isWeekday(date),
		});
	}

	return { year, month, days };
}
