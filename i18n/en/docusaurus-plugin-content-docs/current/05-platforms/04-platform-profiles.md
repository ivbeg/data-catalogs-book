---
title: Platform Profiles
description: What a platform does by itself, what an extension provides, which release to take and whom each platform suits.
---

# Platform Profiles

A profile is for crossing a platform off before procurement. A mandatory feature must live in the platform itself or in an extension tested on your core version. If the feature is missing, or the extension is not tested on that version, the platform does not go on the shortlist, even if the rest of the table matches.

Then two to four profiles of the same class are compared. Capabilities are covered in [Part IV](../04-features/01-capability-map.md), the full matrix of cells is in the [appendix](../12-appendices/03-platform-tables.md), and checking a module is covered in the chapter [on ecosystems](./02-extension-ecosystems.md). Installation counts come from the dataportals-registry export (release 1.27.0 of 15 October 2026). Software releases were checked against project sites in October 2026. Check the number again before procurement.

## How to read a profile

One platform usually has three numbers: the release on the project site, the version in the registry entry and the version on a live site. They diverge. Install the release from the project site and check extensions on exactly that one. A large installation lagging one or two versions behind is normal if an upgrade is planned. Lagging several years behind is a reason to ask who is going to close the gap.

<div className="wide-table">

| Platform | Release on the project site | Registry entry 1.27.0 | Live installation |
|-----------|-------------------------|--------------------------|-----------------|
| CKAN | 2.12, 26 August 2026 | 2.11.4 | data.gov.au 2.11.6; data.humdata.org 2.11.4; data.gov.gr 2.11.3 |
| Dataverse | 6.12.1, 8 October 2026 | 6.9 | Harvard Dataverse 6.10.1 |
| DSpace | 10.1, 14 September 2026; 9.4 and 8.5 came out the same day | 9.2 | DSpace@MIT 8.2 |
| GeoNetwork | 4.4.12, 8 July 2026 | 4.4.9 | the Ifremer Sextant catalog showed 4.4.13 on 13 October 2026 |
| NADA | 5.7.1, 4 October 2026 | 5.5 | the World Bank library's version was not recorded in this check |
| udata | 17.13.0, 13 October 2026 | not given | data.gouv.fr answered as 17.12.1 the same day |

</div>

A "not given" cell means the version from the registry's software entry was not taken into the text. Take the number for installation from the project site.

A cell in the capabilities table means one of four things.

- **Core**: the feature ships with the platform. Enabling it can still take hours: a DOI in GeoNetwork and Dataverse requires an agreement with DataCite.
- **Extension**: a separate module with its own author and its own table of core versions. Who maintains it is written in the profile.
- **No**: this feature is covered by another platform or by your own program alongside.
- **Not checked**: in October 2026 the documentation gave no answer. Check yourself before choosing.

Each profile has the same sections: class and licence, whom it suits, a capabilities table, ecosystem, launch and maintenance, limitations, examples.

## Which profile to start with

The row sets the class. A platform from another row is taken as a second catalog when an organisation has two tasks at once. How to set up such a pair is covered in the chapter [on hybrids](../03-types/11-comparison-and-hybrids.md).

