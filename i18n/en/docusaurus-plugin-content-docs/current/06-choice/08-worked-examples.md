---
title: Worked Examples
description: "Four choice records (a municipality, a region, a university and a statistical office) from task to platform, with criteria and rejected options."
---

# Worked Examples

The four records below take a task all the way to a named platform. Which row to start with is in the chapter ["Typical Scenarios"](./06-scenarios.md). Each is written in the seven sections from the chapter ["Justifying a Decision"](./04-justifying-decisions.md): context, options, criteria, decision, why, consequences, when to review. They are models of the record. For another city or office the sections are filled in afresh: someone else's record drags in someone else's obligation and someone else's price.

The numbers of residents and datasets in the examples are hypothetical. Facts about platforms are taken from the profiles and the October 2026 check.

In brief:

- A record covers one fork. A neighbouring rejection that someone already asked for is named separately so that it is not quietly implemented.
- In the "why" section, each rejected option loses on a named criterion.
- The price stands next to the choice.
- "When to review" is an event the organisation will notice. A new decision is a new record.

| Example | Fork | Where it ends up |
|--------|----------|-----------------|
| Municipality | its own portal, someone else's catalog or a static site | publish on the regional portal |
| Region | which platform will harvest the cities and serve the country | CKAN, ckanext-dcat and ckanext-harvest |
| University | a data repository or an open data portal | Dataverse next to the existing DSpace |
| Statistical office | one site or two catalogs | indicators and microdata on different platforms |

How tasks turn into a feature list and a platform shortlist is in the chapters [on features](./02-feature-selection.md) and [on the platform](./03-from-features-to-platform.md).

## Municipality: don't set up your own portal

**Context.** A city of 40,000 residents. About thirty datasets: the budget, routes, school addresses. They are updated twice a year. The administration has one IT person, who has never maintained a portal. The region already accepts municipal datasets and harvests descriptions in the DCAT-AP profile. The city map is on the regional geoportal. Nobody has asked for a geoportal of its own.

**Options.** Its own CKAN. A cloud portal, Huwise or Socrata. Publishing datasets as an organisation on the regional portal, including in a standard section the region already runs for cities. A static catalog on the city website: JKAN or pages with a description file.

**Criteria.** The region harvests the descriptions without rewriting the records, and the file matches its profile. One person without portal experience updates the datasets twice a year, and still can in three years. The cost is proportionate to thirty datasets. If the criteria conflict, the first matters more: the datasets must reach the region.

**Decision.** Publish the datasets as an organisation on the regional portal. If the region does not set up outside organisations, the city puts up a static catalog with a description file in the profile the region harvests.

