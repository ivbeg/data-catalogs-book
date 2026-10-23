---
title: Built-in Data Storage
description: Whether to store files in the catalog or only link to them, how not to lose a file or swap it after publication, when a database table with an API is needed, and how storage works in CKAN, Dataverse, InvenioRDM, DSpace, cloud services and without a portal.
---

# Built-in Storage

A catalog can store the files themselves, or only describe them and link to wherever the file lives. This choice determines who is responsible for the file still opening in five years, and whether you can be sure it is the same file.

The practical conclusion of the chapter is this. A research repository, and any catalog whose files are cited for years, needs its own storage, and a file in it is not changed after publication: a correction is a new version. A portal that harvests other people's descriptions, and a geoportal that shows layers from map servers, can manage with links, but then the links must be checked regularly, and important datasets need a copy. A database table with an API is set up only for tables that people filter and query, not for every file.

At the end of the chapter there is a measurement on four large portals on 12 October 2026: what share of their files is uploaded, what share points elsewhere, and what happens to the links.

## What it is

The word "storage" hides three different things.

**File storage** holds a whole file: a CSV, an archive, an image, a PDF with the methodology. The user downloads it from the catalog's address.

**Table storage** is a separate database into which the rows of a table are loaded. From it the portal shows the table in the browser, filters it and serves some of its rows through an API, without making the user download the whole file. In CKAN this is the DataStore; cloud services have their own record database.

**A link**: there is no storage at all, and the catalog keeps only the description and the address of a file or service on someone else's site.

In a DCAT description the difference shows in the distribution fields. A direct link to a file is recorded in `dcat:downloadURL`; a page or service through which the data can be obtained goes in `dcat:accessURL`. A link to an agency page is no longer a file but a promise that the file can be found somewhere there. More on the parts of a description is in the chapter ["Anatomy of a Catalog"](../01-basics/03-anatomy.md).

"Built-in" does not mean "on your own server". Almost all large portals keep files in cloud object storage: Greece's data.gov.gr in Microsoft Azure, the Humanitarian Data Exchange (HDX) and Switzerland's opendata.swiss in Amazon S3. Object storage is a cloud warehouse for files, where each file sits under its own key and is served over HTTP. The user does not see this: they click "Download" on the portal page. On HDX the portal address redirects to a temporary signed S3 link, which on 12 October 2026 lived for three minutes. Link to the portal address, not to whatever ended up in the browser's address bar after the download.

## Why it is needed

**So that a file does not disappear along with someone else's site.** If a file is in the catalog, it is available as long as the catalog lives. If the catalog only links to an agency's site, the link breaks every time that site is rebuilt. In the full data.gov.uk dump of 2023, about 10% of links to files did not open, and by 2026, by the service's own estimate, more than a quarter of links were broken. The portal collected links to the sites of local councils, and they kept changing platform or domain. The same question was examined in 2026 by the US Congressional Research Service: data.gov is by law a single entry point leading to data on agency sites, and the report directly asks whether it should become a repository so that access to data does not disappear along with an agency's site.

**So that the file is the same file.** A paper, a report or a machine learning model refers to specific data. If a year later a different file sits behind the same link, the conclusion can no longer be checked. Your own storage lets you calculate a checksum (a short "fingerprint" of the contents that changes if even one byte changes) and forbid swapping the file after publication. With someone else's site, neither can be guaranteed.

**To work with the contents.** A table in a database can be shown in the browser, filtered, served in parts through an API, converted to another format. This is also possible over an external link, but only if the catalog downloads the file itself, which means setting up storage anyway.

**To check a file on upload.** Encoding, delimiter, headers and conformity with the data dictionary are checked at the moment the file enters the catalog. If the file lives on someone else's site, it has to be checked again every time, and the catalog cannot fix it.

**To make preservation easier.** An archive is taken from one site, not from a hundred. How web archives lose data that sits behind links on other servers is covered in the chapter ["Archiving and Rescuing Catalogs"](../09-practices/04-archiving.md).

The flip side is obligations. Your own storage means disk space, backups, payment for outgoing traffic, deleting a file on demand (personal data, an error, copyright), and an answer to the question of who looks after all this in five years. The DSpace documentation, for example, warns separately that when storing in S3 you may pay for traffic between storage and server if the server is outside the Amazon cloud.

## Implementation options

### Links only

