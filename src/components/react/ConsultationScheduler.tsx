import { useMemo, useState, type FormEvent } from 'react';
import styles from './ConsultationScheduler.module.css';

export type TimezoneOption = { value: string; label: string };

export type ConsultationSchedulerProps = {
	meetingTitle: string;
	duration: string;
	description: string;
	features: string[];
	timeSlots: string[];
	timezones: TimezoneOption[];
	serviceOptions: string[];
	stepLabels: string[];
	stepTitles: {
		date: string;
		time: string;
		details: string;
	};
	success: {
		title: string;
		message: string;
	};
	contactEmail: string;
};

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;
const TOTAL_STEPS = 3;

function startOfDay(d: Date): Date {
	return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

function isWeekday(d: Date): boolean {
	const day = d.getDay();
	return day >= 1 && day <= 5;
}

export default function ConsultationScheduler({
	meetingTitle,
	duration,
	description,
	features,
	timeSlots,
	timezones,
	serviceOptions,
	stepLabels,
	stepTitles,
	success,
	contactEmail,
}: ConsultationSchedulerProps) {
	const today = useMemo(() => startOfDay(new Date()), []);
	const [step, setStep] = useState(1);
	const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [timezone, setTimezone] = useState(timezones[0]?.value ?? 'Asia/Macau');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [service, setService] = useState(serviceOptions[0] ?? '');
	const [message, setMessage] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

	const calendarCells = useMemo(() => {
		const year = viewDate.getFullYear();
		const month = viewDate.getMonth();
		const first = new Date(year, month, 1);
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const startPad = (first.getDay() + 6) % 7;

		const cells: Array<{ day: number; date: Date } | null> = [];
		for (let i = 0; i < startPad; i++) cells.push(null);
		for (let day = 1; day <= daysInMonth; day++) {
			cells.push({ day, date: new Date(year, month, day) });
		}
		return cells;
	}, [viewDate]);

	const formattedDate = selectedDate
		? selectedDate.toLocaleDateString('en-US', {
				weekday: 'long',
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			})
		: '';

	const timezoneLabel = timezones.find((t) => t.value === timezone)?.label ?? timezone;

	function isAvailable(date: Date): boolean {
		return date >= today && isWeekday(date);
	}

	function goMonth(delta: number): void {
		setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + delta, 1));
	}

	function selectDate(date: Date): void {
		if (!isAvailable(date)) return;
		setSelectedDate(date);
		setSelectedTime(null);
	}

	function canAdvance(): boolean {
		if (step === 1) return selectedDate !== null;
		if (step === 2) return selectedTime !== null;
		return false;
	}

	function goNext(): void {
		if (!canAdvance() || step >= TOTAL_STEPS) return;
		setStep((s) => s + 1);
	}

	function goBack(): void {
		setFormError(null);
		if (step > 1) setStep((s) => s - 1);
	}

	function handleSubmit(e: FormEvent): void {
		e.preventDefault();
		setFormError(null);

		if (!selectedDate || !selectedTime) {
			setFormError('Please complete date and time selection.');
			return;
		}

		const trimmedName = name.trim();
		const trimmedEmail = email.trim();
		if (!trimmedName || !trimmedEmail) {
			setFormError('Name and email are required.');
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
			setFormError('Please enter a valid email address.');
			return;
		}

		if (!service) {
			setFormError('Please select a service.');
			return;
		}

		const subject = encodeURIComponent(
			`Consultation request — ${formattedDate} at ${selectedTime}`,
		);
		const body = encodeURIComponent(
			[
				`Name: ${trimmedName}`,
				`Email: ${trimmedEmail}`,
				phone.trim() ? `Phone: ${phone.trim()}` : null,
				`Service: ${service}`,
				`Date: ${formattedDate}`,
				`Time: ${selectedTime}`,
				`Time zone: ${timezoneLabel}`,
				message.trim() ? `\nMessage:\n${message.trim()}` : null,
			]
				.filter(Boolean)
				.join('\n'),
		);

		window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
		setSubmitted(true);
	}

	const stepTitle =
		step === 1 ? stepTitles.date : step === 2 ? stepTitles.time : stepTitles.details;

	return (
		<div className={styles.card}>
			<div className={styles.cardInner}>
				<aside className={styles.meeting}>
					<div className={styles.meetingIcon} aria-hidden>
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
							<rect x="3" y="4" width="18" height="17" rx="2" />
							<path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
						</svg>
					</div>
					<h3 className={styles.meetingTitle}>{meetingTitle}</h3>
					<p className={styles.meetingDuration}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
							<circle cx="12" cy="12" r="9" />
							<path d="M12 7v5l3 2" strokeLinecap="round" />
						</svg>
						{duration}
					</p>
					<p className={styles.meetingDesc}>{description}</p>
					<ul className={styles.meetingFeatures}>
						{features.map((f) => (
							<li key={f}>
								<span className={styles.featureDot} aria-hidden />
								{f}
							</li>
						))}
					</ul>
					{selectedDate && (
						<div className={styles.meetingSummary}>
							<p className={styles.meetingSummaryLabel}>Your selection</p>
							<p className={styles.meetingSummaryValue}>{formattedDate}</p>
							{selectedTime && (
								<p className={styles.meetingSummaryMeta}>
									{selectedTime} · {timezoneLabel}
								</p>
							)}
						</div>
					)}
				</aside>

				<div className={styles.calendarPane}>
					{submitted ? (
						<div className={styles.success} role="status">
							<div className={styles.successIcon} aria-hidden="true">
								<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<circle cx="12" cy="12" r="10" />
									<path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>
							<h3 className={styles.successTitle}>{success.title}</h3>
							<p className={styles.successText}>{success.message}</p>
							<p className={styles.successBooking}>
								<strong>{formattedDate}</strong>
								<br />
								{selectedTime} · {timezoneLabel}
							</p>
						</div>
					) : (
						<>
							<nav className={styles.steps} aria-label="Booking steps">
								{stepLabels.map((label, i) => {
									const n = i + 1;
									const done = n < step;
									const current = n === step;
									return (
										<div
											key={label}
											className={[
												styles.step,
												done ? styles.stepDone : '',
												current ? styles.stepCurrent : '',
											]
												.filter(Boolean)
												.join(' ')}
										>
											<span className={styles.stepNum} aria-hidden>
												{done ? '✓' : n}
											</span>
											<span className={styles.stepLabel}>{label}</span>
										</div>
									);
								})}
							</nav>

							<h3 className={styles.calendarTitle}>{stepTitle}</h3>

							{step === 1 && (
								<div className={styles.stepBody}>
									<div className={styles.monthRow}>
										<button
											type="button"
											className={styles.monthNav}
											onClick={() => goMonth(-1)}
											aria-label="Previous month"
										>
											‹
										</button>
										<span className={styles.monthLabel}>{monthLabel}</span>
										<button
											type="button"
											className={styles.monthNav}
											onClick={() => goMonth(1)}
											aria-label="Next month"
										>
											›
										</button>
									</div>

									<div className={styles.weekdays}>
										{WEEKDAYS.map((d) => (
											<span key={d} className={styles.weekday}>
												{d}
											</span>
										))}
									</div>

									<div className={styles.days} role="grid" aria-label="Calendar">
										{calendarCells.map((cell, i) => {
											if (!cell) {
												return <span key={`empty-${i}`} className={styles.dayEmpty} />;
											}
											const available = isAvailable(cell.date);
											const selected = selectedDate ? isSameDay(cell.date, selectedDate) : false;
											return (
												<button
													key={cell.date.toISOString()}
													type="button"
													className={[
														styles.day,
														available ? styles.dayAvailable : styles.dayDisabled,
														selected ? styles.daySelected : '',
													]
														.filter(Boolean)
														.join(' ')}
													disabled={!available}
													onClick={() => selectDate(cell.date)}
													aria-pressed={selected}
													aria-label={`${cell.day} ${monthLabel}`}
												>
													{cell.day}
												</button>
											);
										})}
									</div>
								</div>
							)}

							{step === 2 && (
								<div className={styles.stepBody}>
									<label className={styles.field}>
										<span className={styles.fieldLabel}>Time zone</span>
										<select
											className={styles.select}
											value={timezone}
											onChange={(e) => setTimezone(e.target.value)}
										>
											{timezones.map((tz) => (
												<option key={tz.value} value={tz.value}>
													{tz.label}
												</option>
											))}
										</select>
									</label>

									<div className={styles.times}>
										<p className={styles.timesLabel}>Available times</p>
										<div className={styles.timeGrid}>
											{timeSlots.map((slot) => (
												<button
													key={slot}
													type="button"
													className={
														selectedTime === slot ? styles.timeSlotActive : styles.timeSlot
													}
													onClick={() => setSelectedTime(slot)}
												>
													{slot}
												</button>
											))}
										</div>
									</div>
								</div>
							)}

							{step === 3 && (
								<form className={styles.stepBody} onSubmit={handleSubmit} noValidate>
									<label className={styles.field}>
										<span className={styles.fieldLabel}>Name *</span>
										<input
											className={styles.input}
											type="text"
											name="name"
											autoComplete="name"
											required
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</label>

									<label className={styles.field}>
										<span className={styles.fieldLabel}>Email *</span>
										<input
											className={styles.input}
											type="email"
											name="email"
											autoComplete="email"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</label>

									<label className={styles.field}>
										<span className={styles.fieldLabel}>Phone</span>
										<input
											className={styles.input}
											type="tel"
											name="phone"
											autoComplete="tel"
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
										/>
									</label>

									<label className={styles.field}>
										<span className={styles.fieldLabel}>Service *</span>
										<select
											className={styles.select}
											name="service"
											required
											value={service}
											onChange={(e) => setService(e.target.value)}
										>
											{serviceOptions.map((opt) => (
												<option key={opt} value={opt}>
													{opt}
												</option>
											))}
										</select>
									</label>

									<label className={styles.field}>
										<span className={styles.fieldLabel}>Additional message</span>
										<textarea
											className={styles.textarea}
											name="message"
											rows={4}
											value={message}
											onChange={(e) => setMessage(e.target.value)}
											placeholder="Tell us about your project, timeline, or goals…"
										/>
									</label>

									{formError && (
										<p className={styles.formError} role="alert">
											{formError}
										</p>
									)}

									<div className={styles.stepActions}>
										<button type="button" className={styles.backBtn} onClick={goBack}>
											Back
										</button>
										<button type="submit" className={styles.confirmBtn}>
											Submit booking
										</button>
									</div>
								</form>
							)}

							{step < 3 && (
								<div className={styles.stepActions}>
									{step > 1 ? (
										<button type="button" className={styles.backBtn} onClick={goBack}>
											Back
										</button>
									) : (
										<span />
									)}
									<button
										type="button"
										className={styles.confirmBtn}
										onClick={goNext}
										disabled={!canAdvance()}
									>
										Continue
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
