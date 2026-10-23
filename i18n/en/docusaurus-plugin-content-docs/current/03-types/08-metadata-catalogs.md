---
title: Metadata Catalogs and Registries
description: Catalogs of vocabularies, code lists, data elements, descriptions of closed datasets and of other catalogs. How they are organised, who runs them, what they run on, how to choose a platform and where they break.
---

# Metadata Catalogs and Registries

A metadata catalog describes not the data itself but what data is described with and where to look for it: vocabularies of terms, code lists, field definitions, structures of statistical tables, descriptions of datasets held elsewhere, and lists of other catalogs. People come to such a site not to download a table but to find out the code for the theme "Transport", what the field "author speciality" means, or which repositories accept climate data.

According to the dataportals-registry export (release 1.27.0 of 15 October 2026), there are 172 such catalogs, 0.4% of all catalogs. The type is small, but all records are active, and 67% have programmatic access: much more than indicator catalogs (37%) and almost as many as open data portals (69%).

The main conclusion of the chapter: the value of a metadata catalog lies in others referring to it. That is why every record needs a persistent address, a version and a note of what replaced it. Descriptions should be served to programs in a standard (SKOS, SDMX, DCAT), and the whole database should be downloadable. A registry that is only read by eye stops being cited after a few years and turns into one more website with a list.

## How a record is organised

On an open data portal the main thing is a file; in an indicator catalog, a number with breakdowns. In a metadata catalog the unit is a description that others refer to: a term, a code, a data element, a description of a dataset or a catalog. Three live examples show how this works.

**A term as an address.** In the EU Publications Office vocabularies the theme "Transport" has the address `http://publications.europa.eu/resource/authority/data-theme/TRAN`. From it a program gets a description of the theme in RDF with labels in the EU languages (checked 12 October 2026). Portals following the DCAT-AP profile put this address in the theme field, not the word "Transport". That is why data.europa.eu brings together transport datasets from different countries without translating or guessing words. Any good vocabulary works this way: a term is an address, and a name is one of its labels.

