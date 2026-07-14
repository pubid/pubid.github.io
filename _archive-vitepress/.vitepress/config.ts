import { defineConfig } from 'vitepress'
import { publishers } from './data/publishers'
import { asciidocPlugin } from './vite-plugins/asciidoc'

const publisherSidebar = [
  { text: 'All Publishers', link: '/publishers/' },
  ...publishers.map(p => ({
    text: p.name,
    link: `/publishers/${p.flavor}`,
    collapsed: true,
    items: [
      { text: 'Overview', link: `/publishers/${p.flavor}` },
      ...p.docTypes.map(dt => ({
        text: dt.abbr.length > 0 ? `${dt.title} (${dt.abbr.join(', ')})` : dt.title,
        link: `/publishers/${p.flavor}/${dt.key}`,
      })),
    ],
  })),
]

const conceptSidebar = [
  { text: 'Anatomy of a PubID', link: '/concepts/anatomy' },
  { text: 'The Metaschema', link: '/concepts/metaschema' },
  { text: 'Components', link: '/concepts/components' },
  { text: 'PubID Algebra', link: '/concepts/algebra' },
  { text: 'Relationships', link: '/concepts/relationships' },
  { text: 'URN Mapping', link: '/concepts/urn' },
]

const adoptSidebar = [
  { text: 'Why Adopt PubID', link: '/adopt' },
  { text: 'Design Guide', link: '/adopt/guide' },
]

const specsSidebar = [
  { text: 'Overview', link: '/specs/' },
  { text: 'ISO URN (RFC 5141-bis)', link: '/specs/iso-urn' },
  { text: 'IEC URN', link: '/specs/iec-urn' },
]

const librarySidebar = [
  { text: 'Installation', link: '/library/' },
  { text: 'Quick Start', link: '/library/quick-start' },
  { text: 'API Reference', link: '/library/api' },
  { text: 'Contributing', link: '/library/contributing' },
]

export default defineConfig({
  title: 'PubID',
  description: 'Universal Publication Identifier — An open standard for machine-readable publication identifiers',
  lang: 'en-US',
  lastUpdated: true,

  vite: {
    plugins: [asciidocPlugin()],
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#2978a1' }],
    ['meta', { property: 'og:title', content: 'PubID — Universal Publication Identifier' }],
    ['meta', { property: 'og:description', content: 'Parse, validate, and interoperate identifiers for 23+ standards publishers (ISO, IEC, IEEE, NIST, and more)' }],
    ['meta', { property: 'og:image', content: 'https://www.pubid.com/og-image.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://www.pubid.com/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    logo: '/pubid-logo.svg',

    nav: [
      { text: 'Publishers', link: '/publishers/' },
      { text: 'Concepts', link: '/concepts/anatomy', items: conceptSidebar },
      {
        text: 'Docs',
        items: [
          { text: 'Library', items: librarySidebar },
          { text: 'Specifications', items: specsSidebar },
        ],
      },
      { text: 'Adopt', link: '/adopt' },
      { text: 'About', link: '/about' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pubid/pubid.github.io' },
    ],

    footer: {
      message: 'An open source project of <a href="https://www.ribose.com">Ribose</a>',
      copyright: 'Copyright © 2024-2026 Ribose Group Inc.',
    },

    sidebar: {
      '/adopt/': [{ text: 'Adopt', items: adoptSidebar }],
      '/concepts/': [{ text: 'Concepts', items: conceptSidebar }],
      '/specs/': [{ text: 'Specifications', items: specsSidebar }],
      '/publishers/': [{ text: 'Publishers', items: publisherSidebar }],
      '/library/': [{ text: 'Library', items: librarySidebar }],
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
    },
  },

  srcExclude: ['README.md', '_pubid/**', 'astro-site/**', 'TODO.astro/**', 'TODO.improve-website/**'],
})
