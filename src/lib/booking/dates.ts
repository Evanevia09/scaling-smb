export function startOfDay(d: Date): Date {
	return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function isWeekday(d: Date): boolean {
	const day = d.getDay();
	return day >= 1 && day <= 5;
}

/** ISO date key YYYY-MM-DD in local calendar terms */
export function toDateKey(d: Date): string {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
}

export function parseDateKey(key: string): Date | null {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
	if (!match) return null;
	const y = Number(match[1]);
	const m = Number(match[2]) - 1;
	const d = Number(match[3]);
	const date = new Date(y, m, d);
	if (date.getFullYear() !== y || date.getMonth() !== m || date.getDate() !== d) return null;
	return date;
}

export function isValidDateKey(key: string): boolean {
	return parseDateKey(key) !== null;
}