| Task | Profiles |
|--------|----------|
| An open data portal, with your own team or a contractor | [CKAN](#ckan), [DKAN](#dkan), [udata](#udata), [Piveau](#piveau) |
| The same portal, with no operations of your own | [Huwise and Socrata](#huwise-opendatasoft-and-socrata), [ArcGIS Hub](#arcgis-hub) |
| Dozens of datasets, edited as files in Git | [JKAN](#jkan) |
| DOIs, versions and citation | [Dataverse](#dataverse), [InvenioRDM](#inveniordm); [DSpace](#dspace) if the library already runs it; without your own installation, [Figshare](#figshare) |
| Map layers and services | [GeoNetwork](#geonetwork), [GeoNode](#geonode), [ArcGIS Hub](#arcgis-hub) |
| Indicators with dimensions | [PxWeb](#pxweb); SDMX exchange: [.Stat Suite](#stat-suite) |
| Surveys with different access levels | [NADA](#nada); a university archive with DOIs: [Dataverse](#dataverse) |

## CKAN

An open source platform for open data portals, AGPL-3.0 licence, the CKAN Association. The current release is 2.12 of 26 August 2026, the last in the 2.x line. It is fully supported. The previous one, 2.11, gets bug and security fixes until the pair of supported versions moves on. The registry lists 1,906 open data portals on CKAN.

**Whom it suits.** A public authority or organisation with its own team or a contractor, if the catalog must serve DCAT and live for many years.

**Whom it does not suit.** A catalog that needs DOIs in a setup tested on the current core: Dataverse or InvenioRDM cover that. An organisation with nobody to install updates.

| Capability | Where |
|-------------|-----|
| Search API, files, roles, table API | in the core |
| DCAT and schema.org | the ckanext-dcat extension; support declared for 2.10 and 2.11, tests also run on 2.12 |
| Custom fields | the ckanext-scheming extension; tests on 2.10, 2.11 and 2.12 |
| Harvesting other catalogs | the ckanext-harvest extension; tests on 2.10–2.12, the latest release 1.6.2 is older than 2.12 |
| Cloud file storage | the 2.12 distribution has only disk; cloud via ckanext-file-keeper-cloud, tests on 2.12, no releases |
| DOI | the ckanext-doi extension; not tested on 2.11 and 2.12 |
| Citation | extensions: ckanext-doi shows a citation only with a DOI, ckanext-citeproc formats it with CSL styles (2.10 and 2.11 declared) |
| SAML single sign-on | the ckanext-saml2auth extension; not tested on 2.12 |
| Sitemap | not in the core |

**Ecosystem.** Large, and a significant part is maintained by the CKAN community itself. A mature setup is the core, ckanext-dcat and, if the standard fields are not enough, ckanext-scheming. A regional harvester adds ckanext-harvest. In October 2026 these packages are tested on 2.12, but the ckanext-dcat documentation does not yet declare 2.12 support. DOIs are not part of such a setup. The list of packages, who maintains them and which versions the tests run on is in the chapter ["CKAN: Core and Extensions"](./03-ckan-and-extensions.md).

**Launch and maintenance.** An official Docker setup: days or weeks to a pilot, weeks or months if custom fields and harvesting are needed. Every extension is checked at a core upgrade. The move to 2.12 upgrades the database and the way files are stored.

**Limitations.**

- Without ckanext-dcat the portal does not get into the national catalog or dataset search engines: there is no DCAT export in the core.
- This platform does not cover a mandatory DOI on the current core.
- A private dataset is hidden entirely. The "description open, file on request" model is assembled with a second system here.
- Registration from the site has been off by default since version 2.10.4. A portal upgraded from an old version often kept the old setting: robots create accounts and publish spam.

**Examples.** [open.canada.ca](https://open.canada.ca/data/) (Canada), [Humanitarian Data Exchange](https://data.humdata.org) (CKAN 2.11.4), [data.gov.au](https://data.gov.au) (Australia, CKAN 2.11.6), [data.gov.gr](https://data.gov.gr) (Greece, CKAN 2.11.3). In the October check the Australian portal showed ckanext-scheming, ckanext-dcat, ckanext-harvest, ckanext-spatial and xloader. On 13 October 2026 a repeat `status_show` request from outside returned code 403. The same day the Greek portal returned 66 plugin names, among them scheming, dcat, harvest, fluent, showcase and high-value dataset validation, as well as the agencies' own harvesters. How to read such a list is covered in the chapter [on ecosystems](./02-extension-ecosystems.md#how-to-see-what-is-installed-on-a-live-portal).

Platforms are changed in both directions. The US data.gov ran on CKAN until April 2026, then moved to its own software; Mongolia also left CKAN for its own engine. Australia, on the contrary, returned to CKAN from Magda in 2025, and Greece moved to CKAN from its own build in 2025–2026. The UK's data.gov.uk became the National Data Library with a new front end in 2026, with the former catalog kept as a separate section.

## DKAN

An open source platform on Drupal, GPL-2.0 licence. The current module release is 4.1.5 of 7 October 2026, declared for Drupal 10 from 10.2 and for Drupal 11. The registry lists 161 open data portals. The module's page on Drupal.org reported about 164 sites on 8 October 2026: this is a report from Drupal installations themselves, not a registry count.

**Whom it suits.** An organisation whose site is already on Drupal and whose catalog must be part of it.

**Whom it does not suit.** An organisation that does not want to maintain Drupal. A catalog that needs DOIs and citation export.

| Capability | Where |
|-------------|-----|
| DCAT, API, datasets | in the DKAN core: a `data.json` file; the core schema is DCAT-US 1.1 |
| Custom fields | in the core: the dataset schema is set by a JSON Schema file; the default file is replaced with your own |
| DOI and separate citation export | no |
| schema.org, harvesting other catalogs, single sign-on | not checked; login and permissions are Drupal modules |
| Site modules, permissions, languages | the Drupal ecosystem |

**Ecosystem.** Two update calendars: a hole in Drupal and a hole in DKAN are closed by different releases. The dataset states in the 2.x branch documentation are draft, published, hidden and archived; by default a dataset is published immediately. Before installing 4.1.5, check that this documentation still refers to the branch you are installing.

**Launch and maintenance.** In terms of time this is open source software with extensions: weeks or months, not days. DCAT does not need to be added as a separate package, unlike CKAN.

**Limitations.** A custom schema means replacing a file in the distribution, not a catalog of packages like ckanext-scheming. There are no DOIs and no ready citation for a reference manager. Harvesting other catalogs was not confirmed in the October check: if a portal must harvest agencies, look at CKAN or Piveau first.

**Examples.** [The Medicaid data catalog](https://data.medicaid.gov/), a CMS portal. The description file is at `/data.json`.

## udata

The open source platform of [data.gouv.fr](https://www.data.gouv.fr), AGPL-3.0 licence, maintained by the Open Data Team. The current release is 17.13.0 of 13 October 2026. The registry lists 15 open data portals, the main one French: in the check on 12 October 2026 it ran 17.12.1 and held 74,376 datasets.

**Whom it suits.** A portal where API descriptions, discussions and harvesting of other catalogs live alongside datasets, with a team for a Python application.

**Whom it does not suit.** A portal that needs page markup for Google Dataset Search without its own customisation. An organisation that wants to pick features from an extension catalog, as with CKAN.

| Capability | Where |
|-------------|-----|
| DCAT | in the core: paginated and as a file per dataset |
| Dump of the whole catalog | in the core: a nightly task writes CSV |
| API catalog and harvesting other catalogs | in the core: data.gouv.fr has 1,265 data services and 507 harvest sources |
| Roles | in the core: administrator, editor, and since version 15.4.0 (March 2026) also partial editor |
| Draft | in the core: it is a private dataset |
| schema.org on the page | no: the HTML has no markup block |
| Curator review before publication | no |
| DOI | no |

**Ecosystem.** Customisations are made in your own installation. There is no separate catalog of extensions with outside maintainers, as with CKAN. The platform can flag suspicious datasets and discussions by a word list and pass them to a moderator.

**Launch and maintenance.** Your own team or a contractor, as with any other open source portal platform: weeks or months to a working catalog. On the day 17.13.0 was released, data.gouv.fr was still responding with the previous number: a large site is upgraded after testing, not on the day of the tag.

**Limitations.** A catalog harvester will see DCAT. A search engine that reads only page markup will not see a dataset until you add markup yourself. There is no country profile "out of the box" in this profile, like the list of specifications in Piveau: the French portal is a model of how to build things, not a ready national profile for another country.

## Piveau

An open source catalog platform from Fraunhofer FOKUS, built around DCAT and harvesting other catalogs. The catalog component piveau-hub-repo is released under Apache-2.0; the current release is 4.4.3 of 24 September 2026. The registry lists 19 portals. data.europa.eu runs on Piveau.

**Whom it suits.** A national or thematic portal that mainly harvests other catalogs, if the DCAT profile it needs is already in the product.

**Whom it does not suit.** A region with its own fields that are not in the input form: such a profile is then maintained by a contractor. An organisation without a team for several platform services.

| Capability | Where |
|-------------|-----|
| DCAT in several formats, SPARQL | in the core |
| Harvesting other catalogs and checking description quality | in the core; this is the platform's main job |
| Custom fields by ready-made specifications | in the input form core: as of October 2026, DCAT-AP and DCAT-AP.de are documented |
| schema.org on the dataset page | no: the page on data.europa.eu is drawn by a script, and the HTML has no markup |
| DOI | no |

**Ecosystem.** The platform is assembled from several services. Version 4.4.3 belongs to the catalog component, not a single number for the whole distribution. A third-party module "like ckanext" is not installed here: your own profile is added as separate work.

**Launch and maintenance.** An open source platform with your own schema: weeks or months. Your own team does the upgrades. On data.europa.eu a dataset description in Turtle opens at an API address even when the page for people is built by a script.

**Limitations.** A profile not in the form's list is not put on the shortlist. There is no page markup for Google Dataset Search. Your own extensions on the server, as with CKAN, are not provided for.

## Huwise (OpenDataSoft) and Socrata

Commercial cloud open data portals. The registry lists 454 portals recorded as OpenDataSoft and 245 Socrata portals. You cannot install your own module on the server: what is left is what the subscription includes, plus a widget and the API.

On 30 September 2025 OpenDataSoft renamed itself Huwise and now calls the product a data marketplace: an open data portal and a showcase for sharing within the organisation and with partners. The platform and API stayed the same, and portal addresses did not change. The registry records the platform under its old name. From here on the book uses Huwise, with the old name in brackets. Socrata is owned by Tyler Technologies and sold as Tyler Data & Insights.

**Whom it suits.** A public authority without its own team that needs an API, DCAT and tables in the browser within weeks.

**Whom it does not suit.** An organisation that may not move data to a provider. A catalog that needs DOIs or an export in a profile the provider does not have.

<div className="wide-table">

| Capability | Huwise | Socrata |
|-------------|--------|---------|
| API, DCAT, table storage, roles | in the service core | in the service core; a `data.json` file per DCAT-US |
| Custom description fields | field templates with translation | fieldsets with requiredness and validation |
| Table data dictionary | label, description and column type | the same |
| schema.org | in the core, enabled by the administrator | JSON-LD on the dataset page |
| Private datasets | the dataset is visible in the catalog, the contents to selected users; access requests enabled in settings | a private dataset is hidden entirely; no access requests |
| Harvesting other catalogs | harvesters for CKAN, Socrata, ArcGIS, ArcGIS Hub, `data.json`, data.gouv.fr and other Huwise portals; CSW harvesting enabled on request through support | the Catalog Connector takes `data.json` and a public ArcGIS Server; a dataset from `data.json` becomes public after synchronisation |
| DOI, your own extensions | no | no |
| Single sign-on | SAML and OpenID Connect | OpenID Connect; SAML through support |

</div>

**Launch and maintenance.** Days, as with any cloud service. The provider does the upgrades. Harvesting other catalogs is in the service itself; there is nowhere to install a separate module.

**Limitations.** Leaving later costs a dump of all datasets and files and an address migration. The provider will not write a national DCAT profile that is not in the subscription as a CKAN-style extension: either it is enabled during the pilot, or another platform is chosen. A change of name or owner is a reason to reread the export clauses of the contract, not a reason to reject the service in advance.

**Examples.** The provider's showcase, formerly data.opendatasoft.com, is now [hub.huwise.com](https://hub.huwise.com).

## JKAN

An open source static catalog on Jekyll, MIT licence. The registry lists 48 open data portals.

**Whom it suits.** An organisation with dozens to a few thousand datasets, if they are edited as files in Git or through a form that saves the edit to the same repository.

**Whom it does not suit.** A catalog with roles, moderation, requests for restricted files and a search API.

| Capability | Where |
|-------------|-----|
| Dataset pages, a `data.json` file | in the template core. The file declares the DCAT-US 1.1 schema and fills a short list of fields |
| Editor form | Decap CMS: an edit becomes a Git commit. On GitHub Pages the instructions ask for a separate authentication server |
| Search API, DOI, roles, your own storage with permissions | no. Search on the page filters a ready JSON file in the browser |
| schema.org | the page template does not add markup; it is added by editing the template |
| Change feed | the repository's feed, if the site is built from Git |

**Launch and maintenance.** Hours or days. No application server is needed. Whoever edits the files maintains it: when they leave, either the next person knows how to build the site or the catalog freezes.

**Limitations.** The template has no search API and no roles. Other catalogs are harvested by a separate script, as on opendata.scot. What to check in `data.json` and on the page is covered in the chapter [on static sites](../08-beyond-portals/02-static-sites.md).

**Examples.** [opendata.scot](https://opendata.scot). Other lightweight options are in the part ["Publishing Without a Portal"](../08-beyond-portals/02-static-sites.md).

## Dataverse

An open source research data repository, Apache-2.0 licence, a project of Harvard University's IQSS. The current release is 6.12.1 of 8 October 2026. The registry lists 257 repositories. The registry entry gives version 6.9, while Harvard Dataverse ran 6.10.1 in the same check.

**Whom it suits.** A university or research consortium that needs DOIs, versions, citation and moderation, and has a library or computing centre.

**Whom it does not suit.** An open data portal with daily updates and DCAT-AP federation: CKAN or Piveau are taken for that task.

| Capability | Where |
|-------------|-----|
| Files, versions, OAI-PMH, citation string, BibTeX and RIS | in the core |
| DOI | in the core: DataCite, since release 6.12.1 also Crossref, plus EZID, Handle and installation permalinks |
| schema.org | in the core; since version 6.10 a short Croissant markup is embedded in the page |
| FAIR Signposting | in the core since version 5.14 |
| Custom metadata blocks | in the core |
| File viewers | external tools: a manifest goes into the installation, and the application itself can run on another site |
| DCAT | not in the core; a third-party exporter, and the documentation calls the exporter mechanism experimental |
| Cloud storage | in the core: S3, Swift, Globus, several stores |
| Single sign-on | in the core: SAML, OpenID Connect, ORCID |

**Ecosystem.** The essentials are in the core. Outside are viewers and additional export formats, maintained by the GDCC consortium. Since version 6.1 a short signed URL to the file is recommended for viewers. The documentation does not recommend a long-lived API key after version 6.0: it acts like the user's password. A third-party export format is connected since version 5.14 as a JAR file inside the installation, and it is checked at upgrade.

**Launch and maintenance.** There are official instructions. The first installation is heavier than a static site. Since version 6.8 containers are considered ready for production; several application servers in containers are not supported. The DataCite agreement is concluded separately from the installation. Maintenance is a job for a library or computing centre, not a one-off grant.

**Limitations.**

- Being able to issue DOIs and issuing them are different things. In the registry, the mark is set for 172 of 257 installations: the rest have no agency agreement connected or the mark was removed manually.
- The Harvard Dataverse dataset page answers a robot with an AWS WAF check, although the API and OAI-PMH work. Check "does the site open" both with a browser and with an API request.
- The DCAT exporter may need rework at upgrade. For a portal that must be harvested via DCAT-AP, this is a weak route.

**Examples.** [Harvard Dataverse](https://dataverse.harvard.edu). Limits for free publication are in the chapter [on research repositories](../03-types/04-scientific-repositories.md).

## InvenioRDM

An open source repository, MIT licence. The current release is v14 of 7 August 2026. Version v13 is supported until 7 February 2027, and v15 was in beta in October 2026. The project's policy: one major version a year, with fixes for at least a year and another six months after the next one. The registry lists 74 installations, including [Zenodo](https://zenodo.org).

**Whom it suits.** An organisation that needs a repository with DOIs, communities and restricted records, and is ready to upgrade a Python application once a year.

**Whom it does not suit.** A small group that only needs to deposit files: Zenodo itself exists for that. An open data portal.

| Capability | Where |
|-------------|-----|
| Files, DOI, versions, OAI-PMH, DCAT | in the core |
| Citation | in the core: CSL styles, BibTeX, CSL-JSON |
| RIS | no |
| Additional fields | core configuration, not a third-party plugin catalog |
| Restricted records and access requests | in the core |
| Cloud storage | in the core since v13: S3 |
| FAIR Signposting | in the core since v12 |
| Single sign-on | in the core: ORCID, OpenID Connect, SAML |
| Croissant | no |
| schema.org | in the core |

**Ecosystem.** The documentation ranks customisations from cheap to expensive: configuration, files in expected places, a ready module, your own package in the installation folder, a core change contributed back to the project, your own copy of someone else's repository. A logo is changed by configuration. A copy of your own for the sake of a logo is only worth it if you are ready to carry every update over by hand. More in the chapter [on ecosystems](./02-extension-ecosystems.md).

**Launch and maintenance.** There are official instructions; the first installation is heavier than a static site. Next to it is the option of publishing in Zenodo and not setting up your own installation. For a small group it is usually better. A large installation lags behind the release just like Harvard Dataverse: this is normal within the support window and becomes a risk once the window has closed.

**Limitations.** The metadata documentation is based on DataCite schema 4.3, while the current schema is 4.7 of March 2026. New fields, such as a link to a project, are checked against this documentation before choosing. RIS is not exported from the core. Your own installation makes sense when a library moderates many groups and needs its own DOI prefix.

**Examples.** [Zenodo](https://zenodo.org), [CaltechDATA](https://data.caltech.edu). Zenodo's limits are in the chapter [on research repositories](../03-types/04-scientific-repositories.md).

## DSpace

An open source repository, BSD licence. The registry lists 829 research repositories: it is above all a publications repository into which data is also deposited. The current release is 10.1 of 14 September 2026; fixes 9.4 and 8.5 came out the same day. DSpace 10 introduced a "dataset" item type. The registry entry gives version 9.2, and DSpace@MIT ran 8.2.

**Whom it suits.** A library whose DSpace already holds publications, and data is deposited there too.

**Whom it does not suit.** A new data repository with no publications: Dataverse and InvenioRDM are closer to data. Up to and including version 10.1, DSpace does not cover citation export, so it is not put on a data repository shortlist.

| Capability | Where |
|-------------|-----|
| Files, Dublin Core, OAI-PMH | in the core |
| DOI | in the core, enabled in configuration; by default the item identifier is a Handle, and the address is built from it |
| Custom fields and input forms | core configuration: the metadata schema registry and the `submission-forms.xml` file |
| A ready citation and export to BibTeX and RIS | no, up to and including 10.1: the core has only meta tags for Google Scholar and Zotero; the "Cite" button is being ported from DSpace-CRIS, and the port is not complete |
| Importing records from BibTeX, RIS and EndNote | in the core |
| FAIR Signposting | in the core since version 7.6 |
| schema.org and DCAT | not found in the core |
| Cloud storage | in the core: S3, several stores |
| Theme and some integrations | your own code in the `additions` module on top of core classes |

**Ecosystem.** There is no third-party plugin catalog. Your own changes are reapplied to the new version. This is cheaper than writing a repository from scratch and more expensive than enabling a feature in Dataverse.

**Launch and maintenance.** Official instructions; the first installation is heavier than a static site. For a library that already has DSpace, an upgrade is cheaper than a new installation for data. For a new data repository without an existing DSpace, this effort usually does not pay off.

**Limitations.** In the registry the DOI mark is set for 218 of 829 installations: the identifier is enabled separately, and many repositories live on Handle alone. Meta tags for Zotero are groundwork, not a "copy citation" button. The "dataset" item type appeared in version 10; an installation on 8.x does not have it until it is upgraded.

**Examples.** [DSpace@MIT](https://dspace.mit.edu).

## Figshare

A Digital Science cloud service: the shared figshare.com site and institutional repositories. The registry lists 288 research repositories. You cannot install your own module on the server.

**Whom it suits.** A university or author who needs a DOI without their own installation and accepts the limits and pricing.

**Whom it does not suit.** An open data portal. An organisation that may not hand files to a provider. A dataset larger than the free tier limit, if a one-off storage fee is not budgeted.

| Capability | Where |
|-------------|-----|
| Files, DOI, citation string, BibTeX and RIS | in the service core |
| API | in the service core |
| Your own extensions | no |

**Launch and maintenance.** Days, as with any cloud service. The provider does the upgrades. On 12 October 2026, 20 GB of personal space and files up to 20 GB were free. Figshare+ charges a one-off fee of 1,225 dollars per 250 GB, with files up to 5 TB. In the registry the DOI mark is set for 266 of 288 installations.

**Limitations.** You can leave with what the provider gives as an export. Automated harvesting of commercial repositories is limited: the chapter on research repositories names this as a separate difficulty. Check pricing and hosting location in the contract, not from someone else's summary.

## GeoNetwork

An open source catalog of geodata descriptions, GPL-2.0 licence. The current release of the 4.4 line is 4.4.12 of 8 July 2026, which closes vulnerabilities in earlier 4.4 versions. The registry lists 762 geoportals. The registry entry gives version 4.4.9.

**Whom it suits.** A spatial data infrastructure that needs ISO 19115, CSW and harvesting of records from other catalogs.

**Whom it does not suit.** A portal of tables and registers: CKAN or a cloud service is simpler there. An organisation that needs one "map and catalog" site without a separate layer server: GeoNode is closer.

| Capability | Where |
|-------------|-----|
| ISO 19115, ISO 19139, ISO 19115-3, Dublin Core, the ISO 19110 feature catalogue | in the core |
| CSW, OAI-PMH, harvesting records (CSW, OAI-PMH, OGC services, STAC collections) | in the core |
| DCAT, including GeoDCAT-AP | in the core |
| schema.org and sitemap | in the core: JSON-LD on the record page (Croissant fields for ISO 19115-3 are in the branch of the upcoming 4.4.13 release), a sitemap named in `robots.txt` |
| DOI | in the core; has to be enabled and connected to DataCite |
| A ready citation for a record | in the core: HTML, text, RIS, BibTeX; the composition of the string is set in the schema's XSL file |
| Restricting download while the description is open | in the core: a separate permission for files uploaded into GeoNetwork |
| Cloud storage | in the distribution: S3, JCloud and CMIS modules |
| Record versions | no; with approval workflow there is a working copy |
| OGC API Records | a separate microservice, not a catalog page |
| Country metadata profiles | schema plugins |

**Ecosystem.** The ISO schemas in the distribution are core. A country profile is a separate plugin: a folder of schemas and transformations, sometimes its own JAR. A bad plugin breaks the whole catalog, as the administrator guide warns. Install the branch named after your GeoNetwork line and check that such a branch exists in the repository. Two copies of the British GEMINI profile are analysed in the chapter [on ecosystems](./02-extension-ecosystems.md).

**Launch and maintenance.** Official instructions, including Docker. The first installation is heavier than a static site. A map server is almost always needed alongside: GeoNetwork describes a layer, and GeoServer or another server serves it. Country profiles are checked at every upgrade.

**Limitations.**

- The DOI mark in the registry means "the platform can". In DataCite on 12 October 2026, DOIs led to about 45 GeoNetwork installations, while the mark in the registry was set for 555. Before the requirement "all our layers will have DOIs", look at the DataCite agreement, not at the registry cell.
- The number on a live site and the number worth downloading are checked separately. The Ifremer Sextant catalog showed 4.4.13 on 13 October 2026, newer than the announced release 4.4.12.
- An open data portal with DCAT-AP federation as its main task is not built here: the geocatalog serves DCAT, but not a daily showcase of tables.

**Examples.** [Nationaal Georegister](https://nationaalgeoregister.nl/geonetwork), the national catalog of the Netherlands. The European Environment Agency catalog and EU national catalogs are analysed in the chapter [on geoportals](../03-types/03-geoportals.md).

## GeoNode

An open source OSGeo geo platform, GPL version 2 or later. The registry lists 770 geoportals. The book's chapters checked release 5.1.0 (2026): the map and catalog are built together.

**Whom it suits.** An organisation that publishes files by hand and wants one site: upload a file and get a layer, a record, a map and a download link.

**Whom it does not suit.** A national infrastructure where the catalog and the map server live separately and descriptions go into CSW with a country profile: that is GeoNetwork. For a small town its own server is usually harmful: there is nobody to update it after the project that paid for it.

| Capability | Where |
|-------------|-----|
| File upload, map, download, API | in the core; the layer is served by GeoServer, records via CSW by pycsw |
| ISO 19115 and Dublin Core via CSW | in the core, through pycsw |
| Documents, map stories, dashboards | in the version 5.1 core |
| DCAT and a `data.json` file | no: not found in the 5.1 code |
| schema.org on the page | not present in the check of 13 October 2026 |
| DOI | no |

**Ecosystem.** Your data and the showcase are one installation. GeoServer and pycsw are already inside and are upgraded together with GeoNode. A separate catalog of schema plugins, as in GeoNetwork, is not needed for ordinary publishing. A national ISO profile is not "switched on with a checkbox" here.

**Launch and maintenance.** An open source platform with its own server: weeks or months, then your own team. In the registry, 11% of GeoNode geoportals are not working. A common story: a geoportal was built under a donor programme, the programme ended, and the server was switched off.

**Limitations.** This platform does not serve descriptions in DCAT. An open data search engine and a national DCAT-AP portal will not harvest its catalog by themselves: a second export or a second catalog is needed. For layers that already sit in a regional infrastructure, your own GeoNode duplicates a server that someone already maintains.

**Examples.** Kazakhstan's national geoportal [map.gov.kz](https://map.gov.kz): on 12 October 2026 its API served descriptions of 378 datasets without a login.

## ArcGIS Hub

Esri's cloud catalog, a commercial subscription. The registry lists 3,464 geoportals. The sites look like both a geoportal and an open data portal: a layer can be downloaded as a file, and the catalog serves DCAT. The registry rarely records Hub as an open data portal: 19 times. You cannot install your own module on the server.

**Whom it suits.** An organisation whose maps are already in ArcGIS and which needs to quickly give them a page with downloads.

**Whom it does not suit.** An organisation that does not want to depend on Esri licences. A catalog that needs DOIs.

| Capability | Where |
|-------------|-----|
| Catalog, files and layers, OGC API Records | in the service core |
| DCAT | in the core: DCAT-US 1.1 and DCAT-AP 2.1.1 feeds by default; DCAT-US 3.0 and DCAT-AP 3.0.0 feeds are enabled separately |
| Description standard | one style per organisation: ISO 19139, ISO 19115-3, INSPIRE, FGDC, the North American Profile or Dublin Core+ (the default for organisations created after July 2025) |
| Layer field descriptions | in the core: description, value type, lists of allowed values |
| DOI, custom fields beyond the chosen standard, your own extensions | no |
| schema.org | not found on the page in the October 2026 check |
| Harvesting other catalogs | not checked |

**Launch and maintenance.** Days, as with any cloud service. The provider does the upgrades. Leaving later costs a dump and an address migration.

**Limitations.** One metadata style for the whole organisation: a second agency with a different standard needs a different site or a different platform. The DCAT-AP 3 feed does not turn itself on. A dataset that can only be seen on a map and cannot be downloaded does not count as an open data catalog; check this during the pilot.

**Examples.** Organisations' catalogs are collected at [hub.arcgis.com](https://hub.arcgis.com). The District of Columbia portal [opendata.dc.gov](https://opendata.dc.gov) is an example of a site serving both a map and DCAT.

## PxWeb

An open source platform for statistical tables from Statistics Sweden, Apache-2.0 licence. The registry lists 110 indicator catalogs, among them [Statbank Denmark](https://www.statbank.dk/). The last release of the old line is 2025.v1 (February 2025). The new generation is the [PxWebApi 2](https://www.scb.se/en/services/open-data-api/pxwebapi/pxwebapi-2.0) API (at Statistics Sweden since October 2025, release 2.7.0 in September 2026) and the [PxWeb 2](https://github.com/PxTools/PxWeb2) interface, release 2.12.0 of 7 October 2026. The interface takes its data from that API.

**Whom it suits.** A statistical office that publishes indicators with dimensions and, for now, serves them to people and programs in JSON-stat, CSV and PX.

**Whom it does not suit.** A catalog of files. An office that needs SDMX exchange with structures and code lists: .Stat Suite or SDMX-RI covers that, often alongside PxWeb rather than instead of it.

| Capability | Where |
|-------------|-----|
| API | in the core; PxWebApi 2 accepts queries in the URL and serves JSON-stat 2, CSV, PX, Excel, HTML; Parquet in beta |
| A list of all tables and a selection of those changed in N days | in the PxWebApi 2 core |
| SDMX | only an SDMX-ML 2.0 file in the old API; SDMX is not among PxWebApi 2 formats |
| DCAT, schema.org, DOI | no |
| SDMX structure registry | no |

**Launch and maintenance.** Open source software without its own field schema: days or weeks to a pilot. New installations should go straight onto PxWebApi 2. The move changes query addresses; Statistics Sweden's converter translates users' old links. More in the chapter [on indicator catalogs](../03-types/05-indicator-catalogs.md#reusable-statistical-software).

**Limitations.** The registry found a DCAT export for fewer than ten indicator catalogs on any platform. For tables to reach an open data portal, descriptions are made separately. PxWeb has no full SDMX service, and the new API generation has not closed this gap.

## .Stat Suite

An open source platform from the SIS-CC community, led by the OECD. The registry lists 40 indicator catalogs. It is built around SDMX: a Data Explorer (release 27.7.0, July 2026), a data loading tool and an SDMX service. Inside, the service is Eurostat's SDMX-RI under the EUPL licence. An office installing .Stat Suite in effect installs that too.

**Whom it suits.** A statistical office that needs exchange with Eurostat, the IMF or the OECD and has consultants or its own team that knows SDMX.

**Whom it does not suit.** An office for which tables for people and JSON-stat are enough for now: PxWeb is faster there. An organisation that wants "an indicator portal in weeks" without structures and code lists.

| Capability | Where |
|-------------|-----|
| SDMX API, structure registry | in the core; structures can also be maintained in Fusion Metadata Registry |
| Data explorer separate from the service | in the distribution core: they are different modules |
| DCAT | not checked |
| DOI | no |

**Launch and maintenance.** Implementation is heavy and is rarely done without SDMX knowledge. Several modules are upgraded, not one container. The model interface is the [OECD Data Explorer](https://data-explorer.oecd.org). FAO, the ILO and the statistical offices of Australia, New Zealand, Italy and Switzerland run on the same platform.

**Limitations.** It is not a replacement for PxWeb for a simple showcase, and not a catalog of files. The combination "PxWeb for people, .Stat Suite for exchange" is a standard statistical office setup. Gluing it to a NADA microdata catalog in one program is not worth it: the standards and access levels differ. See the [statistical office example](../06-choice/08-worked-examples.md).

## NADA

An open source microdata catalog, MIT licence, the World Bank and the IHSN network. The current release is 5.7.1 of 4 October 2026 (5.6 in July 2026, 5.7 in September). The registry entry gives version 5.5. The registry lists 158 microdata catalogs, 47 of which do not open.

**Whom it suits.** A statistical office or survey archive that needs access levels, requests and DDI descriptions.

**Whom it does not suit.** A portal of open tables. A university archive that needs DOIs and delivery of descriptions to the European CESSDA catalog via OAI-PMH: Dataverse is closer there.

| Capability | Where |
|-------------|-----|
| A catalog of studies, search by variables, seven access types, requests, API | in the core |
| DDI Codebook export, schema.org markup (JSON-LD) | in the core |
| DOI | a field for a DOI minted separately in DataCite; NADA itself does not register DOIs |
| Citation export | in the core, through DataCite, if the study has a DOI |
| OAI-PMH, DCAT | no |
| Indicators, documents, tables and geodata | in the core since release 5.6; no SDMX service or layer services |
| Description templates | since release 5.7, World Bank metadata editor templates |

**Ecosystem.** There is little in the way of a separate extension catalog. Administrators have API clients for R and Python (NADAR and PyNADA). Descriptions are written in the metadata editor, and NADA displays them. A replacement for the discontinued Nesstar is looked for here or in Dataverse; Nesstar itself is not chosen for a new catalog.

**Launch and maintenance.** Days or weeks to a pilot, if access levels do not have to be written anew. The main risk is not installation but maintenance after the project: 47 of 158 catalogs in the registry do not open. These are old statistical office installations, often without HTTPS, not a trace of the withdrawn Nesstar. More in the chapter [on microdata catalogs](../03-types/06-microdata-catalogs.md#where-it-breaks).

**Limitations.**

- Descriptions reach the European archive federation only through an intermediate export: CESSDA harvests DDI via OAI-PMH, and NADA does not have that protocol.
- DOIs are registered yourself in DataCite and entered in the field. While the field is empty, citation export is silent.
- Release 5.6 can describe an indicator but does not replace an indicator catalog. In the World Bank library all records remain surveys. Indicators and microdata are kept in different catalogs.

**Examples.** [The World Bank Microdata Library](https://microdata.worldbank.org), [the IHSN central catalog](https://catalog.ihsn.org).

## Platforms without a separate profile

udata, Piveau, GeoNode, .Stat Suite and Figshare are covered above. Below are platforms for specific niches. Check the licence and timelines in the documentation before deciding, just as for the profiles. Installation counts are from the same registry export unless another source is given.

**Portals and aggregators**

- **[Magda](https://magda.io)**: an open source (Apache 2.0) Australian aggregator catalog that collects descriptions from many sources into one search. In 2019–2025 it powered search on data.gov.au. Today it runs, for example, Kazakhstan's [Ashyq Data](https://ashyq.data.gov.kz). It is heavy to maintain and, by a 2024 estimate, pays off only at tens of thousands of datasets.
- **[EntryScape](https://entryscape.com)**: a commercial platform from the Swedish company MetaSolutions: a DCAT-AP catalog with publication on your own site and into the national dataportal.se. The registry lists 99 open data portals, almost all in Sweden.

**Geo platforms** (more on their roles in the [chapter on geoportals](../03-types/03-geoportals.md))

- **[pycsw](https://pycsw.org)**: an open source (MIT) lightweight catalog of geodata descriptions: CSW, OGC API Records, STAC API, OAI-PMH. Built into GeoNode and connectable to CKAN; 44 standalone installations.
- **[Oskari](https://www.oskari.org)**: an open source (MIT or EUPL) platform for map showcases, coordinated by the National Land Survey of Finland. It displays layers from GeoServer, GeoNetwork and other services. 23 installations, 21 of them in Finland, including the national [Paikkatietoikkuna](https://kartta.paikkatietoikkuna.fi).
- **[TerriaJS](https://github.com/TerriaJS/terriajs)**: an open source (Apache 2.0) library for map showcases, created at CSIRO. It brings WMS, WFS and ArcGIS layers and datasets from CKAN, Socrata and OpenDataSoft onto one map. 75 installations, for example [Digital Earth Africa Map](https://maps.digitalearth.africa). Australia's National Map on TerriaJS was shut down on 27 June 2025.
- **QGIS Web Client 2 (QWC2)**: a map showcase on top of other services. 159 installations, most in Finland and Germany. It stores almost no data of its own.
- **[GeoBlacklight](https://geoblacklight.org)**: open source (Apache 2.0) search over maps and geodata based on Blacklight. Maintained by university libraries; an example is the [Big Ten Academic Alliance geoportal](https://geo.btaa.org). 23 installations.

**Science, statistics and microdata**

- **[ERDDAP](https://erddap.github.io)**: NOAA's open source scientific data server, in the "protocol server" class: subsetting gridded and tabular datasets in various formats, charts and maps. Widely used in oceanography and meteorology; 175 installations.
- **[GBIF IPT](https://github.com/gbif/ipt)**: an open source (Apache 2.0) tool for publishing biodiversity data into the GBIF network, a domain system. As of 12 October 2026, 392 installations were registered in GBIF; the registry lists 11 Russian ones, run by institutes and universities.
- **[WEKO3](https://github.com/RCOSDP/weko)**: an open source (BSD-3) repository from Japan's National Institute of Informatics based on Invenio 3. It powers the JAIRO Cloud service: at the end of fiscal year 2025, 822 organisations used it. The registry lists 161 Japanese repositories on WEKO3. Research repositories have [their own chapter](../03-types/04-scientific-repositories.md).
- **[InstDB](https://fairstack.cn/product/software/InstDB)**: a research data repository from the Computer Network Information Center of the Chinese Academy of Sciences, part of the FairStack suite: review before publication, open and restricted access, DOI and CSTR identifiers. 83 installations, almost all in China, for example the [repository of the CAS Science Data Center](https://instdb.casdc.cn).
- **[OpenSDG](https://open-sdg.org)**: an open source (MIT) static site for Sustainable Development Goal indicators. 72 installations; users include Armenia, Kazakhstan and Kyrgyzstan. More in the chapter on [static sites](../08-beyond-portals/02-static-sites.md).
- **[PxStat](https://github.com/CSOIreland/PxStat)**: an open source (MIT) indicator platform from Ireland's statistical office: tables in JSON-stat, PX, CSV and XLSX, an API, a release calendar. It has hardly been replicated: the registry lists 2 installations, the main one [data.cso.ie](https://data.cso.ie); the latest release is from February 2025.
- **[Redatam](https://redatam.org/en)**: software from the population division of UN ECLAC (CELADE) for processing and publishing census and survey microdata, developed since 1985. Distributed free of charge; the current generation, RedatamX (since 2024), runs on Windows, Linux and macOS and as an R package. The database format is proprietary, with no published specification. Class: microdata catalog; main region: Latin America; 38 catalogs in the registry. See the chapter on [microdata catalogs](../03-types/06-microdata-catalogs.md).
- **[OBiBa Mica](https://www.obiba.org/pages/products/mica/)**: an open source (GPL-3.0) portal for epidemiological studies and consortia: study descriptions, variable dictionaries, data access requests. Closer to a microdata catalog; 27 installations.

## When to reopen a profile

A decision record is not rewritten at every tag. It is reopened when the answer to "is the feature still in a tested setup" changes.

- The next minor core version has come out, and the needed extension's tests do not include it. For CKAN the nearest such milestone is 2.11 leaving the pair that still gets fixes.
- A support window has closed. For InvenioRDM v13 this is 7 February 2027.
- A cloud provider changed its name, owner or the contents of its export. This has already happened with OpenDataSoft and with Socrata.
- A live site lags behind the release beyond the support window, and there is nobody to upgrade it.
- A mandatory feature has moved: a national profile appeared that is not in the Piveau form, or an agency demanded DOIs.

The record template is in the chapter ["Justifying a Decision"](../06-choice/04-justifying-decisions.md).

## Sources

- [CKAN 2.12 documentation](https://docs.ckan.org/en/2.12/), [release support policy](https://docs.ckan.org/en/2.12/maintaining/releases.html), [2.12 release announcement](https://ckan.org/blog/ckan-2-12-released): 2.12 is called the last release of the 2.x line
- [The DKAN module on Drupal.org](https://www.drupal.org/project/dkan): release 4.1.5 of 7 October 2026; [GPL-2.0 licence](https://github.com/GetDKAN/dkan/blob/4.x/LICENSE.txt)
- [udata changelog](https://udata.readthedocs.io/en/stable/changelog/): 17.13.0 of 13 October 2026; [AGPL-3.0 licence](https://github.com/opendatateam/udata/blob/main/LICENSE)
- [piveau-hub-repo licence, Apache-2.0](https://gitlab.com/piveau/hub/piveau-hub-repo/-/blob/main/LICENSE.md), [changelog](https://gitlab.com/piveau/hub/piveau-hub-repo/-/blob/main/CHANGELOG.md): release 4.4.3 of 24 September 2026
- [GeoNetwork licence, GPL-2.0](https://docs.geonetwork-opensource.org/latest/overview/license/), [release 4.4.12](https://geonetwork-opensource.org/news.html) of 8 July 2026
- [GeoNode licence](https://github.com/GeoNode/geonode/blob/master/LICENSE): GPL version 2 or later
- [InvenioRDM licence policy, MIT](https://inveniordm.docs.cern.ch/community/copyright-policy/), [maintenance policy](https://inveniordm.docs.cern.ch/releases/maintenance-policy/)
- [Announcement of OpenDataSoft's rename to Huwise](https://www.huwise.com/en/opendatasoft-becomes-huwise/), 30 September 2025; [Huwise portal security settings](https://userguide.huwise.com/en/articles/2043394); [Huwise harvesters](https://userguide.huwise.com/en/categories/480514); [Socrata's Catalog Connector](https://support.socrata.com/hc/en-us/articles/223722647-Using-the-Catalog-Connector-to-Federate-and-Connect-External-Assets)
- [Announcement of the new data.gov catalog](https://data.gov/blog/catalog-update/): leaving CKAN in April 2026
- Link Digital, [moving data.gov.au to CKAN](https://linkdigital.com.au/case-studies/upgrading-a-national-oecd-government-open-data-portal-to-a-full-ckan-environment/), 2025; GDS, [What's changing on data.gov.uk and why](https://dataingovernment.blog.gov.uk/2026/03/25/whats-changing-on-data-gov-uk-and-why/), 2026
- Versions and extensions of data.gov.au and data.gov.gr from the `/api/3/action/status_show` response, October 2026. Repeat check on 13 October 2026: data.gov.gr, CKAN 2.11.3 and 66 plugin names; data.humdata.org, CKAN 2.11.4 and 34 names; data.gov.au returned code 403. opendata.gov.mn leaving CKAN: I. Begtin, [Telegram](https://t.me/begtin/7737) (in Russian), 25 August 2026
- Installation counts: the dataportals-registry export, release 1.27.0 of 15 October 2026. The queries are in the [appendix](../12-appendices/02-using-the-registry.md).
- [Comparison table](../12-appendices/03-platform-tables.md)
