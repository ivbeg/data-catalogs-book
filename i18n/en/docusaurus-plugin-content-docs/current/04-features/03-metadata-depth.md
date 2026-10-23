---
title: Metadata Completeness and Depth
description: Which dataset description fields everyone needs and which only some sectors need, how custom fields and data dictionaries work in platforms, and how to check that a description is filled in for real, not just to tick a box.
---

# Metadata Completeness and Depth

A dataset description does two jobs: it is how the dataset is found, and it is how people decide whether they may use it. Hence the main practical conclusion of the chapter. A short mandatory part that every publisher fills in and a program checks. Subject-specific fields only where data cannot be understood without them. A data dictionary for every table. And no placeholder values: an empty field is visible at once, while a placeholder looks filled in and misleads both people and programs.

The chapter covers what standards require and what they do not, how platforms let you add your own fields and describe table columns, and how to check in half an hour how honestly descriptions are filled in on a live portal. The check at the end of the chapter was done on two national portals, the Greek and the French, and shows how a formally complete description turns out to be empty.

## What it is

Three properties of a description are often confused.

**Completeness**: what share of the required fields is filled in. It is counted across datasets: how many datasets out of a hundred have a licence, a period, a publisher.

**Depth**: how detailed the schema itself is: only a title and description, or also period, territory, methodology, list of columns. Depth is set by the platform and the catalog owner; completeness is provided by publishers.

**Accuracy**: whether what is written in the field is true. A period of "1900–2099" for a table covering one year, a description that repeats the title, a territory of "the whole country" for data from one district. Formally the field is filled in; in substance it is not.

