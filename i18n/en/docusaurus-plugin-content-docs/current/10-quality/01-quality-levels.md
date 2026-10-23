---
title: Quality Levels
description: "Four levels: data, descriptions, the catalog as a service and the system of catalogs. A high score on one leaves the others as they were."
---

# Quality Levels

In a task, "quality" means a level. There are four, and a high score on one leaves the others as they were. Before fixing or reporting, ask which level the assessment touches, and assign the work to whoever owns that level.

The number of datasets, a country index and a record score answer different questions. How to calculate shares is in the chapter [on metrics](./02-metrics.md). What each known methodology measures is in the chapter [on methodologies](./03-methodologies-and-indices.md). How to walk through your catalog in one go is in the chapter [on self-audit](./04-self-audit.md). This chapter is about how to split an assessment into levels.

## Four levels

<div className="wide-table">

| Level | Question | What it is usually measured by | Who fixes it | What remains unchecked |
|---------|--------|-------------------|-----------|------------------------------|
| Data | can the file or layer be used | format, completeness, agreement with the source, reproducibility of a calculation | the data owner | record completeness, site availability, country index |
| Descriptions | can the dataset be found and its terms understood | field completeness, conformance to a profile, a live link | the publisher and catalog editor | number of rows in the file, country policy |
| The catalog as a service | does it open and do machines receive it | availability, API, dump, licences in the dump, persistent addresses | the platform administrator | file contents, country index |
| The system of catalogs | is there a chain, and do the licence and source travel along it | openness indices, the share of a source's datasets on the upper portal, duplicates | the open data coordinator | a single city file |

</div>

An empty file with a filled-in record is good descriptions and empty data. A live site without a dump is a good showcase and a weak service. A country with a strong national portal and dead city ones is a strong top and a weak system. The reverse happens too: a city's file and record are in order, but on the upper portal the licence is lost. This is how a dataset from the city of Malmö went in 2024; the chain is analysed in the chapter [on federation](../07-publishing/03-federation-and-harvesting.md#where-the-chain-breaks).

## One object, different scores

