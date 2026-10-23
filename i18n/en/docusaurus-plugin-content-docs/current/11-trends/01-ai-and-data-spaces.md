---
title: AI, Data Spaces and Regulation
description: "What among the novelties really changes a catalog (an entry point for programs, data for models, exchange between organisations) and which rules demand a result rather than a new logo."
---

# AI, Data Spaces and Regulation

A catalog that already serves descriptions, files, licences and a full dump is ready for most of the novelties of recent years. An entry point for an assistant program, search by phrase, a record for model training and the exchange of closed data between organisations all sit on that layer. Where the layer is missing, the assistant runs into a captcha, and in a data space there is nothing to agree on.

**AI-ready data** is a dataset that a program can find, understand and take: an open format, an explicit licence, provenance and a dump. No separate platform is needed for this label.

<div className="wide-table">

| What is added | Who it helps | What must already work |
|----------------|-------------------|-------------------------|
| An `llms.txt` file and an MCP server | a program that searches for datasets in a conversation | a description dump, an API, a licence on the dataset, field definitions and units |
| Search by phrase | a person who does not know the exact dataset name | filled-in descriptions |
| A Croissant record | whoever trains a model, and dataset search | files, fields, licence, provenance |
| A government platform for AI | speech, text and image datasets prepared for training | this is a separate catalog type, with its own access conditions |
| A data space | organisations that exchange data with different rights | an open description, even when the file is closed |
| A chat in place of the catalog | nobody who needs to check a number or load it into their own program | the dataset itself, with an address and a licence |

</div>

## Programs as users

A program needs the same four things as a catalog harvester: a stable address, a complete record, an explicit licence, a dump without a login. Dataset search engines have crawled catalogs for a long time. They have been joined by assistants built on large language models: these search for a dataset, read the description and take the file through an API.

An `llms.txt` file is a short note about a site: what is published here and where to look. It is a proposed format, not an adopted standard. An MCP server gives a program a ready list of queries so that it does not guess addresses. Both read what the catalog already serves. Such an entry point serves an empty record faster than the site does.

The first notable entry point at a national portal is the data.gouv.fr experiment. The portal team announced it on 25 February 2026. The public address `https://mcp.data.gouv.fr/mcp` is read-only and needs no key. The server searches for datasets, reads records, for some tables runs a query through the portal's API, and parses an individual file. What enters the conversation is text and a link. A large file is still downloaded through the ordinary dump. The portal itself warns that there are servers around that call themselves official and are not. The code is open, under the MIT licence.

CKAN has no ready extension in its distribution. The Open Knowledge Foundation is running early research: a server in which an answer must link to the source dataset. The description says plainly that the project is at an early stage and the contract is still changing. Independent servers already sit on the ordinary API of any CKAN portal: where the API is documented, the server is a thin layer on top, not a new database. The same approach is found outside open data: in Colectica Repository 8 an MCP server reads microdata descriptions in DDI. More in the chapter [on microdata catalogs](../03-types/06-microdata-catalogs.md).

For the tables themselves, the protocol is narrow. It is designed for a short answer that fits into a conversation. A model does not read a binary file such as Parquet or GeoPackage through it. A good server therefore returns a sample, a query result and the file's address. The full table is taken through the usual bulk dump. How APIs and dumps work is in the chapter [on access interfaces](../04-features/04-access-interfaces.md).

