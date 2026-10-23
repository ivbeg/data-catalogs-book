---
title: ML Catalogs
description: Catalogs of datasets and models for machine learning, including hubs, competition platforms, collections and government AI data platforms. What they publish, what they run on and where they break.
---

# ML Catalogs

An ML catalog publishes datasets for training and evaluating machine learning models, and often the models themselves. A dataset here is not meant to be read by a person or cited in a paper, but to be loaded into code by another researcher who compares their model with others on the same data.

The main practical conclusion of the chapter: almost no one who publishes such a dataset needs a catalog of their own. Datasets are searched for on a few large platforms, and conferences, libraries and search engines look there too. A catalog of your own is justified when the data cannot be handed to someone else's platform, and a copy of the release for long-term preservation goes into a research repository.

The scale confirms this. On 12 October 2026 Hugging Face had 1,085,895 datasets and 3,143,746 models, OpenML 6,434 active datasets, and the UCI archive 689. In the dataportals-registry (release 1.27.0 of 15 October 2026) there are only 100 ML catalogs. The registry counts websites, not datasets: Hugging Face and Kaggle are one record each for huge platforms, next to websites of a single benchmark with a few datasets. The number of registry rows says nothing about the size of this world.

## What makes a catalog an ML catalog

Five things distinguish an ML catalog from an open data portal and a research repository.

- **The dataset is split.** The training part (train) is for training a model, the validation part for tuning settings, and the test part for honestly measuring the result. The split is fixed in advance, otherwise the results of different authors cannot be compared.
- **The dataset is loaded from code.** Instead of a link to an archive, the dataset page has a line of code that loads it with a library: `datasets` for Hugging Face, `kagglehub` for Kaggle, `openml` for OpenML.
- **The dataset has a card.** This is a description of the composition, the collection method, known biases and limitations: on what data a model will perform worse and what the dataset is not suitable for.
- **The licence answers the question about training.** Can a commercial model be trained on the dataset, can derived datasets be published, must the source be credited.
- **Models and results sit next to it.** Which models were trained on the dataset and what results they showed on the test part. A dataset with a shared results table is called a benchmark.

If none of this is present, you are looking at an ordinary catalog that, among other things, holds datasets suitable for machine learning. This happens with open data portals: they have many tables on which models are trained, but no splits and no cards describing biases.

## Kinds of ML catalogs

The hundred registry records are varied: they are eight different kinds of websites. The classification below was made for this book from the titles and addresses of the records; the registry itself has no such field.

| Kind | What it is | Examples | Records |
|-----|---------|---------|--------:|
| Organisation collection | a university, lab or company publishes its own datasets | UCI archive, OpenML, Monash Forecasting, Yandex Research, Moscow State University CMC datasets | 23 |
| Hub | a shared platform where anyone uploads datasets and models | Hugging Face, Kaggle, ModelScope, OpenDataLab, Roboflow Universe | 15 |
| Competition and benchmark platform | a task, data, a hidden test part and a results table | Codabench, EvalAI, Grand Challenge, Zindi, DrivenData, Tianchi | 14 |
| Single-benchmark website | a project page with several datasets and a results table | Open Graph Benchmark, Therapeutics Data Commons, DataComp | 14 |
| Government AI data platform | datasets the state collects or funds for its developers | AI Hub (Korea), AIKosh (India), NAIRR (US), AI-on-Demand (EU), the CIT registry (Russia) | 13 |
| Library catalog | a list of datasets and models a particular library loads | TensorFlow Datasets, Keras, PyTorch Hub, NVIDIA NGC | 9 |
| List and guide | a selection of links to datasets, mostly on other hubs | Hugging Face dataset collections by language, Open Corpus Registry, Post-Training Data Atlas | 9 |
| Data vendor | a company sells ready-made and custom training datasets | Datatang, GTS AI | 3 |

The kind determines what to check. For a hub, the card and licence of a specific dataset, not of the platform as a whole. For a competition platform, the terms of using the data after the competition ends. For a library catalog, where the library actually downloads the files from. For a government platform, who can get the data at all. Data vendors are closer to marketplaces; they are covered in the chapter [on other types](./10-other-types.md).

## Who builds them

ML catalogs are run mainly by universities and companies. Governments are fewer here than in other types, but their share is growing.

