---
title: Why Catalogs Exist and Who Uses Them
description: The catalog owner's motives and the user groups, from people to search engines and software.
---

# Why Catalogs Exist and Who Uses Them

Almost everything else depends on why a catalog was set up and who will use it: the type, the feature set and the platform. A catalog built "to have one" usually becomes a showcase that nobody updates.

## Why they are built

- **Law and reporting.** A public body is required to publish open data. A statistical office releases indicators. A geoportal is part of a spatial data infrastructure.
- **Transparency.** Budgets, procurement and elections should be findable without a written request to an office.
- **Grant or journal conditions.** Research data is published with a persistent identifier so that it can be cited.
- **Reuse.** One agency stops begging another for a spreadsheet by email.
- **Sales and services.** The description is open; the file or API is paid or available under a contract.
- **Showcase.** A portal is launched for a date or a project. The motive is not bad in itself, but without updates and machine access it leads to [anti-patterns](../09-practices/02-anti-patterns.md).

If there are two motives, there are often two catalogs. A statistical office needs both indicators and survey files. One site rarely does both jobs well. See the [statistical office example](../06-choice/08-worked-examples.md).

## Three jobs of a portal

The motive answers the question "why was it set up". It also helps to ask what job the portal does for its users. Government open data portals usually have three, and a good portal does at least one of them seriously.

- **Search engine and aggregator.** The portal collects descriptions from dozens or hundreds of systems where the data is actually published and offers a single search. This is how the national portals of large countries work: data.gov harvests the catalogs of federal agencies, and the European data.europa.eu harvests national portals. The Russian data.gov.ru was also conceived as a harvester of lists from agency websites; how that turned out is covered in [anti-patterns](../09-practices/02-anti-patterns.md).
- **Community.** The portal engages users: dataset discussions, reuse examples, data requests. data.gouv.fr is the model. It is not only agencies that publish there: Open Food Facts, a civic project and open food products database, has its own organisation page with datasets.
- **Infrastructure for reference data.** The portal is part of the government's digital infrastructure and serves data that other systems and businesses run on. In France, the Digital Republic Act singled out "reference data": as of 2026 there are nine datasets, among them the national address database, the Sirene business register, the official geographic reference and the cadastral map. Quality and availability obligations apply to them, and the list is published on data.gouv.fr. In Russia, separate reference data portals play a similar role; they are covered in the chapter [on metadata catalogs](../03-types/08-metadata-catalogs.md).

The features depend on which job is the main one. A search engine needs harvesting and good search, a community needs discussions and user accounts, infrastructure needs stable addresses, bulk download and APIs that others can rely on.

## Who uses them

- People: residents, journalists, researchers, analysts, staff of other agencies.
- Developers of services and apps.
- Other catalogs that harvest descriptions on a schedule.
- Dataset search engines: Google Dataset Search, Dateno, OpenAIRE.
- Programs and AI agents that look for data through APIs. More on this in the [chapter on trends](../11-trends/01-ai-and-data-spaces.md).

A person and a program are different customers. A site without a metadata export loses search engines and higher-level portals. A catalog only for programs, without readable pages, fails the transparency job: a resident is not obliged to read JSON.

## What different people expect

The people in the list above expect different things from a catalog. It is convenient to divide them into three main groups and several subgroups. One person may belong to several at once.

| Group | What they expect |
|--------|-----------|
| **Analysts** | fresh data on the main topics, above all official statistics; familiar formats such as CSV and XLSX; the ability to open the data in their own tools without programming |
| **Researchers** | data from their discipline, open or with clear access rules; DOIs for datasets; the formats and tools accepted in their field; a clear provenance and methodology |
| **Developers and data engineers** | APIs; bulk download of the whole catalog; schema and structure descriptions; modern formats such as compressed CSV and Parquet; predictable addresses so they can build downloads into their pipelines |
| Journalists | the same as analysts, but with less technical depth; what matters most is that the data is available at all |
| ML engineers | the same as developers, plus large volumes for training and links to platforms such as Hugging Face |
| Statisticians | substantive metadata and specialised standards: SDMX for indicators, DDI for surveys |
| Geospatial analysts and GIS specialists | search by territory, standard ArcGIS and OGC services, download in common geospatial formats |

The table works as a test. Look at your catalog through the eyes of each group: can they solve their task? A portal that is useless to all seven will not be saved by design or by the number of datasets.

Business stands apart. It needs specific data rather than a portal: registers of organisations, procurement, indicators, base maps. Having found the original source once, a company connects to it directly and from then on expects a stable channel and a person to write to if something breaks. For business it matters more that the agency publishes the needed data at all and answers requests than which portal the data sits on.

## What follows for the choice

Write down one main user group and one obligation. Features follow from them. A search engine needs schema.org markup. A higher-level portal needs an export in its DCAT profile. A journal needs a DOI and a citation line. A resident needs a clear title, a licence and a download button.

A feature without such a note is a candidate for rejection. How to record this is described in the chapter [on selecting features](../06-choice/02-feature-selection.md).

## Sources

- [Capability map](../04-features/01-capability-map.md)
- [Selecting features](../06-choice/02-feature-selection.md)
- data.gouv.fr: [Service public de la donnée](https://www.data.gouv.fr/pages/spd/reference), the list of nine reference datasets, checked 12 October 2026; [Open Food Facts organisation page](https://www.data.gouv.fr/organizations/open-food-facts/)
- I. Begtin, Telegram (in Russian): [three functions of open data portals and their audience](https://t.me/begtin/4721), 27 March 2023; [three groups of data users and their expectations](https://t.me/begtin/7277), 7 December 2025
