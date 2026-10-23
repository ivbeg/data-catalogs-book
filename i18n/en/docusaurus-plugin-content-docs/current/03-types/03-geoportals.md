---
title: Geoportals and Spatial Data Infrastructures
description: "The most numerous type of catalog: what a geoportal consists of, who runs it, how it is built, what it runs on, how to check it and where it breaks."
---

# Geoportals

A geoportal describes spatial data, that is, data tied to a place: layers, maps, imagery, services. Every object in it has coordinates or a boundary. There is almost always a map in the browser next to it. Often the portal is the visible part of a country's or region's spatial data infrastructure: a shared system of rules, catalogs and services to which public bodies contribute their layers.

According to the dataportals-registry export (release 1.27.0 of 15 October 2026), there are 24,800 records of this type, 57% of the registry. They include catalogs of descriptions, layer servers and municipal maps. ArcGIS Server (4,674) and GeoServer (1,460) serve maps; on their own they are not yet a catalog where a layer is found by its description. To avoid confusion, it is worth first looking at what a geoportal consists of.

## What a geoportal consists of

The word "geoportal" hides three different things. Sometimes they are assembled on one site, sometimes they live separately.

- **The viewer** is a web map. It shows layers, lets you switch them on and off, search for an address, measure a distance. This is what a person sees first.
- **The catalog** is the layer records: what is depicted, who made it, when, in which coordinate reference system, with what accuracy, on what terms. A layer is found by its record without knowing its address.
- **The services** are a map server that serves a layer to programs: as an image for viewing, as features for download, as ready-made map tiles.

| Part | What it does | Standards | Example software |
|-------|------------|-----------|------------------|
| Viewer | shows layers on a map | — | Oskari, TerriaJS, QGIS Web Client, Lizmap, Masterportal |
| Catalog | describes layers and searches the descriptions | ISO 19115, CSW, OGC API Records, DCAT | GeoNetwork, pycsw, ArcGIS Hub |
| Services | serves the data itself | WMS, WMTS, WFS, OGC API Features, ArcGIS REST, STAC | GeoServer, MapServer, QGIS Server, ArcGIS Server |

There are also all-in-one platforms: GeoNode, ArcGIS Online with ArcGIS Hub, the Russian NextGIS Web.

Only a catalog combined with a service that allows download makes a layer open data. A viewer without them is a picture. A server without a catalog means only someone who knows the address will find the layer. A catalog without a service is a description without data. So both when choosing a platform and when checking someone else's geoportal, the first question is the same: which of the three parts are here.

## Who builds them

National mapping and cadastral agencies, regions and especially cities. The geoportal is the most "local" type of catalog: a city may have no open data portal, but it almost always has a map of the master plan, addresses and land parcels, because the administration's own staff work with it every day.

| Owner | Geoportals | Share |
|----------|------------:|-----:|
| Local government | 14,440 | 58% |
| Regions | 3,534 | 14% |
| Central government | 2,752 | 11% |
| Universities and research organisations | 1,467 | 6% |
| Companies | 1,264 | 5% |
| Civil society organisations | 601 | 2% |
| International organisations | 392 | 2% |
| Other | 302 | 1% |

Research and conservation organisations run catalogs of observations and imagery, companies run catalogs of their products and open layers commissioned by the government, and international organisations run catalogs for their programmes, for example UN agencies and the European Environment Agency.

### The number of geoportals is not a measure of geodata

By number of geoportals in the registry the leaders are the United States (5,050), Poland (2,303), the Czech Republic (1,408), Italy (1,179), Canada (1,027), Germany (964), France (899) and Japan (652). As with open data portals, the list says something about how the market is organised, not about the volume of data. In the US the count comes from ArcGIS Server and ArcGIS Hub: almost 4,500 records. In Poland it comes from e-mapa, which more than half of the gminas use. In the Czech Republic from three hosted services for municipalities. Germany is only sixth, even though its common geodata catalog is one of the largest in the world: instead of a thousand websites it has one infrastructure that harvests the descriptions of all levels of government.

### Where the geoportal is the main catalog

In developing countries the geoportal is often the main, and sometimes the only, catalog of government data. According to the dataportals-registry export (release 1.27.0 of 15 October 2026), in 47 countries and territories there is at least one active geoportal and not a single active open data portal. Egypt (16), Nicaragua (12), Guyana, Somalia and Greenland (10 each) have the most such geoportals. The explanation is simple: the value of geodata is the easiest to prove, as agencies, businesses and international programmes use it. So a geoportal is built before an open data portal, often with donor money and on the open-source GeoNode.

