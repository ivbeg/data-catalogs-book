---
title: Catalog Self-Audit
description: "One pass through a catalog: a sample of descriptions, the files, publisher coverage and a page with a queue for the month."
---

# Catalog Self-Audit

A self-audit is one pass through a catalog, after which it is clear what to fix in the coming month. The result fits on a page: when it was checked and against which list, a few shares, five records with typical errors and two queues. One is for the record editor, the other for whoever is responsible for the platform.

A country ranking and an archive certificate answer other questions. Their place is covered in the chapters [on quality levels](./01-quality-levels.md) and [on methodologies](./03-methodologies-and-indices.md). This chapter gives the order for your own portal and for someone else's that you plan to rely on.

A full pass is done every six months and on the day the platform or address changes: old links break immediately. Once a month it is enough to open a dozen known links. Quarterly and annual platform checks are in the chapter [on lifecycle](../09-practices/03-lifecycle.md). Two people look. Rows and records: whoever is responsible for the data. The dump, addresses and version: whoever is responsible for the platform.

## Two scales

A sample of 30 datasets catches a typical record error: no licence, a placeholder period, a file that does not open. The share of short files, the total volume and the year of publication are calculated from a dump of the files, preferably all of them. Below are two portals where the records looked alive, and counting the files showed one-line notes.

| Scale | What it answers | When |
|---------|----------------|-------|
| 30 records from different publishers | a typical description error and a broken link | every full pass |
| All files or every Nth, several hundred | distribution by size, total volume, file year, gaps among the main publishers | when the dataset counter has become the main number in reports, at portal acceptance and after a sharp rise in that counter |

A share from thirty is recorded as a share of the sample: "of 30 datasets, 20 have no licence". If the same gap is in most of the thirty, fix the rule for filling in records, not those thirty records.

## How to take thirty

They are taken from the full dump, not from the first page of the site and not from a "recently updated" block. Listings start with what the editors have just fixed. A convenient method is to sort records by identifier and take every Nth, where N is the number of datasets divided by 30. For a catalog of 6,000 records that is every two-hundredth.

Publishers must vary. If nine-tenths of the catalog is one agency, thirty records will tell you about that agency. Then a few datasets from the long tail are added to every Nth, and the "scope" field says so.

If there is no dump, the same thirty are collected by browsing the general list on the site. The first line of the result says "no full dump". The other metrics are still calculated without it, but the catalog is no longer fit for [federation](../07-publishing/03-federation-and-harvesting.md).

How to count licence, date, period and open format, and which validators to run the profile through, is in the chapter [on metrics](./02-metrics.md). Profile errors (DCAT-AP, INSPIRE, DataCite) are kept in a separate list from empty fields: a validator checks that a field is present and is silent if neighbouring records contain the same text.

## Steps

