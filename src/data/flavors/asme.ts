import type { Publisher } from '../types'

export const asme: Publisher = {
  flavor: "asme",
  logo: "/logos/asme-logo.svg",
  name: "ASME",
  fullName: "American Society of Mechanical Engineers",
  category: "industry",
  description: "ASME is a professional association that promotes the art, science, and practice of multidisciplinary engineering. ASME standards cover pressure technology, nuclear power, piping, and many other mechanical engineering applications.",
  website: "https://www.asme.org",
  syntaxNotes: "ASME identifiers follow patterns like: ASME [Code] [Number]-[Year], ASME [Section] [Number]-[Year]. Draft standards include revision notes.",
  relatedFlavors: ["ansi", "astm"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: [""],
      description: "ASME Standards covering mechanical engineering specifications and requirements.",
      examples: [
        { input: "ASME B18.3-2022" },
        { input: "ASME Y14.43-2021" },
        { input: "ASME B18.3-20XX [Draft Proposed Revision of ASME B18.3-2012 (R2017)]" },
        { input: "ASME Y14.43-20XX [Revision of ASME Y14.43-2011 (R2020)]" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "ASME",
      dataType: "enum",
      values: ["ASME"],
      example: "ASME",
    },
    {
      name: "Number",
      description: "The standard number",
      dataType: "string",
      format: "Alphanumeric code (e.g., BPVC, B31.3, PTC 19.3).",
      example: "BPVC",
    },
    {
      name: "Year",
      description: "Publication year",
      dataType: "year",
      format: "4-digit year, preceded by hyphen.",
      example: "2023",
    },
    {
      name: "Revision",
      description: "Revision information in brackets",
    },
],
  algebra: [
],
}

export default asme
