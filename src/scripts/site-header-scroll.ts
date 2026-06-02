/** Add backdrop to fixed header after scrolling past the hero. */
export function initSiteHeaderScroll(): void {
	if (typeof window === 'undefined') return;

	const header = document.querySelector<HTMLElement>('.site-header');
	if (!header) return;

	const onScroll = () => {
		header.classList.toggle('site-header--scrolled', window.scrollY > 24);
	};

	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });
}
