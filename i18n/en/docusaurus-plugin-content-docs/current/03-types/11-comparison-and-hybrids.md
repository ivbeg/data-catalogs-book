---
title: Comparing Types and Hybrids
description: A summary table of catalog types, how they differ in substance, what hybrids exist and how to build a site that does two jobs at once.
---

# Comparing Types and Hybrids

Catalog types differ not by name but by their main unit, their description standard and what a catalog cannot do its job without. That is why a catalog should be compared with catalogs of its own type, and a platform chosen for the main product.

A hybrid is a website or organisation that runs catalogs of several types at once. This is common: roughly one in eight central agencies and one in eight international organisations run catalogs of two or more types. But only a handful use one piece of software for all types. The practical conclusion of the chapter: name the type of each part by what people open it for, choose a platform for each part, and decide separately how to connect them: shared navigation, shared search or harvesting descriptions into one catalog.

The figures in the chapter come from the dataportals-registry export (release 1.27.0 of 15 October 2026), which contains 43,614 catalogs. The queries are in the appendix ["Using the Registry"](../12-appendices/02-using-the-registry.md#comparing-types-and-hybrids). Live websites were checked on 12 October 2026.

## Types in numbers

| Type | Catalogs | Most often run by | Custom builds | Have an API | Restricted access | Dead | Main platforms |
|-----|----------:|------------------|----------------:|---------:|--------------------:|------------:|-------------------|
| [Geoportal](./03-geoportals.md) | 24,752 | local government, 58% | 4% | 70% | 1% | 2.0% | ArcGIS Server, ArcGIS Hub, e-mapa, GeoServer |
| [Research repository](./04-scientific-repositories.md) | 8,404 | universities and research organisations, 85% | 34% | 63% | 6% | 1.4% | DSpace, Pure, IPT, Figshare |
| [Open data portal](./02-open-data-portals.md) | 5,967 | local government, 48% | 19% | 69% | 1% | 4.1% | CKAN, OpenDataSoft (Huwise), Gosweb, Socrata |
| [Indicator catalog](./05-indicator-catalogs.md) | 3,405 | central government, 46% | 44% | 37% | 4% | 0.9% | Swing, WordPress, Drupal, Knoema |
| [Microdata catalog](./06-microdata-catalogs.md) | 326 | central government, 55% | 13% | 70% | 49% | 18.1% | NADA, REDATAM, OBiBa Mica, Nesstar |
| [Metadata catalog](./08-metadata-catalogs.md) | 172 | universities and research organisations, 31% | 38% | 67% | 10% | 0% | FAIR Data Point, Metadata Browser, Skosmos |
| [Dataset search engine](./09-search-engines-aggregators.md) | 124 | universities and research organisations, 68% | 28% | 55% | 1% | 4.8% | OpenAIRE, VIVO |
| [API catalog](./10-other-types.md#api-catalogs) | 115 | central government, 45% | 74% | 51% | 14% | 0% | Azure API Management |
| [Dataset list](./10-other-types.md#dataset-lists) | 107 | companies, 20% | 89% | 14% | 1% | 6.5% | site generators, CMS |
| [ML catalog](./07-ml-catalogs.md) | 100 | universities and research organisations, 37% | 78% | 23% | 5% | 2.0% | site generators, competition platforms |
| [Marketplace](./10-other-types.md#data-marketplaces) | 56 | companies, 70% | 98% | 21% | 91% | 0% | custom builds for almost all |

"Restricted access" is the share of catalogs where at least part of the data is provided after registration, on application or for a fee. "Dead" means catalogs that do not open or have been officially decommissioned. Knoema appears in the table according to the registry records: the service itself has not opened since January 2026, as covered in the chapter [on indicator catalogs](./05-indicator-catalogs.md#where-it-breaks).

What the table shows:

- **Custom builds and APIs go in opposite directions.** Where a platform is widely accepted (geoportals, open data portals, microdata), two thirds or more of catalogs have an API. Where everyone writes their own (marketplaces, ML catalogs, lists), a fifth or fewer do. A custom build rarely gets as far as a programming interface: it has to be not only written but also maintained.
- **Restricted access is a feature of the type, not a sign of trouble.** Marketplaces almost always have it, and half of microdata catalogs: surveys contain information about people. For an open data portal, closed access is a reason to investigate.
- **The share of dead microdata catalogs is a trace of abandoned installations.** 47 of the 59 dead ones are old NADA catalogs of statistical offices that were installed as part of support programmes and stopped being maintained. The analysis is in the chapter [on microdata catalogs](./06-microdata-catalogs.md#where-it-breaks).
- **A specialised platform hardly ever goes beyond its type.** CKAN means 1,906 open data portals and only 39 research repositories. GeoNode (770), Dataverse (257) and PxWeb (110) each appear in exactly one type, NADA and DSpace with one exception. Only WordPress spans nine types out of eleven, Drupal seven, Liferay and TYPO3 six each: a general-purpose CMS says nothing about the type.

## How the types differ in substance

The numbers show how the market is organised. The substantive difference lies in what a catalog publishes and what it is obliged to preserve.

| Type | Main unit | Description standard | Cannot work without | Must not lose | Passes descriptions to |
|-----|-----------------|-------------------|----------------------|---------------------|----------------------|
| Open data portal | a dataset: a file or table | DCAT | DCAT description export, open licence | the dataset address and licence | the higher-level portal, general search engines |
| Geoportal | a layer and a map service | ISO 19115, CSW, OGC API Records | a catalog service and the layer services themselves | the ability to download, not just view | the national spatial data infrastructure |
| Research repository | a dataset version with a DOI | DataCite | file storage, DOIs, versions, citation | the version that was cited | DataCite, research aggregators via OAI-PMH |
| Indicator catalog | an indicator and a time series | SDMX | a series API, methodology and units of measure | the series methodology and its persistent address | international organisations via SDMX |
| Microdata catalog | a survey and its files | DDI | access levels, variable descriptions | access conditions and the codebook | social data archives |
| ML catalog | a dataset for training and evaluating models | Croissant, dataset card | splits, licence, card | the version and split on which models were measured | platforms and search engines via markup |
| Marketplace | a product: a dataset or subscription | none common | contract, payment, delivery | contract terms | nobody: the catalog is closed to harvesting |
| Search engine or aggregator | a record about someone else's dataset | whatever it harvests | harvesting via protocols, deduplication | the link to the original source | people; sometimes the next aggregator |
| Metadata catalog | a vocabulary, schema, catalog description | SKOS, SDMX, ISO/IEC 11179 | persistent concept addresses, versions | old versions of concepts | systems that refer to it |
| API catalog | a programming interface | OpenAPI | interface description, access conditions | the interface's version history | the open data portal, general API catalogs |
| Dataset list | a link to a file | most often none | working links | — | usually nobody |

Two conclusions from the table. First, what neighbouring types "cannot work without" hardly overlaps. A portal without DCAT loses federation, a repository without DOIs loses citation, and an indicator catalog without a series API turns into a table builder in the browser. That is why a platform good for one type is rarely good for its neighbour. Second, descriptions of different types go into different chains. A portal passes DCAT to the national portal, a geoportal passes ISO 19115 to the spatial data infrastructure, a repository passes to DataCite. If a website does two jobs, it has two chains, and both have to be maintained. Which capabilities are mandatory for which scenario is covered in detail in the chapter ["Capability Map"](../04-features/01-capability-map.md).

## Hybrids

The book uses "hybrid" for two different cases. The first is **one website** on which two products live side by side: datasets and layers, datasets and API descriptions. The second is **one organisation** running several catalogs of different types: a statistical office with indicators and microdata, an international organisation with a portal, a geoportal and a survey library. The most developed version of the second case is a data hub: several catalogs under one banner with a shared search.

A hybrid is not a new type. Each part of a hybrid is described and evaluated by its own type: a statistical office's indicators are compared with other offices' indicators, not with its own microdata catalog.

### How many organisations run catalogs of different types

The registry has 32,595 owners, if an owner is counted as an organisation with one name in one country. 2,203 of them have catalogs of two or more types, 254 of three or more. These owners account for 7,358 catalogs, or every sixth catalog in the registry. The count by name is approximate: the same agency can be recorded in different ways, so the real number of "multi-type" owners is probably higher.

The larger and more centralised the organisation, the more often it has several types:

| Owner | Share of owners with catalogs of two or more types |
|----------|------:|
| Central government | 12% |
| International organisations | 12% |
| Regional government | 10% |
| Universities and research organisations | 7% |
| Local government | 5% |
| Companies | 2% |

Pairs of types recur. Among owners with exactly two types:

| Pair of types | Owners | Who it usually is | Common software combinations |
|------------|----------:|------------|---------------------------|
| Geoportal and open data portal | 953 | cities and regions | ArcGIS Server and CKAN, GeoServer and CKAN, ArcGIS Hub and Socrata |
| Geoportal and research repository | 344 | universities and research institutes | ArcGIS Server or GeoServer next to DSpace, THREDDS, ERDDAP |
| Geoportal and indicator catalog | 227 | statistical offices, regions | a map server next to an indicator database |
| Open data portal and research repository | 86 | science agencies, universities | CKAN next to Dataverse or DSpace |
| Indicator catalog and open data portal | 80 | statistical offices, regions | — |
| Indicator catalog and microdata catalog | 72 | statistical offices | an indicator database and NADA or REDATAM |

1,127 organisations run a geoportal and an open data portal together, if those with a third type are also counted. 56% of them are local government, 22% regional. The most such pairs are in the US (174), Italy (90), Slovakia and Spain (58 each).

### One piece of software for two types is rare

Of 2,203 owners with several types, 118 manage all their catalogs with one piece of software, with a custom build counted here as one piece of software. The "geoportal and open data portal" pair shows this most clearly. Of the 953 owners who have only these two types, four have the same ready-made platform on both sides: three ArcGIS Hub, one WordPress. Another 39 have custom builds for both parts. The rest run two different programs: a map server for layers and a portal platform for datasets.

This is not carelessness but a consequence of the table in the previous section. A geoportal needs a catalog service and layer services; a portal needs DCAT and file download. Few programs do both equally well, and owners choose a specialised program for each task.

## Five kinds of hybrid

### A second product as an add-on

The most common and simplest case. There is one main product, and the second complements it.

- **An open data portal with a map** remains a portal if the map shows tables that are already published. It becomes a geoportal if without WMS and WFS services the website has nothing to show. In the registry, 43 open data portals have map layers marked as content.
- **A geoportal with tables** remains a geoportal if the tables are layer attributes or a couple of files next to the map.
- **A research repository with a map** remains a repository if the map is a way to find a dataset by the place of observation, not a product.

The rule: the type is determined by what gets its own address and its own card. A map, chart or preview without its own address is a feature, not a second catalog. Such a hybrid is solved with one platform and one extension: for example, CKAN with [ckanext-spatial](https://github.com/ckan/ckanext-spatial) for search by territory and [ckanext-geoview](https://github.com/ckan/ckanext-geoview) for layer previews. If maps become the main product, an extension is no longer enough: the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md#three-working-setups) covers this as a separate build with a caveat on when it is more honest to take a geoplatform.

### One platform, several kinds of records

The platform was designed from the start to keep records of several kinds, and each kind has its own address and its own card. This is a true hybrid in one piece of software.

- **[data.norge.no](https://data.norge.no/en)**, Norway's national catalog, keeps five catalogs under one banner: datasets, APIs, concepts, information models, and public services and events. As of 12 October 2026 it has 9,066 datasets, 1,071 APIs, 6,383 concepts and 1,393 services. Only 1,644 of the 9,066 datasets are marked as open data. The rest are descriptions of data the state has but which are not necessarily available to all: in effect, a metadata catalog about government data. It runs on its own development, Felles datakatalog, with [open code](https://github.com/Informasjonsforvaltning/fdk-portal) under the Apache 2.0 licence, and harvests descriptions from organisations' catalogs in the DCAT-AP-NO profile. By type it is an open data portal, an API catalog and a metadata catalog at once. The registry counts it twice, as a portal and as an API catalog.
- **[data.gouv.fr](https://www.data.gouv.fr)**: 74,376 datasets, 1,265 data services (as API descriptions are called here) and 507 harvest sources. The former API catalog api.gouv.fr has been merged into the portal, as covered in the chapter [on API catalogs](./10-other-types.md#api-catalogs). Data services and harvesting descriptions from CKAN and DCAT are in the core of its software, [udata](https://github.com/opendatateam/udata) (release 17.12.1 of 9 October 2026).
- **GeoNode** keeps layers, maps, documents, map stories (GeoStories) and dashboards in its core, and also harvests resources from remote map services, according to the [documentation](https://docs.geonode.org/en/latest/) of release 5.1.0 of 18 August 2026. It is a geoportal with a small document archive inside.
- **NADA**, according to its [project description](https://nada.ihsn.org/), can describe not only surveys but also indicators, geodata, documents and images, in DDI Codebook, Dublin Core, ISO 19115 and 19139, IPTC. But a platform capability does not in itself make a catalog a hybrid. In the World Bank Microdata Library all 7,145 records are surveys, with no other kinds. The catalog remains a microdata catalog, and the bank publishes indicators and geodata on other platforms.
- **ArcGIS Hub** is a geoportal that behaves like an open data portal: each layer can be downloaded as a file, and the catalog is served in DCAT-US and DCAT-AP. The registry records Hub as a geoportal 3,464 times and as an open data portal 19 times. More in the chapter [on geoportals](./03-geoportals.md#an-organisations-open-geodata-catalog).

Such a hybrid works when the kinds of records are linked to each other. In Norway a dataset refers to the concepts that describe its fields and to the API through which it is obtained. On data.gouv.fr a data service refers to the dataset whose rows it serves. If the kinds of records are not linked, one piece of software for them is merely a saving on maintenance, justified only when the software handles each kind no worse than a specialised one.

### A portal that also harvests

The portal publishes its own datasets and at the same time harvests descriptions from other catalogs. data.gouv.fr accepts publications directly and harvests descriptions from 507 sources. data.europa.eu harvests national portals, and since 1 July 2026 the address of the closed INSPIRE geoportal also leads to it. For the user there is no difference: they search across everything at once. For the owner these are two different obligations: they are responsible for their own datasets, and for the harvested ones only for not showing dead records and not multiplying duplicates. How an aggregator differs from a search engine and how harvesting works is covered in the chapters [on search engines and aggregators](./09-search-engines-aggregators.md) and [on federation and harvesting](../07-publishing/03-federation-and-harvesting.md).

### Several catalogs of one owner

An organisation runs catalogs of different types on different software, and only the website navigation connects them. Most statistical offices are organised this way. Mexico's INEGI has 22 records of four types in the registry: an indicator bank and interactive tables, tables on PxWeb, an SDMX service, a microdata catalog on NADA (825 studies as of 12 October 2026) and REDATAM for census calculations, a map portal and an open data page.

This is a normal setup if the website says plainly what is where. An "indicator" and a "survey file" are different shelves, and the user needs to be told which one to go to. Why two catalogs are better than one "universal portal" for a statistical office is worked through in the [statistical office example](../06-choice/08-worked-examples.md#statistical-office-indicators-and-microdata-are-different-catalogs).

### Hub

A hub is several catalogs of different types under one banner, connected by shared navigation and often a shared search. The portals of international organisations are organised this way.

- **[Pacific Data Hub](https://pacificdata.org/)** of the Pacific Community has, according to the registry export, more than 30 records of five types: a dataset portal on CKAN, microdata on NADA, indicators on .Stat Suite with an SDMX service, geoportals on GeoNode and a map showcase on TerriaJS, THREDDS servers with oceanographic data, a STAC imagery catalog of the Digital Earth Pacific programme and PopGIS demographic geoportals for fifteen countries.
- **The World Bank** keeps separate [indicators](https://data.worldbank.org/), a [microdata library](https://microdata.worldbank.org/) and a [data catalog](https://datacatalog.worldbank.org/) that harvests descriptions from the others: as of 12 October 2026 it holds 7,900 datasets, including from the microdata library and the finance and energy platforms. The data.worldbank.org home page says that the open data site "is expanding into Data360", and the address data360.worldbank.org leads to the same place. The registry has 28 records of five types for the bank, most of them separate indicator databases.
- **FAO**: a dataset catalog on CKAN, more than a dozen thematic maps on TerriaJS at data.apps.fao.org, sites on ArcGIS Hub and indicator databases on its own FENIX platform.

A hub does not make catalogs the same. It solves a different problem: a person who came for "data about Fiji" does not need to know that indicators are in .Stat Suite and surveys in NADA. A hub's shared search is usually built by harvesting descriptions from all catalogs into one, as the World Bank data catalog does. Then the hub gets one more harvesting chain, with all its problems.

## How to determine the type of a hybrid

The type of each part of a hybrid is determined by the same questions as the type of an ordinary catalog; they are covered in the chapter [on classification](./01-classification.md#how-to-determine-the-type). For a hybrid, four checks are added.

1. **What gets its own address.** If a layer, series or API has its own card with a persistent address, it is a separate part with its own type. If not, it is a feature of the main catalog.
2. **What goes into federation.** Look at what the website serves in DCAT, CSW or OAI-PMH. If the DCAT export contains only datasets while layers go via CSW to the spatial data infrastructure, the website has two chains and, in effect, two catalogs.
3. **Which search is the main one.** If the home page has one search across everything and the results lead into different software, it is a hub. If there are several searches and each covers its own shelf, these are several catalogs side by side.
4. **Which software stands behind each part.** Different paths on one domain often mean different software: `/catalog` is CKAN, `/microdata` is NADA, `/geoserver` is a map server.

The classification of a hybrid is recorded not as one line but as a line per part, using the template from the chapter [on classification](./01-classification.md#how-to-record-the-classification-of-your-own-catalog). For INEGI these are four lines: an indicator catalog on a custom build, PxWeb and an SDMX service; a microdata catalog on NADA with REDATAM; a geoportal on a custom build; an open data portal. The owner, level and access are shared, but the type, standard and platform differ.

## How to build a hybrid: three setups

If you need two types at once, the choice comes down to three setups.

| Setup | When it fits | What it costs | Examples |
|-------|----------------|-------------|---------|
| One platform with extensions | the second product is small and its standard is supported by an extension or the core | the second product is weaker than in specialised software; the extension has to be checked with every upgrade | CKAN with ckanext-spatial, Dataverse for microdata, GeoNode with documents |
| Two specialised platforms and shared navigation | both products matter, each has its own standard and its own chain | two maintenance efforts and two addresses; the user needs to be told what is where | a statistical office: PxWeb or .Stat Suite and NADA; a city: ArcGIS Server and CKAN |
| Hub: several platforms and a shared search | three or more catalogs, and searching across all of them matters to the user | one more harvesting chain, duplicates, identifier matching, a central team | Pacific Data Hub, the World Bank data catalog, data.norge.no |

What specialised platforms can do outside their type:

| Platform | Own type | Second product | How |
|-----------|----------|----------------|-----|
| CKAN 2.12 | open data portal | search by territory and harvesting geodata descriptions via CSW | the [ckanext-spatial](https://github.com/ckan/ckanext-spatial) extension |
| CKAN 2.12 | open data portal | WMS and GeoJSON layer previews | the [ckanext-geoview](https://github.com/ckan/ckanext-geoview) extension, release 0.3.2 of 2 October 2026 |
| CKAN 2.12 | open data portal | layer services, microdata access levels, SDMX | no: a second piece of software is needed |
| ArcGIS Hub | geoportal | file download and DCAT export, as for an open data portal | core |
| GeoNode 5.1 | geoportal | documents, map stories, dashboards | core |
| Dataverse | research repository | microdata: DDI description, restricted-access files | core |
| Dataverse | research repository | geodata: a coverage description block | core; the map via pluggable previewers |
| NADA | microdata catalog | indicators, geodata, documents | core, but without an SDMX service or layer services |
| udata 17 | open data portal | an API catalog (data services) and harvesting other catalogs | core |

The capabilities of each platform are covered in detail in the [platform profiles](../05-platforms/04-platform-profiles.md), and summary tables are in the [appendix](../12-appendices/03-platform-tables.md).

## Example decision record: a region with maps and datasets

**Context.** A region runs an open data portal on CKAN and passes descriptions to the national portal in DCAT-AP. Separately, the regional land agency runs a map server with layers and a GeoNetwork catalog that passes descriptions via CSW to the national spatial data infrastructure. Residents complain that layers cannot be found on the portal, and management proposes to "bring everything together".

**Options.**

1. Move the layers into CKAN as files and close the geocatalog.
2. Replace both websites with one geoplatform that also handles datasets, for example ArcGIS Hub.
3. Keep both systems. CKAN with ckanext-spatial harvests layer descriptions from GeoNetwork via CSW and shows them in the shared search with links to the services. Layers go to the national portal through one chain only.

**Criteria.** Do not lose obligations to the spatial data infrastructure. One search for the resident. Do not create duplicates in the national and European catalogs. How many programs to maintain.

**Decision.** Option 3.

**Why.** Option 1 breaks an obligation: the spatial data infrastructure expects descriptions in ISO 19115 and layer services, not files. Option 2 is possible, but changes both systems at once and ties the region to one vendor's cloud; three of the 953 owners of this pair in the registry do this. Most keep two programs, most often a map server and CKAN. Option 3 keeps each program in its place and gives the resident one search.

**Consequences.** CKAN gets one more extension that has to be checked with upgrades: ckanext-spatial passes automated tests on 2.12, as recorded in the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md). Harvested layer descriptions must be excluded from the DCAT export if the national portal harvests the geocatalog itself, otherwise the same layer will reach data.europa.eu twice. How such chains break and get tangled is covered in the chapter [on federation](../07-publishing/03-federation-and-harvesting.md#where-the-chain-breaks).

**When to revisit.** If layers become the region's main product and datasets an appendix to them. If the national portal stops harvesting geocatalogs directly. If ckanext-spatial stops being released for a new version of CKAN.

## Where hybrids break

**Duplicates in federation.** The same layer goes up twice: through the geoportal via CSW and through the open data portal via DCAT. The aggregator shows two records with different addresses, and both look like the main one. To avoid this, each part of a hybrid should have its own chain, and what has been harvested from the neighbouring part is not passed up again.

**One part outweighs everything.** If both parts are connected to federation, the count is determined by the one that slices data more finely. On data.europa.eu, of 850,000 German datasets, 681,000 come from a single geocatalog, almost 450,000 of them development plans for individual plots. When comparing countries or organisations, check which part of the hybrid the records came from.

**Only one part is visible.** The opposite problem: one part of a hybrid was connected to federation and the other forgotten. In June 2024 data.europa.eu saw 324 datasets from Estonia because it harvested only the national geoportal. After the open data portal was connected, there were 8,700.

**One thing, different cards.** A dataset in the portal and a layer in the geoportal describe the same data, but with different titles, licences and update dates. The user does not understand which card is correct, and the search engine sees two.

**Two searches without explanation.** A statistical office website with a search across indicators and a separate search across surveys, where neither mentions the existence of the other. A person looks for a survey in the indicator search, finds nothing and leaves.

**A universal platform does the second product badly.** CKAN with layers loaded as files provides no WMS and WFS services. An indicator catalog on a CMS serves tables as images and PDFs. "Can do this too" in a platform description does not mean it can do it the way the second type needs.

**The hub is closed to programs.** The whole value of a hub lies in the links between catalogs, but some hubs close them to programs. On 12 October 2026 the API of the Pacific Data Hub portal, its GeoNode and the FAO catalog on CKAN responded to programs with a Cloudflare check, and the INEGI tables on PxWeb with a 403 error. A person in a browser sees the data, but an aggregator and a researcher with a script do not. How this affects discoverability is covered in the chapter [on discoverability](../07-publishing/05-discoverability.md).

**One part of the hub dies, the rest live on.** Hub components age differently. The 110 owners who run both indicators and microdata have 60 indicator catalogs recorded in the registry on Knoema, a service that has not opened since January 2026. A hub has to be maintained as a set of separate programs, each with its own lifespan.

**Type by a single record.** Aggregators and registries record a hybrid as one type, and the type counts drift as a result. ArcGIS Hub in the registry is almost always a geoportal, data.norge.no is an open data portal and an API catalog at the same time. When comparing figures by type, remember that the boundary between them was drawn by a person, not a program.

## How to check a hybrid

You can see what is actually inside with API requests. All commands were checked on 12 October 2026.

```bash
# data.gouv.fr: datasets, data services (APIs) and harvest sources in one program
curl -s https://www.data.gouv.fr/api/1/site/ | jq '.metrics | {datasets, dataservices, harvesters}'

# data.norge.no: how many records are in each catalog
for t in datasets data-services concepts services; do
  printf "%s: " "$t"
  curl -s -X POST -H 'Content-Type: application/json' \
    -d '{"pagination":{"size":1,"page":0}}' \
    "https://search.api.fellesdatakatalog.digdir.no/search/$t" | jq .page.totalElements
done

# NADA: which kinds of records actually exist in the catalog
for t in survey geospatial timeseries table document; do
  printf "%s: " "$t"
  curl -s "https://microdata.worldbank.org/index.php/api/catalog/search?ps=1&type=$t" | jq .result.found
done
```

For the World Bank Microdata Library the last command gives 7,145 surveys and zero records of other kinds. Old versions of NADA do not understand the `type` parameter and return the same number for any kind; the INEGI catalog responds this way. In that case the kinds of records are checked in the catalog itself, in the data type filter.

For CKAN it is useful to compare the DCAT export with search: if search contains layers but `/catalog.ttl` does not, the layers were harvested from the geocatalog and go up through another chain. Commands for individual types are in the "How to check" sections of the chapters on each type and in the [checklists](../12-appendices/04-checklists.md).

## The rule

Name the type of each part by what people open it for. Choose the platform for that part, not the "most universal" one. Cover the second task with an extension if it is small, with a separate program if it matters, or honestly cut it back. The link between the parts (navigation, shared search or harvesting descriptions) is a separate decision with its own cost, and it is worth writing it down in a decision record, as in the example above.

## Sources

- dataportals-registry export, [release 1.27.0](https://github.com/datenoio/dataportals-registry/releases/tag/v1.27.0) of 15 October 2026: types, owners, platforms, shares with an API, with restricted access and of dead catalogs, owners with catalogs of several types and software combinations. The queries are in the [appendix](../12-appendices/02-using-the-registry.md#comparing-types-and-hybrids).
- [data.norge.no](https://data.norge.no/en) and the Felles datakatalog search API, [portal code](https://github.com/Informasjonsforvaltning/fdk-portal); [data.gouv.fr](https://www.data.gouv.fr/api/1/site/), [udata](https://github.com/opendatateam/udata) 17.12.1; [World Bank Microdata Library](https://microdata.worldbank.org/), [World Bank data catalog](https://datacatalog.worldbank.org/), [data.worldbank.org](https://data.worldbank.org/); [INEGI microdata catalog](https://www.inegi.org.mx/rnm); [Pacific Data Hub](https://pacificdata.org/); checked 12 October 2026.
- [NADA](https://nada.ihsn.org/): kinds of records and description standards; [GeoNode documentation](https://docs.geonode.org/en/latest/) and [release 5.1.0](https://github.com/GeoNode/geonode/releases); [ckanext-spatial](https://github.com/ckan/ckanext-spatial), [ckanext-geoview](https://github.com/ckan/ckanext-geoview); checked 12 October 2026.
- I. Begtin, [Public data catalogs of international organisations](https://begtin.substack.com/p/cb4) (in Russian), January 2023.
- [How to Classify Catalogs](./01-classification.md), [Capability Map](../04-features/01-capability-map.md), [Federation and Harvesting](../07-publishing/03-federation-and-harvesting.md), [Worked Examples](../06-choice/08-worked-examples.md), [Justifying a Decision](../06-choice/04-justifying-decisions.md).
