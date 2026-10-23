// English version of model.ts. The questions, rules and texts mirror the Russian model one to one:
// a change in the logic of model.ts must be repeated here.
import type {
  Answers,
  CatalogTypeId,
  ChapterLink,
  DeliveryId,
  Explained,
  Question,
  QuestionId,
  Recommendation,
} from './model';

export const questions: Question[] = [
  {
    id: 'content',
    title: 'What is the main kind of data you will publish?',
    help: 'Choose the main product. If you have several kinds of data, pick the one the catalog is being built for.',
    options: [
      {id: 'opendata', label: 'Tables, files, registers, links to APIs', hint: 'budgets, transport, registers of organisations'},
      {id: 'geo', label: 'Map layers and map services', hint: 'cadastre, planning, imagery'},
      {id: 'scientific', label: 'Research results that need to be cited', hint: 'data behind papers, observations'},
      {id: 'indicators', label: 'Statistical indicators and time series', hint: 'tables broken down by time and territory'},
      {id: 'microdata', label: 'Anonymised census and survey data', hint: 'respondent-level records'},
      {id: 'ml', label: 'Datasets and models for machine learning'},
      {id: 'metadata', label: 'Only descriptions of other people’s data or catalogs', hint: 'aggregator, registry, federated search'},
    ],
  },
  {
    id: 'owner',
    title: 'Who owns the catalog?',
    options: [
      {id: 'national', label: 'A central government body'},
      {id: 'regional', label: 'A regional government body'},
      {id: 'municipal', label: 'A municipality'},
      {id: 'nso', label: 'A statistical office or central bank'},
      {id: 'research', label: 'A university or research organisation'},
      {id: 'international', label: 'An international organisation'},
      {id: 'ngo', label: 'An NGO, media outlet or community'},
      {id: 'business', label: 'A company'},
    ],
  },
  {
    id: 'obligations',
    title: 'What obligations do you have?',
    help: 'You can choose several options.',
    multiple: true,
    exclusive: 'none',
    options: [
      {id: 'inspire', label: 'INSPIRE or a national spatial data infrastructure'},
      {id: 'federation', label: 'A higher-level portal must harvest the metadata', hint: 'national portal, data.europa.eu, data.gov'},
      {id: 'doi', label: 'A funder or journal requires DOIs and FAIR compliance'},
      {id: 'sdmx', label: 'Exchanging statistics with international organisations', hint: 'SDMX, IMF data dissemination standards'},
      {id: 'personal', label: 'The data contains personal or sensitive information'},
      {id: 'regulation', label: 'Legal requirements for publishing open data'},
      {id: 'none', label: 'None of these'},
    ],
  },
  {
    id: 'capabilities',
    title: 'Which capabilities are mandatory?',
    help: 'You can choose several. This decides whether the platform core is enough or an extension is needed.',
    multiple: true,
    exclusive: 'minimum',
    options: [
      {id: 'dcat', label: 'Metadata export in DCAT', hint: 'so that a higher-level portal or aggregator can harvest the catalog'},
      {id: 'schemaorg', label: 'schema.org markup for search engines'},
      {id: 'storage', label: 'Store files yourself, not just link to them'},
      {id: 'tables', label: 'Programmatic access to table rows'},
      {id: 'doi', label: 'DOIs and versions'},
      {id: 'citation', label: 'A ready-made citation'},
      {id: 'restricted', label: 'Some files on request only, descriptions open'},
      {id: 'harvest', label: 'Harvest descriptions from other catalogs'},
      {id: 'multilingual', label: 'Descriptions in several languages'},
      {id: 'bespoke', label: 'Logic that no ready-made platform has', hint: 'your own workflow that neither a core nor an extension provides'},
      {id: 'minimum', label: 'The minimum is enough: address, licence, dataset page'},
    ],
  },
  {
    id: 'access',
    title: 'How will access to the data work?',
    options: [
      {id: 'open', label: 'Open to everyone, no registration'},
      {id: 'restricted', label: 'Some data after registration or approval'},
      {id: 'paid', label: 'Paid'},
    ],
  },
  {
    id: 'resources',
    title: 'What resources do you have to build and maintain it?',
    options: [
      {id: 'none', label: 'No IT staff and almost no budget'},
      {id: 'budget', label: 'A budget, but no in-house developers'},
      {id: 'team', label: 'An in-house development and operations team'},
    ],
  },
  {
    id: 'existing',
    title: 'What do you already have?',
    options: [
      {id: 'arcgis', label: 'ArcGIS'},
      {id: 'gis_oss', label: 'GeoServer, QGIS Server or other open-source GIS'},
      {id: 'repo', label: 'An institutional repository (DSpace, Pure, EPrints, etc.)'},
      {id: 'cms', label: 'A website on a CMS (WordPress, Drupal, etc.)'},
      {id: 'none', label: 'None of these'},
    ],
  },
  {
    id: 'scale',
    title: 'How much data is there and how often is it updated?',
    options: [
      {id: 'small', label: 'Up to a hundred datasets, rare updates'},
      {id: 'medium', label: 'Hundreds to a few thousand datasets, regular updates'},
      {id: 'large', label: 'Tens of thousands of datasets or frequent automatic updates'},
    ],
  },
];

