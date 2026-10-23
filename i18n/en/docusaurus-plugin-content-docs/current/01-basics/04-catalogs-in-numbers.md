---
title: The World of Catalogs in Numbers
description: How many public data catalogs exist in the world, what types they are and what they run on.
---

# The World of Catalogs in Numbers

The figures below come from an export of the [dataportals-registry](https://github.com/datenoio/dataportals-registry) (release 1.27.0 of 15 October 2026). The registry describes catalogs, not the datasets inside them. The queries used to get the numbers are in the [appendix](../12-appendices/02-using-the-registry.md).

The main finding: there are more records of the "geoportal" type than of all other types combined, 24,752 against roughly 18,800. This number includes both catalogs where a layer is found by its description and servers that serve maps without such a catalog. The CKAN open data portal is the smaller part of this world.

## By type

| Catalog type | Catalogs | Share |
|--------------|----------:|-----:|
| Geoportal | 24,752 | 57% |
| Research data repository | 8,404 | 19% |
| Open data portal | 5,967 | 14% |
| Indicator catalog | 3,405 | 8% |
| Microdata catalog | 326 | under 1% |
| Metadata catalog | 172 | under 1% |
| Dataset search engine | 124 | under 1% |
| API catalog | 115 | under 1% |
| Dataset list | 107 | under 1% |
| ML catalog | 100 | under 1% |
| Data marketplace | 56 | under 1% |

A few dozen more records fall outside these types: generic research repositories and unsorted entries. They do not affect the conclusions.

## Who owns them

- Local government: about 40% (17,600). Of these, 14,400 are geoportals.
- Universities and research organisations: 22%.
- Central government: 14%, regional government: 12%.
- Businesses, non-profits, international organisations and communities: about 10% together.

The long tail is a municipal geoportal on a standard platform, not the national portal that reviews write about.

## What they run on

- Custom builds: 16% (7,000). Among geoportals only 4% are custom, among indicator catalogs 44%.
- ArcGIS Hub: about 3,500 geoportals; these are catalogs of layer descriptions. ArcGIS Server (about 4,700) and GeoServer (about 1,500) serve layers and are not metadata catalogs themselves. Together such servers account for about 6,100 records, almost the entire margin by which geoportals outnumber the other types. More in the chapter [on geoportals](../03-types/03-geoportals.md).
- CKAN: about 1,900 open data portals. The Polish e-mapa: 1,900 geoportals.
- Next by number of installations come DSpace, GeoNode, GeoNetwork, OpenDataSoft, Gosweb, WordPress, Drupal and Pure.

A municipality rarely chooses a platform on its own. Sometimes the state decides for it: the Russian Gosweb is the government's platform for public authority websites. More often the market decides. e-mapa is a product of the Polish company Geo-System, and more than half of the country's gminas use it. A town in Poland ends up on e-mapa not because it compared it with GeoNetwork, but because its neighbours did so and it makes connecting to the national registers easier. In most countries, municipal geoportals are shared among a few local GIS vendors rather than global platforms.

## Where there are more of them

The United States has the most records (about 8,000), followed by Poland, Germany, Italy, France, the Czech Republic, Canada, Japan, Spain, the United Kingdom and Russia. Another 1,800 catalogs are not tied to a single country.

The order of countries reflects both the density of portals and where the registry searched more thoroughly. It is not an openness ranking.

The number of catalogs in a country depends most on its income, then on its population and on how integrated it is into global science and the economy. The political regime matters less than one might expect: the Netherlands has hundreds of catalogs, Myanmar almost none, and China publishes a lot, especially research data and through provincial portals. The countries with almost no catalogs of their own are the poorest, small island states and those in crisis. Data about them still exists, but in the catalogs of international organisations rather than national ones. National portals keep appearing: in 2026, for example, Bhutan, Jordan, Oman, Monaco and Liechtenstein opened theirs.

## Machine access and live sites

- A programming interface is marked for 65% of catalogs and not marked for 34%.
- 868 catalogs do not open as working sites, 98 have been decommissioned.
- 613 catalogs are flagged as national: the official catalog of its type in the country, not just any ministry website.
- The "DOI" flag is set for 2,000 catalogs: 1,400 research repositories and almost 600 geoportals. The flag is set by platform: it means the software can issue DOIs, not that the catalog issues them. In practice only a handful of geoportals issue DOIs; see the chapter [on identifiers](../04-features/06-identifiers-and-doi.md#what-the-registry-shows).

The share without an interface is no small matter for a federation harvester or for a program that needs a single file with all descriptions. A search engine, however, can read the page if it has schema.org markup and a sitemap.

## What the numbers do not show

One record is one catalog, whatever its size. Hugging Face and the website of a small town weigh the same. The registry is uneven across countries and types: where the search went on longer, there are more records. Before citing a figure in a report, check it against a newer registry release.

The registry itself shows how much the number depends on search effort. In August 2026 it held about 14,400 catalogs, by early September 29,800, and by release 1.27.0 of 15 October 2026 more than 43,000. The world did not change in two months: catalogs began to be found by URL patterns in the Common Crawl web archive (an address with `/rest/services` almost always means an ArcGIS server, one with `/geoserver/` means GeoServer) and through internet device search engines such as Censys, and AI agents helped describe them. That is why the growth came mostly from geoportals, research repositories and regional catalogs that simply had not been seen before. Earlier totals (10,000 catalogs in 2024, 1,700 in 2023) say how many could be found, not how many existed.

The number of datasets inside catalogs is even harder: everything depends on what counts as a dataset. In the DataCite index, where DOIs for research data are registered, there were about 43 million "datasets" in the summer of 2025. Of these, 19.8 million were experiments of a single Japanese fusion research institute, each assigned its own DOI, and about 3.5 million more were individual species occurrences from GBIF, although GBIF itself holds about 115,000 datasets. By October 2026 DataCite had 76.4 million "datasets", 42.8 million of them from the same institute. In 2024 Mendeley Data showed 2.35 million datasets "from GBIF" against 91,000 real ones. ScienceBase, the research repository of the US Geological Survey, counts 18.7 million records, but most of them are slices of a few large databases by area. The same "number of datasets" field means things that differ by orders of magnitude from catalog to catalog. More on the unit of counting in the chapter [on units of publication](../02-data/02-formats-and-units.md#what-counts-as-a-dataset).

## Sources

- dataportals-registry export, [release 1.27.0](https://github.com/datenoio/dataportals-registry/releases/tag/v1.27.0) of 15 October 2026. The queries are in the [appendix](../12-appendices/02-using-the-registry.md).
- Geo-System, [summary of e-Gmina deployments in 2025](https://geo-system.blogspot.com/2025/12/podsumowanie-wdrozen-technologii-e.html) (in Polish): e-mapa is used by more than half of Poland's gminas.
- I. Begtin, [distribution of geoportals by country](https://t.me/begtin/7802), Telegram (in Russian), 27 September 2026: in most countries local GIS vendors lead.
- I. Begtin, Telegram (in Russian), on the growth of the registry: [the start of the registry, 1,700 records](https://t.me/begtin/4764), 10 April 2023; [10,000 catalogs](https://t.me/begtin/5967), 26 August 2024; [finding catalogs by URL patterns in Common Crawl](https://t.me/begtin/6725), 22 May 2025; [29,800 catalogs](https://t.me/begtin/7752), 3 September 2026
- I. Begtin, Telegram (in Russian), on counting datasets: [DataCite and the fusion research institute](https://t.me/begtin/6960), 21 July 2025; [Mendeley Data and GBIF](https://t.me/begtin/5337), 11 January 2024; [ScienceBase](https://t.me/begtin/6142), 1 November 2024; on the link between the number of catalogs and a country's income, [post](https://t.me/begtin/5576), 9 April 2024; on the new national portals of 2026, [post](https://t.me/begtin/7717), 16 August 2026
