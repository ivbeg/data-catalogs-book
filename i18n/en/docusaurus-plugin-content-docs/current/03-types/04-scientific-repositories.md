---
title: Research Data Repositories
description: Repositories that accept research data for preservation, issue DOIs and make the data citable. Who runs them, what they run on and where they break.
---

# Research Data Repositories

A research repository accepts research data for preservation, fixes its version, issues a persistent identifier and provides a ready-made citation for a paper. There is one goal: that years later the link in the paper opens the same version of the same files.

What distinguishes it from an open data portal is not the subject but the commitments. Four things together make a catalog a repository:

- **deposit**: the author hands the files over to the repository rather than leaving a link to their own website;
- **an immutable version**: what has been published is not silently edited; a correction comes out as a new version;
- **a persistent identifier**: usually a DOI, which will survive a change of address and platform;
- **a description for citation**: authors, year, title, publisher and version, from which a citation line is assembled.

If something is missing, it is file storage or a showcase, even if a section of the site is called a repository.

Repositories are expected to make data comply with the FAIR principles (2016): findable, accessible, interoperable and reusable. FAIR does not mean "open": a dataset with closed files can also be FAIR if its description is open, it has a DOI and it is clear how to request access.

According to the dataportals-registry export (release 1.27.0 of 15 October 2026), there are 8,404 research repositories, 19% of all catalogs, the second most numerous type after geoportals. 8,285 are active. 119 are inactive or decommissioned, about 1.4%: research repositories close less often than open data portals, which stand at about 4%. Restricted access to at least part of the data is marked for 527 repositories, 6%.

On 12 October 2026 the international registry re3data described 3,535 repositories. The difference from the catalog registry is not an error: re3data describes in detail the repositories that have passed its editorial review, while the catalog registry also counts university publication repositories with little data, and data servers such as THREDDS and ERDDAP.

## Why researchers publish data

A researcher most often puts data into a repository because a funder or a journal requires it.