interface CatalogTypeInfo {
  label: string;
  chapters: ChapterLink[];
  standards: string[];
  interfaces: string[];
  platforms: Partial<Record<DeliveryId, string[]>>;
  warnings?: string[];
}

const catalogTypes: Record<CatalogTypeId, CatalogTypeInfo> = {
  opendata: {
    label: 'Open data portal',
    chapters: [{label: 'Open data portals', to: '/types/open-data-portals/'}],
    standards: ['DCAT (DCAT-AP in the EU, DCAT-US in the US)', 'schema.org/Dataset for search engines'],
    interfaces: ['Catalog API (for example, the CKAN Action API)', 'Full metadata dump in DCAT (data.json, catalog.rdf)'],
    platforms: {
      oss: ['CKAN', 'DKAN', 'uData', 'Piveau'],
      saas: ['OpenDataSoft (Huwise)', 'Socrata (Tyler Data & Insights)', 'ArcGIS Hub'],
      static: ['JKAN', 'PortalJS', 'Datasette'],
      cms: ['DKAN (on Drupal)', 'Catalog modules for your CMS with DCAT export'],
      join: ['A regional or national open data portal, if it accepts publications from organisations'],
    },
  },
  geo: {
    label: 'Geoportal',
    chapters: [{label: 'Geoportals and SDIs', to: '/types/geoportals/'}],
    standards: ['ISO 19115 / ISO 19139', 'OGC WMS / WMTS for viewing', 'OGC WFS or OGC API Features for download'],
    interfaces: ['OGC CSW or OGC API Records for metadata', 'Map services with documented addresses'],
    platforms: {
      oss: ['GeoNetwork + GeoServer', 'GeoNode', 'Lizmap (publishing QGIS projects)', 'pycsw + QGIS Server'],
      saas: ['ArcGIS Online and ArcGIS Hub'],
      static: ['A static STAC catalog (for imagery and rasters)'],
      join: ['A national or regional spatial data infrastructure'],
    },
  },
  scientific: {
    label: 'Research data repository',
    chapters: [{label: 'Research data repositories', to: '/types/scientific-repositories/'}],
    standards: ['DataCite Metadata Schema', 'Dublin Core', 'schema.org/Dataset'],
    interfaces: ['OAI-PMH', 'Repository REST API', 'DOIs via DataCite'],
    platforms: {
      oss: ['Dataverse', 'InvenioRDM', 'DSpace 7+'],
      saas: ['Figshare', 'Dataverse or InvenioRDM from a hosting provider'],
      join: ['Zenodo', 'A domain repository from re3data', 'A university or consortium repository'],
      extend: ['A data module in your existing DSpace or Pure', 'Dataverse next to the publications repository'],
    },
  },
  indicators: {
    label: 'Indicator catalog',
    chapters: [{label: 'Indicator catalogs', to: '/types/indicator-catalogs/'}],
    standards: ['SDMX', 'JSON-stat'],
    interfaces: ['SDMX REST API', 'Table export to CSV with indicator metadata'],
    platforms: {
      oss: ['.Stat Suite', 'PxWeb', 'OpenSDG (for the Sustainable Development Goals)'],
      saas: ['.Stat Suite or PxWeb run by a contractor', 'A hosted indicator platform with a full database export in the contract'],
      static: ['OpenSDG (static site)'],
      join: ['Supplying data to the national statistical office and international databases (UNdata, World Bank and IMF databases)'],
    },
  },
  microdata: {
    label: 'Microdata catalog',
    chapters: [{label: 'Microdata catalogs', to: '/types/microdata-catalogs/'}],
    standards: ['DDI Codebook or DDI Lifecycle', 'Dublin Core'],
    interfaces: ['A study catalog with an API', 'OAI-PMH or DDI export'],
    platforms: {
      oss: ['NADA', 'Dataverse (archive with DOIs and OAI-PMH)', 'OBiBa Mica (epidemiological studies)'],
      saas: ['NADA from a hosting provider', 'Redivis'],
      join: ['World Bank Microdata Library', 'IHSN', 'A national social science data archive', 'ICPSR'],
    },
    warnings: ['Nesstar is no longer developed: do not choose it for a new catalog.'],
  },
  ml: {
    label: 'ML catalog',
    chapters: [{label: 'Machine learning catalogs', to: '/types/ml-catalogs/'}],
    standards: ['Croissant (MLCommons) with RAI fields', 'Dataset cards'],
    interfaces: ['Hub API', 'Loading through standard libraries (datasets, kagglehub, openml)'],
    platforms: {
      join: ['Hugging Face Hub', 'Kaggle', 'OpenML', 'Zenodo for a release copy with a DOI'],
      oss: ['Dataverse with the Croissant exporter', 'CKAN with the croissant plugin from ckanext-dcat', 'Codabench for competitions'],
      saas: ['An organisation account on Hugging Face Hub'],
    },
    warnings: ['InvenioRDM and Zenodo do not serve Croissant. The NeurIPS data track (Evaluations & Datasets) requires it for every submission with a new dataset.'],
  },
  metadata: {
    label: 'Metadata catalog or aggregator',
    chapters: [
      {label: 'Search engines and aggregators', to: '/types/search-engines-aggregators/'},
      {label: 'Metadata catalogs and registries', to: '/types/metadata-catalogs/'},
    ],
    standards: ['DCAT and DCAT-AP', 'SKOS (for vocabularies)'],
    interfaces: [
      'Harvesting metadata from DCAT, the CKAN API, CSW and OAI-PMH',
      'Your own DCAT export',
      'SPARQL, if you need a knowledge graph',
    ],
    platforms: {
      oss: [
        'CKAN with the ckanext-harvest extension',
        'Piveau',
        'FAIR Data Point',
        'Idra',
        'Skosmos (SKOS vocabularies)',
        'Fusion Metadata Registry (SDMX structures)',
      ],
      join: ['Registering catalogs and vocabularies in existing registries: re3data, FAIRsharing, BARTOC, dataportals-registry'],
    },
  },
};

