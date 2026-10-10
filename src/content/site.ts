export const brand = {
	name: 'Scaling SMB',
	tagline: 'The runway AI actually lands on',
};

export const nav = {
	services: 'Services',
	howItWorks: 'How It Works',
	projects: 'Work',
	contact: 'Contact',
	cta: 'Start a build',
	openMenu: 'Open menu',
	closeMenu: 'Close menu',
} as const;

export const blogNav = {
	label: 'Blog',
} as const;

export const blogIndex = {
	eyebrow: 'Insights',
	title: 'Notes from inside the build',
	lede: 'Practical writing on AI platforms, websites, local growth, and the systems that have to exist before agents can do useful work.',
	description:
		'Scaling SMB blog: forward deployed engineering, AI agents, local SEO, websites, and the operational runway companies need before AI can land.',
} as const;

export const hero = {
	tagline: brand.tagline,
	headline: 'Before AI can fly, you need a runway.',
	subheadline:
		'We work inside your business to build the data, systems, and workflows AI agents land on — then put those agents to work alongside your team.',
	ctaPrimary: 'Start a build',
	ctaSecondary: 'See how we build the runway',
	ctaPrimaryHref: '#contact',
	ctaSecondaryHref: '#how-it-works',
} as const;

export const storySection = {
	eyebrow: 'Why most AI pilots fail',
	title: 'A model without a runway never leaves the ground.',
	lede: 'Most companies do not have an AI problem. They have a landing problem: messy data, tribal processes, and no one inside the business building the platform agents need.',
	points: [
		{
			title: 'Tools get dropped on chaos',
			description:
				'Chatbots and copilots get bolted onto inboxes, spreadsheets, and half-connected software. Nothing underneath is ready, so the pilot stalls.',
		},
		{
			title: 'Nobody owns the platform',
			description:
				'Vendors demo. Agencies slide-deck. Internal teams stay busy. The data, systems, and workflows that would make AI useful never get built.',
		},
		{
			title: 'Agents have nowhere to land',
			description:
				'An agent can only act on what it can see and trust. Without a runway, it guesses, hallucinates, or waits for a human to finish the job.',
		},
	],
} as const;

export const servicesSection = {
	eyebrow: 'What we build',
	title: 'The runway first. Then the aircraft.',
	lede: 'Forward deployed engineering is the flagship. Websites, portals, local search, and Google Ads are how customers find you and how work moves once agents are in the air.',
} as const;

export type ServiceIconId = 'seo' | 'web' | 'app' | 'ai' | 'ads';

export type Service = {
	id: string;
	icon: ServiceIconId;
	number: string;
	title: string;
	tagline: string;
	description: string;
	bullets: readonly string[];
	href?: string;
	featured?: boolean;
};

export const featuredService: Service = {
	id: 'forward-deployed-engineering',
	icon: 'ai',
	number: '01',
	title: 'Forward Deployed Engineering',
	tagline: 'We embed inside your company and build the platform AI needs',
	description:
		'Evan works as a forward deployed engineer inside your business — not from a deck. We connect the data, stand up the systems, and design the workflows AI agents land on. Then we launch those agents to work alongside your team.',
	bullets: [
		'Work inside your company, on your real systems and constraints',
		'Connect the data and tools agents need before they can act',
		'Design workflows and guardrails your team can actually trust',
		'Launch AI agents that take off on that runway — not in a vacuum',
	],
	href: '/services/forward-deployed-engineering/',
	featured: true,
};

export const secondaryServices: Service[] = [
	{
		id: 'website',
		icon: 'web',
		number: '02',
		title: 'Websites',
		tagline: 'A site that sells while the platform gets built',
		description:
			'Your website should convert visitors around the clock — and sit on the same foundation the rest of the runway uses.',
		bullets: [
			'Convert more visitors into booked work',
			'Look more credible than competitors on first landing',
		],
	},
	{
		id: 'web-app',
		icon: 'app',
		number: '03',
		title: 'Web Apps / Portals',
		tagline: 'The systems your team and agents both use',
		description:
			'Portals, internal tools, and customer apps that replace the manual glue — and give agents a place to work.',
		bullets: [
			'Automate the repeatable work that eats the week',
			'Handle more clients without hiring a new layer of admin',
		],
	},
	{
		id: 'local-seo',
		icon: 'seo',
		number: '04',
		title: 'Local SEO',
		tagline: 'Show up when nearby customers are ready',
		description:
			'Get found on Google Maps and local search so the runway is carrying real demand, not just internal automation.',
		bullets: [
			'Rank where local buyers are already searching',
			'Build a consistent presence across the directories that matter',
		],
	},
	{
		id: 'google-ads',
		icon: 'ads',
		number: '05',
		title: 'Google Ads',
		tagline: 'Demand on day one — watched like it is our budget',
		description:
			'Adz is the Google Ads agent that monitors, optimizes, and reports every day. No agency bloat. No monthly recap that arrives too late.',
		bullets: [
			'Show up the moment someone searches for what you sell',
			'Daily monitoring instead of a monthly slide',
		],
		href: '/services/google-ads/',
	},
];

