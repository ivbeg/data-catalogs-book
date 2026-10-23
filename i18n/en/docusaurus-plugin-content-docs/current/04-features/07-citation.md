---
title: Citation Export
description: "How a catalog helps people cite a dataset: what a citation consists of, how to show it to a person and serve it to a program, how to cite changing data, and how platforms do it."
---

# Citation Export

People cite data when it takes a second. If a citation has to be assembled by hand from the title, year and address, most will cite the paper or nothing at all.

The main conclusion of the chapter: a "Cite" button is cheap; what it builds the citation from is expensive. A generator will instantly assemble a string from description fields, but if they lack an author, a year and a version, the result is a neatly formatted dud. So first check the fields, and check that a cited dataset will be the same a year later. The button comes afterwards. If a dataset has a DOI, DataCite already serves its citation in a dozen formats, and the catalog's job is not to spoil it with its own version. The check in this chapter shows that this does happen: for the same dataset, the catalog and DataCite produce different citations.

## What it is

Citation export is everything that helps cite a dataset without manual work. It has four layers, and platforms cover them differently.

**A string on the page.** A "How to cite" block with a ready citation that is copied into the text of a paper or report.

**A file for a reference manager.** A reference manager is a program in which a researcher keeps their sources and from which they insert citations into a text: Zotero, EndNote, Mendeley, JabRef. It is given the citation as a file in one of several formats: BibTeX (for LaTeX), RIS and EndNote XML (for most managers), CSL-JSON (for programs that format a citation according to a CSL style). A CSL style is a description of formatting rules: APA, Chicago, GOST, the requirements of a particular journal.

**Hints for programs on the page itself.** Meta tags in the HTML head (`citation_title`, `citation_author` and others, invented by Google Scholar, or Dublin Core fields). With them Zotero saves a dataset with one button in the browser, and Google Scholar understands what it is looking at. This also includes the `Link` response header with a `rel="cite-as"` link: it tells a program which address to treat as the address for citation. This is part of FAIR Signposting, briefly described in the [glossary](../12-appendices/01-glossary.md).

**A citation by identifier, without the catalog.** If a dataset has a DOI registered with DataCite, its citation can be obtained from DataCite itself, without visiting the catalog's site. This technique is called content negotiation: a program requests the `https://doi.org/…` address and asks in the `Accept` header not for a page but, for example, for BibTeX. The commands are in the section [on checking](#how-to-check-a-live-portal).

Two things are often confused with citation export.

- The `citation` property in schema.org markup is not a citation of the dataset itself but the papers the author asks to be cited along with it. Google says plainly: to cite the dataset, use the name, identifier, creator and publisher, and `citation` is for related papers.
- The CC BY licence requirement to credit the author is a legal condition of use, not a scholarly citation. The FORCE11 data citation principles distinguish the two. But a ready string helps fulfil both: GBIF, for example, under its user agreement obliges users to cite a download by its DOI, and the Ifremer catalog states in a dataset's terms that citation is mandatory.

## Why it is needed

**So that the data author gets credit.** The FORCE11 Joint Declaration (2014) set out eight principles of data citation. The first: data is a legitimate research output, and citing it carries as much weight as citing a paper. For a catalog, three others matter most: a unique identifier, persistence of the citation, and specificity, meaning the citation must point to the version or subset of data on which the conclusion was based.

**So that the citation can be counted.** The Make Data Count project together with DataCite collects the Data Citation Corpus. Its fourth release of 27 July 2025 has 10.7 million records, 9.7 million of them unique dataset–publication pairs. Almost half the records, 5.2 million, were added by Europe PMC, a collection of life sciences papers. Its software finds datasets not in reference lists but in the text of papers, where a dataset is mentioned by an accession number in a database, for example a genetic bank. Another part of the corpus came from similar software annotation of papers by the Chan Zuckerberg Initiative. So data is cited more often than reference lists show, but counting such citations is hard and imprecise. A tidy citation with a DOI in a reference list is what gets counted without guesswork.

How few counted citations there are can be seen in DataCite itself. On 12 October 2026, three thousand random DOIs with the type "dataset" were taken from its API. More than half of them (1,667) were minted by Japan's National Institute for Fusion Science (NIFS), so it is better to count without it. Of the remaining 1,333 DOIs, 78, about 6%, have at least one citation known to DataCite.