const deliveryLabels: Record<DeliveryId, string> = {
  join: 'Do not build your own catalog: publish in an existing one',
  static: 'Static catalog (site generator and Git)',
  cms: 'A module for your existing website',
  saas: 'Hosted service (SaaS)',
  oss: 'Open-source software on your own infrastructure',
  extend: 'Extend what you already have',
  custom: 'Custom build',
};

const commonInterfaces = [
  'Persistent URLs for every dataset',
  'sitemap.xml and schema.org/Dataset markup',
];

function one(answers: Answers, id: QuestionId): string | undefined {
  return answers[id]?.[0];
}

function chooseDelivery(
  type: CatalogTypeId,
  answers: Answers,
): {id: DeliveryId; why: string; alternatives: DeliveryId[]} {
  const resources = one(answers, 'resources');
  const existing = one(answers, 'existing');
  const scale = one(answers, 'scale');
  const owner = one(answers, 'owner');
  const capabilities = new Set(answers.capabilities ?? []);

  if (capabilities.has('bespoke') && resources === 'team') {
    return {
      id: 'custom',
      why: 'You marked logic that no ready-made platform has, and you have your own team. First name the specific feature that neither a core nor a maintained extension covers. Then write down who will maintain the system in five years, how persistent addresses, licences and metadata export will work, and what it costs to leave if the team disappears.',
      alternatives: ['oss'],
    };
  }

  if (existing === 'arcgis' && (type === 'geo' || type === 'opendata')) {
    return {
      id: 'extend',
      why: 'ArcGIS Hub publishes your existing layers and tables as a catalog without new infrastructure. Keep in mind the dependence on Esri licences, and check that datasets can be downloaded, not just viewed on a map.',
      alternatives: ['oss'],
    };
  }
  if (existing === 'gis_oss' && type === 'geo') {
    return {
      id: 'oss',
      why: 'You already have the services; what is missing is a metadata catalog on top of them. GeoNetwork or pycsw connect to GeoServer and QGIS Server.',
      alternatives: ['join'],
    };
  }
  if (existing === 'repo' && type === 'scientific') {
    return {
      id: 'extend',
      why: 'A publications repository can be extended into a data repository, or a specialised platform can be set up next to it. What matters is shared authentication, DOIs and paper ↔ data links.',
      alternatives: ['join', 'oss'],
    };
  }
  if (type === 'ml' && resources !== 'team') {
    return {
      id: 'join',
      why: 'People look for ML datasets on the large hubs. Publishing there gives you an audience and loading tools that are hard to reproduce on your own.',
      alternatives: ['saas'],
    };
  }

  if (resources === 'none') {
    if (scale === 'small') {
      const why =
        owner === 'municipal'
          ? 'A small municipality without an IT team is usually better off publishing on a regional or national portal: a catalog of its own needs constant support, or it quickly goes stale.'
          : 'Without an IT team and with little data, your own catalog will quickly go stale. Publishing in an existing catalog is more reliable.';
      return {id: 'join', why, alternatives: ['static', 'saas']};
    }
    return {
      id: 'saas',
      why: 'Without your own team, a catalog of this size can realistically be run only as a hosted service, where updates and security are the vendor’s job.',
      alternatives: ['join'],
    };
  }

  if (resources === 'budget') {
    if (existing === 'cms' && scale === 'small') {
      return {
        id: 'cms',
        why: 'For a small amount of data, a section on your existing website is enough, provided it serves metadata in machine-readable form.',
        alternatives: ['saas', 'static'],
      };
    }
    return {
      id: 'saas',
      why: 'With a budget but no in-house developers, a hosted service takes operations off your hands. The alternative is open-source software with a support contract from a contractor.',
      alternatives: ['oss'],
    };
  }

  if (scale === 'small' && (type === 'opendata' || type === 'indicators')) {
    return {
      id: 'oss',
      why: 'Your own team can deploy and adapt open-source software. With little data, also consider a static catalog: it needs almost no maintenance.',
      alternatives: ['static'],
    };
  }
  return {
    id: 'oss',
    why: 'Your own team can deploy open-source software, adapt it and avoid depending on a vendor.',
    alternatives: ['saas'],
  };
}

