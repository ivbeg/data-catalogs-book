---
title: Quality Metrics
description: Which shares to calculate for a catalog, how a share is built and which numbers do not show what to fix.
---

# Quality Metrics

A metric is useful if it shows what to fix. For that, several shares are calculated. Each share has three notes: what is in the denominator, what value counts as filled in, and on what date it was calculated. The number of datasets in the site footer has none of these notes.

## What a share is made of

The denominator is the datasets from a named list: the whole dump, every Nth dataset, or an API page with a stated offset. The share is calculated from the number of datasets in that list. Thirty records from different publishers catch a typical gap. How to take them and where to record them is in the chapter [on self-audit](./04-self-audit.md#how-to-take-thirty).

"Filled in" comes in three degrees. The report says which was counted. Otherwise two shares with the same name cannot be put side by side.

| Degree | What passed | What may still be empty in meaning |
|---------|------------|--------------------------------------|
| The field is not empty | something is in the licence | the value "not specified": that is a string too |
| A value from a list | a known licence, a format from a code list | the period "1900–2099", a description copied from the title |
| The value is true | the period looks like the data, the link opens a file | this is checked by eye on a few records |

The first degree gives a high share where an empty field was replaced with a placeholder. The second catches the placeholder if it is on a list of forbidden values. Automated checks hardly cover the third: a profile validator and [MQA](./03-methodologies-and-indices.md) check that the field is there. On data.gouv.fr the built-in assessment counts the licence "not specified", and on data.gov.gr a placeholder period is on almost every dataset in the sample and goes into the DCAT dump. Both cases are analysed in the chapter [on metadata depth](../04-features/03-metadata-depth.md).

## One API page is not a sample

A CKAN portal serves records in pages. A page often turns out to be one harvesting batch rather than a cross-section of the catalog. On 14 October 2026 the data.gov.gr API showed 22,765 datasets. During the checks the counter moved by one or two records. The command below takes 200 datasets ordered by record creation date and calculates four numbers: how many organisations are on the page, how many have an explicit licence, how many have at least one file from a short list of formats, and how many records changed after 14 October 2025.

An explicit licence here is the second degree: the `license_id` field is not empty and is neither `notspecified` nor `none`. The command counts the code `other-open` ("some other open licence"). A stricter check looks at whether the licence has a link to its text. The short list of formats is CSV, JSON, XML, GeoJSON, GeoPackage, Parquet. The command reads the format label, not the bytes: ZIP and XLSX are not on the list even if there is a table inside. For a geoportal the list is different. When a file is fit for a program at all is in the chapter [on formats](../02-data/02-formats-and-units.md#when-a-file-is-usable-by-a-program).

```bash
PORTAL=https://data.gov.gr
START=0
CUTOFF=2025-10-14
curl -s "$PORTAL/api/3/action/package_search?rows=200&start=$START&sort=metadata_created%20asc" \
  | jq --arg cut "$CUTOFF" '.result.results as $r | ($r | length) as $n | {
      datasets: $n,
      organizations: ([$r[].organization.name] | unique | length),
      explicit_license: ([$r[] | select((.license_id // "" | ascii_downcase) as $l
                          | $l != "" and $l != "notspecified" and $l != "none")] | length),
      open_format: ([$r[] | select(any(.resources[];
                      (.format // "" | ascii_upcase | gsub("\\."; "")) as $f
                      | ["CSV","JSON","XML","GEOJSON","GPKG","PARQUET"] | index($f)))] | length),
      card_modified_since_cutoff: ([$r[] | select((.metadata_modified // "") > $cut)] | length)
    }'
```

`CUTOFF` is the date one year before the day of the check. Substitute your own. Change `START` and run the command several times.

Three runs that day:

| Offset | Organisations | Explicit licence | Open format | Record changed within a year |
|------:|------------:|---------------:|----------------:|-------------------------:|
| 0 | 75 | 67 | 18 | 200 |
| 8000 | 14 | 3 | 57 | 200 |
| 16000 | 1 | 0 | 200 | 200 |

All numbers are out of 200. The second page has 14 organisations, and 165 of the 200 datasets came from a single harvest, `data-apdkritis`: the records were created on 14 March 2026. The third page is a single organisation, `keratsini-drapetsona`; all 200 records were created on 22 May 2026, and the harvest source is called `gis-keratsini-drapetsona-wms-only`. The format field made the short list for all 200, while none has an explicit licence. The share "open format 100%" describes this batch, not the portal.

Sorting by identifier mixes publishers. Three pages of 200 at offsets 0, 8000 and 16000: 70, 80 and 76 organisations; an explicit licence for 39, 41 and 36; an open format for 116, 110 and 115. The spread is smaller, but these are still three pages, not a census of 22,765 datasets. Large publishers take up a noticeable share of every page. For a report, take every Nth dataset, as in the self-audit, and write down the selection rule.

The same day the open.canada.ca API showed 48,083 datasets. Three pages by identifier, 200 records each: an explicit licence for all 200, an open format for 88, 83 and 92. On these pages the licence no longer distinguishes the catalog from itself. Look at a share that can still fail.

The date in the command also lies easily. The `metadata_modified` field within the last year is filled in for all 200 records in all three Greek slices, including the batch from one municipality. By this field the portal looks completely fresh. For the `dedo` dataset, `metadata_created` dates the record to 17 November 2025, while the file's `created` field says 15 June 2018. After a portal migration, the record's birth date is the migration date. Data freshness is judged by the file date or the promised frequency. How a portal itself calculates when the next file is due, using HDX as the example, is in the chapter [on good practices](../09-practices/01-good-practices.md).

On a repeat run the page boundary may shift by a record: datasets keep being added to the catalog. The report records the date, the offset and the sort order.

## What to count

For a city or agency portal, five numbers are enough. They go on the summary page from the chapter on self-audit.

| Number | How to count | When it is already a queue |
|-------|-------------|------------------------|
| Explicit licence | the share of datasets where the licence is a link to a known text, not an empty field and not "not specified" | less than half the sample |
| Live file | the share of datasets where the link opened a file | a noticeable share leads to a site page or does not respond |
| Open format | the share of datasets with at least one file from a list you have written down | the list is not written down, and the share cannot be repeated |
| File freshness | the share of datasets whose file date fits the promised frequency | only the record has a date |
| Full dump | yes or no: all descriptions open without a login | there is no dump. This is not a share but a threshold |

The thresholds for "good" and "bad" are set for your own task. A licence on fewer than half of the sample is already a queue for fixing, not a reason to argue about weights.

Alongside these five, keep a separate list that is not mixed into the same share.

| What else | What is recorded | What the number does not see |
|---------|----------------|---------------------|
| Completeness of other fields | publisher, contact, period, territory: each as its own share with its own degree of "filled in" | copied text, unless it was looked for separately |
| Interoperability | whether the dump passes the validator for its profile | the truth in fields that are formally present |
| Use | downloads, API calls, links from articles, together | file quality. A large number of views does not replace it |
| Content | the share of short files and the total volume | this is another quality level. The procedure is in the [substantive check](./04-self-audit.md#substantive-check) |

The unit in the denominator depends on the type. For tables it is a dataset, for an indicator catalog a series, for a geoportal a layer, for microdata a study. What to count by files for each type is collected in the same chapter on self-audit.

## What to count with

Fields and links are counted by a program. Whether a description matches a neighbouring record and whether a period is plausible is checked by eye, on the same thirty records.

The addresses below responded on 14 October 2026.

| What it checks | Tool |
|---------------|------------|
| The dump conforms to DCAT-AP | the [DCAT-AP validator](https://www.itb.ec.europa.eu/shacl/dcat-ap/upload) on the European Commission's testing platform |
| Layer descriptions and services conform to INSPIRE | INSPIRE Reference Validator: the European Commission [closed the central instance on 1 April 2026](https://knowledge-base.inspire.ec.europa.eu/news-and-publications/news/discontinuation-inspire-reference-validator-2026-04-01_en); the code and test suites are open, and the validator is deployed in-house on [ETF](https://github.com/etf-validator/) |
| schema.org markup on a dataset page can be read | [Schema Markup Validator](https://validator.schema.org/) and [Google's Rich Results Test](https://search.google.com/test/rich-results) |
| A research repository record looks FAIR | [F-UJI](https://www.f-uji.net/), by the record's identifier or address. The program does not read file contents |
| Records the European portal has harvested | [MQA on data.europa.eu](https://data.europa.eu/mqa/). A catalog that sends nothing there gets no score |
| File links open | an address check. A 200 response code does not yet mean the link leads to a file |

A link check distinguishes four outcomes: the file opened, the server refused, no response, a site page opened. On 14 October, of a dozen links from one open.canada.ca page, nine succeeded, one was refused with 403, and two did not respond within 15 seconds. Of a dozen links from data.gov.gr, all twelve succeeded, and one led to an HTML section of the site. This is an acceptance check, not a share for the catalog. On CKAN an address may be a path from the site root, without `https://`. A check that requires the full site name will count a live link as empty. A soft failure, where the link opens but does not lead to a file, is covered under the term "broken link" in the glossary.

### How the MQA formula works

MQA is an example of someone else's formula, not a mandatory score for your own portal. How to read a catalog's score and why it covers only the counted descriptions is in the chapter [on methodologies](./03-methodologies-and-indices.md). Here is what one term of it is made of. The text below was checked against the methodology section in a catalog report of 12 October 2026. The methodology page on the site is dated 6 October 2026.

The checks are labelled with the four FAIR words: findability, accessibility, interoperability, reusability. The previous methodology had a fifth dimension, contextuality. The current one does not. The weight comes from whether the field is mandatory in DCAT-AP, not from a separate FAIR exam: a mandatory field is 1, recommended 0.5, optional 0.25. A dataset, a distribution and a data service share the same ceiling, 7.5. A catalog's score is the average on the same scale. The bands on the scale: up to 2.5 is sufficient, 2.5 to 5 good, 5 to 7.5 excellent.

Most checks work the same way: the property is filled in or not. A placeholder passes such a check. A live link is the exception, and it is weaker than it seems. Having an access URL of the correct form weighs 1. The check that the address responds weighs 0.25, even when the field itself is mandatory. Only a 2xx response to a header request counts. The file is not downloaded. A redirect, through which portals often serve a file, does not count.

Conformance to the SHACL profile is not part of the score. It is checked by a separate validator from the table above. The methodology does not check file contents, the legal force of the licence or the truth of the fields.

Your own formula can be shorter: weight by whether a field is mandatory, plus a check that the link opened a file. There is no need to repeat the 7.5 scale. Before putting someone else's score in a report, read the formula. The record score on data.gouv.fr counts the licence field as filled in even when it says "not specified". How that score works is in the chapter on good practices.

## What is easy to fake

**The number of datasets.** It is raised by cutting one series into files. A catalog of 50 honest datasets is more useful than a catalog of 5,000 empty records. If the number is still needed for a report, two others are put beside it: the share of short files and the total volume. How to calculate them is in the [substantive check](./04-self-audit.md#substantive-check). Where the line runs between slicing and a separate object is in the anti-pattern ["Fragmentation to boost the count"](../09-practices/02-anti-patterns.md#fragmentation-to-boost-the-count).

How far the counter diverges from the volume can be seen from a single snapshot. On 2 February 2022 a full dump of data.gov.ru gave 26,490 datasets and 29 GB, mostly uncompressed. 6.8 GB of that was a single snapshot of the address register, not updated since October 2019. 3,839 datasets, 14.5%, weighed less than a kilobyte. The compressed archive of the same snapshot is 14 GB: in other chapters this is the same data, already packed. On 14 February 2022 HDX, with a comparable number of datasets, about 31,000, had a downloaded portion of 6,600 datasets, 21%, that took up 205 GB. The estimate for the whole catalog from this portion is 950–1,000 GB; it is an estimate from an unfinished download. In the same download, data.gov.uk's uncompressed CSVs alone took up 222 GB, and that is not the whole portal. What remained on data.gov.ru after it reopened in 2025 is in the chapter on self-audit.

So an indicator such as "publish N datasets" without a list of datasets measures nothing: such a figure is collected in a day from short tables. A meaningful target is a list of specific datasets, for example [high-value datasets](../02-data/01-what-is-published.md), and the share of them published.

**Home page views.** They do not see those who take the dump. If the main entry point is the API, count that too. How not to turn statistics into an annual figure for its own sake is in the chapter [on other capabilities](../04-features/10-other-capabilities.md).

**A score for a field that is formally present.** A validator and MQA check presence. They do not check that the description is not copied from a neighbouring dataset or that the period is not a placeholder. Viewing a few records is added to the automated assessment.

**A date moved by a migration or by monitoring.** Editing a record and reloading the catalog update `metadata_modified` without updating the rows. A monitoring section may mark as "updated" a dataset consisting of a single old figure. This was the case on data.gov.uz. The analysis is in the self-audit, in the section on where a pass deceives.

## Signs of life

A separate task is to understand whether a portal is alive at all. For someone else's catalog you plan to rely on, and for your own if nobody has opened it for a long time, five checks are enough. They are done before a full download of the files.

- the date of the last **new** dataset, and not the date of the portal migration: an old file may have yesterday's date in its record;
- the date of the last news item or changelog entry;
- whether there are series with a promised frequency and whether the file date matches that frequency;
- the share of links that open a file rather than a page;
- whether sections that used to exist have disappeared: the publication plan, usage statistics, data requests.

When the visitor statistics page disappeared from data.gov.ru in spring 2022, and data.mos.ru's publication plan had already been removed in 2020, this was more telling than any ranking. For government portals in 2020–2022 there was a simple historical test: did they publish COVID-19 data while it was needed? Thailand's data.go.th updated such statistics every day; Russia's data.gov.ru did not. Today the same question is asked of a series someone still needs on schedule: a budget, an exchange rate, a weekly operational dataset. A portal on which such a series is updated on the promised day is alive regardless of its dataset counter.

## Sources

- [MQA methodology](https://data.europa.eu/mqa/methodology): page of 6 October 2026; the methodology section in a [catalog report](https://data.europa.eu/api/mqa/reporter/report/en/pdf?catalogueId=codsi) of 12 October 2026: four FAIR dimensions, weights 1 / 0.5 / 0.25, scale 0–7.5, a link check by 2xx code, SHACL not part of the score
- [DCAT-AP validator](https://www.itb.ec.europa.eu/shacl/dcat-ap/upload), [F-UJI](https://www.f-uji.net/): the addresses opened on 14 October 2026; INSPIRE Reference Validator: [JRC announcement of the closure of the central instance](https://knowledge-base.inspire.ec.europa.eu/news-and-publications/news/discontinuation-inspire-reference-validator-2026-04-01_en), 1 April 2026, [ETF](https://github.com/etf-validator/) and [executable test suites](https://github.com/inspire-eu-validation/ets-repository) for your own installation
- [Schema Markup Validator](https://validator.schema.org/), [Dataset markup in Google's documentation](https://developers.google.com/search/docs/appearance/structured-data/dataset)
- [CKAN 2.12 Action API](https://docs.ckan.org/en/2.12/api/)
- data.gov.gr and open.canada.ca APIs, 14 October 2026: slices of 200 datasets, sorted by record creation date and by identifier
- I. Begtin, Telegram (in Russian): [a full dump of data.gov.ru](https://t.me/begtin/3508), 2 February 2022; [comparing portal volumes](https://t.me/begtin/3563), 14 February 2022; [the "500 datasets" indicator](https://t.me/begtin/6522), 21 March 2025; [data.mos.ru running on inertia](https://t.me/begtin/3425), 17 January 2022; [the status of portals in spring 2022](https://t.me/begtin/3828), 5 May 2022; [COVID-19 data as a sign of a live portal](https://t.me/begtin/3382), 15 December 2021, and [data.go.th](https://t.me/begtin/4078), 17 July 2022
- [Metadata depth](../04-features/03-metadata-depth.md), [self-audit](./04-self-audit.md), [methodologies and rankings](./03-methodologies-and-indices.md), [anti-patterns](../09-practices/02-anti-patterns.md)
