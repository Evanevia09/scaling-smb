/**
 * Activates the process timeline animations when the section enters the viewport.
 */
export function initProcessTimeline(): void {
	if (typeof window === 'undefined') return;

	const root = document.querySelector<HTMLElement>('[data-process-timeline]');
	if (!root) return;

	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const activate = () => {
		root.classList.add('is-active');
		root.querySelectorAll<HTMLElement>('.process-timeline__step').forEach((step, i) => {
			window.setTimeout(
				() => step.classList.add('is-visible'),
				reduced ? 0 : 120 + i * 140,
			);
		});
	};

	if (reduced) {
		activate();
		return;
	}

	const io = new IntersectionObserver(
		(entries) => {
			if (entries.some((e) => e.isIntersecting)) {
				activate();
				io.disconnect();
			}
		},
		{ root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.15 },
	);

	io.observe(root);
}
