import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export const LANDING_CTA = {
	headline: 'Ready to grow your local business?',
	button: 'Book your free strategy call',
	href: '/#contact',
} as const;

function isPublished(data: { draft?: boolean }): boolean {
	return data.draft !== true;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
	const posts = await getCollection('blog', ({ data }) => isPublished(data));
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function slugifyCategory(category: string): string {
	return category
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-');
}

export function getCategories(posts: BlogPost[]): string[] {
	const set = new Set(posts.map((p) => p.data.category));
	return [...set].sort((a, b) => a.localeCompare(b));
}

export function filterByCategory(posts: BlogPost[], categorySlug: string): BlogPost[] {
	return posts.filter((p) => slugifyCategory(p.data.category) === categorySlug);
}

export function findCategoryBySlug(posts: BlogPost[], categorySlug: string): string | undefined {
	return getCategories(posts).find((c) => slugifyCategory(c) === categorySlug);
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function postHref(id: string): string {
	return `/blog/${id}/`;
}

export function categoryHref(category: string): string {
	return `/blog/category/${slugifyCategory(category)}/`;
}

export const BLOG_LIST_PAGE_SIZE = 6;
export const SIDEBAR_RECENT_LIMIT = 2;
export const SIDEBAR_RELATED_PAGE_SIZE = 2;

export function getRecentPosts(
	posts: BlogPost[],
	excludeId: string,
	limit = SIDEBAR_RECENT_LIMIT,
): BlogPost[] {
	return posts.filter((p) => p.id !== excludeId).slice(0, limit);
}

function tagOverlap(a: string[], b: string[]): number {
	const setB = new Set(b.map((t) => t.toLowerCase()));
	return a.filter((t) => setB.has(t.toLowerCase())).length;
}

/** Related posts: same category first, then tag overlap, then recency. */
export function getRelatedPosts(posts: BlogPost[], current: BlogPost): BlogPost[] {
	return posts
		.filter((p) => p.id !== current.id)
		.map((post) => {
			let score = 0;
			if (post.data.category === current.data.category) score += 10;
			score += tagOverlap(post.data.tags ?? [], current.data.tags ?? []);
			return { post, score };
		})
		.sort((a, b) => {
			if (b.score !== a.score) return b.score - a.score;
			return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
		})
		.map(({ post }) => post);
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
	const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
	const safePage = Math.min(Math.max(1, page), totalPages);
	const start = (safePage - 1) * pageSize;
	return {
		items: items.slice(start, start + pageSize),
		page: safePage,
		totalPages,
		totalItems: items.length,
		hasPrev: safePage > 1,
		hasNext: safePage < totalPages,
	};
}

export function blogListPageHref(page: number): string {
	return page <= 1 ? '/blog/' : `/blog/page/${page}/`;
}

/** Category defaults — JPEGs live in src/Images/blog-featured-images/ (copied to public on build/deploy). */
const CATEGORY_FEATURED_IMAGES: Record<string, string> = {
	'Local SEO': '/images/blog/featured/local-seo.svg',
	Website: '/images/blog/featured/website.svg',
	'Web Application': '/images/blog/featured/software-development.jpeg',
	'AI Employees': '/images/blog/featured/ai-employees.jpeg',
	'Business Growth': '/images/blog/featured/business-growth.jpeg',
};

const DEFAULT_FEATURED_IMAGE = '/images/blog/featured/default.svg';

export function getFeaturedImageSrc(post: BlogPost): string {
	return post.data.featuredImage ?? CATEGORY_FEATURED_IMAGES[post.data.category] ?? DEFAULT_FEATURED_IMAGE;
}

export function getFeaturedImageAlt(post: BlogPost): string {
	if (post.data.featuredImageAlt) return post.data.featuredImageAlt;
	return `${post.data.title} — featured image`;
}

export function getAbsoluteUrl(path: string, site: URL | string | undefined): string {
	const base = site ?? 'https://scaling-smb.pages.dev';
	return new URL(path, base).href;
}

export function getFeaturedImageOgUrl(post: BlogPost, site: URL | string | undefined): string {
	return getAbsoluteUrl(getFeaturedImageSrc(post), site);
}

export function getPostCanonicalUrl(postId: string, site: URL | string | undefined): string {
	return getAbsoluteUrl(postHref(postId), site);
}
