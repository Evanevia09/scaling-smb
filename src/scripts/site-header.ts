/**
 * Mobile drawer navigation for the site header.
 */
const MQ_MOBILE = '(max-width: 767.98px)';

export function initSiteHeader(): void {
	if (typeof window === 'undefined') return;

	const mq = window.matchMedia(MQ_MOBILE);
	const header = document.querySelector<HTMLElement>('.site-header');
	const btn = document.querySelector<HTMLButtonElement>('.site-header__menu-btn');
	const drawer = document.querySelector<HTMLElement>('[data-site-header-drawer]');
	const backdrop = document.querySelector<HTMLButtonElement>('[data-site-header-backdrop]');

	if (!header || !btn || !drawer || !backdrop) return;

	const openLabel =
		header.getAttribute('data-menu-open-label') ||
		btn.getAttribute('aria-label') ||
		'Open menu';
	const closeLabel = header.getAttribute('data-menu-close-label') || 'Close menu';

	function isMobile(): boolean {
		return mq.matches;
	}

	function setDrawerHidden(hidden: boolean): void {
		drawer.setAttribute('aria-hidden', hidden ? 'true' : 'false');
		if ('inert' in drawer) {
			(drawer as HTMLElement & { inert: boolean }).inert = hidden;
		}
	}

	function setOpenMobile(open: boolean): void {
		header.classList.toggle('site-header--open', open);
		btn.setAttribute('aria-expanded', open ? 'true' : 'false');
		btn.setAttribute('aria-label', open ? closeLabel : openLabel);
		backdrop.hidden = !open;
		backdrop.tabIndex = open ? 0 : -1;
		document.documentElement.classList.toggle('site-header-nav-open', open);
		document.body.classList.toggle('site-header-nav-open', open);
		setDrawerHidden(!open);
	}

	function close(): void {
		setOpenMobile(false);
		btn.focus();
	}

	function resetForViewport(): void {
		if (!isMobile()) {
			setOpenMobile(false);
			setDrawerHidden(true);
		}
	}

	btn.addEventListener('click', () => {
		if (!isMobile()) return;
		const next = btn.getAttribute('aria-expanded') !== 'true';
		setOpenMobile(next);
		if (next) {
			const first = drawer.querySelector<HTMLElement>('a[href]');
			first?.focus();
		}
	});

	backdrop.addEventListener('click', () => {
		if (isMobile()) close();
	});

	drawer.addEventListener('click', (e) => {
		const target = e.target;
		if (target instanceof Element && target.closest('a[href^="#"]')) {
			close();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && header.classList.contains('site-header--open')) {
			close();
		}
	});

	mq.addEventListener('change', resetForViewport);
	setDrawerHidden(true);
	resetForViewport();
}
