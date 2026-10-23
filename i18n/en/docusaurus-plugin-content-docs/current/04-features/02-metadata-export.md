---
title: "Metadata Export: DCAT, schema.org and Other Formats"
description: Why a catalog should serve dataset descriptions in standard formats, how DCAT differs from schema.org, and how to check that an export not only responds but can actually be read.
---

# Metadata Export

A catalog is useful not only to people on its website. Other portals, search engines and programs must be able to read the dataset descriptions. For this the catalog serves metadata in a format these systems already understand.

The main conclusion of the chapter: responding at `/data.json` does not yet mean serving descriptions. An export has a profile, and profiles are not interchangeable: data.europa.eu expects DCAT-AP, data.gov DCAT-US, Google markup on the dataset page. A platform usually supports several formats at once, but the required profile has to be enabled in configuration, and the description fields must be filled in the way that particular profile requires. The standards themselves are covered in the chapter ["Metadata Standards"](../07-publishing/02-metadata-standards.md). This chapter is about a platform's ability to serve them.

## What it is

Metadata export is a ready-made description of a dataset or of the whole catalog in a format that someone else's system reads. It has three addressees, each with its own format.

**Other catalogs.** They need a common description vocabulary. For open data this is DCAT, a W3C Recommendation and the vocabulary of data catalogs. Using it, a national portal harvests regional ones, and the common European portal harvests national ones. DCAT itself defines only the meaning of fields. Which of them are mandatory and what words to use is decided by a profile, a refinement of the vocabulary for a country or sector:

- **DCAT-AP** is the profile for Europe. The current version is 3.0.1, a SEMIC recommendation of 27 October 2025. The 3.0.2 draft of 17 June 2026 has not yet become a recommendation. On top of it there are sector refinements: GeoDCAT-AP for geodata, StatDCAT-AP for statistics, DCAT-AP HVD for high-value datasets, HealthDCAT-AP for health data;
- **DCAT-US** is the profile for US federal agencies. An agency publishes one `data.json` file, and data.gov harvests it. The new version is DCAT-US 3.0, built on DCAT 3. data.gov still accepts the old version 1.1 during a transition period.

**Search engines.** They need markup right in the dataset's HTML page: an `application/ld+json` block with the schema.org vocabulary and the Dataset type. Google Dataset Search reads it. It is not a replacement for DCAT: the markup has a different audience, and Google states plainly that it understands both schema.org and DCAT, but looks for markup on the dataset page.

**Sector systems.** They have their own formats and protocols:

- geodata: ISO 19115 and the CSW catalog service, as well as OGC API Records;
- research: the DataCite schema and the OAI-PMH protocol;
- microdata: DDI;
- statistics: SDMX;
- machine learning: Croissant on top of schema.org.

A protocol and a format are different things, and they are often confused. CSW and OAI-PMH answer the question "how to ask the catalog". DCAT, ISO 19115 and DataCite answer the question "in what language the answer will come". The same CSW can answer both with an ISO 19115 record and with a DCAT description, if the catalog software supports it.

## Why it is needed

Without a standard export, a catalog is visible only to those who open its website. Here is who is left out.

**The higher-level portal.** It harvests descriptions according to the profile adopted in the country and at known addresses. A catalog with "almost DCAT" or its own JSON will not be harvested, even if the set of fields is similar. How such chains work and where they break is covered in the chapter [on federation and harvesting](../07-publishing/03-federation-and-harvesting.md).

**Dataset search engines.** In November 2024 Google Dataset Search, for Russian-language queries, ranked first datasets from hubofdata.ru and ngodata.ru, two small civil society portals on CKAN. Not because they are the most complete, but because their pages have schema.org markup. The Moscow open data portal data.mos.ru, large and working, served neither schema.org nor DCAT, and its datasets were absent from both Google Dataset Search and the Dateno search engine. In 2022 the Indian portal data.gov.in dropped out in the same way: ordinary Google search indexed it, dataset search did not. Markup matters more than the size of the catalog.

**Aggregators and archives.** They need a complete export that can be repeated: one file or a protocol with selection by date. A sitemap is not suitable for this: it contains only page addresses, without licences and files. How a description export differs from a search API is covered in the chapter [on APIs and bulk download](./04-access-interfaces.md).

