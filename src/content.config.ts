import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		category: z.string(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		readTime: z.string().optional(),
		/** Public path e.g. /images/blog/featured/local-seo.svg — omit to use category placeholder */
		featuredImage: z.string().optional(),
		featuredImageAlt: z.string().optional(),
	}),
});

export const collections = { blog };
