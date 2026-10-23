---
title: Checklists
description: "The book's combined checklists: checking a live portal, indicator and microdata catalogs, assessing an extension and a platform, publishing, closing a catalog and publishing without a portal."
---

# Checklists

Short lists live in the chapters, next to the explanation. Here they are collected in working form: they can be printed or copied into a task. Each item links to the chapter that explains why it is needed.

Two long lists stay in their chapters, because they cannot be filled in without explanation:

- [Catalog requirements and platform comparison](../06-choice/07-requirements-checklist.md): what to put in a specification and what of it is not mandatory for everyone.
- [Self-audit](../10-quality/04-self-audit.md): how to assess your catalog in one pass and what to record in the result.

## Checking a live portal

This list works both for your own catalog and for someone else's that you are considering as a model or as a source for harvesting. It takes about half an hour.

**Findability and dump**

- [ ] The dataset page has an `application/ld+json` block with the Dataset type: [metadata export](../04-features/02-metadata-export.md).
- [ ] The dump declares the profile the harvester expects (DCAT-AP 3.0.1, DCAT-US 3.0), rather than merely opening at a `data.json` address.
- [ ] A `sitemap.xml` sitemap responds: [API and bulk download](../04-features/04-access-interfaces.md).
- [ ] There is a file with all descriptions (`data.json`, `catalog.rdf`, `catalog.ttl`), and it opens without a login.
- [ ] The number of datasets in the dump matches the number in the site's search.
- [ ] The dump passes the validator for the relevant profile: DCAT-AP, INSPIRE or DataCite: [quality metrics](../10-quality/02-metrics.md).
- [ ] For a geoportal, CSW or OGC API Records responds; for a research repository, OAI-PMH.
- [ ] A paginated dump reaches the last page, and API search serves the next page: [API and bulk download](../04-features/04-access-interfaces.md#how-to-check-a-live-portal).
- [ ] There is a "modified since date" query or a change feed, and something from the last few days is in it.
- [ ] Descriptions and the API respond from the command line, without a login, a key or a bot check, preferably from another network.
- [ ] Large databases have a bulk download as files with a date and size, not only an API with limits.
- [ ] Limits, terms of use and API documentation are published; the API has a contact.

**Descriptions**

- [ ] Ten random datasets, not the newest, have the licence, publisher, update date, period and territory filled in: [metadata depth](../04-features/03-metadata-depth.md).
- [ ] The most frequent value of period, territory and update frequency is not a placeholder such as "1900–2099" or "the whole country" across datasets from different organisations: [checking on a sample](../04-features/03-metadata-depth.md#two-checks-on-a-sample).
- [ ] The description does not repeat the title and is longer than 50 characters: Google's markup will not accept a shorter one.
- [ ] The licence is looked for where the schema keeps it: in DCAT-AP, on the distributions rather than the dataset.
- [ ] Theme, licence, language and territory come from a shared code list rather than free text: [metadata standards](../07-publishing/02-metadata-standards.md).
- [ ] Tabular datasets have a data dictionary, and the column types match the content.
- [ ] Custom fields and schema plugins (ckanext-scheming, ckanext-validation, GeoNetwork profiles) have been checked against the repository and the branch for the current core version.

**Content**

- [ ] Most datasets are not one- or two-line notes, and the total data volume is comparable with the main sources on the topic: [substantive check](../10-quality/04-self-audit.md#substantive-check).
- [ ] "Updated" datasets really changed: the file has new periods, not just a new date in the record.
- [ ] For CSV, the encoding and delimiter are stated or unambiguous: [anti-patterns](../09-practices/02-anti-patterns.md).

**Files and addresses**

- [ ] "Download" links open. Count the share of external links that return an error, and group the errors by domain: [internal storage](../04-features/05-data-storage.md#how-to-check-a-live-portal).
- [ ] A link labelled CSV, XLSX or PDF opens a file, not a web page or the site's home page.
- [ ] External links are checked on a schedule, and a resource shows the date and result of the last check.
- [ ] The upload size limit has been raised to a realistic level: in CKAN the default is 10 MiB.
- [ ] A published file that is cited is not overwritten: a correction is a new version; the file has a checksum.
- [ ] The user is given the file's persistent address on the portal, not a temporary cloud storage link.
- [ ] The dataset page address does not change when the description or title is edited: [identifiers](../04-features/06-identifiers-and-doi.md).
- [ ] If a DOI is promised, `https://doi.org/…` leads to the dataset page, not to the home page, a test instance or `localhost`.
- [ ] If the page shows a Handle, it resolves through `hdl.handle.net`, and the prefix is not the `123456789` placeholder from the DSpace distribution.
- [ ] A withdrawn dataset with a DOI is replaced by a tombstone page, not a "not found" page.
- [ ] If the portal has moved, old addresses redirect rather than answering "not found".

**Citation and access**

- [ ] There is a "How to cite" block, and BibTeX or RIS with the same identifier can be downloaded: [citation export](../04-features/07-citation.md).
- [ ] The citation has the dataset's publication year, not the year the record was created; there is a version or, for updated datasets, an access date.
- [ ] If the dataset has a DOI, the DataCite citation matches the one on the page by author, year and version.
- [ ] The dataset shows an organisation and a contact: [access, roles and workflows](../04-features/08-access-control-and-workflow.md).
- [ ] Descriptions of restricted datasets are visible without a login; downloading is not.

**Search, languages, harvesting and feedback**

- [ ] A word from the middle of a description is found by search, and with hundreds of datasets there is a filter by organisation and format: [other capabilities](../04-features/10-other-capabilities.md).
- [ ] After switching language, the same word in that language finds the dataset, and the translated description matches the original text.
- [ ] A tabular file has a table on the page or a direct link. For a restricted file, the content is not visible to those it is restricted from.
- [ ] A harvested dataset has a link to the original, and a harvest source shows the date of the last successful run and the number of datasets.
- [ ] The counter sees the access method by which the data is actually used: page, file or API.
- [ ] An error report reaches the data owner. A person and a response time are named.

The network part can be checked with one script. Substitute the portal address:

```bash
PORTAL=https://portal.example
for path in sitemap.xml data.json catalog.rdf catalog.ttl \
            "api/3/action/package_search?rows=1" \
            "oai?verb=Identify" \
            "csw?service=CSW&request=GetCapabilities"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 20 "$PORTAL/$path")
  echo "$code  $path"
done
```

A `200` response at an address that fits the catalog type is a good sign. A `401` or `403` response, or a login page, means there is no machine access, even if it is promised. The CKAN, OAI-PMH and CSW addresses do not fit every platform: no response at an address for another type is not an error.

## Indicator catalog

Details are in the chapter [on indicator catalogs](../03-types/05-indicator-catalogs.md#what-makes-an-indicator-catalog-convenient).

- [ ] Territories, industries and other dimensions are coded with shared code lists, and the code lists can be downloaded.
- [ ] The whole database can be taken in full: as an archive, or as a file per indicator plus a list of files.
- [ ] An export from the table builder gives the whole series, not just the slice shown by default.
- [ ] There is an API, and each indicator has a persistent query address.
- [ ] Besides Excel there is CSV and SDMX or JSON-stat.
- [ ] Methodology and unit of measurement sit next to the series, not only in a PDF.
- [ ] The API is described in OpenAPI, or at least on a web page with example queries.

## Metadata catalog

Details are in the chapter [on metadata catalogs](../03-types/08-metadata-catalogs.md#what-makes-a-metadata-catalog-useful).

- [ ] Every concept, code and description has a persistent address that does not change when the site moves.
- [ ] An outdated entry is marked, and it is visible what replaced it; entries are not silently deleted.
- [ ] An entry's address serves a program SKOS, SDMX or DCAT, not only a page.
- [ ] The whole vocabulary or list can be downloaded as a single file.
- [ ] Each entry has a named steward, and the catalog has written inclusion rules.
- [ ] The catalog is registered one level up: in BARTOC, re3data, FAIRsharing, a FAIR Data Point index or a national single point.
- [ ] Programs are not answered with a bot check instead of data.

## Microdata catalog

Details are in the chapter [on microdata catalogs](../03-types/06-microdata-catalogs.md#what-makes-a-microdata-catalog-convenient).

- [ ] The study description is visible without a login: sample, unit of observation, period, territory.
- [ ] Variables have the question text, labelled values and frequencies.
- [ ] Each file states its access type; the conditions, what an application needs and the response time are written before the application.
- [ ] Descriptions are exported in DDI, there is an API or OAI-PMH, and they respond to a program without an "I am not a robot" check.
- [ ] The study has a DOI or a persistent address and a ready citation.
- [ ] Open files are also available as CSV or Parquet, not only in SPSS and Stata formats.
- [ ] The catalog sits on the owner's domain with HTTPS, not on an IP address or a contractor's subdomain; maintenance is budgeted.

## Before installing an extension

Details are in the chapter [on extension ecosystems](../05-platforms/02-extension-ecosystems.md).

- [ ] It is clear who releases the extension and answers bug reports. One person with no answers for two years and no tests is a reason to look for another module.
- [ ] Your core version is named in the automated tests, a compatibility table or a branch name. A fresh release with old tests does not count. "It worked for our neighbours" does not count.
- [ ] If there are several copies, the decision record states the address of the one you install.
- [ ] The installation command points to this repository and to a branch that exists in it.
- [ ] There is a licence file, and it permits what you need.
- [ ] For an external program, it is recorded how it gets the file: a short signed link or a long-lived key.
- [ ] The decision record states what to do if the extension stops being maintained: [justifying a decision](../06-choice/04-justifying-decisions.md#if-an-extension-stops-being-released).

## Before buying or installing a platform

Details are in the chapters [on deployment and operations](../04-features/09-deployment-and-operations.md) and [on the cost of leaving](../06-choice/05-build-or-buy.md).

- [ ] There is an official container and a short upgrade guide.
- [ ] It is known how many recent versions are supported and how often they come out.
- [ ] It has been counted how many extensions the mandatory functions need and who releases them.
- [ ] It is named who will be on duty two years from now: an in-house position, a contractor or the service vendor.
- [ ] It has been checked that all descriptions and files can be exported in full; otherwise leaving the platform will be expensive.
- [ ] A pilot has run on ten real datasets, not demo ones.

## Before calling a dataset published

Details are in the chapter [on the publishing process](../07-publishing/01-publishing-process.md).

- [ ] The dataset has a persistent address.
- [ ] The licence on the record, on the file and in the dump is the same link or a known code. "Not specified", a code without text and a phrase in the footer do not count: [licences](../07-publishing/04-licenses-and-access.md).
- [ ] The file or service opens, or it is honestly stated why it is unavailable and how to request it.
- [ ] The update date and frequency are stated.
- [ ] The description is in the full dump and visible to the upper portal.
- [ ] A draft did not get into search before publication.
- [ ] A person or team is named who will answer about an error in the rows. An `info@` inbox without a name does not cover this.
- [ ] The inventory or queue records why this dataset is being published now.

## While the dataset remains published

Details are in the chapter [on the publishing process](../07-publishing/01-publishing-process.md#updates).

- [ ] The file date is no older than the promised frequency. An empty frequency means no update has been set for this dataset.
- [ ] A withdrawn dataset is marked: the old address opens and explains why there are no more releases or what replaced it.
- [ ] A request for a missing dataset goes into the queue rather than staying only an email.
- [ ] The data inventory exists as a document (a table or a description file), not only in the editor's memory.

## Before switching off a catalog

Details are in the chapters [on lifecycle](../09-practices/03-lifecycle.md) and [on archiving](../09-practices/04-archiving.md).

- [ ] The closure is announced in advance, months rather than days ahead; for the transition period the catalog runs read-only.
- [ ] The data is handed over to another catalog or archive, or it is stated explicitly that it has been withdrawn from publication.
- [ ] Old addresses either redirect or, for at least a year, say where the dataset has moved.
- [ ] A snapshot of descriptions is saved: a dump through the API or a DCAT file, not just site pages.
- [ ] Files that exist only in this catalog are saved together with the addresses they were taken from.
- [ ] It has been checked that the site is in Internet Archive or a national web archive and that the archive can reach it, including from abroad.
- [ ] The upper portal and the registries where the catalog was registered have been notified.

## Before setting up your own portal

Details are in the chapter ["When You Don't Need a Portal"](../08-beyond-portals/01-when-portal-not-needed.md).

- [ ] The recipient is named: who takes the descriptions and in which profile.
- [ ] Datasets, publishing organisations and update frequency have been counted.
- [ ] A person is named who will update the publication three years from now, and separately who updates the server if a portal is installed after all.
- [ ] Someone else's catalog that already accepts these datasets has been checked: regional, national, university, Zenodo.
- [ ] If your own site or repository remains, each dataset has a licence, a date and a direct link to the file.
- [ ] The event on which the decision not to have a portal is reopened is written down.

## Before an entry point for programs and a data space

Details are in the chapter [on AI and data spaces](../11-trends/01-ai-and-data-spaces.md).

- [ ] The description dump, the licence and a direct link to the file already work.
- [ ] An MCP server or an `llms.txt` file is set up when programs are already in use and there is someone to maintain it.
- [ ] Search by phrase sits next to ordinary search and returns dataset records.
- [ ] A chat links to the dataset. The record, file and licence remain.
- [ ] A data space is set up when several organisations exchange data and their rights differ.

## Before fixing quality

Details are in the chapter [on quality levels](../10-quality/01-quality-levels.md).

- [ ] The task names the level: data, descriptions, the catalog as a service or the system of catalogs.
- [ ] The person doing it is whoever owns that level: the data owner, the editor, the platform administrator or the country coordinator.
- [ ] The queue starts with files that open and can be read. The dump jumps ahead when a harvesting date is set from above.
- [ ] Someone else's score is placed on a level: a record score and MQA are descriptions, a country index is the system, the number of datasets is a record counter.

## The minimum for publishing without a portal

Details are in the chapter [on making a publication findable](../08-beyond-portals/05-making-it-findable.md).

- [ ] One page with a persistent address. The path does not change when the title is edited.
- [ ] The description in the markup is 50 to 5,000 characters, with the same meaning as the page text.
- [ ] The licence is a link to a specific version, the same on the page, in the file and in the DOI record.
- [ ] The HTML has schema.org/Dataset and a direct link to the file. There is no empty DOI in the markup.
- [ ] The page opens without a login. If there are several pages, there is a sitemap. `robots.txt` sits at the root of the site's host name.
- [ ] A file in a harvester's profile only if there is a harvester, and that profile's mandatory fields are filled in.
- [ ] The table has a `datapackage.json`. The update date and contact are written on the page.
- [ ] A DOI if the dataset is cited. `sameAs` holds another page for the same dataset.

Ready file templates (README, `datapackage.json`, `CITATION.cff` and schema.org markup) are in the [templates](pathname:///templates/README.md).

## Static catalog

Details are in the chapter [on static sites](../08-beyond-portals/02-static-sites.md).

- [ ] Each dataset's page is built as HTML. The description text is in the page file, not only loaded by a script.
- [ ] The page address does not change when the title is edited. Renaming the file changes the address.
- [ ] The HTML has schema.org/Dataset. DCAT markup in page attributes does not replace it.
- [ ] The file of all descriptions opens without a login. The record has a publisher, a licence, a modification date and a direct link. The `conformsTo` line has been checked against the fields.
- [ ] The licence field holds a known licence. The value `No licence` does not count.
- [ ] The `sitemap.xml` sitemap opens.
- [ ] If an editor form is enabled, an edit shows up as a commit. A separate login server, if the hosting requires one, is recorded in the decision record.
- [ ] The site size and build time fit within the hosting limits.

## A repository with data

Details are in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md).

- [ ] One dataset, one package. The descriptor is called `datapackage.json` and sits at the package root.
- [ ] `LICENSE` holds the data licence. If there is a script alongside, the code licence is named separately.
- [ ] `CITATION.cff` has `type: dataset`. There is no empty DOI in the file.
- [ ] The file is smaller than the platform limit. A large file goes in a release attachment or outside Git, and the repository keeps its address.
- [ ] The cited release is fixed with a tag. On GitHub the Zenodo link is enabled before this release, the record type is "dataset", and the licence matches `LICENSE`.

## Files in the cloud or on a shared hub

Details are in the chapter [on cloud storage and hubs](../08-beyond-portals/04-cloud-storage-and-hubs.md).

- [ ] Next to the files are a `README.md`, a licence and checksums. The licence on the page, in the record and in the file is the same.
- [ ] The file address is persistent. It is not a temporary link and not a Requester Pays bucket.
- [ ] The file downloads without a login. Checked with a request without a cloud key and in a browser where you are not logged in to the platform.
- [ ] The cited release has a DOI or a copy outside the platform.
- [ ] Before uploading, it was checked that your datasets can be retrieved in full. If storage is paid for by a sponsorship programme, the decision record states the day it expires.
