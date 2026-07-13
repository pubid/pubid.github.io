import type { Publisher } from '../types'

export const api: Publisher = {
  flavor: "api",
  logo: "/logos/api-logo.svg",
  name: "API",
  fullName: "American Petroleum Institute",
  category: "industry",
  description: "API represents all segments of America's oil and natural gas industry. API Standards cover everything from drilling and production to refining and distribution of petroleum products.",
  website: "https://www.api.org",
  syntaxNotes: "API identifiers follow: API [Type] [Number]. Types include Std (Standard), RP (Recommended Practice), Spec (Specification), TR (Technical Report), Bull (Bulletin), Publ (Publication), MPMS (Manual of Petroleum Measurement Standards).",
  relatedFlavors: ["ansi", "astm"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: ["Std"],
      description: "API Standards for the petroleum industry.",
      examples: [
        { input: "API Std 650" },
        { input: "API Std 620" },
    ],
    },
    {
      key: "recommended_practice",
      title: "Recommended Practice",
      abbr: ["RP"],
      description: "API Recommended Practices providing guidance.",
      examples: [
        { input: "API RP 500" },
        { input: "API RP 14C" },
    ],
    },
    {
      key: "specification",
      title: "Specification",
      abbr: ["Spec"],
      description: "API Specifications defining product requirements.",
      examples: [
        { input: "API Spec 5L" },
        { input: "API Spec 6A" },
    ],
    },
    {
      key: "technical_report",
      title: "Technical Report",
      abbr: ["TR"],
      description: "API Technical Reports.",
      examples: [
        { input: "API TR 21C" },
        { input: "API TR 21TR2" },
    ],
    },
    {
      key: "bulletin",
      title: "Bulletin",
      abbr: ["BULL", "Bul"],
      description: "API Bulletins providing technical information.",
      examples: [
        { input: "API BULL 11L2" },
        { input: "API BULL 5100" },
    ],
    },
    {
      key: "publication",
      title: "Publication",
      abbr: ["PUBL", "Publ"],
      description: "API Publications.",
      examples: [
        { input: "API PUBL 1628B" },
        { input: "API PUBL 4527" },
    ],
    },
    {
      key: "mpms",
      title: "Manual of Petroleum Measurement Standards",
      abbr: ["MPMS"],
      description: "API MPMS chapters covering petroleum measurement.",
      examples: [
        { input: "API MPMS Chapter 4.1" },
    ],
    },
    {
      key: "continuous_operations_standard",
      title: "Continuous Operations Standard",
      abbr: ["COS"],
      description: "API standards for continuous operations in the petroleum industry.",
      examples: [],
    },
    {
      key: "typeless_standard",
      title: "Typeless Standard",
      abbr: [],
      description: "API documents published without a type designation, identified by number only.",
      examples: [
        { input: "API 5L" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "API",
      dataType: "enum",
      values: ["API"],
      example: "API",
    },
    {
      name: "Type",
      description: "Std, RP, Spec, TR, Bull, Publ, MPMS, COS",
      dataType: "enum",
      values: ["Std (Standard)", "RP (Recommended Practice)", "Spec (Specification)", "TR (Technical Report)", "Bul (Bulletin)", "Pub (Publication)", "G (Guide)"],
      example: "RP",
    },
    {
      name: "Number",
      description: "The document number",
      dataType: "string",
      format: "Type-specific numbering. May include letters.",
      example: "500",
    },
],
  algebra: [
],
}

export default api
