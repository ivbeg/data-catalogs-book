---
title: Other Capabilities
description: "Search, preview, multiple languages, harvesting other catalogs, usage statistics and feedback: when each is needed and where it lives in a platform."
---

# Other Capabilities

Search, preview, multiple languages, harvesting other catalogs, statistics and feedback end up in the specification because a large portal has them. Each has a threshold. Until it is crossed, a metadata dump, a licence and permanent addresses come first.

In brief:

- Full-text search over descriptions and filters are needed when there are hundreds of datasets and people search by topic. Dozens of datasets with clear titles are fine with a list.
- Preview helps choose a file. A citation in a paper and a program's request go to the file and the API: preview is not a source for them.
- Translating buttons and translating titles are different jobs. Search in a second language finds a dataset only if its title or description is written in that language.
- Harvesting other catalogs is needed by those who show other people's datasets. For a portal with its own datasets it adds records without an owner.
- A page view counter does not see downloads through the API. Such a figure is no good for an annual report: how a catalog's numbers mislead is covered in the chapter [on metrics](../10-quality/02-metrics.md).
- A form without a person who reads it and replies within a stated time is worse than a contact on the dataset page.

How harvesting works at the source and at the harvester is covered in the chapter ["Federation and Harvesting"](../07-publishing/03-federation-and-harvesting.md). Here: the threshold, where the capability sits in the platform, and a check of a live site.

## When each is needed

| Capability | Needed when | Can do without when |
|-------------|----------------|------------------------|
| Search and filters | there are hundreds of datasets or more, and people search by topic, organisation and format | there are dozens of datasets, each with a clear title |
| Preview | a person needs to understand a file without downloading it | files are small, or only a program reads the data |
| Multiple languages | several official languages or an international audience, and someone available to maintain translated descriptions | one city and one language |
| Harvesting other catalogs | a regional or national portal, or an aggregator | the portal publishes only its own data |
| Usage statistics | decisions on what to update are based on them, and both pages and the API are counted | one "big number" is needed for the annual report |
| Feedback | a public portal, with a named person who reads messages | an archive kept under grant rules: a contact in the description is enough |

Search through the API is a neighbouring capability covered in the chapter [on APIs and bulk download](./04-access-interfaces.md). In CKAN the search box on the site and a program's request look into the same index, so a word missing from the site's results will not be found through the API either.

## Search and filters

Search by words and filters by organisation, theme and format. On a geoportal, search by map is added.

A list is enough when there are dozens of datasets. A separate search index (a copy of the descriptions organised for fast search) is needed when there are thousands of datasets and people filter rather than scroll. If the index has drifted from the description database, the dataset exists but search does not show it.

Search by title and search by description are different index settings. The word people search for is often in the body of the record, not in the title. An index that the description did not get into will not find such a word.

CKAN's index is Solr, part of a standard installation. An ordinary query searches the combined `text` field: title, description, tags and other record fields go into it. A query with a colon searches one field, for example `title:budget`. Filters by organisation, group, tag and file format are also in the core. In Dataverse 6.12, Solr is a mandatory part of the installation, and its API must not be exposed externally: whoever reaches Solr can change the index behind the catalog's back. In GeoNetwork 4.4 the index is Elasticsearch (the October 2026 documentation recommends version 8.19.13, minimum 8.14); the index's own port is not exposed, and search goes through the catalog. InvenioRDM's installation guide names OpenSearch. udata's search is Elasticsearch, and it is not updated by itself at the moment a record is saved.

On 14 October 2026 on data.gov.gr (CKAN 2.11.3), a query with the word `Guarantees` returned 6 datasets. The Greek title of the first does not contain this word: it is in the English translation of the title. So the translated title got into the index. On the same day, a CSV format filter selected 5,599 datasets from the catalog: the format filter on this portal works.

Check: type a word from the middle of a description, not from the title. Then filter by one organisation and one format. If there is no filter and there are more than a few hundred datasets, people have to scroll through results.

## Preview

A table, chart or map on the dataset page helps decide whether this is the right file. A preview cannot be cited and cannot be reliably fetched by a program. The copy used for display goes stale separately from the file: it is checked just like the source file. See the chapter ["Anatomy of a Catalog"](../01-basics/03-anatomy.md).