**The law.** For public bodies in the EU, the DCAT-AP profile is a practical requirement for exchange with data.europa.eu. For high-value datasets under Regulation 2023/138, the DCAT-AP HVD profile is added on top.

An export does not fix empty fields. If a description has no licence and no publisher, DCAT will not have them either: the software carries over what is filled in. Which fields profiles require and how to check that they are filled in meaningfully is covered in the chapter [on metadata depth](./03-metadata-depth.md).

## Implementation options

Descriptions are served in five ways. They are not mutually exclusive: a mature catalog needs several at once.

| Method | What the consumer gets | Strength | Weak spot |
|--------|--------------------------|-----------------|--------------|
| Markup on the page | schema.org in the HTML of each dataset | a search engine reads it while crawling the site | only one dataset at a time; the server itself must serve the page, not a script finishing it in the browser |
| One file for the whole catalog | `data.json`, DCAT, a CSV table | taken with one command | grows with the catalog; becomes heavy for large catalogs |
| Paginated export | the same DCAT, with a link to the next page | works for a catalog of any size | all pages must be traversed; if the catalog changes during the traversal, records may be lost |
| Protocol | OAI-PMH, CSW, OGC API Records | selection by modification date | a separate request for each protocol |
| Registration in an external registry | metadata goes to DataCite together with the DOI | the dataset is found by its identifier, without crawling the site | only for datasets with a DOI |

Two decisions within these methods deserve separate discussion.

**A profile is enabled, not received "for free".** In ckanext-dcat the DCAT-AP 3 profile is enabled by default, while DCAT-US 3, HealthDCAT-AP and schema.org are separate profiles that the administrator names in the configuration. That is why a CKAN portal with the extension can serve DCAT and still fail its country's profile validator. The same applies to cloud services: an ArcGIS Hub site serves DCAT-US 1.1 and DCAT-AP 2.1.1 by default, while the DCAT-US 3.0 and DCAT-AP 3.0.0 feeds are enabled separately.

**The export and the page are different representations.** The same description can be requested in different file formats: Turtle, RDF/XML, JSON-LD. This is called content negotiation: the program specifies what it needs in the `Accept` header, or takes the address with the right extension. For a person it is invisible, for a harvester it matters. But the dataset page and the export file live separately. On 13 October 2026 a dataset page on data.gouv.fr contained no schema.org markup at all: the HTML had only a link to a Turtle file. The catalog serves DCAT, but a dataset search engine will not read its pages.

Another trap is a page drawn by a script. If the description and markup are loaded after the page opens, a robot that does not execute scripts sees an empty shell. The dataset page on data.europa.eu is built this way. More in the chapter [on discoverability](../07-publishing/05-discoverability.md).

## When it is needed and when not

| Situation | What is needed | What usually covers it |
|----------|-----------|----------------------|
| A portal harvested by the national portal or data.europa.eu | DCAT in the country's profile, without registration, at a stable address | the core of DKAN, udata, Huwise, Socrata, ArcGIS Hub; for CKAN, ckanext-dcat with the right profile |
| High-value datasets in the EU | the DCAT-AP HVD profile on top of DCAT-AP | a profile in ckanext-dcat, GeoNetwork formatters, feed configuration in Hub |
| A catalog that must be found through search | schema.org markup on every dataset page and a sitemap | the core of Dataverse, InvenioRDM, GeoNetwork, NADA; for CKAN, the same ckanext-dcat |
| A geoportal in the national infrastructure | ISO 19115 and CSW or OGC API Records; for an open data portal, also GeoDCAT-AP | the GeoNetwork core |
| A research repository | DataCite and OAI-PMH; schema.org for search | the core of Dataverse, InvenioRDM, DSpace |
| A microdata catalog | DDI for each survey; schema.org for search | the NADA core |
| An indicator catalog | SDMX for international partners | the .Stat Suite core; PxWeb has no full SDMX |
| A catalog for machine learning | Croissant | the core of Hugging Face, Kaggle, OpenML; for CKAN, a plugin in ckanext-dcat; for Dataverse, in the core since version 6.10 |
| A dozen datasets that nobody harvests | schema.org and one `data.json` file | a static site, JKAN |
| An internal showcase for your own staff | nothing | no export needed |

