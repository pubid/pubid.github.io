import type { Publisher } from '../types'

export const tgpp: Publisher = {
  flavor: "tgpp",
  logo: "/logos/tgpp-logo.svg",
  name: "3GPP",
  fullName: "3rd Generation Partnership Project",
  category: "industry",
  description: "3GPP (the 3rd Generation Partnership Project) is a collaboration agreement between telecommunications standards development organizations (ARIB, ATIS, CCSA, ETSI, TSDSI, TTA, TTC) established in 1998 to produce globally-applicable technical specifications and technical reports for a 3rd generation mobile system. 3GPP subsequently expanded its scope to cover GSM, LTE, 5G NR, and 6G study items. The 3GPP specifications underpin cellular networks worldwide — every GSM, UMTS, LTE, and 5G handset and base station relies on 3GPP specifications for its air interface, core network, and protocol stacks.",
  website: "https://www.3gpp.org",
  syntaxNotes: "3GPP identifiers use a type prefix (TS for Technical Specification, TR for Technical Report) followed by a dotted number, optional letter suffix (U, dcs, ext), 1-2 hyphenated parts, release token (REL-N, Ph1, UMTS, Release 2000), and three-part version (X.Y.Z). Default form has no publisher token; with_publisher=true adds '3GPP ' prefix.",
  urnPattern: "urn:3gpp:[type]:[number]:[release]:[version]",
  relatedFlavors: ["etsi", "ieee", "itu"],
  docTypes: [
    {
      key: "technical_specification",
      title: "Technical Specification (TS)",
      abbr: ["TS"],
      description: "Normative 3GPP specifications defining the mobile network standards. Numbered with a dotted core (e.g. 23.207), optional letter suffix (U, dcs, ext), and 1-2 hyphenated parts. Tagged with a release token (REL-N for releases 4+, plus legacy Ph1/Ph2/UMTS/Release 2000) and a three-part version (X.Y.Z) that increases with each revision.",
      examples: [
        { input: "TS 23.207:REL-4/2.0.0" },
        { input: "3GPP TS 23.207:REL-4/2.0.0" },
        { input: "TS 29.198-04-1:REL-5/5.0.0" },
        { input: "TS 26.171:REL-5/5.0.0" },
      ],
    },
    {
      key: "technical_report",
      title: "Technical Report (TR)",
      abbr: ["TR"],
      description: "Informative 3GPP reports covering feasibility studies, investigation results, and explanatory material that supports the normative TS documents. Same identifier shape as TS but with TR prefix. Often the precursor to a future TS — when a TR concludes that a feature is feasible, the work item is transferred to a TS.",
      examples: [
        { input: "TR 00.01U:UMTS/3.0.0" },
        { input: "3GPP TR 21.866:REL-15/15.0.0" },
        { input: "TR 22.891:REL-14/14.0.0" },
      ],
    },
  ],
  components: [
    { name: "Publisher", description: "3GPP — omitted by default, added when with_publisher=true", example: "3GPP" },
    { name: "Type Prefix", description: "TS for Technical Specification, TR for Technical Report", attribute: "type_prefix", example: "TS" },
    { name: "Number", description: "Dotted core (e.g. 23.207), kept as string to preserve leading zeros", attribute: "number", example: "23.207" },
    { name: "Suffix", description: "Optional letter suffix directly after number: 'U', 'dcs', 'ext'", attribute: "suffix", example: "U" },
    { name: "Parts", description: "1-2 hyphenated parts (e.g. -1, -04-1), strings preserve zero-padding", attribute: "parts", example: "-04-1" },
    { name: "Release", description: "Raw release token: 'REL-4', 'Ph1', 'UMTS', 'Release 2000'", attribute: "release", example: "REL-4" },
    { name: "Version", description: "Three-part version string (X.Y.Z)", attribute: "version", example: "2.0.0" },
  ],
  algebra: [
    { type: "Default Form", description: "No publisher prefix (default)", syntax: "<TS|TR> <number>[<suffix>][<parts>]:<release>/<version>", example: "TS 23.207:REL-4/2.0.0" },
    { type: "With Publisher", description: "Publisher prefix added", syntax: "3GPP <TS|TR> <number>[<suffix>][<parts>]:<release>/<version>", example: "3GPP TS 23.207:REL-4/2.0.0" },
    { type: "Multi-part", description: "Multi-part spec with hyphenated parts", syntax: "<TS|TR> <number>-<part1>[-<part2>]:<release>/<version>", example: "TS 29.198-04-1:REL-5/5.0.0" },
    { type: "Legacy Release", description: "Pre-REL-4 release tokens", syntax: "<TS|TR> <number>:<Ph1|Ph2|UMTS|Release 2000>/<version>", example: "TR 00.01U:UMTS/3.0.0" },
  ],
}

export default tgpp
