import type { ApiErrorBody } from './types';

export const BOOKING_API_PREFIX = '/api/booking';

export function jsonResponse<T>(data: T, status = 200, extraHeaders?: HeadersInit): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			...corsHeaders(),
			...Object.fromEntries(new Headers(extraHeaders).entries()),
		},
	});
}

export function errorResponse(
	error: string,
	status = 400,
	code?: string,
	details?: Record<string, string>,
): Response {
	const body: ApiErrorBody = { error, code, details };
	return jsonResponse(body, status);
}

export function corsHeaders(): Record<string, string> {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
	};
}

export function handleOptions(): Response {
	return new Response(null, { status: 204, headers: corsHeaders() });
}