Almost everyone should add schema.org markup: it costs nothing on a standard platform and decides whether a dataset reaches dataset search. A full DCAT-AP profile is needed only by those who are actually harvested. For a catalog of a dozen datasets it is excessive, but a file with all descriptions is useful even there: an aggregator will pick up the catalog from it when its turn comes.

In brief, this is what a justification looks like using the [decision record](../06-choice/04-justifying-decisions.md) template:

- **Context.** A regional open data portal on CKAN 2.11. The national portal harvests regions via DCAT-AP 3, and staff ask "to make us visible in Google".
- **Options.** Install ckanext-dcat with the default profile; enable the DCAT-AP 3 profile and schema.org markup in it; write a custom JSON export "inspired by DCAT".
- **Criteria.** Which profile the national portal expects, whether datasets reach search, what maintenance costs when CKAN is upgraded.
- **Decision.** ckanext-dcat with the DCAT-AP 3 profile and the markup plugin. Do not write a custom export.
- **Why.** The extension is maintained by the CKAN team and tested on CKAN 2.10, 2.11 and 2.12. A custom JSON would have to be explained to each harvester separately, and the default profile may not match what the national portal expects.
- **When to revisit.** If the country adopts a national profile on top of DCAT-AP or if the portal moves away from CKAN.

## How it is done in platforms

The marks are core, extension, no, not checked, as in the [summary table](../12-appendices/03-platform-tables.md). Checked against documentation and live installations on 13 October 2026.

<div className="wide-table">

| Platform | DCAT | schema.org | Domain format | What is important to know |
|-----------|------|------------|-------------------|-----------------|
| CKAN 2.10–2.12 | extension ckanext-dcat: DCAT-AP 2 and 3, DCAT-US 3, HealthDCAT-AP | extension: the structured data plugin in the same ckanext-dcat | the ckanext-dcat extension serves Croissant; CSW is the ckanext-spatial extension, only for harvested records | DCAT-AP 3 profile by default; paginated export with selection by date |
| DKAN | core: a `data.json` file | not checked | no | the core schema is DCAT-US 1.1; live installations on the new DKAN also serve DCAT-US 3.0 |
| udata | core: paginated DCAT and a file per dataset | no: the page HTML has no markup, only a link to a file | no | a nightly CSV export of the whole catalog is a separate core task |
| Huwise (OpenDataSoft) | core: the catalog as one file in RDF, Turtle and DCAT | core, but the administrator enables it: opendata.paris.fr has markup, data.economie.gouv.fr does not | no | some installations have a national profile: on data.bs.ch it is DCAT-AP-CH |
| Socrata | core: `data.json` as one file | core: JSON-LD on the dataset page | no | the markup on data.cityofnewyork.us contains the licence, publisher and list of files |
| ArcGIS Hub | core: DCAT-US 1.1 and DCAT-AP 2.1.1; DCAT-US 3.0 and DCAT-AP 3.0.0 enabled separately | no: the opendata.dc.gov dataset page has no markup | core: OGC API Records | the feed includes all site content, not only datasets |
| Piveau | core: DCAT in several formats, SPARQL | no: the dataset page on data.europa.eu is drawn by a script, the HTML has no markup | core: SPARQL | on data.europa.eu a dataset description in Turtle opens at an API address |
| Dataverse 6.x | not in the core; DCAT 3 is a third-party exporter for Dataverse 6 | core: since version 6.10 a short Croissant markup is embedded in the page, the earlier schema.org remains in the export | core: OAI-PMH, DataCite, DDI, Dublin Core | Croissant was built into the core in version 6.10; earlier it was a separate exporter |
| InvenioRDM v14, Zenodo | core: a record in DCAT via the `Accept` header | core: JSON-LD on the record page | core: OAI-PMH, DataCite, Dublin Core, MARCXML | there is no single file with all descriptions, only the protocol |
| DSpace 7 and later | no | no | core: OAI-PMH and Dublin Core | the DSpace@MIT dataset page responds to programs with a check, so the markup there could not be verified |
| GeoNetwork 4.4 | core: DCAT, DCAT-AP and GeoDCAT-AP via CSW and separate formatters | core: schema.org JSON-LD on the record page; Croissant fields are in the branch of the upcoming 4.4.13 | core: ISO 19115 and CSW; OGC API Records is a separate service | the EEA catalog lists DCAT, DCAT-AP HVD and mobilityDCAT-AP among its CSW formats |
| GeoNode 5.1 | no: the catalog serves an API and CSW, but not DCAT | no: the catalog page is a shell, the HTML has no markup | core: CSW and ISO 19115, pycsw inside; sitemap in the core | some older installations have a `data.json` file, but it is not a GeoNode 5 core export |
| NADA | no | core: JSON-LD on the study page | core: DDI Codebook for each study; no OAI-PMH | the World Bank Microdata Library markup has no list of files and no licence |
| PxWeb | no | no | core: table descriptions in JSON-stat; SDMX-ML 2.0 only in the old API | PxWebApi 2 has no SDMX format |
| JKAN | core: a `data.json` file declaring the DCAT-US 1.1 schema | no: the page template adds no schema.org markup; the page has RDFa `dcat:Dataset` | no | the template outputs a fixed list of fields; on 14 October 2026 opendata.scot served six, without the publisher |
| A hand-made static site | no: the author puts the file in place | no: the author writes the block in the template | no | the book provides a ready-made markup template |

