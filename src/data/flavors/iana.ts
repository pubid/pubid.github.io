import type { Publisher } from '../types'

export const iana: Publisher = {
  flavor: "iana",
  logo: "/logos/iana-logo.svg",
  name: "IANA",
  fullName: "Internet Assigned Numbers Authority",
  category: "industry",
  description: "IANA is the organization responsible for coordinating the global Internet's unique identifiers — domain names, IP address numbers, protocol parameter values — under contract to ICANN (Internet Corporation for Assigned Names and Numbers) since 1998. IANA maintains the registries that define protocol parameters used across the Internet's core standards: HTTP, DNS, TLS, MIME, URI schemes, character sets, and hundreds of others. Each registry is the authoritative source of truth for the values that make the Internet interoperable.",
  website: "https://www.iana.org",
  syntaxNotes: "IANA identifiers are protocol registries, not numbered standards. The identifier is a hierarchical registry slug: 'IANA <registry>[/<sub_registry>]'. The leading underscore in registry names (e.g. '_6lowpan-parameters') is part of the canonical form.",
  urnPattern: "urn:iana:[registry]:[sub_registry]",
  relatedFlavors: ["iso", "itu"],
  docTypes: [
    {
      key: "registry",
      title: "Protocol Registry",
      abbr: [""],
      description: "IANA protocol parameter registries. Each registry is a hierarchical namespace managed by IANA containing the assigned values for a specific protocol parameter set. Sub-registries partition a top-level registry into focused sub-lists (e.g. the _6lowpan-parameters registry has a lowpan_nhc sub-registry). The registry slug is always kept verbatim — IANA does not normalize the case or punctuation.",
      examples: [
        { input: "IANA _6lowpan-parameters" },
        { input: "IANA _6lowpan-parameters/lowpan_nhc" },
        { input: "IANA uri-schemes" },
        { input: "IANA media-types" },
        { input: "IANA http-parameters" },
      ],
    },
  ],
  components: [
    { name: "Publisher", description: "IANA — always emitted unless with_publisher=false", example: "IANA" },
    { name: "Registry", description: "Top-level registry slug, kept verbatim (e.g. _6lowpan-parameters, uri-schemes, media-types)", attribute: "registry", example: "_6lowpan-parameters" },
    { name: "Sub-registry", description: "Optional sub-registry slug after the slash, kept verbatim", attribute: "sub_registry", example: "lowpan_nhc" },
  ],
  algebra: [
    { type: "Top-level Registry", description: "Bare registry without sub-registry", syntax: "IANA <registry>", example: "IANA uri-schemes" },
    { type: "Sub-registry", description: "Registry with sub-registry partition", syntax: "IANA <registry>/<sub_registry>", example: "IANA _6lowpan-parameters/lowpan_nhc" },
    { type: "Without Publisher", description: "Bare index-key slug (no 'IANA ' prefix)", syntax: "<registry>[/<sub_registry>]", example: "_6lowpan-parameters/lowpan_nhc" },
  ],
}

export default iana
