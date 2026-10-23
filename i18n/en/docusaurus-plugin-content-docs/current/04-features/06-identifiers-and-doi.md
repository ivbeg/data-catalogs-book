---
title: Persistent Identifiers, DOIs and Versions
description: Why a dataset needs a permanent address and a DOI, what kinds of identifiers exist and what they cost, how a version differs from an update, how platforms do it, and how to check that a link will open the same dataset years later.
---

# Persistent Identifiers, DOIs and Versions

Data gets cited: in a paper, in a report, in another catalog, in someone else's program. A link is useful only if a year later it opens the same dataset. Hence the chapter's three practical conclusions.

Every catalog needs a permanent page address, and it costs almost nothing if planned before launch: the address should contain a key that does not change when the description is edited or when the catalog moves to another platform. A DOI is needed where data is cited as a source. It is not a button but an agreement with a registration agency and a commitment to maintain, for years, the page it points to. A version is a promise that the link will open the data the author used, not today's dump.

The main thing the checks at the end of the chapter show: an identifier is no more reliable than the site it points to. In DataCite, more than five hundred "findable" dataset DOIs lead to `localhost`, the address of the computer on which they were set up. In four out of ten DSpace installations checked, the persistent identifier printed on the record page does not resolve.

## What it is

**Address and identifier.** An address says where a page is: `portal.example/dataset/budget-2024`. An identifier says what the object is, regardless of where the object is now. A persistent identifier has three parts: a name, a service that redirects from the name to the current address (called a resolver), and an owner who commits to updating that address at every move. Without the third part the first two do not work: the service will faithfully redirect wherever it was told to, even if nothing has been there for a long time.

There are three mechanisms, and they are often confused.

**A permanent page address.** A dataset's address does not change because of a typo fix in the description, and does not contain today's date or a database row number. When the site changes, the old address redirects to the new one. Everyone needs this, and the catalog itself provides it.

**An external persistent identifier.** DOI, Handle, ARK and the like: the name is registered with an external service, which redirects to the dataset's current page. A link of the form `https://doi.org/10.xxxx/yyyy` survives a change of domain, as long as the owner remembers to update the address in the service.

**A version.** A fixed state of a dataset. A scientific citation points to the version used in the analysis. An open data portal more often maintains one dataset that is updated: what matters is the update date and an archive of past dumps, not a new DOI every Monday.

### Kinds of identifiers

| Identifier | Who issues it and what it costs | What is mandatory | Where it is found |
|---------------|----------------------------|-----------------|-----------------|
| DOI | registration agencies: DataCite for data, Crossref for publications, and others. The member organisation pays, usually through a consortium | a description following the agency's schema: DataCite has six mandatory fields | research repositories, journals, Zenodo, Figshare, some geocatalogs |
| Handle | Handle.Net Registry; a prefix for an annual fee, your own Handle server | nothing | DSpace by default, Dataverse as an option. Technically a DOI is also a Handle with the prefix `10.` |
| ARK | ARK Alliance; an organisation number (NAAN) is free for libraries, archives and similar "memory organisations" | nothing | national libraries and archives, for example the National Library of France |
| PURL, w3id.org | free redirect services: purl.org is run by the Internet Archive, w3id.org by a W3C community; rules are added through a GitHub pull request | nothing | linked data vocabularies and ontologies, permanent addresses for small projects |
| CSTR | China's national system | a description of the object | Chinese research repositories, often together with a DOI |
| Installation permalink | the platform itself, without an external service | nothing | Dataverse (PermaLinks), the record identifier in any catalog |

Next to the dataset identifier work identifiers for the people and things around it: ORCID for the author, ROR for the organisation, IGSN for a physical sample, RAiD for a research project. Since the 2020s IGSN and RAiD have been issued as DOIs through DataCite: its repositories include 40 sample catalogs and 17 project registries. Through these links aggregators build a graph: who created a dataset, in which organisation, under which project and in which paper it was used.

## Why it is needed

**Links die fast.** According to a 2024 Pew Research Center study, 38% of pages that existed in 2013 no longer opened by October 2023. 21% of pages on US government websites contain at least one broken link, most often on city websites. The same goes for datasets: in the full data.gov.uk dump of 2023, about 10% of links to files did not open; more in the chapter [on storage](./05-data-storage.md).

