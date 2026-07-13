import type { Publisher } from '../types'

export const csa: Publisher = {
  flavor: "csa",
  logo: "/logos/csa-logo.svg",
  name: "CSA",
  fullName: "CSA Group",
  category: "national",
  description: "CSA Group is a global organization dedicated to safety, social good, and sustainability. CSA develops standards for a wide range of products and services, with particular strength in electrical, gas, and construction standards.",
  website: "https://www.csagroup.org",
  syntaxNotes: "CSA identifiers follow patterns: CSA [Number]:[Year], CAN/CSA-[Number]:[Year] (Canadian national), CSA-[Number]:[Year]. Combined identifiers use / separator.",
  relatedFlavors: ["ieee", "iec", "bsi"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: [""],
      description: "CSA Standards defining requirements for products and services.",
      examples: [
        { input: "CSA Z662:23" },
        { input: "CSA A23.1:24" },
        { input: "CSA N285.0:23" },
    ],
    },
    {
      key: "canadian_adopted",
      title: "Canadian Adopted Standard",
      abbr: ["CAN/CSA"],
      description: "Canadian national adoption of standards, prefixed with CAN/.",
      examples: [
        { input: "CAN/CSA-ISO 9001:2016" },
        { input: "CAN/CSA-C22.2 No. 60601-1-6:11" },
    ],
    },
    {
      key: "csa_adopted",
      title: "CSA Adopted Standard",
      abbr: ["CSA Adopted"],
      description: "CSA adoption of another organization's standard.",
      examples: [
        { input: "CSA-ISO 9001:2016" },
    ],
    },
    {
      key: "combined",
      title: "Combined Standard",
      abbr: ["Combined"],
      description: "Combined documents with multiple designations using / separator.",
      examples: [
        { input: "CSA A23.1:24/CSA A23.2:24" },
        { input: "CSA N285.0:23/CSA N285.6 SERIES:23" },
    ],
    },
    {
      key: "bundled",
      title: "Bundled Standard",
      abbr: ["Bundled"],
      description: "Multiple documents bundled with + separator.",
      examples: [
        { input: "CAN/CSA-C22.2 NO. 60601-1-6:11 + A1:15 + A2:21 (R2021) (CONSOLIDATED)" },
    ],
    },
    {
      key: "series",
      title: "Series",
      abbr: ["SERIES"],
      description: "Series designation for related standards.",
      examples: [
        { input: "CSA N285.6 SERIES:23" },
    ],
    },
    {
      key: "package",
      title: "Package",
      abbr: ["PKG"],
      description: "Packaged set of standards.",
      examples: [
        { input: "CSA PKG A23.1:24" },
    ],
    },
    {
      key: "cec",
      title: "CEC",
      abbr: ["CEC"],
      description: "California Energy Commission related standards.",
      examples: [
        { input: "CEC-400-2021-001" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "CSA, CAN/CSA",
      dataType: "enum",
      values: ["CSA", "CAN/CSA"],
      format: "CAN/ prefix for Canadian National Standards.",
      example: "CSA",
    },
    {
      name: "Number",
      description: "The standard number",
      dataType: "string",
      format: "May include \"NO.\" prefix and dash-separated parts.",
      example: "N285.6",
    },
    {
      name: "Year",
      description: "Publication year (2 or 4 digit)",
      dataType: "year",
      format: "2 or 4 digit year, preceded by colon.",
      example: ":23",
    },
    {
      name: "Adoption Prefix",
      description: "CAN/ prefix for Canadian adoption",
      attribute: "adoption_prefix",
    },
],
  algebra: [
    { type: "Adoption", description: "Adoption of international standard", syntax: "CAN/CSA-[Source] [Number]:[Year]", example: "CAN/CSA-ISO 9001:2016" },
    { type: "Combined", description: "Multiple standards combined", syntax: "CSA [Number]:[Year]/CSA [Number]:[Year]", example: "CSA A23.1:24/CSA A23.2:24" },
    { type: "Bundled", description: "Documents bundled with amendments", syntax: "CSA [Number]:[Year] + A[N]:[Year]", example: "CAN/CSA-C22.2 NO. 60601-1-6:11 + A1:15 + A2:21" },
],
}

export default csa
