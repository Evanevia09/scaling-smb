export function initBlogShare(): void {
	const root = document.querySelector<HTMLElement>('[data-blog-share]');
	if (!root) return;

	const copyBtn = root.querySelector<HTMLButtonElement>('[data-copy-link]');
	const label = root.querySelector<HTMLElement>('[data-copy-label]');
	const url = root.dataset.shareUrl;

	if (!copyBtn || !label || !url) return;

	copyBtn.addEventListener('click', async () => {
		const original = label.textContent ?? 'Copy link';
		try {
			await navigator.clipboard.writeText(url);
			label.textContent = 'Copied!';
			copyBtn.setAttribute('aria-label', 'Link copied to clipboard');
			window.setTimeout(() => {
				label.textContent = original;
				copyBtn.setAttribute('aria-label', 'Copy link to clipboard');
			}, 2000);
		} catch {
			label.textContent = 'Copy failed';
			window.setTimeout(() => {
				label.textContent = original;
			}, 2000);
		}
	});
}
