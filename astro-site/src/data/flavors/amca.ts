import type { Publisher } from '../types'

export const amca: Publisher = {
  flavor: "amca",
  logo: "/logos/amca-logo.png",
  name: "AMCA",
  fullName: "Air Movement and Control Association",
  category: "industry",
  description: "AMCA International is a not-for-profit association of the world's manufacturers of air movement, air control, and air conditioning equipment. AMCA develops standards and test methods for these products.",
  website: "https://www.amca.org",
  syntaxNotes: "AMCA identifiers follow: AMCA [Type] [Number]-[Year] or ANSI/AMCA [Number]-[Year] for ANSI-accredited standards.",
  relatedFlavors: ["ansi", "ashrae"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: ["Standard"],
      description: "AMCA Standards for air movement and control equipment.",
      examples: [
        { input: "ANSI/AMCA Standard 210-16" },
        { input: "ANSI/AMCA Standard 220-21" },
    ],
    },
    {
      key: "publication",
      title: "Publication",
      abbr: ["Publication"],
      description: "AMCA Publications providing technical information.",
      examples: [
        { input: "AMCA Publication 211-22 (Rev. 01-23)" },
        { input: "AMCA Publication 311-16" },
    ],
    },
    {
      key: "interpretation",
      title: "Interpretation",
      abbr: ["Interp"],
      description: "AMCA Interpretations of standards.",
      examples: [
        { input: "AMCA 99 JW Interp" },
        { input: "AMCA 99 KB Interp" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "AMCA, ANSI/AMCA",
      dataType: "enum",
      values: ["AMCA"],
      example: "AMCA",
    },
    {
      name: "Number",
      description: "The standard number",
      dataType: "integer",
      format: "1–3 digit number.",
      example: "210",
    },
    {
      name: "Year",
      description: "Publication year (2 digit)",
      dataType: "year",
      format: "4-digit year, preceded by hyphen.",
      example: "2022",
    },
],
  algebra: [
],
}

export default amca
