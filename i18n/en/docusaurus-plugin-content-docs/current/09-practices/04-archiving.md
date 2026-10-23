---
title: Archiving and Rescuing Catalogs
description: How catalogs and datasets disappear, why the web archive preserves them poorly and how to take a copy of someone else's catalog while it still opens.
---

# Archiving and Rescuing Catalogs

A catalog disappears more often than it seems, and usually without notice. The chapter [on lifecycle](./03-lifecycle.md) describes closure through the owner's eyes: what to do before switching off the server. This chapter is about the other side. The owner did not take care of an archive, the decision to close was not theirs, or you use someone else's catalog and are not sure it will live to next year.

The main conclusion: the web archive does not save a catalog by itself. It preserves pages, but descriptions from the programmatic interface, large files and sites closed to foreign addresses are preserved poorly or not at all. A copy of the datasets you need is made in advance and deliberately.

## How data disappears

In 2017 the Sunlight Foundation described eight ways information disappears from US government websites. Three matter for catalogs: removal of datasets, removal or redesign of search portals, and moving pages without redirects. In practice it looks like this.

**Silent removal.** In 2023 Rosimushchestvo (the Russian federal property agency) removed its open data section: 24 datasets, about 1 GB of XML. Links to the section disappeared from every page of the site, and there was no announcement. When it happened could only be established through Internet Archive: the last snapshot of the page was taken in February 2022.

**Shutdown by a decision days in advance.** The Moscow Region open data portal data.mosreg.ru was decommissioned in March 2019. The order was signed on 25 March, the system was switched off on the 29th, and the order itself was published two months later. Nobody made an archive of the portal.

**"Temporarily, for the duration of the move".** Russia's data.gov.ru was closed in March 2023 for transfer to a new platform. The new version opened only in summer 2025 and did not bring back the previous data. More in the chapter on lifecycle.

**Liquidation of the owner.** In a reorganisation the archive passes to the successor; in a liquidation it passes nowhere. The site of the St Petersburg Charter Court was closed together with the court's liquidation in 2021. When Rosturizm (the federal tourism agency) was abolished in 2022, its subdomains, including the open data portal, were put at risk.

**Ending publication along with the archive.** An agency decides to stop releasing a series and at the same time deletes everything it released before. This is what the Bank of Russia did in 2024 with over-the-counter foreign exchange market statistics, and Rosaviatsiya removed its archive of passenger traffic statistics going back to 2010.

**A change of policy.** In the US in 2025, data on climate, health and foreign aid was removed from federal sites on a mass scale; the USAID site was switched off together with the agency's data portal. The National Security Archive at George Washington University keeps a chronology of the removals.

**Closure of someone else's platform.** Commercial and shared hubs close too: in 2024 Microsoft closed the Planetary Computer Hub cloud environment where researchers worked with geodata, and users had to retrieve their notebooks and files in a hurry. The risks of hubs are covered in the chapter [on cloud storage](../08-beyond-portals/04-cloud-storage-and-hubs.md).

In every case the first sign is not an announcement but a missing link.

## Why the web archive does not save a catalog

Internet Archive and national web archives crawl sites: they open a page, save it and follow the links further. A data catalog is built in a way that makes this approach lose a lot.

- **An interface on top of an API.** The dataset list is loaded by a script from the programmatic interface, and a dataset has no separate page with a link to the file. The crawler sees an empty shell. This is how the only known open data portal of Afghanistan, on GeoNode, was built: it disappeared in December 2022, and all that remained of it in the web archive was the home page. The archive of the Russian Accounts Chamber's bulletins since 1996 also serves documents through a search API, and crawlers do not reach the PDFs themselves.
- **Large files and archives.** Internet Archive rarely saves ZIPs and multi-gigabyte files, and crawls pages with few links to them less often.
- **Closed to foreign addresses.** Since 2022 many Russian government sites do not respond to requests from abroad. In 2023 the sites of the Ministry of Justice and the Interior Ministry were not updated in Internet Archive at all, and the Ministry of Agriculture's site was not saved for about three years. If the archive cannot open a site, there will be no copy, even if the site works.
- **A ban in robots.txt.** The owner can close the site to the archive themselves. The "Map of Russian Science" disappeared this way in 2017: only the home page survived in Internet Archive.
- **One archive for everyone.** Almost the whole world relies on Internet Archive, which has no stable funding. In 2025 it had a months-long outage, and snapshots of many sites were not taken. In 2026 some publishers began blocking its crawler, fearing that companies training models would take their texts through the archive.