</div>

Three rows in the table contradict what is usually said about the platforms.

**GeoNode does not serve DCAT.** Its catalog is pycsw: CSW responds with ISO 19115 records, Dublin Core and several other formats, and DCAT is not among them. This is how live GeoNode installations in Nicaragua and Bolivia responded on 13 October 2026. The `data.json` file that the registry finds at some GeoNode installations does not belong to the version 5.1 core: there is no such address in its code, and the file that opened contained its own list of fields, not a DCAT-US catalog.

**udata does not mark up pages.** data.gouv.fr on udata 17.12.1 serves a dataset description as a Turtle file, but the page HTML has no schema.org block. The catalog is open to a harvester, but not to Google Dataset Search.

**Dataverse's markup has changed.** Up to version 6.10, schema.org was embedded in the page, and it can be brought back by configuration. Since version 6.10 a short Croissant markup has taken its place: without the list of files, but Google asks for it so that a dataset appears in the "Croissant supported" filter. The full markup with the list of files is still served through the export.

### What the registry shows

According to the dataportals-registry export (release 1.27.0 of 15 October 2026), at least one standard way of serving descriptions (DCAT, OAI-PMH, CSW, OGC API Records, SDMX or STAC) is recorded for 9,330 of 43,614 catalogs, or 21%. A DCAT export exists for 5,233. Of these, 3,152 serve both DCAT-US and DCAT-AP: mostly ArcGIS Hub sites, where both feeds are enabled by default.

The registry hardly records schema.org markup (there are 38 such addresses in it), so its share cannot be calculated from the registry. It can only be seen on the page itself.

The share depends on the platform more than on the owner's wishes. Among open data portals DCAT is marked for 239 of 245 on Socrata, 348 of 454 on Huwise, 103 of 161 on DKAN and 633 of 1,906 on CKAN. Among custom builds, 24 of 1,144. A third of CKAN portals install the ckanext-dcat extension, although without it the catalog is not harvested. The queries are in the [appendix on the registry](../12-appendices/02-using-the-registry.md#metadata-export).

### Extensions and their risks

CKAN has no description export in its core. All the work is done by ckanext-dcat. It is maintained by the CKAN team, under the AGPL licence; the latest release is 2.4.4 of 11 August 2026. The documentation declares support for CKAN 2.10 and 2.11, and automated tests also run on 2.12. Until support for 2.12 is announced, check the extension's behaviour on that version on your own test instance. The method for evaluating an extension is in the chapter [on extension ecosystems](../05-platforms/02-extension-ecosystems.md).

There are several plugins inside the one extension, and each is enabled separately:

- **dcat** serves the catalog in RDF and reads other people's exports;
- **structured_data** adds schema.org markup to the dataset page. Without it there is DCAT, but a search engine cannot see the catalog;
- **croissant** serves a description for machine learning. In 2026 platforms serve Croissant 1.0, although version 1.1 has come out.

