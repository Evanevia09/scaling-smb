/**
 * Crossfade section background to match the topmost sticky service card.
 */
export function initServicesBackground(): void {
	if (typeof window === 'undefined') return;

	const section = document.querySelector<HTMLElement>('[data-services-section]');
	if (!section) return;

	const layers = Array.from(
		section.querySelectorAll<HTMLElement>('[data-service-bg]'),
	);
	const cards = Array.from(
		section.querySelectorAll<HTMLElement>('[data-service-index]'),
	);

	if (!layers.length || !cards.length) return;

	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const setActive = (index: number) => {
		const clamped = Math.max(0, Math.min(index, layers.length - 1));
		if (section.dataset.activeService === String(clamped)) return;

		section.dataset.activeService = String(clamped);
		layers.forEach((layer, i) => {
			layer.classList.toggle('is-active', i === clamped);
		});
	};

	const getStickyAnchor = () => {
		const firstTop = parseFloat(getComputedStyle(cards[0]).top);
		return Number.isFinite(firstTop) ? firstTop : 0;
	};

	const getActiveFromSticky = () => {
		const anchor = getStickyAnchor();
		let active = 0;
		for (let i = 0; i < cards.length; i++) {
			if (cards[i].getBoundingClientRect().top <= anchor + 12) {
				active = i;
			}
		}
		return active;
	};

	const getActiveFromScroll = () => {
		const rect = section.getBoundingClientRect();
		const vh = window.innerHeight;
		const scrollable = Math.max(rect.height - vh, 1);
		const traveled = Math.min(Math.max(-rect.top, 0), scrollable);
		const progress = traveled / scrollable;
		return Math.min(
			layers.length - 1,
			Math.floor(progress * layers.length),
		);
	};

	const updateActive = () => {
		if (reduced) {
			setActive(0);
			return;
		}

		const rect = section.getBoundingClientRect();
		const inView = rect.top < window.innerHeight && rect.bottom > 0;
		if (!inView) return;

		const stickyActive = getActiveFromSticky();
		const scrollActive = getActiveFromScroll();
		setActive(Math.max(stickyActive, scrollActive));
	};

	let ticking = false;
	const onScroll = () => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			updateActive();
			ticking = false;
		});
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
	updateActive();
}
