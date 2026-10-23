---
title: What Catalogs Publish
description: What data in catalogs is about, where it comes from, how detailed it is and how often it changes, what must be published and what is usually missing.
---

# What Catalogs Publish

The short answer: almost everything that governments, science, companies and communities know about the world and write down. A list of schools and every payment from the budget. A bus timetable and where that bus is right now. A population census and a raw satellite signal. A bacterial genome and an archival finding aid.

The catalog type from [Part III](../03-types/01-classification.md) tells you where to look for what: layers on a geoportal, data behind a paper in a research repository. But the content is broader than any type. A city portal holds the budget, the street trees and committee decisions. A general research repository holds tables, interview recordings, 3D models of archaeological finds and trained neural networks.

It is convenient to analyse the content with five questions. The answers determine which catalog you need.

| Question | Example answers |
|--------|-----------------|
| What the data is about | budget, transport, health, climate, culture |
| Where it came from | agency records, statistics, sensors, research, a community |
| What kind of object it is | a reference list, a register, event records, an observation series, text, an image |
| How detailed it is | a national total, by district, an individual record, a raw signal |
| How often it changes | once, once a year, every day, continuously |

## What it is about: themes

There is no single list of themes. There are several classifications, each made for its own purpose.

- **DCAT-AP themes**: 13 headings that European portals use to tag datasets so they can be searched together: agriculture, fisheries, forestry and food; economy and finance; education, culture and sport; energy; environment; government and public sector; health; international issues; justice, legal system and public safety; regions and cities; population and society; science and technology; transport. The vocabulary is maintained by the EU Publications Office.
- **ISO 19115 topic categories**: headings for geodata, from elevation and inland waters to cadastre and communications. The 2003 version has 19 of them; ISO 19115-1 adds two more, extraterrestrial and disaster.
- **INSPIRE themes**: 34 spatial data themes that EU countries must describe and serve: addresses, cadastral parcels, hydrography, buildings, soil, species distribution, natural risk zones and others.
- **G8 Open Data Charter categories** of 2013: 14 "high-value" areas, from company registers and crime to genomes and transport timetables.
- **ODIN categories**: 22 areas of official statistics that the Open Data Watch project uses to assess national statistical offices: population, education, health, prices, trade, energy, pollution and others.

A classification lets a person narrow a search and lets an aggregator put datasets from different countries on one shelf. You can introduce your own headings, but it is better to map them to the common ones. EU national portals do exactly this: they have their own classification, but DCAT-AP themes are what goes out. More on vocabularies in the chapter [on metadata standards](../07-publishing/02-metadata-standards.md).

If you combine these classifications and look at live portals, a map of themes emerges. It is not exhaustive, but it shows the breadth.

**Government and law.** The structure of bodies, contacts, officials. Legal acts and drafts. Parliamentary votes and transcripts. Court decisions. Election results by polling station. Citizens' petitions. Inspection plans and results.

**Public money.** The budget, planned and executed. Procurement and contracts. Grants and subsidies. Public property and debt. Officials' salaries and asset declarations. International aid.

**Economy and companies.** Registers of legal entities and their owners. Licences and permits. Financial statements. Bankruptcies. Prices, foreign trade, the labour market. Patents and trademarks.

**Population and social affairs.** Census and demography. Migration. Income, poverty, benefits. Housing. Schools and universities, exam results. Hospitals and pharmacies, the medicines register, disease incidence, clinical trial registries.

**Safety.** Crime, road accidents, fires, emergencies.

**Territory.** Addresses, administrative boundaries, cadastre, urban plans, buildings, place names, elevation, aerial imagery.

**Nature and climate.** Air, water and soil quality. Emissions and waste. Protected areas. Species observations. Weather, forecasts, climate series, satellite imagery.

**Transport and infrastructure.** Routes and timetables, real-time vehicle positions, parking, roads and roadworks, airports and railways. Power grids, telecommunications, water supply.

**Energy and resources.** Energy production and consumption, mineral resources, forests, fish.

**Science.** Results of experiments and observations, gene sequences and protein structures, sky surveys, questionnaires, field notebooks, code and models.

**Culture and heritage.** Museum collections, library catalogs, archival finding aids, digitised manuscripts and photographs, heritage sites, text corpora.

**Reference data.** Codes for countries, regions, economic activities, currencies. On their own they interest few people, but without them datasets from different agencies cannot be combined.

## Where data comes from

Origin matters as much as the theme. It determines completeness, methodology, update frequency and what needs to be explained in the dataset description.

**Administrative data.** A by-product of an agency's work: a register of licences exists because licences are issued, a register of contracts because contracts are signed. This is the backbone of open data portals. Coverage is complete: everyone who received a licence is in the register. But the fields were designed for record-keeping, not for analysis, and they change along with the regulations.

