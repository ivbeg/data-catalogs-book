---
title: What Innovative Catalogs Can Already Do
description: "Nine capabilities that are not in the core of mass-market platforms, from an API for every file to readiness for AI agents. Which can be ordered, which installed in-house, and which are still only someone else's service."
---

# What Innovative Catalogs Can Already Do

Innovative catalogs differ not in platform but in shortening the path from a record to an answer. Some turn a file into an API by themselves. Others issue a DOI for a query, keep table versions like code, check a dataset before publication or compute on their side. Almost none of this is yet in the core of CKAN, ArcGIS Hub, Huwise, Socrata, Dataverse, DSpace or GeoNetwork. Some can be installed next to your portal: the code is open. Some are for now available only as someone else's service. That determines what from this chapter to put in a technical specification.

Below are nine such capabilities. For each there are one or two catalogs where it is most visible, and answers to three questions: how to replicate it, when it is not needed, and how to check it with a request.

The catalogs were selected by four criteria:

- the capability is not in the core of mass-market platforms: something switched on in settings is no longer an innovation;
- it works publicly and can be checked with a request without a login;
- the idea can be replicated: there is open code, a standard or at least a documented convention;
- its status is clear. Beta, a single operator or a promise to keep for five years are part of the description, not a footnote.

<div className="wide-table">

| Capability | Where it is most visible | How to replicate it | When it is not needed |
|-------------|-----------------------|----------------------|----------------|
| An API for every tabular file | data.gouv.fr, Hugging Face, Datasette | the open api-tabular service, Datasette; in CKAN, DataStore with a loader | there are few files, they are small and are downloaded in full |
| Identifiers for objects inside the data | Overture Maps, OpenSanctions | identifier rules in a register, crosswalk tables | the dataset is not linked to anything |
| A DOI for a query | GBIF; more simply, Our World in Data, CELLxGENE Census | a DataCite DOI for a saved query; an address convention | the data is not cited |
| Table versions as in Git | DoltHub, OpenNeuro | Dolt and DoltLab, DataLad | one person edits the table once a year |
| Standard-based checks on entry | OpenNeuro, DANDI | a schema and a validator on upload | the field has no shared standard |
| Processing next to the data | Copernicus Data Space Ecosystem, Climate Data Store, ERDDAP | ERDDAP, an openEO server | the data fits in an ordinary file |
| Combining many sources | Data Commons, HDX HAPI, OpenSanctions | Data Commons open code, yente | a single organisation's catalog |
| Tiered access | microdata.no, Redivis | in-house development or someone else's service | the data is fully open |
| Readiness for AI agents | data.gouv.fr, the World Bank's Data360 | an MCP server provided by the platform | there are no licences and no full dump |

</div>

## Where the series begins: Source Cooperative

What is new in Source Cooperative is not the storage but the fact that the catalog hardly stands between the reader and the data. A product is a folder in object storage with a README description. Files in cloud-native formats are read in parts directly over the network. In the dataportals-registry, the platform has a STAC interface recorded: a protocol for describing spatial files. Its strengths and weaknesses (beta, publishing by application, no DOIs or versions) are covered in the chapter [on cloud storage and hubs](../08-beyond-portals/04-cloud-storage-and-hubs.md). The next two sections develop the same idea. In Overture Maps, objects inside the data have persistent identifiers. On Hugging Face a query can be run against a file straight away.

## An API for every tabular file

Usually, between "download the file" and "get an API" lies the publisher's work: load the table into a database, describe the columns, maintain the loader. Innovative catalogs do this themselves.

**data.gouv.fr.** The French portal's tabular API (still in beta) picks up every tabular file by itself within a few minutes of publication. The size limit is 100 MB for CSV, 50 MB for XLS and Parquet, 12.5 MB for XLSX. Each file has three addresses. The profile shows column types and recognised formats (for example, an INSEE commune code or a latitude), frequent values and the number of missing values. The data is served page by page, with filters and sorting. A Swagger description of the queries is built for each file separately. The limit is 100 requests per second. The service page lists 31,768 datasets linked to it. The service code is open under the MIT licence and can be installed next to your own portal.

