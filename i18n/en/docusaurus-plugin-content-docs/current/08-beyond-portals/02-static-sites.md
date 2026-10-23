---
title: Static Sites
description: "When a catalog is built from files (JKAN, an ordinary generator, PortalJS, OpenSDG, a static STAC catalog) and what to check in the finished pages."
---

# Static Sites

A static site is a set of ready-made pages. A generator builds them from files, most often from a Git repository, and the hosting only serves the result: GitHub Pages, GitLab Pages and others. There is no database and no application running around the clock. An already built site survives a pause in the generator's development, and taking the catalog home means copying the files.

This is enough when a small group publishes the datasets, and the reader and the harvester need a dataset page and one description file. This is how [opendata.scot](https://opendata.scot) works: on 14 October 2026 its description file held 2,596 datasets. Roles, a queue of requests for a closed file and a search API are a reason to change the publishing approach. A server set up next to the generator does not solve these tasks: the result is a home-made portal that nobody is there to maintain.

The order "repository, markup, DOI, record in someone else's catalog" is in the chapter ["Making a Publication Findable"](./05-making-it-findable.md). Here: what the site itself is built from, and where ready-made tools stop.

## When it is enough

| Situation | Where to go |
|----------|------|
| Dozens to a few thousand open datasets, edited as files by one or two people | a static catalog: JKAN or your own generator |
| Few datasets, the agency's website already exists, the harvester needs one file | a description file on that website. See ["When You Don't Need a Portal"](./01-when-portal-not-needed.md) |
| Sustainable Development Goal indicators, people need a showcase | OpenSDG |
| Satellite images and other spatial files read by a program | a static STAC catalog in storage. See [geoportals](../03-types/03-geoportals.md) and [cloud](./04-cloud-storage-and-hubs.md) |
| One large table that needs a page and queries | Datasette. This is already a small server, not a folder of files |
| Many publishers without Git, closed files, a search API | a portal or someone else's catalog |

## How it is built

The sources live in Git: a file per dataset, a page template, licences. On every change the generator builds HTML, a common description file and `sitemap.xml`. The hosting puts this folder at the site's address. The reader gets ordinary pages. The harvester takes one file instead of clicking through buttons.

Harvesting other catalogs is possible in this setup, but it is a script next to the site, not a generator feature. On a schedule, the script downloads descriptions, puts them as files into the repository, and the generator rebuilds the pages. opendata.scot is made this way. The finished site still crawls nothing and moderates no one: it contains whatever files the script managed to put there.

On GitHub Pages this setup has a ceiling. As of 14 October 2026 the documentation says: a published site is no larger than 1 GB, a build is cut off after 10 minutes, the recommended limit for the source repository is also 1 GB, and the soft bandwidth limit is 100 GB a month. On opendata.scot the data files live with the publishers, and the repository holds the descriptions, so the site fits within this limit. A catalog that holds the tables themselves will hit a gigabyte before it hits a number of datasets. Other hosting has its own limits; read them for that hosting before publishing.

A page must contain the description text in HTML. A site that draws the dataset page only with a script in the browser is empty for a harvester and a search engine. How to check this is in the chapter [on portal discoverability](../07-publishing/05-discoverability.md).

## What to build with

| Tool | When it is used | What it does not ship with |
|------------|-----------------|---------------------|
| JKAN | open datasets, from dozens to a few thousand | a search API, roles, schema.org; the description file is shorter than the schema it names |
| An ordinary generator (Hugo, Jekyll, Astro) | few datasets, a site template already exists | a ready catalog: the page, markup and description file are written by you |
| PortalJS | your own interface on top of files or an existing catalog | roles and a search API in the free build from files |
| OpenSDG | a showcase of Sustainable Development Goal indicators | a live SDMX service and a general catalog of arbitrary files |
| A static STAC catalog | spatial files read by a program | an answer to the query "all files for this territory for these dates" |
| Datasette | one SQLite database | being static: the page is alive only while the process is running |

In the dataportals-registry, release 1.27.0 of 15 October 2026, there are 48 open data portals on JKAN, 72 catalogs on OpenSDG and 44 open data portals on Datasette. These are the same numbers as in the chapters on [open data portals](../03-types/02-open-data-portals.md), [indicators](../03-types/05-indicator-catalogs.md) and in the [JKAN profile](../05-platforms/04-platform-profiles.md).

An ordinary generator needs a page template, a schema.org block from the [ready-made file](pathname:///templates/schema-dataset.jsonld) and a `data.json` or `datapackage.json` file alongside. A single dataset in Git is analysed in more detail in the chapter [on repositories](./03-git-repositories.md). A generator is chosen when there are few datasets and JKAN with its schema only gets in the way. When there are dozens of datasets, a ready catalog saves you the template.

### JKAN

[JKAN](https://jkan.io/) is a catalog on Jekyll, MIT licence. A dataset is a Markdown file in the `_datasets` folder. The page address comes from that file's path: editing the title does not change the address, renaming the file does. Alongside, an organisation page and a common `data.json` are built.

The file declares the DCAT-US 1.1 schema with a `conformsTo` line. The template fills a fixed list of fields: title, description, category, contact, licence and file links. A field added to the site schema is visible on the page. It reaches `data.json` only if it is separately written into that file's template. The DCAT-US 1.1 schema also requires keywords, a modification date, a publisher, an identifier, an access level and, for US federal bodies, bureau and programme codes. The template does not output them. It tries to take the publisher and loses it: in the template on the `main` branch, the variable the publisher is written to and the variable it is read from have different names. The `conformsTo` line is always set nonetheless. This file is not served to a harvester that needs DCAT-AP until the template is reworked. The [municipality scenario](../06-choice/06-scenarios.md) says the same.

The page template has no schema.org markup. There is RDFa: the page block carries `dcat:Dataset`. Google's documentation says it reads such DCAT on a page too, but the Rich Results Test does not accept the DCAT example. schema.org from the book's file is added to the template: the test checks this markup before indexing. How the fields work is in the chapter [on findability without a portal](./05-making-it-findable.md).

Search on the site is an in-browser filter over the `datasets.json` file. This search has no separate API. The common file for harvesters is `data.json`.

There is an editor form: Decap CMS, at the `/editor` page. A person logs in with a GitHub account, and an edit becomes a commit. The form provides no roles and no request queue. On Netlify, login is configured at the hosting. On GitHub Pages, the JKAN instructions call for a separate small login server. That is already a process someone has to keep running: for the sake of a form on free GitHub pages, the static site stops being just files. Those who are happy to edit Markdown do not enable this server.

The numbered release is 2.0.0 of 30 March 2023. As of 14 October 2026 there is no later number. The `main` branch lived on after the release. The sitemap, via the `jekyll-sitemap` plugin, was added on 29 July 2026 and is not in the 2.0.0 tag. The branch's last push was on 7 September 2026. In 2018–2020 there were commits, mostly on styling. In 2021 there were none. At the end of 2022 the built-in editor was replaced with Decap. An already built site does not fall over during such a pause. The template goes stale: a copy from the 2.0.0 tag will not get the sitemap until it is updated.

### PortalJS

[PortalJS](https://portaljs.org/) is a toolkit on Next.js, MIT licence. According to the documentation as of 14 October 2026, the free build reads CSV and JSON from project files by default and can export a static site to a folder. At build time the same interface can fetch pages in advance from an already running CKAN. While the build is static, the hosting again serves files, and new datasets appear after the next build. A mode in which the page asks the server every time requires a host with Node, not a folder of files.

Paid hosting is a separate product. Pricing on the same day: 1,188, 3,588 and 14,990 dollars a year. Roles are available from the first paid plan. API search and managed CKAN start from the second, at 3,588 dollars a year. This is a portal with a subscription, not a way to make do with files. A price comparison is in the chapter [on the build approach](../06-choice/05-build-or-buy.md). The "ready catalog with your own site on top" setup is there too, in the section on a ready core.

### OpenSDG

[OpenSDG](https://open-sdg.org/) is a static site for Sustainable Development Goal indicators, MIT licence. Release 2.4.0 came out on 19 August 2025. Indicator data and texts live in a separate repository, a build program prepares files from them, and Jekyll builds the pages. This is how the [UK SDG indicators](https://sdgdata.gov.uk/) work: on 14 October 2026 the page code included the `jekyll-open-sdg-plugins` plugin.

SDMX here is a source the build can read, and SDMX-ML files it can put on the site if this is switched on. The site does not run a live SDMX service that Eurostat or the IMF would query. A national office needs PxWeb or .Stat for exchange, and OpenSDG for a public showcase. The choice is set out in the chapter [on indicator catalogs](../03-types/05-indicator-catalogs.md#how-to-choose).

### A static STAC catalog

A static STAC catalog is a tree of JSON files. At the root is `catalog.json`, then collections and items with links to images, rasters and other spatial files. The specification's best practice is direct: these are files on a web server, often in object storage; the catalog can be walked by its links, and it does not answer queries. The file names are `catalog.json` and `collection.json`. Links within the tree are made relative if the catalog must be movable.

As long as a program reads the catalog, no separate catalog server is needed. [STAC Browser](https://github.com/radiantearth/stac-browser) opens both such a tree and a STAC API. The tree cannot itself run the query "all items in this rectangle for these dates": for that, the files are loaded into an API. A live example of a tree is the public Google Earth Engine catalog, the file [`catalog.json`](https://earthengine-stac.storage.googleapis.com/catalog/catalog.json). On 14 October 2026 it was a document of type `Catalog` with 133 child links, 25,841 bytes. There is also an HTML page for the same datasets; the JSON is for programs.

### Datasette

[Datasette](https://datasette.io/) publishes an SQLite database: a web page and a JSON API appear with one command. Apache-2.0 licence. It is a neighbour of static sites, not one itself: the process must be running, otherwise there is no page. Maintenance is simpler than a portal, but it is still maintenance of a process.

There is also Datasette Lite: the same program in the browser, via WebAssembly. The hosting serves the page and the database file, and the reader loads the database locally. This is how you publish a single table that can realistically be opened in full. A catalog of thousands of files is not put into a browser.

## Two live catalogs

Two working examples show that a static catalog is not only for a small collection: one is a national portal, the other was built by a community with no government budget.

### The Czech national portal

[data.gov.cz](https://data.gov.cz/) has two different products at one address. The information part (articles, instructions, standards) is built with Jekyll from the [site repository](https://github.com/datagov-cz/data.gov.cz) and published via GitHub Pages. The README as of 14 October 2026 says the same. Text edits are proposed with a pull request, as in any open project.

The dataset catalog is a separate application. The README points to it explicitly: the national catalog's interface lives in another repository, LinkedPipes DCAT-AP Viewer. Descriptions sit in a linked data store, and a SPARQL query endpoint is open to it. Linked data is a way of publishing descriptions so that a record and a value each have their own address and can be referenced from another system.

The portal does not store dataset files. On 14 October 2026 SPARQL counted 31,272 datasets from 133 catalogs and 39,624 distinct download addresses. Of these, 16 pointed to data.gov.cz itself. These are the catalog's own materials: lists of schools, libraries and sports grounds, a catalog dump, link quality reports. The other addresses are publishers' sites. The price of this lightness is that the portal will not keep a copy if an agency deletes a file. Why this matters is in the chapter [on storage](../04-features/05-data-storage.md).

The number of datasets changes more than the structure. On 24 February 2023 there were about 142,000, of which about 137,000 came from one cadastral agency. By October 2026 the SPARQL endpoint had 31,272. The catalog is still an index, not an archive.

### A catalog built by the community

For a long time Scotland had no common government open data portal, although cities, agencies and universities had their own. Volunteers built opendata.scot: a JKAN site, with descriptions and harvesters [on GitHub](https://github.com/OpenDataScotland/jkan). Scripts take descriptions from portals on CKAN, ArcGIS and other platforms and put them as files into the repository. From July to 9 October 2026, synchronisation ran roughly once a week. The last such commit was on 9 October, and the file on the site was updated in the same minute.

On that day, 14 October, `data.json` held 2,596 datasets. The file is 5,878,536 bytes and declares the DCAT-US 1.1 schema. Each record has six fields: title, description, category, contact, licence, links. None has a publisher. There are no keywords, modification dates, identifiers or access levels either. Yet the organisation is on the dataset page: the block carries a publisher in RDFa. A harvester that reads only `data.json` will not see it.

The licence in the file is filled in and not always usable. For 1,407 of 2,596 it is a link to the Open Government Licence 3.0. For 462 the field says `No licence`: the cell is not empty, but the data cannot be used under it. 232 datasets have no file link at all. The files themselves live on the websites of cities and agencies. Among the most frequent addresses are portals on ArcGIS Hub.

The dataset page, opened the same day, contains no schema.org. It has `dcat:Dataset`, as in the JKAN template. The sitemap opens. Search on the site reads `datasets.json`, 5,775,288 bytes. There is no separate search API.

The site has an analytics section: which organisations publish data and which platforms their portals run on. Page hosting is GitHub Pages. A catalog server is not needed as long as the description file and pages are satisfactory. Later the Scottish Government built its own data search engine. It is analysed in the chapter [on search engines and aggregators](../03-types/09-search-engines-aggregators.md).

## What to do on the site

- The dataset page address does not change when a typo is fixed. In JKAN, do not rename the file for that.
- The page HTML contains schema.org/Dataset. RDFa with `dcat:Dataset` does not replace it.
- One file with all descriptions opens without a login. A record has a publisher, a licence, a modification date and a direct file link. The `conformsTo` line is checked against the fields.
- The licence field contains a link to a well-known licence or an explicit text of terms. The value `No licence` does not count as a licence.
- There is a `sitemap.xml`.
- The description text is in the HTML, not appearing only after a script runs.

Without these items the site remains a list of links. With them it covers the minimum from the [checklist](../06-choice/07-requirements-checklist.md). How to take one publication through to a search engine and someone else's catalog is in the chapter [on findability](./05-making-it-findable.md).

## When a static site is no longer enough

It is time to change the approach when there are more publishers without a Git account than the team can handle through pull requests. The same applies when a description is open, a file is closed, and requests can no longer be handled by email. A search API is needed when there are so many datasets that a common JSON becomes heavy for every program, or when a harvester accepts only an API under the country's rules. For EU high-value datasets the regulation requires both an API and bulk download: a description file covers the metadata dump but does not replace a data API. More in the chapter [on access interfaces](../04-features/04-access-interfaces.md).

A build that does not fit within the hosting limit is the same threshold. On GitHub Pages that means a site larger than 1 GB or a build longer than 10 minutes. Beyond that, a portal is taken, or the files are moved to storage and the site keeps the descriptions.

## Example: a catalog run by two people

**Context.** A city library publishes about 80 open datasets: lists of institutions, timetables, annual tables. The files stay on agencies' websites. The regional portal does not accept outside organisations. Two staff members edit, both with GitHub accounts. There are no closed files. The description must be findable in a search engine. If a national harvester appears later, it is given one file.

**Options.** Its own CKAN. Cloud PortalJS with roles. JKAN. An ordinary generator and a `data.json` file built by a script.

**Criteria.** Each dataset has its own page, whose address does not change when the title is edited. The description file has a publisher, a licence, a date and a file link. The page has schema.org. Maintenance needs neither an application server nor an annual fee. Both editors manage on their own.

**Decision.** JKAN, with files hosted on GitHub Pages. Before the first publication, schema.org is added to the template, and the publisher and modification date are added to `data.json`. The Decap form is not switched on: it is easier for two people to edit files than to keep a separate login server. If the harvester, when it appears, expects DCAT-AP, the template is reworked for that profile in advance.

**Why.** CKAN adds a server for two editors. Cloud PortalJS on the first paid plan gives roles that are not needed here and costs from 1,188 dollars a year; its search API starts from the next plan. An ordinary generator will also build pages, but the dataset page and `data.json` would have to be written from scratch. JKAN has them. The template, however, is not ready for publication while the file has no publisher: opendata.scot shows this.

**Consequences.** Search on the site filters JSON in the browser. A program is given the whole `data.json`. The library does not copy data files: a file disappearing from an agency's site shows up as a broken link. A person without a GitHub account cannot add a dataset.

**When to review.** A third publisher appears who will not work with GitHub. It becomes necessary to hide a file while keeping the description open, and requests exceed what email can handle. The regional portal starts accepting the library as an organisation: the two catalogs are reconciled, and one is kept if duplicates get in the way. The build hits 1 GB or 10 minutes on GitHub Pages.

How to write such a record for yourself is in the chapter ["Justifying a Decision"](../06-choice/04-justifying-decisions.md).

## How to check

The commands below repeat the check of 14 October 2026. The expected answers were taken from the live opendata.scot. After the template is edited, the list of fields will be different.

```bash
# The description file opens without a login. On that day: 2,596 datasets,
# DCAT-US 1.1 schema, the first record has no publisher key
curl -s "https://opendata.scot/data.json" | python3 -c "import json,sys; d=json.load(sys.stdin); print(len(d['dataset']), d['conformsTo']); print(sorted(d['dataset'][0]))"

# The page has RDFa DCAT and no schema.org
curl -s "https://opendata.scot/datasets/aberdeen+city+council-academy+school+catchments/" | python3 -c "import sys; t=sys.stdin.read(); print('schema.org', 'schema.org' in t); print('dcat', 'dcat:Dataset' in t)"
```

The first command prints `2596`, the schema address `https://project-open-data.cio.gov/v1.1/schema` and a list of six keys without `publisher`. The second prints `schema.org False` and `dcat True`.

Then open your own site. In `data.json` a record has a publisher, a licence, a modification date and a direct link. The `conformsTo` line matches the profile the harvester expects: it is checked against the record's fields. The page HTML contains `schema.org/Dataset`. The `sitemap.xml` address responds. The dataset file, if you host it, opens via a direct link without a login.

The number of datasets in the Czech national catalog was counted on the same day like this. The answer was `31272`.

```bash
curl -sG "https://data.gov.cz/sparql" \
  --data-urlencode "query=SELECT (COUNT(DISTINCT ?d) AS ?n) WHERE { ?d a <http://www.w3.org/ns/dcat#Dataset> }" \
  -H "Accept: application/sparql-results+json"
```

## Sources

- [JKAN](https://jkan.io/), [repository](https://github.com/timwis/jkan), [architecture](https://github.com/timwis/jkan/blob/main/docs/architecture.md), [installation](https://github.com/timwis/jkan/blob/main/docs/installation.md) and [the `data.json` template](https://github.com/timwis/jkan/blob/main/data.json) on the `main` branch. Release [2.0.0](https://github.com/timwis/jkan/releases/tag/v2.0.0), 30 March 2023. The sitemap: commit `b4733fb` of 29 July 2026, not in the 2.0.0 tag. The branch's last push: 7 September 2026. Commits by year: a pause in 2021, the editor replaced with Decap at the end of 2022. Checked 14 October 2026
- [The DCAT-US 1.1 dataset schema](https://resources.data.gov/schemas/dcat-us/v1.1/schema/dataset.json): mandatory fields including publisher, modification date, identifier and access level. The schema address JKAN writes redirects here
- [opendata.scot](https://opendata.scot) and [repository](https://github.com/OpenDataScotland/jkan): 2,596 datasets, 5,878,536 bytes in `data.json`, 5,775,288 bytes in `datasets.json`, six fields, publisher empty, 462 `No licence` values, 232 datasets without a file link, a page without schema.org. Synchronisation roughly weekly, the last run on 9 October 2026. Checked 14 October 2026
- [The data.gov.cz site repository](https://github.com/datagov-cz/data.gov.cz): Jekyll and GitHub Pages in the README; the dataset catalog is moved out to LinkedPipes DCAT-AP Viewer. [SPARQL endpoint](https://data.gov.cz/sparql): 31,272 datasets, 133 catalogs, 39,624 download addresses, 16 of them on data.gov.cz. Query of 14 October 2026
- I. Begtin, Telegram (in Russian): [the Czech open data portal](https://t.me/begtin/4640), 24 February 2023: about 142,000 datasets, about 137,000 of them from the cadastral agency; [opendata.scot on JKAN](https://t.me/begtin/4076), 16 July 2022; [Open Data Scotland, built by the community](https://t.me/begtin/4871), 13 May 2023
- [PortalJS: backends](https://www.portaljs.com/docs/backends), [deployment](https://www.portaljs.com/docs/guides/deploy) and [pricing](https://www.portaljs.com/pricing): static export, building pages from CKAN, plans at 1,188, 3,588 and 14,990 dollars a year. Checked 14 October 2026. Repository [datopian/portaljs](https://github.com/datopian/portaljs), MIT licence
- [Open SDG](https://open-sdg.org/), release [2.4.0](https://github.com/open-sdg/open-sdg/releases/tag/2.4.0) of 19 August 2025, MIT licence. [Data sources and SDMX](https://open-sdg.readthedocs.io/en/2.4.0/data-sources/), [SDMX output in configuration](https://open-sdg.readthedocs.io/en/2.4.0/data-configuration/). [sdgdata.gov.uk](https://sdgdata.gov.uk/): the page includes `jekyll-open-sdg-plugins`, checked 14 October 2026
- [STAC best practices on static catalogs](https://github.com/radiantearth/stac-best-practices/blob/main/best-practices-catalog-and-collection.md): files, relative links, the catalog does not answer queries. [STAC Browser](https://github.com/radiantearth/stac-browser). The Earth Engine catalog: [catalog.json](https://earthengine-stac.storage.googleapis.com/catalog/catalog.json), 133 child links, checked 14 October 2026
- [Datasette](https://datasette.io/), repository [simonw/datasette](https://github.com/simonw/datasette), Apache-2.0 licence. [Datasette Lite](https://github.com/simonw/datasette-lite): the database opens in the browser, last push 9 August 2026
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits): 1 GB per published site, 10 minutes per build, a recommended 1 GB per source repository, a soft bandwidth limit of 100 GB a month. Checked 14 October 2026
- JKAN, OpenSDG and Datasette installation counts: the dataportals-registry export, release 1.27.0 of 15 October 2026.
