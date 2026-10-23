---
title: When You Don't Need a Portal
description: "How to decide you don't need your own portal, and where to publish data instead: someone else's catalog, a page on your website, a Git repository or a shared hub."
---

# When You Don't Need a Portal

You need your own portal when an obligation cannot be met without it, or when there are already so many datasets and publishers that a page and a description file no longer cope. Until then, data is published in someone else's catalog, on your own website, in a Git repository or on a shared hub. Both small groups and federal agencies do this: the US national catalog harvests a description file from an agency's website and leaves the data files where they are.

An empty installation promises a catalog that nobody is there to maintain. Descriptions go stale. If registration is open, it collects spam; this happens with CKAN portals, see the chapter on [access and roles](../04-features/08-access-control-and-workflow.md). When the hosting contract ends, the addresses disappear. A page with a dozen datasets makes no such promise.

## What this chapter calls a portal

A catalog is any place where a dataset can be found, understood and obtained. A static site can be one. A portal in this chapter is your own application: a database of descriptions, search, accounts, roles and a server that someone updates for years. A dataset list is a page or a file with links, without dataset pages or search. For a dozen datasets a list is fine. It becomes a dead end when a row has no licence, date or persistent address.

How a catalog is assembled from parts is in the chapter on [catalog anatomy](../01-basics/03-anatomy.md). How to turn a list into a findable publication is in the chapter on [dataset lists](../03-types/10-other-types.md#dataset-lists).

## Five questions before installing

The answers are written down before choosing a platform. A platform that covers the features is useless if nobody is there to maintain it. A comparison of build approaches is in the chapter ["Build, Open Source or SaaS"](../06-choice/05-build-or-buy.md).

1. **Who must see the data.** A higher-level catalog, a search engine, a reader of an article, colleagues inside the organisation. The description file depends on the recipient: DCAT-AP, DCAT-US, schema.org or DataCite.
2. **How many datasets there are and how often they change.** Dozens of datasets and edits a few times a year are covered by a page or a repository. Hundreds of datasets arriving daily from a records system require loading into a portal or a script that updates files by itself. A script is still publishing without a portal.
3. **How many organisations publish and how they edit.** One group gets by with repository permissions and review of changes before merging. A portal is needed when there are many publishers who do not work with Git, or when the flow of requests for a closed file with an open description can no longer be handled by email and manual approval on a shared hub.
4. **Who updates the server in three years.** If the answer is "the page author" or "nobody", it is too early for a portal. A position or a maintenance contract makes a portal possible, but does not cancel the first three questions.
5. **What exactly the higher-level catalog must harvest.** Usually it is one description file in the right profile. A search API is needed by people and programs when there are already hundreds of datasets. A harvester is satisfied with a file.

| Answer | Where to publish |
|-------|------------------|
| One group, dozens of datasets, the higher-level catalog accepts outside organisations | in that catalog, with no showcase of your own |
| You already have a website, and the higher-level catalog harvests a file | a description file on that website |
| You need edit history and collaboration | a Git repository and a page built from the same files |
| The data will be cited in an article, and there is no repository of your own | a general repository with DOIs, such as Zenodo |
| The file is large | cloud storage or a hub, with the description on your own page |
| Many publishers outside Git, a flow of requests for closed files, harvesting other catalogs | your own portal, or a standard portal already handed out to public authorities |

The last row does not mean "install CKAN tomorrow". A standard portal that a region or provider already runs for municipalities covers the roles without an installation of your own. The analysis for a city is in the [municipality example](../06-choice/08-worked-examples.md#municipality-dont-set-up-your-own-portal).

## Where to publish

Five approaches. They are combined: a repository holds the tables, a website shows them to people, and Zenodo issues a DOI for a release.

| Approach | When it is enough | What you will not have | More |
|--------|-------------------|---------------|-----------|
| Someone else's catalog | few datasets, the catalog already accepts yours | your own domain and your own fields | [build approach](../06-choice/05-build-or-buy.md) |
| A section of your own website | the site exists, there are few datasets | an "add dataset" form and roles for outside publishers | below, using a `data.json` file as an example |
| A static site | dozens of datasets, someone who edits files | API search and scheduled harvesting of other catalogs, until you write them separately | [static sites](./02-static-sites.md) |
| A Git repository | history and collaborative editing matter | large files in Git itself, and findability without a page | [Git repositories](./03-git-repositories.md) |
| Cloud and a shared hub | the file is large, a DOI is needed, or the audience is already on the platform | a guarantee that the platform's rules will stay the same | [storage and hubs](./04-cloud-storage-and-hubs.md) |

The minimum without which none of the approaches works: a persistent address, a licence, a date and a contact, schema.org markup. A file with all descriptions is added when there are several datasets or a harvester takes them: from that point the publication becomes a catalog, and the [common minimum](../04-features/01-capability-map.md#the-minimum-for-any-catalog) applies to it. How to build it step by step is in the chapter ["Making a Publication Findable"](./05-making-it-findable.md). Which capabilities the map considers mandatory, and how to cover them without a portal, is in the [capability map](../04-features/01-capability-map.md#how-to-cover-capabilities-without-a-portal).

### A file on your own website instead of a portal

data.gov does not store agencies' files. An agency publishes a metadata catalog, usually `data.json` in the DCAT-US profile, at a persistent address on its own website. The harvester takes this file on a schedule, and the records appear in the common catalog. In the GSA instructions the source is a public file, the source type is "document", and the frequency is from daily to monthly. Under the harvester's rules a source is harvested at least once a month.

On 13 October 2026 the list of harvest sources showed 793 records. 135 of them have the "document" type: the harvester takes one file. For 117 the address points to `data.json`. Another 577 belong to the Census Bureau: these are folders of geographic descriptions sliced by boundary type, not separate agencies. For a small agency the conclusion is direct: one file is enough.

A live example is the US Election Assistance Commission. Its website is built on Drupal 10. The commission's data catalog is the file [eac.gov/data.json](https://www.eac.gov/data.json). On 13 October 2026 it contained 11 records in the DCAT-US 1.1 schema, and the data.gov harvester takes it once a week as the `eac-data` source. That is enough for the descriptions to reach the national catalog.

Harvesting also takes a weak description. The records have no `license` field. In the `rights` field, the DCAT-US 1.1 schema expects a short text about access conditions, while some records have the boolean value `true` and some have no field. Some download addresses point to a section of the site rather than a file. Some records are PDF reports. A file instead of a portal covers the harvesting task. The licence, a direct link and separating a dataset from a report are up to the author.

In Europe it is the same technique: data.europa.eu harvests a catalog in DCAT-AP if the publisher has submitted it for harvesting. Your own CKAN is not required for this. How the chain works is in the chapter [on federations](../07-publishing/03-federation-and-harvesting.md#what-it-looks-like-in-practice).

### Three places at once

The Global Jukebox research project publishes data on song traditions without a portal of its own. The site [theglobaljukebox.org](https://theglobaljukebox.org/) shows the records to people. Tables and code live in the repositories of the [theglobaljukebox](https://github.com/theglobaljukebox) organisation on GitHub. The release of the Cantometrics dataset that people cite is archived in Zenodo: DOI [10.5281/zenodo.4898406](https://doi.org/10.5281/zenodo.4898406), version v0.1-alpha of 3 June 2021. On 13 October 2026 both the site and the Zenodo record opened.

The combination works as long as the three places have the same description. Here it diverged already in the release that got the DOI. The `LICENSE.txt` file in the v0.1-alpha tag is the CC BY 4.0 licence. The `.zenodo.json` file in the same tag specifies CC BY-NC 4.0, and that is what the Zenodo record shows. Someone who cites the DOI and someone who downloaded the repository get different terms. The licence is chosen once, written in the place considered primary, and copied unchanged into the others.

## Example: an agency with twenty datasets

**Context.** A small agency. About twenty datasets: quarterly dumps and annual reports. A website on an ordinary CMS already exists, run by one webmaster. The national catalog harvests a description file in a known profile (DCAT-US or DCAT-AP) and also accepts organisations inside itself. There is no portal team.

**Options.** Its own CKAN. A cloud portal. An organisation only on the national catalog, with files staying on the agency's website. A `data.json` file on the existing website, registered for harvesting.

**Criteria.** Get into the national catalog. Every dataset has a licence and a direct link to the file. The address of the description file does not change when text on the site is edited. Maintenance fits into one webmaster's work. Its own showcase on the existing website matters more than a separate portal: readers look for data where they look for the agency itself.

**Decision.** A description file on the existing website and a harvesting request. If the national catalog does not harvest external files and only accepts organisations inside itself, publish there and do not install a portal.

**Why.** Its own CKAN with one webmaster will be left without core updates: it loses on the maintenance criterion. A cloud portal would cover search and dataset pages, but the fee and the address migration do not pay off for twenty datasets. An organisation only on the national catalog also gets harvested and is even simpler to maintain, but the agency loses its own showcase. A file on its own website keeps the showcase where it already is and gives the harvester the profile it expects.

**Consequences.** The agency depends on the harvesting profile and schedule. An error in the file is visible only after the harvester runs, so the file is checked with a validator before the request. There is no dataset search of its own: with twenty records a page of links is enough.

**When to review.** More than two hundred datasets, several departments with different rights, the national catalog stops accepting the file, or some files need to be closed while the description stays open and requests exceed what one person can handle.

How to write such a record for yourself is in the chapter ["Justifying a Decision"](../06-choice/04-justifying-decisions.md).

## When you do need your own portal

- Many organisations publish datasets, these people do not work with Git, and each needs its own rights and review before publication.
- The description is open, the file is released on request, and there are so many requests that a shared hub and email cannot cope. This is how microdata catalogs work.
- Other catalogs need to be harvested regularly and copies moderated. A script in a repository, as at opendata.scot, pulls thousands of descriptions, but it does not provide roles.
- Datasets arrive daily from a records system, and a script that updates files is harder to maintain than loading into a portal.
- The country's profile requires a capability that neither a file nor someone else's catalog that already accepts your datasets has. More often what is required is precisely a file in the right profile.

For certain catalog types the threshold is different. A research group with one dataset for an article does not need its own repository. Nor does a city with thirty datasets.

| Task | Where it is analysed when you don't need your own catalog |
|--------|-----------------------------------------------|
| A public authority's open data | [open data portals](../03-types/02-open-data-portals.md#when-you-do-not-need-your-own-portal) |
| Maps and layers | [geoportals](../03-types/03-geoportals.md#when-you-do-not-need-your-own-geoportal) |
| Data for an article | [research repositories](../03-types/04-scientific-repositories.md#when-you-do-not-need-your-own-repository) |
| Indicators | [indicator catalogs](../03-types/05-indicator-catalogs.md#when-you-do-not-need-your-own-catalog) |
| Microdata | [microdata catalogs](../03-types/06-microdata-catalogs.md#when-you-do-not-need-your-own-catalog) |
| Datasets for models | [ML catalogs](../03-types/07-ml-catalogs.md#when-you-do-not-need-your-own-ml-catalog) |
| Reference lists | [metadata catalogs](../03-types/08-metadata-catalogs.md#when-you-do-not-need-your-own-catalog) |

## What you pay

| Approach | What you get | What you pay |
|--------|---------------|-------------|
| Someone else's catalog | dataset pages, harvesting and search already work | someone else's fields, someone else's schedule, no domain of your own |
| A section of your website | cheap, the address is in your domain | manual edits; API search does not appear |
| A static site | almost nothing to break, the site can be taken away as files | edits through files; people without Git will not manage an "add dataset" form |
| A Git repository | history and collaboration | a size limit: GitHub does not accept files larger than 100 MiB and advises keeping a repository under 1 GB; without a page with markup the dataset is hard to find |
| Cloud and a hub | large volumes, DOIs, someone else's audience | the platform's rules and limits change, and the platform may close |

Prices of other platforms are compared in the chapter on the [build approach](../06-choice/05-build-or-buy.md). The history of closed hubs is in the chapter on [cloud storage](./04-cloud-storage-and-hubs.md).

## What live lists show

In the dataportals-registry (release 1.27.0 of 15 October 2026), 107 catalogs are recorded as dataset lists: a page, a repository or a storage listing, without dataset pages. 15 have a programming interface. 12 have a sitemap. 95 are recorded as custom-built. The other twelve are pages on ordinary website engines: Drupal, WordPress, TYPO3, Jekyll, SharePoint and Liferay. 7 are defunct or withdrawn.

A small share of interfaces is expected for a list. A list of twenty links does not need a search API. What breaks is something else: a row has no licence, the page address changes when the site is redesigned, there is no schema.org markup, and links die silently. How this was measured on a thematic list and how to fix it is in the chapter on [dataset lists](../03-types/10-other-types.md#how-to-turn-a-list-into-a-findable-publication). The registry hardly records licences and schema.org markup, so these gaps are not visible in its figures.

## How to check your decision

- [ ] The recipient is named: who harvests the descriptions and in which profile.
- [ ] The datasets, publishing organisations and update frequency are counted.
- [ ] The person who will update the publication in three years is named. If it is a portal server, whoever updates the server is named too.
- [ ] Every dataset has a licence, a date and a direct link to the file, not just a section page.
- [ ] The file with all descriptions opens without a login and passes the check of the profile the harvester expects.
- [ ] The event that reopens the decision is recorded.

Commands for checking the file and the markup are in the chapters on [metadata export](../04-features/02-metadata-export.md) and on [findability](./05-making-it-findable.md).

## Common mistakes

**A portal "like everyone else's".** A city or agency installs CKAN because the neighbour did. Two years later the core has not been updated, and there are as many datasets as would fit on one page. First answer the five questions above.

**A link to a folder.** A shared drive or a bucket without a description page is not a publication. The address is temporary, there is no licence, and a year later nobody can find the folder.

**A home-grown description file format.** To harvest sites, people invent a CSV table with their own columns. The national catalog's harvester does not read it. The file is made in the profile the higher-level catalog already accepts. How this turned out with the methodological recommendations in Russia is in the chapter on [anti-patterns](../09-practices/02-anti-patterns.md#a-home-grown-format-instead-of-a-standard).

**Waiting for someone to build a portal.** While the national or regional catalog does not accept datasets, a page and a repository are already publishing data. The community in Scotland built opendata.scot this way, without waiting for a government portal. Details are in the chapter on [static sites](./02-static-sites.md).

**Three copies, three licences.** A site, a repository and a hub describe one dataset differently. The reader does not know which copy is primary. One is designated primary, and the others are checked against it.

## Sources

- GSA, [How to get your Open Data on Data.gov](https://resources.data.gov/resources/data-gov-open-data-howto/): data.gov does not store files, the agency publishes `data.json`; [Harvester API](https://resources.data.gov/harvester-api/): a source is harvested at least once a month; [the list of harvest sources](https://harvest.data.gov/harvest_source_list/): 793 sources, 135 of them of the "document" type, 117 `data.json` addresses and 577 Census Bureau sources, checked 13 October 2026
- [eac.gov/data.json](https://www.eac.gov/data.json): 11 records, DCAT-US 1.1 schema, the `rights` field and download addresses; the commission's site responds with a Drupal 10 header. Checked 13 October 2026. The `eac-data` source in the harvest list is a weekly document. The `rights` field in the [DCAT-US 1.1 dataset schema](https://resources.data.gov/schemas/dcat-us/v1.1/schema/dataset.json) is text up to 255 characters or empty; `license` is an optional link
- Global Jukebox: [site](https://theglobaljukebox.org/), [organisation on GitHub](https://github.com/theglobaljukebox), DOI [10.5281/zenodo.4898406](https://doi.org/10.5281/zenodo.4898406) (Zenodo record, CC BY-NC 4.0 licence, version v0.1-alpha of 3 June 2021). In the same repository tag, [LICENSE.txt](https://github.com/theglobaljukebox/cantometrics/blob/v0.1-alpha/LICENSE.txt) is CC BY 4.0, while [.zenodo.json](https://github.com/theglobaljukebox/cantometrics/blob/v0.1-alpha/.zenodo.json) specifies CC BY-NC 4.0. Checked 13 October 2026
- [Large files on GitHub](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github): a 100 MiB limit per file and a recommendation to keep a repository under 1 GB
- The dataportals-registry export, release 1.27.0 of 15 October 2026: 107 dataset lists, an interface for 15, a sitemap for 12, custom-built for 95, defunct or withdrawn 7. Queries of 15 October 2026 are in the [appendix](../12-appendices/02-using-the-registry.md#when-you-dont-need-a-portal)
- [How to get harvested by data.europa.eu](https://dataeuropa.gitlab.io/data-provider-manual/how-to-publish/request-harvesting/)