**Links are broken by people, not technology.** So Tim Berners-Lee wrote in "Cool URIs don't change" (1998), and since 1999 W3C has kept all its documents at their original addresses under its own persistence policy. The opposite example is Russia's register of domestic software in 2021: after a move, old links stopped opening, and the new addresses contained the technical database record number (330494) instead of the program's register number (10269). At the next database change such an address will break again. Short links are not permanent either: their fate is decided by the service owner, as the goo.gl story in the chapter [on archiving](../09-practices/04-archiving.md) shows.

**So that data can be cited and the citation counted.** A DOI makes a dataset a full-fledged source: it goes into the reference list, citations are counted by it, and aggregators use it to link the dataset to a paper and an author. Without an identifier, a link to data remains a website address that nobody counts. How this becomes a ready citation string is covered in the chapter [on citation export](./07-citation.md).

**To match records.** Registers, reference lists and classifications serve other data as a point of reference. If a record has no stable identifier, you cannot reliably tell that a row in last year's file and a row in the new one are the same organisation. This is covered in the section [on registers](#registers-and-reference-lists) below.

## How a DOI works

A DOI consists of a prefix and a suffix: `10.5281/zenodo.16546069`. The prefix `10.5281` is assigned to an organisation; it makes up the suffix itself. The doi.org service responds to a request with a redirect to the address the owner recorded at registration. This address is called the landing page: it has the dataset description, a citation and a path to the files. The DOI itself stores no files.

**Agencies.** For data, DOIs are registered by DataCite, an association registered in Germany. On 12 October 2026 DataCite held 138.3 million DOIs, 76.4 million of them with the type "dataset". What lies behind that number is covered in the chapter [on the world of catalogs in numbers](../01-basics/04-catalogs-in-numbers.md). Crossref, a US agency, registers DOIs for articles, books and preprints. There are other agencies too, for example the Publications Office of the EU. Starting with InvenioRDM v14, and in Dataverse, DOIs can also be registered through Crossref, but for datasets the usual choice is DataCite.

**A description is mandatory.** Registration with DataCite requires six fields: identifier, creator, title, publisher, year, resource type. Without a creator and a year, a DOI cannot produce a citation. What else is worth filling in is covered in the chapter [on metadata completeness](./03-metadata-depth.md).

**A DOI cannot be deleted.** A DataCite record has three states. A draft is not yet registered in the global system and can be deleted. A "registered" DOI works, but its description is hidden from search. A "findable" one works and is visible to everyone. From the last two states there is no way back. If a dataset has to be withdrawn, DataCite advises leaving a tombstone page in its place: the citation, the DOI and an explanation of why the data is no longer available. For those who cannot make such a page, DataCite has a shared placeholder page; on 12 October 2026, 5,145 findable DOIs led to it.

**What it costs.** DataCite does not charge per DOI as long as an organisation registers fewer than 100 thousand a year. Payment is for membership: a direct member pays 2,000 euros a year plus an infrastructure fee of 200 to 700 euros depending on the country. An organisation inside a consortium does not pay the membership fee, only the infrastructure fee. That is why universities usually get DOIs through a national or library consortium, and small projects through someone else's repository such as Zenodo, where a DOI is free for the author.

### What a DOI does not guarantee

**That the data will be preserved.** A DOI leads to a page, and the owner keeps the page. The study "Open is not forever" (2020) counted 176 open access journals that vanished between 2000 and 2019, with and without DOIs. An identifier helps find a trace but does not replace an archive. How to preserve the data itself is covered in the chapter [on archiving](../09-practices/04-archiving.md).

**That the address is correct.** The doi.org service redirects wherever the owner recorded and does not check whether anything is there. On 12 October 2026, 765 findable DOIs in DataCite led to `localhost`, 548 of them datasets. Such an address opens only on the computer of whoever recorded it. One cause is visible in the GeoNetwork documentation: as a template for the landing page address it suggests `http://localhost:8080/geonetwork/srv/resources/records/{{uuid}}`. Portugal's Institute for Sea and Atmosphere, IPMA, registered two DOIs with such an address in 2025, one of them titled "Copy of template MFSD Template…", that is, a test copy of a template.

**That there is a dataset behind the DOI.** DOIs are also issued for individual records of a large database: a species observation, a crystal structure, a single experiment. So the number of DOIs with the type "dataset" cannot be read as the number of datasets; see the chapter [on the world of catalogs in numbers](../01-basics/04-catalogs-in-numbers.md).

