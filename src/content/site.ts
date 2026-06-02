export const brand = {
	name: 'Scaling SMB',
	tagline: 'For small & medium local businesses',
};

export const nav = {
	services: 'Services',
	howItWorks: 'How It Works',
	projects: 'Work',
	contact: 'Contact',
	cta: 'Book a Free Call',
	openMenu: 'Open menu',
	closeMenu: 'Close menu',
} as const;

export const blogNav = {
	label: 'Blog',
} as const;

export const blogIndex = {
	eyebrow: 'Insights',
	title: 'Blog for local businesses',
	lede: 'Practical guides on local SEO, websites, automation, and AI — so you can get more customers without working more hours.',
	description:
		'Scaling SMB blog: local SEO, conversion-focused websites, business automation, and AI for small and medium local businesses.',
} as const;

export const hero = {
	tagline: brand.tagline,
	headline: 'More customers. Less busywork. A business that runs itself.',
	subheadline:
		"We build the systems local businesses need to get found online, convert more leads, and free up time — so you can focus on the work you're actually good at.",
	ctaPrimary: 'Book a free strategy call',
	ctaSecondary: 'See how it works',
	ctaPrimaryHref: '#contact',
	ctaSecondaryHref: '#how-it-works',
} as const;

export const servicesSection = {
	eyebrow: 'What we do',
	title: 'Four ways we grow your local business',
} as const;

export type ServiceIconId = 'seo' | 'web' | 'app' | 'ai';

export const services = [
	{
		id: 'local-seo',
		icon: 'seo' as ServiceIconId,
		number: '01',
		title: 'Local SEO',
		tagline: 'Show up when local customers are searching',
		description:
			'Most local businesses are invisible on Google — even when they offer exactly what someone nearby is looking for. We fix that.',
		bullets: [
			'Rank higher on Google Maps and local search results',
			'Get found by customers in your area who are ready to buy',
			'Outrank competitors who have been around longer',
			'Build a consistent online presence across every directory',
		],
	},
	{
		id: 'website',
		icon: 'web' as ServiceIconId,
		number: '02',
		title: 'Website',
		tagline: 'Turn your website into your best salesperson',
		description:
			'Your website should be working for you around the clock — not just sitting there looking pretty.',
		bullets: [
			'Attract more qualified local leads without increasing ad spend',
			'Convert more visitors into booked appointments or paying customers',
			'Look more credible than competitors the moment someone lands on your page',
			'Built for SEO from day one so the right people find you first',
		],
	},
	{
		id: 'web-app',
		icon: 'app' as ServiceIconId,
		number: '03',
		title: 'Web Application',
		tagline: 'Stop doing manually what a system can do automatically',
		description:
			"If your team is spending hours on repetitive tasks, that's time that could go toward serving customers and growing the business.",
		bullets: [
			'Automate the day-to-day tasks that eat up your week',
			'Reduce mistakes and free up hours every single day',
			'Handle more clients without needing to hire more people',
			'Built around how your business actually operates',
		],
	},
	{
		id: 'ai-employees',
		icon: 'ai' as ServiceIconId,
		number: '04',
		title: 'AI Employees',
		tagline: 'Add a team member that never clocks out',
		description:
			'Your best people should focus on your best work — not answering the same questions and chasing the same follow-ups every day.',
		bullets: [
			'Respond to inquiries, book appointments, and follow up with leads automatically',
			'Handle customer questions 24/7 — even outside business hours',
			'Free your team to focus on delivery, not admin',
			'Trained on your business, your tone, and your customers',
		],
	},
] as const;

export const howItWorksSection = {
	eyebrow: 'Our process',
	title: 'Simple, focused on results',
} as const;

export const processSteps = [
	{
		number: '01',
		title: 'Strategy call',
		description:
			'We learn your business, your goals, and where the fastest growth opportunity is right now.',
	},
	{
		number: '02',
		title: 'Build & launch',
		description:
			"We build and deploy your solution — whether that's a Local SEO campaign, a new website, a custom system, or an AI employee.",
	},
	{
		number: '03',
		title: 'Measure & improve',
		description:
			'We track what matters — more calls, more bookings, more time saved — and keep optimizing from there.',
	},
	{
		number: '04',
		title: 'Scale what works',
		description:
			'Once one system is running, we layer in the next. The right foundations make growth compound.',
	},
] as const;

export const projectsSection = {
	eyebrow: 'Our work',
	title: 'Real businesses. Real results.',
} as const;

