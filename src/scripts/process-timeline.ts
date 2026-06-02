/**
 * Process timeline:
 * - Desktop: scroll-track + sticky container scrollytelling (natural scroll).
 * - Mobile: vertical timeline follows page scroll.
 */
export function initProcessTimeline(): void {
	if (typeof window === 'undefined') return;

	const scrollTrack = document.querySelector<HTMLElement>('[data-process-scroll-track]');
	const root = document.querySelector<HTMLElement>('[data-process-timeline]');

	if (!scrollTrack || !root) return;

	const progressEl = root.querySelector<HTMLElement>('.process-timeline__progress');
	const track = root.querySelector<HTMLElement>('.process-timeline__track');
	const steps = Array.from(root.querySelectorAll<HTMLElement>('.process-timeline__step'));

	if (!progressEl || !track || !steps.length) return;

	const stepCount = steps.length;
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const desktopMq = window.matchMedia('(min-width: 900px)');

	let scrollRaf: number | null = null;
	let onScroll: (() => void) | null = null;
	let onResize: (() => void) | null = null;

	const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

	/** Progress 0→1 while the scroll track moves through the viewport (sticky top: 0). */
	const getScrollTrackProgress = (): number => {
		const scrollable = scrollTrack.offsetHeight - window.innerHeight;
		if (scrollable <= 1) return 0;
		const top = scrollTrack.getBoundingClientRect().top;
		return clamp01(-top / scrollable);
	};

	const stepLocalProgress = (globalProgress: number, index: number): number => {
		const segment = 1 / stepCount;
		const start = index * segment;
		return clamp01((globalProgress - start) / segment);
	};

	const applyDesktopProgress = (globalProgress: number) => {
		progressEl.style.height = '3px';
		progressEl.style.width = '';
		root.classList.toggle('is-active', globalProgress > 0.02);
		scrollTrack.style.setProperty('--process-progress', String(globalProgress));
		root.style.setProperty('--process-progress', String(globalProgress));

		steps.forEach((step, i) => {
			const local = stepLocalProgress(globalProgress, i);
			step.style.setProperty('--step-progress', String(local));

			const revealed = local >= 0.9;
			const visible = local > 0.05;
			step.classList.toggle('is-reached', revealed);
			step.classList.toggle('is-visible', visible);
			step.classList.toggle('is-current', visible && !revealed);
		});
	};

	const getDotCenterY = (step: HTMLElement, rootTop: number): number => {
		const dot = step.querySelector<HTMLElement>('.process-timeline__dot');
		if (!dot) return 0;
		const rect = dot.getBoundingClientRect();
		return rect.top + rect.height / 2 - rootTop;
	};

	const layoutMobileTrack = () => {
		const rootRect = root.getBoundingClientRect();
		const firstCenter = getDotCenterY(steps[0], rootRect.top);
		const lastCenter = getDotCenterY(steps[steps.length - 1], rootRect.top);
		const trackHeight = Math.max(0, lastCenter - firstCenter);

		track.style.top = `${firstCenter}px`;
		track.style.bottom = 'auto';
		track.style.height = `${trackHeight}px`;
	};

	const updateMobileProgress = () => {
		const rootRect = root.getBoundingClientRect();
		layoutMobileTrack();
		const trackTop = parseFloat(track.style.top) || 0;
		const trackHeight = parseFloat(track.style.height) || 0;
		if (trackHeight <= 0) return;

		const trackEnd = trackTop + trackHeight;
		const anchorInRoot = window.innerHeight * 0.42 - rootRect.top;
		const progressEnd = Math.min(Math.max(anchorInRoot, trackTop), trackEnd);
		const pct = ((progressEnd - trackTop) / trackHeight) * 100;

		progressEl.style.height = `${clamp01(pct / 100) * 100}%`;
		progressEl.style.width = '';
		root.classList.toggle('is-active', pct > 0.5);

		steps.forEach((step) => {
			const dotCenter = getDotCenterY(step, rootRect.top);
			const reached = anchorInRoot >= dotCenter - 2;
			step.classList.toggle('is-reached', reached);
			step.classList.toggle('is-visible', reached);
		});
	};

	const updateDesktopProgress = () => {
		applyDesktopProgress(getScrollTrackProgress());
	};

	const scheduleUpdate = (fn: () => void) => {
		if (scrollRaf !== null) return;
		scrollRaf = requestAnimationFrame(() => {
			scrollRaf = null;
			fn();
		});
	};

	const unbind = () => {
		if (scrollRaf !== null) {
			cancelAnimationFrame(scrollRaf);
			scrollRaf = null;
		}
		if (onScroll) {
			window.removeEventListener('scroll', onScroll);
			onScroll = null;
		}
		if (onResize) {
			window.removeEventListener('resize', onResize);
			onResize = null;
		}
		track.style.top = '';
		track.style.height = '';
		track.style.bottom = '';
		progressEl.style.width = '';
		progressEl.style.height = '';
		root.classList.remove('is-active');
		scrollTrack.style.removeProperty('--process-progress');
		root.style.removeProperty('--process-progress');
		steps.forEach((step) => {
			step.style.removeProperty('--step-progress');
			step.classList.remove('is-reached', 'is-visible', 'is-current');
		});
	};

	const bindMobile = () => {
		unbind();
		root.classList.remove('process-timeline--scrolly');
		onScroll = () => scheduleUpdate(updateMobileProgress);
		onResize = onScroll;
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });
		scheduleUpdate(updateMobileProgress);
	};

	const bindDesktop = () => {
		unbind();
		root.classList.add('process-timeline--scrolly');
		track.style.top = '';
		track.style.height = '';
		track.style.bottom = '';
		onScroll = () => scheduleUpdate(updateDesktopProgress);
		onResize = onScroll;
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });
		scheduleUpdate(updateDesktopProgress);
	};

	const applyMode = () => {
		if (reduced) {
			unbind();
			root.classList.remove('process-timeline--scrolly');
			progressEl.style.height = '';
			progressEl.style.width = '100%';
			root.classList.add('is-active');
			steps.forEach((s) => {
				s.style.setProperty('--step-progress', '1');
				s.classList.add('is-reached', 'is-visible');
			});
			return;
		}

		if (desktopMq.matches) {
			bindDesktop();
		} else {
			bindMobile();
		}
	};

	applyMode();
	desktopMq.addEventListener('change', applyMode);
}