**So that the catalog owner sees the benefit.** Citations in papers and reports are the most convincing argument for management and funders that the catalog is needed. A download counter says a file was taken; a citation says something was made from it.

**So that the user does not get it wrong.** Without a ready string everyone assembles a citation themselves: some write the portal name instead of the publisher, some the download date instead of the publication year, almost nobody writes the version. With such a citation the dataset cannot be found, or if it is found, it is the wrong one.

## What a citation consists of

DataCite recommends this order of elements:

```text
Creator (Year). Title. Version. Publisher. Resource type. Identifier
```

A minimal citation omits version and type: creator, year, title, publisher, identifier. This is what a citation of a real Harvard Dataverse dataset looks like in APA style:

```text
Durbin, P. (2017). Open Source at Harvard (Version 5.0) [Dataset]. Harvard Dataverse. https://doi.org/10.7910/DVN/TJCLKP
```

Each element breaks in its own way.

**Creator.** People or an organisation. For government data, an organisation as creator is normal: "Rosstat (2026)" is better than the surname of the employee who exported the file. The mistake is mixing roles: putting the department that runs the catalog among the creators, or the publisher alongside people.

**Year.** The year the dataset or its version was published, not the year the user downloaded it, and not the year the record was created. If the software takes the year from the record creation date, after datasets are moved to a new portal all of them will get the year of the move.

**Title.** The dataset title, not the file name and not the portal name.

**Version.** Without it the citation points to the dataset in general, not to what was used. In the same DataCite sample, the version is filled in for only 191 of 1,333 DOIs, or 14%. But even a filled-in version does not always reach the citation: the BibTeX that DataCite serves for the Harvard Dataverse dataset contains no version, although the dataset has five versions, while the APA citation from the same DataCite does contain it.

**Publisher.** The organisation that published the dataset: a repository, an agency, an institute.

**Resource type.** The "[Dataset]" label distinguishes a data citation from a paper citation. Classic BibTeX has no type for data, and everyone improvises: DataCite serves `@misc`, Dataverse the non-standard `@data`, InvenioRDM `@dataset`, which biblatex, the modern replacement for BibTeX, understands.

**Identifier.** A DOI in the form of an address `https://doi.org/…`. If there is no DOI, use the permanent address of the dataset page and the access date. The Russian standard GOST R 7.0.108-2022 on citing online documents requires exactly that: the address and the access date are mandatory, and DOIs are not mentioned in the standard at all. Databases are named in it as one kind of electronic document.

If the description fields are empty, a citation generator will not help. Which fields are needed and how to check that they are filled in for real is covered in the chapter [on metadata completeness](./03-metadata-depth.md); how DOIs and versions work is in the chapter [on identifiers](./06-identifiers-and-doi.md).

### Citing changing data

A research repository fixes a version, and a citation of it stays precise. An open data portal and an indicator catalog more often maintain one dataset whose files are replaced every week. The citation "Ministry of Transport (2026). Suburban train timetable" points to different data a month later. There are five ways to deal with this, from simple to complex.

1. **An access date and an archive of dumps.** The citation contains a date, and the portal keeps past files, so the state on that date can be restored. Without an archive, the access date only honestly admits that the citation cannot be checked.
2. **A snapshot of the page.** Our World in Data suggests citing not the live chart page but its archived snapshot with a date in the address (`archive.ourworldindata.org/20260910-…`). It also asks you to cite both the original source and itself as the processor: "Gapminder (2015); UN IGME (2025) – processed by Our World in Data". A two-level citation is needed by any aggregator and any portal that republishes other people's data. A program gets the source string by an address convention: append `.metadata.json` to the chart address, and the response has a ready field for the citation, while `.csv` serves the data itself.
3. **Versions with their own identifier.** Each dump of a dataset becomes a version. Zenodo and Figshare do this, and a portal can too if there are not many releases. CELLxGENE Census adds a time commitment. Long-term support releases are promised every six months, each is kept for at least five years, and there is a citation generator for any slice. A retention period named in advance is what the promise "versions are kept" usually lacks.
4. **Citing a query.** GBIF gives its own DOI to every occurrence download: it records the selection criteria, the list of source datasets and the date. On 15 October 2026 the iNaturalist observation dataset alone was part of 2,623,241 such downloads. If the user later heavily filtered a download or collected data through the API, they register a "derived dataset" and also get a DOI. The general scheme is described in the Research Data Alliance recommendations on citing dynamic data: data is stored with versions and timestamps, the query itself is saved with a timestamp and given an identifier, through which the query can be re-run on the same state of the data. A new edition of the recommendations was endorsed in July 2025: it has 12 items instead of the 14 in the 2015 edition, and the substance has not changed.
5. **Citing part of a dataset.** Dataverse shows a separate citation for each file of a dataset, GBIF for an individual occurrence. This is needed when a conclusion rests on one file out of a hundred.