In CKAN, view types are plugins shipped with the core: table (`datatables_view`), text, image, video, audio, embedded web page. The table is enabled only if the rows are in the DataStore. The DataStore itself is part of the core, while loading CSV into it is done by the XLoader extension. The CKAN 2.12 documentation no longer has the Recline viewers: the table is shown by `datatables_view`. A layer map comes from the [ckanext-geoview](https://github.com/ckan/ckanext-geoview) extension, release 0.3.2 of 2 October 2026. The browser will not show a file on someone else's site from a CKAN page by itself: a resource proxy is enabled for this, and the proxy has a size limit. The embedded page view (`webpage_view`) is not enabled where anyone can create datasets: it shows someone else's address inside the portal.

On data.gov.gr on 14 October 2026, `datatables_view`, `datastore` and `xloader` are all enabled. For the dataset on state guarantees for December 2023, the XLS file is not loaded into the DataStore. The CSV of the same dataset is loaded, but the field `datastore_contains_all_records_of_source_file` is `false`: the database does not hold the whole file. A table preview depends on the specific file and may show only part of it.

Dataverse has a mechanism for connecting viewers in the core (external tools), while the viewers themselves are a separate community set, dataverse-previewers. The administrator installs them. On the file page, a restricted file's preview is not shown. It is seen by those who already have the right to download the file, including through a separate preview link to a draft. So the phrase "Dataverse has preview" is true for an installation where viewers are enabled, and for a file this person is allowed to download.

In InvenioRDM viewers are shipped with the platform: PDF, CSV, images, Markdown, JSON, XML, ZIP, Jupyter notebooks; since release v12 also audio and video. Some of them, including CSV, read the file from the installation's own storage. In Socrata the dataset page is a table and an exploration canvas: the statistics guide calls them ordinary view pages. GeoNetwork's core has a layer map, not a CSV table.

Check: open a dataset with a table and a dataset with a restricted file. The first has a table on the page or a direct download link, without promising a table that is not there. The second's contents are not visible to someone the file is closed to.

## Multiple languages

There are three different things here.

**Interface language.** Menus, labels, error messages. In CKAN the interface translations are in the core: the list of languages is set by the `ckan.locales_offered` and `ckan.locale_default` settings. In Dataverse and InvenioRDM additional interface languages are enabled in configuration, and the translations come from the community. In GeoNetwork 4.4 the list of interface languages is chosen in the settings; if there is only one language, the switcher is not shown.

**Language of the data.** A field such as `dct:language` says what language the table or text itself is in. It is not a translation of the record.

**Translation of the record.** The title and description in each language in which the portal is used. In CKAN such fields come from the ckanext-fluent extension together with ckanext-scheming. Both are maintained by the CKAN community; as of 14 October 2026 the automated tests on the main branch include CKAN 2.10, 2.11 and 2.12. In GeoNetwork, multiple languages within an ISO record are a core capability: the title and abstract are stored separately for each language, and search can be limited to the interface language or run across all of the record's languages. In Dataverse and InvenioRDM separate field translations appear if the schema provides for them. The "dataset language" field itself does not replace a translated title.

If the buttons are in two languages and the records in one, search in the second language comes back empty: a person switched the language and cannot find a dataset that sits under a title in the first.

data.gov.gr maintains records in two languages: the plugin list includes `fluent` and `scheming`. For the dataset on state guarantees for December 2022, the Greek title, the Greek description and the English title all refer to December 2022, while the English description says "Hellenic Republic Guarantees – January 2026". The translated description points to a different month. Search by the English word still works, because the English title got into the index. A translation nobody checks against the original record drifts from it quietly.

Machine translation of harvested records makes them findable in EU languages: data.europa.eu translates titles and descriptions this way after harvesting. Precise wording in two languages is still written by the publisher. How the harvesting chain works is covered in the chapter [on federation](../07-publishing/03-federation-and-harvesting.md).

Check: switch the language and find a dataset with a word in that language. Then open the record and compare the translated description with the text in the original language, not only with the translated title.

## Harvesting other catalogs

The portal collects descriptions from other catalogs on a schedule: from DCAT, the CKAN API, CSW, OAI-PMH. Records are taken, not files. For a regional or national portal and for any aggregator this is the main job. An agency that publishes only its own data does not need harvesting: other people's records inflate the counter and leave a second copy without an owner.

Where this lives in the platform, checked in October 2026:

- **CKAN.** The harvesting framework is the ckanext-harvest extension. RDF harvesting is done by ckanext-dcat, geocatalog harvesting by ckanext-spatial. Who maintains them and which core version they work with is covered in the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md).
- **udata.** Six harvesters ship with it: DCAT, two variants of CSW, CKAN, DKAN and the French Ministry of Agriculture's format. None is enabled until it is listed in the `HARVESTER_BACKENDS` setting. An administrator also has to validate a new source, otherwise harvesting does not start. A record written to the database does not appear in search by itself: after a run the index is rebuilt separately. On data.gouv.fr on 14 October 2026 the list of sources returned 502 records. That night the source "Communauté de Communes du Pays de Landivisiau" (a CSW harvester, the GeoBretagne catalog) finished without errors and collected 4 datasets.
- **Dataverse.** A harvesting client is in the core and uses OAI-PMH, including against other Dataverse installations. A harvested dataset in search leads to the source repository and cannot be edited locally. The OAI-PMH server, which serves your own datasets outward, is off by default: that is serving, not harvesting.
- **Piveau.** DCAT harvesting is the core's main function.
- **GeoNetwork.** The core harvests CSW, OAI-PMH, OGC services and STAC collections.
- **Huwise.** Harvesters are part of the service: CKAN, Socrata, ArcGIS, ArcGIS Hub, a `data.json` file, data.gouv.fr and other Huwise portals. CSW harvesting is off by default and is enabled through support.
- **Socrata (Tyler Data & Insights).** The Catalog Connector in the admin panel takes a `data.json` file and a public ArcGIS Server, plus there is exchange between Socrata's own domains. Datasets from `data.json` become public after synchronisation: a dataset private at the source will be opened again on the Socrata side. This is checked before connecting another catalog with non-public records.
- **JKAN and a static site.** There is no harvesting in the template: the `data.json` file is assembled by the generator from pages. Other catalogs are collected by a separate script in the same repository, as on opendata.scot.

