---
title: What Is a Data Catalog
description: What is called a data catalog, portal, repository and aggregator, and what this book does not cover.
---

# What Is a Data Catalog

A data catalog is a service that describes datasets and helps people find, understand and obtain them. The description is called metadata: the title, who published it, the licence, the time period, the format, the address of the file or service.

The file itself may sit in the catalog or be linked from somewhere else. This is the main technical distinction, and the book returns to it in the chapter [on storage](../04-features/05-data-storage.md). Without a description, a link to a file is not yet a catalog.

## Portal, repository, aggregator

Related words are often confused.

A **portal** is a catalog plus everything around it: news, reuse examples, discussions, a feedback form. data.gouv.fr is a portal: a dataset has a page with reuse examples and a discussion. A page listing ten CSV files is not one yet, even though it also publishes data. When such a list is enough is covered in the part [Publishing Without a Portal](../08-beyond-portals/01-when-portal-not-needed.md).

A **repository** is a catalog that stores the files itself and usually issues a persistent identifier so that the data can be cited in a paper. Zenodo is a typical example.

A **geoportal** is a catalog of layers and map services, often together with a map in the browser.

An **aggregator or dataset search engine** is a catalog of catalogs. It does not publish datasets of its own but collects descriptions from others. Google Dataset Search and Dateno work this way.

A **metadata registry** describes structures rather than datasets: vocabularies, schemas, other catalogs. It belongs on a different shelf, even though the word "catalog" may appear in its name.

A **data warehouse or data lake** is where the bytes live inside an organisation. A catalog answers a different question: how to find that data from the outside.

## Three big families

Leaving details aside, data catalogs fall into three families. This division was proposed back in 2020, and it still helps you quickly understand what you are dealing with.

| | Open data portals | Research repositories | Enterprise catalogs |
|---|---|---|---|
| Who can see it | everyone | everyone, sometimes part of the data on request | employees only |
| Control over sources | almost none: agencies publish, the catalog accepts what it is given | sets requirements for the description, but not for the data itself | full: the catalog knows every table |
| What matters most in the description | licence and terms of use | persistent identifier and citation | owner, lineage, business glossary |
| How they connect to neighbours | harvesting descriptions via DCAT, the CKAN API and similar protocols | harvesting via OAI-PMH, issuing DOIs | integration with the company's storage and tools |

The book covers the first two families and their relatives: geoportals, indicator and microdata catalogs, ML catalogs. A detailed classification by type is in [Part III](../03-types/01-classification.md).

## What this book does not cover

Enterprise catalogs such as Collibra, Alation and DataHub manage data inside a company: who owns a table, where it came from, who is allowed to see it. The only thing they share with a public portal is the word "catalog". The audience, openness and standards are different. A public catalog describes files and services that can be downloaded. An enterprise catalog describes database tables, processing pipelines and reports that can only be accessed from the inside. Companies deploy one to find where personal data is stored, to help analysts find the right table and to help engineers understand where its values come from. Such catalogs hardly use common description standards like DCAT: integration with the company's tools matters more to them. The rest of the book does not discuss them.

The book also does not look for a specific dataset such as "the Moscow budget for 2024". For that, you open the portal itself or a dataset search engine. This book is about how such portals work and how to choose your own.

## A short history

- 2007: the eight principles of open government data and the EU INSPIRE Directive on spatial data.
- 2009–2010: the national portals data.gov and data.gov.uk; CKAN spreads.
- 2010–2011: civic portals appear next to government ones, built by activists who do not wait for the authorities. In Russia, this is how the Open Data Hub, hubofdata.ru, appeared on CKAN, earlier than the government portals.
- 2012: re3data, the registry of research repositories.
- 2014: the DCAT vocabulary becomes a W3C Recommendation. 2016: the FAIR principles on the findability and reuse of research data.
- 2019: the EU Open Data Directive. 2023: the implementing regulation on high-value datasets, which public bodies must provide free of charge and in machine-readable form.
- 2020s: there are so many catalogs that catalogs of catalogs and general search engines appear. In 2021 the list of Russian catalogs datacatalogs.ru was launched; in 2023, the open registry of catalogs worldwide, dataportals-registry (started within the Common Data Index project); and in 2024, built on it, the dataset search engine Dateno. Alongside them, programs that read catalogs without a human are growing.
- 2026: the flagships of the first wave are changing. data.gov is moving from CKAN to a custom build; data.gov.uk now shows curated collections on its home page instead of harvesting everything, and since the summer the home page has been called the National Data Library. The previous catalog still works.

The types that grew out of this are covered in [Part III](../03-types/01-classification.md).

## Sources

- [INSPIRE Directive 2007/2/EC](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32007L0002)
- [DCAT 3](https://www.w3.org/TR/vocab-dcat-3/)
- [FAIR principles](https://www.go-fair.org/fair-principles/)
- [re3data](https://www.re3data.org/)
- GDS, [What's changing on data.gov.uk and why](https://dataingovernment.blog.gov.uk/2026/03/25/whats-changing-on-data-gov-uk-and-why/), 25 March 2026; the data.gov.uk home page in the Web Archive on [1 April 2026](https://web.archive.org/web/20260401002035/https://www.data.gov.uk/), not yet named National Data Library, and on [2 July 2026](https://web.archive.org/web/20260702152252/https://www.data.gov.uk/), already with that name
- I. Begtin, Telegram (in Russian): [three categories of data catalogs](https://t.me/begtin/2175), 14 October 2020; [relaunch of hubofdata.ru, created in 2010–2011](https://t.me/begtin/2764), 14 April 2021; [hubofdata.ru on CKAN appeared earlier than the government portals](https://t.me/begtin/3559), 12 February 2022; [launch of datacatalogs.ru](https://t.me/begtin/3213), 3 November 2021; [Common Data Index and the catalog registry](https://t.me/begtin/4764), 10 April 2023; [launch of Dateno](https://t.me/begtin/5505), 13 March 2024
- [dataportals-registry](https://github.com/datenoio/dataportals-registry): repository created in March 2023, checked 12 October 2026; [Dateno](https://dateno.io/)
- I. Begtin, [Data discovery in the corporate sector. Part 1](https://begtin.substack.com/p/corporate-data-discovery-1) (in Russian), July 2023: why companies deploy data catalogs