The default profile is DCAT-AP 3. Next to it are the DCAT-AP 2, DCAT-US 3, HealthDCAT-AP and schema.org profiles. A national profile is written as your own plugin on top of a ready-made one: this is how DCAT-AP_IT works. The risk here is not that the extension is abandoned, but in configuration. A portal with the extension installed "to tick a box" serves the default profile and fails the check of its national portal.

A separate extension, ckanext-spatial, provides CSW through pycsw, but only for records harvested from other geoportals, not for the whole CKAN catalog.

In Dataverse, DCAT export is also an extension, and a younger one. The DCAT 3 exporter from the GDCC community, release 0.8.7 of 31 August 2026, produces DCAT 3 and the Dutch DCAT-AP-NL 3.0 profile. It is designed for Dataverse 6, works best on 6.2 and later, and is itself marked as a prototype. It is worth installing for those who already know which profile is expected of them.

## How it breaks: the file opens, but the profile is wrong

A check on 13 October 2026. Three exports were run through the European Commission's SHACL validator, DCAT-AP 3.0.1 profile, base rules level.

**data.europa.eu, a dataset on air quality in Bristol.** The Turtle export passed without errors. This is expected: the portal itself harvests descriptions according to DCAT-AP and serves them itself. But the dataset page in a browser without scripts is empty, and it has no schema.org markup. The catalog is exemplarily open to a harvester and closed to a search engine that reads only HTML.

**data.gov.gr, a series of weather station observations.** A catalog on CKAN 2.11.3 with ckanext-dcat, DCAT-AP 3 profile; the description includes both the high-value dataset flag and a link to the regulation. The validator found two errors. The file format is written as the text "CSV", while the profile expects a link to a type from a vocabulary. The file checksum has no algorithm specified. The page itself is marked up: the HTML has a schema.org block. The export and markup are done, but the profile formally fails because of two fields.

**data.gouv.fr, a dataset on subsidies.** The Turtle file opens, but the validator flags the format "xls" written as text. A full check adds the publisher and update frequency: they are written as links that are not declared as objects of the required type. The page HTML has no markup at all.

Four more failures are common.

- **The default profile.** The extension is enabled but serves DCAT-AP 2 where DCAT-AP 3 is expected, or DCAT-US 1.1 where 3.0 is already accepted.
- **An export without a page.** A harvester takes the catalog, a search engine does not. udata and ArcGIS Hub work this way.
- **A page without an export.** There is markup, but no file with all descriptions. A search engine will find the datasets, the national portal will not.
- **Foreign items in the export.** The ArcGIS Hub feed describes all site content: on opendata.dc.gov it has 1,871 records, of which search counts 1,476 as datasets. A harvester that trusts the feed will publish maps and applications as datasets.

## Publishing without a portal

Without a portal, descriptions do not appear by themselves: the author puts them in place. Two files are enough.

