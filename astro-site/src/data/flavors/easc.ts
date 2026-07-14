import type { Publisher } from '../types'

// EASC (МГС) is the Euro-Asian Council for Standardization, Metrology and
// Certification — the intergovernmental body that issues GOST standards.
// The pubid gem models GOST as the identifier flavor (not EASC), so this
// entry documents the issuing organization and points to the GOST flavor
// for actual identifier parsing.
export const easc: Publisher = {
  flavor: "easc",
  logo: "/logos/easc-logo.svg",
  name: "EASC",
  fullName: "Euro-Asian Council for Standardization, Metrology and Certification (МГС)",
  category: "regional",
  description: "The Euro-Asian Council for Standardization, Metrology and Certification (EASC, Межгосударственный совет по стандартизации, метрологии и сертификации / МГС) is the intergovernmental standards body of the Commonwealth of Independent States (CIS). Founded in 1992, the EASC is the successor to the Soviet State Standards Commission and serves as the regional standards body for Armenia, Azerbaijan, Belarus, Georgia, Kazakhstan, Kyrgyzstan, Moldova, Russia, Tajikistan, Turkmenistan, Uzbekistan, and Ukraine. The EASC issues the GOST (ГОСТ) family of interstate standards and the GOST R (ГОСТ Р) Russian Federation national standards. PubID models the EASC's identifier system under the 'gost' flavor — see the GOST publisher schema for the actual identifier classes (Interstate Standard, National Standard, Identical Adoption).",
  website: "https://easc.org.by",
  syntaxNotes: "EASC itself is the issuing body; its identifier system is GOST. See the GOST publisher schema for the actual identifier grammar (Interstate Standard, National Standard GOST R, Identical Adoption). EASC identifiers in bibliographic citations appear as 'EASC [N]' for council resolutions and procedural documents.",
  urnPattern: "urn:easc:[document]:[number]:[year]",
  relatedFlavors: ["gost", "iso", "iec"],
  docTypes: [
    {
      key: "council_resolution",
      title: "Council Resolution",
      abbr: ["МГС", "EASC"],
      description: "Procedural and policy resolutions of the Euro-Asian Council for Standardization. These govern how GOST standards are proposed, drafted, adopted, and revised. Numbered sequentially per council session.",
      examples: [
        { input: "EASC Resolution 30-2022" },
        { input: "МГС Решение 30-2022" },
      ],
    },
    {
      key: "interstate_standard",
      title: "Interstate Standard (GOST)",
      abbr: ["GOST"],
      description: "An EASC-issued interstate standard — the canonical GOST. Adopted by all CIS member states. Full identifier grammar is in the GOST publisher schema; this entry exists so users searching for EASC find the canonical GOST reference.",
      examples: [
        { input: "GOST 14946-82" },
        { input: "GOST ISO 9692-1" },
      ],
    },
  ],
  components: [
    { name: "Publisher", description: "EASC (МГС) — the issuing body", example: "EASC" },
    { name: "Document Type", description: "Council Resolution or Interstate Standard", attribute: "document" },
    { name: "Number", description: "Sequential document number, may include session prefix", attribute: "number" },
    { name: "Year", description: "Adoption year, separated by hyphen", attribute: "year" },
  ],
  algebra: [
    { type: "Issues", description: "EASC is the issuing body for GOST interstate standards", syntax: "EASC → GOST [Number]-[Year]", example: "EASC → GOST 14946-82" },
    { type: "Council Resolution", description: "Procedural resolutions numbered per session", syntax: "EASC Resolution [Session]-[Year]", example: "EASC Resolution 30-2022" },
  ],
}

export default easc
