---
title: Microdata Catalogs
description: Catalogs of censuses and surveys. How a study description is organised, what access levels exist, who runs such catalogs, what they run on, how to choose a platform and where they break.
---

# Microdata Catalogs

A microdata catalog describes censuses and surveys: who was asked, how the sample was drawn, what questions were asked, what each variable means. The description comes with files of records about individual people, households or businesses: anonymised, but still sensitive. That is why the description here is almost always open, while the file is often provided after registration, on request or only in a secure environment.

According to the dataportals-registry export (release 1.27.0 of 15 October 2026), there are 326 such catalogs, less than 1% of all catalogs. Half of them (49%) have some files closed, and this is normal for the type. But the share of dead websites here is the highest of all types: 59 catalogs, about 18%, do not open.

The main conclusion of the chapter: a microdata catalog is valuable for its description, not for its file. A study that cannot be found by its variables and for which there is no explanation of how to get access does not exist for a researcher, even if the files are on the server. A good catalog openly shows everything except the records themselves, serves descriptions to programs in the DDI standard and says honestly who will provide the data, on what terms and how quickly.

## How a survey description is organised

On an open data portal the main thing is the file; in an indicator catalog, a number with breakdowns. Here the main thing is the study, which has three levels of description.

- **Study**: one census or one survey wave: who conducted it, when, in what territory, who was interviewed (the unit of observation and the population), how the sample was drawn, how responses were collected.
- **Data file**: one table of records: households, household members, land plots. A single study can have more than a hundred files.
- **Variable**: one column of a file: name, label, question text, permitted values with labels, number of responses for each value, missing values, a weight flag.

Next to them are **materials**: questionnaires, interviewer instructions, a sampling report, code for calculating weights. And **access conditions**: the access type, the text of the agreement, how to cite the data.

What this looks like in practice can be seen with the Nigeria General Household Survey Panel 2023–2024 in the World Bank Microdata Library. On 12 October 2026 the catalog API returns for it:

| Level | What the description contains |
|---------|----------------|
| Study | identifier `NGA_2023_GHSP-W5_v02_M`, National Bureau of Statistics of Nigeria, units of observation: households, individuals, plots and communities; sample description; DOI `10.48529/90ec-pv69` |
| Files | 108 files, each with a description: which section of the questionnaire and at what level the data was collected |
| Variables | 4,531 variables. The variable `zone` has six values, from "1. North Central" to "6. South West", and the number of records for each: 851, 824, 870, 835, 839, 848, 5,067 in total |
| Access | public use files: download after registration and agreeing to the terms: do not copy for others, do not try to identify respondents, cite the source as shown |

The whole description can be downloaded in DDI Codebook 2.5, and the DOI leads to the study page and returns a ready-made BibTeX citation. From the value frequencies a researcher sees, before applying, whether there are enough observations for the region they need. This is the main job of a microdata catalog: to let people decide whether they need the data without handing it over.

### What gets its own page

In a microdata catalog the study almost always gets its own page, and in good catalogs each variable does too. That is why the number of "datasets" here cannot be compared with open data portals: one study is a hundred files and thousands of variables. On 12 October 2026 the World Bank Microdata Library had 7,145 studies, the IHSN central catalog 13,085, and the Census Digital Library of India 40,268 records. The Maelstrom Research catalog on OBiBa Mica describes 473 epidemiological studies and about 2.05 million variables: search works by variable, not by study title.

## Access levels

Access levels are what distinguish a microdata catalog from other types. This is not a flaw but a way to give data to those who need it without exposing people. Removing names is not enough: a person is often given away by a combination of age, occupation and a small settlement (more in the entry "Anonymisation" in the [glossary](../12-appendices/01-glossary.md)). The more detailed the file, the stricter the access.

NADA, the most common platform of the type, has seven access types:

| Access type | Login needed | What the user does | Approval | Where the data comes from |
|-------------|-----------|-------------------------|-----------|---------------|
| Open data | no | accepts the terms | no | from the catalog, in open formats such as CSV |
| Direct access | no | accepts the terms | no | from the catalog, often in SPSS or Stata formats |
| Public use files | yes | fills in a request form | no | from the catalog |
| Licensed data | yes | submits an application with the research purpose | yes | from the catalog after approval |
| Data enclave | no | downloads an application form | outside the site | only in a secure room or environment |
| External repository | no | follows a link | — | from the data owner's website |
| Data not available | — | — | — | description only |