**Why.** Its own CKAN loses on the second criterion. Its DCAT dump is not in the core but in the ckanext-dcat extension, and an upgrade means the core plus extensions. With one person without experience, the portal will be left without updates in a year or two. A cloud service loses on the third criterion. It would cover the dataset page, licence, file and dump for the region, but these features already exist on the regional portal. A subscription and a future address migration add a price where there is no installation of one's own. Someone else's contract is not carried over into the record: the sum is taken from an offer for these thirty datasets, as analysed in the chapter [on the build approach](./05-build-or-buy.md). A static catalog remains the fallback if the region does not set up outside organisations. In JKAN the `data.json` file declares the DCAT-US 1.1 schema, and the template fills a short list of fields. The region in this record expects DCAT-AP, so the template is reworked for its profile before publication. [opendata.scot](https://opendata.scot) shows a different case: a static catalog was built when there was no government portal yet. The city in this record already has a higher-level portal.

**Consequences.** The city depends on the regional portal's fields and schedule. There will be no separate domain with a showcase. The dataset gets its licence and persistent address there too: the region will not invent them for the city. Maps stay on the geoportal. If the dataset needs to be linked from the city website, the page points to the region's record rather than creating a second copy.

**When to review.** More than two hundred datasets, a position for portal maintenance appears, or the region stops accepting municipal data. Then a new record is opened. CKAN is not quietly installed on the strength of this one.

## Region: harvest the municipalities and serve the country

**Context.** The region publishes its own open data and must serve descriptions to the national portal. The profile is DCAT-AP plus a few mandatory fields of its own. At the same time the region harvests municipal datasets. There is a contractor, but no development team of its own. Some cities already run a catalog, others will publish directly here, as in the municipality example.

**Options.** CKAN with ckanext-dcat and ckanext-harvest. Piveau. Huwise. Socrata. Its own portal. Not harvesting the cities and leaving them to themselves.

**Criteria.** The dump file passes the validator of the profile the national portal expects, including its own fields, and when the profile changes it is not fixed by a single provider. A city without a catalog publishes a dataset with a file on the regional portal; a city with a catalog serves a description file, and the region harvests it on a schedule. The contractor upgrades the platform on a test instance. If the criteria conflict, matching the country's profile matters more than the showcase and launch speed.

**Decision.** CKAN: the core, ckanext-dcat and ckanext-harvest. A city without its own catalog publishes datasets as an organisation on the regional portal. A city with its own catalog serves a description file, and the region harvests it. The national profile's own fields are set by ckanext-scheming, and the ckanext-dcat profile puts them into the dump. On the same day a separate extension record is written for scheming: what is installed, who maintains it, what to do if the extension goes silent. If the country accepts general DCAT-AP without its own fields, scheming is not installed.

**Why.** Socrata loses on the first criterion, before any talk of price. It has harvesting: the Catalog Connector takes `data.json` and a public ArcGIS Server. Its standard dump file is DCAT-US, while the country expects DCAT-AP.

Huwise loses on the same criterion. Its harvesting is also in the service itself: harvesters for CKAN, Socrata, ArcGIS, `data.json` and other Huwise portals, with CSW harvesting enabled on request through support. Custom fields are set by templates and reach the DCAT dump only if the provider has built a mapping. The contractor sees the national profile in the provider's pilot and cannot edit it in a repository.

Piveau loses on the first criterion as regards custom fields. It can harvest DCAT and publish datasets: data.europa.eu runs on it, and as of October 2026 its input form documents the DCAT-AP and DCAT-AP.de specifications. This country's profile is not on the list. It is added separately and then maintained by the contractor. In CKAN the general DCAT-AP 3 profile is already in ckanext-dcat, custom fields are set by ckanext-scheming, and the same extension's profile puts them into the dump. Automated tests run on CKAN 2.10, 2.11 and 2.12.

Its own portal loses on the first criterion too. Among custom-built open data portals, the registry found a DCAT dump on 24 of 1,144. People will open the site. The national portal will not harvest the descriptions.

The move "leave the cities to themselves" loses on the second criterion: the country will not get the municipal datasets.

Harvesting and the dump in this setup are two extensions, and they do different work. The outgoing DCAT file and parsing someone else's DCAT come from ckanext-dcat. ckanext-harvest provides the queue, the schedule and the error screen. The latest harvest release, 1.6.2, is older than CKAN 2.12, but the main branch's tests include 2.12. The record notes the address of the repository being installed and a harvesting test on an instance of the chosen core version. Details are in the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md).

**Consequences.** At every CKAN upgrade the contractor checks ckanext-dcat, ckanext-harvest and, if installed, ckanext-scheming. A person watches harvesting errors. A copy's dataset page links to the dataset page at the city, otherwise one dataset is counted at the city, the region and the country. The CKAN core has neither the dump nor harvesting: this is a standard setup. The same combination already runs on a live portal: in the 13 October 2026 check, [data.gov.gr](https://data.gov.gr) on CKAN 2.11.3 had scheming, dcat and harvest among its plugins.

