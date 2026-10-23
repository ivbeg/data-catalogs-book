---
title: APIs and Bulk Download
description: How a program reads a catalog (search, a full metadata dump, access to the data itself and change notifications); when each is needed, how platforms do it and how to check a live portal.
---

# APIs and Bulk Download

A website is enough for a person. A program needs a stable way to ask the catalog: what datasets exist, what is in the description, where the file is, what has changed since yesterday. That is the application programming interface, the API.

The main practical conclusion of the chapter. Every catalog needs two things: a way to take all descriptions at once and direct links to files, both without registration. A search API and an API to table contents are added according to the size of the catalog and the users' tasks. API limits are fair only if a full dump sits next to them: otherwise everyone who needs the whole database downloads it piece by piece, which is expensive both for them and for the server.

The chapter covers four tasks usually called by the single word "API", the options for solving them, access conditions and limits, interfaces the site owner does not know about, and how platforms do it. At the end there is a check of ten live catalogs on different platforms on 12 October 2026, with commands you can use to repeat it.

## What it is

An **API** (application programming interface) is an address at which a program asks the catalog a question and gets an answer, usually in JSON or XML. What matters is not the word "API" itself but which question the interface answers. There are four such questions.

1. **Find and read a description.** Search by text and filters, the record of one dataset. Examples are CKAN's Action API and Dataverse's Search API.
2. **Take all descriptions at once.** One file or protocol that serves the whole catalog: a `data.json` file, a DCAT export, the OAI-PMH and CSW protocols. Harvesters need this: an upper-level portal, a dataset search engine, an archive.
3. **Get the data itself.** A link to a file, a query to a table, a map service, a statistical API.
4. **Find out what has changed.** An RSS or Atom feed, a "modified since date" selection, change files. So as not to download the whole catalog again every day.

Three more terms will be needed below.

**Bulk download**: the ability to download the whole database or the whole dataset as files, without per-record requests. The EU regulation on high-value datasets defines it as downloading the whole dataset in one or several packages.

**Pagination**: a response split into pages, 100 datasets or 25 records at a time. A program goes from page to page until it reaches the last one. Almost all search APIs and many DCAT exports work this way.

**Change feed**: a list of recently added and modified records in RSS or Atom format. Subscriber programs and harvesters read it.

Do not confuse a catalog's API with an API catalog. Here the API is the door into a catalog of datasets. An API catalog is a separate type of site where the interfaces themselves are what is described; it is covered in the chapter [on other types of catalogs](../03-types/10-other-types.md).

## Why it is needed

Without a programmatic entrance, a catalog is visible only to those who open the site in a browser. Here is who is left out:

- **the upper-level portal and aggregators.** The national portal harvests regional ones, data.europa.eu harvests national ones, dataset search engines harvest everyone. They need all descriptions and the day's changes. How such chains work is covered in the chapter [on federation and harvesting](../07-publishing/03-federation-and-harvesting.md);
- **search engines.** A sitemap and markup on pages are enough for them; markup is covered in the chapter [on metadata export](./02-metadata-export.md);
- **developers and analysts.** A bus timetable app or a daily report will not download a file by hand;
- **archives.** A web archive saves pages but saves data behind an API poorly. When a catalog is shut down, what can be saved is what can be downloaded in full. More in the chapter [on archiving](../09-practices/04-archiving.md);
- **models and AI agents.** MCP servers for data portals run on top of the same API. Without an API, an assistant is left reading the site's pages. More in the chapter [on trends](../11-trends/01-ai-and-data-spaces.md);
- **the owner.** Many catalog websites are built on top of their own API, and the interface for people is just one of its clients.

For some data, an API and bulk download are required by law. EU Regulation 2023/138 on high-value datasets (geospatial, earth observation and environment, meteorological, statistics, companies, mobility) requires public bodies to:

- make datasets available through an API and, where the annex to the regulation says so, also as bulk download. The annex requires both for all six categories, with specific exceptions: for example, numerical weather prediction model data only through an API;
- publish the API terms of use and quality of service indicators: performance, capacity, availability;
- provide API documentation in an open format readable by both people and programs, which in practice means an OpenAPI description;
- designate a contact point for questions about the API.

These four requirements are a good list for those not covered by the regulation, too.

## Implementation options

### All descriptions at once

