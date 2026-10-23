---
title: Selecting Features
description: How to turn the tasks of the owner, the users and external obligations into a verifiable list of catalog features, with levels, costs and conditions for review.
---

# Selecting Features

A catalog's feature list is built from tasks, not from a platform's advertising and not from someone else's specification. Each feature in the final list carries five marks: whose task stands behind it, how mandatory it is, why, how to check it on the live site and when to return to the decision. Such a list can go into a specification and be used to compare platforms.

The [route map](./01-route-map.mdx) gives a first bearing in a few minutes, and the [capability map](../04-features/01-capability-map.md) shows what exists at all and what is typical for your type of catalog. This chapter is a way to apply both maps to your own case.

In brief:

- **Start with what already exists.** Some tasks are covered by existing sites, services and other people's catalogs. A new catalog is often needed to put order into what is already published, not to publish from scratch.
- **Every feature has a source**: an owner's task, a user's task or an external obligation. A feature without a source is a candidate for deletion, even if "everyone has it".
- **The minimum is mandatory for everyone**; the rest is switched on by the catalog type and specific obligations.
- **"Mandatory" is checked with a question**: which task will fail on launch day without this feature, and who will notice. No answer means "desirable".
- **A feature has a cost**, and the cost depends on where the feature lives: in the platform core, in an extension, in your own customisation or outside the portal.
- **A rejection is recorded just like a choice**, together with the event after which it will be revisited.

## Capability, feature, requirement

The book uses three close words, and they are worth telling apart.

- **Capability**: what catalogs can do in general: serve descriptions in DCAT, issue a DOI, restrict a file while the description stays open. Capabilities are the subject of the part ["Catalog Capabilities"](../04-features/01-capability-map.md).
- **Feature**: a capability you have chosen for your catalog because someone's task stands behind it.
- **Requirement**: a feature written into a **specification** (the document from which a contractor builds or configures the system), together with its level, justification and verification method.

This chapter turns tasks into features and features into requirements. The international requirements engineering standard ISO/IEC/IEEE 29148:2018 lists the properties of a good requirement. Four matter most for a catalog:

- **necessary**: someone's need stands behind it, and that need can be named;
- **says "what", not "how"**: "the national portal harvests our descriptions in the DCAT-AP profile" is a requirement, "install ckanext-dcat" is already a solution, made at the next step;
- **singular**: one feature per item. "Convenient modern search with an API and a map" is three items, not one;
- **verifiable**: you can show whether it is met or not.

## Step 1. Describe what already exists

Before the feature list, make an inventory: what data the organisation already publishes and where. A "Documents" section on the website, tables attached to news items, information system APIs, a map server, pages in other people's catalogs, dumps sent on request. For each item, write down who uses it and what will break if it is moved.

The inventory gives two things. First, some tasks are already solved: layers live on a map server, research data sits in Zenodo, statistics are served through an API. The catalog only has to describe and link them, not repeat them. Second, it shows what must not break: addresses people link to and programs that fetch files on a schedule.

