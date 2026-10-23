---
title: Units of Publication and Formats
description: A file, a service, an indicator and a survey record. What counts as one publication, and when a format is usable by a program.
---

# Units of Publication and Formats

"Publishing data" means different things. In one catalog it is a file. In another it is a map service. In a third it is an indicator for which the user picks a year and a region. Confusing these units is harmful: they determine both the number of "datasets" in a report and the requirements for the platform.

## What counts as one publication

- **A file or a batch of files:** CSV, JSON, XML, Parquet, sometimes XLSX.
- **An API:** a program retrieves the same data with a request, without downloading the whole archive.
- **A map service:** an image of a layer (WMS, WMTS) or the features themselves (WFS, OGC API Features). An image without features is viewing, not downloading.
- **An indicator or a cube:** a table broken down by time and territory. Formats are SDMX, JSON-stat, PC-Axis.
- **A survey:** a description of the variables plus the record files. The description is usually in DDI.
- **A dataset for training a model:** files plus a dataset card, increasingly in the Croissant format.

One subject can be published as a dozen files "by year and district" or as one dataset with an API. For a person, a dozen files is sometimes clearer. For a report saying "we have 10,000 datasets", it is a way to inflate the number. More on this in the chapter [on anti-patterns](../09-practices/02-anti-patterns.md#fragmentation-to-boost-the-count).

## What counts as a dataset

The word "dataset" means different things in different catalogs, and when comparing catalogs this is the first thing to find out.

- **A time series.** Central bank portals, such as those of the ECB and the Bank for International Settlements, have few datasets and they are huge, but each series, say inflation in one country, has its own persistent address. A user usually looks for the series for their country, not the whole database. That is why dataset search engines show series as separate entries: in Dateno in 2024 about 30% of records were organised this way.
- **A map layer.** Most often this is not a file but the address of an ArcGIS or OGC service. It is customary to count it as a dataset, but it is more honest to call it a layer.
- **An imagery collection.** In STAC catalogs one collection is a series of images of a territory on different dates, with thousands or millions of files inside. In Open Data Cube the word dataset refers precisely to one image on one date, and what other catalogs call a dataset is a product. The licence is set on the product.
- **An observation record.** The global biodiversity database GBIF harvests about a hundred thousand datasets, and inside them there are billions of species observations. If each observation is given an identifier and called a "dataset", the counter grows by orders of magnitude. This is exactly what some aggregators do; see the chapter [on numbers](../01-basics/04-catalogs-in-numbers.md#what-the-numbers-do-not-show).
- **A document and a feed.** Are RSS and ATOM data or not? In 2024 the European portal data.europa.eu had more than 141,000 datasets that were actually ATOM feeds from geoportals.

A working criterion is reuse. A program's configuration file is machine-readable, but it is not a dataset: nobody takes it for their own task. A collection of texts or photographs is not machine-readable in the usual sense, but as a training set it is a dataset. A dataset is whatever a user searches for, downloads and uses as one whole.

## Dataset or data product

A dataset is what has been published. A data product is what has been published for specific users and is maintained. The distinction comes from enterprise data work, but it is increasingly applied to open data: in 2025–2026 it was discussed, for example, by the creators of the open data cloud storage Source Cooperative. The signs of a data product:

1. It is known who uses it and for what: there are main use cases, even if the product is free.
2. There is someone responsible who understands both the data and the users, answers questions and makes changes based on feedback.
3. There is documentation: the data schema, code examples, limitations.
4. Access is provided in several ways at once: an API, bulk download, individual slices. Access can also be controlled, by registration or in a cloud database.
5. Data quality is described in the documentation and checked continuously, not once before publication.
6. There are versions and an update schedule.
7. A dashboard or interactive showcase complements the data rather than replacing it.

The World Bank API fits this description, as do the Amazon Registry of Open Data (each entry there is a documented collection with usage examples) and the Russian address register FIAS with full exports and updates. Most datasets on typical open data portals do not, nor does a dashboard with a "download to Excel" button. By I. Begtin's estimate (August 2026), on well-known open data portals at best 5% of what is published is regularly updated; the rest was uploaded once.

Catalogs are built for one or the other. CKAN, DKAN, GeoNode and GeoNetwork count datasets and the files attached to them. Huwise (formerly OpenDataSoft) stores data as tables and provides an API and exports for every dataset, so it is closer to a product catalog. Source Cooperative is even simpler: it is file storage where the product page is a README file with a schema description, code examples and coverage. Each product has its own access method, but large collections, up to hundreds of terabytes, are well described because the authors curate them themselves.

There is an open specification for describing a data product, ODPS (Open Data Product Specification, version 4.1): it describes a product with several access interfaces, terms and a price. It is still rarely used. A practical list to check your own dataset against is in the section [Dataset as a product](../09-practices/01-good-practices.md#the-dataset-as-a-product) of the chapter on good practices.

## When a file is usable by a program

Tim Berners-Lee's "five stars" scale (2010) goes from a file under any licence to a machine-readable open format and further to links to shared identifiers. In practice, three questions are enough.

1. The file opens without paid software. CSV, JSON, XML, Parquet, GeoPackage: yes. PDF and scans: no.
2. The table has a header row and no cells merged "for looks". An XLSX file with a three-row header breaks a program, even though the format is formally tabular.
3. The columns are named and explained. A schema such as Frictionless Table Schema or CSV on the Web says that a column holds a number, not text.

The fifth star, linked data with links to shared reference lists, is needed when datasets from different organisations should join on their own. For a city budget it is not the first priority. The first three questions are.

## Which file to publish

The format is chosen by three questions: what users will work with the data in, what you can convert what you have into, and how much disk space and bandwidth you have. For most cases the answer fits a short rule.

- **A flat table**: CSV in UTF-8, comma as the delimiter, the first row as headers. Any program can read such a file. GitHub renders it as a table right in the browser if the file is no larger than 512 KB, while a file with semicolons is shown as plain text.
- **Records with nested lists** (an organisation has several addresses, a contract has several stages): JSON Lines, one JSON record per line. A program reads such a file line by line. Ordinary libraries load one big JSON or XML file into memory whole, and a file of several gigabytes becomes a problem.
- **A large table for analysts**: Parquet in addition. It stores column types, so a program does not have to guess where a number is and where text is, and it compresses data by column.
- **Domain data**: in the domain format, GeoJSON or GeoPackage for geodata, NetCDF for measurements, SDMX for indicators. A CSV can sit next to it, but not instead of it.
- **XLSX**: as an extra copy for people who will work in a spreadsheet. Any spreadsheet can import a comma-delimited CSV.

In practice portals publish differently. In July 2025 the Dateno search engine counted 6.7 million files and links in datasets from open data portals. CSV made up 15%, XLSX, XML, JSON and ZIP 7–8% each, but another 7% were PDF and the same share were links to HTML pages, that is, reports and other people's websites instead of data. Parquet occurred 1,652 times, less than 0.025%. In the same search engine's experience, for every CSV that can be read without manual fixing there are two with export errors: a different delimiter, encoding, extra rows above the header.

The difference in size is noticeable. The same 3.5 GB CSV took 8.7 GB after conversion to JSON Lines and 0.93 GB in Parquet (an example from the Dateno search engine's practice, 2024). JSON Lines costs more space, but preserves what does not fit into a table.

## Compression

A text file larger than 20–30 MB is worth compressing. The archiver is chosen by who will read the file and how.

- **gzip or zstd**: for one large file that programs will read. Many tools open such a file without unpacking: DuckDB, for example, recognises `.csv.gz` and `.csv.zst` by the extension.
- **ZIP**: for a batch of files that are downloaded together. Zenodo lists the files inside a ZIP right on the record page. Analytical software reads ZIP less well: DuckDB will not open it without the zipfs extension.
- **RAR and 7z**: better not. They are popular archivers among users, but few libraries can stream a file from inside such archives without unpacking it to disk.

## What to choose

Publish the unit that people use. An official statistics indicator is not replaced with an annual CSV "to tick the box" if international exchange happens in SDMX: the CSV can be an additional file. A cadastral layer is not replaced with a picture of a map if a person needs to download the boundaries. Research data behind a paper is fixed as a file version, not as "always the latest export".

A format without a field description and without a licence remains a file, not a publication.

## Sources

- [5-star open data](https://5stardata.info/)
- [Frictionless Table Schema](https://specs.frictionlessdata.io/table-schema/)
- [JSON Lines](https://jsonlines.org/), [Apache Parquet](https://parquet.apache.org/)
- [Rendering CSV and TSV data on GitHub](https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files#rendering-csv-and-tsv-data): delimiters, the 512 KB limit, checked 12 October 2026
- [Reading CSV in DuckDB](https://duckdb.org/docs/current/data/csv/overview.html): the `compression` parameter, gzip and zstd; [the zipfs extension](https://duckdb.org/community_extensions/extensions/zipfs) for ZIP
- I. Begtin, [Good and bad data publishing practices. Metadata and file formats](https://begtin.substack.com/p/2ef) (in Russian), November 2024: choosing formats and compression, the file size example
- I. Begtin, Telegram (in Russian), on formats in the Dateno index: [July 2025](https://t.me/begtin/6899), 9 July 2025; [Parquet and CSV with errors](https://t.me/begtin/5520), 20 March 2024
- I. Begtin, Telegram (in Russian), on what counts as a dataset: [reuse as the criterion](https://t.me/begtin/6050), 22 September 2024; [time series, layers, ATOM feeds](https://t.me/begtin/6216), 25 November 2024; [Open Data Cube terminology](https://t.me/begtin/4886), 18 May 2023
- I. Begtin, Telegram (in Russian), on data products: [dataset and data product](https://t.me/begtin/7702), 5 August 2026; [signs of a data product](https://t.me/begtin/7709) and [dataset catalogs and product catalogs](https://t.me/begtin/7710), 12 August 2026; [Source Cooperative](https://t.me/begtin/7742), 25 August 2026; [ODPS 4.1](https://t.me/begtin/7529), 8 April 2026
- Radiant Earth, [Great Data Products](https://radiant.earth/blog/2025/11/great-data-products/), November 2025; [Open Data Product Specification](https://opendataproducts.org/); [Source Cooperative](https://source.coop/); [Open Data Cube](https://www.opendatacube.org/)
- I. Begtin, Telegram (in Russian), [dataset catalogs and data product catalogs](https://t.me/begtin/7710), 12 August 2026: the estimate that no more than 5% of what is published is regularly updated
- [What catalogs publish](./01-what-is-published.md)
