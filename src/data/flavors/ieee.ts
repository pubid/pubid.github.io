import type { Publisher } from '../types'

export const ieee: Publisher = {
  flavor: "ieee",
  logo: "/logos/ieee-logo.svg",
  name: "IEEE",
  fullName: "Institute of Electrical and Electronics Engineers",
  category: "international",
  description: "IEEE is the world's largest technical professional organization for the advancement of technology. IEEE Standards Association (IEEE SA) develops standards across a wide range of industries including power and energy, telecommunications, computing, and more.",
  website: "https://standards.ieee.org",
  syntaxNotes: "IEEE identifiers follow patterns like: IEEE Std [Number]-[Year], IEEE [Number]-[Year], IEEE [Draft Number]/D[DraftVersion]. Some include AIEE legacy identifiers.",
  urnPattern: "urn:ieee:std:[number]:[year]",
  relatedFlavors: ["iec", "iso", "csa", "bsi"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: ["Std"],
      description: "IEEE Standards define requirements, specifications, and best practices for technologies.",
      examples: [
        { input: "IEEE Std 802.3-2018" },
        { input: "IEEE Std 802.11-2020" },
        { input: "IEEE Std 754-2019" },
        { input: "IEEE Std 1588-2019" },
    ],
    },
    {
      key: "project_draft_identifier",
      title: "Project Draft",
      abbr: ["P"],
      description: "Draft standards under development, prefixed with P.",
      examples: [
        { input: "IEEE P802.3bf/D3.0" },
        { input: "IEEE P802.11be/D7.0" },
        { input: "IEEE P1453/D11, May 2023" },
    ],
    },
    {
      key: "adopted_standard",
      title: "Adopted Standard",
      abbr: ["Adopted"],
      description: "An IEEE adoption of another organization's standard.",
      examples: [
        { input: "IEEE Std 1244-5-2000 (Adopted from ISO/IEC 14102:1995)" },
    ],
    },
    {
      key: "dual_published",
      title: "Dual-Published Standard",
      abbr: ["Dual"],
      description: "Standards published jointly by IEEE and another organization (e.g., IEC/IEEE).",
      examples: [
        { input: "IEC/IEEE 62582-6:2022" },
        { input: "IEC/IEEE 60780-323:2023" },
    ],
    },
    {
      key: "iec_ieee_copublished",
      title: "IEC/IEEE Copublished",
      abbr: ["Copub"],
      description: "Standards jointly published by IEC and IEEE.",
      examples: [
        { input: "IEC/IEEE P60780-323, CDV1 2014" },
        { input: "IEC/IEEE P62582-6, FDIS May 2019" },
    ],
    },
    {
      key: "corrigendum",
      title: "Corrigendum",
      abbr: ["Cor", "Cor 1"],
      description: "Corrections to published IEEE standards.",
      examples: [
        { input: "IEEE Std 802.3-2018/Cor 1-2020" },
    ],
    },
    {
      key: "supplement_identifier",
      title: "Supplement",
      abbr: ["Suppl"],
      description: "Supplementary material to a base standard.",
      examples: [
        { input: "IEEE Std 802.3cg-2019 (Supplement to IEEE Std 802.3-2018)" },
    ],
    },
    {
      key: "redlined_standard",
      title: "Redlined Standard",
      abbr: ["Redline"],
      description: "A version showing changes from the previous edition with additions and deletions marked.",
      examples: [
        { input: "IEEE Std 802.3-2018 (Redline of IEEE Std 802.3-2015)" },
    ],
    },
    {
      key: "nesc",
      title: "NESC (National Electrical Safety Code)",
      abbr: ["NESC"],
      description: "The National Electrical Safety Code, published by IEEE.",
      examples: [
        { input: "2012 NESC Handbook, Seventh Edition" },
        { input: "2017 NESC Handbook, Premier Edition" },
    ],
    },
    {
      key: "si_standard",
      title: "SI Standard",
      abbr: ["SI"],
      description: "IEEE/ASTM SI 10 standard for metric/inch conversion.",
      examples: [
        { input: "IEEE/ASTM SI 10-2010" },
    ],
    },
    {
      key: "joint_development",
      title: "Joint Development",
      abbr: ["Joint"],
      description: "Standards under joint development by IEC and IEEE.",
      examples: [
        { input: "IEC/IEEE P60780-323, CDV1 2014" },
    ],
    },
    {
      key: "dual_identifier",
      title: "Dual Identifier",
      abbr: ["Dual"],
      description: "Standards with dual numbering from different organizations.",
      examples: [
        { input: "ANSI/IEEE Std 802.3-1985" },
    ],
    },
    {
      key: "conformance_identifier",
      title: "Conformance Identifier",
      abbr: ["Conformance"],
      description: "Conformance testing documentation.",
      examples: [
        { input: "IEEE Std 802.3.1-2013" },
    ],
    },
    {
      key: "interpretation_identifier",
      title: "Interpretation",
      abbr: ["Interp"],
      description: "Official interpretations of IEEE standards.",
      examples: [
        { input: "IEEE Std 802.3 Interpretation #1-2007" },
    ],
    },
    {
      key: "csa_dual_published",
      title: "CSA Dual-Published",
      abbr: ["CSA Dual"],
      description: "Standards dual-published with CSA Group.",
      examples: [
        { input: "IEEE Std C37.30.1-2017/CSA C22.2 No. 60038-1:17" },
    ],
    },
    {
      key: "multi_numbered_identifier",
      title: "Multi-Numbered Identifier",
      abbr: ["Multi"],
      description: "Standards with multiple designation numbers.",
      examples: [
        { input: "IEEE Std 802.3az-2010" },
    ],
    },
    {
      key: "parenthetical_identifier",
      title: "Parenthetical Identifier",
      abbr: ["Paren"],
      description: "Standards identified with parenthetical information.",
      examples: [
        { input: "IEEE 1016-2009 (Revision of IEEE 1016-1998)" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "IEEE, IEC/IEEE, or ANSI/IEEE",
      dataType: "enum",
      values: ["IEEE", "IEC/IEEE", "ANSI/IEEE"],
      example: "IEEE",
    },
    {
      name: "Draft Indicator",
      description: "P prefix for draft standards",
      attribute: "draft",
      dataType: "enum",
      values: ["P"],
      format: "Present only for draft standards. Replaces \"Std\".",
      example: "P",
    },
    {
      name: "Number",
      description: "The standard number",
      dataType: "string",
      format: "Alphanumeric. May contain dots (e.g., 802.3, C37.118)",
      example: "802.3",
    },
    {
      name: "Part",
      description: "Part number or subpart",
      dataType: "string",
      format: "Optional. Subpart after dot in number.",
      example: "1",
    },
    {
      name: "Year",
      description: "Publication or revision year",
      dataType: "year",
      format: "4-digit year, preceded by hyphen",
      example: "2018",
    },
    {
      name: "Draft Version",
      description: "Draft version number (e.g., D3.0)",
      dataType: "string",
      format: "Format: D[Major].[Minor]. Only for drafts.",
      example: "D3.0",
    },
    {
      name: "Relationship",
      description: "Relationship to other standards (Revision of, Amendment to)",
      attribute: "relationship",
      dataType: "string",
      format: "Optional. Describes relation to other standards (e.g., \"Revision of\", \"Amendment to\").",
      example: "Revision of IEEE 1016-1998",
    },
    {
      name: "Typed Stage",
      description: "Stage indicator (CDV, FDIS, etc.)",
      attribute: "typed_stage",
      dataType: "enum",
      values: ["CDV", "FDIS"],
      format: "Optional. For IEC/IEEE joint documents.",
      example: "CDV",
    },
],
  algebra: [
    { type: "Corrigendum", description: "Corrections to published standards", syntax: "IEEE Std [Number]-[Year]/Cor [N]-[Year]", example: "IEEE Std 802.3-2018/Cor 1-2020" },
    { type: "Supplement", description: "Additional content to base standard", syntax: "IEEE Std [Number][Suffix]-[Year]", example: "IEEE Std 802.3cg-2019" },
    { type: "Adoption", description: "Adoption of external standard", syntax: "IEEE Std [Number]-[Year] (Adopted from [ExternalID])", example: "IEEE Std 1244-5-2000 (Adopted from ISO/IEC 14102:1995)" },
    { type: "Copublished", description: "Joint IEC/IEEE publication", syntax: "IEC/IEEE [Number]-[Year]", example: "IEC/IEEE 62582-6:2022" },
    { type: "Draft", description: "Draft stage", syntax: "IEEE P[Number]/D[Version]", example: "IEEE P802.3bf/D3.0" },
],
}

export default ieee
