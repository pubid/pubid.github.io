import type { Publisher } from '../types'

export const cie: Publisher = {
  flavor: "cie",
  logo: "/logos/cie-logo.svg",
  name: "CIE",
  fullName: "International Commission on Illumination",
  category: "industry",
  description: "The CIE (Commission Internationale de l'Eclairage) is an independent, non-profit organization devoted to international cooperation and exchange of information on matters related to light, lighting, and color.",
  website: "https://www.cie.co.at",
  syntaxNotes: "CIE identifiers use numeric identifiers: CIE [Number]:[Year], CIE [Number]-[Part]:[Year]. Joint publications include CIE ISO prefix.",
  relatedFlavors: ["iso"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: [""],
      description: "CIE Standards defining specifications for lighting and color.",
      examples: [
        { input: "CIE 232:2019" },
        { input: "CIE 198-SP1.1:2011" },
    ],
    },
    {
      key: "joint_published",
      title: "Joint Published",
      abbr: ["CIE ISO"],
      description: "Standards jointly published with ISO.",
      examples: [
        { input: "CIE ISO 10916:2024" },
        { input: "CIE ISO 11664-1:2019" },
    ],
    },
    {
      key: "dual_published",
      title: "Dual Published",
      abbr: ["Dual"],
      description: "Dual-published with another organization.",
      examples: [
        { input: "CIE S 023/E:2020" },
    ],
    },
    {
      key: "identical",
      title: "Identical",
      abbr: ["Ident"],
      description: "Identical adoption of another standard.",
      examples: [
        { input: "CIE Ident 1:2020" },
    ],
    },
    {
      key: "conference",
      title: "Conference",
      abbr: ["Conf"],
      description: "CIE Conference proceedings.",
      examples: [
        { input: "CIE Conf 1:2020" },
    ],
    },
    {
      key: "bundle",
      title: "Bundle",
      abbr: ["Bundle"],
      description: "Bundled CIE publications.",
      examples: [
        { input: "CIE 198-SP1.1:2011,198-SP1.2:2011,198-SP1.3:2011,198-SP1.4:2011" },
    ],
    },
    {
      key: "corrigendum",
      title: "Corrigendum",
      abbr: ["Cor"],
      description: "Corrections to CIE publications.",
      examples: [
        { input: "CIE 198-SP1.4:2011/Cor1:2013" },
        { input: "CIE 232:2019/Cor1:2020" },
    ],
    },
    {
      key: "supplement",
      title: "Supplement",
      abbr: ["SP"],
      description: "Supplements to CIE publications.",
      examples: [
        { input: "CIE 198-SP1.1:2011" },
    ],
    },
    {
      key: "tutorial_bundle",
      title: "Tutorial Bundle",
      abbr: ["TB"],
      description: "CIE Tutorial Bundles.",
      examples: [
        { input: "CIE TB 1:2020" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "CIE",
      dataType: "enum",
      values: ["CIE"],
      example: "CIE",
    },
    {
      name: "Number",
      description: "The publication number",
      dataType: "integer",
      format: "1–4 digit number.",
      example: "232",
    },
    {
      name: "Part",
      description: "Supplement/part number",
    },
    {
      name: "Year",
      description: "Publication year",
      dataType: "year",
      format: "4-digit year, preceded by colon.",
      example: "2019",
    },
    {
      name: "Language",
      description: "Language code",
      attribute: "language",
    },
],
  algebra: [
    { type: "Corrigendum", description: "Corrects errors", syntax: "CIE [Number]:[Year]/Cor[N]:[Year]", example: "CIE 232:2019/Cor1:2020" },
    { type: "Bundle", description: "Multiple documents bundled", syntax: "CIE [Number],[Number],...", example: "CIE 198-SP1.1:2011,198-SP1.2:2011" },
    { type: "Joint Publication", description: "Published jointly with ISO", syntax: "CIE ISO [Number]:[Year]", example: "CIE ISO 10916:2024" },
],
}

export default cie
