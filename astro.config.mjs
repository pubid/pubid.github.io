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
          label: 'Playground',
          link: '/playground',
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Anatomy of a PubID', link: '/concepts/anatomy' },
            { label: 'The Metaschema', link: '/concepts/metaschema' },
            { label: 'Components', link: '/concepts/components' },
            { label: 'PubID Algebra', link: '/concepts/algebra' },
            { label: 'Relationships', link: '/concepts/relationships' },
            { label: 'Identifier Relations', link: '/concepts/identifier-relations' },
            { label: 'Lossless Faces', link: '/concepts/lossless-faces' },
            { label: 'Dual Perspectives', link: '/concepts/dual-perspectives' },
            { label: 'The D= Designator', link: '/concepts/draft-designator' },
            { label: 'Stage Words', link: '/concepts/stage-words' },
            { label: 'The Corpus Contract', link: '/concepts/corpus' },
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
            { label: 'IEEE URN scheme', link: '/specs/ieee-urn' },
            { label: 'ETSI URN scheme', link: '/specs/etsi-urn' },
            { label: 'ITU URN scheme', link: '/specs/itu-urn' },
            { label: 'IETF URN scheme', link: '/specs/ietf-urn' },
            { label: 'CCSDS URN scheme', link: '/specs/ccsds-urn' },
            { label: 'IALA URN scheme', link: '/specs/iala-urn' },
            { label: 'IHO URN scheme', link: '/specs/iho-urn' },
            { label: '3GPP URN scheme', link: '/specs/tgpp-urn' },
            { label: 'XSF URN scheme', link: '/specs/xsf-urn' },
            { label: 'ISBN URN scheme', link: '/specs/isbn-urn' },
            { label: 'DOI URN scheme', link: '/specs/doi-urn' },
            { label: 'OASIS URN scheme', link: '/specs/oasis-urn' },
            { label: 'OGC URN scheme', link: '/specs/ogc-urn' },
            { label: 'BIPM URN scheme', link: '/specs/bipm-urn' },
            { label: 'WMO URN scheme', link: '/specs/wmo-urn' },
            { label: 'NIST URN scheme', link: '/specs/nist-urn' },
            { label: 'JIS URN scheme', link: '/specs/jis-urn' },
            { label: 'ASHRAE URN scheme', link: '/specs/ashrae-urn' },
            { label: 'BSI URN scheme', link: '/specs/bsi-urn' },
            { label: 'ECMA URN scheme', link: '/specs/ecma-urn' },
            { label: 'ASME URN scheme', link: '/specs/asme-urn' },
            { label: 'CIE URN scheme', link: '/specs/cie-urn' },
            { label: 'ASTM URN scheme', link: '/specs/astm-urn' },
            { label: 'CSA URN scheme', link: '/specs/csa-urn' },
            { label: 'GOST URN scheme', link: '/specs/gost-urn' },
            { label: 'ANSI URN scheme', link: '/specs/ansi-urn' },
            { label: 'API URN scheme', link: '/specs/api-urn' },
            { label: 'CEN-CENELEC URN scheme', link: '/specs/cen_cenelec-urn' },
            { label: 'CalConnect URN scheme', link: '/specs/calconnect-urn' },
            { label: 'EASC URN scheme', link: '/specs/easc-urn' },
            { label: 'PLATEAU URN scheme', link: '/specs/plateau-urn' },
            { label: 'OIML URN scheme', link: '/specs/oiml-urn' },
            { label: 'IDF URN scheme', link: '/specs/idf-urn' },
            { label: 'AMCA URN scheme', link: '/specs/amca-urn' },
            { label: 'EVS URN scheme', link: '/specs/evs-urn' },
            { label: 'JCGM URN scheme', link: '/specs/jcgm-urn' },
            { label: 'IANA URN scheme', link: '/specs/iana-urn' },
            { label: 'W3C URN scheme', link: '/specs/w3c-urn' },
            { label: 'OMG URN scheme', link: '/specs/omg-urn' },
            { label: 'SAE URN scheme', link: '/specs/sae-urn' },
            { label: 'EU URN scheme', link: '/specs/eu-urn' },
            { label: 'arXiv URN scheme', link: '/specs/arxiv-urn' },
            { label: 'GB URN scheme', link: '/specs/gb-urn' },
            { label: 'UN URN scheme', link: '/specs/un-urn' },
            { label: 'Adobe URN scheme', link: '/specs/adobe-urn' },
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
