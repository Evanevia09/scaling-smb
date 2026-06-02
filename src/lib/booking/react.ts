import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookingApiClient } from './client';
import { toDateKey } from './dates';
import type { BookingConfig, SlotAvailability } from './types';

export type UseBookingApiOptions = {
	baseUrl: string;
	enabled?: boolean;
};

export type UseBookingApiResult = {
	ready: boolean;
	loading: boolean;
	config: BookingConfig | null;
	daySlots: SlotAvailability[] | null;
	refreshAvailability: (date: Date | null, timezone: string) => Promise<void>;
	createBooking: ReturnType<BookingApiClient['createBooking']>;
	isSlotBookable: (time: string) => boolean;
};

export function useBookingApi({
	baseUrl,
	enabled = true,
}: UseBookingApiOptions): UseBookingApiResult {
	const client = useMemo(() => new BookingApiClient({ baseUrl }), [baseUrl]);
	const [ready, setReady] = useState(false);
	const [loading, setLoading] = useState(false);
	const [config, setConfig] = useState<BookingConfig | null>(null);
	const [daySlots, setDaySlots] = useState<SlotAvailability[] | null>(null);

	useEffect(() => {
		if (!enabled) {
			setReady(false);
			setConfig(null);
			return;
		}

		let cancelled = false;
		(async () => {
			try {
				const cfg = await client.getConfig();
				if (!cancelled) {
					setConfig(cfg);
					setReady(true);
				}
			} catch {
				if (!cancelled) {
					setReady(false);
					setConfig(null);
				}
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [client, enabled]);

	const refreshAvailability = useCallback(
		async (date: Date | null, timezone: string) => {
			if (!enabled || !ready || !date) {
				setDaySlots(null);
				return;
			}
			setLoading(true);
			try {
				const res = await client.getAvailability(toDateKey(date), timezone);
				setDaySlots(res.slots);
			} catch {
				setDaySlots(null);
			} finally {
				setLoading(false);
			}
		},
		[client, enabled, ready],
	);

	const isSlotBookable = useCallback(
		(time: string) => {
			if (daySlots) {
				const slot = daySlots.find((s) => s.time === time);
				return slot?.available ?? false;
			}
			if (config) {
				return !config.blockedTimeSlots.includes(time);
			}
			return true;
		},
		[daySlots, config],
	);

	return {
		ready,
		loading,
		config,
		daySlots,
		refreshAvailability,
		createBooking: (payload) => client.createBooking(payload),
		isSlotBookable,
	};
}
