import { BOOKING_API_PREFIX } from './http';
import type {
	AvailabilityResponse,
	BookingConfig,
	CreateBookingRequest,
	CreateBookingResponse,
	MonthAvailabilityResponse,
} from './types';

export type BookingApiClientOptions = {
	baseUrl?: string;
	fetch?: typeof fetch;
};

export class BookingApiClient {
	private baseUrl: string;
	private fetchFn: typeof fetch;

	constructor(options: BookingApiClientOptions = {}) {
		const base = options.baseUrl ?? BOOKING_API_PREFIX;
		this.baseUrl = base.replace(/\/+$/, '');
		this.fetchFn = options.fetch ?? fetch;
	}

	private async request<T>(path: string, init?: RequestInit): Promise<T> {
		const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
		const res = await this.fetchFn(url, {
			...init,
			headers: {
				Accept: 'application/json',
				...(init?.body ? { 'Content-Type': 'application/json' } : {}),
				...init?.headers,
			},
		});

		const data = (await res.json().catch(() => ({}))) as T & { error?: string };

		if (!res.ok) {
			const message =
				typeof data === 'object' && data && 'error' in data && typeof data.error === 'string'
					? data.error
					: res.statusText;
			throw new BookingApiError(message, res.status, data);
		}

		return data;
	}

	getConfig(): Promise<BookingConfig> {
		return this.request<BookingConfig>('/config');
	}

	getAvailability(date: string, timezone?: string): Promise<AvailabilityResponse> {
		const params = new URLSearchParams({ date });
		if (timezone) params.set('timezone', timezone);
		return this.request<AvailabilityResponse>(`/availability?${params}`);
	}

	getMonthAvailability(year: number, month: number): Promise<MonthAvailabilityResponse> {
		const params = new URLSearchParams({
			year: String(year),
			month: String(month),
		});
		return this.request<MonthAvailabilityResponse>(`/availability/month?${params}`);
	}

	createBooking(payload: CreateBookingRequest): Promise<CreateBookingResponse> {
		return this.request<CreateBookingResponse>('/', {
			method: 'POST',
			body: JSON.stringify(payload),
		});
	}
}

export class BookingApiError extends Error {
	status: number;
	body: unknown;

	constructor(message: string, status: number, body: unknown) {
		super(message);
		this.name = 'BookingApiError';
		this.status = status;
		this.body = body;
	}
}

/** Returns true if the booking API responds (used to enable API mode in the UI). */
export async function probeBookingApi(baseUrl?: string): Promise<boolean> {
	try {
		const client = new BookingApiClient({ baseUrl });
		await client.getConfig();
		return true;
	} catch {
		return false;
	}
}
