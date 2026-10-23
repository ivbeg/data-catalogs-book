---
title: API Catalogs, Marketplaces and Dataset Lists
description: Three small types on the edge of the notion of a data catalog, namely catalogs of programming interfaces, data sales platforms and simple lists of files. Who runs them, what they run on, where they break and when they are enough.
---

# API Catalogs, Marketplaces and Dataset Lists

The three types in this chapter are rare. According to the dataportals-registry export (release 1.27.0 of 15 October 2026), there are 115 API catalogs, 56 marketplaces and 107 dataset lists: together less than 1% of 43,600 catalogs. They are easy to miss in the overall statistics and easy to confuse with a "real" portal.

Each of them answers its own question about the boundary of the concept. What if a catalog entry is a programming interface rather than a dataset? What if a dataset is a product, and access to it is sold under a contract? What if there is no catalog at all, just a page of links?

The main conclusion of the chapter: all three types work well as a complement to a data catalog and badly in its place. An API catalog without dataset cards hides what data stands behind the interfaces. A marketplace with closed descriptions hides the very fact that the data exists. A list without licences and dates quickly becomes a dead end. The remedy is the same in all three cases: an open description in a common standard next to the main showcase.

| | API catalog | Marketplace | Dataset list |
|---|---|---|---|
| What gets its own page | a programming interface | a product: a file, a subscription, access to a table | a link to a file or someone else's catalog |
| Catalogs in the registry | 115 | 56 | 107 |
| Main owner | central government, 45% | companies, 70% | none predominates |
| Custom build | 74% | 98% | 89% |
| Programmatic access to the catalog itself | 51% | 21% | 14% |
| Restricted access to at least part of the data | 14% | 91% | 1% |
| Description standard | OpenAPI, AsyncAPI, DCAT data service | none common; ODRL and the Dataspace Protocol in data spaces | most often none; schema.org, Data Package |

The "programmatic access" row is about the catalog itself: whether a program can get the list of interfaces, products or links. For an API catalog it is not about the interfaces it lists.

## API catalogs

**What it is.** A developer portal: a list of the programming interfaces of a public body, a transport company or a bank with documentation, sample requests, and often key issuance and a test console. This is not the same as the API of an open data portal itself from the chapter [on APIs and bulk download](../04-features/04-access-interfaces.md). There the API is a door into the catalog. Here the interface is what the catalog describes.

A good interface card asks the same questions as a dataset card, plus its own: what it serves, the base address, a machine-readable description, the access method (open, with a key, on request), limits, the data licence, service status, a contact and (the most common omission) which datasets stand behind it.

### Who builds them

Almost half of API catalogs are run by central government (45%), another 23% by regions, and 10–11% each by companies and municipalities. The most records are from the US (24), Finland (8), the United Kingdom (6), Sweden and Norway (5 each).

About a third of the API catalogs in the registry (35 of 115) are transport developer portals: US metro and bus companies (MBTA, BART, WMATA, CTA), Scandinavian operators (Entur, Trafiklab, Digitraffic), London, New Zealand, Taiwan. The reason is practical: a timetable app needs real-time delay data, and the transport company issues a key for that. Schedules are usually served as a GTFS file, and vehicle movements as a GTFS Realtime feed.

### What kinds there are

