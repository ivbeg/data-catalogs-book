---
title: Metadata Standards
description: "Which description standard suits which catalog: vocabulary, profile and controlled vocabulary; DCAT, ISO 19115, DataCite, DDI, SDMX, schema.org."
---

# Metadata Standards

A metadata standard is a common language of description. A catalog serves its records so that another portal, a search engine or a program can understand them. Your own set of fields is understood only by those who have read your instructions.

The main conclusion of this chapter: take the language the recipient already reads, and often two languages at once. A federation reads its country's DCAT profile, a search engine reads schema.org markup on the page, DOI registration reads the DataCite schema. These languages describe the same dataset and do not replace one another. A draft of the next version and "JSON loosely based on DCAT" are no good for exchange.

How a platform serves the file and which profile it enables by default is in the chapter [on export](../04-features/02-metadata-export.md). Which fields to fill in so that the dataset can be used is in the chapter [on metadata completeness](../04-features/03-metadata-depth.md). Here: which language for which catalog, and how to recognise it from a file.

## Describing a dataset versus structuring data

Standards around data come in two kinds, and they are often confused.

A **metadata standard** describes a dataset from the outside: what it is, who the publisher is, what period it covers, where to download it, on what terms. A catalog, an aggregator or a search engine reads it. DCAT, DataCite, ISO 19115 and schema.org are metadata standards.

