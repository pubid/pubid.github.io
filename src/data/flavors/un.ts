import type { Publisher } from '../types'

export const un: Publisher = {
  flavor: "un",
  name: "UN",
  fullName: "United Nations documents",
  category: "international",
  description: "PubID parses United Nations document symbols — the slash-separated designations used across UN organs and bodies, such as General Assembly resolutions (\"A/RES/78/1\") and the UN/CEFACT trade documents (\"TRADE/CEFACT/2004/32\").",
  website: "https://www.un.org",
  syntaxNotes: "UN document symbols follow the UN Editorial Manual pattern {Series}/{Body}[/{Year}]/{Number}, e.g. A/RES/78/1 (General Assembly resolution 78/1). The \"UN \" prefix is optional and normalized away (\"UN A/RES/78/1\" renders \"A/RES/78/1\"). Working-party documents carry annex/recommendation letters (TRADE/WP.4/R.1068).",
  relatedFlavors: ["iso"],
  docTypes: [
    {
      key: "document",
      title: "UN Document",
      abbr: ["UN"],
      description: "A UN document symbol: the series letter(s) name the organ (A = General Assembly, E = ECOSOC, S = Security Council, TRADE = UN/CEFACT), followed by body, year and sequence elements.",
      examples: [
        { input: "A/RES/78/1" },
        { input: "UN A/RES/78/1", output: "A/RES/78/1" },
        { input: "TRADE/CEFACT/2004/32" },
        { input: "TRADE/WP.4/1068" },
        { input: "TRADE/WP.4/R.1068" },
    ],
    },
],
  components: [
    {
      name: "Series",
      description: "The organ or body series symbol",
      dataType: "string",
      format: "A, E, S, TD, TRADE… (first slash-separated element)",
      example: "A",
    },
    {
      name: "Body / Subseries",
      description: "Body and sub-body elements (RES, CEFACT, WP.4)",
      dataType: "string",
      format: "Middle slash-separated elements",
      example: "RES",
    },
    {
      name: "Number",
      description: "Session year and/or sequence number",
      dataType: "string",
      format: "Trailing elements (78/1, 2004/32, R.1068)",
      example: "78/1",
    },
],
  algebra: [
    { type: "Optional prefix", description: "The \"UN \" prefix is accepted and dropped on render", syntax: "UN {symbol}", example: "UN A/RES/78/1" },
],
}

export default un