function platformsFor(info: CatalogTypeInfo, delivery: DeliveryId, existing?: string): string[] {
  if (delivery === 'custom') {
    return [
      'A custom system, only after the screening questions. Compare a ready-made platform alongside it anyway: the “special logic” often turns out to be an extension',
    ];
  }
  if (delivery === 'extend' && existing === 'arcgis') {
    return ['ArcGIS Hub'];
  }
  if (delivery === 'oss' && existing === 'gis_oss') {
    return ['GeoNetwork on top of your existing OGC services', 'pycsw'];
  }
  for (const id of [delivery, 'oss', 'saas', 'join'] as DeliveryId[]) {
    const list = info.platforms[id];
    if (list && list.length > 0) {
      return list;
    }
  }
  return [];
}

function uniq(items: string[]): string[] {
  return Array.from(new Set(items));
}

function explain(text: string, why: string): Explained {
  return {text, why};
}

function reasonForStandard(text: string): string {
  if (text.includes('profile of the higher-level portal')) {
    return 'A higher-level portal harvests only the profile it understands itself. It will skip your “almost DCAT”.';
  }
  if (text.includes('DCAT')) {
    return 'Catalogs exchange descriptions in DCAT. Without an export, a portal is visible only to people who open the site.';
  }
  if (text.includes('schema.org')) {
    return 'This markup is how general dataset search engines, including Google Dataset Search, find a dataset.';
  }
  if (text.includes('DataCite') || text.includes('DOI')) {
    return 'A DOI keeps the link working when the site moves. It is the main identifier for citing data in a paper.';
  }
  if (text.includes('Dublin')) {
    return 'The common minimum description understood by research aggregators and the OAI-PMH protocol.';
  }
  if (text.includes('ISO') || text.includes('INSPIRE')) {
    return 'This is how geodata is described in a national infrastructure. The national geoportal will not harvest any other format.';
  }
  if (text.includes('SDMX') || text.includes('JSON-stat')) {
    return 'An indicator with breakdowns is exchanged in SDMX or JSON-stat, not as a file “just in case”.';
  }
  if (text.includes('DDI')) {
    return 'A survey is described together with its variables. Without that, a microdata file cannot be interpreted.';
  }
  if (text.includes('Croissant')) {
    return 'A machine-readable description of an ML dataset: code uses it to load the dataset, and the RAI fields report biases and limitations. Hugging Face, Kaggle, OpenML and Dataverse generate the core fields themselves.';
  }
  if (text.includes('SKOS')) {
    return 'Vocabularies and classifications are described separately from datasets, otherwise an aggregator cannot match themes.';
  }
  return 'This way other systems understand the description, not just your own site.';
}

