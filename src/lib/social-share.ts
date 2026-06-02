export type SharePlatform = 'x' | 'facebook' | 'linkedin' | 'whatsapp';

export type ShareTargets = {
	url: string;
	title: string;
	description?: string;
};

function isMobileDevice(): boolean {
	if (typeof navigator === 'undefined') return false;
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function encodeUrlParam(value: string): string {
	return encodeURIComponent(value);
}

/**
 * Build platform share URLs from raw values (never from HTML href — avoids &amp; issues).
 */
export function buildShareUrls({ url, title, description = '' }: ShareTargets): Record<SharePlatform, string> {
	const encodedUrl = encodeUrlParam(url);
	const encodedTitle = encodeUrlParam(title);

	const whatsappText = description
		? `${title}\n\n${description}\n\n${url}`
		: `${title}\n\n${url}`;

	const urls: Record<SharePlatform, string> = {
		x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
		// Facebook reads title/description/image from Open Graph on `url`
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
		// LinkedIn only accepts `url` on desktop — title/summary break the composer
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
		whatsapp: `https://api.whatsapp.com/send?text=${encodeUrlParam(whatsappText)}`,
	};

	return urls;
}

/** Platform URL at click time (mobile LinkedIn gets pre-filled text). */
export function getShareUrlForPlatform(targets: ShareTargets, platform: SharePlatform): string {
	const urls = buildShareUrls(targets);

	if (platform === 'linkedin' && isMobileDevice()) {
		const text = targets.description
			? `${targets.title}\n\n${targets.description}\n\n${targets.url}`
			: `${targets.title}\n\n${targets.url}`;
		return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeUrlParam(text)}`;
	}

	if (platform === 'facebook') {
		return facebookShareUrl(targets.url);
	}

	return urls[platform];
}

function facebookShareUrl(pageUrl: string): string {
	const encoded = encodeUrlParam(pageUrl);
	if (isMobileDevice()) {
		return `https://m.facebook.com/sharer.php?u=${encoded}`;
	}
	return `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
}

/** Open share UI; builds Facebook URL on the client so `u` is always encoded correctly. */
export function openShareUrl(
	shareUrl: string,
	platform: SharePlatform | undefined,
	targets?: ShareTargets,
): void {
	if (typeof window === 'undefined') return;

	let resolved = shareUrl;

	if (platform === 'facebook' && targets?.url) {
		resolved = facebookShareUrl(targets.url);
	} else if (platform === 'facebook') {
		try {
			const parsed = new URL(shareUrl);
			const pageUrl = parsed.searchParams.get('u');
			if (pageUrl) resolved = facebookShareUrl(pageUrl);
		} catch {
			/* keep shareUrl */
		}
	}

	const mobile = isMobileDevice();

	if (mobile) {
		window.location.assign(resolved);
		return;
	}

	const features = 'noopener,noreferrer,width=640,height=720';
	const popup = window.open(resolved, '_blank', features);
	if (!popup) window.location.assign(resolved);
}

export async function tryNativeShare(targets: ShareTargets): Promise<boolean> {
	if (typeof navigator === 'undefined' || !navigator.share) return false;
	try {
		await navigator.share({
			title: targets.title,
			text: targets.description ?? targets.title,
			url: targets.url,
		});
		return true;
	} catch (err) {
		if (err instanceof DOMException && err.name === 'AbortError') return true;
		return false;
	}
}