**Hugging Face.** The platform itself converts datasets in supported formats to Parquet and builds a viewer, search, filters and statistics on them. The SQL console runs entirely in the browser on DuckDB. A query can be shared as a link, and the result exported to Parquet or CSV. This shifts the boundary the book draws in the section [on preview](../04-features/10-other-capabilities.md#preview): a preview cannot be cited, while a link to a query is already reproducible. It still does not become a persistent link. The dataset may be updated, and the same query will return different rows.

**Datasette** is the same principle on a small scale. Every page has a JSON version, filters are written in the address, and there is full-text search and arbitrary SQL. The registry has 45 entries on Datasette, 44 of them active. How to publish a small dataset on it is in the chapter [on static sites](../08-beyond-portals/02-static-sites.md).

**How to replicate it.** In CKAN the same result comes from DataStore and the XLoader extension, but the row limit and the loader remain your responsibility. More in the chapters [on access interfaces](../04-features/04-access-interfaces.md) and [on storage](../04-features/05-data-storage.md#a-table-in-a-database).

**When it is not needed.** If there are a dozen files and they are downloaded in full, an API adds nothing. Limitations must be stated honestly. Large files remain just files. A beta may change addresses. An API over someone else's CSV inherits all of that CSV's errors: wrong encoding, extra rows above the header, text in a numeric column.

## Identifiers for objects inside the data

The book covers a dataset DOI in detail. But an identifier can also belong to an individual row. This changes how data is linked together.

**Overture Maps.** Every building, road, place and administrative unit in Overture's monthly release has a persistent identifier in the GERS system. Alongside are kept an identifier register with dates of first and last appearance, a change log for each object and crosswalk tables with the identifiers of the original sources. Overture explains why this is needed. A traffic data provider can publish only the traffic, without the roads themselves, and an indicator provider only the indicators, without boundaries. They are joined by identifier, without matching geometries.

There is an honest lesson here too. In release 2025-06-25.0 Overture replaced its old identifiers, which encoded an H3 grid cell and a theme, with random UUIDs. The old identifiers can no longer be found. An identifier with meaning built into it costs more than it seems: the meaning changes, while links to the old number remain.

**OpenSanctions** shows the same idea for people and companies. An entity is assembled from many lists, and after deduplication it has one canonical identifier. If it matched a Wikidata entry, the Wikidata number becomes the identifier.

**How to replicate it.** Register rules: an identifier by rules, not a row number; records are not deleted but given a status; a crosswalk table with old numbers. They are already listed in the chapter [on identifiers](../04-features/06-identifiers-and-doi.md#registers-and-reference-lists).

**When it is not needed.** A dataset nobody links to others (an annual report, a one-off survey) can make do with a dataset identifier.

## A DOI for a query

A DOI is usually issued for a dataset. Innovative catalogs issue it for a query.

**GBIF.** Every occurrence download has a DOI. The download page keeps the list of source datasets and all the selection conditions. On 15 October 2026 the iNaturalist observations dataset was part of 2,623,241 downloads, each with its own DOI. If a researcher then filtered the data, combined it from several downloads or computed in the cloud, they register a derived dataset with a list of sources and also get a DOI. GBIF's monthly snapshots in the Microsoft, Amazon and Google clouds have DOIs. GBIF tracks where these DOIs are cited. Citing a download is covered in the chapter [on citation](../04-features/07-citation.md#citing-changing-data). What is new here is not that a DOI exists, but that the query becomes the object of publication.

Alongside are two simpler solutions.

**Our World in Data** lets you append `.csv`, `.metadata.json` or `.zip` to the address of any chart and get the data, a description and a README. The description has a ready source line for citation. This is an address convention; it can be adopted without any software.

**CELLxGENE Census** publishes single-cell sequencing data as one object from which slices are taken by cell and gene. Long-term support releases are promised every six months, each kept for at least five years. There is a link generator for any slice. A promise to keep a release for a named period is a good model for the chapter [on archiving](../09-practices/04-archiving.md). The status, however, is checked: on 15 October 2026 the release file named 2025-11-08 as the stable release and 2025-11-17 as the latest.

**How to replicate it.** A DOI for a saved query is issued through DataCite in the same way as for a dataset. What is needed is the saved query text, a date and a list of sources. The general scheme is described in the Research Data Alliance recommendations on citing dynamic data.

**When it is not needed.** If the data is not cited in published work, an access date and an archive of past dumps are enough.

## Table versions as in Git

**Dolt** is an SQL database compatible with MySQL. It can be cloned, branched, merged and pushed just like a Git repository. **DoltHub** hosts public databases for free. A data change goes through a pull request with review: the reviewer sees the difference by rows and cells, not by file. DoltLab is the same platform for self-hosting. It is an option between a Git repository and a portal: edit history as in Git, but for a table that no longer fits in a 2 MB CSV. More in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md#versions-of-a-table-not-a-file).

**OpenNeuro** is the same idea in a research archive. Every dataset snapshot is a version with its own Git hash and DOI. A dataset can be taken from S3, via DataLad or directly from Git. DataLad is a program that keeps large datasets as Git repositories: history and description in Git, the files themselves separately. The registry has 10 installations on DataLad.

**When it is not needed and what it risks.** A table edited once a year by one person is easier to keep in ordinary Git. A platform with a single operator may close: in 2022 the QRI catalog, built on the same idea, closed this way; the story is in the chapter [on cloud storage and hubs](../08-beyond-portals/04-cloud-storage-and-hubs.md#what-this-risks). So the decision record needs an answer to how to retrieve the database and its edit history.

## Standard-based checks on entry

The book's part on quality measures it after publication. Neuroscience data archives check it before publication.

**OpenNeuro** accepts only datasets following the BIDS standard, the shared order of folders, file names and descriptions for neuroimaging. On upload a validator checks the dataset. Upload is possible with warnings, but not with errors. The terms are strict: images are anonymised, and the licence is CC0 immediately or 36 months after the first snapshot.

**DANDI** is a neurophysiology archive on the NWB standard. The publish button becomes active only after all errors in the check of the dataset description and files have been fixed. A published version does not change and is cited by number. A limitation is stated honestly: datasets with Zarr files cannot yet be published. The registry has three DANDI installations.

Here quality is a condition of entry, not an indicator on a dashboard. It works where a field has a shared standard. For a city portal the analogue is checking a table on upload against a schema from the [schema.data.gouv.fr](https://schema.data.gouv.fr) catalog. How to fit this into quality levels is in the chapter [on quality levels](../10-quality/01-quality-levels.md#checking-on-entry).

**When it is not needed.** If there is no shared standard, a check on entry turns into one portal's list of rules. Publishers get around it with empty fields.

## Processing next to the data

Here the catalog serves not a file but the needed piece of data or the result of a calculation.

**Copernicus Data Space Ecosystem** offers S3, STAC, openEO and Sentinel Hub for the same satellite data. openEO is an open protocol by which a user sends the server a chain of operations on imagery: cut out an area, calculate a vegetation index, average by month. The server computes, the user receives the result. There is a federation with partner platforms and a separate access point without it. The limits of the free tier are stated plainly: two synchronous requests and two batch jobs at a time, tested on areas up to 100×100 km at 10 m resolution. The registry has 12 entries with openEO in the address, three of them for Copernicus Data Space Ecosystem.

**Climate Data Store** takes a simpler approach, and one aimed at people. The user assembles a selection in a form on the dataset page, and a "Show API request code" button produces ready Python request code. The terms of use are accepted manually on the dataset page, once.

**ERDDAP** is a reminder that an innovation need not be new. The whole request, including a selection by space and time in ordinary units, fits in the address. The response format is chosen on the fly: CSV, JSON, NetCDF, MATLAB, KML, PNG. There is a subscription to dataset changes. The registry has 175 entries on ERDDAP, 174 of them active. That is more than any other solution in this chapter.

**When it is not needed and what it risks.** If the data fits in an ordinary file, server-side computation is not needed. Computation is the most expensive part and is the first to be closed: in 2024 Microsoft closed the Planetary Computer Hub, while the catalog remained. So the catalog and computation are described in requirements as separate items. Losing the second must not mean losing the first.

## Combining many sources

An ordinary catalog knows files. These catalogs know variables, places and entities, and answer a question across all sources at once.

**Data Commons** gathers statistics from many organisations into a knowledge graph: one database where every variable and every place has its own identifier and the links between them are recorded explicitly. Data is served through REST, SDMX 3.0, BigQuery, embeddable components and an MCP server. "Your own Data Commons" can be deployed from the open code.

**HDX HAPI** is especially useful to a reader with CKAN. The humanitarian portal HDX runs on CKAN, and the CKAN API serves only descriptions. HAPI adds on top indicator values from many sources, brought into a single form: population, food security, funding. They are updated daily; the numbers themselves are not altered. It is a layer on top of an existing portal without changing the platform.

**OpenSanctions** stores each value as a separate statement: from which source, which property, when it was first and last seen, and with which canonical identifier the entity was merged after deduplication. The statements table is exported every night. This is provenance at the level of a value, not a dataset. The yente search and matching service is open under MIT. The data itself is free only for non-commercial use.

Alongside are DBnomics, already described in the book (one API to many statistics providers, with the original codes preserved), and IPUMS (an extract builder and a single API for all microdata collections). More in the chapters [on indicator catalogs](../03-types/05-indicator-catalogs.md) and [on microdata catalogs](../03-types/06-microdata-catalogs.md). In **Aleph** a user uploads their own list of people or companies, and the system matches it against hundreds of datasets they have access to. A worrying sign: the last commit to Aleph's main repository was on 20 February 2026.

**When it is not needed.** A single organisation's catalog has nothing to combine. Combining is needed by an aggregator and by whoever answers questions across many sources at once.

## Tiered access

**microdata.no** is the strongest example. Staff and students of approved universities, research organisations and ministries work with Norwegian register data without an application and without a project described in advance. They do not see records. The data does not leave secure storage, and results are anonymised on the fly.

**Redivis** divides access to a dataset into five tiers: the dataset is invisible, the description is visible, the variables and summary statistics are visible, a sample is available, all data is available. Each tier can be opened to everyone, to specific people or after conditions are met. The registry has 13 entries on Redivis and 27 catalogs with a GA4GH DRS interface, a standard for serving biomedical data files according to access rights.

Tiered access is a catalog function. The description and statistics are open to everyone, the data is issued by tier. For a reader with sensitive data this gives an option between "open everything" and "show nothing". How access levels work on mass-market platforms is in the chapters [on access and roles](../04-features/08-access-control-and-workflow.md) and [on microdata catalogs](../03-types/06-microdata-catalogs.md#access-levels).

**When it is not needed.** If the data is fully open, tiers only hide the description behind an extra step.

## Readiness for AI agents

An AI agent is a program built on a large language model that itself searches for a dataset, reads the description and takes the data. An MCP server gives such an agent a ready list of queries to the catalog. This is covered in detail in the chapter [on AI and data spaces](./01-ai-and-data-spaces.md#an-mcp-server-your-own-the-platforms-someone-elses). Here is what already counts as cutting-edge in this area.

Platforms themselves now provide the server, but almost nobody yet switches it on by default. Huwise has a server, but it is not included in the plan, and every request needs an API key. Each organisation in the PortalJS cloud has its own server address, and its code is open. data.gouv.fr runs its own server read-only and without a key. The best example of design is the World Bank's Data360 server. Besides tools, it gives the agent mandatory instructions, code lists and a check of whether a series exists for the country in question, before data is requested. Data Commons distributes agent instructions the same way, as resources of its server. This is a new layer of description: instructions on the data for a program, which also need to be maintained.

**When it is not needed.** While datasets have no licences and no full dump, the server just serves empty records faster. You install it yourself only after that. If the platform provides the server, it is switched on read-only, without a key for open datasets and on top of the same public API.

## What not to single out as an innovation

A chat in place of the catalog and search by phrase are already covered in the chapter [on AI](./01-ai-and-data-spaces.md), along with the "model instead of data" risk. data.europa.eu's machine translation of records into the 24 EU languages is in the chapter [on other capabilities](../04-features/10-other-capabilities.md#multiple-languages). The open code of the Malaysian statistics showcase OpenDOSM and data.gov.my is in the chapter [on indicator catalogs](../03-types/05-indicator-catalogs.md). Small static "data as code" portals on Datadex are represented in the registry by three entries, none of which has an API recorded. This is still an experiment.

## How to check

The commands require no login. The expected answers were obtained on 15 October 2026.

```bash
# data.gouv.fr: profile, rows and Swagger description for one CSV.
# RID is the file identifier from the dataset record
RID=571a3021-0e10-471c-98b8-72bcab5daca8
curl -s "https://tabular-api.data.gouv.fr/api/resources/$RID/profile/"
curl -s "https://tabular-api.data.gouv.fr/api/resources/$RID/data/?page_size=2&commune__exact=Cessy"
curl -s -o /dev/null -w "%{http_code}\n" "https://tabular-api.data.gouv.fr/api/resources/$RID/swagger/"

# Hugging Face: ready Parquet files and what is enabled for the dataset
curl -s "https://datasets-server.huggingface.co/parquet?dataset=nyu-mll/glue"
curl -s "https://datasets-server.huggingface.co/is-valid?dataset=nyu-mll/glue"

# Overture Maps: release catalog in STAC
curl -s "https://stac.overturemaps.org/catalog.json"

# GBIF: how many DOI-bearing downloads include the iNaturalist dataset
curl -s "https://api.gbif.org/v1/occurrence/download/dataset/50c9509d-22c7-4a22-a47d-8c48425ef4a7?limit=1"

# Our World in Data: a chart's data and description via the address convention
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" "https://ourworldindata.org/grapher/life-expectancy.csv"
curl -s "https://ourworldindata.org/grapher/life-expectancy.metadata.json"

# CELLxGENE Census: releases and the long-term support flag
curl -s "https://census.cellxgene.cziscience.com/cellxgene-census/v1/release.json"

# DoltHub: SQL against a database's edit history
curl -s "https://www.dolthub.com/api/v1alpha1/dolthub/ip-to-country/master?q=SELECT%20commit_hash%2C%20committer%2C%20date%20FROM%20dolt_log%20LIMIT%202"

# OpenNeuro: a dataset's latest snapshot
curl -s https://openneuro.org/crn/graphql -H 'content-type: application/json' \
  -d '{"query":"{ dataset(id:\"ds000001\"){ latestSnapshot { tag created } } }"}'

# DANDI: dataset versions and the draft validation result
curl -s "https://api.dandiarchive.org/api/dandisets/000003/versions/?page_size=3"

# Copernicus Data Space Ecosystem: openEO server
curl -s "https://openeo.dataspace.copernicus.eu/openeo/1.2/"

# HDX HAPI: an application key is issued immediately, without registration
curl -s "https://hapi.humdata.org/api/v2/encode_app_identifier?application=book&email=book%40example.org"

# OpenSanctions: when the main dataset was updated
curl -s "https://data.opensanctions.org/datasets/latest/index.json"
```

What the answers contained:

- data.gouv.fr: the profile recognised latitude and longitude in the `lat` and `lon` columns (`latitude_wgs`, `longitude_wgs`), the filter returned the row for the commune of Cessy, and the Swagger description answered with code 200. The file is taken from a dataset on the availability of hearing-aid specialists by commune. If the dataset is withdrawn, substitute the identifier of any CSV up to 100 MB;
- Hugging Face: Parquet file addresses in the `refs/convert/parquet` branch; the dataset has the viewer, search, filters and statistics enabled;
- Overture: a release catalog on STAC 1.1.0, with releases including 2026-08-19.0 and 2026-09-23.0;
- GBIF: `count` is 2,623,241, and the first download in the response has its own DOI, licence and selection conditions;
- Our World in Data: a CSV file with code 200, and a source line in the description: "Riley (2005); Zijdeman et al. (2015); HMD (2025); UN WPP (2024)";
- CELLxGENE Census: `"stable": "2025-11-08"`, `"latest": "2025-11-17"`, with long-term support releases flagged `"lts": true` and `"do_not_delete": true`;
- DoltHub: `"query_execution_status":"Success"`. This database's branch is called `master`; an address with `main` returns "branch not found";
- OpenNeuro: `ds000001` has snapshot `1.0.0` of 14 May 2020;
- DANDI: `count` is 5, and the first version in the list is the `draft` with status `Valid`;
- openEO: `api_version` is 1.2.0;
- HDX HAPI: an `encoded_app_identifier` string, which is passed in the `app_identifier` parameter of subsequent requests;
- OpenSanctions: the `default` dataset has the update date `2026-10-15T12:54:35`.

How to check an MCP server is in the chapter [on AI](./01-ai-and-data-spaces.md#how-to-check-an-mcp-server). The registry figures were obtained with queries from the appendix ["Using the Registry"](../12-appendices/02-using-the-registry.md#innovative-catalogs).

## What follows

The nine capabilities are not a list of what is mandatory. They are a list of what can be asked for if there is a task. For it to work as a selection tool, each capability in a technical specification should be marked "mandatory", "desirable" or "not needed", with a sentence on where the need comes from. Ready wordings are in the section ["New capabilities"](../06-choice/07-requirements-checklist.md#new-capabilities) of the requirements checklist.

Three things from this chapter suit almost any catalog:

- an API for tabular files, if the files are small and people really filter them;
- a schema check on upload, if a schema already exists;
- a read-only MCP server, if the platform provides it.

The rest depends on the task: a DOI for a query for those whose data is cited; access tiers for an owner of sensitive data; server-side processing for those whose data does not fit in a file.

## Sources

- [dataportals-registry](https://github.com/datenoio/dataportals-registry), release 1.27.0 of 15 October 2026: ERDDAP 175 entries (174 active), Datasette 45 (44), Redivis 13, DataLad 10, DANDI 3, Datadex 3 (none with an API recorded), 27 catalogs with GA4GH DRS, 12 entries with openEO in the address
- data.gouv.fr, [API tabulaire (beta)](https://www.data.gouv.fr/dataservices/api-tabulaire-data-gouv-fr-beta) (in French): size limits, profile, 100 requests per second, 31,768 datasets; code [datagouv/api-tabular](https://github.com/datagouv/api-tabular), MIT licence
- Hugging Face, [Dataset viewer](https://huggingface.co/docs/dataset-viewer/index) and [SQL Console](https://huggingface.co/docs/hub/datasets-viewer-sql-console)
- Datasette, [JSON API](https://docs.datasette.io/en/stable/json_api.html)
- Overture Maps, [GERS](https://docs.overturemaps.org/gers/): identifier register, change log, crosswalk tables, the identifier change in release 2025-06-25.0
- GBIF, [citation guidelines](https://www.gbif.org/citation-guidelines): download DOIs, derived datasets, cloud snapshots
- Our World in Data, [Chart API](https://docs.owid.io/projects/etl/api/chart-api/)
- CZ CELLxGENE, [Census](https://chanzuckerberg.github.io/cellxgene-census/): long-term support releases, link generator
- Research Data Alliance, [Precise, Actionable Reference to Dynamic Data](https://doi.org/10.15497/RDA00132), 2025: citing dynamic data
- DoltHub, [What is Dolt?](https://docs.dolthub.com/introduction/what-is-dolt), [SQL API](https://docs.dolthub.com/products/dolthub/api/sql)
- OpenNeuro, [user guide](https://docs.openneuro.org/user_guide.html): BIDS, snapshots, CC0 after 36 months; [BIDS](https://bids.neuroimaging.io/)
- DANDI, [publishing Dandisets](https://docs.dandiarchive.org/user-guide-sharing/publishing-dandisets/): validation before publication, an immutable version, the Zarr limitation
- Copernicus Data Space Ecosystem, [openEO](https://documentation.dataspace.copernicus.eu/APIs/openEO/openEO.html): federation and free-tier limits
- Climate Data Store, [API setup](https://cds.climate.copernicus.eu/how-to-api)
- ERDDAP, [information](https://coastwatch.pfeg.noaa.gov/erddap/information.html)
- Data Commons, [working with an AI agent](https://docs.datacommons.org/mcp/)
- HDX, [Humanitarian API](https://data.humdata.org/hapi)
- OpenSanctions, [statement model](https://www.opensanctions.org/docs/statements/); [yente](https://github.com/opensanctions/yente), MIT licence
- [DBnomics](https://db.nomics.world/); IPUMS, [API Program](https://developer.ipums.org/docs/v2/apiprogram/)
- Aleph, [cross-referencing](https://docs.aleph.occrp.org/users/investigations/cross-referencing/); [repository](https://github.com/alephdata/aleph): last commit on 20 February 2026
- [microdata.no](https://www.microdata.no/en/about-microdata-no/); Redivis, [access levels](https://docs.redivis.com/reference/data-access/access-levels)
- Huwise, [MCP server](https://userguide.huwise.com/en/articles/5071874); PortalJS, [MCP server](https://www.portaljs.com/blog/supercharging-data-portals-with-the-portaljs-mcp-server); World Bank, [Data360 MCP](https://worldbank.github.io/data360-mcp/)
- [Cloud storage and hubs](../08-beyond-portals/04-cloud-storage-and-hubs.md), [AI and data spaces](./01-ai-and-data-spaces.md), [requirements checklist](../06-choice/07-requirements-checklist.md)