export const projects = [
	{
		id: 'island-junks',
		name: 'Island Junks',
		industry: 'Boat Rental, Hong Kong',
		service: 'SEO Optimized Website',
		description:
			'A boat rental company in Hong Kong needed more visibility in a competitive tourist market. We built and optimized their website for local and travel search — moving their average Google ranking from position 15 to 11, driving a 12% traffic increase in just the second month.',
		quote: 'From rank 15 to 11 — 12% more traffic in month two.',
		imageKey: 'island-junks' as const,
	},
	{
		id: 'transpolink',
		name: 'Transpolink',
		industry: 'Premium Limousine Service',
		service: 'SEO Optimized Website',
		description:
			'A premium limousine service needed a website that matched the quality of their brand and showed up when high-value clients were searching. We built an SEO-optimized site designed to attract and convert the right customers.',
		imageKey: 'transpolink' as const,
	},
	{
		id: 'lof-hotel',
		name: 'Lof Hotel',
		industry: 'Multi-Location Hotel',
		service: 'Bespoke Web Redesign',
		description:
			'A growing hotel brand needed more than a website refresh — they needed a digital foundation built for expansion. We designed and built a bespoke website that unifies multiple locations under one cohesive brand, ready to scale as they grow.',
		imageKey: 'lof-hotel' as const,
	},
	{
		id: 'whatsorders',
		name: 'WhatsOrders',
		industry: 'Online Ordering Platform for Restaurants',
		service: 'Progressive Web App (PWA)',
		description:
			'Restaurants lose a cut of every order to third-party delivery apps. We built WhatsOrders — a branded PWA that gives restaurants their own online ordering experience, so customers order directly and the restaurant keeps more of every sale.',
		imageKey: 'whatsorder.food' as const,
	},
] as const;

export const ctaBand = {
	headline: 'Ready to get more local customers — without working more hours?',
	button: 'Book your free strategy call',
	href: '#contact',
} as const;

export const contact = {
	eyebrow: 'Get in touch',
	title: 'Book your free strategy call',
	lede: "Tell us about your business and goals. We'll find the fastest path to more customers and less busywork.",
	scheduleEyebrow: 'Schedule a call',
	scheduleTitle: 'Pick a time that works for you',
	scheduleLede:
		"Select a date and time below. We'll connect to discuss your business and how we can help you grow.",
	phoneDisplay: '+853 6275 0705',
	phoneTel: '+85362750705',
	whatsappWa: 'https://wa.me/85362750705',
	email: 'hello@scalingsmb.com',
	location: 'Macau · APAC (Remote worldwide)',
	businessHours: 'Mon – Fri, 9:00 AM – 6:00 PM (HKT)',
	scheduling: {
		meetingTitle: 'Strategy Call',
		duration: '30 min',
		description:
			'A quick intro to understand your goals, timeline, and where we can help you get found, convert more leads, and automate busywork.',
		features: ['30 minutes', 'Google Meet', 'One-on-one'] as const,
		steps: ['Date', 'Time', 'Details'] as const,
		stepTitles: {
			date: 'Select a date',
			time: 'Time zone & time',
			details: 'Your contact details',
		},
		success: {
			title: 'Thank you!',
			message:
				'Your consultation request was submitted successfully. We will be in touch soon to confirm your appointment.',
		},
		timeSlots: [
			'9:00 AM',
			'9:30 AM',
			'10:00 AM',
			'10:30 AM',
			'11:00 AM',
			'2:00 PM',
			'2:30 PM',
			'3:00 PM',
			'3:30 PM',
			'4:00 PM',
		] as const,
		/** Shown in the picker but not bookable */
		blockedTimeSlots: ['9:00 AM', '9:30 AM', '3:30 PM', '4:00 PM'] as const,
		timezones: [
			{ value: 'Asia/Macau', label: 'Hong Kong / Macau (HKT)' },
			{ value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
			{ value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
			{ value: 'Europe/London', label: 'London (GMT/BST)' },
			{ value: 'Asia/Singapore', label: 'Singapore (SGT)' },
		] as const,
	},
} as const;

export const contactFormServiceOptions: string[] = [...services.map((s) => s.title), 'Other'];

export const footer = {
	links: [
		{ label: nav.services, href: '#services' },
		{ label: nav.howItWorks, href: '#how-it-works' },
		{ label: nav.projects, href: '#projects' },
		{ label: blogNav.label, href: '/blog/' },
		{ label: contact.email, href: `mailto:${contact.email}` },
	] as const,
	copyright: '© 2025 Scaling SMB. All rights reserved.',
};

export const seo = {
	title: 'Scaling SMB — Get More Local Customers Without Working More Hours',
	description:
		'Scaling SMB helps small and medium local businesses get found online, automate daily operations, and grow faster — without hiring more staff.',
	/** Default Open Graph / Twitter image (1200×630 recommended) */
	defaultOgImage: '/images/blog/featured/business-growth.svg',
};
