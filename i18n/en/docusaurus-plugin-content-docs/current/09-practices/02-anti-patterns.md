---
title: Anti-patterns
description: Recurring failures of data catalogs and how widespread they are.
---

# Anti-patterns

An anti-pattern is a decision that looks like publishing and does not let anyone use the data. Below are those that can be seen in live catalogs. Shares are from the dataportals-registry export (release 1.27.0 of 15 October 2026) unless stated otherwise.

## No metadata dump

34% of catalogs have no programmatic interface recorded. A federation harvester, or a program that needs one file of all descriptions, will not take such a catalog. A search engine will open the page if it has schema.org markup and a sitemap.

Among dataset lists, an interface is recorded for about 14% of registry entries. The findability of such a list rests on the licence, a persistent address and markup. A list without its own API is a normal approach for a few dozen datasets; see [when you don't need a portal](../08-beyond-portals/01-when-portal-not-needed.md).

An interface is recorded for 21% of marketplace entries, 23% of ML catalogs and 37% of indicator catalogs. For indicators this hurts most: a table builder in the browser has no substitute.

## A showcase for a deadline

Datasets were uploaded once and are not updated. The date in the record is the portal's launch day. There is an "Open data" section with no data in it: on the Rosmorrechflot (the Russian federal river and sea transport agency) site in 2026, a page says in words that data is published, while the link leads nowhere because the portal's domain was deleted back in 2022. The Perm city portal was replaced in 2023 by a page with two datasets, opening hours and a phone directory, although it had previously had more than 480.

The only thing worse than an empty date is a false one. data.gov.uz showed in its monitoring section a dataset as updated in December 2022 that contained a single figure for 2020. The update mark was set without changing the data. How to check your catalog for these signs is in the chapter [on self-audit](../10-quality/04-self-audit.md).

## Fragmentation to boost the count

The number of datasets is a portal's most visible figure, and it is easy to inflate. One indicator is cut into files by year, month and district so that the report says "several thousand". A user needs one dataset with a breakdown, or an API, not a hundred identical names that have to be downloaded one by one and stitched together.

What this looks like in numbers:

- Uzbekistan's open data portal had 6,623 datasets in February 2023, 42.6% of which consisted of a single row, and all the data together weighed 40 MB. By summer 2025 there were 10,412 datasets, 5,207 of them single-row: exactly half. Only 114 datasets had more than a thousand records.
- In autumn 2021 Rosstat's open data section held 1,547 datasets, of which 742 were files of identical structure that could have been published as one dataset. Without fragmentation there would have been about 190.
- Poland's dane.gov.pl claimed almost 18,800 datasets in 2020, more than 7,500 of them monthly files from a single patent office.
- At the end of 2025, 52,000 of the 63,000 datasets on Austria's data.gv.at were municipal budgets cut up by year.

A related trick is to pad the count with someone else's content. Vietnam's data.gov.vn claimed 10,616 datasets in 2022, of which 10,045 were books and articles from a university repository. There were fewer than six hundred datasets.

A dataset can be split if a part is needed on its own. Each municipality's budget is a separate object: people search for it by the town's name. A year of the same budget is not; it is a column. Central banks such as the ECB and the Bank for International Settlements publish each time series as a separate record, and this is justified: a series is the unit of search and is named as such, while the whole collection is served as a single dump. The test question is simple: would the user be better off if these datasets were merged into one? If so, it is fragmentation. How to measure a catalog by substance rather than by number of datasets is in the chapter [on metrics](../10-quality/02-metrics.md).

## A dashboard instead of data

The portal shows charts and widgets in a BI system (Power BI, Tableau, Qlik, Superset), and only what is on the screen can be downloaded. Pakistan's national open data portal nodp.gov.pk in 2026 is a set of Superset dashboards with statistics. The IAEA's nuclear reactor system PRIS is built on Power BI: the data is fresh, but it can only be obtained by exporting from a visualisation, with no API. Such sites are also no good for archiving: the web archive does not preserve BI system pages. The statistical BI portal for Moscow and the Moscow agglomeration on Rosstat's site will vanish without a trace if it is switched off.

A dashboard is a good addition to data, not a substitute. The IMF's new data portal also shows Power BI dashboards, but alongside it serves series through an SDMX API. The order is: first the dataset and the dump, then the visualisation.

## A file that cannot be read

PDF, a scan, a table with merged cells and a three-row header. The format counts as machine-readable only by its extension. There is no data dictionary.

The extreme case is a document passed off as data. The Russian Interior Ministry's site once published XML files saved from Word as open data: formally XML, in substance the markup of a text document. The same trick is an "RDF" export that is really ordinary XML without vocabularies or links. Such a file adds a format to the portal's statistics and gives a program nothing.

Quieter but no less harmful are files without a description of technical details. In the same Rosstat open data section (2021), half the CSVs used a comma and half a semicolon, about 30% were in windows-1251 encoding and the rest in UTF-8, and nowhere did it say which was which. Some files with a `.csv` extension turned out to contain a ZIP. Every user guesses again.

## Rights that cannot be found

A catalog-level licence could be recorded in the registry for only about 1% of entries. Details and a caveat are in the chapter [on licences](../07-publishing/04-licenses-and-access.md). In practice this means that even if a licence exists somewhere, it is not visible in the dataset description.

## The door is closed to programs

A captcha, mandatory registration to read a description, blocking of automated requests, undocumented limits. Metadata must be readable without a login. A file can be restricted, a record cannot.

There are more inventive locks too. In 2023 Kazakhstan's data.egov.kz dropped mandatory registration but began serving no more than 100 records from a dataset at a time; this was still the case in 2025. The European mass spectrometry catalog Metaspace gives a download link that stops working after half an hour: the file has no persistent address. Since 2024–2026 a new reason has joined the old ones: robots collecting data for model training. In 2026 the US Patent and Trademark Office put the bulk downloads and API of the data.uspto.gov portal behind registration, although it had been one of the most open. Protecting against load is possible, but in such a way that programs with clear intentions get through without manual approval: published limits, a key issued automatically, a full dump as a file that does not have to be pulled through queries.

The same door closes entirely when a site does not respond to requests from abroad. Many Russian government sites are unavailable outside Russian networks. Along with foreign users, Internet Archive, search engines and data aggregators stop seeing them: the catalog drops out of both the archive and search. This is easy to check: open the site through a service or server in another country. More on the consequences is in the chapter [on archiving](./04-archiving.md).

## A home-grown format instead of a standard

To collect datasets from thousands of sites, people invent their own list format instead of DCAT or schema.org. This happened in Russia: methodological recommendations obliged agencies and municipalities to keep a list of datasets in a CSV file according to their own schema, and data.gov.ru collected these lists. The result was thousands of small lists that were rarely updated, and a format no foreign aggregator or search engine understands. The harvesting standard is chosen from those others already read; see [federation and harvesting](../07-publishing/03-federation-and-harvesting.md).

## Links break during a move

The platform was changed, the dataset addresses became different, and there are no redirects. Or the file was not in the catalog but on a neighbouring site, and the neighbouring site moved. The rule was formulated long ago: in the W3C note "Cool URIs don't change" (1998), Tim Berners-Lee writes that it is not technology that changes an address but people who did not think about it in advance. The counter-example is data.gov: when moving off CKAN in 2026, it kept the old catalog at a separate address for a transition period. A persistent address and a migration plan are discussed before the move; see [identifiers](../04-features/06-identifiers-and-doi.md) and [the cost of leaving](../06-choice/05-build-or-buy.md).

## The portal was abandoned

868 catalogs in the registry are not active, and 98 have been decommissioned. A typical story: a pilot on a grant, the grant ended, nobody is left to update it. Closing can also be the right thing if the data and addresses were handed over. Silent decline is not.

Decline usually stretches over years. The Russian Ministry of Health's open data section did not update its datasets from 2017 and disappeared completely in spring 2024. The Social Insurance Fund's portal data.fss.ru by 2022 was still "in test mode", with no link from the fund's site and data for 2018. Signs of abandonment are visible long before shutdown: the last news item several years ago, the publication plan removed, file links leading nowhere. See [lifecycle](./03-lifecycle.md) and [archiving](./04-archiving.md).

## One dataset on three portals

A city, a region and a country show the same record and do not say which is the source. Search lies about the number of datasets, and an error has to be fixed in three places. The copy's record must link to the original.

## Sources

- The dataportals-registry export, release 1.27.0 of 15 October 2026.
- [Data on the Web Best Practices](https://www.w3.org/TR/dwbp/), W3C, 2017: descriptions, licence, persistent addresses and access for programs as mandatory practices
- [Cool URIs don't change](https://www.w3.org/Provider/Style/URI), W3C, 1998
- [Announcement of the new data.gov catalog](https://data.gov/blog/catalog-update/), 15 April 2026
- I. Begtin, [What is wrong with Uzbekistan's open data portal?](https://begtin.substack.com/p/31) (in Russian), February 2023: dataset sizes and update monitoring on data.gov.uz
- I. Begtin, [Why it is impossible to praise Rosstat](https://begtin.substack.com/p/22) (in Russian), January 2022: an analysis of Rosstat's open data section
- I. Begtin, [Good and bad data publishing practices](https://begtin.substack.com/p/2ef) (in Russian), November 2024: the Interior Ministry example; catalogs of bad practices [OpenDataFail](https://x.com/opendatafail) and [Bad Data](https://github.com/datopian/bad-data)
- I. Begtin, [Why data on Russia is so hard to find](https://begtin.substack.com/p/816) (in Russian), November 2024: sites unavailable from abroad and a home-grown harvesting format
- I. Begtin, Telegram (in Russian), on fragmentation: [dane.gov.pl](https://t.me/begtin/2374), 17 December 2020; [data.gov.vn](https://t.me/begtin/4181), 21 August 2022; [data.egov.uz in 2025](https://t.me/begtin/6904), 10 July 2025; [data.gv.at](https://t.me/begtin/7322), 23 December 2025; [when slicing is justified](https://t.me/begtin/5332), 11 January 2024
- I. Begtin, Telegram (in Russian), on dashboards: [PRIS](https://t.me/begtin/7767), 11 September 2026; [nodp.gov.pk](https://t.me/begtin/7716), 15 August 2026; [Rosstat's BI portal](https://t.me/begtin/6735), 23 May 2025; [data.imf.org](https://t.me/begtin/6620), 19 April 2025
- I. Begtin, Telegram (in Russian), on closed access: [data.egov.kz](https://t.me/begtin/4839), 26 April 2023, and [in 2025](https://t.me/begtin/7179), 29 October 2025; [Metaspace](https://t.me/begtin/5749), 11 July 2024; [data.uspto.gov](https://t.me/begtin/7643), 23 June 2026
- I. Begtin, Telegram (in Russian), on abandoned sections: [Perm and Primorye](https://t.me/begtin/4749), 2 April 2023; [the Ministry of Health](https://t.me/begtin/6166), 13 November 2024; [Rosmorrechflot](https://t.me/begtin/7579), 13 May 2026; [the Social Insurance Fund](https://t.me/begtin/4075), 15 July 2022
- [Good Practices](./01-good-practices.md)
