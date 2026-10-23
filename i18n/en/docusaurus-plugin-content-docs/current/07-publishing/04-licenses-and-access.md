---
title: Licences and Access Conditions
description: Which licence to put on a dataset, how to record it so a program recognises the text, and how this differs from the conditions of access to a file.
---

# Licences and Access Conditions

A licence answers the question of what you may do with the data. Access conditions answer a different one: who may get the file. These are two fields. A sentence in the site footer fills in neither.

In brief:

- Each open dataset gets one well-known licence: as a link to the text and as the code the harvester expects. The page, the file and the dump all say the same thing.
- For ordinary open data this is CC BY 4.0 or CC0. A home-grown two-page text and the value "not specified" will not be recognised by a harvester.
- If a country's law requires its own document, it is kept for people, and the field for programs gets a well-known licence that does not contradict that document.
- A closed file gets access conditions and a response time. An open licence is not put on it: it promises what the file does not deliver.

The three conditions under which data is called open are in the chapter [on open data portals](../03-types/02-open-data-portals.md). Who sees the record and who downloads the file is in the chapter [on roles and access](../04-features/08-access-control-and-workflow.md).

## Four labels that get confused

| Label | Which question it answers | Where it is written |
|---------|--------------------------|---------------|
| Licence | what may be done with the data: copy, change, use in work, including commercial work | the dataset field and each file's field, the same link in the dump |
| Access conditions | who gets the file and what they must do for it | the access field on the record: open, after registration, on request, only in a secure environment |
| Site rules | how to behave on the portal: do not overload the server, do not pretend to be the owner | a "Terms of use" page, not a dataset field |
| Attribution and citation in an article | how to name the author | a licence may require attribution; scholarly citation works separately, see the chapter [on citation](../04-features/07-citation.md) |

A common contradiction: the dataset says CC BY, while the site rules say "non-commercial use only". Then it is unclear which text prevails. Keep one.

## What counts as an open licence