So a copy of a catalog is not just a snapshot of pages in WARC format. It is also a dump of descriptions through the API or a DCAT file, and the downloaded files. How the owner does this before closure is described in the section "How to take a snapshot" in the chapter [on lifecycle](./03-lifecycle.md). The same order works for someone else's catalog.

## How it is done right

**A national archive keeps the state's sites.** In the UK, the National Archives' web archive regularly saves the sites of all government bodies. When the statistics office ONS redesigned its site and changed the system for storing series, the addresses changed but the data did not disappear: the time series tool page leads to a copy of the old site in the archive. A user with an old link in an article finds what they cited.

**Closure with warning.** In March 2017 Microsoft announced the closure of the CodePlex code hosting service: from October the site was read-only, in December it closed, and a migration guide was released for the closure. Nine months were enough for project owners and volunteers to save everything they needed. In the same year the Russian recommendation service Imhonet closed within a day, with no way to retrieve one's materials.

**A copy with proof of provenance.** In 2024–2025 the Harvard Law School Library Innovation Lab saved everything data.gov linked to: about 311,000 datasets, 17.9 TB. Each dataset is packaged according to the BagIt standard together with metadata from the API and a timestamped digital signature, so anyone can verify that a file has not changed since it was saved. The archive is in the Source Cooperative open cloud storage, it has search, and the code for such archives is open.

**Even large services back down.** In 2024 Google announced that from 25 August 2025 all goo.gl short links would stop working. ArchiveTeam volunteers began crawling them in advance. A few weeks before the deadline Google changed its decision and kept the links that were still being followed, switching off only inactive ones. A short link is not a persistent identifier: its fate is decided by the service owner, not by whoever put it into a document. More in the chapter [on identifiers](../04-features/06-identifiers-and-doi.md).

## Who rescues when the owner did not

**Government and university programmes.** Since 2008 the End of Term Web Archive project has saved US federal government sites at every change of president. The 2024–2025 archive was collected by six organisations: Internet Archive, ArchiveTeam, Common Crawl, the Harvard lab, the University of North Texas Libraries and Webrecorder. That is 2.29 PB of compressed WARC files. They are in AWS open storage under a CC0 licence, and complex interactive sites can be viewed separately on GovArchive.us.

**The community.** ArchiveTeam is volunteers who save closing services with a distributed crawler. In 2025 the Data Rescue Project brought together research organisations that save data specifically, not pages, and keeps an open catalog of what has been rescued. Earlier, in 2017, DataRefuge and Climate Mirror appeared for the same reasons.

**In Russia** this is done by the National Digital Archive (ruarxive.org), a civic project, not a government service. In 2022 it ran a campaign to archive open data portals: by May it had collected 37 sites, 43 GB compressed; the largest snapshots were the Ministry of Culture's portal and data.gov.ru. In 2025, when the decommissioning of the EMISS statistics system was announced, the archive saved the sites of Rosstat, its regional offices and EMISS itself. Russia has no mandatory deposit of government bodies' sites and data in an archive.

All these archives share one weakness: they can be used only if people know about them. A copy with no record in any catalog is almost as unavailable as a deleted original. So archives are published together with descriptions, in the same format as a data catalog.

## How to preserve a catalog you use

1. **Check whether there is an external copy.** Open the dataset address in Internet Archive and see when the last snapshot was and whether the files were saved, not just the page. Also check the site from another country: if it is closed to foreign addresses, there is almost certainly no external copy.
2. **Take the descriptions in full.** For CKAN this is a paginated walk through `/api/3/action/package_search`; for many portals, a single DCAT file or `/data.json`; for research repositories, OAI-PMH. Descriptions weigh little, and without them a file archive turns into a folder of incomprehensible names.
3. **Download the files you need.** Save alongside them the address the file was taken from, the date and a checksum. If data is served only through an API, an ordinary archiver will not take it: a paginated dump is needed, for example with the APIBackuper tool.
4. **Package it with a description.** For a set of files, BagIt or a Frictionless Data Package fits: the package holds both the data and a manifest. For site pages, WARC or its packaged variant WACZ, which opens in ReplayWeb.page without a server.
5. **Decide whether the copy can be published.** An open licence on the datasets allows publishing a copy in open storage and describing it in a catalog. But it covers only what the owner licensed. It does not cover other people's files that the portal merely links to, personal data or the terms of use of the site itself. A copy of a whole catalog may also touch the sui generis right in the database itself: in the EU and Russia it belongs to whoever invested in creating it. These parts are checked separately. If there is no licence, or it prohibits redistribution, the copy is kept privately and reported to an archive or to the owner.