| Method | How it works | Strength | Weak spot | Where it is found |
|--------|-------------|-----------------|--------------|-----------------|
| One file | the whole catalog in one file: `data.json` per DCAT-US, a DCAT file, a CSV table | taken with one command, understandable without documentation | grows with the catalog; becomes heavy at hundreds of thousands of datasets | Socrata, ArcGIS Hub, Huwise, DKAN, static sites |
| Paginated DCAT export | the same DCAT, split into pages with links to the next and last | does not load the server, works at any size | all pages must be traversed; if the catalog changes during the traversal, datasets may be lost or repeated | CKAN with ckanext-dcat, udata |
| Harvesting protocol | OAI-PMH for research repositories, CSW and OGC API Records for geoportals | a standard, with selection by modification date | slow: hundreds of thousands of records mean thousands of requests; OAI-PMH has no notion of a file | Dataverse, InvenioRDM, DSpace, GeoNetwork |
| Regular catalog dump as files | once a day the server itself assembles the whole catalog into files and publishes them as an ordinary dataset | the cheapest method for both server and harvester | data as at the time of the dump, not as of now | data.gouv.fr: descriptions of datasets, files, services, organisations in CSV |
| Database dump | a copy of the whole database: SQL, RDF, a JSON archive | everything, including relations absent from descriptions | requires skill to restore; the format depends on the platform | the French Senate, Europeana |
| Sitemap | a list of page addresses | all search engines understand it | addresses only, without descriptions | almost all platforms; in CKAN, as an extension |

A full metadata dump is needed almost always. It is the minimum that lets others harvest the catalog. A sitemap does not replace it: it tells a search engine which pages to crawl, but tells a catalog harvester nothing about licences and files.

A search API does not replace a dump either. A search API almost always has a limit per page and on the depth of results. CKAN by default returns no more than 1,000 datasets per request; Zenodo without a key returns 25 records per page and no further than the 10,000th record. Walking the whole catalog through search is sometimes possible and sometimes not, and in any case it is fragile.

### Search and the dataset record

There is no single standard for a dataset search API. Each platform has its own: CKAN's Action API, udata's API, Huwise's Explore API, Socrata's SODA and Discovery API, Dataverse's Search API, the REST APIs of InvenioRDM and DSpace. The closest thing to a common standard is OGC API Records: ArcGIS Hub sites serve it, and so does GeoNetwork with a separate service. That is why upper-level portals harvest descriptions via DCAT, not through each platform's API.

A search API is needed when there are hundreds of datasets or more, when the catalog is part of a federation, or when someone builds their own site on top of it. For twenty datasets on a static site, one description file and a sitemap are enough.

### The data itself

