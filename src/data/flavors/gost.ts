import type { Publisher } from '../types'

export const gost: Publisher = {
  flavor: "gost",
  logo: "/logos/gost-logo.svg",
  name: "GOST",
  fullName: "Interstate Council for Standardization, Metrology and Certification (МГС / EASC)",
  category: "regional",
  description: "GOST (ГОСТ, from Gosudarstvennyy Standart, 'State Standard') is the regional standards system administered by the Euro-Asian Council for Standardization, Metrology and Certification (МГС / EASC), covering the Russian Federation, Belarus, Kazakhstan, Armenia, Kyrgyzstan, Moldova, Tajikistan, Uzbekistan, and several other CIS member states. GOST standards cover industrial products, measurement systems, engineering, and technology — comparable to ISO standards in scope. GOST R (ГОСТ Р) denotes Russian Federation national standards. The PubID GOST schema models both classes plus Identical Adoptions (the IDT relationship, where a GOST is structurally and technically identical to an adopted foreign standard, e.g., ГОСТ 31610.18-2016/IEC 60079-18:2014).",
  website: "https://easc.org.by",
  syntaxNotes: "GOST identifiers follow the shape: GOST [R][ <Copublisher>][ <Subtype>] <Number>[-<Year>][/<Adopted>][ (<Reference>)]. The Cyrillic 'ГОСТ' and Latin 'GOST' forms are interchangeable; PubID canonicalizes to Latin-script 'GOST'. The slash form (GOST X/Y) denotes an Identical Adoption (IDT) — both halves are part of the identifier.",
  urnPattern: "urn:gost:[type]:[number]:[year]",
  relatedFlavors: ["iso", "iec"],
  docTypes: [
    {
      key: "interstate_standard",
      title: "Interstate Standard",
      abbr: ["ГОСТ"],
      description: "Bare GOST — an interstate standard issued by the МГС (Межгосударственный совет по стандартизации, Euro-Asian Council for Standardization). Adopted by all CIS member states. The bare 'ГОСТ' (no R) form denotes interstate scope. Copublishers (ISO, IEC, ISP) may be embedded before the number when the standard is jointly published.",
      examples: [
        { input: "ГОСТ 14946-82" },
        { input: "GOST 14946-82", output: "GOST 14946-82" },
        { input: "GOST 2.312" },
        { input: "GOST ISO 9692-1" },
        { input: "GOST R ISO/IEC ISP 10609-9-95" },
      ],
    },
    {
      key: "national_standard",
      title: "National Standard (GOST R)",
      abbr: ["GOST R", "ГОСТ Р"],
      description: "GOST R (ГОСТ Р) — a Russian Federation national standard issued by Rosstandart (Федеральное агентство по техническому регулированию и метрологии). The 'R' suffix marks the standard as Russian-national rather than interstate. GOST R standards are not automatically adopted by other CIS states but may serve as the basis for future interstate GOSTs. Published since 1992, after the dissolution of the Soviet GOST system.",
      examples: [
        { input: "GOST R 34.12-2015" },
        { input: "GOST R 58904-2020" },
        { input: "GOST R ISO 9001-2011" },
      ],
    },
    {
      key: "identical_adoption",
      title: "Identical Adoption (IDT)",
      abbr: ["IDT"],
      description: "A GOST that is structurally and technically identical to an adopted foreign standard (IDT per ISO Guide 2). The slash IS part of the official GOST designation and is NOT optional. The GOST appears on the left of the slash, the adopted standard on the right. Modified (MOD) and Not Equivalent (NEQ) degrees of adoption are NOT modeled here — they are bibliographic metadata carried as Relaton relations, not as part of the identifier.",
      examples: [
        { input: "ГОСТ 31610.18-2016/IEC 60079-18:2014" },
        { input: "GOST R 58904-2020/ISO/TR 25901-1:2016" },
        { input: "GOST 31425.5-2025/ISO 9902-5:2001" },
      ],
    },
  ],
  components: [
    { name: "Publisher", description: "GOST — always rendered in canonical Latin-script form on output (Cyrillic ГОСТ is parsed but canonicalizes to GOST).", example: "GOST" },
    { name: "Scope Marker", description: "The optional 'R' suffix marks a Russian Federation national standard (GOST R). Absent for interstate GOSTs.", attribute: "national", example: "R" },
    { name: "Copublisher", description: "Optional copublisher when the GOST is jointly published or directly adopts another organization's standard: ISO, IEC, ISP, etc.", attribute: "copublisher", example: "ISO" },
    { name: "Subtype", description: "Optional subtype designation within the GOST system.", attribute: "subtype" },
    { name: "Number", description: "The standard number, may include dotted subparts (34.12)", attribute: "number", example: "14946" },
    { name: "Year", description: "Publication year, separated by a dash (or em-dash on input). May be absent on undated references.", attribute: "year", example: "82" },
    { name: "Adopted Reference", description: "Parenthesized adoption reference (MOD/NEQ degree — bibliographic only, not the IDT slash form)", attribute: "adopted_reference" },
  ],
  algebra: [
    { type: "Identical Adoption", description: "A GOST that is identical to an adopted foreign standard. Slash is part of the official designation.", syntax: "GOST [R] [Copublisher] [Number]-[Year]/[Adopted ID]", example: "GOST 31610.18-2016/IEC 60079-18:2014" },
    { type: "Joint Publication", description: "Copublisher embedded before the number for jointly-published standards", syntax: "GOST [Copublisher] [Number]-[Year]", example: "GOST ISO 9692-1" },
    { type: "National vs Interstate", description: "GOST R = Russian Federation national; bare GOST = CIS interstate (МГС).", syntax: "GOST [R?] [Number]-[Year]", example: "GOST R 34.12-2015" },
  ],
}

export default gost
