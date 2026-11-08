import type { Publisher } from '../types'

export const omg: Publisher = {
  flavor: "omg",
  name: "OMG",
  fullName: "Object Management Group",
  category: "international",
  description: "OMG is the consortium behind UML, SysML, CORBA, DDS and other modeling and interoperability specifications. OMG specifications are named by an acronym plus a free-form version string — e.g. \"OMG UML 2.5.1\", \"OMG DDS 5 beta 3\".",
  website: "https://www.omg.org",
  syntaxNotes: "OMG identifiers follow: OMG {Acronym}[ {Version}]. The version is free-form and stored verbatim (\"1.0\", \"2.5.1\", \"5 beta 3\", \"1.1\"); an identifier without a version (\"OMG CORBA\") names the specification as a whole.",
  relatedFlavors: ["iso"],
  docTypes: [
    {
      key: "specification",
      title: "Specification",
      abbr: ["OMG"],
      description: "An OMG specification, named by its acronym (UML, SysML, DDS, CORBA, AMI4CCM…) with an optional version. Adopted ISO/IEC versions carry the joint designation in the ISO flavor.",
      examples: [
        { input: "OMG UML 2.5.1" },
        { input: "OMG SysML 1.6" },
        { input: "OMG DDS 5 beta 3" },
        { input: "OMG AMI4CCM 1.0" },
        { input: "OMG CORBA" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "The OMG token",
      dataType: "enum",
      values: ["OMG"],
      example: "OMG",
    },
    {
      name: "Acronym",
      description: "The specification's acronym",
      attribute: "acronym",
      dataType: "string",
      example: "UML",
    },
    {
      name: "Version",
      description: "Free-form version string, stored verbatim",
      attribute: "version",
      dataType: "string",
      format: "Optional. \"1.0\", \"2.5.1\", \"5 beta 3\"",
      example: "2.5.1",
    },
    {
      name: "Part",
      description: "Volume or format segment after the version",
      attribute: "part",
      dataType: "string",
      format: "Optional (PtC/PTC ballot volumes and formal/ documents)",
      example: "formal",
    },
],
  algebra: [
    { type: "Versionless", description: "A bare acronym names the specification without an edition", syntax: "OMG {Acronym}", example: "OMG CORBA" },
],
}

export default omg
