---
title: Indicator Catalogs
description: Official statistics databases and indicator showcases. How series and breakdowns are organised, who runs them, what they run on, how to choose a platform and where they break.
---

# Indicator Catalogs

An indicator catalog serves statistical series and tables with breakdowns: time, territory, sex, industry. A person does not download "the 2019 file" but chooses a breakdown. A program must be able to do the same with a request.

This is how official statistics, macroeconomics, central bank data, health statistics and Sustainable Development Goal indicators are published. According to the dataportals-registry export (release 1.27.0 of 15 October 2026), there are about 3,400 such catalogs, 8% of all catalogs. Almost all are active: fewer than 1% are inactive.

The main conclusion of the chapter: an indicator catalog is useful when the data in it is primary and the website with charts is only one of the showcases. The whole database can be downloaded, each series has a persistent address, and reference lists are shared across all tables. A table builder in the browser without an API and export keeps the data on the website, even if the website looks modern.

## How an indicator is structured

An indicator catalog has a different unit than an open data portal. There the main thing is a file. Here it is a number with coordinates.

- **Indicator**: what is measured: population, an exchange rate, the unemployment rate.
- **Breakdown** (a dimension in the standards): what the data is divided by: year, region, sex, age, industry.
- **Code list**: the list of permitted values of a breakdown with codes: region codes, currency codes, codes of economic activities.
- **Value** (observation): one number at the intersection of breakdowns: the population of France on 1 January of a given year.
- **Time series**: values of one indicator for the same breakdowns, arranged in time.
- **Attributes**: notes on a value: unit of measure, "provisional data", "break in series due to a change of methodology".
- **Methodology** (reference metadata, an indicator passport): how the indicator is calculated, where the source data comes from, when the methodology changed.

All combinations of breakdowns together form a table that the standards call a cube. An indicator catalog is a search over cubes, a way to cut out the needed part and serve it to a person or a program.

What this looks like in practice can be seen with the US dollar to euro exchange rate on the European Central Bank's data portal. The series has the key `EXR.D.USD.EUR.SP00.A`, and each part of it is the value of one breakdown:

| Key part | Breakdown | Value |
|-------------|--------|----------|
| `EXR` | dataset | exchange rates |
| `D` | frequency | daily |
| `USD` | currency | US dollar |
| `EUR` | against which currency | euro |
| `SP00` | type of rate | ECB reference rate |
| `A` | series variation | standard value |

The same key also works as an address. On 12 October 2026 a request to the ECB API returns the latest value (1.1206 for 9 October) together with attributes: observation status, number of decimals, unit, full series title. Replace `USD` with `JPY` and you get the yen rate, without searching for a new file. All good indicator catalogs work this way: the address of a series is assembled from code list codes.

### What gets its own page

Three levels get their own page or address in an indicator catalog:

1. **A theme or database**: "Population", "Prices", "Balance of payments".
2. **A table** (a dataflow in SDMX): a cube with a fixed set of breakdowns. This is what is usually called a dataset.
3. **A series**: one line on a chart that can be cited.

That is why the number of "datasets" in indicator catalogs cannot be compared with open data portals. On 12 October 2026 Statistics Sweden had 2,814 tables, Statistics Norway 3,753, Statistics Canada 8,270 tables available via its API, while the ECB had only 108 datasets, but with millions of series inside them. One table replaces hundreds of files "by year and region" on an ordinary portal.

## Who builds them

Almost half of indicator catalogs are run by central government: statistical offices, central banks, ministries.

| Owner | Catalogs | Share |
|----------|----------:|-----:|
| Central government | 1,556 | 46% |
| Regions | 662 | 19% |
| International organisations | 367 | 11% |
| Local government | 273 | 8% |
| Civil society organisations | 250 | 7% |
| Companies | 140 | 4% |
| Universities and research organisations | 134 | 4% |

The picture is the reverse of open data portals, where almost half belong to municipalities. Statistics are calculated centrally, and a city has few series of its own.

- **National statistical offices and central banks** are the foundation of the type. Next to them are ministries with their own sector statistics, above all health ministries.
- **International organisations**: Eurostat, the OECD, the World Bank, the IMF, the Bank for International Settlements, UN agencies. They not only publish their own databases but also collect country series, so they need standards-based exchange.
- **Regions**: statistical offices of the German Länder, the Spanish autonomous communities, US states. About 43% of regional showcases in the registry are custom builds.
- **Local government**: mostly Dutch and Flemish municipalities: 131 of 273 local showcases run on one platform, Swing.
- **Civil society and research projects** bring other people's series into one search. This is how Our World in Data and DBnomics from the French research centre CEPREMAP work: in October 2026 DBnomics collected series from 94 sources, from statistical offices to central banks.

