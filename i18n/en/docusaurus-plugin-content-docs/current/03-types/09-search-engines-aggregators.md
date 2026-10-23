---
title: Dataset Search Engines and Aggregators
description: Services that collect descriptions from many catalogs and offer one search. Who builds them, how they work, what they run on, how to use them and where they go wrong.
---

# Search Engines and Aggregators

A dataset search engine does not publish datasets of its own. It takes descriptions from many catalogs and offers one search across them. The files themselves stay with the source, and a person follows a link to get there.

The practical conclusion for both sides. For someone looking for data, a search engine is useful as a first step when it is not known who holds the data. But "nothing found" does not mean the data does not exist: each search engine sees only its own part of the world. For a catalog owner, search engines bring users almost for free, provided the catalog serves descriptions in a standard way. An organisation rarely needs a search engine of its own: it is expensive to run, and such services close down more often than others.

According to the dataportals-registry export (release 1.27.0 of 15 October 2026), there are 124 search engines. This is the most blurred type in the registry: more than half of the records are showcases of two systems, and many of the largest search engines are recorded as other types. The analysis is in the section [The number of search engines is not a measure](#the-number-of-search-engines-is-not-a-measure).

## Aggregator or search engine

Both take other people's descriptions and publish nothing themselves. The difference is whom the pages are made for. An aggregator has its own page with a persistent address for each dataset, and shows it deliberately to ordinary search engines like Google: there is a sitemap, and the page opens without scripts. The aggregator wants to be found. A search engine shows only results for a query, and has no separate pages that someone else would index: a person goes straight to the source.

- **NIAID Discovery Portal** of the US National Institute of Allergy and Infectious Diseases collects descriptions of biomedical datasets from dozens of repositories. As of 12 October 2026 it holds 14.2 million records, each with its own page, and `robots.txt` lists 26 sitemaps. It is an aggregator.
- **find.data.gov.scot** calls itself a search engine for Scottish data, but each of its 26,500 datasets from 70 sources has its own page, and all are listed in the sitemap (October 2026). By design it is also an aggregator.
- **Google Dataset Search** keeps no dataset pages of its own: a card in the results leads to the source's website. It is a search engine.

For a data owner the difference is practical. A search engine creates no extra copies. An aggregator does: in Google an aggregator's page with the same dataset may appear next to yours. How to make the search engine treat yours as the main one is covered in the chapter [on discoverability](../07-publishing/05-discoverability.md).

From here on in the chapter both kinds are called search engines unless the difference matters.

## Who builds them

Dataset search engines are built mainly by the research world. Research infrastructures and funders pay for search across research outputs because they require scientists to publish data and want to see what has been published.

| Owner | Search engines | Share |
|----------|------------:|-----:|
| Universities and research organisations | 84 | 68% |
| International organisations | 17 | 14% |
| Companies | 8 | 6% |
| Communities and civil society organisations | 7 | 6% |
| Central government | 6 | 5% |
| Other | 2 | 2% |

**Research networks**: OpenAIRE and the community showcases built on its graph, EUDAT with the B2FIND search engine, national research data search engines of Sweden, Australia, China and Turkey.

**International organisations** search within their sector: the International Aid Transparency Initiative (IATI) search engines for development aid projects, the OECD's eChemPortal for information on chemicals, Ocean InfoHub for ocean data, GARDIAN of the CGIAR research consortium for agricultural data.

**Companies**: Google with Dataset Search, GeoSeer with search across geoservices, Transitland with a catalog of transit schedules.

**Governments** rarely build search engines. More often they build a national portal that itself harvests agencies and regions: the US data.gov, the European data.europa.eu. In substance this is the same work one level up, but the registry records such websites as open data portals. A notable exception is Scotland, where the search engine appeared before the portal.

By territory: 37 search engines cover the European Union as a whole, 21 the whole world, 23 are in Italy, 8 in Germany. Other countries have one or two each.

### The number of search engines is not a measure

Of 124 records, about forty are separate services with their own index. The rest are as follows:

- **50 are OpenAIRE CONNECT showcases.** This is an OpenAIRE cloud service: a community, a university alliance or a research infrastructure gets its own search website that shows a slice of the shared OpenAIRE graph according to that community's rules. A showcase does no harvesting of its own. In essence it is one search engine with fifty entrances.
- **28 are VIVO systems.** VIVO is open-source software for an organisation's researcher profiles: people, publications, projects, sometimes datasets. Of the 28 installations, 17 are Italian UNIFIND systems installed for Italian universities by a single consortium. Hence Italy's 23 "search engines".
- **6 are Idra.** All six are demo and test instances, and none is active, although the software itself is still being developed.

On the other hand, many large search engines are recorded differently in the registry. Dateno, NIAID Discovery Portal, Research Data Australia, GESIS Search and DataONE are listed as research repositories. B2FIND, NASA's Earthdata Search, OmicsDI, data.europa.eu and data.gov as open data portals. This is partly fair: many of them both store something of their own and collect from others. But the world of search engines cannot be counted from one registry type. There are opposite errors too: the search engine of the Dutch archive DANS EASY is recorded as active, although it closed on 2 December 2024 and its datasets moved to the new DANS Data Stations.

## What they collect

The main unit of a search engine is a record about someone else's dataset. It contains exactly what the source provided: title, description, publisher, a link to the dataset page, sometimes a licence, territory, dates and links to files. If the source did not specify a licence, the search engine will not have one either: it has no right to invent it.

On top of this the search engine adds its own work:

- **normalises fields**: country, format, licence, theme, so that filters work on them;
- **merges duplicates**: one dataset from a city, regional and national portal should become one record;
- **remembers the source and harvest date**, so that it is clear where a record came from and how fresh it is;
- **sometimes looks into the data itself**: downloads the file and parses its columns, like Auctus, or puts a copy of the data into its own storage.

What exactly gets into a search engine depends on its sources. Research search engines collect DataCite records and repositories, government ones open data portals, geosearch layer catalogs and geoservices, and statistics aggregators such as [DBnomics](https://db.nomics.world/) the time series themselves (in October 2026, 94 sources and about 47,000 series datasets). There is no general search engine that sees all types of data equally well.

## How they work

Outwardly search engines look alike: a search box, filters, a list of cards. Inside they are organised differently, and the design determines what will be in them and what never will. Seven models are the most common.

### Search by page markup

The search engine makes no agreements with anyone. It crawls the web like an ordinary search engine and takes descriptions from schema.org/Dataset markup on dataset pages. This is how Google Dataset Search works: in February 2023, more than 45 million datasets from 13,000 websites; Google has published no newer official figure. The coverage is huge, but only of sites that have added markup, and the search engine cannot verify it. Geoportals and indicator catalogs rarely add markup, so their data is almost absent here.

### Harvester using catalog protocols

The search engine keeps a list of sources and maintains a harvester for each type of platform: the CKAN API, DCAT files, OAI-PMH, CSW, the ArcGIS interface. This is how Dateno, B2FIND, BASE and OpenAIRE work. On 12 October 2026 Dateno showed 22 million datasets from 5,200 sources; at the end of 2024 it had harvesters for more than 15 types of platform. B2FIND of the EUDAT consortium collects European research repositories: in October 2026 it held 1.47 million records.

This model needs a registry of sources with manual checking and a harvester for each platform. A custom portal with its own interface is seen last or not at all. Dateno's registry is dataportals-registry, from which the figures in this book were calculated. The registry was originally created for the search engine, and Dateno indexes portals from their descriptions in the registry: it chooses the harvester by the recorded platform and API addresses.

### Sector aggregator

It collects the sources of one sector and knows its description schemas, so it offers filters that general search engines lack: organism and experiment type, instrument and satellite, substance and regulation. Examples:

- **NIAID Discovery Portal**: biomedicine, 14.2 million records, 62% from a single database, NCBI GEO;
- **OmicsDI**: data from "omics" research (genomics, proteomics and the like), 4.9 million datasets from 29 databases (October 2026);
- **DataONE**: Earth and environmental sciences, about 1.08 million current descriptions excluding superseded versions, from 83 registered member repositories;
- **Earthdata Search**: NASA Earth observation data, 45,000 collections; each collection is a series of products that may contain millions of files;
- **the OECD's eChemPortal**: information on chemicals from government databases of various countries;
- **Transitland**: public transport schedules in GTFS format from around the world.

A sector aggregator is the most durable kind: it has a client who understands why it is needed.

### National search engine

Instead of one common portal, a country or region collects descriptions from hundreds of local sources. find.data.gov.scot: 26,500 datasets from 70 sources; the data.gov.scot portal appeared later, in 2026. Research Data Australia is a search across Australian universities, research organisations and agencies: in July 2025, about 224,000 records, of which about 96,000 had data available online. Similar services exist in Sweden (researchdata.se), China (Findata) and Turkey (the academic archive Harman).

This model needs agreements with sources, harvesting via DCAT and a link to the original source in every card. The Scottish path of "search first, portal later" is worked through in the chapter ["Federation and Harvesting"](../07-publishing/03-federation-and-harvesting.md#what-it-looks-like-in-practice).

### Service crawler

The search engine finds servers of a certain standard by itself and queries them without asking the owners. GeoSeer crawls WMS, WFS, WCS and WMTS geoservices: 3.5 million layers from 4,200 servers. STAC Index keeps a list of catalogs of satellite imagery and other spatial files in the STAC standard: in October 2026, 149 catalogs, of which 63 are servers with an API and 86 are static sets of files. A crawler sees what is not marked up and not listed in any catalog, but only in its own standard.

### Showcase over a shared index

It collects nothing itself but shows a slice of a large index according to a community's rules: OpenAIRE CONNECT showcases, the shared FAIR Data Point index, VIVO profile systems. Launching such a showcase is cheap, but its content is the same as in the shared index, with all its gaps.

### Search by content

The search engine downloads the files themselves, parses columns, their types, dates and coordinates, and searches on these. This is how New York University's [Auctus](https://auctus.vida-nyu.org/) works: in it you can find a dataset that complements your table through a shared column, for example a district code or a date. The price is coverage: in October 2026 Auctus held about 55,000 datasets from 64 sources, half of them from the Humanitarian Data Exchange. Downloading and parsing every file is expensive, so search by content still remains a niche.

### What follows from this

| Model | Example | What it cannot do without | Weak spot |
|--------|--------|----------------------|--------------|
| By page markup | Google Dataset Search | schema.org markup at the sources | takes markup at its word, does not see unmarked pages |
| Harvester using protocols | Dateno, B2FIND, OpenAIRE | a source registry, harvesters for platforms, deduplication | custom portals without a standard interface |
| Sector aggregator | NIAID, DataONE, Earthdata | sector description schemas and filters | sees only its own sector |
| National search engine | find.data.gov.scot | agreements with sources, harvesting via DCAT | depends on one team and one budget |
| Service crawler | GeoSeer, STAC Index | finding servers, parsing responses of standard services | sees only its own standard |
| Showcase over an index | OpenAIRE CONNECT | a shared index, configuring selection rules | content no richer than the shared index |
| By content | Auctus | downloading and parsing files | small coverage |

## Standards

A search engine has almost no standards of its own: it reads what the source serves to machines. So its standards are the sources' standards:

- **schema.org/Dataset** on the dataset page: this is what Google Dataset Search reads. Without markup the dataset does not exist for it.
- **DCAT and its profiles**: this is how the pan-European and national portals harvest each other, and how independent search engines harvest open data portals.
- **OAI-PMH** following the OpenAIRE guidelines and **the DataCite schema**: this is how research aggregators harvest repositories and DOI records.
- **CSW**: this is how layer catalogs of geoportals are harvested.
- **STAC**: this is how imagery catalogs are listed and linked.
- **FAIR Data Point**: this is how research catalogs publish descriptions in RDF and register in a shared index.

Then the descriptions are normalised, deduplicated and ranked. How such a chain works is covered in the chapter ["Federation and Harvesting"](../07-publishing/03-federation-and-harvesting.md#harvesting-protocols).

There is no common standard for search results: each search engine has its own API, open for some (DataCite, OpenAIRE, data.europa.eu), paid for others (GeoSeer) or key-based (Dateno), and Google Dataset Search has none at all.

The obligations of the parties are simple. A source should provide a stable export address and state the licence for each dataset. A search engine should not show a description whose original page no longer opens, or at least should mark it.

## Platforms

| Platform | What it is | Search engines in the registry | API |
|-----------|---------|----------------------:|-----|
| OpenAIRE CONNECT | cloud service for community showcases on top of the OpenAIRE graph | 50 | the shared OpenAIRE API |
| Custom build | Google Dataset Search, GeoSeer, find.data.gov.scot, STAC Index and others | 35 | for 20% |
| VIVO | open-source researcher profile system, BSD-3-Clause licence | 28 | for 25% |
| Idra | open-source platform for federating open data portals, AGPL-3.0 licence | 6 | all six are inactive instances |
| FAIR Data Point | indexes of FAIR Data Points | 2 | for both |

One search engine each runs on DataLad (an index of datasets stored in Git repositories managed by DataLad) and on the software of the European geophysical infrastructure EPOS.

**Idra** is the closest to a "ready-made search engine". It is open-source software from the FIWARE catalog: it federates portals on CKAN, DKAN and Socrata and Orion data brokers, accepts DCAT-AP exports, can parse pages of portals without an API, normalises descriptions to DCAT-AP and serves them through a REST API and SPARQL. Release 4.0.0 came out in March 2025, and changes were made to the code as recently as October 2026. But the registry has not a single active installation: all six are demo instances of developers and of projects that have closed. When choosing Idra, it is worth finding a live installation at a similar organisation first.

**A portal platform with harvesting.** A national or regional aggregator is more often built on a portal platform that can harvest other catalogs:

| Platform | Harvesting other catalogs | What else is needed |
|-----------|----------------------|---------------|
| Piveau | in the core: harvesting and quality checking of DCAT descriptions are the basis of the platform; data.europa.eu runs on it | — |
| CKAN | through extensions: the ckanext-harvest framework, RDF harvesting in ckanext-dcat, CSW harvesting in ckanext-spatial | harvesters for other protocols are separate extensions or custom work |
| Idra | in the core: CKAN, DKAN, Socrata, DCAT-AP exports, page parsing | your own check that the project is alive |

B2FIND, for example, runs on CKAN, on the old 2.9.8 branch that no longer gets updates, with its own harvesting extension. The registry records such a website as an open data portal, although in substance it is an aggregator. Details on extensions are in the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md).

**A custom build** means harvesters plus a search engine such as Elasticsearch, OpenSearch or Solr. Almost all large search engines are built this way. There is no ready-made software that harvests CKAN, DSpace, GeoNetwork and ArcGIS out of the box, so a large general search engine is always a custom build.

## Examples

**General**

- [Google Dataset Search](https://datasetsearch.research.google.com): searches schema.org markup on any websites.
- [Dateno](https://dateno.io): a harvester of open data portals, geoportals, research repositories and statistics, 22 million datasets; API with a key.

**Research**

- [OpenAIRE Explore](https://explore.openaire.eu): research outputs from Europe and the world, including 108 million records about datasets.
- [DataCite Commons](https://commons.datacite.org): all records with DataCite DOIs, including datasets.
- [B2FIND](https://b2find.eudat.eu): European research repositories, runs on CKAN.

**Sector**

- [NIAID Discovery Portal](https://data.niaid.nih.gov): biomedicine.
- [OmicsDI](https://www.omicsdi.org): genomics, proteomics and similar data.
- [DataONE](https://search.dataone.org): Earth and environmental sciences.
- [Earthdata Search](https://search.earthdata.nasa.gov): NASA Earth observation data.
- [Transitland](https://www.transit.land): public transport schedules.

**National and regional**

- [find.data.gov.scot](https://find.data.gov.scot): Scotland.
- [Research Data Australia](https://researchdata.edu.au): Australian research data.
- [data.europa.eu](https://data.europa.eu): national portals of European countries; formally an open data portal, in practice an aggregator of aggregators.

**Geodata**

- [GeoSeer](https://www.geoseer.net): layers of WMS, WFS, WCS and WMTS geoservices.
- [STAC Index](https://stacindex.org/catalogs): catalogs of imagery and other spatial files.

**By content**

- [Auctus](https://auctus.vida-nyu.org): searches by columns and values inside files.

## How to evaluate a search engine

The number of datasets on the home page says little. A search engine into which two or three large research aggregators have been loaded gets tens of millions of records and remains a search engine for research data. It is more useful to check five things.

1. **Variety of data.** Do government open data, geodata, research datasets, statistics and machine learning data turn up side by side? If almost everything is of one type, it is a sector search, even if it calls itself general.
2. **Country coverage.** Does anything turn up for a small country, not only for the US and Western Europe? A simple check is a query with the name of a small state in its own language.
3. **Sources.** How many catalogs have been harvested, and is their list published? If the list is closed, you cannot tell what is missing from the search.
4. **Links to files.** Does a card lead to the file itself or an API, or only to the dataset page at the source, or does it merely report that the dataset exists?
5. **Filters.** Can the results be narrowed by country, source type, format, licence, theme? There is almost nothing to rank datasets by links, so without filters long result lists are useless.

These criteria pull in different directions: chasing the number of records is easier than chasing variety and links to files. A good search engine shows honestly what it has bet on.

## How much is in the large indexes

The figures below cannot be compared directly: each index counts its own thing as a "dataset". They show the order of magnitude and what these magnitudes are made of.

| Index | What it collects | "Dataset" records | Date | Caveat |
|--------|--------------|------------------:|------|----------|
| Google Dataset Search | pages with schema.org markup | more than 45 million from 13,000 websites | February 2023, according to Google | no newer official figure |
| DataCite | datasets with a DOI | 76.4 million | 12 October 2026 | 42.8 million from a single Japanese fusion science institute; a link to the content is given for about 12,000 records |
| OpenAIRE Graph | research outputs, including data | 108 million | 12 October 2026 | the link leads to the dataset page at the source, not to a file |
| BASE | research repositories via OAI-PMH | 25 million, of which 22 million from DataCite | November 2024, from a post by I. Begtin | in October 2026 the website is closed to programs with a robot check, rechecking was not possible |
| Dateno | open data portals, geoportals, research repositories, statistics | 22 million from 5,200 sources | 12 October 2026, from the home page counter | in November 2024 there were 19 million from more than 5,000 catalogs |
| NIAID Discovery Portal | biomedical repositories | 14.2 million | 12 October 2026 | 62% of records from a single database, NCBI GEO |
| OmicsDI | genomics, proteomics and similar research databases | 4.9 million from 29 databases | 12 October 2026 | some of these databases are also harvested by NIAID |
| GeoSeer | layers of WMS, WFS, WCS, WMTS geoservices | 3.5 million from 4,200 servers | 12 October 2026 | sees only services of these standards |
| B2FIND | European research repositories | 1.47 million | 12 October 2026 | — |
| DataONE | Earth and environmental science repositories | 1.08 million | 12 October 2026 | excluding superseded versions; with all versions 1.64 million |
| Earthdata (CMR) | Earth observation data of NASA and partners | 45,000 collections | 12 October 2026 | a collection is a series of products, not a file |

Three caveats matter more than the numbers themselves. The first is granularity: more than half of DataCite's "datasets" came from one institute that assigns a DOI to every experiment, while NASA, on the contrary, counts a whole series of files as one collection. Why the "number of datasets" field differs by orders of magnitude between catalogs is covered in the chapter [The World of Catalogs in Numbers](../01-basics/04-catalogs-in-numbers.md). The second is duplication: some indexes harvest others, so 22 of BASE's 25 million records are DataCite. The third is links to files. Research indexes collect descriptions via OAI-PMH and from DataCite, which usually have no list of files. Of 76.4 million DataCite records of type "dataset", only about 12,000 have a link to the content (the `contentUrl` field). The card reports that the dataset exists, but it cannot be downloaded from the search.

## Searching for geodata

Google Dataset Search hardly sees geodata: most geoportals do not serve schema.org markup. That is why there are separate tools for them, and each has its own blind spot.

[GeoSeer](https://www.geoseer.net/) crawls servers of standard geoservices. In October 2026 it held 3.5 million layers from 4,200 servers in 97 countries, most of them in the German domain zone. Search on the website is free, the API is paid. The list of sources is not published, and according to a 2024 observation there are no filters by country or theme. The main limitation is that GeoSeer sees only WMS, WFS, WCS and WMTS services. A layer published on an open data portal as a file or served via ArcGIS REST does not exist for it. ArcGIS Hub search, conversely, sees only sites on Esri's cloud platform.

Such services are also short-lived. The Finnish company Spatineo ran the open Spatineo Directory: in 2023 it had more than 87,000 geoservice addresses, almost all from Europe and North America. By October 2026 the directory had closed, replaced by a paid search for ArcGIS Pro. How geodata is searched for inside the geoportals themselves is covered in the chapter [on geoportals](./03-geoportals.md).

## Where it breaks

**An outdated copy.** The search engine took a description a year ago, the source has since moved or removed the dataset, but the card in the search remains and leads to a dead link.

**Triple counting.** One dataset ends up in the search three times: from a municipal, a regional and a national portal. The aggregator looks richer than its sources and at the same time inflates the number of datasets.

**An aggregator harvests an aggregator.** It is easier for a search engine to connect one large aggregator than a hundred of its sources. But then it gets secondary copies with fields already lost, and duplicates: 22 of BASE's 25 million records came from DataCite. Statistics aggregators face a similar choice: take a series from the national statistical office or from the World Bank, which has already republished it. The rule is simple: harvest the original source, and connect an aggregator only for sources you cannot reach yourself.

**Someone else's copy instead of the source.** In the Dateno index in 2024, 244,000 datasets were attributed to Russia, 195,000 of them from the geoportal of one research centre. This turned out to be a clone of dataset descriptions of the US weather service NOAA, not Russian data. An aggregator needs a source registry with manual checking, otherwise one such website distorts all the statistics for a country.

**Search by description only.** Neither Google Dataset Search nor DataCite Search can find a dataset that has a column with an organisation code or coordinates: they do not index fields and values inside files. Auctus shows that this is possible, but so far on tens of thousands of datasets, not millions.

**Markup is taken at its word.** Everything Google Dataset Search knows about a dataset was written by the owner of the page, including the "free to access" flag. The search engine cannot check it. schema.org/Dataset markup is also added by data vendors for promotion, and their cards are mixed with open datasets. In November 2024 a query about the population of Andorra, even with the "free" filter, returned paid statistics services first, with UN data somewhere below. The same query in Spanish returned nothing, although data on Andorra exists on statistical and geoportals that do not add markup.

**Nothing to rank by.** Ranking datasets by links, like web pages, hardly works: datasets are rarely linked to. That is why data search relies on filters (country, catalog type, format, licence, theme), and the quality of filters depends on how carefully the sources filled in their descriptions.

**Search engines close down.** Harvesting has to be maintained for years: sources move, change platforms and APIs. Spatineo Directory has closed, all six Idra installations in the registry are inactive, the DANS EASY search closed together with the archive in December 2024, and BASE has closed itself to programs with a robot check. If your work relies on a search engine, keep a link to the original source, not to the search engine's card.

In the rough trust score that the registry calculates, search engines get a lower score: they do not store data and are not responsible for the source's licence. This is not a verdict but a reminder not to confuse search with the original source. More in the chapter [on methodologies](../10-quality/03-methodologies-and-indices.md).

## How to find data through search engines

Start not with the largest search engine but with the one that knows your type of data.

| What you are looking for | Where to look first |
|-----------|--------------------|
| Government data | the country's national portal, in Europe data.europa.eu; then Dateno |
| Statistics | the statistical office website and its indicator catalog, DBnomics; then Dateno |
| Geodata | the national geoportal, GeoSeer, Dateno, ArcGIS search; for imagery, STAC Index |
| Research data | DataCite Commons, OpenAIRE Explore, a sector aggregator (NIAID, OmicsDI, DataONE, Earthdata) |
| Data from any websites, including commercial | Google Dataset Search |
| A dataset that complements your table | Auctus |

A few habits save time:

- **Write the query in the country's language and in the source's words.** Spain's statistical office calls population "población", not "population". Andorra showed in November 2024 that the same search engine finds different things in different languages.
- **Narrow with filters rather than scrolling.** Country, format, licence and source type cut out more noise than refining the words in the query.
- **Check at the source.** Look at the licence, update date and the file itself on the publisher's dataset page: the search engine may have taken the description long ago and with losses. Cite the source too, not the search engine's card.
- **Do not trust empty results.** If nothing was found, go directly to the portal or indicator catalog of the country you need. Many geoportals and statistical websites are not in any general search engine.

Several search engines have an open API, and you can check what each of them knows about a topic with one command. The responses were checked on 12 October 2026:

```bash
# DataCite: DOI records of type "dataset", the count is in meta.total
curl -s -g "https://api.datacite.org/dois?query=Andorra&resource-type-id=dataset&page[size]=1"
# OpenAIRE Graph: datasets, the count is in header.numFound
curl -s "https://api.openaire.eu/graph/v1/researchProducts?type=dataset&search=Andorra&pageSize=1"
# data.europa.eu: datasets of European portals, the count is in result.count
curl -s "https://data.europa.eu/api/hub/search/search?q=Andorra&filter=dataset&limit=1"
# NIAID Discovery Portal: biomedicine, the count is in total
curl -s "https://api.data.niaid.nih.gov/v1/query?q=Andorra&size=0"
# Earthdata (CMR): the number of collections is in the CMR-Hits header
curl -sI "https://cmr.earthdata.nasa.gov/search/collections.json?keyword=Andorra"
# Auctus: search by columns and values inside files
curl -s -X POST "https://auctus.vida-nyu.org/api/v1/search" \
  -H 'Content-Type: application/json' -d '{"keywords": ["Andorra"]}'
```

For this query DataCite found about 9,500 datasets, OpenAIRE about 9,200, data.europa.eu 585, NIAID 101, Earthdata 60 collections. The numbers say not where there is more data about Andorra, but how each search engine searches: research indexes find the word in the description of any dataset where the country is mentioned even in passing, while data.europa.eu sees only European portals.

For search engines to find your own catalog, you need a description export, markup and registration in relevant registries. This is covered in the chapter [on discoverability](../07-publishing/05-discoverability.md#aggregators-and-registries), and for publishing without a portal in the chapter ["Making a Publication Findable"](../08-beyond-portals/05-making-it-findable.md).

## When you need your own search engine, and when you do not

An organisation almost never needs its own "worldwide" dataset search engine: such services already exist, and even they struggle to maintain coverage. One of the cheaper options is usually enough:

- **get into existing search engines**: serve descriptions in DCAT or OAI-PMH, add schema.org markup, register in relevant registries;
- **set up a showcase over a shared index**: for a research community or university alliance whose outputs are already in OpenAIRE, an OpenAIRE CONNECT showcase is enough;
- **collect datasets on a portal platform with harvesting**: for a region or country where sources already run on CKAN and other standard platforms.

A search engine of your own is justified in two cases. The first is a sector one: general search engines do not know the sector's description schemas and do not provide the needed filters, and the sector has a client ready to pay for years, as with NIAID or DataONE. The second is a national one, when data is already scattered across a hundred websites and cannot quickly be brought into one portal, as in Scotland. In both cases three questions are worth answering before starting: who keeps the source registry, who fixes the harvesters when sources change platform, and what will happen to the card addresses if the project closes. How to record such a decision with a justification is in the chapter ["Justifying a Decision"](../06-choice/04-justifying-decisions.md).

## How it differs from its neighbours

| Neighbour | Main difference |
|-------|-----------------|
| Open data portal | publishes its own datasets and is responsible for them. If a portal both accepts publications and harvests other catalogs, like data.gouv.fr, it is a hybrid |
| Research repository | stores files and assigns DOIs to them. A search engine stores nothing and issues no DOIs |
| Metadata catalog | describes catalogs, structures and code lists. A catalog of catalogs such as re3data answers the question "where to look", a search engine "what exists" |
| Geoportal | shows layers on a map and serves services. GeoSeer searches across layers but keeps no services itself |
| Indicator catalog | stores the series themselves and their methodology. A statistics aggregator such as DBnomics is closer to an indicator catalog, because it copies series, not just descriptions |
| A copy of someone else's cards | republishes descriptions without a link to the source and without a harvest date. This is not an aggregator but a copy |

A summary table of all types is in the chapter [Comparing Types and Hybrids](./11-comparison-and-hybrids.md).

## Sources

- dataportals-registry export, release 1.27.0 of 15 October 2026: owners, territories, platforms and share with an API of search engines, the list of records, and large search engines recorded as other types. The queries are in the [appendix](../12-appendices/02-using-the-registry.md#search-engines-and-aggregators).
- [Dataset markup in Google's documentation](https://developers.google.com/search/docs/appearance/structured-data/dataset), [OpenAIRE guidelines](https://guidelines.openaire.eu/), [STAC](https://stacspec.org/), [FAIR Data Point](https://home.fairdatapoint.org/)
- [OpenAIRE CONNECT](https://connect.openaire.eu/about/what-is-connect.html): description of the community showcase service; [OpenAIRE Graph API](https://graph.openaire.eu/docs/apis/graph-api/): the query `researchProducts?type=dataset`, 12 October 2026
- [VIVO](https://vivoweb.org/) and [the VIVO repository](https://github.com/vivo-project/VIVO): BSD-3-Clause licence, release 1.15.1 of 25 June 2026
- [Idra](https://github.com/OPSILab/Idra): description of capabilities in the README, AGPL-3.0 licence, release 4.0.0 of 27 March 2025, latest changes 8 October 2026; [Piveau](https://doc.piveau.io/)
- [B2FIND](https://b2find.eudat.eu/): platform version from the [status_show response](https://b2find.eudat.eu/api/3/action/status_show) and number of records via the CKAN API, 12 October 2026
- [Dateno](https://dateno.io/): counters of datasets, sources and countries on the home page, 12 October 2026
- [NIAID Discovery Portal](https://data.niaid.nih.gov/): number of records and distribution by source via a query to the [portal API](https://api.data.niaid.nih.gov/v1/query?q=__all__&size=0&facets=includedInDataCatalog.name), sitemaps in [robots.txt](https://data.niaid.nih.gov/robots.txt), 12 October 2026
- [OmicsDI](https://www.omicsdi.org/): number of datasets via the [search API](https://www.omicsdi.org/ws/dataset/search?query=*:*&size=1) and the list of databases via the [databases API](https://www.omicsdi.org/ws/database/all), 12 October 2026
- [DataONE](https://search.dataone.org/): number of descriptions via the [search API](https://cn.dataone.org/cn/v2/query/solr/?q=formatType:METADATA+AND+-obsoletedBy:*&rows=0&wt=json) and the list of member repositories via the [node registry](https://cn.dataone.org/cn/v2/node), 12 October 2026
- [NASA Common Metadata Repository](https://cmr.earthdata.nasa.gov/search/): number of collections in the `CMR-Hits` response header, 12 October 2026
- [STAC Index](https://stacindex.org/): list of catalogs via the [API](https://stacindex.org/api/catalogs), 12 October 2026
- [Auctus](https://auctus.vida-nyu.org/): number of datasets by source via the [statistics API](https://auctus.vida-nyu.org/api/v1/statistics), [source code](https://github.com/VIDA-NYU/auctus), 12 October 2026
- [DBnomics](https://db.nomics.world/): number of sources and datasets via the [API](https://api.db.nomics.world/v22/providers), 12 October 2026
- [find.data.gov.scot](https://find.data.gov.scot/): counters on the home page and the [sitemap](https://find.data.gov.scot/sitemap.xml), 12 October 2026
- [DANS EASY](https://easy.dans.knaw.nl/): notice of closure on 2 December 2024 and transfer of datasets to DANS Data Stations, checked 12 October 2026
- [Datasets at your fingertips in Google Search](https://research.google/blog/datasets-at-your-fingertips-in-google-search/), Google Research blog, 28 February 2023: 45 million datasets from 13,000 websites
- [DataCite REST API](https://support.datacite.org/docs/api): queries to `api.datacite.org/dois` filtered by the "dataset" type, by publisher and by the presence of `contentUrl`, 12 October 2026
- [GeoSeer statistics](https://www.geoseer.net/stats/) and [API terms](https://www.geoseer.net/api.php), 12 October 2026
- API responses to the query "Andorra" in DataCite, OpenAIRE, data.europa.eu, NIAID and CMR, 12 October 2026
- I. Begtin, [Dataset search engines as global data discovery systems](https://begtin.substack.com/p/25) (in Russian), May 2022: search by description only
- I. Begtin, [Open data in the world, in facts and theses](https://begtin.substack.com/p/d4f) (in Russian), March 2023: data vendors in Google Dataset Search results
- I. Begtin, [Updates in Dateno](https://begtin.substack.com/p/dateno) (in Russian), November 2024: filters instead of link-based ranking; [Why data on Russia is so hard to find](https://begtin.substack.com/p/816) (in Russian), November 2024: the NOAA description clone
- I. Begtin, Telegram (in Russian): [criteria for a global dataset search engine](https://t.me/begtin/4978), 30 June 2023; [index coverage indicators](https://t.me/begtin/5530), 22 March 2024; [aggregator and search engine, using DataMed as an example](https://t.me/begtin/6033), 14 September 2024; [NIAID Discovery Portal](https://t.me/begtin/6224), 28 November 2024; [find.data.gov.scot](https://t.me/begtin/6146), 3 November 2024; [an overview of search engines with figures](https://t.me/begtin/6215), 25 November 2024; [DataCite Commons without links to files](https://t.me/begtin/6060), 25 September 2024; [GeoSeer](https://t.me/begtin/5926), 17 August 2024; [Spatineo Directory](https://t.me/begtin/5038), 30 July 2023; [the Andorra query in Google Dataset Search](https://t.me/begtin/6178), 16 November 2024; [Auctus and search by content](https://t.me/begtin/3922), 2 June 2022; [B2FIND](https://t.me/begtin/4146), 11 August 2022; [DBnomics and the choice between original and secondary sources](https://t.me/begtin/6195), 19 November 2024; [Dateno harvesters for different platforms](https://t.me/begtin/6316), 31 December 2024; [Research Data Australia](https://t.me/begtin/6941), 17 July 2025
- [Federation and Harvesting](../07-publishing/03-federation-and-harvesting.md)