**Official statistics.** Collected on purpose, according to a methodology: censuses, sample surveys, business reporting. Aggregate indicators are published, anonymised microdata less often. Without the methodology the figures are easy to misread.

**Observations and measurements.** Weather stations, air quality sensors, river gauges, meters, satellites. Large volumes, long series, often a real-time stream.

**Research.** An experiment, modelling, fieldwork, a survey. Reproducibility is what matters here: the data should come with its version, methodology and processing code.

**Texts and documents.** Laws, court decisions, transcripts, minutes. A document on its own is not yet data. Structure makes it data: markup of articles, links to other acts, fields such as "date, court, parties".

**Communities.** OpenStreetMap, Wikidata, observations by amateur naturalists that reach GBIF through iNaturalist. Coverage can be wider than the government's, quality is uneven, and the licence is their own: OpenStreetMap, for example, uses ODbL.

**Companies.** They disclose some information by law: issuer reporting, emissions. Some they publish themselves when it pays: a transport operator publishes its timetable so that navigation apps show it. The rest is available under contract, for a fee or not at all.

**Derived data.** Forecasts, models and reanalyses, for example the ERA5 climate reanalysis, which combines observations and a model into continuous series for the whole planet. This also includes indices, rankings and trained machine learning models. They are published together with a note on which source data they were derived from.

## What kind of object it is

Objects of different nature sit within one theme. Their nature determines how to store, update and display them.

- **Reference lists and classifications**: codes and names. They change rarely and other datasets refer to them, so the version and date matter.
- **Registers of objects**: companies, schools, licences, buildings. They answer the question "what exists now". They change every day and need stable record identifiers and a change history.
- **Records of events and transactions**: contracts, payments, road accidents, ambulance calls. They accumulate endlessly and are published in batches by period.
- **Observations and time series**: temperature, water level, pollutant concentration by the hour.
- **Indicators**: aggregate figures by territory and year with breakdowns.
- **Microdata**: records about individual people, households or firms after anonymisation.
- **Spatial data**: vector features (boundaries, roads, buildings) and rasters (imagery, elevation).
- **Multidimensional arrays**: climate models and satellite products, with a grid, time and dozens of variables in one file.
- **Texts, images, audio, video, 3D**: corpora, digitised manuscripts, interview recordings, scans of museum objects.
- **Sequences and spectra**: genomes, proteins, mass spectrometry results. There are dedicated global archives for them.
- **Code, models and protocols**: without them a research result cannot be reproduced, so they are published next to the data.
- **Descriptions of other data**: vocabularies, schemas, ontologies, catalogs of catalogs. They are covered in the chapter [on metadata catalogs](../03-types/08-metadata-catalogs.md).

The files and services in which all this is served are covered in the [next chapter](./02-formats-and-units.md).

## Depth: from total to record

The same subject can be published at different depths. Here are the steps for three themes.

| Theme | Total | More detail | Individual record | Deepest |
|------|------|-----------|------------------|--------------|
| Budget | the budget law | execution by line item and month | every payment | a contract with stages and documents |
| Transport | a list of stops | routes and timetables | where each bus is now | anonymised trips by travel card |
| Health | disease incidence by region per year | by hospital and month | anonymised case records | medical records, only in a secure environment |

In the Earth sciences the steps are formalised. NASA divides satellite products into levels 0 to 4. Level 0 is the raw instrument signal. Level 1 is the same signal referenced to time and place and calibrated. Level 2 is physical quantities, for example sea surface temperature, at the observation points. Level 3 is the same quantities on a regular grid, per day or per month. Level 4 is the output of a model that combines several measurements. An analyst usually needs level 3, someone checking an algorithm needs level 1.

The deeper the step, the more questions you can ask of the data, but the higher the risks and requirements. At depth, personal data and trade secrets appear, volumes grow by orders of magnitude, and you cannot do without an API and a data dictionary. A portal that publishes only the top step looks complete but does not answer the questions people look for data to answer: who was paid, where the bus is, which hospital.

## How often it changes

- **Once.** A study's results, an archival collection. It needs an immutable version and a persistent identifier.
- **Periodically.** An annual report, monthly statistics. It needs one series with a consistent structure, not a new dataset every year.
- **Constantly.** A register that is edited every day. It needs snapshots by date and an export of changes.
- **Continuously.** Transport, air sensors, power grid load. This cannot be published as a file: it needs a stream or an API, and the catalog needs a description of that stream.

## Domain standards

When many publishers publish on the same theme, a common format appears. It describes not a file in general but the subject: what a contract, a stop or a species observation is. Programs and aggregators understand data in such a format immediately: map services pick up timetables in GTFS, GBIF harvests observations in Darwin Core.