1. Find the catalog in the relevant registry, if it is there, and check its address and type. A wrong record confuses those looking for the portal. Record both the number of datasets on the site and the number in the dump or API: they often differ.
2. Open the dump of all descriptions and the page of one dataset without a login. Registration, a captcha or an "I am not a robot" check mean there is no machine access. Commands for the sitemap, `data.json`, API, OAI-PMH and CSW are in the [live portal checklist](../12-appendices/04-checklists.md#checking-a-live-portal).
3. Take 30 datasets as above and count licence, date, period and whether the file opens. Compare the date in the record with the date inside the file. A field such as CKAN's `metadata_modified` is the date the record was edited.
4. Run the dump through the validator for your profile. The list of tools is in the chapter on metrics.
5. If the question is about volume, count the files as in the next section.
6. Write down the five to ten main publishers for the topic or country and mark whether their data is present. An empty cell against the statistical office or the treasury matters more than a hundred small datasets.
7. Check the result against the [requirements checklist](../06-choice/07-requirements-checklist.md). An item you yourself marked as mandatory and have not met goes to the front of the queue.
8. Set aside five records from different publishers, with links. Five errors from one agency speak about that agency, not about the catalog.

Someone else's catalog is walked through the same way. The queue is then shorter: take it, go to the original source, or postpone. Before downloading files it makes sense to go through the [signs of life](./02-metrics.md#signs-of-life): a dead portal is not downloaded in full.

## Substantive check

The four questions are the same for any catalog. What changes is the unit being counted.

| Type | What to count | Where to find the commands |
|-----|-------------|------------------------|
| Tables, an open data portal | rows, compressed volume, file year | this section |
| Indicator catalog | series length and whether there is a dump of the whole database | [indicator catalogs](../03-types/05-indicator-catalogs.md#how-to-check-an-indicator-catalog) |
| Geoportal | the layer serves features, not just a record | [geoportals](../03-types/03-geoportals.md#how-to-check-a-geoportal) |
| Research repository | there is a file behind the record page | [research repositories](../03-types/04-scientific-repositories.md#how-to-check-a-research-repository) |
| Microdata | a study has variables and access conditions filled in | [microdata](../03-types/06-microdata-catalogs.md#how-to-check-a-microdata-catalog) |
| ML catalog | the file opens without a login, the training licence is named | [ML catalogs](../03-types/07-ml-catalogs.md#how-to-check-an-ml-catalog-and-a-dataset) |

For tables the questions are these.

1. **Size.** Sort the files by number of data rows: empty or one row, up to 100, 100 to 10,000, more. If most are in the first group, the catalog consists of short notes, or one series has been cut into pieces. Where the line runs is in the anti-pattern ["Fragmentation to boost the count"](../09-practices/02-anti-patterns.md#fragmentation-to-boost-the-count).
2. **Volume.** Add up the file sizes and note whether they are compressed. Compare like with like, and with one known source on the same topic: a statistical database, an agency register, a city portal. A country's catalog that is smaller than one of its information systems does not cover the topic.
3. **Age.** The year is taken from the file or from the dataset's first-publication field, not from the record edit date. A new portal in which almost everything was first published many years ago has carried over the old.
4. **Coverage.** The publisher table from step 6. It is filled in from organisation names in the dump, not from memory.

For a folder of CSVs the first count is done like this. `wc` also counts the header row, so a file with one data row gives 2. The threshold "no more than 2" catches exactly the empty and single-row files. At the 100 and 10,000 thresholds a single header row does not change the group.

```bash
for f in data/*.csv; do wc -l < "$f"; done \
  | awk '{ n = $1
           if (n <= 2) a++
           else if (n <= 100) b++
           else if (n <= 10000) c++
           else d++ }
         END { print "empty or 1 row:", a+0,
                      " up to 100:", b+0,
                      " up to 10,000:", c+0,
                      " more:", d+0 }'
```

`+0` is needed so that an empty group prints as zero. A file with a CSV extension that opens as a site page is not included in this count: it is a broken link. The total size of the folder as it sits on disk:

```bash
du -ch data | tail -n 1
```

If you publish ZIP or gzip, the result records the archive size, not the unpacked folder. For XLSX and JSON, rows are counted with the program used to open the file. The thresholds are the same.

### data.gov.uz, February 2023 and July 2025

In February 2023 data.gov.uz had 6,623 datasets, more than most portals in the region. The formats were machine-readable, the fields had descriptions, and the monitoring section marked 6,120 datasets as updated. A CSV dump showed something else: 2,823 datasets (42.6%) consist of a single row, 6,381 (96%) are shorter than 200 rows, and the whole CSV takes up 40 MB. The largest file is 60,984 rows and 4.4 MB in CSV. The dataset "Eggs produced, total for Khorezm Region" is a single figure for 2020; in monitoring it was listed as updated on 26 December 2022.

Alongside, in the same weeks, data.gov.kg had 646 datasets and about 570 MB of files, mostly Excel. Ten times fewer datasets, more volume. The formats differ, so this is a comparison of order of magnitude, not of exact bytes.

In July 2025 a repeat count (the post gives the address as data.egov.uz): 10,412 datasets, 5,207 single-row, half; more than 1,000 records for 114, just over 1%. The uncompressed JSON dump is 426 MB; for 2023 the same post gives 284 MB of JSON. This figure is not put next to the 40 MB of CSV: the format is different. The number of datasets grew; the slicing rule stayed.

### data.gov.ru, July 2025

On 15 July 2025 the portal was reopened. The previous version had been closed in 2023 "for transfer to a new platform". Through the API there were 5,826 datasets; on the site pages, fewer. The compressed ZIP is about 100 MB, about 1 GB uncompressed. Of these 5,826 datasets, 4,694 (80%) are shorter than 100 rows, 586 (10%) have 100 to 500, 350 (6%) 500 to 10,000, and 62 (about 1%) 10,000 rows or more. About 3% could not be downloaded. By the first-publication field, 84% of datasets date from 2019 or earlier. The mark "updated in 2025" does not change the rows in the file: the post still suggested opening such datasets by hand.

The snapshot of 2 February 2022 is 26,490 datasets and 29 GB, mostly uncompressed. The packed archive of that snapshot is 14 GB; the 2025 analysis rounded it to "more than 24,000 datasets". It did not return to the new portal. For scale, from the same July 2025 analysis: the EMISS dump is 6,905 indicators and 4.36 GB of compressed CSV; a snapshot of data.mos.ru in November 2022 is 988 datasets and 3 GB compressed. No data from Rosstat or the financial agencies was found on the new portal.

Both analyses counted all files. A sample of descriptions on such a portal does not reveal this failure.

## What to write in the result

One page. It can be handed to an editor without retelling. A field that was not checked is filled in with the words "not counted", not a dash: a dash is later read as "all fine".

| Field | What to record |
|------|----------------|
| Date and scope | when it was checked; all datasets or a sample, from which list, whether files are compressed |
| Licence | the share of the sample where the licence is a link |
| Live link | the share of the sample where the file opened |
| Full dump | yes or no; whether it opens without a login; whether the count matched the site |
| Content | the share of empty and single-row files, the total volume marked "compressed" or "as stored" |
| Five records | typical errors, with links |
| Queue for the month | what the record editor and data owners fix |
| Platform queue | what requires a change of extension, dump or address |

This is what a completed page looks like for the February 2023 pass. Licence and the share of broken links were not counted in that analysis, and the table shows it.

| Field | data.gov.uz, February 2023 |
|------|---------------------------|
| Date and scope | February 2023, all 6,623 datasets, uncompressed CSV |
| Licence | not counted |
| Live link | the catalog was downloaded in full; the share of link errors was not counted |
| Full dump | existed, since the files could be retrieved |
| Content | 42.6% a single row; 96% fewer than 200 rows; 40 MB of CSV |
| Five records | "Eggs produced…" for Khorezm Region: a single figure for 2020, updated in monitoring on 26 December 2022 |
| Queue for the month | stop cutting the indicator by region; monitoring must look at the rows of the file |
| Platform queue | the file named RDF is the same XML, without a vocabulary |

A finding of "the platform cannot do what is marked mandatory" goes into a [decision record](../06-choice/04-justifying-decisions.md). The next pass checks the failed lines: has the single-row problem gone, does the dump open.

## Where a pass deceives

- **Your own monitoring.** The "updated" section on data.gov.uz dated a record containing a single old figure. Freshness is checked by the file.
- **The first page and "recently updated".** They hold datasets that have just been touched.
- **The record date.** Editing a description updates `metadata_modified` and does not update the rows.
- **The number of datasets in the result.** It is raised by slicing. The share of short files and the volume are needed alongside.
- **Compressed next to uncompressed.** The 29 GB data.gov.ru dump and the 14 GB archive of the same snapshot are one catalog. So are 40 MB of CSV and 284 MB of JSON.
- **Five records from one publisher.** That is a diagnosis of the publisher.
- **A green validator.** The profile passes while the file is empty. Content is checked separately.
- **A share without the word "sample".** Thirty records are not a census of a catalog with tens of thousands of entries.

## If agents read the catalog

If the catalog has an MCP server switched on, or AI agents rely on it, one more step is added to the pass. It is taken from the Open Knowledge Foundation pilots of 2026: users' frequent questions become tests.

1. Write down the ten questions that most often arrive by email or at support. For example: "how many schools are in the district", "where is last year's budget spending".
2. For each, record the correct answer, the dataset and a link to the record. Take the number from the file, not from memory.
3. Ask the same questions to an agent connected to the catalog's server.
4. Mark three outcomes: the right number with a link to the dataset, the right number without a link, wrong or invented.

A wrong answer most often points to an empty description, not to the model. In the OKFN pilot the model attributed "climate factors" to Uruguay's energy balance, which are not in the dataset. What helped was field definitions, units, period and known limitations in the description. A line "Agent answers: correct with a link N of 10" is added to the result of the pass. The test is repeated after every server update and after a major data revision. How the server works is in the chapter [on AI](../11-trends/01-ai-and-data-spaces.md#an-mcp-server-your-own-the-platforms-someone-elses).

## If there is no portal

A page, a Git repository and a dataset in a shared hub are checked against the [minimum for publishing without a portal](../08-beyond-portals/05-making-it-findable.md): the page opens without a login, the licence is in place, schema.org markup passes the test, its description is at least 50 characters long, the date and contact are filled in. There is nothing to check against a catalog registry and no profile validator to run. If the dataset must get into a regional or national portal, a file in the profile that portal harvests is added to the minimum.

The result page is the same. In fields for which there is no catalog, write "no portal". The queue is the unmet items of the minimum.

## Sources

- [Quality metrics](./02-metrics.md), [quality levels](./01-quality-levels.md), [methodologies and rankings](./03-methodologies-and-indices.md)
- [Requirements checklist](../06-choice/07-requirements-checklist.md), [live portal checklist](../12-appendices/04-checklists.md#checking-a-live-portal)
- [Anti-patterns](../09-practices/02-anti-patterns.md), [lifecycle](../09-practices/03-lifecycle.md)
- Open Knowledge Foundation, [MCP for Open Data Portals: Trust Depends on Understanding the Data](https://blog.okfn.org/2026/06/10/mcp-for-open-data-portals-trust-depends-on-understanding-the-data/), 10 June 2026: partners' frequent questions as tests, "climate factors" in an answer about Uruguay's energy balance
- I. Begtin, [What is wrong with Uzbekistan's open data portal?](https://begtin.substack.com/p/31) (in Russian), 13 February 2023: 6,623 datasets, 42.6% single-row, 40 MB of CSV, monitoring
- I. Begtin, [Kyrgyzstan's open data portal](https://t.me/begtin/4609), Telegram (in Russian), 11 February 2023: 646 datasets, about 570 MB
- I. Begtin, [a repeat count of data.egov.uz](https://t.me/begtin/6904), Telegram (in Russian), 10 July 2025: 10,412 datasets, 5,207 single-row, uncompressed JSON 426 MB against 284 MB in 2023
- I. Begtin, [a full dump of data.gov.ru](https://t.me/begtin/3508), Telegram (in Russian), 2 February 2022: 26,490 datasets, 29 GB uncompressed
- I. Begtin, [The updated data.gov.ru portal](https://begtin.substack.com/p/datagovru) (in Russian), 16 July 2025: 5,826 datasets, about 100 MB in ZIP, age by first publication, the 2022 archive at 14 GB, EMISS and data.mos.ru
