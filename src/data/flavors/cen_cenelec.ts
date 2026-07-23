import type { Publisher } from '../types'

export const cen_cenelec: Publisher = {
  flavor: "cen-cenelec",
  logo: "/logos/cen-logo.svg",
  logos: ["/logos/cen-logo.svg", "/logos/cenelec-logo.png"],
  name: "CEN-CENELEC",
  fullName: "CEN and CENELEC — European Standardization Organizations",
  category: "regional",
  description: "CEN (European Committee for Standardization) and CENELEC (European Committee for Electrotechnical Standardization) are two distinct organizations managed by a single body, the CEN-CENELEC Management Centre (CCMC). They share a unified publishing system, identifier grammar, and catalogue. CEN cooperates with ISO (Vienna Agreement) and CENELEC cooperates with IEC (Frankfurt Agreement). Both are recognized by the EU and EFTA.",
  website: "https://www.cencenelec.eu",
  syntaxNotes: "CEN-CENELEC identifiers use EN (European Norm) designations with CEN or CLC (CENELEC) publisher prefixes. Patterns: EN [Number]:[Year], CEN/TS [Number]:[Year], CLC/TR [Number]:[Year], CEN/CLC [Type] [Number]:[Year]. CENELEC ENs in the IEC number range (e.g. EN 6XXXX) implicitly adopt the corresponding IEC publication; parts break this implicit adoption and require an explicit BS EN IEC form.",
  urnPattern: "urn:cen:std:en:[number]:[year]",
  relatedFlavors: ["iso", "iec", "bsi"],
  docTypes: [
    {
      key: "european_norm",
      title: "European Norm",
      abbr: ["EN"],
      description: "EN standards are European Standards that must be adopted by all CEN national members. CENELEC ENs in the IEC number range (e.g. EN 6XXXX) carry an implicit IEC adoption.",
      examples: [
        { input: "EN 196-3:2005+A1:2008" },
        { input: "EN 527-2:2016+A1:2019" },
        { input: "EN 1090-2:2018" },
        { input: "EN 60034-1:2010" },
    ],
    },
    {
      key: "european_prestandard",
      title: "European Prestandard",
      abbr: ["ENV"],
      description: "Provisional standards published for provisional application.",
      examples: [
        { input: "ENV 1991-1:1994" },
    ],
    },
    {
      key: "technical_specification",
      title: "Technical Specification",
      abbr: ["CEN/TS"],
      description: "CEN Technical Specifications for provisional use.",
      examples: [
        { input: "CEN/TS 14243:2012" },
    ],
    },
    {
      key: "technical_report",
      title: "Technical Report",
      abbr: ["CEN/TR"],
      description: "Informative documents from CEN.",
      examples: [
        { input: "CEN/TR 15522-1:2007" },
    ],
    },
    {
      key: "cen_workshop_agreement",
      title: "CEN Workshop Agreement",
      abbr: ["CWA"],
      description: "Documents developed through an open CEN Workshop process.",
      examples: [
        { input: "CWA 15261-1:2005" },
    ],
    },
    {
      key: "guide",
      title: "Guide",
      abbr: ["CLC Guide", "CEN Guide"],
      description: "Guidance documents from CEN or CENELEC.",
      examples: [
        { input: "CLC Guide 1:2022" },
    ],
    },
    {
      key: "harmonization_document",
      title: "Harmonization Document",
      abbr: ["HD"],
      description: "CENELEC Harmonization Documents.",
      examples: [
        { input: "HD 60364-1:2008" },
    ],
    },
    {
      key: "amendment",
      title: "Amendment",
      abbr: ["Amd"],
      description: "Amendments to European Norms.",
      examples: [
        { input: "EN ISO 13485:2016/A1:2024" },
    ],
    },
    {
      key: "corrigendum",
      title: "Corrigendum",
      abbr: ["Cor", "AC"],
      description: "Corrections to CEN publications.",
      examples: [
        { input: "EN ISO 13485:2016/AC:2016" },
    ],
    },
    {
      key: "consolidated_identifier",
      title: "Consolidated Version",
      abbr: ["+A"],
      description: "Base standard with incorporated amendments.",
      examples: [
        { input: "EN 196-3:2005+A1:2008" },
        { input: "EN 527-2:2016+A1:2019" },
    ],
    },
    {
      key: "adopted_european_norm",
      title: "Adopted European Norm",
      abbr: ["EN ISO", "EN IEC"],
      description: "European adoption of international (ISO/IEC) standards.",
      examples: [
        { input: "EN ISO 13485:2016/AC:2016" },
        { input: "EN ISO 13485:2016/AC:2017" },
    ],
    },
    {
      key: "fragment",
      title: "Fragment",
      abbr: ["Frag"],
      description: "Specific fragment of a CEN document.",
      examples: [
        { input: "EN 196-3:2005+A1:2008 Frag 1" },
    ],
    },
    {
      key: "european_specification",
      title: "European Specification",
      abbr: ["ES"],
      description: "CEN European Specifications.",
      examples: [
        { input: "ES 59001:2004" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "CEN, CENELEC (CLC), or joint designations",
    },
    {
      name: "Document Type",
      description: "EN, CEN/TS, CEN/TR, CWA, HD, etc.",
    },
    {
      name: "Number",
      description: "The document number",
    },
    {
      name: "Part",
      description: "Part number",
    },
    {
      name: "Year",
      description: "Publication year",
    },
    {
      name: "Consolidated",
      description: "Consolidated amendment indicator (+A1, +A2)",
      attribute: "consolidated",
    },
],
  algebra: [
    { type: "Amendment", description: "Modifies a European Norm", syntax: "EN [Number]:[Year]/A[N]:[Year]", example: "EN 196-3:2005+A1:2008" },
    { type: "Corrigendum", description: "Corrects errors", syntax: "EN [Number]:[Year]/AC:[Year]", example: "EN ISO 13485:2016/AC:2016" },
    { type: "Consolidated", description: "Base + amendments", syntax: "EN [Number]:[Year]+A[N]:[Year]", example: "EN 196-3:2005+A1:2008" },
    { type: "Adoption", description: "Adoption of ISO/IEC standards", syntax: "EN ISO [Number]:[Year]", example: "EN ISO 13485:2016" },
],
}

export default cen_cenelec