For ArcGIS Hub, harvesting arbitrary external catalogs was not confirmed in this check. For InvenioRDM, DSpace and NADA, a harvesting client was not settled by the documentation in this check.

On data.gov.gr, a dataset collected by the DCAT-AP harvester has the address of the original (`https://portal.raise-science.eu/datasets/…`) and the name of the harvest source on its page. A reader can tell someone else's publication from the city's own.

Check: the list of sources has a live address, the date of the last successful run and the number of datasets collected. A harvested dataset's page shows a link to the original. A word from the title is found by search: a record written to the database without an index rebuild is not visible on the site.

## Usage statistics

Page views, file downloads, API calls. They are used to decide which datasets to update first and to show that the catalog is used. A single "portal views" figure is no good for this: it is easily inflated and does not see those who fetch files by program.

In the CKAN 2.12 documentation, view counting is the `tracking` plugin shipped with the core. It is added to the plugin list. In CKAN 2.10 and earlier the same counting was enabled by a setting inside the core. The plugin records views of dataset and resource pages. The summary the site shows is updated by the `ckan tracking update` command; to get the figures into search, the index is rebuilt afterwards. The `recent` field is views over 14 days, `total` is all counted views. This counter does not see API calls. On data.gov.gr the plugin is enabled: on 14 October 2026 one harvested dataset's summary showed 51 views in total and 31 in the last 14 days, while the neighbouring dataset had zeros for both. Zero means the page has not been opened since counting started seeing it.

A separate route is the ckanext-googleanalytics extension (CKAN community). Automated tests on the main branch run on CKAN 2.10, 2.11 and 2.12. The chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md) notes that the extension's documentation names versions up to 2.11. Web server logs remain a third method when you need to see requests that the page does not count.

Dataverse has an ordinary download counter without additional installation. Counting under Make Data Count rules is a separate program, Counter Processor, run daily, with exchange with DataCite. Make Data Count collects views, downloads and citations of research data according to the COUNTER rules for data. Citations from this exchange arrive only for datasets with a DOI. An installation on Handle can count views and downloads locally, but they are not sent to the DataCite hub.

