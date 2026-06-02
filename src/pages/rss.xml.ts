import type { APIRoute } from 'astro';
import { getPublishedPosts, getPostCanonicalUrl } from '../lib/blog';
import { blogIndex, brand } from '../content/site';
import { getSiteOrigin } from '../lib/seo';

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export const GET: APIRoute = async ({ site }) => {
	const origin = getSiteOrigin(site);
	const posts = await getPublishedPosts();

	const items = posts
		.map((post) => {
			const link = getPostCanonicalUrl(post.id, site);
			return `<item>
<title>${escapeXml(post.data.title)}</title>
<link>${escapeXml(link)}</link>
<guid isPermaLink="true">${escapeXml(link)}</guid>
<description>${escapeXml(post.data.description)}</description>
<pubDate>${post.data.pubDate.toUTCString()}</pubDate>
</item>`;
		})
		.join('\n');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escapeXml(`${brand.name} Blog`)}</title>
<link>${escapeXml(`${origin}/blog/`)}</link>
<description>${escapeXml(blogIndex.description)}</description>
<language>en</language>
${items}
</channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
		},
	});
};
