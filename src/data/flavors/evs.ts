import type { Publisher } from '../types'

export const evs: Publisher = {
  flavor: "evs",
  name: "EVS",
  fullName: "Estonian Centre for Standardisation and Accreditation",
  category: "national",
  description: "EVS is Estonia's national standardization body. It publishes national EVS standards and adopts European (EN) and international (ISO, ISO/IEC) standards under the EVS prefix — e.g. \"EVS-EN ISO 9001:2015\".",
  website: "https://www.evs.ee",
  syntaxNotes: "EVS identifiers follow: EVS[-EN][-ISO[/IEC]] [Number]:[Year] with supplements after a slash (\"/A1:2024\"). Types: EVS (national), EVS-EN (European adoption), EVS-EN ISO / EVS-EN ISO/IEC (international adoption via EN), EVS-TS (technical specification), EVS-TR (technical report).",
  relatedFlavors: ["cen-cenelec", "iso", "iec"],
  docTypes: [
    {
      key: "estonian_standard",
      title: "Estonian Standard",
      abbr: ["EVS", "EVS-TS", "EVS-TR"],
      description: "A national EVS deliverable: the main EVS standard, plus EVS-TS (Technical Specification) and EVS-TR (Technical Report).",
      examples: [
        { input: "EVS 921:2019" },
        { input: "EVS-TS 1:2019" },
    ],
    },
    {
      key: "international_adoption",
      title: "European Adoption",
      abbr: ["EVS-EN"],
      description: "A European Norm adopted as an Estonian standard: \"EVS EN\". The EN itself may adopt an ISO or ISO/IEC document, giving three levels (EVS-EN ISO 9001).",
      examples: [
        { input: "EVS-EN 18216:2026" },
    ],
    },
    {
      key: "national_adoption",
      title: "International Adoption",
      abbr: ["EVS-EN ISO", "EVS-EN ISO/IEC"],
      description: "An ISO or ISO/IEC document adopted through a European Norm (EVS-EN ISO…) or directly. Supplements of the adopted document are carried after a slash (EVS-EN ISO 9001:2015/A1:2024).",
      examples: [
        { input: "EVS-EN ISO 9001:2015/A1:2024" },
        { input: "EVS-EN ISO/IEC 27017:2026" },
        { input: "EVS-EN ISO/IEC 27701:2025" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "EVS, with adoption chain prefixes EN, ISO, ISO/IEC",
      dataType: "enum",
      values: ["EVS", "EVS-EN", "EVS-EN ISO", "EVS-EN ISO/IEC"],
      example: "EVS-EN ISO",
    },
    {
      name: "Document Type",
      description: "Standard (default), TS, TR",
      dataType: "enum",
      values: ["", "TS", "TR"],
      format: "Between publisher and number (EVS-TS 1)",
      example: "TS",
    },
    {
      name: "Number",
      description: "The document number",
      attribute: "number",
      dataType: "string",
      example: "9001",
    },
    {
      name: "Year",
      description: "Publication year after the colon",
      attribute: "year",
      dataType: "year",
      example: "2015",
    },
    {
      name: "Supplement",
      description: "Amendment/corrigendum of the adopted document, after a slash",
      format: "A{n}:{year} (e.g. /A1:2024)",
      example: "/A1:2024",
    },
],
  algebra: [
    { type: "Adoption", description: "A national adoption of a European or international document", syntax: "EVS-EN ISO [Number]:[Year]", example: "EVS-EN ISO 9001:2015/A1:2024" },
    { type: "Amendment", description: "Amendment to the adopted document", syntax: "EVS [Number]:[Year]/A[n]:[Year]", example: "EVS-EN ISO 9001:2015/A1:2024" },
],
}

export default evs
