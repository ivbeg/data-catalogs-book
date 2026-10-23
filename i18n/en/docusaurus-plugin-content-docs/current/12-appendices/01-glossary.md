---
title: Glossary
description: Terms used in the book on data catalogs.
---

**Administrative data**: data that arises as a by-product of an agency's work: licence registers, contracts, inspections, payments. Coverage is usually complete, but the fields were designed for record-keeping, not analysis.

**Agent instructions**: a description of data for an AI agent: field definitions, units, period, limitations, code lists, search rules. They are maintained and checked like a record. The World Bank's Data360 server serves them as MCP resources.

**AI agent**: a program built on a large language model that itself searches for a dataset, reads the description and takes the data through an API or an MCP server.

**AI-ready data**: a dataset that a program can find, understand and take: an open format, an explicit licence, provenance and a dump. A Croissant record and an MCP server complement this once the format and licence are already in place. The Open Data Institute framework (version 2, December 2025) breaks the same down into dataset properties, description, infrastructure and governance.

**Anonymisation**: processing data about people after which a specific person cannot be identified from the remaining fields. Removing the name is not enough: a person is often given away by a combination of age, address and occupation.

**API**: an entry point through which a program asks a catalog a question and gets an answer. The answer most often comes in JSON.

**API catalog (developer portal)**: a catalog of an organisation's or country's programmatic interfaces: documentation, example requests, often key issuance and a test console. It describes services, not datasets; a good API catalog links an interface to the datasets it serves.

**API gateway**: a program that sits in front of an organisation's interfaces: it checks keys, counts requests and limits load. It usually comes with a developer portal, which becomes the API catalog. Examples are Azure API Management, WSO2 API Manager, Gravitee.

**ArcGIS REST**: the programmatic interface of Esri's ArcGIS servers and cloud. Not a standard, but because ArcGIS is so widespread, GIS programs and many harvesters read it on a par with OGC standards.

**ARK**: a persistent identifier of the form `ark:12148/…`, issued by libraries, archives and museums. An organisation number is free, and ARKs can be resolved on your own server or through the shared resolver n2t.net.

**AsyncAPI**: a format for describing interfaces that do not answer requests but send a stream of messages: transit delay events, sensor readings. It does for streams what OpenAPI does for ordinary requests.

**Authentication and authorisation**: authentication checks who the user is: a password, a second factor, an organisational account or a government login system. Authorisation checks what they may do: a role, rights to a dataset, an approved access request. Single sign-on moves only the first to another system; the catalog still grants the rights itself.