**A code from a shared code list.** In the key of the European Central Bank's dollar exchange rate series `EXR.D.USD.EUR.SP00.A`, the letter `D` is not the bank's invention. It is the code for "daily" from the frequency code list `CL_FREQ`, which sits in the global SDMX registry. As of 12 October 2026 this code list, version 2.1, has 34 codes: `A` for annual, `Q` quarterly, `M` monthly, `W` weekly, `D` daily and others. The code list is the same for all statistical offices, so `M` means "monthly" at both Eurostat and the IMF. How a series key is organised is covered in the chapter [on indicator catalogs](./05-indicator-catalogs.md#how-an-indicator-is-structured).

**A data element with a passport.** The Swiss platform I14Y describes the concepts, code lists, datasets and services of public bodies. The first concept in its open API on 12 October 2026 is the field `DocumentEntry.author.authorSpeciality` from eHealth Suisse: the speciality of the author of a medical document. It has a description in four languages, a type (code list), a value type (string), a maximum length (30 characters), a publisher, a version, a registration status, a validity start date and the fields "replaces" and "replaced by". This is exactly the kind of field passport that the ISO/IEC 11179 standard describes; more on it below.

### What gets its own page

Depending on the kind of catalog, the following get their own address:

1. **A concept or code**: one theme, one heading, one code-list code.
2. **A whole vocabulary or code list**: a thesaurus, classification, ontology, code list.
3. **A data element**: the definition of a field with permitted values.
4. **A structure**: the description of a table: which breakdowns it has and which code lists are attached to them.
5. **A description of a dataset without the data**: what an organisation has and how to get it.
6. **A description of a catalog, standard or infrastructure**: a card for a repository, vocabulary, network of observing stations.

That is why the number of records in a metadata catalog cannot be compared with the number of datasets on a portal. On 12 October 2026 the global SDMX registry had 451 code lists, 248 table structures and 1,167 dataflow descriptions including all versions, and not a single statistical value.

## Who builds them

Metadata catalogs are split almost equally between science, international organisations and central government.

| Owner | Catalogs | Share |
|----------|----------:|-----:|
| Universities and research organisations | 54 | 31% |
| International organisations | 52 | 30% |
| Central government | 41 | 24% |
| Regions | 8 | 5% |
| Civil society organisations | 6 | 3% |
| Companies | 6 | 3% |
| Communities and others | 5 | 3% |

- **Research organisations and libraries** run vocabularies and ontologies: the National Library of Finland runs the Finto vocabulary service, EMBL-EBI the life sciences ontology search OLS, Stanford BioPortal. Medical centres and rare disease research networks set up FAIR Data Points to describe their cohorts and patient registries.
- **International organisations** keep shared code lists and structures: FAO the AGROVOC thesaurus, UNESCO its own thesaurus, the Bank for International Settlements the global SDMX registry, the World Meteorological Organization the OSCAR registries of observing stations and satellites, the secretariat of the Convention on Biological Diversity its clearing-house mechanisms.
- **Central government** runs registries of data elements and code lists: the Australian Institute of Health and Welfare runs METEOR, the New South Wales government a metadata registry, Switzerland I14Y, the Dutch agency Logius the Stelselcatalogus, a catalog of the concepts of the base government registers, and the US Library of Congress the linked data service id.loc.gov.

By country the leaders are the Netherlands (24), the United Kingdom (20), Spain (9), the US and Germany (7 each), Australia (6); another 40 catalogs cover the whole world and 11 the European Union. As with other types, the number shows which software has taken root in a single community, not how mature the country is. In the Netherlands 19 of 24 are FAIR Data Points of medical centres and research networks. In the UK 15 of 20 are catalogs on the Metadata Browser cloud service. In Spain 7 of 9 are also FAIR Data Points, six of them at seed banks of botanical gardens and universities. In Australia 4 of 6 are registries on Aristotle Metadata Registry.

**The boundary of the type is blurred**, and 172 is a lower estimate. The registry does not include re3data itself, Research Vocabularies Australia is recorded as a research repository, and the Irish catalog of protected data as an open data portal on CKAN. On the other hand, catalogs of other objects have ended up here: of software packages (Libraries.io, Google Open Source Insights), journals (the ISSN portal), commodity codes (WTO HS Tracker). They also describe rather than store, but relate to public data only indirectly.

## What they publish

- **Vocabularies, thesauri, classifications and ontologies.** Themes, subject headings, country and language codes, economic activities, scientific terms. Other catalogs use them to fill in fields the same way. An ontology differs from a vocabulary in its rigour: besides "broader–narrower" relations it defines classes, properties and rules from which a program draws inferences.
- **Structures and data elements.** Which breakdowns an indicator has and which codes are permitted in each. What the field "registration date" means, in what format it is written, who is responsible for the definition and which revision is currently in force.
- **Schemas.** Description templates: which fields a record about a dataset, sample or object must have. This is how the CEDAR schema registry and the buildingSMART Data Dictionary for construction work.
- **Descriptions of datasets without the data itself.** An organisation says what it has, and the data stays with it: medical cohorts, patient registries, biobank collections, protected public sector data.
- **Lists of catalogs, standards and infrastructures.** A card for a repository, vocabulary or standard: address, subject, terms, certifications, interfaces.

What a metadata catalog usually lacks: the values, files and records themselves. If a website lets you download a table, it is already a portal or an indicator catalog, even if the table is a code list. This boundary is covered in the section [on code list portals](#code-list-portals-a-borderline-case).

## Standards

**SKOS** (W3C, 2009) is a way to describe a vocabulary in RDF. Each concept has an address, a preferred label and synonyms in different languages, a code, "broader–narrower" and "related" relations, and mappings to concepts in other vocabularies. Almost all open vocabularies are served in SKOS. For statistical classifications there is the **XKOS** extension (DDI Alliance, version 1.0 of 2019): classification levels, correspondence tables between revisions, "includes" and "excludes" notes.

**OWL** is the W3C ontology language. It is used to describe domains of knowledge with classes and rules: diseases, genes, plant species, crops. Ontology catalogs (OLS, BioPortal, AgroPortal) accept ontologies in OWL and show them to people and programs.

**ISO/IEC 11179** "Metadata registries" describes how to define a single data element. An element consists of a concept (an object and a property: "person – sex") and a representation (permitted values: a code from a list, a date, a number with a unit). An element has a definition, a steward responsible for it, and a registration status, from candidate to standard, and then "superseded" or "retired". The current edition of the metamodel is ISO/IEC 11179-3:2023, and in 2026 an amendment on mapping elements was published. The standard is used where different systems must understand a field in the same way: in health care, official statistics and exchange between agencies.

**SDMX** is a model of statistical structures: code lists, concept schemes, table structures, dataflows. An SDMX registry stores these structures so that all exchange participants take them from one place. The standard is covered in detail in the chapter [on indicator catalogs](./05-indicator-catalogs.md#standards).

**DCAT and its profiles.** A FAIR Data Point serves descriptions of catalogs and datasets in DCAT, so they are taken by the same harvesters as open data portals. For health data the European Commission is developing the **HealthDCAT-AP** profile: Release 7 was published in May 2026 as a draft specification. It adds to DCAT-AP the fields needed for health data: the health data access body, the category of health data, the number of records and the number of unique individuals, age coverage, retention period, purpose of processing and legal basis.

**Describing repositories.** re3data has its own schema (version 4.0): subjects, data types, access conditions for the data and for the repository itself, certifications, interfaces. The questions about access in the chapter [on classification](./01-classification.md) follow the same schema.

For pages read by search engines, schema.org has the types `DefinedTermSet` and `DefinedTerm`: a vocabulary and a term. This is not a replacement for SKOS but a way to make a vocabulary findable.

### Description catalogs required by law

In the European Union, catalogs describing closed data are turning from a voluntary matter into an obligation.

- **The Data Governance Act** (Regulation 2022/868, Article 8) obliges each EU country to set up a single information point. It must contain a searchable list of protected public sector data (personal, commercially confidential, statistically confidential) with the format, size and conditions for reuse. Access requests are submitted through the point. The European Commission collects the national lists into the European Register for Protected Data held by the Public Sector (ERPD) on data.europa.eu.
- **The European Health Data Space Regulation** (EHDS, Regulation 2025/327, Article 77) requires health data access bodies to keep a public, machine-readable catalog of descriptions of datasets available for secondary use: source, coverage, main characteristics and access conditions. The catalog must be available to the single information point under the Data Governance Act. The rules on secondary use apply from 26 March 2029 for most data categories, and from 26 March 2031 for five categories, including genomic data. A 2026 draft implementing act of the European Commission proposes describing datasets according to HealthDCAT-AP.

For a developer this means: a catalog describing closed data must serve DCAT-AP or its sector profile and be harvestable, otherwise it will not reach the national point and the European register.

## Platforms

Custom builds make up 38% (65 catalogs), less than for indicator catalogs (44%). Only 17% of custom metadata catalogs have programmatic access, while almost all specialised platforms do.

| Platform | Catalogs in the registry | What it is | Programmatic access |
|-----------|--------------------:|---------|--------------------|
| Custom build | 65 | catalog registries, vocabularies, agency code lists | for 17% |
| FAIR Data Point | 47 | open-source (MIT) point for an organisation's descriptions in DCAT; release 1.22.2 of 24 September 2026 | for all: DCAT in Turtle, API description in OpenAPI |
| Metadata Browser | 16 | commercial cloud service from the British company MetadataWorks for catalogs of health and administrative data | for all |
| Skosmos | 10 | open-source (MIT) software from the National Library of Finland for publishing SKOS vocabularies; release 3.4 of 31 August 2026 | REST API in the core |
| Aristotle Metadata Registry | 8 | a registry of data elements following ISO/IEC 11179; cloud service | API for all |
| Fusion Metadata Registry | 7 | the Bank for International Settlements' SDMX structure registry; free application, release 12.4.2 of 19 September 2026 | SDMX REST API in the core |
| MOLGENIS | 5 | open-source (LGPL-3.0) platform from Groningen; catalogs of biobanks and cohorts | GraphQL for all |
| OntoPortal | 2 | open-source (BSD) platform for ontology catalogs; BioPortal and AgroPortal run on it | REST API |
| Sector systems | 7 | WMO OSCAR, the Convention on Biological Diversity's clearing-house mechanisms, SeaDataNet vocabularies | for most |
| Other | 5 | one each: DataHub, EntryScape, PublishMyData, CEDAR, Drupal | — |

The type divides into three worlds. The first is narrow open-source tools, each for one kind of description: Skosmos and OntoPortal for vocabularies and ontologies, Fusion Metadata Registry for SDMX structures, FAIR Data Point for dataset descriptions in DCAT. They have an API and a standard format in the core. The second is cloud registries: Aristotle for data elements and Metadata Browser for catalogs of sensitive data. Convenient, but the descriptions live with the vendor. The third is agencies' and projects' own developments, where machine access is the exception rather than the rule.

The registry records some well-known installations as custom builds, although reusable software stands behind them. For example, AGROVOC responds through the standard Skosmos REST API, and the ontology search OLS is open-source software from EMBL-EBI (Apache 2.0, release 4.0.3 of 8 October 2026) that can be installed on your own servers.

### The fate of Aristotle's open code

Aristotle Metadata Registry began as open-source software on Django built according to ISO/IEC 11179. In August 2020 the code was removed from the public repository: only a file remained announcing that the product was being reworked and offered as a cloud service. Those who had installed the open version were left with code without updates. All eight Aristotle registries in the registry export are cloud-hosted. Before choosing a platform for a registry, check who maintains it and when the last release came out, just as [with extensions](../05-platforms/02-extension-ecosystems.md).

### Core and add-ons

Metadata catalog platforms have no extension ecosystem like CKAN's. Each does one job, and whatever is missing is added with a neighbouring product.

| Capability | FAIR Data Point | Skosmos | Fusion Metadata Registry | Aristotle (cloud) |
|-------------|-----------------|---------|--------------------------|--------------------|
| What it stores | descriptions of catalogs, datasets and distributions | SKOS vocabularies | SDMX structures: code lists, concepts, tables | data elements following ISO/IEC 11179 |
| Machine format | DCAT in RDF (Turtle and others) | SKOS via REST API | SDMX-ML, SDMX-JSON | own API |
| Editing in the interface | core | no: the vocabulary is prepared in another editor and loaded into a SPARQL store | core | core |
| Versions and statuses | core | no, versions are kept in the vocabulary's source | core: each structure has a version | core: registration statuses |
| Data processing | no | no | validation and conversion of data between SDMX formats | no |
| Registration in a shared catalog | core: the point reports itself to the FAIR Data Point index | no | no | no |
| How it is deployed | container on your own server | web application on your own server on top of a SPARQL store | container on your own server | only at the vendor |

If you need a catalog of catalogs rather than a vocabulary or a structure registry, special software is not required. The CKAN ecosystem catalog itself runs on CKAN, and the dataportals-registry is a set of YAML files in a Git repository with exports. For descriptions of closed public sector data an ordinary portal is often used too: the Irish catalog of protected data is built on CKAN.

## How to choose

The choice begins with the question of what exactly you are describing and who will refer to your records.

| Situation | What to take | Why, and what it costs |
|----------|-----------|---------------------|
| You need to publish your own vocabulary or classification | SKOS with persistent concept addresses; Skosmos as a showcase; for a small vocabulary, a SKOS file in Git and persistent addresses via w3id.org | everyone reads the standard format; Skosmos only displays the vocabulary, an editor is needed separately |
| A sector maintains many ontologies | your own OntoPortal instance, like AgroPortal, or registering ontologies in BioPortal and OLS | ready-made search and mappings between ontologies; your own instance has to be maintained |
| A statistical office needs shared code lists and structures | Fusion Metadata Registry or the registry within .Stat Suite | SDMX in the core, validation of data against structures; implementation requires SDMX knowledge |
| Agencies must understand fields in the same way | a data element registry following ISO/IEC 11179: cloud Aristotle or a national platform such as I14Y | a field passport with statuses and versions; a cloud service keeps descriptions with the vendor |
| An organisation wants to describe its closed data | FAIR Data Point or a portal with a DCAT-AP export; for health data in the EU, with HealthDCAT-AP fields | descriptions are harvested by the national point and the European register; the data itself stays with the owner |
| A list of catalogs on a topic or country is needed | first check re3data, FAIRsharing, BARTOC and dataportals-registry; if your own list cannot be avoided, files in Git with CSV and JSON export | a list that can be downloaded will be checked and reused by others |

A custom build is justified when the descriptions are more complex than ready-made products can handle and there is a team that will maintain them for years. Models are I14Y and id.loc.gov: both have an open API and persistent record addresses. If the team is not ready to provide machine access, its own registry will share the fate of custom metadata catalogs, of which programs can read only 17%. The general logic of choice is in the chapter ["Build, Open Source or SaaS"](../06-choice/05-build-or-buy.md).

### When you do not need your own catalog

Most organisations do not need a metadata catalog of their own. A vocabulary can be published as a SKOS file in a Git repository and registered in BARTOC or Linked Open Vocabularies. A repository can be entered in re3data, a standard or database in FAIRsharing, a catalog of any type in dataportals-registry. Descriptions of your own datasets can simply be served in DCAT from the portal where they already sit. A separate registry is needed by those whom many will refer to: a statistical office, a national library, a sector infrastructure, a body that the law requires to keep a list. Ways to publish without a portal are in the part ["Publishing Without a Portal"](../08-beyond-portals/01-when-portal-not-needed.md).

## What makes a metadata catalog useful

Six signs that a catalog can be relied on.

1. **Persistent addresses.** Each concept, code and description has its own address that does not change when the website moves. The address of the theme `data-theme/TRAN` in the EU vocabularies is the same for all portals in Europe.
2. **Versions and replacements.** An obsolete record is not deleted but marked, and you can see what replaced it. In I14Y each concept has a version, a status, a validity start date and "replaces" and "replaced by" links.
3. **Machine access in a standard.** A record is served to a program in SKOS, SDMX or DCAT, not only as a page. A good sign is when the same address serves a page to a person and RDF or JSON to a program depending on the request header.
4. **Full download.** The whole vocabulary or the whole list can be downloaded as one file. re3data serves the list of all repositories in one request, the dataportals-registry in one file.
5. **A clear steward.** Each record names who is responsible for its definition and changes, and the catalog has rules for including records. In the Dutch Stelselcatalogus the holders of the registers themselves are responsible for the descriptions, and they have agreed on delivery deadlines and completeness.
6. **Registration one level up.** A vocabulary is listed in BARTOC, an ontology in OLS or BioPortal, a FAIR Data Point in the index of points, a catalog of closed data in the national single information point.

## Examples

**Vocabularies and ontologies**

- [EU Publications Office vocabularies](https://op.europa.eu/en/web/eu-vocabularies): themes, file types, languages, countries, access rights and other code lists on which DCAT-AP relies. Datasets and services of the Swiss I14Y refer to them too.
- [id.loc.gov](https://id.loc.gov/): the linked data service of the US Library of Congress: subject headings, names, languages. Any heading is served in JSON-LD if you append `.json` to its address.
- [AGROVOC](https://agrovoc.fao.org/): FAO's multilingual thesaurus on agriculture and food, published on Skosmos.
- [Finto](https://finto.fi/): Finland's national vocabulary service on Skosmos; the software itself came from its team.
- [Ontology Lookup Service](https://www.ebi.ac.uk/ols4/): EMBL-EBI's search across life science ontologies: 287 ontologies as of 12 October 2026.
- [BioPortal](https://bioportal.bioontology.org/) and [AgroPortal](https://agroportal.lirmm.fr/): catalogs of medical and agricultural ontologies on OntoPortal.
- [Research Vocabularies Australia](https://vocabs.ardc.edu.au/): Australia's shared catalog of research vocabularies.

**Structures and data elements**

- [Global SDMX Registry](https://registry.sdmx.org/): shared structures and code lists of international organisations on Fusion Metadata Registry. The registries of Eurostat, the IMF, UNICEF, the Gulf Cooperation Council statistical centre and Thailand's statistical office run on the same software.
- [METEOR](https://meteor.aihw.gov.au/): Australia's registry of health and welfare data elements, run by the Australian Institute of Health and Welfare.
- [I14Y](https://www.i14y.admin.ch/): the Swiss interoperability platform: concepts, code lists, datasets, data services and public services with an open API.
- [Stelselcatalogus](https://stelselcatalogus.nl/): the catalog of concepts, data elements and information models of the Dutch base government registers: population, the trade register, the cadastre and others. Updated in June 2026; descriptions of datasets and services remained on data.overheid.nl and developer.overheid.nl.
- [schema.gov.it](https://schema.gov.it/): Italy's national catalog of ontologies, vocabularies and data schemas; more [below](#code-list-portals-a-borderline-case).

**Descriptions of datasets without the data**

- FAIR Data Points of the Dutch Health-RI network, the Leiden and Nijmegen medical centres and a European rare disease programme.
- [BBMRI-ERIC Directory](https://directory.bbmri-eric.eu/): the European list of biobanks and their collections on MOLGENIS.
- Catalogs on Metadata Browser: the UK Office for National Statistics, the ADR UK programme for administrative data research, Genomics England, regional NHS trusted research environments.
- Ireland and the UK Data Service are covered in the section [on open descriptions of closed data](#open-descriptions-of-closed-data).

### Catalogs of catalogs

A catalog of catalogs answers the question "where should I even look for data on this topic or country". It describes portals, repositories or vocabularies, not datasets. It is not a search engine: you will have to search on the portal you find. But it helps when a general search engine returned nothing because the catalog you need simply was not in it.

| Catalog | Who runs it | What it describes | How many records |
|---------|-----------|---------------|-----------------|
| [dataportals.org](https://dataportals.org/), formerly datacatalogs.org | Open Knowledge Foundation | open data portals; the list can be exported to CSV and JSON | 631, October 2026 |
| [Open Data Inception](https://opendatainception.io/) | Huwise (formerly OpenDataSoft) | open data portals by country | "2600+" on the website, 3,763 records in the source dataset, October 2026 |
| [datacatalogs.ru](https://datacatalogs.ru/) | Infoculture | data catalogs and repositories in and about Russia: type, themes, software, API availability, access mode | 245 at launch in November 2021, 263 in June 2022 |
| [re3data](https://www.re3data.org/) | DataCite and partners | research repositories | 3,535, 12 October 2026 |
| [FAIRsharing](https://fairsharing.org/) | a University of Oxford group | standards, databases and policies of journals and funders | 1,973 databases, 1,646 standards, 159 policies, January 2023 |
| [BARTOC](https://bartoc.org/) | the VZG library centre, Germany | vocabularies, thesauri, classifications and ontologies | 4,162, October 2026 |
| [Linked Open Vocabularies](https://lov.linkeddata.es/) | Universidad Politécnica de Madrid | linked data vocabularies: DCAT, schema.org, FOAF and others | 920, October 2026 |
| [FAIR Data Point index](https://home.fairdatapoint.org/) | the FAIR Data Point community | FAIR Data Points that have reported themselves | 230, of which 74 active, October 2026 |
| [ecosystem.ckan.org](https://ecosystem.ckan.org/) | the CKAN community | extensions and portals on CKAN with core versions | about 1,400 extensions and 1,300 portals, October 2026 |
| [dataportals-registry](https://github.com/datenoio/dataportals-registry) | the Dateno project | catalogs of all types, one YAML file per catalog | more than 43,000, release 1.27.0, October 2026 |

The numbers in the table are not comparable: each list counts its own thing and decides in its own way what counts as a catalog. Why the number of catalogs in the world depends on the effort spent searching is covered in the chapter [The World of Catalogs in Numbers](../01-basics/04-catalogs-in-numbers.md). More on the CKAN ecosystem catalog is in the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md).

### Open descriptions of closed data

A dataset description can be open even when the data itself is closed. Such a catalog says honestly: the data exists, this is what is in it, this is how to get access if you have grounds. Without it a person cannot request data simply because they do not know it exists. In the EU such catalogs are now required by law; see the section [Description catalogs required by law](#description-catalogs-required-by-law).

- [Ireland's Public Service Data Catalogue](https://datacatalogue.gov.ie/) describes public bodies' data that cannot be published openly: personal data, trade secrets, statistically confidential data. Under the Data Governance Act this is "protected data": it can be obtained for reuse under conditions that preserve the protection. The catalog serves as a single point where agencies list such data and where anyone interested submits a request. As of 12 October 2026 it holds 1,543 datasets.
- [UK Data Service](https://ukdataservice.ac.uk/), the British archive of social and economic data, maintains three access levels. Open data is downloaded without registration under open licences. Safeguarded data, after registration and agreeing to the end user licence. Controlled data, detailed and confidential, is available only to experienced researchers on application and only inside the SecureLab trusted research environment: from an approved workstation, without the right to download the data itself. In 2023 the shared open catalog listed datasets of all three levels, and the documentation for the closed ones was open.
- [FAIR Data Points](https://www.fairdatapoint.org/) work the same way, but for research: a medical centre lists cohorts and patient registries in DCAT, and access to the records themselves is usually obtained on application.

More on microdata catalogs is in [a separate chapter](./06-microdata-catalogs.md), and on licences and access modes in the chapter [on licences and access](../07-publishing/04-licenses-and-access.md).

### Code list portals: a borderline case

Reference data (in Russian practice, NSI, normative reference information) means code lists and classifications used by information systems: codes, lists, value dictionaries. In Russia there are separate government portals for it: the unified reference data system on Gosuslugi, the Ministry of Health reference data portal, the Federal Compulsory Medical Insurance Fund's code lists, and the reference data systems of Moscow and St Petersburg. In June 2024 the Ministry of Health portal had about 1,800 code lists with export in XML, JSON, XLS and CSV.

Outwardly such portals look like open data portals: many datasets, machine-readable export, an API. The difference is that they have a single owner, uniform terms of use instead of a licence for each dataset, and they were created for exchange between government systems, not for publication. In other countries similar resources are more often organised as catalogs of schemas and vocabularies. The Italian [schema.gov.it](https://schema.gov.it/), run by the Department for Digital Transformation and the statistical office ISTAT, is a national catalog of ontologies, vocabularies and data schemas in RDF with a SPARQL query endpoint. The Swiss I14Y stores code lists as concepts with versions and statuses, not as files.

There is no clear answer as to where a code list portal belongs. By content it is closer to a metadata catalog: a code list describes the values with which other data is filled in. By design, closer to an open data portal. The deciding question is what a person does on the website: downloads the code list as data, or checks codes in their own system against it.

## Where it breaks

**The card is alive, the catalog is gone.** A registry describes a catalog or vocabulary that no longer exists: the address has changed, the website is closed, but the card lives on. For a catalog registry this is an occupational hazard. On 12 October 2026 the FAIR Data Point index knew 230 points, but only 74 were active. Another 80 did not respond, 47 were listed as inactive, and 28 failed validation of their descriptions. Points are often set up for a project, and when it ends the server is switched off. A card should be marked as inactive rather than silently deleted: someone may have linked to the old address.

**The list mixes catalogs with things that are not catalogs.** In 2023 Open Data Inception records included data laws, policy pages and individual datasets. In October 2026 the website still says "2600+", although the source dataset has 3,763 records: the counter and the content live separately. The larger the list, the more it needs an explicit inclusion criterion and a note of verification.

**The list cannot be downloaded.** In 2022 datacatalogs.ru was a website on top of an Airtable database: convenient for manual editing, but the service is proprietary, and there was no export of the catalog as open data. A list that cannot be downloaded whole cannot be checked or reused by other projects. The dataportals-registry, started in 2023, is organised the other way round: each record is a file in an open repository, and the whole list is exported as one file.

**The vocabulary changes without versions.** A theme code was renamed, and all catalogs that referred to it now show an empty field. A vocabulary needs persistent term addresses and a note of which term is obsolete and what replaced it. Registries following ISO/IEC 11179 and SDMX keep versions in the model itself; simple vocabularies on a website often have none at all.

**The platform moves to the cloud.** Aristotle Metadata Registry's open code was removed from the repository in 2020, and the product is developed only as a cloud service. A cloud registry is convenient as long as the contract is alive. An export of all elements in an open format must be written into the contract before work begins, not at the time of migration.

**The national list does not reach the shared one.** On 12 October 2026 the European register of protected data on data.europa.eu held 10,757 descriptions, but only from 12 countries. 69% of the records (7,408) came from Norway, and among them were ordinary open geodata (orthophotos and terrain data marked "open access"). Ireland, whose own catalog has 1,543 datasets, passed 137 records there. Countries still understand differently what counts as protected data and what to pass up, and harvesting works only for those who serve DCAT-AP according to the harvester's rules.

**The vocabulary is closed to programs.** A vocabulary is needed above all by programs, but websites sometimes refuse them along with bots. On 12 October 2026 Finto and METEOR responded to requests from a checking program with a 403 error, including with an ordinary browser header, while the REST API of other Skosmos installations responded. If a metadata catalog is closed by a robot filter, only people can use it, which means no portal will refer to it. The general analysis is in the anti-pattern ["The door is closed to programs"](../09-practices/02-anti-patterns.md).

## How to check a metadata catalog

Four steps for a quarter of an hour.

1. **Take one record and open its address with a program.** Does the address return RDF, JSON or SDMX, not only a page? Has it stayed the same after the website moved, according to the web archive?
2. **Find an obsolete record.** Can you see that it is obsolete and what replaced it, or was it simply deleted?
3. **Download the whole catalog.** Is there a full export or only paginated search?
4. **Check where the catalog is registered.** Is it in BARTOC, re3data, FAIRsharing, the FAIR Data Point index, and does the address match there?

Typical addresses for different platforms (checked 12 October 2026):

```bash
# FAIR Data Point: description of the point in DCAT (Turtle)
curl -s -H "Accept: text/turtle" "https://fdp.healthdata.nl/"
# FAIR Data Point index: all registered points and their state
curl -s "https://home.fairdatapoint.org/index/entries/all"
# Skosmos: list of vocabularies of an installation
curl -s "https://data.ub.uio.no/skosmos/rest/v1/vocabularies?lang=en"
# OLS: how many ontologies are in the catalog
curl -s "https://www.ebi.ac.uk/ols4/api/ontologies?size=1"
# SDMX registry: the frequency code list from which the code D in the ECB series key comes
curl -s "https://registry.sdmx.org/sdmx/v2/structure/codelist/SDMX/CL_FREQ/latest?format=sdmx-json"
# EU vocabularies: the theme "Transport" as an address, response in RDF
curl -sL -H "Accept: application/rdf+xml" "http://publications.europa.eu/resource/authority/data-theme/TRAN"
# I14Y: concepts with versions and registration statuses
curl -s "https://api.i14y.admin.ch/api/public/v1/concepts?page=1&pageSize=1"
# re3data: all repositories in one response
curl -s "https://www.re3data.org/api/v1/repositories"
```

A response in RDF, SKOS or SDMX at a record's address is a good sign. If the catalog responds only with a page for people, and with an error or a robot check to a program, it is hard to rely on. The summary list is in the [checklists](../12-appendices/04-checklists.md#metadata-catalog), and general commands are in the chapter [on APIs and bulk download](../04-features/04-access-interfaces.md).

## How it differs from its neighbours

| Neighbour | Main difference |
|-------|-----------------|
| Open data portal | a portal serves files and tables, a metadata catalog serves descriptions, vocabularies and lists; a code list portal is a borderline case |
| Indicator catalog | an SDMX registry stores code lists and table structures, while an indicator catalog serves the values themselves |
| Aggregator and dataset search engine | an aggregator collects as many datasets as possible for search; a catalog of catalogs describes the catalogs themselves and does not replace a search across all data |
| Microdata catalog | a microdata catalog describes surveys and provides files on application; a catalog describing closed data only says that the data exists and whom to contact |
| Research repository | a repository stores data and issues DOIs; a metadata catalog stores descriptions, and the data stays with the owner |
| Enterprise data catalog | describes tables and pipelines inside a company for its employees; a public metadata catalog is open to all and describes shared vocabularies and the data of many organisations |

A summary table of all types is in the chapter [Comparing Types and Hybrids](./11-comparison-and-hybrids.md).

## Sources

- dataportals-registry export, release 1.27.0 of 15 October 2026: number of catalogs, owners, countries, platforms with the share having an API, interfaces. The queries are in the [appendix](../12-appendices/02-using-the-registry.md#metadata-catalogs).
- [SKOS](https://www.w3.org/TR/skos-reference/), W3C Recommendation of 2009; [XKOS](https://ddialliance.org/xkos), DDI Alliance, version 1.0; [OWL 2](https://www.w3.org/TR/owl2-overview/); [ISO/IEC 11179-3:2023](https://webstore.iec.ch/en/publication/81977), fourth edition of 16 January 2023; [SDMX](https://sdmx.org/)
- [Global SDMX Registry](https://registry.sdmx.org/): the `CL_FREQ` code list and number of structures via the [API](https://registry.sdmx.org/sdmx/v2/structure/codelist/SDMX/CL_FREQ/latest?format=sdmx-json), 12 October 2026; [the theme "Transport" in the EU vocabularies](http://publications.europa.eu/resource/authority/data-theme/TRAN); [the I14Y open API](https://api.i14y.admin.ch/api/public/v1/concepts?page=1&pageSize=1); checked 12 October 2026
- Data Governance Act, [Regulation 2022/868](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32022R0868), Article 8; [European Register for Protected Data](https://data.europa.eu/data/datasets?superCatalog=erpd) on data.europa.eu: number of records and countries via the search API, 12 October 2026; [harvesting rules for national points](https://data.europa.eu/sites/default/files/course/v1.3_ERPD_Technical%20recommendations%20for%20member%20states_Harvesting%20guidelines.pdf)
- European Health Data Space Regulation, [summary on EUR-Lex](https://eur-lex.europa.eu/EN/legal-content/summary/european-health-data-space-ehds.html): deadlines; [draft implementing act under Article 77](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=PI_COM%3AAres%282026%293843449), 2026; [HealthDCAT-AP Release 7](https://healthdataeu.pages.code.europa.eu/healthdcat-ap/releases/release-7/), draft specification of May 2026
- [FAIR Data Point specification](https://specs.fairdatapoint.org/), [source code and releases](https://github.com/FAIRDataTeam/FAIRDataPoint/releases), [index of points](https://home.fairdatapoint.org/): state of points via the [index API](https://home.fairdatapoint.org/index/entries/all), 12 October 2026
- [Skosmos](https://skosmos.org/) and [its releases](https://github.com/NatLibFi/Skosmos/releases); [OntoPortal](https://ontoportal.org/); [Ontology Lookup Service](https://github.com/EBISPOT/ols4); [MOLGENIS](https://github.com/molgenis/molgenis-emx2); [Metadata Browser](https://metadataworks.ai/metadata-browser); checked 12 October 2026
- [Fusion Metadata Registry](https://www.sdmx.io/software/fmr/) and [the BIS project page](https://www.bis.org/project/sdmx-fmr)
- [Aristotle Metadata Registry, public repository](https://github.com/aristotle-mdr/aristotle-metadata-registry): last change 28 August 2020, the repository contains only an announcement of the move to a cloud service; checked 12 October 2026
- [re3data](https://www.re3data.org/): number of repositories via the [API](https://www.re3data.org/api/v1/repositories); [BARTOC](https://bartoc.org/): number of vocabularies via the [API](https://bartoc.org/api/voc?limit=1); [Linked Open Vocabularies](https://lov.linkeddata.es/): counter on the home page; [OLS](https://www.ebi.ac.uk/ols4/api/ontologies?size=1): number of ontologies; all 12 October 2026; [FAIRsharing](https://fairsharing.org/)
- Catalogs of catalogs, checked 12 October 2026: [dataportals.org](https://dataportals.org/), counter on the home page; [Open Data Inception](https://opendatainception.io/) and [its source dataset](https://data.opendatasoft.com/explore/dataset/open-data-sources%40public/table/), number of records via the API; [the CKAN ecosystem catalog](https://ecosystem.ckan.org/); [dataportals-registry](https://github.com/datenoio/dataportals-registry), release 1.27.0 of 15 October 2026
- [Public Service Data Catalogue](https://datacatalogue.gov.ie/), Ireland: counter on the home page, 12 October 2026; UK Data Service, [Access conditions](https://ukdataservice.ac.uk/find-data/access-conditions/): three access levels, checked 12 October 2026
- Logius, [Stelselcatalogus](https://www.logius.nl/domeinen/gegevensuitwisseling/stelselcatalogus/wat-is-het): purpose and the responsibility of register holders; [Stelselcatalogus updated](https://developer.overheid.nl/blog/2026/06/03/nieuwe-stelselcatalogus), 3 June 2026
- [schema.gov.it](https://schema.gov.it/): Italy's national data semantics catalog, checked 12 October 2026; Russian reference data portals did not open from abroad on 12 October 2026, information about them is from posts
- I. Begtin, Telegram (in Russian): [launch of datacatalogs.ru](https://t.me/begtin/3213), 3 November 2021; [datacatalogs.ru on Airtable, 263 catalogs](https://t.me/begtin/3985), 23 June 2022; [Open Data Inception and datacatalogs.org](https://t.me/begtin/3382), 15 December 2021; [meta-catalogs: Geolode, DataShades, Open Data Inception](https://t.me/begtin/4874), 15 May 2023; [FAIRsharing](https://t.me/begtin/4508), 2 January 2023; [Ireland's open catalog of non-open data](https://t.me/begtin/3900), 27 May 2022; [UK Data Service and three access modes](https://t.me/begtin/5185), 26 October 2023; [reference data portals in Russia](https://t.me/begtin/4892), 22 May 2023; [schema.gov.it](https://t.me/begtin/4929), 3 June 2023; [the Ministry of Health code list portal](https://t.me/begtin/5686), 14 June 2024
