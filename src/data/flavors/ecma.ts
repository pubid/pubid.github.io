import type { Publisher } from '../types'

export const ecma: Publisher = {
  flavor: "ecma",
  logo: "/logos/ecma-logo.svg",
  name: "ECMA",
  fullName: "Ecma International",
  category: "industry",
  description: "Ecma International (originally the European Computer Manufacturers Association, now officially Ecma International) is a standards organization for information and communication systems founded in 1961 and based in Geneva. Ecma is best known for the ECMAScript specification (the language behind JavaScript), the JSON data interchange format, the C# and Common Language Infrastructure specifications, the Office Open XML formats, and the Dart language. Ecma standards follow a simple numbering scheme (ECMA-N) with no edition in the printed identifier — editions are tracked as separate metadata.",
  website: "https://ecma-international.org",
  syntaxNotes: "ECMA identifiers follow three shapes depending on the document class. Standards: 'ECMA-<number>[-<part>]' (the publisher token joins the number directly with no space; part only appears for multi-part standards like ECMA-418-1). Technical Reports: 'ECMA TR/<number>'. Mementos: 'ECMA MEM/<number>'. Edition is separate metadata and is NOT rendered in the printed identifier string.",
  urnPattern: "urn:ecma:[type]:[number]:[part]",
  relatedFlavors: ["iso", "ieee", "w3c"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: [""],
      description: "Ecma International Standards — normative specifications including ECMAScript (ECMA-262), JSON (ECMA-404), C# (ECMA-334), Common Language Infrastructure (ECMA-335), Office Open XML (ECMA-376), and many others. Standards join the publisher token directly to the number with no space ('ECMA-262', not 'ECMA 262'). Multi-part standards append the part number with a hyphen (e.g. ECMA-418-1).",
      examples: [
        { input: "ECMA-262" },
        { input: "ECMA-334" },
        { input: "ECMA-335" },
        { input: "ECMA-376" },
        { input: "ECMA-404" },
        { input: "ECMA-418-1" },
      ],
    },
    {
      key: "technical_report",
      title: "Technical Report",
      abbr: ["TR"],
      description: "Ecma Technical Reports — informative documents providing technical guidance, rationale, or experimental results that support Ecma Standards. Identified by the 'TR/' separator between the publisher token and the sequence number.",
      examples: [
        { input: "ECMA TR/101" },
        { input: "ECMA TR/53" },
      ],
    },
    {
      key: "memento",
      title: "Memento",
      abbr: ["MEM"],
      description: "Ecma Mementos — annual snapshot documents summarizing Ecma's organization, members, and activities for a given year. Identified by the 'MEM/' separator and the year (e.g. ECMA MEM/1970).",
      examples: [
        { input: "ECMA MEM/1970" },
        { input: "ECMA MEM/2024" },
      ],
    },
  ],
  components: [
    { name: "Publisher", description: "ECMA — joined directly to standard number with no space ('ECMA-262'), separated by a space for TR/MEM ('ECMA TR/101')", example: "ECMA" },
    { name: "Type Prefix", description: "nil for Standards, 'TR' for Technical Reports, 'MEM' for Mementos", attribute: "type_prefix" },
    { name: "Number", description: "Document number, kept as a string to preserve any leading zeros", attribute: "number", example: "262" },
    { name: "Part", description: "Part number for multi-part standards, appended with hyphen (e.g. '-1' in ECMA-418-1)", attribute: "part", example: "1" },
    { name: "Edition", description: "Edition metadata (separate from the printed identifier). Decimal editions like '5.1' occur. NOT rendered in to_s.", attribute: "edition" },
  ],
  algebra: [
    { type: "Standard", description: "Publisher joined directly to number with no space", syntax: "ECMA-<number>[-<part>]", example: "ECMA-262" },
    { type: "Multi-part Standard", description: "Standard split into multiple parts", syntax: "ECMA-<number>-<part>", example: "ECMA-418-1" },
    { type: "Technical Report", description: "TR separated by space + slash", syntax: "ECMA TR/<number>", example: "ECMA TR/101" },
    { type: "Memento", description: "MEM separated by space + slash, year as number", syntax: "ECMA MEM/<year>", example: "ECMA MEM/1970" },
    { type: "Without Publisher", description: "Bare form, no leading ECMA token", syntax: "-<number> | TR/<number> | MEM/<year>", example: "-262" },
  ],
}

export default ecma