By country the leaders are the United States (333), the Netherlands (186), Germany (152), France (103) and Spain (82); another 373 catalogs cover the whole world. As with open data portals, the number speaks of organisation, not of the quality of statistics. In the Netherlands 167 catalogs are Swing showcases of cities and provinces. In the US 69 are county and hospital network health indicator sites on one cloud service. In France 38 are geostatistical observatories on the Géoclip platform.

## What they publish

Macroeconomics, demography, prices, the labour market, social statistics, finance, foreign trade. Separate layers are health statistics from health ministries, Sustainable Development Goal indicators and local indicators: neighbourhood population, employment, housing.

Statistics are published at one of three levels. At the first, they are documents: yearbooks and bulletins in PDF, from which a ten-year series is assembled by hand. At the second, tables: Excel on the website or a table builder that builds a table on request and lets you download it. At the third, the data is primary and the website with charts is one of the showcases: the whole database can be downloaded, each indicator has an address in the API, and reference lists are shared. An indicator catalog in the sense of this chapter begins at the second level, and it is really useful only at the third.

What an indicator catalog usually lacks: records of individual people and businesses (that is a microdata catalog), original questionnaires, territory geometry. Regional boundaries for a map have to be taken from a geoportal, and the codes in the indicator code list must match the codes of the layer, otherwise the series does not fit onto the map.

## Standards

**SDMX** is the main standard for exchanging statistics. It is maintained by seven international organisations: the Bank for International Settlements, the ECB, Eurostat, the IMF, the OECD, the UN and the World Bank. SDMX is not one format but three parts:

- **the model**: how to describe a cube: which breakdowns a table has, which code lists are attached to them, which attributes are permitted. These descriptions are called structures;
- **formats**: SDMX-ML (XML), SDMX-JSON and SDMX-CSV;
- **the API**: rules for addresses by which a program gets data and structures: the list of tables, code lists, a slice of a series.

Live services most often run on version 2.1: the ECB, Eurostat and IMF APIs use it. Version 3.0 came out in 2021, 3.1 in May 2025; 3.1 makes it possible to add breakdowns to a table without breaking data already collected. For common subjects there are global structures: national accounts, the balance of payments, the Sustainable Development Goals. If an office transmits data according to such a structure, an international organisation takes it without manual recoding. In the registry, SDMX addresses are marked for 177 indicator catalogs, about 5%.

**JSON-stat** is a lightweight cube format in JSON: values, breakdowns and labels in one response. Version 2.0 is the default format of the Eurostat API and the new PxWeb API. It is simpler than SDMX for a programmer, but it has no exchange of code lists and structures between organisations.

**PC-Axis (PX)** is a file format for tables with a built-in description, native to PxWeb. Many open data portals serve it too: in 2023 the Spanish datos.gob.es held more than 24,000 datasets in PX, and the Irish data.gov.ie more than 7,000.

**Methodology.** The description of an indicator (how it is calculated, the unit of measure, breaks in series) is stored separately from the numbers but next to them. Without it a series cannot be compared across years. In the European Statistical System methodology is described according to a common structure, SIMS; the IMF requires descriptions for data that countries publish under its dissemination standards.

**IMF standards.** Countries that have subscribed to the IMF data dissemination standards (e-GDDS, SDDS, SDDS Plus) publish a National Summary Data Page: a standard page with the main macroeconomic series, a release calendar and often SDMX files. The registry lists 118 such pages. This is not a catalog in the full sense but a mandatory minimum that shows what a country publishes and when.

**DCAT for statistics.** For a statistical office's tables to appear on an open data portal, their descriptions must be provided in DCAT. There is a profile for this, StatDCAT-AP: it adds breakdowns, attributes and a link to the SDMX structure to DCAT-AP. The current version is 1.0.1 (2019). Version 3.0.0 has been aligned with DCAT-AP 3.0.1 and since 10 June 2026 has remained a working draft. In practice, the registry found a DCAT export for fewer than ten indicator catalogs. That is why statistics are poorly visible on open data portals and in dataset search engines unless the office publishes them there separately.

**Linked data.** The W3C has the RDF Data Cube vocabulary (2014) for statistics as linked data. It is rarely used, mostly in research projects.

## Platforms