The last two types matter no less than the others. A catalog can be useful even if it does not store a single file itself: in the World Bank Microdata Library on 12 October 2026, for 67% of studies (4,790 of 7,145) the data sits in an external repository: with the statistical office, in the DHS programme or in IPUMS. Public use files account for 18%, direct access for 12%, open data and licensed access about 2% each.

The most detailed data (tax, health, linked registers) is not handed out at all. It is used in a **trusted research environment**: an approved researcher logs into a secure system, runs analyses there and takes away only checked results. This is how SecureLab at the UK Data Service and the French CASD work. The Norwegian microdata.no, run since 2018 by Sikt and Statistics Norway, has gone further: staff and students of approved organisations analyse register data online without an application, but see only the results of calculations, not the records. According to a 2025 OECD report on 16 statistical offices, this role of a "trusted intermediary" is becoming normal for offices. Another route is **synthetic data**: artificial records with the same statistical properties, which can be given to everyone.

Three requirements follow for a catalog. The description is open at any access level. The terms are written down before an application: who can get the data, what has to be attached, how long to wait for an answer. And the page shows the level of each file, not only of the study as a whole. How this works in different platforms is covered in the chapter [on access and roles](../04-features/08-access-control-and-workflow.md).

## Who builds them

More than half of microdata catalogs belong to central government, mostly national statistical offices.

| Owner | Catalogs | Share |
|----------|----------:|-----:|
| Central government | 179 | 55% |
| Universities and research organisations | 104 | 32% |
| International organisations | 20 | 6% |
| Civil society organisations | 14 | 4% |
| Regions | 4 | 1% |
| Companies and others | 5 | 2% |

- **Statistical offices** publish censuses and surveys of households, the labour force, budgets, health. In developing countries a catalog often appeared with the support of World Bank programmes and the IHSN network, which is why 59% of office catalogs run on NADA.
- **University social data archives** hold opinion polls, panel and cohort studies. Platforms here are more varied: only 21% use NADA, alongside OBiBa Mica, Colectica, Dataverse and their own systems.
- **International organisations**: the World Bank, WHO, FAO, UNHCR, the Pacific Community. 18 of their 20 catalogs run on NADA.
- **Survey consortia** such as Afrobarometer, Arab Barometer, Latinobarómetro and Asian Barometer publish their waves on ordinary websites: on WordPress or their own builds.

Microdata catalogs exist in 139 countries, and another 27 cover the whole world. No country has more than two dozen: the US has 18, Canada 12, Germany 11. The type is organised so that a country usually has one or two statistical office catalogs and several university archives.

### Why 326 is a lower bound

The number of microdata catalogs in the registry greatly understates the world of surveys. The largest social data archives (the UK Data Service, ICPSR, GESIS, the Finnish FSD, the Swedish SND, the Australian Data Archive, the Norwegian Sikt) are recorded in the registry as research repositories or open data portals: they have DOIs, long-term preservation and data not only from surveys. The European CESSDA catalog, which collects descriptions from national archives, served about 33,000 study descriptions on 12 October 2026. So to search for surveys, look also at the chapter [on research repositories](./04-scientific-repositories.md): the boundary between the two types runs through the social science archives.

## What they publish

- **Population censuses**: full or sample record files. In Latin America they are distributed through REDATAM, in the rest of the world through NADA and IPUMS.
- **Household surveys**: budgets, living standards, the labour force, health. Many of them are international programmes with a common questionnaire: the World Bank's LSMS, DHS, UNICEF's MICS, WHO's STEPS.
- **Opinion polls and panels**: the European Social Survey, the German SOEP, the Russian RLMS-HSE, the Chinese CFPS.
- **Cohorts and biobanks**: epidemiological studies where people are followed for years: CanPath and CLSA in Canada, the European projects RECAP Preterm and EUCAN.
- **Business and bank microdata**: the research data centres of the Bundesbank, the Bank of Italy and the Bank of Portugal.
- **Administrative registers**: taxes, employment, benefits, linked by a personal identifier. They are almost never handed out as files, only in a secure environment.
- **Code and data for reproducing research**: the World Bank Reproducible Research Repository on the same NADA: 585 records in October 2026 compared with 163 in 2024.