For an open data portal, a reasonable minimum is the first method: an access date in the suggested string and an archive of past dumps. How to keep past files is covered in the chapter [on data storage](./05-data-storage.md).

## Implementation options

**A string template on the page.** The cheapest method: a string assembled from fields is inserted into the dataset page template. The ckanext-doi extension for CKAN works this way: the "Cite this as" block is assembled from creator, year, title and publisher, and a DOI link is added. The cost is one theme edit. The risk is one style for everyone and mistakes in field choice: ckanext-doi itself takes the year from the CKAN record creation date.

**A generator with CSL styles.** The platform stores CSL styles and on request formats a citation in the required style and format. There are many styles: in October 2026 the CSL repository had 2,863 independent styles and another 8,002 "dependent" ones, for journals that use someone else's style under their own name. Dataverse, InvenioRDM and Zenodo, GeoNetwork, and the ckanext-citeproc extension for CKAN work this way. The cost is maintaining the set of styles and the mapping of fields to CSL variables.

**A citation from DataCite.** The catalog generates nothing itself but takes the citation from DataCite by DOI. NADA does this, and the BibTeX button in ckanext-doi leads straight to the DataCite API. The advantage is that the citation matches the one any other service will get. The drawbacks: it works only for datasets with a DOI, DataCite knows nothing about versions not recorded in its metadata, and its generator has traps:

- DataCite silently replaces an unknown style name with APA. A request for the style `gost-r-7-0-100-2018` returns an ordinary APA citation without any warning. InvenioRDM honestly responds to the same request with an error;
- the CSL repository has three GOST styles, all following the old GOST R 7.0.5-2008, and none outputs a DOI for a dataset. For the Harvard Dataverse dataset they give "Durbin P. Open Source at Harvard // 2017." and "Durbin P. Open Source at Harvard. Harvard Dataverse, 2017." If a catalog needs a GOST citation, it is better to write the data template yourself.

**Meta tags for reference managers.** `citation_*` and Dublin Core meta tags in the page head cost almost nothing and give one-click saving to Zotero and a correct record in Google Scholar. The DSpace core has them even where there is no citation block at all. Zotero also has separate translator programs for large platforms: Dataverse, InvenioRDM, Figshare, Dryad, DSpace. But a translator is tied to a list of addresses: the InvenioRDM translator knows 14 sites, from zenodo.org to the University of Tübingen repository. It will not recognise a new installation, and Zotero will be left reading the meta tags. Meta tags have a limit: the Google Scholar vocabulary has neither a version nor a "dataset" type, so Zotero often saves a dataset from them as a web page or an article. The old COinS format can convey the type, but almost nobody uses it. Zotero itself has had a "Dataset" type since version 6.0.24.

**A file in the repository.** For data on GitHub, the role of the button is played by a `CITATION.cff` file at the root of the repository. From it GitHub shows a "Cite this repository" link in two formats, APA and BibTeX. For the citation to be of data and not software, the file needs the line `type: dataset`. Without it GitHub will format the dataset as software: "[Computer software]" in APA and `@software` in BibTeX.

| Option | What the user gets | Cost | Main risk |
|---------|---------------------------|------|--------------|
| String template | one string in one style | a theme edit | wrongly chosen fields, especially the year |
| CSL generator | a string in any style and files for managers | a platform or extension, a set of styles | poor mapping of fields to CSL variables |
| Citation from DataCite | a string and files matching other services | nothing, if there is already a DOI | no DOI, no citation; silent style substitution |
| Meta tags | one-click saving to Zotero | a few lines in the template | no version and no "dataset" type |
| `CITATION.cff` | a button on GitHub, metadata for Zenodo | one file | without `type: dataset` you get a software citation |