**Automatic table API**: the catalog itself parses a published tabular file and serves an API for it: rows, filters, a column profile. The publisher uploads nothing. An example is the data.gouv.fr tabular API. Such an API inherits the errors of the source file. More in the chapter [on innovative catalogs](../11-trends/02-innovative-catalogs.md#an-api-for-every-tabular-file).

**BagIt**: a standard for packaging files for archival storage and transfer: the data sits in a folder next to a manifest of checksums, so the package shows whether all files are in place and unchanged.

**Benchmark**: a set of tasks and data on which different machine learning models are compared under the same rules.

**BibTeX, RIS, CSL**: formats in which a catalog serves a dataset citation to a reference manager. BibTeX is for LaTeX; it has no separate type for data, which biblatex added (`@dataset`). RIS is for Zotero, EndNote and the like; its data type is `DATA`. CSL is the styles by which a citation is formatted to a journal's requirements or a national standard such as GOST, plus the CSL-JSON format for transferring the citation itself.

**BIDS**: a standard for organising neuroimaging data: the order of folders, file names and descriptions. OpenNeuro checks datasets against it on upload.

**Broken (dead) link**: a link to a file or page that no longer leads to the data: the server answers "not found", the domain does not exist, the certificate is not accepted. A "soft" failure is more dangerous: the link opens, but leads to the site's home page or to a page instead of a file, and a program that looks only at the response code counts it as working.

**Bulk download**: the ability to download the whole database or the whole dataset as files, without querying one indicator or record at a time.

**Catalog capability**: something a catalog can do for a person, a program or an owner: serve descriptions in DCAT, issue a DOI, close a file while keeping the description open. The same capability may be in the platform core, in an extension, or absent.

**Catalog of catalogs**: a list of data portals and repositories rather than datasets. It helps understand where to look for data on a topic or country. Examples are re3data, dataportals.org and the dataportals-registry.

**Catalog record**: information about how a dataset got into the catalog: when it was added and when the description was edited. It differs from information about the data itself: the record edit date is not the data update date.

**Catalog requirement**: a function chosen for your catalog, recorded together with the source of the need, the level of obligation (mandatory, desirable, not needed), the rationale, the method of verification and the condition for review. A good requirement says what is needed, not how to do it: "the national portal harvests descriptions in DCAT-AP", not "install ckanext-dcat".

**Catalog self-audit**: one pass through your own or someone else's catalog: a description dump, a sample of records, a file count and a page with what to fix in the coming month. It is a check of a specific site. A country ranking and an archive certificate answer other questions.

**Catalog type**: the class of a catalog by what is published in it and what gets its own page: a dataset, a map layer, a dataset version with a DOI, an indicator, a survey and so on. It sets the description standard and the range of suitable platforms.

**CDIF**: CODATA recommendations on which existing standards to combine when data crosses the boundary of a scientific discipline. For discovery it recommends schema.org and DCAT rather than a new catalog vocabulary. Version 1.1 came out in June 2026.

**Change feed**: a list of the most recently added and changed catalog records in RSS or Atom format. Harvesting programs subscribe to it. In CKAN the feed holds the last 20 records by default, so a full harvest also needs a "modified since date" query.

**Change log**: a record of who changed what in a dataset description and when, with the ability to view the previous state. In CKAN it is the `activity` module with diffs between versions; in research repositories dataset versions play this role.

**Check on entry**: the catalog does not publish a dataset that has not passed a check against a standard or schema. Examples are BIDS at OpenNeuro, NWB at DANDI. More in the chapter [on quality levels](../10-quality/01-quality-levels.md#checking-on-entry).

**Checksum**: a short string computed from a file's contents by an algorithm such as MD5 or SHA-256. It changes if even one byte changes, so it is used to check that a downloaded file is intact and is the same file that was published. In DCAT 3 it is recorded with the `spdx:checksum` property.

**Citation meta tags**: lines in the head of an HTML page (`citation_title`, `citation_author`, `citation_doi` and others, as well as Dublin Core fields) by which Zotero and Google Scholar understand what they are looking at and save a citation with one click. A version and the "dataset" type cannot be conveyed by these meta tags.

**CITATION.cff**: a text file in the root of a repository saying how to cite the data or software. GitHub shows a "Cite this repository" button based on it. Zenodo takes the authors and title from it when archiving a GitHub release if there is no `.zenodo.json` alongside; if that file exists, Zenodo reads only it. For data, `CITATION.cff` needs the line `type: dataset`. The record type in Zenodo is set separately, with the `upload_type` field.

**Cloud Optimized GeoTIFF (COG)**: a GeoTIFF file organised so that a program reads the needed fragment of an image over the network without downloading the whole file.

**Cloud service (SaaS)**: a platform that is not installed on your own server but rented from a provider by subscription. Updates and hosting are on the provider's side, but both the data and the capabilities depend on the contract.

**Code list (classification, reference data)**: a list of codes and names: regions, economic activities, currencies. Other datasets refer to it, so a code list's version and date matter.

**Codebook**: a description of a survey file: variables, question texts, answer codes and their labels, often with frequencies. Without it a microdata file is columns of meaningless numbers. The machine-readable form is DDI Codebook.

**Content negotiation**: a way to get different representations from one address: a browser at `https://doi.org/…` gets the dataset page, while a program that asked for BibTeX or RIS in the `Accept` header gets a ready citation from DataCite.

**Controlled vocabulary**: an agreed list of terms or codes from which a field value is chosen instead of free text: topics, languages, file types, countries. A thesaurus adds synonyms and broader/narrower relations. A good vocabulary gives each term a persistent address and is published in SKOS.

**Coordinate reference system**: the rule by which coordinate numbers turn into a point on the Earth. Each layer has its own; it is given as a code from the EPSG registry, for example EPSG:4326 for WGS 84. A layer without a coordinate system code cannot be reliably combined with others.

**CoreTrustSeal**: a mark showing that a repository can preserve data for the long term, not just show it on a site.

**CRIS**: a current research information system for an organisation's research: publications, projects, grants, staff and also datasets. An example is Elsevier Pure. Datasets in it often serve as a university's hidden data catalog.

**Croissant**: a machine-readable description of a machine learning dataset on top of schema.org: which files, which fields, how the dataset is split into training and test parts. Developed by MLCommons. Version 1.1 (January 2026) added data provenance and terms of use; the RAI extension describes biases, limitations and the dataset's intended use. In 2026 platforms still serve descriptions according to version 1.0.

**Crossref**: a DOI registration agency for articles, books, preprints and other publications, operating under US law. DataCite is usually chosen for datasets, but InvenioRDM and Dataverse can also register DOIs through Crossref.

**CSV on the Web (CSVW)**: a 2015 W3C Recommendation: a data dictionary for a CSV table in a separate JSON file, with column names, types, units and links to other tables. Google reads such a dictionary from a dataset page's markup in experimental mode and warns that the Rich Results Test complains about this block.

**CSW**: the protocol by which a program queries a geoportal's layer catalog.

**Darwin Core**: a standard for describing observations and specimens of living organisms: which species, where and when. GBIF collects data in it.

**Data aggregator**: a service that collects metadata from many catalogs and offers a single search over it. An aggregator has its own page for each collected dataset, which ordinary search engines see; a dataset search engine creates no such page and sends the user straight to the source.

**Data as a product (data product)**: an approach in which a dataset has an owner, known users, an update schedule, documentation and quality control, like any product; access is usually provided in several ways at once: API, dump, slices. The opposite is a file uploaded once to tick a box.

**Data catalog**: a service that describes datasets with metadata and helps people find, understand and obtain them.

**Data citation**: a reference to a dataset in an article, report or another dataset, formatted like a reference to a publication: author, year, title, version, publisher, identifier. It differs from a licence's attribution requirement: the licence sets a legal condition, while the citation gives scholarly credit and makes it possible to find exactly the data on which a conclusion was based.

**Data cube**: an indicator table with all combinations of breakdowns: years × regions × sex and so on. The needed slice is cut from the cube instead of downloading separate files by year. A term from statistical standards (SDMX, RDF Data Cube).

**Data dictionary**: a description of a table's columns: name, meaning, unit of measurement, permitted values. Without it a file is formally open and unclear in substance.

**Data element**: a description of a single field shared by many systems: the concept (object and property, for example "person — sex"), permitted values, definition, steward, version and status. Registries under ISO/IEC 11179 describe fields this way.

**Data hub**: several catalogs of different types under one banner with a common search, such as the dataset portal, indicator catalog and microdata catalog of one international organisation. Not a separate type: each catalog in a hub is assessed by its own type.

**Data inventory**: a list of what an organisation already produces or holds, including what cannot be published. From this list, what to publish is then selected and a queue recorded. An inventory is not a catalog itself.

**Data management plan**: a document accompanying a grant application: what data will arise in the project, in what formats, where it will be stored, and in which repository and on what terms it will be published. Horizon Europe, NIH and many other funders require one.

**Data marketplace**: a platform where data is sold or issued under contract: a file, a subscription, access to an interface or to a table in the cloud. It differs from an open data portal by having a contract and terms for each issue. Government marketplaces are often called data exchanges.

**Data owner**: the person or unit responsible for a dataset's rows: whether they are correct, when to update them and who answers about an error. The publisher in a record is an organisation. The owner may be a specific person within it.

**Data paper**: a peer-reviewed article that describes a dataset and links to it in a repository, without research hypotheses or conclusions.

**Data service**: a programmatic interface through which a dataset's data is obtained in parts: table rows with a filter, features on a map. In DCAT since version 2 it is a separate entity with its own address, referred to by a distribution.

**Data space**: an agreement between organisations to exchange data, including data that is not for everyone. The dataset description can be read, while the file may stay closed.

**DataCite**: a non-profit organisation that registers DOIs for data, and the description schema of the same name that is filled in at registration.

**Dataset**: a published collection of data with a common description.

**Dataset card**: a human-readable description of a machine learning dataset: contents, how it was collected and labelled, known biases, limitations and what the dataset is not suitable for. On Hugging Face it is a `README.md` file with a metadata section at the top. A similar description of a model is called a model card.

**Dataset licence**: the terms on which a specific dataset may be used. It is a separate text from the rules of the whole site and from the conditions of access to a file. An open licence allows copying, changing and using the data, including for commercial purposes; it may require attribution of the source but not prohibit commercial use. Common ones are CC BY 4.0, CC0 (a waiver of rights as far as the law allows) and ODbL (for databases: a derived database is shared on the same terms). The same licence is written in different ways: the SPDX code `CC-BY-4.0`, the CKAN code `cc-by`, the EU vocabulary link to the concept `CC_BY_4_0`. The phrase "open licence" and the value "not specified" are empty to a program.

**Dataset list**: a page, table or README file with links to datasets or to other catalogs, without search or records. A normal way to publish a dozen datasets, provided each row has a licence, a date and a persistent address.

**Dataset search engine**: a service that collects dataset descriptions from many catalogs or from site pages and offers one search over them. It publishes no datasets of its own; files stay at the source. It may be general (Google Dataset Search, Dateno), scholarly (OpenAIRE, DataCite Commons), sectoral (NIAID Discovery Portal) or national (find.data.gov.scot). If each collected dataset has its own page for ordinary search engines, it is called an aggregator.

**Dataset series**: datasets of the same kind released in turn: budget execution for each month, a census every ten years. A separate class for series appeared in DCAT 3 (2024); most portals do not know it and create a separate record for each release.

**Dataset splits**: dividing a machine learning dataset into a training part (the model learns on it), a validation part (settings are tuned on it) and a test part (the result is measured on it). The split is fixed in advance; otherwise results by different authors cannot be compared.

**Dataspace Protocol**: the exchange protocol for data spaces maintained by the Eclipse Foundation (version 2025-1). A participant publishes a dataset catalog in DCAT with conditions in ODRL, and the protocol describes contract negotiation and data transfer.

**DCAT**: the W3C vocabulary for describing catalogs, datasets, distributions and data services. Version 3 is a Recommendation of 22 August 2024: it introduced dataset series and version properties.

**DCAT-AP**: the DCAT profile for European portals: which set of description fields they exchange with one another. The current recommendation is 3.0.1 of 27 October 2025. The 3.0.2 draft of 17 June 2026 has not yet become a recommendation.

**DCAT-US**: the DCAT profile for US federal agencies. An agency publishes a `data.json` file listing its datasets, and data.gov harvests it. Version 3.0 was published on 1 May 2026 and is built on DCAT 3. data.gov accepts version 1.1 for a transition period.

**DDI**: a standard for describing surveys and microdata: who asked, whom, how the sample was built and what the variables mean. A family of several formats: DDI Codebook describes a single study (main version 2.5, new 2.6 in 2026), DDI Lifecycle the whole cycle with questionnaires and waves (3.3), DDI-CDI data from any field (1.0, 2025). Since 2026 the common part has been the ISO/PAS 25955 standard.

**Decision record**: a short record of one decision point when choosing a catalog: context, options, criteria, decision, rationale, consequences, and the event after which the choice is reopened. Written for the platform, a mandatory extension and dropping a feature. A superseded record is not deleted but marked as superseded.

**Delta file**: a file containing only what has changed since the last full dump: new, changed and deleted records. It avoids downloading a large database in full at every update.

**Derived dataset**: a DOI-bearing record for data that a user has filtered or assembled from several downloads, with a list of source datasets. This is how GBIF works.

**Dimension (breakdown)**: an attribute by which an indicator's values are divided: year, region, sex, age, industry. The permitted values of a dimension come from a code list.

**Distribution**: a specific form of a dataset: a file, a link, an API, a service. A DCAT term. In CKAN it is called a resource, in Dataverse and Zenodo a file, in STAC an asset. DCAT distinguishes a direct link to a file (downloadURL) from an access address (accessURL), a page or service through which the data can be obtained.

**DOI**: a persistent identifier for a digital object of the form `10.5281/zenodo.16546069`: an organisation prefix and a suffix the organisation makes up itself. The link `https://doi.org/…` redirects to the landing page. For data, DOIs are usually registered with DataCite, for articles with Crossref; technically it is a Handle with the prefix `10.`. A DOI cannot be deleted. A concept (parent) DOI unites all versions of a dataset and leads to the latest.

**Dolt**: an SQL database compatible with MySQL, with versions as in Git: clone, branches, merge, cell-level diffs. DoltHub hosts public databases. More in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md#versions-of-a-table-not-a-file).

**Domain data standard**: a shared format for one topic that describes not a file in general but a subject: a contract (OCDS), a transit schedule (GTFS), a species occurrence (Darwin Core). Programs and aggregators understand data in such a format straight away.

**Dublin Core**: a short set of description fields: title, author, date, subject. Research repositories often serve it.

**Embargo**: a period during which a dataset's description is open while the data itself is closed; after the date the data opens. Usually in research repositories until an article is published.

**Extension (plugin)**: a separate module with its own author, releases and compatibility with a core version. It is installed next to a platform to gain a capability not in the distribution. For example, ckanext-dcat adds DCAT export to CKAN. A setting or a module from the same distribution that is merely switched on is not an extension: it is released together with the core.

**External tool**: a separate program that the catalog opens to view or process a file. The program's code is not part of the catalog: the catalog stores its address and passes it the file identifier. Dataverse previewers work this way.

**FAIR**: the principles of findability, accessibility, interoperability and reusability of data (2016). FAIR does not mean "open": a dataset with closed files can also comply if it has an open description, a persistent identifier and a clear access procedure.

**FAIR Data Point**: a small service through which an organisation tells, in DCAT, what data it has. The data itself stays with the owner.

**FAIR Signposting**: a way to tell a program the essentials about a dataset without parsing HTML: the dataset page lists, in a response header or in a separate file (a linkset), links to the description, files, licence and author identifiers. It is in the core of Dataverse, InvenioRDM and DSpace.

**Five-star open data**: Tim Berners-Lee's ladder (2010) for one dataset: from a file under an open licence to a machine-readable table, an open format, addresses inside the data and links to other people's data. The ladder speaks about the format of a single file.

**Fork**: a copy of someone else's repository maintained by another team. Copies diverge: you install the one that is tested on your core version and record its address. An edit kept only in-house and not contributed back also becomes a fork, and then the maintainer is you.

**Frictionless Data Package**: a standard for describing a dataset with a file next to the data. The published descriptor is called `datapackage.json`. The current version of the standard is 2.0.

**Gated access**: a dataset whose description is open to everyone, while the files are issued after a request: the user provides information about themselves, accepts terms and sometimes waits for the author's approval. Gated datasets on Hugging Face work this way; to a dataset search engine such a dataset is a dataset without files.

**Generalist repository**: a research repository that accepts data from any discipline and any author: Zenodo, Figshare, Harvard Dataverse, Dryad. Funders recommend one when a discipline has no subject repository of its own.

**Geoblocking**: restricting access to a site for visitors from other countries based on their IP address. Along with foreign users, web archives, search engines and data aggregators stop seeing the site.

**GeoDCAT-AP**: the DCAT-AP profile for geodata: how to translate an ISO 19115 layer record into a DCAT description that open data portals understand. data.europa.eu reads national geocatalogs through it.

**GeoPackage**: an open OGC format for geodata: a single file based on an SQLite database holding vector layers, rasters and their description. It opens in QGIS and other programs without a server.

**Geoportal**: a catalog of spatial data and services, often combined with a web map.

**Git LFS**: an add-on to Git for large files: the files themselves are stored separately, and the repository history keeps links to them. The platform has its own file size limits and storage and download quotas for this.

**GTFS**: a format for public transport schedules: stops, routes, trips. The GTFS Realtime extension carries vehicle positions and delays in real time.

**Handle**: the persistent identifier system on which DOIs are also built. A prefix is obtained from the Handle.Net Registry for an annual fee, and you run your own Handle server. DSpace issues Handles by default, but with the placeholder prefix `123456789`, which means nothing outside the site until the organisation registers its own.

**Headless setup**: the catalog platform works only as a core: it stores descriptions, serves an API and harvests other catalogs, while the site for people is built separately. The Toronto and Canada portals on top of CKAN, for example, work this way.

**HealthDCAT-AP**: the DCAT-AP profile for describing health data: the access body, the data category, the number of people in the dataset, age coverage, the legal basis. The European Commission is preparing it for the catalogs required by the European Health Data Space Regulation (EHDS); in 2026 it is a draft specification.

**High-value datasets**: six groups of data that EU public bodies must, under Regulation 2023/138, make available free of charge, in machine-readable form and via API: geospatial, earth observation and environment, meteorological, statistics, companies and company ownership, mobility.

**Hybrid (hybrid catalog)**: a site on which products of different types live side by side, such as datasets and map layers, or an organisation that runs catalogs of several types. Not a separate type: each part of a hybrid is classified and assessed by its own type. The most developed form is a data hub.

**IATI**: a standard for disclosing data on development aid: who funds a project, how much, where and with what result. International organisations, donors and foundations publish in it.

**Indicator catalog**: a catalog of official statistics in which the unit of publication is an indicator with breakdowns by year, territory and other attributes. The user picks the slice they need rather than downloading "the file for a year".

**INSPIRE**: EU rules for spatial data: how to describe layers and how to serve them through a catalog. In force since 2007; since December 2025 the directive is being simplified; the separate INSPIRE Geoportal closed on 1 July 2026, and its role passed to data.europa.eu.

**International Open Data Charter**: six principles for publishing government data, agreed in 2015 by governments, civil society organisations and experts: open by default; timely and comprehensive; accessible and usable; comparable and interoperable; for improved governance and citizen engagement; for inclusive development and innovation.

**ISO 19110**: a feature catalogue standard for geodata: which feature types a layer contains and what attributes they have. In essence, a data dictionary for a map layer. Supported in the GeoNetwork core.

**ISO 19115**: a standard for describing a map layer: what is depicted, for what period, who the author is, in which coordinate system. Records are exchanged in XML according to ISO 19139; the new edition is encoded according to ISO 19115-3.

**ISO/IEC 11179**: a standard for metadata registries: how to describe an individual data element, its definition, permitted values, owner and status.

**JSON**: a text format in which programs exchange data. A person reads it less easily than a table, a program more easily than a PDF.

**JSON Lines**: a file in which each line is a separate JSON record. It is read line by line without loading the whole file into memory, so it suits large dumps with nested fields.

**JSON-stat**: a lightweight format for a statistical table in JSON: values, dimensions and labels in one response. Version 2.0 is the default format of the Eurostat API and PxWebApi 2.

**Knowledge graph**: a database where every variable, place or entity has its own identifier and the links between them are recorded explicitly. It allows a question to be answered across many sources at once. Data Commons works this way.

**Landing page**: the page a DOI or other persistent identifier leads to: the dataset description, a ready citation, the path to the files. The identifier itself does not store files, so without a live landing page it leads nowhere.

**llms.txt**: a short text file about a site for a language model: what is published here and where to look.

**Long-term support (LTS) release**: a data release that is promised to be kept unchanged for a named period. For CELLxGENE Census it is at least five years. The period is written down in advance, not "while the server runs".

**Map server**: a program that serves map layers to other programs via WMS, WFS, ArcGIS REST and similar protocols. Examples are GeoServer, MapServer, QGIS Server, ArcGIS Server. It usually keeps no search records itself, so without a catalog alongside, a layer can only be found by someone who knows the address.

**MCP**: the Model Context Protocol, by which a catalog gives an AI agent a ready list of queries, code lists and instructions so that it does not guess addresses. An MCP server runs on top of the catalog's API. A good server is read-only, needs no key for open datasets and links to the dataset in its answer. More in the chapter [on AI](../11-trends/01-ai-and-data-spaces.md#an-mcp-server-your-own-the-platforms-someone-elses).

**Metadata**: data about data: title, description, publisher, licence, coverage, format.

**Metadata completeness and depth**: completeness shows what share of the necessary description fields is filled in across a catalog's datasets; depth, how detailed the description schema itself is. A third property is accuracy: whether what is in the field is true. A placeholder value such as a period of "1900–2099" makes a field formally filled in but not complete in substance.

**Metadata harvesting**: the automatic periodic retrieval of one catalog's metadata by another.

**Metadata profile**: a refinement of a general vocabulary for a country or sector: which fields are mandatory, which are recommended, and which code list a value comes from. The vocabulary itself does not change: DCAT-AP and DCAT-US are profiles of the same DCAT.

**Metadata registry**: a catalog that stores not data but its descriptions, with versions and statuses: data elements, code lists, table structures. The standard for data element registries is ISO/IEC 11179, for statistical structures SDMX.

**Metadata standard**: a shared language for describing a dataset from the outside: what it is, who the publisher is, for what period, where to download it and on what terms. Other catalogs, search engines and programs read it. Examples are DCAT, DataCite, ISO 19115, schema.org. It differs from a data standard in not describing the columns inside the file.

**Microdata**: records about individual people, households or organisations from censuses and surveys, as opposed to ready summary tables. They are anonymised before publication, and access to the files is often restricted.

**Microdata harmonisation**: bringing the variables of different censuses and surveys to the same codes and definitions so that countries and years can be compared. This is how IPUMS works.

**ML catalog**: a catalog of datasets, and often of models, for training and evaluating machine learning systems. A dataset in it is split into parts, loads from code and is described by a card with biases and limitations.

**ML hub**: a shared hub to which anyone uploads datasets and models: Hugging Face, Kaggle, ModelScope. A data hub is something else: several catalogs of one organisation under a common banner.

**Moderation (review before publication)**: a step at which a curator, moderator or organisation administrator looks at a prepared dataset and either releases it or returns it to the author. It differs from a draft by involving a second person: an author publishes a draft themselves. User texts are moderated too: data requests, comments, discussions.

**MQA**: an assessment of the records data.europa.eu has harvested from a portal: whether DCAT-AP fields are filled in and whether links respond. A catalog's score ranges from 0 to 7.5 and is the average over the descriptions the assessment has counted. A portal that sends nothing to the European catalog gets no score.

**NetCDF**: a format for multidimensional arrays: variables on a grid over time and space. With the CF conventions it holds climate, oceanographic and atmospheric data.

**OAI-PMH**: the protocol by which research repositories serve record descriptions to a harvester. It carries only descriptions, without a file list, so a record harvested through it often does not lead to the data itself.

**Object identifier**: a persistent identifier for an individual record inside the data: a building, a road, an organisation. Different datasets are joined by it without matching names and geometries. An example is GERS in Overture Maps. More in the chapter [on identifiers](../04-features/06-identifiers-and-doi.md#identifiers-of-objects-within-data).

**Object storage**: a cloud or self-hosted file store where each file sits under its own key in a "bucket" and is served over HTTP: Amazon S3, Azure Blob Storage, Google Cloud Storage and S3-compatible systems such as MinIO and Ceph. Space is almost unlimited, but storage and downloads are paid for. Most large catalogs keep uploaded files there.

**OCDS**: the open data standard for procurement: the whole path of a contract from planning and tender to implementation.

**ODIN**: an assessment of countries' official statistics run by Open Data Watch. It looks at the statistical office site and the pages it links to: whether there is data on 22 topics and whether it is open. A country's open data portal may not be part of this assessment.

**ODRL**: a W3C language for machine-readable terms of use: what is permitted, what is prohibited, what must be done. Used in data spaces.

**OGC API**: a family of modern web interfaces to geodata from the OGC consortium: Features for features, Records for a layer catalog and others. Gradually replacing WFS and CSW.

**Ontology**: a rigorous description of a field of knowledge: classes of concepts, their properties and rules by which a program can draw inferences. Stricter than a vocabulary: besides broader/narrower it specifies, for example, that a gene has a location on a chromosome. Usually written in OWL; ontology catalogs include OLS, BioPortal, AgroPortal.

**Open Data Maturity**: an annual assessment of European countries since 2015: policy, portal, metadata quality and impact, in equal parts. It is a survey of national representatives, not a crawl of files. 36 countries took part in the 2025 report.

**Open data portal**: a catalog through which a public body or organisation publishes datasets under open licences: registers, budgets, statistics, transport information. Three conditions together make data open: machine-readable form, an open licence and access without applications or registration.

**Open dataset passport**: the Russian description of a dataset under methodological recommendations version 4.0 (minutes of 12 December 2024, No. 49pr): identifier, title, owner, file link, format and dates. The machine-readable form is a `meta.csv`, `meta.xml` or `meta.json` file. It is not a DCAT profile: international harvesters and dataset search engines do not read it.

**OpenAIRE**: European open science infrastructure. It collects descriptions of publications, datasets and software from repositories via OAI-PMH and from DataCite into a shared graph of research outputs and provides search over it (OpenAIRE Explore). The OpenAIRE CONNECT service builds separate gateways over this graph for research communities.

**OpenAPI**: a format for describing a programmatic interface: which requests it accepts and what it returns. Documentation is built and requests are validated from the description.

**openEO**: an open protocol for processing satellite data on a server: the user sends a chain of operations, and the server returns the result.

**OpenID Connect**: an identity standard on top of the OAuth 2.0 protocol: the catalog sends the user to log in to an external system and receives confirmation of who they are. Keycloak, cloud account systems and the French ProConnect run on it.

**OpenSharing (Delta Sharing)**: an open protocol by which a cloud platform gives a buyer access to a provider's tables without copying the data. Created by Databricks as Delta Sharing in 2021, it became OpenSharing in June 2026 and moved to the Linux Foundation.

**ORCID**: a persistent identifier for a researcher. Datasets and articles are linked to an author by it, even if their name is spelled in different ways.

**Orthophoto**: an aerial or satellite image corrected so that it can be overlaid on a map and used to measure distances. One of the most sought-after geoportal layers.

**OWL**: the W3C ontology language: classes, properties and inference rules on top of RDF. Many life science and agriculture ontologies are written in it.

**Pagination**: an API or dump response split into pages with a set number of records. A program goes from page to page until the last one. Many APIs have a depth limit: pages beyond a certain record are not served.

**Parquet**: a columnar table format: it stores column types and compresses data by column. A file is several times smaller than CSV, and analytical programs read it faster.

**PC-Axis (PX)**: a file format for statistical tables with a built-in description of dimensions and units. PxWeb's native format; many open data portals serve it too.

**Persistent identifier (PID)**: a name for an object that does not change, plus a service (a resolver) that sends you from that name to the object's current address. Examples are DOI, Handle, ARK. Persistence is ensured not by technology but by an owner who updates the address at every move.

**Piveau**: a free catalog platform built around DCAT and harvesting other catalogs. data.europa.eu runs on it.

**Platform core**: the capabilities included in the software distribution. This also includes a module from the same distribution that is merely switched on in settings: it has the same author and the same update cycle. A separate repository with its own compatibility is already an extension.

**Processing next to the data**: the catalog serves not a file but a selection or the result of a calculation performed on the server. Examples are ERDDAP, openEO, Climate Data Store.

**Protected data**: public sector data that cannot be published openly: personal data, trade secrets, statistically confidential data. Under the European Data Governance Act their descriptions are collected in a single information point in each country, and the data itself is issued on request under conditions that preserve protection.

**Public use file**: an anonymised microdata file issued after registration and agreement to terms, without an application review. More detailed and stricter is a licensed file on an approved application; stricter still is working only in a trusted research environment.

**Publicly available and open data**: publicly available data can be viewed on a site or map; open data can be downloaded in full in machine-readable form, under a free licence and without applications. Free issue on application is not yet open data.

**Publisher**: the organisation responsible for a dataset in substance and legally. It may differ from the organisation in the catalog software under whose name the dataset was created.

**Publishing editor**: the person who uploads a file and fills in a record according to a template. They do not set the licence or the content: the lawyer and the data owner do that.

**PURL and w3id.org**: free persistent address services: an address on purl.org or w3id.org redirects to where the resource currently is, and when it moves only the redirect rule changes. purl.org is run by Internet Archive, w3id.org by the W3C community; rules are added to it by a pull request to a GitHub repository.

**Quality metric**: a share of datasets with a recorded denominator, a rule for "what counts as filled in" and a calculation date. Such a share shows what to fix. The number of datasets in a site footer has none of these notes.

**RDF**: a general model for recording information as "subject, property, value" statements. DCAT, SKOS and other linked data vocabularies are built on it.

**re3data**: an international registry of research repositories: subjects, access conditions, certificates.

**Reference manager**: a program where a researcher keeps their sources and from which they insert citations into a text in the required style: Zotero, EndNote, Mendeley, JabRef. It accepts citations as BibTeX, RIS or CSL-JSON files and can save them straight from a page via meta tags.

**Reproducibility**: the ability to obtain the stated result again from the published data and the recorded steps. An "open data" badge and a DOI say that the file is published and can be cited. Whether the calculation matches the stated result is checked separately.

**Requester Pays**: a cloud bucket mode in which the owner pays for storage and whoever reads the file pays for the download. A cloud account is needed for this. Such a file cannot be downloaded anonymously, so the mode does not suit open data.

**Research repository**: a catalog that accepts and preserves research data for the long term, issues persistent identifiers for it (most often DOIs) and helps cite it.

**Reuse**: an application, article, study or visualisation built on a dataset and linked to its record on the portal. Reuses show who needs the dataset; data.gouv.fr has a model section of this kind.

**RFC 9727 (api-catalog)**: a 2025 IETF standard: at `/.well-known/api-catalog` a site serves a program a list of its interfaces. Rare in 2026.

**RO-Crate**: a way to package research files together with a description: next to the data sits a `ro-crate-metadata.json` based on schema.org. This is how a research object is deposited and transferred. A national catalog is not harvested with this file. Recommendation 1.3 is dated 22 June 2026.

**Role**: a set of rights given to a person within an organisation, collection or community: a member sees private datasets, an editor creates and edits, an administrator also manages people. Rights are given to roles rather than people so that individual permissions do not have to be gone through when staff change.

**ROR**: an open registry of research organisations with persistent identifiers. In a dataset description, a ROR link identifies the author's or publisher's organisation unambiguously.

**SAML 2.0**: a 2005 OASIS standard for single sign-on: an organisation's account system passes the catalog a signed assertion of who logged in and what attributes they have. The basis of university login federations and Shibboleth.

**schema.org/Dataset**: markup on a dataset page by which search engines find it. Google requires a description of 50 to 5,000 characters.

**SDMX**: a standard for exchanging statistics: not a file for one year but a series with dimensions. It includes a model for describing tables (dimensions, code lists, attributes), the SDMX-ML, SDMX-JSON and SDMX-CSV formats and API rules. It is maintained by seven international organisations, among them Eurostat, the IMF and the OECD; the current version is 3.1 (2025), but most services work with 2.1.

**Search index**: a separate copy of dataset descriptions built for fast search and filtering; in catalogs it is usually Solr, Elasticsearch or OpenSearch. If the index has diverged from the description database, a dataset exists but cannot be found.

**Shared hub**: someone else's platform where an author publishes their dataset together with a record: Zenodo, Figshare, Hugging Face, Kaggle, Source Cooperative. A data hub is something else: several catalogs of one organisation under a common banner. An ML hub is a kind of shared hub where models sit next to datasets.

**Signed (temporary) link**: a file address in object storage with a signature and an expiry, after which it stops working. Portals issue one on download so that the file comes straight from the cloud: on HDX such a link lives for a few minutes. It cannot be cited in an article or a program; only the file's persistent address on the portal can.

**Single sign-on (SSO)**: logging in to a catalog with an account from an external system (an agency, a university, a cloud provider or a government identity system) rather than a separate portal password. The external system checks identity using SAML 2.0 or OpenID Connect. A departing employee loses access to the catalog together with the organisation's other systems.

**Sitemap**: a file listing page addresses. A search engine crawls a site by it.

**SKOS**: a way to describe a vocabulary of terms and the links between them (a 2009 W3C Recommendation): each concept has an address, names in different languages, a code, broader/narrower relations and mappings to concepts in other vocabularies.

**Software class**: the kind of program a catalog is built on: a cloud service, a ready-made platform on your own server, a map server or protocol server, a CMS site, in-house development. The class determines who updates the program and what leaving costs; the catalog type determines what is published in it.

**Spatial data infrastructure (SDI)**: a shared system of rules, catalogs and services through which a country's or region's authorities describe and serve their layers. The visible part is a geoportal and a shared catalog; in the EU such infrastructures are built under the INSPIRE directive.

**SPDX**: short licence codes, so that a program can recognise a licence without parsing legal text.

**STAC**: a protocol for describing spatial files: where a file is, what territory and date it relates to, how to download it. It arose for satellite imagery and is now used for other geodata too. It is not a program: STAC is served by separate servers, static sets of JSON files and modules of general-purpose platforms such as GeoServer.

**StatDCAT-AP**: an extension to DCAT-AP for statistical tables: dimensions, attributes, a link to an SDMX structure. It is needed so that a statistical office's tables appear on an open data portal. The current version is 1.0.1 (2019). Since 10 June 2026 version 3.0.0 has been a working draft aligned with DCAT-AP 3.0.1.

**Static site**: a site made of ready HTML files. A generator builds them from sources, and the hosting only serves the files: there is no separate database or application server.

**Synthetic data**: artificial records that reproduce the statistical properties of real ones but do not describe real people. They are published instead of closed microdata.

**Table Schema**: a Frictionless family standard for a table's data dictionary: column names, types, permitted values.

**Table store**: the catalog's database into which rows of tables from files are loaded so they can be shown in the browser, filtered and served in parts through an API. In CKAN it is DataStore on PostgreSQL; in cloud services such as Huwise and Socrata the dataset is a table in their database. A full dump is still needed alongside.

**Technical specification**: the document by which a contractor builds or configures a system: what it must be able to do, on what terms and how the result will be checked. For a data catalog it is above all a list of requirements.

**Template portal**: the same portal build that a government or vendor hands out to dozens or hundreds of public bodies: each has its own showcase, but the software, description fields and dump are shared. Examples are GD Catalog in Thailand, BODIK ODCS in Japan, Municipium in Italy.

**Test data contamination**: the test part of a benchmark getting into a model's training data, most often along with texts from the internet. A model's result on such a benchmark is inflated. Protection is hidden answers for the test part and special markers in files by which they are filtered out of training sets.

**Theme and tag**: a theme is taken from a shared code list (the EU Publications Office themes, ISO 19115 topic categories), so datasets from different portals add up by it. A tag is the publisher's free word; to a program, "transport" and "Transport" are different tags.

**Tiered access**: access to a dataset in tiers: description, variables and summary statistics, a sample, all data. Each tier is opened separately: to everyone, to specific people or after conditions. An example is Redivis.

**Time series**: values of one indicator for the same breakdowns, arranged in time: the dollar-to-euro rate by day, a region's population by year. In a good indicator catalog a series has a persistent address built from code-list codes.

**Tombstone page**: a page left in place of a withdrawn dataset with a DOI: the citation, the DOI itself and an explanation of why the data is no longer there. It is needed because a DOI cannot be deleted.

**Trust score**: an optional catalog score in the dataportals-registry, from 0 to 100. It is made up of the owner type, the catalog type, the licence, a re3data record and whether the site responds. It is a filter for thousands of other people's catalogs. It is not a certificate and does not open files.

**Trusted research environment**: a secure environment where an approved researcher works with confidential data without downloading it; results are checked before release. An example is SecureLab at the UK Data Service.

**Undocumented (implicit) API**: a programmatic interface that a site serves although the owner has not described it: the API from which the page itself gets its data, or a platform's default interface such as WordPress's `/wp-json/`. Useful for retrieving data, but it changes without warning.

**Version and revision**: a dataset version is a fixed state of the data that can be cited; in research repositories each version has its own identifier. A revision is a minor edit to the description within one version and does not create a new version.

**VIVO**: free software for an organisation's researcher profiles: people, publications, projects, sometimes datasets. It is not a data catalog in the strict sense, but its installations appear among search engines in registries.

**WARC and WACZ**: web archive formats. WARC stores page snapshots together with server responses; Internet Archive and national libraries read it. WACZ is the same archive packed into a ZIP together with an index; it can be opened in a browser without a server.

**Web archive**: a collection of snapshots of sites taken by a crawler on different dates. The largest is Internet Archive (web.archive.org); national libraries and archives keep their own web archives. It preserves pages well, and data from a programmatic interface and large files poorly.

**WMS and WFS**: OGC protocols for geodata. WMS serves a picture of a layer for viewing, WFS the features themselves, which can be downloaded and processed. WMTS serves a map in pre-cut tiles, so it is faster than WMS but also only for viewing.

**XBRL**: a financial reporting language in which each line of a report is tagged with a machine-readable code. Companies in many countries file their reports to regulators in it.

**XKOS**: a SKOS extension for statistical classifications from the DDI Alliance: classification levels, correspondence tables between editions, "includes" and "excludes" notes.

**Zarr**: a format for a multidimensional array made of separate chunks. A program reads the needed chunk over the network. Climate fields, model outputs and other arrays that do not fit in one file are published this way.

**Zenodo**: a general research repository at CERN. It accepts data from any discipline, issues DOIs and can automatically archive GitHub repository releases.
