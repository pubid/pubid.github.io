import type { Publisher } from '../types'

export const doi: Publisher = {
  flavor: "doi",
  name: "DOI",
  fullName: "Digital Object Identifier",
  category: "international",
  description: "The DOI system provides an actionable, persistent identifier for digital objects. PubID parses DOI names — including NIST's DOI-based standard designations such as \"doi:10.6028/NIST.SP.800-53r5\" — as identifiers alongside the SDO schemes.",
  website: "https://www.doi.org",
  syntaxNotes: "DOI syntax is \"doi:10.{prefix}/{suffix}\" (case-insensitive scheme, normalized to lowercase). PubID accepts the canonical \"doi:\" form, the bare \"10.x/suffix\" name, the \"DOI:\" upper-scheme spelling, and the resolver-URL form on the doi.org host — all render canonical.",
  urnPattern: "urn:pubid:doi:resource:prefix-{10.NNNN}:suffix-{suffix}",
  relatedFlavors: ["nist", "isbn"],
  docTypes: [
    {
      key: "resource",
      title: "DOI Resource",
      abbr: ["doi"],
      description: "A DOI name for any resource. The prefix (10.NNNN) names the registrant; the suffix is registrant-defined — an opaque string, a journal-style path (10.1006/jmbi.1998.2354), or an SDO designation (NIST.SP.800-53r5).",
      examples: [
        { input: "doi:10.1000/182" },
        { input: "10.1006/jmbi.1998.2354", output: "doi:10.1006/jmbi.1998.2354" },
        { input: "DOI:10.6028/NIST.2022-04-15.001", output: "doi:10.6028/NIST.2022-04-15.001" },
        { input: "https://doi.org/10.1000/182", output: "doi:10.1000/182" },
    ],
    },
],
  components: [
    {
      name: "Scheme",
      description: "The \"doi:\" scheme token",
      dataType: "enum",
      values: ["doi:"],
      format: "Case-insensitive on parse (DOI: accepted); rendered lowercase",
      example: "doi:",
    },
    {
      name: "Prefix",
      description: "The registrant prefix, always beginning 10.",
      attribute: "prefix",
      dataType: "string",
      format: "10.{NNNN} — 4+ digits naming the registrant",
      example: "10.6028",
    },
    {
      name: "Suffix",
      description: "The registrant's opaque resource suffix",
      attribute: "suffix",
      dataType: "string",
      format: "Any string; SDO designations use dotted series (NIST.SP.800-53r5)",
      example: "NIST.2022-04-15.001",
    },
],
  algebra: [
    { type: "URL form", description: "The resolver URL parses and renders as the canonical DOI name", syntax: "doi.org/10.{prefix}/{suffix}", example: "https://doi.org/10.1000/182" },
],
}

export default doi