- **Funders.** In the EU's Horizon Europe programme a data management plan is mandatory, and data is opened according to the rule "as open as possible, as closed as necessary". Since 25 January 2023 the US National Institutes of Health (NIH) have required a data management and sharing plan in every application that generates scientific data. A 2022 memorandum of the US Office of Science and Technology Policy required federal agencies to introduce policies by the end of 2025 under which publications and data from federally funded research are made available without delay. Most such policies are already in force, but since February 2026 the administration has been reviewing the memorandum itself.
- **Journals.** Many journals require a data availability statement in the paper: where the data is and on what terms. PLOS introduced this requirement in 2014.
- **Recognition.** A dataset with a DOI can be cited, and its citations are counted. A data paper turns work on data into a scholarly publication; see the section [Data papers](#data-papers).

A statement that "data is available from the authors on request" does not replace a repository. In a 2022 study, the authors of 1,792 papers that promised data on request were asked to send it. 93% did not reply or refused; 123 authors, 6.8%, sent the data.

For a catalog this means that DOIs, long-term preservation, a licence and a description for citation are not optional features here. Without them a funder will not accept the repository in a data management plan. NIH, for example, advises first looking for a domain repository for your discipline, and if there is none, a generalist or institutional one. NIH's list of requirements for a repository begins with the same things: a persistent identifier and a dataset page that opens even if the dataset itself has been withdrawn. A repository is checked against re3data and the CoreTrustSeal certification, covered in the section [Standards](#standards).

## Who builds them

Research repositories are almost entirely run by universities and research organisations.

| Owner | Repositories | Share |
|----------|-------------:|-----:|
| Universities and research organisations | 7,164 | 85% |
| Central government | 592 | 7% |
| International organisations | 217 | 3% |
| Civil society organisations | 137 | 2% |
| Companies | 117 | 1% |
| Regions | 79 | 1% |
| Other: communities, local and federal government | 98 | 1% |

Central government here means agency research services: geological, meteorological, oceanographic. International ones are consortia such as GBIF and intergovernmental organisations.

By who can deposit data, repositories fall into five kinds.

| Kind | Who runs it and for whom | What it gives the author | Examples |
|-----|----------------------|-----------------|---------|
| Institutional | a university or institute for its own staff | library moderation, its own DOI prefix, often a shared repository with papers and theses | DaRUS (Stuttgart), the SPbU archive |
| Domain | a research community for one discipline | strict acceptance according to the discipline's standards, readers from the field | PANGAEA, GBIF, ICPSR |
| Generalist | a service for any discipline and any author | quick publication with a DOI without an installation of your own | Zenodo, Figshare, Harvard Dataverse, Dryad, Mendeley Data, OSF |
| National or shared | the state or a consortium for all organisations in a country | a ready-made repository without an administrator of your own | Fairdata (Finland), JAIRO Cloud (Japan), DABAR (Croatia) |
| CRIS | the university as a research information system | a dataset as one more output next to papers and grants | portals on Pure, Research.fi |

National models are covered in the section [National models](#national-models), CRIS in the section [CRIS: hidden data catalogs](#cris-hidden-data-catalogs).

### The number of repositories is not a measure of research data

By number of research repositories in the registry the leaders are the United States (2,018), Germany (764), the United Kingdom (503), France (289), Japan (275), Canada (245), China (244) and Italy (211). Another 681 repositories are international. As with open data portals, the count shows not the volume of data but how publishing is organised in a country. In Japan 160 repositories out of 275 are showcases of the shared hosted service JAIRO Cloud on the WEKO3 software. In Croatia 76 out of 84 are organisations' repositories in the national DABAR system. In Germany 121 are university library publication servers on OPUS, in the US 146 are university repositories on the hosted Digital Commons service. Most of them hold papers and theses, and data is a small share.

## What they publish

They publish tables and files behind papers, observations, code, collection descriptions. A good dataset package is more than files: it includes a description of the methodology, a data dictionary, processing code and a licence. If the repository is a shared one, the publications themselves sit next to the data. When harvesting descriptions, papers have to be separated from data, otherwise a dataset search engine will show theses.

How data is published depends heavily on the discipline. The life sciences, especially bioinformatics, have long lived in their own connected infrastructure: their own standards, identifiers and databases, where the unit of record is a study or a genome rather than a dataset. The Earth sciences (climate, meteorology, the ocean) also keep apart, with their own formats and servers. Machine learning data mostly sits on Kaggle and Hugging Face; see the chapter [on ML catalogs](./07-ml-catalogs.md). Economics, the social sciences and the humanities more often put data where they put papers: in the university repository or a generalist one.

The registry shows this through themes: after the general theme "science and technology", the most common are environment (about 2,300 repositories), living organisms (about 1,600), health, oceans, Earth sciences and climate. The natural sciences are described and harvested better than the social sciences and humanities: they have their own software and networks, covered in the section [Disciplinary infrastructures](#disciplinary-infrastructures).

## Standards

**Description.** The basis is the DataCite schema: the latest version, 4.7, came out in March 2026. There are six mandatory fields: identifier, creators, title, publisher, publication year and resource type. Via the OAI-PMH protocol repositories also serve a short Dublin Core. Disciplines have their own schemas: DDI for social surveys, Darwin Core and EML for biodiversity, ISO 19115 for the Earth sciences, the CF conventions for NetCDF files. Platforms lag behind the schema: according to its documentation, InvenioRDM relies on DataCite version 4.3. If you need new fields, such as a link to a project via RAiD, check which version of the schema the platform supports.

**Identifiers.** A dataset gets a DOI, an author an ORCID, an organisation a ROR ID. Through these links search engines and aggregators connect a dataset with people, organisations and papers. In the description of a dataset on Harvard Dataverse, the schema.org markup gives the author a link to ORCID and the organisation a link to ROR. DOIs, versions and a citation line are mandatory here. How they work is covered in the chapters [on identifiers](../04-features/06-identifiers-and-doi.md) and [on citation](../04-features/07-citation.md).

**Passing on descriptions.** The main interface of research repositories is OAI-PMH: in the registry it is marked for 2,068 repositories, about a quarter. About as many serve a sitemap, and about 200 a DCAT export. Google Dataset Search needs schema.org markup on the dataset page. Newer is FAIR Signposting: the dataset page lists links to the description, the files, the licence and the authors' identifiers in a response header or a separate file. This way a program learns the essentials about a dataset without parsing HTML. Signposting is in the core of Dataverse since version 5.14, InvenioRDM since version 12 and DSpace since version 7.6. More on export formats in the chapter [on metadata export](../04-features/02-metadata-export.md).

**Trust.** CoreTrustSeal is a certification for long-term preservation against 16 requirements: mission, rights, continuity of access, preservation, security. About 160 repositories are certified, and the requirements have been updated for 2026–2028. In 2026 the CoreTrustSeal board approved a separate methodology for how a repository should prepare for its own closure. The certification and a profile in re3data are the first things funders and journals look at when checking a repository.

## Platforms

About a third of research repositories are home-grown, and they have the worst programmatic access. Among the ready-made platforms many were not built for data.

| Platform | In the registry | What it is | API marked |
|-----------|----------:|---------|------------:|
| Custom build | 2,836 | — | 5% |
| DSpace | 829 | open-source platform for library repositories: publications and data | 99% |
| Pure | 369 | Elsevier's commercial CRIS | 100% |
| GBIF IPT | 360 | open-source tool for publishing biodiversity data | 91% |
| Figshare | 288 | hosted service: the shared figshare.com and organisational repositories | 99% |
| Dataverse | 257 | open-source data repository | 99% |
| THREDDS | 249 | server for NetCDF and HDF arrays | 98% |
| ERDDAP | 175 | server for observation series and grids | 99% |
| Digital Commons | 174 | Elsevier's hosted service for university repositories, mostly in the US | 99% |
| WEKO3 | 161 | software of the Japanese JAIRO Cloud service | 100% |
| EPrints | 129 | open-source platform for publication repositories | 99% |
| OPUS | 124 | open-source publication server of German libraries | 98% |

Less common are InstDB (83, China), DABAR (76, Croatia), InvenioRDM (74, including Zenodo), DSpace-CRIS (44) and CKAN (39).

The table shows three things. First, the platforms fall into four families: publication repositories (DSpace, EPrints, OPUS, Digital Commons, WEKO3), CRIS (Pure), data repositories (Dataverse, InvenioRDM, Figshare) and data servers (THREDDS, ERDDAP, IPT). Only the third family was designed for datasets, so repositories on platforms of the first family hold little data. Second, ready-made platforms almost always have an API, while for custom builds it is marked in only 5%. The argument against a home-grown repository is even stronger here than for open data portals. Third, the share of inactive installations is highest for IPT, 12%; for the other large platforms it is no more than 2%.

### What is in the core and what is not

DOIs are in the core of Dataverse, InvenioRDM, Figshare and DSpace, and a ready-made citation with BibTeX and RIS export in the first three. DSpace up to and including version 10.1 has only meta tags for Google Scholar; the "Cite" button is being ported from DSpace-CRIS. Installing an open data portal for research and bolting on DOIs with an extension is a workaround.

| Capability | Dataverse | InvenioRDM | DSpace | CKAN |
|-------------|-----------|------------|--------|------|
| DOI | core: DataCite, EZID, also Handle | core: DataCite | core, enabled by configuration; Handle by default | the ckanext-doi extension, declared for CKAN 2.9 and 2.10 |
| Dataset versions | core | core: each version has its own DOI plus a common one for all | core | no |
| Embargo and restricted files | core, with access requests | core, with access requests | core: embargo until a date, request a copy of a file | only an entire private dataset |
| OAI-PMH | core | core | core | not in the core |
| schema.org markup | core | core | not found in the core | the ckanext-dcat extension |
| DCAT | no | core (DCAT-AP) | no | the ckanext-dcat extension |
| FAIR Signposting | core since 5.14 | core since v12 | core since 7.6 | no |
| Citation line, BibTeX, RIS | core | core (CSL styles, BibTeX, CSL-JSON; no RIS) | no: only meta tags for Google Scholar | the ckanext-doi extension (only with a DOI) or ckanext-citeproc |
| Domain-specific description fields | core: ready-made blocks and your own | core configuration | core configuration | the ckanext-scheming extension |

Extensions work differently in research platforms than in CKAN: the essentials are in the core, and outside are file previewers and additional export formats. In Dataverse these are external tools and external exporters, maintained by the GDCC community, for example the RO-Crate and DCAT 3 exporters; the Croissant exporter moved into the core in version 6.10. The Dataverse documentation itself calls the exporter mechanism experimental and warns that it may need rework when the platform is upgraded. DSpace has entity models and configuration instead of plugins: DSpace 10 (2026) introduced a separate "dataset" item type with its own page and a detailed file list. CKAN remains a workaround for research: the documentation of the DOI extension does not confirm support for the current core line; details are in the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md).

**Versions and maintenance.** As of 12 October 2026 the latest releases are Dataverse 6.12.1 (8 October), InvenioRDM v14 (7 August; v13 is supported until 7 February 2027, v15 is in beta), DSpace 10.1 (14 September; fixes 9.4 and 8.5 came out the same day). Large installations lag one or two versions behind: Harvard Dataverse runs 6.10.1, DSpace@MIT 8.2. This is fine if upgrades are planned. How much maintenance costs is covered in the chapter [on deployment](../04-features/09-deployment-and-operations.md), and platform profiles are in the part [Platforms and Extensions](../05-platforms/04-platform-profiles.md).

### How much you can put in a generalist repository

Generalist repositories are free up to a limit, and big data costs money.

| Service | Free | Beyond the limit |
|--------|-----------|--------------|
| Zenodo | up to 50 GB and 100 files per record, unlimited number of records | a one-off increase to 200 GB per record on request. The rules prohibit splitting one dataset into records to get around the limit |
| Harvard Dataverse | files up to 2.5 GB via the browser, up to 1 TB per researcher | larger by arrangement, primarily for Harvard researchers |
| Figshare | 20 GB of personal space, files up to 20 GB | Figshare+: a one-off fee of 1,225 dollars per 250 GB, files up to 5 TB |
| Dryad | authors from partner organisations up to 10 GB, paid by the partner | others pay 150 dollars per dataset up to 5 GB and more on a scale, up to 12,162 dollars for 2 TB |

Limits and prices are as of 12 October 2026; Dryad's fees have applied since 6 May 2025. If you have terabytes of data, a generalist repository does not fit: you need the discipline's domain archive or your own storage with a description in a catalog. The options are in the chapters [on data storage](../04-features/05-data-storage.md) and [on cloud storage and hubs](../08-beyond-portals/04-cloud-storage-and-hubs.md).

## Disciplinary infrastructures

Many sciences have their own catalogs on their own software. These are full catalogs, with descriptions, licences and programmatic access. But few people outside the discipline know about them, and general dataset search engines hardly harvest them.

- **ERDDAP** is a data server from the US National Oceanic and Atmospheric Administration (NOAA) for ocean, weather and climate observations. It serves series and grids through an API in CSV, JSON, NetCDF and other formats. According to the project website, about 100 organisations in at least 17 countries have installed ERDDAP; the registry lists about 175 servers.
- **THREDDS Data Server** from Unidata and **OPeNDAP Hyrax** servers distribute large arrays in NetCDF and HDF. The registry lists about 250 THREDDS servers and about 100 OPeNDAP servers. Their descriptions are sparse: from the outside such a server looks more like scientific file storage than a catalog.
- **GBIF IPT** is a tool for publishing biodiversity data. Universities and museums install it, and the global GBIF network harvests data from all installations. In October 2026 GBIF had 392 registered IPT installations, and the network itself about 125,000 datasets and almost 4 billion species occurrence records. Each installation serves descriptions in DCAT. In Russia, for example, the IPT of the Zoological Institute of the Russian Academy of Sciences (ipt.zin.ru) works this way.
- **WIS 2.0** is the World Meteorological Organization's system for exchanging weather station data. The open wis2box package serves data according to the OGC API standard. The registry lists about 95 installations, including Russian (wis2box.mecom.ru) and Kazakh ones. Its predecessor is OpenWIS, built on GeoNetwork. Its code has not been developed since 2022, and 11 such portals remain in the registry.

The conclusion for a data owner in such a discipline: install its standard tool, not a general portal. That way the data reaches the network where colleagues look for it. For it to be found outside the discipline too, you also need a metadata export in DCAT or schema.org; see the chapter [on discoverability](../07-publishing/05-discoverability.md).

## National models

Countries bring research data together into one system in different ways.

- **Finland.** The Ministry of Education and Culture offers the Fairdata set of services, built by the CSC centre: IDA storage, Etsin dataset search, the Qvain description editor, the Metax metadata interface, long-term preservation and the AVAA publishing platform. A researcher goes from storage to publication within one system.
- **Japan.** Since 2012 the National Institute of Informatics (NII) has provided universities with the hosted repository JAIRO Cloud on its WEKO3 software. Since 2016 the service has been run together with the Japan Consortium for Open Access Repositories (JPCOAR); since 2017 it has been paid, with 100 GB included free. At the end of fiscal year 2025, 822 organisations used it. An organisation cannot modify the software, but NII takes care of upgrades, servers and metadata export. The model grew out of a shortage of people: according to NII, in almost 90% of consortium members less than one full-time staff member works on the repository. In 2026 access requests for restricted files are being added to the service.
- **Croatia.** The national DABAR system has existed since 2015 and is run by SRCE, the computing centre of the University of Zagreb. It has 185 repositories of research organisations and universities. In November 2025 the system was moved to a new architecture based on Fedora Commons and connected to the national CRIS, CroRIS. According to a 2025 study, though, only just over half of the objects were open.
- **Germany.** There is no single platform, but there is a set of open-source products. Dataverse runs DaRUS in Stuttgart and heiDATA in Heidelberg, with 25 German installations in the registry. Invenio runs the RODARE archive. DSpace runs OpARA in Dresden. The local MyCoRe has 22 German portals in the registry, for example opendata.uni-kiel.de. Alongside are large domain archives such as PANGAEA and the agency da|ra, which issues DOIs for social and economic data and provides search over them.
- **China.** The Science Data Bank (ScienceDB, scidb.cn) is a shared repository run by the Computer Network Information Center of the Chinese Academy of Sciences. Institutes publish data on the standard InstDB software from the FairStack suite, with 82 Chinese installations in the registry. InstDB supports three access modes: open, after login and on request. On top of it runs the FinData search engine (findata.cn). From outside the system is almost invisible: in December 2025, of 72 known InstDB installations, between 6 and 12 opened from foreign addresses.
- **United States.** Data is collected by agency aggregators. The US Geological Survey (USGS) Science Data Catalog combines several repositories, the main one being ScienceBase. According to a 2022 observation, a DOI, a geographic location and the observation period are mandatory there for every dataset. The Department of Energy runs OSTI.GOV and the DOE Data Explorer, and Science.gov searches the research outputs of many federal agencies, including data.
- **France.** The national repository Recherche Data Gouv runs on Dataverse.
- **Russia.** There is no national research data infrastructure. According to a July 2025 count, there were 6,806 datasets with a DataCite DOI and a Russian affiliation, most of them from the Russian Academy of Sciences, and almost all were uploaded to foreign platforms such as Zenodo, Dryad and Mendeley Data. The registry lists 75 Russian research repositories, more than half of them home-grown. Where science is embedded in global networks, data is published on their tools, as in GBIF IPT nodes.

The Japanese and Croatian models are the equivalent of the standard portal in open data: one build for hundreds of organisations that have no people of their own. This works when the shared system issues DOIs itself and passes descriptions upwards, leaving the organisation only to fill it. The weak spot is the same as with the standard portal: such systems are filled mainly with papers and theses, and data remains a small share.

## CRIS: hidden data catalogs

A CRIS (current research information system) records an organisation's research activity: publications, projects, grants, staff, equipment. Many universities publish data not in a separate repository but in their CRIS, as one more research output. The most widespread system is Elsevier Pure, with about 370 portals in the registry. Next to it are DSpace-CRIS (about 45) and Converis. In Pure a dataset is a separate content type. It is disabled by default and enabled by an administrator, and DOIs can be minted directly from the system via DataCite. A national example is the Finnish Research.fi: the country's publications, projects, funding, researchers and datasets in one search.

What makes these catalogs hidden is that the portal looks like a university website about research rather than a data catalog, and datasets get lost among papers and profiles. Commercial platforms also shut themselves off from programs: on 12 October 2026 four university portals on Pure responded to an automated request with a refusal or a bot check. For data in a CRIS to be found, a dataset must have a DataCite DOI: then its description lives outside the university website as well.

## Why they are hard to harvest

There is a lot of research data, but bringing it into one search is harder than with open data portals or statistics. The reasons are technical and commercial.

1. **The OAI-PMH protocol is not about files.** It is the main interface of research repositories. Its mandatory format is simple Dublin Core, which has no place for a list of files: a record usually contains only a link to the landing page. Selection by sections (sets) is defined by the repository itself, and the protocol does not allow asking it for "only data".
2. **Data is scarce among papers.** In DSpace a filter by item type is described in the configuration but not enabled in search by default. To find datasets, a harvester downloads the descriptions of all records and selects the data itself. In December 2024 the SPbU open access archive had 17 records marked as datasets out of 47,619. In October 2026 the archive runs on DSpace 10.1, and there is still no item type filter among the search filters. According to an estimate from the same year, datasets account for less than 5% of records in DSpace repositories.
3. **Commercial platforms.** Figshare and portals on Pure made up about a third of the research catalogs in the Dateno registry in 2024. They restrict automated harvesting.
4. **The files are somewhere else.** Increasingly a researcher puts the files in Zenodo or Mendeley Data, and the university repository keeps a record with a link to someone else's record.
5. **Aggregators count everything as data.** In October 2026 DataCite had more than 76 million records of type "dataset", including slices of large databases and objects far removed from tables. More in the chapter [The World of Catalogs in Numbers](../01-basics/04-catalogs-in-numbers.md).

What follows for a repository owner: enable a filter by item type or a separate collection for data; if the platform can, serve not only Dublin Core but also the DataCite schema via OAI-PMH; store files yourself or provide direct links to them; enable FAIR Signposting; create a profile in re3data.

## Data papers

A data paper is a peer-reviewed article that describes a dataset: how it was collected, what it contains, how to use it. It has no hypotheses or conclusions. The data itself sits in a repository; the paper cites it and gives the authors scholarly credit for working with the data. Such papers are published by Scientific Data, Earth System Science Data, Biodiversity Data Journal, Data in Brief and other journals. GBIF keeps a list of them, and IPT can generate a draft paper from a dataset description. There are still few of them: in October 2026 DataCite had about 18,500 records of type "data paper".

For a catalog the conclusion is simple: if a dataset has a paper, link them by giving the paper's DOI in the dataset description, and vice versa. For a dataset search engine the question is open. A data paper is not the data itself, but sometimes it is the only place where the dataset is mentioned at all.

## Examples

**Generalist**

- [Zenodo](https://zenodo.org): a generalist repository at CERN on InvenioRDM. It accepts data, code and publications in any discipline, with a DOI for each version.
- [Harvard Dataverse](https://dataverse.harvard.edu): the Dataverse installation at Harvard University, open free of charge to researchers worldwide.
- [Figshare](https://figshare.com): a hosted service, a free generalist repository and paid university repositories.
- [Dryad](https://datadryad.org): a non-profit repository where a curator checks each dataset; partner organisations or authors pay.

**Domain**

- [PANGAEA](https://www.pangaea.de): Earth and environmental sciences.
- [GBIF](https://www.gbif.org): the global biodiversity data network, which harvests datasets from hundreds of IPT installations.
- [ICPSR](https://www.icpsr.umich.edu): the social science data archive at the University of Michigan.

**National and shared**

- [Etsin](https://etsin.fairdata.fi/): search for Finnish research datasets in the Fairdata system.
- [JAIRO Cloud](https://rcos.nii.ac.jp/en/service/weko3/): the shared hosted repository of Japanese universities.
- [DABAR](https://www.srce.unizg.hr/en/dabar): Croatia's national repository system.
- [Science Data Bank](https://www.scidb.cn): the shared repository of the Chinese Academy of Sciences.
- [Recherche Data Gouv](https://entrepot.recherche.data.gouv.fr): France's national repository on Dataverse.

**Institutional**

- [CaltechDATA](https://data.caltech.edu): the California Institute of Technology repository on InvenioRDM, about 77,000 records in October 2026.
- [DaRUS](https://darus.uni-stuttgart.de): the University of Stuttgart data repository on Dataverse.

## Where it breaks

**A publications repository posing as a data repository.** The catalog is called a data repository, but there is almost no data in it: the SPbU archive has 17 datasets per 47,000 records. A harvester cannot ask for "only data" and takes thousands of papers. Why this happens is covered in the section [Why they are hard to harvest](#why-they-are-hard-to-harvest).

**A DOI, but no file.** The DOI leads to a landing page, but the file has been deleted, sits on someone else's site or is available "on request". The NIH requirement is precise here: the dataset page must open even if the dataset has been withdrawn, and explain what happened to it. An empty error page breaks the link in the paper.

**Published material gets edited.** A file was replaced without a new version, and whoever cited the dataset now cites different data. Research platforms prevent this: Zenodo allows changing the files of a published record only for 30 days; after that, a new version or a justified request to support. On an open data portal a file is usually replaced silently, and for research that is a breakage.

**The repository closed.** According to a 2023 study, of 3,069 repositories in re3data, 191, or 6.2%, had closed. The median age at closure was 12 years. Only 44% of the closed ones transferred their data to another repository, and in almost half of the cases the data may have been lost. Hence CoreTrustSeal's requirements for a closure plan and the conclusions in the chapter [on archiving](../09-practices/04-archiving.md).

**The robot cannot get through.** On 12 October 2026 a dataset page on Harvard Dataverse responded to an automated request not with the page itself but with a bot check from the AWS cloud firewall, although the API and OAI-PMH responded normally. Portals on Pure responded with a refusal the same day. For a search engine or harvester that reads the dataset page, the schema.org markup and the Signposting header, such a dataset does not exist. Bot protection is necessary, but the machine entrances (the dataset page, the API, OAI-PMH) must stay open.

**A home-grown repository without an API.** Only 5% of home-grown research repositories have a programming interface marked. Neither research aggregators nor dataset search engines will harvest such a repository.

**Reliance on one person.** The repository lives as long as a particular staff member or PhD student runs it. Among IPT installations the share of inactive ones is 12%, several times higher than for other large platforms. Shared services such as JAIRO Cloud and DABAR appeared precisely as the answer to this.

## How to check a research repository

Five questions you can answer in half an hour.

1. **Does the dataset have a DOI, and where does it lead?** A query to DataCite shows the landing page address, the resource type and the version.
2. **Does the repository serve descriptions to harvesters?** The OAI-PMH protocol should respond, and among the formats, besides simple Dublin Core, there should be the DataCite schema (`oai_datacite`).
3. **Can you select only data?** Look at the OAI-PMH sets and the search filters: is there a separate collection or a "dataset" item type?
4. **Can programs see the dataset?** Check the schema.org markup and the `Link` header with a link to a `linkset`; that is FAIR Signposting. If a bot check comes back instead of the page, search engines will not read the dataset.
5. **Is the repository listed in re3data, and is it certified?** This is what a funder will check.

```bash
# DataCite: where the DOI leads, resource type and version
curl -s "https://api.datacite.org/dois/10.7910/DVN/TJCLKP"
# OAI-PMH: is the interface alive, which schemas it serves and which sets it has
curl -s "https://dataverse.harvard.edu/oai?verb=Identify"
curl -s "https://dataverse.harvard.edu/oai?verb=ListMetadataFormats"
curl -s "https://dataverse.harvard.edu/oai?verb=ListSets"
# Dataverse: platform version and the dataset description in schema.org
curl -s "https://dataverse.harvard.edu/api/info/version"
curl -s "https://dataverse.harvard.edu/api/datasets/export?exporter=schema.org&persistentId=doi:10.7910/DVN/TJCLKP"
# InvenioRDM: number of records and the FAIR Signposting header on a record page
curl -s "https://data.caltech.edu/api/records?size=1"
curl -sI "https://data.caltech.edu/records/0jxb3-ny611" | grep -i '^link'
# DSpace 7 and later: platform version
curl -s "https://dspace.mit.edu/server/api"
# re3data: is the repository in the registry
curl -s "https://www.re3data.org/api/beta/repositories?query=PANGAEA"
```

All commands were checked on 12 October 2026. Besides Dublin Core, Harvard Dataverse serves the DataCite and DDI schemas via OAI-PMH. A CaltechDATA record page returns a header with a link to a `linkset`. A detailed list of checks is in the [checklists](../12-appendices/04-checklists.md), and commands for identifiers are in the chapter [on identifiers](../04-features/06-identifiers-and-doi.md#how-to-check-a-live-portal).

## When you do not need your own repository

A repository of your own is ongoing work: upgrades, moderation, a contract with DataCite, answers to authors. For a small group Zenodo or a domain repository of its discipline is often enough, and funders accept this. For a university without library staff it is better to join the country's or a consortium's shared service, as Japanese and Croatian universities do. Your own Dataverse or InvenioRDM is justified when the library moderates dozens of groups, you need your own DOI prefix and there is someone to maintain the system. Such a decision is worked through in the [university example](../06-choice/08-worked-examples.md#university-a-data-repository-not-another-ckan). Requirements for a research organisation are in the chapter [on scenarios](../06-choice/06-scenarios.md#university-and-research-organisation), and for a consortium in the [neighbouring section](../06-choice/06-scenarios.md#research-consortium).

## How it differs from its neighbours

| Neighbour | Main difference |
|-------|-----------------|
| Open data portal | regular updates matter more than an immutable version with a DOI; a public body publishes, not the author of a study |
| Microdata catalog | survey data about people, access on request and descriptions in DDI. Social science archives such as ICPSR sit at the junction of the two types |
| ML catalog | the dataset is needed to load into training code, not to cite in a paper; next to it are a dataset card and splits |
| Geoportal | the main product is a layer and a service, not a fixed file. THREDDS and ERDDAP servers sit at the junction |
| Publications repository | the unit is a paper or a thesis, and data is a small share of records |
| CRIS | records all of an organisation's research activity, and a dataset is just one of the record types |

A summary table of all types is in the chapter [Comparing Types and Hybrids](./11-comparison-and-hybrids.md).

## Sources

- dataportals-registry export, release 1.27.0 of 15 October 2026: owners, countries, platforms with the share having an API and the share inactive, main platforms by country, interfaces, themes and access of research repositories. The queries are in the [appendix](../12-appendices/02-using-the-registry.md#research-repositories).
- [re3data](https://www.re3data.org/) and [its API](https://www.re3data.org/api/v1/repositories): number of repositories, 12 October 2026
- M. D. Wilkinson et al., [The FAIR Guiding Principles for scientific data management and stewardship](https://doi.org/10.1038/sdata.2016.18), Scientific Data, 2016; [the FAIR principles at GO FAIR](https://www.go-fair.org/fair-principles/)
- Funder and journal policies: [open science in Horizon Europe](https://research-and-innovation.ec.europa.eu/strategy/strategy-research-and-innovation/our-digital-future/open-science_en); [the NIH Data Management and Sharing Policy](https://public-inspection.federalregister.gov/2020-23674.pdf), in force since 25 January 2023, including the requirements for repositories; [selecting a repository according to NIH](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-21-016.html); [US federal agency policies under the 2022 OSTP memorandum](https://sparcopen.org/our-work/2022-updated-ostp-policy-guidance/), SPARC, updated 4 May 2026; [on the review of the memorandum](https://stm-assoc.org/ostp-to-review-potential-repeal-of-nelson-memo/), STM, 19 February 2026; [PLOS data availability requirements](https://journals.plos.org/plosone/s/data-availability)
- M. Gabelica, R. Bojčić, L. Puljak, [Many researchers were not compliant with their published data sharing statement](https://doi.org/10.1016/j.jclinepi.2022.05.019), Journal of Clinical Epidemiology, 2022
- [DataCite Metadata Schema](https://schema.datacite.org/), version 4.7 of 3 March 2026; [InvenioRDM metadata reference](https://inveniordm.docs.cern.ch/reference/metadata/): the supported schema version
- [FAIR Signposting](https://signposting.org/FAIR/) and [who supports it](https://signposting.org/adopters/); Signposting in [Dataverse](https://guides.dataverse.org/en/latest/admin/discoverability.html), [InvenioRDM](https://inveniordm.docs.cern.ch/operate/customize/FAIR-signposting/) and [DSpace](https://github.com/DSpace/RestContract/blob/main/signposting.md)
- [CoreTrustSeal](https://www.coretrustseal.org/): the 2026–2028 requirements, the number of certified repositories and the methodology for closure, 12 October 2026
- Platforms: [Dataverse export formats](https://guides.dataverse.org/en/latest/user/dataset-management.html) and [external exporters](https://guides.dataverse.org/en/latest/installation/advanced.html); [the GDCC exporter catalog](https://github.com/gdcc/dataverse-exporters); [InvenioRDM export formats in the source code](https://github.com/inveniosoftware/invenio-rdm-records/blob/master/invenio_rdm_records/resources/config.py); [InvenioRDM maintenance policy](https://inveniordm.docs.cern.ch/releases/maintenance-policy/); [DOIs in DSpace](https://wiki.lyrasis.org/spaces/DSDOC9x/pages/379125981/DOI+Digital+Object+Identifier); [the "dataset" item type in DSpace 10](https://github.com/DSpace/DSpace/pull/11969); [Dataverse features](https://guides.dataverse.org/en/latest/admin/features.html); releases of [Dataverse](https://github.com/IQSS/dataverse/releases) and [DSpace](https://github.com/DSpace/DSpace/releases). Versions of Harvard Dataverse and DSpace@MIT, and OAI-PMH, Signposting and bot check responses: checked 12 October 2026.
- Limits and prices: [Zenodo](https://support.zenodo.org/help/en-gb/1-upload-deposit/80-what-are-the-size-limitations-of-zenodo) and [editing files after publication](https://help.zenodo.org/docs/deposit/manage-files/); [Harvard Dataverse](https://support.dataverse.harvard.edu/researchers); [Figshare](https://info.figshare.com/user-guide/account-limits/) and [Figshare+](https://info.figshare.com/figshare-plus/); [Dryad](https://datadryad.org/costs); checked 12 October 2026
- [OAI-PMH 2.0 specification](https://www.openarchives.org/OAI/openarchivesprotocol.html): the mandatory Dublin Core format and sets; [DSpace default search configuration](https://github.com/DSpace/DSpace/blob/main/dspace/config/spring/api/discovery.xml): the item type filter is described but not enabled; [the dataset content type in Pure](https://helpcenter.pure.elsevier.com/content-types/datasets); checked 12 October 2026
- [ERDDAP](https://erddap.github.io/): who uses it; [THREDDS Data Server](https://www.unidata.ucar.edu/software/tds/); [OPeNDAP](https://www.opendap.org/); [GBIF IPT](https://www.gbif.org/ipt) and [the GBIF installation registry API](https://api.gbif.org/v1/installation?type=IPT_INSTALLATION&limit=0); [wis2box](https://github.com/World-Meteorological-Organization/wis2box); [OpenWIS](https://github.com/OpenWIS/openwis); checked 12 October 2026
- National models: [Fairdata](https://www.fairdata.fi/en/), [Research.fi](https://research.fi/en/results/datasets); [JAIRO Cloud at JPCOAR](https://jpcoar.org/support/jairo-cloud/): history, terms and 822 organisations at the end of fiscal year 2025; [JAIRO Cloud at NII](https://rcos.nii.ac.jp/en/service/weko3/); [NII's presentation for COAR](https://coar-repositories.org/wp-content/uploads/2026/06/2.8.-Japan.pdf), 2026, on staff workload; [access requests in JAIRO Cloud](https://rcos.nii.ac.jp/news/2026/03/20260323-0/), 23 March 2026; [DABAR](https://www.srce.unizg.hr/en/dabar) and [on the new version of DABAR](https://dabar.srce.hr/en/news/2026-05-15-the-new-dabar), 15 May 2026; [National Repository Infrastructure and Open Access Challenges: The Croatian Perspective](https://liberquarterly.eu/article/view/23061), LIBER Quarterly, 2025; [DaRUS](https://darus.uni-stuttgart.de), [heiDATA](https://heidata.uni-heidelberg.de/), [RODARE](https://rodare.hzdr.de/), [OpARA](https://opara.zih.tu-dresden.de/), [MyCoRe](https://www.mycore.de/site/applications/list/), [da|ra](https://www.da-ra.de/), [ScienceDB](https://www.scidb.cn), [FinData](https://www.findata.cn/), [USGS Science Data Catalog](https://data.usgs.gov/datacatalog/), [DOE Data Explorer](https://www.osti.gov/dataexplorer/), [Science.gov](https://www.science.gov/), [Recherche Data Gouv](https://entrepot.recherche.data.gouv.fr); checked 12 October 2026
- D. Strecker, H. Pampel, R. Schabinger, N. L. Weisweiler, [Disappearing repositories: Taking an infrastructure perspective on the long-term availability of research data](https://doi.org/10.1162/qss_a_00277), Quantitative Science Studies, 2023
- [Data papers at GBIF](https://www.gbif.org/data-papers); [the DataCite API](https://api.datacite.org/dois?resource-type-id=data-paper&page%5Bsize%5D=0): number of records by type, 12 October 2026
- I. Begtin, Telegram (in Russian): [Germany](https://t.me/begtin/4754), 4 April 2023; [Fairdata](https://t.me/begtin/5042), 30 July 2023; [data papers](https://t.me/begtin/5568), 7 April 2024; [InstDB in China](https://t.me/begtin/5569), 7 April 2024; [data depends on the discipline](https://t.me/begtin/6030), 12 September 2024; [why research data is hard to index](https://t.me/begtin/6177), 16 November 2024; [ERDDAP](https://t.me/begtin/6256), 9 December 2024; [OpenWIS](https://t.me/begtin/6293), 23 December 2024; [the SPbU DSpace](https://t.me/begtin/6302), 25 December 2024; [IPT in Russia](https://t.me/begtin/6311), 26 December 2024; [research catalogs in the UK](https://t.me/begtin/6826), 16 June 2025; [DataCite and datasets by country](https://t.me/begtin/6955), 20 July 2025; [availability of InstDB from abroad](https://t.me/begtin/7330), 25 December 2025; [the USGS data catalog](https://t.me/begtin/3581), 17 February 2022