What a microdata catalog usually lacks: names, addresses and exact coordinates of respondents (they are removed before publication), ready-made indicator series (that is an [indicator catalog](./05-indicator-catalogs.md)), and for closed studies, the files themselves.

## Standards

**DDI** (Data Documentation Initiative) is the main standard of the type. It is maintained by the DDI Alliance, and on 6 March 2026 the common part of the DDI standards was published as ISO/PAS 25955:2026. It is not one format but a family:

- **DDI Codebook**: a description of one study and its files, an "electronic codebook". This is what NADA, Dataverse and the European CESSDA catalog serve. Version 2.5 came out in 2012 and remains the main one. Version 2.6 came out on 15 April 2026, and support for it in platforms is only beginning.
- **DDI Lifecycle**: a description of the whole cycle: the questionnaire, reuse of questions and variables across waves, processing, versions. Version 3.3 (2020). It is needed by longitudinal studies and offices that maintain a question bank. Colectica runs on it.
- **DDI-CDI**: a new model for data in any domain; version 1.0 came out in 2025. It describes not only surveys but also links between data across domains and the provenance of each value. It is still almost never seen in catalogs.

Controlled vocabularies work alongside DDI: shared lists of values for the mode of collection, the unit of observation, the sampling procedure. They are maintained by the DDI Alliance and CESSDA. Without them the "mode of collection" field is filled in differently in two archives, and a common search by it does not work.

**Exchanging descriptions.** Harvesters take DDI via the OAI-PMH protocol. This is how the CESSDA catalog works: it accepts descriptions only via OAI-PMH in DDI Codebook 2.5 and according to its own metadata profile, checked by a separate validator. Dataverse serves descriptions via OAI-PMH in DDI in its core. NADA has no OAI-PMH: descriptions are taken through its own API or downloaded in DDI one study at a time. That is why a catalog on NADA cannot be connected to the European federation of archives directly, without an intermediate export.

**For search engines** what is needed is not DDI but schema.org/Dataset markup and a DOI. NADA puts JSON-LD markup on the study page in its core. DOIs are issued by DataCite, as for research data; by October 2026 the World Bank had registered about 3,000 DOIs for pages of its microdata library. More in the chapters [on metadata export](../04-features/02-metadata-export.md) and [on identifiers](../04-features/06-identifiers-and-doi.md).

**Description tools.** DDI is rarely written by hand. For surveys there is the World Bank Metadata Editor, open source (MIT) since 2025, an editor for describing microdata, documents, tables and geodata; NADA has used its templates since release 5.7. For data left in Nesstar Publisher, IHSN has published on GitHub a tool for exporting DDI and data from its files (updated in February 2026). The commercial alternative is Colectica Designer.

## Platforms

| Platform | Catalogs in the registry | What it is | Do not open |
|-----------|--------------------:|---------|---------------:|
| NADA | 158 | open-source (MIT) platform of the World Bank and IHSN | 47 |
| Custom build | 43 | office and archive websites; programmatic access marked for 12% | 0 |
| REDATAM | 38 | free software from UN ECLAC for censuses, mainly Latin America | 6 |
| OBiBa Mica | 27 | open-source (GPL-3.0) catalog of epidemiological studies | 3 |
| Nesstar | 13 | discontinued | 2 |
| IPUMS | 13 | websites of the University of Minnesota harmonisation project | 0 |
| Colectica | 11 | commercial platform on DDI Lifecycle, mostly longitudinal studies | 0 |
| WordPress, Drupal | 11 and 7 | archive and survey websites | 0 |

The type rests on one open-source platform. NADA is almost half of the catalogs, and almost all of the type's dead websites are NADA too. This is not a flaw of the software but a trace of how it was installed; see the section "Where it breaks". Custom catalogs account for only 13%, less than for any large type: the task is narrow, and a ready-made solution exists. But the custom ones have almost no programmatic access.

### Main platforms

