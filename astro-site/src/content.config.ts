import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// Content Layer API (Astro 7). Each collection uses a glob loader to
// discover its files. Adding a new collection = new block here (OCP).

const baseSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
})

const concepts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/concepts' }),
  schema: baseSchema.extend({
    ord: z.number().default(0),
  }),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: baseSchema.extend({
    pubDate: z.coerce.date().optional(),
    date: z.coerce.date().optional(),
    author: z.string().default('PubID Team'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

const library = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/library' }),
  schema: baseSchema.extend({
    ord: z.number().default(0),
  }),
})

const specs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/specs' }),
  schema: baseSchema.extend({
    ord: z.number().default(0),
  }),
})

const adopt = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/adopt' }),
  schema: baseSchema,
})

const about = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/about' }),
  schema: baseSchema,
})

export const collections = { concepts, blog, library, specs, adopt, about }
