import type { Publisher } from '../types'

export const etsi: Publisher = {
  flavor: "etsi",
  logo: "/logos/etsi-logo.svg",
  name: "ETSI",
  fullName: "European Telecommunications Standards Institute",
  category: "regional",
  description: "ETSI produces globally applicable standards for Information and Communications Technologies (ICT), including fixed, mobile, radio, converged, broadcast, and internet technologies.",
  website: "https://www.etsi.org",
  syntaxNotes: "ETSI identifiers follow the pattern: ETSI [Type] [Number] V[Version] ([Date]). Types include EG (Guide), EN (Standard), ES (Specification), ET (Technical Report), GS (Group Specification), TS (Technical Specification), TR (Technical Report).",
  relatedFlavors: ["cen-cenelec", "itu", "iec"],
  docTypes: [
    {
      key: "etsi_standard",
      title: "ETSI Standard",
      abbr: ["EN", "ES", "EG", "ET", "GS", "TS", "TR", "SR"],
      description: "ETSI publishes various deliverable types: EN (European Standard), ES (ETSI Specification), EG (ETSI Guide), ET (ETSI Technical Report), GS (Group Specification), TS (Technical Specification), TR (Technical Report), SR (Special Report).",
      examples: [
        { input: "ETSI EG 200 053 V1.5.1 (2004-06)" },
        { input: "ETSI EN 300 392-2 V3.4.1 (2017-04)" },
        { input: "ETSI TS 102 023-2 V1.1.1 (2003-08)" },
        { input: "ETSI GS NFV 002 V1.2.1 (2014-10)" },
        { input: "ETSI TR 103 392 V1.1.1 (2016-11)" },
    ],
    },
    {
      key: "amendment",
      title: "Amendment",
      abbr: ["A"],
      description: "Amendments to ETSI documents.",
      examples: [
        { input: "ETSI ETR 108/A1 ed.1 (1995-08)" },
        { input: "ETSI ETS 300 011/A1 ed.1 (1994-12)" },
    ],
    },
    {
      key: "corrigendum",
      title: "Corrigendum",
      abbr: ["C"],
      description: "Corrections to ETSI documents.",
      examples: [
        { input: "ETSI ETR 053/C1 ed.2 (1997-03)" },
        { input: "ETSI ETR 094/C1 ed.1 (1994-03)" },
    ],
    },
    {
      key: "supplement_identifier",
      title: "Supplement",
      abbr: ["S"],
      description: "Supplements to ETSI base documents.",
      examples: [
        { input: "ETSI ETS 300 001 S1 ed.1 (1993-10)" },
    ],
    },
],
  components: [
    {
      name: "Type",
      description: "Document type prefix (EN, ES, EG, ET, GS, TS, TR)",
      dataType: "enum",
      values: ["EN (European Standard)", "ES (ETSI Specification)", "EG (ETSI Guide)", "ET (ETSI Technical Report)", "GS (Group Specification)", "TS (Technical Specification)", "TR (Technical Report)", "SR (Special Report)"],
      example: "EN",
    },
    {
      name: "Number",
      description: "The document number",
      dataType: "string",
      format: "Space-separated groups (e.g., 300 392-2). May include dash for parts.",
      example: "300 392-2",
    },
    {
      name: "Version",
      description: "Version number (V[major].[minor].[patch])",
      attribute: "version",
      dataType: "string",
      format: "V[Major].[Minor].[Patch] (Semantic versioning)",
      example: "V3.4.1",
    },
    {
      name: "Date",
      description: "Publication date in parentheses",
      dataType: "string",
      format: "YYYY-MM in parentheses.",
      example: "(2017-04)",
    },
    {
      name: "Edition",
      description: "Edition number (ed.N)",
      attribute: "edition",
      dataType: "string",
      format: "Optional. \"ed.[N]\"",
      example: "ed.2",
    },
],
  algebra: [
    { type: "Amendment", description: "Modifies a base document", syntax: "ETSI [Type] [Number]/A[N] ed.[N]", example: "ETSI ETR 108/A1 ed.1 (1995-08)" },
    { type: "Corrigendum", description: "Corrects errors", syntax: "ETSI [Type] [Number]/C[N] ed.[N]", example: "ETSI ETR 053/C1 ed.2 (1997-03)" },
    { type: "Supplement", description: "Supplementary content", syntax: "ETSI [Type] [Number] S[N] ed.[N]", example: "ETSI ETS 300 001 S1 ed.1 (1993-10)" },
],
}

export default etsi