A platform can be detailed and still empty: twenty mandatory fields, each holding a dash. And the other way round: a short schema filled in honestly is more useful than a long questionnaire. An extreme case is the computational chemistry catalog ioChem-BD on DSpace: the title of its datasets is often just a numeric code, for example ["000112758"](https://iochem-bd.bsc.es/browse/handle/100/87916). A chemist who knows what they are looking for will open such a dataset from a link in a paper. Neither the catalog's search nor dataset search engines will find it.

## Why it is needed

**To be found.** Search and filters work only on filled-in fields. A dataset without a period will not appear in the "2020–2024" filter, a dataset without a theme will not appear under "Transport". Dataset search engines are stricter: Google accepts dataset markup only if it has a title and a description between 50 and 5,000 characters long.

**To decide whether it may be used.** Without a licence the user's rights are undefined, even if the file downloads: what may be done with the data depends on the country's law and on whether the data is protected at all. A careful user will not take such a dataset. Without a publisher and contact there is no one to ask a question or report an error to.

**To understand what is inside.** A `sum_2` column without a data dictionary is open in form and closed in meaning. In 2021 Russia's Federal Water Resources Agency opened the "Water Data" system with dataset passports, an API and digitally signed files. The passports had no description of the field structure, and one field in the register of water users held the owner's name, address and taxpayer number together. The data is there, the documentation is not.

**So that a dataset outlives its authors.** In ten years nobody will remember what code `7` in the "status" column means. That is why archives and research repositories describe things in more detail than open data portals: they work for a future reader, not for today's report. Five models of working with metadata (scientific, archival, public-sector and civic, technological and commercial) are covered in the chapter [on classifying catalogs](../03-types/01-classification.md). The model determines what depth of description is normal for a catalog.

**So that a harvester does not have to guess.** An aggregator that collects descriptions from many catalogs is forced, when a dataset description is poor, to substitute properties of the catalog itself: if the whole catalog is about healthcare, its datasets get the theme "health". This is how the Dateno search engine handles layers from ArcGIS and GeoServer servers, which have almost no description of their own. It is better than nothing, but the precision of such search is the precision of a guess.

## Four levels of description

**The minimum**, without which a dataset cannot be used:

- a title and a description in plain language that does not repeat the title;
- who published it and how to contact them;
- a licence;
- the date the data was last updated, not the date the record was edited;
- a permanent address.

This is enough to find a dataset and understand whether it may be used.

**The recommended level** adds what makes a dataset easy to filter and to keep updated:

- temporal and spatial coverage;
- how often it is updated;
- a theme from a shared vocabulary;
- file format and size;
- language.

**The subject level** is needed where data cannot be interpreted without it:

- statistics: methodology, unit of measure, breaks in series;
- geodata: coordinate reference system, scale, feature type;
- research: authors with ORCID, funding, link to the paper;
- microdata: sample, questionnaire, access levels.

**Content description** is a data dictionary: what each column means, its type and unit, what an empty cell means. This is metadata no longer about the dataset but about its contents, and it is organised separately. See the section ["Data dictionary"](#data-dictionary) below.

How data dates differ from record dates is covered in the chapter ["Anatomy of a Catalog"](../01-basics/03-anatomy.md). In short: if the platform does not distinguish them, the "updated" date tells you about an edit to the description, not about how fresh the data is.

## What standards require and what they do not

A standard's mandatory fields are the minimum for exchange between programs, not the minimum for usefulness. The most surprising thing in the table below is where the licence ends up.

| Standard | Mandatory | Important but not mandatory |
|----------|-------------|----------------------------|
| DCAT-AP 3.0.1, the EU portal profile | for a dataset, title and description; for a distribution, access URL | a dataset has 7 recommended properties: contact, distribution, spatial coverage, keywords, publisher, temporal coverage, theme. Another 27 are optional, including issue date, modification date and update frequency. Licence is a recommended property of the distribution, not of the dataset |
| The DataCite schema, used to register DOIs | identifier, creator, title, publisher, publication year, resource type | description, subject, dates, geolocation are recommended; licence, language, format, size, version, funding are optional |
| schema.org/Dataset per Google's requirements | name, description from 50 to 5,000 characters | licence, creator, temporal coverage, spatial coverage, variables measured, identifier are recommended |

Two conclusions follow.

First: build your own list of mandatory fields from the user's needs, do not copy it from a standard. Licence, update date and period are mandatory for the user, although none of the three standards calls them that.

Second: in DCAT-AP the licence lives on the file. A platform built on the profile stores it there too, and a check of "does the dataset have a licence" will give the wrong answer on it. An example is in the section [on checking a live portal](#how-to-check-a-live-portal).

If a value is genuinely unknown, it is more honest to say so than to invent one. The DataCite schema has standard codes for this: `:unkn` for unknown, `:none` for no value, `:null` for deliberately empty. The cost of such honesty shows in an example from the DataCite documentation: a citation of a dataset about which almost nothing is known looks like `:unkn (2020). :none. :null.` But nobody will mistake it for a complete one.

## Implementation options

Platforms let you configure the description schema in five ways. The way determines who can change the fields and what it costs at upgrade time.

**A fixed schema.** Fields are set by the platform and cannot be changed, or only by editing code. Lightweight catalogs such as JKAN and a static site work this way: the template author writes the schema, and fields are not validated. ArcGIS Online and ArcGIS Hub sites have no custom fields, but the administrator chooses one metadata style for the organisation from ready-made standards: ISO 19139, ISO 19115-3, INSPIRE, FGDC, the North American Profile of ISO 19115 or Dublin Core+. Organisations created after July 2025 have Dublin Core+ by default, older ones ISO 19139.

**A schema from a file.** The administrator describes fields in a file, and the platform builds a form and validation from it.

- In CKAN this is done by the ckanext-scheming extension. The schema is written in JSON or YAML and defines fields for datasets, resources, organisations and groups: whether they are required, lists of allowed values, ready-made field presets, validation functions. Since CKAN 2.12 required fields can be skipped for a draft until it is published.
- In DKAN the dataset schema is a JSON Schema file, based on DCAT-US by default. Your own file replaces the standard one, and everything entering the catalog is validated against it. The documentation warns: change the schema carefully when the catalog already holds datasets; an incompatible edit breaks validation of old records.
- In DSpace fields come from the metadata schema registry (Dublin Core by default), and input forms are described in the `submission-forms.xml` file. A field can be shown only for a certain type of item, for example only for a dataset. After editing the forms the server is restarted.

**Blocks and profiles.** The platform ships ready-made field sets for sectors; you enable them and add your own.

- Dataverse has seven supported blocks: citation, geospatial, social sciences and humanities, astronomy, life sciences, journals, 3D objects. There are experimental ones too: CodeMeta for software, computational workflows, archival information, Local Contexts labels for Indigenous knowledge. The collection administrator decides which fields are mandatory in it. A custom block is described in a TSV file and loaded through the API. The documentation reminds you separately: new fields must also be added to the Solr search index schema, otherwise they cannot be searched.
- GeoNetwork 4.4 has ISO 19139, ISO 19115-3, Dublin Core and ISO 19110 in its core; the last is a feature catalogue, that is, a data dictionary for geodata. National profiles are installed as schema plugins: Swiss, Canadian HNAP, Dutch, Italian RNDT, British GEMINI, and also DCAT-AP.
- InvenioRDM stores descriptions according to the DataCite schema. Resource type, title, publication date and creators are mandatory. Ready-made additional fields cover journal, imprint, thesis, conference details, and CodeMeta for software. Custom fields are defined in the site configuration and arranged into sections of the form.

**Templates in a cloud service.** The administrator creates custom fields in the web interface, without a programmer.

- In Huwise (formerly OpenDataSoft) the basic "Standard" template cannot be changed or deleted. Next to it you enable compatibility templates (DCAT, INSPIRE) and your own: the administrator creates fields with a type, allowed values and rules, and enables translation per field. Separate administrative templates are visible only in the back office.
- In Socrata (Tyler Data & Insights) custom fields are grouped into fieldsets. Each field has its own requiredness (a dataset cannot be published without a required field) and visibility: to everyone or to staff only. A field can carry a validation in the SoQL query language, including one that depends on other fields, and an audit tool shows which datasets break the rules. Only fields with predefined names from the "Common Core" set go into the `data.json` file for data.gov.

**A template as part of the standard.** A full standard is too big for a publisher: DDI or ISO 19115 has hundreds of elements. A good solution is in the World Bank's metadata editor, used by microdata catalogs on NADA. For each data type it has two kinds of ready-made templates, both read-only: a full one with all elements of the standard, and a recommended one with only the main ones. An organisation copies a template and edits the copy: removes what it does not need, changes labels, makes fields mandatory. The standard and the export stay shared, while each publisher has its own form. The same technique works on any platform: one schema, different forms for different publishers.

## Data dictionary

A data dictionary describes the columns of a table: name, readable label, meaning, type, unit of measure, allowed values, how missing values are marked. Without it a table is open in form and unintelligible in substance. In the [Parnitha weather station](https://data.gov.gr/dataset/emy-station-189) dataset on data.gov.gr, all 57 columns in the table store are recorded as text, including temperature and pressure, and none has a description. The record is analysed in full in the chapter ["Anatomy of a Catalog"](../01-basics/03-anatomy.md).

A dictionary has several machine-readable forms; choose the one accepted in your sector:

| Form | Where it is used |
|-------|-----------------|
| Table Schema from the Frictionless family, usually inside a `datapackage.json` file | open data, publishing in a Git repository, automated file validation |
| CSV on the Web (CSVW), a 2015 W3C Recommendation | tables with linked data; Google, in beta, reads a table's dictionary in this form directly from page markup |
| DDI variables | microdata: each variable has the question text, response codes, frequencies |
| ISO 19110, feature catalogue | geodata: feature types of a layer and their attributes |
| Croissant fields and record sets | datasets for machine learning |
| SDMX structure | indicators: dimensions, code lists, attributes |

A dictionary is doubly useful if the file itself is validated against it. Then "number" in the dictionary means the column really holds numbers, not the text "n/a". In France this is organised at national level: the [schema.data.gouv.fr](https://schema.data.gouv.fr) catalog had 106 shared schemas in October 2026, 69 of them in Table Schema. A dataset resource on data.gouv.fr references a schema, and the portal validates the file against it. A shared schema for one topic, for example electric vehicle charging stations, lets files from hundreds of publishers be merged into one table. But even there a link to a schema is rare: in a sample of a thousand datasets, 36 had one.

In DCAT, the link between a dataset and a standard is recorded with the `dct:conformsTo` field: it says which schema or sector standard the file conforms to. Sector data standards themselves (OCDS, GTFS, Darwin Core and others) are covered in the chapter [on what is published](../02-data/01-what-is-published.md#domain-standards).

## When detail does harm

A mandatory schema of fifty fields slows publication down. Fields start being filled in formally: a description is copied from a neighbouring dataset, the title is repeated in the description, today's date goes into "data period". Worst of all is when the program itself does this: it substitutes a default value so that the form passes validation. What this looks like on a national portal is shown below, in the data.gov.gr check.

Hence three rules.

- A short mandatory schema with optional subject fields is better than a long questionnaire nobody reads.
- A field the publisher may not know must not have a default value. An empty field is visible in any check; a placeholder is visible in none.
- Test whether a field should be mandatory on three to five real publishers before launch. If half of them cannot fill it in, make the field optional or help fill it in, with a vocabulary, a hint, or automatic calculation from the file.

Custom fields are needed if a sector vocabulary or the law requires an attribute that the standard schema lacks: the high-value dataset category, the legal basis for publication, a funding programme code. They are not needed if you want to keep an internal number from an accounting system "just in case". The opposite extreme also occurs: carefully describing what does not need cataloguing at all, for example every service dump of an intermediate calculation.

## When it is needed and when not

| Situation | What to do | What usually covers it |
|----------|-------------|----------------------|
| An open data portal in the EU harvested by the national portal | DCAT-AP and the national profile; a licence on every file; themes and frequency from EU vocabularies | CKAN with scheming and ckanext-dcat, Piveau, Huwise with the DCAT template |
| A small municipal portal | minimum and recommended levels; no custom fields; a data dictionary for tables | the fixed schema of a cloud service, or CKAN without scheming |
| A research repository | DataCite plus a discipline block; authors with ORCID, link to the paper | Dataverse with sector blocks, InvenioRDM with custom fields |
| A geoportal | ISO 19139 or ISO 19115-3, the country profile, a feature catalogue for vector layers | GeoNetwork with a profile plugin, an ISO style in ArcGIS |
| A microdata catalog | DDI with variable descriptions | NADA with the metadata editor, Dataverse |
| An indicator catalog | SDMX structure, methodology, units | see the chapter [on indicator catalogs](../03-types/05-indicator-catalogs.md) |
| Publishing without a portal | a README file, `datapackage.json` with a dictionary, schema.org markup on the page | this book's templates, validation in CI |

A custom field schema is worth creating when the law, the upper-level portal's profile or the sector requires it. It is not worth creating for the sake of a complete questionnaire: each field is work for the publisher on every dataset and work for the administrator at every platform upgrade.

In brief, this is what a justification looks like using the [decision record](../06-choice/04-justifying-decisions.md) template:

- **Context.** A regional portal on CKAN; the national profile requires two fields the core lacks: the high-value dataset category and the legal basis.
- **Options.** Write values into free-form extra fields (`extras`); install ckanext-scheming; move to a cloud service with templates.
- **Criteria.** Validation of values on input, export to DCAT-AP, cost of upgrades.
- **Decision.** ckanext-scheming with a YAML schema and ckanext-dcat with the country profile.
- **Why.** Free-form fields are not validated and end up in the export under arbitrary names. Moving to a cloud service for two fields costs more than one extension maintained by the CKAN community.
- **When to revisit.** If the country profile starts being shipped as a ready-made extension, or if the number of mandatory custom fields grows beyond a dozen.

## How it is done in platforms

The marks are core, extension, no, not checked, as in the [summary table](../12-appendices/03-platform-tables.md). Checked against platform documentation on 12 October 2026.

| Platform | Custom description fields | Table data dictionary | What is important to know |
|-----------|--------------------|------------------------|-----------------|
| CKAN 2.12 | extension [ckanext-scheming](https://github.com/ckan/ckanext-scheming): a schema in JSON or YAML | core: a dictionary for tables in the DataStore (label, description, column type); since 2.11 also Table Designer, a table with a schema and value validation | multilingual descriptions are the ckanext-fluent extension; validating files against Table Schema is the ckanext-validation extension, see below |
| DKAN | core: replacing the JSON Schema file | not checked | DCAT-US schema by default; changing it on a live catalog is risky |
| Huwise (OpenDataSoft) | core: custom field templates, administrative templates | core: label, description and one of 12 types for each field; the "Schema" tab shows the fill rate of each column | the basic template cannot be changed |
| Socrata | core: custom fieldsets with requiredness and SoQL validation | core: column name, description and type, served at `/api/views/ID.json` | only "Common Core" fields go into `data.json` |
| ArcGIS Online and Hub | no: one style from ready-made standards per organisation | core: field descriptions, value types and lists of allowed values on a hosted layer | the layer description and the item description in the catalog are not synchronised |
| Dataverse | core: sector blocks and custom blocks in TSV | core: for uploaded tables (SPSS, Stata, R, Excel, CSV), variables are described in DDI | new fields must be added to the Solr index schema |
| InvenioRDM | core: custom fields in configuration | no | based on the DataCite schema |
| DSpace | core: schema registry and `submission-forms.xml` | no | editing forms requires a restart |
| GeoNetwork 4.4 | core: ISO 19139, ISO 19115-3, Dublin Core; country profile as a schema plugin | core: ISO 19110 feature catalogue | the plugin must match your exact GeoNetwork version |
| NADA | not checked | core: DDI variables with frequencies | field templates live in the separate World Bank metadata editor |
| JKAN and a static site | no: fields are set by the template | no: the dictionary is put next to the data as a file | validation is written by the site author |

A flexible schema almost always means maintenance: someone has to decide which field is mandatory and keep the schema from sprawling. The deeper custom fields are built into the platform, the more expensive each upgrade.

### Extensions and their risks

Custom fields and data dictionaries are where the cost of extensions is most visible. The method for evaluating an extension is in the chapter [on extension ecosystems](../05-platforms/02-extension-ecosystems.md); here is what turned up during the check.

- **ckanext-scheming and ckanext-fluent** are maintained by the CKAN community, with automated tests on CKAN 2.10, 2.11 and 2.12. They are a normal part of a mature CKAN portal, not something exotic. Details are in the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md).
- **ckanext-validation** validates uploaded tables against Table Schema using Frictionless. In the main Frictionless Data repository in October 2026, compatibility is declared only with CKAN 2.9; the compatibility table says "no" for 2.10 and 2.11, and tests run only on 2.9. The living branch is the Queensland Government fork [qld-gov-au/ckanext-validation](https://github.com/qld-gov-au/ckanext-validation): its tests run on CKAN 2.10, 2.11 and 2.12. This is a typical fate for an extension: the original author stepped back, and one of the users maintains the working version. Before installing, check the repository and branch, not the name.
- **GeoNetwork schema plugins** are tied to the core version: a plugin has its own branch for each GeoNetwork line. One plugin can have copies in different places, and they diverge. The British GEMINI 2.3 profile is maintained by Astun Technology, and its repository has a branch for GeoNetwork 4.4. The shared metadata101 collection of plugins holds a copy that has not been updated since February 2023 and goes only up to 4.2.
- **Custom Dataverse blocks and a custom DKAN schema** are not extensions but core configuration. They too are checked at every upgrade: a Dataverse block needs a matching index schema, and an incompatible edit to the DKAN schema breaks validation of old records.

## Publishing without a portal

Without a portal, completeness of description is entirely up to the author: no form will demand a licence. On the other hand, depth is not limited by anything. Three files next to the data are enough:

- `README.md`: what it is, for what period, who is responsible, how it is updated, the licence;
- `datapackage.json`: the list of files and the data dictionary of each table in Table Schema;
- schema.org/Dataset markup on the dataset page, if the dataset has its own website.

Ready-made [README](pathname:///templates/README.md), [datapackage.json](pathname:///templates/datapackage.json) and [schema.org markup](pathname:///templates/schema-dataset.jsonld) are in the book's templates. Validation can be left to a program: the command `frictionless validate datapackage.json`, run in the repository's CI on every change, checks files against the dictionary and will not let a table be published where text has appeared in a numeric column. How to set up such a repository is covered in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md).

## How to check a live portal

A manual check is still the best first step:

1. Open ten random datasets from different organisations, not the most recent ones.
2. For each, note whether licence, publisher, contact, update date, period and territory are filled in.
3. Compare the description with the title: does it just repeat it?
4. See whether a tabular dataset has a data dictionary and whether the column types match the contents.
5. Check whether values look true: the period against the file's contents, the territory against the publisher.

The fifth step matters more than the others. A profile validator and the metadata quality assessment on data.europa.eu (MQA) check that a field exists, not that it is true. A placeholder passes both.

### Two checks on a sample

On a large portal the check is done by a program. On 12 October 2026 a thousand datasets were taken through the API on each of two national portals: ten blocks of a hundred datasets, spread evenly across the whole catalog. The figures are a snapshot for that day.

**data.gov.gr** is Greece's national portal on CKAN 2.11 with a DCAT-AP-based schema, about 22,700 datasets in total. The sample included datasets from 118 organisations.

| Field | Looks filled in | Filled in for real |
|------|------------------------|------------------------|
| Period | 97% | 938 datasets out of 1,000 have the period "1900-01-01 to 2099-12-31", the same for a ministry, the state archive and dozens of municipalities. The program put it there, not the publisher |
| Territory | 96% | for 60% the territory name is an empty string, for another 35% it is the whole of Greece |
| Contact and publisher | 24% and 31% | 22% and 28%: in some records all contact fields are empty strings |
| Description | 94% | 31% have a description shorter than 50 characters, 22% repeat the title word for word |
| Licence | 32% of datasets, if you look for it on the dataset | 99% of datasets, if you look for it on the files, as DCAT-AP requires |
| Update frequency | 36% | 32% of the sample has the value "not planned"; only 4% have a real frequency |

The placeholder period also goes into the DCAT export harvested by the European portal: the dataset description contains `dcat:startDate "1900-01-01"` and `dcat:endDate "2099-12-31"`, next to an empty English title. The harvester and the quality assessment will see the period as filled in for almost every dataset in the country.

**data.gouv.fr** is France's national portal on udata, about 74,400 datasets in total; 78% of the sample was harvested from other catalogs. udata has its own built-in description quality score in the core: nine equal criteria, from licence and period to file availability. The API returns it for each dataset, and the site shows it next to the record. The median for the sample is 5 out of 9.

- The licence is "not specified" for 19% of datasets. Yet the built-in score credited a licence for 98%: according to the udata source code, the criterion is met if the licence field is filled in at all, and "not specified" is also a value.
- A period is given for 23% of datasets; update frequency is "unknown" for 70%.
- Territory: the level of granularity (commune, department) is given for 63%, the territories themselves for 14%.
- A description longer than 100 characters, as the built-in score requires, is present for 73%.

Both portals are good, live and large. That is exactly why the main point is visible on them: formal completeness and real completeness differ several times over, and neither the built-in score nor the external validator notices the gap.

### Commands

For a CKAN portal. The command takes 500 datasets and counts the share of short descriptions, descriptions that repeat the title, licences on the dataset and on files, and the two most common period values. The name of the period field depends on the portal's schema: on data.gov.gr it is `temporal_coverage`; on another portal look it up in the `package_show` response.

```bash
PORTAL=https://data.gov.gr
curl -s "$PORTAL/api/3/action/package_search?rows=500&start=5000" \
  | jq '.result.results as $r | ($r | length) as $n | {
      datasets: $n,
      short_description: ([$r[] | select((.notes // "") | length < 50)] | length / $n),
      description_is_title: ([$r[] | select((.notes // "" | gsub("^\\s+|\\s+$"; "")) == .title)] | length / $n),
      license_on_dataset: ([$r[] | select((.license_id // "") != "")] | length / $n),
      license_on_files: ([$r[] | select(any(.resources[]; (.license // "") != ""))] | length / $n),
      top_periods: ([$r[] | .temporal_coverage | tostring] | group_by(.) | map({value: .[0], n: length}) | sort_by(-.n) | .[0:2])
    }'
```

The most useful part here is the most common values. If one value appears in most datasets from different organisations, it is a placeholder. The same technique works for territory, update frequency and contact.

For a udata portal. The command compares the licence with the built-in score and counts period and frequency on one page of results:

```bash
curl -s "https://www.data.gouv.fr/api/1/datasets/?page_size=100&page=200" \
  | jq '.data as $d | ($d | length) as $n | {
      datasets: $n,
      license_not_specified: ([$d[] | select(.license == "notspecified")] | length / $n),
      score_counts_license: ([$d[] | select(.quality.license)] | length / $n),
      frequency_unknown: ([$d[] | select(.frequency == "unknown")] | length / $n),
      with_period: ([$d[] | select(.temporal_coverage != null)] | length / $n)
    }'
```

Run the commands several times with different `start` or `page` values so that the sample does not come from a single organisation. For a Socrata portal, the data dictionary and dates are served at `/api/views/DATASET-ID.json`: each column has a name, type and description, and the data update date is recorded separately from the description edit date. How to turn such shares into metrics and what to do with them next is in the chapter [on quality metrics](../10-quality/02-metrics.md).

## What follows from this

- Build your own list of mandatory fields from the user's needs: licence, publisher, contact, data update date, period. Do not stop at the standard's mandatory fields.
- Remove default values from fields the publisher may not know. An empty field is better than a placeholder.
- Require a data dictionary for every table and, where possible, validate the file against it.
- Create custom fields for the law, a profile or a sector, not "just in case". Each field costs work on every dataset and at every platform upgrade.
- Check schema extensions by repository and by the branch for your core version, not by name.
- Measure real completeness: the most common values, titles repeated in descriptions, plausibility of the period. Trust built-in scores and validators only on whether a field exists.

## Sources

- [DCAT-AP 3.0.1](https://semiceu.github.io/DCAT-AP/releases/3.0.1/): mandatory, recommended and optional properties of datasets and distributions; checked 12 October 2026
- [DataCite Metadata Schema](https://datacite-metadata-schema.readthedocs.io/en/latest/properties/overview/): mandatory and recommended properties, codes for unknown values
- [Dataset markup in Google's documentation](https://developers.google.com/search/docs/appearance/structured-data/dataset): mandatory properties, description length, table dictionaries in CSVW
- CKAN 2.12: [ckanext-scheming](https://github.com/ckan/ckanext-scheming), [DataStore data dictionary](https://docs.ckan.org/en/2.12/maintaining/datastore.html), [Table Designer](https://docs.ckan.org/en/2.12/maintaining/table-designer.html), [2.11 changelog](https://github.com/ckan/ckan/blob/master/CHANGELOG.rst)
- ckanext-validation: [the Frictionless Data repository](https://github.com/frictionlessdata/ckanext-validation), with a compatibility table and tests only on CKAN 2.9; [the qld-gov-au fork](https://github.com/qld-gov-au/ckanext-validation), with tests on CKAN 2.10–2.12; checked 12 October 2026
- DKAN: [replacing the dataset schema](https://dkan.readthedocs.io/en/latest/user-guide/guide_custom_schemas.html)
- Dataverse: [supported metadata blocks](https://guides.dataverse.org/en/latest/user/appendix.html), [metadata customisation](https://guides.dataverse.org/en/latest/admin/metadatacustomization.html), [tabular data ingest and variable description](https://guides.dataverse.org/en/latest/user/tabulardataingest/ingestprocess.html)
- InvenioRDM: [metadata reference](https://inveniordm.docs.cern.ch/reference/metadata/), [custom fields](https://inveniordm.docs.cern.ch/operate/customize/metadata/custom_fields/records/)
- DSpace: [submission forms](https://wiki.lyrasis.org/display/DSDOC9x/Submission+User+Interface)
- GeoNetwork: [core schemas in release 4.4.12](https://github.com/geonetwork/core-geonetwork/tree/4.4.12/schemas) of 8 July 2026, [metadata101 plugins](https://github.com/metadata101), [GEMINI 2.3 by Astun Technology](https://github.com/AstunTechnology/iso19139.gemini23)
- Huwise: [metadata templates](https://userguide.huwise.com/en/articles/2032194), [dataset schema](https://userguide.huwise.com/en/articles/2044866), [the "Schema" tab](https://userguide.huwise.com/en/articles/8745538)
- Socrata: [custom metadata](https://support.socrata.com/hc/en-us/articles/4409307605015-Creating-Custom-Metadata), [fields for data.json](https://support.socrata.com/hc/en-us/articles/1500008662522-Configuring-Custom-Metadata-for-data-json)
- ArcGIS: [metadata styles](https://developers.arcgis.com/rest/users-groups-and-items/metadata-reference/), [describing layer fields](https://doc.arcgis.com/en/arcgis-online/manage-data/describe-fields.htm)
- World Bank: [metadata editor and templates](https://worldbank.github.io/metadata-editor-docs/templates_design.html)
- [Table Schema](https://specs.frictionlessdata.io/table-schema/), [CSV on the Web](https://www.w3.org/TR/tabular-data-primer/), [the schema.data.gouv.fr schema catalog](https://schema.data.gouv.fr)
- udata: [how the dataset quality score is calculated](https://github.com/opendatateam/udata/blob/master/udata/core/dataset/models.py)
- Samples: [the data.gov.gr API](https://data.gov.gr/api/3/action/package_search) and [the data.gouv.fr API](https://www.data.gouv.fr/api/1/datasets/), 1,000 datasets each, 12 October 2026; [ioChem-BD, dataset 000112758](https://iochem-bd.bsc.es/browse/handle/100/87916)
- I. Begtin, Telegram (in Russian): [models of working with metadata](https://t.me/begtin/2817), 10 May 2021; [Rosvodresursy's "Water Data"](https://t.me/begtin/3038), 21 August 2021; [ioChem-BD](https://t.me/begtin/6340), 10 January 2025; [catalog properties are passed to datasets](https://t.me/begtin/6363), 15 January 2025; [quality assessment starts with metadata completeness](https://t.me/begtin/7005), 1 August 2025
- [Anatomy of a Catalog](../01-basics/03-anatomy.md), [Metadata Export](./02-metadata-export.md), [Quality Metrics](../10-quality/02-metrics.md), [Metadata Standards](../07-publishing/02-metadata-standards.md)
