import type { Publisher } from '../types'

export const plateau: Publisher = {
  flavor: "plateau",
  logo: "/logos/plateau-logo.svg",
  name: "PLATEAU",
  fullName: "PLATEAU (MLIT Japan)",
  category: "national",
  description: "PLATEAU is a project by Japan's Ministry of Land, Infrastructure, Transport and Tourism (MLIT) that promotes the use of 3D city models for urban planning and management.",
  website: "https://www.mlit.go.jp/plateau",
  syntaxNotes: "PLATEAU identifiers follow: PLATEAU [Type] #[Number] [Edition]. Types include Handbook, Technical Report, Annex. Japanese edition numbering is used.",
  relatedFlavors: ["jis"],
  docTypes: [
    {
      key: "handbook",
      title: "Handbook",
      abbr: ["Handbook"],
      description: "PLATEAU Handbooks providing guidance on 3D city model usage.",
      examples: [
        { input: "PLATEAU Handbook #00 第1.0版" },
        { input: "PLATEAU Handbook #00 第2.0版" },
    ],
    },
    {
      key: "technical_report",
      title: "Technical Report",
      abbr: ["Technical Report"],
      description: "PLATEAU Technical Reports.",
      examples: [
        { input: "PLATEAU Technical Report #00" },
        { input: "PLATEAU Technical Report #01" },
    ],
    },
    {
      key: "annex",
      title: "Annex",
      abbr: ["Annex"],
      description: "Annexes to PLATEAU Handbooks.",
      examples: [
        { input: "PLATEAU Handbook #00 Annex 1" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "PLATEAU",
      dataType: "enum",
      values: ["Plateau"],
      example: "Plateau",
    },
    {
      name: "Number",
      description: "Document number with # prefix",
      dataType: "integer",
      format: "1–3 digit number.",
      example: "1",
    },
    {
      name: "Edition",
      description: "Edition in Japanese format (第X.X版)",
    },
],
  algebra: [
],
}

export default plateau
