import { defineConfig } from 'vitepress'
import { publishers } from './data/publishers'

const publisherSidebar = [
  { text: 'All Publishers', link: '/publishers/' },
  ...publishers.map(p => ({
    text: p.name,
    link: `/publishers/${p.flavor}`,
    collapsed: true,
    items: [
      { text: 'Overview', link: `/publishers/${p.flavor}` },
      ...p.docTypes.map(dt => ({
        text: dt.title,
        link: `/publishers/${p.flavor}/${dt.key}`,
      })),
    ],
  })),
]

const conceptSidebar = [
  { text: 'Anatomy of a PubID', link: '/concepts/anatomy' },
  { text: 'The Metaschema', link: '/concepts/metaschema' },
  { text: 'Common Elements', link: '/concepts/elements' },
  { text: 'PubID Algebra', link: '/concepts/algebra' },
  { text: 'URN Mapping', link: '/concepts/urn' },
  { text: 'Designing Your Scheme', link: '/concepts/designing-your-scheme' },
]

export default defineConfig({
  title: 'PubID',
  description: 'Universal Publication Identifier — An open standard for machine-readable publication identifiers',
  lang: 'en-US',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#1a56db' }],
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
      { text: 'About', link: '/about' },
      { text: 'Concepts', items: conceptSidebar },
      { text: 'Publishers', link: '/publishers/' },
      { text: 'Playground', link: '/playground' },
      { text: 'Library', link: '/library/' },
      { text: 'Blog', link: '/blog/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pubid/pubid.github.io' },
    ],

    footer: {
      message: 'An open source project of <a href="https://www.ribose.com">Ribose</a>',
      copyright: 'Copyright © 2024-2026 Ribose Group Inc.',
    },

    sidebar: {
      '/concepts/': [{ text: 'Concepts', items: conceptSidebar }],
      '/publishers/': [{ text: 'Publishers', items: publisherSidebar }],
      '/library/': [
        {
          text: 'Library',
          items: [
            { text: 'Installation', link: '/library/' },
            { text: 'Quick Start', link: '/library/quick-start' },
            { text: 'API Reference', link: '/library/api' },
            { text: 'Contributing', link: '/library/contributing' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
    },
  },

  srcExclude: ['README.md'],
})