**When to review.** The national portal changes its profile, or ckanext-dcat or ckanext-harvest stop being tested on a new CKAN version. Then a replacement extension is sought, or the portal stays on the last core version that still gets security fixes. How to choose between these moves is in the chapter [on justification](./04-justifying-decisions.md#if-an-extension-stops-being-released). If the country obliges regions to work on a single state platform, the region's own setup is closed according to an address migration plan.

## University: a data repository, not "another CKAN"

**Context.** The university already runs a publications repository on DSpace. Grants require depositing data with articles, with a DOI, a version and a citation string that can be exported to BibTeX. Research groups publish, and the library is ready to moderate. There is no separate team for a new application: the same library runs the system. There is little open data from the administration, and it belongs on the university's page or on a government portal. DCAT-AP federation with the government portal is not mandatory at the first step.

**Options.** Extend the existing DSpace. Install Dataverse alongside. Install InvenioRDM alongside. Install nothing and send authors to Zenodo. Install CKAN and add the ckanext-doi extension.

**Criteria.** DOIs, versions, a citation string and BibTeX export are in the core of the version that will be installed. The library moderates records, and a file can be restricted while the description is open. The university has its own DOI prefix. The existing publications repository is not replaced by this record, and the library maintains the new system without a separate team. If the criteria conflict, citation in the core matters more than the wish to make do with one program.

**Decision.** Dataverse next to DSpace. The common entry point is on the library website. The dataset description carries the article's DOI, and the article description carries the dataset's DOI. Groups with one-off datasets can still use Zenodo.

**Why.** CKAN loses on the first criterion. Its DOI is the ckanext-doi extension, which has not been tested on CKAN 2.11 and 2.12. Dataset versions are not in the core. OAI-PMH, which research aggregators use to harvest descriptions, is not in the core either.

DSpace loses on the same criterion, although DOIs in its core are switched on in configuration. Up to and including version 10.1 there is no ready citation and no export to BibTeX and RIS: the core has only meta tags for Google Scholar, and the "Cite" button is being ported from DSpace-CRIS. DSpace 10 introduced a "dataset" item type, but in DSpace repositories datasets remain a small share of records, and the type filter in search is off by default. The library will be able to extend the publications repository into a data repository when citation export appears in the core. Until then, data goes into a separate system.

Zenodo loses on the third criterion. It has DOIs, versions and citation, no installation is needed, and a record can hold up to 50 GB and 100 files. The DOI prefix is shared, and the library does not moderate groups.

InvenioRDM covers DOIs, versions and BibTeX in the core. Its platform profile assigns it to an organisation ready to maintain a Python application. This library has no such readiness, so it does not stay on the shortlist. It suits a university with a separate team and an obligation to serve DCAT itself: InvenioRDM has a DCAT dump in its core, Dataverse does not. In this record federation with the government portal is not mandatory, and a DCAT dump does not tip the decision.

**Consequences.** The library has two systems. The "article and data" link is kept by identifiers in the descriptions. This record does not promise a common search across them. An agreement with DataCite is needed if there is none yet. A direct member pays 2,000 euros a year plus an infrastructure fee of 200 to 700 euros; a consortium participant pays only the fee. Universities usually get a prefix through a library consortium. Until there is a prefix, groups use Zenodo. Production DOIs are not issued from a test account: a mistake in the production system is hard to fix, and DOIs are not deleted.

**When to review.** Nobody is left to maintain two systems: the university's own Dataverse is closed, and an arrangement is made with Zenodo or a shared consortium repository. A DSpace version comes out with a citation string and BibTeX in the core on a par with Dataverse: a new record on merging is opened. An obligation appears to serve descriptions in DCAT-AP itself: the record is reopened and InvenioRDM is looked at again.

## Statistical office: indicators and microdata are different catalogs

**Context.** A national statistical office runs two shelves that people often try to cover with one site. The first is indicators with dimensions of time and territory, and SDMX exchange with international organisations. The second is anonymised survey files: the description is open, the file is on request, and the description follows DDI.

**Options.** One custom-built "all statistics" site. Two catalogs: an indicator platform and NADA for microdata. Only an indicator platform, with microdata sent by email.

**Criteria.** A program gets a slice of an indicator by year and territory, and an international partner harvests SDMX. A survey has an open description, access levels and a DDI description. The office does not write both systems itself. Losing either of the first two criteria means the catalog is not ready for work.

**Decision.** Two catalogs. Microdata go on NADA. The next record chooses the indicator platform. On the office website both entry points stand side by side, and the captions say plainly how the indicator shelf differs from the survey shelf. Indicators are not put inside NADA. Since release 5.6 the platform can describe them, but a capability does not yet make the catalog a hybrid: in the World Bank Microdata Library all 7,145 records are surveys, and the bank publishes indicators on a different platform.

**Why.** A custom-built site loses on the third criterion and usually on the first. Among indicator catalogs, 44% are custom-built, which is 1,505 showcases according to the dataportals-registry export (release 1.27.0 of 15 October 2026). Programmatic access exists for 37% of catalogs of this type. Among custom-built showcases, an API is marked for 8%. SDMX and access levels would have to be written into such a site, and not abandoned. Email instead of a catalog loses on the second criterion: a study cannot be found or cited while it is not in a catalog. NADA covers access levels and DDI in the core. Dataverse is closer to a university archive: DOIs and OAI-PMH are in its core, but it lacks the seven access types.

**Consequences.** Two systems to maintain and two addresses. Users get confused if the captions on the site do not distinguish the shelves. A live model of this arrangement is Mexico's INEGI: indicators, microdata on NADA, a geoportal and open data stand side by side and are recorded as different catalogs. NADA is installed on the office's domain, and maintenance, not only installation, is budgeted. Of 59 non-working microdata catalogs, 47 are abandoned NADA installations left after support projects. NADA has no OAI-PMH. It does not register DOIs: there is a field for an already minted DOI, and minting is a separate task. If the office needs exchange with archives such as CESSDA or its own DOI prefix, that is the next record, not a reason to quietly move to Dataverse. Nesstar is not considered for a new catalog: it was declared obsolete with version 4.0 in 2015 and withdrawn by 2022.

**When to review.** NADA stops being released: a successor is sought in advance, without waiting until the site is left without updates. As of October 2026 this event has not happened: release 5.7.1 came out on 4 October. Exchange with social science data archives becomes a duty: a record on OAI-PMH and DOIs is opened.

### Which indicator platform

**Context.** The previous record has already separated indicators and microdata. This one chooses only the indicator shelf. SDMX exchange is mandatory. There is no large development team of its own, and the budget for consultants is limited.

**Options.** PxWeb only. .Stat Suite only. PxWeb for the showcase, with .Stat Suite or SDMX-RI separately as the exchange point.

**Criteria.** There is an API and selection by dimensions. An international partner receives SDMX with structures and code lists. The office can sustain maintenance of what it installs. If the familiar interface does not cover exchange, exchange matters more than the interface.

**Decision.** If SDMX consultants are available and exchange is the main duty, indicators go on .Stat Suite: the SDMX service is in its core, using SDMX-RI inside. If the team already knows PxWeb and exchange is needed alongside, the showcase goes on PxWeb. New installations go straight onto PxWebApi 2. The SDMX point is added as a separate product, .Stat Suite or SDMX-RI. Two statistical products are a normal setup here: a showcase for people and a service for exchange.

**Why.** PxWeb alone loses on the second criterion. It has no full SDMX service: the old API serves an SDMX-ML 2.0 file, and PxWebApi 2 has no SDMX format. The analysis is in the chapter [on indicator catalogs](../03-types/05-indicator-catalogs.md#reusable-statistical-software). .Stat Suite alone covers the API and SDMX and loses on the third criterion if there are no consultants: without them it is rarely installed. A custom-built showcase on top of this pair is not made. The ECB and Statistics Canada portals sit on top of an API and bulk download. The office in this record does not have such a team.

**Consequences.** With "PxWeb plus an exchange point", two statistical products are maintained, not counting NADA. Moving to PxWebApi 2 changes query addresses. A converter translates old links, the old API is kept until users have moved, and a switch-off date is announced in advance. In .Stat Suite the data explorer and the SDMX service are different modules, and both are upgraded.

**When to review.** International exchange moves from SDMX to another mandatory protocol. A team that knew only PxWeb gets SDMX consultants and decides to remove the separate exchange point: that is a new record.

## What the examples have in common

A rejection is recorded as explicitly as a choice. The price is named. Review is tied to an event.

| Example | What was rejected and on which criterion | What it costs | When to reopen the record |
|--------|-----------------------------------|------------|--------------------------------|
| City | its own CKAN: nobody to upgrade it; the cloud: the same features already exist at the region | dependence on the region's fields and schedule; no showcase on its own domain | more than two hundred datasets, a maintenance position, the region stops accepting data |
| Region | Socrata: a DCAT-US file; Huwise and Piveau: the country's own profile is maintained by the provider or a contractor; its own site: a DCAT dump is rare | extensions checked at upgrades, and a person for harvesting errors | the profile changes, an extension is not tested on a new core version, the country requires one platform |
| University | CKAN and DSpace alone: no citation in the core; Zenodo: no prefix of its own | two systems and an agreement with DataCite | nobody to run two systems; DSpace gains citation export; its own DCAT-AP is needed |
| Statistical office | one custom-built site: the API and SDMX would have to be written in-house; email: surveys cannot be found | two addresses for indicators and microdata, and with PxWeb an SDMX exchange point as well | NADA stops being released; exchange moves away from SDMX |

Someone else's row of this table does not suit another owner. A region needs a setup that a city has nobody to maintain. A university Dataverse does not become an open data portal for the administration. NADA since release 5.6 does not replace an indicator catalog.

## Sources

- [Justifying a Decision](./04-justifying-decisions.md), [selecting features](./02-feature-selection.md), [from features to a platform](./03-from-features-to-platform.md), [build, open source or SaaS](./05-build-or-buy.md): the record template, the region's matrix, and why someone else's contract is not carried over into a record.
- [CKAN: Core and Extensions](../05-platforms/03-ckan-and-extensions.md): ckanext-dcat, ckanext-harvest 1.6.2 and tests on CKAN 2.12, ckanext-scheming, ckanext-doi; extensions checked 11 October 2026. The live plugin list of data.gov.gr, 13 October 2026, in the chapter [on platform profiles](../05-platforms/04-platform-profiles.md).
- [Metadata Export](../04-features/02-metadata-export.md): JKAN's `data.json` file declares the DCAT-US 1.1 schema and fills a short list of fields; Socrata's standard file is DCAT-US; ckanext-dcat's default profile is DCAT-AP 3.
- [Huwise harvesters](https://userguide.huwise.com/en/categories/480514), checked 14 October 2026; [Socrata's Catalog Connector](https://support.socrata.com/hc/en-us/articles/223722647-Using-the-Catalog-Connector-to-Federate-and-Connect-External-Assets).
- [The Piveau input form](https://doc.piveau.eu/dpi/introduction/): declared support for DCAT-AP and DCAT-AP.de, checked 14 October 2026. Harvesting as the core's main job is covered in the chapter [on federation](../07-publishing/03-federation-and-harvesting.md).
- [Research Repositories](../03-types/04-scientific-repositories.md): DOIs, versions and citation in Dataverse, InvenioRDM and DSpace 10.1; Zenodo limits. DataCite fees are in the chapter [on identifiers](../04-features/06-identifiers-and-doi.md).
- [Indicator catalogs](../03-types/05-indicator-catalogs.md): 1,505 custom-built showcases, an API for 37% of catalogs of the type and 8% of custom-built ones, PxWeb and SDMX. [Microdata catalogs](../03-types/06-microdata-catalogs.md): NADA 5.7.1 of 4 October 2026, 47 of 59 non-working catalogs, the withdrawal of Nesstar. [Comparison of types and hybrids](../03-types/11-comparison-and-hybrids.md): INEGI and the 7,145 surveys of the World Bank library.
- [opendata.scot](https://opendata.scot): a static catalog built while there was no government portal; analysis in the chapter [on publishing without a portal](../08-beyond-portals/01-when-portal-not-needed.md).
- Shares of DCAT among custom-built portals and of APIs among indicator catalogs: the dataportals-registry export, release 1.27.0 of 15 October 2026.
