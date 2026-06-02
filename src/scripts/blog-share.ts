import {
	getShareUrlForPlatform,
	openShareUrl,
	tryNativeShare,
	type SharePlatform,
	type ShareTargets,
} from '../lib/social-share';

function getShareTargets(root: HTMLElement): ShareTargets | null {
	const url = root.dataset.shareUrl?.trim();
	if (!url) return null;
	return {
		url,
		title: root.dataset.shareTitle?.trim() ?? document.title,
		description: root.dataset.shareDescription?.trim() ?? '',
	};
}

export function initBlogShare(): void {
	const root = document.querySelector<HTMLElement>('[data-blog-share]');
	if (!root) return;

	const targets = getShareTargets(root);

	const copyBtn = root.querySelector<HTMLButtonElement>('[data-copy-link]');
	const label = root.querySelector<HTMLElement>('[data-copy-label]');

	if (targets) {
		root.querySelectorAll<HTMLAnchorElement>('[data-share-link]').forEach((link) => {
			const platform = link.dataset.sharePlatform as SharePlatform | undefined;
			if (!platform) return;

			const refreshHref = () => {
				link.href = getShareUrlForPlatform(targets, platform);
			};
			refreshHref();

			link.addEventListener('click', (e) => {
				e.preventDefault();
				const shareHref = getShareUrlForPlatform(targets, platform);
				link.href = shareHref;
				openShareUrl(shareHref, platform, targets);
			});
		});

		const nativeBtn = root.querySelector<HTMLButtonElement>('[data-native-share]');
		nativeBtn?.addEventListener('click', async () => {
			await tryNativeShare(targets);
		});
	}

	if (!copyBtn || !label || !targets?.url) return;

	copyBtn.addEventListener('click', async () => {
		const original = label.textContent ?? 'Copy link';
		try {
			await navigator.clipboard.writeText(targets.url);
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
