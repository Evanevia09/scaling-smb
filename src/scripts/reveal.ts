const prefersReducedMotion = () =>
	typeof window !== 'undefined' &&
	window.matchMedia &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initReveal(): void {
	if (typeof window === 'undefined' || typeof document === 'undefined') return;

	const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
	if (!nodes.length) return;

	if (prefersReducedMotion()) {
		nodes.forEach((el) => el.classList.add('is-visible'));
		return;
	}

	const io = new IntersectionObserver(
		(entries, observer) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const target = entry.target as HTMLElement;
				target.classList.add('is-visible');
				observer.unobserve(target);
			}
		},
		{ root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
	);

	nodes.forEach((el) => io.observe(el));
}