| Owner | Records |
|----------|--------:|
| Universities and research organisations | 37 |
| Companies | 31 |
| Communities | 16 |
| Central government | 8 |
| Civil society organisations | 5 |
| Regions | 2 |
| International organisations | 1 |

By country a third of the records are international (34). Then come the US (19), China (12), Russia (6), Japan and Korea (5 each), Germany and India (4 each). China has its own ecosystem of hubs and competition platforms: Alibaba's ModelScope, OpenDataLab and OpenXLab of the Shanghai AI Laboratory, the BAAI platform, Tianchi, Baidu AI Studio, HeyWhale and WiseModel. The Russian records are datasets from Yandex and from the computer graphics lab of Moscow State University's CMC faculty, the Moscow medical datasets MosMedData, the datasets section of the Moscow AI portal, Medical Data Hub and the CIT registry of the Ministry of Industry and Trade.

There are 78 custom-built websites among ML catalogs, and another 9 are made with the Jekyll static site generator on GitHub Pages; that is more than half of the single-benchmark websites. A programming interface is marked for only 23 records. Ready-made platforms are found mainly for competitions: CodaLab, Codabench, EvalAI and Grand Challenge.

## What they publish

- **Training and test datasets**: texts, images, speech, video, tables, graphs, molecules. Large text datasets for language models take terabytes, a tabular dataset from the UCI archive kilobytes.
- **Models**: files with the weights of a trained network, with a model card: what it was trained on, what it is good for, where it makes mistakes. Hugging Face has three times as many models as datasets.
- **Tasks and results**: competition terms, the metric used to compare models, and the results table.
- **Derived datasets**: subsets, translations, re-annotations of other datasets and synthetic data generated by another model. This is now probably the fastest-growing part, and it is the one with the worst provenance.

A library catalog is a special case. TensorFlow Datasets or `torchvision` store not data but loader code: the address of the source file, a checksum and the split rules. The file still sits with the dataset's author or on a mirror, and when the original website disappears, loading breaks for all users of the library. An example is in the section [Where it breaks](#where-it-breaks).

## Standards

**Dataset card.** This is text for a person: what is in the dataset, how and why it was collected, who annotated it, what biases are known, what the dataset should not be used for. The idea was proposed in the paper "Datasheets for Datasets" (Gebru et al., 2018); similar templates are Google's Data Cards and model cards (2019). On Hugging Face the card is a `README.md` file in the dataset repository. At the top of the file is a metadata section: licence, languages, tasks, size, and which files belong to which split. Search filters work on these fields.

**Croissant.** A machine-readable description of an ML dataset maintained by the MLCommons consortium. It is built on top of schema.org/Dataset and adds what a program needs to load the data: which files make up the dataset, what fields and types they have, how the dataset is split, where the labels are. A Croissant file is also ordinary schema.org markup, so search engines read it too: Google Dataset Search indexes datasets from it and can show only datasets with Croissant.

- Version 1.0 came out in 2024, version 1.1 on 29 January 2026. Version 1.1 adds data provenance using the W3C PROV-O vocabulary (from what and by what process a dataset or an individual field was produced), usage terms using the DUO and ODRL vocabularies (for example, "research only, not commercial"), rules for dataset versions and file checksums, and a flag for datasets that are continuously appended.
- The RAI extension (Responsible AI, version 1.0 of March 2024) describes a dataset's limitations, biases, sensitive information, intended use, whether the data is synthetic and which datasets it was made from.
- GeoCroissant 1.0 (January 2026) is an extension for geodata: coordinate reference system, coverage, imagery.

Implementations lag behind the specification. On 12 October 2026 Hugging Face, Kaggle, OpenML, Harvard Dataverse and the ckanext-dcat extension served descriptions marked as version 1.0. If you need the provenance and usage terms fields from 1.1, fill them in yourself and check that the platform does not lose them.

**Conference requirements.** NeurIPS, the main scientific conference on machine learning, requires a Croissant file in its data track. In 2026 the track is called Evaluations & Datasets, and the file is needed for every submission that introduces a new dataset. In the same year minimal RAI fields were added to the mandatory Croissant fields. The preferred platforms under the track's rules are Kaggle, OpenML, Hugging Face and Dataverse: they generate the main Croissant fields themselves, and the author adds the RAI fields. If the dataset is on the author's own website, the author makes the whole Croissant file. For a catalog this means that Croissant support is no longer a nicety but a condition for a paper with a new dataset to be accepted in this track.