| Theme | Standard | What it describes |
|------|----------|---------------|
| Procurement and contracts | OCDS | the whole contracting process: planning, tender, award, implementation |
| Company ownership | BODS | who ultimately owns a company and through which chains |
| International aid | IATI | who gives aid to whom and for what |
| Foundation grants | 360Giving | who gave how much to whom and for what |
| Budget | Fiscal Data Package | budget lines with classifications |
| Public transport | GTFS and GTFS Realtime, NeTEx in Europe | stops, routes, timetables, vehicle positions |
| City service requests | Open311 GeoReport v2 | reports of problems in the city and their status |
| Social services | HSDS (Open Referral) | organisations, services, addresses, opening hours |
| Legislation | Akoma Ntoso | the structure of an act, amendments, links to other acts |
| Company reporting | XBRL | reporting lines with machine-readable tags |
| Statistics | SDMX | indicators with breakdowns |
| Surveys | DDI | questionnaire, variables, sample |
| Biodiversity | Darwin Core | observations and specimens: species, place, date |
| Climate, ocean, atmosphere | NetCDF with the CF conventions | gridded variables with units and coordinates |
| Cultural heritage | the Europeana Data Model (EDM), IIIF | description of an object, display of high-resolution images |
| Astronomy | FITS and IVOA standards | images, spectra, catalogs of sky objects |
| DNA sequences | INSDC rules | genomes and reads in shared global archives |
| Machine learning | Croissant | the files, fields and splits of a dataset |

There are two conclusions for a catalog. First, if a standard exists for the theme, publish in it and offer CSV in addition. Second, a catalog does not have to understand every standard from the inside, but it must be able to say which standard a file conforms to. DCAT has the `dct:conformsTo` field for this. Specialised platforms go further and check the file with a validator. More in the chapter [on metadata completeness](../04-features/03-metadata-depth.md).

## What must be published

Mandatory lists set the minimum. They show what the state considers key.

- **EU.** Regulation 2023/138 on high-value datasets has applied since 9 June 2024. It has six categories: geospatial, earth observation and environment, meteorological, statistics, companies and company ownership, mobility. They are provided free of charge, in machine-readable form, via APIs and, where relevant, as bulk download. Earlier, the INSPIRE Directive required 34 spatial data themes to be described and served through services.
- **United States.** The OPEN Government Data Act is Title II of the Foundations for Evidence-Based Policymaking Act of 2018, signed in January 2019. It makes federal agency data open by default and requires agencies to maintain a comprehensive inventory of their data. The federal catalog data.gov harvests the descriptions.
- **Russia.** Government Order No. 1187-r of 10 July 2013 (as amended in 2022) contains three lists. Federal bodies publish their subordinate organisations, inspection plans and results, statistics, vacancies and registers of licences. Regions publish registers of licences for educational, medical and pharmaceutical activities, and the forest and hunting registers. The third list names information from the registers of Rosprirodnadzor and Roshydromet: waste, facilities that pollute the environment, emission permits, weather forecasts, pollution data.

International benchmarks are broader than obligations. The 2013 G8 Charter named four groups first (national statistics, maps, elections and budgets), followed by 14 high-value areas. The ODIN index checks 22 areas of official statistics not only for availability but also for detail, by year and territory.

The lists have a weak spot. It is easier to put into them things that are simple to define: names of bodies, lists of licences. A list can be fulfilled formally without publishing either budget payments or timetables. So a list is a lower bound, not a map of what people need.

## What is usually missing

**Information about individuals.** Medical records, citizens' tax data, records of benefit recipients. Instead, aggregates are published, anonymised microdata on request, or synthetic data, which are artificial records with the same statistical properties. Another way is to allow work with the records in a secure environment without handing them out. This is covered in the chapters [on microdata catalogs](../03-types/06-microdata-catalogs.md) and [on access and roles](../04-features/08-access-control-and-workflow.md).

**Secrets and anything related to security.** Trade secrets, detailed network diagrams, critical infrastructure sites, some precise geodata.

**What is charged for.** In many countries the cadastre, meteorology and company registers used to be sold. The EU regulation made six high-value categories free, but outside the EU paid access to such data is common.

**Raw and fast data.** Primary records and daily series stay in the record-keeping system and are released as aggregates.

**Company data on customers and services.** It is published rarely and usually as aggregates. Exchange happens under contracts, increasingly in data spaces; see the chapter [on AI and data spaces](../11-trends/01-ai-and-data-spaces.md).

**Supporting material.** A data dictionary, the methodology, the change history, a list of known errors. Without a data dictionary a file is formally open and practically mute.

**Failed and intermediate research results.** What made it into the paper goes into the repository. Negative results and draft exports usually stay with the author.

