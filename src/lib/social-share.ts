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

function resolveShareUrl(shareUrl: string, platform?: SharePlatform): string {
	if (platform === 'facebook' && isMobileDevice()) {
		try {
			const parsed = new URL(shareUrl);
			const target = parsed.searchParams.get('u');
			if (target) return `https://m.facebook.com/sharer.php?u=${target}`;
		} catch {
			/* use original */
		}
	}
	return shareUrl;
}

/** Prefer same-tab on mobile so OS can hand off to native apps (FB, WhatsApp, LinkedIn). */
export function openShareUrl(shareUrl: string, platform?: SharePlatform): void {
	if (typeof window === 'undefined') return;

	const resolved = resolveShareUrl(shareUrl, platform);
	const mobile = isMobileDevice();

	if (mobile) {
		window.location.assign(resolved);
		return;
	}

	const features = 'noopener,noreferrer,width=640,height=720';
	if (platform === 'facebook' || platform === 'linkedin') {
		const popup = window.open(resolved, '_blank', features);
		if (!popup) window.location.assign(resolved);
		return;
	}

	window.open(resolved, '_blank', features);
}

export function buildShareUrls({ url, title, description = '' }: ShareTargets): Record<SharePlatform, string> {
	const encodedUrl = encodeURIComponent(url);
	const encodedTitle = encodeURIComponent(title);
	const encodedSummary = encodeURIComponent(description || title);

	// Single encoded string — required for WhatsApp deep links
	const whatsappMessage = encodeURIComponent(
		description ? `${title}\n\n${description}\n\n${url}` : `${title}\n\n${url}`,
	);

	return {
		x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
		// shareArticle opens the LinkedIn app on mobile more reliably than share-offsite
		linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`,
		whatsapp: `https://api.whatsapp.com/send?text=${whatsappMessage}`,
	};
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