Programs as users have a downside too. Robots that collect texts and files for training create load, and portals begin to close. In 2026 the US Patent and Trademark Office put the bulk downloads and API of the data.uspto.gov portal behind registration. Many sites put up an "are you a robot" check, and government sites in a number of countries do not respond to requests from abroad, including from the clouds where the assistants themselves run. A person from the same country opens the catalog; a program does not. Load is handled with published limits and a full dump as a file. More in the chapter [on anti-patterns](../09-practices/02-anti-patterns.md#the-door-is-closed-to-programs).

## An MCP server: your own, the platform's, someone else's

The MCP server is no longer a home-made gadget. Platforms provide it and statistical offices install it. The question "should we write our own" has been replaced by "should we switch on the ready one, and on what terms".

**Platforms.** Huwise, formerly Opendatasoft, has one server for all portals. It is not included in the plan by default. Each request carries the portal address and an API key; without a key the server responds with code 401. The agent has access to catalog search, including by the meaning of a phrase, a record with a schema and a sample of records, and queries against the records themselves. Permissions are the same as the user's, down to an individual column. In the PortalJS cloud each organisation has its own server address, and the server code is open. It searches for datasets and serves a record with a schema and the first rows of a table with a column summary. The full dataset does not enter the conversation. A server "by default" (with no plan, key or separate installation) is still rare among mass-market platforms.

**Statistical offices.** By Open Data Watch's count, by August 2026 official MCP servers had been launched by five national statistical offices and data agencies: those of the US, the UK, France, India and Singapore. The Statistical Institute of Catalonia became the sixth. The US Census Bureau server is installed in-house: it needs a Census API key, Docker and a local database with part of the descriptions. The Indian server for the eSankhyiki portal is in beta and covers seven statistical products.

**Instructions for the agent.** The most telling example is the World Bank's Data360 server. It gives the agent mandatory instructions, code lists and search rules. Before requesting data, a tool checks whether there is a series for the country in question and what years and breakdowns it has. The server has no database of its own: every value in an answer comes from the platform itself. Data Commons distributes agent instructions the same way, as resources of its server. This is a new layer of description. It is maintained and checked like a record.

**What the pilots showed.** In 2026 the Open Knowledge Foundation connected an MCP server to Brazil's transparency portal and Uruguay's open data catalog. The conclusion in the report of 10 June: connecting is easy, understanding meaning is hard. In one answer the model added "climate factors" to Uruguay's energy balance, which are not in the dataset. What helped was field definitions, units, period, known limitations and examples of right and wrong questions. Partners' frequent questions were turned into tests. This is the same work on description that a person needs. It is checked against the program's answers.

**What someone else's server threatens.** A server that goes to any portal at a supplied address can itself become a way into someone else's network. On 21 September 2026 vulnerability CVE-2026-61612 was published for the independent server ondata/ckan-mcp-server before version 0.4.108. The address check looked at the string with the server name and did not check where that name resolved. This made it possible to reach the cloud's internal address `169.254.169.254`, where its settings are kept. This was the third bypass of the same protection. It is safer to open your own portal with a server bound to one address, read-only, with updates from whoever maintains it.

### What to switch on by default

If a platform provides the server, or you install it yourself, it should have six properties.

1. Read-only.
2. Open datasets without a key. A key is needed only for closed ones.
3. The server runs on top of the same public API with the same limits. It has no copy of the database of its own.
4. An answer links to the record and the file. A large file is served as a link to the dump, not as text in the conversation.
5. Alongside it are instructions for the agent: field definitions, units, period, known limitations.
6. Ten frequent questions with verified answers are run after every update to the server and the data. How to fit this into a self-audit is in the chapter [on self-audit](../10-quality/04-self-audit.md#if-agents-read-the-catalog).

### How to check an MCP server

The server responds to an ordinary POST request. The expected answers were obtained on 15 October 2026.

```bash
# Server name and version, without a key
curl -s -X POST https://mcp.data.gouv.fr/mcp \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"check","version":"1"}}}'

# List of tools
curl -s -X POST https://mcp.data.gouv.fr/mcp \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  -H 'mcp-protocol-version: 2025-06-18' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'

# Data360 keeps its agent instructions as resources
curl -s -X POST https://maimcpext.worldbank.org/ext/data360/mcp \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  -H 'mcp-protocol-version: 2025-06-18' \
  -d '{"jsonrpc":"2.0","id":3,"method":"resources/list"}'
```

data.gouv.fr answered `"name":"data.gouv.fr MCP server","version":"1.28.1"` with ten tools, from `search_datasets` to `query_resource_data` and `get_metrics`. For Data360 the same requests give `"Data360 MCP Server"` version 0.1.0, 16 tools and the resources `data360://system-prompt`, `data360://codelists`, `data360://search-usage` and others. The Huwise server `https://mcp.huwise.com/mcp` answered the first request without a key with code 401.

Next, ask the server three frequent questions about your own data. The answer must name the dataset and give a link to the record. The number in the answer is checked against the file.

## When to set up a separate entry point

**Context.** A regional open data portal on CKAN. The national portal harvests its descriptions. Management asks to "make the catalog AI-ready": an MCP server, search by phrase and, while at it, a "data space". The description dump is incomplete, and some datasets have no licence. One administrator maintains it.

**Options.** Fix the licences and the dump. Install MCP on top of the current API. Replace the search box with a chat. Join someone else's data space or set up your own.

**Criteria.** The national portal keeps harvesting descriptions. A program downloads the file without registration. The licence is visible in the record and in the dump. There is someone to document the new entry point. Exchange of closed data between organisations is either already among the portal's tasks or it is not.

**Decision.** Licences and the dump first. MCP is installed after that, if assistants are already in use and there is someone to maintain the server. If the platform already provides a server, you do not write your own: the ready one is switched on read-only and without a key for open datasets. Search by phrase can be added next to the ordinary search box. No data space is set up.

**Why.** MCP and search by phrase read what the API already serves. They serve an empty record faster than the site does. A chat in place of the catalog leaves no number that can be cited and loaded into one's own program. A data space is needed when many organisations exchange data and their access differs. A regional portal of open CSVs does not have this task, and a connector of its own with one administrator would be left unmaintained.

**Consequences.** An assistant connected later will see the same descriptions as the national portal. While licences are empty, a dataset still cannot safely be put into a training set: it is unclear whether that is allowed.

**When to review.** A steady program user has appeared, and a person who will update the MCP server. The platform has started providing a server itself: then the question is not "should we write our own" but on what terms to switch on the ready one. Or several organisations ask to be given closed data under contract, and there are more requests than email can handle.

How to write such a record for yourself is in the chapter ["Justifying a Decision"](../06-choice/04-justifying-decisions.md).

## AI on the catalog side

A model speeds up the draft of a description. A person still publishes.

The most expensive part of a catalog is the text of its records. In May 2025 the dataportals-registry catalog registry was enriched with the help of AI agents: given a site address, an agent proposed a title, description, topics and geographic coverage. Manual work of the same depth was estimated at six months for two people. People checked the result. In the same way a model can suggest which column is a date and which a region code, and sketch a data dictionary. The draft is checked against the file: a model confidently invents units of measurement too.

Search by phrase finds a dataset, not a value in a table. On the Norwegian portal data.norge.no such search sits next to the ordinary search box and SPARQL queries, not in place of them. It was written about in April 2025. A person asks in ordinary words, and the model picks links to datasets based on their descriptions. The portal itself warns that the programmatic interface for this search is still changing and covers only datasets. People, however, often search for a value: how many, where, when. Such a value is still taken from the file or an indicator API.

Berlin's Geoexplorer is a finished prototype from July 2024 on top of the city geoportal's metadata. It searches for layers by phrase and writes an explanation for a dataset from the results. The code is open under the MIT licence, and the site was still responding in 2026. It is a search showcase, not a replacement for the geoportal and not proof that layer descriptions no longer need to be maintained.

There is also a consequence for data owners. The argument "a machine-readable format is expensive" is weakening: if a table is published in any form at all, a parser can be written quickly. In November 2025 the standard API of Armenia's statistical database did not respond, and more than 900 indicators were collected from its pages. By October 2026 it was already running PxWeb release 2025, and the API worked. Details are in the chapter [on indicator catalogs](../03-types/05-indicator-catalogs.md#where-it-breaks). This is no reason to publish scans. What is collected from pages breaks at the first layout change, and nobody checks parsing errors.

## What counts as AI-ready

In December 2025 the Open Data Institute released the second version of its "AI-ready data" framework. It does not introduce a new catalog format. Its four groups are almost entirely covered in other chapters.

| Group in the ODI framework | What to do in the catalog | Where it is covered |
|--------------------|------------------------|---------------|
| The dataset itself | open format, clear codes, documented limitations | [formats](../02-data/02-formats-and-units.md), [good practices](../09-practices/01-good-practices.md) |
| Description | a machine-readable record, licence, provenance | [standards](../07-publishing/02-metadata-standards.md), [licences](../07-publishing/04-licenses-and-access.md) |
| Infrastructure | a portal or page, API, versions | [access interfaces](../04-features/04-access-interfaces.md), [identifiers](../04-features/06-identifiers-and-doi.md) |
| Governance | a named owner, a contact, a clear access procedure | [access and workflows](../04-features/08-access-control-and-workflow.md) |

In November 2024 the same institute checked whether UK open data gets into general-purpose language models. Pages of data.gov.uk were found in the April 2024 Common Crawl dump: 13,556 addresses. These were records with a download link, not the tables themselves. In a recall test the models correctly gave the official figure in 5 cases out of 195, and all five related to one dataset. The models remembered the texts of ordinary government sites better. The conclusion for a catalog is direct. A record with a link makes a dataset findable for a person. A number from that record does not get into a general model's memory by itself. The current value is still served as a file or through an API, not as the answer of a model trained last year.

## Government data catalogs for AI

Datasets for training models still live mainly on Hugging Face and Kaggle. Governments are building their own platforms alongside: there the language is different, there are sectoral records and access is stricter. Your own open data portal is not turned into an ML catalog because of this. How the type works is in the chapter [on ML catalogs](../03-types/07-ml-catalogs.md).

- **India, AIKosh.** According to an IndiaAI announcement of 20 August 2026, the platform had more than 15,000 datasets, 300 models and 30 tools. On 26 August 2026, downloads on the records opened after registration, datasets carried a quality rating, and the most common licence in the terms was CC BY-NC-SA: commercial use without separate permission is closed. It is a national repository for training, with its own rules on each dataset.
- **Korea, AI Hub.** The NIA agency's platform publishes training datasets: speech, text, images, including in Korean. Under the platform's rules the description is open without a login, while downloading asks you to confirm your identity and state a purpose. The data is intended for training models. An organisation abroad, and taking a dataset out of the country, require a separate agreement. Selling the dataset itself is also a separate contract, although the rules in principle allow research and development, including commercial.
- **US, NAIRR.** The pilot of the national AI research resource gives researchers access to compute, models and some datasets. It is not a file showcase for everyone. On 1 September 2026 the National Science Foundation announced an operations centre that is to turn the pilot into a permanent service. On that date the pilot site was still accepting applications. More than 800 research projects have gone through the pilot since 2024.
- **EU, AI-on-Demand.** A catalog of descriptions of what has already been published on other platforms, including Zenodo and Hugging Face. On 14 October 2026 the counter on the home page showed 118,025 dataset descriptions. That is the size of an index, not an archive run by the European Commission.

The common requirement for such a platform is one. The record names the training licence, the source and known limitations. The file may be closed behind registration. The description, however, stays open; otherwise the dataset cannot be found and one cannot decide whether to apply.

## Data products

An assistant program needs a dataset with a known owner, a schema, example queries and a stable interface. In discussions of catalogs this is called a data product: the dataset is maintained, not uploaded once. A typical open data portal falls short of such a product, so a "semantic layer for AI" on it turns out thin. How a product differs from a dataset is in the chapter [on units of publication](../02-data/02-formats-and-units.md#dataset-or-data-product). A practical list is in the chapter [on good practices](../09-practices/01-good-practices.md#the-dataset-as-a-product).

## A model instead of data

A government may decide that opening tables is no longer necessary: a chat trained on them will give the answer. A general-purpose model cannot do this. In the UK check of 2024 it hardly remembered data.gov.uk figures, although the portal's pages did get into the training dump. A model's answer cannot be checked against a file, cited, compared with last year or loaded into one's own program. If open data is closed and a chat is left in its place, that is closing the data.

A chat is appropriate next to a catalog: it suggests a record and links to it. A chat does not replace the number, the licence or the file.

## Descriptions for model training

A dataset on which models are compared is described with a Croissant record: contents, fields, the split into parts, licence, known limitations. Version 1.1 came out on 29 January 2026. A government open data portal does not have to become Hugging Face because of this. It does have to state the licence and source in a way that prevents the dataset from being quietly moved into a training set. How Croissant works and who already serves it is in the chapters [on standards](../07-publishing/02-metadata-standards.md) and [on ML catalogs](../03-types/07-ml-catalogs.md).

Regulation (EU) 2024/1689 on artificial intelligence places this work on the model provider, not on a city portal. Since 2 August 2025 a provider of a general-purpose model publishes a sufficiently detailed summary of what the model was trained on. For models already on the market by that date, the deadline is 2 August 2027. A portal helps by having the licence and source in the record and in the dump. The summary is written by whoever trained the model.

## Data spaces

European data spaces negotiate access to data between organisations, including data that is not for everyone. This is closer to a catalog with access levels and to a marketplace than to a "download the CSV" portal.

There is one thing in common with an open data portal. The description can be read from outside; otherwise there is nothing to make an agreement about. Ordinary DCAT is enough for this. The file may stay closed. Conditions ("allowed for research, may not be passed on") are written in the ODRL language. Negotiating the agreement and the transfer itself go through the Dataspace Protocol: the Eclipse Foundation approved version 2025-1 on 23 July 2025. How the platforms and the connector work, and examples such as Catena-X, are in the chapter [on other catalog types](../03-types/10-other-types.md).

Gaia-X in this construction is a trust framework: who is a participant and what requirements they meet. It is not a catalog and not a substitute for a dataset description.

The Data Spaces Support Centre Blueprint version 3.0 (February 2026) sets out what a space needs besides a showcase: a governance scheme, agreements, shared standards. Since 2026 the maturity of such an initiative is measured against the European technical specification CEN/CLC/TS 18331:2026, not against a slogan on a website. The European Commission runs sectoral spaces: health, mobility, industry and others. A city portal does not add itself to this list.

| Situation | What to do |
|----------|------------|
| A city publishes open files | a tidy portal, or publishing in the regional one |
| The description can be shown to everyone, the file is issued on request | a catalog with access levels, as for microdata |
| Several organisations exchange data, and their rights differ | a data space or a sectoral platform with agreements |
| Data is sold | a marketplace; the description is still open before payment |
| A chat must answer residents | keep the dataset, licence and dump; the chat links to them |

Not every city needs a data space. Most still need a portal in which the description, licence and file are in place.

## Rules

Recent laws name the result of publication. They rarely name the platform.

<div className="wide-table">

| Document | What changes for a catalog |
|----------|---------------------------|
| [Directive (EU) 2019/1024](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L1024) on open data | public sector documents are made available in machine-readable form and, where possible, free of charge; countries transpose this into their own laws |
| [Regulation (EU) 2023/138](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R0138) on high-value datasets, applies from 9 June 2024 | six categories (geospatial, earth observation and environment, meteorological, statistics, companies, mobility) free of charge, via API and as bulk download |
| [Regulation (EU) 2022/868](https://eur-lex.europa.eu/eli/reg/2022/868/oj), the Data Governance Act, applies from 24 September 2023 | an inventory of protected public sector data: the description is open, the file is issued under rules, including in a secure environment |
| [Regulation (EU) 2023/2854](https://eur-lex.europa.eu/eli/reg/2023/2854), the Data Act, applies from 12 September 2025 | access to data from connected devices and exchange between companies; usually adds no new CSVs to a city open data portal |
| [Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) on artificial intelligence | from 2 August 2025 a general-purpose model provider publishes a summary of training data (for models already released, by 2 August 2027); the portal does not write this summary |

</div>

The six high-value categories and the inventory of protected data are covered in the glossary and in the chapter [on access](../04-features/08-access-control-and-workflow.md). The European Health Data Space Regulation requires catalogs from health data access bodies from 26 March 2029: this too is a catalog with an open description and a closed file, not a portal of open CSVs.

In the US, OMB memorandum M-25-05 of 15 January 2025 is guidance under the OPEN Government Data Act. Among the purposes of open access it names training artificial intelligence systems, and it requires agencies to inventory their data and publish through the federal catalog. A Congressional Research Service overview treats the memorandum as in force; the same service's report on data.gov of 21 May 2026 discusses it as current guidance.

If a law names a platform, the choice from this book narrows to how to switch on the dump, licences and persistent addresses on that platform. If a law names a result (machine readability, a licence, no charge, an API), the platform is chosen as usual.

## What has not changed

A persistent address, a licence on the dataset, a dump of all descriptions and a clear file format are needed by a person, a search engine and an agent alike. A catalog that already does this survives changes of fashion without being rewritten. A showcase catalog does not: neither the federation nor a program sees it.

Before adding a new entry point, check six things.

1. A program takes all descriptions without a login and without a captcha.
2. The licence is on the dataset and gets into the dump.
3. The file downloads via a persistent link, rather than only opening in a chat.
4. Search by phrase, if switched on, returns records. The ordinary search box remains.
5. A chat answer, if there is one, links to the dataset. The dataset can still be downloaded.
6. An MCP server, if switched on, is read-only, and answers frequent questions with verified numbers and a link to the dataset.

Which new catalog capabilities are worth ordering, and which are still only someone else's service, is in the chapter [on innovative catalogs](./02-innovative-catalogs.md).

## Sources

- [Croissant 1.1](https://docs.mlcommons.org/croissant/docs/croissant-spec-1.1.html), 29 January 2026
- data.gouv.fr, [announcement of the MCP experiment](https://www.data.gouv.fr/posts/experimentation-autour-dun-serveur-mcp-pour-datagouv) (in French), 25 February 2026; [guide](https://guides.data.gouv.fr/intelligence-artificielle/le-serveur-mcp-de-data.gouv.fr) (in French); code [datagouv/datagouv-mcp](https://github.com/datagouv/datagouv-mcp), MIT licence
- Open Knowledge Foundation, [mcp-server](https://github.com/okfn/mcp-server): early research, the response contract is still changing; an independent server for the CKAN API: [ondata/ckan-mcp-server](https://github.com/ondata/ckan-mcp-server). Checked 14 October 2026
- Open Knowledge Foundation, [MCP for Open Data Portals: Trust Depends on Understanding the Data](https://blog.okfn.org/2026/06/10/mcp-for-open-data-portals-trust-depends-on-understanding-the-data/), 10 June 2026: pilots in Brazil and Uruguay, frequent questions as tests
- NVD, [CVE-2026-61612](https://nvd.nist.gov/vuln/detail/CVE-2026-61612), 21 September 2026: ondata/ckan-mcp-server before 0.4.108, an address check without name resolution, the third bypass of the protection
- Huwise, [MCP server](https://userguide.huwise.com/en/articles/5071874): not included in the plan automatically, an API key and portal address in every request; PortalJS, [MCP server](https://www.portaljs.com/blog/supercharging-data-portals-with-the-portaljs-mcp-server), 25 November 2025, code [datopian/portaljs-mcp-server](https://github.com/datopian/portaljs-mcp-server)
- Open Data Watch, [Making Official Statistics Work in an AI-Driven World](https://opendatawatch.com/odin-news/making-official-statistics-work-in-an-ai-driven-world/), September 2026: five official MCP servers of national offices by August 2026
- World Bank, [Data360 MCP](https://worldbank.github.io/data360-mcp/): agent instructions, code lists, a coverage check before requesting data; Data Commons, [working with an AI agent](https://docs.datacommons.org/mcp/)
- U.S. Census Bureau, [Data API MCP](https://github.com/uscensusbureau/us-census-bureau-data-api-mcp), CC0 licence; PIB, [the Indian statistical office's MCP server](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2224472&reg=3&lang=2), 6 February 2026
- Open Data Institute, [The UK government as a data provider for AI](https://theodi.org/insights/reports/the-uk-government-as-a-data-provider-for-ai/), November 2024: 5 correct answers out of 195 and 13,556 data.gov.uk pages in the April 2024 Common Crawl; [A framework for AI-ready data](https://theodi.org/insights/reports/a-framework-for-ai-ready-data/), version 2, December 2025
- [data.norge.no: AI search](https://data.norge.no/en/docs/finding-data/ai-search) and [API description](https://data.norge.no/en/technical/api/ai-search); data.europa.eu news item, [25 April 2025](https://data.europa.eu/en/news-events/news/open-data-portals-across-europe-norway-enhances-data-discoverability-ai-powered)
- [Geoexplorer Berlin](https://geoexplorer.odis-berlin.de/), [project page](https://odis-berlin.de/projekte/2024-07-geoexplorer/) (in German; July 2024, status "completed"), [code](https://github.com/technologiestiftung/odis-geoexplorer) under the MIT licence
- IndiaAI / PIB, [AIKosh workshop](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2301666&lang=2&reg=48), 20 August 2026: more than 15,000 datasets, 300 models, 30 tools; I. Begtin, [a look at AIKosh records](https://t.me/begtin/7744), Telegram (in Russian), 26 August 2026
- [AI Hub usage policy](https://aihub.or.kr/intrcn/guid/usagepolicy.do) (in Korean): identity confirmation, a stated download purpose, a separate agreement for use from abroad
- [NAIRR Pilot](https://nairrpilot.org/); NSF, [operations centre](https://www.nsf.gov/cise/updates/nsf-establishes-operations-center-national-artificial), 1 September 2026: more than 800 projects since 2024
- [AI-on-Demand](https://research.aiodp.eu/): on 14 October 2026 the counter showed 118,025 dataset descriptions; Zenodo and Hugging Face appear alongside in the catalog results
- Data Spaces Support Centre, [Blueprint 3.0](https://blueprint.dssc.eu/), February 2026; [summary](https://assets.dssc.eu/rsc/papers/Blueprint%20V3%20Summary.pdf); [CEN/CLC/TS 18331:2026](https://dssc.eu/articles/maturity-assessment-of-common-european-data-spaces): a maturity assessment specification, approved in April 2026; European Commission, [common European data spaces](https://digital-strategy.ec.europa.eu/en/policies/data-spaces)
- [Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) on artificial intelligence: a training data summary from general-purpose model providers from 2 August 2025
- OMB, [memorandum M-25-05](https://www.whitehouse.gov/wp-content/uploads/2025/01/M-25-05-Phase-2-Implementation-of-the-Foundations-for-Evidence-Based-Policymaking-Act-of-2018-Open-Government-Data-Access-and-Management-Guidance.pdf), 15 January 2025; Congressional Research Service, [IN12502](https://www.everycrsreport.com/reports/IN12502.html) and [R48954](https://www.congress.gov/crs-product/R48954), 21 May 2026
- I. Begtin, [AI and open data. Opinions and doubts](https://begtin.substack.com/p/5b8) (in Russian), March 2026: MCP at portals and the risk of replacing data with a model
- I. Begtin, Telegram (in Russian): [AI agents in the catalog registry](https://t.me/begtin/6694), 14 May 2025, and [the result of the enrichment](https://t.me/begtin/6725), 22 May 2025; [cheaper data collection](https://t.me/begtin/7345), 5 January 2026; [geoblocking and AI agents](https://t.me/begtin/6920), 14 July 2025; [data.uspto.gov](https://t.me/begtin/7643), 23 June 2026; [MCP for data and binary formats](https://t.me/begtin/6883), 3 July 2025
- [Directive (EU) 2019/1024](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L1024), [Regulation (EU) 2023/138](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R0138), [Regulation (EU) 2022/868](https://eur-lex.europa.eu/eli/reg/2022/868/oj), [Regulation (EU) 2023/2854](https://eur-lex.europa.eu/eli/reg/2023/2854)
- [Discoverability](../07-publishing/05-discoverability.md), [marketplaces and API catalogs](../03-types/10-other-types.md)
