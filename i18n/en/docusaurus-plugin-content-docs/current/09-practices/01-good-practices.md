---
title: Good Practices
description: Six things without which a dataset cannot be found or used, and how live catalogs already do them.
---

# Good Practices

A good practice is one without which a dataset cannot be found or cannot be used. Everything else depends on the catalog type. Below are six things for any way of publishing, why each is mandatory and who already does it. The failures that skipping them turns into are collected in the chapter [on anti-patterns](./02-anti-patterns.md).

<div className="wide-table">

| What to do | Why the dataset is not used without it | Where it can already be seen |
|-------------|-------------------------------|-------------------|
| The file opens without paid software; encoding and delimiter are stated | otherwise every user fixes the table again, in their own way | open formats and a data dictionary, below |
| Columns have a dictionary | a `sum_2` column is formally open and closed in meaning | [schema.data.gouv.fr](https://schema.data.gouv.fr), [Table Schema](https://specs.frictionlessdata.io/table-schema/) |
| The record states a frequency, and it is about the file, not about edits to the description | services are built on the dataset and need to know when to expect new rows | [HDX](https://data.humdata.org): the portal itself calculates the update deadline |
| Licence, publisher, a person to answer, period and territory are on the dataset | without them the file can be neither used lawfully nor judged for fitness | the record score on [data.gouv.fr](https://www.data.gouv.fr) |
| The whole catalog can be taken by a program in the profile the upper portal already reads | a field "in our own way" does not exist for a harvester | paginated DCAT and weekly CSVs on data.gouv.fr |
| The dataset address does not change, and there is somewhere to report a fault | a link from a report and someone else's program outlive the platform | the data.gov transition in 2026; discussions on data.gouv.fr |

</div>

In a technical specification these six points are marked as mandatory. A checklist for the other decision points is in the chapter [on requirements](../06-choice/07-requirements-checklist.md). The full list by type is in the [capability map](../04-features/01-capability-map.md).

## File

**The format opens without paid software.** CSV, JSON, XML, GeoPackage, Parquet. PDF is kept as a human-readable copy alongside: a table from it gets retyped or OCR'd, and each person does it with new errors. Three questions that decide whether a file is fit for a program are in the chapter [on formats](../02-data/02-formats-and-units.md#when-a-file-is-usable-by-a-program).

**The table has a data dictionary.** Column name, unit of measurement, permitted values, what an empty cell means. The dictionary is put alongside as a separate file or described as is customary in the field: Table Schema, DDI variables, an SDMX structure. The forms, and how the French portal checks a file against a shared schema for the topic, are covered in the chapter [on metadata depth](../04-features/03-metadata-depth.md#data-dictionary).

**Encoding, delimiter and decimal separator are stated.** In the file record or in the dictionary itself: UTF-8 or another encoding, comma or semicolon, point or comma in numbers. Otherwise half of one publisher's tables open and half do not, and nowhere does it say which is which. This is what the open data section of Rosstat looked like; the analysis is among the [anti-patterns](./02-anti-patterns.md).

**One dataset is what people search for by name.** A year and a district that can be made a column are not given separate records to boost the count. What is worth splitting is what is searched for on its own: a city budget, a time series with a persistent address. The test question: would it be more convenient if these files were merged into one? If so, it is fragmentation. Examples and the boundary are in the same chapter on anti-patterns.

**The frequency in the record is about the file, and someone checks it.** The update date is the date of the rows, not the day the description was edited. A user builds a calculation on the dataset and needs to know when to expect the next instalment.

On the [Humanitarian Data Exchange](https://data.humdata.org) frequency is a mandatory field from a short list: every day, every week, every year, as well as "live", "as needed" and "never". The portal itself calculates the date by which the next file is expected. Since April 2025 the rule is: the stated frequency is added to the end date of the period. The [EM-DAT country profiles](https://data.humdata.org/dataset/emdat-country-profiles) dataset is updated weekly. On 14 October 2026 its data period ended that same day, and the next update was due on 21 October. That day 866 datasets had the frequency "every week": the field is not left empty. When the deadline passes, an email goes to the person responsible for the dataset, not to the portal's general inbox. HDX's own authors ask people to choose the nearest regular interval rather than "as needed": otherwise the check does not fire.

## Record

Licence, publisher, contact, period and territory are on every dataset, not in the site footer.

- **Licence**: a link to the text of the terms. Without it the file can be downloaded but cannot be used lawfully. Which one to choose is in the chapter [on licences](../07-publishing/04-licenses-and-access.md).
- **Publisher**: the organisation responsible for the content. All of one agency's datasets are found by it, and a copy is distinguished from the original source.
- **Contact**: a person or team with an address who will answer about an error in the rows. An `info@` inbox without a name does not cover this: there is no one to read the email.
- **Period and territory**: so that fitness can be judged without downloading. "Data for all years for the whole country" in the description does not replace filled-in fields: a program cannot filter on it.

Beyond this list, one profile is needed that your upper portal already reads: DCAT-AP, ISO 19115, DataCite, DDI or SDMX. Not all at once, but the one that matches the type. The upper portal and the search engine read the description by program, and a field with a local name is empty for them. How to choose a description language is in the chapter [on standards](../07-publishing/02-metadata-standards.md).

A copy points to the original. A city, a region and a country may show one record, but the copy has a link to the source. Otherwise an error is fixed in three places, and search counts one dataset as three.

data.gouv.fr shows the publisher a record score so that gaps are visible before a user complains. The portal's guide lists what goes into the score: a long enough description, described files, a frequency that is filled in and kept to, an open licence, at least one open format, the territory and its level of detail, the period. Since 2022 the score has been experimental: the weights may change, and checking against a data schema is not yet included. On 14 October 2026 the record of [the portal's own catalog](https://www.data.gouv.fr/datasets/catalogue-des-donnees-de-data-gouv-fr) passed seven of the nine checks the API returns. File descriptions and temporal coverage were not covered. The licence was there, though (the French open Licence Ouverte 2.0), the frequency was filled in and kept to, and the territory was stated. The score looks at the record, not at the rows inside the file. An empty file with filled-in fields would get a high score here; how to tell one from the other is in the chapter [on quality levels](../10-quality/01-quality-levels.md#one-object-different-scores).

## A catalog that can be harvested

Without a dump of all descriptions, the catalog will not get into a federation. Without a persistent address, the dataset cannot be cited. Without registration, those who search for portals rather than individual datasets will not learn of the catalog.

**The dump opens without a login and without a contract.** For a national portal one file is already too tight, and that is fine if a program can walk the pages. On 14 October 2026 [the data.gouv.fr DCAT dump](https://www.data.gouv.fr/api/1/site/catalog.rdf) contained 74,616 datasets, 100 per page, 747 pages in total: the file states the total count and the address of the next page. Alongside, the portal publishes the whole catalog as tables. Its record states a weekly frequency. On the morning of that day there were fresh CSVs: a 276 MB list of datasets and a 1.1 GB list of files, plus organisations, discussions, reuses and harvesters. Any aggregator takes this without a separate agreement. Other approaches (a single file, a protocol, a change feed) are in the chapter [on APIs and dumps](../04-features/04-access-interfaces.md).

**The address survives a platform change.** It is designed before the move: the old path either stays or redirects to the new one. When data.gov moved from CKAN to its own software in April 2026, it kept the previous catalog at a separate address for a transition period so that users could reconfigure their programs. How to keep an address is in the chapter [on identifiers](../04-features/06-identifiers-and-doi.md).

**A search API is switched on when there are hundreds of datasets or more.** For a dozen, pages and one description file are enough. Descriptions are then readable without registration and without a captcha: a file can be restricted, a record cannot.

**There is somewhere to report an error, and the message reaches the data owner.** A form on the dataset page, an address in the record or an open tracker. On data.gouv.fr a dataset has a discussion, and reuses (applications and articles that readers have attached to the record themselves) are served by the portal as a separate file in the same weekly dump. Feedback is then visible both to people and to those who take the whole catalog. How the French portal works overall is in the chapter [on open data portals](../03-types/02-open-data-portals.md).

**The catalog is registered where people look for it.** A national and a thematic registry, and re3data for a research repository. A news item on your own site does not replace this. Where to register is in the chapter [on discoverability](../07-publishing/05-discoverability.md).

## What the type adds

Six points are enough for an agency page and a city portal. The catalog type adds its own. This is not a second mandatory list "just in case": what is surplus for your type slows down publishing and is of no use to the user.

| Type | What to add to the six points | Where it is covered |
|-----|------------------------------|---------------|
| Open data portal | the national profile, most often DCAT-AP, and a shared schema for topics many publish | [standards](../07-publishing/02-metadata-standards.md), [federation](../07-publishing/03-federation-and-harvesting.md) |
| Research repository | DOI, versions, a ready citation for an article, serving descriptions via OAI-PMH | [research repositories](../03-types/04-scientific-repositories.md) |
| Geoportal | the layer can be downloaded, or it says plainly that only viewing is available; a description in ISO 19115 | [geoportals](../03-types/03-geoportals.md) |
| Indicator catalog | methodology next to the series; SDMX or another bulk export of the table, not just a screen | [indicator catalogs](../03-types/05-indicator-catalogs.md) |
| Microdata catalog | access levels, a variable dictionary, a description that is open even when the file is closed | [microdata](../03-types/06-microdata-catalogs.md) |
| ML catalog | a Croissant description, a fixed split into training and test parts, licence and data provenance | [ML catalogs](../03-types/07-ml-catalogs.md) |
| Publishing without a portal | the page opens without a login, the licence is in place, schema.org markup with a description of 50 characters or more, a date and a contact | [making it findable](../08-beyond-portals/05-making-it-findable.md) |

A chart on the site does not replace these points. A file or a dump must still be downloadable.

## The dataset as a product

The practices above can be fulfilled formally: the record is filled in, the file opens, and yet the dataset is awkward to use. A different view helps: treat the dataset as a product that has users. In companies this is called "data as a product". How a data product differs from a dataset, and which catalogs are built around products, is covered in the chapter [on units of publication](../02-data/02-formats-and-units.md#dataset-or-data-product). For open data the approach is still rare. A check of one dataset looks like this.

1. It is known who uses the dataset and for what task. At least one scenario, even if the file is free.
2. There is an owner who understands both the data and the users. They answer questions and fix the dataset based on feedback. Not "a department", but a person or team with an address.
3. Documentation is published and matches the file: schema, code example, limitations. HDX has a separate record field for limitations.
4. The data can be obtained in more than one way: file, API, slice. The format is chosen for the user. An analyst needs CSV or Parquet, a developer an API or JSON. An example of how this changes demand for essentially the same data is in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md#formats-for-those-who-will-use-the-data).
5. Quality is described and checked continuously, not once before first publication and not only when a user writes in.
6. There are versions and an update schedule, and the schedule is kept. For a research dataset the version is what an article cites. For an operational one, at least the file date and previous releases if anyone may already have cited the old ones.
7. A dashboard, if there is one, sits next to the data.

Point 6 coincides with the frequency from this chapter. The rest is what even a carefully filled-in record does not give. The idea of a "third wave" of open data says the same: publish what is needed for specific tasks; see [high-value datasets](../02-data/01-what-is-published.md#what-must-be-published).

## Where these rules come from

The practices were not invented for one portal. They are repeated by three documents that national open data policies and research repositories rely on. In the book they are laid out by type: what is mandatory for a research archive is surplus for an operational portal.

<div className="wide-table">

| Practice from this chapter | [Open Data Charter](https://opendatacharter.org/principles/), 2015 | [Data on the Web Best Practices](https://www.w3.org/TR/dwbp/), W3C, 2017 | [FAIR Principles](https://www.go-fair.org/fair-principles/), 2016 |
|------------------------|------------------------------------------------------------------------|---------------------------------------------------------------------------|----------------------------------------------------------------|
| Open format and data dictionary | accessible and usable; comparable | formats and vocabularies | interoperable |
| Frequency and completeness | timely and comprehensive | data quality | — |
| Licence on the dataset | open by default | licences | reusable |
| Dump of the whole catalog | accessible | data access and metadata | findable |
| Persistent address | — | identifiers | findable |
| Where to report an error | improved governance and citizen engagement | feedback | — |

</div>

The [International Open Data Charter](https://opendatacharter.org/principles/) has six principles for governments: open by default; timely and comprehensive; accessible and usable; comparable and interoperable; for improved governance and citizen engagement; for inclusive development and innovation. On 14 October 2026 the charter's site said it had been adopted by more than 29 national and 146 regional and city governments. The charter says what to publish and says almost nothing about what file to use.

Data on the Web Best Practices is a W3C Recommendation of 31 January 2017 with 35 practices: from description and licence to versions, preservation and feedback. It is the list closest to this chapter. It is about data on the web in general, not only government portals.

The FAIR principles are for research data: findable, accessible, interoperable, reusable. FAIR does not mean "open": a dataset with closed files can also comply if the description is open, the identifier is persistent and the access procedure is clear. For a city CSV they provide vocabulary, not a substitute for a licence and a dump.

## How to check your catalog

A short pass through the six points. Counting on a sample of 30 datasets and analysing the files is in the chapter [on self-audit](../10-quality/04-self-audit.md).

1. Open one file without paid software. If it is a CSV, read the encoding and delimiter in the record instead of guessing.
2. Find the data dictionary. If a column is understandable only to whoever made the export, the dataset is not ready for an outside user.
3. Compare the date in the record with the date inside the file and with the stated frequency. A delay must be visible to the owner before the user.
4. The record has a licence as a link, a publisher, a person's address, a period and a territory.
5. Download the dump of all descriptions without a login. Make sure it is in the profile the upper portal expects.
6. Open the old dataset address if the platform has already been changed, and send a test error report. It must reach the data owner.

This is what a good answer at step five looks like. The number of datasets in the data.gouv.fr paginated dump:

```bash
curl -s "https://www.data.gouv.fr/api/1/site/catalog.rdf" | grep -o "hydra:totalItems[^<]*"
```

The frequency and update deadline of one dataset on HDX:

```bash
curl -s "https://data.humdata.org/api/3/action/package_show?id=emdat-country-profiles" \
  | jq '{freq: .result.data_update_frequency, due: .result.due_date, period: .result.dataset_date}'
```

On 14 October 2026 the first command showed 74,616 datasets, and the second a frequency of `7` (weekly) and a deadline of `2026-10-21`.

## Sources

- [Data on the Web Best Practices](https://www.w3.org/TR/dwbp/), W3C Recommendation, 31 January 2017
- [FAIR Principles](https://www.go-fair.org/fair-principles/); M. D. Wilkinson et al., [The FAIR Guiding Principles](https://doi.org/10.1038/sdata.2016.18), Scientific Data, 2016
- [International Open Data Charter](https://opendatacharter.org/principles/); the number of governments that adopted it is from the [home page](https://opendatacharter.org/), 14 October 2026
- [Table Schema](https://specs.frictionlessdata.io/table-schema/)
- HDX: [record fields](https://docs.humdata.org/about/hdx-metadata), [how freshness is calculated since April 2025](https://docs.humdata.org/find/understanding-the-hdx-dataset-page), [which frequency to set](https://centre.humdata.org/ufaqs/what-should-i-put-for-expected-update-frequency/); the [EM-DAT Country Profiles](https://data.humdata.org/dataset/emdat-country-profiles) dataset and a search by frequency `7`: 14 October 2026, 866 datasets
- data.gouv.fr: [announcement of the metadata quality score](https://www.data.gouv.fr/posts/un-nouveau-score-de-qualite-des-metadonnees-sur-les-jeux-de-donnees) (in French), 10 August 2022; [guide to the score](https://guides.data.gouv.fr/guides/guide-qualite/ameliorer-la-qualite-dun-jeu-de-donnees-en-continu/ameliorer-le-score-de-qualite-des-metadonnees) (in French); [DCAT dump](https://www.data.gouv.fr/api/1/site/catalog.rdf), 74,616 datasets; [weekly catalog CSVs](https://www.data.gouv.fr/datasets/catalogue-des-donnees-de-data-gouv-fr): 14 October 2026
- [Announcement of the new data.gov catalog](https://data.gov/blog/catalog-update/), 15 April 2026
- [Requirements Checklist](../06-choice/07-requirements-checklist.md), [capability map](../04-features/01-capability-map.md)