- **NADA** is an open-source microdata catalog developed by the World Bank together with the IHSN network. Releases come often: 5.6 in July 2026, 5.7 in September, 5.7.1 on 4 October 2026. Access levels, applications for licensed data, DDI import and export, and search by variable are in the core. Since release 5.6 NADA describes not only surveys but also indicators with time series, documents, tables and geodata; permissions can be granted by user and collection, and there are built-in view and download statistics. For administrators there are API clients for R and Python (NADAR and PyNADA).
- **REDATAM** is software from ECLAC's Population Division (CELADE), developed since 1985. It stores censuses in its own format and builds tables from them for any territory, down to a city block. ECLAC distributes it free of charge and calls it free software; according to its website, it has helped 34 countries. The current generation is RedatamX (since 2024): it runs on Windows, Linux and macOS and as the `redatamx` package for R. The previous Redatam7 runs only on 32-bit Windows; its last release was in March 2021. Online processing lets users calculate tables right on the office's website without downloading records.
- **OBiBa Mica** is an open-source catalog of epidemiological studies and consortia: detailed variable dictionaries, study networks, access requests. Releases come regularly (6.3.7, September 2026). It works together with the OBiBa Opal data store. On such portals data is almost always provided only on request.
- **Colectica** is a commercial software suite from a US company built on DDI Lifecycle: an editor, a metadata repository and a portal. Statistics New Zealand, Ireland's statistical office, the British CLOSER and American longitudinal studies run on it. In August 2026 the company announced Colectica Repository 8 with an MCP server through which an AI agent reads DDI descriptions.
- **IPUMS** is not a reusable platform but a project: the University of Minnesota collects censuses and surveys from many countries and harmonises the variables so that countries and years can be compared. In October 2026 IPUMS International covered 104 countries, 656 censuses and surveys and more than a billion person records. Data is provided free of charge after registration, as extracts on request.
- **Dataverse** is listed among research repositories in the registry, but it is often chosen for microdata: DDI descriptions, restricted-access files, DOIs and OAI-PMH are in its core. When SPSS or Stata tables are uploaded, it extracts variable descriptions itself. The Canadian ODESI (into the Borealis repository) and the Australian Data Archive moved to Dataverse.

### Core and add-ons

| Capability | NADA | Dataverse | OBiBa Mica | REDATAM |
|-------------|------|-----------|------------|---------|
| File access levels | core, seven types | core: open and restricted files, access requests | core: descriptions open, data on request | data on the office's server, only tables go out |
| Applications and their log | core | core | core | no |
| Variable descriptions | core, from DDI | core, extracted from SPSS and Stata files | core, the main object of the catalog | core, the database dictionary |
| DDI export | core, DDI Codebook | core, DDI Codebook | not checked | no, own format |
| OAI-PMH | no | core | not checked | no |
| schema.org | core (JSON-LD) | core | not checked | no |
| DOI | a field for a DOI minted separately at DataCite | core | not checked | no |
| Citation export | core, via DataCite if there is a DOI | core | not checked | no |
| API | core | core | core | REST service and an R package |
| Online calculations without releasing records | no | not in the core | no | core |

Two conclusions follow from the table. NADA covers the essentials (access levels and DDI descriptions), but its descriptions reach the European federation of archives and research data harvesters only through an intermediate export, and DOIs have to be registered separately. Dataverse provides DOIs and OAI-PMH, but has no seven access types and no online calculations. That is why NADA usually suits a statistical office better, and Dataverse a university archive.

### Nesstar: what to do with the legacy

Nesstar is a software suite from the Norwegian NSD and the UK Data Archive on which many archives and statistical offices ran in the 2000s and 2010s. With version 4.0 in 2015 it was declared obsolete, and by 2022 it was finally discontinued; Nesstar Publisher is distributed without support. Statistics Canada switched off its Nesstar in January 2022 for cybersecurity reasons. The Canadian ODESI chose Borealis on Dataverse for its migration, and in October 2026 the former address of its Nesstar redirects to the new website, while ODESI collections are visible in Borealis as separate OAI-PMH sets. At GESIS the address of the ZACAT Nesstar catalog leads to the general GESIS search. The UK Data Service still keeps Nesstar, but in its accessibility statement of 21 August 2026 it says that the application will eventually be retired, so accessibility issues in it will not be fixed.

Nesstar is not chosen for a new catalog. If a catalog still runs on it, a migration plan is needed before the website stops opening: export descriptions to DDI and data with the IHSN tool, choose a platform for the task (NADA for a catalog with access levels, Dataverse for a repository with DOIs) and keep redirects from the old addresses.