**Formats.** Tables on hubs are increasingly stored in Parquet: it has column types, and programs read it in parts without downloading it whole. Hugging Face converts datasets to Parquet itself, but no more than 5 GB: if the dataset is larger, the converted copy will be incomplete. Hugging Face generates a Croissant description only for datasets it managed to convert, so an archive of images in ZIP will remain without one. OpenML has historically stored tables in ARFF, the format of the Weka program, and serves Parquet alongside. Formats in general are covered in the chapter [on formats and units of publication](../02-data/02-formats-and-units.md).

**Licences.** Besides the usual Creative Commons and free software licences, there are licences with use restrictions here, for example OpenRAIL (bans on certain uses of a model), "research only" notes and competition rules, which often allow the data to be used only within the competition. A dataset's licence does not override the rights to the source material: an image dataset under CC BY does not make the images themselves free if they were collected from the internet.

**Disclosure of training data.** Since 2 August 2025 developers of general-purpose models in the EU have been obliged by the AI Act (Article 53) to publish a summary of the data on which a model was trained. The European Commission published the template on 24 July 2025, and its use is mandatory; for models released before 2 August 2025 the deadline is 2 August 2027. The summary lists the main datasets and other sources. For such a summary to be compiled and checked, a dataset needs a persistent name, an address, a version and a licence, which is exactly what a good card in a catalog provides.

**DOI.** In ML catalogs a DOI is an exception, not a rule. Hugging Face issues a DOI via DataCite at the click of a button in the dataset settings; after that the dataset cannot be deleted, renamed or hidden without contacting support. As of 12 October 2026 Hugging Face had 5,433 dataset DOIs in DataCite, about half a percent of its datasets. Kaggle has issued 66,208 dataset DOIs, the UCI archive 693. How DOIs work is covered in the chapter [on identifiers](../04-features/06-identifiers-and-doi.md).

## Platforms

There are two different choices here: publish a dataset on someone else's platform, or set up an ML catalog of your own.

### Other people's platforms

| Platform | What it is | Loading from code | Croissant | DOI | Limitations |
|----------|---------|----------------|-----------|-----|-------------|
| Hugging Face Hub | cloud hub for datasets and models | the `datasets` library, API, `hf://` addresses in DuckDB, pandas and Polars | generated automatically for datasets converted to Parquet | at the click of a button, via DataCite | gated access is enabled by the author; free space for public datasets is "best effort", 100 GB for private ones |
| Kaggle | cloud platform for datasets, models and competitions | `kagglehub`, Kaggle API | on the dataset page and at `/croissant/download` | issues them, prefix 10.34740 | up to 200 GB per dataset; files are downloaded after login |
| OpenML | open-source platform for datasets, tasks and experiments (BSD-3) | the `openml` library, API | at `/croissant/dataset/` plus the dataset number | not found in the documentation | mostly tables; a task fixes the split and the metric |
| Codabench | open-source competition and benchmark platform (Apache-2.0) | — | no, it is not a dataset catalog | no | the test part can be hidden from participants |
| Zenodo | generalist research repository | API | no | for each version | up to 50 GB per record free |

Codabench is the successor of CodaLab Competitions. CodaLab stopped accepting new competitions in September 2025 and closed submissions on 31 December 2025. Tasks are moved to Codabench unchanged, but results tables are not: submissions have to be made again.

Platforms provide what your own catalog will not have for a long time: an audience, loading from code, table previews, Croissant and download counts. The price is dependence on a single company. What this risks and how to hedge is covered in the chapter [on cloud storage and hubs](../08-beyond-portals/04-cloud-storage-and-hubs.md).

### Your own catalog: what is in the core and what is not

An installation of your own is usually built on a research repository or open data portal platform with Croissant added. There is no dedicated open-source ML catalog platform that can be installed as easily as CKAN or Dataverse. OpenML can be deployed on your own servers, but it is a complex system for experiments, not just a catalog.

| Capability | Hugging Face | Kaggle | OpenML | Dataverse | CKAN |
|-------------|--------------|--------|--------|-----------|------|
| Croissant | core | core | core | core since 6.10, an external exporter before that | the ckanext-dcat extension, `croissant` plugin |
| Splits | core: splits are described in the card | no: only the dataset's files | core: a task defines the split | no | no |
| One-line loading from code | core | core | core | no: API and the pyDataverse client | no: API and direct file links |
| Gated access | core: the author enables access requests | no: only an entire private dataset | not found | core: restricted files with access requests | only an entire private dataset |
| DOI | core | core | not found | core | the ckanext-doi extension |