function reasonForInterface(text: string): string {
  if (text.includes('CKAN')) {
    return 'Programs search for datasets through this API. A higher-level portal can often harvest exactly this one.';
  }
  if (text.includes('DCAT') || text.includes('data.json')) {
    return 'A harvester needs one file with all descriptions. Searching through a results page is not enough for it.';
  }
  if (text.includes('schema.org') || text.includes('sitemap')) {
    return 'A persistent address and page markup are how you get into a search engine without waiting for manual registration.';
  }
  if (text.includes('CSW') || text.includes('OGC')) {
    return 'A layer catalog is served through a service that geoportals already understand, not just as a map in a browser.';
  }
  if (text.includes('OAI-PMH') || text.includes('DataCite')) {
    return 'Research aggregators harvest descriptions over a protocol. They do not parse site pages.';
  }
  if (text.includes('SDMX') || text.includes('CSV')) {
    return 'An indicator has to be retrievable by a program. A table builder that only works in a browser does not provide that.';
  }
  if (text.includes('harvesting point')) {
    return 'Other catalogs connect to a stable export address. An address that changes breaks the whole chain.';
  }
  return 'Without machine access, only people in a browser can use the catalog.';
}

function explainPlatform(name: string): Explained {
  if (name.includes('CKAN')) {
    return explain(name, 'API and files are in the core. DCAT, custom fields and harvesting other catalogs are CKAN community extensions.');
  }
  if (name.includes('DSpace')) {
    return explain(name, 'DOIs and versions are in the core. A ready-made citation with BibTeX and RIS export is not in the core up to and including 10.1, only meta tags for Google Scholar. It is a repository, not an open data portal.');
  }
  if (name.includes('Dataverse') || name.includes('InvenioRDM')) {
    return explain(name, 'DOIs, versions and citation are in the core. It is a repository, not an open data portal.');
  }
  if (name.includes('GeoNetwork') || name.includes('pycsw')) {
    return explain(name, 'A layer catalog in the core: ISO 19115 and CSW. Maps are served by a separate server, not by the catalog itself.');
  }
  if (name.includes('ArcGIS')) {
    return explain(name, 'A catalog on top of the ArcGIS you have already bought. You cannot install your own extension, and there are no DOIs.');
  }
  if (name.includes('Zenodo') || name.includes('Hugging Face') || name.includes('Kaggle') || name.includes('OpenML')) {
    return explain(name, 'Someone else’s hub gives you an audience and a DOI or loading into code. Your own moderation there is limited.');
  }
  if (name.includes('Codabench')) {
    return explain(name, 'A hidden test split and a leaderboard are in the core. It is a competition platform, not a dataset catalog: the datasets themselves are published elsewhere.');
  }
  if (name.includes('NADA')) {
    return explain(name, 'Seven file access types, access requests and DDI export are in the core. No OAI-PMH; DOIs are registered separately. Nesstar is not an option for a new catalog.');
  }
  if (name.includes('Mica')) {
    return explain(name, 'Detailed variable dictionaries and access requests are in the core; the data is almost always available on request only, so the description must be complete.');
  }
  if (name.includes('PxWeb') || name.includes('.Stat') || name.includes('OpenSDG')) {
    return explain(name, 'An indicator platform. OpenSDG is a lightweight showcase, PxWeb has its own API and JSON-stat in the core, .Stat Suite has an SDMX service. For SDMX exchange, PxWeb needs a second product.');
  }
  if (name.includes('FAIR Data Point') || name.includes('Skosmos') || name.includes('Fusion Metadata Registry')) {
    return explain(name, 'A narrow tool for one kind of description: FAIR Data Point for datasets in DCAT, Skosmos for SKOS vocabularies, Fusion Metadata Registry for SDMX structures. It does not replace a data portal.');
  }
  if (name.includes('A custom system')) {
    return explain(name, 'A custom build costs more to maintain. First prove that an extension of a ready-made platform is not enough.');
  }
  return explain(name, 'Check the mandatory features against the platform profile: what is in the core, what is an extension, what is missing.');
}

