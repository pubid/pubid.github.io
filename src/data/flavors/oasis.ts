import type { Publisher } from '../types'

export const oasis: Publisher = {
  flavor: "oasis",
  logo: "/logos/oasis-logo.svg",
  name: "OASIS",
  fullName: "Organization for the Advancement of Structured Information Standards",
  category: "industry",
  description: "OASIS is a global nonprofit consortium that drives the development, convergence, and adoption of open standards for the information society. Founded in 1993 as SGML Open, OASIS produces some of the most widely deployed standards in the world, including SAML (federated identity), DocBook (technical documentation), OpenDocument (ODF — office document format), AMQP (messaging), DITA (technical publishing), and a large family of cybersecurity, privacy, and emergency-management standards. OASIS standards are developed through an open, multi-stage process: Committee Specifications → Candidate OASIS Standards → OASIS Standard (the normative, ratified form).",
  website: "https://www.oasis-open.org",
  syntaxNotes: "OASIS identifiers are slug-based with inconsistent internal structure (spec name + version + approval stage + part + label, in varying order). The PubID schema preserves the exact printed slug verbatim in `original` (which alone drives `to_s`); the remaining component fields (spec, version, stage, part) are best-effort decomposition for relaton querying and may be nil.",
  urnPattern: "urn:oasis:[spec]:[version]",
  relatedFlavors: ["iso", "w3c", "ogc"],
  docTypes: [
    {
      key: "standard",
      title: "OASIS Standard",
      abbr: [""],
      description: "An OASIS specification at any stage of the standards lifecycle (Committee Specification, Candidate OASIS Standard, OASIS Standard, or errata). The slug carries the spec name, version, stage abbreviation (e.g. PS01 for Public Review Draft 1, CS01 for Committee Specification 1), and optional part label. The PubID schema always preserves the exact slug — round-trip is lossless regardless of how the slug is decomposed.",
      examples: [
        { input: "OASIS OSLC-CoreShapes-3.0-PS01-Pt8" },
        { input: "OASIS saml-core-2.0-os" },
        { input: "OASIS docbook-5.0-os" },
        { input: "OASIS opendocument-v1.2-os" },
        { input: "OASIS amqp-core-1.0-os" },
        { input: "OASIS dita-v1.3-part0-os" },
      ],
    },
  ],
  components: [
    { name: "Publisher", description: "OASIS — omitted when with_publisher=false", example: "OASIS" },
    { name: "Original Slug", description: "The exact slug printed after 'OASIS ' — always set, drives to_s. Lossless round-trip regardless of decomposition.", attribute: "original", example: "OSLC-CoreShapes-3.0-PS01-Pt8" },
    { name: "Spec", description: "Best-effort spec name fragment (e.g. 'OSLC-CoreShapes', 'saml-core'). May be nil.", attribute: "spec", example: "saml-core" },
    { name: "Version", description: "Best-effort version fragment (e.g. '3.0', '2.0', 'v1.3'). May be nil.", attribute: "version", example: "2.0" },
    { name: "Stage", description: "Approval stage fragment (e.g. 'PS01', 'CS01', 'OS', 'COS', 'Errata01'). May be nil.", attribute: "stage", example: "PS01" },
    { name: "Part", description: "Part label fragment (e.g. 'Pt8', 'Part1', 'part0'). May be nil.", attribute: "part", example: "Pt8" },
  ],
  algebra: [
    { type: "Full Slug", description: "Publisher + verbatim slug (lossless round-trip)", syntax: "OASIS <original>", example: "OASIS saml-core-2.0-os" },
    { type: "Without Publisher", description: "Bare slug form (no 'OASIS ' prefix)", syntax: "<original>", example: "saml-core-2.0-os" },
    { type: "Stage Lifecycle", description: "Slug encodes stage (PS01 → CS01 → OS → Errata01)", syntax: "<spec>-<version>-<stage>", example: "OSLC-CoreShapes-3.0-PS01" },
  ],
}

export default oasis
