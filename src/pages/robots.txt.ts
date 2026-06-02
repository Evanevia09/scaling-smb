import type { APIRoute } from 'astro';

const DISALLOW = ['/api/'];

export const GET: APIRoute = ({ site }) => {
	const sitemapUrl = new URL('sitemap-index.xml', site);
	const lines = [
		'User-agent: *',
		'Allow: /',
		...DISALLOW.map((path) => `Disallow: ${path}`),
		'',
		`Sitemap: ${sitemapUrl.href}`,
	];

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
