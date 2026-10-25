---
slug: /
title: A Book About Public Data Catalogs and Portals
sidebar_label: About This Book
sidebar_position: 0
description: "A book about data catalogs and portals (open data, geospatial, research and statistical): what they can do, how to choose a platform, and how to publish data, including without a portal."
pagination_next: basics/what-is-a-data-catalog
---

# Data Catalogs

*How open data portals, geoportals and repositories work, and how to choose your own.*

<div className="home-hero">

![A paper model: cards rise from an open book — a temple, a map, a leaf and a molecule diagram. Islands behind the book are linked by bridges and hold a classical building, a river, an observatory, charts and a molecular model](/img/home/data-catalogs-hero.webp)

</div>

<div className="author-card">

![Portrait of Ivan Begtin](/img/author/ivan-begtin.webp)

**Author: Ivan Begtin**, founder and director of the non-profit Infoculture ("Information Culture"), founder and CTO of the [Dateno](https://dateno.io/) dataset search engine. He has worked on open data since 2009 and on catalogs since 2010: from the community Hub of Open Data to the worldwide catalog registry from which this book's figures are calculated. More in the chapter ["About the Author"](./13-about-the-author.md).

</div>

<div className="sponsor-card">

[![Dateno logo](/img/dateno/dateno-logo.svg)](https://dateno.io/)

**This book and the data catalog knowledge base are supported by [Dateno](https://dateno.io/)**, a search engine for datasets. Dateno collects dataset descriptions from thousands of catalogs around the world (open data portals, geoportals, research repositories and statistical offices) and lets you search them in one place. As of 16 October 2026 it holds 22 million datasets from 5,236 sources.

</div>

October 2026 edition. The text is available under a [CC BY 4.0](#about-this-edition) licence. This is the English translation of the Russian original.

**Download the book as PDF:** [in English](pathname:///data-catalogs-book-en.pdf) · [in Russian](pathname:///data-catalogs-book.pdf). The Russian version of the site is in the language switcher in the menu.

A **data catalog** is a service that describes datasets and helps people find, understand and obtain them. This book is about public catalogs: open data portals, geoportals, research repositories, statistics catalogs and machine learning dataset catalogs. It explains what kinds of catalogs exist and what they can do, how to choose features and a platform and justify the choice, and how to publish data, on a portal or without one.

Enterprise catalogs that describe data inside a company (Collibra, Alation, DataHub) are mentioned only for comparison.

If you are looking for data rather than a catalog, start by searching [Dateno](https://dateno.io/). How it relates to the book's figures is explained in ["Where the numbers come from"](#where-the-numbers-come-from).

## Where to start

You do not need to read the book in order. Pick your task: under it are 4–6 chapters in reading order and what you will have at the end. If none of the tasks fits, go through the [route map](./06-choice/01-route-map.mdx): eight questions, about five minutes.

<details>
<summary><strong>You have been asked to launch an open data portal</strong>: a government body, region or city · 6 chapters, about 1 h 15 min</summary>

1. [Decision Route Map](./06-choice/01-route-map.mdx): a first pointer to the catalog type and platform.
2. [Typical Scenarios](./06-choice/06-scenarios.md): find your row: central government, region or municipality.
3. [When You Don't Need a Portal](./08-beyond-portals/01-when-portal-not-needed.md): perhaps a regional or national portal already covers the task.
4. [Selecting Features](./06-choice/02-feature-selection.md): a feature list built from tasks, not from marketing.
5. [Requirements Checklist](./06-choice/07-requirements-checklist.md): what to put in the specification.
6. [Justifying a Decision](./06-choice/04-justifying-decisions.md): a decision record for your manager and for the next person in the job.

**At the end you have:** an answer to whether you need your own portal, a feature list for the specification and a decision record.

</details>

<details>
<summary><strong>Choose a platform or write a specification</strong> · 6 chapters, about 1 h 45 min</summary>

1. [Capability Map](./04-features/01-capability-map.md): which capabilities exist and what is typical for your catalog type.
2. [Selecting Features](./06-choice/02-feature-selection.md): every feature gets five notes: whose task it is, how mandatory, why, how to check it, when to review.
3. [From Features to a Platform](./06-choice/03-from-features-to-platform.md): how to turn a feature list into a platform shortlist.
4. [Extension Ecosystems](./05-platforms/02-extension-ecosystems.md): how to check an extension before the platform gets on the list.
5. [Platform Profiles](./05-platforms/04-platform-profiles.md): what each platform has in the core, what in extensions, and its limitations.
6. [Requirements Checklist](./06-choice/07-requirements-checklist.md).

**At the end you have:** a platform shortlist marked "core", "extension" and "no", and requirements for the specification.

</details>

<details>
<summary><strong>Publish data for a paper and get a DOI</strong> · 5 chapters, about 1 h 35 min</summary>

1. [Research Data Repositories](./03-types/04-scientific-repositories.md): Zenodo, a discipline repository or a university repository.
2. [Persistent Identifiers, DOIs and Versions](./04-features/06-identifiers-and-doi.md): how a version DOI differs from a concept DOI.
3. [Citation Export](./04-features/07-citation.md): how the dataset will be cited and why you need a `CITATION.cff` file.
4. [Licences and Access Conditions](./07-publishing/04-licenses-and-access.md): which licence to choose and what it allows.
5. [Making a Publication Findable](./08-beyond-portals/05-making-it-findable.md): so that search engines and aggregators find the dataset.

**At the end you have:** a chosen repository, a DOI, a licence and a citation file.

</details>

<details>
<summary><strong>Publish a few datasets without your own portal</strong> · 4 chapters, about 50 min</summary>

1. [When You Don't Need a Portal](./08-beyond-portals/01-when-portal-not-needed.md): five questions before installing anything.
2. [Static Sites](./08-beyond-portals/02-static-sites.md) or [Git Repositories](./08-beyond-portals/03-git-repositories.md): choose one approach.
3. [Making a Publication Findable](./08-beyond-portals/05-making-it-findable.md): a dataset page, a description file and links from other catalogs.
4. [The "Minimum publication without a portal" checklist](./12-appendices/04-checklists.md#the-minimum-for-publishing-without-a-portal) and [file templates](pathname:///templates/README.md): README, `datapackage.json`, `CITATION.cff`, schema.org markup.

**At the end you have:** a page or repository with dataset descriptions that search engines and aggregators can find.

</details>

<details>
<summary><strong>Collect descriptions from many catalogs</strong>: a search engine or aggregator developer · 5 chapters, about 1 h 50 min</summary>

1. [Dataset Search Engines and Aggregators](./03-types/09-search-engines-aggregators.md): how a search engine differs from an aggregator.
2. [Metadata Export](./04-features/02-metadata-export.md): DCAT, schema.org and what platforms actually serve.
3. [APIs and Bulk Download](./04-features/04-access-interfaces.md): a full dump versus a search API.
4. [Federation and Harvesting](./07-publishing/03-federation-and-harvesting.md): how descriptions are collected and where records get lost.
5. [Metadata Standards](./07-publishing/02-metadata-standards.md): which description language each recipient reads.

**At the end you have:** which protocols and formats to take from each catalog type and what losses to expect.

</details>

<details>
<summary><strong>A statistics office: indicators and microdata</strong> · 5 chapters, about 2 h</summary>

1. [The worked example of a statistics office](./06-choice/08-worked-examples.md#statistical-office-indicators-and-microdata-are-different-catalogs): why these are two catalogs, not one.
2. [Indicator Catalogs](./03-types/05-indicator-catalogs.md): time series, SDMX, PxWeb and .Stat Suite.
3. [Microdata Catalogs](./03-types/06-microdata-catalogs.md): anonymised records, DDI, NADA and access on request.
4. [Platform Profiles](./05-platforms/04-platform-profiles.md): PxWeb, .Stat Suite and NADA.
5. The checklists for an [indicator catalog](./12-appendices/04-checklists.md#indicator-catalog) and a [microdata catalog](./12-appendices/04-checklists.md#microdata-catalog).

**At the end you have:** two catalogs with different standards and a platform shortlist for each.

</details>

<details>
<summary><strong>Check and improve your own catalog</strong> · 4 chapters, about 45 min</summary>

1. [Quality Levels](./10-quality/01-quality-levels.md): which level an assessment touches and who is responsible for it.
2. [Catalog Self-Audit](./10-quality/04-self-audit.md): how to go through your catalog in one pass.
3. [Anti-patterns](./09-practices/02-anti-patterns.md): typical failures and where they come from.
4. [Good Practices](./09-practices/01-good-practices.md): six things without which a dataset cannot be found or used.

To check a live site, use the [live portal checklist](./12-appendices/04-checklists.md#checking-a-live-portal).

**At the end you have:** a list of problems by quality level and the order in which to fix them.

</details>

## The book in nine theses

1. **A catalog is descriptions, not a file store.** Without a description, a link to a file is not yet a catalog. → [What Is a Data Catalog](./01-basics/01-what-is-a-data-catalog.md)
2. **The catalog type sets what is published in it.** The type determines the description standard and the range of suitable platforms. → [How to Classify Catalogs](./03-types/01-classification.md)
3. **You do not always need your own portal.** While there are few datasets and publishers, data is published in someone else's catalog, on your own site, in a repository or on a shared hub. → [When You Don't Need a Portal](./08-beyond-portals/01-when-portal-not-needed.md)
4. **Features are chosen by task**, not by a platform's marketing or someone else's specification. → [Selecting Features](./06-choice/02-feature-selection.md)
5. **Every feature has an address:** the platform core, a named extension, or nowhere. If a mandatory feature depends on an extension that is not tested on your core version, the platform is struck off. → [Extension Ecosystems](./05-platforms/02-extension-ecosystems.md)
6. **The build model is chosen before the brand.** A platform is useless if nobody can update it. → [Build, Open Source or SaaS](./06-choice/05-build-or-buy.md)
7. **The decision is written down.** A decision record explains to the next person in the job which commitment the platform fulfils and when to review the choice. → [Justifying a Decision](./06-choice/04-justifying-decisions.md)
8. **A dataset is published when an outsider can use it:** they find the page, open the file, read the licence and know who is responsible for the data. → [The Publishing Process](./07-publishing/01-publishing-process.md)
9. **Quality has four levels.** A high score on one does not fix the others. → [Quality Levels](./10-quality/01-quality-levels.md)

## Contents

Times are estimates for reading straight through, without code examples. About 17 hours in total.

- **[I. What Is a Data Catalog](/basics/)** · 4 chapters, 30 min: the definition, how a catalog is built, the world of catalogs in numbers.
- **[II. What Data Gets Published](/data/)** · 2 chapters, 25 min: what is published, units of publication and formats.
- **[III. Types of Catalogs](/types/)** · 11 chapters, 4 h 30 min: open data portals, geoportals, research repositories, statistics, ML, metadata, aggregators and hybrids.
- **[IV. Catalog Capabilities](/features/)** · 10 chapters, 3 h 40 min: metadata export, APIs, storage, DOIs, citation, access and roles.
- **[V. Platforms and Extensions](/platforms/)** · 4 chapters, 1 h 10 min: software classes, core and extensions, CKAN, platform profiles.
- **[VI. Choosing a Catalog](/choice/)** · 8 chapters, 1 h 40 min: the route map, choosing features and a platform, justification, scenarios and examples.
- **[VII. Publishing Data](/publishing/)** · 5 chapters, 1 h 10 min: the process, metadata standards, federation, licences, discoverability.
- **[VIII. Publishing Without a Portal](/beyond-portals/)** · 5 chapters, 1 h: static sites, Git, cloud storage and hubs.
- **[IX. Practices](/practices/)** · 4 chapters, 50 min: good practices, anti-patterns, lifecycle, archiving.
- **[X. Catalog Quality](/quality/)** · 4 chapters, 50 min: levels, metrics, methodologies and indices, self-audit.
- **[XI. Trends](/trends/)** · 2 chapters, 40 min: AI, data spaces and regulation; what leading catalogs can already do.
- **[Appendices](/appendices/)** · reference: glossary, using the registry, platform tables, checklists, bibliography.
- **[About the Author](./13-about-the-author.md)**: who wrote the book and how his projects relate to its figures.

## How chapters are built

- **Conclusion first.** A chapter opens with its main conclusion; details and examples follow.
- **Core, extension or no.** In the chapters on capabilities and in the platform profiles, every feature says where it lives: in the platform itself, in a separate module with its own author and releases, or nowhere.
- **Decision record**: one or two pages about a choice: context, options, criteria, decision, rationale, when to review. The template is in the chapter ["Justifying a Decision"](./06-choice/04-justifying-decisions.md#template).
- **Dates on facts.** Software versions and the state of websites change, so facts are recorded "as of October 2026". The last section of every chapter is "Sources".
- **An unfamiliar word**: look it up in the [glossary](./12-appendices/01-glossary.md).

Ready-made materials: [checklists](./12-appendices/04-checklists.md), [platform comparison tables](./12-appendices/03-platform-tables.md), [file templates](pathname:///templates/README.md) and [catalog registry queries](./12-appendices/02-using-the-registry.md).

## Where the numbers come from

Figures on the number of catalogs and platforms were calculated from the open [dataportals-registry of data catalogs](https://github.com/datenoio/dataportals-registry), [release 1.27.0](https://github.com/datenoio/dataportals-registry/releases/tag/v1.27.0) of 15 October 2026. It describes 43,614 catalogs and 790 platforms. The main queries behind the book's figures are collected in the [appendix on the registry](./12-appendices/02-using-the-registry.md): on this release they give the same numbers. The registry is updated every few days, and newer releases will give different numbers.

The registry was originally built for the [Dateno](https://dateno.io/) dataset search engine, and Dateno still indexes portals from their registry descriptions: from a record it learns the catalog's platform and API addresses, and from those which harvester to use for collecting datasets. As of 16 October 2026 Dateno holds 22 million datasets from 5,236 sources. Why some catalogs are easy to harvest while the harvester never reaches others is explained in the chapters ["Search Engines and Aggregators"](./03-types/09-search-engines-aggregators.md#harvester-using-catalog-protocols) and ["Discoverability"](./07-publishing/05-discoverability.md#aggregators-and-registries).

Software versions and platform capabilities were checked against primary sources in October 2026.

## About this edition

**Author:** [Ivan Begtin](./13-about-the-author.md). **Edition:** October 2026. This English edition is a translation of the Russian original.

**Support.** The book and the knowledge base are supported by the [Dateno](https://dateno.io/) project, a search engine for datasets. The author is the founder and CTO of Dateno; how this affects the book's sources is explained in the chapter ["About the Author"](./13-about-the-author.md#the-author-and-the-books-sources).

**Licence.** The text is distributed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) licence. You may copy it, translate it and use it in your own materials, including commercial ones, as long as you credit the author and link to the book.

**How to cite.**

> Begtin I. Data Catalogs: How Open Data Portals, Geoportals and Repositories Work, and How to Choose Your Own. October 2026 edition. URL: https://datacatalogs.begtin.tech/en/ (accessed: DD Month YYYY).