The options are not mutually exclusive. A good research repository does all of them at once: a string, files, meta tags and a DOI through which DataCite serves the same citation.

## When it is needed and when not

| Situation | What is needed | What usually covers it |
|----------|-----------|----------------------|
| A research repository | a string with version and DOI, BibTeX and RIS, meta tags, a citation for a dataset's file | the core of Dataverse, InvenioRDM, Figshare |
| An open data portal at a university or ministry whose data researchers use | a string with a permanent address and access date, an archive of past dumps | a template edit; for datasets cited in papers, a copy in a research repository with a DOI |
| An indicator and statistics catalog | a citation of a series or query with a date, not of a table page | a citation of a saved query, as in GBIF; a snapshot, as in Our World in Data |
| A geoportal with datasets cited by scientists | a string from ISO 19115 fields and a DOI | the GeoNetwork 4.4 core |
| A machine learning hub | a DOI for a dataset revision and a string in the dataset card | a DOI on request on Hugging Face; a citation from DataCite |
| Publishing in a Git repository | `CITATION.cff` with `type: dataset`, a release DOI | GitHub and Zenodo |
| An internal showcase, a layer of an internal map | a permanent address | no citation generator needed |

It is mandatory for a research repository: citation is part of its job, and journals and funders require data citations. It is desirable wherever data is used in research and analysis. It is not needed if the data is not cited: an operational showcase, an internal map layer. Even there a permanent address is useful, but a BibTeX generator is not.

In brief, this is what a justification looks like using the [decision record](../06-choice/04-justifying-decisions.md) template:

- **Context.** A university open data portal on CKAN 2.11. Researchers ask for a "cite button". The portal has no DOIs and no agreement with DataCite.
- **Options.** A string in the dataset page template; the ckanext-citeproc extension with CSL styles; ckanext-doi with an agreement and a DataCite prefix; send datasets cited in papers to Dataverse or Zenodo.
- **Criteria.** Citation precision (version, permanent address), the cost of CKAN upgrades, whether a DOI is needed.
- **Decision.** A string in the template with a permanent address and access date, and an archive of past dumps. Datasets behind papers go to a research repository with a DOI.
- **Why.** Ten CSL styles do not make a citation without a version and DOI more precise. A template string does not depend on someone else's extension, while ckanext-doi requires an agreement the portal was not created for.
- **When to revisit.** If the university gets a DOI prefix through a library consortium, or if ckanext-citeproc releases a stable version tested on CKAN 2.12.

## How it is done in platforms

The marks are core, extension, no, not checked, as in the [summary table](../12-appendices/03-platform-tables.md). Checked against documentation, source code and live installations on 12 October 2026.

<div className="wide-table">

| Platform | String on the page | Files and styles | Hints for programs | What is important to know |
|-----------|--------------------|---------------|------------------------|-----------------|
| Dataverse 6.x | core: with version and a content checksum (UNF) | core: EndNote XML, RIS, BibTeX, CSL-JSON for a dataset and for an individual file; through the API, for any version | core: Dublin Core meta tags, JSON-LD, the `cite-as` header | one DOI per dataset; the version is in the citation string |
| InvenioRDM v14, Zenodo | core | core: six styles in the menu (APA, Harvard, MLA, Vancouver, Chicago, IEEE), any CSL style through the API; BibTeX, CSL-JSON | core: `citation_*` meta tags, the `cite-as` header | each version has its own DOI plus a shared parent DOI. No RIS or EndNote in the API |
| Figshare | core: a "Cite" button | core: RefWorks, BibTeX, EndNote, DataCite, NLM, Dublin Core, RIS | not checked: the page answers robots with a check | each version has a DOI with the suffix `.v1`, `.v2` |
| DSpace 10.1 | no | no | core: `citation_*` meta tags for Google Scholar | the "Cite" button is being ported from DSpace-CRIS; the porting pull requests were open in October 2026 |
| GeoNetwork 4.4 | core: a block in the record, enabled in the interface settings | core: HTML, text, RIS, BibTeX through the API | not checked | the composition of the string is set in a core XSL file; author and publisher roles are configured by parameters |
| NADA | core, through DataCite, if the study has a DOI | core, through DataCite | not checked | no DOI, no citation |
| CKAN 2.11–2.12 | extension: ckanext-doi (only with a DOI), ckanext-citeproc | extension: BibTeX through DataCite (ckanext-doi), CSL styles (ckanext-citeproc) | no: there are no meta tags in the core; schema.org markup comes from ckanext-dcat | the extensions are young or tied to DOIs; see below |
| Huwise (OpenDataSoft) | no | no | no | there are text fields for the source and a `bibliographicCitation` field in the DCAT template, filled in by hand |
| Socrata, ArcGIS Hub | no | no | no | no citation generator |
| Hugging Face | a string in the dataset card, if the author wrote one | a citation from DataCite, if a DOI was minted | not checked | DOIs are minted on request for the current revision; for a new revision a new one is minted and the old one is marked outdated |
| GitHub | a "Cite this repository" button from `CITATION.cff` | APA and BibTeX | — | not a catalog platform; needs `type: dataset` |

