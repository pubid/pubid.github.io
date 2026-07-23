import type { Publisher } from '../types'

export const bsi: Publisher = {
  flavor: "bsi",
  logo: "/logos/bsi-logo.svg",
  name: "BSI",
  fullName: "British Standards Institution",
  category: "national",
  description: "BSI is the UK's National Standards Body, producing technical standards for a wide range of products and services. BSI also provides certification and standards-related services.",
  website: "https://www.bsigroup.com",
  syntaxNotes: "BSI identifiers use BS prefix with various type indicators. Adoptions of international standards use patterns like BS ISO, BS EN, BS EN ISO.",
  relatedFlavors: ["iso", "iec", "cen-cenelec"],
  docTypes: [
    {
      key: "british_standard",
      title: "British Standard",
      abbr: ["BS"],
      description: "The primary BSI standards deliverable.",
      examples: [
        { input: "BS 476-22:1987" },
        { input: "BS 8300-1:2018" },
        { input: "BS 9999:2017" },
    ],
    },
    {
      key: "adopted_international_standard",
      title: "Adopted International Standard",
      abbr: ["BS ISO", "BS IEC", "BS EN"],
      description: "British adoption of international (ISO, IEC) or European (EN) standards.",
      examples: [
        { input: "BS ISO 9001:2015" },
        { input: "BS EN ISO 13485:2016" },
        { input: "BS IEC 61131-3:2013" },
    ],
    },
    {
      key: "adopted_european_norm",
      title: "Adopted European Norm",
      abbr: ["BS EN"],
      description: "British adoption of European Standards.",
      examples: [
        { input: "BS EN 196-3:2005+A1:2008" },
        { input: "BS EN 1090-2:2018" },
    ],
    },
    {
      key: "aerospace_standard",
      title: "Aerospace Standard (Annex F series)",
      abbr: ["BS A", "BS Aerospace"],
      description: "Aerospace series standards — part of the BSI Annex F taxonomy covering automotive (BS AU), aerospace (BS A), and marine (BS MA) series designations.",
      examples: [
        { input: "BS A 242-A 245:1974+A1:2017" },
        { input: "BS A 246-A 249:1974+A1:2017" },
    ],
    },
    {
      key: "automotive_standard",
      title: "Automotive Standard (Annex F series)",
      abbr: ["BS AU"],
      description: "Automotive series standards from BSI's Annex F taxonomy.",
      examples: [
        { input: "BS AU 50-1:1971" },
    ],
    },
    {
      key: "marine_standard",
      title: "Marine Standard (Annex F series)",
      abbr: ["BS MA"],
      description: "Marine series standards from BSI's Annex F taxonomy.",
      examples: [
        { input: "BS MA 1:1967" },
    ],
    },
    {
      key: "publicly_available_specification",
      title: "Publicly Available Specification",
      abbr: ["PAS"],
      description: "Specifications published to meet urgent market needs.",
      examples: [
        { input: "PAS 9980:2022" },
    ],
    },
    {
      key: "technical_specification",
      title: "Technical Specification",
      abbr: ["PD TS"],
      description: "Published Documents providing technical guidance.",
      examples: [
        { input: "PD 5500:2023" },
    ],
    },
    {
      key: "flex",
      title: "Flex Standard",
      abbr: ["Flex"],
      description: "BSI Flex standards are evolved through continuous development.",
      examples: [
        { input: "BSI Flex 1880 v1.0:2022" },
        { input: "BSI Flex 1886 v3.0:2024" },
    ],
    },
    {
      key: "handbook",
      title: "Handbook",
      abbr: ["HB"],
      description: "BSI Handbooks providing reference material.",
      examples: [
        { input: "BS HB 1" },
    ],
    },
    {
      key: "amendment",
      title: "Amendment",
      abbr: ["Amd"],
      description: "Amendments to existing British Standards.",
      examples: [
        { input: "BS 476-22:1987+A1:2019" },
    ],
    },
    {
      key: "corrigendum",
      title: "Corrigendum",
      abbr: ["Cor"],
      description: "Corrections to published standards.",
      examples: [
        { input: "BS 9999:2017/Cor 1:2018" },
    ],
    },
    {
      key: "draft_document",
      title: "Draft for Development",
      abbr: ["DD"],
      description: "Draft documents for public comment.",
      examples: [
        { input: "14/30300822 DC" },
        { input: "21/30445138 DC" },
    ],
    },
    {
      key: "committee_document",
      title: "Committee Document",
      abbr: ["DC"],
      description: "Committee draft documents for consultation.",
      examples: [
        { input: "14/30300822 DC" },
    ],
    },
    {
      key: "published_document",
      title: "Published Document",
      abbr: ["PD"],
      description: "Published Documents that provide guidance.",
      examples: [
        { input: "PD 5500:2023" },
    ],
    },
    {
      key: "electronic_book",
      title: "Electronic Book",
      abbr: ["EB"],
      description: "Electronic versions of standards.",
      examples: [
        { input: "BS EB 1" },
    ],
    },
    {
      key: "expert_commentary",
      title: "Expert Commentary",
      abbr: ["EC"],
      description: "Expert commentary on standards.",
      examples: [
        { input: "BS EC 1" },
    ],
    },
    {
      key: "value_added_publication",
      title: "Value-Added Publication",
      abbr: ["VAP"],
      description: "Publications with additional content like commentary or redline.",
      examples: [
        { input: "BS VAP 1" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "BSI (or BS prefix)",
      dataType: "enum",
      values: ["BS", "BSI", "PAS"],
      example: "BS",
    },
    {
      name: "Adoption Source",
      description: "Adopted standard source (ISO, EN, IEC)",
      attribute: "adoption_source",
      dataType: "enum",
      values: ["ISO", "EN", "IEC", "EN ISO"],
      format: "Present when adopting another publisher's standard.",
      example: "ISO",
    },
    {
      name: "Document Type",
      description: "BS, PAS, PD, Flex, etc.",
      dataType: "enum",
      values: ["BS", "PAS", "PD", "Flex", "HB", "DD", "EB", "EC", "VAP"],
      example: "BS",
    },
    {
      name: "Number",
      description: "The document number",
      dataType: "string",
      format: "1–6 digit number, may include letters.",
      example: "476",
    },
    {
      name: "Part",
      description: "Part number",
      dataType: "integer",
      format: "Optional. After dash.",
      example: "22",
    },
    {
      name: "Year",
      description: "Publication year",
      dataType: "year",
      format: "4-digit year, preceded by colon.",
      example: "2015",
    },
    {
      name: "Amendment/Consolidated",
      description: "Consolidated amendment indicator",
      attribute: "consolidated",
      dataType: "compound",
      format: "After \"+\". E.g. +A1:2019 for incorporated amendment.",
      example: "+A1:2019",
    },
    {
      name: "Publisher Specific",
      description: "BSI-specific publisher codes",
      attribute: "publisher",
      dataType: "string",
      format: "Publisher-specific codes.",
      example: "A",
    },
    {
      name: "Date",
      description: "Date information",
      attribute: "date",
      dataType: "string",
      format: "Date for draft documents.",
      example: "14/30300822",
    },
],
  algebra: [
    { type: "Amendment", description: "Modifies a standard", syntax: "BS [Number]:[Year]+A[N]:[Year]", example: "BS 476-22:1987+A1:2019" },
    { type: "Corrigendum", description: "Corrects errors", syntax: "BS [Number]:[Year]/Cor [N]:[Year]", example: "BS 9999:2017/Cor 1:2018" },
    { type: "Adoption", description: "Adoption of ISO/EN/IEC", syntax: "BS [Source] [Number]:[Year]", example: "BS ISO 9001:2015" },
    { type: "Consolidated", description: "Base + incorporated amendments", syntax: "BS [Number]:[Year]+A[N]:[Year]", example: "BS A 242-A 245:1974+A1:2017" },
    { type: "Part", description: "Multi-part standard", syntax: "BS [Number]-[Part]:[Year]", example: "BS 8300-1:2018" },
    { type: "Bundle", description: "Multiple documents bundled", syntax: "BS [Number] + [Number]", example: "BS A 242-A 245:1974+A1:2017" },
    { type: "Set", description: "Document set", syntax: "BS [Number] Set", example: "BS 476 Set" },
],
}

export default bsi
