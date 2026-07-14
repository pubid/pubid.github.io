import { defineCollection, z } from 'astro:content'

// All content collections use zod schemas for compile-time validation.
// Adding a new collection = adding a new block here (OCP).
// Schemas are intentionally permissive to accommodate legacy content shapes.

const baseSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
})

const concepts = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    ord: z.number().default(0),
  }),
})

const blog = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    // Accept both `date` (legacy) and `pubDate` (preferred)
    pubDate: z.coerce.date().optional(),
    date: z.coerce.date().optional(),
    author: z.string().default('PubID Team'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

const library = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    ord: z.number().default(0),
  }),
})

const specs = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    ord: z.number().default(0),
  }),
})

const adopt = defineCollection({
  type: 'content',
  schema: baseSchema,
})

const about = defineCollection({
  type: 'content',
  schema: baseSchema,
})

export const collections = { concepts, blog, library, specs, adopt, about }