Custom-built showcases make up 44% (1,505), more than for any large type. Only 37% of indicator catalogs have programmatic access, worse than open data portals (69%), geoportals (70%) and research repositories (63%). Among custom builds an API is marked for only 8%.

| Platform | Catalogs in the registry | What it is | Programmatic access |
|-----------|--------------------:|---------|--------------------|
| Custom build | 1,505 | — | for 8% |
| Swing | 214 | ABF Research's commercial indicator platform for municipalities and provinces in the Netherlands and Flanders | marked for 91% |
| WordPress, Drupal | 134 and 131 | websites with indicator pages | the CMS API serves pages and posts, not series |
| Knoema | 125 | cloud service; mostly the African Open Data for Africa showcases | service shut down, see "Where it breaks" |
| IMF National Summary Data Page | 118 | standard page under the IMF standards | most often SDMX files |
| PxWeb | 110 | Statistics Sweden's open-source platform | own API, JSON-stat, CSV, PX |
| DHIS2 | 74 | the University of Oslo's open-source health statistics system | Web API in the core |
| OpenSDG | 72 | open-source static website for the Sustainable Development Goals | export of all indicators as files |
| Conduent HCI | 68 | cloud health indicator service for US counties and hospitals | no |
| Géoclip | 53 | commercial platform for geostatistical observatories, mainly in France | no |
| .Stat Suite | 40 | the SIS-CC community's open-source SDMX platform | SDMX API in the core |
| SDMX-RI | 36 | Eurostat's open-source SDMX components | SDMX API |
| Power BI, R Shiny, Tableau | 42, 39 and 29 | dashboards | almost none: 0–5% |

The type divides into three worlds. The first is specialised statistical software, where an API and export are available out of the box: PxWeb, .Stat Suite, SDMX-RI, DHIS2, OpenSDG. The second is cloud services for local and sector showcases: Swing, Géoclip, HCI, Knoema; convenient, but the data lives with the vendor. The third is CMS websites, dashboards and custom portals, where the indicator is on the screen but not available to a program.

### Reusable statistical software

There are few programs that many statistical offices install themselves.

- **PxWeb** was developed by Statistics Sweden; the offices of the Nordic countries and dozens of others, from Estonia to the Philippines, run it. The last release of the old line is 2025.v1 (February 2025). The next generation is two separate applications. Sweden built the PxWebApi 2 API together with Statistics Norway and launched it in October 2025 (release 2.7.0, September 2026). The new PxWeb 2 interface takes data from this API (release 2.12.0, 7 October 2026). The new API accepts queries right in the address and returns JSON-stat 2, CSV, PX, Excel and HTML, and in beta, Parquet; Statistics Sweden has not yet enabled Parquet. An important caveat: PxWeb has no full SDMX service. The old API can return a table as an SDMX-ML 2.0 file; in the new one SDMX is not among the formats at all. For exchange with international organisations PxWeb is usually supplemented with another tool.
- **.Stat Suite** is the open-source platform of the SIS-CC community, run by the OECD. It is built around SDMX and assembled from modules: the Data Explorer (release 27.7.0, July 2026), a tool for loading and maintaining data, and an SDMX service. It powers the OECD Data Explorer, the FAO, the ILO, and the statistical offices of Australia, New Zealand, Italy and Switzerland.
- **SDMX-RI** is a set of Eurostat components under the EUPL licence. The main one is a web service that takes data from a dissemination database and serves it via SDMX. The components can be embedded into your own system separately. .Stat Suite uses exactly this service: an office that installs .Stat Suite is in fact also installing SDMX-RI.
- **Fusion Metadata Registry** is a registry of SDMX structures: code lists, table descriptions and concepts. It is maintained by the Bank for International Settlements. The application is free under the BIS public licence, the accompanying tools are open under Apache 2.0, and release 12.4.2 came out on 19 September 2026. Eurostat's SDMX registry, for example, runs on it.

Next to them are sector-specific and niche products:

- **DHIS2** is the University of Oslo's system for collecting and analysing health statistics, release 2.43, May 2026. Health ministries in dozens of countries in Africa and Asia use it to collect hospital reports and calculate indicators. The registry lists 74 installations in 54 countries, mostly in Africa and Asia. It is above all a collection system; a public showcase is an add-on, and the owner of the installation decides which data is visible without login.
- **OpenSDG** is a static website of Sustainable Development Goal indicators, release 2.4.0, August 2025. A clear showcase and a full export as files, but not an exchange channel. More in the chapter [on static sites](../08-beyond-portals/02-static-sites.md).
- **PxStat** is the platform of Ireland's statistical office: each table is also a dataset with export in JSON-stat, PX, CSV and XLSX. It has hardly been reused elsewhere.