export const services: Service[] = [featuredService, ...secondaryServices];

export const howItWorksSection = {
	eyebrow: 'Our process',
	title: 'How we build the runway',
} as const;

export const processSteps = [
	{
		number: '01',
		title: 'Connect your data and systems',
		description:
			'We map how work actually moves — CRMs, inboxes, ops tools, spreadsheets — and wire the sources agents will need to see.',
	},
	{
		number: '02',
		title: 'Set up workflows and guardrails',
		description:
			'We turn tribal process into explicit workflows, with the approvals, tone, and limits your team is willing to trust.',
	},
	{
		number: '03',
		title: 'Launch the agents',
		description:
			'Once the runway is down, we put agents on it: lead response, booking, follow-up, ads, ops — working next to your people.',
	},
	{
		number: '04',
		title: 'Keep improving',
		description:
			'We measure what landed, tighten the workflows, and add the next agent. The platform compounds instead of resetting every quarter.',
	},
] as const;

export const projectsSection = {
	eyebrow: 'Our work',
	title: 'Built inside real businesses.',
	lede: 'Websites, portals, and systems we have already shipped — the kind of operational surface AI can later land on.',
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

export const adzProduct = {
	eyebrow: 'Also in the hangar',
	name: 'Adz',
	title: 'Adz — the Google Ads agent',
	description:
		'An AI agent that watches your Google ads like its own money is on the line. Daily monitoring, weekly optimization, no percentage of spend.',
	href: '/services/google-ads/',
	cta: 'See Adz',
} as const;

export const ctaBand = {
	headline: 'Ready to build the runway AI can actually land on?',
	button: 'Start a build',
	href: '#contact',
} as const;

export const contact = {
	eyebrow: 'Get in touch',
	title: 'Start a build',
	lede: 'Tell us how the business runs today. We will map the runway — data, systems, workflows — and the first agents to put on it.',
	scheduleEyebrow: 'Book a session',
	scheduleTitle: 'Pick a time that works for you',
	scheduleLede:
		'Select a date and time. We will talk through where AI is stalling and what to build first inside your company.',
	phoneDisplay: '+853 6275 0705',
	phoneTel: '+85362750705',
	whatsappWa: 'https://wa.me/85362750705',
	email: 'scalingsmb@gmail.com',
	location: 'Macau · APAC (Remote worldwide)',
	businessHours: 'Mon – Fri, 9:00 AM – 6:00 PM (HKT)',
	scheduling: {
		meetingTitle: 'Build session',
		duration: '30 min',
		description:
			'A working conversation to understand your systems, where AI should land, and how we embed to build the runway.',
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
				'Your request was submitted successfully. We will be in touch soon to confirm your appointment.',
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
	copyright: '© 2026 Scaling SMB. All rights reserved.',
};

export const seo = {
	title: 'Scaling SMB — Before AI can fly, you need a runway',
	description:
		'Forward deployed engineering for companies ready for AI. We work inside your business to build the data, systems, and workflows AI agents land on — then put them to work alongside your team.',
	/** Default Open Graph / Twitter image (1200×630 recommended) */
	defaultOgImage: '/images/blog/featured/business-growth.svg',
};

export const fdePage = {
	title: 'Forward Deployed Engineering — Scaling SMB',
	description:
		'Before AI can fly, you need a runway. Scaling SMB embeds a forward deployed engineer inside your company to build the data, systems, and workflows AI agents land on.',
	eyebrow: 'Forward Deployed Engineering',
	headline: 'Before AI can fly, you need a runway.',
	lede: 'We do not drop a chatbot on your inbox and call it transformation. Evan works inside your company as a forward deployed engineer — building the platform AI can actually use, then launching agents that work with your team.',
	cta: 'Start a build',
	ctaHref: '#book',
	problem: {
		eyebrow: 'The stall',
		title: 'Why AI pilots fail in good companies',
		lede: 'The model is rarely the bottleneck. The company is missing a landing strip: connected data, explicit workflows, and someone who will build both from the inside.',
		points: [
			{
				title: 'The demo never survives contact with operations',
				description:
					'A vendor shows a perfect sandbox. Your business has five tools that do not talk, a spreadsheet that is the real CRM, and a process that lives in one person’s head.',
			},
			{
				title: 'There is no owner on the ground',
				description:
					'Strategy decks do not connect APIs. Generic implementers leave after kickoff. Someone has to sit with your team, learn the exceptions, and build the platform in place.',
			},
			{
				title: 'Agents cannot act on folklore',
				description:
					'If pricing, handoffs, and follow-up rules are tribal knowledge, an agent has nothing reliable to land on. It either guesses or escalates everything.',
			},
		],
	},
	inside: {
		eyebrow: 'How we work',
		title: 'A forward deployed engineer, inside the company',
		lede: 'FDE is not a workshop series. It is an engineer embedded with your operators — shipping the runway in the same tools your team already uses.',
		points: [
			{
				title: 'On your systems',
				description:
					'We work in your CRM, inbox, booking stack, ads account, and internal tools. The platform is yours. We do not ask you to move house first.',
			},
			{
				title: 'On your workflows',
				description:
					'We sit with the people who actually close, book, and deliver. Then we turn that into workflows and guardrails an agent can follow — and a human can override.',
			},
			{
				title: 'On your timeline',
				description:
					'First we make the landing strip real. Then we put one agent on it. Then we improve. No 18-month transformation program before anything flies.',
			},
		],
	},
	runway: {
		eyebrow: 'The runway',
		title: 'Data, systems, and workflows — then agents',
		items: [
			{
				title: 'Data',
				description:
					'The records, events, and context an agent must see: customers, jobs, inventory, spend, conversations. Clean enough to act. Owned by you.',
			},
			{
				title: 'Systems',
				description:
					'The software already running the business, connected so work can move without a person copying fields between tabs.',
			},
			{
				title: 'Workflows',
				description:
					'The path from inbound to done — with the rules, tone, and approvals your team will actually stand behind.',
			},
			{
				title: 'Agents',
				description:
					'What takes off once the runway exists: lead response, booking, follow-up, ads, ops. They work alongside people, not instead of a plan.',
			},
		],
	},
	agents: {
		eyebrow: 'What takes off',
		title: 'Agents land on the runway. They do not replace it.',
		lede: 'AI employees are not a separate product. They are what we launch after the platform is real — trained on your business, your tone, and your constraints.',
		items: [
			'Respond to inquiries and book the next step after hours',
			'Follow up with leads so the good ones do not go cold',
			'Watch paid demand (see Adz) like someone whose own money is on the line',
			'Handle the repeatable ops your best people should not be doing',
		],
	},
	examples: {
		eyebrow: 'On the ground',
		title: 'The same idea, in businesses you can already see',
		lede: 'The public work below is the operational surface — sites, portals, foundations. That is the kind of ground agents need. We do not invent a new product line to tell the story.',
		items: [
			{
				name: 'Island Junks',
				detail: 'A boat rental company that needed to get found. The site and search work came first; demand has to hit a surface that can convert.',
			},
			{
				name: 'Transpolink',
				detail: 'A premium limousine service whose site had to match the brand and show up for high-value search. Credibility is part of the runway.',
			},
			{
				name: 'Lof Hotel',
				detail: 'A multi-location hotel brand that needed one digital foundation instead of a one-off refresh — the surface a group can keep growing on.',
			},
			{
				name: 'WhatsOrders',
				detail: 'A restaurant ordering portal so operators keep the customer relationship instead of renting it from a marketplace.',
			},
		],
		hotelNote:
			'When we talk about hotel work in general, we mean a multi-property hotel group that needs shared systems and workflows — not a new brand name on a slide.',
	},
	book: {
		eyebrow: 'Start here',
		title: 'Book a build session',
		lede: 'One conversation. We will look at where work actually happens, what is missing for AI to land, and whether an embed is the right next step.',
	},
} as const;

export const notFound = {
	title: 'Page not found — Scaling SMB',
	description: 'This page does not exist. Head home or start a build with Scaling SMB.',
	eyebrow: '404',
	headline: 'This page never got a runway.',
	lede: 'The URL you asked for is not here. Go back to the homepage, or book a session and we will build from the ground up.',
	home: 'Back home',
	cta: 'Start a build',
} as const;
