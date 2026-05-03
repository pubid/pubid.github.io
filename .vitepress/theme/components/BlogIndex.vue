<script setup lang="ts">
import { data as posts } from '../../blog.data'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="blog-index">
    <p class="blog-intro">
      Updates on PubID development, new publisher schemas, and community news.
    </p>
    <div v-if="posts.length === 0" class="blog-empty">
      No posts yet. Check back soon!
    </div>
    <article
      v-for="post in posts"
      :key="post.url"
      class="blog-post"
    >
      <a :href="post.url" class="blog-post-link">
        <h3 class="blog-post-title">{{ post.frontmatter.title }}</h3>
      </a>
      <div class="blog-post-meta">
        <span class="blog-post-date">{{ formatDate(post.frontmatter.date) }}</span>
        <span class="blog-meta-sep">·</span>
        <span class="blog-post-author">{{ post.frontmatter.author }}</span>
      </div>
      <p class="blog-post-excerpt">
        {{ post.description || (post.excerpt ? post.excerpt.replace(/<[^>]*>/g, '').slice(0, 200) + '...' : '') }}
      </p>
      <a :href="post.url" class="blog-read-more">Read more &rarr;</a>
    </article>
  </div>
</template>