In InvenioRDM since release v12, view and download statistics ship with the platform and follow the same COUNTER and Make Data Count rules. By default the record shows unique views and downloads: a repeat visit from the same source is not added a second time. The current release in the line is v14.

In Socrata statistics are part of the service. The Site Analytics dataset counts page views, downloads and reads through the API, so programmatic access is visible in this system. In udata the counters are in the dataset record. On data.gouv.fr on 14 October 2026, for the dataset "Trajets réalisés en covoiturage" (the register of verified carpooling trips), the API showed 18,334,348 views and 63,155 file downloads. The numbers side by side answer different questions: the page and the file. For a demand report, take the number that matches the way the data is used.

Check: open the statistics of a dataset downloaded by script and of a dataset opened in a browser. If the first shows zeros, the counter sees only pages.

## Feedback

A "found an error" button, a discussion on the dataset page, a "request a dataset" form, a showcase of reuses. A reuse is an application, article or visualisation based on a dataset and linked to its page. For a public authority's portal this is a way to see demand. For an archive where data is deposited under grant rules, a contact in the description is enough.

A form without a person who reads it is worse than a contact on the dataset page: messages pile up, and the user assumes the request has been accepted. Before adding a form or a showcase, name who is responsible and within what time.

In udata, discussions and reuses are in the core. On data.gouv.fr on 14 October 2026 the portal summary showed 17,732 discussions and 5,996 reuses. The same carpooling dataset had 23 discussions, 19 of them still open, and 5 reuses. A message counter does not say whether anyone replied.

In CKAN a reuse showcase comes from the ckanext-showcase extension. It is maintained by the CKAN community; tests on the main branch run on 2.10, 2.11 and 2.12, and the latest release as of 14 October 2026 is 1.8.4 of 22 July 2025. On CKAN 2.12, file storage is configured separately for showcase images. "About the portal" pages come from ckanext-pages, also from the CKAN community. Its latest release is v0.5.2 of 7 June 2023. Support for CKAN 2.12 was merged into the main branch on 26 June 2026, with no release since: on 2.12 the extension is installed from the main branch. The tests of that branch include 2.10, 2.11 and 2.12. At a core upgrade this is a separate check even when tests are green: there is nothing to install except a snapshot of the branch.

In Dataverse a dataset page has a contact, and a restricted file has an access request. This is core. The guestbook on download records a visit; it does not replace a message to the owner.

Check: send an error report about one dataset and see whether it reached the data owner. A shared mailbox nobody opens fails the check.

## How it is done in platforms

The marks are core, extension, no, not checked, as in the [summary table](../12-appendices/03-platform-tables.md). "Core" here means "ships with the platform". A CKAN plugin that sits in the same distribution and only needs enabling is recorded as core. Checked against documentation and live portals on 14 October 2026.

<div className="wide-table">

| Platform | Search | Preview | Translated records | Harvesting | Statistics | Feedback |
|-----------|-------|--------------|------------------|------|------------|----------------|
| CKAN 2.12 | core (Solr) | core (view types); table with DataStore; CSV loading via XLoader; map via ckanext-geoview | extension (ckanext-fluent and scheming); buttons in the core | extension (harvest, dcat, spatial) | core (the tracking plugin, page views); ckanext-googleanalytics is an extension | showcase and pages are extensions; contact is a record field |
| Dataverse 6.12 | core (Solr) | mechanism in the core, viewers installed by the administrator | interface language is a setting; field translation if the schema has it | core (OAI-PMH client) | download counter in the core; Make Data Count is a separate program | contact and access request in the core |
| InvenioRDM v14 | core (OpenSearch) | core | interface language is a setting | not checked | core since v12 (COUNTER, Make Data Count) | not checked |
| GeoNetwork 4.4 | core (Elasticsearch) | layer map in the core | core (languages in the ISO record and in the interface) | core | not checked | not checked |
| udata | core (Elasticsearch) | not checked | not checked | core (six harvesters, off by default) | the core stores counters | core (discussions and reuses) |
| Huwise | core | not checked | not checked | core (CSW enabled on request) | not checked | not checked |
| Socrata | core | core (table and exploration canvas) | not checked | core (Catalog Connector) | core (views, downloads, API reads) | not checked |
| ArcGIS Hub | core | not checked | not checked | not checked | not checked | not checked |
| JKAN, a static site | a JSON filter in the browser, no API | no | no: the author writes the text | not in the template; a script is written separately | no | a contact in the page text |

