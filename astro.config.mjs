import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import vue from '@astrojs/vue'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://www.pubid.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    starlight({
      title: 'PubID',
      logo: { src: './public/pubid-logo.svg', replacesTitle: true },
      social: [
        { label: 'GitHub', href: 'https://github.com/pubid/pubid.github.io', icon: 'github' },
      ],
      sidebar: [
        {
          label: 'Concepts',
          items: [
            { label: 'Anatomy of a PubID', link: '/concepts/anatomy' },
            { label: 'The Metaschema', link: '/concepts/metaschema' },
            { label: 'Components', link: '/concepts/components' },
            { label: 'PubID Algebra', link: '/concepts/algebra' },
            { label: 'Relationships', link: '/concepts/relationships' },
            { label: 'URN Mapping', link: '/concepts/urn' },
          ],
        },
        {
          label: 'Library',
          items: [
            { label: 'Installation', link: '/library/' },
            { label: 'Quick Start', link: '/library/quick-start' },
            { label: 'API Reference', link: '/library/api' },
            { label: 'Contributing', link: '/library/contributing' },
          ],
        },
        {
          label: 'Specifications',
          items: [
            { label: 'Overview', link: '/specs/' },
            { label: 'ISO URN (RFC 5141-bis)', link: '/specs/iso-urn' },
            { label: 'IEC URN', link: '/specs/iec-urn' },
          ],
        },
        {
          label: 'Adopt',
          items: [
            { label: 'Why Adopt PubID', link: '/adopt/' },
            { label: 'Design Guide', link: '/adopt/guide' },
          ],
        },
      ],
      customCss: ['./src/styles/global.css'],
    }),
    vue(),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
})
