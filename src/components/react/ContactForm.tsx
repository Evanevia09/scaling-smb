import { useState, useCallback, type FormEvent } from 'react';
import styles from './ContactForm.module.css';

export type ContactFormProps = {
	serviceOptions: string[];
};

function encodeBody(data: Record<string, string>): string {
	const p = new URLSearchParams();
	for (const [k, v] of Object.entries(data)) {
		p.append(k, v);
	}
	return p.toString();
}

export default function ContactForm({ serviceOptions }: ContactFormProps) {
	const [emailError, setEmailError] = useState<string | null>(null);
	const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const form = e.currentTarget;
			const fd = new FormData(form);

			const name = String(fd.get('name') ?? '').trim();
			const phone = String(fd.get('phone') ?? '').trim();
			const email = String(fd.get('email') ?? '').trim();
			const service = String(fd.get('service') ?? '');
			const message = String(fd.get('message') ?? '').trim();
			const botField = String(fd.get('bot-field') ?? '');

			if (!email) {
				setEmailError('Email is required.');
				return;
			}
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				setEmailError('Enter a valid email address.');
				return;
			}
			setEmailError(null);

			setStatus('submitting');
			setErrorMessage('');

			const body = encodeBody({
				'form-name': 'contact',
				name,
				phone,
				email,
				service,
				message,
				'bot-field': botField,
			});

			try {
				const res = await fetch('/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body,
				});
				if (!res.ok) {
					throw new Error(`HTTP ${res.status}`);
				}
				setStatus('success');
				form.reset();
				const sel = form.querySelector('select[name="service"]');
				if (sel instanceof HTMLSelectElement) sel.value = '';
			} catch {
				setStatus('error');
				setErrorMessage('Something went wrong. Please try WhatsApp or email instead.');
			}
		},
		[],
	);

	return (
		<form className={styles.form} method="POST" onSubmit={onSubmit} noValidate>
			<div className={styles.honeypot}>
				<label>
					Do not fill: <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
				</label>
			</div>

			<div className={styles.row}>
				<label className={styles.label} htmlFor="contact-name">
					Name
				</label>
				<input className={styles.input} id="contact-name" name="name" type="text" autoComplete="name" />
			</div>

			<div className={styles.row}>
				<label className={styles.label} htmlFor="contact-phone">
					Phone
					<span className={styles.optional}>(optional)</span>
				</label>
				<input
					className={styles.input}
					id="contact-phone"
					name="phone"
					type="tel"
					autoComplete="tel"
					inputMode="tel"
				/>
			</div>

			<div className={styles.row}>
				<label className={styles.label} htmlFor="contact-email">
					Email <span aria-hidden="true">*</span>
				</label>
				<input
					className={styles.input}
					id="contact-email"
					name="email"
					type="email"
					autoComplete="email"
					required
					aria-required="true"
					aria-invalid={emailError ? 'true' : 'false'}
					aria-describedby={emailError ? 'contact-email-err' : undefined}
					onChange={() => emailError && setEmailError(null)}
				/>
				{emailError ? (
					<p id="contact-email-err" className={styles.error} role="alert">
						{emailError}
					</p>
				) : null}
			</div>

			<div className={styles.row}>
				<label className={styles.label} htmlFor="contact-service">
					Interested service
				</label>
				<select className={styles.select} id="contact-service" name="service" defaultValue="" required>
					<option value="" disabled>
						Select a service
					</option>
					{serviceOptions.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
			</div>

			<div className={styles.row}>
				<label className={styles.label} htmlFor="contact-message">
					Message
				</label>
				<textarea className={styles.textarea} id="contact-message" name="message" rows={5} />
			</div>

			<button className={styles.submit} type="submit" disabled={status === 'submitting'}>
				{status === 'submitting' ? 'Sending…' : 'Send message'}
			</button>

			{status === 'success' ? (
				<p className={`${styles.status} ${styles.statusOk}`} role="status">
					Thanks — we received your message and will get back to you shortly.
				</p>
			) : null}
			{status === 'error' ? (
				<p className={`${styles.status} ${styles.statusErr}`} role="alert">
					{errorMessage}
				</p>
			) : null}
		</form>
	);
}
