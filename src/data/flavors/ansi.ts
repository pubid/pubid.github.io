import type { Publisher } from '../types'

export const ansi: Publisher = {
  flavor: "ansi",
  logo: "/logos/ansi-logo.svg",
  name: "ANSI",
  fullName: "American National Standards Institute",
  category: "national",
  description: "ANSI oversees the creation, promulgation, and use of thousands of norms and guidelines that directly impact businesses in nearly every sector. ANSI is also actively engaged in accrediting programs that assess conformance to standards.",
  website: "https://www.ansi.org",
  syntaxNotes: "ANSI identifiers follow simple patterns: ANSI [Number]-[Year] or ANSI/[Developer] [Number]-[Year].",
  relatedFlavors: ["ieee", "astm", "asme", "nist"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: [""],
      description: "ANSI American National Standards.",
      examples: [
        { input: "ANSI 802.3-2012" },
        { input: "ANSI C135.14-1979" },
        { input: "ANSI Z49.1:2012" },
    ],
    },
    {
      key: "american_national_standard",
      title: "American National Standard",
      abbr: ["ANS"],
      description: "Formally designated American National Standards.",
      examples: [
        { input: "ANSI/AAMI ST79:2017" },
        { input: "ANSI/ASHRAE 15-2019" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "ANSI, or ANSI/[Developer]",
      dataType: "enum",
      values: ["ANSI", "ANSI/[Developer]"],
      format: "Developer can be AAMI, ASHRAE, etc.",
      example: "ANSI",
    },
    {
      name: "Number",
      description: "The standard number",
      dataType: "string",
      format: "Alphanumeric identifier.",
      example: "802.3",
    },
    {
      name: "Year",
      description: "Publication year",
      dataType: "year",
      format: "4-digit year, preceded by hyphen or colon.",
      example: "2012",
    },
],
  algebra: [
],
}

export default ansi
