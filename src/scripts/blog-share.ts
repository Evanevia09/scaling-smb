import { openShareUrl, tryNativeShare, type SharePlatform } from '../lib/social-share';

export function initBlogShare(): void {
	const root = document.querySelector<HTMLElement>('[data-blog-share]');
	if (!root) return;

	const copyBtn = root.querySelector<HTMLButtonElement>('[data-copy-link]');
	const label = root.querySelector<HTMLElement>('[data-copy-label]');
	const url = root.dataset.shareUrl;
	const title = root.dataset.shareTitle ?? document.title;
	const description = root.dataset.shareDescription ?? '';

	if (url) {
		root.querySelectorAll<HTMLAnchorElement>('[data-share-link]').forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const href = link.getAttribute('href');
				if (!href) return;
				const platform = link.dataset.sharePlatform as SharePlatform | undefined;
				openShareUrl(href, platform);
			});
		});

		const nativeBtn = root.querySelector<HTMLButtonElement>('[data-native-share]');
		nativeBtn?.addEventListener('click', async () => {
			const shared = await tryNativeShare({ url, title, description });
			if (!shared && nativeBtn) {
				nativeBtn.setAttribute('aria-disabled', 'true');
			}
		});
	}

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