function notesForCapabilities(
  capabilities: Set<string>,
  delivery: DeliveryId,
  type: CatalogTypeId,
): Explained[] {
  const notes: Explained[] = [];
  const has = (id: string) => capabilities.has(id);
  if (capabilities.size === 0 || capabilities.has('minimum')) {
    return notes;
  }
  if (has('dcat') || has('schemaorg')) {
    if (type === 'opendata' && (delivery === 'oss' || delivery === 'custom')) {
      notes.push(explain('DCAT and schema.org', 'In CKAN both come from the ckanext-dcat extension, not the core. Support is declared for CKAN 2.10 and 2.11, and tests also run on 2.12.'));
    } else if (delivery === 'saas') {
      notes.push(explain('DCAT and schema.org', 'A hosted portal usually includes DCAT export in the service. Check the schema.org markup on a dataset page: it is sometimes cut down.'));
    } else {
      notes.push(explain('DCAT and schema.org', 'On your own static site, you produce the metadata file and markup yourself. Someone else’s catalog should do this without any development on your side.'));
    }
  }
  if (has('doi') || has('citation')) {
    notes.push(
      type === 'scientific'
        ? explain('DOIs and citation', 'In Dataverse and InvenioRDM these are in the core. In CKAN, DOIs come from the Natural History Museum extension, which has not been tested on CKAN 2.11 and 2.12. DSpace has DOIs in the core but no ready-made citation.')
        : explain('DOIs and citation', 'Open data portals and typical hosted services do not issue DOIs. If this is mandatory, look at Dataverse, InvenioRDM, Figshare or Zenodo. If you only need a “How to cite” line, a page template with a persistent address and an access date is enough.'),
    );
  }
  if (has('storage')) {
    notes.push(explain('Built-in storage', 'Research repositories and CKAN store files in the core. A geocatalog more often just links to a service. A static site stores files next to its pages.'));
  }
  if (has('tables')) {
    notes.push(explain('Access to table rows', 'In CKAN the table database is in the core; loading CSV into it is the XLoader extension (CKAN 2.10 and later). A hosted portal includes this in the service. A static site does not have it.'));
  }
  if (has('harvest')) {
    notes.push(explain('Harvesting other catalogs', 'In CKAN this is the ckanext-harvest extension, tested on versions 2.10–2.12. A static site cannot do it. In a hosted service it depends on the plan.'));
  }
  if (has('restricted')) {
    notes.push(explain('Files on request', 'Keep the description open. Dataverse, InvenioRDM and NADA do this in the core. In CKAN, private datasets are in the core too.'));
  }
  if (has('multilingual')) {
    notes.push(explain('Several languages', 'In CKAN, multilingual fields come from the ckanext-fluent extension together with scheming. Translating only the buttons does not translate dataset descriptions.'));
  }
  if (has('bespoke') && delivery !== 'custom') {
    notes.push(explain('Special logic', 'You marked a feature outside ready-made platforms, but you have no team to build it. Narrow the task or plan for a team. Otherwise it is a wish, not a plan.'));
  }
  return notes;
}

