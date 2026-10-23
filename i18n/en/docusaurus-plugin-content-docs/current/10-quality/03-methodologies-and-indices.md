---
title: Methodologies and Rankings
description: "Which score answers which question: a file, a record, a catalog in the European federation or a country."
---

# Methodologies and Rankings

A score answers one question. France has 100% in the Open Data Maturity report for 2025. The same national portal had 4.27 out of 7.5 in the data.europa.eu record assessment on 11 October 2026, and the average included 211 descriptions, although in the European portal's search this catalog is listed with 76,548 datasets. Both numbers can be cited. Substituting one for the other cannot: a self-audit of one site also answers its own question, and it is covered in the neighbouring chapter.

The table first. The year is the release that can be cited now.

<div className="wide-table">

| Methodology | Unit | What it measures | What stays out of view |
|----------|---------|------------|------------------------|
| Five stars (2010) | one file | a ladder of formats: from a licence to linked data | the portal, freshness, live links |
| FAIR (2016) and F-UJI | one record | fields, identifiers and access conditions | file contents and the open data portal |
| MQA | records harvested by data.europa.eu | DCAT-AP completeness and link responses | datasets not in the calculation, and rows inside files |
| A record score on your own portal | one record | the fields the portal itself has decided to check | other catalogs and file contents |
| CoreTrustSeal | a repository as an archive | procedures, preservation, rights | each file and a city budget |
| Open Data Maturity (2025) | a European country | policy, portal, quality control and impact, by questionnaire | a specific CSV |
| OURdata (2025) | the central government of an OECD country | data availability, accessibility and support for reuse | impact and a city site |
| Global Data Barometer, 2nd ed. (2025) | a country in Africa or Latin America | data for accountability, governance and skills | Europe in this edition |
| ODIN 2024/25 | a statistical office site | coverage and openness of official statistics | the open data portal, unless the office links to it |
| The registry trust score | a catalog record | a rough filter for thousands of catalogs from outside | whether datasets are updated and whether the file opens |

</div>

## How to read someone else's score

Before putting a number in a report, answer four questions.

1. **The unit.** A file, a record, the records harvested by the upper portal, a country's policy or a statistical office site.
2. **Who filled it in.** A program, the country itself or an expert working from open sources.
3. **Which release.** If questions or weights changed between releases, last year's score is not added to this year's.
4. **How many records are inside the score.** An average over two hundred records and an average over the whole catalog are different statements. Write this number next to the score.

Next, how each family differs. A live analysis of three catalogs in the European federation is in the section on MQA.

## One file

**Five-star open data** (Tim Berners-Lee, 2010) is a ladder for one dataset.

| Star | What is already there |
|--------|----------------|
| 1 | The file is on the web under an open licence. Any format, even PDF |
| 2 | It is a structure a program can read: a table, not a picture of a table |
| 3 | The format is open: CSV, JSON or XML, not a file from one paid program |
| 4 | Entities inside the data have addresses that can be referred to |
| 5 | Those addresses link to other people's data |

One exemplary table earns five stars in a dead catalog. The ladder is good for a conversation about format. It does not work as a portal audit.

The Open Data Maturity questionnaire asks a country whether it uses this ladder or a similar model. The score goes to the national team's answer, not to a count of stars across files.

## One record

**The FAIR principles** (2016) say that research data should be findable, accessible, interoperable with other data and reusable. These are requirements for the record and the access conditions. FAIR and "open" are different properties: a dataset with closed files can also comply if the description is open, the identifier persistent and the access procedure clear. For a city CSV the principles provide vocabulary. They do not replace a licence or a DCAT dump.

