---
title: Classes of Software
description: How an open source platform differs from a cloud service, a static site and a custom-built catalog.
---

# Classes of Software

A catalog type says **what** is published. A software class says **who** updates it, whether a feature can be added and what it costs to leave. Within one class, platforms differ in extensions: see [extension ecosystems](./02-extension-ecosystems.md).

## Classes

| Class | Examples | When it fits |
|-------|---------|----------------|
| Open source portal platform | CKAN, DKAN, uData, Piveau | there is your own team or a contractor, and you need your own schema and extensions |
| Research repository | Dataverse, DSpace, InvenioRDM | DOIs, versions and citation are needed |
| Geocatalog | GeoNetwork, GeoNode; the cloud-based ArcGIS Hub | a catalog of layers and services |
| Indicator platform | PxWeb, .Stat Suite, OpenSDG | official statistics and indicators |
| Microdata catalog | NADA | surveys with different access levels |
| Cloud service | Huwise (OpenDataSoft), Socrata, Figshare | no operations of your own, a subscription fee instead |
| A site on a CMS | WordPress, Drupal | the catalog is a section of an existing site, and the CMS can serve descriptions to machines |
| Protocol server | THREDDS, ERDDAP, a STAC server, SPARQL | programs read the data; a showcase site is secondary |
| Map server | GeoServer, MapServer, QGIS Server | serves layers; is not a catalog by itself |
| Domain system | GBIF IPT and similar networks | data of one scientific discipline |
| Custom build | a site written for one organisation | no platform covers a mandatory feature |

A map server often sits **next to** a geocatalog, not instead of it. GeoServer serves the map, GeoNetwork describes the layers so they can be found. A protocol server likewise sits next to a catalog: THREDDS and ERDDAP serve arrays and tables to programs, while the page for people is kept by another site.

## Four questions for a class

Brands are compared after the class has answered four questions. The answers by brand are in the [profiles](./04-platform-profiles.md) and in the chapter [on build models](../06-choice/05-build-or-buy.md).

| Question | Open source platform | Cloud service | Static site or Git | Custom build |
|--------|---------------------|-----------------|--------------------------|-----------------|
| Who updates | your own team or a contractor | the provider | whoever edits the files | your own team, entirely |
| Can a feature be added | yes, with an extension or customisation | only what is in the subscription | by editing the template; a search API does not appear that way | yes, at the cost of maintenance |
| What you take with you when leaving | your files and database, if backups were made | what the provider gives as an export | the files, which you already have | whatever you planned to export yourself |
| What the class does not do | does not run itself while there is no administrator | does not accept your module | does not serve a search API or harvest other catalogs | does not know other people's standards until someone writes them in |

A CMS site and a protocol server are not in this table, because they are chosen not instead of a portal but alongside one. A CMS fits when the catalog is a section of an already living site and the engine can serve descriptions to machines. A protocol server fits when programs read the data and pages for people are secondary.

A class mistake is more expensive than a brand mistake. CKAN with a DOI extension does not become a research repository: the ckanext-doi extension has not been tested on CKAN 2.11 and 2.12. Dataverse does not become an open data portal with daily DCAT-AP federation. ArcGIS Hub does not issue DOIs. These boundaries are written in the profiles, and a shortlist respects them.

## What live catalogs show

According to the dataportals-registry export (release 1.27.0 of 15 October 2026):

- custom-built catalogs are about 16%. Among geoportals they are 4%: ready-made platforms won there, ArcGIS above all. Among indicator catalogs, 44% are custom-built, and this type is the least likely to have an API;
- the ArcGIS ecosystem is about a third of geoportals;
- a municipality often does not choose its platform itself. Russia's Gosweb is a state platform: a city is left to publish where the country already collects data. Poland's e-mapa is a commercial product from Geo-System that each gmina buys, but the vendor serves more than half the gminas in the country, and the choice is in effect made by the market.

A change of owner of a cloud platform or the end of a product hits hundreds of catalogs at once. This happened to microdata catalogs with Nesstar: in 2015, with version 4.0, the product was declared obsolete, by 2022 it was finally withdrawn, and archives moved their collections to other platforms; for example, Canada's ODESI chose Borealis, built on Dataverse, for its move. Even a rename of the vendor without a change of product, as when OpenDataSoft became Huwise in 2025, is a reason to reread the contract. That is why the "cloud service" class in the comparison table always comes with the question: how to take the data out if the subscription ends. This is covered in the chapter [on build models](../06-choice/05-build-or-buy.md).

## How to choose a class, not a brand

1. If there is little data and it is updated rarely: someone else's catalog or a static site, not a platform.
2. If there is no team of your own: a cloud service or publishing in an existing catalog.
3. If DOIs and citation are needed: a research repository, not an open data portal with customisations.
4. If the main product is map layers: a geocatalog. A map server is added to it, not installed instead of the catalog.
5. If the main product is indicators with dimensions: an indicator platform, not CKAN with a thousand tiny datasets.
6. If there is a team and mandatory features that the cloud does not have: an open source platform and a list of extensions.
7. A custom build only when points 1–6 do not cover a mandatory feature. The test questions are in the same chapter on build models.

Then specific platforms are compared using the [profiles](./04-platform-profiles.md) and the matrix in the chapter ["From Features to a Platform"](../06-choice/03-from-features-to-platform.md). A class that has not answered the question "who will be on duty two years from now" drops off the list before its features are counted.

## Sources

- The dataportals-registry export, release 1.27.0 of 15 October 2026. The queries are in the [appendix](../12-appendices/02-using-the-registry.md).
- [Platform Profiles](./04-platform-profiles.md)
- Protocol servers and domain systems: [THREDDS](https://www.unidata.ucar.edu/software/tds/), [ERDDAP](https://erddap.github.io/), [GeoServer](https://geoserver.org/), [GBIF IPT](https://github.com/gbif/ipt)
- Nesstar: [product history](https://en.wikipedia.org/wiki/Nesstar), [the Nesstar Publisher entry in the CESSDA directory](https://www.cessda.eu/Resource-Directory/Resource-crdr-4365) (distributed without support), [ODESI's move from Nesstar to Borealis](https://www.ocul.on.ca/odesi-migration)
- [Announcement of OpenDataSoft's rename to Huwise](https://www.huwise.com/en/opendatasoft-becomes-huwise/)
- Geo-System, [e-Gmina technology deployments in 2025](https://geo-system.blogspot.com/2025/12/podsumowanie-wdrozen-technologii-e.html) (in Polish)