The [Open Definition](https://opendefinition.org/od/2.1/en/) (version 2.1) calls open what anyone can freely access, use, modify and share. Attribution may be required. Requiring a derived database to remain under the same terms is also allowed. A ban on commercial use, a ban on modification and a "ask for permission" formula are not open data by this definition.

Hence a practical list.

| Licence | What it permits | When it is used |
|----------|----------------|----------------|
| [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | a waiver of rights as far as the law allows; attribution is not required | reference lists and facts that should flow into other databases without friction |
| [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | copy and change, including for commercial purposes, with attribution | the usual choice for open data |
| [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | the same, but derivative works stay under the same terms | when it matters that adaptations stay open, and the dataset is not going to be mixed with other databases |
| [ODbL 1.0](https://opendatacommons.org/licenses/odbl/) | a licence for a database; a derived database is shared under the same terms | databases run as databases. This is how the OpenStreetMap map is published |
| National open licence | close in meaning to attribution | when it is already customary in the country and the text is on the harvester's list |

The version is written explicitly: "4.0", not "CC BY". The CC BY 4.0 text separately covers the sui generis database right recognised in the European Union. The high-value datasets regulation names this version too. Article 4(3) of [Regulation (EU) 2023/138](https://eur-lex.europa.eu/eli/reg_impl/2023/138/oj) requires such datasets to be made available under CC0, or CC BY 4.0, or an equivalent or more permissive open licence. CC BY-SA and ODbL are stricter: a derived database must keep the same text. They are not suitable for high-value datasets. Two share-alike licences also mix badly with each other: one database cannot carry two such texts at once. If the goal is for the dataset to be taken into other people's databases, use CC BY 4.0 or CC0.

CC BY-NC and CC BY-ND are not on this list. The first prohibits commercial use, the second prohibits modification.

## Which one to use

| Situation | Licence |
|----------|----------|
| A reference list that should be copied into other databases without extra conditions | CC0 1.0 |
| An ordinary open dataset from a public authority, research or a company | CC BY 4.0 |
| A high-value dataset under EU Regulation 2023/138 | CC0 or CC BY 4.0, or a national licence no stricter than them |
| Adaptations must stay open, and nobody plans to mix the database with others | CC BY-SA 4.0 or, for a database, ODbL |
| The country already has its own open licence, and the harvester recognises it | that licence |
| The law requires a national text that has no code on the harvester's list | the text for people, and next to it a well-known licence that does not contradict it |
| The file is closed | access conditions, not an open licence |
| A program sits next to the data | the program has its own licence, the table its own |

National texts that harvesters already know: the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) in the UK, the [Licence Ouverte 2.0](https://www.etalab.gouv.fr/licence-ouverte-open-licence) in France, the [Data licence Germany — attribution — Version 2.0](https://www.govdata.de/dl-de/by-2-0) in Germany. Each has an SPDX code and a code in the EU Publications Office [licence vocabulary](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/licence). The code table is [below](#three-ways-of-writing-one-licence).

### Standard terms in Russia

Russian portals often refer to the "Standard terms of use of publicly available information posted on the Internet in the form of open data". They were approved by minutes No. 6 of the absentee vote of the Government Commission for Coordination of Open Government of 19 September 2016.

In the text that opened on 14 October 2026, three clauses pull in different directions. Clause 10 asks that data be used for lawful purposes, with a link to the source and without distorting the information. Clause 13 explicitly permits both commercial and non-commercial use. Clause 12 says no contract is needed and no special agreements or licences are required. The document has no international code. The [recommendations 4.0 passport](./02-metadata-standards.md#a-passport-instead-of-dcat) has no licence field either: the passport is read by the Russian parser, and a harvester outside the country will not find this field in the passport even if you add it yourself.

The practical conclusion. The page with the standard terms is kept for people. In the field that goes into the dump, a lawyer chooses a well-known licence that does not contradict these clauses. The closest to "a link to the source, and commercial use is permitted" is CC BY 4.0. If you do not want to require a link to the source, CC0 is closer. The document itself does not declare this correspondence: the authority's lawyer must confirm it, not the catalog record.

## Where it goes

The licence goes on every dataset. A single licence for the whole catalog is acceptable only when there really is one and it is copied into the dump for every dataset. A harvester does not read the site footer.

In DCAT-AP 3.0.1 the licence is a recommended property of a distribution (a file or service), not of a dataset. The profile does not call it mandatory. The profile deliberately does not attach the licence to the dataset: if the dataset has one text and the file another, it is unclear which prevails. For people and for harvesters the field is needed all the same. Where it sits among other properties is in the chapter [on metadata completeness](../04-features/03-metadata-depth.md#what-standards-require-and-what-they-do-not).

In CKAN the licence is stored on the dataset. The ckanext-dcat extension carries it into the DCAT dump. According to the documentation for release 2.4.4, a file inherits the dataset's licence only if the `ckanext.dcat.resource.inherit.license` setting is enabled. By default it is off. A filled-in dataset field may then not reach the file in RDF.

On 14 October 2026, on data.gov.gr, the records of one licence for the dataset `emy-station-116` diverged. In the dataset API the code is `cc-by`, and the link points to an Open Definition page without a version number. The first file already links to the `CC_BY_4_0` concept in the EU vocabulary. In the RDF that opened at `dataset_series/emy-station-116.rdf`, the dataset itself has no licence property: `CC_BY_4_0` sits on the distribution and on the data service. Whoever checks only `license_url` in the API will not see version 4.0. Whoever checks only the dataset field in the DCAT dump will conclude there is no licence, although the file has one. On data.gov.gr, in the sample from the chapter on metadata completeness, 32% of datasets and 99% of files had a licence. Both places and the dump need checking.

The harvester also loses the licence along the way. On data.europa.eu in October 2026 about 40% of dataset records had a link to a known text. How this happens is in the chapter [on federations](./03-federation-and-harvesting.md#where-the-chain-breaks).

Then there is the empty placeholder. The value "licence not specified" is also a value. On data.gouv.fr the built-in score counts it as a filled-in licence. The CKAN code `other-open` ("some other open licence") says the licence is supposedly open and does not say what its text is. A strict check expects a link to a known text. How shares are counted is in the chapters [on completeness](../04-features/03-metadata-depth.md) and [on metrics](../10-quality/02-metrics.md).

## Three ways of writing one licence

Programs look for the same licence in different ways. A `CITATION.cff` file and the SPDX list expect a code like `CC-BY-4.0`. CKAN by default expects its own short code without a version. DCAT-AP recommends a link to a concept in the EU vocabulary. Zenodo takes the SPDX list but writes the code in lower case in its API: for the record [10.5281/zenodo.4898406](https://doi.org/10.5281/zenodo.4898406) on 14 October 2026 the field said `cc-by-nc-4.0`.

<div className="wide-table">

| Licence | SPDX | Default CKAN code | EU vocabulary code |
|----------|------|------------------------|----------------|
| CC0 1.0 | `CC0-1.0` | `cc-zero` | `CC0` |
| CC BY 4.0 | `CC-BY-4.0` | `cc-by` | `CC_BY_4_0` |
| CC BY-SA 4.0 | `CC-BY-SA-4.0` | `cc-by-sa` | `CC_BYSA_4_0` |
| ODbL 1.0 | `ODbL-1.0` | `odc-odbl` | `ODC_BL` |
| Open Government Licence v3.0 | `OGL-UK-3.0` | `uk-ogl` | `OGL_3_0` |
| Licence Ouverte 2.0 | `etalab-2.0` | not in the default list | `ETALAB_2_0` |
| Data licence Germany, attribution, 2.0 | `DL-DE-BY-2.0` | not in the default list | `DLDE_BY_2_0` |

</div>

The EU vocabulary link is built as `http://publications.europa.eu/resource/authority/licence/` plus the code from the table. The ODbL code in this vocabulary is `ODC_BL`. You will not find it by the letters "ODbL".

The CKAN 2.12 core has fifteen licences. For `cc-by` and `cc-zero` the link points to an Open Definition page rather than the Creative Commons text, and there is no version 4.0 in the code. For `uk-ogl` the link does point to the version 3.0 text. `other-open` has no link. Your own list is connected with the `licenses_group_url` setting: it is a JSON file, not a core change. On 14 October 2026 data.gov.gr served exactly those fifteen values. open.canada.ca replaced the list: its national licence has the code `ca-ogl-lgo` and a link to the Open Government Licence — Canada text. In the SPDX list it is written as `OGL-Canada-2.0`.

data.gouv.fr has its own codes too. On 14 October 2026 a mandatory procurement dataset of the Auvergne-Rhône-Alpes region had the code `fr-lo` in the API. In RDF the distribution had a link to a 2014 PDF, `etalab.gouv.fr/wp-content/uploads/2014/05/Licence_Ouverte.pdf`. The same day the address opened and redirected to a PDF named licence-ouverte-2-0. There is no `ETALAB_2_0` code in the link. A harvester that recognises only the EU vocabulary will not match this licence, although the right text is at the link.

## Several sets of rights in one package

A table, the program next to it and the photos inside it may carry different rights. The record states the data licence. The program's licence goes into the code's `LICENSE` file. If the dataset contains someone else's rows, the description says so: someone else's licence does not become the licence of the whole dataset just because the file sits in the same folder.

Four places must name the same text: the page, the `CITATION.cff` file, `datapackage.json` and the record on a shared hub. A divergence has already been analysed with Global Jukebox: in the repository tag the `LICENSE.txt` file is CC BY 4.0, while the Zenodo record by DOI is CC BY-NC 4.0. Details are in the chapter ["When You Don't Need a Portal"](../08-beyond-portals/01-when-portal-not-needed.md#three-places-at-once).

Platforms add another confusion: the publisher's agreement with the archive and the licence for whoever downloads the data.

In the DSpace 10 submission form, the mandatory "License" step is an agreement with the archive. Its text is in `default.license` and can be specific to a collection. The "CC License" step is separate and optional: it sets the licence of the record itself. A checkbox saying "I agree to deposit the work in the archive" is not the dataset's licence.

In Dataverse a record gets a licence from the installation's list or, if the installation allows it, custom terms. The documentation does not offer both at once. Often, if a person chose nothing, CC0 is filled in: this is an installation setting. The community norms ask people to cite the dataset anyway. The documentation says plainly that these norms do not replace a licence and do not create a legal obligation.

## When the file is closed

Restricted access is needed for personal, sensitive and licensed data. The description is still published openly: the dataset can be found and requested. Closing the record together with the file hides the very existence of the data. Levels, platforms that can keep the description open, and the `dct:accessRights` property are analysed in the chapter [on roles and access](../04-features/08-access-control-and-workflow.md).

An important addition here. An open licence on a closed file is a lie. CC BY promises the file can be copied. If the file is released on request, the record states the access conditions, the request procedure and the response time. "On request" without a deadline is not an access level.

Registration is also a barrier, even if the field says CC BY. A portal that releases data only after an identity check is, by the three conditions of openness, publicly accessible rather than open. This is how the Guangdong provincial portal works, and how Kazakhstan's national portal worked until registration was abolished: examples are in the chapters [on open data portals](../03-types/02-open-data-portals.md) and [on anti-patterns](../09-practices/02-anti-patterns.md).

Personal data is anonymised before publication. Assessing whether a person can be identified from the remaining fields is separate work. If a risk remains, the file is not put into an open catalog.

According to the dataportals-registry export (release 1.27.0 of 15 October 2026), restricted access is marked for about 1,100 catalogs. This is a mark on the whole catalog, not a share of closed datasets inside it.

## How visible the licence is from outside

In the same registry export, a licence text or link at the level of the whole catalog could be filled in for about 1% of records (about 420 of 43,000). This means the licence is hard to find even for someone describing catalogs. The model, "one licence for the whole catalog" or "a licence on each dataset", is identified more often, for about 17,000 catalogs, split equally between the two. For another 5,600 the model is explicitly unknown. The remaining records do not belong here: no model is named for them. These three numbers do not add up to 43,000. The licence text and the licence model are different fields. The queries are in the [appendix](../12-appendices/02-using-the-registry.md).

The share of licences inside a portal is not counted from this mark. It is counted from the dataset dump, as in the chapters on completeness and metrics.

## Example: your own text or a well-known licence

**Context.** A regional authority publishes about two hundred open datasets and several surveys with personal data. The lawyer has brought two pages of "terms of use" and asks for them to be put on everything. The national portal harvests descriptions in DCAT-AP and recognises the licence by the EU vocabulary. Some datasets are on a list for which a licence no stricter than CC BY 4.0 is expected.

**Options.** Leave the lawyer's text in the footer. Paste this text into the licence field of every dataset. Put CC BY 4.0 on the open files as an EU vocabulary link, keep the lawyer's page for people if it does not contradict CC BY, and describe the closed surveys with access conditions.

**Criteria.** The harvester recognises the licence without parsing a paragraph. The text on the record and the text in the dump do not conflict. A closed file does not promise free copying.

**Decision.** Open datasets: CC BY 4.0, with the link `.../licence/CC_BY_4_0` in the dump and the code `CC-BY-4.0` in `CITATION.cff`. The page with the national text stays, and the lawyer confirms in writing that it does not tighten CC BY. Surveys: an open description and access conditions with a response time, without CC BY.

**Why.** The footer does not get into the dump. A home-grown paragraph matches no code in the vocabulary, and the national portal will show the dataset without a licence. One label for open and closed files lies about one of the two groups. CC BY-SA drops out: it is stricter than the regulation allows for high-value datasets and hinders mixing databases.

**Consequences.** On CKAN, licence inheritance by files is switched on, or the file field is filled in separately, and the RDF is checked, not only `license_url`. The core licence list, where CC BY has no version, is replaced by your own file. Surveys get a response time that the old "terms" did not have.

**When to review.** The country publishes a national licence with an SPDX code that the EU vocabulary already contains. The regulation or the national portal names a different permissible text. A survey is anonymised down to a file that can be released openly.

How to write your own record is in the chapter ["Justifying a Decision"](../06-choice/04-justifying-decisions.md).

## How platforms do it

| Platform | Where the licence lives | What matters |
|-----------|--------------------|-----------|
| CKAN 2.12, core | the dataset's `license_id` field, a list of fifteen values | CC BY has no version, the link goes to Open Definition; your own list is a file set by `licenses_group_url` |
| ckanext-dcat 2.4.4 | carries the licence into DCAT | a file gets the dataset's licence only with `ckanext.dcat.resource.inherit.license`; off by default |
| udata, core | a mandatory field from its own list | a "not specified" value exists, and the data.gouv.fr record score counts it |
| Dataverse, core | a licence from the installation's list or custom terms | often CC0 by default; citation norms are not a licence |
| Zenodo on InvenioRDM | a mandatory field, a list based on SPDX, several allowed, plus custom text | the code is lower case in the API; the default suggestion is CC BY 4.0 |
| DSpace 10, core | agreement with the archive is mandatory; the record's licence is a separate Creative Commons step | the deposit agreement does not by itself go into `dc.rights` |
| GeoNetwork | legal constraints of the ISO 19115 record | the core has no short code like `cc-by`; a link reaches DCAT if the export profile has mapped this field |

Access levels for the same platforms are in the chapter [on roles and access](../04-features/08-access-control-and-workflow.md#how-it-is-done-in-platforms). It also says which ones can keep the description open while the file is closed.

## Publishing without a portal

Next to the files, one licence is put in four places, with the same text everywhere:

- `CITATION.cff`: the SPDX code; in the book's template it is `CC-BY-4.0`;
- `datapackage.json`: the same code in `licenses[].name` and a link to the text in `licenses[].path`;
- schema.org markup: a link to the text in the `license` property;
- the Zenodo or other hub record: the licence the hub accepts under its own code.

The templates are in the [templates folder](pathname:///templates/CITATION.cff). GitHub recognises the licence from the `LICENSE` file in the root if the text matches a known one. A file in the root does not replace the field in the hub record: in the Global Jukebox example they diverged.

## How to check

Open three random records, not the ones at the top of the list.

- The record has a licence.
- It is a link to a known text or a code from the table above. A paragraph saying "the data may be used" and the value "not specified" do not count.
- In the dump the distribution has the same link. If the field is missing in DCAT, the harvester will lose the licence even if it is written on the site.
- If the dataset and the file have different links, this is deliberate, not because the platform's list does not know the version.
- If the file is closed, the record opens without a login, there is no open licence on it, and it says how to request the file and when an answer will come.

For a CKAN portal, this command shows the code, the dataset link and the licence of the first file. Substitute your own identifier.

```bash
curl -s "https://data.gov.gr/api/3/action/package_show?id=emy-station-116" \
  | jq '{id:.result.license_id, url:.result.license_url,
         file:(.result.resources[0].license // "empty")}'
```

On 14 October 2026 the answer was: code `cc-by`, link `http://www.opendefinition.org/licenses/cc-by`, and for the file the `CC_BY_4_0` concept. The list the code came from:

```bash
curl -s "https://data.gov.gr/api/3/action/license_list" \
  | jq '[.result[] | {id, url}]'
```

In RDF the same link is looked for on the distribution. On that day the address `dataset/emy-station-116.rdf` opened `dataset_series/emy-station-116.rdf`, and it contained `licence/CC_BY_4_0`.

## Sources

- [Open Definition 2.1](https://opendefinition.org/od/2.1/en/)
- [Creative Commons](https://creativecommons.org/licenses/), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and [the licence text](https://creativecommons.org/licenses/by/4.0/legalcode.en), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- [Open Data Commons Open Database License](https://opendatacommons.org/licenses/odbl/)
- [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/), [Licence Ouverte 2.0](https://www.etalab.gouv.fr/licence-ouverte-open-licence), [Data licence Germany — attribution — Version 2.0](https://www.govdata.de/dl-de/by-2-0)
- [The EU licence vocabulary](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/licence), a query to the Publications Office SPARQL endpoint on 14 October 2026; [SPDX codes](https://spdx.org/licenses/)
- [DCAT-AP 3.0.1](https://semiceu.github.io/DCAT-AP/releases/3.0.1/), the section on legal information: the licence on the distribution, a recommendation of the EU vocabulary and of CC BY 4.0 for FAIR data
- [Regulation (EU) 2023/138](https://eur-lex.europa.eu/eli/reg_impl/2023/138/oj), Article 4(3)
- Standard terms of use of publicly available information in the form of open data, minutes No. 6 of 19 September 2016. The text of clauses 10, 12 and 13 was read on 14 October 2026 on [a page of a regional office of Rosselkhoznadzor](https://64.fsvps.gov.ru/tipovye-uslovija-ispolzovanija-obshhedostupnoj-informacii-razmeshhaemoj-v-informacionno-telekommunikacionnoj-seti-internet-v-forme-otkrytyh-dannyh/) (in Russian), which reproduces the document. The PDF on [data.nalog.ru](https://data.nalog.ru/files/tipovye_usloviya_od.pdf) (in Russian) opened the same day; the file properties say 22 September 2016. The document's page on the Ministry of Finance website did not open from this network
- The CKAN 2.12 licence list: [ckan/model/license.py](https://github.com/ckan/ckan/blob/ckan-2.12.0/ckan/model/license.py). Inheritance in the dump: [ckanext-dcat 2.4.4](https://github.com/ckan/ckanext-dcat/blob/v2.4.4/ckanext/dcat/config_declaration.yml), the key `ckanext.dcat.resource.inherit.license`, default `false`
- [Choosing a licence in Dataverse 6.12](https://guides.dataverse.org/en/6.12/user/dataset-management.html#choosing-a-license), [Zenodo licences](https://help.zenodo.org/docs/deposit/describe-records/licenses/), [the DSpace 10 submission form](https://wiki.lyrasis.org/spaces/DSDOC10x/pages/408944795/Submission+User+Interface)
- Check on 14 October 2026: the data.gov.gr API and RDF (the `emy-station-116` dataset, a `license_list` of 15 values), the data.gouv.fr API (the Auvergne-Rhône-Alpes procurement dataset, code `fr-lo`, a link to a 2014 PDF in RDF), open.canada.ca's `license_list` (code `ca-ogl-lgo`), the Zenodo API for record `4898406`
- The dataportals-registry export, release 1.27.0 of 15 October 2026
- [Metadata completeness](../04-features/03-metadata-depth.md), [roles and access](../04-features/08-access-control-and-workflow.md)
