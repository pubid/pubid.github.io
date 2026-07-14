import type { Publisher } from '../types'

export const iho: Publisher = {
  flavor: "iho",
  logo: "/logos/iho-logo.svg",
  name: "IHO",
  fullName: "International Hydrographic Organization",
  category: "international",
  description: "The International Hydrographic Organization (IHO) is an intergovernmental organization that coordinates the setting of international hydrographic and nautical charting standards. Its S-series of Standards and Specifications underpin Electronic Navigational Charts (ENCs), the S-100 Universal Hydrographic Data Model, and the maritime regulatory framework under SOLAS. Member states commit to adopting IHO specifications for their national charting agencies.",
  website: "https://iho.int",
  syntaxNotes: "IHO identifiers use a single-letter series prefix followed by a hyphenated number: IHO {S|P|M|B|C}-[Number][ Ap. [Appendix]][ Part [Part]][ Annex [Annex]][ Suppl [Supplement]] [Version].",
  urnPattern: "urn:iho:[type]:[number]:[version]",
  relatedFlavors: ["iso", "iala", "iec"],
  docTypes: [
    {
      key: "standard",
      title: "Standards and Specifications",
      abbr: ["S"],
      description: "IHO Standards and Specifications (S series), including the S-100 Universal Hydrographic Data Model and the S-57/S-101 ENC transfer standards.",
      examples: [
        { input: "IHO S-44 5.0.0" },
        { input: "IHO S-100 Part 4a 1.0.0" },
        { input: "IHO S-65 Ap. A 1.0.0" },
    ],
    },
    {
      key: "publication",
      title: "Publication",
      abbr: ["P"],
      description: "IHO Publications (P series) — reference works such as Charts and Publications Regulations. Numbers may carry a sub-year (P-1/21) or sub-part (P-6-3).",
      examples: [
        { input: "IHO P-1 1.0.0" },
        { input: "IHO P-1/21 1.0.0" },
        { input: "IHO P-6-3 1.0.0" },
    ],
    },
    {
      key: "miscellaneous",
      title: "Miscellaneous Publication",
      abbr: ["M"],
      description: "IHO Miscellaneous Publications (M series) — manuals, guides, and reference documents that do not fit the S/P categories.",
      examples: [
        { input: "IHO M-3 2.0.0" },
    ],
    },
    {
      key: "bibliographic",
      title: "Bibliographic Publication",
      abbr: ["B"],
      description: "IHO Bibliographic Publications (B series) — bibliographies and reference catalogues.",
      examples: [
        { input: "IHO B-4 2.19.0" },
    ],
    },
    {
      key: "circular_letter",
      title: "Circular Letter",
      abbr: ["C"],
      description: "IHO Circular Letters (C series) — official correspondence from the IHO Secretariat to Member States.",
      examples: [
        { input: "IHO C-13 1.0.0" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "IHO — optional on input, always emitted on output",
      dataType: "enum",
      values: ["IHO"],
      example: "IHO",
    },
    {
      name: "Type Letter",
      description: "Single-letter series code (S, P, M, B, C)",
      attribute: "type_letter",
      dataType: "enum",
      values: ["S (Standard/Specification)", "P (Publication)", "M (Miscellaneous)", "B (Bibliographic)", "C (Circular Letter)"],
      example: "S",
    },
    {
      name: "Number",
      description: "Document number, may include sub-part or slash-year",
      attribute: "number",
      dataType: "string",
      format: "Hyphenated after type letter. May include slash-year (P-1/21) or sub-part (P-6-3).",
      example: "44",
    },
    {
      name: "Appendix",
      description: "Appendix marker: \"Ap.\" prefix",
      attribute: "appendix",
      dataType: "string",
      format: "\"Ap.\" prefix, single letter.",
      example: "Ap. A",
    },
    {
      name: "Part",
      description: "Part marker: \"Part\" keyword",
      attribute: "part",
      dataType: "string",
      format: "\"Part\" keyword. Alphanumeric allowed (e.g. 4a).",
      example: "Part 4a",
    },
    {
      name: "Annex",
      description: "Annex marker: \"Annex\" keyword",
      attribute: "annex",
      dataType: "string",
      format: "\"Annex\" keyword.",
      example: "Annex A",
    },
    {
      name: "Supplement",
      description: "Supplement marker: \"Suppl\" keyword",
      attribute: "supplement",
      dataType: "string",
      format: "\"Suppl\" keyword.",
      example: "Suppl 1",
    },
    {
      name: "Version",
      description: "Three-part dotted version (X.Y.Z)",
      attribute: "version",
      dataType: "string",
      format: "Three-part dotted version (X.Y.Z).",
      example: "5.0.0",
    },
],
  algebra: [
    { type: "Part", description: "Subdivision of a standard", syntax: "IHO [Type]-[Number] Part [Part] [Version]", example: "IHO S-100 Part 4a 1.0.0" },
    { type: "Appendix", description: "Appendix within a publication", syntax: "IHO [Type]-[Number] Ap. [Letter] [Version]", example: "IHO S-65 Ap. A 1.0.0" },
    { type: "Slash Year", description: "Annual revision indicator within a series", syntax: "IHO [Type]-[Number]/[Year] [Version]", example: "IHO P-1/21 1.0.0" },
    { type: "Sub-part", description: "Compound number with sub-part", syntax: "IHO [Type]-[Number]-[SubPart] [Version]", example: "IHO P-6-3 1.0.0" },
],
}

export default iho