</div>

Dataverse explicitly lists citation formats as a standard feature, and its citation is the most precise: it has the version number and a content checksum with which you can check that the table has not changed. InvenioRDM's citation is simpler, but the DOI itself fixes the version: each version has its own.

### Extensions and their risks

CKAN has no citation in its core. There are three candidates, each with its own caveat. The method for evaluating an extension is in the chapter [on extension ecosystems](../05-platforms/02-extension-ecosystems.md).

- **ckanext-doi** from the Natural History Museum in London. It issues DOIs through DataCite and shows a "Cite this as" block with a BibTeX button served by DataCite. Without a DOI there is no citation. The documentation names CKAN 2.9 and 2.10; the extension has not been tested on 2.11 and 2.12; more in the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md).
- **ckanext-citeproc** was published by the open.canada.ca portal team in March 2025 under the MIT licence. It formats a citation for a dataset and a resource using CSL styles that the administrator places in a folder on the server: the library ships with only one style, Harvard. Compatibility is declared with CKAN 2.10 and 2.11, and automated tests run on CKAN's main branch. On open.canada.ca itself (CKAN 2.10.8) the extension was not enabled in October 2026.
- **ckanext-citation** from the TIB group in Hannover appeared in June 2026 under the AGPL-3.0 licence. It serves BibTeX, RIS, EndNote, APA, the ACM format and CSL-JSON. CKAN 2.9 and 2.10 are declared. The tests check only citation formatting; the extension is not automatically tested on a live CKAN. Under the same name there is an older extension from the Taiwanese repository depositar: it has not been updated since 2022 and knows only the title, author and address.

For DSpace 6 there were third-party add-ons: Atmire's CSL module and the University of Waikato's RIS export. They have not been ported to DSpace 7 and later. In GeoNetwork the composition of the string is edited in an XSL file inside a core schema: such an edit has to be repeated after every upgrade.

## How it breaks: one dataset, three citations

A check on 12 October 2026: for each dataset, the citation the catalog itself produces was compared with the one DataCite serves for the same DOI.

**Harvard Dataverse (Dataverse 6.10.1), the "Open Source at Harvard" dataset.** The dataset has five versions: the first from July 2017, the fifth from June 2026.

- The string on the page: `Durbin, Philip, 2017, "Open Source at Harvard", https://doi.org/10.7910/DVN/TJCLKP, Harvard Dataverse, V5, UNF:6:…`, with the version and checksum.
- BibTeX from Dataverse itself for the first version: `version = {V1}`, type `@data`.
- BibTeX from DataCite: no version, type `@misc`.
- APA from DataCite: "(Version 5.0)".

A user who takes the BibTeX from DataCite will cite the dataset without a version, that is, in effect the latest one. A year later that will be different data.

**The Ifremer Sextant catalog (GeoNetwork 4.4.13), a temperature and salinity climatology of the Mediterranean Sea.**