Everything else is the offices' own development, hence the 44% custom-built showcases.

### Core and add-ons

Indicator platforms have no extension ecosystem like CKAN's. Capabilities are either in the product or added with a neighbouring product.

| Capability | PxWeb | .Stat Suite | OpenSDG | DHIS2 |
|-------------|-------|-------------|---------|-------|
| API | core | core (SDMX) | no, files instead | core |
| SDMX | only an SDMX-ML 2.0 file in the old API | core | optional | not checked |
| JSON-stat | core | not checked | not checked | not checked |
| Bulk download | a whole table via the API within the limit | via the API | core | via the API |
| Structure registry | no | core; Fusion Metadata Registry can be connected | no | no |
| DCAT | no | not checked | not checked | not checked |
| Separate interface | the new PxWeb 2 interface is separate from the API | the Data Explorer is separate from the SDMX service | the site template is edited in Git | applications on top of the Web API |

Two practical conclusions follow from the table and the registry figures. The registry found a DCAT export for fewer than ten indicator catalogs, whatever platform they run on. For statistics to reach an open data portal and search engines, you will have to make the descriptions yourself or provide the tables to an open data portal through a separate channel, as the Central Bank of Brazil does. And the combination "PxWeb for people, .Stat Suite or SDMX-RI for exchange" is a normal setup, not redundancy.

## How to choose

The choice begins not with a product but with who takes the data. If only people, a showcase is enough. If programs and international organisations, you need an API, SDMX and bulk download.

| Situation | What to take | Why, and what it costs |
|----------|-----------|---------------------|
| The office publishes tables, SDMX exchange is not yet required of it | PxWeb, new installations straight on PxWebApi 2 | quick, API and JSON-stat in the core; SDMX will have to be added later |
| Exchange with Eurostat, the IMF, the OECD is needed | .Stat Suite or SDMX-RI, structures in Fusion Metadata Registry | SDMX in the core; implementation is heavy and rarely done without consultants |
| A clear Sustainable Development Goals showcase is needed | OpenSDG | static website and full export; weak as the only exchange channel |
| A ministry collects health statistics | DHIS2 | collection and publishing in one system; the public part must be configured separately |
| A city or region wants a showcase of its indicators | a local vendor such as Swing, or a section on a regional platform | quick and inexpensive; the data stays with the vendor, so agree on a full export in advance |
| Dozens of indicators, updated once a year | no portal: CSV or Parquet with a field dictionary on the website or in Git, plus transmission to the national office | cheap and durable; no slice builder |
| Charts for management are needed | a dashboard on top of the export, not instead of it | dashboards in the registry have almost no API |

A custom build is justified when the office already has a team and wants a showcase that ready-made products do not offer. Models are the portals of the ECB, Statistics Canada and Malaysia's OpenDOSM. But all three have their own website on top of an open API and bulk download, not instead of them. If the team is not ready to build and maintain an API, its own showcase will share the fate of the 1,505 custom catalogs, of which programs can read only 8%. The choice for a statistical office is worked through in the [worked example](../06-choice/08-worked-examples.md#statistical-office-indicators-and-microdata-are-different-catalogs), and the general logic is in the chapter ["Build, Open Source or SaaS"](../06-choice/05-build-or-buy.md).

### When you do not need your own catalog

An agency or a city with a few dozen indicators often does not need a separate catalog. It can transmit the series to the national statistical office, publish them on an open data portal as tables with a field dictionary, or publish CSV and Parquet in a Git repository with a description of the indicators. For such series to be found, each file needs a methodology, a unit of measure, territory codes from a shared code list and an update date. Ways to publish without a portal are in the part ["Publishing Without a Portal"](../08-beyond-portals/01-when-portal-not-needed.md).

## What makes an indicator catalog convenient

Six signs that statistics have been published as data rather than as a website with charts.

