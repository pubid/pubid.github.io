import type { Publisher } from '../types'

export const calconnect: Publisher = {
  flavor: "calconnect",
  logo: "/logos/calconnect-logo.svg",
  name: "CalConnect",
  fullName: "The Calendaring and Scheduling Consortium",
  category: "industry",
  description: "CalConnect (The Calendaring and Scheduling Consortium) is a nonprofit organization founded in 2004 that develops open standards for calendaring and scheduling. CalConnect brings together vendors, developers, and users of calendar systems to coordinate interoperability of iCalendar (RFC 5545/7986), CalDAV, and related calendaring technologies. CalConnect standards address gaps in the iCalendar ecosystem: calendaring event metadata, scheduling protocols, time-zone handling, and event publishing. Member organizations include major technology vendors, universities, and government agencies.",
  website: "https://www.calconnect.org",
  syntaxNotes: "CalConnect identifiers follow the shape: CC[/<series>] <number>:<date>. The publisher token is always 'CC'. An optional series letter or token follows after a slash (A, WD, DIR, …). The number is a plain string (preserves leading zeros and sub-part separators like '0812-1' or '0707.1'). The date segment uses the ISO-style year format with optional month and day for full-date forms (e.g. 'CC/WD 51017:2024-07-23').",
  urnPattern: "urn:cc:[series]:[number]:[year]",
  relatedFlavors: ["ietf", "iso"],
  docTypes: [
    {
      key: "standard",
      title: "CalConnect Standard (CC)",
      abbr: ["CC"],
      description: "CalConnect Standards — the normative specifications published by CalConnect. Numbered with a 4-digit sequence (preserves leading zeros, e.g. CC 18011:2018). An optional series letter (A, WD for Working Draft, DIR for Directives) can prefix the number after a slash. Full-date forms occur for working drafts (e.g. CC/WD 51017:2024-07-23).",
      examples: [
        { input: "CC 18011:2018" },
        { input: "CC/DIR 10006:2019" },
        { input: "CC/WD 51017:2024-07-23" },
        { input: "CC 0514:2017" },
        { input: "CC 0812-1:2019" },
      ],
    },
  ],
  components: [
    { name: "Publisher", description: "CC — the canonical publisher token", example: "CC" },
    { name: "Series", description: "Optional series letter or token (A, WD, DIR, etc.) appearing after the publisher, separated by slash", attribute: "series", example: "WD" },
    { name: "Number", description: "Document number, kept as a string to preserve leading zeros and sub-part separators (0514, 0812-1, 0707.1)", attribute: "number", example: "51017" },
    { name: "Date", description: "Publication date: always year; month/day present only for full-date forms (2024-07-23)", attribute: "date", example: "2024" },
  ],
  algebra: [
    { type: "Standard", description: "Basic CalConnect Standard without series", syntax: "CC <number>:<year>", example: "CC 18011:2018" },
    { type: "With Series", description: "Series prefix after the publisher, separated by slash", syntax: "CC/<series> <number>:<date>", example: "CC/DIR 10006:2019" },
    { type: "Full Date", description: "Full-date form for working drafts", syntax: "CC/<series> <number>:<year>-<month>-<day>", example: "CC/WD 51017:2024-07-23" },
    { type: "Without Publisher", description: "Bare series+number form (no 'CC' prefix)", syntax: "[<series> ]<number>:<date>", example: "DIR 10006:2019" },
  ],
}

export default calconnect