**That the agency will always work with you.** DataCite and Crossref comply with their countries' sanctions. Crossref does not accept applications from organisations that are part of the Russian government or are under US, UK or EU sanctions; other applications from Russia and Belarus undergo a separate check, and after 2022 every Russian member was checked against sanctions lists and some were removed. DOIs already issued continue to resolve, but an organisation may be unable to get new ones. China has built a parallel system: the national CSTR identifier and the Science Data Bank repository, which at the same time issues DOIs through DataCite (28,406 records as of October 2026) and provides descriptions to European and American aggregators.

## Versions

**What counts as a new version.** The data changed: a new version. A typo in the description was fixed or a keyword added: a revision, which does not create a new version. The line is whether a reader would get a different result by repeating the analysis.

In a research repository a published version is not rewritten. A correction is a new version with its own DOI, or with the same DOI and a new number, according to the repository's rules. Platforms do this differently, and the difference matters for citation.

| Model | How it works | Where |
|--------|--------------|-----|
| A DOI for each version and a concept DOI | each version has its own DOI, plus a concept (parent) DOI that always leads to the latest version | InvenioRDM and Zenodo, Figshare (a concept DOI and DOIs with the suffix `.v1`, `.v2`) |
| One DOI and a version number | one DOI for the whole dataset; the version (1.0, 1.1, 2.0) is given in the citation | Dataverse |
| A DOI with a version number | the DOI of a new version is the original DOI with a number after a dot | DSpace with item versioning enabled |
| One updated dataset and dated snapshots | the dataset address is permanent, the file is replaced; past dumps sit in an archive with a date | open data portals, registers, reference lists |
| A dataset series | each release is a separate dataset with its own address, and the series groups them | the `dcat:DatasetSeries` class in DCAT 3, annual statistics |

In InvenioRDM and Figshare a paper can cite the DOI of a specific version, while the concept DOI remains for those who always need the latest. In Dataverse a paper cites the DOI and the version number together. Since version 13 InvenioRDM can make a DOI optional, but by default it will not publish a version without a DOI if the previous one had one: otherwise the concept DOI could lead to a version without an identifier.

**One link, different contents.** On an open data portal a link to a file usually leads to the current file. In CKAN the address of an uploaded file is built from the resource identifier, and the file name in it has no effect: replace the file and the old link downloads the new one. For a portal this is convenient; for a scientific citation it is not: a year later the link will give different data. Two things help. A checksum shows that the file has not changed: DCAT 3 has a distribution property for it, and Dataverse additionally calculates a UNF for tables, a checksum of the contents independent of the file format. And dated snapshots: if the file may already have been cited, the previous variant stays in an archive.

**How metadata describes a version.** DCAT 3 (2024) introduced version properties: the number (`dcat:version`), what changed (`adms:versionNotes`), previous and current versions (`dcat:previousVersion`, `dcat:hasCurrentVersion`). In DataCite, versions are linked with the relations `IsNewVersionOf`, `IsVersionOf`, `HasVersion`. CKAN has a "version" field, and ckanext-dcat exports it to DCAT, but it is just a label: CKAN does not store past states of a dataset as separate objects with their own addresses.

On an open data portal there is usually one dataset, and files are replaced. Then you need:

- the update date and frequency in the description;
- an unchanged dataset address when the file is replaced;
- an archive of previous files with dates, if they may already have been cited.

### Registers and reference lists

A register of licences, a list of organisations, a classification of economic activities: datasets that other data and programs refer to. For them, not only the dataset but every record needs a permanent address. They are maintained in one of two ways.

- **A versioned reference list.** Published in full; each version is a separate dated file. Classifications and address databases are maintained this way: the user takes the version for the date needed and can compare two versions.
- **A record-keeping system with record history.** Records change one at a time, and each keeps its edit history. This suits registers with daily changes better: licences, permits, statuses.

In both cases, a register that is convenient to use has the same things:

- a unique identifier for each record, assigned under the register's rules, not a row number in a file or a technical database number;
- a permanent link to the whole register and to each record, built from that identifier;
- records are not deleted but get the status "removed" with a date;
- past versions of a record or of the whole register are visible;
- the basis for the record is given (a decision, an order, a document) with a link;
- the register is downloadable in full, as regular dated snapshots, and is available through an API.

A published register without identifiers and history is a snapshot that cannot be reliably matched with other data: a record may have been renamed, removed or entered with an error, and the file does not show it. Regular snapshots are also cheaper for the system itself: exporting a whole register on demand from a large database easily brings the server down, while a ready file once a day does not.

