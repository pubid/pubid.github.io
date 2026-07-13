import type { Publisher } from '../types'

export const jis: Publisher = {
  flavor: "jis",
  logo: "/logos/jis-logo.svg",
  name: "JIS",
  fullName: "Japanese Industrial Standards",
  category: "national",
  description: "Japanese Industrial Standards (JIS) are national standards for industrial products and technologies in Japan. They are established by the Japanese Industrial Standards Committee (JISC) and published by the Japanese Standards Association.",
  website: "https://www.jsa.or.jp",
  syntaxNotes: "JIS identifiers follow the pattern: JIS [Letter] [Number]:[Year]. The letter indicates the industrial classification (A=Civil Engineering, B=Mechanical, C=Electrical, etc.).",
  relatedFlavors: ["iso", "plateau"],
  docTypes: [
    {
      key: "japanese_industrial_standard",
      title: "Japanese Industrial Standard",
      abbr: ["JIS"],
      description: "The primary JIS standard type, covering a letter-based classification system.",
      examples: [
        { input: "JIS A 0001:1999" },
        { input: "JIS B 0205-2:2019" },
        { input: "JIS C 60068-1:2019" },
        { input: "JIS K 2238:2019" },
    ],
    },
    {
      key: "standard",
      title: "Standard",
      abbr: [""],
      description: "General JIS standards.",
      examples: [
        { input: "JIS Z 8801-1:2019" },
    ],
    },
    {
      key: "technical_report",
      title: "Technical Report",
      abbr: ["TR"],
      description: "JIS Technical Reports.",
      examples: [
        { input: "JIS TR B 0001:2000" },
    ],
    },
    {
      key: "technical_specification",
      title: "Technical Specification",
      abbr: ["TS"],
      description: "JIS Technical Specifications.",
      examples: [
        { input: "JIS TS Z 0001:2000" },
    ],
    },
    {
      key: "amendment",
      title: "Amendment",
      abbr: ["Amd", "AM"],
      description: "Amendments to JIS standards.",
      examples: [
        { input: "JIS B 0205-2:2019/AM 1:2021" },
    ],
    },
    {
      key: "explanation",
      title: "Explanation",
      abbr: ["Exp"],
      description: "Explanatory documents for JIS standards.",
      examples: [
        { input: "JIS Exp A 0001:2000" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "JIS",
      dataType: "enum",
      values: ["JIS"],
      example: "JIS",
    },
    {
      name: "Classification Letter",
      description: "Industrial classification letter (A-Z)",
      attribute: "classification",
      dataType: "enum",
      values: ["A (Civil Eng.)", "B (Mechanical)", "C (Electrical)", "D (Automotive)", "E (Railway)", "F (Shipbuilding)", "G (Iron & Steel)", "H (Non-Ferrous Metals)", "K (Chemical)", "L (Textile)", "M (Mining)", "P (Pulp & Paper)", "Q (Quality)", "R (Ceramics)", "S (Domestic)", "T (Medical)", "W (Aerospace)", "X (Info Processing)", "Z (General/Misc.)"],
      example: "B",
    },
    {
      name: "Number",
      description: "The document number",
      dataType: "string",
      format: "4-digit number.",
      example: "0205",
    },
    {
      name: "Part",
      description: "Part number",
      dataType: "integer",
      format: "Optional. After dash.",
      example: "2",
    },
    {
      name: "Year",
      description: "Publication year",
      dataType: "year",
      format: "4-digit year, preceded by colon.",
      example: "2019",
    },
],
  algebra: [
    { type: "Amendment", description: "Modifies a JIS standard", syntax: "JIS [Letter] [Number]:[Year]/AM [N]:[Year]", example: "JIS B 0205-2:2019/AM 1:2021" },
    { type: "Part", description: "Multi-part standard", syntax: "JIS [Letter] [Number]-[Part]:[Year]", example: "JIS B 0205-2:2019" },
],
}

export default jis
