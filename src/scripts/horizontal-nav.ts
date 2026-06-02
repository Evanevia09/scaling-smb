/**
 * Horizontal snap panels on desktop (wheel + mandatory snap + section transitions).
 * Vertical snap on mobile. Smooth hash navigation.
 */
const MQ_DESKTOP = '(min-width: 1024px)';
const SNAP_COOLDOWN_MS = 850;
const WHEEL_THRESHOLD = 40;

function getScroller(): HTMLElement | null {
	return document.querySelector('[data-horizontal-scroll]');
}

function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initHorizontalNav(): void {
	if (typeof window === 'undefined') return;

	const mqDesktop = window.matchMedia(MQ_DESKTOP);
	const scroller = getScroller();
	if (!scroller) return;

	let panels: HTMLElement[] = [];
	let snapLocked = false;
	let wheelAccum = 0;
	let wheelResetTimer: ReturnType<typeof setTimeout> | undefined;

	function refreshPanels(): void {
		panels = Array.from(scroller!.querySelectorAll<HTMLElement>('.snap-panel[id]'));
	}

	function getActiveIndex(): number {
		if (!panels.length) return 0;
		const w = scroller!.clientWidth || 1;
		const idx = Math.round(scroller!.scrollLeft / w);
		return Math.max(0, Math.min(panels.length - 1, idx));
	}

	function scrollToIndex(index: number, behavior: ScrollBehavior = 'smooth'): void {
		const panel = panels[index];
		if (!panel || !scroller) return;

		snapLocked = true;
		scroller.scrollTo({ left: panel.offsetLeft, behavior });

		const release = () => {
			snapLocked = false;
		};

		if ('onscrollend' in scroller) {
			const onEnd = () => {
				scroller.removeEventListener('scrollend', onEnd);
				release();
			};
			scroller.addEventListener('scrollend', onEnd, { once: true });
		}
		window.setTimeout(release, prefersReducedMotion() ? 50 : SNAP_COOLDOWN_MS);
	}

	function snapByDirection(direction: 1 | -1): void {
		if (snapLocked || !mqDesktop.matches) return;
		const next = getActiveIndex() + direction;
		if (next < 0 || next >= panels.length) return;
		scrollToIndex(next);
		const id = panels[next]?.id;
		if (id) {
			const hash = `#${id}`;
			syncNavCurrent(hash);
			history.replaceState(null, '', hash);
		}
	}

	function panelConsumesVerticalWheel(panel: HTMLElement, deltaY: number): boolean {
		if (panel.scrollHeight <= panel.clientHeight + 2) return false;
		const threshold = 4;
		if (deltaY > 0) {
			return panel.scrollTop + panel.clientHeight < panel.scrollHeight - threshold;
		}
		return panel.scrollTop > threshold;
	}

	function bindWheelSnap(): void {
		scroller!.addEventListener(
			'wheel',
			(e) => {
				if (!mqDesktop.matches) return;

				const delta =
					Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
				if (delta === 0) return;

				const active = panels[getActiveIndex()];
				if (active && panelConsumesVerticalWheel(active, delta)) return;

				e.preventDefault();

				if (snapLocked) return;

				wheelAccum += delta;
				clearTimeout(wheelResetTimer);
				wheelResetTimer = window.setTimeout(() => {
					wheelAccum = 0;
				}, 120);

				if (Math.abs(wheelAccum) < WHEEL_THRESHOLD) return;

				const direction: 1 | -1 = wheelAccum > 0 ? 1 : -1;
				wheelAccum = 0;
				snapByDirection(direction);
			},
			{ passive: false },
		);
	}

	function bindKeyboardSnap(): void {
		document.addEventListener('keydown', (e) => {
			if (!mqDesktop.matches) return;
			const t = e.target;
			if (
				t instanceof HTMLInputElement ||
				t instanceof HTMLTextAreaElement ||
				t instanceof HTMLSelectElement ||
				(t instanceof HTMLElement && t.isContentEditable)
			) {
				return;
			}
			if (e.key === 'ArrowRight' || e.key === 'PageDown') {
				e.preventDefault();
				snapByDirection(1);
			} else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
				e.preventDefault();
				snapByDirection(-1);
			}
		});
	}

	function setActivePanel(id: string | null): void {
		panels.forEach((p) => {
			p.classList.toggle('is-active', p.id === id);
		});
	}

	function scrollPanelIntoView(hash: string): boolean {
		const id = hash.replace(/^#/, '');
		const el = id ? document.getElementById(id) : null;
		if (!el || !scroller!.contains(el)) return false;
		const index = panels.indexOf(el);
		if (index >= 0) {
			scrollToIndex(index, prefersReducedMotion() ? 'auto' : 'smooth');
		} else {
			el.scrollIntoView({
				behavior: prefersReducedMotion() ? 'auto' : 'smooth',
				inline: 'start',
				block: 'nearest',
			});
		}
		return true;
	}

	function syncNavCurrent(hash: string): void {
		document.querySelectorAll('[data-nav-link]').forEach((link) => {
			if (!(link instanceof HTMLAnchorElement)) return;
			const h = link.getAttribute('href');
			if (h === hash) link.setAttribute('aria-current', 'page');
			else link.removeAttribute('aria-current');
		});
		setActivePanel(hash.replace(/^#/, '') || null);
	}

	function observePanels(): void {
		if (!panels.length) return;

		const io = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((en) => en.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				if (visible?.target?.id && visible.intersectionRatio >= 0.4) {
					const hash = `#${visible.target.id}`;
					syncNavCurrent(hash);
					if (window.location.hash !== hash) {
						history.replaceState(null, '', hash);
					}
				}
			},
			{ root: null, threshold: [0.25, 0.4, 0.55, 0.7] },
		);

		panels.forEach((p) => io.observe(p));
	}

	function bindHashClicks(): void {
		document.addEventListener('click', (e) => {
			const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
			if (!(a instanceof HTMLAnchorElement)) return;
			const href = a.getAttribute('href');
			if (!href || href === '#') return;

			const id = href.replace(/^#/, '');
			const el = id ? document.getElementById(id) : null;
			if (!el || !scroller!.contains(el)) return;

			e.preventDefault();
			scrollPanelIntoView(href);
			history.pushState(null, '', href);
			syncNavCurrent(href);
		});
	}

	function onLoadHash(): void {
		const hash = window.location.hash;
		if (hash) {
			requestAnimationFrame(() => {
				scrollPanelIntoView(hash);
				syncNavCurrent(hash);
			});
		} else if (panels[0]?.id) {
			syncNavCurrent(`#${panels[0].id}`);
		}
	}

	window.addEventListener('hashchange', () => {
		const h = window.location.hash;
		if (h) {
			scrollPanelIntoView(h);
			syncNavCurrent(h);
		}
	});

	refreshPanels();
	bindWheelSnap();
	bindKeyboardSnap();
	bindHashClicks();
	observePanels();
	onLoadHash();

	mqDesktop.addEventListener('change', () => {
		refreshPanels();
		snapLocked = false;
		wheelAccum = 0;
		if (mqDesktop.matches) {
			onLoadHash();
		} else {
			panels.forEach((p) => p.classList.remove('is-active'));
		}
	});
}
