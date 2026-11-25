import type { Publisher } from '../types'

export const sae: Publisher = {
  flavor: "sae",
  logo: "/logos/sae-logo.svg",
  name: "SAE",
  fullName: "SAE International",
  category: "industry",
  description: "SAE International is a global association of engineers and technical experts in the aerospace, automotive, and commercial vehicle industries. SAE standards cover ground vehicles, aerospace, and other mobility engineering fields.",
  website: "https://www.sae.org",
  syntaxNotes: "SAE identifiers follow: SAE [Type] [Number]. Types include J (Ground Vehicle), AS (Aerospace), ARP (Aerospace Recommended Practice), AMS (Aerospace Material Specification).",
  urnPattern: "urn:sae:[type]:[designation]:[yyyy|yyyymm]  (the type is the downcased series code or bare std — urn:sae:j:3016, urn:sae:as:22520/45A; the designation is verbatim, slash, underscore and revision letter included — urn:sae:as:5259/7A_A1; the date is a year or the year-and-month edition date — urn:sae:j:3016:202104)",
  urnDocs: "/specs/sae-urn",
  relatedFlavors: ["ansi", "astm"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: ["J", "AS", "ARP", "AMS"],
      description: "SAE Standards covering ground vehicles (J-prefix), aerospace (AS-prefix), recommended practices (ARP), and material specifications (AMS).",
      examples: [
        { input: "SAE J3016" },
        { input: "SAE AS9100D" },
        { input: "SAE ARP4754A" },
        { input: "SAE AMS5500" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "SAE",
      dataType: "enum",
      values: ["SAE"],
      example: "SAE",
    },
    {
      name: "Type Prefix",
      description: "J, AS, ARP, AMS",
      attribute: "type_prefix",
    },
    {
      name: "Number",
      description: "The standard number",
      dataType: "string",
      format: "Alphanumeric. May include letter suffix for version.",
      example: "J3016",
    },
    {
      name: "Date",
      description: "Publication date",
      attribute: "date",
    },
],
  algebra: [
],
}

export default sae