- **A direct link to a file.** The simplest and most durable method. A person, a harvester and an archive all understand it.
- **An API to a table.** Rows with filtering, sorting and pagination. In CKAN this is the DataStore: by default up to 32,000 rows per request, with SQL queries disabled until the administrator enables them. In DKAN, Huwise and Socrata, a table API is in the core; Huwise also serves a dataset as a whole file, including in Parquet.
- **An API to every file without a loader.** The catalog itself parses a published tabular file and serves an API to it within a few minutes. This is how data.gouv.fr's tabular API (still in beta) works. The limits are 100 MB for CSV, 50 MB for XLS and Parquet, 12.5 MB for XLSX. Each file has a column profile, pagination with filters and a Swagger description of queries. The service's code is open under the MIT licence. Hugging Face similarly converts datasets to Parquet and offers an SQL console for them right in the browser. More in the chapter [on leading catalogs](../11-trends/02-innovative-catalogs.md#an-api-for-every-tabular-file).
- **Map services.** WMS serves an image of a layer, WFS and OGC API Features serve the features themselves, ArcGIS REST serves both. More in the chapter [on geoportals](../03-types/03-geoportals.md).
- **A statistical API.** SDMX, PxWebApi, JSON-stat: a query for a series or cube by dimension codes. More in the chapter [on indicator catalogs](../03-types/05-indicator-catalogs.md).
- **Data in the cloud.** An S3 bucket address, a STAC catalog, a Parquet file read in parts directly over the network.
- **Server-side subsetting and processing.** The catalog serves not a file but the needed slice or result. ERDDAP accepts a subset by place and time and a response format in the URL. An openEO server runs a chain of operations on imagery and returns the result. The Climate Data Store shows ready-made request code for a subset assembled in a form.
- **A stream.** Real-time data: vehicle positions in GTFS-RT, sensor readings via the SensorThings API.

An API to table contents is needed when data is large or updated often, and downloading the whole file for one row is inconvenient. For archiving an annual report a file is enough. An automatic API inherits the source file's errors: encoding, extra rows above the header, text in a numeric column. Without a column dictionary it serves them faster, but not more accurately.

### What has changed

- **An RSS or Atom feed.** Present in the core of CKAN, udata, Huwise, ArcGIS Hub and DSpace. Its length varies: CKAN by default shows the last 20 records, data.gouv.fr 50, while in Huwise and ArcGIS Hub the whole catalog is in the feed. A short feed is fine for subscribing but not for full harvesting: if a harvester misses a day, some changes fall off its end.
- **A "modified since date" selection.** The `from` parameter in OAI-PMH, `modified_since` in the ckanext-dcat DCAT export, a filter on the `metadata_modified` field in CKAN search, `pastDays` in PxWebApi 2. This is the harvester's main tool: a full dump once a month and a selection of changes every day.
- **An activity log.** In CKAN, the activity plugin shipped with the core: who changed what and when.
- **Change files.** For large databases, the difference from the previous version is published next to the full dump. Russia's FIAS address register and OpenSanctions do this.

Change notifications are needed by harvesters of large catalogs. A small portal only needs an honest modification date in its export. Honest means the date the data changed, not the date the record was edited: the difference is covered in the chapter ["Anatomy of a Catalog"](../01-basics/03-anatomy.md).

## Bulk download is not a luxury

If data can be obtained only through API requests, everyone who needs the whole database downloads it piece by piece. This is slow for the user and expensive for the server. The numbers show how unnecessary it is. The European Central Bank serves all its series as bulk download: in 2024 this was 108 CSV files totalling 93 GB, which took 664 MB after conversion to Parquet. The World Bank publishes the core World Development Indicators database as an archive, but in January 2025 there was no bulk download for the other indicators on data.worldbank.org. 12% of the indicators, downloaded through the API, came to 3,382 JSON files totalling 22 GB, and in Parquet the same data took 44 MB. The argument "the data is too big, so API only" usually means nobody has tried compressing it.

API restrictions are reasonable only if a full dump sits next to them. In 2024 Zenodo limited the results of a single search query to ten thousand records, while on 12 October 2026 it held 726,858 datasets. Zenodo has no file with all descriptions. The only way to take everything is OAI-PMH, request by request, fifty or so records at a time. It works, but for a catalog of this size it is slow, and most users do not know about this route.

Good examples of the opposite:

- **data.gouv.fr** publishes the whole catalog every night as CSV files, as an ordinary dataset. On 12 October 2026 dataset descriptions took 276 MB and file descriptions 1.1 GB; data services, organisations, reuses and harvest sources are published separately;
- **the French Senate** publishes its databases as PostgreSQL dumps in ZIP archives: for example, all amendments to bills since 2001;
- **Russia's FIAS address register** in 2023 published full dumps of up to 36 GB compressed, plus separate change files;
- **US agricultural statistics (NASS)** serves the whole Quick Stats database as several compressed files and offers an API for targeted queries alongside. On 12 October 2026 the latest files were from 10 October;
- **OpenSanctions** publishes pre-built dumps and change files in several formats. Technically, it is a model. Legally, it is not: the data may be used free of charge only for non-commercial purposes.

What makes a good dump:

- **a permanent address for the latest version** and an archive of past ones by date;
- **size and date next to the link**, so the user knows what they are downloading;
- **a compressed format**: gzipped CSV or Parquet, not uncompressed XML. How to choose a format and compression is covered in the chapter [on formats](../02-data/02-formats-and-units.md);
- **descriptions together with the data.** In 2024 the ECB served series values in bulk, but indicator descriptions had to be extracted from the files themselves. Usually it is the other way round, and that is just as bad;
- **change files** for databases that weigh gigabytes in total;
- **a licence on the dump itself**, not only on the dataset page.

## Access conditions and limits

Metadata must be readable without registration, without a key and without a CAPTCHA. Otherwise automated harvesting is either impossible or breaks every time the protection is updated. For data, a key is acceptable if it is issued immediately, free of charge and without manual approval: this way the owner sees who creates load and can contact them.

Limits are fine if they are published and predictable. A good example is Statistics Sweden's PxWebApi 2: the `/api/v2/config` address itself tells a program that one request returns no more than 150,000 cells, and no more than 30 requests are allowed per 10 seconds. A bad example is a limit you find out about from an error on page 401 of the results.

What closes a catalog to programs even when an API formally exists:

- **a bot check** at the entrance: Cloudflare, AWS WAF. A "Just a moment…" page instead of a response breaks any harvester. Examples are in the chapters [on research repositories](../03-types/04-scientific-repositories.md) and [on microdata catalogs](../03-types/06-microdata-catalogs.md);
- **geoblocking**: the site does not respond to requests from other countries;
- **mandatory registration** to protect against AI bots;
- **temporary links** to files that stop working after half an hour.

These cases are covered in more detail in the anti-pattern ["The door is closed to programs"](../09-practices/02-anti-patterns.md).

Another requirement people forget is stability. An interface others rely on must not be changed silently. The old version is kept alongside the new one, closure is announced in advance, addresses are not broken. When data.gov moved from CKAN to its own software in April 2026, dataset page addresses were preserved, but on 12 October 2026 the CKAN Action API returned a 404 error. Everything built on the old API stopped working in one day.

## Implicit interfaces

Many sites serve data to programs even if the owner has not said so. There are three reasons. The API was planned but not documented. The site itself is built as a page that fetches data from an API with a script, and that API can be called directly. Or the platform has an API by default and the owner does not know about it: in WordPress this is `/wp-json/`, in SharePoint `/_api/`, in DSpace research repositories the REST API and OAI-PMH, on ArcGIS servers a JSON response to any address with the `?f=json` parameter, in Blacklight catalogs the same address with an `Accept: application/json` header.

Three techniques help find such an interface: check the default addresses for the site's platform; open the browser's developer tools and look at the "Network" tab to see what requests the page makes by itself; and search for documentation with the phrase "REST API" on the site's domain.

For a user such an interface is a find: sometimes it is the only way to get data from a geoportal or a register. For the owner it is a reason to document what already exists. Relying on an undocumented interface for ongoing work is risky: it changes without warning when the site is updated. If the data is needed for the long term, keep your own copy of what you download from such an API; there are ready-made programs for this, such as apibackuper.

## Data without a direct link

A catalog used to the model "a dataset is files behind links" also encounters other access methods.

- **Cloud catalogs.** The Microsoft Planetary Computer catalog serves some data as `abfs://…` links into internal Azure storage, the Amazon open data registry as S3 bucket addresses, the Google Earth Engine catalog as a code snippet for its own platform. The data is open, but it is most convenient to use inside the owner's cloud.
- **"Code first" in machine learning.** Kaggle, Hugging Face, the TensorFlow and PyTorch catalogs show a line of code that loads the dataset with a library instead of a link to a file. This is convenient for a specialist; for a general dataset search engine it is a dataset without files.
- **On request only.** Some statistical portals serve a table only in response to a POST request with chosen parameters, without a permanent address.

If you publish this way, provide at least one ordinary link to a file or dump alongside: a person, a harvester and an archive will all understand it.

## When it is needed and when not

| Catalog | Mandatory | Worth adding | Can be skipped |
|---------|-------------|----------------|-----------------|
| Twenty datasets on a static site or in a Git repository | a file with all descriptions (`data.json` or DCAT), a sitemap, direct links to files | schema.org markup on pages | search API, table APIs |
| A municipal portal harvested by the national one | a DCAT export in the country profile without registration, direct links to files | a change feed or selection by date | a custom table API, if files are small |
| A national portal, including one with EU high-value datasets | a search API, a full metadata dump, a selection of changes; for high-value datasets, an API and bulk download, terms of use, documentation, a contact | a daily catalog dump as files | — |
| A research repository | OAI-PMH, a REST API, direct links to files | a full metadata dump as a file, if there are hundreds of thousands of records | an API to table contents |
| A geoportal | CSW or OGC API Records, WMS and WFS or OGC API Features services, downloading a whole layer | DCAT via CSW for an open data portal | — |
| An indicator catalog | an API to series (SDMX, PxWebApi, JSON-stat), a list of all tables with update dates | bulk download of the whole database | — |
| A large register database: addresses, companies, sanctions | a full dump and change files | an API for single-record queries | — |
| A dataset for machine learning | a direct link to files, preferably in Parquet, and a Croissant description | a line of library code as a supplement, not a replacement | — |

In brief, this is what a justification looks like using the [decision record](../06-choice/04-justifying-decisions.md) template:

- **Context.** A statistical office on PxWeb, about 3,000 tables. Analysts and a dataset search engine ask to "give us everything at once", and the API server is overloaded on release days.
- **Options.** Keep only PxWebApi; stand up a separate SDMX service; add a nightly dump of all tables as files.
- **Criteria.** How many requests it takes to download the whole database; server load; international reporting requirements; maintenance cost.
- **Decision.** PxWebApi 2 for targeted queries, and a nightly dump of all tables in CSV and Parquet with an inventory: table code, title, update date, size.
- **Why.** Through the API, the whole database takes at least one request per table, and large tables hit the cell limit and need several requests. One set of files per day is cheaper for the server than thousands of requests from each user. The dump is written as a script on top of the same API: the PxWeb core does not have one.
- **When to revisit.** If international partners require SDMX, or if the dump is hardly downloaded.

## How it is done in platforms

The marks are core, extension, no, not checked, as in the [summary table](../12-appendices/03-platform-tables.md). Checked against documentation and live installations on 12 October 2026.

| Platform | Searching descriptions | All descriptions at once | Data | What has changed |
|-----------|----------------|--------------------|--------|----------------|
| CKAN 2.12 | core: Action API, up to 1,000 datasets per request | extension ckanext-dcat: paginated DCAT, 100 datasets per page by default; a sitemap is also an extension | core: files and DataStore; SQL queries disabled by default; CSV loading is the XLoader extension | core: Atom feed, a modification date filter in search, an activity log (the activity plugin shipped with the core); in ckanext-dcat, the `modified_since` parameter |
| udata 17 | core | core: paginated DCAT; a nightly CSV dump of the catalog is a core task enabled in configuration | core: files | core: Atom feed, sorting by update date |
| Huwise (OpenDataSoft) | core: Explore API | core: the catalog as one file in DCAT, `data.json` and CSV | core: a records API, dataset export in CSV, JSON, Parquet and other formats | core: RSS feed, a modification date filter |
| Socrata | core: Discovery API | core: `data.json` as one file | core: SODA | not checked |
| ArcGIS Hub | core: search via OGC API Records | core: DCAT-US 1.1 and DCAT-AP 2.1.1 as one file; DCAT-US 3.0 and DCAT-AP 3.0.0 enabled separately | core: ArcGIS layers and files | core: RSS 2.0 feed |
| DKAN | core: metadata API | core: `data.json` per DCAT-US | core: a table store with SQL queries | not checked |
| Dataverse | core: Search API | core: OAI-PMH; a dataset description in DDI, DataCite, schema.org and other formats | core: Data Access API | core: OAI-PMH with selection by date |
| InvenioRDM | core: REST API | core: OAI-PMH, including in DataCite and DCAT | core: files | core: OAI-PMH with selection by date |
| DSpace 7 and later | core: REST API | core: OAI-PMH, sitemap | core: files | core: Atom and RSS feeds for any search query via OpenSearch, OAI-PMH with selection by date |
| GeoNetwork 4.4 | core: its own search API | core: CSW (including in DCAT-AP), OAI-PMH, sitemap; OGC API Records is a separate project microservice | core: links to services and files | core: OAI-PMH with selection by date |
| PxWeb (PxWebApi 2) | core | core: a list of all tables with update dates | core: JSON-stat 2, CSV, PX, XLSX; no SDMX | core: tables changed in the last N days |
| NADA | core: its own API | core: its own API and a DDI description for each study; no OAI-PMH or DCAT | core: files by access level | not checked |
| JKAN, a static site | no | a `data.json` file, if it was built | links to files | the repository's change feed, if the site is built from Git: on GitHub it is `commits/branch.atom` |

Three things in the table are not obvious.

In CKAN, the full metadata dump is not core but the ckanext-dcat extension. A mature portal almost always has it, but without it a harvester has only the Action API. The CKAN core has no sitemap either: data.gov.gr returns a 404 error for it.

GeoNetwork 4 removed some earlier interfaces: OpenSearch has been unavailable since version 4.0, and the separate `rdf.search` DCAT service was replaced by DCAT output through CSW. OGC API Records is installed alongside as a separate service. In the European Environment Agency catalog on GeoNetwork 4.4 that address did not respond on 12 October 2026, while CSW and OAI-PMH worked.

Second-generation PxWeb has what the first lacked: a list of all tables with update dates and a selection of those changed in N days. There is still no bulk download of the data itself in the core.

### What the registry shows

According to the dataportals-registry export (release 1.27.0 of 15 October 2026), at least one programmatic entrance is recorded for 28,471 of 43,614 catalogs, or 65%. A standard way to take all descriptions (DCAT, OAI-PMH, CSW or OGC API Records) is recorded for 8,894, or 20%. The rest serve what their platform can: an ArcGIS interface, the CKAN API without the extension, a cloud service's own API.

The main difference is not between catalog types but between platforms. Catalogs on ready-made platforms have a programmatic entrance recorded in 76% of cases; custom builds in 10% (697 of 7,034), and a standard metadata dump in 58 of 7,034, under 1%. Partly this is a property of the registry itself: it finds interfaces at known platform addresses, and for a custom build the addresses are not known in advance. But a harvester faces the same thing. If you write a catalog yourself, you will have to build a standard dump yourself, otherwise nobody will harvest the catalog.

The spread by type is also large. A programmatic entrance exists for 70% of geoportals, 69% of open data portals and 63% of research repositories, but only for 37% of indicator catalogs and 23% of ML catalogs. The registry hardly records RSS and Atom feeds for CKAN portals, although they are in the core, so we do not calculate the share of feeds from the registry. The queries are in the [appendix on the registry](../12-appendices/02-using-the-registry.md#api-and-bulk-download).

## How to check a live portal

Developer documentation on the site itself is the first sign. Then five steps:

1. **Identify the platform.** It determines which addresses to look at: CKAN responds at `/api/3/action/status_show`, Dataverse at `/api/info/version`, DSpace 7 and later at `/server/api`.
2. **Find all descriptions at once** and get to the last page of the dump.
3. **Compare the numbers.** The dump should contain as many datasets as the site's search. If search says there are 10,000 datasets and the dump contains 200, a harvester will see a different catalog from the one a person sees.
4. **Check the selection of changes**: something should turn up for the last few days if the portal is alive.
5. **Repeat without a browser.** A request from the command line, without logging in, preferably from another network. If the response is a bot check or a 403 error, programs will not see this catalog.

### Ten catalogs on 12 October 2026

| Catalog | Platform | All descriptions at once | What has changed | What stands out |
|---------|-----------|--------------------|----------------|-------------|
| data.gov.gr | CKAN 2.11.3 with ckanext-dcat | paginated DCAT: 455 pages of 50 datasets, 22,736 in total, the same as in search | Atom feed; 1,328 datasets changed since 1 October, both by search and by the DCAT export | no sitemap |
| data.gouv.fr | udata 17.12.1 | paginated DCAT: 744 pages of 100, 74,375 in total; a nightly CSV dump of the catalog | Atom feed, sorting by update | the nightly dump replaces 744 DCAT requests with one download; file descriptions are a separate 1.1 GB CSV |
| opendata.paris.fr | Huwise | one 14 MB DCAT file, `data.json` and CSV for 490 datasets | RSS feed; 96 datasets changed since 1 October | every dataset can also be exported to Parquet |
| data.cityofnewyork.us | Socrata | `data.json` as one file, 4.8 MB, 2,711 records | not checked | the shared search across all Socrata portals works without a key |
| opendata.dc.gov | ArcGIS Hub | DCAT-US 1.1 and DCAT-AP 2.1.1 as one file, 1,871 records; DCAT-US 3.0 and DCAT-AP 3.0.0 feeds on the same site also respond | RSS 2.0 feed | the dump also includes documents, maps, applications: search shows 1,476 datasets out of 1,864 items |
| Harvard Dataverse | Dataverse 6.10.1 | OAI-PMH; 305,251 datasets in search | OAI-PMH with selection by date | a dataset page answers a robot with an AWS WAF check, while the API and OAI-PMH work |
| Zenodo | InvenioRDM | OAI-PMH only, including in DCAT and DataCite; 726,858 datasets | OAI-PMH with selection by date | search: without a key, 25 records at a time, no further than the 10,000th |
| DSpace@MIT | DSpace 8.2 | OAI-PMH, sitemap | Atom feed via OpenSearch | REST API at `/server/api` |
| EEA catalog | GeoNetwork 4.4 | CSW: 3,429 records; OAI-PMH; sitemap | OAI-PMH with selection by date | OGC API Records not deployed |
| Statistics Sweden | PxWebApi 2.3.2 | a list of all 2,814 tables | 53 tables changed in 7 days | limits published at `/api/v2/config` |

The overall conclusion of the check: all ten catalogs have a way to take all descriptions, but each does it differently, and there is no universal harvester. None of the portals checked responds at `/.well-known/api-catalog`, the address that RFC 9727 proposes for describing all of a site's APIs.

### Commands

For a CKAN portal. The commands check the version, the full metadata dump, whether the numbers match, and the selection of changes. Substitute the portal address and the date.

```bash
PORTAL=https://data.gov.gr

# CKAN version
curl -s "$PORTAL/api/3/action/status_show" | jq '.result.ckan_version'

# All descriptions: how many datasets and where the last page of the DCAT export is
curl -s "$PORTAL/catalog.ttl" | grep -E "hydra:(totalItems|lastPage)"

# Search should show the same number of datasets
curl -s "$PORTAL/api/3/action/package_search?rows=0" | jq '.result.count'

# What has changed since 1 October: in search and in the DCAT export
curl -s -G "$PORTAL/api/3/action/package_search" --data-urlencode "rows=0" \
  --data-urlencode "fq=metadata_modified:[2026-10-01T00:00:00Z TO *]" | jq '.result.count'
curl -s "$PORTAL/catalog.ttl?modified_since=2026-10-01" | grep "hydra:totalItems"

# Change feed
curl -sI "$PORTAL/feeds/dataset.atom" | head -1
```

For other platforms:

```bash
# udata: the DCAT export and the nightly files with the whole catalog
curl -s "https://www.data.gouv.fr/api/1/site/catalog.rdf" | grep -o "hydra:totalItems[^<]*"
curl -s "https://www.data.gouv.fr/api/1/datasets/catalogue-des-donnees-de-data-gouv-fr/" \
  | jq -r '.resources[] | "\(.title)\t\(.filesize)"'

# Huwise: the whole catalog as one file and datasets modified after a date
curl -sI "https://opendata.paris.fr/api/explore/v2.1/catalog/exports/dcat" | head -1
curl -s -G "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets" \
  --data-urlencode "limit=0" --data-urlencode 'where=modified >= "2026-10-01"' | jq '.total_count'

# Socrata and ArcGIS Hub: the file with all descriptions
curl -s "https://data.cityofnewyork.us/data.json" | jq '.dataset | length'
curl -s "https://opendata.dc.gov/api/feed/dcat-us/1.1.json" | jq '.dataset | length'

# Research repository: OAI-PMH and records modified after a date
curl -s "https://dataverse.harvard.edu/oai?verb=Identify" | grep -o "<repositoryName>[^<]*"
curl -s "https://zenodo.org/oai2d?verb=ListIdentifiers&metadataPrefix=oai_dc&from=2026-10-11" \
  | grep -o "<header" | wc -l

# Geoportal: how many records CSW serves
curl -s "https://sdi.eea.europa.eu/catalogue/srv/eng/csw?service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&resultType=hits" \
  | grep -o 'numberOfRecordsMatched="[0-9]*"'

# PxWebApi 2: all tables changed in a week, and the limits
SCB=https://statistikdatabasen.scb.se/api/v2
curl -s "$SCB/tables?lang=en&pageSize=1" | jq '.page.totalElements'
curl -s "$SCB/tables?lang=en&pageSize=1&pastDays=7" | jq '.page.totalElements'
curl -s "$SCB/config" | jq -c '{maxDataCells, maxCallsPerTimeWindow, timeWindow}'

# Search depth limit: page 401 of 25 records on Zenodo returns error 400
curl -s -o /dev/null -w "%{http_code}\n" "https://zenodo.org/api/records?type=dataset&size=25&page=401"
```

Implicit platform interfaces. Substitute the site's domain:

```bash
curl -s "https://portal.example/wp-json/" | head          # WordPress
curl -s "https://portal.example/_api/web" | head          # SharePoint
curl -s "https://portal.example/server/api" | head        # DSpace 7 and later
curl -s "https://gis.example/arcgis/rest/services?f=json" # ArcGIS server
curl -s -H "Accept: application/json" "https://portal.example/catalog?q=" | head  # Blacklight and others
```

A good result: a response without logging in, containing dataset descriptions and not just the home page, and a dump that reaches its last page. A bad one: a CAPTCHA, mandatory registration, a 403 error for programs, or a search that cannot serve the next page. The summary list is in the [checklists](../12-appendices/04-checklists.md#checking-a-live-portal).

## What follows from this

- Start with a full metadata dump and direct links to files. This is the minimum for any catalog, from twenty datasets on a static site to a national portal.
- Serve metadata without registration, a key or a CAPTCHA. Check this from the command line and from another network, not from your own browser.
- Give harvesters a "modified since date" selection. It is cheaper for everyone than a daily full dump.
- For large databases, publish a full dump as files plus change files. API limits without a dump close the data; they do not protect the server.
- Publish limits, terms of use and API documentation, and designate a contact. For high-value datasets in the EU this is an obligation; for everything else, good practice.
- Do not change an interface silently. When moving platforms, keep the old addresses or announce their closure in advance.
- When choosing a platform, check that the metadata dump and the change selection are in the core, not in an extension. If you are writing the catalog yourself, put a standard dump in the specification: without it nobody will harvest the catalog.

## Sources

- EU Regulation 2023/138 on high-value datasets, [text on EUR-Lex](https://eur-lex.europa.eu/eli/reg_impl/2023/138/oj): Article 2 (definition of bulk download), Article 3 (API, bulk download, terms of use, quality of service, documentation, contact point)
- CKAN 2.12: [API documentation](https://docs.ckan.org/en/2.12/api/), [configuration](https://docs.ckan.org/en/2.12/maintaining/configuration.html): `ckan.search.rows_max`, `ckan.datastore.search.rows_max`, `ckan.datastore.sqlsearch.enabled`, `ckan.feeds.limit`; [ckanext-dcat: RDF endpoints](https://docs.ckan.org/projects/ckanext-dcat/en/latest/endpoints/), pagination and `modified_since`
- udata: [source code, the catalog CSV export task](https://github.com/opendatateam/udata/blob/main/udata/core/dataset/tasks.py); [the data.gouv.fr catalog export](https://www.data.gouv.fr/datasets/catalogue-des-donnees-de-data-gouv-fr/)
- [Dataverse API Guide](https://guides.dataverse.org/en/latest/api/), [WordPress REST API](https://developer.wordpress.org/rest-api/), [DSpace 7+ REST API](https://wiki.lyrasis.org/display/DSDOC9x/REST+API), [ArcGIS REST API](https://developers.arcgis.com/rest/)
- GeoNetwork 4.4: [interfaces](https://docs.geonetwork-opensource.org/4.4/api/), [OAI-PMH](https://docs.geonetwork-opensource.org/4.4/api/oai-pmh/), [OpenSearch removed in 4.0](https://docs.geonetwork-opensource.org/4.4/api/opensearch/), [DCAT via CSW and formatters](https://docs.geonetwork-opensource.org/4.4/api/rdf-dcat/), [microservices with OGC API Records](https://github.com/geonetwork/geonetwork-microservices)
- Statistics Sweden's PxWebApi 2: [list of tables](https://statistikdatabasen.scb.se/api/v2/tables?lang=en) and [configuration with limits](https://statistikdatabasen.scb.se/api/v2/config), version 2.3.2
- Bulk downloads: [ECB](https://data.ecb.europa.eu/help/data/downloading-data), [World Bank WDI](https://datacatalog.worldbank.org/search/dataset/0037712/World-Development-Indicators), [NASS Quick Stats](https://www.nass.usda.gov/datasets/), [OpenSanctions](https://www.opensanctions.org/docs/bulk/) and its [licensing terms](https://www.opensanctions.org/licensing/), [the French Senate](https://data.senat.fr/), [Europeana](https://download.europeana.eu/dataset/)
- [apibackuper](https://github.com/ruarxive/apibackuper): saving data from a paginated API
- Checks on 12 October 2026: dumps, feeds and date filters on data.gov.gr, data.gouv.fr, opendata.paris.fr, data.cityofnewyork.us, opendata.dc.gov; OAI-PMH and search on Harvard Dataverse, Zenodo, DSpace@MIT; CSW and OAI-PMH of the EEA catalog; Statistics Sweden's PxWebApi; a 404 response from the [data.gov Action API](https://catalog.data.gov/api/3/action/package_search?rows=0); the `/.well-known/api-catalog` address on data.gouv.fr and opendata.dc.gov
- I. Begtin, Telegram (in Russian): [ECB bulk download](https://t.me/begtin/5936), 20 August 2024; [World Bank indicators](https://t.me/begtin/6391), 24 January 2025; [Zenodo API restrictions](https://t.me/begtin/6006), 6 September 2024; [French Senate SQL dumps](https://t.me/begtin/4385), 15 November 2022; [FIAS](https://t.me/begtin/4909), 29 May 2023; [NASS](https://t.me/begtin/5832), 1 August 2024; [OpenSanctions](https://t.me/begtin/6105), 23 October 2024; [hidden platform interfaces](https://t.me/begtin/3303), 28 November 2021; [three reasons for undocumented APIs](https://t.me/begtin/4218), 30 August 2022; [how to find them](https://t.me/begtin/5966), 26 August 2024; [cloud catalogs without direct links](https://t.me/begtin/5536), 27 March 2024; ["code first" in ML catalogs](https://t.me/begtin/5526), 21 March 2024
- Prevalence of interfaces: the dataportals-registry export, release 1.27.0 of 15 October 2026. The queries are given in the [appendix](../12-appendices/02-using-the-registry.md#api-and-bulk-download).
- data.gouv.fr, [API tabulaire (beta)](https://www.data.gouv.fr/dataservices/api-tabulaire-data-gouv-fr-beta): limits of 100 MB for CSV, 50 MB for XLS and Parquet, 12.5 MB for XLSX, a profile and Swagger for each file; code at [datagouv/api-tabular](https://github.com/datagouv/api-tabular), MIT licence. Hugging Face, [Dataset viewer](https://huggingface.co/docs/dataset-viewer/index) and [SQL Console](https://huggingface.co/docs/hub/datasets-viewer-sql-console). [ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/information.html), [openEO in the Copernicus Data Space Ecosystem](https://documentation.dataspace.copernicus.eu/APIs/openEO/openEO.html), [Climate Data Store: API](https://cds.climate.copernicus.eu/how-to-api). Checked 15 October 2026
