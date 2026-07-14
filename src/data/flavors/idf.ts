import type { Publisher } from '../types'

export const idf: Publisher = {
  flavor: "idf",
  logo: "/logos/idf-logo.png",
  name: "IDF",
  fullName: "International Dairy Federation",
  category: "industry",
  description: "The IDF is a source of scientific and technical expertise for the global dairy sector. IDF standards and methods of analysis are used internationally.",
  website: "https://www.fil-idf.org",
  syntaxNotes: "IDF identifiers follow: IDF [Type] [Number]-[Part]:[Year]. Types include no prefix (Standard), RM (Reviewed Method). Joint ISO/IDF publications exist.",
  relatedFlavors: ["iso"],
  docTypes: [
    {
      key: "international_standard",
      title: "International Standard",
      abbr: [""],
      description: "IDF International Standards for dairy products and methods.",
      examples: [
        { input: "IDF 148-1:2008" },
        { input: "IDF 146:2003" },
        { input: "IDF 140-1:2007" },
    ],
    },
    {
      key: "reviewed_method",
      title: "Reviewed Method",
      abbr: ["RM"],
      description: "IDF Reviewed Methods for dairy analysis.",
      examples: [
        { input: "IDF/RM 254:2022" },
        { input: "IDF/RM 233-1:2017" },
    ],
    },
    {
      key: "amendment",
      title: "Amendment",
      abbr: ["AMD"],
      description: "Amendments to IDF publications.",
      examples: [
        { input: "IDF 146:2003/AMD 1:2023" },
        { input: "IDF 140-1:2007/AMD 1:2012" },
    ],
    },
    {
      key: "corrigendum",
      title: "Corrigendum",
      abbr: ["COR"],
      description: "Corrections to IDF publications.",
      examples: [
        { input: "IDF 148-1:2008/COR 1:2009" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "IDF",
      dataType: "enum",
      values: ["IDF"],
      example: "IDF",
    },
    {
      name: "Number",
      description: "The publication number",
      dataType: "integer",
      format: "1–3 digit number.",
      example: "146",
    },
    {
      name: "Part",
      description: "Part number",
    },
    {
      name: "Year",
      description: "Publication year",
      dataType: "year",
      format: "4-digit year, preceded by colon.",
      example: "2003",
    },
],
  algebra: [
    { type: "Amendment", description: "Modifies an IDF standard", syntax: "IDF [Number]:[Year]/AMD [N]:[Year]", example: "IDF 146:2003/AMD 1:2023" },
    { type: "Corrigendum", description: "Corrects errors", syntax: "IDF [Number]:[Year]/COR [N]:[Year]", example: "IDF 148-1:2008/COR 1:2009" },
],
}

export default idf