Details for your own installations:

- **CKAN.** The `croissant` plugin in the ckanext-dcat extension appeared in version 2.3.0 (February 2025); the latest release of the extension is 2.4.4 of 11 August 2026. The description is embedded into the dataset page and served at `/dataset/<id>/croissant.jsonld`. Table fields (`RecordSet` in Croissant terms) get into the description only if the file is loaded into the CKAN DataStore table store. Otherwise a program will learn about the file but not about its columns. On the extension itself and its compatibility with CKAN versions, see the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md).
- **Dataverse.** Since version 6.10 Croissant is built into the core: the dataset page embeds a slim version without the file list, and the full description comes from the export. Before that it was an external exporter from the GDCC community (latest release 0.1.6), which worked with Dataverse 6.0 and later and embedded the description into the page from version 6.2; its repository is now marked as deprecated. Installations older than 6.10 still add Croissant with that exporter. On 12 October 2026 Harvard Dataverse served Croissant via an API request.
- **GeoNetwork** embeds schema.org markup into the record page. Croissant fields for the ISO 19115-3 schema have been added to the branch of the upcoming 4.4.13 release; release 4.4.12 does not have them. This is useful if the training datasets are imagery and layers.
- **InvenioRDM and Zenodo** do not serve Croissant: the platform code has schema.org, Data Package and RO-Crate markup, but not Croissant.
- **A static site.** Nine benchmark websites in the registry are made with Jekyll and hosted on GitHub Pages. For a collection of several datasets this is enough, provided each dataset has a Croissant file checked with the validator next to it, and the files themselves are on a hub or in a repository with a DOI. How to make such a website is covered in the chapter [on static sites](../08-beyond-portals/02-static-sites.md).

## Government AI data platforms

Governments increasingly build their own ML catalogs: they collect datasets in national languages, on health, transport and industry, and hand them to their own developers. They are organised differently from hubs and are closer to microdata catalogs: what matters most is who has the right to get the data.

- **AI Hub, Korea.** Run by the National Information Society Agency (NIA) on behalf of the Ministry of Science and ICT. The dataset pages state plainly that only Korean citizens can apply for data. A foreign organisation needs a separate contract with the contractor and NIA, and exporting data abroad also requires a contract. Medical data is opened in a "safe zone": on NIA's server without downloading, and a trained model is released after review.
- **AIKosh, India.** In 2026, more than 12,000 datasets and models. A dataset has a quality score and terms of use, downloading requires registration, and the licence usually prohibits commercial use. Alongside is Bhashini Vatika, a platform for language datasets.
- **US and EU.** The pilot of the National AI Research Resource (NAIRR) provides a list of partners' datasets, models and computing resources. The European AI-on-Demand catalog collects datasets, models and tools from EU projects.
- **Russia.** The registry of industry machine learning models and datasets is run by the federal autonomous institution CIT under the Ministry of Industry and Trade. In December 2025 it had 42 datasets and 7 models; on 12 October 2026, 141 datasets. Among them are copies of other people's datasets from Hugging Face and Kaggle with a link to the source in the description, and the licence on the card is written as the words "Free licence" without a name. Moscow publishes a datasets section on the city's AI portal and the MosMedData medical imaging datasets.