export function recommend(answers: Answers): Recommendation {
  const type = (one(answers, 'content') ?? 'opendata') as CatalogTypeId;
  const info = catalogTypes[type];
  const obligations = new Set(answers.obligations ?? []);
  const access = one(answers, 'access');
  const owner = one(answers, 'owner');
  const existing = one(answers, 'existing');

  const delivery = chooseDelivery(type, answers);
  const standards = [...info.standards];
  const interfaces = [...info.interfaces, ...commonInterfaces];
  const warnings = [...(info.warnings ?? [])];
  const readNext: ChapterLink[] = [
    {label: 'Capability map', to: '/features/capability-map/'},
    {label: 'Selecting features', to: '/choice/feature-selection/'},
    {label: 'From features to a platform', to: '/choice/from-features-to-platform/'},
    {label: 'Metadata export: DCAT and schema.org', to: '/features/metadata-export/'},
    {label: 'APIs and bulk download', to: '/features/access-interfaces/'},
    {label: 'Build, open source or SaaS', to: '/choice/build-or-buy/'},
  ];
  if (delivery.id === 'join' || delivery.id === 'static') {
    readNext.unshift({label: 'Publishing without a portal', to: '/beyond-portals/when-portal-not-needed/'});
  }

  if (obligations.has('inspire')) {
    standards.push('INSPIRE profiles for metadata and network services');
    if (type !== 'geo') {
      warnings.push('Even if your main product is not a geoportal, spatial datasets must be described in ISO 19115 and served via CSW so that the national geoportal can harvest them.');
    }
  }
  if (obligations.has('federation')) {
    standards.push('The DCAT profile of the higher-level portal (DCAT-AP, DCAT-US or a national one)');
    interfaces.push('A stable metadata harvesting point for the higher-level portal');
    readNext.push({label: 'Federation and harvesting', to: '/publishing/federation-and-harvesting/'});
  }
  if (obligations.has('doi')) {
    standards.push('DataCite and DOIs');
    if (type !== 'scientific') {
      warnings.push('You need a platform that issues DOIs: Dataverse, InvenioRDM, Figshare, Zenodo, or a DataCite membership.');
    }
    readNext.push({label: 'Persistent identifiers, DOIs and versions', to: '/features/identifiers-and-doi/'});
    readNext.push({label: 'Citation export', to: '/features/citation/'});
  }
  if (obligations.has('sdmx')) {
    standards.push('SDMX');
    if (type !== 'indicators') {
      warnings.push('Statistics are exchanged with international organisations via SDMX. This part needs a separate indicator catalog (.Stat Suite, Fusion Registry).');
    }
  }
  if (obligations.has('personal')) {
    warnings.push('You need anonymisation and access levels. Publish metadata openly and restrict access to the files: that way the data can be found without being disclosed.');
    readNext.push({label: 'Licences and access conditions', to: '/publishing/licenses-and-access/'});
  }
  if (obligations.has('regulation')) {
    warnings.push('Check the legal requirements: they may prescribe the mandatory metadata, the format and even the platform.');
  }

  if (access === 'restricted') {
    warnings.push('Keep metadata open and available to harvesters, even if the data itself is provided on request. You need a platform with access levels: NADA, Dataverse (restricted files), CKAN (private datasets).');
  }
  if (access === 'paid') {
    warnings.push('Paid access is a marketplace model. Open platforms hardly support selling data: publish the descriptions openly and handle payment and delivery in a separate system.');
    readNext.push({label: 'Data marketplaces', to: '/types/other-types/'});
  }
  if (owner === 'municipal' && delivery.id !== 'join') {
    warnings.push('Check whether the regional or national portal harvests municipal data: if it does, compatibility with it matters more than features of your own.');
  }
  if (existing === 'cms' && delivery.id !== 'cms') {
    warnings.push('A CMS-based catalog often does not serve metadata to machines. If you do build it on a CMS, check that it has DCAT export and persistent URLs.');
  }

  readNext.push({label: 'Typical scenarios', to: '/choice/scenarios/'});
  readNext.push({label: 'Worked examples', to: '/choice/worked-examples/'});
  readNext.push({label: 'Requirements checklist', to: '/choice/requirements-checklist/'});
  if (delivery.id === 'custom') {
    readNext.push({label: 'How to justify a custom build', to: '/choice/build-or-buy/'});
  }

  const capabilities = new Set(answers.capabilities ?? []);

  return {
    catalogType: info.label,
    typeChapters: info.chapters,
    delivery: deliveryLabels[delivery.id],
    deliveryWhy: delivery.why,
    platforms: platformsFor(info, delivery.id, existing).map(explainPlatform),
    alternatives: delivery.alternatives.map((id) => deliveryLabels[id]),
    standards: uniq(standards).map((text) => explain(text, reasonForStandard(text))),
    interfacesTitle:
      delivery.id === 'join'
        ? 'What the catalog you publish in must support'
        : 'What you must serve to machines',
    interfaces: uniq(interfaces).map((text) => explain(text, reasonForInterface(text))),
    capabilityNotes: notesForCapabilities(capabilities, delivery.id, type),
    warnings,
    readNext,
  };
}
