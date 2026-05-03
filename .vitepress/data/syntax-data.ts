export interface SyntaxPattern {
  label: string
  pattern: string
}

const data: Record<string, Record<string, SyntaxPattern[]>> = {
  iso: {
    international_standard: [
      { label: 'Published (dated)', pattern: 'ISO [Number]:[Year]' },
      { label: 'Published (undated)', pattern: 'ISO [Number]' },
      { label: 'With copublisher', pattern: 'ISO/[Copublisher] [Number]-[Part]:[Year]' },
      { label: 'With language', pattern: 'ISO [Number]:[Year]([Language])' },
      { label: 'Draft Proposal', pattern: 'ISO/DP [Number]:[Year]' },
      { label: 'Proposed Work Item', pattern: 'ISO/PWI [Number]' },
      { label: 'New Work Item Proposal', pattern: 'ISO/NP [Number]' },
      { label: 'Approved Work Item', pattern: 'ISO/AWI [Number]' },
      { label: 'Working Draft', pattern: 'ISO/WD [Number]' },
      { label: 'Working Draft Study', pattern: 'ISO/WDS [Number]' },
      { label: 'Committee Draft', pattern: 'ISO/CD [Number]' },
      { label: 'Draft International Standard', pattern: 'ISO/DIS [Number]:[Year]' },
      { label: 'Final Draft International Standard', pattern: 'ISO/FDIS [Number]:[Year]' },
      { label: 'Proof', pattern: 'ISO/PRF [Number]:[Year]' },
    ],
    technical_report: [
      { label: 'Published (dated)', pattern: 'ISO/TR [Number]:[Year]' },
      { label: 'Published (undated)', pattern: 'ISO/TR [Number]' },
      { label: 'With copublisher', pattern: 'ISO/[Copublisher]/TR [Number]-[Part]:[Year]' },
      { label: 'Proposed Work Item', pattern: 'ISO/PWI TR [Number]' },
      { label: 'New Work Item Proposal', pattern: 'ISO/NP TR [Number]' },
      { label: 'Approved Work Item', pattern: 'ISO/AWI TR [Number]' },
      { label: 'Working Draft', pattern: 'ISO/WD TR [Number]' },
      { label: 'Committee Draft', pattern: 'ISO/CD TR [Number]' },
      { label: 'Proposed Draft TR', pattern: 'ISO/PDTR [Number]' },
      { label: 'Draft Technical Report', pattern: 'ISO/DTR [Number]:[Year]' },
      { label: 'Final Draft TR', pattern: 'ISO/FDTR [Number]:[Year]' },
      { label: 'Proof', pattern: 'ISO/PRF TR [Number]' },
    ],
    technical_specification: [
      { label: 'Published (dated)', pattern: 'ISO/TS [Number]:[Year]' },
      { label: 'Published (undated)', pattern: 'ISO/TS [Number]' },
      { label: 'With copublisher', pattern: 'ISO/[Copublisher]/TS [Number]-[Part]:[Year]' },
      { label: 'Proposed Work Item', pattern: 'ISO/PWI TS [Number]' },
      { label: 'New Work Item Proposal', pattern: 'ISO/NP TS [Number]' },
      { label: 'Approved Work Item', pattern: 'ISO/AWI TS [Number]' },
      { label: 'Working Draft', pattern: 'ISO/WD TS [Number]' },
      { label: 'Committee Draft', pattern: 'ISO/CDTS [Number]' },
      { label: 'Proposed Draft TS', pattern: 'ISO/PDTS [Number]' },
      { label: 'Draft Technical Specification', pattern: 'ISO/DTS [Number]:[Year]' },
      { label: 'Final Draft TS', pattern: 'ISO/FDTS [Number]:[Year]' },
      { label: 'Proof', pattern: 'ISO/PRF TS [Number]' },
    ],
    publicly_available_specification: [
      { label: 'Published (dated)', pattern: 'ISO/PAS [Number]:[Year]' },
      { label: 'Published (undated)', pattern: 'ISO/PAS [Number]' },
      { label: 'Proposed Work Item', pattern: 'ISO/PWI PAS [Number]' },
      { label: 'New Work Item Proposal', pattern: 'ISO/NP PAS [Number]' },
      { label: 'Approved Work Item', pattern: 'ISO/AWI PAS [Number]' },
      { label: 'Working Draft', pattern: 'ISO/WD PAS [Number]' },
      { label: 'Committee Draft', pattern: 'ISO/CD PAS [Number]' },
      { label: 'Draft PAS', pattern: 'ISO/DPAS [Number]' },
      { label: 'Final Draft PAS', pattern: 'ISO/FDPAS [Number]' },
      { label: 'Proof', pattern: 'ISO/PRF PAS [Number]' },
    ],
    guide: [
      { label: 'Published (dated)', pattern: 'ISO Guide [Number]:[Year]' },
      { label: 'Published (undated)', pattern: 'ISO Guide [Number]' },
      { label: 'With copublisher', pattern: 'ISO/IEC Guide [Number]-[Part]:[Year]' },
      { label: 'Proposed Work Item', pattern: 'ISO/PWI Guide [Number]' },
      { label: 'New Work Item Proposal', pattern: 'ISO/NP Guide [Number]' },
      { label: 'Approved Work Item', pattern: 'ISO/AWI Guide [Number]' },
      { label: 'Working Draft', pattern: 'ISO/WD Guide [Number]' },
      { label: 'Committee Draft', pattern: 'ISO/CD Guide [Number]' },
      { label: 'Draft Guide', pattern: 'ISO/DGuide [Number]' },
      { label: 'Final Draft Guide', pattern: 'ISO/FDGuide [Number]' },
      { label: 'Proof', pattern: 'ISO/PRF Guide [Number]' },
    ],
    amendment: [
      { label: 'Published', pattern: '[Base]/Amd [N]:[Year]' },
      { label: 'Proposed Work Item', pattern: '[Base]/PWI Amd [N]' },
      { label: 'New Work Item Proposal', pattern: '[Base]/NP Amd [N]' },
      { label: 'Approved Work Item', pattern: '[Base]/AWI Amd [N]' },
      { label: 'Working Draft', pattern: '[Base]/WD Amd [N]' },
      { label: 'Committee Draft', pattern: '[Base]/CD Amd [N]' },
      { label: 'Proposed Draft Amendment', pattern: '[Base]/PDAM [N]' },
      { label: 'Draft Amendment', pattern: '[Base]/DAmd [N]:[Year]' },
      { label: 'Final Draft Amendment', pattern: '[Base]/FDAmd [N]:[Year]' },
      { label: 'Proof', pattern: '[Base]/PRF Amd [N]' },
    ],
    corrigendum: [
      { label: 'Published', pattern: '[Base]/Cor [N]:[Year]' },
      { label: 'Proposed Work Item', pattern: '[Base]/PWI Cor [N]' },
      { label: 'New Work Item Proposal', pattern: '[Base]/NP Cor [N]' },
      { label: 'Approved Work Item', pattern: '[Base]/AWI Cor [N]' },
      { label: 'Working Draft', pattern: '[Base]/WD Cor [N]' },
      { label: 'Committee Draft', pattern: '[Base]/CD Cor [N]' },
      { label: 'Draft Corrigendum', pattern: '[Base]/DCor [N]:[Year]' },
      { label: 'Final Draft Corrigendum', pattern: '[Base]/FDCor [N]:[Year]' },
      { label: 'Proof', pattern: '[Base]/PRF Cor [N]' },
    ],
    supplement: [
      { label: 'Directives Supplement', pattern: 'ISO/IEC Directives Part [N] Supplement:[Year]' },
    ],
    addendum: [
      { label: 'Published', pattern: '[Base]/Add [N]:[Year]' },
    ],
    international_workshop_agreement: [
      { label: 'Published (dated)', pattern: 'IWA [Number]:[Year]' },
      { label: 'Published (undated)', pattern: 'IWA [Number]' },
      { label: 'With part', pattern: 'IWA [Number]-[Part]:[Year]' },
      { label: 'Proposed Work Item', pattern: 'PWI IWA [Number]' },
      { label: 'New Work Item Proposal', pattern: 'NP IWA [Number]' },
      { label: 'Approved Work Item', pattern: 'AWI IWA [Number]' },
      { label: 'Working Draft', pattern: 'ISO/WD IWA [Number]' },
      { label: 'Committee Draft', pattern: 'CD IWA [Number]' },
      { label: 'Draft IWA', pattern: 'DIWA [Number]' },
      { label: 'Proof', pattern: 'PRF IWA [Number]' },
    ],
    international_standardized_profile: [
      { label: 'Published', pattern: 'ISO/IEC ISP [Number]-[Part]:[Year]' },
    ],
    technology_trends_assessments: [
      { label: 'Published', pattern: 'ISO/TTA [Number]:[Year]' },
    ],
    directives: [
      { label: 'Published', pattern: 'ISO/IEC Directives Part [N]:[Year]' },
    ],
    directives_supplement: [
      { label: 'Published', pattern: 'ISO/IEC Directives Part [N] ISO Supplement:[Year]' },
    ],
    extract: [
      { label: 'Published', pattern: '[Base]/Extract' },
    ],
    recommendation: [
      { label: 'Published', pattern: 'ISO/R [Number]:[Year]' },
    ],
    tc_document: [
      { label: 'Committee document', pattern: 'ISO/TC [N] [DocNumber]' },
    ],
    data: [
      { label: 'Published', pattern: 'ISO/Data [Number]:[Year]' },
    ],
  },
  iec: {
    international_standard: [
      { label: 'Published (dated)', pattern: 'IEC [Number]-[Part]:[Year]' },
      { label: 'Published (undated)', pattern: 'IEC [Number]-[Part]' },
      { label: 'With edition', pattern: 'IEC [Number]-[Part]:[Year] ED[N]' },
      { label: 'Consolidated', pattern: 'IEC [Number]:[Year]+AMD[N]:[Year] CSV' },
    ],
    technical_report: [
      { label: 'Published (dated)', pattern: 'IEC TR [Number]-[Part]:[Year]' },
      { label: 'Published (undated)', pattern: 'IEC TR [Number]-[Part]' },
    ],
    technical_specification: [
      { label: 'Published (dated)', pattern: 'IEC TS [Number]-[Part]:[Year]' },
      { label: 'Published (undated)', pattern: 'IEC TS [Number]-[Part]' },
    ],
    publicly_available_specification: [
      { label: 'Published', pattern: 'IEC PAS [Number]:[Year]' },
    ],
    guide: [
      { label: 'Published', pattern: 'IEC GUIDE [Number]:[Year]' },
    ],
    amendment: [
      { label: 'Published', pattern: '[Base]/AMD[N]:[Year]' },
    ],
    corrigendum: [
      { label: 'Published', pattern: '[Base]/COR[N]:[Year]' },
    ],
    interpretation_sheet: [
      { label: 'Published', pattern: '[Base]/ISH[N]:[Year]' },
    ],
    consolidated_identifier: [
      { label: 'Consolidated version', pattern: '[Base]+AMD[N]:[Year] CSV' },
    ],
    working_document: [
      { label: 'Working document', pattern: 'IEC [Committee]/[DocNumber]/[Stage]' },
    ],
    fragment_identifier: [
      { label: 'Fragment', pattern: '[Base]/AMD[N]/FRAG[N] ED[N]' },
    ],
    component_specification: [
      { label: 'Published', pattern: 'IEC [Number]-[Part]:[Year]' },
    ],
    operational_document: [
      { label: 'Published', pattern: 'IECEx OD [Number]-[Part]' },
    ],
    systems_reference_document: [
      { label: 'Published', pattern: 'IEC SRD [Number]:[Year]' },
    ],
    vap_identifier: [
      { label: 'Value-Added Product', pattern: 'IEC [Number]:[Year] [VAP]' },
    ],
    test_report_form: [
      { label: 'Test report form', pattern: 'IECEx TRF [Number]' },
    ],
    sheet_identifier: [
      { label: 'Sheet', pattern: 'IEC [Number]-[Part]:[Year] Sheet [N]' },
    ],
    societal_technology_trend_report: [
      { label: 'Published', pattern: 'IEC STTR [Number]:[Year]' },
    ],
    white_paper: [
      { label: 'Published', pattern: 'IEC WP [Code]:[Year]' },
    ],
  },
  ieee: {
    standard: [
      { label: 'Published', pattern: 'IEEE Std [Number]-[Year]' },
      { label: 'With subpart', pattern: 'IEEE Std [Number].[Sub]-[Year]' },
    ],
    project_draft_identifier: [
      { label: 'Project draft', pattern: 'IEEE P[Number]/D[Version]' },
    ],
    adopted_standard: [
      { label: 'Adopted', pattern: 'IEEE Std [Number]-[Year] (Adopted from [ExternalID])' },
    ],
    dual_published: [
      { label: 'Dual-published', pattern: 'IEC/IEEE [Number]-[Part]:[Year]' },
    ],
    iec_ieee_copublished: [
      { label: 'Published', pattern: 'IEC/IEEE [Number]-[Part]:[Year]' },
      { label: 'Draft', pattern: 'IEC/IEEE [Number]/D[Version] IEC:[Year] ([Date])' },
    ],
    corrigendum: [
      { label: 'Published', pattern: '[Base]/Cor [N]-[Year]' },
    ],
    supplement_identifier: [
      { label: 'Supplement', pattern: '[Base][Suffix]-[Year]' },
    ],
    redlined_standard: [
      { label: 'Redlined', pattern: '[Base] (Redline of [PrevID])' },
    ],
    nesc: [
      { label: 'NESC Handbook', pattern: '[Year] NESC Handbook, [Edition] Edition' },
    ],
    si_standard: [
      { label: 'SI Standard', pattern: 'IEEE/ASTM SI 10-[Year]' },
    ],
    joint_development: [
      { label: 'Joint development', pattern: 'IEC/IEEE P[Number], [Stage] [Year]' },
    ],
    dual_identifier: [
      { label: 'Dual identifier', pattern: '[FirstID] and [SecondID]' },
    ],
    conformance_identifier: [
      { label: 'Conformance', pattern: '[Base].[Sub]-[Year]' },
    ],
    interpretation_identifier: [
      { label: 'Interpretation', pattern: '[Base] Interpretation #[N]-[Year]' },
    ],
    csa_dual_published: [
      { label: 'CSA dual-published', pattern: '[Base]/CSA [CSA_ID]' },
    ],
    multi_numbered_identifier: [
      { label: 'Cross-reference', pattern: '[PrimaryID]/[SecondaryID]' },
      { label: 'Multi-numbered', pattern: '[PrimaryID] and [SecondaryID]' },
    ],
    parenthetical_identifier: [
      { label: 'Parenthetical', pattern: 'IEEE [Number]-[Year] ([Relationship])' },
    ],
  },
  itu: {
    recommendation: [
      { label: 'Published', pattern: 'ITU-[Sector] [Series].[Number]' },
      { label: 'With year', pattern: 'ITU-[Sector] [Series].[Number]-[Year]' },
    ],
    supplement: [
      { label: 'Supplement', pattern: '[Base] Suppl [N]' },
    ],
    amendment: [
      { label: 'Amendment', pattern: '[Base]/Amd [N]' },
    ],
    corrigendum: [
      { label: 'Corrigendum', pattern: '[Base]/Cor [N]' },
    ],
  },
  nist: {
    special_publication: [
      { label: 'Published', pattern: 'NIST SP [Number]' },
      { label: 'With revision', pattern: 'NIST SP [Number] Rev. [N]' },
      { label: 'With volume', pattern: 'NIST SP [Number] Vol. [N]' },
      { label: 'With part', pattern: 'NIST SP [Number]-[Part]' },
    ],
    federal_information_processing_standards: [
      { label: 'Published', pattern: 'FIPS [Number]' },
    ],
    interagency_report: [
      { label: 'Published', pattern: 'NIST IR [Number]' },
      { label: 'With volume', pattern: 'NIST IR [Number] Vol. [N]' },
    ],
    technical_note: [
      { label: 'Published', pattern: 'NIST TN [Number]' },
    ],
    handbook: [
      { label: 'Published', pattern: 'NIST HB [Number]-[Part]' },
    ],
    circular: [
      { label: 'Published', pattern: 'NBS CIRC [Number]' },
    ],
    monograph: [
      { label: 'Published', pattern: 'NBS MONO [Number]' },
    ],
    report: [
      { label: 'Published', pattern: 'NBS RPT [Number]' },
    ],
    letter_circular: [
      { label: 'Published', pattern: 'NBS LCIRC [Number]' },
    ],
    grant_contractor_report: [
      { label: 'Published', pattern: 'NIST GCR [Number]' },
    ],
    crpl_report: [
      { label: 'Published', pattern: 'NBS CRPL [Number]' },
    ],
    nsrds: [
      { label: 'Published', pattern: 'NSRDS-NBS [Number]' },
    ],
    ncstar: [
      { label: 'Published', pattern: 'NIST NCSTAR [Number]' },
    ],
    owmwp: [
      { label: 'Published', pattern: 'NIST OWMWP [Number]' },
    ],
    commercial_standard: [
      { label: 'Published', pattern: 'NBS CS [Number]' },
    ],
    miscellaneous_publication: [
      { label: 'Published', pattern: 'NBS MP [Number]' },
    ],
    circular_supplement: [
      { label: 'Supplement', pattern: '[Base]sup' },
    ],
    commercial_standards_monthly: [
      { label: 'Published', pattern: 'NBS CSM [Number]' },
    ],
    commercial_standard_emergency: [
      { label: 'Published', pattern: 'NBS CSE [Number]' },
    ],
  },
  bsi: {
    british_standard: [
      { label: 'Published', pattern: 'BS [Number]-[Part]:[Year]' },
      { label: 'With amendment', pattern: 'BS [Number]:[Year]+A[N]:[Year]' },
    ],
    adopted_international_standard: [
      { label: 'Adopted ISO', pattern: 'BS ISO [Number]:[Year]' },
      { label: 'Adopted IEC', pattern: 'BS EN IEC [Number]:[Year]' },
    ],
    adopted_european_norm: [
      { label: 'Published', pattern: 'BS EN [Number]-[Part]:[Year]' },
      { label: 'With amendment', pattern: 'BS EN [Number]:[Year]+A[N]:[Year]' },
    ],
    aerospace_standard: [
      { label: 'Published', pattern: 'BS A [Number]:[Year]' },
      { label: 'With amendment', pattern: 'BS A [Number]:[Year]+A[N]:[Year]' },
    ],
    publicly_available_specification: [
      { label: 'Published', pattern: 'PAS [Number]:[Year]' },
    ],
    technical_specification: [
      { label: 'Published', pattern: 'PD [Number]:[Year]' },
    ],
    flex: [
      { label: 'Published', pattern: 'BSI Flex [Number] v[Version]:[Year]' },
    ],
    handbook: [
      { label: 'Published', pattern: 'BS HB [Number]' },
    ],
    amendment: [
      { label: 'Incorporated', pattern: '[Base]+A[N]:[Year]' },
      { label: 'Separate', pattern: '[Base] AMD[N]' },
    ],
    corrigendum: [
      { label: 'Published', pattern: '[Base]/C[N]:[Year]' },
    ],
    draft_document: [
      { label: 'Draft for Development', pattern: 'DD [Number]-[Part]:[Year]' },
    ],
    committee_document: [
      { label: 'Committee document', pattern: '[YY]/[DocNumber] DC' },
    ],
    published_document: [
      { label: 'Published', pattern: 'PD [Number]:[Year]' },
    ],
    electronic_book: [
      { label: 'E-book', pattern: 'BS EB [Number]' },
    ],
    expert_commentary: [
      { label: 'Abbreviated', pattern: '[Base] ExComm' },
      { label: 'Full', pattern: '[Base] Expert Commentary' },
      { label: 'With topic', pattern: '[Base] ExComm ([Topic])' },
    ],
    value_added_publication: [
      { label: 'PDF', pattern: '[Base] PDF' },
      { label: 'Book', pattern: '[Base] BOOK' },
      { label: 'Track Changes', pattern: '[Base] - TC' },
    ],
  },
  cen: {
    european_norm: [
      { label: 'Published (dated)', pattern: 'EN [Number]-[Part]:[Year]' },
      { label: 'With amendment', pattern: 'EN [Number]:[Year]+A[N]:[Year]' },
    ],
    european_prestandard: [
      { label: 'Published', pattern: 'ENV [Number]-[Part]:[Year]' },
    ],
    technical_specification: [
      { label: 'Published', pattern: 'CEN/TS [Number]:[Year]' },
    ],
    technical_report: [
      { label: 'Published', pattern: 'CEN/TR [Number]:[Year]' },
    ],
    cen_workshop_agreement: [
      { label: 'Published', pattern: 'CWA [Number]-[Part]:[Year]' },
    ],
    guide: [
      { label: 'Published', pattern: 'CLC Guide [Number]:[Year]' },
    ],
    harmonization_document: [
      { label: 'Published', pattern: 'HD [Number]-[Part]:[Year]' },
    ],
    amendment: [
      { label: 'Amendment', pattern: '[Base]/A[N]:[Year]' },
    ],
    corrigendum: [
      { label: 'Corrigendum', pattern: '[Base]/AC:[Year]' },
    ],
    consolidated_identifier: [
      { label: 'Consolidated', pattern: '[Base]+A[N]:[Year]' },
    ],
    adopted_european_norm: [
      { label: 'Adopted', pattern: 'EN ISO [Number]:[Year]' },
    ],
    fragment: [
      { label: 'Fragment', pattern: 'EN [Number]:[Year] Frag [N]' },
    ],
    european_specification: [
      { label: 'Published', pattern: 'ES [Number]:[Year]' },
    ],
  },
  etsi: {
    etsi_standard: [
      { label: 'Published', pattern: 'ETSI [Type] [Number] V[Version] ([Date])' },
    ],
    amendment: [
      { label: 'Amendment', pattern: '[Base]/A[N] ed.[N] ([Date])' },
    ],
    corrigendum: [
      { label: 'Corrigendum', pattern: '[Base]/C[N] ed.[N] ([Date])' },
    ],
    supplement_identifier: [
      { label: 'Supplement', pattern: '[Base] S[N] ed.[N] ([Date])' },
    ],
  },
  ansi: {
    standard: [
      { label: 'Published', pattern: 'ANSI [Number]-[Year]' },
    ],
    american_national_standard: [
      { label: 'With developer', pattern: 'ANSI/[Developer] [Number]-[Year]' },
    ],
  },
  astm: {
    standard: [
      { label: 'Published', pattern: 'ASTM [Letter][Number]/[Letter][Number]M-[Year]' },
      { label: 'Without metric', pattern: 'ASTM [Letter][Number]-[Year]' },
    ],
  },
  ashrae: {
    standard: [
      { label: 'Published', pattern: 'ASHRAE Standard [Number]-[Year]' },
    ],
    guideline: [
      { label: 'Published', pattern: 'ASHRAE Guideline [Number]-[Year]' },
    ],
    addendum: [
      { label: 'Addendum', pattern: '[Base] Addendum [Letter]' },
    ],
    interpretation: [
      { label: 'Interpretation', pattern: '[Base] Interpretation [IC]' },
    ],
    errata: [
      { label: 'Errata', pattern: '[Base] Errata' },
    ],
    combined_addenda: [
      { label: 'Combined Addenda', pattern: '[Base] Combined Addenda' },
    ],
    addenda_package: [
      { label: 'Addenda Package', pattern: '[Base] Addenda Package' },
    ],
    test_standard: [
      { label: 'Published', pattern: 'ASHRAE Standard [Number]-[Year]' },
    ],
  },
  asme: {
    standard: [
      { label: 'Published', pattern: 'ASME [Code]-[Year]' },
    ],
  },
  ccsds: {
    blue_book: [
      { label: 'Recommended Standard', pattern: 'CCSDS [Number] (Recommended Standard)' },
    ],
    magenta_book: [
      { label: 'Recommended Practice', pattern: 'CCSDS [Number] (Recommended Practice)' },
    ],
    corrigendum: [
      { label: 'Corrigendum', pattern: '[Base] Corrigendum [N]' },
    ],
  },
  cie: {
    standard: [
      { label: 'Published', pattern: 'CIE [Number]:[Year]' },
    ],
    technical_report: [
      { label: 'Published', pattern: 'CIE [Number]:[Year]' },
    ],
    technical_note: [
      { label: 'Published', pattern: 'CIE TN [Number]:[Year]' },
    ],
    guide: [
      { label: 'Published', pattern: 'CIE [Number]:[Year]' },
    ],
    international_lighting_vocabulary: [
      { label: 'Published', pattern: 'CIE [Number]:[Year]' },
    ],
    proceedings: [
      { label: 'Published', pattern: 'CIE [Number]:[Year]' },
    ],
    draft_standard: [
      { label: 'Draft', pattern: 'CIE DS [Number]:[Year]' },
    ],
    dissemination: [
      { label: 'Published', pattern: 'CIE [Number]:[Year]' },
    ],
    supplement: [
      { label: 'Supplement', pattern: '[Base]-SP[Part]:[Year]' },
    ],
    corrigendum: [
      { label: 'Corrigendum', pattern: '[Base] Corrigendum [N]' },
    ],
  },
  csa: {
    standard: [
      { label: 'Published', pattern: '[CAN/CSA]-[Number]:[Year]' },
    ],
    recommended_practice: [
      { label: 'Published', pattern: '[CAN/CSA]-[Number]:[Year]' },
    ],
    guide: [
      { label: 'Published', pattern: 'CSA [Number]:[Year]' },
    ],
    adoption: [
      { label: 'Adopted', pattern: 'CAN/CSA-[Source] [Number]:[Year]' },
    ],
    consolidated: [
      { label: 'Consolidated', pattern: '[Number]:[Year] + A[N]:[Year]' },
    ],
    series: [
      { label: 'Series', pattern: '[Number] SERIES:[Year]' },
    ],
    bundle: [
      { label: 'Bundle', pattern: '[Number] + A[N]:[Year] + A[N]:[Year]' },
    ],
    update: [
      { label: 'Update', pattern: '[Number]:[Year] U[Number]' },
    ],
  },
  jis: {
    japanese_industrial_standard: [
      { label: 'Published', pattern: 'JIS [Class] [Number]-[Part]:[Year]' },
    ],
    technical_report: [
      { label: 'Published', pattern: 'JIS [Class] [Number] TR:[Year]' },
    ],
    technical_specification: [
      { label: 'Published', pattern: 'JIS [Class] [Number] TS:[Year]' },
    ],
    basic_standard: [
      { label: 'Published', pattern: 'JIS Z [Number]:[Year]' },
    ],
    handbook: [
      { label: 'Published', pattern: 'JIS [Class] [Number] HB' },
    ],
    handbook_compilation: [
      { label: 'Published', pattern: 'JIS [Class] [Number] HB' },
    ],
    amendment: [
      { label: 'Amendment', pattern: '[Base]/Amd [N]:[Year]' },
    ],
    explanation: [
      { label: 'Explanation', pattern: '[Base] Explanation' },
    ],
  },
  jcgm: {
    guide: [
      { label: 'Published', pattern: 'JCGM [Number]:[Year]' },
    ],
    document: [
      { label: 'Published', pattern: 'JCGM [Number]:[Year]' },
    ],
    supplement: [
      { label: 'Supplement', pattern: 'JCGM [Number]-[Part]:[Year]' },
    ],
    amendment: [
      { label: 'Amendment', pattern: '[Base]/Amd [N]:[Year]' },
    ],
  },
  oiml: {
    recommendation: [
      { label: 'Published (dated)', pattern: 'OIML R [Number]-[Part]:[Year]' },
      { label: 'Published (undated)', pattern: 'OIML R [Number]-[Part]' },
    ],
    document: [
      { label: 'Published', pattern: 'OIML D [Number]:[Year]' },
    ],
    guide: [
      { label: 'Published', pattern: 'OIML G [Number]:[Year]' },
    ],
    vocabulary: [
      { label: 'Published', pattern: 'OIML V [Number]:[Year]' },
    ],
    basic_publication: [
      { label: 'Published', pattern: 'OIML B [Number]:[Year]' },
    ],
    expert_report: [
      { label: 'Published', pattern: 'OIML E [Number]:[Year]' },
    ],
    supplement: [
      { label: 'Supplement', pattern: '[Base]/Suppl [N]:[Year]' },
    ],
    amendment: [
      { label: 'Amendment', pattern: '[Base]/Amd [N]:[Year]' },
    ],
    annex: [
      { label: 'Annex', pattern: '[Base] Annex [N]:[Year]' },
    ],
    corrigendum: [
      { label: 'Corrigendum', pattern: '[Base]/Cor [N]:[Year]' },
    ],
  },
  idf: {
    international_standard: [
      { label: 'Published', pattern: 'IDF [Number]:[Year]' },
    ],
    reviewed_method: [
      { label: 'Published', pattern: 'IDF [Number]:[Year]' },
    ],
    amendment: [
      { label: 'Amendment', pattern: '[Base]/AMD [N]:[Year]' },
    ],
    corrigendum: [
      { label: 'Corrigendum', pattern: '[Base]/COR [N]:[Year]' },
    ],
    supplement: [
      { label: 'Supplement', pattern: '[Base]/[SupplType] [N]:[Year]' },
    ],
  },
  api: {
    standard: [
      { label: 'Published', pattern: 'API Std [Number]' },
    ],
    recommended_practice: [
      { label: 'Published', pattern: 'API RP [Number]' },
    ],
    specification: [
      { label: 'Published', pattern: 'API Spec [Number]' },
    ],
    technical_report: [
      { label: 'Published', pattern: 'API TR [Number]' },
    ],
    bulletin: [
      { label: 'Published', pattern: 'API Bul [Number]' },
    ],
    publication: [
      { label: 'Published', pattern: 'API Pub [Number]' },
    ],
    guide: [
      { label: 'Published', pattern: 'API G [Number]' },
    ],
  },
  amca: {
    standard: [
      { label: 'Published', pattern: 'AMCA [Number]-[Year]' },
    ],
    certified_ratings_program: [
      { label: 'CRP', pattern: 'AMCA CRP [Number]-[Year]' },
    ],
    publication: [
      { label: 'Published', pattern: 'AMCA Pub [Number]-[Year]' },
    ],
  },
  plateau: {
    handbook: [
      { label: 'Published', pattern: 'Plateau Handbook [Number]:[Year]' },
    ],
    technical_report: [
      { label: 'Published', pattern: 'Plateau TR [Number]:[Year]' },
    ],
    annex: [
      { label: 'Annex', pattern: '[Base] Annex [Number]:[Year]' },
    ],
  },
  sae: {
    standard: [
      { label: 'Published', pattern: 'SAE [Type][Number][Version]' },
    ],
  },
}

export function getTypeSyntax(flavor: string, typeKey: string): SyntaxPattern[] | undefined {
  return data[flavor]?.[typeKey]
}