**Markup on the dataset page.** A JSON-LD block with the schema.org vocabulary: title, description, creator, publisher, date, licence and list of files. A ready-made [template](pathname:///templates/schema-dataset.jsonld) is included in the book. It is inserted into the page template once and filled in from the dataset fields.

**A file with all descriptions.** For a small catalog this is `data.json` following the DCAT-US 1.1 schema: both data.gov harvesters and aggregators understand it. JKAN builds such a file from the pages automatically, but the template fills in a short list of fields and does not cover the schema's mandatory fields. Check the file before handing it to a harvester; see the chapter [on static sites](../08-beyond-portals/02-static-sites.md#jkan). On your own static site it is built by a script at each build, otherwise it will be out of date the day the second dataset is published.

If a dataset is archived in Zenodo, its DataCite description goes there together with the DOI, and a separate DCAT file is not needed for that dataset. How to set up the page and register in a catalog is covered in the chapter ["Making a Publication Findable"](../08-beyond-portals/05-making-it-findable.md).

## How to check a live portal

A manual check means four questions to a live catalog:

1. Open a dataset page and find an `application/ld+json` block with the Dataset type in the source code. Or paste the page address into [Google's Rich Results Test](https://search.google.com/test/rich-results).
2. Find the file with all descriptions and see which profile it declares. In DCAT-US this is the `conformsTo` field.
3. Compare the numbers. The export should contain as many datasets as the search on the website.
4. Run the file through the validator for the required profile. For DCAT-AP this is the [European Commission's SHACL validator](https://www.itb.ec.europa.eu/shacl/dcat-ap/upload): use the base rules check for the version your harvester expects, currently `dcatap.3_0_1_base`.

### Commands

Substitute the portal address and the address of one dataset page. The commands check the markup, typical export addresses and the declared profile.

```bash
PORTAL=https://data.gov.gr
PAGE=https://data.gov.gr/dataset/emy-station-189

# schema.org markup on the dataset page
curl -sL "$PAGE" | grep -o '"@type": *"Dataset"' | head -1

# File with all descriptions: paginated DCAT and data.json
curl -sI "$PORTAL/catalog.ttl" | head -1
curl -sI "$PORTAL/data.json" | head -1

# Which profile the file declares
curl -s "$PORTAL/data.json" | head -c 400
```

Next, addresses for specific platforms, checked on 13 October 2026:

```bash
# CKAN with ckanext-dcat: one dataset description in Turtle and the number of datasets in the export
curl -sL "https://data.gov.gr/dataset/emy-station-189.ttl" | head -20
curl -s "https://data.gov.gr/catalog.ttl" | grep -E "hydra:(totalItems|lastPage)"

# udata: a Turtle file per dataset and the overall export
curl -sI "https://www.data.gouv.fr/api/1/datasets/dataset-slug/rdf.ttl" | head -1

# Huwise: the whole catalog as one file
curl -sI "https://opendata.paris.fr/api/explore/v2.1/catalog/exports/dcat" | head -1

# ArcGIS Hub: which feed is enabled and how many records it has
for V in dcat-us/1.1 dcat-us/3.0 dcat-ap/2.1.1 dcat-ap/3.0.0; do
  echo -n "$V "; curl -s "https://opendata.dc.gov/api/feed/$V.json" | jq '.dataset | length'
done

# InvenioRDM: one record in DCAT and in schema.org
curl -s -H "Accept: application/dcat+xml" "https://data.caltech.edu/api/records/record-id" | head
curl -s -H "Accept: application/ld+json" "https://data.caltech.edu/api/records/record-id" | head

# GeoNetwork 4.4: which formats CSW serves
curl -s "https://sdi.eea.europa.eu/catalogue/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities" \
  | grep -o 'dcat[^<]*'

# Research repository: OAI-PMH
curl -s "https://dataverse.harvard.edu/oai?verb=Identify" | grep repositoryName

# Dataverse: embedded Croissant markup and the list of export formats
curl -s "https://borealisdata.ca/api/info/exportFormats"
```

A good result: a Dataset block in the HTML, the export file opens without login, it declares the required profile, and the validator finds no base-level errors. A bad one: the address responds, but the profile is old, formats are written as text instead of vocabulary links, and the dataset page has no markup. The summary list is in the [checklists](../12-appendices/04-checklists.md#checking-a-live-portal).

## What follows from this

- First find out who will take your descriptions and which profile they expect. An export "in DCAT in general" does not meet this requirement.
- Provide both an export and markup. The first feeds a harvester, the second a search engine, and platforms cover them separately.
- Check the export with a validator for the right profile version, not just by the server response. A file format written as text instead of a vocabulary link is a typical reason for rejection.
- On CKAN all this is done by one extension, ckanext-dcat, but the profile and markup must be enabled explicitly. Without configuration the extension serves the default profile.
- If you are writing the catalog yourself, include in the specification both an export file in the country's profile and a schema.org block in the page template. Neither will appear by itself.

## Sources

- [DCAT 3, W3C Recommendation](https://www.w3.org/TR/vocab-dcat-3/)
- [DCAT-AP 3.0.1](https://semiceu.github.io/DCAT-AP/releases/3.0.1/), SEMIC recommendation of 27 October 2025; [draft 3.0.2](https://semiceu.github.io/DCAT-AP/drafts/3.0.2/) of 17 June 2026; the [GeoDCAT-AP](https://semiceu.github.io/GeoDCAT-AP/), [StatDCAT-AP](https://semiceu.github.io/StatDCAT-AP/), [DCAT-AP HVD](https://semiceu.github.io/DCAT-AP/releases/3.0.0-hvd/) profiles
- [DCAT-US 3.0](https://resources.data.gov/resources/dcat-us/) and the [DCAT-US 1.1](https://project-open-data.cio.gov/v1.1/schema/) schema
- [Dataset markup in Google's documentation](https://developers.google.com/search/docs/appearance/structured-data/dataset): schema.org and DCAT, mandatory fields, the Croissant filter
- [ckanext-dcat documentation](https://docs.ckan.org/projects/ckanext-dcat/en/latest/): [profiles](https://docs.ckan.org/projects/ckanext-dcat/en/latest/profiles/), [markup for Google Dataset Search](https://docs.ckan.org/projects/ckanext-dcat/en/latest/google-dataset-search/), release 2.4.4 of 11 August 2026; [ckanext-spatial: CSW](https://docs.ckan.org/projects/ckanext-spatial/en/latest/csw/)
- [Dataverse metadata export](https://guides.dataverse.org/en/latest/admin/metadataexport.html), [discoverability and Croissant](https://guides.dataverse.org/en/latest/admin/discoverability.html), built in since version 6.10; [the GDCC DCAT 3 exporter](https://github.com/gdcc/exporter-dcat3), release 0.8.7 of 31 August 2026
- [InvenioRDM record serializers](https://github.com/inveniosoftware/invenio-rdm-records/blob/master/invenio_rdm_records/resources/config.py): DCAT, DataCite, Dublin Core, schema.org
- [GeoNetwork 4.4 and search engines](https://docs.geonetwork-opensource.org/4.4/tutorials/introduction/extra/): JSON-LD schema.org with Croissant; [DCAT formats in GeoNetwork 4.4](https://docs.geonetwork-opensource.org/4.4/api/rdf-dcat/)
- [The pycsw catalog in GeoNode's code](https://github.com/GeoNode/geonode/blob/master/geonode/catalogue/backends/pycsw_local.py) and [pycsw output formats](https://docs.pycsw.org/en/latest/configuration.html)
- ArcGIS Hub: [catalog feeds](https://doc.esri.com/en/arcgis-hub/latest/build/federate-data.html); DCAT-US 3.0 and DCAT-AP 3.0.0 feeds on opendata.dc.gov, checked 13 October 2026
- [The European Commission's DCAT-AP SHACL validator](https://www.itb.ec.europa.eu/shacl/dcat-ap/upload): validation types for DCAT-AP 3.0.1, 3.0.0, 2.1.1 and DCAT-AP HVD
- Live checks on 13 October 2026: data.gov.gr (CKAN 2.11.3, dataset emy-station-189), data.gouv.fr (udata 17.12.1), opendata.paris.fr, data.economie.gouv.fr and data.bs.ch (Huwise), data.cityofnewyork.us (Socrata), opendata.dc.gov (ArcGIS Hub), data.europa.eu (a dataset on air quality in Bristol), the EEA catalog (GeoNetwork 4.4), the Ifremer Sextant catalog (GeoNetwork 4.4.13), GeoNode in Nicaragua and Bolivia, the World Bank Microdata Library (NADA), Borealis (Dataverse 6.8.4), CaltechDATA (InvenioRDM), opendata.scot (JKAN), the DCAT export of an IPT installation in New Zealand
- I. Begtin, [Why data on Russia is so hard to find](https://begtin.substack.com/p/816) (in Russian), November 2024, and [Dataset search engines as global data discovery systems](https://begtin.substack.com/p/25) (in Russian), May 2022: which portals reach dataset search and why
- Prevalence of exports: a query to the dataportals-registry export, release 1.27.0 of 15 October 2026. The queries are given in the [appendix](../12-appendices/02-using-the-registry.md#metadata-export)
- [Metadata Standards](../07-publishing/02-metadata-standards.md), [Discoverability](../07-publishing/05-discoverability.md), [Metadata Depth](./03-metadata-depth.md)