A **data standard** describes what is inside the file: which columns or fields, what they mean, how values are encoded. A program that processes the data itself reads it. OCDS for procurement, GTFS for timetables and Darwin Core for species observations are data standards. They are covered in the chapter [on what is published](../02-data/01-what-is-published.md#domain-standards).

A catalog always needs the first kind when someone outside harvests its descriptions. It needs the second when the sector has one: a procurement dataset in OCDS is immediately understood by contract analysis programs, while a home-grown CSV about contracts has to be parsed anew by everyone. In DCAT, the link between a record and a file standard is recorded with the `dct:conformsTo` property. A column dictionary is a separate task, covered in the section [on the data dictionary](../04-features/03-metadata-depth.md#data-dictionary).

Some standards do both jobs. SDMX describes both the indicator and the structure of the series. DDI describes both the survey and its variables. Croissant describes both a machine learning dataset and its files with fields. STAC describes both an image collection and individual files.

If you do not know the right standard, look it up in a standards directory: [FAIRsharing](https://fairsharing.org/) for science, the [Data Standards Directory](https://datastandards.directory/) for government data, the [data.gov list](https://resources.data.gov/standards/) for the US.

## Four layers that get mixed up

When people say "we support DCAT", four different things get mixed up. Until they are separated, you cannot tell whether a dump will pass validation.

| Layer | Which question it answers | Example |
|------|--------------------------|--------|
| Vocabulary | what a field means | DCAT, schema.org, DataCite, ISO 19115 |
| Profile | which fields are mandatory and which list a value comes from | DCAT-AP, DCAT-US, GeoDCAT-AP |
| Controlled vocabulary | which exact value may be written | data theme, licences, language codes |
| Serialisation and protocol | in which file the answer arrives and how to ask for it | JSON-LD, Turtle, XML; OAI-PMH, CSW |

The vocabulary sets the meaning. DCAT says that a catalog has datasets, a dataset has distributions, and a distribution has a link to a file. A profile narrows the vocabulary for a country or sector: it keeps the needed fields, marks them mandatory or recommended and ties them to controlled vocabularies. DCAT-AP and DCAT-US are profiles of the same DCAT, not two different languages. A national profile, such as the Italian DCAT-AP_IT or the Swiss DCAT-AP-CH, sits on top of DCAT-AP and adds its own fields.

A serialisation is a file. The same DCAT description can be served as Turtle text, XML or JSON-LD. For a person there is no difference; for a program there is: it asks for the right form with an `Accept` header or takes an address with the right extension. A protocol is a way to query a catalog: OAI-PMH, CSW, OGC API Records. A single CSW can answer with both an ISO 19115 record and a DCAT description, if the software supports it. More on ways of serving in the chapter [on export](../04-features/02-metadata-export.md).

The practical consequence follows. A portal can honestly serve DCAT and still fail the validator of the profile a harvester expects. On 13 October 2026 the data.gov.gr dump was in the DCAT-AP 3 profile, and the DCAT-AP 3.0.1 validator found two errors: the file format was written as the word "CSV" rather than as a link to a controlled vocabulary, and the checksum had no algorithm specified. The analysis is in the chapter [on export](../04-features/02-metadata-export.md#how-it-breaks-the-file-opens-but-the-profile-is-wrong).

## What to take as the basis

<div className="wide-table">

| Catalog | What to serve outwards | What to rely on | Whom this does not cover |
|---------|---------------------|------------------|----------------------|
| Open data portal | the country's profile and schema.org on the page | DCAT-AP 3.0.1 in the EU; DCAT-US 3.0 in the US; in Russia, the "passport" from methodological recommendations 4.0 | a search engine does not read DCAT alone, a harvester does not read page markup alone |
| Geoportal | ISO 19115; for an open data portal, GeoDCAT-AP as well | ISO 19115, in the EU INSPIRE and GeoDCAT-AP 3.1.0; image files: STAC | a layer record does not replace a description of files, STAC does not replace the country's infrastructure |
| Research repository | DataCite for DOIs, Dublin Core over OAI-PMH, schema.org on the page | DataCite 4.7; to transfer a folder of files, RO-Crate | a DOI is not registered with a DCAT record |
| Indicator catalog | SDMX for partners; StatDCAT-AP if tables must reach an open data portal | SDMX 3.1, in practice often still 2.1; tables in the browser: JSON-stat | SDMX does not make a dataset findable in Google Dataset Search |
| Microdata catalog | DDI per survey and schema.org on the page | DDI Codebook 2.5; the new 2.6 since 15 April 2026 | DDI does not replace access conditions or DOIs |
| ML catalog | a card for people and Croissant for programs | Croissant 1.1 of 29 January 2026; platforms in 2026 still serve 1.0 | Croissant does not describe an indicator and does not replace a licence |
| Vocabulary registry | SKOS; for data elements, ISO/IEC 11179 | SKOS; ISO/IEC 11179-3:2023 | a glossary does not replace a dataset catalog |

</div>

Two languages at once is normal work, not a fallback. A catalog's internal form can be richer than the profile: your own editorial fields stay with you. What goes outwards is the profile the harvester named.

## DCAT and profiles

**DCAT** is the W3C vocabulary for data catalogs. The first recommendation came out on 16 January 2014, the second on 4 February 2020, the third on 22 August 2024. Version 3 describes a catalog, a dataset, a distribution, a data service, a dataset series and a catalog record. It introduced series of separately published datasets and version properties, including a file checksum. How these parts look on a live record is analysed in the chapter [on catalog anatomy](../01-basics/03-anatomy.md).

DCAT itself declares almost nothing mandatory. Obligation appears in the profile. That is why "we have DCAT" does not tell you whether data.europa.eu or data.gov will accept the file.

| Profile | For whom | Status as of October 2026 |
|---------|----------|--------------------------------|
| DCAT-AP 3.0.1 | European portals and data.europa.eu | a SEMIC recommendation of 27 October 2025. The 3.0.2 draft of 17 June 2026 has not yet become a recommendation |
| National profiles on top of DCAT-AP | a single country's portal | follow the version the national harvester checks. Examples: DCAT-AP_IT and DCAT-AP-CH |
| DCAT-US 3.0 | US federal agencies, the `data.json` file | published 1 May 2026. data.gov continues to harvest version 1.1 while agencies migrate |
| DCAT-AP HVD | high-value datasets in the EU | release 3.0.0, October 2024, on top of DCAT-AP |
| GeoDCAT-AP 3.1.0 | translating an ISO 19115 record into DCAT | a SEMIC recommendation of 16 February 2026, aligned with DCAT-AP 3.0.1 |
| StatDCAT-AP | statistical tables on an open data portal | the current version is 1.0.1 (2019). Version 3.0.0 has been a working draft since 10 June 2026 |
| HealthDCAT-AP | health data catalogs for the EHDS | a European Commission draft; release 7, May 2026. The number has already shifted within the same year, so take the [latest release](https://healthdataeu.pages.code.europa.eu/healthdcat-ap/releases/latest/) |
| mobilityDCAT-AP 3.0.0 | national access points for transport data | a NAPCORE recommendation on top of DCAT-AP 3.0.0, not yet on top of 3.0.1 |

A sector profile is not run as a second catalog. It is produced by translating the description the sector already uses. That is what GeoDCAT-AP is for: the geoportal keeps an ISO 19115 record, and the open data portal reads it as DCAT. Likewise, StatDCAT-AP exists so that a statistical office's tables appear among open data without replacing SDMX.

In DCAT-AP 3.0.1 the mandatory dataset fields are the title and description, while the licence lives on the distribution and is not named as mandatory. For people, the licence, update date and period matter more than this minimum. The full table of mandatory and recommended fields is in the chapter [on metadata completeness](../04-features/03-metadata-depth.md#what-standards-require-and-what-they-do-not).

Data spaces publish their catalog in DCAT and record usage conditions in ODRL: who may take the data and for what. The description remains ordinary DCAT even when the file itself is closed. How exchange works is in the chapter [on other catalog types](../03-types/10-other-types.md).

### A passport instead of DCAT

In Russia, open data descriptions are defined not by DCAT but by methodological recommendations version 4.0. They were approved by minutes No. 49pr of the presidium of the Government Commission on Digital Development of 12 December 2024. The unit of description is the dataset "passport": identifier, title, description, owner, responsible person and their contacts, a link to the file, format, publication, modification and currency dates, keywords, links to data versions and structures.

The machine-readable passport for parsing someone else's site is one file for the whole list: `meta.csv`, `meta.xml` or `meta.json`. The CSV requirements name four columns: `property`, `title`, `value` and `format`. The version of the recommendations is recorded in the `standardversion` field. The data file and the structure file sit next to the passport. On government websites built on Gosweb, each dataset has three CSVs: the passport, the structure and the data. How such sections work is in the chapter [on open data portals](../03-types/02-open-data-portals.md).

The sample in the same section has fallen behind the requirements. The reference `meta.csv` contains only the `property` and `value` columns and links to the old address of standard 3.0, `http://opendata.gosmonitor.ru/standard/3.0`, although the cover says version 4.0. Separately, in the section on RDFa, the recommendations advise marking up HTML with the schema.org or Dublin Core vocabulary. Page markup and the passport are not brought together into one profile in the document.

The practical conclusion. The passport is read by the Russian portal and its page parser. data.europa.eu, data.gov and Google Dataset Search do not read it. If datasets only need to be found inside that system, the passport is enough. If someone else must find them, schema.org on the page is added to the passport, along with the DCAT profile a specific harvester has named.

## The other languages

**schema.org/Dataset** is markup in a dataset's HTML page, usually as a JSON-LD block. Search engines read it. Google asks for a name and a description of 50 to 5,000 characters, and calls the licence, author, period and territory recommended. Markup describes one dataset at a time and does not replace a file of the whole catalog. A page that a script draws in the browser is often empty for a robot. How to check this is in the chapter [on discoverability](../07-publishing/05-discoverability.md).

**ISO 19115** describes spatial data: extent, coordinate system, quality, constraints. A record is written to a file per ISO 19139 or ISO 19115-3: in XML this shows in the `gmd:` and `mdb:` prefixes. INSPIRE says how a European public authority must serve such a record. Satellite images and other spatial files are described by STAC: a collection has thousands of files, each with its own date and territory. More in the chapter [on geoportals](../03-types/03-geoportals.md).

**Dublin Core** is a short set of fields: title, creator, date, subject, rights. Research repositories serve it over OAI-PMH, and almost every archive understands it. **DataCite** is more detailed and is needed to register a DOI. The current schema is 4.7 of 3 March 2026. The identifier, creator, title, publisher, year and resource type are mandatory. A licence is optional in the schema: its absence does not prevent getting a DOI, but it does prevent a person from knowing whether the files can be used. How the DOI itself works is in the chapter [on identifiers](../04-features/06-identifiers-and-doi.md).

**DDI** describes a survey: the questionnaire, the sample, the variables, the files. **SDMX** describes an indicator, its dimensions and the series. Both are needed within their sector. Outwards, to an open data portal and to a search engine, a translation is made from them anyway: StatDCAT-AP and schema.org. The analysis is in the chapters [on microdata](../03-types/06-microdata-catalogs.md) and [on indicators](../03-types/05-indicator-catalogs.md).

**Croissant** describes a machine learning dataset on top of schema.org: files, fields, a split into training and test parts. Version 1.1 of 29 January 2026 added provenance using the PROV-O model, usage conditions (DUO and ODRL) and links to external vocabularies. In a file the version shows as `dct:conformsTo` with the value `http://mlcommons.org/croissant/1.1`. Platforms in 2026 still serve 1.0. A card for people is a separate text alongside. More in the chapter [on ML catalogs](../03-types/07-ml-catalogs.md).

**SKOS** describes a vocabulary: a concept has an address, labels, a code and "broader/narrower" links. **ISO/IEC 11179** describes a data element in a registry: a definition, permitted values, an owner. These are the languages of metadata catalogs, not dataset portals. The analysis is in the chapter [on metadata catalogs](../03-types/08-metadata-catalogs.md).

### Packaging and combining existing standards

Several specifications often end up on the same list as catalog standards, although they answer a different question: how to package files, or which existing standards to combine.

**RO-Crate** packages a study's files together with their description. Next to the data sits `ro-crate-metadata.json`, a JSON-LD file based on schema.org. The current recommendation is 1.3 of 22 June 2026. It is used to transfer and deposit a research object: the data, the programs, the article on how they were obtained. A national catalog is not harvested with this file. Dataverse has an RO-Crate export as a separate community exporter, not as a portal exchange format.

**CDIF** (Cross-Domain Interoperability Framework) is CODATA's guidance on which existing standards to combine when data crosses a discipline boundary. Version 1.0 came out in May 2024, version 1.1 in June 2026. For discovery, CDIF recommends schema.org and DCAT, not a new catalog vocabulary. Each discipline's own standards remain: DataCite, DDI, ISO 19115.

**Data Package** and **BagIt** describe a folder of files. In the first, a `datapackage.json` sits alongside with a list of tables and a column dictionary: this is how a dataset is published in Git. In the second, a checksum manifest: this is how an archive checks that a package is intact. [OCFL](https://ocfl.io/) sets out how a repository lays out such packages on its own disk. None of the three tells a portal harvester how to walk a catalog. On publishing as a folder, see the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md); on archival packaging, the chapter [on archiving](../09-practices/04-archiving.md).

[CodeMeta](https://codemeta.github.io/) works like schema.org for a dataset, but for software: authors, version, a link to the repository. It is placed next to the data if code is published too. It does not become a dataset catalog.

## Controlled vocabularies

Free text in a "theme" field does not join up across portals. "Transport", "Transportation" and "transp." are three different themes to a program. The value is taken from a shared list and written as its address or code.

For open data in Europe these are the thirteen data themes of the EU Publications Office: agriculture, economy and finance, education, energy, environment, government and public sector, health, international issues, justice, regions and cities, population and society, science and technology, transport. For geodata, the nineteen ISO 19115 topic categories: biota, boundaries, elevation, inland waters and others. You can have your own classification. Outwards it is mapped onto the shared list, as EU national portals do: their own headings inside, the data theme in DCAT-AP.

A licence is written as a link, not as the phrase "open licence". In DCAT-AP the link points to the EU Publications Office licence vocabulary. In a repository and in a `CITATION.cff` file the same licence is recognised by its SPDX code, e.g. `CC-BY-4.0`. A Russian reader will understand the words "standard terms of use", but an international catalog's program will not: there is no such code in its list. More in the chapter [on licences](../07-publishing/04-licenses-and-access.md).

The language is written as a code from the EU language vocabulary or ISO 639, and the territory as a country and region code or a link to a recognisable object such as GeoNames, not as "our region". A code survives harvesting better than a name: when moved from catalog to catalog, a city name is lost more often than an identifier. In a research description the publisher is written as an organisation identifier from the ROR registry, and the author as an ORCID identifier. Then one organisation and one person do not split into different spellings of the name.

Your own controlled vocabulary is justified if there is no shared one. Then it is published separately, each value gets a persistent address, and it is described in SKOS. A list in a form field's hint does not count as a controlled vocabulary: it cannot be referenced from another catalog.

## How to choose

| Situation | Decision |
|----------|---------|
| Descriptions are harvested by a national portal or data.europa.eu | the profile and version their validator checks. A neighbouring version will not do |
| Datasets must be findable by search | schema.org on every dataset page, even if DCAT already exists |
| A DOI is needed | the DataCite schema. A DCAT record does not register a DOI |
| A map layer must also appear on an open data portal | ISO 19115 inside, GeoDCAT-AP outwards |
| Only your own staff see the catalog | no external standard is needed |
| A Russian authority publishes to the federal portal and nowhere else | the recommendations 4.0 passport |
| The same authority wants its datasets found from outside | keep the passport and add schema.org; DCAT when a harvester names a profile |
| The discipline has its own schema | keep it inside, serve a common profile outwards |
| You want your own fields | in the catalog's form, yes. In a file for someone else's harvester, only a known profile |
| A dozen datasets with no harvester | schema.org and one file with all descriptions. Full DCAT-AP is overkill |

In brief, this is what a justification looks like using the [decision record](../06-choice/04-justifying-decisions.md) template. The record on which CKAN extension to enable is already in the chapter [on export](../04-features/02-metadata-export.md). Here the fork is different: the national passport or "an international standard".

- **Context.** A ministry publishes about two hundred datasets. The federal portal and Gosweb sites expect a passport under recommendations 4.0. Staff ask to "do it like in Europe, in DCAT". There is no specific harvester that would name a DCAT-AP version. It would be good to see the datasets in dataset search.
- **Options.** Replace the passport with DCAT-AP. Keep only the passport. Keep the passport for the Russian portal, mark up pages with schema.org and not write a home-grown JSON.
- **Criteria.** Who actually harvests the descriptions, whether the dataset gets into search, how much it costs to maintain two descriptions of one dataset.
- **Decision.** Keep the passport. Add schema.org to the dataset page. Enable DCAT-AP when a specific harvester names a profile version. Do not make a home-grown "almost DCAT" format.
- **Why.** The Russian portal reads the passport. A search engine reads the page markup. Nobody would validate DCAT-AP without a harvester, and a home-grown JSON would have to be explained separately to every new recipient. Both descriptions come from one record: the second is not typed by hand.
- **When to review.** If the federal portal starts harvesting DCAT, if a dataset has to get into data.europa.eu or a sector aggregator, or if DCAT-AP 3.0.2 becomes a recommendation and the draft stops being accepted.

## How to recognise a standard from a file

The commands for checking that a dump opens and passes a validator are collected in the chapter [on export](../04-features/02-metadata-export.md#how-to-check-a-live-portal). Here: how to tell from the contents which language you are looking at. Look at the start of the file, not at the name of the "download metadata" button.

| What is visible in the file | Which standard it is |
|-------------------|--------------------|
| `property` and `value` columns, a `standardversion` field | the passport from the Russian methodological recommendations |
| `conformsTo` with the address of DCAT-AP, DCAT-US or another profile version | a DCAT profile; the number in the address matters more than the word "DCAT" in the instructions |
| `@type` with the value Dataset and the schema.org vocabulary in `@context` | schema.org markup. If `conformsTo` points to `mlcommons.org/croissant`, it is Croissant |
| A `ro-crate-metadata.json` file | RO-Crate |
| XML with a `gmd:` or `mdb:` prefix | an ISO 19139 or ISO 19115-3 record |
| The `datacite.org/schema/kernel-4` namespace | the DataCite schema |
| `datapackage.json` next to tables | Data Package, a dictionary of files, not a portal catalog |

Then two checks. First: the version in the file matches the one the harvester named. DCAT-AP 2 where 3.0.1 is expected, and DCAT-US 1.1 where 3.0 is already accepted, are different profiles. Second: the field values come from a controlled vocabulary. To a validator, the word "CSV" in the format field and a file type address from the vocabulary are not equal, as the data.gov.gr dump showed.

## Where people usually go wrong

**Calling your own JSON a standard.** The fields resemble DCAT, the names are your own, there are no controlled vocabularies. Every harvester parses such a file separately, and it fails at the first profile check.

**Enabling the dump and assuming the profile is right.** An extension's or a cloud service's default profile is often older than the one the country expects. It is switched on in settings. On data.gov.gr the profile was enabled, and two fields still failed the validator.

**Taking a draft as the current version.** As of October 2026 the drafts are DCAT-AP 3.0.2, StatDCAT-AP 3.0.0 and HealthDCAT-AP. They are read to understand where the profile is heading. For exchange, serve the version that has recommendation status and that the harvester's validator accepts.

**Free text instead of a code.** A theme, licence, language and territory written as phrases do not join up with someone else's catalog. A mandatory field filled with a placeholder formally passes and is empty in meaning.

**Covering all tasks with one standard.** DCAT does not register DOIs, DataCite does not feed data.europa.eu, the passport does not get into dataset search, Croissant does not describe an indicator. Each recipient gets its own language from the same record.

**Confusing a dataset description with a file's structure.** You cannot publish procurement "in DCAT": DCAT describes the record, OCDS describes the contracts themselves. The record then says, via `dct:conformsTo`, that the file conforms to OCDS.

## Sources

- [DCAT 3](https://www.w3.org/TR/vocab-dcat-3/), W3C recommendation of 22 August 2024; the previous one is [DCAT 2](https://www.w3.org/TR/2020/REC-vocab-dcat-2-20200204/) of 4 February 2020
- [DCAT-AP 3.0.1](https://semiceu.github.io/DCAT-AP/releases/3.0.1/), SEMIC recommendation of 27 October 2025; [draft 3.0.2](https://semiceu.github.io/DCAT-AP/drafts/3.0.2/) of 17 June 2026
- [DCAT-US 3.0](https://resources.data.gov/resources/dcat-us3/), published 1 May 2026; [announcement](https://www.councils.gov/news-events/news/dcat-us-schema-30-is-published/) of 26 May 2026. data.gov accepts version 1.1 during the transition
- [GeoDCAT-AP 3.1.0](https://semiceu.github.io/GeoDCAT-AP/releases/3.1.0/), recommendation of 16 February 2026; [DCAT-AP HVD](https://semiceu.github.io/DCAT-AP/releases/3.0.0-hvd/); [StatDCAT-AP 3.0.0](https://semiceu.github.io/StatDCAT-AP/drafts/3.0.0/), working draft of 10 June 2026; [HealthDCAT-AP](https://healthdataeu.pages.code.europa.eu/healthdcat-ap/releases/latest/); [mobilityDCAT-AP 3.0.0](https://w3id.org/mobilitydcat-ap/drafts/latest/)
- [DataCite schema 4.7](https://schema.datacite.org/meta/kernel-4.7/), released 3 March 2026
- [Croissant 1.1](https://docs.mlcommons.org/croissant/docs/croissant-spec-1.1.html), published 29 January 2026
- [RO-Crate 1.3](https://www.researchobject.org/ro-crate/specification/1.3/), recommendation of 22 June 2026
- [CDIF](https://codata.org/initiatives/making-data-work/cdif/), version 1.1, June 2026, text at [cdif.codata.org](https://cdif.codata.org)
- Methodological recommendations on publishing open data, version 4.0, annex to minutes No. 49pr of 12 December 2024; the document's page on the [Ministry of Finance website](https://minfin.gov.ru/ru/document?id_4=315091-metodicheskie_rekomendatsii_po_publikatsii_otkrytykh_dannykh_gosudarstvennymi_organami_organami_mestnogo_samoupravleniya_i_podvedomstvennymi_im_organizatsiyami_versiya_4.0) (in Russian), published 14 January 2026. The reference `meta.csv` in the text links to `http://opendata.gosmonitor.ru/standard/3.0`
- The EU Publications Office [data theme vocabulary](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/data-theme) and [licence vocabulary](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/licence)
- [schema.org/Dataset](https://schema.org/Dataset), [Dataset markup in Google's documentation](https://developers.google.com/search/docs/appearance/structured-data/dataset)
- Standards directories: [FAIRsharing](https://fairsharing.org/), [Data Standards Directory](https://datastandards.directory/), [standards on resources.data.gov](https://resources.data.gov/standards/), checked 13 October 2026
- I. Begtin, [Data standards](https://begtin.substack.com/p/11) (in Russian), January 2021: the difference between metadata standards and data standards
- [Metadata export](../04-features/02-metadata-export.md), [metadata completeness](../04-features/03-metadata-depth.md), [open data portals](../03-types/02-open-data-portals.md)
