import type { Publisher } from '../types'

export const jcgm: Publisher = {
  flavor: "jcgm",
  logo: "/logos/jcgm-logo.svg",
  name: "JCGM",
  fullName: "Joint Committee for Guides in Metrology",
  category: "international",
  description: "The JCGM works to promote and harmonize metrology guidance, maintaining the Guide to the Expression of Uncertainty in Measurement (GUM) and the International Vocabulary of Metrology (VIM).",
  website: "https://www.bipm.org/en/committees/jc/jcgm",
  syntaxNotes: "JCGM identifiers follow: JCGM [Number]:[Year] or JCGM GUM-[Part]:[Year]. The GUM guides use the GUM prefix.",
  relatedFlavors: ["iso", "oiml"],
  docTypes: [
    {
      key: "guide",
      title: "Guide",
      abbr: [""],
      description: "JCGM Guides including the GUM (Guide to the Expression of Uncertainty in Measurement) and VIM (International Vocabulary of Metrology).",
      examples: [
        { input: "JCGM 100:2008" },
        { input: "JCGM 101:2008" },
        { input: "JCGM 102:2011" },
        { input: "JCGM 200:2012" },
    ],
    },
    {
      key: "gum_guide",
      title: "GUM Guide",
      abbr: ["GUM"],
      description: "Specific GUM (Guide to the Expression of Uncertainty in Measurement) publications.",
      examples: [
        { input: "JCGM GUM-1:2022-11-28" },
        { input: "JCGM GUM-6:2020" },
    ],
    },
    {
      key: "amendment",
      title: "Amendment",
      abbr: ["Amd"],
      description: "Amendments to JCGM guides.",
      examples: [
        { input: "JCGM 100:2008/Amd 1" },
        { input: "JCGM 100:2008/Amd 1:2025-07-25" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "JCGM",
      dataType: "enum",
      values: ["JCGM"],
      example: "JCGM",
    },
    {
      name: "Number",
      description: "The guide number",
      dataType: "integer",
      format: "1–3 digit number.",
      example: "100",
    },
    {
      name: "Year",
      description: "Publication year",
      dataType: "year",
      format: "4-digit year, preceded by colon.",
      example: "2012",
    },
    {
      name: "Publisher Specific",
      description: "JCGM publisher info",
      attribute: "publisher",
    },
],
  algebra: [
    { type: "Amendment", description: "Modifies a JCGM guide", syntax: "JCGM [Number]:[Year]/Amd [N]:[Date]", example: "JCGM 100:2008/Amd 1:2025-07-25" },
],
}

export default jcgm
