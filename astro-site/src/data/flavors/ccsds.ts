import type { Publisher } from '../types'

export const ccsds: Publisher = {
  flavor: "ccsds",
  logo: "/logos/ccsds-logo.svg",
  name: "CCSDS",
  fullName: "Consultative Committee for Space Data Systems",
  category: "industry",
  description: "CCSDS is a multinational forum for the development of communications and data systems standards for spaceflight. CCSDS standards are used by major space agencies worldwide.",
  website: "https://www.ccsds.org",
  syntaxNotes: "CCSDS identifiers follow the pattern: CCSDS [Number].[Issue]-[Category]-[Version]-[Status]. Categories include B (Blue Book = Recommended Standard), G (Green Book = Recommended Practice), M (Magenta Book = Report).",
  relatedFlavors: ["iso"],
  docTypes: [
    {
      key: "base",
      title: "Base Document",
      abbr: ["B", "G", "M"],
      description: "CCSDS documents categorized by color: B (Blue Book, Recommended Standard), G (Green Book, Recommended Practice), M (Magenta Book, Report).",
      examples: [
        { input: "CCSDS 100.0-G-1-S" },
        { input: "CCSDS 101.0-B-1-S" },
        { input: "CCSDS 121.0-B-1-S" },
        { input: "CCSDS 132.0-B-2-S" },
    ],
    },
    {
      key: "corrigendum",
      title: "Corrigendum",
      abbr: ["Cor"],
      description: "Corrections to CCSDS documents.",
      examples: [
        { input: "CCSDS 121.0-B-1-S Cor. 1" },
        { input: "CCSDS 121.0-B-1-S Cor. 2" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "CCSDS",
      dataType: "enum",
      values: ["CCSDS"],
      example: "CCSDS",
    },
    {
      name: "Number",
      description: "Document number with decimal (e.g., 100.0)",
      dataType: "string",
      format: "NNN.N-L-V format: series number + book type letter + version (e.g., 121.0-B-1).",
      example: "121.0-B-1",
    },
    {
      name: "Category",
      description: "B (Blue/Standard), G (Green/Practice), M (Magenta/Report)",
    },
    {
      name: "Issue",
      description: "Issue number after the category letter",
    },
    {
      name: "Status",
      description: "S (Superseded), blank (current)",
    },
],
  algebra: [
    { type: "Corrigendum", description: "Corrects errors in CCSDS documents", syntax: "CCSDS [Number]-[Category]-[Issue]-[Status] Cor. [N]", example: "CCSDS 121.0-B-1-S Cor. 1" },
],
}

export default ccsds
