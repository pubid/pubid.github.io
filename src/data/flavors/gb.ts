import type { Publisher } from '../types'

export const gb: Publisher = {
  flavor: "gb",
  name: "GB",
  fullName: "Chinese National Standards (Guobiao)",
  category: "national",
  description: "GB standards are China's national standards (Guobiao), issued by SAC (Standardization Administration of China). The prefix encodes the issuing body — GB (national), GB/T (recommended), GB/Z (guideline), GBn (formerly-prescribed internal), plus industry codes such as JB (machinery), HB (aviation), and social-group codes (T/{ORG}).",
  website: "https://www.sac.gov.cn",
  syntaxNotes: "Chinese standards follow: {Body}[/{Mandate}] {Number}[-{Part}]:-{Year}. The mandate letter after the slash states the legal force: T = recommended (推荐), Z = guideline (指导), none = mandatory (强制性). Social-group standards print the organization after T/ (T/GZAEPI 1-2020). Chinese typography uses an em-dash before the year (—2010); the ASCII hyphen is accepted.",
  urnPattern: "urn:pubid:gb:std:{number}:pub-{body}:mandate-{mandate}:year-{year}",
  relatedFlavors: ["jis", "iso", "iec"],
  docTypes: [
    {
      key: "standard",
      title: "National Standard",
      abbr: ["GB", "GB/T", "GB/Z", "GBn"],
      description: "A national standard: GB (mandatory), GB/T (recommended), GB/Z (guideline), and GBn (internal, historical). The body letter and mandate are part of the identity — GB 20223-2006 and GBn 20223-2006 are two different documents.",
      examples: [
        { input: "GB/T 20223-2006" },
        { input: "GB 1234-2010" },
        { input: "GB/Z 123-2008" },
        { input: "GBn 123-1990" },
        { input: "GB/T 5606.1-2004" },
        { input: "GB/T 5606 (all parts)" },
    ],
    },
    {
      key: "industry_standard",
      title: "Industry Standard",
      abbr: ["JB", "HB", "HB/Z"],
      description: "Standards issued by an industry body rather than SAC: JB (machinery), HB (aviation), and other two-letter industry codes, with the same mandate syntax (JB/T 13368-2018).",
      examples: [
        { input: "JB/T 13368-2018" },
        { input: "HB/Z 12-2010" },
    ],
    },
    {
      key: "social_group_standard",
      title: "Social Group Standard",
      abbr: ["T/{ORG}"],
      description: "Standards issued by a social group (社会团体), printed with the organization code after T/ — e.g. T/GZAEPI 001-2018.",
      examples: [
        { input: "T/GZAEPI 001-2018" },
    ],
    },
],
  components: [
    {
      name: "Issuing Body",
      description: "The body code as printed: GB, JB, GBn, T/{ORG}…",
      attribute: "publisher",
      dataType: "enum",
      values: ["GB", "GB/T", "GB/Z", "GBn", "JB", "HB", "T/{ORG}"],
      format: "Part of the identity — the series distinguishes two documents with one number",
      example: "GB/T",
    },
    {
      name: "Mandate",
      description: "Legal force letter carried after the slash",
      attribute: "mandate",
      dataType: "enum",
      values: ["T (recommended)", "Z (guideline)", "— (mandatory)"],
      example: "T",
    },
    {
      name: "Number",
      description: "Document number, possibly dotted with a part (5606.1)",
      attribute: "number",
      dataType: "string",
      example: "20223",
    },
    {
      name: "Part",
      description: "Part number, split from a dotted number on parse",
      attribute: "part",
      dataType: "string",
      example: "1",
    },
    {
      name: "Year",
      description: "Approval year, after an em-dash or hyphen",
      attribute: "year",
      dataType: "year",
      example: "2006",
    },
],
  algebra: [
    { type: "All Parts", description: "A reference to every part of a multi-part standard", syntax: "GB/T [Number] (all parts)", example: "GB/T 5606 (all parts)" },
    { type: "Part", description: "A part of a multi-part standard", syntax: "GB/T [Number].[Part]-[Year]", example: "GB/T 5606.1-2004" },
],
}

export default gb
