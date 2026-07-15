import type { Publisher } from '../types'

export const xsf: Publisher = {
  flavor: "xsf",
  logo: "/logos/xsf-logo.svg",
  name: "XSF",
  fullName: "XMPP Standards Foundation",
  category: "industry",
  description: "The XMPP Standards Foundation (XSF) is the foundation chartered to define and publish the open protocols of the Extensible Messaging and Presence Protocol (XMPP) — the XML-based instant-messaging and presence protocol that powers Jabber and many real-time communication systems. Founded in 2002 as the Jabber Software Foundation, the XSF publishes XMPP Extension Protocols (XEPs) that extend the core XMPP specifications (RFC 6120 and RFC 6121) with new features: multi-user chat, publish-subscribe, file transfer, voice/video signaling, and many others. XEPs follow a documented maturity process: Experimental → Proposed → Draft → Final (or Deprecated → Obsolete for retired extensions).",
  website: "https://xmpp.org",
  syntaxNotes: "XSF identifiers use a single document type: XEP (XMPP Extension Protocol). The identifier is 'XEP-<number>' where the number is zero-padded to 4 digits ('XEP-0001', not 'XEP-1'). The XSF never prints its publisher name in the identifier — the leading token is always 'XEP'.",
  urnPattern: "urn:xsf:xep:[number]",
  relatedFlavors: ["iana", "w3c"],
  docTypes: [
    {
      key: "xep",
      title: "XMPP Extension Protocol (XEP)",
      abbr: ["XEP"],
      description: "XMPP Extension Protocols published by the XSF. Each XEP extends the core XMPP specifications with a specific feature (multi-user chat, publish-subscribe, file transfer, signaling, etc.). The number is zero-padded to 4 digits. XEPs progress through a maturity lifecycle: Experimental (work-in-progress) → Proposed (under review) → Draft (stable, widely implemented) → Final (mature, no further changes). Retired XEPs are marked Deprecated and eventually Obsolete.",
      examples: [
        { input: "XEP-0001" },
        { input: "XEP-0045" },
        { input: "XEP-0060" },
        { input: "XEP-0166" },
        { input: "XEP-0352" },
      ],
    },
  ],
  components: [
    { name: "Type", description: "Always 'XEP' — the XSF never prints its publisher name in the identifier", example: "XEP" },
    { name: "Number", description: "XEP number, zero-padded to 4 digits ('0001', not 1). Kept as a string to preserve padding.", attribute: "number", example: "0045" },
  ],
  algebra: [
    { type: "XEP Reference", description: "Canonical form: 'XEP-' + 4-digit zero-padded number", syntax: "XEP-<number>", example: "XEP-0045" },
    { type: "Maturity Stage", description: "XEPs carry maturity metadata (Experimental, Proposed, Draft, Final, Deprecated, Obsolete) outside the identifier", syntax: "XEP-<number> [<stage>]", example: "XEP-0045 [Draft]" },
  ],
}

export default xsf
