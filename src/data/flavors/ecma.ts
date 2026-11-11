import type { Publisher } from '../types'

export const ecma: Publisher = {
  flavor: "ecma",
  logo: "/logos/ecma-logo.svg",
  name: "ECMA",
  fullName: "Ecma International",
  category: "industry",
  description: "Ecma International (originally the European Computer Manufacturers Association, now officially Ecma International) is a standards organization for information and communication systems founded in 1961 and based in Geneva. Ecma is best known for the ECMAScript specification (the language behind JavaScript), the JSON data interchange format, the C# and Common Language Infrastructure specifications, the Office Open XML formats, and the Dart language. Ecma standards follow a simple numbering scheme (ECMA-N); the edition is part of the printed identifier as the glued suffix \" ed<N>\" (decimal editions like ed5.1 are real — ECMA-402), so each published edition keys its own index row.",
  website: "https://ecma-international.org",
  syntaxNotes: "ECMA identifiers follow three shapes depending on the document class. Standards: 'ECMA-<number>[-<part>][ ed<N>][ vol<N>]' (the publisher token joins the number directly with no space; part only appears for multi-part standards like ECMA-418-1; the edition is the glued ' ed<N>' suffix, rendered by default, and a volume segment exists for the ECMA-269 multi-volume set). The human edition spellings are pre-parse aliases (pubid #698): the case-insensitive cover form ('ECMA-262 Edition 5.1'), the dotted and spaced variants ('ed. 5.1', 'ed 5.1') and the bare trailing edition ('ECMA 262 5.1') all normalize onto 'ECMA-262 ed5.1'; the space separator form ('ECMA 6' → 'ECMA-6') keeps its number. Technical Reports: 'ECMA TR/<number>'. Mementos: 'ECMA MEM/<number>'.",
  urnPattern: "urn:ecma:[type]:[number][:part-N][:ed-edition][:vol-volume]",
  relatedFlavors: ["iso", "ieee", "w3c"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: [""],
      description: "Ecma International Standards — normative specifications including ECMAScript (ECMA-262), JSON (ECMA-404), C# (ECMA-334), Common Language Infrastructure (ECMA-335), Office Open XML (ECMA-376), and many others. Standards join the publisher token directly to the number with no space ('ECMA-262', not 'ECMA 262'). Multi-part standards append the part number with a hyphen (e.g. ECMA-418-1). The edition is the glued ' ed<N>' suffix on the printed identifier — 'ECMA-262 ed5.1' — and the human edition spellings ('ECMA-262 Edition 5.1', 'ECMA-262 ed. 5.1', 'ECMA-262 ed 5.1', bare trailing 'ECMA 262 5.1') parse in as aliases of the same identity (pubid #698).",
      examples: [
        { input: "ECMA-262" },
        { input: "ECMA-262 Edition 5.1", output: "ECMA-262 ed5.1" },
        { input: "ECMA-262 ed. 5.1", output: "ECMA-262 ed5.1" },
        { input: "ECMA 262 5.1", output: "ECMA-262 ed5.1" },
        { input: "ECMA-402 ed5.1" },
        { input: "ECMA-269 ed3 vol1" },
        { input: "ECMA 6", output: "ECMA-6" },
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
    { name: "Edition", description: "Edition, rendered by default as the glued ' ed<N>' suffix ('ECMA-262 ed5.1') — the index key is the printed identifier, so each edition keys its own row. Decimal editions like '5.1' occur (ECMA-402). Human spellings ('Edition 5.1', 'ed. 5.1', 'ed 5.1', bare trailing) are pre-parse aliases", attribute: "edition" },
    { name: "Volume", description: "Volume segment for the ECMA-269 multi-volume set ('ECMA-269 ed3 vol1'), rendered after the edition", attribute: "volume" },
  ],
  algebra: [
    { type: "Standard", description: "Publisher joined directly to number with no space", syntax: "ECMA-<number>[-<part>]", example: "ECMA-262" },
    { type: "Multi-part Standard", description: "Standard split into multiple parts", syntax: "ECMA-<number>-<part>", example: "ECMA-418-1" },
    { type: "Edition", description: "Glued edition suffix, rendered by default; human edition spellings are pre-parse aliases", syntax: "ECMA-<number> ed<N>", example: "ECMA-262 ed5.1" },
    { type: "Space separator", description: "The space form parses and normalises onto the hyphen form", syntax: "ECMA <number>", example: "ECMA 6" },
    { type: "Technical Report", description: "TR separated by space + slash", syntax: "ECMA TR/<number>", example: "ECMA TR/101" },
    { type: "Memento", description: "MEM separated by space + slash, year as number", syntax: "ECMA MEM/<year>", example: "ECMA MEM/1970" },
  ],
}

export default ecma
