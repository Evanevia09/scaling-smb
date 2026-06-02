import type { BlogPost } from './blog';
import {
	getFeaturedImageOgUrl,
	getPostCanonicalUrl,
	postHref,
	slugifyCategory,
} from './blog';
import { brand, contact, seo as seoDefaults, services } from '../content/site';

export function getSiteOrigin(site: URL | string | undefined): string {
	const base = site ?? 'https://scaling-smb.pages.dev';
	return typeof base === 'string' ? base.replace(/\/$/, '') : base.origin;
}

export function absoluteUrl(path: string, site: URL | string | undefined): string {
	return new URL(path.startsWith('/') ? path : `/${path}`, `${getSiteOrigin(site)}/`).href;
}

export function organizationJsonLd(site: URL | string | undefined) {
	const origin = getSiteOrigin(site);
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${origin}/#organization`,
		name: brand.name,
		url: `${origin}/`,
		email: contact.email,
		telephone: contact.phoneTel,
		description: seoDefaults.description,
		logo: {
			'@type': 'ImageObject',
			url: absoluteUrl('/favicon.ico', site),
		},
	};
}

export function webSiteJsonLd(site: URL | string | undefined) {
	const origin = getSiteOrigin(site);
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${origin}/#website`,
		url: `${origin}/`,
		name: brand.name,
		description: seoDefaults.description,
		publisher: { '@id': `${origin}/#organization` },
		inLanguage: 'en',
	};
}

export function professionalServiceJsonLd(site: URL | string | undefined) {
	const origin = getSiteOrigin(site);
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': `${origin}/#business`,
		name: brand.name,
		url: `${origin}/`,
		description: seoDefaults.description,
		email: contact.email,
		telephone: contact.phoneTel,
		areaServed: ['Macau', 'Hong Kong', 'Singapore', 'Asia-Pacific'],
		serviceType: services.map((s) => s.title),
		priceRange: '$$',
	};
}

export function blogPostingJsonLd(
	post: BlogPost,
	site: URL | string | undefined,
) {
	const canonicalUrl = getPostCanonicalUrl(post.id, site);
	const image = getFeaturedImageOgUrl(post, site);
	const { title, description, pubDate, updatedDate, category, tags } = post.data;
	const origin = getSiteOrigin(site);

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'@id': `${canonicalUrl}#article`,
		headline: title,
		description,
		url: canonicalUrl,
		datePublished: pubDate.toISOString(),
		...(updatedDate && { dateModified: updatedDate.toISOString() }),
		inLanguage: 'en',
		articleSection: category,
		keywords: tags?.length ? tags.join(', ') : undefined,
		image: [image],
		mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
		author: { '@type': 'Organization', '@id': `${origin}/#organization`, name: brand.name },
		publisher: {
			'@type': 'Organization',
			'@id': `${origin}/#organization`,
			name: brand.name,
			logo: {
				'@type': 'ImageObject',
				url: absoluteUrl('/favicon.ico', site),
			},
		},
	};
}

export function breadcrumbJsonLd(
	items: Array<{ name: string; path: string }>,
	site: URL | string | undefined,
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path, site),
		})),
	};
}

export function blogPostBreadcrumbs(post: BlogPost, site: URL | string | undefined) {
	return breadcrumbJsonLd(
		[
			{ name: 'Home', path: '/' },
			{ name: 'Blog', path: '/blog/' },
			{ name: post.data.category, path: `/blog/category/${slugifyCategory(post.data.category)}/` },
			{ name: post.data.title, path: postHref(post.id) },
		],
		site,
	);
}

export function collectionPageJsonLd(
	opts: { name: string; description: string; path: string },
	site: URL | string | undefined,
) {
	const url = absoluteUrl(opts.path, site);
	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		'@id': `${url}#webpage`,
		name: opts.name,
		description: opts.description,
		url,
		isPartOf: { '@id': `${getSiteOrigin(site)}/#website` },
		inLanguage: 'en',
	};
}
