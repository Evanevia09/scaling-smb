/**
 * Vertical landing page: hash navigation + active nav link on scroll.
 */
export function initSectionNav(): void {
	if (typeof window === 'undefined') return;

	const sections = Array.from(
		document.querySelectorAll<HTMLElement>('main [id]'),
	).filter((el) => el.tagName === 'SECTION');

	if (!sections.length) return;

	function syncNavCurrent(hash: string): void {
		document.querySelectorAll('[data-nav-link]').forEach((link) => {
			if (!(link instanceof HTMLAnchorElement)) return;
			const h = link.getAttribute('href');
			if (h === hash) link.setAttribute('aria-current', 'page');
			else link.removeAttribute('aria-current');
		});
	}

	function scrollToSection(hash: string): void {
		const id = hash.replace(/^#/, '');
		const el = id ? document.getElementById(id) : null;
		if (!el) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
	}

	const io = new IntersectionObserver(
		(entries) => {
			const visible = entries
				.filter((en) => en.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (visible?.target?.id && visible.intersectionRatio >= 0.35) {
				const hash = `#${visible.target.id}`;
				syncNavCurrent(hash);
				if (window.location.hash !== hash) {
					history.replaceState(null, '', hash);
				}
			}
		},
		{ root: null, rootMargin: '-20% 0px -55% 0px', threshold: [0.2, 0.35, 0.5] },
	);

	sections.forEach((s) => io.observe(s));

	document.addEventListener('click', (e) => {
		const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
		if (!(a instanceof HTMLAnchorElement)) return;
		const href = a.getAttribute('href');
		if (!href || href === '#') return;
		const id = href.replace(/^#/, '');
		if (!document.getElementById(id)) return;
		e.preventDefault();
		scrollToSection(href);
		history.pushState(null, '', href);
		syncNavCurrent(href);
	});

	const hash = window.location.hash;
	if (hash && document.getElementById(hash.replace(/^#/, ''))) {
		requestAnimationFrame(() => {
			scrollToSection(hash);
			syncNavCurrent(hash);
		});
	} else if (sections[0]?.id) {
		syncNavCurrent(`#${sections[0].id}`);
	}

	window.addEventListener('hashchange', () => {
		const h = window.location.hash;
		if (h) {
			scrollToSection(h);
			syncNavCurrent(h);
		}
	});
}