It also happens that an open data portal exists, but the data lives next to it. In Kazakhstan, according to a 2024 assessment, truly open data was published not by the data.egov.kz portal but by the national geoportal [map.gov.kz](https://map.gov.kz) on GeoNode. On 12 October 2026 its API returned descriptions of 378 datasets without login.

## What they publish

Base maps and topography, cadastre and parcel boundaries, addresses, spatial planning and zoning, orthophotos (aerial and satellite images rectified to map scale), utility networks, roads, protected areas, flood zones, geology, Earth imagery, scanned historical maps.

A geoportal has more than one unit of publication:

- a **layer**: one theme for one territory, for example the city's parcel boundaries;
- a **service**: several layers at one address, for example all the layers of a master plan;
- a **map or project**: a saved set of layers with styles and labels;
- an **imagery collection**: a series of images of one territory on different dates.

The same layer can simultaneously be a record in the catalog, a WMS and WFS layer on the server, and part of several maps in the viewer. That is why the number of "datasets" in two geoportals is almost never comparable: one counts records, another server layers, a third projects. How to count is covered in the chapter [Units of Publication and Formats](../02-data/02-formats-and-units.md#what-counts-as-a-dataset).

## How they are built

On the outside geoportals look alike: a map, a list of layers, search. Inside they are built differently, and the structure determines which features are needed. Five models are the most common.

### National infrastructure

Agencies, regions and cities run their own catalogs and services, the national catalog harvests their records via CSW and offers a common search, and the national geoportal shows the layers on one map. The model is Germany. Its common catalog [Geodatenkatalog.de](https://gdk.gdi-de.org/) runs on GeoNetwork: on 12 October 2026 it held 814,000 records. From it the European portal data.europa.eu harvests 681,000 datasets, more than from any other source. The showcase for people is [Geoportal.de](https://www.geoportal.de).

This model needs harvesting of other catalogs, a record editor following the national profile, validation of records against the rules and monitoring of whether services respond.

### An organisation's open geodata catalog

A city or agency publishes layers with records, download and a licence: in effect an open data portal where the main product is a layer. Most often this is ArcGIS Hub, a site on top of the ArcGIS Online cloud where each layer can be downloaded in several formats. A Hub site serves its own catalog in DCAT-US 1.1 and DCAT-AP 2.1.1 and offers search via OGC API Records, for example the Washington, DC open data portal [opendata.dc.gov](https://opendata.dc.gov); DCAT-US 3.0 and DCAT-AP 3.0.0 feeds are enabled separately. In the registry such exports are marked for about 3,200 Hub sites. The open-source substitute is GeoNode: it serves records via CSW, but not in DCAT.

This model needs download in open formats, a licence on every layer and a catalog export in DCAT so that the open data portal can harvest it.

### A vendor's municipal map

A hosted service from a local company that dozens or hundreds of municipalities subscribe to: parcels, the master plan, addresses, building permits. The main product is a map for residents and officials. The layer is visible, but often it cannot be downloaded. Apart from ArcGIS Hub and e-mapa, the registry has 132 such services, running about 5,300 geoportals, and a programming interface is marked for only 21% of them. More on vendors in the section on platforms below.

This model needs almost nothing except the map. But if a municipality wants open data, layer export (WFS or files) and a licence must be written into the contract with the vendor: the service will not add them by itself.

### A layer server without a catalog

ArcGIS Server or GeoServer that serve layers to programs but keep no records for search. Often this is not a separate portal but the "back end" of the other models: the city map and its catalog rely on the server. If there is no catalog next to it, such a server is found only by geoservice search engines and by those who know the address.

It needs a catalog, its own or a higher-level one, where the layers are entered with descriptions.

### An imagery and file catalog

Collections of satellite imagery, elevation, climate and other spatial files, described in STAC. This is not a city map but a store for programs: the files sit in cloud storage, and the catalog answers which images exist for this territory on these dates. An example is [Earth Search](https://earth-search.aws.element84.com/v1/) by Element 84, a catalog of open datasets on AWS. The registry has about 140 STAC servers and about 80 STAC Browser viewers.

It needs search by territory and date, storage of large files and delivery via direct links. A map for people is secondary.

### What follows from this

The models combine: a national infrastructure has hundreds of layer servers at the bottom, a Hub site has ArcGIS Server under the hood. But the main model determines the main features:

| Model | What you cannot do without | What you can skip |
|--------|----------------------|---------------------|
| National infrastructure | harvesting via CSW, a record profile, record validation, service monitoring | your own data storage |
| Open geodata catalog | download, a licence on the layer, DCAT export | harvesting other catalogs |
| Municipal map | a viewer, address and parcel search | an ISO catalog, if the layers are described at a higher level |
| Layer server | WMS, WFS, registration in a catalog | your own viewer |
| Imagery catalog | STAC, search by territory and date, cloud storage | a map for people |

How to get from features to a platform is covered in the chapters [Selecting Features](../06-choice/02-feature-selection.md) and [From Features to a Platform](../06-choice/03-from-features-to-platform.md).

## Standards

**A layer description** uses ISO 19115 and its XML encoding ISO 19139. The new edition of the standard is encoded in XML according to ISO 19115-3, but catalogs still more often exchange ISO 19139 records. The record contains what an ordinary dataset does not have: the territory as a coordinate bounding box, the coordinate reference system, the scale or resolution, the lineage of the data.

**The catalog** is served to programs via the CSW service. It is being replaced by OGC API Records: Part 1 was approved as an OGC standard in April 2025. It is the same catalog, but in the form of an ordinary web interface with JSON responses that a developer understands without knowing CSW. ArcGIS Hub sites and the lightweight pycsw catalog already serve it.

**The bridge to open data portals** is the GeoDCAT-AP profile. It describes how to translate an ISO record into DCAT, which open data portals run on. The current version is 3.1.0, a SEMIC recommendation of 16 February 2026. This is exactly how data.europa.eu reads national geocatalogs. GeoNetwork 4.4 can serve records via CSW directly in DCAT: in October 2026 the European Environment Agency's catalog offered GeoDCAT-AP, DCAT-AP and the high-value datasets profile.

**The data itself** is served with WMS and WMTS services for viewing, and WFS and OGC API Features for downloading features. A map image (WMS) is not yet data: you cannot get parcel boundaries from it. Only WFS, OGC API Features, files or ArcGIS export let you download features.

**ArcGIS REST** is a separate language for the same task. It is widespread not because it is an ISO standard but because a large share of portals are built on it. GIS software and many harvesters read it on a par with OGC standards.

**Coordinate reference system.** Each layer has its own, and it is specified with a code from the EPSG registry. World maps use WGS 84 (EPSG:4326) and Web Mercator (EPSG:3857), national data uses its own systems: S-JTSK in the Czech Republic and Slovakia, the local MSK coordinate systems for each region in the Russian cadastre. A layer without a CRS code has to be guessed.

**STAC** is a protocol for imagery and, following it, for other georeferenced file collections. It is a protocol, not a program. It is served by dedicated STAC servers, by static sets of JSON files, and also by general-purpose platforms: GeoServer has a STAC community module. That is why there are more STAC catalogs in the world than lists such as STAC Index show. The unit of publication in STAC is unusual for a portal: a collection is a series of images of one territory on different dates, with thousands or millions of files inside. Counting each file as a dataset is wrong, and showing a collection as an ordinary dataset page with a list of files is impossible. Aggregators that harvest STAC together with open data portals each solve this in their own way.

### INSPIRE

Since 2007 the EU INSPIRE Directive has required public bodies in EU countries to describe spatial data according to common rules and to provide catalogs and view and download services. National infrastructures like the German one are built on it, and GeoNetwork has become the standard for national catalogs in the EU.

INSPIRE is now being simplified. In December 2025 the European Commission proposed removing from the directive the technical requirements that duplicate later legislation, namely the Open Data Directive and the high-value datasets regulation. The EU Council adopted its negotiating position in June 2026, the European Parliament on 6 October 2026. Parliament wants to keep open ISO and OGC standards mandatory, as well as the network of services. There is no final text yet.

One change has already happened: on 1 July 2026 the INSPIRE Geoportal was closed. Its address redirects to data.europa.eu, where geodata is now searched together with the rest of the EU's open data, and the INSPIRE registers and code lists have moved to the EU Publications Office's EU Vocabularies. The practical conclusion for a European geoportal: the main path upwards is now descriptions in DCAT and GeoDCAT-AP, not only a CSW catalog.

## Platforms

Only 4% of geoportals are home-grown. This is the most "platform-based" type, but also the most varied: the registry lists about 350 different programs among geoportals.

| Platform | Geoportals in the registry | What it is | Role |
|-----------|----------------------:|---------|------|
| ArcGIS Server | 4,674 | Esri's commercial server | services |
| ArcGIS Hub | 3,464 | Esri's hosted service | open geodata catalog |
| e-mapa | 1,927 | Geo-System's hosted service, Poland | municipal map |
| GeoServer | 1,460 | open-source server | services |
| Custom build | 1,043 | — | any; API in only 11% |
| GeoNode | 770 | open-source platform | all in one |
| GeoNetwork | 762 | open-source catalog | catalog and harvester |
| GISPLAN | 467 | T-MAPY's hosted service, Czech Republic and Slovakia | municipal map, no API |
| Lizmap | 346 | open-source platform on QGIS Server, France and Italy | viewer and services |

GeoServer and its kind serve layers. GeoNetwork and ArcGIS Hub describe them so that a layer can be found. One without the other is either a map without a catalog or a catalog without data.

### Three open-source platforms

The three open-source platforms in the table have different roles, and they are often confused when choosing.

- **GeoNetwork** is a catalog of descriptions and an aggregator. It stores layer records in ISO 19115, serves them via CSW and itself harvests records from other sources: CSW and OAI-PMH catalogs, WFS and THREDDS services, STAC collections. It has a record editor that follows the INSPIRE rules, so many national catalogs in the EU run on GeoNetwork, for example the Estonian [metadata.geoportaal.ee](https://metadata.geoportaal.ee), the German Geodatenkatalog.de and the [European Environment Agency catalog](https://sdi.eea.europa.eu/catalogue/srv/eng/catalog.search). It usually does not store the data itself but links to services. It is most accurately thought of as a search engine for the layers of a country or a sector.
- **GeoNode** is closest to an ordinary data catalog. A user uploads a file, and it becomes a layer with a record, a map for viewing, a download link and an API. Inside, GeoServer serves the layer and pycsw serves the records via CSW. GeoNode is chosen when data is published by hand and one all-in-one site is needed.
- **GeoServer** serves layers via WMS, WFS and other OGC protocols. Its layer description is short: a title, an abstract, keywords and a link to an external record. The INSPIRE extension adds the fields required by the directive to the service response, but GeoServer does not keep a full ISO record: that is held in GeoNetwork or another catalog. A server without a catalog next to it is a map without descriptions: only someone who knows the address will find the layer.

Alongside them are showcases built on top of other catalogs. The Finnish Oskari, the Australian TerriaJS and QGIS Web Client (QWC2, 159 installations in the registry, mostly in Finland and Germany) show layers from many servers on one map but hold almost no data of their own. GeoBlacklight is a search across university library collections of maps and geodata, pycsw a lightweight catalog of descriptions. A short note on each is in the [platform profiles](../05-platforms/04-platform-profiles.md#platforms-without-a-separate-profile).

### Local vendors

e-mapa shows the path most municipal geoportals take. It is a commercial product of the Polish company Geo-System: each gmina buys it itself, but one vendor covers most of the country, so the portals look the same and can pass data to the national registers of addresses and plans. This is how the market works in many countries: global platforms lead in the overall count, while within a country municipalities are served by one or two local vendors.

| Country | Main platforms of municipal geoportals | Geoportals in the registry |
|--------|---------------------------------------------|----------------------:|
| Poland | e-mapa (Geo-System) | 1,927 |
| Czech Republic | GISPLAN (T-MAPY), GisOnline, Mapotip | 424, 287, 261 |
| Slovakia | mOBEC (T-MAPY), Geodeticca | 177, 159 |
| Slovenia | iObčina (Kaliopa) | 213 |
| Italy | GisMaster (Technical Design) | 274 |
| Austria and Romania | Map2Web (Schubert & Franzke) | 114 and 159 |
| Japan | Waga Machi Guide (PASCO), SonicWeb | 259, 124 |
| Finland | Louhi (Sitowise) | 117 |
| Australia | IntraMaps (TechnologyOne), Pozi | 111, 80 |
| Switzerland | GeoMapFish (open source) | 223 |
| France | Lizmap (open source), mviewer (open source) | 156, 94 |
| Germany | Masterportal (open source) | 85 |
| China | Tianditu (state-run) | 100 |

In Slovenia, which has 212 municipalities, iObčina has more than two hundred geoportals: municipalities lease the system under contract, and the vendor's team maintains the data. The difference in approach is visible too. In Central Europe and Japan municipalities lease a commercial hosted service, and most such services have no programming interface in the registry at all: of 132 local vendor services, 104 do not have one marked on a single site, including GISPLAN, GisMaster, iObčina and Waga Machi Guide. In France, Switzerland and Germany open-source software developed by a public body or a community is more common: Masterportal was created by Hamburg's geospatial agency, mviewer by the Brittany region. Such software serves layers using OGC standards, and a programming interface is marked for 84% of Masterportal installations and 99–100% of Lizmap, GeoMapFish and mviewer installations.

In Russia, of the registry's 286 geoportals, 60 are custom builds, 37 run on NextGIS Web, 27 on ArcGIS Server, 25 on ActiveMap GIS; GeoServer runs on only 22. Geoservice search engines such as GeoSeer and Spatineo see only standard OGC and ArcGIS interfaces and therefore cover no more than half of such portals.

### The hidden ArcGIS catalog

ArcGIS has a large catalog that few people know about. Any organisation in the ArcGIS Online cloud can make its layers, maps, apps and files public, and all of this ends up in the common [ArcGIS search](https://www.arcgis.com/home/search.html). [ArcGIS Hub search](https://hub.arcgis.com) is narrower: it searches open data sites built on Hub. In 2024 the size of the common search was estimated at hundreds of thousands of items; in 2025 Hub had more than 25,000 sites and about 300,000 layers, maps and documents. A more precise count is impossible: ArcGIS search stops counting results at 10,000.

It is a useful but poor catalog. An item often has only a title and tags, without a description, licence or update date. On the other hand, it contains layers for countries that have almost no geodata of their own online: international projects, universities and individual specialists publish them. Many sites at `*.maps.arcgis.com` addresses do not say that layers can be downloaded, even though the server serves them to any program. How to check this is in the section on [implicit interfaces](../04-features/04-access-interfaces.md#implicit-interfaces).

## Examples

**National and international**

- [data.europa.eu](https://data.europa.eu): since 1 July 2026 the single point for searching EU geodata, replacing the closed INSPIRE Geoportal. It harvests national geocatalogs, the largest of which is the German one.
- [Geoportal.de](https://www.geoportal.de) and [Geodatenkatalog.de](https://gdk.gdi-de.org/): the showcase and the common catalog of Germany's spatial data infrastructure.
- [mapy.geoportal.gov.pl](https://mapy.geoportal.gov.pl): Poland's national geoportal.
- [European Environment Agency catalog](https://sdi.eea.europa.eu/catalogue/srv/eng/catalog.search): GeoNetwork 4.4, about 3,400 records, served in ISO and in DCAT.

**Cities**

- [opendata.dc.gov](https://opendata.dc.gov): Washington, DC, ArcGIS Hub: layer download, a DCAT-US catalog, search via OGC API Records.
- [Helsinki map service](https://kartta.hel.fi): the city's open layers on GeoServer; in October 2026 about three hundred layers could be downloaded via WFS.

**Imagery and files**

- [Earth Search](https://earth-search.aws.element84.com/v1/): a STAC catalog of open satellite data on AWS.
- [Google Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog): imagery and other layers as a STAC catalog, not a city map.

**Russia and Kazakhstan**

- [Russian Geographical Society Geoportal](https://geoportal.rgo.ru): a catalog of scanned historical maps, plans and atlases from the society's map collection, which has more than 48,000 items. The collections are growing: the latest were added on 9 October 2026.
- [Geoportal of the Republic of Mordovia](https://geo13.ru/geoportal): a regional geoportal of the Russian Geographical Society with thematic layers of settlements, landslides and protected areas.
- [map.gov.kz](https://map.gov.kz): Kazakhstan's national geoportal on GeoNode, in effect the country's main source of open government data.

## Where it breaks

**A map without download.** The layer is visible on the map, but there is no export: the service serves only a WMS image. For a resident that is enough; for someone who wants to do calculations or overlay the layer on their own data, it is not.

**Records for the sake of it.** ISO fields are filled with dashes, the record creation date is given instead of the data date, and instead of a licence there is "no restrictions" as free text in the terms of use field. A harvester does not recognise such a licence, and on the higher-level portal the layer looks closed.

**The catalog and the service diverge.** The service returns an error or has moved, while the record still points to the old address and does not show it. The Arkhangelsk region geoportal lost its layers when its ArcGIS licence expired, while the catalog continued to show their records.

**A coordinate reference system without a code.** The layer is served in a local CRS without its code. It can be combined with other data only by hand, if at all.

**One vendor, hundreds of sites.** Nobody updates the long tail of identical municipal portals one by one: when the platform breaks, hundreds of sites break. When the vendor leaves or the contract ends, all the maps disappear at once.

**An open-source platform without maintenance.** Someone has to update your own server with GeoNode, GeoNetwork or GeoServer. In the registry 11% of geoportals on GeoNode and about 7.5% on GeoServer and GeoNetwork are inactive, against 1.5–2.3% on ArcGIS Hub and ArcGIS Server. A common story: the geoportal was built under a donor programme, the programme ended, the server was switched off.

### Publicly available but not open

A layer that everyone can see is not yet open data. Machine-readable export, a clear licence and access without requests make it open. Many government geoportals only allow viewing. Russian ones are a clear example.

- **Rosreestr's National Spatial Data System** ([nspd.gov.ru](https://nspd.gov.ru)). Since 23 December 2024 the public cadastral map has run on it: viewing is free and without login. There is no layer export in the interface. In January 2024 a GeoServer with more than 384 layers was found inside the portal: WMS viewing was open, and the key to WFS export sat right in the page code. The conclusion of that review: there is no open data, there is publicly available data.
- **The Federal State Information System for Spatial Planning (FGIS TP)** of the Ministry of Economic Development. Public bodies are required to upload maps of master plans and spatial planning schemes in vector form (GML) and additionally in PDF. But, as the system itself replies, only the owner of the information can get the vector model; everyone else gets raster copies. In 2024 the system held about 200,000 documents, and at least a quarter of them should contain vector geodata.
- **The St Petersburg Spatial Data Fund** in 2021 called "open" the data that is released free of charge but on request with passport details and the purpose of use. All state spatial data funds in Russia work this way: data is released on application and under a contract. Free is not yet open.

The second barrier is access from abroad. On 12 October 2026 neither the NSPD, nor FGIS TP, nor the St Petersburg fund's portal, nor the Rosreestr website opened from a German address. In 2025 most Russian installations of GeoNetwork, GeoNode and GeoServer in the registry did not respond to requests from outside the country. Such a geoportal ends up in neither international search engines nor aggregators.

## How to check a geoportal

Five questions you can answer in half an hour.

1. **Which of the three parts are there?** Look at the page and link addresses: `/geonetwork/` is a GeoNetwork catalog, `/geoserver/` a GeoServer server, `/arcgis/rest/services` ArcGIS Server, `/api/v2/` next to a map is often GeoNode. If there is only a map, it is a viewer.
2. **Can you download the layer?** Look for a download button or a WFS service. A WMS image is not a download.
3. **Does the layer have a record with a licence and a data date?** Open three random records. The licence should be a link to a clear text, not "no restrictions".
4. **Does the portal serve descriptions and data to programs?** Typical addresses:

```bash
# GeoNetwork: catalog name and software version
curl -s -H "Accept: application/json" "https://sdi.eea.europa.eu/catalogue/srv/api/site"
# CSW catalog: how many records it has
curl -s "https://gdk.gdi-de.org/gdi-de/srv/eng/csw?service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&resultType=hits"
# GeoServer: which layers can be downloaded via WFS
curl -s "https://kartta.hel.fi/ws/geoserver/avoindata/wfs?service=WFS&version=2.0.0&request=GetCapabilities"
# ArcGIS Server: folders and services
curl -s "https://maps2.dcgis.dc.gov/dcgis/rest/services?f=json"
# ArcGIS Hub: the catalog in DCAT-US and search via OGC API Records
curl -s "https://opendata.dc.gov/api/feed/dcat-us/1.1.json"
curl -s "https://opendata.dc.gov/api/search/v1/collections/dataset/items?limit=1"
# GeoNode: number of datasets
curl -s "https://map.gov.kz/api/v2/datasets?page_size=1"
# STAC: list of collections
curl -s "https://earth-search.aws.element84.com/v1/collections"
```

5. **Is the portal visible from above?** For Europe, find its catalog among the sources of data.europa.eu or in the national geocatalog. For others, search for its services in GeoSeer. If the portal is found in neither place, its data is known only to those who know the address.

A detailed list is in the [checklists](../12-appendices/04-checklists.md), and commands for other platforms are in the chapter [on APIs and bulk download](../04-features/04-access-interfaces.md#how-to-check-a-live-portal).

## When you do not need your own geoportal

For a small municipality with a dozen layers, a server of its own with GeoNode or GeoServer is more often harmful: there is nobody to update it, and it closes together with the project that paid for it. It is better to pass the layers to the regional or national infrastructure, subscribe to the service the neighbours already use and write export and a licence into the contract, or publish the layers as GeoPackage and GeoJSON files on an open data portal with a description on the dataset page.

A research project whose spatial data is a research result needs a research repository, not a geoportal: a file with a DOI will outlive the grant, a server will not. For imagery and other large files, a static STAC catalog in cloud storage without a server is enough. The decision for a city is worked through in the [municipality example](../06-choice/08-worked-examples.md#municipality-dont-set-up-your-own-portal), and ways of publishing without a portal in the chapters [on static sites](../08-beyond-portals/02-static-sites.md) and [on cloud storage](../08-beyond-portals/04-cloud-storage-and-hubs.md).

## How it differs from its neighbours

| Neighbour | Main difference |
|-------|-----------------|
| Open data portal | the main product is a dataset as a file. If the main thing on the site is a map and a layer catalog, it is a geoportal, even when tables sit next to it. Hybrids are ArcGIS Hub sites and data.europa.eu, where layers and tables sit side by side |
| Research repository | stores an immutable version of research data with a DOI. A geoportal shows the current state of a territory and updates it |
| Metadata catalog | GeoNetwork without data of its own is close to one, but its records lead to live services rather than only describing them |
| Search engine and aggregator | GeoSeer and similar services collect the addresses of other people's geoservices and keep no records of their own |
| Map viewer | shows layers, but without a catalog and download it is not a catalog |

A summary table of all types is in the chapter [Comparing Types and Hybrids](./11-comparison-and-hybrids.md).

## Sources

- dataportals-registry export, release 1.27.0 of 15 October 2026: owners, countries, geoportal platforms with the share having an API and the share inactive, software classes, interfaces, platforms by country, countries with a geoportal and no open data portal, platforms of Russian geoportals. The queries are in the [appendix](../12-appendices/02-using-the-registry.md#geoportals).
- [STAC module for GeoServer](https://docs.geoserver.org/latest/en/user/community/opensearch-eo/STAC/): a community module, not the core; [STAC Index](https://stacindex.org/catalogs)
- I. Begtin, [The spread of STAC services for geodata](https://begtin.substack.com/p/great-data-products-stac-digital) (in Russian), April 2026: STAC as a protocol and difficulties with the unit of publication
- [Platform profiles](../05-platforms/04-platform-profiles.md)
- Geo-System, [portals on e-mapa technology](https://www.geo-system.com.pl/info/e_mapa.pdf) (in Polish): about 2,000 gmina and powiat portals; [summary of deployments in 2025](https://geo-system.blogspot.com/2025/12/podsumowanie-wdrozen-technologii-e.html)
- Local vendors: [iObčina](https://www.kaliopa.si/iobcina/) (municipalities lease the system under contract), [GISPLAN](https://www.tmapy.sk/verejna-sprava/mesta), [GisMaster](https://www.technicaldesign.it/gismaster/), [Map2Web](https://www.schubert-franzke.com/de/digitale-karten/), [Waga Machi Guide](https://www.pasco.co.jp/biz/app-soft/wagamachiguide/), [Louhi](https://www.sitowise.com/digital-solutions/louhi-gis-platform-municipalities), [IntraMaps](https://www.technology1.com/products/spatial); open source: [Lizmap](https://github.com/3liz/lizmap-web-client) (MPL-2.0), [GeoMapFish](https://geomapfish.org), [Masterportal](https://www.masterportal.org), [mviewer](https://mviewer.github.io)
- I. Begtin, [geoportal software in the registry](https://t.me/begtin/7782), Telegram (in Russian), 17 September 2026, and [distribution of geoportals by country](https://t.me/begtin/7802), 27 September 2026
- I. Begtin, [why geodata "absorbs" open data](https://t.me/begtin/4804), Telegram (in Russian), 18 April 2023; [the Malawi geoportal and Africa without open data portals](https://t.me/begtin/4882), 17 May 2023; [open data in Kazakhstan](https://t.me/begtin/6020), 11 September 2024. The number of datasets on map.gov.kz is from the `/api/v2/datasets` response, 12 October 2026.
- Documentation: [harvesting records in GeoNetwork](https://docs.geonetwork-opensource.org/latest/user-guide/harvesting/), [editing INSPIRE records in GeoNetwork](https://docs.geonetwork-opensource.org/latest/user-guide/describing-information/inspire-editing/), [GeoNode](https://geonode.org/), [the INSPIRE extension for GeoServer](https://docs.geoserver.org/latest/en/user/extensions/inspire/index.html), [pycsw features](https://docs.pycsw.org/en/latest/introduction.html)
- I. Begtin, [GeoNetwork, GeoNode and GeoServer: roles and number of installations](https://t.me/begtin/6793), Telegram (in Russian), 9 June 2025: an assessment of the platforms' roles and the unavailability of Russian installations from abroad
- Standards: OGC, [OGC API — Records — Part 1: Core approved as a standard](https://www.ogc.org/announcement/ogc-membership-approves-ogc-api-records-part-1-core-as-an-official-ogc-standard/) (approved on 7 April 2025, [text of the standard](https://docs.ogc.org/is/20-004r1/20-004r1.html)); SEMIC, [GeoDCAT-AP 3.1.0](https://semiceu.github.io/GeoDCAT-AP/releases/3.1.0/), recommendation of 16 February 2026
- INSPIRE: European Commission, [proposal amending Directive 2007/2/EC, COM(2025) 985](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A52025PC0985), 10 December 2025; [procedure file 2025/0393(COD)](https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025%2F0393%28COD%29) at the European Parliament, Parliament's position of 6 October 2026; [the EU Council's negotiating position](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CONSIL%3AST_11148_2026_INIT), June 2026; data.europa.eu, [INSPIRE datasets move to the European Data Portal](https://data.europa.eu/en/news-events/news/inspire-datasets-move-european-data-portal), 22 June 2026; EU Publications Office, [INSPIRE in EU Vocabularies](https://op.europa.eu/en/web/eu-vocabularies/inspire). The redirect from inspire-geoportal.ec.europa.eu to data.europa.eu was checked on 12 October 2026.
- Checks on 12 October 2026: the number of records in [Geodatenkatalog.de](https://gdk.gdi-de.org/gdi-de/srv/eng/csw?service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&resultType=hits) and in the EEA catalog via CSW, CSW output formats in the EEA catalog (GeoNetwork 4.4.9); GDI-DE datasets on data.europa.eu: [search by the gdi-de catalog](https://data.europa.eu/api/hub/search/search?limit=0&filter=dataset&facets=%7B%22catalog%22%3A%5B%22gdi-de%22%5D%7D); [DCAT-US](https://opendata.dc.gov/api/feed/dcat-us/1.1.json), DCAT-AP and OGC API Records exports on opendata.dc.gov; WFS layers on kartta.hel.fi; [Earth Search](https://earth-search.aws.element84.com/v1/)
- [ArcGIS search](https://www.arcgis.com/home/search.html) and [ArcGIS Hub](https://hub.arcgis.com); I. Begtin, [hidden data on ArcGIS sites](https://t.me/begtin/5782), Telegram (in Russian), 22 July 2024, [ArcGIS search as a catalog](https://t.me/begtin/5831), 31 July 2024, and [where to look for geodata](https://t.me/begtin/6789), 7 June 2025: size estimates
- I. Begtin, [the Arkhangelsk region geoportal after its ArcGIS licence expired](https://t.me/begtin/5952), Telegram (in Russian), 21 August 2024
- Rosreestr, [the public cadastral map on the NSPD platform](https://www.cnews.ru/news/line/2024-12-27_publichnaya_kadastrovaya_karta), CNews (in Russian), 27 December 2024; I. Begtin, [Rosreestr's spatial data portal](https://t.me/begtin/5321), Telegram (in Russian), 7 January 2024
- [Order of the Russian Ministry of Economic Development No. 349 of 17 June 2021](https://www.garant.ru/products/ipo/prime/doc/402951420/) (in Russian) on FGIS TP formats (maps in GML and PDF); [questions and answers on the FGIS TP website](https://web.archive.org/web/20200526095800/https://fgistp.economy.gov.ru/) (in Russian) on releasing the vector model, Web Archive snapshot of 26 May 2020; I. Begtin, [FGIS TP: only rasters can be downloaded](https://t.me/begtin/5573), Telegram (in Russian), 8 April 2024
- [Russian Government Resolution No. 262 of 4 March 2017](https://base.garant.ru/71623992/) (in Russian) on providing data from spatial data funds; I. Begtin, [when open data is not open](https://t.me/begtin/3187), Telegram (in Russian), 25 October 2021
- Availability of NSPD, FGIS TP, the St Petersburg Spatial Data Fund and the Rosreestr website: checked from a German IP address on 12 October 2026.