**The portal looks alive, the files are empty.** In February 2023 data.gov.uz had 6,623 datasets, more than most portals in the region. The monitoring section showed almost all datasets as updated. At the service level it looked alive. At the data level it did not: 96% of datasets had fewer than 200 rows, 42.6% had a single row, and the whole portal in CSV took up 40 MB. The records, meanwhile, could have been filled in. A description score sees filled-in fields and leaves empty rows unnoticed: they become visible once the files are opened. How to calculate the distribution by rows, and a second example, data.gov.ru in 2025, are in the chapter [on self-audit](./04-self-audit.md#substantive-check).

**There is a badge, but the calculation does not reproduce.** Reproducibility is the ability to obtain the stated result again from the published data and the recorded steps. An "open data" badge on a journal article says the file has been published. In 2021 Hardwicke and co-authors checked 25 articles in Psychological Science with such a badge from 2014–2015. Without help from the authors, the checked figures matched in 9 articles out of 25. After the authors' explanations, in 15 of 25. The main reason for the discrepancy lay in the work itself: the analysis steps were recorded unclearly, although the badge already confirmed the data was published. Whether the calculation matches the article text is checked separately.

**A record score looks at the record.** data.gouv.fr shows the publisher a metadata quality score: description, files, frequency, licence, open format, territory, period. An empty file with filled-in fields gets a high score. What goes into the score and how it looked on 14 October 2026 is in the chapter [on good practices](../09-practices/01-good-practices.md). This is the descriptions level.

## What counts as good

A good answer depends on the catalog type. The six practices without which a dataset cannot be found or used are in the chapter [on good practices](../09-practices/01-good-practices.md). Below is how "data" and "descriptions" differ between neighbouring types and where a level breaks first.

| Type | Data is good when | Descriptions are good when | Where it usually breaks first |
|-----|---------------------|------------------------|----------------------------|
| Open data portal | the file opens in a program and has rows and a column dictionary | licence, publisher, period and territory are on the dataset | the counter grows through empty and sliced tables |
| Geoportal | the layer downloads as a file or through a WFS service | the layer has a licence, a date and a description | the municipal map: the layer is visible, there is no download button |
| Research repository | the calculation reproduces from the files and recorded steps | there is a DOI, authors, a licence and a citation for an article | the badge and DOI are there, the analysis steps are not recorded |
| Indicator catalog | the series continues and can be taken in full | methodology sits next to the series, codes come from a shared code list | the API responds, but the series has stopped |
| Microdata catalog | the file can be read using the variable dictionary | the description is open, the access level is named | the file was closed together with the record |
| ML catalog | the file downloads, the training and test split is fixed | the record has a licence and provenance | the record is filled in, the licence is more permissive than the source data's |
| Metadata catalog | a vocabulary or code entry is complete and points to the current version | the entry can be found by code and topic | the record is alive, but the catalog it points to is switched off |
| Page, Git or hub | the file opens without a login, encoding and columns are stated | there is a README, a licence, schema.org markup, a date and a contact | there is a repository but no page with a persistent address |

For microdata, a closed file with an open record is a normal level if the access procedure is written down. The link breaks when the description is hidden too.

Failures are analysed in the chapters on [open data portals](../03-types/02-open-data-portals.md), [geoportals](../03-types/03-geoportals.md#a-vendors-municipal-map), [research repositories](../03-types/04-scientific-repositories.md), [indicators](../03-types/05-indicator-catalogs.md#where-it-breaks), [microdata](../03-types/06-microdata-catalogs.md#access-levels), [ML catalogs](../03-types/07-ml-catalogs.md#where-it-breaks) and [metadata catalogs](../03-types/08-metadata-catalogs.md#where-it-breaks).

## Checking on entry

Everything above is measured after publication. It can also be done before: the catalog does not accept a dataset that has not passed a check. Then quality is a condition of entry, not an indicator on a dashboard.

This is how neuroscience data archives work. OpenNeuro accepts only datasets following the BIDS standard: a shared order of folders, file names and descriptions. Upload is possible with validator warnings, but not with errors. In DANDI the publish button becomes active only after all errors in the check of descriptions and files have been fixed. A published version does not change.

Checking on entry works where a field has a shared standard. Otherwise it becomes one portal's list of rules, and publishers get around it with empty fields. For tables on an open data portal the analogue is checking a file against a schema on upload. Schemas for common tables are already collected in the [schema.data.gouv.fr](https://schema.data.gouv.fr) catalog. The level such a check holds is data. Fixing the file after it is still the data owner's job, but before publication rather than after a complaint.

Other innovations of the same kind are in the chapter [on innovative catalogs](../11-trends/02-innovative-catalogs.md#standard-based-checks-on-entry).

## Where to put someone else's score

Someone else's assessment is first placed on one level. Only then is it decided whether to fix your catalog by it.

| Assessment | Which level it touches |
|--------|---------------------------|
| Five stars | data: the format of one dataset |
| FAIR and F-UJI | descriptions of one research record and the access procedure |
| MQA, the data.gouv.fr score | descriptions of catalogs that already send records upward, and whether links are alive |
| CoreTrustSeal | the catalog as an archive: procedures and preservation |
| Open Data Maturity, ODIN, Global Data Barometer | the system of catalogs and country policy |
| Number of datasets | a record counter |
| The registry trust score | a rough view from outside: is the site alive, is a licence stated |

MQA sees catalogs that already send descriptions to data.europa.eu and averages the records the assessment has managed to count: this may be the catalog's share in search. A country index is built from policy and national portals. Formulas and the limits of each methodology are in the chapter [on methodologies](./03-methodologies-and-indices.md).

## In what order to fix

From the bottom up, following dependencies. First, files that open and can be read. Then the licence and mandatory fields. Then the dump and persistent addresses: without them descriptions will not reach the upper portal and search engines. A country index moves when the lower levels are fixed in many catalogs at once.

A harvesting deadline from above moves the dump to the front of the queue, for the datasets you actually publish. Filling in records for single-row tables by that deadline means fixing descriptions where the data is broken.

The task is set at the level where things are broken. The record editor is given empty fields. The data owner, the file and its freshness. The platform administrator, the dump, the API and addresses. The country coordinator, the rules by which cities send descriptions, and answers for an index such as Open Data Maturity: that score is collected from policy and national portals. A single CSV stays with the data owner.

## Example: an agency was told to raise quality

**Context.** A regional open data portal. In monitoring, almost all datasets are marked as updated. The country's national index is middling, and a contribution is expected from the region. A user sent in a budget: a single-row table in PDF. The editorial team is two people.

**Options.** Fill in empty fields in all records. Rewrite the API and dump. Prepare answers for the country index. Open a sample of files, fix the format and content of the datasets people use, then the licence and mandatory fields, then the dump.

**Criteria.** A person opens the file and uses it without manual fixes. A program takes the descriptions without a login. The work goes to whoever owns the level. Two editors can manage it in a quarter.

**Decision.** A month goes on the data of the datasets that appear in emails and in download statistics: open format, rows, column dictionary. The next step is the licence and mandatory fields on the same sample, then a dump of all descriptions. The country index is not in the editorial plan.

**Why.** Filling in all records raises the description score and leaves the PDF in place: it fails the "the file can be used" criterion. A new API over empty files serves the same files faster. Answers for the index are written at country level and do not fix a regional file. A sample with live files resolves the complaint and fits the work of two people.

**Consequences.** For another quarter the catalog will look more modest than a neighbour with thousands of records. The dump will appear after the files, and until then the federation will not harvest this portal.

**When to review.** The sample of files opens in a program, and the national portal has named a harvesting date: then the dump becomes the first task. Or there are no more emails about content, but half the records still have empty fields: then the queue moves on to descriptions.

How to write your own decision record is in the chapter ["Justifying a Decision"](../06-choice/04-justifying-decisions.md).

## If there is no portal

The same four levels exist for a page, a repository and a dataset in a shared hub.

- **Data**: the file itself: it opens, the columns are named.
- **Descriptions**: README, licence, `datapackage.json` or schema.org markup.
- **Service**: the page opens without a login, and the address does not change when the title is edited.
- **System**: a record in a catalog people already search: a national portal, Zenodo, re3data. GitHub search does not replace this record.

The order is the same: first a file that can be used, then a description, then a persistent address, then a record one level up. The minimum for a page is in the chapter [on findability without a portal](../08-beyond-portals/05-making-it-findable.md). How a short pass differs from a portal audit is in the section ["If there is no portal"](./04-self-audit.md#if-there-is-no-portal).

## How to set the task

The task states the level, the scope and who does it.

A good wording looks like this: "On a sample of 30 datasets from different publishers, the file opens as CSV or GeoPackage without manual fixes. Deadline: one month. Done by the data owner, checked by the editor."

The result of a pass is one page from the chapter [on self-audit](./04-self-audit.md#what-to-write-in-the-result). The queue on it is already split: what the record editor fixes and what requires a change to the dump or address.

## Sources

- T. E. Hardwicke et al., [Analytic reproducibility in articles receiving open data badges at the journal Psychological Science: an observational study](https://doi.org/10.1098/rsos.201494), Royal Society Open Science, 2021: 25 articles with an open data badge from 2014–2015; without help from the authors the checked figures matched in 9, after the authors' explanations in 15
- [5-star open data](https://5stardata.info/)
- [MQA](https://data.europa.eu/mqa/), [MQA methodology](https://data.europa.eu/mqa/methodology)
- [Open Data Maturity](https://data.europa.eu/en/open-data-maturity), [Global Data Barometer](https://globaldatabarometer.org/), [ODIN](https://odin.opendatawatch.com/)
- [CoreTrustSeal](https://www.coretrustseal.org/)
- data.gouv.fr: [guide to the metadata quality score](https://guides.data.gouv.fr/guides/guide-qualite/ameliorer-la-qualite-dun-jeu-de-donnees-en-continu/ameliorer-le-score-de-qualite-des-metadonnees) (in French)
- I. Begtin, [What is wrong with Uzbekistan's open data portal?](https://begtin.substack.com/p/31) (in Russian), February 2023: dataset sizes on data.gov.uz
- [Metrics](./02-metrics.md), [methodologies and rankings](./03-methodologies-and-indices.md), [self-audit](./04-self-audit.md)
- [Good practices](../09-practices/01-good-practices.md), [federation](../07-publishing/03-federation-and-harvesting.md), [making a publication findable](../08-beyond-portals/05-making-it-findable.md)
- OpenNeuro, [user guide](https://docs.openneuro.org/user_guide.html): BIDS validation on upload; DANDI, [publishing Dandisets](https://docs.dandiarchive.org/user-guide-sharing/publishing-dandisets/): publication after all validation errors are fixed; the [schema.data.gouv.fr](https://schema.data.gouv.fr) schema catalog
