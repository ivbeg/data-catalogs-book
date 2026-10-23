---
title: Requirements Checklist
description: What to write in a catalog specification, and how to mark which scenario makes an item mandatory.
---

# Requirements Checklist

An item without a link to an explanation turns into a line copied from someone else's specification. Below, every item has a chapter that says when you can do without it. Which items are typical for a ministry, a city, a university or a company is in the chapter ["Typical Scenarios"](./06-scenarios.md). The scenario row gives a draft of what is mandatory; in the specification it is checked again.

In a specification each item has three marks (mandatory, desirable, not needed) and one sentence on where the need comes from. A blank "mandatory" on everything makes comparing platforms pointless.

## Minimum for any publishing approach

Even for a static site with a dozen datasets.

- [ ] A persistent address for every dataset and file: [identifiers](../04-features/06-identifiers-and-doi.md). Mandatory for everyone.
- [ ] A licence on every dataset, not only on the site: [licences](../07-publishing/04-licenses-and-access.md). Mandatory for everyone.
- [ ] A file with all descriptions: [metadata export](../04-features/02-metadata-export.md). Mandatory for any catalog of several datasets, including a small site: one `data.json` or `datapackage.json` file is enough. A page with a single dataset does not need it.
- [ ] A sitemap and schema.org markup: [metadata export](../04-features/02-metadata-export.md). Mandatory if the dataset must be found by search.
- [ ] Update date and frequency: [metadata completeness](../04-features/03-metadata-depth.md). Mandatory if the data is updated.
- [ ] The contact of the person responsible. Mandatory for everyone.
- [ ] Descriptions readable without registration or a captcha: [APIs and bulk download](../04-features/04-access-interfaces.md). Mandatory for everyone who may be harvested automatically.

## Include only if there is a task

- [ ] A search API: mandatory when there are hundreds of datasets or more. Not needed for a static site.
- [ ] Your own file storage and a table API: [storage](../04-features/05-data-storage.md). Mandatory for a research repository (files). Desirable for an open data portal. Not needed for a geoportal that links to services.
- [ ] DOIs and versions: [identifiers](../04-features/06-identifiers-and-doi.md). Mandatory for a research repository. Not needed for operational data.
- [ ] Citation export: [citation](../04-features/07-citation.md). Mandatory for a research repository. Desirable if the data is cited in analytics.
- [ ] Custom fields and multiple languages: [metadata completeness](../04-features/03-metadata-depth.md). Mandatory if the law or the country requires it. Otherwise desirable or not needed.
- [ ] Roles, moderation, restricted access: [access and workflows](../04-features/08-access-control-and-workflow.md). Roles are mandatory when more than one team publishes. Restricted access is mandatory for microdata and sensitive files.
- [ ] Harvesting other catalogs: [other capabilities](../04-features/10-other-capabilities.md). Mandatory for a regional and national portal. Not needed for an agency that publishes only its own data.
- [ ] Full-text search over descriptions, preview, statistics and a feedback form: [other capabilities](../04-features/10-other-capabilities.md). Search is mandatory when there are hundreds of datasets or more. The rest are included by the threshold from the chapter: there is a task and someone to use it.

## New capabilities

These are not yet in the core of mainstream platforms. The item is written only if the task is named. What lies behind each is in the chapter [on leading catalogs](../11-trends/02-innovative-catalogs.md).

- [ ] An API for every tabular file without manual loading, with a column profile and a query description. Desirable for a portal with hundreds of tables that people filter. Not needed if files are downloaded whole.
- [ ] Validating a file against a schema on upload, with rejection on error. Desirable if common schemas already exist for the tables. Mandatory for a domain archive with a common standard, such as BIDS in neuroimaging.
- [ ] A read-only MCP server, without a key for open datasets, on top of the public API, with instructions for the agent: [AI and data spaces](../11-trends/01-ai-and-data-spaces.md#what-to-switch-on-by-default). Desirable if the platform provides it and licences and the dump are already in place. Do not write your own for the sake of a report.
- [ ] A DOI for a saved query or releases with a stated retention period: [citation](../04-features/07-citation.md#citing-changing-data). Desirable if slices of the data are cited in papers. Not needed for operational data.
- [ ] Persistent identifiers for objects within the data and a mapping table from old numbers: [identifiers](../04-features/06-identifiers-and-doi.md#identifiers-of-objects-within-data). Mandatory for a register or a reference list. Not needed for a one-off report.
- [ ] Tiered access: the description and summary statistics are open, the data comes in tiers. Mandatory for sensitive data that researchers need access to. Not needed for open data.
- [ ] Server-side selection and computation. Desirable if the data does not fit in a file. The catalog and the computation are described as separate items: shutting down the computation must not shut down the catalog.

## By catalog type

- Geoportal: an ISO 19115 catalog and a CSW or OGC API Records service; the layer can be downloaded, or it says honestly that only viewing is available.
- Research repository: DOIs, versions, OAI-PMH, citation export.
- Indicator catalog: SDMX or other machine access to the table, a description of the methodology.
- Microdata catalog: access levels, a study description, a log of requests.
- ML catalog: a Croissant description, dataset versions with an unchanging split into training and test parts, a licence and data provenance.

## When comparing platforms

- [ ] Every mandatory feature is marked: core, which extension and who maintains it, customisation, or impossible: [from features to a platform](./03-from-features-to-platform.md).
- [ ] Every fork (platform, mandatory extension, rejection of a requested feature) has a decision record with the event that reopens it: [justifying a decision](./04-justifying-decisions.md).
- [ ] It has been counted how many extensions will have to be checked at each upgrade.
- [ ] It is written how to get the data out and keep the addresses if the build approach has to change: [the cost of leaving](./05-build-or-buy.md).

## After launch

- [ ] Someone checks that links and services open.
- [ ] Open registration is switched off if outside people do not publish, or moderation is switched on: [access and roles](../04-features/08-access-control-and-workflow.md). Mandatory for portals upgraded from old CKAN versions.
- [ ] There is a closure plan: where the data will go and which addresses will redirect: [lifecycle](../09-practices/03-lifecycle.md).
- [ ] The catalog can be found from outside: registration in relevant registries and markup, not just a news item on the site.

## Sources

- [Capability Map](../04-features/01-capability-map.md)
- [Worked Examples](./08-worked-examples.md)
- [What Leading Catalogs Already Do](../11-trends/02-innovative-catalogs.md)