- **A national catalog of government APIs.** [api.gov.uk](https://www.api.gov.uk) in the United Kingdom, [API Setu](https://directory.apisetu.gov.in/) in India, [the gov.br/conecta catalog](https://www.gov.br/conecta/catalogo/) in Brazil, [api.gov.au](https://api.gov.au) in Australia, [Singapore's developer portal](https://www.developer.tech.gov.sg/), catalogs in Italy, Lithuania, Japan, [the Dutch API register](https://apis.developer.overheid.nl). They are often made separately from the open data portal: access to an API almost always requires a key, a test console and documentation, and the audience is developers, not analysts.
- **A single organisation's developer portal.** Central banks (the Riksbank, the Bank of Finland, Bank Negara Malaysia), statistical offices (Stats NZ, Poland's GUS), weather services (the UK Met Office, India's IMD), transport.
- **An API section in an open data portal.** In France the separate api.gouv.fr catalog was merged into data.gouv.fr: the first cards moved on 20 November 2024, in 2025 the old website began to be retired, and now its address leads to the portal's data services section. On 12 October 2026 it lists 1,265 interfaces: 1,119 open, 37 with registration and 109 with restricted access. 1,162 have a link to a machine-readable description, 1,038 to the datasets the interface serves. [Norway's API catalog](https://data.norge.no/api-katalog) in the common national catalog is organised the same way: 1,071 data services next to datasets. The Finnish Suomi.fi interface catalog is built on CKAN.
- **A registry of government system interfaces.** The Estonian RIHA and X-tee, Laos' GDX. This is a record of which systems exchange what, mainly for the agencies themselves. The public can see the description but not access.
- **Community collections.** [APIs.guru](https://apis.guru/) collects OpenAPI descriptions of public interfaces into an open repository: on 12 October 2026, 2,529 APIs and 3,992 descriptions. Next to it are [publicapis.dev](https://publicapis.dev) and the commercial Postman Public API Network and RapidAPI Hub. The German [bund.dev](https://bund.dev) is a volunteer project that finds undocumented German government APIs and writes documentation for them on the state's behalf.
- **MCP server registries.** [The official MCP registry](https://registry.modelcontextprotocol.io/) has been running in preview since 8 September 2025. The task is the same, to find an interface, only such a catalog is read not by a programmer but by an AI assistant. More on MCP in data catalogs is in the chapter [on trends](../11-trends/01-ai-and-data-spaces.md).

### Standards

**OpenAPI** describes an ordinary request–response interface: which addresses, which parameters, what comes back. From the description, tools build a documentation page, a test console and client libraries automatically. The latest version is 3.2.0 of 19 September 2025. **AsyncAPI** does the same for event streams: subscriptions to delay messages, sensor readings. Version 3.1.0 came out on 31 January 2026.

**A data service in DCAT.** Since DCAT 2 (2020) the catalog vocabulary has had a separate entity for an interface: an address, a link to a description such as OpenAPI, and a list of the datasets the service serves. This is the bridge between an API catalog and a data catalog: one record says "this dataset can be obtained through this interface". The API sections of the French and Norwegian national catalogs are built on this bridge.

**An address for programs.** RFC 9727 (June 2025) defines the standard address `/.well-known/api-catalog`. From it a program gets the list of a website's interfaces in linkset format without knowing in advance where the developer portal is. The standard is new. On 12 October 2026 none of the eleven national and large catalogs checked (the British, Australian, Dutch, Italian, Singaporean, Norwegian and French ones, api.data.gov, Digitraffic, Entur, bund.dev) served a list at this address. Where the response code was 200, an ordinary page of the website came back.

**Sector standards.** In transport these are GTFS and GTFS Realtime. In "smart cities" there is NGSI-LD, an interface for real-time sensor data; India's IUDX runs on it. Many countries have their own rules for designing government APIs; an example is [the Dutch API Design Rules](https://gitdocumentatie.logius.nl/publicatie/api/adr/).

### Platforms

Three quarters of API catalogs are custom builds. Among ready-made solutions the most common is a developer portal attached to an API gateway. A gateway is software that sits in front of an organisation's interfaces: it checks keys, counts requests and limits load. A developer portal comes with it, so the catalog appears almost "for free".

- **Azure API Management**: 22 catalogs in the registry, from the Bank of Finland and Fingrid to New York City's API portal and Washington's transport.
- **WSO2 API Manager** (open source, Apache 2.0): the Met Office, Latvia's VDAA. **Gravitee**: the French Polynesia portal.
- **A static site generated from files.** [api.gov.uk](https://www.api.gov.uk) is built from a single CSV table in an open GitHub repository. APIs.guru is also a repository of OpenAPI descriptions from which the website is generated.
- **Data catalog platforms.** In udata, on which data.gouv.fr runs, data services are a separate entity in the core: the card has fields for the OpenAPI description, limits, availability, the access request address and related datasets. CKAN has no separate entity: the ckanext-dcat extension lets you record an access service inside a dataset resource and export it to DCAT.

| Capability | API gateway portal | Static site from files | udata | CKAN |
|-------------|------------------|----------------------------|-------|------|
| Interface page with documentation | core | site generator | core, link to the OpenAPI description | no; a link from a resource |
| Key issuance and limit tracking | core | no | no; there are "limits" and "how to get access" fields | no |
| Linking an interface to datasets | no | by hand | core | the ckanext-dcat extension: an access service on a resource |
| Visibility to search engines | weak, see "Where it breaks" | good | good | good |

The choice follows from the task. If an organisation issues keys to its interfaces, it already has a gateway portal, and the only question is making the descriptions visible from outside. If you need to list other people's interfaces, a static site generated from a table is enough. If datasets stand behind the interfaces, they should be described in a data catalog with the interface as the way to obtain them, following the French and Norwegian model.

### Examples

- [The API section on data.gouv.fr](https://www.data.gouv.fr/dataservices): a national API catalog inside an open data portal, with the access type and related datasets on each card.
- [api.gov.uk](https://www.api.gov.uk): the catalog of UK public sector APIs, built from a table in an open repository.
- [API Setu](https://directory.apisetu.gov.in/): India's catalog of interfaces at all levels of government.
- [Digitraffic](https://www.digitraffic.fi/en/) and [Trafiklab](https://www.trafiklab.se): transport data of Finland and Sweden: real-time interfaces and schedule files.
- [APIs.guru](https://apis.guru/): an open collection of OpenAPI descriptions.
- [bund.dev](https://bund.dev): volunteer-written documentation for undocumented German government APIs.

### Where it breaks

**The description lags behind the interface.** The documentation says one field, the response contains another. The scale can be seen from APIs.guru: on 12 October 2026, of 3,992 collected descriptions, 688 failed format validation, and 166 were unavailable at their original address.

**The catalog ages.** The British catalog has 233 records, and for 70 of them the last update was in 2020. A data licence is given for 36 (12 October 2026). A catalog compiled once stops reflecting live interfaces, just as an abandoned portal stops reflecting data.

**The interface is described, but not the access.** The catalog lists APIs that need a key but does not say how to get it, who gets one and how long to wait. In April 2024 India's IUDX described 189 datasets from 47 cities, mostly real-time streams, and not one was open: in effect it is a developer portal for partners, not an open data catalog.

**The search engine cannot see the catalog.** A gateway developer portal often builds the page with a script in the browser. On 12 October 2026 the HTML of the API list page of the Bank of Finland on Azure API Management did not contain a single interface name, only a menu and a login button. Neither search engines nor the web archive find such a catalog. A sitemap is marked in the registry for only 26 of 115 API catalogs.

**The interface count is inflated.** Of the 1,265 "APIs" on data.gouv.fr, about 800 are automatic interfaces to individual datasets from regional portals on the Data Fair platform, one for each table. This is not an error: such an interface is useful. But the number of APIs in a catalog, like the number of datasets, says something about its structure, not about how many developer services the state has.

**There is an API, but no catalog.** A common case: interfaces exist but are not listed or described anywhere. They break with every website update, and the web archive does not preserve them. Russia has no national catalog of government APIs: inter-agency exchange goes through closed systems, and in 2021 Infoculture collected the public interfaces of government websites, more than a hundred. Moscow's apistore.mos.ru in 2021 contained 15 API prototypes and had not been updated since 2019; in October 2026 it does not open from abroad. In Germany the same work is done by bund.dev volunteers, in France by the state.

**An interface instead of an export.** If data can only be obtained by requests for one record at a time, someone who needs the whole database has to pull it down for weeks and runs into limits. An interface is a good complement to bulk download, not a replacement; more in the section ["Bulk download is not a luxury"](../04-features/04-access-interfaces.md#bulk-download-is-not-a-luxury).

### How to check an API catalog

1. **Find the machine-readable description.** Does the interface have an OpenAPI file, and does it match the actual response to a test request?
2. **Find the access procedure.** Does it say whether a key is needed, who issues it, what the limits are and what the data licence is?
3. **Find the dataset.** Does the data the interface serves have a card in a data catalog with a link to the interface?
4. **Look as a program would.** Are interface names visible in the page HTML, and is there a list at the RFC 9727 address?

```bash
# RFC 9727: a website's list of interfaces in linkset format
curl -s -H "Accept: application/linkset+json" "https://example.org/.well-known/api-catalog"
# data.gouv.fr: how many interfaces are open; access_type=restricted shows how many are closed
curl -s "https://www.data.gouv.fr/api/1/dataservices/?page_size=1&access_type=open"
# Norway: data services in the national catalog
curl -s -X POST -H "Content-Type: application/json" -d '{}' \
  "https://search.api.fellesdatakatalog.digdir.no/search/data-services"
# the British API catalog is a single table
curl -s "https://raw.githubusercontent.com/alphagov/api-catalogue/main/data/catalogue.csv"
# APIs.guru: how many descriptions are collected, how many are unavailable and invalid
curl -s "https://api.apis.guru/v2/metrics.json"
```

### When it is needed

An API catalog is needed when an organisation has many interfaces and a developer needs one entry point: where to get a key, where the documentation is, what has changed. For a single agency API, a documentation page with an OpenAPI description is enough. If a dataset stands behind the interface, it should also be described in an ordinary catalog, with a link to the API as the way to obtain it. Then it will be found both by an analyst who is not searching for "API" and by a harvester such as data.europa.eu that reads DCAT.

## Data marketplaces

**What it is.** Platforms where data is sold or provided under a contract. The product can be a file, a subscription to updates, access to an interface or to a table in the buyer's cloud storage. What distinguishes a marketplace from an open data portal is not payment as such, but a contract for each release: who received it, on what terms, what they may do with the data.

### Who builds them

70% of the marketplaces in the registry belong to companies, 21% to central government. Access to at least part of the data is restricted for 91%, and programmatic access to the platform itself is marked for 21%. By country the leaders are South Korea (16), the US (12) and China (6); another 10 platforms work worldwide.

The country figures show that in many countries a data marketplace is a government project, not just a business:

- **South Korea.** Most Korean records are the sector big data platforms launched by the Ministry of Science and ICT in 2019: ten platforms covering finance, the environment, culture, transport, oncology, retail, telecommunications, small business, the regional economy and forestry. In 2020 six more were added, including fire safety and marine fisheries. All of them are gathered in a common data map: by the end of 2021 it had 6,842 kinds of data. The platforms mix free and paid data.
- **China.** State data exchanges: the first opened in Guiyang in 2015, the Shanghai Data Exchange on 25 November 2021, with 20 products on the first day. According to an August 2025 review, 49 such platforms were operating with 3,944 data providers, and another 24 had been liquidated or never opened.
- **Japan.** JDEX and KYOTO DATA MARKETPLACE.
- **The United States.** Cloud platforms (AWS, Snowflake, Databricks, Google, Microsoft) and exchanges that sell their own market data: CME DataMine, Cboe DataShop, Nasdaq Data Link. The Korean KRX and Hong Kong's HKEX do the same.
- **Data for AI.** Defined.ai, Nexdata and Centific sell datasets for training models: speech recordings, annotated images, texts.
- **European data spaces.** The Pontus-X catalog in the Gaia-X ecosystem, the Language Data Space catalog, the Dutch DMI. Data spaces are covered below and in the chapter [on trends](../11-trends/01-ai-and-data-spaces.md#data-spaces).

### What kinds there are

Four different models live under the single word "marketplace".

- **Government and sector platforms.** The far end of the scale is data.europa.eu: a public infrastructure without fees or deals, so not a marketplace but what one is compared with. The Shanghai Data Exchange conducts paid deals between companies. Catena-X in the automotive industry combines non-profit governance with paid onboarding services. The British Rail Data Marketplace, opened in November 2023, is run by the Rail Delivery Group: in its first year it gained more than 140 products, 1,200 organisations and 4,000 data sharing agreements, and in October 2026 it lists 269 products, free and paid. The platform is less about selling than about managing usage agreements: at launch the organisers promised that most data would be free. Here the government or the sector also promotes the platform and may be the regulator. That is why data appears on it that is available nowhere else.
- **Data inside a professional product.** Bloomberg and LSEG sell not datasets but a bundle of data, identifiers, licences and a trader's workstation. This is a way to embed data in a product rather than a separate market.
- **Cloud provider platforms.** AWS, Snowflake, Google, Databricks. They differ in whether they take payment themselves and how they deliver data. The common logic is the same: the platform increases consumption of the main cloud platform.
- **Vendor showcases.** Datarade (more than 2,000 vendors on its home page in October 2026) helps find a vendor and pass a request to them, while the contract, payment and delivery remain between the parties. This is a catalog that brings in buyers, not an exchange.

### Standards

**Product description.** There is no common standard; each platform keeps its own card. The closest thing to a common language is the description of a data product: owner, terms, delivery methods, pricing plans. Templates such as ODPS are covered in the chapter ["Units of Publication and Formats"](../02-data/02-formats-and-units.md).

**Terms of use.** Where access is negotiated between organisations, terms are described in machine-readable form: ODRL is a W3C language for rules such as "may be used for research, may not be passed to third parties".

**The data space protocol.** The Dataspace Protocol (version 2025-1, approved by the Eclipse Foundation on 23 July 2025) connects these parts. A participant publishes a catalog of their datasets in DCAT, attaches terms in ODRL to each, and then the protocol describes contract negotiation and data transfer. The open-source implementation is the [Eclipse Dataspace Components](https://github.com/eclipse-edc/Connector) connector, on which Catena-X exchange is built. An important detail: the dataset description here is ordinary DCAT. That means it can also be shown outside, even if the data itself is closed.

**Delivery without download.** Cloud platforms often do not hand over a file but give the buyer access to a table directly in the vendor's storage. AWS Data Exchange knows five kinds of delivery: files, interfaces, access to Redshift tables, direct access to S3 storage and permissions in Lake Formation. Databricks Marketplace works on the open Delta Sharing protocol, which on 10 June 2026 became OpenSharing and moved to the Linux Foundation.

### Platforms

In the registry 55 of 56 marketplaces are custom builds, and this is an honest picture: there is almost no reusable marketplace software. Cloud platforms are part of the cloud, and data exchanges have their own systems. Open catalog platforms (CKAN, Dataverse, InvenioRDM) do not accept payments. For data spaces there is the open-source EDC connector, but it is an exchange channel between participants, not a showcase with payment.

The boundary with open data portals is blurring. On 30 September 2025 OpenDataSoft renamed itself Huwise and began selling the same platform as a data product marketplace, including for exchange within an organisation.

### Why platforms rarely take off

Owners of data that is genuinely in demand do not need an intermediary: customers come to them anyway, on their terms. Owners fear that the intermediary will use or resell the data. And a "platform" is less useful for data than for goods: data is bought rarely, often as a one-off purchase or a long subscription, and it is more convenient to negotiate directly with the vendor.

Working platforms are usually run by the main data owner or by someone who already has buyers. Exchanges sell their own quotes. Rail Data Marketplace is run by the railway industry organisation. Cloud platforms sell where the buyer already stores data. An independent showcase of other people's data has to spend on promotion for years.

### Examples

- [Rail Data Marketplace](https://raildata.org.uk/): the UK railway sector platform: free and paid products, with usage agreements managed by the platform itself.
- [AWS Data Exchange](https://aws.amazon.com/data-exchange/), [Snowflake Marketplace](https://app.snowflake.com/marketplace), [Databricks Marketplace](https://marketplace.databricks.com): cloud platforms with delivery into the buyer's storage.
- [Nasdaq Data Link](https://data.nasdaq.com): financial and alternative data from the exchange and third-party vendors.
- [Datarade](https://datarade.ai/): a vendor showcase.
- [JDEX](https://www.service.jdex.jp/) and [KYOTO DATA MARKETPLACE](https://data-market.smart-kyoto.or.jp/): Japanese platforms.
- [Catena-X](https://catena-x.net/): the automotive data space on the Dataspace Protocol.

### Where it breaks

**The description is closed until registration.** The buyer does not understand what they are buying, and the search engine does not see that the data exists. The working scheme is different: descriptions are open, while payment and delivery go through a separate system.

**The platform is not visible from abroad.** On 12 October 2026 the Korean big data platforms, their common data map and the Chinese data exchanges did not open from abroad. For a domestic market this may be acceptable, but for a foreign buyer, an aggregator and the web archive such platforms do not exist.

**"Marketplace" as a sign on the door.** The Korean platforms and Rail Data Marketplace largely give data away for free, while Huwise calls a platform for open data portals a marketplace. The name does not say whether anything is sold there. The type is determined by what the user gets: a file without conditions means an open data portal; a contract for each release means a marketplace.

**Platforms close down.** Of the Chinese data exchanges, 24 had been liquidated or were not operating by August 2025. data.world started as an open cloud catalog, and on 13 July 2026 it closed its open community; the story is covered in the chapter [on cloud storage and hubs](../08-beyond-portals/04-cloud-storage-and-hubs.md).

**Nothing remains after the subscription.** With delivery "without download", access to a table disappears the day the subscription ends. The fate of files the buyer managed to export is decided by the contract: in AWS Data Exchange exported files stay with the subscriber, but the vendor's contract may require their deletion. This is worth reading before buying, not after.

### How to check a marketplace

1. **Open a card without logging in.** Are the description, field composition, period, update frequency and a data sample visible?
2. **Find the terms.** Are the terms of use written on the card, not only in a contract shown after payment?
3. **Find out the delivery method.** A file, an interface or access to a table in the cloud, and can you move the data to your own systems?
4. **Ask what will remain.** What may you keep after the subscription ends, and may you cite the data in publications?

### When it is needed

A marketplace is needed when data is actually sold or provided under contract and each release needs terms. If the goal is to open data, a marketplace is superfluous: an open data portal or publishing without a portal is enough. It is almost never worth building your own platform for other people's data; see why in the [decision record](../06-choice/05-build-or-buy.md#example-your-own-data-marketplace). If data is sold through a cloud platform, its description should also be kept open in an ordinary catalog: then a buyer will find it through search, not only inside the cloud.

## Dataset lists

**What it is.** A page, table or repository with links to files or to other catalogs. A list has no search, filters or cards: a list row is a link and one sentence of description. The registry has 107 such lists, about 14% with programmatic access.

### Who builds them

There is no main owner here: 20% of lists belong to companies, 19% to central government, 14% to municipalities, 13% to communities, 12% to universities. 89% are custom builds, 16 are on GitHub or GitLab. The leaders by country are the US (20) and international projects (12). Five records are attributed to the Seychelles: these are crypto exchanges registered there that publish their trading history.

### What kinds there are

- **A community's thematic selection.** [awesome-public-datasets](https://github.com/awesomedata/awesome-public-datasets) on GitHub has about 79,000 stars in October 2026. Next to it are country lists: [awesome-nigeria-datasets](https://github.com/pyung/awesome-nigeria-datasets), [open-data-turkey](https://github.com/yagiz-dev/open-data-turkey). The latter in 2023 was still the most complete list of portals in Turkey: there is no national portal, and city portals and GIS are scattered.
- **An "Open data" page on an agency's or city's website.** Cardiff, Halle, Arnsberg, Łódź, Riyadh, the Saudi tax authority. Files sit on pages of an ordinary CMS (TYPO3, Drupal, SharePoint) without a separate portal.
- **A single publisher's download page.** [New York City taxi trips](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page): one Parquet file per month and field dictionaries. [Wikipedia dumps](https://dumps.wikimedia.org), OpenStreetMap extracts by region, transit schedule files. 13 of the 107 records are crypto exchange trading histories. For example, [data.binance.vision](https://data.binance.vision/) is a cloud storage listing where each archive is accompanied by a checksum file.
- **A list built from description files.** [Registry of Open Data on AWS](https://registry.opendata.aws/) is a website generated from 1,238 YAML files in a GitHub repository (12 October 2026). Each file has the same fields: title, description, licence, update frequency, contact, storage address. awesome-public-datasets itself works the same way: its README is assembled automatically from YAML files in the neighbouring apd-core repository.
- **Personal indexes on GitHub Pages.** Catalogs of clinical data, Indian geodata, Hong Kong open data, kept by one person. Useful as a starting point, but they have no owner who will answer for completeness.

### Standards

Most often none. The following help bring a list to a machine-readable form:

- schema.org markup: DataCatalog for the page and Dataset for each row;
- a `datapackage.json` file next to the data; its template is among the [book's templates](pathname:///templates/datapackage.json);
- the list itself in CSV, JSON or YAML in a repository from which the page is generated, as with the AWS registry;
- checksum files next to archives, as at Binance;
- a DCAT file listing the datasets: this is how a static site becomes a catalog that harvesters read. How JKAN and other generators do this is covered in the chapter [on static sites](../08-beyond-portals/02-static-sites.md).

### Platforms

An ordinary web page on a CMS, a README file in a Git repository, a static site on GitHub Pages, a shared spreadsheet or simply a cloud storage listing. When there are a few dozen datasets, the next step is not CKAN but a static catalog: the same files, but each dataset gets its own page with a description and markup.

### Examples

- [awesome-public-datasets](https://github.com/awesomedata/awesome-public-datasets): a thematic list of open datasets with broken-link flags.
- [Registry of Open Data on AWS](https://registry.opendata.aws/): a list of datasets in cloud storage, built from description files.
- [TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page): a download page used for years: one publisher, a clear series of files, field dictionaries.
- [Wikimedia Downloads](https://dumps.wikimedia.org): dumps of all Wikimedia projects.

### Where it breaks

**Links die.** This is the main disease of lists, and awesome-public-datasets fights it: each row has a status, and on 12 October 2026, 96 of 1,062 records were flagged as needing repair. A sample check of 300 random links from it the same day: 258 opened, 16 returned an error or did not respond, and another 26 refused a program (codes 401, 403, 429). The latter are probably alive for a person, but a harvesting robot can no longer see them.

**No licence and no date.** A list row says the data exists, but not whether it can be used or when it was last updated.

**The list duplicates other catalogs.** A selection of links to portals and datasets that are already in catalogs goes out of date faster than they do: a catalog is updated by the data owner, a list by whoever found the time.

**The list depends on one person.** A personal index on GitHub Pages or a page on a city website stops being updated as soon as the author leaves. An "Open data" page on an agency website has all its addresses broken at once when the website is redesigned.

### How to turn a list into a findable publication

1. **Each row has a licence, update date, format and size.** Without this the list can only be browsed, not used.
2. **The list itself is data.** Keep it as a CSV, JSON or YAML file in a repository and generate the page from it. Then the list can be downloaded, checked by a program and harvested into an aggregator.
3. **A robot checks the links.** Scheduled link checking is easy to add to a repository, for example with the [lychee](https://github.com/lycheeverse/lychee-action) action in GitHub Actions. Flag broken rows, as in awesome-public-datasets, rather than silently deleting them.
4. **Markup and registration.** Add schema.org to the page and register the list in your country's or topic's catalog.

This path is covered in detail in the chapters ["Publishing Without a Portal"](../08-beyond-portals/01-when-portal-not-needed.md) and ["Making a Publication Findable"](../08-beyond-portals/05-making-it-findable.md), and a summary list of steps is in the [checklists](../12-appendices/04-checklists.md#the-minimum-for-publishing-without-a-portal).

### When it is needed

A list is a normal way to publish a dozen datasets or to compile an index on a topic. It becomes a dead end when there are no licences, persistent addresses and markup. There is no need to set up CKAN for such a list: from a list to a static catalog is one step, and it is cheaper than any portal.

## How they differ from their neighbours

| Type | Neighbour | Main difference |
|-----|-------|-----------------|
| API catalog | Open data portal | describes services, not datasets; for a portal, an API is a way to get a dataset, for an API catalog the interface is the subject of description |
| API catalog | Metadata catalog | a registry of government system interfaces describes who exchanges what; an API catalog gives a developer access |
| Marketplace | Open data portal | a contract and terms for each release; an open data portal provides data without requests |
| Marketplace | Data space | a data space is the rules and protocol for exchange between participants; a marketplace is a showcase that can run on top of it |
| Marketplace | ML catalog | training datasets are sold under contract; hubs such as Hugging Face distribute them under open licences |
| Dataset list | Open data portal | no cards, search or API; a row is a link and a sentence |
| Dataset list | Catalog of catalogs | lists datasets, not portals; awesome selections often mix the two |
| Dataset list | Aggregator and dataset search engine | a list is compiled by hand, an aggregator by a program from other catalogs |

A summary table of all types is in the chapter [Comparing Types and Hybrids](./11-comparison-and-hybrids.md).

## Sources

- dataportals-registry export, release 1.27.0 of 15 October 2026: number of catalogs, owners, countries, platforms, shares with an API and with restricted access, transport API catalogs, crypto exchange lists. The queries are in the [appendix](../12-appendices/02-using-the-registry.md#api-catalogs-marketplaces-and-dataset-lists).
- [OpenAPI 3.2.0](https://spec.openapis.org/oas/v3.2.0), 19 September 2025; [AsyncAPI 3.1.0](https://www.asyncapi.com/blog/release-notes-3.1.0), 31 January 2026; [RFC 9727: api-catalog](https://www.rfc-editor.org/rfc/rfc9727.html), June 2025; [DCAT 3](https://www.w3.org/TR/vocab-dcat-3/): data service; [the Dutch API Design Rules](https://gitdocumentatie.logius.nl/publicatie/api/adr/)
- Responses at `/.well-known/api-catalog` for eleven API catalogs and the HTML of the Bank of Finland API list page on Azure API Management, checked 12 October 2026
- Data services on data.gouv.fr: [the API section](https://www.data.gouv.fr/dataservices) and [the section's API](https://www.data.gouv.fr/api/1/dataservices/), export of all 1,265 cards, 12 October 2026; [api.gouv.fr on beta.gouv.fr](https://beta.gouv.fr/startups/api.gouv.fr.html): transfer to data.gouv.fr and retirement in 2025; [DILA on the transfer of cards](https://www.dila.gouv.fr/actualites/toutes-les-actualites/dila/article/api-dila-un-catalogue-unique-aux-usagers-de-la-donnee), 21 November 2024; [the transfer issue in the data.gouv.fr repository](https://github.com/datagouv/data.gouv.fr/issues/1372)
- [Norway's API catalog](https://data.norge.no/api-katalog) and the national catalog's data service search; [the api.gov.uk catalog table](https://github.com/alphagov/api-catalogue); [APIs.guru metrics](https://api.apis.guru/v2/metrics.json); checked 12 October 2026
- [WSO2 API Manager](https://github.com/wso2/product-apim); [linking an access service to a resource in ckanext-dcat](https://docs.ckan.org/projects/ckanext-dcat/en/latest/mapping/)
- [The official MCP registry](https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/), 8 September 2025
- [ODRL Information Model](https://www.w3.org/TR/odrl-model/); [Dataspace Protocol 2025-1](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/2025-1/) and [release 1.0.0 at the Eclipse Foundation](https://projects.eclipse.org/projects/technology.dataspace-protocol-base/releases/1.0.0), 23 July 2025; [Eclipse Dataspace Components](https://github.com/eclipse-edc/Connector)
- [Delivery types in AWS Data Exchange](https://docs.aws.amazon.com/data-exchange/latest/userguide/data-sets.html) and [terms after the subscription ends](https://docs.aws.amazon.com/data-exchange/latest/userguide/jobs.html); [Databricks on Delta Sharing becoming OpenSharing](https://www.databricks.com/company/newsroom/press-releases/databricks-announces-opensharing), 10 June 2026
- [Rail Data Council on Rail Data Marketplace](https://www.raildeliverygroup.com/about-us/meet-the-team/our-boards/customer-board/rail-data-council.html) and [the product catalog](https://raildata.org.uk/dataProducts), checked 12 October 2026
- Korean big data platforms: [launch of ten platforms](https://zdnet.co.kr/view/?no=20190722154053) (in Korean), ZDNet Korea, 22 July 2019; [six new platforms](https://www.korea.kr/news/policyNewsView.do?newsId=148884257) (in Korean), korea.kr, 22 February 2021; [16 platforms and 6,842 kinds of data](https://it.chosun.com/news/articleView.html?idxno=2022032901627) (in Korean), IT Chosun, 29 March 2022
- Chinese data exchanges: [opening of the Shanghai exchange](https://english.dbw.cn/system/2021/11/26/001449350.shtml), Xinhua, 25 November 2021; [the Guiyang exchange as the first, 2015](http://www.eguiyang.com.cn/2024-08/15/c_1013650.htm) (in Chinese); [a review of platforms as of August 2025](https://www.cww.net.cn/article?id=603883) (in Chinese), CWW
- [Announcement of OpenDataSoft's renaming to Huwise](https://www.huwise.com/en/opendatasoft-becomes-huwise/), 30 September 2025
- [awesome-public-datasets](https://github.com/awesomedata/awesome-public-datasets) and [apd-core](https://github.com/awesomedata/apd-core): record statuses and a sample check of 300 links, 12 October 2026; [Registry of Open Data on AWS](https://registry.opendata.aws/) and [its description files](https://github.com/awslabs/open-data-registry); [TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page); [Binance Data Collection](https://data.binance.vision/); checked 12 October 2026
- I. Begtin, [On data markets and exchanges](https://begtin.substack.com/p/2da) (in Russian), September 2026: four platform models and reasons for failure
- I. Begtin, Telegram (in Russian): [Registry of Open Data on AWS](https://t.me/begtin/2685), 18 March 2021; [government API catalogs](https://t.me/begtin/3525), 4 February 2022; [why there is no api.gov.ru](https://t.me/begtin/3512), 2 February 2022; [apistore.mos.ru](https://t.me/begtin/3271), 19 November 2021; [bund.dev](https://t.me/begtin/4194), 24 August 2022; [API catalogs as a product for developers](https://t.me/begtin/4608), 10 February 2023; [India Urban Data Exchange](https://t.me/begtin/5599), 17 April 2024; [company data catalogs](https://t.me/begtin/4801), 17 April 2023; [open data in Turkey](https://t.me/begtin/4597), 7 February 2023
- [When You Do Not Need a Portal](../08-beyond-portals/01-when-portal-not-needed.md)