### Identifiers of objects within data

The same approach works for data that is not called a register. In Overture Maps, every building, road, place and administrative unit in the monthly release has a persistent GERS identifier. Alongside are kept an identifier registry with dates of first and last appearance, a per-object changelog and crosswalk tables to source identifiers. Another provider can publish only its own indicators (traffic, population) without geometry, and they are joined by identifier.

The lesson is there too. In release 2025-06-25.0 Overture replaced the previous identifiers, which encoded an H3 grid cell and a theme, with random UUIDs, and the old numbers can no longer be found. An identifier with meaning built in breaks when the meaning changes. In OpenSanctions, after deduplication an entity has one canonical identifier, and if it matched a Wikidata record, the Wikidata number. More in the chapter [on leading catalogs](../11-trends/02-innovative-catalogs.md#identifiers-for-objects-inside-the-data).

## Implementation options

### A permanent address provided by the platform

The main question is what key sits in the dataset address. A short name derived from the title is easy to read, but there is a temptation to change it together with the title. A number or code assigned once is harder to read, but it does not change.

| Platform | What is in the address | What happens on renaming |
|-----------|--------------|------------------------------|
| CKAN | the dataset's short name (`/dataset/budget-2024`); the dataset also has an unchanging UUID | the address with the old name returns "not found". The UUID address always redirects to the current name, so use it for citations |
| Socrata | a code of two groups of four characters such as `erm2-nwe9`, plus the title | the title in the address is decorative: any path with the code redirects to the current address |
| Huwise (OpenDataSoft) | a readable dataset identifier; there is also an internal one that never changes | the readable identifier can be changed only before publication |
| Dataverse | a persistent identifier (DOI, Handle or installation permalink) | independent of the title |
| DSpace | Handle | independent of the title |
| GeoNetwork | record UUID | independent of the title |
| InvenioRDM | record identifier | independent of the title; each version has its own |

Checked on 12 October 2026: on data.gov.gr the UUID address of a dataset redirects to the name address, and on New York's Socrata portal a path with an arbitrary title and the dataset code leads to the current page.

### Your own permanent address without a DOI

If a DOI is not needed but the address must survive a change of platform, there are inexpensive routes.

- **Redirects on your own domain.** Dataset addresses are built from a domain the organisation does not intend to change, and at each move a table of "old address → new" redirects is set up on the web server. The cheapest method and the only one everyone needs.
- **Handle.** A prefix is obtained from Handle.Net Registry for an annual fee, and you run your own Handle server. DSpace ships with one, but with the placeholder prefix `123456789`, which the global system does not know. Until the prefix is registered and the server is running, a Handle on the pages is only for show.
- **ARK.** An organisation number is issued free of charge; ARKs can be resolved on your own server or through the shared resolver n2t.net. Suitable for libraries, archives, museums.
- **w3id.org and PURL.** Free redirect services. On w3id.org, a rule for your namespace is added through a pull request to the GitHub repository. Suitable for small projects and static sites that need an address not tied to hosting.

### DOI

**In the platform core.** Dataverse, InvenioRDM, DSpace, Figshare and GeoNetwork register DOIs themselves. You need an agreement with an agency, a prefix and a test account. InvenioRDM and DSpace are connected to the DataCite test system by default so as not to mint real DOIs by mistake. A mistake made in the production system is hard to fix: DOIs are not deleted.

**Through an extension.** CKAN has no DOIs in its core. The [ckanext-doi](https://github.com/NaturalHistoryMuseum/ckanext-doi) extension from the Natural History Museum in London maps dataset fields to the DataCite schema and registers DOIs. For the risks see the section [on extensions](#extensions-and-their-risks).

**Manually or through a consortium.** An organisation with a prefix can register DOIs in the DataCite Fabrica web interface or through its API, giving the page addresses of any platform, including a cloud one. This is done when a DOI is needed for a dozen datasets, not for every one. Consortia offer this as a service: for example, Australia's ARDC issues DOIs for data of public research organisations, but warns plainly that maintaining the addresses is up to them.

**In someone else's repository.** A copy or release of the data goes to Zenodo or Figshare and gets a DOI there. This is done with GitHub repositories: a release is archived in Zenodo automatically. More in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md#release-and-doi). The one drawback: the DOI leads to the copy in Zenodo, not to your portal, and the copy has to be updated separately.

## When it is needed and when not

| Situation | What is needed | What usually covers it |
|----------|-----------|----------------------|
| A research repository; a funder or journal requires a data citation | a DOI for each published version, authors' ORCIDs, a tombstone page on withdrawal | Dataverse, InvenioRDM, DSpace with DataCite, Figshare, Zenodo |
| An open data portal of a ministry or city | a permanent address with an unchanging key, redirects on moves, an update date; no DOI needed | any platform, if you choose the key in the address |
| A transport timetable, operational data that changes daily | a permanent dataset and feed address; a DOI is superfluous | any platform |
| A register or reference list | an identifier for each record, dated snapshots, history | your own record-keeping system and dumps; a portal for snapshots |
| A geoportal with ISO records | the record UUID in the address; a DOI if layers are cited in research | GeoNetwork with DOI enabled |
| Individual datasets cited in the organisation's reports | DOIs for those datasets only | Fabrica under a consortium agreement, or a copy in Zenodo |
| Publishing without a portal | an address not tied to hosting, a DOI per release | a Git repository and Zenodo, w3id.org |

Issue a DOI when the dataset will be cited as a source and the organisation is ready to maintain landing pages for years. Do not issue a DOI "for respectability": a dataset that changes daily with a DOI misleads, as the link promises a fixed state and opens today's.

In brief, this is what a justification looks like using the [decision record](../06-choice/04-justifying-decisions.md) template:

- **Context.** A university runs a portal on CKAN 2.12 for departmental data. The foundation that funds most projects has started requiring DOIs for data behind reports.
- **Options.** Install ckanext-doi; set up Dataverse or InvenioRDM alongside for cited data; send such datasets to Zenodo; register DOIs manually through a consortium.
- **Criteria.** Immutability of the published version, support for the extension on the current CKAN version, maintenance cost, where the link will point: to your own portal or to someone else's repository.
- **Decision.** Set up Dataverse alongside CKAN for data behind publications; keep CKAN for operational and teaching datasets; get DOIs through the library consortium.
- **Why.** CKAN does not store versions: a DOI on a replaceable file does not give the immutability the foundation requires it for. ckanext-doi has not been tested on CKAN 2.11 and 2.12. Zenodo is simpler, but links lead away from the university portal, and copies have to be updated manually.
- **When to revisit.** If ckanext-doi starts being tested on the current CKAN version and DOIs are needed only for a small number of unversioned datasets, or if there is so little data behind publications that Zenodo is enough.

## How it is done in platforms

The marks are core, extension, no, not checked, as in the [summary table](../12-appendices/03-platform-tables.md). Checked against platform documentation on 12 October 2026.

| Platform | DOI | Versions | What is important to know |
|-----------|-----|--------|-----------------|
| Dataverse 6.12.1 | core: DataCite, Crossref (since 6.12.1), EZID, Handle and installation permalinks; several providers on one installation | core: major and minor versions (1.0, 1.1, 2.0), one DOI per dataset | files can be given their own identifiers, either dependent on the dataset DOI or independent |
| InvenioRDM v14, Zenodo | core: DataCite, Crossref since v14; a DOI issued elsewhere can be accepted | core: each version has its own DOI plus a parent DOI (since v12) | since v12 it does not register DOIs for restricted records; since v13 a DOI can be made optional |
| Figshare | service core: DataCite | core: a concept DOI leads to the latest version, versions have the suffix `.v1`, `.v2` | a cloud service; self-hosting is not possible |
| DSpace 10 | core, enabled in configuration: DataCite or EZID, in addition to Handle | core: item versions; a version DOI is the original with a number after a dot | the item address is still built from the Handle; DOIs are sent to DataCite by a separate scheduled task; a filter decides which items get a DOI |
| GeoNetwork 4.4 | core, enabled in settings: DataCite or the EU Publications Office API; only for a public record | no: with approval workflow enabled there is a working copy of a record and a status history, but not versions with their own identifiers | the DOI is assigned to the layer description, not to the data: a layer on a map server may change |
| CKAN 2.12 | extension ckanext-doi: CKAN 2.9 and 2.10 declared | no: the activity stream and the "version" field are not versions with their own addresses | use the dataset's UUID address for citations |
| NADA | no: only a field for a DOI issued separately | not checked | citation via DataCite works if there is a DOI |
| Huwise, Socrata, ArcGIS Hub | no | no | a permanent address uses the dataset's or item's unchanging code; a DOI can be minted manually and entered in a custom field |
| Hugging Face, Kaggle | platform core: DOI through DataCite at the press of a button | Hugging Face: Git repository revisions; a DOI is issued for the current revision, a new one is minted for a new revision and the old one is marked outdated | after a DOI is issued, a dataset on Hugging Face cannot be deleted or renamed without support; more in the chapter [on ML catalogs](../03-types/07-ml-catalogs.md) |
| A static site, a Git repository | through Zenodo: a DOI per release | release tags in the repository | a link to a file on a branch shows the current state; a link to a release tag shows a fixed one |

### Extensions and their risks

**ckanext-doi** is the only route to DOIs inside CKAN, and as of October 2026 a risky one. The latest release, 4.0.4, came out on 22 September 2025, with no changes since. The description declares CKAN 2.9 and 2.10. Automated tests run in the museum's own prebuilt images, and those images were last updated on 20 September 2023, before CKAN 2.11 came out. So the extension has not been tested on 2.11 and 2.12 at all. A portal that needs DOIs on current CKAN either takes testing upon itself or issues DOIs outside CKAN. The state of other CKAN extensions is in the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md).

**DOI modules in the core** also need attention during upgrades. In DSpace, registration is split into two steps: an item is flagged in the database, and sending to DataCite is done by a separate scheduled command. If the scheduled task was not moved to the new server during an upgrade, DSpace considers the DOIs issued, but they are not in DataCite, and the links do not resolve. In GeoNetwork the landing page address template is set manually, and the `localhost` error described above is linked to it.

## What the registry shows

According to the dataportals-registry export (release 1.27.0 of 15 October 2026), the "DOI" mark is set for 2,008 of 43,614 catalogs. Of these, 1,404 are research repositories and 584 are geoportals; the rest are isolated cases: 7 indicator catalogs, 3 open data portals and 3 microdata catalogs.

The number must be read with care. The mark in the registry is mostly set by platform: if the software can issue DOIs, all its installations without a manual "no" get the mark. That is why 555 of the geoportals with DOI are GeoNetwork installations. In DataCite itself on 12 October 2026, 7,209 DOIs led to addresses with the word `geonetwork` in the path, and they belong to about 45 installations; more than three thousand belong to the French hydrographic service SHOM and the Austrian surveying agency BEV. Even allowing for installations with a different address, this is an order of magnitude less than 555. The registry shows who can issue DOIs, not who does. The queries are in the appendix ["Using the Registry"](../12-appendices/02-using-the-registry.md#identifiers-and-dois).

## Publishing without a portal

Without a portal, address persistence is entirely up to the author, but the methods are simpler.

- **A release and a DOI.** A GitHub repository is connected to Zenodo, and every release gets its own DOI, while the whole series of releases gets a concept DOI. A `CITATION.cff` file at the root tells people how to cite. How to set this up is covered in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md#release-and-doi).
- **A link to a version, not a branch.** A link to a file on the `main` branch always shows the current state. For a citation in a paper, use the address of a release tag or the release DOI.
- **An address not tied to hosting.** If a dataset lives on a static site, an address like `https://w3id.org/your-project/` will survive a move from GitHub Pages to other hosting: only the redirect rule changes.

## How to check a live portal

- Change a dataset's description on a test instance, including the title. The page address must not change, and if it does, the old one must redirect.
- Find a permanent link on the page. If there is none, see whether the address contains an unchanging key: a UUID, a code, a number.
- If a DOI is promised, it is visible on the page, and `https://doi.org/…` opens this same page, not the home page and not `localhost`.
- If the page shows a Handle, check it through `hdl.handle.net`. The prefix `123456789` is the placeholder shipped with DSpace.
- Open a previous version of the dataset and check that its number appears in the suggested citation.
- After a migration, the old address has a redirect, not a "not found" page.

### Commands

Where a DOI leads and what DataCite knows about it:

```bash
curl -sI https://doi.org/10.5281/zenodo.16546069 | grep -i '^location'
curl -s https://api.datacite.org/dois/10.5281/zenodo.16546069 \
  | jq '.data.attributes | {url, state, publisher, version, related: [.relatedIdentifiers[]? | select(.relationType | test("Version"))]}'
```

The first response should be a redirect to the dataset page. The second shows the address the owner recorded, the state and the links to other versions.

How many DOIs a repository has, and whether any of them have addresses that will open nowhere but the owner's computer. The repository identifier in DataCite (`client-id`) is visible in the response to the previous command, in the `relationships` section:

```bash
CLIENT=cern.zenodo
curl -s "https://api.datacite.org/dois?client-id=$CLIENT&page%5Bsize%5D=0" | jq '.meta.total'
curl -s -G https://api.datacite.org/dois --data-urlencode "client-id=$CLIENT" \
  --data-urlencode 'query=url:*localhost*' --data-urlencode 'page[size]=0' | jq '.meta.total'
```

Whether a Handle printed on a DSpace record page resolves:

```bash
curl -s https://hdl.handle.net/api/handles/1234/5678 | jq '.responseCode'
```

Code `1` means the Handle exists, `100` not found, `2` an error on the Handle server side; an empty response means the server did not answer.

Whether an address on CKAN is stable: the UUID address should redirect to the name address.

```bash
PORTAL=https://data.gov.gr
ID=$(curl -s "$PORTAL/api/3/action/package_search?rows=1" | jq -r '.result.results[0].id')
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "$PORTAL/dataset/$ID"
```

### Three checks on a sample

The DataCite checks were done on 12 October 2026; for the registry, release 1.27.0 of 15 October was used.

**Do dataset DOIs lead to live pages?** A random sample of DOIs says nothing about practice: half of it comes from one Japanese institute that registers every experiment. So 700 random DataCite repositories were taken; 314 of them had datasets, and one random dataset DOI was checked from each.

| Result | Repositories |
|-----------|-------------:|
| the page opened | 233 |
| bot protection (403, browser check), cannot be checked by a program | 55 |
| dead link: "not found", a non-existent domain, a private address | 16 |
| server error or no response twice in a row | 10 |

Among the dead links are DOIs that led nowhere from the start: to the private address `10.4.0.146`, to an IP address with port 8080, to the `nhsdigital-dev.collibra.com` test instance of an enterprise catalog. The rest are traces of moves: "not found" for old B2SHARE records and for 2018 NOAA geoportal pages, non-existent domains for four university repositories. One in twenty repositories with datasets serves at least some DOIs that do not resolve, and for another one in six a program cannot check.

**Do Handles in DSpace resolve?** 120 random active DSpace installations with OAI-PMH were taken from the registry, and 86 responded. Using the identifier of the first record, it was checked whether its Handle resolves through hdl.handle.net. For 51 installations, yes. 12 have the shipped placeholder `123456789`, and 7 have an alphabetic local prefix such as `item` or `edata` that means nothing outside the site. Another 16 have a numeric prefix, but the Handle is not found or the Handle server does not respond. In total, for 35 installations out of 86 the persistent identifier on the record page is only for show.

**How many geocatalogs actually issue DOIs?** The comparison of the registry and DataCite is described above: 555 GeoNetwork installations marked "DOI" versus about 45 installations to which DOIs actually lead.

## What follows from this

- Plan a permanent address before launch: an unchanging key in the dataset address, and for citations an address that does not depend on the title.
- Prepare the "old address → new" table and redirects before a move, not after. A DOI saves only the datasets that were given one in advance.
- Issue DOIs when data is cited as a source and you are ready to maintain landing pages for years. A dataset that changes daily does not need a DOI.
- If you issue DOIs, issue them for immutable versions, and when withdrawing data leave a tombstone page: a DOI is not deleted.
- Check the addresses in your DOIs and Handles with a program: not a test instance, not `localhost`, not a shipped placeholder.
- Check a DOI extension by its tests for your core version. ckanext-doi has not been tested on CKAN 2.11 and 2.12.
- Remember that a DOI is an agreement with an agency in another jurisdiction. Keep your own permanent address as well: it will remain even if you cannot get new DOIs.

## Sources

- DataCite: [DOI states](https://support.datacite.org/docs/doi-states), [tombstone pages](https://support.datacite.org/docs/tombstone-pages), [landing pages](https://support.datacite.org/docs/landing-pages), [versioning](https://support.datacite.org/docs/versioning), [fee model](https://datacite.org/fee-model/), [REST API](https://api.datacite.org/dois); queries on 12 October 2026: 138.3 million DOIs, 76.4 million datasets, 765 DOIs pointing to `localhost`, 5,145 to the shared placeholder page, 7,209 to GeoNetwork addresses, a sample of 314 repositories
- Crossref: [sanctions compliance](https://www.crossref.org/operations-and-sustainability/membership-operations/sanctions/), [removal of members](https://www.crossref.org/blog/isr-part-two-how-our-membership-approach-helps-to-preserve-the-integrity-of-the-scholarly-record/)
- [Handle.Net Registry: prefix registration](https://www.handle.net/prefix.html), [ARK Alliance](https://arks.org/about/ark-overview/), [w3id.org](https://github.com/perma-id/w3id.org), [PURL at the Internet Archive](https://purl.archive.org/), [CSTR](https://www.cstr.cn/)
- Dataverse 6.12: [persistent identifier providers](https://guides.dataverse.org/en/latest/installation/config.html#persistent-identifiers-and-publishing-datasets), [dataset versions](https://guides.dataverse.org/en/latest/user/dataset-management.html), [data citation](https://dataverse.org/best-practices/data-citation)
- [DOIs in InvenioRDM](https://inveniordm.docs.cern.ch/operate/customize/dois/): Crossref since v14, parent DOI since v12, optional DOI since v13, restricted records
- [Versioning and DOIs in Figshare](https://info.figshare.com/user-guide/how-versioning-works/)
- DSpace 10: [DOI](https://wiki.lyrasis.org/spaces/DSDOC10x/pages/408944862/DOI+Digital+Object+Identifier), [the default Handle prefix in dspace.cfg](https://github.com/DSpace/DSpace/blob/dspace-10.1/dspace/config/dspace.cfg), [Handle.Net Registry support](https://wiki.lyrasis.org/spaces/DSDOC9x/pages/379126830/Handle.Net+Registry+Support)
- GeoNetwork 4.4: [DOI configuration](https://docs.geonetwork-opensource.org/4.4/administrator-guide/configuring-the-catalog/doi-configuration/), [record life cycle and working copy](https://docs.geonetwork-opensource.org/4.4/user-guide/workflow/life-cycle/)
- CKAN 2.12: dataset view and resource download in [dataset.py](https://github.com/ckan/ckan/blob/2.12/ckan/views/dataset.py), [resource.py](https://github.com/ckan/ckan/blob/2.12/ckan/views/resource.py); [ckanext-doi](https://github.com/NaturalHistoryMuseum/ckanext-doi) and [its test images](https://hub.docker.com/r/naturalhistorymuseum/ckantest); checked 12 October 2026
- Huwise: [dataset identifiers in the Automation API](https://developer.huwise.com/apis/automation/v1.0/index.html)
- [DCAT 3](https://www.w3.org/TR/vocab-dcat-3/): version properties, dataset series, distribution checksum
- Pew Research Center, [When Online Content Disappears](https://www.pewresearch.org/data-labs/2024/05/17/when-online-content-disappears/), May 2024
- T. Berners-Lee, [Cool URIs don't change](https://www.w3.org/Provider/Style/URI), 1998; [W3C URI persistence policy](https://www.w3.org/policies/uri-persistence/)
- M. Laakso, L. Matthias, N. Jahn, [Open is not forever: a study of vanished open access journals](https://arxiv.org/abs/2008.11933), 2020
- ARDC: [Australia's national persistent identifier strategy](https://ardc.edu.au/project/australian-national-persistent-identifier-pid-strategy-and-roadmap/), [DataCite DOI service](https://ardc.edu.au/services/ardc-identifier-services/ardc-datacite-doi-service/)
- The dataportals-registry export, release 1.27.0 of 15 October 2026: the DOI mark on 2,008 catalogs, a sample of 120 DSpace installations with OAI-PMH
- I. Begtin, Telegram (in Russian): [the domestic software register and link rot](https://t.me/begtin/2766), 15 April 2021; [Crossref, sanctions and CSTR](https://t.me/begtin/4637), 23 February 2023; [Australia's identifier strategy](https://t.me/begtin/4713), 24 March 2023; [vanished open access journals](https://t.me/begtin/2130), 19 September 2020
- I. Begtin, [State registers](https://begtin.substack.com/p/16) (in Russian), April 2021: two models of maintaining registers and requirements for them
- [Citation Export](./07-citation.md), [Metadata Completeness](./03-metadata-depth.md), [Catalog Lifecycle](../09-practices/03-lifecycle.md), [Archiving](../09-practices/04-archiving.md)
- Overture Maps, [GERS](https://docs.overturemaps.org/gers/): identifier registry, changelog, crosswalk tables, replacement of identifiers with UUIDs in release 2025-06-25.0; OpenSanctions, [the statement model](https://www.opensanctions.org/docs/statements/): a canonical identifier after deduplication
