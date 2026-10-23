---
title: Open Data Portals
description: National, city and international dataset portals. Who runs them, how they are built, what they run on and where they break.
---

# Open Data Portals

An open data portal publishes the datasets of a public body, city or organisation so that anyone can take and use them. A dataset page holds a table, a file, a link to an API. There may be a map next to it, but the main product is the dataset, not the layer.

Three conditions together make data open:

- **machine-readable form**: a file or API that a program reads without manual retyping; CSV, not a scanned table in a PDF;
- **an open licence**: copying, modifying and using the data, including commercially, is allowed with one condition, attribution of the source;
- **access without requests**: no contract, registration or explanation of purpose.

If at least one is missing, it is not yet open data, even if a section of the site is called that. More on the difference in the chapter on geoportals, in the section [Publicly available but not open](./03-geoportals.md#publicly-available-but-not-open).

According to the dataportals-registry export (release 1.27.0 of 15 October 2026), there are about 6,000 open data portals, 14% of all catalogs. About 5,700 are active.

## Who builds them

Almost half of the portals are run by local government: cities, districts, communes.

| Owner | Portals | Share |
|----------|---------:|-----:|
| Local government | 2,862 | 48% |
| Central government | 1,105 | 19% |
| Regions | 818 | 14% |
| Universities and research organisations | 465 | 8% |
| Companies | 268 | 4% |
| Civil society organisations | 264 | 4% |
| International organisations | 127 | 2% |

A national government usually runs one common portal, sometimes alongside portals of individual agencies. Regions and cities run their own or a shared regional one. International organisations and non-profit projects do the same with their data. The Humanitarian Data Exchange is the open data portal of the UN Office for the Coordination of Humanitarian Affairs, even though its owner is not the government of a single country.

There may be no national portal at all. Turkey had none in 2023, and open data was published by cities: Istanbul, Izmir, Konya. According to registry release 1.27.0 there is still no common portal, only agency ones, such as those of the Ministry of Health and the election commission. In China almost every province has a portal, and at the national level a registration platform for public data resources has operated since 1 March 2025. It is a registry that connects data owners with those who want to use the data, including for a fee, not an open data portal: by August 2026 more than 300,000 resources, products and services were registered there.

### The number of portals is not a measure of openness

By number of portals in the registry the leaders are Russia (572), the United States (565), Spain (485), France (394), Italy (337), Thailand (311), Indonesia (295), Japan (280) and China (227). The list says not where there is more open data, but how publishing is organised locally. In Russia 421 portals out of 572 are the "Open data" section on standard municipal websites. In Italy 153 portals are showcases of one hosted service for communes, in Japan 143 are showcases of a shared catalog of prefectures and municipalities, in Thailand more than 160 are catalogs of agencies and provinces on one government build. Comparing countries by the number of portals is like comparing them by the number of websites. How such portals are built is covered in the following sections.

## What they publish

Budgets and procurement, registers of organisations and licences, transport and timetables, addresses, the state of the environment, election results, statistics. The lower the level of government, the shorter and simpler the list. In 2024 two standard open data pages of districts in the Kaluga region had two and seven datasets: registers of schools, kindergartens, libraries and sports organisations, the structure of the administration. Italian communes on the Municipium service publish dozens of datasets that the service itself exports from their record-keeping systems: families by street, births, marriages, foreigners by citizenship.

The content is set by mandatory lists: in the EU the regulation on high-value datasets, in the US the OPEN Government Data Act, in Russia Government Order No. 1187-r. Their content is covered in the chapter [What Catalogs Publish](../02-data/01-what-is-published.md#what-must-be-published). The lists show what the state considers the minimum, but not what users need.

EU national portals contain a lot of geodata. On 12 October 2026 the common European portal data.europa.eu showed 1.73 million datasets. The most common format among them is a WMS service (511,000 datasets), followed by WFS (363,000), with CSV only in third place (275,000). The largest source is the German spatial data infrastructure GDI-DE: 681,000 datasets. The boundary with a geoportal is blurred here: the national open data portal harvests layer catalogs and shows them next to tables. About 28,000 are marked as high-value datasets, 1.6% of the whole portal.

## How they are built

On the outside portals look alike: search, a list of datasets, a dataset page. Inside they are built differently, and the structure determines which features are needed. Five models are the most common.

### One platform for everyone

Agencies, cities, companies and civil society organisations publish on one site, each under its own organisation. The model is the French data.gouv.fr. On 12 October 2026 it had 74,400 datasets, 1,265 described APIs, 6,800 organisations and 81,700 registered users. The portal does more than accept publications: 507 configured harvesters collect descriptions from other catalogs. It rests on its community: 17,700 dataset discussions and about 6,000 reuses (apps, articles and studies that users themselves linked to datasets).

This model needs roles and organisations, moderation, discussions, accounts for external publishers and a section for reuses.

### Harvester

The portal stores almost nothing itself; it harvests descriptions from agency and regional catalogs and offers a common search over them. The US data.gov collects the `data.json` files published by federal agencies, as well as the catalogs of states, cities and universities: on 12 October 2026 it held 590,000 datasets. The European data.europa.eu harvests national portals. In 2022 the Indonesian national portal Satu Data harvested regional portals on CKAN; in the registry, 196 out of 295 Indonesian portals run on CKAN.

A harvester needs harvesting via DCAT and other protocols, strong search and a link to the original source on every dataset page. It hardly needs its own files. How harvesting chains work and where they break is covered in the chapter [Federation and Harvesting](../07-publishing/03-federation-and-harvesting.md).

### A standard portal for everyone

The state or a vendor hands out the same build to dozens or hundreds of public bodies. Each has its own showcase, but the software, the description fields and the export are the same. This is the answer to the main problem at the local level: a small town has no people to run its own portal.

- **Thailand.** The Government Data Catalog (GD Catalog) is a central catalog plus catalogs of agencies and provinces on `*.gdcatalog.go.th` subdomains, all on CKAN with a shared Thai extension. The registry lists 164 such catalogs. In October 2026 the central catalog showed about 25,000 datasets, 16,400 of them statistics.
- **Japan.** The BODIK ODCS service is run by the research institute ISIT in Fukuoka. Behind the showcases of prefectures and municipalities stands one shared CKAN, data.bodik.jp: in October 2026 it had 386 organisations and 18,500 datasets.
- **Italy.** Municipium is Maggioli's hosted platform for commune websites and apps, and the open data portal is part of it. Datasets are exported automatically from the commune's record-keeping systems, and the descriptions are passed in the Italian DCAT-AP_IT profile to the national portal dati.gov.it. In October 2026 the vendor's shared CKAN catalog contained 6,200 datasets from 193 organisations.
- **Argentina.** Andino is a CKAN build released by the country's government: it is packaged in Docker, easy to install and serves descriptions in the national metadata profile out of the box. The registry lists 49 portals on Andino.
- **Russia.** Gosweb is the state platform for government websites. The "Open data" section on it is a page of the site with a list of datasets, where each dataset is three CSV files: a passport, a structure and the data itself. This is what Russian methodological guidelines required. The section has no API and no DCAT export, and in the registry none of the 421 such portals has a programming interface marked.

The first four examples show that a standard portal works when it has shared storage or a shared metadata export, and datasets reach the higher level without manual work. The Russian variant gives identical pages but no shared catalog: you cannot use them to find the datasets of all municipalities at once.

### Database inside, exports outside

The data lives in a database or an information system, and the portal serves snapshots of it in several formats and through an API. Datasets update themselves when the database changes. Such portals cost more than "file dumps" but are more mature. Moscow's data.mos.ru works this way. So do the portals of Chinese provinces, with an emphasis on real-time APIs: in July 2025 the portal of Guangdong province offered more than 98,000 datasets and more than 6,700 APIs. But there were no open licences, and data was released only after registration and identity verification. By the three conditions at the start of the chapter, this is publicly available rather than open data. On 12 October 2026 the portal did not open from abroad.

This model needs APIs, automatic updating of datasets from record-keeping systems, and field documentation. Manual file upload is secondary for it.

### Curated collections

The portal stops being a warehouse of everything and shows selected, checked datasets. In March 2026 the British data.gov.uk rebuilt its home page: it now has thematic collections and guidance on working with data. The previous catalog remained as a separate section, and the service promised not to change it for now. In the summer of 2026 the home page was named the National Data Library. The service itself named the reason for the rebuild: more than a quarter of the links in the catalog led to an error, and many datasets had not been updated for years.

This model needs editorial work, link checking and quality indicators on datasets. It is the answer to the "dump" that a portal turns into when everyone publishes whatever they want and nobody cleans up.

### What follows from this

The models combine: data.gouv.fr is both a platform and a harvester, and the Italian standard portal has the national harvester dati.gov.it above it. But the main model determines the main features:

| Model | What you cannot do without | What you can skip |
|--------|----------------------|---------------------|
| One platform | roles and organisations, moderation, file storage | harvesting other catalogs at the start |
| Harvester | harvesting via DCAT, search, a link to the original source | your own file storage |
| Standard portal | a shared field schema, export upwards, centralised upgrades | a custom design for each showcase |
| Database and exports | APIs, automatic updates, a data dictionary | manual upload |
| Curated collections | editorial work, link checking, quality indicators | open publisher registration |

How to get from these features to a platform is covered in the chapters [Selecting Features](../06-choice/02-feature-selection.md) and [From Features to a Platform](../06-choice/03-from-features-to-platform.md).

## Standards

**Descriptions** are served in DCAT. In the EU this is the DCAT-AP profile (the current recommendation is 3.0.1 of 27 October 2025) and national refinements of it, such as the Italian DCAT-AP_IT. For high-value datasets there is a separate DCAT-AP HVD profile (release 3.0.0, October 2024). In the US, agencies publish a `data.json` file following the DCAT-US profile. The new version, DCAT-US 3.0, is built as a profile of W3C DCAT 3, so catalogs abroad understand it too. data.gov harvests the old version 1.1 during a transition period, and new catalogs are advised to use 3.0 from the start. In Russia, instead of DCAT, there is a passport defined by the methodological guidelines version 4.0; how it works is covered in the chapter [on metadata standards](../07-publishing/02-metadata-standards.md). Search engines also need schema.org markup on the dataset page. More in the chapter [on metadata export](../04-features/02-metadata-export.md).

**Programmatic access** is specific to each platform: the Action API in CKAN, the udata API, the Explore API in OpenDataSoft, SODA in Socrata. There is no single standard for searching datasets, so a higher-level portal harvests descriptions via DCAT rather than through each platform's API. For high-value datasets in the EU an API is mandatory, and bulk download where appropriate. How to check them on a live site is covered in the chapter [on APIs and bulk download](../04-features/04-access-interfaces.md).

**Licences** are CC BY 4.0, ODbL or national open licences such as the British Open Government Licence and the French Licence Ouverte. Russian portals publish "standard terms of use for publicly available information": in substance they allow free use, but international catalogs do not know this text, and software does not recognise it as an open licence. The licence must be on every dataset, not one line in the site footer. More in the chapter [on licences and access](../07-publishing/04-licenses-and-access.md).

## Platforms

| Platform | Portals in the registry | What it is | DCAT and API |
|-----------|-------------------:|---------|------------|
| CKAN | 1,906 | open-source platform | API in the core, DCAT via the ckanext-dcat extension |
| Custom build | 1,144 | — | API in only 19%, DCAT rarely |
| OpenDataSoft (Huwise since 2025) | 454 | hosted service | in the service |
| Gosweb | 421 | the Russian state platform for government websites | a CSV list on a page, no API |
| Socrata (Tyler Data & Insights) | 245 | hosted service | in the service |
| DKAN | 161 | open-source platform on Drupal | in the core |
| Municipium | 153 | Maggioli's hosted platform for Italian communes | DCAT-AP_IT for the national portal |
| BODIK ODCS | 143 | a service for Japanese municipalities | the API of the shared CKAN |
| Liferay | 117 | content management system, almost all in Spain | as configured |
| EntryScape | 99 | commercial platform built on DCAT, mostly Sweden | in the core |

Less common are Andino (49), JKAN (48), Datasette (44), Data Fair (32, mostly France), Piveau (19) and udata (15, data.gouv.fr runs on it). ArcGIS Hub is recorded as an open data portal in the registry only 19 times: it is much more often classed as a geoportal. It is a hybrid, covered in the chapter [on comparison](./11-comparison-and-hybrids.md). Profiles of the main platforms are in the part [Platforms and Extensions](../05-platforms/04-platform-profiles.md).

National and city portals choose differently. Among central government portals the leaders are CKAN (420) and custom builds (365), and there are few hosted services. Local government also puts CKAN first (707), but next to it are Gosweb (421), custom builds (307), OpenDataSoft (216), Municipium (153), Socrata (144) and BODIK (127). At the local level the platform is more often chosen not by the city itself but by the state, the region or a vendor that already serves the neighbours. Just as with geoportals, global platforms lead in the overall count, while within a country municipalities are split among one or two local vendors.

Open-source platforms and hosted services almost always provide an API: in the registry it is marked for 95% of CKAN portals and 98–100% on OpenDataSoft and Socrata. For custom builds only 19%. This is the main argument against a home-grown portal: the interface that a ready-made platform gives out of the box has to be commissioned separately for a custom build, and it is often forgotten.

## Examples

**National portals**

- [data.gouv.fr](https://www.data.gouv.fr): France, its own open-source platform udata. The model of a platform with a community: agencies, cities, companies and civic projects publish, and datasets have discussions and reuses.
- [data.gov](https://catalog.data.gov): United States, a harvester. It ran on CKAN from 2013 (the launch of data.gov 2.0), and in April 2026 moved to a custom build: the harvester writes to a shared database, and the front end only reads it. Dataset page addresses were preserved. The old CKAN Action API at its previous address returns an error, and the new interface is described in OpenAPI. The old catalog was temporarily kept at catalog-old.data.gov, but on 12 October 2026 that address no longer opened. An example that even a CKAN flagship can leave the platform, and that the API other people's programs relied on changes along with the platform.
- [data.gov.uk](https://www.data.gov.uk): United Kingdom. Since March 2026 the home page shows curated collections, since the summer of 2026 it has been called the National Data Library, and the previous catalog still works. An example of moving from a warehouse to curated collections.
- [data.gov.au](https://data.gov.au): Australia, CKAN. From 2019 search and the front end were provided by the Australian platform Magda on top of an outdated CKAN. In June 2025 the portal was moved entirely to CKAN (2.11.6 as of October 2026), and the pages to Drupal. Most datasets there come from the national geological survey.
- [open.canada.ca](https://open.canada.ca/data/): Canada, CKAN, 48,000 datasets in October 2026.

**Standard and local portals**

- [GD Catalog](https://gdcatalog.go.th): Thailand, a central catalog and catalogs of agencies and provinces on one CKAN build.
- [BODIK ODCS](https://www.bodik.jp/project/odcs/): Japan, municipal showcases on top of the shared CKAN data.bodik.jp.
- [Istanbul Open Data Portal](https://data.ibb.gov.tr): CKAN. A city publishing data in a country without a national portal: 286 datasets in 2023, 558 in October 2026.

**International**

- [Humanitarian Data Exchange](https://data.humdata.org): CKAN 2.11.4 with the ckanext-dcat extension, 28,000 datasets in October 2026. UN agencies, governments and civil society organisations publish there.

**Russia**

- [data.mos.ru](https://data.mos.ru): Moscow's own platform and an example of the "database inside, exports outside" model. One of the few live Russian portals, but it lives on inertia: in early 2022 there had been no new datasets since 2020, although some registers were updated daily. In March 2026 the portal was closed for about two weeks for "technical works" without explanation.
- data.gov.ru: the national portal. In 2023 it was closed "for migration to a new platform" and reopened in the summer of 2025 without the previous data. What was on it before and after is covered in the chapters [on self-audit](../10-quality/04-self-audit.md) and [on archiving](../09-practices/04-archiving.md).

## Where it breaks

**A showcase for a deadline.** The portal is launched for a date or a report and then not updated. From the outside it looks alive: the home page opens, search works, but the datasets have been the same for years. The signs of such a portal are in the chapter [on metrics](../10-quality/02-metrics.md#signs-of-life).

**Links instead of files.** A dataset page leads to a file on the agency's website, and a year later the file is gone. On data.gov.uk by 2026 more than a quarter of the links led to an error, and this became the reason for the rebuild. The argument for "upload, don't link" is in the chapter [on data storage](../04-features/05-data-storage.md).

**A counter instead of data.** If a portal is given the target "publish N datasets", one series is cut into dozens of files by year and district, and five-row tables count towards it. The number of datasets grows, the data does not. See the anti-pattern [Splitting to inflate the counter](../09-practices/02-anti-patterns.md#fragmentation-to-boost-the-count).

**A licence for the whole site.** The terms of use sit in the footer and are not stated on the dataset. The harvester takes a dataset page without a licence, and on the higher-level portal the dataset already looks closed.

**A home-grown list format.** To collect datasets from thousands of websites, people invent their own schema instead of DCAT. This happened with the Russian dataset lists: the country harvested them, but not a single foreign aggregator read them. More in the anti-pattern [A home-grown format instead of a standard](../09-practices/02-anti-patterns.md#a-home-grown-format-instead-of-a-standard).

**The door is closed.** Registration, identity verification, API limits or blocking requests from other countries. Each of these conditions knocks the portal out of search engines and aggregators. On 12 October 2026 data.gov.ru, the portals of Chinese provinces and standard municipal websites on Gosweb did not open from a foreign address. See the anti-pattern [The door is closed to programs](../09-practices/02-anti-patterns.md#the-door-is-closed-to-programs).

**A custom build without an API.** Only 19% of home-grown portals have a programming interface marked. A national or regional portal without a DCAT export cannot harvest the level below and will not itself get to the level above.

**Migration and closure.** About 4% of open data portals in the registry are no longer active, a higher share than among geoportals and research repositories. Portals move from platform to platform, and in the move addresses, APIs and archives are lost. Examples of migrations in both directions are in the chapter [on the lifecycle](../09-practices/03-lifecycle.md).

## How to check an open data portal

Five questions you can answer in a quarter of an hour without knowing what the portal is built on.

1. **Does the dataset have a licence?** Open three random dataset pages. The licence should be on each one, not only in the site footer.
2. **Are datasets updated?** Sort the list by modification date. If the freshest records are more than a year old, the portal lives on inertia.
3. **Can you download a file directly?** The link should lead to a file or an API, not to an agency page where you still have to find the file.
4. **Does the portal serve descriptions to programs?** Typical addresses:

```bash
# CKAN: platform version and list of extensions
curl -s "https://data.humdata.org/api/3/action/status_show"
# CKAN with ckanext-dcat: the catalog in DCAT
curl -sI "https://data.humdata.org/catalog.ttl"
# udata: portal summary
curl -s "https://www.data.gouv.fr/api/1/site/"
# OpenDataSoft: number of datasets
curl -s "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets?limit=0"
# US: an agency's data.json file in DCAT-US
curl -sI "https://www.energy.gov/data.json"
```

5. **Is the portal visible from above?** Find its organisation on the national portal or on the common European data.europa.eu. If its datasets are not there, or there are noticeably fewer, harvesting does not work.

A detailed list is in the [checklists](../12-appendices/04-checklists.md), and commands for other platforms are in the chapters [on metadata export](../04-features/02-metadata-export.md) and [on APIs](../04-features/04-access-interfaces.md).

## When you do not need your own portal

For a small town or an agency with a couple of dozen datasets, a portal of its own is often harmful: there is nobody to update it. It is better to publish on a regional or national portal, join a standard portal as Japanese and Italian municipalities do, or publish the datasets as a static catalog with a metadata file that the higher-level portal will harvest. Such a decision is worked through in the [municipality example](../06-choice/08-worked-examples.md#municipality-dont-set-up-your-own-portal), and ways of publishing without a portal are in the part [Publishing Without a Portal](../08-beyond-portals/01-when-portal-not-needed.md).

## How it differs from its neighbours

| Neighbour | Main difference |
|-------|-----------------|
| Geoportal | the main product is a layer and a service, not a dataset. If the site has nothing to show without WMS and WFS, it is a geoportal |
| Indicator catalog | files and tables are published, not series with breakdowns from which a selection is built |
| Research repository | regular updates matter more than an immutable version with a DOI that has been cited |
| Metadata catalog | the portal serves the data itself, not only descriptions or reference lists |
| Marketplace | data is given away free of charge and without a contract |
| An "Open data" section on a website | a portal has search, dataset pages and a metadata export; a section usually has only a list of files |

A summary table of all types is in the chapter [Comparing Types and Hybrids](./11-comparison-and-hybrids.md).

## Sources

- dataportals-registry export, release 1.27.0 of 15 October 2026: owners, countries and platforms of open data portals, including separately for central and local government, the share with an API and the share inactive. The queries are in the [appendix](../12-appendices/02-using-the-registry.md#open-data-portals).
- [CKAN: core and extensions](../05-platforms/03-ckan-and-extensions.md), [platform profiles](../05-platforms/04-platform-profiles.md)
- [Announcement of the new data.gov catalog](https://data.gov/blog/catalog-update/), 15 April 2026; [description of the catalog application](https://github.com/GSA/datagov-catalog) and its [API description](https://catalog.data.gov/openapi.json). Number of datasets, behaviour of old dataset addresses and the Action API, unavailability of catalog-old.data.gov: checked 12 October 2026.
- [DCAT-US 3.0](https://resources.data.gov/resources/dcat-us3/) and [migration from version 1.1](https://resources.data.gov/resources/dcat-us-3-migration/); [DCAT-AP releases](https://github.com/SEMICeu/DCAT-AP/releases), including DCAT-AP HVD 3.0.0
- GDS, [What's changing on data.gov.uk and why](https://dataingovernment.blog.gov.uk/2026/03/25/whats-changing-on-data-gov-uk-and-why/), 25 March 2026; the data.gov.uk home page in the Web Archive on [1 April 2026](https://web.archive.org/web/20260401002035/https://www.data.gov.uk/), not yet named National Data Library, and on [2 July 2026](https://web.archive.org/web/20260702152252/https://www.data.gov.uk/), already with that name
- data.gouv.fr: [portal summary via the API](https://www.data.gouv.fr/api/1/site/); data.europa.eu: [dataset search via the API](https://data.europa.eu/api/hub/search/search?limit=0&filter=dataset): formats, sources and the high-value dataset flag; [open.canada.ca](https://open.canada.ca/data/api/3/action/package_search?rows=0); [HDX](https://data.humdata.org/api/3/action/status_show); [Istanbul portal](https://data.ibb.gov.tr/api/3/action/package_search?rows=0); checked 12 October 2026
- Standard portals: [GD Catalog](https://gdcatalog.go.th) and the example of the [Chaiyaphum province catalog](https://chaiyaphum.gdcatalog.go.th/api/3/action/status_show); [BODIK ODCS](https://www.bodik.jp/project/odcs/) and [the shared CKAN data.bodik.jp](https://data.bodik.jp/api/3/action/package_search?rows=0); [Municipium](https://www.municipiumapp.it/), [the description of the Bussero commune portal on Municipium](https://opendata.comune.bussero.mi.it/it/page/informazioni) (in Italian; automatic export, DCAT-AP_IT, transfer to dati.gov.it) and [Maggioli's shared catalog](https://www.opendata.maggioli.cloud/dataset/); [Andino](https://github.com/datosgobar/portal-andino); checked 12 October 2026
- The "Open data" section on Gosweb: Web Archive snapshots of the pages of [Borovsky district](http://web.archive.org/web/20240914210508/https://borovsk-r40.gosweb.gosuslugi.ru/ofitsialno/statistika/otkrytye-dannye/), 14 September 2024, and [Kozelsky district](http://web.archive.org/web/20240812064028/https://kozelskij-r40.gosweb.gosuslugi.ru/ofitsialno/statistika/otkrytye-dannye/), 12 August 2024. From a foreign address on 12 October 2026 the sites did not open.
- China's national registration platform for public data resources: [launch announcement](https://www.gov.cn/lianbo/bumen/202503/content_7009412.htm) (in Chinese), 1 March 2025; [more than 300,000 registered resources](https://www.chinanews.com.cn/gn/2026/08-25/10683667.shtml) (in Chinese), 25 August 2026
- I. Begtin, Telegram (in Russian): [three functions of portals](https://t.me/begtin/4721), 27 March 2023; [data.mos.ru and portals with a database inside](https://t.me/begtin/3184), 25 October 2021; [data.mos.ru: "the inertia scenario"](https://t.me/begtin/3425), 17 January 2022; [data.mos.ru unavailable in 2026](https://t.me/begtin/7478), 5 March 2026; [data.gouv.fr](https://t.me/begtin/6563), 2 April 2025; [open data in Turkey](https://t.me/begtin/4597), 7 February 2023; [Chinese provincial portals](https://t.me/begtin/4826), 24 April 2023; [the Guangdong province portal](https://t.me/begtin/6987), 29 July 2025; [open data in the EU](https://t.me/begtin/6285), 18 December 2024; [on renaming data.gov.uk](https://t.me/begtin/7618), 5 June 2026; [on data.gov.au returning to CKAN](https://t.me/begtin/7229), 14 November 2025
- Link Digital, [moving data.gov.au to CKAN](https://linkdigital.com.au/case-studies/upgrading-a-national-oecd-government-open-data-portal-to-a-full-ckan-environment/); [Magda](https://magda.io/), which ran on data.gov.au from 2019 to June 2025. The CKAN version is from the `/data/api/3/action/status_show` response, October 2026