1. **Shared code lists.** Territories, industries and goods are coded with the same code lists for all indicators. Then any series can be read by one program. Eurostat has shared SDMX code lists for all datasets.
2. **Bulk download.** The whole database can be taken without clicking through each indicator. FAOSTAT provides an archive for each thematic database and a machine-readable list of archives. Eurostat publishes an inventory of all datasets with links to each file in TSV, CSV and SDMX. The ILO has a separate ILOSTAT bulk download page.
3. **Unified search.** One search finds both an indicator in the database and a table in a yearbook, and an archived publication.
4. **An ordinary open data portal as a channel.** Indicators are published as datasets on a standard platform with its API. The Central Bank of Brazil does this: its open data portal runs on CKAN.
5. **Several formats and code.** Not only Excel: CSV, SDMX, JSON-stat, Parquet, formats of statistical packages, an example request in Python or R right on the indicator page.
6. **Technical documentation.** An API description in OpenAPI, example requests, limits and licence stated explicitly. Documentation as web pages with examples, not a contractor's PDF report. Statistics Sweden's PxWebApi 2 serves its settings (a limit of 150,000 values per request, 30 requests per 10 seconds, the CC0 licence and the list of formats) at a separate address.

A catalog with only a table builder fails on points two, five and six, even if it looks modern.

## Examples

Good indicator portals are organised similarly: one database and several entrances for different people. An analyst needs a chart, a programmer an API, someone building their own database a full download, and an author of a paper a persistent link to a series.

**National offices and central banks**