</div>

A "not checked" cell means the documentation in this check gave no answer. Before choosing a platform, settle it from that platform's guide.

## Example: a city copies a large portal

In brief, this is what a justification looks like using the [decision record](../06-choice/04-justifying-decisions.md) template:

- **Context.** A city publishes about 40 datasets in one official language, with no other catalogs to harvest. The national portal's feature list was copied into the specification: search with filters, table and map preview, three languages, harvesting district portals, statistics for the annual report, a "found an error" form and a reuse showcase.
- **Options.** Require the whole list and cover it with CKAN extensions. Take Socrata or another cloud service where the table and statistics are already part of the service. Put search and a contact in the requirements, and record the rest as rejected with a threshold for revisiting.
- **Criteria.** The number of datasets and the number of languages in which records will actually be maintained. Whether there are other catalogs the city is obliged to harvest. Whether a person is named who reads the form and updates translations.
- **Decision.** The requirements keep search by title and description and a contact on the dataset page. A table preview is desirable only together with table storage, for the CSVs loaded there. Record translation, harvesting, the showcase and statistics for the report are not in this round.
- **Why.** The full list of CKAN extensions does not pass the threshold: there is no second language, districts do not hand their catalogs to the city, nobody is available to read the form, and every extension is checked at each core upgrade. Socrata, where the table and statistics are already in the service, fails the same threshold: these features do not become a task just because they are included in the subscription. Search and a contact cover today's 40 datasets.
- **When to revisit.** There are more than a few hundred datasets and a word from a description cannot be found. A second official language has appeared and a person is named to maintain translated records. The city has been tasked with harvesting district catalogs. A staff member and a response time have been assigned to the form.

## Publishing without a portal

On a static site and in a Git repository, almost all six capabilities are left to the page author.

Search means site search provided by the platform or a list with clear titles. The author adds a separate index when there are many pages. There is no preview in the catalog sense. GitHub shows a small CSV or TSV as a table; the platform's limits are covered in the chapter [on formats](../02-data/02-formats-and-units.md). There is one language, the one the page is written in; a second language means a second page, which also has to be findable by search. There is no harvesting of other catalogs. The platform's statistics count visits to the repository or site and miss those who took a file by direct link. Feedback is an address in the page text and issues in the repository, if someone reads them.

This is enough for a small set of pages. The thresholds from the table above are the same here: hundreds of files, a second language, an obligation to harvest other catalogs and a report on API demand bring you back to a catalog. How to make such a publication findable is covered in the chapter ["Making a Publication Findable"](../08-beyond-portals/05-making-it-findable.md).

## How to check a live portal

The commands below were run on 14 October 2026.

Search by a word that is not in the default-language title but is in the translated title. CKAN's response gives the number of datasets found in `result.count`:

```bash
curl -s "https://data.gov.gr/api/3/action/package_search?q=Guarantees&rows=1"
```

On that day the count was 6. The first dataset's Greek title is about state guarantees for December 2023; the English one contains the word Guarantees.

A format filter. The count is in the same field:

```bash
curl -s "https://data.gov.gr/api/3/action/package_search?fq=res_format:CSV&rows=0"
```

Comparing a translation with the original record. Look at `title_translated` and `notes_translated`:

```bash
curl -s "https://data.gov.gr/api/3/action/package_show?id=eggyiseis-ellinikoy-dimosioy-dekemvrioy-2022"
```

Page views, if the tracking plugin is enabled on CKAN. The search or record response has a `tracking_summary` object with `total` and `recent` fields.

A udata portal summary: the number of datasets, discussions and reuses is in `metrics`.

```bash
curl -s "https://www.data.gouv.fr/api/1/site/"
```

The list of harvest sources and the number of records, in the `total` field:

```bash
curl -s "https://www.data.gouv.fr/api/1/harvest/sources/?page_size=1"
```

For a single source, look at `last_job.status`, `last_job.ended` and `last_job.items`. For the Landivisiau source that night the status was `done`, with no errors and 4 datasets.

