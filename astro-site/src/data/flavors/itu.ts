import type { Publisher } from '../types'

export const itu: Publisher = {
  flavor: "itu",
  logo: "/logos/itu-logo.svg",
  name: "ITU",
  fullName: "International Telecommunication Union",
  category: "international",
  description: "The ITU is the United Nations specialized agency for information and communication technologies. ITU standards (Recommendations) are fundamental to the operation of global telecommunications networks and services.",
  website: "https://www.itu.int",
  syntaxNotes: "ITU Recommendations follow the pattern: ITU-[Sector] [Series][Number]-[Year]. Sectors include R (Radiocommunication), T (Telecommunication Standardization), and D (Telecommunication Development).",
  relatedFlavors: ["iso", "iec"],
  docTypes: [
    {
      key: "recommendation",
      title: "Recommendation",
      abbr: ["Rec"],
      description: "ITU Recommendations (sometimes called ITU-T Standards) define specifications for telecommunications technologies.",
      examples: [
        { input: "ITU-R 01-201" },
        { input: "ITU-T G.992.1" },
        { input: "ITU-R SA.1014-4" },
        { input: "ITU-T E.164" },
    ],
    },
    {
      key: "supplement",
      title: "Supplement",
      abbr: ["Suppl"],
      description: "Supplementary material to an ITU Recommendation.",
      examples: [
        { input: "ITU-T G.992.1 Suppl 1" },
    ],
    },
    {
      key: "amendment",
      title: "Amendment",
      abbr: ["Amd"],
      description: "Modifications to an existing ITU Recommendation.",
      examples: [
        { input: "ITU-T G.992.1/Amd 1" },
    ],
    },
    {
      key: "corrigendum",
      title: "Corrigendum",
      abbr: ["Cor"],
      description: "Corrections to published ITU Recommendations.",
      examples: [
        { input: "ITU-T G.992.1/Cor 1" },
    ],
    },
    {
      key: "special_publication",
      title: "Operational Bulletin",
      abbr: ["OB"],
      description: "ITU Operational Bulletin — a cross-bureau periodic publication covering regulatory and administrative information from all three ITU sectors.",
      examples: [
        { input: "ITU OB No. 1283 (01/2024)" },
        { input: "ITU OB No. 1000" },
    ],
    },
    {
      key: "annex",
      title: "Annex",
      abbr: ["Annex"],
      description: "An annex to an ITU Special Publication (Operational Bulletin). Rendered as \"Annex to ITU OB No. [Number]\".",
      examples: [
        { input: "Annex to ITU OB No. 1000" },
    ],
    },
],
  components: [
    {
      name: "Sector",
      description: "ITU sector: R (Radiocommunication), T (Standardization), D (Development)",
      attribute: "sector",
      dataType: "enum",
      values: ["R (Radiocommunication)", "T (Standardization)", "D (Development)"],
      format: "Required. After hyphen following ITU.",
      example: "T",
    },
    {
      name: "Series",
      description: "The series letter (e.g., G, E, H, SA)",
      attribute: "series",
      dataType: "enum",
      values: ["G", "E", "H", "I", "J", "L", "M", "N", "P", "Q", "S", "T", "V", "X", "Y", "Z", "SA"],
      format: "Required. Follows sector, separated by dot.",
      example: "G",
    },
    {
      name: "Number",
      description: "The recommendation number",
      dataType: "string",
      format: "Series-specific. Often includes dot-separated sub-numbers.",
      example: "992.1",
    },
    {
      name: "Year",
      description: "Publication year",
      dataType: "year",
      format: "Optional. Preceded by hyphen.",
      example: "2019",
    },
],
  algebra: [
    { type: "Amendment", description: "Modifies a Recommendation", syntax: "ITU-[Sector] [Series].[Number]/Amd [N]", example: "ITU-T G.992.1/Amd 1" },
    { type: "Corrigendum", description: "Corrects errors", syntax: "ITU-[Sector] [Series].[Number]/Cor [N]", example: "ITU-T G.992.1/Cor 1" },
    { type: "Supplement", description: "Additional content", syntax: "ITU-[Sector] [Series].[Number] Suppl [N]", example: "ITU-T G.992.1 Suppl 1" },
],
}

export default itu