The conclusion for such a platform: if the data is closed, at least the card should be open, with the licence, provenance and access procedure, in Croissant and schema.org. Then the dataset can be found from outside, and a researcher understands whether it is worth applying. How access on request and a secure environment work is covered in the chapter [on microdata catalogs](./06-microdata-catalogs.md) and in the chapter [on access and workflows](../04-features/08-access-control-and-workflow.md). The trend as a whole is in the chapter [on AI and data spaces](../11-trends/01-ai-and-data-spaces.md#government-data-catalogs-for-ai).

## Examples

**Hubs**

- [Hugging Face Datasets](https://huggingface.co/datasets): datasets and models in one place, loading from code, Croissant and DOIs.
- [Kaggle Datasets](https://www.kaggle.com/datasets): datasets, notebooks and competitions.
- [ModelScope](https://www.modelscope.cn/datasets): Alibaba's Chinese hub of datasets and models.

**Collections and archives**

- [UC Irvine Machine Learning Repository](https://archive.ics.uci.edu): one of the oldest archives of ML datasets, with an API and DOIs for datasets.
- [OpenML](https://www.openml.org): datasets together with tasks, splits and experiment results.

**Competitions and benchmarks**

- [Codabench](https://www.codabench.org): competitions and benchmarks with a hidden test part.
- [Open Graph Benchmark](https://ogb.stanford.edu): a single-benchmark website on GitHub Pages: datasets, a loader and a results table.

**Library catalogs**

- [TensorFlow Datasets](https://www.tensorflow.org/datasets/catalog/overview): a list of datasets that the TensorFlow library loads.

**Government platforms**

- [AI Hub](https://aihub.or.kr): Korea.
- [AIKosh](https://aikosh.indiaai.gov.in/home/): India.
- [CIT registry of industry models and datasets](https://registry.cit.gov.ru/datasets): Russia.

## Where it breaks

**The licence is unclear or wrong.** The Data Provenance Initiative study (Longpre et al., 2023; journal version in Nature Machine Intelligence, 2024) traced the provenance of more than 1,800 text datasets for fine-tuning language models. For popular datasets on GitHub and Hugging Face, more than 70% of licences were not specified at all. Where there was a licence, for 66% of datasets on Hugging Face it belonged to a different category than the licence of the original data author, and was usually more permissive. A dataset is moved from platform to platform, and restrictions are lost along the way.

**The card is empty.** According to a study of Hugging Face cards (ICLR 2024, data as of March 2023), of 24,065 dataset repositories only 30.9% had a non-empty card. But these accounted for 95% of downloads. All recommended sections were filled in for 86% of the hundred most downloaded datasets and only for 7.9% of datasets without downloads. The section on the risks of using the data took up only 2.1% of the text in the most popular datasets. The hub shows such datasets in search on an equal footing with well-described ones.

**A dataset is withdrawn, but copies live on.** On 19 December 2023 the Stanford Internet Observatory found links to child sexual abuse images in the LAION-5B dataset. LAION took the dataset and its derivatives down the same day. On 30 August 2024 a corrected version, Re-LAION-5B, was released with 2,236 links removed. Models trained on the old version and copies of the old dataset on other platforms remained. A good catalog in such a case does not delete the dataset page but keeps it with a "withdrawn" note, the reason and a link to the replacement. Then whoever arrives from a link in a paper will learn what happened.

**The library points to a dead website.** The classic MNIST handwritten digits dataset was downloaded by the `torchvision` library from the personal page of one of the dataset's authors, Yann LeCun. The page started responding with a 403 refusal, and loading broke for users. The library developers got permission to keep a copy of the dataset themselves and later put their own mirror first in the list. What saved the day was that each file has a checksum recorded in the code: it shows that the file from the mirror is the same. Croissant 1.1 strongly recommends recording such checksums for all files of a versioned dataset.

**The test part leaked into training.** Language models are trained on texts from the internet, and published test sets get into training together with the answers. Then a model's benchmark result is inflated, and the comparison loses its meaning. There are two defences. The first is not to publish the test answers: in the GLUE dataset on Hugging Face, all 1,063 rows of the test part of the CoLA task have the label `-1`, and the score is calculated by the benchmark server. Hidden results tables on Kaggle and Codabench work the same way. The second is a "canary" string: a special string is written into every task file of the BIG-bench benchmark so that compilers of training datasets can find and exclude such files.

**Files only after login.** Kaggle itself marks the file as requiring login in the dataset page markup (`requiresSubscription: true`). On Hugging Face the author can enable access requests, at AI Hub only Korean citizens get the data, and at AIKosh only after registration. For a person this is an inconvenience; for a dataset search engine or harvester it is a dataset without files. If a restriction is necessary, the card should still be open, with the reason and access procedure written in it.

**The platform closed.** For years Papers with Code linked papers, code, datasets and results tables. On 24 July 2025 Meta shut the service down, and the address of the datasets section now leads to the Hugging Face trending papers page, which has neither datasets nor results tables. The last data snapshot was saved as an archive, but links from papers to dataset pages stopped working. The catalog registry does not learn about this immediately: in release 1.27.0 the Papers with Code record is still marked as active and with an API. Likewise, when CodaLab closed, results tables were not moved to Codabench. The conclusion for a dataset author: a card on a hub is a way to find the dataset, not a place for its long-term preservation. A copy of the release with a DOI is kept in a research repository.

**The page is empty without a script.** On 12 October 2026 the datasets section of the Moscow AI portal served a robot an empty page shell of about a kilobyte, while the list of datasets was drawn by a script. A search engine, a web archive or an AI assistant will not see such a list. How to fix this is covered in the chapter [on discoverability](../07-publishing/05-discoverability.md).

**A custom website without an API.** Of the 78 custom ML catalogs in the registry, 13 have a programming interface marked. For an ML catalog this is especially strange: its users work from code and hardly use a browser.

## How to check an ML catalog and a dataset

Six questions for a specific dataset:

1. **Is there a machine-readable description?** Request Croissant or look for schema.org markup on the dataset page.
2. **How is the dataset split, and where are the test answers?** If the answers are published, results on it may be inflated.
3. **What is the licence, and where does the data come from?** The licence must be named, and for a derived dataset the source dataset and its licence must be stated.
4. **Can it be downloaded without login and without a browser?** Try loading the dataset from code or by a direct link.
5. **Is there a version and a persistent identifier?** A DOI, or at least a version number and file checksums.
6. **Is there a copy outside the platform?** If the dataset is only on one hub, the hub closing is equivalent to deletion.

```bash
# Hugging Face: Croissant description and the list of Parquet files by split
curl -s "https://huggingface.co/api/datasets/nyu-mll/glue/croissant"
curl -s "https://datasets-server.huggingface.co/parquet?dataset=nyu-mll/glue"
# Read part of a dataset straight from the hub, without downloading an archive (DuckDB 0.10.3 and later):
# in the CoLA test part all labels are -1, the answers are hidden
duckdb -c "SELECT label, count(*) FROM 'hf://datasets/nyu-mll/glue/cola/test-*.parquet' GROUP BY 1"
# Kaggle: a dataset's Croissant (the response redirects to a file in cloud storage)
curl -sL "https://www.kaggle.com/datasets/unsdsn/world-happiness/croissant/download"
# OpenML: Croissant and the dataset description with ARFF and Parquet file addresses
curl -s "https://www.openml.org/croissant/dataset/61"
curl -s "https://www.openml.org/api/v1/json/data/61"
# UCI: dataset description, the response includes a DOI
curl -s "https://archive.ics.uci.edu/api/dataset?id=53"
# Dataverse: the full Croissant description
curl -s "https://dataverse.harvard.edu/api/datasets/export?exporter=croissant&persistentId=doi:10.7910/DVN/TJCLKP"
# DataCite: how many dataset DOIs Kaggle has issued (prefix 10.34740); Hugging Face's prefix is 10.57967
curl -s "https://api.datacite.org/dois?prefix=10.34740&resource-type-id=dataset&page%5Bsize%5D=0"
# Validate your own Croissant file before publishing
pip install mlcroissant
mlcroissant validate --jsonld metadata.json
```

All commands were checked on 12 October 2026. In the responses from Hugging Face, Kaggle, OpenML and Dataverse, the `conformsTo` field specifies Croissant 1.0. The general list of checks is in the [checklists](../12-appendices/04-checklists.md).

## How to choose

| Situation | What to choose | Why |
|----------|-------------|--------|
| A dataset for a paper, or a research group's benchmark | Hugging Face or Kaggle, a copy of the release with a DOI in Zenodo or a research repository | that is where datasets are searched for and loaded from code; conferences accept these platforms, and a copy with a DOI will outlive the platform |
| A competition with a hidden test part | Codabench (the shared codabench.org or your own installation) or Kaggle competitions | hidden answers and a results table are in the core; your own website will not provide this |
| The data cannot be given to someone else's platform: health, personal data | your own repository with access on request, for example Dataverse (Croissant in the core since 6.10), or a secure environment | restricted files with access requests are in the Dataverse core; an open card in Croissant makes the dataset findable |
| An open data portal wants its datasets to be used for training | do not build a separate ML catalog; enable the `croissant` plugin in CKAN, serve tables in Parquet with a field dictionary | developers will find the dataset through a dataset search engine and load it without manual work |
| A lab's collection of a dozen datasets | a static site with a Croissant file for each dataset, files on a hub or in a repository with a DOI | cheap and durable; most benchmark websites are built this way |
| A government AI data programme | a catalog with open cards and access on request, Croissant, description export and an API | closed data stays under control, while descriptions are visible from outside and reach search engines |

### When you do not need your own ML catalog

Almost always, if the goal is for the dataset to be found and used. The audience, loading from code and Croissant already exist on the hubs, while your own website will have to be maintained for years for the sake of a few datasets. A careful card on a hub, a named licence, splits and a copy of the release with a DOI are enough.

A catalog of your own is justified in three cases: the data cannot be put on someone else's platform; the hub does not accept your type of files or volume; you are a government or industry programme that must keep track of and distribute datasets from many organisations. Even then the card is worth duplicating where people will look for the dataset. How to justify such a decision is worked through in the chapter ["Build, Open Source or SaaS"](../06-choice/05-build-or-buy.md).

## How it differs from its neighbours

| Neighbour | Main difference |
|-------|-----------------|
| Research repository | the main thing is an immutable version with a DOI and a citation from a paper; in an ML catalog, loading into code and comparing models. A copy of an ML dataset release is often put into Zenodo precisely for the DOI and preservation |
| Open data portal | the dataset is not split, the description has no section on biases; a public body publishes, not the dataset author |
| Microdata catalog | survey data about people with access on request. Government AI data platforms with "safe zones" are organised similarly |
| Marketplace | datasets are sold; training data vendors such as Datatang are marketplaces rather than ML catalogs |
| Git repository | many benchmarks live in a GitHub repository with a website on GitHub Pages; this is publishing without a portal, covered in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md) |
| A company's internal model registry | tracking your own models for development and release, for example in MLflow; this is an enterprise tool, not a public catalog |

A summary table of all types is in the chapter [Comparing Types and Hybrids](./11-comparison-and-hybrids.md).

## Sources

- dataportals-registry export, release 1.27.0 of 15 October 2026: number of ML catalogs, owners, countries, platforms, share with an API and statuses. The classification of records by kind was made by hand for the book from the list of records. The queries are in the [appendix](../12-appendices/02-using-the-registry.md#ml-catalogs).
- Number of datasets and models: [Hugging Face Datasets](https://huggingface.co/datasets) and [models](https://huggingface.co/models), [the OpenML API](https://www.openml.org/api/v1/json/data/list/status/active/limit/10000), [the UCI archive API](https://archive.ics.uci.edu/api/datasets/list); 12 October 2026
- Croissant: [website and list of supporting platforms](https://docs.mlcommons.org/croissant/), [specification 1.1](https://github.com/mlcommons/croissant/blob/main/docs/croissant-spec-1.1.md) of 29 January 2026, [the RAI 1.0 extension](https://github.com/mlcommons/croissant/blob/main/docs/croissant-rai-spec.md), [GeoCroissant 1.0](https://github.com/mlcommons/croissant/blob/main/docs/croissant-geo-spec.md), [the mlcroissant library and validator](https://github.com/mlcommons/croissant/tree/main/python/mlcroissant)
- Cards: T. Gebru et al., [Datasheets for Datasets](https://arxiv.org/abs/1803.09010), 2018; M. Mitchell et al., [Model Cards for Model Reporting](https://arxiv.org/abs/1810.03993), 2019; [dataset cards on Hugging Face](https://huggingface.co/docs/hub/datasets-cards)
- NeurIPS 2026: [Evaluations & Datasets track rules](https://neurips.cc/Conferences/2026/CallForEvaluationsDatasets), [dataset hosting](https://neurips.cc/Conferences/2026/EvaluationsDatasetsHosting) and [RAI field requirements](https://blog.neurips.cc/2026/05/04/responsible-ai-metadata-requirements-for-the-evaluations-and-datasets-track-neurips-2026/), 4 May 2026
- Hugging Face: [gated access](https://huggingface.co/docs/hub/datasets-gated), [DOI](https://huggingface.co/docs/hub/doi), [storage limits](https://huggingface.co/docs/hub/storage-limits), [Parquet conversion and its 5 GB limit](https://huggingface.co/docs/dataset-viewer/parquet), [Croissant for datasets](https://huggingface.co/docs/dataset-viewer/croissant), [DuckDB and hf:// addresses](https://huggingface.co/docs/hub/datasets-duckdb)
- Kaggle: [dataset documentation](https://www.kaggle.com/docs/datasets), with the 200 GB per dataset limit; Croissant and dataset page markup checked 12 October 2026
- Own installations: [Croissant in ckanext-dcat](https://docs.ckan.org/projects/ckanext-dcat/en/latest/croissant/) and [extension releases](https://github.com/ckan/ckanext-dcat/releases); [Croissant in Dataverse](https://guides.dataverse.org/en/latest/admin/discoverability.html) and [the former external exporter](https://github.com/gdcc/exporter-croissant); [InvenioRDM export formats in the source code](https://github.com/inveniosoftware/invenio-rdm-records/blob/master/invenio_rdm_records/resources/config.py), without Croissant; [OpenML](https://github.com/openml/OpenML), [Codabench](https://github.com/codalab/codabench)
- CodaLab and Codabench: [announcement of CodaLab's closure](https://codalab.lisn.upsaclay.fr/), [moving to Codabench](https://docs.codabench.org/latest/Organizers/Benchmark_Creation/How-to-transition-from-CodaLab-to-Codabench/), [2025 summary](https://docs.codabench.org/latest/Newsletters_Archive/CodaLab-in-2025/)
- DOIs of ML platforms: [the DataCite API](https://api.datacite.org/dois?prefix=10.34740&resource-type-id=dataset&page%5Bsize%5D=0), prefixes 10.34740 (Kaggle), 10.57967 (Hugging Face), 10.24432 (UCI), 12 October 2026
- [The EU AI Act, Regulation 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj); [the training content summary template](https://digital-strategy.ec.europa.eu/en/library/explanatory-notice-and-template-public-summary-training-content-general-purpose-ai-models), 24 July 2025, and [FAQ about it](https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content)
- Government platforms: [AI Hub terms of use](https://aihub.or.kr/intrcn/guid/usagepolicy.do) and [the safe zone](https://aihub.or.kr/intrcn/safetyzoneintrcn.do?currMenu=306&topMenu=105); [AIKosh](https://aikosh.indiaai.gov.in/home/); [NAIRR Pilot](https://nairrpilot.org/pilotresources); [AI-on-Demand](https://catalogue.aiodp.eu/); [the CIT registry](https://registry.cit.gov.ru/datasets) and [a report on its update](http://regions21.ru/tpost/dgl16blzs1-fgau-tsit-zapustilo-obnovlyonnii-reestr) (in Russian), December 2025; number of datasets, licences on CIT registry cards and the HTML of the ai.mos.ru datasets section checked 12 October 2026
- S. Longpre et al., [A large-scale audit of dataset licensing and attribution in AI](https://doi.org/10.1038/s42256-024-00878-8), Nature Machine Intelligence, 2024; [2023 preprint](https://arxiv.org/abs/2310.16787)
- X. Yang et al., [Navigating Dataset Documentations in AI: A Large-Scale Analysis of Dataset Cards on Hugging Face](https://arxiv.org/abs/2401.13822), ICLR 2024
- LAION: [LAION-5B taken down](https://laion.ai/notes/laion-maintenance/), 19 December 2023; [Re-LAION-5B release](https://laion.ai/blog/relaion-5b/), 30 August 2024
- MNIST in torchvision: [loader and mirrors](https://github.com/pytorch/vision/blob/main/torchvision/datasets/mnist.py), [switch to own mirror](https://github.com/pytorch/vision/pull/3544), [403 error on the original website](https://github.com/pytorch/vision/issues/8568)
- [BIG-bench](https://github.com/google/BIG-bench): the "canary" string in task files; the GLUE dataset on Hugging Face, CoLA test part checked 12 October 2026
- [Closure of Papers with Code](https://github.com/paperswithcode/paperswithcode-data/issues/116): discussion of the redirect to Hugging Face; the address paperswithcode.com/datasets leads to huggingface.co/papers/trending, checked 12 October 2026
- I. Begtin, Telegram (in Russian): ["code first" in ML catalogs](https://t.me/begtin/5526), 21 March 2024; [AIKosh](https://t.me/begtin/7744), 26 August 2026; [national catalogs for AI](https://t.me/begtin/7813), 30 September 2026
- [Cloud Storage and Shared Hubs](../08-beyond-portals/04-cloud-storage-and-hubs.md), [AI, Data Spaces and Regulation](../11-trends/01-ai-and-data-spaces.md)
