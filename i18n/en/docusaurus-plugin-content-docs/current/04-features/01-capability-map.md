---
title: Capability Map
description: What capabilities data catalogs have, which any catalog needs, which only its type and task need, and where they live in platforms.
---

# Capability Map

Portals differ not by name but by their set of capabilities. This chapter is the map for the whole part: what capabilities exist, which any catalog needs, which are switched on by the catalog type or a specific task, and on which platforms each capability is in the core, in an extension or nowhere. Details on each capability are in separate chapters.

In brief:

- **Six things are needed by any catalog**, even a static site with a dozen datasets: a persistent address, a licence for each dataset, an update date and a contact, an export of all descriptions, markup for search engines, and access to descriptions without registration.
- **Everything else depends on the catalog type.** A research repository needs DOIs and versions, a geoportal a catalog service, an indicator catalog SDMX, a microdata catalog closed files with an open description, an ML catalog versions and a Croissant description.
- **Type is not the only reason.** A higher-level portal, a funder, the law, the number of datasets and publishers make a capability mandatory for a catalog of any type.
- **A mandatory capability is better taken from the platform core.** On live catalogs it is present in most installations if it is in the core, in about a third if it comes from an extension, and in a few percent of custom-built sites.

## How to use the map

1. Tick off the [minimum](#the-minimum-for-any-catalog): it is the same for everyone.
2. Find your catalog type in the table ["What is needed in which cases"](#what-is-needed-in-which-cases) and write down the "mandatory" and "desirable" rows.
3. Go through the [external reasons](#what-makes-a-capability-mandatory-for-any-type): each can raise a capability from "desirable" to "mandatory".
4. For each mandatory capability, check [on which platforms](#where-a-capability-lives-in-platforms) it is in the core, in an extension, or absent.
5. Write down the rejections too, with a reason. How to turn the list into a requirements specification and a platform choice is covered in the chapters ["Selecting Features"](../06-choice/02-feature-selection.md) and ["From Features to a Platform"](../06-choice/03-from-features-to-platform.md).

If the catalog type is not yet clear, start with the [route map](../06-choice/01-route-map.mdx) or with the [classification of catalogs](../03-types/01-classification.md).

## What a capability is

**A catalog capability** is something a catalog can do for someone: show a dataset to a person, serve descriptions to a program, issue an identifier for a paper, hide a file from outsiders. It is not a menu item or a module name. The same capability can be built in different ways: a DOI can be issued by the platform itself, by an extension, or by someone else's repository where a copy is deposited.

Each capability has an addressee, whose task it solves:

- **a person on the website**: search, preview, a clear description, a "Cite" button;
- **a program**: a higher-level portal, a dataset search engine, a harvester, a service built on the data. It needs exports, protocols and APIs;
- **the owner and editors**: roles, review before publication, statistics, the cost of maintenance.

A catalog made only for the first addressee looks good, but neither aggregators nor search engines can see it. That is why half the items in the minimum below are for programs.

## Groups of capabilities

| Group | What it includes | What question it answers | Chapter |
|--------|------------|--------------------------|-------|
| Describing data | mandatory and domain fields, custom fields, table field dictionary | can you tell from the description what is inside and whether you may use it | [Metadata Depth](./03-metadata-depth.md) |
| Exchanging descriptions | DCAT, schema.org, domain formats: ISO 19115, DataCite, DDI, SDMX, Croissant | will other systems be able to read the descriptions | [Metadata Export](./02-metadata-export.md) |
| Machine access | search API, export of all descriptions, access to part of the data, change feed | can a program take the catalog and data without a person | [API and Bulk Download](./04-access-interfaces.md) |
| Storage | files in the catalog, external links, a table in a database | is the file available as long as the catalog lives, not the source website | [Storage](./05-data-storage.md) |
| Citability | persistent address, DOI, versions, ready-made citation | will the link open the same dataset years later | [Identifiers](./06-identifiers-and-doi.md), [Citation](./07-citation.md) |
| Governance | organisations, roles, moderation, closed files, registration | who publishes, who reviews, who sees the file | [Access and Workflows](./08-access-control-and-workflow.md) |
| Operations | deployment method, upgrades, extensions, people | what it costs to launch and to maintain for years | [Deployment](./09-deployment-and-operations.md) |
| Other | search and filters, preview, languages, harvesting other catalogs, statistics, feedback | is it convenient for people and does the catalog grow with the task | [Other Capabilities](./10-other-capabilities.md) |

## The minimum for any catalog

These capabilities are needed both by a national portal and by a research group's page. Without them a catalog is either invisible or useless.

| What | Why | Chapter |
|-----|-------|-------|
| A persistent address for the dataset and file | papers, reports and other catalogs link to the dataset; the address does not change when the description is edited or the website moves | [Identifiers](./06-identifiers-and-doi.md) |
| A licence for each dataset | without it the dataset cannot be used legally, even if it can be downloaded | [Licences](../07-publishing/04-licenses-and-access.md) |
| An update date and a contact | the date shows whether the dataset is alive; the contact gives someone to report an error to | [Metadata Depth](./03-metadata-depth.md) |
| An export of all descriptions | the higher-level portal and aggregators harvest the catalog from it; paging through search is inconvenient and unreliable for them | [API and Bulk Download](./04-access-interfaces.md) |
| schema.org markup and a sitemap | ordinary search engines and Google Dataset Search find the dataset through them | [Metadata Export](./02-metadata-export.md) |
| Descriptions without registration or captcha | otherwise automatic harvesting does not work or breaks with every update of the protection | [API and Bulk Download](./04-access-interfaces.md) |

The export can be simple. For a small site it is one `data.json` or `datapackage.json` file, not a full DCAT-AP profile. The same minimum is recorded as the first section of the [requirements checklist](../06-choice/07-requirements-checklist.md).

A catalog without this minimum is a common story even among large portals. In November 2024 the Moscow portal data.mos.ru served neither schema.org markup nor DCAT, and its datasets were absent from dataset search, while small civil society portals with markup ranked first. More in the chapter [on metadata export](./02-metadata-export.md).

## What is needed in which cases

"Mandatory" means the catalog will not do its job without it. "Desirable" means it helps noticeably, but the catalog is useful without it. "Not needed" means the capability is superfluous for this type or another tool covers it. "From hundreds of datasets" means that with dozens, pages and a description file are enough; a search API of your own is set up when the number of datasets grows large. The same thresholds are recorded in the [requirements checklist](../06-choice/07-requirements-checklist.md).

<div className="wide-table">

| Capability | Open data portal | Research repository | Geoportal | Indicator catalog | Microdata catalog | ML catalog | Small site |
|-------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Export of all descriptions | mandatory | mandatory | mandatory | mandatory | mandatory | mandatory | desirable |
| schema.org markup | mandatory | mandatory | desirable | desirable | desirable | mandatory | mandatory |
| DCAT export | mandatory | desirable | desirable | desirable | desirable | not needed | desirable |
| Domain format | not needed | mandatory: DataCite and OAI-PMH | mandatory: ISO 19115 and CSW or OGC API Records | mandatory: SDMX or machine access to tables | mandatory: DDI | mandatory: Croissant | not needed |
| Search API | from hundreds of datasets | from hundreds of datasets | from hundreds of datasets | desirable | from hundreds of datasets | from hundreds of datasets | not needed |
| Access to part of the data without downloading | desirable | not needed | mandatory | mandatory | desirable | desirable | not needed |
| Files in the catalog itself | desirable | mandatory | not needed | not needed | desirable | desirable | not needed |
| DOI | not needed | mandatory | not needed | not needed | desirable | desirable | not needed |
| Versions | desirable | mandatory | not needed | desirable | desirable | mandatory | not needed |
| Citation export | desirable | mandatory | not needed | desirable | desirable | desirable | desirable |
| Closed files with an open description | not needed | desirable | not needed | not needed | mandatory | desirable | not needed |

</div>

Why:

- **An open data portal** lives in the chain "city → region → country → general search engine". Without DCAT and a description export, the higher-level portal will not harvest it. A search API is needed when there are hundreds of datasets or more: a city with thirty datasets can manage with pages and a description file. Storing files itself is desirable because external links die: in a full download of data.gov.uk in 2023, about 10% of file links did not open. A DOI is usually excessive here: the data is updated, and instead of versions with identifiers an archive of past files is enough.
- **A research repository** exists so that data can be cited in a paper. That is why DOIs, versions and a ready-made citation line are mandatory, for a small repository too if a version is cited. Files must sit in the repository itself: a link in a paper cannot depend on someone else's website. Closed files are not needed by all, but often: an embargo until the paper is published, patient data.
- **A geoportal** describes layers and services. The domain language is ISO 19115 and the CSW catalog service or OGC API Records; this is mandatory even with a small number of layers. Access to part of the data means the WMS, WFS and OGC API map services: without them a layer can only be viewed on a map. Storing files itself is not necessary: the data usually already sits in the map server.
- **An indicator catalog** serves not files but indicators with breakdowns, so the main thing is selection by year and territory. Without SDMX, or at least machine access to tables with an indicator description, the catalog remains a table builder in the browser. The description export here is replaced by a full list of tables or series with methodology. Versions are desirable: indicators are revised, and an analyst needs to know which release they relied on.
- **A microdata catalog** describes surveys and provides the records about people by access level: the DDI description is visible to all, the file on application. Storing files itself is necessary if you provide them yourself; the World Bank Microdata Library mostly points to external repositories. Access to part of the data here means online tables that calculate distributions without releasing records, as in REDATAM.
- **An ML catalog** serves datasets on which models are compared. Results are comparable only if the dataset and its split into training and test parts have not changed, so versions are mandatory. A Croissant description is required by the NeurIPS data track for every submission with a new dataset, and Kaggle, OpenML, Hugging Face and Dataverse generate it themselves. Closed files mean access on request, as with some datasets on Hugging Face.
- **A small site** with operational data can do without a search API and without DOIs. Search engines need schema.org markup, otherwise the dataset will not be found. If the data needs to be cited as an immutable version, that is already a task for a research repository: a DOI is mandatory at any size, and the easiest way to get one is a generalist repository.

## What makes a capability mandatory for any type

The table above is a guideline, not a law. A regional portal that must pass metadata to the national one makes DCAT mandatory, even if its type says "desirable". Below are reasons that raise a capability to "mandatory" regardless of the catalog type.

| If | Then mandatory | Chapter |
|------|----------------|-------|
| A higher-level portal harvests your descriptions | DCAT in the profile adopted in the country (DCAT-AP, DCAT-US) and a stable export address | [Metadata Export](./02-metadata-export.md) |
| The data is part of the EU high-value datasets (Regulation 2023/138) | API and bulk download, a licence no stricter than CC BY 4.0 | [API and Bulk Download](./04-access-interfaces.md) |
| The layers are part of the country's spatial data infrastructure | ISO 19115 descriptions and a catalog service | [Geoportals](../03-types/03-geoportals.md) |
| A funder or journal requires a link to the data | DOI, versions, citation export | [Identifiers](./06-identifiers-and-doi.md) |
| The dataset accompanies a paper in the NeurIPS data track | a Croissant description | [ML Catalogs](../03-types/07-ml-catalogs.md) |
| There are hundreds of datasets or more | a search API, full-text search of descriptions and filters | [Other Capabilities](./10-other-capabilities.md) |
| More than one team publishes | organisations and roles | [Access and Workflows](./08-access-control-and-workflow.md) |
| External people publish | moderation before entering search, registration by invitation | [Access and Workflows](./08-access-control-and-workflow.md) |
| The data is personal, licensed or sensitive | closed files with an open description, an application log | [Access and Workflows](./08-access-control-and-workflow.md) |
| The country has several official languages or the audience is international | interface and description languages | [Other Capabilities](./10-other-capabilities.md) |
| You harvest other catalogs | scheduled harvesting from DCAT, the CKAN API, CSW, OAI-PMH | [Federation and Harvesting](../07-publishing/03-federation-and-harvesting.md) |
| A law or a sector code list requires an attribute not in the schema | custom description fields | [Metadata Depth](./03-metadata-depth.md) |
| The catalog must live for ten years | files stored locally, a platform with a clear upgrade policy, a closure plan | [Deployment](./09-deployment-and-operations.md) |

The reverse also works: a capability from the "mandatory" column can be crossed out if someone else covers it. A geoportal does not store files itself if layers live in a map server. A research group does not set up its own DOIs if it deposits a release in Zenodo. A city does not build its own search API if a regional portal already harvests its datasets.

## Where a capability lives in platforms

The same capability is in the core of one platform, appears only with an extension in another, and is absent from a third. The tables in this part use four marks:

- **core**: the capability is in the platform itself;
- **extension**: a separate module adds it, with its own author and its own risks on upgrade;
- **no**: the platform cannot do this; another platform or custom development is needed;
- **not checked**: the cell could not be filled from the October 2026 documentation.

A summary across the chapters of this part:

| Capability | In the core | Via an extension or configuration | No |
|-------------|--------|--------------------------------|-----|
| DCAT export | DKAN, udata, Piveau, Huwise (OpenDataSoft), Socrata, ArcGIS Hub, InvenioRDM, GeoNetwork | CKAN: ckanext-dcat; Dataverse: a third-party DCAT 3 exporter | DSpace, NADA, PxWeb, GeoNode; Dataverse has no DCAT export in its core |
| schema.org markup | Dataverse, InvenioRDM, GeoNetwork, NADA, Socrata; Huwise has it in the core, but the administrator enables it | CKAN: ckanext-dcat | PxWeb; udata, Piveau, ArcGIS Hub and GeoNode had no markup on the page in a check on 13 October 2026; on a static site the template author writes the block |
| Export of all descriptions | Dataverse, InvenioRDM, DSpace (OAI-PMH); GeoNetwork (CSW); DKAN and cloud services (DCAT); JKAN (a `data.json` file) | CKAN: ckanext-dcat | a static site, until the author builds a description file |
| Search API | CKAN, DKAN, cloud services, Dataverse, InvenioRDM, DSpace, GeoNetwork, NADA, PxWeb | — | JKAN, a static site |
| Files in the catalog | CKAN, Dataverse, InvenioRDM, DSpace, NADA, cloud services | CKAN: cloud storage instead of disk, via configuration or an extension | PxWeb and .Stat Suite: they store tables, not files |
| Access to part of the data | CKAN (DataStore), cloud services, ArcGIS Hub, Dataverse (tabular files), PxWeb, .Stat Suite | CKAN: loading CSV into DataStore is done by the XLoader extension | GeoNetwork (links to other people's services), a static site |
| DOI | Dataverse, InvenioRDM, Figshare; DSpace and GeoNetwork after being enabled in configuration. A contract with DataCite is needed everywhere | CKAN: ckanext-doi; the documentation names only CKAN 2.9 and 2.10, not tested on 2.11 and 2.12 | DKAN, Huwise (OpenDataSoft), Socrata, ArcGIS Hub, PxWeb; NADA has only a field for a DOI minted separately |
| Versions | Dataverse, InvenioRDM, Figshare, DSpace | — | CKAN (an activity log is not a version), cloud open data portals |
| Citation export | Dataverse, InvenioRDM, Figshare, GeoNetwork 4.4; NADA via DataCite if the study has a DOI | CKAN: ckanext-doi (only with a DOI) or the young ckanext-citeproc | DSpace up to and including 10.1 (only meta tags for Google Scholar), cloud open data portals |
| Custom description fields | Dataverse, InvenioRDM, DSpace, DKAN (schema replacement); Huwise (OpenDataSoft) and Socrata: field templates in settings | CKAN: ckanext-scheming; GeoNetwork: schema plugins for country profiles | ArcGIS Hub: one style from ready-made standards per organisation; JKAN and a static site |
| Closed files with an open description | Dataverse, InvenioRDM, DSpace, NADA, Huwise (OpenDataSoft) | CKAN's core can close only a whole dataset, description included; fine-grained control requires extensions | a static site; Socrata hides a private dataset entirely |
| Harvesting other catalogs | Piveau; GeoNetwork (CSW, OAI-PMH, OGC services, STAC collections and others); Dataverse (OAI-PMH client); udata (six harvesters shipped, disabled by default); Huwise (harvesters for CKAN, Socrata, ArcGIS, data.json and others; CSW enabled on request); Socrata (Catalog Connector: data.json and public ArcGIS Server) | CKAN: ckanext-harvest, ckanext-dcat, ckanext-spatial | JKAN, a static site; ArcGIS Hub not checked in the October 2026 review |

Who maintains each CKAN extension and which core versions it works with is recorded in the chapter ["CKAN: Core and Extensions"](../05-platforms/03-ckan-and-extensions.md). A full summary by platform is in the [appendix](../12-appendices/03-platform-tables.md), and platform profiles in the chapter ["Platform Profiles"](../05-platforms/04-platform-profiles.md).

The "core" mark does not mean "enabled". DOIs in Dataverse, DSpace and GeoNetwork will work only after a contract with DataCite and configuration, and preview in Dataverse only after the administrator installs previewers. Check the specific site, not only the platform documentation.

## What this looks like on live catalogs

The difference between core and extension is visible not only in documentation. The dataportals-registry records which interfaces were found for each catalog. Below is how many catalogs provide a capability mandatory for their type, depending on the platform. Registry release 1.27.0, all records of the type including inactive ones; research repositories are counted together with generalist ones.

| Capability and catalog type | Platforms where it is in the core | Where an extension or configuration provides it | Custom builds |
|----------------------------|---------------------------|--------------------------------------|-----------------|
| DCAT in open data portals | Socrata 239 of 245, OpenDataSoft 348 of 454, DKAN 103 of 161 | CKAN with ckanext-dcat 633 of 1,906 | 24 of 1,144 |
| DOI in research repositories | Figshare 266 of 288, Dataverse 172 of 257 | DSpace, where DOIs are enabled by configuration, 218 of 829 | 158 of 2,840 |
| OAI-PMH in research repositories | DSpace 665 of 829, Dataverse 177 of 257 | — | 19 of 2,840 |
| CSW or OGC API Records in geoportals | ArcGIS Hub 3,257 of 3,464, GeoNetwork 686 of 762, GeoNode 628 of 770 | — | 4 of 1,043 |

What follows from this:

- If a capability is in the core, it is present in roughly two thirds of installations or more, and in the cloud Socrata and ArcGIS Hub almost in all: there it does not need to be installed or enabled.
- If it has to be installed separately or enabled by configuration, it is present in a third or a quarter: ckanext-dcat in CKAN, DOIs in DSpace. Dataverse has DOIs in its core, but the platform can also issue other identifiers (Handle and the installation's own permalinks), so DOIs are marked for two thirds of sites.
- Custom builds almost never have the mandatory capability: 2% of custom open data portals serve DCAT, and fewer than 1% of custom repositories OAI-PMH.
- A map server is not yet a catalog. Of 4,674 geoportals on ArcGIS Server, a catalog service was found on one, and of 1,927 municipal e-mapa portals on none: they show layers but serve no descriptions for harvesting.

Across all catalogs the picture is more modest than the table "What is needed in which cases" demands. DCAT was found in 26% of open data portals, OAI-PMH in 25% of research repositories, DOIs in 17%, a catalog service in 20% of geoportals, SDMX in 5.2% of indicator catalogs. Of these 177 indicator catalogs, 113 are Knoema showcases, and Knoema itself has not opened since January 2026 (more in the chapter [on indicator catalogs](../03-types/05-indicator-catalogs.md)). What the map calls mandatory is in fact present in a minority, and the reason is usually the platform: neither the core nor an installed extension provided the capability.

The numbers are a lower bound: the registry marks an interface only if it found it at known addresses. The registry hardly checks schema.org markup, so it is not in the table. The queries are in the appendix ["Using the Registry"](../12-appendices/02-using-the-registry.md#capability-map).

## How to cover capabilities without a portal

Many capabilities on the map do not require a portal. A static site, a Git repository, a generalist research repository such as Zenodo and a cloud hub cover the whole minimum and part of the rest.

| Capability | How to cover it without a portal | What you will not get |
|-------------|-------------------------|---------------|
| Persistent address | your own domain with an unchanging address structure; a release DOI in Zenodo | — |
| Licence | a `LICENSE` file and the licence field in `datapackage.json` | — |
| Export of all descriptions | a `data.json` or `datapackage.json` file next to the pages; a generator such as JKAN builds it automatically | harvesting protocols such as OAI-PMH and CSW |
| schema.org markup | a JSON-LD block in the dataset page template | field validation: the template author takes care of it |
| Search API | not needed with dozens of datasets | search for programs |
| Access to part of the data | Datasette, a program that publishes an SQLite database with a web page and a JSON API in one command | pure static hosting: Datasette runs as a small server |
| Files | next to the pages, as release attachments, in cloud storage | large files in Git: GitHub does not accept files larger than 100 MiB |
| DOI and versions | release tags in the repository and automatic archiving of releases in Zenodo | — |
| Citation export | a `CITATION.cff` file: GitHub shows a button to cite the repository based on it | — |
| Roles and review | repository permissions and review of changes before merging | moderation of external publishers |
| Closed files | — | this way you publish only open data |
| Harvesting other catalogs | — | you will not have it |

If the "What is needed" table requires only the minimum for your case, you probably do not need a portal. When this happens and how to make such a publication findable is covered in the part ["Publishing Without a Portal"](../08-beyond-portals/01-when-portal-not-needed.md), especially in the chapters [on Git repositories](../08-beyond-portals/03-git-repositories.md) and [on discoverability](../08-beyond-portals/05-making-it-findable.md).

## How to quickly check a live portal

A few requests in ten minutes show which capabilities from the map a particular site has. Substitute the portal address and the address of any dataset page:

```bash
P=https://portal.example

# Export of all descriptions: DCAT-US and DCAT in RDF
curl -sI "$P/data.json" | head -1
curl -sI "$P/catalog.ttl" | head -1

# Sitemap
curl -sI "$P/sitemap.xml" | head -1

# schema.org markup on a dataset page: number of JSON-LD blocks
curl -s "$P/dataset/some-dataset" | grep -c 'application/ld+json'

# CKAN search API and the list of installed extensions
curl -s "$P/api/3/action/package_search?rows=0"
curl -s "$P/api/3/action/status_show"

# Research repository and geoportal
curl -sI "$P/oai?verb=Identify" | head -1
curl -sI "$P/csw?service=CSW&request=GetCapabilities" | head -1
```

A `200` response is a good sign; `404` at all export addresses is a reason to look for it in the portal's documentation or to assume it does not exist. Then three checks by eye: do five random datasets have a licence and an update date; do the files open; is a DOI and a "How to cite" block visible, if the portal promises them. Detailed checks are in the "How to check a live portal" section of each chapter in this part and in the [summary checklists](../12-appendices/04-checklists.md).

## Common mistakes

- **"Mandatory" for everything.** If everything is mandatory, comparing platforms becomes meaningless, and the project cost grows because of capabilities nobody uses.
- **A list from someone else's specification.** A national portal needs harvesting of other catalogs, roles for a hundred agencies and a showcase of use cases. A city with thirty datasets does not.
- **A showcase instead of the minimum.** Search with filters and charts on the home page are built before the description export and markup. As a result, people use the site, but programs cannot see it.
- **Preview instead of an API.** A table on the page helps a person, but it cannot be cited and cannot be reliably retrieved by a program.
- **A DOI for operational data.** A transit schedule that changes every day needs a persistent address and an update date, not a new DOI for every export.
- **An extension without checking.** "There is an extension" does not mean "it works on your version". Before choosing, check who maintains it and on which core versions tests run; the method is in the chapter ["Extension Ecosystems"](../05-platforms/02-extension-ecosystems.md).

## How the chapters of this part are organised

Each chapter about a capability is organised the same way: what it is, why it is needed, what variants exist, when it is needed and when not, how it is done in platforms, how to check a live portal. The platform tables use the same four marks as above: core, extension, no, not checked.

## Sources

- The chapters of this part and the platform documentation they refer to.
- The guidelines by type were checked against how real catalogs are organised in the [dataportals-registry](https://github.com/datenoio/dataportals-registry). dataportals-registry export, [release 1.27.0](https://github.com/datenoio/dataportals-registry/releases/tag/v1.27.0) of 15 October 2026: shares of interfaces and DOIs by type and platform, queries of 15 October 2026 to this export, given in the [appendix](../12-appendices/02-using-the-registry.md#capability-map).
- [DCAT 3, W3C Recommendation](https://www.w3.org/TR/vocab-dcat-3/), [schema.org/Dataset](https://schema.org/Dataset)
- [Commission Implementing Regulation (EU) 2023/138 on high-value datasets](https://eur-lex.europa.eu/eli/reg_impl/2023/138/oj): API, bulk download and licence
- NeurIPS 2026: [Evaluations & Datasets track rules](https://neurips.cc/Conferences/2026/CallForEvaluationsDatasets): Croissant for every submission to this track that introduces a new dataset
- [Harvesting other catalogs in GeoNetwork 4.4](https://docs.geonetwork-opensource.org/4.4/user-guide/harvesting/): CSW, OAI-PMH, OGC services, STAC collections, checked 12 October 2026
- I. Begtin, [Why data on Russia is so hard to find](https://begtin.substack.com/p/816) (in Russian), November 2024: data.mos.ru and dataset search; [Good and bad data publishing practices](https://begtin.substack.com/p/2ef) (in Russian), November 2024: the share of broken links on data.gov.uk