- The string from the catalog: `IFREMER / IDM/SISMER, Simona Simoncelli, Paolo Oliveri . SeaDataCloud Mediterranean Sea - Temperature and Salinity Climatology V1. https://doi.org/10.12770/…`: no year, and the organisation is the first author.
- BibTeX from the catalog: `author = {IFREMER / IDM/SISMER, Simona Simoncelli, Paolo Oliveri}`, `publisher = {}`. BibTeX separates authors with the word `and`, not commas, so a reference manager will read three authors as one with a long name. The publisher is empty.
- APA from DataCite: `Simoncelli, S., & Oliveri, P. (2019). … (Version 1.1) [Dataset]. IFREMER / IDM/SISMER.`, with year, version and publisher.

The fields are in the description, but the catalog's generator takes them from the wrong roles. This is a typical failure: the feature is "in the core", but the result is worse than an external service's.

**InvenioRDM (the demo instance) and the GOST style.** BibTeX and APA are assembled correctly: creator, year, version, publisher, DOI. The `gost-r-7-0-5-2008` style gives "Gallagher J. и др. Jones and Sons's gallery // 1987–2018.", without a publisher or DOI. The problem is not the platform but the CSL style: it was not written for datasets.

Four more failures are common:

- **No version.** The citation is correct in form and useless for verification. In the DataCite sample, the version is filled in for 14% of datasets.
- **The year from the record date.** The software substitutes the year the record was created, not the year the data was published. After a move to a new platform, all datasets are "published" in the year of the move.
- **Silent style substitution.** For an unknown style DataCite serves APA, and the user is sure they got what they asked for.
- **A software citation instead of data.** `CITATION.cff` without `type: dataset` on GitHub gives "[Computer software]".

## Publishing without a portal

Without a portal the author assembles the citation entirely, but then nobody but them can mix up the roles. Three things are enough.

**`CITATION.cff` at the root of the repository.** The format version is 1.2.0 and has not changed since 2021. `cff-version`, `message`, `title` and `authors` are mandatory; for data add `type: dataset`, the version, the release date and the DOI once it appears. GitHub will show a "Cite this repository" button based on the file. Zenodo, when archiving a release, will take the authors and title from it, but only if the repository has no `.zenodo.json` file: if there is one, Zenodo ignores `CITATION.cff`. The Zenodo record type (dataset, not software) is set by the `upload_type` field in `.zenodo.json`. How to combine both files is covered in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md#release-and-doi). The file can be checked with `cffconvert --validate`. A ready [CITATION.cff template](pathname:///templates/CITATION.cff) is in the book's templates.

**A "How to cite" line in the README and on the dataset page.** One line in the style accepted in your field, with the version and a permanent address, and after archiving in Zenodo, with the DOI. Zenodo offers two citations to choose from: the DOI of a specific release and the concept DOI for all versions, which always leads to the latest. A paper needs the first.

**Markup on the dataset page.** schema.org markup with creator (`creator`), publication date (`datePublished`), version (`version`) and publisher (`publisher`), which Google and aggregators read. The `identifier` field is added once the DOI has been issued: the [template](pathname:///templates/schema-dataset.jsonld) does not include it, so as not to publish an empty number. A few more meta tags are useful for Zotero:

```html
<meta name="citation_title" content="Dataset title">
<meta name="citation_author" content="Surname, Given name">
<meta name="citation_date" content="2026/01/15">
<meta name="citation_publisher" content="Publishing organisation">
```

Once a DOI is issued, `citation_doi` with the real number is added to these fields. A version cannot be passed in meta tags, so it must be in the title or in the "How to cite" line. How to set up the repository and releases is covered in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md).

## How to check a live portal

A manual check is five questions about five random datasets:

1. The dataset page has a "How to cite" block with creator, year, title, publisher and identifier.
2. The year in the citation is the year the dataset or version was published, not the year the record was created and not the current year.
3. For two versions of one dataset, the citations differ in version number or identifier. If there are no versions, the citation has an access date.
4. BibTeX or RIS can be downloaded, with the same identifier and version as on the page, and authors separated properly (in BibTeX, by the word `and`).
5. If the dataset has a DOI, the DataCite citation matches the one on the page in creator, year and version.

### Commands

A citation by DOI from DataCite, in a style, in BibTeX and in RIS. It works for any DOI minted through DataCite, even if the catalog has no button at all:

