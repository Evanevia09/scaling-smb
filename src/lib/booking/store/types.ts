import type { BookingRecord, CreateBookingRequest } from '../types';

export interface BookingStore {
	createBooking(input: CreateBookingRequest): Promise<BookingRecord>;
	getBookingsForDate(date: string): Promise<BookingRecord[]>;
	getBookingById(id: string): Promise<BookingRecord | null>;
}
