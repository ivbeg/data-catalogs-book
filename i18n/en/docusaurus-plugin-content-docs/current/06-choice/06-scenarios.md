---
title: Typical Scenarios
description: "Where different owners should start choosing a catalog: the type, mandatory features and a shortlist of platforms."
---

# Typical Scenarios

A scenario answers "where to start", not "what to buy". Each row below names the catalog type, the features without which this owner cannot do their job, and a shortlist of platforms to check. A platform is not carried over from the neighbouring row: a city and a region have different duties and different teams.

In brief:

- First find your row in the table. It sets the type and the mandatory features. The platform is chosen at the next step, from the [feature list](./02-feature-selection.md) and the [matrix](./03-from-features-to-platform.md).
- Each row adds to the [minimum for any catalog](../04-features/01-capability-map.md#the-minimum-for-any-catalog): a persistent address, a licence on every dataset, an update date and a contact, a metadata dump, markup for search engines, descriptions without registration. The row shows only what is added on top of the minimum.
- If an owner does two jobs, they have two rows and often two platforms.
- Four rows are taken all the way to a decision record in the chapter ["Worked Examples"](./08-worked-examples.md): a municipality, a region, a university, a statistical office. For your own city, the record's sections are filled in afresh. Someone else's record drags in someone else's obligation and someone else's price.

Figures are from the dataportals-registry export (release 1.27.0 of 15 October 2026).

## How to use it

1. Find the closest owner in the table.
2. Write out the "what to add to the minimum" column. These are candidates for mandatory requirements, not a ready specification. The test for being mandatory is in the chapter [on selecting features](./02-feature-selection.md): which task will fail on launch day without this feature, and who will notice.
3. If two rows fit, open the section ["Two tasks at once"](#two-tasks-at-once).
4. Check the shortlist from your row against the "feature × platform" matrix. A platform for which a mandatory feature is impossible drops out before any talk of price.
5. Record the fork (your own portal or someone else's, which platform, which extension) as a [decision record](./04-justifying-decisions.md). Items for the specification are collected in the [checklist](./07-requirements-checklist.md).

<div className="wide-table">

| Who | Catalog type | What to add to the minimum | Where next |
|-----|--------------|--------------------------|-------------|
| Central government body | an open data portal or a harvester of other catalogs | the description profile the country expects, and a persistent dump address | below |
| Region | a portal that harvests cities and itself serves datasets to the country | scheduled intake of other catalogs' descriptions, and its own dump in the national profile | [region example](./08-worked-examples.md#region-harvest-the-municipalities-and-serve-the-country) |
| Municipality | more often someone else's catalog, not its own portal | the dataset is visible in the regional or national portal | [municipality example](./08-worked-examples.md#municipality-dont-set-up-your-own-portal) |
| Mapping agency | a geoportal | layer descriptions and a catalog service | [geoportals](../03-types/03-geoportals.md) |
| Statistical office | two catalogs: indicators and microdata | selection by dimensions and SDMX exchange; a survey description and access levels | [statistical office example](./08-worked-examples.md#statistical-office-indicators-and-microdata-are-different-catalogs) |
| University or research organisation | a research repository | DOIs, versions, citation, files held locally | [university example](./08-worked-examples.md#university-a-data-repository-not-another-ckan) |
| Research consortium | a discipline-specific repository | its own fields, a protocol for discipline aggregators, a long-term preservation plan | [research repositories](../03-types/04-scientific-repositories.md) |
| International organisation | a hub of catalogs of different types | several languages, stable addresses, a dump for aggregators | [hybrids](../03-types/11-comparison-and-hybrids.md) |
| Small organisation, journalists, a group | publishing without a portal | schema.org markup on the dataset page | [when you don't need a portal](../08-beyond-portals/01-when-portal-not-needed.md) |
| Company | a dataset portal, an API catalog or a marketplace | a licence a lawyer can understand; the description is open even if the data is paid | [other types](../03-types/10-other-types.md) |
| A lab or a data programme for models | usually someone else's hub, not its own catalog | a dataset card, a fixed split into parts, a licence for training | [ML catalogs](../03-types/07-ml-catalogs.md#how-to-choose) |

</div>

## Central government body

Four different jobs are lumped together under this name. Their shortlists differ.

| Job | Shortlist |
|--------|-----------------|
| All agencies publish on one site | CKAN, DKAN or udata: organisations, roles, moderation. Harvesting other catalogs is added when some agencies stay on their own sites. This is how data.gouv.fr works: both a platform and a harvester |
| The site stores almost nothing and harvests other catalogs | Piveau, or CKAN with ckanext-dcat and ckanext-harvest. If the agencies' catalogs already exist, a country can start with a search engine over them: find.data.gov.scot harvests local sources, and the common portal data.gov.scot came later |
| An agency serves its datasets upwards and does not replace the common portal | CKAN with ckanext-dcat. A cloud service, if its dump file matches the country's profile. Socrata's standard file is DCAT-US. With Huwise, the contractor sees the national profile in the provider's pilot and cannot edit it in a repository |
| The country hands cities the same distribution | The centre chooses the distribution, not the city: Andino, GD Catalog, a state website platform. Every showcase has common fields and a common dump upwards |

**Type.** An open data portal. For a harvester, it is a catalog of descriptions linking to the original source; it hardly needs files of its own.

**Mandatory.** A description profile that the recipient already reads, and a stable address from which the descriptions are harvested. In the EU this is DCAT-AP and its national refinements, in the US DCAT-US. In Russia the federal portal and sites on Gosweb expect the "passport" from methodological recommendations 4.0, not DCAT. The passport is kept for the Russian portal. schema.org markup and DCAT are added when someone else must find the datasets or when a harvester names the profile. How to keep these languages apart is in the chapter [on metadata standards](../07-publishing/02-metadata-standards.md).

**Candidates.** From the table above, and only those that have the needed profile in the core or in a living extension. Among custom-built open data portals, the registry found a DCAT dump on 24 of 1,144. People will open the site. The national portal will not harvest the descriptions.

**More.** [Open data portals](../03-types/02-open-data-portals.md), [metadata export](../04-features/02-metadata-export.md), [CKAN and extensions](../05-platforms/03-ckan-and-extensions.md).

**When to reopen the record.** The country's profile has its own fields that are not in general DCAT-AP. A second shelf has appeared: maps, indicators, microdata. The country is choosing whether to hand cities one distribution.

## Region

**Type.** An open data portal that both harvests municipalities and itself serves descriptions to the country.

**Mandatory.** Scheduled intake of other catalogs' descriptions and its own dump in the national profile. If the profile has country fields beyond general DCAT-AP, they go both into the form and into the file the national portal harvests. A copy's dataset page links to the dataset page at the city, otherwise one dataset is counted three times: at the city, the region and the country.

**Candidates.** CKAN: the core, ckanext-dcat and ckanext-harvest. Custom fields are set by ckanext-scheming, and the ckanext-dcat profile puts them into the dump. If the country accepts general DCAT-AP without its own fields, scheming is not installed. Piveau is installed when the portal mainly harvests other catalogs and the country's profile is already in the product: the input form documents DCAT-AP and DCAT-AP.de. A profile not on that list does not go on the shortlist: a contractor would maintain it from then on.

Socrata and Huwise can harvest within the service itself, but on this row they usually drop out on the profile. Socrata's standard file is DCAT-US. In Huwise, custom fields reach DCAT only if the provider has built a mapping. The full comparison and rejected options are in the [region example](./08-worked-examples.md#region-harvest-the-municipalities-and-serve-the-country).

**More.** [Federation and harvesting](../07-publishing/03-federation-and-harvesting.md), [CKAN and extensions](../05-platforms/03-ckan-and-extensions.md).

**When to reopen the record.** The record in the examples is written for a DCAT-AP profile with a few custom fields and a contractor without its own development team. A different profile, or an obligation to sit on one state platform, means a new record.

## Municipality

**Type.** Most often not its own portal. The registry has about 17,600 catalogs of local government bodies, about 14,400 of them geoportals. Local bodies have 2,862 open data portals. A noticeable share are showcases of one distribution: 421 sections on the Russian Gosweb website platform, and shared vendor catalogs behind city showcases in Japan and Italy. In that case the city does not choose the platform.

**Mandatory.** The dataset is visible in the regional or national portal. It has a licence and an update date. The description file matches the profile that this portal harvests. In the JKAN static catalog, the `data.json` file declares the DCAT-US 1.1 schema, and the template fills a short list of fields. A region that expects DCAT-AP will get the descriptions after the template is reworked for its profile.

**Candidates.** Publishing as an organisation on the regional portal, including in a standard section the region already runs for cities. For maps, the geoportal the region or the country already runs. For a dozen datasets, when the region does not set up other organisations, a page on the city website with markup and a description file.

**More.** [The worked municipality example](./08-worked-examples.md#municipality-dont-set-up-your-own-portal), [when you don't need a portal](../08-beyond-portals/01-when-portal-not-needed.md).

**When to reopen the record.** In the city example the threshold is: more than two hundred datasets, a position for portal maintenance appears, or the region stops accepting municipal data. Until that day, the city does not install its own CKAN.

## Mapping agency

**Type.** A geoportal. Three different parts hide under this word: a viewer shows layers on a map, a catalog describes them, services serve a layer to programs. A map server without a catalog is not yet a catalog. Of 4,674 geoportals on ArcGIS Server, the registry found a catalog service on one; of 1,927 municipal e-mapa portals, on none.

**Mandatory.** Layer descriptions per ISO 19115 and a catalog service: CSW or OGC API Records. The layer has a licence. The layer can be downloaded, or the record says plainly that only viewing is available. If the layers are part of the country's spatial data infrastructure, the records are served in its profile. A DCAT dump is needed in addition when the same layer must reach an open data portal.

**Candidates.** GeoNetwork for the catalog. Services stay on the server that is already in place: GeoServer or ArcGIS Server. ArcGIS Hub, if the organisation already works in ArcGIS and needs both records and file downloads. GeoNode, when one program must both show the map and keep the catalog, and there is no separate team for two systems. For a small town its own server is usually harmful: layers are passed to the regional or national infrastructure.

CKAN is not on this list. The ckanext-spatial extension pulls layer descriptions into the open data portal's search and shows a link to the services. It does not replace the infrastructure catalog.

**More.** [Geoportals](../03-types/03-geoportals.md), [the "region with maps and datasets" record](../03-types/11-comparison-and-hybrids.md#example-decision-record-a-region-with-maps-and-datasets).

**When to reopen the record.** The agency wants to cover layers and tables with one site, or the country requires both an infrastructure catalog and a DCAT dump at once.

## Statistical office

**Type.** Two catalogs: indicators and microdata. An indicator is selected by year and territory. Microdata are anonymised survey files: the description is open, the file is on request. One custom-built site usually does both jobs badly.

**Mandatory.** For indicators: selection by dimensions and SDMX exchange with structures and code lists. For microdata: an open survey description in DDI and access levels for files.

**Candidates.** Microdata: NADA. Indicators: .Stat Suite, if SDMX exchange is the main duty and consultants are available: the SDMX service is in its core. If the team already knows PxWeb, the showcase goes on PxWeb, and an SDMX endpoint is added separately. PxWeb has no full SDMX service: the old API serves an SDMX-ML 2.0 file, and PxWebApi 2 has no SDMX format. Indicators are not put inside NADA. Since release 5.6 the platform can describe them, but in the World Bank Microdata Library all 7,145 records are surveys, and the bank publishes indicators separately. Nesstar is not considered for a new catalog: it was declared obsolete and withdrawn by 2022.

Among indicator catalogs, 44% are custom-built (1,505 showcases). Programmatic access exists for 37% of catalogs of this type and for 8% of custom-built ones. Two complete records are in the [statistical office example](./08-worked-examples.md#statistical-office-indicators-and-microdata-are-different-catalogs).

**More.** [Indicator catalogs](../03-types/05-indicator-catalogs.md), [microdata catalogs](../03-types/06-microdata-catalogs.md).

**When to reopen the record.** The records in the examples already separate the shelves and choose the indicator platform. A new one is needed when NADA stops being released or exchange moves away from SDMX. As of October 2026, NADA 5.7.1 came out on 4 October.

## University and research organisation

**Type.** A research repository, not an open data portal with customisations. The administration's open data (the budget, timetables, addresses) is published on the university's page or on a government portal. It does not go into the data repository.

**Mandatory.** DOIs, versions and citation that can be exported to BibTeX. Files live in the repository, not as a link to the group's site. The library moderates the record. Its own DOI prefix is needed when the university wants the identifier to be its own, not Zenodo's shared prefix.

**Candidates.** Dataverse, if the library is ready to run a second system next to the existing publications repository: DOIs, versions and citation are in the Dataverse core, a DCAT dump is not. InvenioRDM, if there is someone to maintain a Python application and the university itself serves descriptions in DCAT: the DCAT dump is in its core. An existing DSpace stays as the publications repository. DOIs in it are switched on in configuration and versions exist, but up to and including version 10.1 there is no ready citation and no export to BibTeX and RIS in the core. Zenodo or a shared consortium repository, when the library has nobody to run a second system: DOIs and citation are there, but no own prefix and no group moderation.

CKAN with the ckanext-doi extension is not on this list. The extension has not been tested on CKAN 2.11 and 2.12, and dataset versions are not in the core.

**More.** [The worked university example](./08-worked-examples.md#university-a-data-repository-not-another-ckan), [identifiers and DOIs](../04-features/06-identifiers-and-doi.md), [research repositories](../03-types/04-scientific-repositories.md).

**When to reopen the record.** The record in the examples is written for a library without a separate team for a new application and without an obligation to serve DCAT at the first step. When that obligation appears, or a DSpace version with citation export in the core comes out, the record is reopened.

## Research consortium

**Type.** A discipline-specific repository with its discipline's schema. An example is [PANGAEA](https://www.pangaea.de/) for the Earth sciences. NIH advises authors to look first for a repository of their discipline, and only if there is none, a general or university one. A consortium sets up its own when the discipline does not yet have a repository that accepts its format.

**Mandatory.** Custom description fields: here they matter more than for a city portal. DOIs and versions. A protocol through which the discipline's common aggregators harvest the data, such as OAI-PMH. If the repository will be used as an archive, not as a project folder, a long-term preservation plan and, in time, certification such as CoreTrustSeal.

**Candidates.** Dataverse or InvenioRDM with its own metadata schema. A domain system, if the discipline has already agreed on one: GBIF IPT for biodiversity data, other tools of the same discipline for Earth observation and climate. A custom build, when none of them supports the mandatory data format, and there is a team for years of maintenance, not only for the launch.

**More.** [Research repositories](../03-types/04-scientific-repositories.md), [metadata completeness](../04-features/03-metadata-depth.md), [methodologies and indices](../10-quality/03-methodologies-and-indices.md).

**When to reopen the record.** The discipline already runs a shared repository, and the consortium is deciding whether to join it or install its own. Preservation certification becomes a funder's condition.

## International organisation

**Type.** Often a hub: several catalogs of different types under one sign with a common search. The World Bank keeps them separate: [indicators](https://data.worldbank.org/), [a microdata library on NADA](https://microdata.worldbank.org/) and [a common dataset catalog](https://datacatalog.worldbank.org/) that harvests descriptions from the others. As of 12 October 2026 the dataset catalog had 7,900 records. The Pacific Community assembled the [Pacific Data Hub](https://pacificdata.org/): a dataset portal on CKAN, microdata on NADA, indicators on .Stat Suite, geoportals on GeoNode, a map showcase on TerriaJS, THREDDS servers and a STAC image catalog. A person who has come for one country's data does not need to know which shelf it is on.

**Mandatory.** Several interface and description languages. Stable addresses: reports will link to the data for years to come. A metadata dump for aggregators, and from each shelf in its own language: DCAT from the dataset portal, SDMX from indicators, DDI from microdata. If the organisation funds development projects, data on them is published to the IATI standard: donors and aid aggregators read it. The hub's common search is built by harvesting descriptions into one catalog. This harvesting is one more chain, and it needs a person behind it. A hub that a person opens in a browser but a program cannot read will not be harvested by an aggregator from outside.

**Candidates.** For each showcase, a platform of its type: CKAN, DKAN, udata or a cloud service for files, .Stat Suite or PxWeb for indicators, NADA for microdata, GeoNetwork or GeoNode for layers. One engine for all shelves is a common reason for a custom-built system that later nobody can maintain. The working setup is several clear entry points and a common search over them.

**More.** [Comparison of types and hybrids](../03-types/11-comparison-and-hybrids.md), [other capabilities: multiple languages](../04-features/10-other-capabilities.md).

**When to reopen the record.** A hub is set up when there are already three or more catalogs and it matters to people to search across all of them at once. Until then, two addresses on the organisation's site and a caption explaining how the shelves differ are enough.

## Small organisation, journalists, research group

**Type.** No portal is needed. A dozen files, one team and updates a few times a year are covered by a page and a description file.

**Mandatory.** A persistent address, a licence, schema.org markup, a date and a contact. If a release needs to be cited in an article, the DOI is given to the release in a general repository, not to every file on your own portal.

**Candidates.** A static site. A Git repository with releases in Zenodo. A shared hub, if the audience is already there. Your own CKAN, Dataverse or a cloud subscription at this size adds maintenance that nobody is there to do.

**More.** The part ["Publishing Without a Portal"](../08-beyond-portals/01-when-portal-not-needed.md): [static sites](../08-beyond-portals/02-static-sites.md), [Git repositories](../08-beyond-portals/03-git-repositories.md), [making a publication findable](../08-beyond-portals/05-making-it-findable.md).

**When to reopen the record.** There are so many datasets that a description file and a search page no longer cope, or the law requires a portal specifically. Thresholds by type are collected in the chapter ["When You Don't Need a Portal"](../08-beyond-portals/01-when-portal-not-needed.md). For an agency with twenty datasets, the record is already written there.

## Company

**Type.** Depends on what the company opens. Open datasets: a small portal or a page. Programming interfaces: an API catalog for developers. Selling data: a marketplace. These are three different catalogs, and a successful model of one does not carry over to another.

**Mandatory.** A licence that the buyer's or user's lawyer can understand. The description is open even if the file is paid: otherwise the buyer does not see what they are buying, and a search engine does not find the dataset.

**Candidates.** A cloud service or a tidy static site for open datasets. A developer portal from an API management system for an API catalog; the interface description is served in OpenAPI. For sales, a cloud marketplace such as AWS Data Exchange, if suppliers and buyers are already in that cloud, or an open catalog of descriptions, with the contract and delivery going directly between the parties. Open source catalog platforms do not accept payments. Your own marketplace without a ready audience usually stays empty: see the ["your own marketplace" record](./05-build-or-buy.md#example-your-own-data-marketplace).

**More.** [API catalogs, marketplaces and dataset lists](../03-types/10-other-types.md).

**When to reopen the record.** The company wants to publish open datasets, sell others and show developers its APIs. These are three rows, each with its own shortlist.

## Lab and data for models

**Type.** Usually not its own catalog. Datasets for training models are searched for on a few large platforms, and that is where conferences and libraries look too. The registry has 100 ML catalogs. On 12 October 2026 Hugging Face had more than a million datasets. Your own catalog is justified when the data cannot be handed to someone else's platform, or when a government programme tracks datasets from many organisations.

**Mandatory.** A dataset card: composition, collection method, known biases, what the dataset is not fit for. The split into training and test parts is fixed and does not change between releases. The licence answers whether a commercial model can be trained on the dataset. If the dataset accompanies a conference paper that requires a Croissant description, the card is served in it. A copy of the release with a DOI goes into a research repository: the platform may close, the link from the article must not.

**Candidates.** Hugging Face or Kaggle, and a copy of the release in Zenodo or a university repository. A competition with a hidden test part: Codabench or Kaggle competitions. Data that cannot be put on someone else's platform: Dataverse, which has Croissant in the core since 6.10, with the description open and the file on request. An open data portal does not set up a separate ML catalog: tables are served with a data dictionary and, if the platform can, with a Croissant description. A collection of a dozen datasets: a static site with a Croissant file for each dataset.

**More.** [ML catalogs](../03-types/07-ml-catalogs.md#how-to-choose), [cloud storage and shared hubs](../08-beyond-portals/04-cloud-storage-and-hubs.md).

**When to reopen the record.** The programme must accept datasets from many organisations and cannot hand files to someone else's hub. Until that day, no catalog of its own is installed.

## Two tasks at once

One owner often recognises themselves in two rows. A portal without a DCAT dump loses open data federation, a geoportal without a catalog service loses the spatial data infrastructure, a repository without DOIs loses citation. These chains hardly overlap, so a platform that is good for one row rarely covers the neighbouring one.

| Together | How it is usually arranged | Where it is analysed |
|--------|---------------------|---------------|
| A region publishes datasets and layers | an open data portal and a geocatalog side by side; a common search harvests layer descriptions and links to the services | [the region-with-maps record](../03-types/11-comparison-and-hybrids.md#example-decision-record-a-region-with-maps-and-datasets) |
| An office runs indicators and microdata | two platforms, two shelves on the site with different captions | [statistical office example](./08-worked-examples.md#statistical-office-indicators-and-microdata-are-different-catalogs) |
| A university keeps articles and data | a publications repository and a data repository; the link is kept by identifiers in the descriptions | [university example](./08-worked-examples.md#university-a-data-repository-not-another-ckan) |
| An organisation runs files, series and surveys | a hub: each shelf has its own platform, with a common search on top | [three hybrid setups](../03-types/11-comparison-and-hybrids.md#how-to-build-a-hybrid-three-setups) |

A second, small task is sometimes covered by an extension of the first platform: a layer preview on an open data portal, an API description next to datasets in udata. The mandatory standard of the second task is not replaced by an extension. If the spatial data infrastructure expects ISO 19115 and layer services, files in CKAN do not meet that obligation.

## If your row is missing

A catalog of descriptions only (reference lists, a registry of repositories, an indicator passport without the numbers themselves) is a [metadata catalog](../03-types/08-metadata-catalogs.md). Search over other catalogs without datasets of your own is a [search engine or aggregator](../03-types/09-search-engines-aggregators.md). If the type is not yet clear, the [route map](./01-route-map.mdx) gives it from the question "what matters most in the data", not from a job title.

## Sources

- [Worked examples](./08-worked-examples.md), [route map](./01-route-map.mdx), [selecting features](./02-feature-selection.md), [from features to a platform](./03-from-features-to-platform.md), [justifying a decision](./04-justifying-decisions.md), [requirements checklist](./07-requirements-checklist.md)
- [Capability Map](../04-features/01-capability-map.md): the minimum for any catalog and what a type adds
- The dataportals-registry export, release 1.27.0 of 15 October 2026: about 17,600 catalogs of local government bodies, about 14,400 of them geoportals; 2,862 open data portals of local bodies; 421 Gosweb showcases; a catalog service on 1 of 4,674 geoportals on ArcGIS Server and on none of 1,927 e-mapa portals; DCAT on 24 of 1,144 custom-built open data portals; 1,505 custom-built indicator catalogs, an API for 37% of catalogs of the type and 8% of custom-built ones. The queries are in the appendix ["Using the Registry"](../12-appendices/02-using-the-registry.md): [local bodies](../12-appendices/02-using-the-registry.md#owners-countries-content), [open data portals](../12-appendices/02-using-the-registry.md#open-data-portals), [geoportals](../12-appendices/02-using-the-registry.md#geoportals), [capability map](../12-appendices/02-using-the-registry.md#capability-map), [indicator catalogs](../12-appendices/02-using-the-registry.md#indicator-catalogs)
- [Open data portals](../03-types/02-open-data-portals.md): national portal models, standard distributions, the passport and Gosweb; [metadata standards](../07-publishing/02-metadata-standards.md): the recommendations 4.0 passport and when DCAT is added to it
- [Geoportals](../03-types/03-geoportals.md), [indicator catalogs](../03-types/05-indicator-catalogs.md), [microdata catalogs](../03-types/06-microdata-catalogs.md): NADA 5.7.1 of 4 October 2026 and the withdrawal of Nesstar, [research repositories](../03-types/04-scientific-repositories.md), [ML catalogs](../03-types/07-ml-catalogs.md)
- [Comparison of types and hybrids](../03-types/11-comparison-and-hybrids.md): three setups, the region-with-maps record, the composition of the Pacific Data Hub and the World Bank dataset catalog (7,900 datasets as of 12 October 2026, 7,145 surveys in the microdata library)
- [PANGAEA](https://www.pangaea.de/); the World Bank: [indicators](https://data.worldbank.org/), [microdata library](https://microdata.worldbank.org/), [dataset catalog](https://datacatalog.worldbank.org/); [Pacific Data Hub](https://pacificdata.org/); [the IATI standard](https://iatistandard.org/)
- [find.data.gov.scot](https://find.data.gov.scot/): a search engine over existing catalogs; analysis in the chapter [on search engines](../03-types/09-search-engines-aggregators.md)
- I. Begtin, [Publicly available data catalogs of international organisations](https://begtin.substack.com/p/cb4) (in Russian), January 2023: hubs of several catalogs