## How to choose

The choice begins with two questions: who will receive the data, and how detailed the records are.

| Situation | What to take | Why, and what it costs |
|----------|-----------|---------------------|
| A statistical office publishes surveys with different access levels | NADA | access levels and DDI in the core; OAI-PMH and DOI registration have to be added separately |
| A university archive needs DOIs, long-term preservation and exchange with CESSDA | Dataverse, or joining the national social data archive | DOIs and OAI-PMH in the core; no seven access types |
| An epidemiological cohort or consortium, data only on request | OBiBa Mica with Opal | detailed variable search and applications; almost no data goes out, search engines skip such catalogs |
| A census with tables for small areas | REDATAM for online tables plus a DDI description and a file in an open format | quickly provides tables; without an open file and DDI the data remains in one program's format |
| A longitudinal study with a question bank and many waves | Colectica or other DDI Lifecycle tools | versions of questions and variables across waves; commercial licence |
| Registers and other data that cannot be handed out as a file | a trusted research environment, with a catalog of descriptions only | data does not leave the office; the environment costs more than any catalog |
| A few surveys a year, no team of your own | hand descriptions and files over to the national archive, IHSN or the World Bank library | cheap; the showcase is not your own |

A custom build is almost never justified in this type: NADA is free, it had three releases in 2026, and access levels are already built in. Of 43 custom catalogs in the registry only 12% have programmatic access marked. If an office keeps its own system, as Statistics Korea or the Australian Bureau of Statistics do, it should at least serve study descriptions in DDI. How a statistical office should separate indicators and microdata is worked through in the [statistical office example](../06-choice/08-worked-examples.md#statistical-office-indicators-and-microdata-are-different-catalogs), and the general logic of choice is in the chapter ["Build, Open Source or SaaS"](../06-choice/05-build-or-buy.md).

### When you do not need your own catalog

A research group or agency with one or two surveys does not need its own catalog. The survey can be deposited in a national social data archive or a generalist repository with restricted file access, and the description in the IHSN catalog. If the data can be opened, a CSV or Parquet file with a variable dictionary and a sample description in a Git repository or on Zenodo is enough. For such a survey to be found, the description needs the unit of observation, territory and period, sampling procedure, list of variables and access conditions. Ways to publish without a portal are in the part ["Publishing Without a Portal"](../08-beyond-portals/01-when-portal-not-needed.md).

## What makes a microdata catalog convenient

1. **The description is always open.** A study is visible without login, even if the files are closed. Someone who does not know about data cannot request it.
2. **Search by variable.** Each variable has its own page with the question text, values and frequencies. A researcher finds the question they need rather than going through survey titles.
3. **Terms written down in advance.** The access type is shown for each file, and the terms and response time are stated before an application.
4. **Descriptions for programs.** DDI export, a catalog API, and for search engines schema.org markup and a persistent identifier.
5. **How to cite.** A study has a DOI or a persistent address and a ready-made citation; repeated releases have versions.
6. **Open formats.** Open files are in CSV or Parquet, not only in SPSS and Stata formats that require a specific program.

## Examples

**International catalogs**

- [World Bank Microdata Library](https://microdata.worldbank.org): NADA, 7,145 studies from many countries; two thirds lead to data owners' websites, and some have DOIs.
- [IHSN central catalog](https://catalog.ihsn.org): NADA, 13,085 survey descriptions, mostly from developing countries.
- [WHO NCD microdata repository](https://extranet.who.int/ncdsmicrodata): NADA, 937 STEPS, tobacco and school health surveys. For WHO this is one of several catalogs of different types, as for the Pacific Community with its [Pacific Data Hub](./11-comparison-and-hybrids.md).
- [IPUMS International](https://international.ipums.org): harmonised censuses of 104 countries.

**National catalogs**

- [Census Digital Library of India](https://censusindia.gov.in/nada/index.php): NADA, 40,268 records, censuses since 1901 with detail down to districts. In 2023 there were more than 29,000 records.
- [Armstat microdata catalog](https://microdata.armstat.am): NADA, 26 surveys.
- The national statistical offices of Bolivia (121 studies) and Tanzania (62): NADA with files at different access levels.
- [INEGI](https://www.inegi.org.mx): microdata on the tab of each survey next to tables and a DDI description; covered in the chapter [on indicator catalogs](./05-indicator-catalogs.md#examples).

**Social data archives**

- [UK Data Service](https://ukdataservice.ac.uk/): open, safeguarded and controlled data; the most detailed only in the SecureLab environment.
- [CESSDA Data Catalogue](https://datacatalogue.cessda.eu): a common search across European archives: about 33,000 descriptions harvested via OAI-PMH in DDI.
- [ODESI](https://odesi.ca): a Canadian search of social surveys whose data moved from Nesstar to [Borealis](https://borealisdata.ca/) on Dataverse.

**Health and secure access**

- [Maelstrom Research](https://www.maelstrom-research.org): OBiBa Mica, 473 epidemiological studies and about 2.05 million described variables.
- [microdata.no](https://www.microdata.no): Norwegian register data since 1964: online analysis without an application, only results go out.

**Russia**

- [RLMS-HSE](https://www.hse.ru/rlms): the Russia Longitudinal Monitoring Survey of HSE University, a panel survey since 1994; data after registration.
- [The FOM database](https://bd.fom.ru/) and [the sociological data bank of the Institute of Sociology of the Russian Academy of Sciences](https://www.isras.ru/databank_number.html): opinion polls on their own websites.
- Microdata from Rosstat's sample surveys is published on separate pages of the agency's website and in the obdx.gks.ru system. In 2023 the data there was last updated in 2021, and the software had not changed for about nine years. In October 2026 neither address opens from abroad, and their state cannot be checked from outside.

## Where it breaks

**The installation is abandoned after the project.** Of 59 dead microdata catalogs, 47 are on NADA. Almost all are old statistical office catalogs in Africa, Asia and Latin America: on IP addresses instead of domains, on contractors' subdomains, without HTTPS. Among catalogs without HTTPS, 38 of 58 do not work; among those with HTTPS, 21 of 268. The catalog was installed as part of a support programme, and when the programme ended, there was no one to maintain it. For 18 of the 38 countries with an abandoned NADA, the registry has no other active microdata catalog. It also happens that the website opens but the catalog is empty: the NADA of Madagascar's statistical office responds on 12 October 2026, but holds zero studies. The lesson: install a microdata catalog on the office's own domain and budget for maintenance, not just installation.

**The product is withdrawn.** Nesstar is an example of the platform itself being closed down. In the registry this shows less than one might think: of 13 records on Nesstar two are marked as dead, but another two addresses, at GESIS and ODESI, in fact lead to new systems. The main risk is not that the website disappears, but that descriptions and files remain in a format that nobody supports any more.

**One program's format.** Latin American censuses have been distributed through REDATAM since the 1990s, but the database is stored in its own format without a published description: tables are built in the program itself or in its online processing. To work with the records in ordinary tools, researchers built the open converter Open Redatam (Apache 2.0): it reads the database dictionary and exports tables to CSV, with packages for R and Python. There is also the `redatamx` package for R, a wrapper around REDATAM itself, with CELADE holding the rights to the core. Both routes work, but without them the records are inaccessible to ordinary software.

**The catalog is closed to programs.** On 12 October 2026 the FAO and Pacific Community microdata catalogs respond to programs with a Cloudflare check, and the UNHCR catalog with a 403 error, with the API closed too. People in a browser see the data, but harvesters, dataset search engines and web archives do not. For a catalog whose value lies in its descriptions, this is especially unfortunate: the study cannot be found where people look for it.

**Descriptions, but no data.** Portals on OBiBa Mica describe variables in detail but provide data only on request. That is why dataset search engines often skip them: there are no files, only descriptions. This is normal for a microdata catalog, but the description must be complete, otherwise the study will not be found or requested.

**The description is hidden or empty.** A study is described only by a title and an abstract, without variables or sample, so it is impossible to decide whether the data is needed. It is worse when the description is visible only after login: then the study cannot be found at all.

**Access exists on paper.** Applications are accepted, but no response time is stated, there are no approval criteria, and there is no answer for months. Access exists formally but not in practice. The response time and the appeal procedure should be written on the study page.

**The link points outside.** When a catalog mainly points to external repositories, as the World Bank's does, its quality depends on other people's websites. If the data owner has moved, the catalog record remains but the link leads nowhere. Such links need regular checking, as in any catalog with links instead of files; see the chapter [on internal storage](../04-features/05-data-storage.md).

## How to check a microdata catalog

Five steps for half an hour.

1. **Find a study without logging in.** Are the sample, unit of observation and period visible? Is there a list of variables?
2. **Open one variable.** Is there the question text, values with labels and the number of responses?
3. **Read the access conditions.** Is the access type shown for the files, what is needed for an application and how long is the wait?
4. **Export a description with a program.** Does the catalog serve DDI, is there an API or OAI-PMH, does it open without an "I am not a robot" check?
5. **Check the citation.** Is there a DOI or a persistent address, and does the DOI lead to the study page?

Typical addresses for different platforms:

```bash
# NADA: how many studies, and how many of them with licensed access
curl -s "https://microdata.worldbank.org/index.php/api/catalog/search?ps=1"
curl -s "https://microdata.worldbank.org/index.php/api/catalog/search?ps=1&dtype=licensed"
# NADA: study description, its files and one variable
curl -s "https://microdata.worldbank.org/index.php/api/catalog/NGA_2023_GHSP-W5_v02_M"
curl -s "https://microdata.worldbank.org/index.php/api/catalog/NGA_2023_GHSP-W5_v02_M/data_files"
curl -s "https://microdata.worldbank.org/index.php/api/catalog/NGA_2023_GHSP-W5_v02_M/variables/V2"
# NADA: the whole description in DDI Codebook (the address uses the study's numeric id)
curl -s "https://microdata.worldbank.org/index.php/metadata/export/6410/ddi"
# DOI: where it leads, and a ready-made BibTeX citation
curl -sL -H "Accept: application/x-bibtex" "https://doi.org/10.48529/90ec-pv69"
# OBiBa Mica: number of studies, datasets and variables
curl -s "https://www.maelstrom-research.org/ws/studies/_rql?query=study(limit(0,1))"
# Dataverse and CESSDA: description formats via OAI-PMH, DDI among them
curl -s "https://borealisdata.ca/oai?verb=ListMetadataFormats"
curl -s "https://datacatalogue.cessda.eu/oai-pmh/v0/oai?verb=ListMetadataFormats"
```

All commands were checked on 12 October 2026. A JSON response at `api/catalog/search` is a sign of NADA, a `_rql` response a sign of OBiBa Mica. A "Just a moment…" page instead of a response is a sign that the catalog is closed to programs. The summary list is in the [checklists](../12-appendices/04-checklists.md#microdata-catalog), and general commands are in the chapter [on APIs and bulk download](../04-features/04-access-interfaces.md).

## How it differs from its neighbours

| Neighbour | Main difference |
|-------|-----------------|
| Indicator catalog | records about people and households, not aggregates; the description is a study and variables, not a series with breakdowns |
| Research repository | access levels and anonymisation are mandatory, a DOI is desirable; the description is in DDI, not only DataCite. Social science archives sit at the junction of the two types |
| Open data portal | closed access to files is the norm, not a sign of trouble; the description is much more detailed |
| Metadata catalog | also shows descriptions of closed data, but does not handle applications or hand out files |

A summary table of all types is in the chapter [Comparing Types and Hybrids](./11-comparison-and-hybrids.md).

## Sources

- dataportals-registry export, release 1.27.0 of 15 October 2026: number of catalogs, owners, countries, platforms, dead catalogs, catalogs without HTTPS. The queries are in the [appendix](../12-appendices/02-using-the-registry.md#microdata-catalogs).
- DDI: [DDI Codebook](https://ddialliance.org/ddi-codebook), [DDI Lifecycle](https://ddialliance.org/ddi-lifecycle), [DDI-CDI](https://ddialliance.org/ddi-cdi), [ISO/PAS 25955:2026](https://ddialliance.org/iso-standard), [controlled vocabularies](https://ddialliance.org/controlled-vocabularies); checked 12 October 2026
- CESSDA: [catalog OAI-PMH](https://datacatalogue.cessda.eu/documentation/oai-pmh-api.html), [requirements for metadata providers](https://docs.tech.cessda.eu/metadata/oai-pmh-provider-guidelines.html), [metadata profiles](https://cmv.cessda.eu/documentation/profiles.html); number of descriptions via the catalog's OAI-PMH and API, 12 October 2026
- NADA: [code and releases](https://github.com/ihsn/nada/releases), [access types](https://ihsn.github.io/nada-documentation/admin-guide/content/data-access-types.html), [documentation](https://ihsn.github.io/nada-documentation/); schema.org markup, the DOI field and citation export via DataCite according to the NADA 5.7.1 source code; [Metadata Editor](https://github.com/worldbank/metadata-editor), [Nesstar Publisher exporter](https://github.com/ihsn/nesstar-exporter)
- World Bank Microdata Library: number of studies and access types, the description of the [Nigeria panel survey 2023–2024](https://microdata.worldbank.org/index.php/catalog/6410) and [its DOI](https://doi.org/10.48529/90ec-pv69), via the catalog API and DataCite, 12 October 2026; [IHSN catalog](https://catalog.ihsn.org), [Census Digital Library of India](https://censusindia.gov.in/nada/index.php), [Armstat](https://microdata.armstat.am), [WHO](https://extranet.who.int/ncdsmicrodata), [World Bank Reproducible Research Repository](https://reproducibility.worldbank.org), via the API, 12 October 2026
- REDATAM: [website](https://redatam.org/en), [FAQ](https://redatam.org/en/soporte/faq), [the redatamx package](https://cran.r-project.org/package=redatamx); [Open Redatam](https://github.com/litalbarkai/open-redatam) and [the redatam package](https://cran.r-project.org/package=redatam); checked 12 October 2026; M. Vargas Sepúlveda, L. Barkai, [The REDATAM format and its challenges for data access and information creation in public policy](https://doi.org/10.1017/dap.2025.4), Data & Policy, 2025
- [OBiBa Mica](https://www.obiba.org/pages/products/mica/) and [its releases](https://github.com/obiba/mica2/releases); [Maelstrom Research](https://www.maelstrom-research.org), via the API, 12 October 2026; [Colectica Portal](https://www.colectica.com/software/portal), [Colectica Repository 8 and MCP](https://www.colectica.com/posts/repository-8-mcp-endpoint/), 12 August 2026; [IPUMS International](https://international.ipums.org)
- Nesstar: [product history](https://en.wikipedia.org/wiki/Nesstar), [the Nesstar Publisher entry in the CESSDA directory](https://www.cessda.eu/Resource-Directory/Resource-crdr-4365), [Statistics Canada switching off Nesstar](https://web.archive.org/web/20220909185431/https://blogs.dal.ca/libraries/2022/01/statistics-canadas-nesstar-no-longer-available/), January 2022; [ODESI migration to Borealis](https://www.ocul.on.ca/odesi-migration); [UK Data Service accessibility statement for Nesstar](https://ukdataservice.ac.uk/accessibility/accessibility-statement-nesstar/), 21 August 2026; responses of Nesstar addresses at ODESI and GESIS checked 12 October 2026
- Access: [microdata.no](https://www.microdata.no/en/), [CASD](https://www.casd.eu); OECD, [National statistical offices as emerging trusted intermediaries in data governance](https://www.oecd.org/en/publications/national-statistical-offices-as-emerging-trusted-intermediaries-in-data-governance_3721ec38-en.html), OECD Digital Economy Papers, No. 378, 10 September 2025
- Responses of the FAO, Pacific Community and UNHCR catalogs to programs, a sample check of dead NADA catalogs, the Madagascar statistical office catalog: 12 October 2026
- I. Begtin, Telegram (in Russian): [microdata catalogs and Rosstat](https://t.me/begtin/4710), 22 March 2023; [Census Digital Library of India](https://t.me/begtin/4761), 8 April 2023; [REDATAM](https://t.me/begtin/5087), 22 August 2023; [World Bank Reproducible Research Repository](https://t.me/begtin/6119), 28 October 2024; [portals on OBiBa Mica](https://t.me/begtin/6286), 19 December 2024; [Redatam and Open Redatam](https://t.me/begtin/6784), 4 June 2025; [WHO data catalogs](https://t.me/begtin/7772), 15 September 2026
- [Access, Roles and Workflows](../04-features/08-access-control-and-workflow.md)