**What was withdrawn from publication.** A dataset can disappear by the owner's decision, after a change of system, management or policy. Then only copies in web archives and at aggregators remain. This is an argument for storing the data itself, not just a link to someone else's site, and for never changing addresses without a redirect.

## What the registry shows

The dataportals-registry describes catalogs, not datasets, and marks their content roughly: what kind of material is in the catalog. According to the dataportals-registry export (release 1.27.0 of 15 October 2026), the picture is as follows. One catalog can appear in several rows.

| Content | Catalogs |
|------------|----------:|
| Datasets | 42,297 |
| Map layers | 24,655 |
| Indicators | 2,876 |
| Publications | 457 |
| Microdata | 151 |
| Documents | 120 |

Layers almost match the number of geoportals. Indicators are fewer than indicator catalogs: not every statistics showcase has its content tagged. Dataset themes (budget, transport, climate) cannot be counted from a catalog registry. For that you need dataset search engines such as Dateno, or the data.europa.eu catalog, where datasets carry DCAT-AP themes.

## What this means for a catalog

Before choosing a platform, it is useful to draw up an inventory: for each group of data, write down the theme, origin, kind of object, depth, update frequency, domain standard and access restrictions. The inventory shows which capabilities are mandatory.

| If you publish | What you will need | Where to read more |
|-----------------|-----------------|---------------|
| a real-time stream | an API or a stream and its description in the catalog | [access interfaces](../04-features/04-access-interfaces.md) |
| large arrays, imagery, models | storage outside the catalog, download in parts | [storage](../04-features/05-data-storage.md) |
| a study's results | an immutable version, a DOI, citation export | [identifiers](../04-features/06-identifiers-and-doi.md), [citation](../04-features/07-citation.md) |
| a register edited every day | snapshots by date, versions, stable record identifiers | [identifiers and versions](../04-features/06-identifiers-and-doi.md) |
| microdata and records about people | access on request, roles, an access log | [access and roles](../04-features/08-access-control-and-workflow.md) |
| data in a domain standard | a conformance statement, file validation | [metadata completeness](../04-features/03-metadata-depth.md) |
| map layers | map services, a layer catalog | [geoportals](../03-types/03-geoportals.md) |
| tables, texts, images | a preview on the dataset page | [other capabilities](../04-features/10-other-capabilities.md) |
| many themes and agencies | a shared theme classification and a mapping to your own | [metadata standards](../07-publishing/02-metadata-standards.md) |

How to get from these requirements to features and a platform is covered in the chapter [on selecting features](../06-choice/02-feature-selection.md).

## Sources

- The EU Publications Office [Data theme vocabulary](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/data-theme), on which the DCAT-AP themes are based.
- [ISO 19115 code lists](https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.html), section MD_TopicCategoryCode.
- [INSPIRE themes](https://knowledge-base.inspire.ec.europa.eu/tools/inspire-themes_en).
- [G8 Open Data Charter and Technical Annex](https://www.gov.uk/government/publications/open-data-charter/g8-open-data-charter-and-technical-annex), 2013.
- [Open Data Inventory: categories and methodology](https://odin.opendatawatch.com/faq), 2024/25 edition.
- [NASA EOSDIS data processing levels](https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/data-processing-levels).
- [Commission Implementing Regulation (EU) 2023/138](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R0138) on high-value datasets.
- [US Public Law 115-435](https://www.govinfo.gov/content/pkg/PLAW-115publ435/html/PLAW-115publ435.htm), Title II, the OPEN Government Data Act.
- [Russian Government Order No. 1187-r of 10 July 2013](https://normativ.kontur.ru/document?documentId=437155&moduleId=1) (in Russian), as amended on 10 November 2022.
- Domain standards: [OCDS](https://standard.open-contracting.org/latest/en/), [BODS](https://standard.openownership.org/en/latest/), [IATI](https://iatistandard.org/en/), [360Giving](https://standard.threesixtygiving.org/en/latest/), [Fiscal Data Package](https://specs.frictionlessdata.io/fiscal-data-package/), [GTFS](https://gtfs.org/), [NeTEx](https://netex-cen.eu/), [Open311 GeoReport v2](https://wiki.open311.org/GeoReport_v2/), [HSDS](https://docs.openreferral.org/), [Akoma Ntoso](https://docs.oasis-open.org/legaldocml/akn-core/v1.0/akn-core-v1.0-part1-vocabulary.html), [XBRL](https://www.xbrl.org/), [Darwin Core](https://dwc.tdwg.org/), [CF conventions](https://cfconventions.org/), [IIIF](https://iiif.io/), [IVOA](https://www.ivoa.net/), [INSDC](https://www.insdc.org/).
- [ERA5](https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels) in the Copernicus Climate Data Store.
- Catalog content composition: dataportals-registry export, release 1.27.0 of 15 October 2026.