An example is Kazakhstan. In February 2023 the national open data portal [data.egov.kz](https://data.egov.kz) released data only after login with an individual identification number through the state identity service, so it was not really open. Meanwhile, government bodies had more publicly available machine-readable data than the portal did: the open API of the "Taldau" statistics system without authorisation, the programming interface of the gov.kz government site, the geological service's map services on ArcGIS. In this situation the portal's main job is to systematise what is already published, and its features are different: describing and harvesting other people's services, not accepting files by hand. In April 2023 mandatory registration on the portal was abolished, but it began serving no more than 100 records at a time: see the chapter [on anti-patterns](../09-practices/02-anti-patterns.md#the-door-is-closed-to-programs). The Taldau API documentation is open in October 2026.

If the inventory shows that the tasks are already covered, you may not need your own catalog. When this happens is covered in the chapter ["When You Don't Need a Portal"](../08-beyond-portals/01-when-portal-not-needed.md).

## Step 2. Collect the tasks

A feature has three possible sources:

- **an owner's task**: report under the law, meet the conditions of a grant, sell a service, stop answering the same emails;
- **the task of someone who uses the data**: download a table, cite it in an article, fetch descriptions with a program, build an application;
- **an external obligation**: the national portal harvests descriptions in DCAT, a journal requires a DOI, a spatial data infrastructure requires a catalog of layers.

Where to find tasks:

- **Emails and requests** asking for data. Every request is a user's task; a recurring one is a candidate for mandatory.
- **Statistics of the existing site**: what is downloaded and what is searched for but not found. Searches that returned nothing are a ready-made list of gaps.
- **Conversations with real users** in each group: analysts, researchers, developers. The conversations can stop when the answers start repeating. What different groups expect is in the chapter ["Why Catalogs Are Built and Who Uses Them"](../01-basics/02-why-and-for-whom.md#what-different-people-expect).
- **A list of obligations**: the law and regulations, the higher-level portal's requirements for the description profile, grant conditions, sector infrastructures such as INSPIRE or SDMX exchange. Each obligation is recorded with a link to the document.
- **Editorial tasks**: who will create descriptions, how many, how often they will be updated, where they will come from. This group is forgotten most often, yet roles, bulk upload of descriptions and harvesting from records systems depend on it.

Separately, write down the tasks of programs: the higher-level portal, dataset search engines, harvesters, AI agents. They do not write emails, so their tasks are formulated on their behalf. Usually this is exactly the minimum from the next step.

A task is written in the form "who does what, and why". "A ministry analyst compares air quality by district every month" is a task. "We need a modern portal" is not: it is unclear who will do what on it.

## Step 3. Turn a task into a feature

One task usually yields several features, and not always the ones that come to mind first.

<div className="wide-table">

| Task | Features that follow from it | What is often asked for instead |
|--------|------------------------------|-------------------------|
| A journalist downloads budget execution once a year and compares it with the previous year | a CSV or XLSX file, a licence, an update date, previous years at persistent addresses | a preview with charts |
| The national portal harvests the region's descriptions | a dump in the DCAT-AP profile at a persistent address, a licence on every dataset | a table of datasets emailed once a quarter |
| An app developer shows hourly air measurements | a file or API at a persistent address, scheduled updates, a description of the fields | a "modern API" without a description of what it serves |
| A PhD student cites data in a dissertation | a persistent address for the dataset and the file; a DOI and versions only if the data changes and a specific state must be cited | a DOI for every dataset |
| A grant requires depositing data with an article | a DOI, a version, a citation string, often in a general research repository | a separate repository in every lab |
| A dataset search engine finds a dataset | schema.org markup, a sitemap, descriptions without registration | promoting the portal on social media |
| Twenty departments publish on their own | organisations, roles, review before publication | one account for everyone |
| An agency reports the number of datasets | this is not a user's task, features are not derived from it | [splitting one series](../09-practices/02-anti-patterns.md#fragmentation-to-boost-the-count) into hundreds of datasets for the counter |

</div>

If a ready-made solution arrives instead of a task ("install CKAN", "do it like the neighbours", "we need an API"), ask which task it solves. Behind the word "API" there can be three different features at different costs: a file with all descriptions for the higher-level portal, a selection of table rows for a developer, catalog search for a program. How they work is in the chapter ["APIs and Bulk Download"](../04-features/04-access-interfaces.md).

## Step 4. First, what makes the catalog visible

The minimum is the same for everyone, from a national portal to a research group's page:

- a persistent address for the dataset and the file;
- a licence on every dataset, not only on the site;
- an update date and the contact of the person responsible;
- a full metadata dump in one file or request (a small site needs only one `data.json` file);
- schema.org markup and a sitemap;
- descriptions readable without registration or a captcha.

These features are mandatory without separate justification; the reasons are written in the [capability map](../04-features/01-capability-map.md#the-minimum-for-any-catalog). Faceted search, preview and statistics come after the minimum. A beautiful site without a metadata dump gets into neither the national portal nor a dataset search engine.

The minimum does not require a portal: a static site or a Git repository covers it entirely.

## Step 5. Set the levels

| Level | Test | Example justification |
|---------|------|--------------------|
| Mandatory | without the feature a specific task fails on launch day, and it is clear who will notice. An external obligation always gives "mandatory", with a link to the document | "The national portal harvests DCAT-AP, otherwise our datasets will not get into the common showcase" |
| Desirable | the task is done without the feature, but worse, slower or at greater cost | "A table preview will reduce 'what is in the file' emails, but the file can be downloaded anyway" |
| Not needed | there is no task, or someone else covers it | "No DOI needed: the data is operational, nobody cites a specific version" |

A "not needed" mark does not mean "never". A review condition is written next to it: "No DOI needed while the data is operational; revisit if we start releasing a validated annual archive for researchers." Without a condition, the rejection will have to be explained all over again a year later; with one, it is clear when the explanation is out of date.

If mandatory features are more than half the list, take the test again: most likely some were written down "just in case". Platforms cannot be compared on such a list: they will all turn out "almost suitable", and the cost of the project will grow because of features nobody uses.

## Step 6. Estimate the cost of a feature

The same feature costs differently depending on where it lives.

| Where the feature is | Launch cost | Maintenance cost | Main risk |
|-------------|--------------|--------------------|--------------|
| In the platform core | configuration | updated together with the platform | the feature is changed or removed in a new version, but the release notes say so |
| In an extension | installation and configuration | a check at every core upgrade | the extension lags behind the core or is abandoned |
| In a cloud service | switch on in settings or buy a plan | a subscription fee | the feature depends on the plan and the provider's decisions |
| Your own customisation | developer work | all maintenance is on you | the author leaves, and the feature has no owner |
| Outside the portal | a contract or working rules | making sure the link does not break | someone else's service changes its terms or closes |

The difference is visible on live catalogs. According to the dataportals-registry (release 1.27.0 of 15 October 2026), descriptions in DCAT are served by 239 of 245 portals on Socrata, where the feature is in the core; by 633 of 1,906 portals on CKAN, where the ckanext-dcat extension adds it; and by 24 of 1,144 custom-built open data portals. A core feature is present in almost all installations, an extension feature in a third, a custom-built one in 2%.

An extension without which a mandatory feature does not work is checked before the choice: who maintains it, which core versions the tests run on, when the last release was. The method is in the chapter ["Extension Ecosystems"](../05-platforms/02-extension-ecosystems.md#how-to-assess-an-extension-before-installing). An example of the risk: the ckanext-doi documentation names only CKAN 2.9 and 2.10, and the extension has not been tested on 2.11 and 2.12. If a DOI is mandatory, this is an argument for looking for a platform where it is in the core.

Launch cost and maintenance cost are estimated separately. A cloud service launches in weeks but has to be paid for every year; your own customisation is written once and maintained for the catalog's whole life. More in the chapter ["Deployment Speed and Maintenance"](../04-features/09-deployment-and-operations.md).

## A feature does not have to live in your catalog

Some features are better handed to whoever already does them. The feature then stays on the list, but the "where it lives" column names someone else's service.

| Feature | Who can cover it instead of you | What is left to you |
|---------|------------------------------|------------------|
| DOIs and versions | Zenodo, a university repository, a consortium repository | a link from the dataset page to the DOI and a rule for what counts as a new version |
| Search for residents of the whole country | a national or regional portal that harvests your descriptions | a metadata dump in its profile |
| Map layers and map services | a map server or a regional geoportal | a dataset page that points to the service |
| Change history of small datasets | a Git repository on GitHub or GitLab | tagged releases and a `CITATION.cff` file |
| Storing large files | cloud storage or a shared data hub | a persistent file address, not a temporary link |

The price of such a decision is dependence on someone else's rules: Zenodo's limits, the regional portal's harvesting schedule, the cloud storage pricing. It is written into the decision record just like the price of an extension. If other people's services cover everything except the minimum, you may not need your own portal: the options are analysed in the part ["Publishing Without a Portal"](../08-beyond-portals/01-when-portal-not-needed.md).

## Step 7. Don't close off your next step

Ask what will be needed in three to five years, and check which platform property keeps the road open:

- more publishers: organisations and roles in the core, not one account for everyone;
- a second language: multilingual description fields, not just a translated interface;
- harvesting municipal catalogs: harvesting via DCAT or an API in the core or in a living extension;
- DOIs for research uses: a link to a research repository or to DataCite;
- changing platform: a full dump of descriptions and files, and addresses that can be redirected. See the section ["What it costs to leave"](./05-build-or-buy.md#what-it-costs-to-leave).

Rejecting a feature today is acceptable. Choosing a platform from which you cannot later approach that feature is not. A cloud service will give you your own fields in a template, but not your own program around them: validation against an external reference list, export in a profile the provider does not have, a new record type. CKAN will grow all this too, but at the cost of extensions.

## What comes out

A table, not a paragraph "we want a modern portal". The example below is hypothetical but assembled from typical tasks.

A regional environmental agency publishes hourly measurements from air quality stations, emission permits and the boundaries of protected areas. The layers are already on the regional geoportal. The national portal harvests descriptions in the DCAT-AP profile. Three departments prepare the data, and for now one employee publishes it.

<div className="wide-table">

| Feature | Where the need comes from | Level | Why | How we will check | When to review |
|---------|--------------------|---------|------------|--------------|--------------------|
| Persistent address for the dataset and file | links from reports, news and apps | mandatory | minimum | the address does not change after the dataset is renamed or its description edited | — |
| Licence on the dataset | all users | mandatory | without it the data cannot be used legally | twenty random datasets have a licence both on the page and in the dump | — |
| DCAT-AP dump | the national portal | mandatory | otherwise the agency's datasets will not get into the common showcase | the dump file passes the profile validator, and the national portal has harvested the descriptions | the national portal changes its profile |
| Air measurements as a file and an API, updated every hour | developers of air quality apps | mandatory | without this, apps scrape other people's pages and make mistakes | data at the address is no older than two hours, the field description is published | — |
| Protected area layers held locally | already on the regional geoportal | not needed | the layers live on the map server, a copy will drift from the original | the dataset page points to the WFS service and the geoportal page | the geoportal stops updating the layers or closes |
| Roles for three departments | an editorial task | desirable | at launch one employee publishes at the departments' request | — | departments start publishing on their own |
| Table preview | "what is in the file" emails | desirable | the file can be downloaded anyway, and the data dictionary answers the same questions | — | the emails do not decrease after the data dictionary is published |
| DOI | nobody cites a version | not needed | the measurements are operational, nobody cites a specific state | — | the agency starts releasing a validated annual archive for researchers |
| Harvesting municipal catalogs | — | not needed | this is the job of the regional open data portal, not the agency | — | the region tasks the agency with harvesting municipal environmental data |

</div>

This table then turns into a platform choice: the [next chapter](./03-from-features-to-platform.md) adds "core, extension, customisation, impossible" columns for each platform on the shortlist. The DOI rejection from this table is set out as a [decision record](./04-justifying-decisions.md#example-rejecting-dois). The other forks (platform, extension, custom build) are set out the same way. Four complete chains from task to platform are in the [worked examples](./08-worked-examples.md).

## How to check your list

- [ ] Every feature has a recorded source: whose task or which document.
- [ ] The whole minimum is marked mandatory.
- [ ] The list has no solutions instead of tasks: platform names, "like the neighbours", "modern".
- [ ] Each requirement is one feature, not three in one line.
- [ ] Every mandatory feature has a way to be checked on the live site.
- [ ] Mandatory features are fewer than half the list, or it is clear for each why it cannot be done without.
- [ ] Rejections are recorded with a reason and a review condition.
- [ ] It is marked which features are covered by something other than your catalog, and by whom.
- [ ] The list has tasks of programs and of the editorial team, not only of people on the site.

The same items, arranged by specification sections, are in the [requirements checklist](./07-requirements-checklist.md).

## Common mistakes

- **A list from the platform's brochure.** A brochure lists what the platform has, not what you need. A comparison on such a list is won by the platform whose brochure it was.
- **A list from someone else's specification.** A national portal needs harvesting of other catalogs and roles for a hundred agencies; a city with thirty datasets does not. A copied specification carries over other people's tasks and other people's costs.
- **Features for the report.** The number of datasets and views is an owner's metric, not a user's task. When features are chosen for it, the result is split data and a showcase without a dump.
- **The forgotten editorial team.** The portal was chosen for its showcase, but there is nobody to create five hundred descriptions by hand. Bulk upload of descriptions or harvesting from a records system is needed, and that is a feature, not an implementation detail.
- **An "API" without content.** The requirement "there must be an API" is met by any interface, even a useless one. Write what it serves and to whom: all descriptions, table rows, search results.
- **A rejection without a condition.** "No DOI needed" without a review condition looks like an oversight a year later, not a decision.

## Sources

- [Capability Map](../04-features/01-capability-map.md): the minimum, features by catalog type, external reasons for being mandatory.
- [Why Catalogs Are Built and Who Uses Them](../01-basics/02-why-and-for-whom.md): user groups and their expectations.
- [Requirements Checklist](./07-requirements-checklist.md)
- [ISO/IEC/IEEE 29148:2018](https://www.iso.org/standard/72089.html), Systems and software engineering — Life cycle processes — Requirements engineering: properties of a good requirement (necessary, singular, verifiable and others); a requirement describes "what", not "how".
- Shares of catalogs with DCAT by platform: the [dataportals-registry](https://github.com/datenoio/dataportals-registry) export, [release 1.27.0](https://github.com/datenoio/dataportals-registry/releases/tag/v1.27.0) of 15 October 2026. The queries are in the appendix ["Using the Registry"](../12-appendices/02-using-the-registry.md#capability-map).
- ckanext-doi compatibility: the chapter ["CKAN: Core and Extensions"](../05-platforms/03-ckan-and-extensions.md).
- I. Begtin, [Kazakhstan's open data portal and publicly available government APIs](https://t.me/begtin/4626), Telegram (in Russian), 19 February 2023; [abolition of registration and the record limit on data.egov.kz](https://t.me/begtin/4839), Telegram (in Russian), 26 April 2023; [Taldau API documentation](https://taldau.stat.gov.kz/ru/Api/Dev), checked 12 October 2026.