The catalog is a pointer. Many geoportals work this way: the layer lives on a map server, and the catalog keeps the service's address. Harvesters work the same way: data.europa.eu, dataset search engines, national portals that harvest agency descriptions. The Czech data.gov.cz does not store a single file: on 12 October 2026 all download addresses for about 31 thousand datasets led to publishers' sites. In the measurement at the end of the chapter, the Irish and Swiss national portals have not a single uploaded file in the sample.

This is a normal model if the sources are stable and maintain their own data. There is one weak spot: the catalog cannot keep a copy if the source deletes the file, and it is the last to find out.

### A link with checking

The catalog keeps a link but regularly opens it and records the result. data.gouv.fr works this way: a separate crawler, [hydra](https://github.com/datagouv/hydra), checks every resource, and the resource description in the API shows the date of the last check, the server response code, availability and a checksum. In CKAN the [ckanext-archiver](https://github.com/ckan/ckanext-archiver) extension does the same: it downloads files from links, shows on the resource page that a link is broken, and compiles a report on broken links for publishers.

Checking does not save the file, but it turns "links break somehow" into a list you can work with: which sources stopped responding and since what day.

### A link with a copy

The next step is to keep a copy of what you link to. ckanext-archiver offers the user the saved copy if the original link breaks. The data.gouv.fr crawler goes further: it loads CSV and Excel tables, including external ones, into PostgreSQL and converts them to Parquet, and a separate tabular API works for these tables. In the measurement, the external links of Ireland's data.gov.ie also have copies of tables in the DataStore: the portal downloads the Central Statistics Office's files and loads their rows into its own database.

A copy solves the access problem but raises the question of which version is authoritative. The user should see when the copy was taken and whether it still matches the source.

### Files held by the catalog

The publisher uploads a file and the catalog stores it. Technically there are three options, and the choice is made before launch: moving already uploaded files is more painful than choosing on day one.

- **The server's disk.** The simplest and cheapest for a small catalog. Backups, space and migration are the administrator's job.
- **Object storage**: S3, Azure Blob, Google Cloud Storage or S3-compatible systems on your own servers such as MinIO and Ceph. Space is almost unlimited and the provider makes copies, but you pay for storage and downloads. The user gets the file either through the catalog server or via a redirect to a temporary storage link, as on HDX.
- **Several stores at once.** Dataverse lets you choose a store for each collection or dataset; DSpace lets you set up several numbered stores and move files between them; CKAN since version 2.12 lets you keep resource files, logos and extension attachments in different places. This is needed when different data has different requirements: large imagery in cheap cloud storage, sensitive files on your own server.

For large files it matters that they do not pass through the catalog server. Dataverse can upload directly to S3, bypassing the server; InvenioRDM supports multipart upload that can be resumed after a dropped connection. InvenioRDM can also fetch a file by link: the server downloads it itself and then stores it as its own.

### Trusted external storage

An intermediate option for very large and sensitive data: the file stays with the owner, but the catalog knows its exact address and access rules. In Dataverse this is a "trusted remote store": all files must sit at addresses starting with a given base address, while the dataset's auxiliary files (descriptions, thumbnails) are stored by Dataverse itself. In InvenioRDM such a file is marked as remote, and the documentation honestly warns that the platform does not guarantee the availability and integrity of such a file.

### A table in a database

A CSV file is not only stored but also loaded into a database. Then you can view the first rows in the browser, request the ones you need through an API and not download everything. In CKAN this is the DataStore, a separate PostgreSQL database where each table is tied to a resource. Search returns 100 rows by default and no more than 32 thousand per request; SQL queries are disabled until the administrator enables them. The whole table is downloaded at `/datastore/dump/RESOURCE-ID` in CSV, TSV, JSON or XML.

In the cloud services Huwise (formerly OpenDataSoft) and Socrata, a database table is the main mode: a dataset is a table of records, and a file is an export from it. Dataverse parses uploaded SPSS, Stata, R, Excel and CSV tables and describes their variables. Indicator catalogs such as PxWeb and .Stat Suite have no files at all, only a database and an API to it.

A database table is convenient for large and frequently updated tables and pointless for a map in PDF. Its cost is one more database to update and a loader that breaks on "dirty" files: an unexpected encoding, extra rows above the header, mixed types in one column.

The loader can be taken out of the publisher's hands. data.gouv.fr, as mentioned above, loads every tabular file into a database itself, and Hugging Face similarly converts datasets to Parquet. The publisher does nothing, but a "dirty" file still produces a "dirty" API. More in the chapter [on leading catalogs](../11-trends/02-innovative-catalogs.md#an-api-for-every-tabular-file).

### A mix

Some datasets are stored, some link elsewhere. Most open data portals work this way: a register is uploaded to the catalog as a file, while sensors and maps stay on the agency's server. A mix is honest if the user sees which method applies to which resource, and the catalog checks the external links.

## Immutability, versions and checksums

Your own storage makes it possible not to change a file after publication, but does not oblige you to. Platforms behave differently.

- **CKAN in classic mode** overwrites a resource file on update: the same address, new contents, and the previous contents are not kept. For an open data portal where the "current year budget" resource is updated every month, this is convenient. For data cited in research, it is not. CKAN 2.12 introduced a new way of handling files: each file has its own identifier and checksum, and the contents of an existing file cannot be changed, only deleted and created anew.
- **Zenodo** allows files to be corrected within 30 days of publication. After that only a new version of the record with its own DOI, while the files of the old version remain available unless the author restricts them. Files older than 30 days can be changed only in exceptional cases: copyright infringement, disclosure of personal data.
- **Dataverse** creates a new version of the dataset when a file in a published dataset is replaced; the previous one remains. A checksum is calculated for each file, MD5 by default, with SHA-1, SHA-256 or SHA-512 as alternatives.
- **DSpace** stores a checksum for each file and can regularly verify it against the contents.

It is useful to expose the checksum too. DCAT 3 has the `spdx:checksum` property on a distribution for this, and data.gouv.fr shows the checksum in the resource description. Then a user, a harvester and an archive can check that they downloaded the same file and not one quietly corrected. How versions and identifiers work is covered in the chapter ["Persistent Identifiers, DOIs and Versions"](./06-identifiers-and-doi.md).

## Sizes and limits

Storage almost always has a file size limit, and people find out about it when a publisher arrives with a large archive.

| Where | Limit | What to do beyond it |
|-----|--------|------------------------|
| CKAN, default settings | 10 MiB per uploaded file (`ckan.max_resource_size`) | raise the limit if there is enough space and bandwidth; put large files in object storage and link to them |
| Zenodo | 50 GB and 100 files per record | a one-off increase to 200 GB on request; the rules forbid splitting a dataset to get around the limit |
| Harvard Dataverse | 2.5 GB per file through the browser | larger by arrangement; on your own Dataverse the limit is set per store |
| GitHub | 100 MiB per file; a repository is best kept under 1 GB | Git LFS, release attachments, separate storage |
| Hugging Face | for public datasets, space "best effort"; for private ones, 100 GB | see the chapter [on ML catalogs](../03-types/07-ml-catalogs.md) |

The CKAN default limit is especially treacherous: 10 MiB is a small table. A portal where the limit has not been raised quietly turns into a portal of links: publishers put everything larger on their own site. Limits and prices of research repositories are covered in detail in the chapter [on research repositories](../03-types/04-scientific-repositories.md).

For data in terabytes, the catalog usually stores the description, while the files themselves sit in object storage open for public reading, in formats that can be read in parts: Parquet for tables, Cloud Optimized GeoTIFF for imagery, Zarr for multidimensional arrays. The Registry of Open Data on AWS and Source Cooperative work this way; they are covered in the chapter [on cloud storage and hubs](../08-beyond-portals/04-cloud-storage-and-hubs.md).

## When it is needed and when not

| Situation | What to choose | Why |
|----------|-------------|--------|
| A research repository, data behind papers | own files, no overwriting, versions, checksums | a paper cites a specific file through a DOI; swapping breaks verifiability |
| A portal of an organisation whose data sits "on a shared drive" | own files | the publisher has no reliable place; there is nothing to link to |
| A national or regional portal harvesting agencies and municipalities | links with regular checking; copies of important datasets | duplicating everything is expensive and creates two diverging copies, but you need to be the first to learn a file has gone |
| A geoportal over map servers | links to services; files only for whole-layer downloads | the layer lives on the server; the catalog does not replace it |
| An indicator catalog | an indicator database and API, no files | the user takes a slice, not a file |
| Large tables filtered by programs and people | a database table with an API plus a whole-table download | partial access without downloading everything; the download is for those who need it all |
| A quarterly report in one file | just the file | a database table adds nothing |
| Terabytes of imagery, models, dumps | object storage, the description in the catalog | such files will not pass through the catalog server |
| Sensitive data | the file stays with the owner; the catalog holds the description and access procedure | see the chapter [on access and roles](./08-access-control-and-workflow.md) |

In brief, this is what a justification looks like using the [decision record](../06-choice/04-justifying-decisions.md) template:

- **Context.** A regional portal on CKAN harvests descriptions from 40 municipalities. Half the resources are links to their sites; some sites moved last year, and complaints about "broken links" arrive monthly.
- **Options.** Leave things as they are; move all files to the portal; keep the links but check them and store copies.
- **Criteria.** Share of broken links, cost of space and traffic, who updates the data, the risk of two diverging copies.
- **Decision.** The links stay; ckanext-archiver checks them every week and stores copies; a monthly report on broken links goes to publishers. Municipalities without their own site are offered direct upload to the portal.
- **Why.** Moving all files makes the portal responsible for the freshness of other people's data, while municipalities keep updating their sites, and the copies diverge. Checking with copies is cheaper and gives a list of problems by source.
- **When to revisit.** If the share of broken links does not fall within six months, or if the portal becomes the only legally mandated place of publication.

## How it is done in platforms

The marks are core, extension, no, not checked, as in the [summary table](../12-appendices/03-platform-tables.md). Checked against documentation and repositories on 12 October 2026.

| Platform | Own files | Cloud storage | Links elsewhere | Database table and API | File after publication |
|-----------|--------------|--------------------|---------------|----------------------|-----------------------|
| CKAN 2.12 | core | extension: in 2.12, [ckanext-file-keeper-cloud](https://github.com/ckan/ckanext-file-keeper-cloud); earlier, ckanext-s3filestore and others | core | core (DataStore); CSV loading is the XLoader extension | overwritten; the new file handling in 2.12 does not change contents |
| Dataverse | core | core: S3 and compatible, Swift, Globus; several stores | core: trusted remote store | core: parsing tabular files, variable descriptions | replacement creates a new dataset version |
| InvenioRDM, Zenodo | core | core since v13: S3 and compatible | core: remote file, without guarantees | no | Zenodo: edits for 30 days, then a new version |
| DSpace | core | core: S3; several stores | no | no | a checksum is stored |
| Huwise (OpenDataSoft) | core: dataset attachments | stored by the provider | not checked | core: a dataset is a table of records | not checked |
| Socrata | core | stored by the provider | core: an "external data source link" asset | core | not checked |
| ArcGIS Hub | core | stored by the provider | core: a layer can live on an ArcGIS server | core (ArcGIS services) | not checked |
| GeoNetwork 4.4 | core: record attachments in the server's data directory | S3, JCloud and CMIS modules shipped | core, the main mode | no | not checked |
| udata (data.gouv.fr) | core | not checked | core | separate open services hydra and api-tabular | not checked |
| PxWeb, .Stat Suite | no | — | no | core (PxWeb has its own API, .Stat has SDMX) | — |
| A static site, Git | files next to pages or by link | as you decide | as you decide | no, unless you build it | Git history keeps all versions |

For cloud services, "stored by the provider" means the portal owner does not choose where the bytes live and cannot take them out other than by export. This must be reflected in the contract: the format and timing of an export on exit is as much a requirement as the price. More in the chapter ["Build, Open Source or SaaS"](../06-choice/05-build-or-buy.md).

### CKAN extensions and their risks

In CKAN, storage is the area with the most extensions and the fastest ageing. The method for evaluating an extension is in the chapter [on extension ecosystems](../05-platforms/02-extension-ecosystems.md); here is what turned up during the check.

- **Cloud storage.** CKAN 2.12 introduced configurable storage, but only disk storage ships with it. Cloud adapters were moved to the CKAN community's [ckanext-file-keeper-cloud](https://github.com/ckan/ckanext-file-keeper-cloud); its tests run only on 2.12, and there are no releases on GitHub yet. For versions before 2.12 there are previous-generation extensions: Keitaro's [ckanext-s3filestore](https://github.com/keitaroinc/ckanext-s3filestore) is tested on 2.10 and 2.11 but not 2.12; [ckanext-cloudstorage](https://github.com/TkTech/ckanext-cloudstorage) has not changed since February 2024 and has no automated tests; Datopian's [ckanext-blob-storage](https://github.com/datopian/ckanext-blob-storage) is tested on 2.8 and 2.9, with the last release in January 2023. Moving to 2.12 for a portal with files in the cloud means changing the storage extension, not just upgrading.
- **A public bucket.** The CKAN 2.12 documentation warns: if resource files and organisation images sit in one store that is open for reading, files of private datasets are available to everyone without a permission check. Resources and public images get separate stores.
- **Loading tables into the DataStore.** The officially supported loader is [XLoader](https://github.com/ckan/ckanext-xloader), tested on 2.10–2.12. An alternative with type inference and computed description fields is datHere's [DataPusher+](https://github.com/dathere/datapusher-plus); its tests run on CKAN 2.11, and release 3.0.0 came out in January 2026. The old DataPusher is no longer supported, and the CKAN documentation recommends moving off it.
- **Link checking and copies.** [ckanext-archiver](https://github.com/ckan/ckanext-archiver) and [ckanext-qa](https://github.com/ckan/ckanext-qa), which runs on top of it and rates format openness, are maintained by the CKAN community, with tests on 2.10–2.12.

On live portals these setups are visible at `/api/3/action/status_show`. On 12 October 2026, data.gov.gr on CKAN 2.11.3 kept files in Azure via cloudstorage and its own module, checked links with archiver and qa, and loaded tables with XLoader. opendata.swiss on 2.11.6 and HDX on 2.11.4 stored files in S3 via s3filestore and loaded tables with their own version of XLoader and with DataPusher+. Ireland's data.gov.ie ran CKAN 2.9.16 with the old DataPusher, a core version and loader that are no longer supported.

## Publishing without a portal

Without a portal you choose the storage yourself, and there are more options than it seems.

- **Files next to the pages** of a static site, for small datasets: everything sits in one place and moves together with the site.
- **A Git repository**: the history of all versions for free, but a limit of 100 MiB per file. Large files go into release attachments or Git LFS. More in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md).
- **Zenodo or another general-purpose repository**, when you need an immutable copy with a DOI. A GitHub repository release can be archived in Zenodo automatically.
- **A public object storage bucket**, for large data; it needs a `README.md` file with a description and licence alongside. More in the chapter [on cloud storage and hubs](../08-beyond-portals/04-cloud-storage-and-hubs.md).

The rule is the same as for a portal: a file's address must not change, and a corrected file gets a new name or a new version. Checksums can be placed alongside in a `SHA256SUMS` file or recorded in `datapackage.json`.

## How to check a live portal

A manual check takes ten minutes.

1. Open five to ten datasets from different organisations and click "Download". Look at the file's address.
2. If the domain matches the portal or is the portal's cloud storage, the file is held by the catalog. If the domain is different, it is a link to the source.
3. Open a few external links. See what opens: a file, a page listing files, the site's home page or an error.
4. If the dataset page has a table with a filter and a separate API address for its rows, table storage is enabled.
5. Look for a checksum or the date the link was last checked. If there is neither, the catalog does not know whether it is the same file or whether it is alive.

### Measurement on four portals

On a large portal the same is done by a program. On 12 October 2026 a thousand datasets were taken through the CKAN API on each of four portals: ten blocks of a hundred datasets, spread evenly across the whole catalog. Then one random external resource was taken from each dataset, 300 per portal in total, and each link was opened. Failed requests were retried one at a time with a wait of up to a minute.

| Portal | Datasets | Resources in the sample uploaded to the portal | Datasets with a DataStore table | External links: opened | Error or resource missing | Closed to programs | Page instead of file |
|--------|---------|------------------------|--------------------|---------------------------|------------------------|----------------------|-----------------------|
| data.gov.gr (Greece) | 22,736 | 35% | 3% | 94% | 5% | 1% | 1% |
| HDX (UN) | 28,312 | 55% | 7% | 68% | 6% | 24% | 2% |
| data.gov.ie (Ireland) | 22,770 | 0% | 41% | 95% | 3% | under 1% | 1% |
| opendata.swiss (Switzerland) | 16,521 | 0% | 2% | 94% | 2% | 0% | 4% |

"Error or resource missing" combines 404 and 410 responses, server errors, unreachable domains, timeouts and certificate errors. "Closed to programs" means 401, 403 and 429 responses: the file may exist, but a program does not get it. "Page instead of file" means the resource declares a file format (CSV, XLSX, PDF), but a web page opens. A sample of 300 links gives an accuracy of a few percentage points; it is a guide, not a census. All uploaded files that fell into the control sample (a hundred each on the Greek portal and HDX) opened.

What follows from the measurement.

**Errors are concentrated in a few sources.** On the Greek portal, 12 of 300 links failed because of a certificate error, and all of them lead to one map server of the municipality of Heraklion. On HDX, 73 of 300 links returned a 403 refusal, all to the UNHCR microdata library, which is closed to programs. So it is useful to aggregate link checking by domain: one conversation with one source removes most of the problems.

**"Closed" and "deleted" are different problems.** A file behind a bot check exists, and a person will download it. But a harvester, a web archive and a user's program will not get it, and for them it is just as lost. On the same day, Canada's open.canada.ca answered automated requests with refusals and delays even at its own service API address, so it was not included in the table. More in the anti-pattern ["The door is closed to programs"](../09-practices/02-anti-patterns.md#the-door-is-closed-to-programs).

**A link that opens does not mean the data is there.** Eight datasets in the sample on the Swiss portal declare CSV format, and the link in all of them leads to the same City of Bern page listing files. A link with PDF format to the statistiquedesrevenus.ch site redirects to a section of the Agroscope site: the old domain was redirected, and a section of the site opens instead of the document. A program that checks only the response code will count both links as working.

**A well-assembled portal of links can be reliable.** The Irish and Swiss portals have not a single file of their own in the sample, and obvious losses are under 3%. Their main sources, statistical offices and city portals, maintain their own data and do not change addresses. The data.gov.uk figure of a quarter of broken links is the result of years of collecting links to the sites of hundreds of local councils without checking, not an inevitable property of the link model.

### Commands

For a CKAN portal. The first command takes 500 datasets and counts the share of uploaded resources, resources with a DataStore table, and the most common external domains:

```bash
PORTAL=https://data.gov.gr
curl -s "$PORTAL/api/3/action/package_search?rows=500&start=5000" \
  | jq '[.result.results[].resources[]] as $r | ($r | length) as $n | {
      resources: $n,
      uploaded: ([$r[] | select(.url_type == "upload")] | length / $n),
      in_datastore: ([$r[] | select(.datastore_active == true)] | length / $n),
      top_external_hosts: ([$r[] | select(.url_type != "upload") | .url | capture("^https?://(?<h>[^/]+)").h]
        | group_by(.) | map({host: .[0], n: length}) | sort_by(-.n) | .[0:5])
    }'
```

The second opens external links from the same sample and prints the response code, content type and final address. A 200 code with type `text/html` for a resource declared as CSV is a reason to open the link and look:

```bash
curl -s "$PORTAL/api/3/action/package_search?rows=50&start=5000" \
  | jq -r '.result.results[].resources[] | select(.url_type != "upload") | .url' \
  | head -30 \
  | while read -r url; do
      curl -s -o /dev/null -L -m 30 -A "Mozilla/5.0" \
        -w "%{http_code}\t%{content_type}\t%{url_effective}\n" "$url"
    done
```

Not all servers answer a `HEAD` request, so the command makes an ordinary request and discards the response body. Run the check slowly, one link at a time: dozens of parallel requests to one site look like an attack, and you will get a refusal an ordinary user would not.

To find out which storage and link-checking extensions are installed on the portal:

```bash
curl -s "$PORTAL/api/3/action/status_show" \
  | jq '{ckan_version: .result.ckan_version,
         storage: [.result.extensions[] | select(test("xloader|datapusher|archiver|qa|cloud|s3|blob|filestore|file_keeper"))]}'
```

For data.gouv.fr, check results are already recorded in each resource's description: the fields `check:status`, `check:available`, `check:date` and the checksum `analysis:checksum`. The share of files uploaded to the portal is visible from the `filetype` field: `file` is held by the portal, `remote` is a link.

```bash
curl -s "https://www.data.gouv.fr/api/1/datasets/?page_size=100&page=200" \
  | jq '[.data[].resources[]] as $r | ($r | length) as $n | {
      resources: $n,
      uploaded: ([$r[] | select(.filetype == "file")] | length / $n),
      checked: ([$r[] | select(.extras["check:status"] != null)] | length / $n),
      not_available: ([$r[] | select(.extras["check:available"] == false)] | length / $n)
    }'
```

How to turn shares of broken links into a quality metric and track it is covered in the chapter [on quality metrics](../10-quality/02-metrics.md).

## What follows from this

- Decide before launch where the bytes live: disk, cloud or links. Moving already uploaded files costs more than choosing on day one.
- If your files are cited for years, store them yourself, do not overwrite them after publication, and calculate checksums. A correction is a new version.
- If the catalog links elsewhere, check the links on a schedule, aggregate errors by source and keep copies of important datasets. Check not only the response code but also that a file opened and not a page.
- Raise the upload size limit to a realistic one: CKAN's default 10 MiB quietly turns a portal into a portal of links.
- Set up a database table with an API for tables people filter and query, and always keep a whole-table download alongside.
- In CKAN, choose storage extensions for your core version: when moving to 2.12, cloud storage changes extension.
- Give users a permanent file address on the portal, not a temporary cloud storage link.

## Sources

- CKAN 2.12: [file storage and configurable stores](https://docs.ckan.org/en/2.12/maintaining/filestore.html): the 10 MiB limit, cloud adapters in a separate extension, the public store warning, immutable files in the new handling; [DataStore](https://docs.ckan.org/en/2.12/maintaining/datastore.html): PostgreSQL, result limits, dumps, XLoader, DataPusher+ and the end of DataPusher support
- CKAN extensions: [ckanext-file-keeper-cloud](https://github.com/ckan/ckanext-file-keeper-cloud), [ckanext-s3filestore](https://github.com/keitaroinc/ckanext-s3filestore), [ckanext-cloudstorage](https://github.com/TkTech/ckanext-cloudstorage), [ckanext-blob-storage](https://github.com/datopian/ckanext-blob-storage), [XLoader](https://github.com/ckan/ckanext-xloader), [DataPusher+](https://github.com/dathere/datapusher-plus), [ckanext-archiver](https://github.com/ckan/ckanext-archiver), [ckanext-qa](https://github.com/ckan/ckanext-qa): automated test files and change dates, checked 12 October 2026
- Dataverse: [file storage](https://guides.dataverse.org/en/latest/installation/config.html#file-storage): S3, Swift, Globus, trusted remote store, direct upload, temporary links, checksums
- InvenioRDM: [S3 storage](https://github.com/inveniosoftware/docs-invenio-rdm/blob/master/docs/operate/customize/file-uploads/s3.md) (since v13) and [file transfer types](https://github.com/inveniosoftware/docs-invenio-rdm/blob/master/docs/reference/file_transfer.md): local, fetch, multipart, remote
- Zenodo: [managing files](https://help.zenodo.org/docs/deposit/manage-files/): 50 GB and 100 files, edits within 30 days
- DSpace: [storage layer](https://wiki.lyrasis.org/display/DSDOC9x/Storage+Layer): disk and S3, several stores, checksums, traffic costs
- GeoNetwork: [storage modules in release 4.4.12](https://github.com/geonetwork/core-geonetwork/tree/4.4.12/datastorages)
- Socrata: [linking to an external data source](https://support.socrata.com/hc/en-us/articles/36233059107223-Linking-to-an-External-Data-Source)
- data.gouv.fr: [the hydra crawler](https://github.com/datagouv/hydra) and [the tabular API](https://github.com/datagouv/api-tabular); check fields in the [datasets API](https://www.data.gouv.fr/api/1/datasets/), checked 12 October 2026
- Measurement on 12 October 2026: the CKAN APIs of [data.gov.gr](https://data.gov.gr), [HDX](https://data.humdata.org), [data.gov.ie](https://data.gov.ie), [opendata.swiss](https://opendata.swiss), 1,000 datasets and 300 external links per portal; the `status_show` address for versions and extensions; HDX's redirect to a temporary S3 link
- I. Begtin, [Good and bad data publication practices](https://begtin.substack.com/p/2ef) (in Russian), November 2024: the share of broken links on data.gov.uk in the 2023 dump
- Congressional Research Service, [Data.gov: Implementation and Perspectives on Its Functions](https://www.congress.gov/crs-product/R48954), R48954, 21 May 2026: registry or repository, preserving access to data
- GDS, [What's changing on data.gov.uk and why](https://dataingovernment.blog.gov.uk/2026/03/25/whats-changing-on-data-gov-uk-and-why/), 25 March 2026: at least 25% of links lead to an error
- [Anatomy of a Catalog](../01-basics/03-anatomy.md), [APIs and Bulk Download](./04-access-interfaces.md), [publishing without a portal: static sites](../08-beyond-portals/02-static-sites.md): data.gov.cz as a portal without files
- [Leading catalogs](../11-trends/02-innovative-catalogs.md): data.gouv.fr's tabular API and Hugging Face's conversion of datasets to Parquet
