import type { Publisher } from './types'

export const publishers: Publisher[] = [
  // ─── INTERNATIONAL ──────────────────────────────────────────────
  {
    flavor: 'iso',
    logo: '/logos/iso-logo.svg',
    name: 'ISO',
    fullName: 'International Organization for Standardization',
    category: 'international',
    description: 'ISO is an independent, non-governmental international organization that develops standards to ensure the quality, safety, and efficiency of products, services, and systems. ISO has published over 25,000 international standards covering almost all aspects of technology and manufacturing.',
    website: 'https://www.iso.org',
    syntaxNotes: 'ISO identifiers follow the pattern: [Copublisher/]ISO [Type] [Number][-Part]:[Year]. Joint publications use copublishers like ISO/IEC, ISO/ASTM, etc.',
    urnPattern: 'urn:iso:std:iso[:copublisher]:[number]:[edition]:[language]',
    relatedFlavors: ['iec', 'astm', 'bsi', 'cen', 'ieee'],
    docTypes: [
      {
        key: 'international_standard',
        title: 'International Standard',
        abbr: ['IS'],
        description: 'The primary deliverable of ISO. International Standards are documents that provide requirements, specifications, guidelines, or characteristics that can be used consistently to ensure materials, products, processes, and services are fit for their purpose.',
        examples: [
          { input: 'ISO 9001:2015', output: 'ISO 9001:2015' },
          { input: 'ISO/IEC 17031-1:2020', output: 'ISO/IEC 17031-1:2020' },
          { input: 'ISO 14001:2015(en)', output: 'ISO 14001:2015(en)' },
          { input: 'ISO 9001:2015/Ed 5' },
        ]
      },
      {
        key: 'technical_report',
        title: 'Technical Report',
        abbr: ['TR'],
        description: 'A Technical Report (TR) is an informative document containing information of a different kind from that of the International Standards. TRs are published when a technical committee has collected data of a different kind from that which is normally published as a standard.',
        examples: [
          { input: 'ISO/TR 10450:2019' },
          { input: 'ISO/TR 25679:2008' },
          { input: 'ISO/TR 13587:2012' },
        ]
      },
      {
        key: 'technical_specification',
        title: 'Technical Specification',
        abbr: ['TS'],
        description: 'A Technical Specification (TS) addresses work still under technical development, or where it is believed that there will be a future, but not immediate, possibility of agreement on an International Standard. Published for provisional use.',
        examples: [
          { input: 'ISO/TS 22003:2013' },
          { input: 'ISO/TS 14033:2012' },
          { input: 'ISO/TS 16949:2009' },
        ]
      },
      {
        key: 'publicly_available_specification',
        title: 'Publicly Available Specification',
        abbr: ['PAS'],
        description: 'A PAS is published to respond to an urgent market need, representing either the consensus in a working group or the result of a workshop agreement. It has a maximum lifetime of 6 years before it must be converted to another deliverable type.',
        examples: [
          { input: 'ISO/PAS 45001:2017' },
          { input: 'ISO/PAS 28000:2007' },
          { input: 'ISO/PAS 22399:2007' },
        ]
      },
      {
        key: 'guide',
        title: 'Guide',
        abbr: ['Guide'],
        description: 'ISO Guides provide guidance and orientation on specific topics. They are not standards themselves but provide rules, guidelines, or recommendations for standardization work.',
        examples: [
          { input: 'ISO Guide 73:2009' },
          { input: 'ISO/IEC Guide 98-3:2008' },
          { input: 'ISO Guide 35:2017' },
        ]
      },
      {
        key: 'amendment',
        title: 'Amendment',
        abbr: ['Amd', 'AM'],
        description: 'An Amendment modifies an existing International Standard by adding, changing, or deleting specified elements. It is published as a separate supplement to the base document and referenced using the base document ID.',
        examples: [
          { input: 'ISO 9001:2015/Amd 1:2024' },
          { input: 'ISO 14001:2015/Amd 1:2023' },
          { input: 'ISO/IEC 17031-1:2020/Amd 1:2022' },
        ]
      },
      {
        key: 'corrigendum',
        title: 'Corrigendum',
        abbr: ['Cor', 'COR'],
        description: 'A Corrigendum corrects technical or editorial errors in an already published document. Unlike amendments, corrigenda do not add new content but fix mistakes.',
        examples: [
          { input: 'ISO 9001:2015/Cor 1:2016' },
          { input: 'ISO 14001:2015/Cor 1:2016' },
        ]
      },
      {
        key: 'supplement',
        title: 'Supplement',
        abbr: ['Suppl'],
        description: 'A Supplement adds additional content to a base document, such as supplementary requirements or guidelines.',
        examples: [
          { input: 'ISO/IEC Directives Part 1 Supplement:2023' },
        ]
      },
      {
        key: 'addendum',
        title: 'Addendum',
        abbr: ['Add'],
        description: 'An Addendum is a legacy supplement type used primarily in older ISO documents. It adds new material to an existing standard.',
        examples: [
          { input: 'ISO 2789:2006/Add 1:2008' },
        ]
      },
      {
        key: 'international_workshop_agreement',
        title: 'International Workshop Agreement',
        abbr: ['IWA'],
        description: 'An IWA is a document developed through a workshop rather than the normal committee process. It provides a mechanism for reaching consensus outside the normal committee structure.',
        examples: [
          { input: 'IWA 36:2022' },
          { input: 'IWA 39:2024' },
          { input: 'AWI IWA 36' },
        ]
      },
      {
        key: 'international_standardized_profile',
        title: 'International Standardized Profile',
        abbr: ['ISP'],
        description: 'An ISP defines a standardized set of choices of the options available in International Standards for a particular function or application.',
        examples: [
          { input: 'ISO/IEC ISP 10611-7:2003' },
        ]
      },
      {
        key: 'technology_trends_assessments',
        title: 'Technology Trends Assessments',
        abbr: ['TTA'],
        description: 'TTAs are documents that provide an overview of emerging technologies and their potential for standardization.',
        examples: [
          { input: 'ISO/TTA 1:1994' },
          { input: 'ISO/TTA 2:1997' },
        ]
      },
      {
        key: 'directives',
        title: 'Directives',
        abbr: ['Directives'],
        description: 'ISO/IEC Directives define the rules for the preparation and presentation of International Standards and other deliverables.',
        examples: [
          { input: 'ISO/IEC Directives Part 1:2023' },
          { input: 'ISO/IEC Directives Part 2:2021' },
        ]
      },
      {
        key: 'directives_supplement',
        title: 'Directives Supplement',
        abbr: ['Suppl'],
        description: 'Supplements to the ISO/IEC Directives that provide additional procedures specific to ISO or IEC.',
        examples: [
          { input: 'ISO/IEC Directives Part 1 ISO Supplement:2023' },
        ]
      },
      {
        key: 'extract',
        title: 'Extract',
        abbr: ['Extract'],
        description: 'An Extract is a reproduction of a portion of a published International Standard.',
        examples: [
          { input: 'ISO 9001:2015/Extract' },
        ]
      },
      {
        key: 'recommendation',
        title: 'Recommendation',
        abbr: ['R'],
        description: 'A Recommendation is a legacy document type used in early ISO/IEC publications.',
        examples: [
          { input: 'ISO/R 100:1959' },
        ]
      },
      {
        key: 'tc_document',
        title: 'Technical Committee Document',
        abbr: ['N', 'TC Doc'],
        description: 'Internal working documents of ISO technical committees, numbered with N-numbers.',
        examples: [
          { input: 'ISO/TC 176 N 1000' },
        ]
      },
      {
        key: 'data',
        title: 'Data Document',
        abbr: ['Data'],
        description: 'Data documents provide reference data sets or databases.',
        examples: [
          { input: 'ISO/Data 1:2007' },
        ]
      },
    ],
    stages: [
      { code: '00.00', abbr: 'PWI', name: 'Preliminary Work Item' },
      { code: '10.00', abbr: 'NP', name: 'New Proposal' },
      { code: '10.99', abbr: 'AWI', name: 'Approved Work Item' },
      { code: '20.00', abbr: 'WD', name: 'Working Draft' },
      { code: '30.00', abbr: 'CD', name: 'Committee Draft' },
      { code: '40.00', abbr: 'DIS', name: 'Draft International Standard' },
      { code: '50.00', abbr: 'FDIS', name: 'Final Draft International Standard' },
      { code: '60.00', abbr: 'PRF', name: 'Proof of a standard (pre-publication)' },
      { code: '60.60', abbr: 'IS', name: 'International Standard (published)' },
      { code: '90.20', abbr: 'RVD', name: 'Review Discontinued' },
      { code: '90.60', abbr: 'WTH', name: 'Withdrawn' },
      { code: '90.92', abbr: 'WDT', name: 'Withdrawal Decided' },
      { code: '90.93', abbr: 'RVD', name: 'Review Verified' },
      { code: '95.20', abbr: 'FPN', name: 'Final Proposal for Withdrawal' },
      { code: '95.99', abbr: 'WTH', name: 'Withdrawal of International Standard' },
    ],
    components: [
      { name: 'Publisher', description: 'The issuing organization (ISO, or joint like ISO/IEC)' },
      { name: 'Copublisher', description: 'Additional organizations in joint publications (IEC, ASTM, CEN, etc.)', attribute: 'copublisher' },
      { name: 'Document Type', description: 'The type of deliverable (IS, TR, TS, PAS, Guide, etc.)', attribute: 'type' },
      { name: 'Number', description: 'The unique document number', attribute: 'number' },
      { name: 'Part', description: 'Part number for multi-part standards', attribute: 'part' },
      { name: 'Year', description: 'Publication year', attribute: 'year' },
      { name: 'Edition', description: 'Edition number (e.g., Ed 5)', attribute: 'edition' },
      { name: 'Language', description: 'Language code (en, fr, ru, etc.)', attribute: 'language' },
      { name: 'Stage', description: 'Development stage (WD, CD, DIS, FDIS)', attribute: 'stage' },
      { name: 'Typed Stage', description: 'Stage combined with document type (e.g., DTR for Draft Technical Report)', attribute: 'typed_stage' },
      { name: 'Supplement', description: 'Amendment or corrigendum reference', attribute: 'supplement' },
    ],
    algebra: [
      { type: 'Amendment', description: 'Modifies a base standard by adding, changing, or deleting elements', syntax: 'ISO [Number]:[Year]/Amd [N]:[Year]', example: 'ISO 9001:2015/Amd 1:2024' },
      { type: 'Corrigendum', description: 'Corrects technical or editorial errors', syntax: 'ISO [Number]:[Year]/Cor [N]:[Year]', example: 'ISO 9001:2015/Cor 1:2016' },
      { type: 'Addendum', description: 'Legacy supplement type adding new material', syntax: 'ISO [Number]:[Year]/Add [N]:[Year]', example: 'ISO 2789:2006/Add 1:2008' },
      { type: 'Part', description: 'Multi-part standard relationship', syntax: 'ISO [Number]-[Part]:[Year]', example: 'ISO/IEC 17031-1:2020' },
      { type: 'Series', description: 'All-parts reference to a multi-part series', syntax: 'ISO [Number] (all parts)', example: 'ISO 9001 (all parts)' },
      { type: 'Bundle', description: 'Multiple documents bundled together', syntax: '[PubID] + [PubID]', example: 'BS ISO 26000 + IWA 26' },
      { type: 'Draft', description: 'Draft stage of a document', syntax: 'ISO/[Stage] [Type] [Number]', example: 'ISO/DIS 45001' },
      { type: 'Internal Document', description: 'Working documents with N-numbers', syntax: 'ISO/TC [N] [DocNumber]', example: 'ISO/TC 176 N 1000' },
      { type: 'Clause Reference', description: 'Reference to specific clause within a document', syntax: 'ISO [Number]:[Year], Clause [N]', example: 'ISO 9001:2015, Clause 4.1' },
    ],
  },
  {
    flavor: 'iec',
    logo: '/logos/iec-logo.svg',
    name: 'IEC',
    fullName: 'International Electrotechnical Commission',
    category: 'international',
    description: 'The IEC is a global organization that prepares and publishes international standards for all electrical, electronic, and related technologies. IEC standards cover a vast range of technologies from power generation to nanotechnology.',
    website: 'https://www.iec.ch',
    syntaxNotes: 'IEC identifiers follow the pattern: IEC [Type] [Number]-[Part]:[Year]. Many IEC identifiers include CISPR (Comité International Spécial des Perturbations Radioélectriques) designations. Value-added products (CSV, CMV, RLV, etc.) use suffixes.',
    urnPattern: 'urn:iec:std:iec:[number]:[edition]:[language]',
    relatedFlavors: ['iso', 'ieee', 'bsi', 'cen', 'csa'],
    docTypes: [
      {
        key: 'international_standard',
        title: 'International Standard',
        abbr: ['IS'],
        description: 'The primary IEC standard deliverable, defining requirements and specifications for electrotechnical products and systems.',
        examples: [
          { input: 'IEC 61131-3:2013' },
          { input: 'IEC 60950-1:2005+AMD1:2009+AMD2:2013 CSV' },
          { input: 'CISPR 16-1-1:2019' },
          { input: 'IEC 60034-1:2022 RLV' },
        ]
      },
      {
        key: 'technical_report',
        title: 'Technical Report',
        abbr: ['TR'],
        description: 'An informative document containing collected data or analysis that does not constitute a standard.',
        examples: [
          { input: 'IEC TR 60825-14:2022' },
          { input: 'IEC TR 62357-1:2016' },
        ]
      },
      {
        key: 'technical_specification',
        title: 'Technical Specification',
        abbr: ['TS'],
        description: 'A specification published for provisional application, typically when technology is still evolving.',
        examples: [
          { input: 'IEC TS 62600-100:2012' },
          { input: 'IEC TS 62257-1:2015' },
        ]
      },
      {
        key: 'publicly_available_specification',
        title: 'Publicly Available Specification',
        abbr: ['PAS'],
        description: 'A specification published to respond to urgent market needs.',
        examples: [
          { input: 'IEC PAS 62430:2007' },
        ]
      },
      {
        key: 'guide',
        title: 'Guide',
        abbr: ['Guide'],
        description: 'IEC Guides provide guidance on standardization principles and practices.',
        examples: [
          { input: 'IEC GUIDE 103:1980' },
          { input: 'IEC GUIDE 108:2019' },
        ]
      },
      {
        key: 'amendment',
        title: 'Amendment',
        abbr: ['AMD', 'AM'],
        description: 'Modifies an existing standard by adding, changing, or deleting specified elements.',
        examples: [
          { input: 'IEC 61131-3:2013/AMD1:2019' },
          { input: 'IEC 60050-111/AMD1/FRAG1 ED2' },
        ]
      },
      {
        key: 'corrigendum',
        title: 'Corrigendum',
        abbr: ['COR'],
        description: 'Corrects technical or editorial errors in a published document.',
        examples: [
          { input: 'CISPR 16-1-3:2004/COR1:2006' },
          { input: 'CISPR 16-1-5:2014/COR1:2020' },
        ]
      },
      {
        key: 'interpretation_sheet',
        title: 'Interpretation Sheet',
        abbr: ['ISH'],
        description: 'Official interpretation of requirements in an IEC standard.',
        examples: [
          { input: 'IEC 60079-0:2017/ISH1:2023' },
          { input: 'IEC 60335-2-6:2002/ISH1:2008' },
        ]
      },
      {
        key: 'consolidated_identifier',
        title: 'Consolidated Version',
        abbr: ['CSV', 'CMV'],
        description: 'A value-added product combining the base standard with all amendments. CSV (Consolidated Standalone Version) and CMV (Consolidated Mixed Version).',
        examples: [
          { input: 'IEC 60950-1:2005+AMD1:2009+AMD2:2013 CSV' },
          { input: 'IEC 61010-1:2010+AMD1:2016 CMV' },
        ]
      },
      {
        key: 'working_document',
        title: 'Working Document',
        abbr: ['WD'],
        description: 'Internal working documents for IEC committee use.',
        examples: [
          { input: 'IEC 2/2102/CDV' },
          { input: 'IEC 2/2103/NP' },
        ]
      },
      {
        key: 'fragment_identifier',
        title: 'Fragment Identifier',
        abbr: ['FRAG'],
        description: 'References a specific fragment within an amendment.',
        examples: [
          { input: 'IEC 60050-111/AMD1/FRAG1 ED2' },
          { input: 'IEC 60050-121/AMD2/FRAG1 ED2' },
        ]
      },
      {
        key: 'component_specification',
        title: 'Component Specification',
        abbr: ['CS'],
        description: 'Specifications for electronic components.',
        examples: [
          { input: 'IEC 60127-1:2006/AMD1:2014' },
        ]
      },
      {
        key: 'operational_document',
        title: 'Operational Document',
        abbr: ['OD'],
        description: 'Documents related to IEC conformity assessment systems.',
        examples: [
          { input: 'IECEx OD 005-1' },
        ]
      },
      {
        key: 'systems_reference_document',
        title: 'Systems Reference Document',
        abbr: ['SRD'],
        description: 'Reference documents for IEC systems.',
        examples: [
          { input: 'IEC SRD 63226:2021' },
        ]
      },
      {
        key: 'vap_identifier',
        title: 'Value-Added Product',
        abbr: ['CSV', 'CMV', 'RLV', 'SER', 'EXV', 'PAC', 'PRV'],
        description: 'Value-added versions of standards (Consolidated, Redline, Series, Extract, Package, Preview).',
        examples: [
          { input: 'IEC 60034-1:2022 RLV' },
          { input: 'IEC 60950-1:2005+AMD1:2009+AMD2:2013 CSV' },
          { input: 'IEC 60335-2-6:2002 SER' },
        ]
      },
      {
        key: 'test_report_form',
        title: 'Test Report Form',
        abbr: ['TRF'],
        description: 'Standardized forms used in IEC conformity assessment.',
        examples: [
          { input: 'IECEx TRF 60079/0' },
        ]
      },
      {
        key: 'sheet_identifier',
        title: 'Sheet Identifier',
        abbr: ['Sheet'],
        description: 'Individual sheet within a multi-sheet standard.',
        examples: [
          { input: 'IEC 60335-2-6:2002 Sheet 1' },
        ]
      },
      {
        key: 'societal_technology_trend_report',
        title: 'Societal Technology Trend Report',
        abbr: ['STTR'],
        description: 'Reports analyzing technology trends and their societal impact.',
        examples: [
          { input: 'IEC STTR 1:2020' },
        ]
      },
      {
        key: 'white_paper',
        title: 'White Paper',
        abbr: ['WP'],
        description: 'IEC white papers exploring emerging technology topics.',
        examples: [
          { input: 'IEC WP AAL:2022' },
        ]
      },
    ],
    stages: [
      { code: '00.00', abbr: 'PWI', name: 'Preliminary Work Item' },
      { code: '10.00', abbr: 'NP', name: 'New Proposal' },
      { code: '20.00', abbr: 'WD', name: 'Working Draft' },
      { code: '30.00', abbr: 'CD', name: 'Committee Draft' },
      { code: '35.00', abbr: 'CC', name: 'Committee Draft for Enquiry' },
      { code: '40.00', abbr: 'CDV', name: 'Committee Draft for Vote' },
      { code: '40.99', abbr: 'DTS', name: 'Draft Technical Specification' },
      { code: '40.99', abbr: 'DTR', name: 'Draft Technical Report' },
      { code: '50.00', abbr: 'FDIS', name: 'Final Draft International Standard' },
      { code: '50.99', abbr: 'FDTS', name: 'Final Draft Technical Specification' },
      { code: '50.99', abbr: 'FDTR', name: 'Final Draft Technical Report' },
      { code: '60.00', abbr: 'PRF', name: 'Proof (pre-publication)' },
      { code: '60.60', abbr: 'IS', name: 'International Standard (published)' },
    ],
    components: [
      { name: 'Publisher', description: 'The issuing organization (IEC, CISPR)' },
      { name: 'Document Type', description: 'The type of deliverable (IS, TR, TS, Guide, etc.)' },
      { name: 'Number', description: 'The unique document number' },
      { name: 'Part', description: 'Part number for multi-part standards' },
      { name: 'Year', description: 'Publication year' },
      { name: 'Edition', description: 'Edition number (e.g., ED2)' },
      { name: 'Language', description: 'Language code' },
      { name: 'Stage', description: 'Development stage (CD, CDV, FDIS)' },
      { name: 'VAP Suffix', description: 'Value-added product suffix (CSV, RLV, SER, etc.)', attribute: 'vap_suffix' },
      { name: 'Consolidated Amendment', description: 'Consolidated amendment references (+AMD1:2009+AMD2:2013)', attribute: 'consolidated_amendment' },
    ],
    algebra: [
      { type: 'Amendment', description: 'Modifies a base standard', syntax: 'IEC [Number]:[Year]/AMD[N]:[Year]', example: 'IEC 61131-3:2013/AMD1:2019' },
      { type: 'Corrigendum', description: 'Corrects errors in published documents', syntax: 'IEC [Number]:[Year]/COR[N]:[Year]', example: 'CISPR 16-1-3:2004/COR1:2006' },
      { type: 'Consolidated', description: 'Base + amendments combined', syntax: 'IEC [Number]:[Year]+AMD1:[Year] CSV', example: 'IEC 60950-1:2005+AMD1:2009+AMD2:2013 CSV' },
      { type: 'Fragment', description: 'Specific fragment within an amendment', syntax: 'IEC [Number]/AMD[N]/FRAG[N] ED[N]', example: 'IEC 60050-111/AMD1/FRAG1 ED2' },
      { type: 'Part', description: 'Multi-part standard', syntax: 'IEC [Number]-[Part]:[Year]', example: 'IEC 61131-3:2013' },
      { type: 'Interpretation Sheet', description: 'Official interpretation', syntax: 'IEC [Number]:[Year]/ISH[N]:[Year]', example: 'IEC 60079-0:2017/ISH1:2023' },
    ],
  },
  {
    flavor: 'ieee',
    logo: '/logos/ieee-logo.svg',
    name: 'IEEE',
    fullName: 'Institute of Electrical and Electronics Engineers',
    category: 'international',
    description: 'IEEE is the world\'s largest technical professional organization for the advancement of technology. IEEE Standards Association (IEEE SA) develops standards across a wide range of industries including power and energy, telecommunications, computing, and more.',
    website: 'https://standards.ieee.org',
    syntaxNotes: 'IEEE identifiers follow patterns like: IEEE Std [Number]-[Year], IEEE [Number]-[Year], IEEE [Draft Number]/D[DraftVersion]. Some include AIEE legacy identifiers.',
    urnPattern: 'urn:ieee:std:[number]:[year]',
    relatedFlavors: ['iec', 'iso', 'csa', 'bsi'],
    docTypes: [
      {
        key: 'standard',
        title: 'Standard',
        abbr: ['Std'],
        description: 'IEEE Standards define requirements, specifications, and best practices for technologies.',
        examples: [
          { input: 'IEEE Std 802.3-2018' },
          { input: 'IEEE Std 802.11-2020' },
          { input: 'IEEE Std 754-2019' },
          { input: 'IEEE Std 1588-2019' },
        ]
      },
      {
        key: 'project_draft_identifier',
        title: 'Project Draft',
        abbr: ['P'],
        description: 'Draft standards under development, prefixed with P.',
        examples: [
          { input: 'IEEE P802.3bf/D3.0' },
          { input: 'IEEE P802.11be/D7.0' },
          { input: 'IEEE P1453/D11, May 2023' },
        ]
      },
      {
        key: 'adopted_standard',
        title: 'Adopted Standard',
        abbr: ['Adopted'],
        description: 'An IEEE adoption of another organization\'s standard.',
        examples: [
          { input: 'IEEE Std 1244-5-2000 (Adopted from ISO/IEC 14102:1995)' },
        ]
      },
      {
        key: 'dual_published',
        title: 'Dual-Published Standard',
        abbr: ['Dual'],
        description: 'Standards published jointly by IEEE and another organization (e.g., IEC/IEEE).',
        examples: [
          { input: 'IEC/IEEE 62582-6:2022' },
          { input: 'IEC/IEEE 60780-323:2023' },
        ]
      },
      {
        key: 'iec_ieee_copublished',
        title: 'IEC/IEEE Copublished',
        abbr: ['Copub'],
        description: 'Standards jointly published by IEC and IEEE.',
        examples: [
          { input: 'IEC/IEEE P60780-323, CDV1 2014' },
          { input: 'IEC/IEEE P62582-6, FDIS May 2019' },
        ]
      },
      {
        key: 'corrigendum',
        title: 'Corrigendum',
        abbr: ['Cor', 'Cor 1'],
        description: 'Corrections to published IEEE standards.',
        examples: [
          { input: 'IEEE Std 802.3-2018/Cor 1-2020' },
        ]
      },
      {
        key: 'supplement_identifier',
        title: 'Supplement',
        abbr: ['Suppl'],
        description: 'Supplementary material to a base standard.',
        examples: [
          { input: 'IEEE Std 802.3cg-2019 (Supplement to IEEE Std 802.3-2018)' },
        ]
      },
      {
        key: 'redlined_standard',
        title: 'Redlined Standard',
        abbr: ['Redline'],
        description: 'A version showing changes from the previous edition with additions and deletions marked.',
        examples: [
          { input: 'IEEE Std 802.3-2018 (Redline of IEEE Std 802.3-2015)' },
        ]
      },
      {
        key: 'nesc',
        title: 'NESC (National Electrical Safety Code)',
        abbr: ['NESC'],
        description: 'The National Electrical Safety Code, published by IEEE.',
        examples: [
          { input: '2012 NESC Handbook, Seventh Edition' },
          { input: '2017 NESC Handbook, Premier Edition' },
        ]
      },
      {
        key: 'si_standard',
        title: 'SI Standard',
        abbr: ['SI'],
        description: 'IEEE/ASTM SI 10 standard for metric/inch conversion.',
        examples: [
          { input: 'IEEE/ASTM SI 10-2010' },
        ]
      },
      {
        key: 'joint_development',
        title: 'Joint Development',
        abbr: ['Joint'],
        description: 'Standards under joint development by IEC and IEEE.',
        examples: [
          { input: 'IEC/IEEE P60780-323, CDV1 2014' },
        ]
      },
      {
        key: 'dual_identifier',
        title: 'Dual Identifier',
        abbr: ['Dual'],
        description: 'Standards with dual numbering from different organizations.',
        examples: [
          { input: 'ANSI/IEEE Std 802.3-1985' },
        ]
      },
      {
        key: 'conformance_identifier',
        title: 'Conformance Identifier',
        abbr: ['Conformance'],
        description: 'Conformance testing documentation.',
        examples: [
          { input: 'IEEE Std 802.3.1-2013' },
        ]
      },
      {
        key: 'interpretation_identifier',
        title: 'Interpretation',
        abbr: ['Interp'],
        description: 'Official interpretations of IEEE standards.',
        examples: [
          { input: 'IEEE Std 802.3 Interpretation #1-2007' },
        ]
      },
      {
        key: 'csa_dual_published',
        title: 'CSA Dual-Published',
        abbr: ['CSA Dual'],
        description: 'Standards dual-published with CSA Group.',
        examples: [
          { input: 'IEEE Std C37.30.1-2017/CSA C22.2 No. 60038-1:17' },
        ]
      },
      {
        key: 'multi_numbered_identifier',
        title: 'Multi-Numbered Identifier',
        abbr: ['Multi'],
        description: 'Standards with multiple designation numbers.',
        examples: [
          { input: 'IEEE Std 802.3az-2010' },
        ]
      },
      {
        key: 'parenthetical_identifier',
        title: 'Parenthetical Identifier',
        abbr: ['Paren'],
        description: 'Standards identified with parenthetical information.',
        examples: [
          { input: 'IEEE 1016-2009 (Revision of IEEE 1016-1998)' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'IEEE, IEC/IEEE, or ANSI/IEEE' },
      { name: 'Draft Indicator', description: 'P prefix for draft standards', attribute: 'draft' },
      { name: 'Number', description: 'The standard number' },
      { name: 'Part', description: 'Part number or subpart' },
      { name: 'Year', description: 'Publication or revision year' },
      { name: 'Draft Version', description: 'Draft version number (e.g., D3.0)' },
      { name: 'Relationship', description: 'Relationship to other standards (Revision of, Amendment to)', attribute: 'relationship' },
      { name: 'Typed Stage', description: 'Stage indicator (CDV, FDIS, etc.)', attribute: 'typed_stage' },
    ],
    algebra: [
      { type: 'Corrigendum', description: 'Corrections to published standards', syntax: 'IEEE Std [Number]-[Year]/Cor [N]-[Year]', example: 'IEEE Std 802.3-2018/Cor 1-2020' },
      { type: 'Supplement', description: 'Additional content to base standard', syntax: 'IEEE Std [Number][Suffix]-[Year]', example: 'IEEE Std 802.3cg-2019' },
      { type: 'Adoption', description: 'Adoption of external standard', syntax: 'IEEE Std [Number]-[Year] (Adopted from [ExternalID])', example: 'IEEE Std 1244-5-2000 (Adopted from ISO/IEC 14102:1995)' },
      { type: 'Copublished', description: 'Joint IEC/IEEE publication', syntax: 'IEC/IEEE [Number]-[Year]', example: 'IEC/IEEE 62582-6:2022' },
      { type: 'Draft', description: 'Draft stage', syntax: 'IEEE P[Number]/D[Version]', example: 'IEEE P802.3bf/D3.0' },
    ],
  },
  {
    flavor: 'itu',
    logo: '/logos/itu-logo.svg',
    name: 'ITU',
    fullName: 'International Telecommunication Union',
    category: 'international',
    description: 'The ITU is the United Nations specialized agency for information and communication technologies. ITU standards (Recommendations) are fundamental to the operation of global telecommunications networks and services.',
    website: 'https://www.itu.int',
    syntaxNotes: 'ITU Recommendations follow the pattern: ITU-[Sector] [Series][Number]-[Year]. Sectors include R (Radiocommunication), T (Telecommunication Standardization), and D (Telecommunication Development).',
    relatedFlavors: ['iso', 'iec'],
    docTypes: [
      {
        key: 'recommendation',
        title: 'Recommendation',
        abbr: ['Rec'],
        description: 'ITU Recommendations (sometimes called ITU-T Standards) define specifications for telecommunications technologies.',
        examples: [
          { input: 'ITU-R 01-201' },
          { input: 'ITU-T G.992.1' },
          { input: 'ITU-R SA.1014-4' },
          { input: 'ITU-T E.164' },
        ]
      },
      {
        key: 'supplement',
        title: 'Supplement',
        abbr: ['Suppl'],
        description: 'Supplementary material to an ITU Recommendation.',
        examples: [
          { input: 'ITU-T G.992.1 Suppl 1' },
        ]
      },
      {
        key: 'amendment',
        title: 'Amendment',
        abbr: ['Amd'],
        description: 'Modifications to an existing ITU Recommendation.',
        examples: [
          { input: 'ITU-T G.992.1/Amd 1' },
        ]
      },
      {
        key: 'corrigendum',
        title: 'Corrigendum',
        abbr: ['Cor'],
        description: 'Corrections to published ITU Recommendations.',
        examples: [
          { input: 'ITU-T G.992.1/Cor 1' },
        ]
      },
    ],
    components: [
      { name: 'Sector', description: 'ITU sector: R (Radiocommunication), T (Standardization), D (Development)', attribute: 'sector' },
      { name: 'Series', description: 'The series letter (e.g., G, E, H, SA)', attribute: 'series' },
      { name: 'Number', description: 'The recommendation number' },
      { name: 'Year', description: 'Publication year' },
    ],
    algebra: [
      { type: 'Amendment', description: 'Modifies a Recommendation', syntax: 'ITU-[Sector] [Series].[Number]/Amd [N]', example: 'ITU-T G.992.1/Amd 1' },
      { type: 'Corrigendum', description: 'Corrects errors', syntax: 'ITU-[Sector] [Series].[Number]/Cor [N]', example: 'ITU-T G.992.1/Cor 1' },
      { type: 'Supplement', description: 'Additional content', syntax: 'ITU-[Sector] [Series].[Number] Suppl [N]', example: 'ITU-T G.992.1 Suppl 1' },
    ],
  },
  // ─── REGIONAL ──────────────────────────────────────────────────
  {
    flavor: 'cen',
    logo: '/logos/cen-logo.svg',
    name: 'CEN',
    fullName: 'European Committee for Standardization',
    category: 'regional',
    description: 'CEN (Comité Européen de Normalisation) is a major provider of European Standards and other deliverables. CEN standards are developed through a transparent process involving industry, public authorities, and consumer and environmental organizations.',
    website: 'https://www.cen.eu',
    syntaxNotes: 'CEN uses EN (European Norm) designations. Standards follow patterns like: EN [Number]:[Year], CEN/TS [Number]:[Year]. CENELEC standards use CLC prefix.',
    urnPattern: 'urn:cen:std:en:[number]:[year]',
    relatedFlavors: ['iso', 'iec', 'bsi'],
    docTypes: [
      {
        key: 'european_norm',
        title: 'European Norm',
        abbr: ['EN'],
        description: 'EN standards are European Standards that must be adopted by all CEN national members.',
        examples: [
          { input: 'EN 196-3:2005+A1:2008' },
          { input: 'EN 527-2:2016+A1:2019' },
          { input: 'EN 1090-2:2018' },
        ]
      },
      {
        key: 'european_prestandard',
        title: 'European Prestandard',
        abbr: ['ENV'],
        description: 'Provisional standards published for provisional application.',
        examples: [
          { input: 'ENV 1991-1:1994' },
        ]
      },
      {
        key: 'technical_specification',
        title: 'Technical Specification',
        abbr: ['CEN/TS'],
        description: 'CEN Technical Specifications for provisional use.',
        examples: [
          { input: 'CEN/TS 14243:2012' },
        ]
      },
      {
        key: 'technical_report',
        title: 'Technical Report',
        abbr: ['CEN/TR'],
        description: 'Informative documents from CEN.',
        examples: [
          { input: 'CEN/TR 15522-1:2007' },
        ]
      },
      {
        key: 'cen_workshop_agreement',
        title: 'CEN Workshop Agreement',
        abbr: ['CWA'],
        description: 'Documents developed through an open CEN Workshop process.',
        examples: [
          { input: 'CWA 15261-1:2005' },
        ]
      },
      {
        key: 'guide',
        title: 'Guide',
        abbr: ['CLC Guide', 'CEN Guide'],
        description: 'Guidance documents from CEN or CENELEC.',
        examples: [
          { input: 'CLC Guide 1:2022' },
        ]
      },
      {
        key: 'harmonization_document',
        title: 'Harmonization Document',
        abbr: ['HD'],
        description: 'CENELEC Harmonization Documents.',
        examples: [
          { input: 'HD 60364-1:2008' },
        ]
      },
      {
        key: 'amendment',
        title: 'Amendment',
        abbr: ['Amd'],
        description: 'Amendments to European Norms.',
        examples: [
          { input: 'EN ISO 13485:2016/A1:2024' },
        ]
      },
      {
        key: 'corrigendum',
        title: 'Corrigendum',
        abbr: ['Cor', 'AC'],
        description: 'Corrections to CEN publications.',
        examples: [
          { input: 'EN ISO 13485:2016/AC:2016' },
        ]
      },
      {
        key: 'consolidated_identifier',
        title: 'Consolidated Version',
        abbr: ['+A'],
        description: 'Base standard with incorporated amendments.',
        examples: [
          { input: 'EN 196-3:2005+A1:2008' },
          { input: 'EN 527-2:2016+A1:2019' },
        ]
      },
      {
        key: 'adopted_european_norm',
        title: 'Adopted European Norm',
        abbr: ['EN ISO', 'EN IEC'],
        description: 'European adoption of international (ISO/IEC) standards.',
        examples: [
          { input: 'EN ISO 13485:2016/AC:2016' },
          { input: 'EN ISO 13485:2016/AC:2017' },
        ]
      },
      {
        key: 'fragment',
        title: 'Fragment',
        abbr: ['Frag'],
        description: 'Specific fragment of a CEN document.',
        examples: [
          { input: 'EN 196-3:2005+A1:2008 Frag 1' },
        ]
      },
      {
        key: 'european_specification',
        title: 'European Specification',
        abbr: ['ES'],
        description: 'CEN European Specifications.',
        examples: [
          { input: 'ES 59001:2004' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'CEN, CENELEC (CLC), or joint designations' },
      { name: 'Document Type', description: 'EN, CEN/TS, CEN/TR, CWA, HD, etc.' },
      { name: 'Number', description: 'The document number' },
      { name: 'Part', description: 'Part number' },
      { name: 'Year', description: 'Publication year' },
      { name: 'Consolidated', description: 'Consolidated amendment indicator (+A1, +A2)', attribute: 'consolidated' },
    ],
    algebra: [
      { type: 'Amendment', description: 'Modifies a European Norm', syntax: 'EN [Number]:[Year]/A[N]:[Year]', example: 'EN 196-3:2005+A1:2008' },
      { type: 'Corrigendum', description: 'Corrects errors', syntax: 'EN [Number]:[Year]/AC:[Year]', example: 'EN ISO 13485:2016/AC:2016' },
      { type: 'Consolidated', description: 'Base + amendments', syntax: 'EN [Number]:[Year]+A[N]:[Year]', example: 'EN 196-3:2005+A1:2008' },
      { type: 'Adoption', description: 'Adoption of ISO/IEC standards', syntax: 'EN ISO [Number]:[Year]', example: 'EN ISO 13485:2016' },
    ],
  },
  {
    flavor: 'etsi',
    logo: '/logos/etsi-logo.svg',
    name: 'ETSI',
    fullName: 'European Telecommunications Standards Institute',
    category: 'regional',
    description: 'ETSI produces globally applicable standards for Information and Communications Technologies (ICT), including fixed, mobile, radio, converged, broadcast, and internet technologies.',
    website: 'https://www.etsi.org',
    syntaxNotes: 'ETSI identifiers follow the pattern: ETSI [Type] [Number] V[Version] ([Date]). Types include EG (Guide), EN (Standard), ES (Specification), ET (Technical Report), GS (Group Specification), TS (Technical Specification), TR (Technical Report).',
    relatedFlavors: ['cen', 'itu', 'iec'],
    docTypes: [
      {
        key: 'etsi_standard',
        title: 'ETSI Standard',
        abbr: ['EN', 'ES', 'EG', 'ET', 'GS', 'TS', 'TR', 'SR'],
        description: 'ETSI publishes various deliverable types: EN (European Standard), ES (ETSI Specification), EG (ETSI Guide), ET (ETSI Technical Report), GS (Group Specification), TS (Technical Specification), TR (Technical Report), SR (Special Report).',
        examples: [
          { input: 'ETSI EG 200 053 V1.5.1 (2004-06)' },
          { input: 'ETSI EN 300 392-2 V3.4.1 (2017-04)' },
          { input: 'ETSI TS 102 023-2 V1.1.1 (2003-08)' },
          { input: 'ETSI GS NFV 002 V1.2.1 (2014-10)' },
          { input: 'ETSI TR 103 392 V1.1.1 (2016-11)' },
        ]
      },
      {
        key: 'amendment',
        title: 'Amendment',
        abbr: ['A'],
        description: 'Amendments to ETSI documents.',
        examples: [
          { input: 'ETSI ETR 108/A1 ed.1 (1995-08)' },
          { input: 'ETSI ETS 300 011/A1 ed.1 (1994-12)' },
        ]
      },
      {
        key: 'corrigendum',
        title: 'Corrigendum',
        abbr: ['C'],
        description: 'Corrections to ETSI documents.',
        examples: [
          { input: 'ETSI ETR 053/C1 ed.2 (1997-03)' },
          { input: 'ETSI ETR 094/C1 ed.1 (1994-03)' },
        ]
      },
      {
        key: 'supplement_identifier',
        title: 'Supplement',
        abbr: ['S'],
        description: 'Supplements to ETSI base documents.',
        examples: [
          { input: 'ETSI ETS 300 001 S1 ed.1 (1993-10)' },
        ]
      },
    ],
    components: [
      { name: 'Type', description: 'Document type prefix (EN, ES, EG, ET, GS, TS, TR)' },
      { name: 'Number', description: 'The document number' },
      { name: 'Version', description: 'Version number (V[major].[minor].[patch])', attribute: 'version' },
      { name: 'Date', description: 'Publication date in parentheses' },
      { name: 'Edition', description: 'Edition number (ed.N)', attribute: 'edition' },
    ],
    algebra: [
      { type: 'Amendment', description: 'Modifies a base document', syntax: 'ETSI [Type] [Number]/A[N] ed.[N]', example: 'ETSI ETR 108/A1 ed.1 (1995-08)' },
      { type: 'Corrigendum', description: 'Corrects errors', syntax: 'ETSI [Type] [Number]/C[N] ed.[N]', example: 'ETSI ETR 053/C1 ed.2 (1997-03)' },
      { type: 'Supplement', description: 'Supplementary content', syntax: 'ETSI [Type] [Number] S[N] ed.[N]', example: 'ETSI ETS 300 001 S1 ed.1 (1993-10)' },
    ],
  },
  // ─── NATIONAL ──────────────────────────────────────────────────
  {
    flavor: 'nist',
    logo: '/logos/nist-logo.svg',
    name: 'NIST',
    fullName: 'National Institute of Standards and Technology',
    category: 'national',
    description: 'NIST is a physical sciences laboratory and a non-regulatory agency of the U.S. Department of Commerce. NIST was the first organization to adopt a multi-style, round-trippable PubID scheme with four defined rendering styles (full, abbreviated, short, machine-readable). The NIST PubID covers 19,333+ documents dating from 1901.',
    website: 'https://www.nist.gov',
    syntaxNotes: 'NIST identifiers use publisher abbreviations (NIST, NBS for pre-1988 documents) followed by a type abbreviation and number. NIST PubID defines four rendering styles: Full (Long), Abbreviated, Short, and Machine-Readable (MR). The MR style uses dot-separated fields and serves as the DOI suffix.',
    relatedFlavors: ['ansi', 'ieee'],
    docTypes: [
      {
        key: 'special_publication',
        title: 'Special Publication',
        abbr: ['SP'],
        description: 'NIST Special Publications cover a wide range of topics including cybersecurity, measurement science, and standards.',
        examples: [
          { input: 'NIST SP 800-53 Rev. 5' },
          { input: 'NIST SP 800-63-3' },
          { input: 'NIST SP 1800-1' },
          { input: 'NIST SP 800-171 Rev. 2' },
        ]
      },
      {
        key: 'federal_information_processing_standards',
        title: 'Federal Information Processing Standards',
        abbr: ['FIPS'],
        description: 'FIPS are U.S. government standards for computer systems, particularly for security and interoperability.',
        examples: [
          { input: 'FIPS 197' },
          { input: 'FIPS 180-4' },
          { input: 'FIPS 202' },
          { input: 'FIPS 186-5' },
        ]
      },
      {
        key: 'interagency_report',
        title: 'Interagency/Internal Report',
        abbr: ['IR'],
        description: 'NIST Internal Reports (NIST IR) document research findings.',
        examples: [
          { input: 'NIST IR 8115' },
          { input: 'NIST IR 8259' },
          { input: 'NIST IR 8011 Vol. 3' },
          { input: 'NIST GCR 01-820' },
        ]
      },
      {
        key: 'technical_note',
        title: 'Technical Note',
        abbr: ['TN'],
        description: 'NIST Technical Notes document technical research and analysis.',
        examples: [
          { input: 'NIST TN 2176' },
          { input: 'NIST TN 2088' },
        ]
      },
      {
        key: 'handbook',
        title: 'Handbook',
        abbr: ['HB'],
        description: 'NIST Handbooks provide reference data and guidelines.',
        examples: [
          { input: 'NIST HB 44' },
          { input: 'NBS HB 1' },
          { input: 'NIST HB 150-2C' },
        ]
      },
      {
        key: 'circular',
        title: 'Circular',
        abbr: ['CIRC'],
        description: 'Historical NBS Circulars (pre-NIST).',
        examples: [
          { input: 'NBS CIRC 1' },
          { input: 'NBS CIRC 13' },
        ]
      },
      {
        key: 'monograph',
        title: 'Monograph',
        abbr: ['MONO'],
        description: 'NBS/NIST Monographs.',
        examples: [
          { input: 'NBS MONO 1' },
          { input: 'NIST MONO 1' },
        ]
      },
      {
        key: 'report',
        title: 'Report',
        abbr: ['RPT'],
        description: 'NBS/NIST Reports.',
        examples: [
          { input: 'NBS RPT 1' },
          { input: 'NIST RPT 1' },
        ]
      },
      {
        key: 'letter_circular',
        title: 'Letter Circular',
        abbr: ['LCIRC'],
        description: 'NBS Letter Circulars.',
        examples: [
          { input: 'NBS LCIRC 1' },
        ]
      },
      {
        key: 'grant_contractor_report',
        title: 'Grant/Contractor Report',
        abbr: ['GCR'],
        description: 'NBS/NIST Grant and Contractor Reports.',
        examples: [
          { input: 'NBS GCR 80-287' },
          { input: 'NIST GCR 01-820' },
        ]
      },
      {
        key: 'crpl_report',
        title: 'CRPL Report',
        abbr: ['CRPL'],
        description: 'Central Radio Propagation Laboratory reports.',
        examples: [
          { input: 'NBS CRPL 1' },
        ]
      },
      {
        key: 'nsrds',
        title: 'National Standard Reference Data Series',
        abbr: ['NSRDS'],
        description: 'NSRDS-NBS publications.',
        examples: [
          { input: 'NSRDS-NBS 1' },
        ]
      },
      {
        key: 'ncstar',
        title: 'NIST NCSTAR',
        abbr: ['NCSTAR'],
        description: 'NIST Investigation of Structural Failures reports.',
        examples: [
          { input: 'NIST NCSTAR 1' },
        ]
      },
      {
        key: 'owmwp',
        title: 'OWM Working Paper',
        abbr: ['OWMWP'],
        description: 'Office of Weights and Measures Working Papers.',
        examples: [
          { input: 'NIST OWMWP 1' },
        ]
      },
      {
        key: 'commercial_standard',
        title: 'Commercial Standard',
        abbr: ['CS'],
        description: 'Historical NBS Commercial Standards.',
        examples: [
          { input: 'NBS CS 1' },
        ]
      },
      {
        key: 'miscellaneous_publication',
        title: 'Miscellaneous Publication',
        abbr: ['MP'],
        description: 'NBS Miscellaneous Publications.',
        examples: [
          { input: 'NBS MP 1' },
        ]
      },
      {
        key: 'circular_supplement',
        title: 'Circular Supplement',
        abbr: ['CS'],
        description: 'Supplements to NBS Circulars.',
        examples: [
          { input: 'NBS CIRC 1sup' },
        ]
      },
      {
        key: 'commercial_standards_monthly',
        title: 'Commercial Standards Monthly',
        abbr: ['CSM'],
        description: 'NBS Commercial Standards Monthly.',
        examples: [
          { input: 'NBS CSM 1' },
        ]
      },
      {
        key: 'commercial_standard_emergency',
        title: 'Commercial Standard Emergency',
        abbr: ['CSE'],
        description: 'Emergency Commercial Standards.',
        examples: [
          { input: 'NBS CSE 1' },
        ]
      },
    ],
    stages: [
      { code: '10.00', abbr: 'WD', name: 'Work-in-Progress Draft' },
      { code: '30.00', abbr: 'PRD', name: 'Preliminary Draft' },
      { code: '40.00', abbr: 'PD', name: 'Public Draft' },
      { code: '60.00', abbr: 'Final', name: 'Final Publication' },
    ],
    styles: [
      { key: 'full', name: 'Full (Long)', description: 'Used in title page and bibliography', example: 'National Institute of Standards and Technology Special Publication 800-53A' },
      { key: 'abbrev', name: 'Abbreviated', description: 'Used in the Authority section', example: 'Natl. Inst. Stand. Technol. Spec. Publ. 800-53A' },
      { key: 'short', name: 'Short', description: 'Used for inline citations', example: 'NIST SP 800-53A' },
      { key: 'mr', name: 'Machine-Readable', description: 'Used for DOI suffix and machine interchange', example: 'NIST.SP.800-53A' },
    ],
    components: [
      { name: 'Publisher', description: 'NIST (post-1988) or NBS (pre-1988)' },
      { name: 'Document Type', description: 'SP, FIPS, IR, TN, HB, etc.' },
      { name: 'Number', description: 'The document number' },
      { name: 'Part', description: 'Part or volume number', attribute: 'part' },
      { name: 'Revision', description: 'Revision number (Rev. 5)', attribute: 'revision' },
      { name: 'Version', description: 'Version number', attribute: 'version' },
      { name: 'Edition', description: 'Edition number', attribute: 'edition' },
      { name: 'Stage', description: 'Publication stage (draft, final)', attribute: 'stage' },
      { name: 'Supplement', description: 'Supplement indicator', attribute: 'supplement' },
      { name: 'Translation', description: 'Translation indicator', attribute: 'translation' },
      { name: 'Update', description: 'Update number', attribute: 'update' },
      { name: 'Volume', description: 'Volume number', attribute: 'volume' },
    ],
    algebra: [
      { type: 'Revision', description: 'Revision of an existing document', syntax: 'NIST SP [Number] Rev. [N]', example: 'NIST SP 800-53 Rev. 5' },
      { type: 'Part/Volume', description: 'Multi-part or multi-volume document', syntax: 'NIST [Type] [Number]-[Part] Vol. [N]', example: 'NIST IR 8011 Vol. 3' },
      { type: 'Draft', description: 'Draft version of a document', syntax: 'NIST [Type] [Number] (Draft)', example: 'NIST SP 800-53 Rev. 5 (Draft)' },
      { type: 'Supplement', description: 'Supplement to a base document', syntax: 'NIST [Type] [Number] Suppl. [N]', example: 'NIST SP 800-53 Suppl. 1' },
    ],
  },
  {
    flavor: 'bsi',
    logo: '/logos/bsi-logo.svg',
    name: 'BSI',
    fullName: 'British Standards Institution',
    category: 'national',
    description: 'BSI is the UK\'s National Standards Body, producing technical standards for a wide range of products and services. BSI also provides certification and standards-related services.',
    website: 'https://www.bsigroup.com',
    syntaxNotes: 'BSI identifiers use BS prefix with various type indicators. Adoptions of international standards use patterns like BS ISO, BS EN, BS EN ISO.',
    relatedFlavors: ['iso', 'iec', 'cen'],
    docTypes: [
      {
        key: 'british_standard',
        title: 'British Standard',
        abbr: ['BS'],
        description: 'The primary BSI standards deliverable.',
        examples: [
          { input: 'BS 476-22:1987' },
          { input: 'BS 8300-1:2018' },
          { input: 'BS 9999:2017' },
        ]
      },
      {
        key: 'adopted_international_standard',
        title: 'Adopted International Standard',
        abbr: ['BS ISO', 'BS IEC', 'BS EN'],
        description: 'British adoption of international (ISO, IEC) or European (EN) standards.',
        examples: [
          { input: 'BS ISO 9001:2015' },
          { input: 'BS EN ISO 13485:2016' },
          { input: 'BS IEC 61131-3:2013' },
        ]
      },
      {
        key: 'adopted_european_norm',
        title: 'Adopted European Norm',
        abbr: ['BS EN'],
        description: 'British adoption of European Standards.',
        examples: [
          { input: 'BS EN 196-3:2005+A1:2008' },
          { input: 'BS EN 1090-2:2018' },
        ]
      },
      {
        key: 'aerospace_standard',
        title: 'Aerospace Standard',
        abbr: ['BS A', 'BS Aerospace'],
        description: 'Standards for the aerospace industry.',
        examples: [
          { input: 'BS A 242-A 245:1974+A1:2017' },
          { input: 'BS A 246-A 249:1974+A1:2017' },
        ]
      },
      {
        key: 'publicly_available_specification',
        title: 'Publicly Available Specification',
        abbr: ['PAS'],
        description: 'Specifications published to meet urgent market needs.',
        examples: [
          { input: 'PAS 9980:2022' },
        ]
      },
      {
        key: 'technical_specification',
        title: 'Technical Specification',
        abbr: ['PD TS'],
        description: 'Published Documents providing technical guidance.',
        examples: [
          { input: 'PD 5500:2023' },
        ]
      },
      {
        key: 'flex',
        title: 'Flex Standard',
        abbr: ['Flex'],
        description: 'BSI Flex standards are evolved through continuous development.',
        examples: [
          { input: 'BSI Flex 1880 v1.0:2022' },
          { input: 'BSI Flex 1886 v3.0:2024' },
        ]
      },
      {
        key: 'handbook',
        title: 'Handbook',
        abbr: ['HB'],
        description: 'BSI Handbooks providing reference material.',
        examples: [
          { input: 'BS HB 1' },
        ]
      },
      {
        key: 'amendment',
        title: 'Amendment',
        abbr: ['Amd'],
        description: 'Amendments to existing British Standards.',
        examples: [
          { input: 'BS 476-22:1987+A1:2019' },
        ]
      },
      {
        key: 'corrigendum',
        title: 'Corrigendum',
        abbr: ['Cor'],
        description: 'Corrections to published standards.',
        examples: [
          { input: 'BS 9999:2017/Cor 1:2018' },
        ]
      },
      {
        key: 'draft_document',
        title: 'Draft for Development',
        abbr: ['DD'],
        description: 'Draft documents for public comment.',
        examples: [
          { input: '14/30300822 DC' },
          { input: '21/30445138 DC' },
        ]
      },
      {
        key: 'committee_document',
        title: 'Committee Document',
        abbr: ['DC'],
        description: 'Committee draft documents for consultation.',
        examples: [
          { input: '14/30300822 DC' },
        ]
      },
      {
        key: 'published_document',
        title: 'Published Document',
        abbr: ['PD'],
        description: 'Published Documents that provide guidance.',
        examples: [
          { input: 'PD 5500:2023' },
        ]
      },
      {
        key: 'electronic_book',
        title: 'Electronic Book',
        abbr: ['EB'],
        description: 'Electronic versions of standards.',
        examples: [
          { input: 'BS EB 1' },
        ]
      },
      {
        key: 'expert_commentary',
        title: 'Expert Commentary',
        abbr: ['EC'],
        description: 'Expert commentary on standards.',
        examples: [
          { input: 'BS EC 1' },
        ]
      },
      {
        key: 'value_added_publication',
        title: 'Value-Added Publication',
        abbr: ['VAP'],
        description: 'Publications with additional content like commentary or redline.',
        examples: [
          { input: 'BS VAP 1' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'BSI (or BS prefix)' },
      { name: 'Adoption Source', description: 'Adopted standard source (ISO, EN, IEC)', attribute: 'adoption_source' },
      { name: 'Document Type', description: 'BS, PAS, PD, Flex, etc.' },
      { name: 'Number', description: 'The document number' },
      { name: 'Part', description: 'Part number' },
      { name: 'Year', description: 'Publication year' },
      { name: 'Amendment/Consolidated', description: 'Consolidated amendment indicator', attribute: 'consolidated' },
      { name: 'Publisher Specific', description: 'BSI-specific publisher codes', attribute: 'publisher' },
      { name: 'Date', description: 'Date information', attribute: 'date' },
    ],
    algebra: [
      { type: 'Amendment', description: 'Modifies a standard', syntax: 'BS [Number]:[Year]+A[N]:[Year]', example: 'BS 476-22:1987+A1:2019' },
      { type: 'Corrigendum', description: 'Corrects errors', syntax: 'BS [Number]:[Year]/Cor [N]:[Year]', example: 'BS 9999:2017/Cor 1:2018' },
      { type: 'Adoption', description: 'Adoption of ISO/EN/IEC', syntax: 'BS [Source] [Number]:[Year]', example: 'BS ISO 9001:2015' },
      { type: 'Consolidated', description: 'Base + incorporated amendments', syntax: 'BS [Number]:[Year]+A[N]:[Year]', example: 'BS A 242-A 245:1974+A1:2017' },
      { type: 'Part', description: 'Multi-part standard', syntax: 'BS [Number]-[Part]:[Year]', example: 'BS 8300-1:2018' },
      { type: 'Bundle', description: 'Multiple documents bundled', syntax: 'BS [Number] + [Number]', example: 'BS A 242-A 245:1974+A1:2017' },
      { type: 'Set', description: 'Document set', syntax: 'BS [Number] Set', example: 'BS 476 Set' },
    ],
  },
  {
    flavor: 'ansi',
    logo: '/logos/ansi-logo.svg',
    name: 'ANSI',
    fullName: 'American National Standards Institute',
    category: 'national',
    description: 'ANSI oversees the creation, promulgation, and use of thousands of norms and guidelines that directly impact businesses in nearly every sector. ANSI is also actively engaged in accrediting programs that assess conformance to standards.',
    website: 'https://www.ansi.org',
    syntaxNotes: 'ANSI identifiers follow simple patterns: ANSI [Number]-[Year] or ANSI/[Developer] [Number]-[Year].',
    relatedFlavors: ['ieee', 'astm', 'asme', 'nist'],
    docTypes: [
      {
        key: 'standard',
        title: 'Standard',
        abbr: [''],
        description: 'ANSI American National Standards.',
        examples: [
          { input: 'ANSI 802.3-2012' },
          { input: 'ANSI C135.14-1979' },
          { input: 'ANSI Z49.1:2012' },
        ]
      },
      {
        key: 'american_national_standard',
        title: 'American National Standard',
        abbr: ['ANS'],
        description: 'Formally designated American National Standards.',
        examples: [
          { input: 'ANSI/AAMI ST79:2017' },
          { input: 'ANSI/ASHRAE 15-2019' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'ANSI, or ANSI/[Developer]' },
      { name: 'Number', description: 'The standard number' },
      { name: 'Year', description: 'Publication year' },
    ],
    algebra: [],
  },
  {
    flavor: 'jis',
    logo: '/logos/jis-logo.svg',
    name: 'JIS',
    fullName: 'Japanese Industrial Standards',
    category: 'national',
    description: 'Japanese Industrial Standards (JIS) are national standards for industrial products and technologies in Japan. They are established by the Japanese Industrial Standards Committee (JISC) and published by the Japanese Standards Association.',
    website: 'https://www.jsa.or.jp',
    syntaxNotes: 'JIS identifiers follow the pattern: JIS [Letter] [Number]:[Year]. The letter indicates the industrial classification (A=Civil Engineering, B=Mechanical, C=Electrical, etc.).',
    relatedFlavors: ['iso', 'plateau'],
    docTypes: [
      {
        key: 'japanese_industrial_standard',
        title: 'Japanese Industrial Standard',
        abbr: ['JIS'],
        description: 'The primary JIS standard type, covering a letter-based classification system.',
        examples: [
          { input: 'JIS A 0001:1999' },
          { input: 'JIS B 0205-2:2019' },
          { input: 'JIS C 60068-1:2019' },
          { input: 'JIS K 2238:2019' },
        ]
      },
      {
        key: 'standard',
        title: 'Standard',
        abbr: [''],
        description: 'General JIS standards.',
        examples: [
          { input: 'JIS Z 8801-1:2019' },
        ]
      },
      {
        key: 'technical_report',
        title: 'Technical Report',
        abbr: ['TR'],
        description: 'JIS Technical Reports.',
        examples: [
          { input: 'JIS TR B 0001:2000' },
        ]
      },
      {
        key: 'technical_specification',
        title: 'Technical Specification',
        abbr: ['TS'],
        description: 'JIS Technical Specifications.',
        examples: [
          { input: 'JIS TS Z 0001:2000' },
        ]
      },
      {
        key: 'amendment',
        title: 'Amendment',
        abbr: ['Amd', 'AM'],
        description: 'Amendments to JIS standards.',
        examples: [
          { input: 'JIS B 0205-2:2019/AM 1:2021' },
        ]
      },
      {
        key: 'explanation',
        title: 'Explanation',
        abbr: ['Exp'],
        description: 'Explanatory documents for JIS standards.',
        examples: [
          { input: 'JIS Exp A 0001:2000' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'JIS' },
      { name: 'Classification Letter', description: 'Industrial classification letter (A-Z)', attribute: 'classification' },
      { name: 'Number', description: 'The document number' },
      { name: 'Part', description: 'Part number' },
      { name: 'Year', description: 'Publication year' },
    ],
    algebra: [
      { type: 'Amendment', description: 'Modifies a JIS standard', syntax: 'JIS [Letter] [Number]:[Year]/AM [N]:[Year]', example: 'JIS B 0205-2:2019/AM 1:2021' },
      { type: 'Part', description: 'Multi-part standard', syntax: 'JIS [Letter] [Number]-[Part]:[Year]', example: 'JIS B 0205-2:2019' },
    ],
  },
  // ─── INDUSTRY ──────────────────────────────────────────────────
  {
    flavor: 'astm',
    logo: '/logos/astm-logo.svg',
    name: 'ASTM',
    fullName: 'ASTM International',
    category: 'industry',
    description: 'ASTM International (formerly American Society for Testing and Materials) is one of the largest voluntary standards development organizations in the world. ASTM standards cover a wide range of materials, products, systems, and services.',
    website: 'https://www.astm.org',
    syntaxNotes: 'ASTM identifiers follow the pattern: ASTM [Type] [Number]-[Year]. Joint standards use ISO/ASTM prefix. Types include no prefix (Standard), TR (Technical Report), ADJ (Adjunct).',
    relatedFlavors: ['iso', 'ansi'],
    docTypes: [
      {
        key: 'standard',
        title: 'Standard',
        abbr: [''],
        description: 'ASTM Standards defining test methods, specifications, practices, guides, and terminologies.',
        examples: [
          { input: 'ASTM A36/A36M-19' },
          { input: 'ASTM C150/C150M-22' },
          { input: 'ASTM D638-22' },
          { input: 'ASTM E8/E8M-22' },
        ]
      },
      {
        key: 'adjunct',
        title: 'Adjunct',
        abbr: ['ADJ'],
        description: 'ASTM Adjuncts provide supplementary material to standards.',
        examples: [
          { input: 'ASTM ADJD2148' },
          { input: 'ASTM ADJF3504-EA' },
        ]
      },
      {
        key: 'monograph',
        title: 'Monograph',
        abbr: ['MONO'],
        description: 'ASTM Monographs are in-depth publications on specific topics.',
        examples: [
          { input: 'ASTM MONO1-EB' },
          { input: 'ASTM MONO2-EB' },
        ]
      },
      {
        key: 'technical_report',
        title: 'Technical Report',
        abbr: ['TR'],
        description: 'ASTM Technical Reports.',
        examples: [
          { input: 'ISO/ASTM TR 52916-EB' },
          { input: 'ISO/ASTM TR 52952-EB' },
        ]
      },
      {
        key: 'manual',
        title: 'Manual',
        abbr: ['MAN'],
        description: 'ASTM Manuals provide practical guidance.',
        examples: [
          { input: 'ASTM MAN 1' },
        ]
      },
      {
        key: 'research_report',
        title: 'Research Report',
        abbr: ['RR'],
        description: 'ASTM Research Reports documenting original research.',
        examples: [
          { input: 'ASTM RR:C01-1001' },
        ]
      },
      {
        key: 'data_series',
        title: 'Data Series',
        abbr: ['DS'],
        description: 'ASTM Data Series publications.',
        examples: [
          { input: 'ASTM DS 1' },
        ]
      },
      {
        key: 'iso_dual_published',
        title: 'ISO/ASTM Dual-Published',
        abbr: ['ISO/ASTM'],
        description: 'Standards jointly published by ISO and ASTM.',
        examples: [
          { input: 'ISO/ASTM 52900:2021' },
          { input: 'ISO/ASTM 52901:2017' },
        ]
      },
      {
        key: 'work_in_progress',
        title: 'Work in Progress',
        abbr: ['WIP'],
        description: 'ASTM standards under development.',
        examples: [
          { input: 'ASTM WK12345' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'ASTM or ISO/ASTM' },
      { name: 'Number', description: 'The standard number' },
      { name: 'Year', description: 'Publication year' },
      { name: 'Designation', description: 'Grade designation (e.g., A36M)', attribute: 'designation' },
    ],
    algebra: [
      { type: 'Dual Publication', description: 'Joint ISO/ASTM standard', syntax: 'ISO/ASTM [Number]:[Year]', example: 'ISO/ASTM 52900:2021' },
    ],
  },
  {
    flavor: 'ashrae',
    logo: '/logos/ashrae-logo.svg',
    name: 'ASHRAE',
    fullName: 'American Society of Heating, Refrigerating and Air-Conditioning Engineers',
    category: 'industry',
    description: 'ASHRAE is a global professional society advancing heating, ventilation, air conditioning, and refrigeration (HVAC&R) systems. ASHRAE Standards establish minimum requirements for energy efficiency, indoor air quality, and building systems.',
    website: 'https://www.ashrae.org',
    syntaxNotes: 'ASHRAE identifiers follow patterns like: ASHRAE Standard [Number]-[Year], ASHRAE Guideline [Number]-[Year], with addenda appended.',
    relatedFlavors: ['ansi', 'amca'],
    docTypes: [
      {
        key: 'standard',
        title: 'Standard',
        abbr: ['Standard'],
        description: 'ASHRAE Standards define requirements for HVAC&R systems, energy efficiency, and indoor environmental quality.',
        examples: [
          { input: 'ASHRAE Standard 15-2019' },
          { input: 'ASHRAE Standard 90.1-2022' },
          { input: 'ASHRAE Standard 62.1-2022' },
          { input: 'ASHRAE Standard 55-2023' },
        ]
      },
      {
        key: 'guideline',
        title: 'Guideline',
        abbr: ['Guideline'],
        description: 'ASHRAE Guidelines provide recommendations and best practices.',
        examples: [
          { input: 'ASHRAE Guideline 0-2019' },
          { input: 'ASHRAE Guideline 1.4-2019' },
          { input: 'ASHRAE Guideline 10-2011' },
        ]
      },
      {
        key: 'addendum',
        title: 'Addendum',
        abbr: ['Addendum'],
        description: 'Individual addenda to ASHRAE Standards or Guidelines.',
        examples: [
          { input: 'ASHRAE Addendum a to Guideline 1.4-2019' },
          { input: 'ASHRAE Guideline 10-2011 Addendum e' },
        ]
      },
      {
        key: 'combined_addenda',
        title: 'Combined Addenda',
        abbr: ['Addenda'],
        description: 'Combined multiple addenda packages.',
        examples: [
          { input: 'ASHRAE Guideline 0: Addenda a, b, c, d' },
        ]
      },
      {
        key: 'addenda_package',
        title: 'Addenda Package',
        abbr: ['Addenda Package'],
        description: 'A package of multiple addenda.',
        examples: [
          { input: 'ASHRAE Standard 15-2007 Addenda Supplement Package' },
        ]
      },
      {
        key: 'errata',
        title: 'Errata',
        abbr: ['Errata'],
        description: 'Corrections to published ASHRAE documents.',
        examples: [
          { input: 'ASHRAE Errata to Standard 90.1-2022' },
        ]
      },
      {
        key: 'interpretation',
        title: 'Interpretation',
        abbr: ['Interp'],
        description: 'Official ASHRAE interpretations of standards requirements.',
        examples: [
          { input: 'ASHRAE Interpretation IC 62.1-2016-1' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'ASHRAE' },
      { name: 'Type', description: 'Standard or Guideline' },
      { name: 'Number', description: 'The standard/guideline number' },
      { name: 'Year', description: 'Publication year' },
      { name: 'Addendum Letter', description: 'Letter designation for addenda' },
    ],
    algebra: [
      { type: 'Addendum', description: 'Individual modification to a standard', syntax: 'ASHRAE Addendum [Letter] to [Type] [Number]-[Year]', example: 'ASHRAE Addendum a to Guideline 1.4-2019' },
      { type: 'Combined Addenda', description: 'Multiple addenda combined', syntax: 'ASHRAE [Type] [Number]: Addenda [Letters]', example: 'ASHRAE Guideline 0: Addenda a, b, c, d' },
      { type: 'Errata', description: 'Correction', syntax: 'ASHRAE Errata to [Type] [Number]-[Year]', example: 'ASHRAE Errata to Standard 90.1-2022' },
    ],
  },
  {
    flavor: 'asme',
    logo: '/logos/asme-logo.svg',
    name: 'ASME',
    fullName: 'American Society of Mechanical Engineers',
    category: 'industry',
    description: 'ASME is a professional association that promotes the art, science, and practice of multidisciplinary engineering. ASME standards cover pressure technology, nuclear power, piping, and many other mechanical engineering applications.',
    website: 'https://www.asme.org',
    syntaxNotes: 'ASME identifiers follow patterns like: ASME [Code] [Number]-[Year], ASME [Section] [Number]-[Year]. Draft standards include revision notes.',
    relatedFlavors: ['ansi', 'astm'],
    docTypes: [
      {
        key: 'standard',
        title: 'Standard',
        abbr: [''],
        description: 'ASME Standards covering mechanical engineering specifications and requirements.',
        examples: [
          { input: 'ASME B18.3-2022' },
          { input: 'ASME Y14.43-2021' },
          { input: 'ASME B18.3-20XX [Draft Proposed Revision of ASME B18.3-2012 (R2017)]' },
          { input: 'ASME Y14.43-20XX [Revision of ASME Y14.43-2011 (R2020)]' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'ASME' },
      { name: 'Number', description: 'The standard number' },
      { name: 'Year', description: 'Publication year' },
      { name: 'Revision', description: 'Revision information in brackets' },
    ],
    algebra: [],
  },
  {
    flavor: 'ccsds',
    logo: '/logos/ccsds-logo.svg',
    name: 'CCSDS',
    fullName: 'Consultative Committee for Space Data Systems',
    category: 'industry',
    description: 'CCSDS is a multinational forum for the development of communications and data systems standards for spaceflight. CCSDS standards are used by major space agencies worldwide.',
    website: 'https://www.ccsds.org',
    syntaxNotes: 'CCSDS identifiers follow the pattern: CCSDS [Number].[Issue]-[Category]-[Version]-[Status]. Categories include B (Blue Book = Recommended Standard), G (Green Book = Recommended Practice), M (Magenta Book = Report).',
    relatedFlavors: ['iso'],
    docTypes: [
      {
        key: 'base',
        title: 'Base Document',
        abbr: ['B', 'G', 'M'],
        description: 'CCSDS documents categorized by color: B (Blue Book, Recommended Standard), G (Green Book, Recommended Practice), M (Magenta Book, Report).',
        examples: [
          { input: 'CCSDS 100.0-G-1-S' },
          { input: 'CCSDS 101.0-B-1-S' },
          { input: 'CCSDS 121.0-B-1-S' },
          { input: 'CCSDS 132.0-B-2-S' },
        ]
      },
      {
        key: 'corrigendum',
        title: 'Corrigendum',
        abbr: ['Cor'],
        description: 'Corrections to CCSDS documents.',
        examples: [
          { input: 'CCSDS 121.0-B-1-S Cor. 1' },
          { input: 'CCSDS 121.0-B-1-S Cor. 2' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'CCSDS' },
      { name: 'Number', description: 'Document number with decimal (e.g., 100.0)' },
      { name: 'Category', description: 'B (Blue/Standard), G (Green/Practice), M (Magenta/Report)' },
      { name: 'Issue', description: 'Issue number after the category letter' },
      { name: 'Status', description: 'S (Superseded), blank (current)' },
    ],
    algebra: [
      { type: 'Corrigendum', description: 'Corrects errors in CCSDS documents', syntax: 'CCSDS [Number]-[Category]-[Issue]-[Status] Cor. [N]', example: 'CCSDS 121.0-B-1-S Cor. 1' },
    ],
  },
  {
    flavor: 'cie',
    logo: '/logos/cie-logo.svg',
    name: 'CIE',
    fullName: 'International Commission on Illumination',
    category: 'industry',
    description: 'The CIE (Commission Internationale de l\'Eclairage) is an independent, non-profit organization devoted to international cooperation and exchange of information on matters related to light, lighting, and color.',
    website: 'https://www.cie.co.at',
    syntaxNotes: 'CIE identifiers use numeric identifiers: CIE [Number]:[Year], CIE [Number]-[Part]:[Year]. Joint publications include CIE ISO prefix.',
    relatedFlavors: ['iso'],
    docTypes: [
      {
        key: 'standard',
        title: 'Standard',
        abbr: [''],
        description: 'CIE Standards defining specifications for lighting and color.',
        examples: [
          { input: 'CIE 232:2019' },
          { input: 'CIE 198-SP1.1:2011' },
        ]
      },
      {
        key: 'joint_published',
        title: 'Joint Published',
        abbr: ['CIE ISO'],
        description: 'Standards jointly published with ISO.',
        examples: [
          { input: 'CIE ISO 10916:2024' },
          { input: 'CIE ISO 11664-1:2019' },
        ]
      },
      {
        key: 'dual_published',
        title: 'Dual Published',
        abbr: ['Dual'],
        description: 'Dual-published with another organization.',
        examples: [
          { input: 'CIE S 023/E:2020' },
        ]
      },
      {
        key: 'identical',
        title: 'Identical',
        abbr: ['Ident'],
        description: 'Identical adoption of another standard.',
        examples: [
          { input: 'CIE Ident 1:2020' },
        ]
      },
      {
        key: 'conference',
        title: 'Conference',
        abbr: ['Conf'],
        description: 'CIE Conference proceedings.',
        examples: [
          { input: 'CIE Conf 1:2020' },
        ]
      },
      {
        key: 'bundle',
        title: 'Bundle',
        abbr: ['Bundle'],
        description: 'Bundled CIE publications.',
        examples: [
          { input: 'CIE 198-SP1.1:2011,198-SP1.2:2011,198-SP1.3:2011,198-SP1.4:2011' },
        ]
      },
      {
        key: 'corrigendum',
        title: 'Corrigendum',
        abbr: ['Cor'],
        description: 'Corrections to CIE publications.',
        examples: [
          { input: 'CIE 198-SP1.4:2011/Cor1:2013' },
          { input: 'CIE 232:2019/Cor1:2020' },
        ]
      },
      {
        key: 'supplement',
        title: 'Supplement',
        abbr: ['SP'],
        description: 'Supplements to CIE publications.',
        examples: [
          { input: 'CIE 198-SP1.1:2011' },
        ]
      },
      {
        key: 'tutorial_bundle',
        title: 'Tutorial Bundle',
        abbr: ['TB'],
        description: 'CIE Tutorial Bundles.',
        examples: [
          { input: 'CIE TB 1:2020' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'CIE' },
      { name: 'Number', description: 'The publication number' },
      { name: 'Part', description: 'Supplement/part number' },
      { name: 'Year', description: 'Publication year' },
      { name: 'Language', description: 'Language code', attribute: 'language' },
    ],
    algebra: [
      { type: 'Corrigendum', description: 'Corrects errors', syntax: 'CIE [Number]:[Year]/Cor[N]:[Year]', example: 'CIE 232:2019/Cor1:2020' },
      { type: 'Bundle', description: 'Multiple documents bundled', syntax: 'CIE [Number],[Number],...', example: 'CIE 198-SP1.1:2011,198-SP1.2:2011' },
      { type: 'Joint Publication', description: 'Published jointly with ISO', syntax: 'CIE ISO [Number]:[Year]', example: 'CIE ISO 10916:2024' },
    ],
  },
  {
    flavor: 'csa',
    logo: '/logos/csa-logo.svg',
    name: 'CSA',
    fullName: 'CSA Group',
    category: 'national',
    description: 'CSA Group is a global organization dedicated to safety, social good, and sustainability. CSA develops standards for a wide range of products and services, with particular strength in electrical, gas, and construction standards.',
    website: 'https://www.csagroup.org',
    syntaxNotes: 'CSA identifiers follow patterns: CSA [Number]:[Year], CAN/CSA-[Number]:[Year] (Canadian national), CSA-[Number]:[Year]. Combined identifiers use / separator.',
    relatedFlavors: ['ieee', 'iec', 'bsi'],
    docTypes: [
      {
        key: 'standard',
        title: 'Standard',
        abbr: [''],
        description: 'CSA Standards defining requirements for products and services.',
        examples: [
          { input: 'CSA Z662:23' },
          { input: 'CSA A23.1:24' },
          { input: 'CSA N285.0:23' },
        ]
      },
      {
        key: 'canadian_adopted',
        title: 'Canadian Adopted Standard',
        abbr: ['CAN/CSA'],
        description: 'Canadian national adoption of standards, prefixed with CAN/.',
        examples: [
          { input: 'CAN/CSA-ISO 9001:2016' },
          { input: 'CAN/CSA-C22.2 No. 60601-1-6:11' },
        ]
      },
      {
        key: 'csa_adopted',
        title: 'CSA Adopted Standard',
        abbr: ['CSA Adopted'],
        description: 'CSA adoption of another organization\'s standard.',
        examples: [
          { input: 'CSA-ISO 9001:2016' },
        ]
      },
      {
        key: 'combined',
        title: 'Combined Standard',
        abbr: ['Combined'],
        description: 'Combined documents with multiple designations using / separator.',
        examples: [
          { input: 'CSA A23.1:24/CSA A23.2:24' },
          { input: 'CSA N285.0:23/CSA N285.6 SERIES:23' },
        ]
      },
      {
        key: 'bundled',
        title: 'Bundled Standard',
        abbr: ['Bundled'],
        description: 'Multiple documents bundled with + separator.',
        examples: [
          { input: 'CAN/CSA-C22.2 NO. 60601-1-6:11 + A1:15 + A2:21 (R2021) (CONSOLIDATED)' },
        ]
      },
      {
        key: 'series',
        title: 'Series',
        abbr: ['SERIES'],
        description: 'Series designation for related standards.',
        examples: [
          { input: 'CSA N285.6 SERIES:23' },
        ]
      },
      {
        key: 'package',
        title: 'Package',
        abbr: ['PKG'],
        description: 'Packaged set of standards.',
        examples: [
          { input: 'CSA PKG A23.1:24' },
        ]
      },
      {
        key: 'cec',
        title: 'CEC',
        abbr: ['CEC'],
        description: 'California Energy Commission related standards.',
        examples: [
          { input: 'CEC-400-2021-001' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'CSA, CAN/CSA' },
      { name: 'Number', description: 'The standard number' },
      { name: 'Year', description: 'Publication year (2 or 4 digit)' },
      { name: 'Adoption Prefix', description: 'CAN/ prefix for Canadian adoption', attribute: 'adoption_prefix' },
    ],
    algebra: [
      { type: 'Adoption', description: 'Adoption of international standard', syntax: 'CAN/CSA-[Source] [Number]:[Year]', example: 'CAN/CSA-ISO 9001:2016' },
      { type: 'Combined', description: 'Multiple standards combined', syntax: 'CSA [Number]:[Year]/CSA [Number]:[Year]', example: 'CSA A23.1:24/CSA A23.2:24' },
      { type: 'Bundled', description: 'Documents bundled with amendments', syntax: 'CSA [Number]:[Year] + A[N]:[Year]', example: 'CAN/CSA-C22.2 NO. 60601-1-6:11 + A1:15 + A2:21' },
    ],
  },
  {
    flavor: 'oiml',
    logo: '/logos/oiml-logo.svg',
    name: 'OIML',
    fullName: 'International Organization of Legal Metrology',
    category: 'international',
    description: 'OIML is an intergovernmental treaty organization that develops model regulations, standards, and related documents for legal metrology (measurement standards and instruments).',
    website: 'https://www.oiml.org',
    syntaxNotes: 'OIML identifiers follow the pattern: OIML [Type] [Number]:[Year]. Types include R (Recommendation), D (Document), G (Guide), V (Vocabulary), B (Basic Publication).',
    relatedFlavors: ['iso', 'jcgm'],
    docTypes: [
      {
        key: 'recommendation',
        title: 'Recommendation',
        abbr: ['R'],
        description: 'OIML International Recommendations are model regulations establishing requirements for measuring instruments.',
        examples: [
          { input: 'OIML R 76-1:2006' },
          { input: 'OIML R 138:2007' },
          { input: 'OIML R 49-1:2006' },
        ]
      },
      {
        key: 'document',
        title: 'Document',
        abbr: ['D'],
        description: 'OIML International Documents provide guidance on legal metrology matters.',
        examples: [
          { input: 'OIML D 11:2008' },
          { input: 'OIML D 11:2013' },
        ]
      },
      {
        key: 'guide',
        title: 'Guide',
        abbr: ['G'],
        description: 'OIML Guides providing guidance on specific aspects of legal metrology.',
        examples: [
          { input: 'OIML G 1-100:2008' },
          { input: 'OIML G 14:2011' },
        ]
      },
      {
        key: 'basic_publication',
        title: 'Basic Publication',
        abbr: ['B'],
        description: 'OIML Basic Publications providing fundamental reference material.',
        examples: [
          { input: 'OIML B 1:2020' },
        ]
      },
      {
        key: 'vocabulary',
        title: 'Vocabulary',
        abbr: ['V'],
        description: 'OIML Vocabularies defining terms used in legal metrology.',
        examples: [
          { input: 'OIML V 1:2000' },
          { input: 'OIML V 2-200:2012' },
        ]
      },
      {
        key: 'expert_report',
        title: 'Expert Report',
        abbr: ['E'],
        description: 'OIML Expert Reports.',
        examples: [
          { input: 'OIML E 1:2004' },
        ]
      },
      {
        key: 'seminar_report',
        title: 'Seminar Report',
        abbr: ['S'],
        description: 'OIML Seminar Reports.',
        examples: [
          { input: 'OIML S 1:2000' },
        ]
      },
      {
        key: 'amendment',
        title: 'Amendment',
        abbr: ['Amd'],
        description: 'Amendments to OIML publications.',
        examples: [
          { input: 'Amendment (2009) to OIML R 138 Edition 2007 (E)' },
          { input: 'Amendment (2009) to OIML R 138:2007 (E)' },
        ]
      },
      {
        key: 'annex',
        title: 'Annex',
        abbr: ['Annex'],
        description: 'Annexes to OIML publications.',
        examples: [
          { input: 'OIML R 49-1 Annex A' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'OIML' },
      { name: 'Type', description: 'R, D, G, V, B, E, S' },
      { name: 'Number', description: 'The publication number' },
      { name: 'Part', description: 'Part number' },
      { name: 'Year', description: 'Publication year' },
      { name: 'Edition', description: 'Edition indicator' },
    ],
    algebra: [
      { type: 'Amendment', description: 'Modifies an OIML publication', syntax: 'Amendment ([Year]) to OIML [Type] [Number]:[Year] (E)', example: 'Amendment (2009) to OIML R 138:2007 (E)' },
      { type: 'Annex', description: 'Annex to a publication', syntax: 'OIML [Type] [Number] Annex [Letter]', example: 'OIML R 49-1 Annex A' },
      { type: 'Part', description: 'Multi-part publication', syntax: 'OIML [Type] [Number]-[Part]:[Year]', example: 'OIML R 76-1:2006' },
    ],
  },
  {
    flavor: 'jcgm',
    logo: '/logos/jcgm-logo.svg',
    name: 'JCGM',
    fullName: 'Joint Committee for Guides in Metrology',
    category: 'international',
    description: 'The JCGM works to promote and harmonize metrology guidance, maintaining the Guide to the Expression of Uncertainty in Measurement (GUM) and the International Vocabulary of Metrology (VIM).',
    website: 'https://www.bipm.org/en/committees/jc/jcgm',
    syntaxNotes: 'JCGM identifiers follow: JCGM [Number]:[Year] or JCGM GUM-[Part]:[Year]. The GUM guides use the GUM prefix.',
    relatedFlavors: ['iso', 'oiml'],
    docTypes: [
      {
        key: 'guide',
        title: 'Guide',
        abbr: [''],
        description: 'JCGM Guides including the GUM (Guide to the Expression of Uncertainty in Measurement) and VIM (International Vocabulary of Metrology).',
        examples: [
          { input: 'JCGM 100:2008' },
          { input: 'JCGM 101:2008' },
          { input: 'JCGM 102:2011' },
          { input: 'JCGM 200:2012' },
        ]
      },
      {
        key: 'gum_guide',
        title: 'GUM Guide',
        abbr: ['GUM'],
        description: 'Specific GUM (Guide to the Expression of Uncertainty in Measurement) publications.',
        examples: [
          { input: 'JCGM GUM-1:2022-11-28' },
          { input: 'JCGM GUM-6:2020' },
        ]
      },
      {
        key: 'amendment',
        title: 'Amendment',
        abbr: ['Amd'],
        description: 'Amendments to JCGM guides.',
        examples: [
          { input: 'JCGM 100:2008/Amd 1' },
          { input: 'JCGM 100:2008/Amd 1:2025-07-25' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'JCGM' },
      { name: 'Number', description: 'The guide number' },
      { name: 'Year', description: 'Publication year' },
      { name: 'Publisher Specific', description: 'JCGM publisher info', attribute: 'publisher' },
    ],
    algebra: [
      { type: 'Amendment', description: 'Modifies a JCGM guide', syntax: 'JCGM [Number]:[Year]/Amd [N]:[Date]', example: 'JCGM 100:2008/Amd 1:2025-07-25' },
    ],
  },
  {
    flavor: 'idf',
    logo: '/logos/idf-logo.png',
    name: 'IDF',
    fullName: 'International Dairy Federation',
    category: 'industry',
    description: 'The IDF is a source of scientific and technical expertise for the global dairy sector. IDF standards and methods of analysis are used internationally.',
    website: 'https://www.fil-idf.org',
    syntaxNotes: 'IDF identifiers follow: IDF [Type] [Number]-[Part]:[Year]. Types include no prefix (Standard), RM (Reviewed Method). Joint ISO/IDF publications exist.',
    relatedFlavors: ['iso'],
    docTypes: [
      {
        key: 'international_standard',
        title: 'International Standard',
        abbr: [''],
        description: 'IDF International Standards for dairy products and methods.',
        examples: [
          { input: 'IDF 148-1:2008' },
          { input: 'IDF 146:2003' },
          { input: 'IDF 140-1:2007' },
        ]
      },
      {
        key: 'reviewed_method',
        title: 'Reviewed Method',
        abbr: ['RM'],
        description: 'IDF Reviewed Methods for dairy analysis.',
        examples: [
          { input: 'IDF/RM 254:2022' },
          { input: 'IDF/RM 233-1:2017' },
        ]
      },
      {
        key: 'amendment',
        title: 'Amendment',
        abbr: ['AMD'],
        description: 'Amendments to IDF publications.',
        examples: [
          { input: 'IDF 146:2003/AMD 1:2023' },
          { input: 'IDF 140-1:2007/AMD 1:2012' },
        ]
      },
      {
        key: 'corrigendum',
        title: 'Corrigendum',
        abbr: ['COR'],
        description: 'Corrections to IDF publications.',
        examples: [
          { input: 'IDF 148-1:2008/COR 1:2009' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'IDF' },
      { name: 'Number', description: 'The publication number' },
      { name: 'Part', description: 'Part number' },
      { name: 'Year', description: 'Publication year' },
    ],
    algebra: [
      { type: 'Amendment', description: 'Modifies an IDF standard', syntax: 'IDF [Number]:[Year]/AMD [N]:[Year]', example: 'IDF 146:2003/AMD 1:2023' },
      { type: 'Corrigendum', description: 'Corrects errors', syntax: 'IDF [Number]:[Year]/COR [N]:[Year]', example: 'IDF 148-1:2008/COR 1:2009' },
    ],
  },
  {
    flavor: 'api',
    logo: '/logos/api-logo.svg',
    name: 'API',
    fullName: 'American Petroleum Institute',
    category: 'industry',
    description: 'API represents all segments of America\'s oil and natural gas industry. API Standards cover everything from drilling and production to refining and distribution of petroleum products.',
    website: 'https://www.api.org',
    syntaxNotes: 'API identifiers follow: API [Type] [Number]. Types include Std (Standard), RP (Recommended Practice), Spec (Specification), TR (Technical Report), Bull (Bulletin), Publ (Publication), MPMS (Manual of Petroleum Measurement Standards).',
    relatedFlavors: ['ansi', 'astm'],
    docTypes: [
      {
        key: 'standard',
        title: 'Standard',
        abbr: ['Std'],
        description: 'API Standards for the petroleum industry.',
        examples: [
          { input: 'API Std 650' },
          { input: 'API Std 620' },
        ]
      },
      {
        key: 'recommended_practice',
        title: 'Recommended Practice',
        abbr: ['RP'],
        description: 'API Recommended Practices providing guidance.',
        examples: [
          { input: 'API RP 500' },
          { input: 'API RP 14C' },
        ]
      },
      {
        key: 'specification',
        title: 'Specification',
        abbr: ['Spec'],
        description: 'API Specifications defining product requirements.',
        examples: [
          { input: 'API Spec 5L' },
          { input: 'API Spec 6A' },
        ]
      },
      {
        key: 'technical_report',
        title: 'Technical Report',
        abbr: ['TR'],
        description: 'API Technical Reports.',
        examples: [
          { input: 'API TR 21C' },
          { input: 'API TR 21TR2' },
        ]
      },
      {
        key: 'bulletin',
        title: 'Bulletin',
        abbr: ['BULL', 'Bul'],
        description: 'API Bulletins providing technical information.',
        examples: [
          { input: 'API BULL 11L2' },
          { input: 'API BULL 5100' },
        ]
      },
      {
        key: 'publication',
        title: 'Publication',
        abbr: ['PUBL', 'Publ'],
        description: 'API Publications.',
        examples: [
          { input: 'API PUBL 1628B' },
          { input: 'API PUBL 4527' },
        ]
      },
      {
        key: 'mpms',
        title: 'Manual of Petroleum Measurement Standards',
        abbr: ['MPMS'],
        description: 'API MPMS chapters covering petroleum measurement.',
        examples: [
          { input: 'API MPMS Chapter 4.1' },
        ]
      },
      {
        key: 'continuous_operations_standard',
        title: 'Continuous Operations Standard',
        abbr: ['COS'],
        description: 'API standards for continuous operations in the petroleum industry.',
        examples: [],
      },
      {
        key: 'typeless_standard',
        title: 'Typeless Standard',
        abbr: [],
        description: 'API documents published without a type designation, identified by number only.',
        examples: [
          { input: 'API 5L' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'API' },
      { name: 'Type', description: 'Std, RP, Spec, TR, Bull, Publ, MPMS, COS' },
      { name: 'Number', description: 'The document number' },
    ],
    algebra: [],
  },
  {
    flavor: 'amca',
    logo: '/logos/amca-logo.png',
    name: 'AMCA',
    fullName: 'Air Movement and Control Association',
    category: 'industry',
    description: 'AMCA International is a not-for-profit association of the world\'s manufacturers of air movement, air control, and air conditioning equipment. AMCA develops standards and test methods for these products.',
    website: 'https://www.amca.org',
    syntaxNotes: 'AMCA identifiers follow: AMCA [Type] [Number]-[Year] or ANSI/AMCA [Number]-[Year] for ANSI-accredited standards.',
    relatedFlavors: ['ansi', 'ashrae'],
    docTypes: [
      {
        key: 'standard',
        title: 'Standard',
        abbr: ['Standard'],
        description: 'AMCA Standards for air movement and control equipment.',
        examples: [
          { input: 'ANSI/AMCA Standard 210-16' },
          { input: 'ANSI/AMCA Standard 220-21' },
        ]
      },
      {
        key: 'publication',
        title: 'Publication',
        abbr: ['Publication'],
        description: 'AMCA Publications providing technical information.',
        examples: [
          { input: 'AMCA Publication 211-22 (Rev. 01-23)' },
          { input: 'AMCA Publication 311-16' },
        ]
      },
      {
        key: 'interpretation',
        title: 'Interpretation',
        abbr: ['Interp'],
        description: 'AMCA Interpretations of standards.',
        examples: [
          { input: 'AMCA 99 JW Interp' },
          { input: 'AMCA 99 KB Interp' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'AMCA, ANSI/AMCA' },
      { name: 'Number', description: 'The standard number' },
      { name: 'Year', description: 'Publication year (2 digit)' },
    ],
    algebra: [],
  },
  {
    flavor: 'plateau',
    logo: '/logos/plateau-logo.svg',
    name: 'PLATEAU',
    fullName: 'PLATEAU (MLIT Japan)',
    category: 'national',
    description: 'PLATEAU is a project by Japan\'s Ministry of Land, Infrastructure, Transport and Tourism (MLIT) that promotes the use of 3D city models for urban planning and management.',
    website: 'https://www.mlit.go.jp/plateau',
    syntaxNotes: 'PLATEAU identifiers follow: PLATEAU [Type] #[Number] [Edition]. Types include Handbook, Technical Report, Annex. Japanese edition numbering is used.',
    relatedFlavors: ['jis'],
    docTypes: [
      {
        key: 'handbook',
        title: 'Handbook',
        abbr: ['Handbook'],
        description: 'PLATEAU Handbooks providing guidance on 3D city model usage.',
        examples: [
          { input: 'PLATEAU Handbook #00 第1.0版' },
          { input: 'PLATEAU Handbook #00 第2.0版' },
        ]
      },
      {
        key: 'technical_report',
        title: 'Technical Report',
        abbr: ['Technical Report'],
        description: 'PLATEAU Technical Reports.',
        examples: [
          { input: 'PLATEAU Technical Report #00' },
          { input: 'PLATEAU Technical Report #01' },
        ]
      },
      {
        key: 'annex',
        title: 'Annex',
        abbr: ['Annex'],
        description: 'Annexes to PLATEAU Handbooks.',
        examples: [
          { input: 'PLATEAU Handbook #00 Annex 1' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'PLATEAU' },
      { name: 'Number', description: 'Document number with # prefix' },
      { name: 'Edition', description: 'Edition in Japanese format (第X.X版)' },
    ],
    algebra: [],
  },
  {
    flavor: 'sae',
    logo: '/logos/sae-logo.svg',
    name: 'SAE',
    fullName: 'SAE International',
    category: 'industry',
    description: 'SAE International is a global association of engineers and technical experts in the aerospace, automotive, and commercial vehicle industries. SAE standards cover ground vehicles, aerospace, and other mobility engineering fields.',
    website: 'https://www.sae.org',
    syntaxNotes: 'SAE identifiers follow: SAE [Type] [Number]. Types include J (Ground Vehicle), AS (Aerospace), ARP (Aerospace Recommended Practice), AMS (Aerospace Material Specification).',
    relatedFlavors: ['ansi', 'astm'],
    docTypes: [
      {
        key: 'standard',
        title: 'Standard',
        abbr: ['J', 'AS', 'ARP', 'AMS'],
        description: 'SAE Standards covering ground vehicles (J-prefix), aerospace (AS-prefix), recommended practices (ARP), and material specifications (AMS).',
        examples: [
          { input: 'SAE J3016' },
          { input: 'SAE AS9100D' },
          { input: 'SAE ARP4754A' },
          { input: 'SAE AMS5500' },
        ]
      },
    ],
    components: [
      { name: 'Publisher', description: 'SAE' },
      { name: 'Type Prefix', description: 'J, AS, ARP, AMS', attribute: 'type_prefix' },
      { name: 'Number', description: 'The standard number' },
      { name: 'Date', description: 'Publication date', attribute: 'date' },
    ],
    algebra: [],
  },
]

// Helpers
export function getPublishersByCategory(category: string): Publisher[] {
  return publishers.filter(p => p.category === category)
}

export function getPublisher(flavor: string): Publisher | undefined {
  return publishers.find(p => p.flavor === flavor)
}

export const internationalPublishers = getPublishersByCategory('international')
export const regionalPublishers = getPublishersByCategory('regional')
export const nationalPublishers = getPublishersByCategory('national')
export const industryPublishers = getPublishersByCategory('industry')