## What follows for an owner

If you run a catalog, the simplest thing is not to let it become the subject of a rescue operation:

- do not close the site to archive crawlers or foreign addresses if it holds open data;
- keep a full dump of descriptions and files at a persistent address: both an aggregator and an archive will take it;
- when stopping a series, do not delete what has already been published;
- announce closure in advance, months rather than days, and leave a read-only mode;
- if your country has a national web archive, arrange to deposit a copy, as UK agencies do.

Items for a checklist are in the section ["Before switching off a catalog"](../12-appendices/04-checklists.md).

## Sources

- Sunlight Foundation, [Classifying changes to public access to information on US government websites](https://web.archive.org/web/20260314160900/https://sunlightfoundation.com/2017/10/04/classifying-changes-to-public-access-to-information-on-us-government-websites/), October 2017 (Internet Archive copy)
- [Chronology of data removals in the US](https://nsarchive.gwu.edu/special-exhibit/climate-change-transparency-project/2026-03-30/disappearing-data-chronology), National Security Archive, 30 March 2026
- [End of Term 2024 Dataset](https://eotarchive.org/data/data-2024/): composition and size; [End of Term Web Archive in the AWS open data registry](https://registry.opendata.aws/eot-web-archive/); [GovArchive.us](https://govarchive.us/)
- Harvard Library Innovation Lab, [Announcing the Data.gov Archive](https://lil.law.harvard.edu/blog/2025/02/06/announcing-data-gov-archive/), 6 February 2025; [archive search](https://lil.law.harvard.edu/data-gov-archive/); [the archive on Source Cooperative](https://source.coop/harvard-lil/gov-data)
- [Data Rescue Project](https://www.datarescueproject.org/), [ArchiveTeam](https://wiki.archiveteam.org/)
- Google, [updated plans for goo.gl links](https://blog.google/innovation-and-ai/technology/developers-tools/googl-link-shortening-update/), 1 August 2025
- [UK Government Web Archive](https://webarchive.nationalarchives.gov.uk/); [the ONS time series tool](https://www.ons.gov.uk/timeseriestool) with a link to the archived copy
- [National Digital Archive](https://ruarxive.org/) (in Russian); code of the 2022 campaign: [rudatarchive](https://github.com/ruarxive/rudatarchive)
- [BagIt, RFC 8493](https://www.rfc-editor.org/rfc/rfc8493), [WACZ](https://specs.webrecorder.net/wacz/latest/), [ReplayWeb.page](https://replayweb.page/), [APIBackuper](https://github.com/ruarxive/apibackuper)
- I. Begtin, Telegram (in Russian): [data.mosreg.ru](https://t.me/begtin/1422), 3 June 2019; [the Sunlight Foundation on ways information disappears](https://t.me/begtin/586), 9 October 2017; [CodePlex and Imhonet](https://t.me/begtin/491), 29 April 2017; [what cannot be web-archived](https://t.me/begtin/2397), 25 December 2020; [the portal archiving campaign](https://t.me/begtin/3887), 20 May 2022; [the Accounts Chamber archive](https://t.me/begtin/4442), 30 November 2022; [Rosimushchestvo](https://t.me/begtin/4618), 17 February 2023; [Afghanistan's portal](https://t.me/begtin/4991), 5 July 2023; [government sites and Internet Archive](https://t.me/begtin/5293), 19 December 2023; [ONS and the National Archives](https://t.me/begtin/5428), 14 February 2024; [archiving Rosstat and EMISS](https://t.me/begtin/6713), 19 May 2025; [the Internet Archive outage](https://t.me/begtin/7161), 24 October 2025
- [Catalog lifecycle](./03-lifecycle.md), [persistent identifiers](../04-features/06-identifiers-and-doi.md)
