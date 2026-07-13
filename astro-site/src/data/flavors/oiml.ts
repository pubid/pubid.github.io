import type { Publisher } from '../types'

export const oiml: Publisher = {
  flavor: "oiml",
  logo: "/logos/oiml-logo.svg",
  name: "OIML",
  fullName: "International Organization of Legal Metrology",
  category: "international",
  description: "OIML is an intergovernmental treaty organization that develops model regulations, standards, and related documents for legal metrology (measurement standards and instruments).",
  website: "https://www.oiml.org",
  syntaxNotes: "OIML identifiers follow the pattern: OIML [Type] [Number]:[Year]. Types include R (Recommendation), D (Document), G (Guide), V (Vocabulary), B (Basic Publication).",
  relatedFlavors: ["iso", "jcgm"],
  docTypes: [
    {
      key: "recommendation",
      title: "Recommendation",
      abbr: ["R"],
      description: "OIML International Recommendations are model regulations establishing requirements for measuring instruments.",
      examples: [
        { input: "OIML R 76-1:2006" },
        { input: "OIML R 138:2007" },
        { input: "OIML R 49-1:2006" },
    ],
    },
    {
      key: "document",
      title: "Document",
      abbr: ["D"],
      description: "OIML International Documents provide guidance on legal metrology matters.",
      examples: [
        { input: "OIML D 11:2008" },
        { input: "OIML D 11:2013" },
    ],
    },
    {
      key: "guide",
      title: "Guide",
      abbr: ["G"],
      description: "OIML Guides providing guidance on specific aspects of legal metrology.",
      examples: [
        { input: "OIML G 1-100:2008" },
        { input: "OIML G 14:2011" },
    ],
    },
    {
      key: "basic_publication",
      title: "Basic Publication",
      abbr: ["B"],
      description: "OIML Basic Publications providing fundamental reference material.",
      examples: [
        { input: "OIML B 1:2020" },
    ],
    },
    {
      key: "vocabulary",
      title: "Vocabulary",
      abbr: ["V"],
      description: "OIML Vocabularies defining terms used in legal metrology.",
      examples: [
        { input: "OIML V 1:2000" },
        { input: "OIML V 2-200:2012" },
    ],
    },
    {
      key: "expert_report",
      title: "Expert Report",
      abbr: ["E"],
      description: "OIML Expert Reports.",
      examples: [
        { input: "OIML E 1:2004" },
    ],
    },
    {
      key: "seminar_report",
      title: "Seminar Report",
      abbr: ["S"],
      description: "OIML Seminar Reports.",
      examples: [
        { input: "OIML S 1:2000" },
    ],
    },
    {
      key: "bulletin",
      title: "Bulletin",
      abbr: ["Bulletin"],
      description: "The OIML Bulletin is the periodical of the International Organization of Legal Metrology, published since 1960 (Volume I). It has a four-tier hierarchy: periodical (OIML Bulletin), volume/year (OIML Bulletin 1960), issue (OIML Bulletin 1960-03), and article (OIML Bulletin 1960-03-01). Each article also has a citation form combining roman volume, parenthesised issue, and 8-digit article id (OIML Bulletin LXVII(2) 20260211).",
      examples: [
        { input: "OIML Bulletin" },
        { input: "OIML Bulletin 1960" },
        { input: "OIML Bulletin 1960-03" },
        { input: "OIML Bulletin 1960-03-01" },
        { input: "OIML Bulletin LXVII(2) 20260211" },
    ],
    },
    {
      key: "amendment",
      title: "Amendment",
      abbr: ["Amd"],
      description: "Amendments to OIML publications.",
      examples: [
        { input: "Amendment (2009) to OIML R 138 Edition 2007 (E)" },
        { input: "Amendment (2009) to OIML R 138:2007 (E)" },
    ],
    },
    {
      key: "annex",
      title: "Annex",
      abbr: ["Annex"],
      description: "Annexes to OIML publications.",
      examples: [
        { input: "OIML R 49-1 Annex A" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "OIML",
      dataType: "enum",
      values: ["OIML"],
      example: "OIML",
    },
    {
      name: "Type",
      description: "R, D, G, V, B, E, S",
      dataType: "enum",
      values: ["R (Recommendation)", "D (Document)", "G (Guide)", "V (Vocabulary)", "B (Basic Publication)", "E (Expert Report)", "S (Supplement)"],
      example: "R",
    },
    {
      name: "Number",
      description: "The publication number",
      dataType: "integer",
      format: "1–3 digit number.",
      example: "76",
    },
    {
      name: "Part",
      description: "Part number",
      dataType: "integer",
      format: "Optional. After dash.",
      example: "1",
    },
    {
      name: "Year",
      description: "Publication year",
      dataType: "year",
      format: "4-digit year, preceded by colon.",
      example: "2006",
    },
    {
      name: "Edition",
      description: "Edition indicator",
      dataType: "string",
      format: "Optional. Edition indicator (e.g., E:2008).",
      example: "E:2008",
    },
],
  algebra: [
    { type: "Amendment", description: "Modifies an OIML publication", syntax: "Amendment ([Year]) to OIML [Type] [Number]:[Year] (E)", example: "Amendment (2009) to OIML R 138:2007 (E)" },
    { type: "Annex", description: "Annex to a publication", syntax: "OIML [Type] [Number] Annex [Letter]", example: "OIML R 49-1 Annex A" },
    { type: "Part", description: "Multi-part publication", syntax: "OIML [Type] [Number]-[Part]:[Year]", example: "OIML R 76-1:2006" },
    { type: "Bulletin Issue", description: "Issue of the OIML Bulletin periodical", syntax: "OIML Bulletin [Year]-[Issue]", example: "OIML Bulletin 1960-03" },
    { type: "Bulletin Article", description: "Structured article reference within an issue", syntax: "OIML Bulletin [Year]-[Issue]-[Sequence]", example: "OIML Bulletin 1960-03-01" },
    { type: "Bulletin Citation", description: "Citation form combining roman volume and article id", syntax: "OIML Bulletin [RomanVolume]([Issue]) [ArticleID]", example: "OIML Bulletin LXVII(2) 20260211" },
],
}

export default oiml