```bash
DOI=10.7910/DVN/TJCLKP
curl -sLH "Accept: text/x-bibliography; style=apa" "https://doi.org/$DOI"; echo
curl -sLH "Accept: application/x-bibtex" "https://doi.org/$DOI"; echo
curl -sLH "Accept: application/x-research-info-systems" "https://doi.org/$DOI"
```

If the style name is misspelled, a response still comes, in APA style. Check that you got what you asked for. The list of style names is in the [CSL repository](https://github.com/citation-style-language/styles).

Dataverse: a citation for a specific version in BibTeX, RIS, EndNote or CSL-JSON:

```bash
SERVER=https://dataverse.harvard.edu
PID=doi:10.7910/DVN/TJCLKP
curl -s "$SERVER/api/datasets/:persistentId/versions/1.0/citation/BibTeX?persistentId=$PID"
curl -s "$SERVER/api/datasets/:persistentId/versions/:latest-published/citation?persistentId=$PID"
```

InvenioRDM: a string in a chosen style and BibTeX. The example is CaltechDATA; Zenodo itself did not answer programs without a browser in October 2026:

```bash
SERVER=https://data.caltech.edu
ID=$(curl -s "$SERVER/api/records?size=1&q=metadata.resource_type.id:dataset" | jq -r '.hits.hits[0].id')
curl -s -H "Accept: text/x-bibliography" "$SERVER/api/records/$ID?style=apa&locale=en-US"; echo
curl -s -H "Accept: application/x-bibtex" "$SERVER/api/records/$ID"
```

GeoNetwork 4.4: the list of formats and a RIS citation for a record:

```bash
API=https://sextant.ifremer.fr/geonetwork/srv/api
UUID=ad07a55f-5de7-4abc-ba89-8899b16c4b59
curl -s "$API/records/$UUID/formatters/citation?format=?"; echo
curl -s "$API/records/$UUID/formatters/citation?format=ris"
```

Hints for programs on the page, meta tags and the `cite-as` header:

```bash
PAGE=https://dspace.mit.edu/handle/1721.1/93094
curl -sL "$PAGE" | grep -o -E '<meta name="(citation_|DC\.)[a-zA-Z_.]*"' | sort | uniq -c
curl -sI https://data.caltech.edu/records/$ID | grep -i '^link' | tr ',' '\n' | grep cite-as
```

Empty output from the first command means Zotero will save the dataset as an ordinary web page. Empty output from the second means a program will not know which address to treat as the address for citation.

## What follows from this

- Fields first, then the button: creator, publication year, title, version, publisher, identifier. Without them any generator produces a dud.
- If datasets have DOIs, compare your citation with DataCite's. A mismatch in creator, year or version is an error to fix in the description, not in the template.
- For changing data, add an access date to the citation and keep past dumps. For scholarly citations, fix versions or give a download an identifier, as GBIF does.
- `citation_*` and Dublin Core meta tags cost a few template lines and save the user manual entry.
- CSL styles will not assemble a GOST citation for a dataset correctly: write the template yourself.
- A Git repository with data needs `CITATION.cff` with the line `type: dataset`.

## Sources

- [Joint Declaration of Data Citation Principles, FORCE11, 2014](https://force11.org/info/joint-declaration-of-data-citation-principles-final/): eight principles, the distinction between legal and scholarly attribution
- DataCite: [content negotiation and formats](https://support.datacite.org/docs/datacite-content-resolver); the recommended order of citation elements per the [CESSDA guide](https://dmeg.cessda.eu/Data-Management-Expert-Guide/7.-Discover/Access-use-and-cite-data); a sample of 3,000 random DOIs with the type "dataset" through the [DataCite API](https://api.datacite.org/dois?resource-type-id=dataset&random=true), 12 October 2026
- Make Data Count: [Data Citation Corpus documentation](https://makedatacount.org/data-citation/data-citation-corpus-documentation/), [release 4.0 data](https://doi.org/10.5281/zenodo.16546069), 27 July 2025
- Research Data Alliance: [Precise, Actionable Reference to Dynamic Data](https://doi.org/10.15497/RDA00132), 2025; [the 2015 edition](https://doi.org/10.15497/RDA00016)
- [GBIF citation guidelines](https://www.gbif.org/citation-guidelines): download DOIs and derived datasets; [Our World in Data: how to cite](https://ourworldindata.org/faqs)
- [Dataset markup in Google's documentation](https://developers.google.com/search/docs/appearance/structured-data/dataset): the `citation` property is not for citing the dataset itself
- Dataverse: [features](https://guides.dataverse.org/en/latest/admin/features.html), [citation API](https://guides.dataverse.org/en/latest/api/native-api.html#get-citation), [data citation](https://dataverse.org/best-practices/data-citation)
- InvenioRDM: [record serializers](https://github.com/inveniosoftware/invenio-rdm-records/blob/master/invenio_rdm_records/resources/config.py), [default styles](https://github.com/inveniosoftware/invenio-app-rdm/blob/master/invenio_app_rdm/config.py)
- [Figshare: citing and exporting citations](https://info.figshare.com/user-guide/how-to-share-cite-or-embed-your-items/)
- DSpace: [meta tags for Google Scholar](https://github.com/DSpace/DSpace/blob/main/dspace/config/crosswalks/google-metadata.properties); porting citation export from DSpace-CRIS: [issue 11783](https://github.com/DSpace/DSpace/issues/11783), pull requests [11451](https://github.com/DSpace/DSpace/pull/11451) and [dspace-angular 4779](https://github.com/DSpace/dspace-angular/pull/4779), open as of 12 October 2026
- [GeoNetwork 4.4: citing a record](https://github.com/geonetwork/core-geonetwork/blob/4.4.12/docs/manual/docs/user-guide/associating-resources/cite.md)
- CKAN: [ckanext-doi](https://github.com/NaturalHistoryMuseum/ckanext-doi), [ckanext-citeproc](https://github.com/open-data/ckanext-citeproc), [ckanext-citation (TIB)](https://github.com/SDM-TIB/ckanext-citation), [ckanext-citation (depositar)](https://github.com/depositar/ckanext-citation)
- [Huwise: compatibility fields](https://userguide.huwise.com/en/articles/2032002), [Hugging Face: DOI](https://huggingface.co/docs/hub/doi)
- GitHub: [CITATION files](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files); [Citation File Format](https://citation-file-format.github.io/); Zenodo: [CITATION.cff and .zenodo.json](https://help.zenodo.org/docs/github/describe-software/)
- Zotero: [exposing metadata](https://www.zotero.org/support/dev/exposing_metadata), [the Dataset type](https://www.zotero.org/support/dev/translators/datasets), [translators](https://github.com/zotero/translators)
- [The CSL styles repository](https://github.com/citation-style-language/styles), count as of 12 October 2026; [biblatex: the dataset type](https://github.com/plk/biblatex)
- [GOST R 7.0.108-2022](https://protect.gost.ru/gost/details/df775619-cc9b-4cea-af6e-83e31a0aab9e) (in Russian): bibliographic references to electronic documents on networks
- Live checks on 12 October 2026: [Harvard Dataverse, the Open Source at Harvard dataset](https://doi.org/10.7910/DVN/TJCLKP), [Ifremer Sextant, the Mediterranean climatology](https://doi.org/10.12770/ad07a55f-5de7-4abc-ba89-8899b16c4b59), [the InvenioRDM demo instance](https://inveniordm.web.cern.ch), [CaltechDATA](https://data.caltech.edu), [DSpace@MIT](https://dspace.mit.edu)
- [Identifiers and DOIs](./06-identifiers-and-doi.md), [Metadata Completeness](./03-metadata-depth.md), [Git Repositories](../08-beyond-portals/03-git-repositories.md)
- Our World in Data, [Chart API](https://docs.owid.io/projects/etl/api/chart-api/): the `.csv`, `.metadata.json`, `.zip` suffixes; CZ CELLxGENE, [Census](https://chanzuckerberg.github.io/cellxgene-census/): long-term support releases every six months, kept for at least five years; GBIF, [downloads including the iNaturalist dataset](https://api.gbif.org/v1/occurrence/download/dataset/50c9509d-22c7-4a22-a47d-8c48425ef4a7?limit=1): 2,623,241 as of 15 October 2026
