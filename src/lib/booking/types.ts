export type TimezoneOption = { value: string; label: string };

export type BookingConfig = {
	meetingTitle: string;
	duration: string;
	description: string;
	features: string[];
	timeSlots: string[];
	blockedTimeSlots: string[];
	timezones: TimezoneOption[];
	serviceOptions: string[];
};

export type SlotAvailability = {
	time: string;
	available: boolean;
	reason?: 'blocked' | 'booked' | 'past';
};

export type AvailabilityResponse = {
	date: string;
	timezone: string;
	slots: SlotAvailability[];
};

export type MonthDayAvailability = {
	date: string;
	available: boolean;
};

export type MonthAvailabilityResponse = {
	year: number;
	month: number;
	days: MonthDayAvailability[];
};

export type CreateBookingRequest = {
	date: string;
	time: string;
	timezone: string;
	name: string;
	email: string;
	phone?: string;
	service: string;
	message?: string;
};

export type BookingRecord = CreateBookingRequest & {
	id: string;
	status: 'pending' | 'confirmed' | 'cancelled';
	createdAt: string;
};

export type CreateBookingResponse = {
	booking: BookingRecord;
	meetLink?: string;
};

export type ApiErrorBody = {
	error: string;
	code?: string;
	details?: Record<string, string>;
};
