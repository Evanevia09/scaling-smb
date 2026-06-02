import type { BookingRecord, CreateBookingRequest } from '../types';
import type { BookingStore } from './types';

function newId(): string {
	if (typeof crypto !== 'undefined' && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	return `bk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/** In-memory store for dev / until D1/KV is wired on Cloudflare */
export class MemoryBookingStore implements BookingStore {
	private bookings = new Map<string, BookingRecord>();

	async createBooking(input: CreateBookingRequest): Promise<BookingRecord> {
		const existing = await this.getBookingsForDate(input.date);
		if (existing.some((b) => b.time === input.time && b.status !== 'cancelled')) {
			throw new Error('TIME_SLOT_TAKEN');
		}

		const record: BookingRecord = {
			...input,
			id: newId(),
			status: 'pending',
			createdAt: new Date().toISOString(),
		};
		this.bookings.set(record.id, record);
		return record;
	}

	async getBookingsForDate(date: string): Promise<BookingRecord[]> {
		return [...this.bookings.values()].filter((b) => b.date === date && b.status !== 'cancelled');
	}

	async getBookingById(id: string): Promise<BookingRecord | null> {
		return this.bookings.get(id) ?? null;
	}
}

let singleton: MemoryBookingStore | null = null;

export function getMemoryBookingStore(): MemoryBookingStore {
	if (!singleton) singleton = new MemoryBookingStore();
	return singleton;
}