[F-UJI](https://www.f-uji.net/) gives an automated score to one record by its identifier or page address. The program looks at fields and identifiers. It does not read file contents. How to run a record through it, and what else to measure quality with, is in the chapter [on metrics](./02-metrics.md). Where FAIR is mandatory for a repository is in the chapter [on research repositories](../03-types/04-scientific-repositories.md).

## Records harvested by the upper portal

**MQA** on data.europa.eu assesses the descriptions that portals send to the European catalog. A catalog that sends nothing there gets no score, however tidy it may be.

The catalog scale is 0 to 7.5. A field's weight is taken from whether it is mandatory in DCAT-AP: mandatory is 1, recommended 0.5, optional 0.25. Three parts of a description are checked: the dataset, the distribution and the data service. A catalog's score is the average over the datasets the assessment has counted, plus separate data services that sit in the catalog on their own. A deprecated distribution is not included in the average. A link counts as accessible if a header request gets a 2xx code. The file is not downloaded, and a redirect does not count. The methodology does not check file contents, the legal force of the licence or the truth of the description.

The checks are still labelled with the four FAIR words: findability, accessibility, interoperability, reusability. The weight, however, comes from whether a field is mandatory, not from a separate FAIR exam. The methodology page is dated 6 October 2026. Your own formula can be built on the same principle: weight by whether a field is mandatory, plus a live link check. More in the chapter [on metrics](./02-metrics.md).

A score is read together with the number of descriptions in the calculation. On 14 October 2026, 200 of 215 catalogs in the MQA cache had a score. The calculation dates in this cache are 23–24 September and 11 October. The average catalog score is 4.75 out of 7.5, the median 4.91. That is an average of catalogs, not the quality of all European datasets.

Three catalogs in the MQA snapshot of 11 October 2026. The number of datasets in data.europa.eu search was taken on 14 October.

| Catalog | Score | Descriptions in the calculation | Datasets in search |
|---------|-----:|-------------------:|-----------------:|
| [data.gov.uk](https://data.gov.uk) | 2.66 | 9,505 | 59,041 |
| [data.gouv.fr](https://www.data.gouv.fr) | 4.27 | 211 | 76,548 |
| [dati.gov.it](https://www.dati.gov.it) | 6.69 | 61,693 | 61,748 |

Among the British records included in the score, not a single distribution had a direct file link. Nor a licence from the European code list. The licence field is filled in for 25.9% of distributions. An access URL is present for 99.9%: it is a mandatory field and a heavy one. The address itself responded for 35.4%. The dataset theme is filled in for 3.5%, the contact for 0.9%, period and territory for none. Hence 2.66 with almost ten thousand descriptions in the calculation. In the European portal's search the same catalog has 59,041 datasets, so this score also covers a share of the harvest. The UK does not take part in Open Data Maturity: that is a different scale and a different set of countries.

The Italian 6.69 rests on an almost complete harvest: 61,693 descriptions out of 61,748 in search were included in the calculation. Every distribution has a licence and a direct link. This is the top of the record scale. It still says nothing about the rows inside the files.

The French 4.27 was calculated from 211 descriptions. Alongside in search are 76,548 datasets from the same catalog, the "open platform for French public data", that is, data.gouv.fr. Citing 4.27 as an assessment of those 76,000 is not possible. First check how many records went into the average.

Commands for your own catalog, if it is already in data.europa.eu. The British identifier is `data-gov-uk`, the French `plateforme-ouverte-des-donnees-publiques-francaises`, the Italian `dati-gov-it`.

```bash
curl -s "https://data.europa.eu/api/mqa/cache/catalogues/data-gov-uk" \
  | jq '{score: .result.score, assessed: .result.counts.value}'
curl -s "https://data.europa.eu/api/hub/search/catalogues/data-gov-uk" \
  | jq '{listed: .result.count, home: .result.homepage}'
```

The first shows the score and the number of descriptions in the calculation. The second, how many datasets the European portal holds in search. If the second number is much larger than the first, the score describes a piece of the harvest.

In the Open Data Maturity report for 2025, five MQA metrics appear alongside the questionnaire as a pilot, one catalog per country. They are not included in the quarter of the country score. Nor are automated checks of the portal's home page: mobile layout, speed, security and accessibility. The "quality" dimension in that report is answers about whether the country monitors metadata. That is the next section.

## A score on your own portal

A portal can show a publisher a record score before anyone above harvests it. On data.gouv.fr it includes the length of the description, file descriptions, frequency and keeping to it, an open licence, an open format, territory and period. The score has been experimental since 2022. How it works and what was covered on 14 October 2026 for the record of the catalog itself is in the chapter [on good practices](../09-practices/01-good-practices.md). This is a third number alongside the country questionnaire and MQA: the publisher sees it on their own site.

## Archive

**CoreTrustSeal** certifies a repository as a place that can be trusted with data for a long time: procedures, preservation, rights. A city budget portal does not need an archive certificate. How many repositories hold it and what requirements the questionnaire includes is in the chapter [on research repositories](../03-types/04-scientific-repositories.md). In the re3data registry the certificate mark sits next to the record. It is a signal for someone choosing where to put data for years.

## Country

Indices compare policy and the availability of data in a country. The score goes to the country, not to a city site. One limitation is shared: a high score leaves open the question of whether a specific file opens.

**Open Data Maturity** is an annual assessment since 2015; the eleventh edition came out in December 2025. Participation is voluntary. Since 2018 the score has consisted of four equal parts: policy, portal, quality and impact. In 2025 the questions were not changed; the last restructuring of the questionnaire was in 2024.

It is a survey of national representatives. Most questions are a choice from ready answers plus a link or an explanation. The data.europa.eu team checks that the explanation relates to the question. Since 2024 the questionnaire has been pre-filled with last year's answers, and what the country has changed and the new questions are examined in detail. A repeated "yes" is not re-checked against files.

In 2025, 36 countries took part: the 27 EU countries, three EFTA countries (Iceland, Norway, Switzerland) and six candidates (Albania, Bosnia and Herzegovina, Montenegro, North Macedonia, Serbia, Ukraine). The average score of all participants is 81%, one point above 2024. The EU-27 average is 86%, three points higher. Within the EU-27, policy (93%) and portal (85%) score highest, followed by quality (83%) and impact (82%). 21 of the 36 countries are above 80%. France scored 100% across the questionnaire's topics, Lithuania and Poland 98%. Among EFTA countries Norway is highest (92%), among candidates Ukraine (97%). The biggest rises were Albania (23 points), Malta (19) and Germany (11). One country's score fell. Montenegro and North Macedonia have no comparison with 2024: they were assessed for the first time.

A jump of 23 points in a year is about the answers and examples a country was able to show. The "quality" dimension asks whether there is a procedure for updating metadata, whether licences and DCAT-AP are monitored, and whether the share of data that passes a chosen model such as five stars is known. It is not the same as an MQA score.

The answer "this EU rule does not apply to us" to questions about EU legislation gives full marks. This is how comparisons with EFTA countries and candidates work: their high percentage includes questions that were removed for them.

**OURdata** by the OECD measures the openness of government data in OECD countries. The 2025 edition was published on 16 February 2026 and is the latest as of October 2026. The data was collected by surveying central government bodies in 2025 and describes policy from 1 January 2023 to 31 December 2024. Three equal parts: data availability, accessibility and government support for reuse. The scale is 0 to 1. The index does not measure the impact of open data. The average score of OECD countries rose from 0.48 in the 2023 edition to 0.53. France (0.96) and Korea (0.95) are highest. There is no 2025 data for Denmark, Hungary and the US. The unit is central government; a city site is not part of the score.

**Global Data Barometer** looks at data needed for accountability: procurement, companies, land, political integrity, public finance, plus data governance and skills. The second edition came out on 29 May 2025. It covers 43 countries in Africa and Latin America and the Caribbean, 27 core indicators, and the period from 31 August 2022 to 1 September 2024. The first edition, May 2022, covered 109 countries and the period from May 2019 to May 2021. Scores from the two editions are not combined: the number of indicators, the weights and the counting rules changed. A European country has no score in the second edition. A figure from the first edition is a snapshot of 2019–2021.

**ODIN** (Open Data Watch) assesses official statistics. The 2024/25 edition is the seventh; it covers 197 countries, and the ranking page was updated on 21 July 2025. It looks at the national statistical office site and the official pages it links to. Coverage means whether there is data on 22 topics, with breakdowns, for a run of years and by territory. Openness means a machine-readable and open format, a description, a way to download a selection or everything at once, and an open licence. The average country score rose by 12.5% compared with 2022. Average openness is 59 out of 100: data that does not exist is not assessed for openness, and for data that does, the format and licence are often still closed.

Uzbekistan scored 83 in this edition: coverage 78, openness 87. That is the statistical office site. The open data portal data.gov.uz in February 2023 consisted 96% of short files; the analysis is in the chapter [on self-audit](./04-self-audit.md). Two sites, two scores.

Old indices are useful as a history of the method. The World Wide Web Foundation's **Open Data Barometer**: the fourth and last full edition came out in May 2017 (period July 2015 to June 2016), and an edition for 30 governments in September 2018 (period July 2016 to September 2017). There have been no global editions since. Global Data Barometer grew out of this work and keeps its own count. Open Knowledge's **Global Open Data Index**: the last edition is 2016/17, published in June 2017, 94 places. There was no 2018 edition; the site is archived. These scores cannot be cited as current.

## A rough assessment in the catalog registry

The dataportals-registry calculates an optional trust score from 0 to 100. It is not a certificate. The score consists of five parts: the owner type (science above business, central government above local), the catalog type (a repository slightly above a portal; aggregators and marketplaces are marked down), the licence, a re3data record and certificate, and whether the site and API are alive. An empty licence description lowers the score. The total is clipped to the range 0 to 100.

The owner type weighs more than the rest: science gets 40 points, a community 5. The "federal government" type is not named in the score table, so such a catalog gets the same 10 points as an empty owner field. A low score for a federal platform may be a hole in the formula rather than a verdict on the catalog.

The score rewards filling in the catalog record. It does not see whether datasets are updated or whether the file opens. It is too rough for a self-audit of your own portal. For a first selection from thousands of catalogs from outside, it is a reasonable filter. The formula is in the registry documentation, linked below.

## What to take for yourself

| Situation | What to open |
|----------|----------------|
| You are fixing a city or agency portal | a self-audit: files, records, dump. A country index is not applied to a single CSV |
| data.europa.eu already harvests you | MQA, and next to it the number of descriptions in the calculation. If it is far from the number of datasets in search, the score describes a piece |
| You run a research archive | FAIR for the record and, when the archive is trusted with data for years, CoreTrustSeal |
| You are responsible for a European country's open data | Open Data Maturity, to compare policy and portal with neighbours. File quality is still checked at home |
| You compare countries' official statistics | ODIN. That is the statistical office site, not necessarily the national portal |
| You are choosing someone else's catalog from thousands | the registry trust score as a first filter, then the signs of life from the chapter on metrics |

A city portal does not raise a country index on its own. A country index does not open a city file. The task is set at the unit where things are broken.

## Sources

- [5-star open data](https://5stardata.info/), Tim Berners-Lee, 2010; [FAIR Principles](https://www.go-fair.org/fair-principles/); M. D. Wilkinson et al., [The FAIR Guiding Principles](https://doi.org/10.1038/sdata.2016.18), Scientific Data, 2016; [F-UJI](https://www.f-uji.net/)
- [CoreTrustSeal](https://www.coretrustseal.org/); the number of certified repositories and the 2026–2028 requirements are in the chapter [on research repositories](../03-types/04-scientific-repositories.md)
- [MQA](https://data.europa.eu/mqa/), methodology as of 6 October 2026; the catalog cache and data.europa.eu search on 14 October 2026, score calculation dates in the cache 23–24 September and 11 October. Catalogs: `data-gov-uk` (2.66 of 7.5 from 9,505 descriptions, 59,041 in search), `plateforme-ouverte-des-donnees-publiques-francaises` (4.27 from 211 descriptions, 76,548 in search), `dati-gov-it` (6.69 from 61,693 descriptions, 61,748 in search). Average catalog score 4.75 of 7.5, median 4.91, 200 of 215 have a score
- [Open Data Maturity](https://data.europa.eu/en/open-data-maturity/2025), [2025 report](https://data.europa.eu/sites/default/files/2025-12/2025_odm_report_5.pdf): 36 countries, EU-27 86%, all participants 81%, France 100%; [2025 methodology](https://data.europa.eu/sites/default/files/2025-12/2025_odm_methodology.pdf): four dimensions at 25% each, a pre-filled survey, pilot MQA metrics not part of the score
- OECD, [Digital Government Index and OURdata Index: 2025 Results and Key Findings](https://www.oecd.org/en/publications/digital-government-index-and-open-useful-and-re-usable-data-index_6347ec74-en.html), 16 February 2026: OECD average 0.53, no data for Denmark, Hungary and the US; previous edition [OURdata Index 2023](https://www.oecd.org/en/publications/2023-oecd-open-useful-and-re-usable-data-ourdata-index_a37f51c3-en.html), 22 December 2023, average 0.48
- [Global Data Barometer, second edition](https://globaldatabarometer.org/2025/05/the-global-data-barometer-2nd-edition-a-shared-compass-for-navigating-the-data-landscape/), 29 May 2025: 43 countries; [first edition](https://globaldatabarometer.org/2022/07/launch-of-the-first-edition-of-the-global-data-barometer/), May 2022: 109 countries; [comparing the editions](https://globaldatabarometer.org/2025/05/how-to-compare-data-between-the-two-editions-of-gdb/)
- [ODIN 2024/25](https://odin.opendatawatch.com/biennialReport2024): 197 countries, average score up 12.5% on 2022, average openness 59; [ranking](https://odin.opendatawatch.com/rankings), updated 21 July 2025: Uzbekistan 83 (coverage 78, openness 87)
- [Open Data Barometer](https://opendatabarometer.org/barometer/): 4th edition, May 2017; leaders edition, September 2018. [Global Open Data Index](https://index.okfn.org/): archived, last edition 2016/17, June 2017, 94 places
- [Trust score in the registry](https://datenoio.github.io/dataportals-registry/docs/trust-score/)
- [Metrics](./02-metrics.md), [self-audit](./04-self-audit.md), [quality levels](./01-quality-levels.md), [good practices](../09-practices/01-good-practices.md)
