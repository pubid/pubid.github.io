import type { Publisher } from '../types'

export const ogc: Publisher = {
  flavor: "ogc",
  logo: "/logos/ogc-logo.svg",
  name: "OGC",
  fullName: "Open Geospatial Consortium",
  category: "industry",
  description: "The Open Geospatial Consortium (OGC) is an international voluntary consensus standards organization founded in 1994. OGC develops open, consensus-based standards for geospatial content and services, GIS data processing, and geospatial data sharing. Major OGC standards include Web Map Service (WMS), Web Feature Service (WFS), Geographic Mark-up Language (GML), Sensor Observation Service (SOS), and the OGC API family (Features, Tiles, Records, Environmental Data Retrieval). Member organizations include national mapping agencies, defense organizations, and major technology vendors.",
  website: "https://www.ogc.org",
  syntaxNotes: "OGC identifiers are digit-leading: '<yy>-<nnn>[<revision>]'. The year is 2 digits, the number is 3 digits (zero-padded), and the optional revision suffix is the lowercased token including its separator letter: 'r1', 'c1', 'a', 'r3a', 'r12a'. The leading 'OGC ' publisher token is added only when with_publisher=true (default is bare).",
  urnPattern: "urn:ogc:[year]:[number]:[revision]",
  relatedFlavors: ["iso", "iho", "ieee"],
  docTypes: [
    {
      key: "document",
      title: "OGC Document",
      abbr: [""],
      description: "All OGC specification documents — standards, discussion papers, engineering reports, and best practice documents — share the same identifier shape. The two-digit year, three-digit zero-padded sequence number, and optional revision suffix uniquely identify any OGC document. Examples: 24-032r1 (a 2024 standard revision 1), 01-009a (a 2001 document revision 'a').",
      examples: [
        { input: "24-032r1" },
        { input: "01-009a" },
        { input: "OGC 24-032r1" },
        { input: "06-042r3" },
        { input: "17-016r2" },
      ],
    },
  ],
  components: [
    { name: "Publisher", description: "OGC — omitted by default, added when with_publisher=true", example: "OGC" },
    { name: "Year", description: "Two-digit year (the 'yy' field)", attribute: "year", example: "24" },
    { name: "Number", description: "Three-digit zero-padded sequence number (preserves leading zeros)", attribute: "number", example: "032" },
    { name: "Revision", description: "Optional lowercased revision token including separator: 'r1', 'c1', 'a', 'r3a', 'r12a'. nil when absent.", attribute: "revision", example: "r1" },
  ],
  algebra: [
    { type: "Bare Document", description: "Default form without publisher prefix", syntax: "<yy>-<nnn>[<revision>]", example: "24-032r1" },
    { type: "With Publisher", description: "Publisher prefix added when with_publisher=true", syntax: "OGC <yy>-<nnn>[<revision>]", example: "OGC 24-032r1" },
    { type: "Revision", description: "Revision suffix variants: r (revision), c (corrigendum), a (amendment)", syntax: "<yy>-<nnn>[r<c><n>|<a>]", example: "01-009a" },
  ],
}

export default ogc
