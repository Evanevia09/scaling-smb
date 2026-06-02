import { contact, contactFormServiceOptions } from '../../content/site';
import type { BookingConfig } from './types';

/** Public scheduling config served by GET /api/booking/config */
export function getBookingConfig(): BookingConfig {
	const { scheduling } = contact;
	return {
		meetingTitle: scheduling.meetingTitle,
		duration: scheduling.duration,
		description: scheduling.description,
		features: [...scheduling.features],
		timeSlots: [...scheduling.timeSlots],
		blockedTimeSlots: [...scheduling.blockedTimeSlots],
		timezones: [...scheduling.timezones],
		serviceOptions: contactFormServiceOptions,
	};
}
