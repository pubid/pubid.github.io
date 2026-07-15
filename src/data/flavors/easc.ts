import type { Publisher } from '../types'

export const easc: Publisher = {
  flavor: "easc",
  logo: "/logos/easc-logo.svg",
  name: "EASC",
  fullName: "Euro-Asian Council for Standardization, Metrology and Certification (МГС)",
  category: "regional",
  description: "The Euro-Asian Council for Standardization, Metrology and Certification (EASC, Межгосударственный совет по стандартизации, метрологии и сертификации / МГС) is the intergovernmental standards body of the Commonwealth of Independent States (CIS). Founded in 1992, the EASC is the successor to the Soviet State Standards Commission and serves as the regional standards body for Armenia, Azerbaijan, Belarus, Georgia, Kazakhstan, Kyrgyzstan, Moldova, Russia, Tajikistan, Turkmenistan, Uzbekistan, and Ukraine. The EASC issues GOST interstate standards (modeled separately as the 'gost' flavor) and the EASC-series documents: ПМГ (Interstate Rules on Standardization) and РМГ (Interstate Recommendations on Standardization).",
  website: "https://easc.org.by",
  syntaxNotes: "EASC identifiers follow the shape: <Series>[ В] <Number>[-<Year>]. Series is ПМГ (Latin: PMG) for Interstate Rules or РМГ (Latin: RMG) for Interstate Recommendations. The optional Cyrillic 'В' marks a defense-related variant (stored as Latin 'V' for cross-script consistency). Canonical render is Cyrillic per mgscatalog.by. Year separator accepts ASCII hyphen OR Unicode em-dash/en-dash (Russian typographic convention).",
  urnPattern: "urn:easc:[series]:[number]:[year]",
  relatedFlavors: ["gost", "iso", "iec"],
  docTypes: [
    {
      key: "pmg",
      title: "Interstate Rules (ПМГ)",
      abbr: ["ПМГ", "PMG"],
      description: "ПМГ — Правила по межгосударственной стандартизации (Rules on interstate standardization). Procedural rules issued by EASC governing how interstate standards are proposed, drafted, adopted, and revised. The 'В' variant (Latin: V) marks a defense-related rule with restricted handling.",
      examples: [
        { input: "ПМГ 03-2025" },
        { input: "ПМГ 126-2013" },
        { input: "ПМГ В 31-2001" },
        { input: "PMG 03-2025", output: "ПМГ 03-2025" },
      ],
    },
    {
      key: "rmg",
      title: "Interstate Recommendations (РМГ)",
      abbr: ["РМГ", "RMG"],
      description: "РМГ — Рекомендации по межгосударственной стандартизации (Recommendations on interstate standardization). Technical recommendations issued by EASC covering measurement methods, calibration procedures, metrological terminology, and reference materials. Adopted by member states as guidance rather than binding requirements.",
      examples: [
        { input: "РМГ 151-2025" },
        { input: "РМГ 29-2013" },
        { input: "RMG 29-2013", output: "РМГ 29-2013" },
      ],
    },
  ],
  components: [
    { name: "Publisher", description: "EASC (МГС) — the issuing body", example: "EASC" },
    { name: "Series", description: "ПМГ (PMG) for Interstate Rules or РМГ (RMG) for Interstate Recommendations. Canonical render is Cyrillic.", attribute: "series", example: "ПМГ" },
    { name: "Variant", description: "Optional Cyrillic 'В' (Latin 'V') marking a defense-related variant.", attribute: "variant", example: "В" },
    { name: "Number", description: "Sequential document number, zero-padded", attribute: "number", example: "03" },
    { name: "Year", description: "Adoption year (2 or 4 digits), separated by hyphen or em-dash", attribute: "year", example: "2025" },
  ],
  algebra: [
    { type: "Interstate Rule", description: "ПМГ series — procedural rules", syntax: "ПМГ [В] <Number>-<Year>", example: "ПМГ 03-2025" },
    { type: "Interstate Recommendation", description: "РМГ series — technical recommendations", syntax: "РМГ <Number>-<Year>", example: "РМГ 29-2013" },
    { type: "Defense Variant", description: "Optional 'В' marks a defense-related document", syntax: "<Series> В <Number>-<Year>", example: "ПМГ В 31-2001" },
  ],
}

export default easc