- The [European Central Bank data portal](https://data.ecb.europa.eu) serves all these audiences at once. Each series has a chart and a persistent address such as `data.ecb.europa.eu/data/datasets/EXR/EXR.D.USD.EUR.SP00.A` that can be cited. For programs there is an API following the SDMX 2.1 standard, and each dataset can be downloaded whole. There were 108 datasets in 2024 as well; at that time together they took 93 GB in CSV and 664 MB after conversion to Parquet.
- The [BIS data portal](https://data.bis.org) is a model of working with SDMX. There is an API, a persistent link to a series and a bulk download section where each theme is downloaded as one archive in CSV or SDMX.
- [Statistics Canada](https://www150.statcan.gc.ca/n1/en/type/data) has turned the office website into a data catalog. In October 2026, 8,270 tables were available through its API, about 5,100 of them active and the rest archived. Each table can be downloaded whole in CSV or SDMX. Tables from the same database are attached to analytical texts.
- [Mexico's INEGI](https://www.inegi.org.mx) brings together everything about one survey on the tabs of a single page: documentation with the methodology and a description in the DDI standard, tables, microdata, open data and tools. There is an API for the indicator bank and a bulk download section by territory, theme and year.
- [Croatian Bureau of Statistics](https://podaci.dzs.hr/en) copes with fragmentation through a single catalog. A theme page lists in one place first releases, yearbooks, PC-Axis tables, short-term statistics databases and geostatistics layers whose metadata is kept in GeoNetwork. The user does not need to know which system holds the table they need.
- [OpenDOSM](https://open.dosm.gov.my) is the open-source portal of Malaysia's statistical office. Each dataset is in CSV and Parquet, the page has an example of reading it in Python, and there is an API for programs. The national portal data.gov.my runs on the same platform.
- [Statistics Sweden](https://www.statistikdatabasen.scb.se) and [Statistics Norway](https://www.ssb.no/en/statbank) have moved their databases to PxWebApi 2: a query to any table is assembled in the address, and the response is JSON-stat 2 by default.

**Platforms and international databases**

- [OECD Data Explorer](https://data-explorer.oecd.org): .Stat Suite.
- [Statbank Denmark](https://www.statbank.dk/): PxWeb.
- [Eurostat data browser](https://ec.europa.eu/eurostat/databrowser/): series with breakdowns, not files by year; API in SDMX and JSON-stat.

**Aggregators**

- [DBnomics](https://db.nomics.world): CEPREMAP's open-source series aggregator. It collects data from statistical offices, central banks and international organisations and serves it through an API and clients for Python, R, Julia and Stata. It is convenient when you need series from many countries in one form, but it is a secondary source: check against the original.
- [Our World in Data](https://ourworldindata.org): a showcase with its own platform, not national statistics.

The indicators and microdata of one office are two catalogs. Why they are not glued into one custom website is worked through in the [statistical office example](../06-choice/08-worked-examples.md).

## Where it breaks

**A table builder instead of data.** A table is available only through a builder: there is an export but no API. The indicator methodology lives in a PDF, not next to the series. The number of "datasets" is inflated by publishing one indicator as a separate file for each year.

**The export repeats the screen.** In the Russian EMISS (fedstat.ru) in 2022 an indicator opened in a "default view" (the last few years and several regions), and only this slice could be downloaded. To get the full series you had to tick all the breakdowns by hand.

**Everyone has their own code lists.** In the same EMISS there were almost 700 code lists for seven thousand indicators, and many of them duplicated each other. Eurostat at the same time had 283 code lists for 10,500 datasets. Without shared code lists, series from different agencies cannot be joined.

**Series stop.** In June 2025 a full download from EMISS managed to retrieve 6,905 indicators out of 8,773 declared, and 41.8% of them had not been updated since 2022. Some agencies' series stopped much earlier: the Rosselkhoznadzor's last update was in 2014. An independent count by the project "Esli byt tochnym" ("To Be Precise", August 2025) gave a similar picture: of 7,280 available indicators, about 3,700 were current and updated.

**The system is closed down.** In May 2025 it became known that by an order of the Ministry of Digital Development and Rosstat, EMISS was being decommissioned by 31 December 2025. At the time the text of the order was not on the agencies' websites or on the official publication portal. The replacement is the state system "Digital Analytical Platform", whose launch has been postponed several times since 2022; according to "To Be Precise", the transition has been postponed to January 2027. In November 2025 EMISS was still working: according to a web archive snapshot, 8,875 indicators from 61 agencies. In 2026 the website does not open from abroad, and its state cannot be checked from outside. The conclusion for a user: download a series you need for a long time in full and keep it yourself. How a public archive preserved EMISS is described in the chapter [on archiving](../09-practices/04-archiving.md).

**Publications are scattered.** Statistics of different levels may not come together in one place. The regional offices of Rosstat each have their own website with their own set of yearbooks, some of which are sold by subscription, and there is no single catalog of these publications (2024).

**The vendor leaves.** Knoema is a cloud indicator service on which the registry lists 125 showcases, mostly African: statistical offices, central banks and the Open Data for Africa platform. In 2020 the company was bought by the Eldridge holding; in 2023 it changed its name to Seek and turned towards analytics for retail. Since January 2026 knoema.com does not open: the last successful web archive snapshot is from 1 December 2025. In October 2026 the Open Data for Africa portals respond to programs with a Cloudflare check instead of data. For an office that keeps its statistics in a cloud service, this is the main risk: write a full export of the database and code lists in an open format into the contract in advance.

**The platform is not upgraded.** Reusable software helps only if it is upgraded. The Armenian Statbank (statbank.armstat.am) ran for a long time on an old version of PxWeb on ASP.NET: the standard API did not respond, and getting the data required writing a separate parser (November 2025). In October 2026 it runs the 2025 release of PxWeb, and the standard API responds. The upgrade returned the data to common tools without new development.

**The API generation changes.** The move to PxWebApi 2 changes request addresses: they have become more stable, but users' old scripts stop working. Statistics Sweden released a converter from old links to new ones. An office moving to the new generation should keep the old API until users have migrated and announce a date for switching it off.

**SDMX is hard to implement.** SDMX is needed for exchange with international organisations, but it is hard to implement. According to a 2026 estimate, there are only three server products under active adoption, and they are rarely installed without consultants. That is why outside national offices and international organisations SDMX is almost never seen, nor is the lighter JSON-stat. A small office would do well to start with bulk download in CSV or Parquet and a documented API, and add an SDMX endpoint with a ready-made product rather than writing one itself.

**A new portal loses the old.** In 2024 the IMF data portal provided datasets for bulk download. The new data.imf.org, opened in spring 2025, gained a dataset catalog, cross-cutting search, dashboards and a new SDMX API. But in April 2025 it was impossible to download everything at once, there was no machine-readable list of datasets, no schema.org or DCAT markup, you could not link to an individual series, and the API required registration. In October 2026 the IMF SDMX API responds without a key; the rest is worth checking again.

**A dashboard instead of data.** Power BI, Tableau and R Shiny account for about a hundred indicator showcases in the registry, and only a handful have programmatic access. The chart is visible, but the series behind it cannot be retrieved. More in the anti-pattern ["Dashboard instead of data"](../09-practices/02-anti-patterns.md#a-dashboard-instead-of-data).

## How to check an indicator catalog

Four steps for a quarter of an hour.

1. **Take one series and try to cite it.** Does the series have an address that will open with the same slice for another person?
2. **Download a whole table.** Does the file match the full table or only the slice shown on the screen?
3. **Find the API and its documentation.** Is registration needed, what are the limits, what is the licence of the data?
4. **Check the code lists.** Can the list of region codes be downloaded, and are the codes the same in two different tables?

Typical addresses for different platforms:

```bash
# SDMX REST, ECB: latest value of a series in CSV with attributes
curl -s "https://data-api.ecb.europa.eu/service/data/EXR/D.USD.EUR.SP00.A?lastNObservations=1&format=csvdata"
# SDMX REST: list of tables (dataflows) at the OECD, IMF and Eurostat
curl -s "https://sdmx.oecd.org/public/rest/dataflow/all"
curl -s "https://api.imf.org/external/sdmx/2.1/dataflow"
curl -s "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/dataflow/ESTAT/all/latest"
# Eurostat: a table slice in JSON-stat 2.0
curl -s "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/demo_pjan?geo=FR&sex=T&age=TOTAL&lastTimePeriod=1"
# PxWebApi 2: limits, formats and licence of the installation
curl -s "https://statistikdatabasen.scb.se/api/v2/config"
# PxWebApi 2: how many tables are in the database
curl -s "https://data.ssb.no/api/pxwebapi/v2/tables?lang=en&pageSize=1"
```

A response at an SDMX or PxWebApi address is a good sign. If there is no API but only a table builder, check whether there is an inventory for bulk download, as at Eurostat and FAOSTAT. The summary list is in the [checklists](../12-appendices/04-checklists.md#indicator-catalog), and general commands are in the chapter [on APIs and bulk download](../04-features/04-access-interfaces.md).

## How it differs from its neighbours

| Neighbour | Main difference |
|-------|-----------------|
| Open data portal | the unit of publication is an indicator with breakdowns, not a file; one table replaces hundreds of files by year and region |
| Microdata catalog | aggregates rather than respondent records; access is usually open without requests |
| Geoportal | an indicator is tied to a territory code, not to geometry; the map is built from a code list shared with the geoportal |
| Metadata catalog | an SDMX structure registry stores code lists and table descriptions, while an indicator catalog serves the values themselves |
| Dashboard | a catalog has search, a series address and export; a dashboard has only a picture |

A summary table of all types is in the chapter [Comparing Types and Hybrids](./11-comparison-and-hybrids.md).

## Sources

- dataportals-registry export, release 1.27.0 of 15 October 2026: number of catalogs, owners, countries, platforms with the share having an API, SDMX and DCAT addresses. The queries are in the [appendix](../12-appendices/02-using-the-registry.md#indicator-catalogs).
- [SDMX](https://sdmx.org/), [the SDMX 3.1 release](https://sdmx.org/news/launching-the-new-sdmx-3-1-standard/), May 2025; [JSON-stat](https://json-stat.org/); [StatDCAT-AP](https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/statdcat-application-profile-data-portals-europe) and [draft 3.0.0](https://semiceu.github.io/StatDCAT-AP/drafts/3.0.0/); [RDF Data Cube](https://www.w3.org/TR/vocab-data-cube/)
- [FAOSTAT bulk download](https://bulks-faostat.fao.org/production/datasets_E.json), [Eurostat dataset inventory](https://ec.europa.eu/eurostat/api/dissemination/files/inventory?type=data), [ILOSTAT bulk download](https://ilostat.ilo.org/data/bulk/), [Central Bank of Brazil open data portal](https://dadosabertos.bcb.gov.br/); checked 12 October 2026
- PxWeb: [the old line and its releases](https://github.com/statisticssweden/PxWeb/releases), [PxWebApi 2 at Statistics Sweden](https://www.scb.se/en/services/open-data-api/pxwebapi/pxwebapi-2.0), [PxWebApi 2 user guide](https://www.pxtools.net/PxWebApi/documentation/user-guide/), releases of [PxWebApi](https://github.com/PxTools/PxWebApi/releases) and [PxWeb 2](https://github.com/PxTools/PxWeb2/releases); [Statistics Sweden API settings](https://statistikdatabasen.scb.se/api/v2/config) and [Statistics Norway tables](https://data.ssb.no/api/pxwebapi/v2/tables?lang=en&pageSize=1); the old Statistics Sweden API response in SDMX-ML 2.0; checked 12 October 2026
- [.Stat Suite](https://siscc.org/stat-suite/) and [Data Explorer releases](https://gitlab.com/sis-cc/.stat-suite/dotstatsuite-data-explorer/-/releases); [SDMX-RI](https://cros.ec.europa.eu/dashboard/sdmx-ri) and [its components under the EUPL](https://gitlab.com/sis-cc/eurostat-sdmx-ri); [the SDMX-RI service image for .Stat Suite](https://hub.docker.com/r/siscc/sdmxri-nsi-maapi); [Fusion Metadata Registry](https://www.sdmx.io/software/fmr/) and [its licence](https://www.bis.org/project/sdmx-fmr), [Eurostat SDMX registry](https://webgate.ec.europa.eu/fusionregistry/); checked 12 October 2026
- [DHIS2](https://dhis2.org/) and [its releases](https://releases.dhis2.org/); [OpenSDG](https://github.com/open-sdg/open-sdg/releases); [PxStat](https://github.com/CSOIreland/PxStat); [DBnomics](https://db.nomics.world) and [its API](https://api.db.nomics.world/v22/providers); checked 12 October 2026
- Knoema: [acquisition by Eldridge](https://www.businesswire.com/news/home/20201221005152/en/Knoema-Announces-Acquisition-by-Eldridge-and-Partnership-with-Snowflake), 21 December 2020; [merger with Seek](https://www.businesswire.com/news/home/20230215005155/en/Knoema-and-Seek-Data-Launch-as-Seek-Transforming-the-Last-Mile-of-Analytics), 15 February 2023; web archive snapshots of knoema.com: [the last successful one](https://web.archive.org/web/20251201160730/https://knoema.com/), 1 December 2025, followed by 530 errors; responses of knoema.com and opendataforafrica.org portals checked 12 October 2026
- ECB data portal: [list of datasets with bulk download](https://data.ecb.europa.eu/data/datasets), [SDMX API description](https://data.ecb.europa.eu/help/api/overview); [BIS bulk download](https://data.bis.org/bulkdownload), [BIS API](https://stats.bis.org/api-doc/v1/); [INEGI indicator bank API](https://www.inegi.org.mx/servicios/api_indicadores.html), [INEGI bulk download](https://www.inegi.org.mx/app/descarga/), [the ENIGH 2022 survey page](https://www.inegi.org.mx/programas/enigh/nc/2022/); [Statistics Canada web services](https://www.statcan.gc.ca/en/developers); [Croatian statistics portal](https://podaci.dzs.hr/en); [OpenDOSM](https://open.dosm.gov.my) and [its code](https://github.com/dosm-malaysia); [Armenian Statbank](https://statbank.armstat.am), [IMF SDMX API](https://api.imf.org/external/sdmx/2.1/dataflow); checked 12 October 2026
- I. Begtin, [Statistics as a data product](https://begtin.substack.com/p/694) (in Russian), August 2024: levels of statistics publishing and signs of a modern portal
- I. Begtin, [Why it is impossible to praise Rosstat](https://begtin.substack.com/p/22) (in Russian), January 2022, and [Russian statistics: non-machine-readable institutional fragmentation](https://begtin.substack.com/p/135) (in Russian), December 2024
- "Esli byt tochnym" ("To Be Precise"), [In 2025, 140 datasets disappeared in Russia and 425 indicators stopped being updated](https://tochno.st/materials/v-2025-godu-v-rossii-iscezli-140-datasetov-i-perestali-obnovliatsia-425-pokazatelei-bolse-vsego-postradala-demograficeskaia-statistika) (in Russian), 6 August 2025: the state of EMISS and the postponed move to the Digital Analytical Platform; [web archive snapshot of fedstat.ru](https://web.archive.org/web/20251101014804/https://fedstat.ru/), 1 November 2025
- I. Begtin, Telegram (in Russian): [EMISS: code lists and the default view](https://t.me/begtin/2804), 30 April 2021; [the PX format on open data portals](https://t.me/begtin/4519), 8 January 2023; [the ECB data portal](https://t.me/begtin/5786), 23 July 2024; [ECB data volume in CSV and Parquet](https://t.me/begtin/5936), 20 August 2024; [INEGI](https://t.me/begtin/5586), 12 April 2024; [Statistics Canada](https://t.me/begtin/6200), 20 November 2024; [Croatia](https://t.me/begtin/6234), 3 December 2024; [OpenDOSM](https://t.me/begtin/4717), 24 March 2023; [DBnomics](https://t.me/begtin/6195), 19 November 2024; [reusable statistical software](https://t.me/begtin/6421), 1 February 2025; [IMF data](https://t.me/begtin/5824), 31 July 2024; [the new IMF portal](https://t.me/begtin/6620), 19 April 2025; [EMISS to be decommissioned](https://t.me/begtin/6687), 12 May 2025; [the state of EMISS](https://t.me/begtin/6852), 20 June 2025; [Armenian Statbank](https://t.me/begtin/7258), 27 November 2025; [the difficulty of SDMX](https://t.me/begtin/7752), 3 September 2026
- [Units of Publication and Formats](../02-data/02-formats-and-units.md)
