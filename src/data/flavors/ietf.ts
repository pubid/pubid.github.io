import type { Publisher } from '../types'

export const ietf: Publisher = {
  flavor: "ietf",
  logo: "/logos/ietf-logo.svg",
  name: "IETF",
  fullName: "Internet Engineering Task Force",
  category: "industry",
  description: "The Internet Engineering Task Force (IETF) is the premier body for developing and promoting Internet standards. Organized as a large open international community of network designers, operators, vendors, and researchers, the IETF produces the Request for Comments (RFC) document series — the foundational specifications of the Internet, covering TCP/IP, DNS, TLS, HTTP, BGP, SMTP, and every other core Internet protocol. The IETF also maintains three sub-series overlays on top of RFCs: STD (Internet Standards — RFCs that have reached full standardization), BCP (Best Current Practices — RFCs documenting community-agreed practices), and FYI (For Your Information — RFCs providing introductory and explanatory material, now mostly historical).",
  website: "https://www.ietf.org",
  syntaxNotes: "IETF identifiers come in 5 shapes: RFC '<number>', BCP '<number>', STD '<number>', FYI '<number>', and Internet-Draft '<draft-name>-<version>'. Internet-Drafts are work-in-progress documents with a name like 'draft-giuliano-treedn' and an optional two-digit version suffix. RFCs/BCPs/STDs/FYIs share the same numbering space conceptually but each has its own sub-series index.",
  urnPattern: "urn:ietf:[series]:[number]",
  relatedFlavors: ["iana", "w3c"],
  docTypes: [
    {
      key: "rfc",
      title: "Request for Comments (RFC)",
      abbr: ["RFC"],
      description: "The Request for Comments series — the foundational document series of the Internet. RFCs cover every Internet protocol from TCP (RFC 793) and IP (RFC 791) through HTTP (RFC 9110), TLS (RFC 8446), and modern extensions. Despite the name, RFCs at the STD level are formal Internet Standards. RFC numbers are never reused; once published, an RFC is immutable (errors are addressed via new RFCs that obsolete old ones).",
      examples: [
        { input: "RFC 2119" },
        { input: "RFC 8174" },
        { input: "RFC 791" },
        { input: "RFC 9110" },
        { input: "RFC 8446" },
      ],
    },
    {
      key: "bcp",
      title: "Best Current Practice (BCP)",
      abbr: ["BCP"],
      description: "The Best Current Practice sub-series — RFCs that document agreed-upon community practices rather than protocol specifications. BCPs cover topics like IETF conduct (BCP 54, RFC 7154), IANA considerations (BCP 26, RFC 8126), and security guidelines. A single BCP number may aggregate multiple RFCs.",
      examples: [
        { input: "BCP 3" },
        { input: "BCP 26" },
        { input: "BCP 54" },
      ],
    },
    {
      key: "std",
      title: "Internet Standard (STD)",
      abbr: ["STD"],
      description: "The Internet Standard sub-series — RFCs that have completed the full IETF standardization process and are designated as official Internet Standards. STD numbers are stable across revisions: when an STD RFC is updated, the STD number is retained while the underlying RFC number may change. For example, STD 66 (the URI Generic Syntax) has been revised multiple times across RFC 3986, RFC 6874, etc.",
      examples: [
        { input: "STD 66" },
        { input: "STD 1" },
        { input: "STD 80" },
      ],
    },
    {
      key: "fyi",
      title: "For Your Information (FYI)",
      abbr: ["FYI"],
      description: "The For Your Information sub-series — RFCs providing introductory, explanatory, or background material aimed at users and newcomers. The FYI sub-series is largely historical; most FYIs were published in the early 1990s. FYI numbers are stable identifiers even though the underlying RFC may be obsoleted.",
      examples: [
        { input: "FYI 1" },
        { input: "FYI 17" },
        { input: "FYI 36" },
      ],
    },
    {
      key: "internet_draft",
      title: "Internet-Draft",
      abbr: ["draft"],
      description: "Work-in-progress documents being developed within IETF Working Groups (or by individual submitters). Internet-Drafts are NOT RFCs and are NOT official specifications — they exist for review and revision. Draft names follow the form 'draft-<author>-<workgroup>-<topic>-<version>' where the version is a two-digit suffix. Drafts automatically expire after 6 months unless renewed. A draft's name is unique for the document's lifetime; only the version suffix changes between revisions.",
      examples: [
        { input: "draft-giuliano-treedn-02" },
        { input: "draft-giuliano-treedn" },
        { input: "draft-ietf-httpbis-cache-digest-04" },
      ],
    },
  ],
  components: [
    { name: "Series", description: "Series prefix: RFC, BCP, STD, FYI (or nil for Internet-Drafts)", attribute: "series", example: "RFC" },
    { name: "Number", description: "Sequence number within the sub-series (RFC, BCP, STD, FYI)", attribute: "number", example: "2119" },
    { name: "Draft Name", description: "Internet-Draft name (e.g. 'draft-giuliano-treedn'), without version suffix", attribute: "name" },
    { name: "Version", description: "Internet-Draft two-digit version suffix (e.g. '02'), nil when absent", attribute: "version" },
  ],
  algebra: [
    { type: "RFC", description: "Standard RFC citation", syntax: "RFC <number>", example: "RFC 2119" },
    { type: "BCP", description: "Best Current Practice", syntax: "BCP <number>", example: "BCP 3" },
    { type: "STD", description: "Internet Standard (sub-series)", syntax: "STD <number>", example: "STD 66" },
    { type: "FYI", description: "For Your Information", syntax: "FYI <number>", example: "FYI 1" },
    { type: "Internet-Draft", description: "Work-in-progress draft, optional version suffix", syntax: "<draft-name>[-<version>]", example: "draft-giuliano-treedn-02" },
  ],
}

export default ietf
