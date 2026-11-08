import type { Publisher } from '../types'

export const plateau: Publisher = {
  flavor: "plateau",
  logo: "/logos/plateau-logo.svg",
  name: "PLATEAU",
  fullName: "PLATEAU (MLIT Japan)",
  category: "national",
  description: "PLATEAU is a project by Japan's Ministry of Land, Infrastructure, Transport and Tourism (MLIT) that promotes the use of 3D city models for urban planning and management. Legacy Latin references (e.g. \"PLATEAU Handbook #00 v1.0\") are parsed and normalised to the canonical Japanese form (第X.X版).",
  website: "https://www.mlit.go.jp/plateau",
  syntaxNotes: "PLATEAU identifiers follow: PLATEAU [Type] #[Number][-Annex] [Edition]. Types include Handbook, Technical Report, Annex. Japanese edition numbering is used (第X.X版). Legacy Latin references (\"v1.0\", \"Version 1.0\") are accepted and normalised. A \"Handbook #11\" reference with edition 1–3 and a part suffix (（民間活用編） / （公共活用編）) is rewritten to the handbook that actually existed for those editions: #06 and #04 respectively.",
  relatedFlavors: ["jis"],
  docTypes: [
    {
      key: "handbook",
      title: "Handbook",
      abbr: ["Handbook"],
      description: "PLATEAU Handbooks providing guidance on 3D city model usage. Legacy Latin edition forms are normalised to the canonical Japanese edition. Handbook #11 combined two earlier handbooks: for editions 1–3, （民間活用編） was Handbook #06 and （公共活用編） was Handbook #04 — only from edition 4 (第4.0版) do the two combine into #11, so an edition-1–3 \"#11\" reference with a part suffix parses as the #06/#04 document.",
      examples: [
        { input: "PLATEAU Handbook #00 第1.0版" },
        { input: "PLATEAU Handbook #00 第2.0版" },
        { input: "PLATEAU Handbook #00 v1.0" },
        { input: "PLATEAU Handbook #11 第1.0版（民間活用編）", output: "PLATEAU Handbook #06 第1.0版" },
        { input: "PLATEAU Handbook #11 第1.0版（公共活用編）", output: "PLATEAU Handbook #04 第1.0版" },
        { input: "PLATEAU Handbook #11 第4.0版" },
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