On any other portal, the same questions without these addresses: a word from the middle of a description is found; there are filters by organisation and format when there are hundreds of datasets; a restricted file's preview is empty; after switching language, search in that language finds something, and the translated description matches the original; a harvested dataset has a link to the source and the date of the last run; the counter for script downloads is not zero if scripts are the main way of access; an error report reaches the data owner.

## Sources

- [Search in the CKAN 2.12 user guide](https://docs.ckan.org/en/2.12/user-guide.html), [data viewer](https://docs.ckan.org/en/2.12/maintaining/data-viewer.html), [page view tracking](https://docs.ckan.org/en/2.12/maintaining/tracking.html), [DataStore](https://docs.ckan.org/en/2.12/maintaining/datastore.html), interface languages via the `ckan.locales_offered` and `ckan.locale_default` keys in the [CKAN 2.12 config declaration](https://github.com/ckan/ckan/blob/2.12/ckan/config/config_declaration.yaml)
- [ckanext-fluent](https://github.com/ckan/ckanext-fluent), [ckanext-scheming](https://github.com/ckan/ckanext-scheming), [ckanext-harvest](https://github.com/ckan/ckanext-harvest), [ckanext-spatial](https://github.com/ckan/ckanext-spatial), [ckanext-googleanalytics](https://github.com/ckan/ckanext-googleanalytics), [ckanext-showcase](https://github.com/ckan/ckanext-showcase), [ckanext-pages](https://github.com/ckan/ckanext-pages), [XLoader](https://github.com/ckan/ckanext-xloader), [ckanext-geoview](https://github.com/ckan/ckanext-geoview): automated test files and releases, 14 October 2026. ckanext-pages's latest release, v0.5.2, is from 7 June 2023; CKAN 2.12 support was merged into the main branch on 26 June 2026. ckanext-showcase's latest release is 1.8.4 of 22 July 2025
- [Dataverse 6.12 external tools](https://guides.dataverse.org/en/6.12/admin/external-tools.html), [dataverse-previewers](https://github.com/gdcc/dataverse-previewers), [preview and restricted files](https://guides.dataverse.org/en/6.12/user/dataset-management.html), [harvesting client](https://guides.dataverse.org/en/6.12/admin/harvestclients.html), [Make Data Count](https://guides.dataverse.org/en/6.12/admin/make-data-count.html), [Solr in the installation prerequisites](https://guides.dataverse.org/en/6.12/installation/prerequisites.html), [interface languages](https://guides.dataverse.org/en/6.12/installation/config.html)
- [Invenio previewers](https://invenio-previewer.readthedocs.io/en/latest/usage.html), [statistics in the v12 release notes](https://inveniordm.docs.cern.ch/releases/v12/version-v12.0.0/), [interface languages](https://inveniordm.docs.cern.ch/operate/customize/i18n-and-l10n/), OpenSearch in the [InvenioRDM installation guide](https://inveniordm.docs.cern.ch/install/)
- [GeoNetwork 4.4 interface languages](https://docs.geonetwork-opensource.org/4.4/administrator-guide/configuring-the-catalog/user-interface-configuration/), [multilingual fields in the index](https://docs.geonetwork-opensource.org/4.4/customizing-application/configuring-search-fields/), [installing Elasticsearch](https://docs.geonetwork-opensource.org/4.4/install-guide/installing-index/)
- [Harvesting in udata](https://udata.readthedocs.io/en/stable/harvesting/): six harvesters, off by default; search is updated by a separate index rebuild
- [Huwise harvesters](https://userguide.huwise.com/en/categories/480514), checked 14 October 2026; CSW harvesting is off by default: [CSW harvester](https://userguide.huwise.com/en/articles/2022594)
- [Socrata's Catalog Connector](https://support.socrata.com/hc/en-us/articles/223722647-Using-the-Catalog-Connector-to-Federate-and-Connect-External-Assets): datasets from `data.json` become public after synchronisation; [Site Analytics: views, downloads and API reads](https://support.socrata.com/hc/en-us/articles/360051223314-Site-Analytics-Asset-Access)
- [Piveau](https://doc.piveau.io/)
- The data.gov.gr and data.gouv.fr APIs, 14 October 2026: search for the word Guarantees, the CSV filter, the December 2022 dataset record, the portal summary and the list of harvest sources
- [Federation and Harvesting](../07-publishing/03-federation-and-harvesting.md)
- [Capability Map](./01-capability-map.md)
