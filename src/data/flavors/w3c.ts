import type { Publisher } from '../types'

export const w3c: Publisher = {
  flavor: "w3c",
  logo: "/logos/w3c-logo.svg",
  name: "W3C",
  fullName: "World Wide Web Consortium",
  category: "industry",
  description: "The World Wide Web Consortium (W3C) is the main international standards organization for the World Wide Web, founded in 1994 by Tim Berners-Lee. W3C develops the foundational specifications of the Web — HTML, CSS, XML, SVG, WebAssembly, the Semantic Web stack, accessibility guidelines (WCAG), and dozens of others. Member organizations, a full-time staff, and the public collaborate via Working Groups to develop standards through a multi-stage maturity process: Working Draft (WD) → Candidate Recommendation (CR) → Proposed Recommendation (PR) → W3C Recommendation (REC). The W3C PubID schema models every stage of this lifecycle, plus notes, obsolete/superseded recommendations, and proposed edited recommendations of existing standards.",
  website: "https://www.w3.org",
  syntaxNotes: "W3C identifiers are slug-based with an optional type prefix indicating the document's maturity stage: WD (Working Draft), CR (Candidate Recommendation), CRD (Candidate Recommendation Draft), NOTE (Working Group Note), PR (Proposed Recommendation), PER (Proposed Edited Recommendation), REC (Recommendation), OBSL (Obsolete Recommendation), SPR (Superseded Recommendation). The slug carries the spec shortname and optional date suffix (YYYYMMDD).",
  urnPattern: "urn:w3c:[type]:[code]",
  relatedFlavors: ["iso", "ieee", "oasis"],
  docTypes: [
    {
      key: "working_draft",
      title: "Working Draft (WD)",
      abbr: ["WD"],
      description: "The earliest maturity stage of a W3C specification. A WD is a work-in-progress document published for review and discussion. There may be many WDs before a spec advances to CR. Identified by the 'WD-' prefix before the spec shortname.",
      examples: [
        { input: "W3C WD-charmod-19991129" },
        { input: "W3C WD-html5-20110525" },
      ],
    },
    {
      key: "candidate_recommendation_draft",
      title: "Candidate Recommendation Draft (CRD)",
      abbr: ["CRD"],
      description: "A daily-build draft of a Candidate Recommendation. CRDs are published frequently to track ongoing editorial changes between formal CR snapshots.",
      examples: [
        { input: "W3C CRD-css-color-5-20240101" },
      ],
    },
    {
      key: "candidate_recommendation",
      title: "Candidate Recommendation (CR)",
      abbr: ["CR"],
      description: "A specification that has passed wide review and is ready for implementation testing. A CR is the W3C's call to implementers to build the spec and report back. Identified by the 'CR-' prefix.",
      examples: [
        { input: "W3C CR-css-flexbox-1-20181119" },
        { input: "W3C CR-webcodecs-20230330" },
      ],
    },
    {
      key: "proposed_recommendation",
      title: "Proposed Recommendation (PR)",
      abbr: ["PR"],
      description: "A specification that has received significant implementation experience and is sent to the W3C Advisory Committee for formal review. The final maturity stage before REC.",
      examples: [
        { input: "W3C PR-html5-20140417" },
      ],
    },
    {
      key: "proposed_edited_recommendation",
      title: "Proposed Edited Recommendation (PER)",
      abbr: ["PER"],
      description: "A proposal to revise an existing Recommendation with editorial (non-substantive) changes. Sent to the Advisory Committee for review before the revision is published.",
      examples: [
        { input: "W3C PER-svg Tiny12-20081110" },
      ],
    },
    {
      key: "recommendation",
      title: "Recommendation (REC)",
      abbr: ["REC"],
      description: "A normative W3C standard that has been formally endorsed by the W3C Director and Director-level review. RECs are the most stable, authoritative form of a W3C specification and are widely implemented across the Web platform.",
      examples: [
        { input: "W3C REC-html52-20171214" },
        { input: "W3C REC-xml-20081126" },
        { input: "W3C REC-SVG11-20030114" },
      ],
    },
    {
      key: "note",
      title: "Working Group Note (NOTE)",
      abbr: ["NOTE"],
      description: "An informative document published by a W3C Working Group. Notes are not normative standards but provide guidance, use cases, or explanatory material. The 'NOTE-' prefix is the W3C convention for these documents.",
      examples: [
        { input: "W3C NOTE-xml-names" },
        { input: "W3C NOTE-datetime-19980827" },
      ],
    },
    {
      key: "draft_note",
      title: "Draft Note",
      abbr: [""],
      description: "A draft of a Working Group Note, before formal publication as a NOTE. Identified by the spec shortname without a NOTE- prefix.",
      examples: [
        { input: "W3C 2dcontext" },
      ],
    },
    {
      key: "standard",
      title: "Standard",
      abbr: [""],
      description: "A non-prefixed W3C standard document. The bare slug form without a maturity-stage prefix is used for documents that don't follow the conventional WD-CR-PR-REC lifecycle.",
      examples: [
        { input: "W3C 2dcontext" },
      ],
    },
    {
      key: "obsolete_recommendation",
      title: "Obsolete Recommendation (OBSL)",
      abbr: ["OBSL"],
      description: "A Recommendation that the W3C has formally marked as no longer current. It remains in the historical record but should not be referenced for new implementations. The 'OBSL-' prefix marks this status.",
      examples: [
        { input: "W3C OBSL-xhtml1-20180327" },
      ],
    },
    {
      key: "superseded_recommendation",
      title: "Superseded Recommendation (SPR)",
      abbr: ["SPR"],
      description: "A Recommendation that has been replaced by a newer version. Superseded Recommendations remain in the W3C's historical record but are explicitly marked as superseded by the 'SPR-' prefix.",
      examples: [
        { input: "W3C SPR-html401-20180327" },
      ],
    },
  ],
  components: [
    { name: "Publisher", description: "W3C — omitted when with_publisher=false", example: "W3C" },
    { name: "Type Prefix", description: "Maturity stage abbreviation: WD, CRD, CR, PR, PER, REC, NOTE, OBSL, SPR (or empty for unprefixed forms)", attribute: "type_prefix", example: "REC" },
    { name: "Code", description: "Spec shortname + optional date suffix (YYYYMMDD)", attribute: "code", example: "html52-20171214" },
  ],
  algebra: [
    { type: "Maturity Lifecycle", description: "Standard progression: WD → CRD → CR → PR → REC", syntax: "<type_prefix>-<code>", example: "W3C REC-html52-20171214" },
    { type: "Note", description: "Informative Working Group Note", syntax: "NOTE-<code>", example: "W3C NOTE-xml-names" },
    { type: "Status Change", description: "Obsoleted (OBSL) or superseded (SPR) former Recommendations", syntax: "<OBSL|SPR>-<code>", example: "W3C OBSL-xhtml1-20180327" },
    { type: "Without Publisher", description: "Bare slug form (no 'W3C ' prefix)", syntax: "[<type_prefix>-]<code>", example: "REC-html52-20171214" },
  ],
}

export default w3c
