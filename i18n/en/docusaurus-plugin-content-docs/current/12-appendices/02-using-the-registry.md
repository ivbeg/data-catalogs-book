---
title: Using the Registry
description: Queries against the DuckDB export of the dataportals-registry that produced the book's figures.
---

The book's figures come from the [dataportals-registry](https://github.com/datenoio/dataportals-registry) export in DuckDB (`data/datasets/datasets.duckdb`), release 1.27.0 of 15 October 2026, with queries run on 15 October 2026. The `catalogs` table has one row per catalog, the `software` table one row per platform. All the book's figures were calculated from exactly this release. The type names below are as in the registry schema, not as in chapter titles.

## How to get the export

The database file is in the registry repository itself, in the `data/datasets` folder. Next to it are the same records in Parquet and JSONL: `full.parquet` and `full.jsonl`. The registry is updated every few days, so to check the book's figures you need the release they were calculated from, not the latest state of the repository:

```bash
git clone https://github.com/datenoio/dataportals-registry.git
cd dataportals-registry
git checkout v1.27.0
duckdb -readonly data/datasets/datasets.duckdb
```

With the first query, check the total number of records against the total in the chapter ["Catalogs in Numbers"](../01-basics/04-catalogs-in-numbers.md): release 1.27.0 gives 43,614.

```sql
SELECT count(*) FROM catalogs;
```

If the numbers do not match, you have a different export, and the other queries will give different figures too.

## Catalogs by type

```sql
SELECT catalog_type, count(*) AS n
FROM catalogs
GROUP BY 1
ORDER BY 2 DESC;
```

## Platforms within each type

```sql
SELECT catalog_type, sid, n
FROM (
  SELECT catalog_type, software.id AS sid, count(*) AS n,
         row_number() OVER (PARTITION BY catalog_type ORDER BY count(*) DESC) AS rn
  FROM catalogs
  GROUP BY 1, 2
)
WHERE rn <= 6
ORDER BY catalog_type, n DESC;
```

## Shares of custom-built solutions, APIs and closed catalogs by type

```sql
SELECT catalog_type,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       round(100.0 * count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) / count(*), 1) AS pct_dead
FROM catalogs
GROUP BY 1
ORDER BY count(*) DESC;
```

## Owners

```sql
SELECT owner.type, count(*) AS n
FROM catalogs
GROUP BY 1
ORDER BY 2 DESC;
```

## Prevalence of interfaces

```sql
SELECT e.type, count(*) AS n
FROM (SELECT unnest(endpoints) AS e FROM catalogs)
GROUP BY 1
ORDER BY 2 DESC
LIMIT 30;
```

## Licences, national catalogs, DOIs

About 420 catalogs with licence text or a link, about 2,000 with DOIs and 613 national ones: this query. The chapter on licences.

```sql
SELECT
  count(*) FILTER (WHERE rights.license_id IS NOT NULL
                      OR rights.license_url IS NOT NULL
                      OR rights.license_name IS NOT NULL) AS with_license,
  count(*) FILTER (WHERE properties.is_national) AS n_national,
  count(*) FILTER (WHERE properties.has_doi) AS with_doi,
  count(*) AS total
FROM catalogs;
```

18,000 with a defined licence model and 5,600 explicitly marked "unknown" are rows of the next query, not a sum with the 420. An empty value is records the chapter does not assign to any option. The slices do not add up to the total number of catalogs: licence text and licence model are different fields.

```sql
SELECT rights.rights_type AS model, count(*) AS n
FROM catalogs
GROUP BY 1
ORDER BY n DESC;
```

Restricted access, about 1,100 in the same chapter, is the value `restricted` in the `access_mode` list.

```sql
SELECT mode, count(*) AS n
FROM (SELECT unnest(access_mode) AS mode FROM catalogs)
GROUP BY 1
ORDER BY n DESC;
```

## Statuses and programmatic interface

868 inactive and 98 decommissioned are the `inactive` and `deprecated` rows. 65% and 34% with and without an interface are the `api` shares.

```sql
SELECT status, count(*) AS n
FROM catalogs
GROUP BY 1
ORDER BY n DESC;
```

```sql
SELECT
  count(*) FILTER (WHERE api) AS with_api,
  count(*) FILTER (WHERE NOT coalesce(api, false)) AS without_api,
  count(*) AS total
FROM catalogs;
```

The interface share for dataset lists, about 14%, is the `Datasets list` type.

```sql
SELECT
  count(*) AS n,
  round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api
FROM catalogs
WHERE catalog_type = 'Datasets list';
```

Sitemaps, about 7,000, are among the types in the "Prevalence of interfaces" query. If you need only them:

```sql
SELECT e.type, count(*) AS n
FROM (SELECT unnest(endpoints) AS e FROM catalogs)
WHERE lower(e.type) LIKE '%sitemap%'
GROUP BY 1
ORDER BY n DESC;
```

## Owners, countries, content

Local government, about 17,600, and geoportals among them, about 14,400:

```sql
SELECT catalog_type, count(*) AS n
FROM catalogs
WHERE owner.type = 'Local government'
GROUP BY 1
ORDER BY n DESC;
```

Countries in the chapter on numbers. A catalog with several countries is counted in each. Records without a single country form a separate row with empty or ambiguous coverage; the chapter has about 1,800 of them.

```sql
SELECT country_id, count(*) AS n
FROM (
  SELECT unnest(list_transform(coverage, x -> x.location.country.id)) AS country_id
  FROM catalogs
)
GROUP BY 1
ORDER BY n DESC
LIMIT 15;
```

The content breakdown in the chapter "What Gets Published": one catalog may produce several rows.

```sql
SELECT t AS content_type, count(*) AS n
FROM (SELECT unnest(content_types) AS t FROM catalogs)
GROUP BY 1
ORDER BY n DESC;
```

## Classification: owners, access and software classes by type

The chapter "How to Classify Catalogs". Owners within each type, for example 58% of geoportals run by local government and 85% of research repositories by universities and research organisations:

```sql
SELECT catalog_type, owner.type AS owner_type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (PARTITION BY catalog_type), 0) AS pct
FROM catalogs
GROUP BY 1, 2
ORDER BY catalog_type, n DESC;
```

The share of catalogs with restricted access to at least part of the data: 91% for marketplaces, 49% for microdata catalogs:

```sql
SELECT catalog_type,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted,
       count(*) AS n,
       round(100.0 * restricted / n, 0) AS pct
FROM catalogs
GROUP BY 1
ORDER BY pct DESC;
```

Software classes are the `subtype` field in the `software` table. In the chapter they are combined into five groups: cloud service (`managed_saas_service`), ready-made platform (the `*_platform` subtypes), server or domain system (`geospatial_service_middleware`, `protocol_or_api_server`, `domain_data_infrastructure`), CMS site (`cms_or_app_framework`) and in-house development (`custom`).

```sql
SELECT CASE WHEN c.software.id = 'custom' THEN 'custom' ELSE s.subtype END AS class,
       count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 1) AS pct
FROM catalogs c
LEFT JOIN software s ON s.id = c.software.id
GROUP BY 1
ORDER BY n DESC;
```

## Platforms the book names

The identifier is `software.id`. The roughly 1,900 CKAN installations are counted only among open data portals, not among all records with this id.

```sql
SELECT software.id AS sid, catalog_type, count(*) AS n
FROM catalogs
WHERE software.id IN (
  'ckan', 'dkan', 'arcgishub', 'arcgisserver', 'geoserver', 'emapa',
  'geonetwork', 'geonode', 'jkan', 'opensdg', 'datasette',
  'opendatasoft', 'socrata', 'pxweb', 'nada', 'dspace',
  'dataverse', 'inveniordm', 'invenio', 'custom'
)
GROUP BY 1, 2
ORDER BY n DESC;
```

## Open data portals

The chapter "Open Data Portals". Owners: 48% local government, 19% central:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct
FROM catalogs
WHERE catalog_type = 'Open data portal'
GROUP BY 1
ORDER BY n DESC;
```

Countries: Russia 572, US 565, Spain 485. A catalog with several countries is counted in each:

```sql
SELECT country_id, count(*) AS n
FROM (
  SELECT unnest(list_transform(coverage, lambda x: x.location.country.id)) AS country_id
  FROM catalogs
  WHERE catalog_type = 'Open data portal'
)
GROUP BY 1
ORDER BY n DESC
LIMIT 15;
```

Platforms with the share of APIs and inactive catalogs: CKAN 1,906 and 95% with an API, in-house development 1,144 and 19%:

```sql
SELECT software.id AS sid, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       round(100.0 * count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) / count(*), 1) AS pct_dead
FROM catalogs
WHERE catalog_type = 'Open data portal'
GROUP BY 1
ORDER BY n DESC
LIMIT 25;
```

Platforms for central and local government: CKAN 420 and 707, Gosweb 421 for local government only:

```sql
SELECT owner.type, software.id AS sid, count(*) AS n
FROM catalogs
WHERE catalog_type = 'Open data portal'
  AND owner.type IN ('Central government', 'Local government')
GROUP BY 1, 2
QUALIFY row_number() OVER (PARTITION BY owner.type ORDER BY count(*) DESC) <= 10
ORDER BY 1, n DESC;
```

The top three platforms in each country: this shows that in Russia the count comes from sections on Gosweb, in Italy from Municipium, in Japan from BODIK ODCS:

```sql
SELECT country_id, sid, n
FROM (
  SELECT country_id, sid, count(*) AS n,
         row_number() OVER (PARTITION BY country_id ORDER BY count(*) DESC) AS rn
  FROM (
    SELECT unnest(list_transform(coverage, lambda x: x.location.country.id)) AS country_id,
           software.id AS sid
    FROM catalogs
    WHERE catalog_type = 'Open data portal'
  )
  GROUP BY 1, 2
)
WHERE rn <= 3 AND country_id IN ('RU', 'US', 'ES', 'FR', 'IT', 'TH', 'ID', 'JP', 'CN')
ORDER BY country_id, n DESC;
```

## Geoportals

The chapter "Geoportals". Owners: 58% local government. In the chapter, central government is combined with federal (`Federal government`), and "Other" is `Other` plus `Community`:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct
FROM catalogs
WHERE catalog_type = 'Geoportal'
GROUP BY 1
ORDER BY n DESC;
```

Countries: US 5,050, Poland 2,303, Czechia 1,408. The top three platforms in each country show local vendors (GISPLAN in Czechia, iObčina in Slovenia, わが街ガイド in Japan):

```sql
SELECT country_id, sid, n
FROM (
  SELECT country_id, sid, count(*) AS n,
         row_number() OVER (PARTITION BY country_id ORDER BY count(*) DESC) AS rn
  FROM (
    SELECT unnest(list_transform(coverage, lambda x: x.location.country.id)) AS country_id,
           software.id AS sid
    FROM catalogs
    WHERE catalog_type = 'Geoportal'
  )
  GROUP BY 1, 2
)
WHERE rn <= 3
ORDER BY country_id, n DESC;
```

Platforms with the share of APIs and inactive catalogs: ArcGIS Server 4,674, in-house development 1,043 and 11% with an API, GeoNode 11.2% inactive. Russian geoportals (286) are counted by the owner's country: add `AND owner.location.country.id = 'RU'`.

```sql
SELECT software.id AS sid, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       round(100.0 * count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) / count(*), 1) AS pct_dead
FROM catalogs
WHERE catalog_type = 'Geoportal'
GROUP BY 1
ORDER BY n DESC
LIMIT 40;
```

Cloud services from local vendors, excluding ArcGIS Hub and e-mapa: 132 services, about 5,300 geoportals, 21% with an API; for 104 services no API is recorded on any site:

```sql
WITH v AS (
  SELECT c.software.id AS sid, count(*) AS n, count(*) FILTER (WHERE c.api) AS with_api
  FROM catalogs c
  JOIN software s ON s.id = c.software.id
  WHERE c.catalog_type = 'Geoportal'
    AND s.subtype = 'managed_saas_service'
    AND c.software.id NOT IN ('arcgishub', 'emapa')
  GROUP BY 1
)
SELECT count(*) AS vendors, sum(n) AS sites,
       round(100.0 * sum(with_api) / sum(n), 0) AS pct_api,
       count(*) FILTER (WHERE with_api = 0) AS vendors_without_api
FROM v;
```

Catalog interfaces at geoportals: about 3,200 DCAT-US and DCAT-AP dumps at ArcGIS Hub sites, CSW at GeoNetwork and GeoNode, about 140 STAC servers:

```sql
SELECT c.software.id AS sid, e.type, count(DISTINCT c.id) AS n
FROM (SELECT id, software, unnest(endpoints) AS e FROM catalogs WHERE catalog_type = 'Geoportal') c
WHERE e.type IN ('dcatus11', 'dcatap201', 'ogcrecordsapi', 'csw202', 'stacserverapi', 'oaipmh20')
GROUP BY 1, 2
HAVING n > 20
ORDER BY 2, n DESC;
```

## Research repositories

The chapter "Research Data Repositories". 8,404 in total, 119 inactive or decommissioned, 527 with restricted access:

```sql
SELECT count(*) AS n,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted
FROM catalogs
WHERE catalog_type = 'Scientific data repository';
```

Owners: 85% universities and research organisations:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct
FROM catalogs
WHERE catalog_type = 'Scientific data repository'
GROUP BY 1
ORDER BY n DESC;
```

Countries: US 2,018, Germany 764, UK 503; international ones are recorded as `World`:

```sql
SELECT country_id, count(*) AS n
FROM (
  SELECT unnest(list_transform(coverage, lambda x: x.location.country.id)) AS country_id
  FROM catalogs
  WHERE catalog_type = 'Scientific data repository'
)
GROUP BY 1
ORDER BY n DESC
LIMIT 20;
```

Platforms with the share of APIs and inactive catalogs: in-house development 2,836 and 5% with an API, IPT 360 and 12% inactive:

```sql
SELECT software.id AS sid, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       round(100.0 * count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) / count(*), 1) AS pct_dead
FROM catalogs
WHERE catalog_type = 'Scientific data repository'
GROUP BY 1
ORDER BY n DESC
LIMIT 30;
```

Top platforms by country: this shows WEKO3 in Japan, DABAR in Croatia, OPUS in Germany:

```sql
SELECT country_id, sid, n
FROM (
  SELECT country_id, sid, count(*) AS n,
         row_number() OVER (PARTITION BY country_id ORDER BY count(*) DESC) AS rn
  FROM (
    SELECT unnest(list_transform(coverage, lambda x: x.location.country.id)) AS country_id,
           software.id AS sid
    FROM catalogs
    WHERE catalog_type = 'Scientific data repository'
  )
  GROUP BY 1, 2
)
WHERE rn <= 4 AND country_id IN ('US', 'DE', 'GB', 'JP', 'CN', 'HR', 'FR', 'RU', 'World')
ORDER BY country_id, n DESC;
```

Interfaces: OAI-PMH at 2,068, a sitemap at 2,029, DCAT at about 200:

```sql
SELECT e.type, count(DISTINCT id) AS n
FROM (
  SELECT id, unnest(endpoints) AS e
  FROM catalogs
  WHERE catalog_type = 'Scientific data repository'
)
GROUP BY 1
ORDER BY n DESC
LIMIT 25;
```

Topics: environment about 2,300, living organisms about 1,600. One repository produces several rows; topics come from two code lists:

```sql
SELECT t.type, t.name, count(DISTINCT id) AS n
FROM (
  SELECT id, unnest(topics) AS t
  FROM catalogs
  WHERE catalog_type = 'Scientific data repository'
)
GROUP BY 1, 2
ORDER BY n DESC
LIMIT 20;
```

## Indicator catalogs

The chapter "Indicator Catalogs". Count, custom-built share, API share and inactive: 3,405, 44%, 37% and 29:

```sql
SELECT count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead
FROM catalogs
WHERE catalog_type = 'Indicators catalog';
```

Owners: 46% central government; the custom-built and API shares within each group:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api
FROM catalogs
WHERE catalog_type = 'Indicators catalog'
GROUP BY 1
ORDER BY n DESC;
```

Platforms with the API share: Swing 214, Knoema 125, PxWeb 110, DHIS2 74. For WordPress and Drupal the `api` field marks the CMS's own API, not the series:

```sql
SELECT software.id AS sid, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       round(100.0 * count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) / count(*), 1) AS pct_dead
FROM catalogs
WHERE catalog_type = 'Indicators catalog'
GROUP BY 1
ORDER BY n DESC
LIMIT 30;
```

Countries for each platform: this shows that Swing is the Netherlands and Belgium, HCI the US, Géoclip France, Knoema Africa:

```sql
WITH t AS (
  SELECT software.id AS sid,
         unnest(list_transform(coverage, lambda x: x.location.country.id)) AS country_id
  FROM catalogs
  WHERE catalog_type = 'Indicators catalog'
    AND software.id IN ('swing', 'knoema', 'pxweb', 'dhis2', 'opensdg', 'hci', 'geoclip', 'statsuite', 'sdmxri')
)
SELECT sid, string_agg(country_id || ':' || n, ', ' ORDER BY n DESC) AS countries
FROM (SELECT sid, country_id, count(*) AS n FROM t GROUP BY 1, 2)
GROUP BY 1;
```

Catalogs with SDMX endpoints: 170; DCAT endpoints appear at fewer than ten:

```sql
SELECT count(*) FILTER (WHERE list_has_any(list_transform(endpoints, lambda e: e.type),
         ['sdmx:datastructure', 'sdmx:dataflows', 'sdmx-rest', 'sdmx:codelist', 'sdmx:conceptscheme'])) AS with_sdmx
FROM catalogs
WHERE catalog_type = 'Indicators catalog';

SELECT e.type, count(*) AS n
FROM (SELECT unnest(endpoints) AS e FROM catalogs WHERE catalog_type = 'Indicators catalog') t
WHERE lower(e.type) LIKE '%dcat%'
GROUP BY 1;
```

## Search engines and aggregators

The chapter "Search Engines and Aggregators". Owners: 68% universities and research organisations. In the chapter, "Communities and civil society organisations" is `Community` plus `Civil society`, and "Other" is `Regional government` plus `Other`:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct
FROM catalogs
WHERE catalog_type = 'Data search engine'
GROUP BY 1
ORDER BY n DESC;
```

Territories: the EU as a whole 37, Italy 23, the whole world 21:

```sql
SELECT country_id, count(*) AS n
FROM (
  SELECT unnest(list_transform(coverage, lambda x: x.location.country.id)) AS country_id
  FROM catalogs
  WHERE catalog_type = 'Data search engine'
)
GROUP BY 1
ORDER BY n DESC
LIMIT 20;
```

Platforms with the share of APIs and inactive catalogs: OpenAIRE 50, in-house development 35 and 20% with an API, VIVO 28, Idra 6 and all inactive:

```sql
SELECT software.id AS sid, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead
FROM catalogs
WHERE catalog_type = 'Data search engine'
GROUP BY 1
ORDER BY n DESC;
```

The full list: this shows the 17 Italian UNIFIND instances on VIVO and the Idra demo instances:

```sql
SELECT software.id AS sid, owner.type AS owner_type, status, name, link
FROM catalogs
WHERE catalog_type = 'Data search engine'
ORDER BY sid, name;
```

Large search engines recorded under other types: Dateno, NIAID Discovery Portal, Research Data Australia, GESIS Search, DataONE, B2FIND, Earthdata Search, OmicsDI:

```sql
SELECT catalog_type, software.id AS sid, status, name, link
FROM catalogs
WHERE regexp_matches(lower(link),
  '(dateno\.io|//data\.niaid|researchdata\.edu\.au|search\.gesis|//www\.dataone\.org|b2find|search\.earthdata|omicsdi)')
ORDER BY catalog_type, name;
```

## Metadata catalogs

The chapter "Metadata Catalogs and Registries". Count, custom-built share, API share, inactive and restricted access: 172, 38%, 67%, 0 and 18:

```sql
SELECT count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted
FROM catalogs
WHERE catalog_type = 'Metadata catalog';
```

Owners: 31% universities and research organisations, 30% international organisations. In the chapter, `Community` and `Other` are combined into "Communities and other":

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct
FROM catalogs
WHERE catalog_type = 'Metadata catalog'
GROUP BY 1
ORDER BY n DESC;
```

Platforms with the API share: in-house development 65 and 17%, FAIR Data Point 47, Metadata Browser (`mwmb`) 16, Skosmos 10:

```sql
SELECT software.id AS sid, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api
FROM catalogs
WHERE catalog_type = 'Metadata catalog'
GROUP BY 1
ORDER BY n DESC;
```

Platforms by country: this shows that the Netherlands is FAIR Data Points, the UK Metadata Browser, Australia Aristotle:

```sql
SELECT country_id, sid, count(*) AS n
FROM (
  SELECT unnest(list_transform(coverage, lambda x: x.location.country.id)) AS country_id,
         software.id AS sid
  FROM catalogs
  WHERE catalog_type = 'Metadata catalog'
)
GROUP BY 1, 2
ORDER BY country_id, n DESC;
```

Interfaces: DCAT in Turtle at 47 FAIR Data Points, the Skosmos REST API at 9 installations, SDMX endpoints at registries on Fusion Metadata Registry:

```sql
SELECT software.id AS sid, e.type, count(DISTINCT id) AS n
FROM (
  SELECT id, software, unnest(endpoints) AS e
  FROM catalogs
  WHERE catalog_type = 'Metadata catalog'
)
GROUP BY 1, 2
ORDER BY 1, n DESC;
```

## ML catalogs

The chapter "ML Catalogs". 100 in total, 2 inactive, 5 with restricted access, 78% custom-built, 23% with an API:

```sql
SELECT count(*) AS n,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api
FROM catalogs
WHERE catalog_type = 'Machine learning catalog';
```

Owners: 37 universities and research organisations, 31 companies:

```sql
SELECT owner.type, count(*) AS n
FROM catalogs
WHERE catalog_type = 'Machine learning catalog'
GROUP BY 1
ORDER BY n DESC;
```

Countries: international 34, US 19, China 12, Russia 6:

```sql
SELECT country_id, count(*) AS n
FROM (
  SELECT unnest(list_transform(coverage, lambda x: x.location.country.id)) AS country_id
  FROM catalogs
  WHERE catalog_type = 'Machine learning catalog'
)
GROUP BY 1
ORDER BY n DESC
LIMIT 15;
```

Platforms and the API share: in-house development 78 and 13 with an API, Jekyll 9:

```sql
SELECT software.id AS sid, count(*) AS n,
       count(*) FILTER (WHERE api) AS with_api
FROM catalogs
WHERE catalog_type = 'Machine learning catalog'
GROUP BY 1
ORDER BY n DESC;
```

The full list of records. From it, the chapter manually sorts records into eight kinds (hubs, competition platforms, collections, benchmark sites and others); the registry has no such field:

```sql
SELECT name, link, software.id AS sid, owner.type AS owner_type, api, status
FROM catalogs
WHERE catalog_type = 'Machine learning catalog'
ORDER BY sid, name;
```

## API catalogs, marketplaces and dataset lists

The chapter "API Catalogs, Marketplaces and Dataset Lists". Count, in-house development share, API share and restricted access share: 115, 74%, 51% and 14% for API catalogs; 56, 98%, 21% and 91% for marketplaces; 107, 89%, 14% and 1% for lists:

```sql
SELECT catalog_type, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       round(100.0 * count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) / count(*), 0) AS pct_restricted
FROM catalogs
WHERE catalog_type IN ('API Catalog', 'Data marketplace', 'Datasets list')
GROUP BY 1;
```

Owners: 45% of API catalogs belong to central government, 70% of marketplaces to companies:

```sql
SELECT catalog_type, owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (PARTITION BY catalog_type), 0) AS pct
FROM catalogs
WHERE catalog_type IN ('API Catalog', 'Data marketplace', 'Datasets list')
GROUP BY 1, 2
ORDER BY 1, n DESC;
```

Countries: for marketplaces, South Korea 16, US 12, China 6:

```sql
SELECT catalog_type, country_id, count(*) AS n
FROM (
  SELECT catalog_type,
         unnest(list_transform(coverage, lambda x: x.location.country.id)) AS country_id
  FROM catalogs
  WHERE catalog_type IN ('API Catalog', 'Data marketplace', 'Datasets list')
)
GROUP BY 1, 2
QUALIFY row_number() OVER (PARTITION BY catalog_type ORDER BY count(*) DESC) <= 10
ORDER BY 1, n DESC;
```

Platforms: for API catalogs, Azure API Management 22, WSO2 API Manager 2:

```sql
SELECT catalog_type, software.id AS sid, count(*) AS n,
       count(*) FILTER (WHERE api) AS with_api
FROM catalogs
WHERE catalog_type IN ('API Catalog', 'Data marketplace', 'Datasets list')
GROUP BY 1, 2
ORDER BY 1, n DESC;
```

Transport developer portals, about 35 of 115, are selected by name and address; the list is worth reviewing by eye, because the pattern also catches extras (Metropolia, gov.br/conecta):

```sql
SELECT name, link
FROM catalogs
WHERE catalog_type = 'API Catalog'
  AND regexp_matches(lower(name || ' ' || link),
      'transit|transport|metro|\bbus\b|rail|traffic|trafik|tmb|mta|bart|cta|marta|wmata|trimet|translink|entur|waltti|föli|foli|metlink|511|digitraffic|tdx|koroad|apiportal.ns|sptrans|oc transpo|skåne|cumtd|cota|deutschebahn');
```

Dataset lists on GitHub and GitLab: 16; crypto exchange trading history: 13:

```sql
SELECT
  count(*) FILTER (WHERE regexp_matches(lower(name || ' ' || link), 'github.io|github.com|gitlab')) AS on_git,
  count(*) FILTER (WHERE regexp_matches(lower(name || ' ' || link),
      'binance|bybit|okx|kucoin|mexc|bitget|kraken|gatedata|bitmex|crypto|polymarket|paradigm')) AS crypto
FROM catalogs
WHERE catalog_type = 'Datasets list';
```

Sitemaps at API catalogs: 26 of 115:

```sql
SELECT catalog_type, e.type, count(DISTINCT id) AS n
FROM (
  SELECT id, catalog_type, unnest(endpoints) AS e
  FROM catalogs
  WHERE catalog_type IN ('API Catalog', 'Data marketplace', 'Datasets list')
)
GROUP BY 1, 2
ORDER BY 1, n DESC;
```

## Capability map

The chapter "Capability Map", queries of 15 October 2026. Interfaces are taken from the `endpoints` list, DOIs from the `has_doi` flag; research repositories are counted together with generalist ones. The registry hardly records schema.org markup, so its share is not calculated.

Shares by type: DCAT at 26% of open data portals, OAI-PMH at 25% and DOIs at 17% of research repositories, CSW or OGC API Records at 20% of geoportals, SDMX at 5.2% of indicator catalogs:

```sql
WITH t AS (
  SELECT CASE WHEN catalog_type IN ('Scientific data repository', 'General research repository')
              THEN 'Science' ELSE catalog_type END AS ct,
         properties.has_doi AS doi,
         list_transform(coalesce(endpoints, []), lambda e: lower(e.type)) AS et
  FROM catalogs
)
SELECT ct, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE len(list_filter(et, lambda x: x LIKE 'dcat%' OR x LIKE '%:dcatus11')) > 0) / count(*), 1) AS pct_dcat,
       round(100.0 * count(*) FILTER (WHERE len(list_filter(et, lambda x: x LIKE 'oai%')) > 0) / count(*), 1) AS pct_oai,
       round(100.0 * count(*) FILTER (WHERE len(list_filter(et, lambda x: x LIKE 'csw%' OR x LIKE 'ogcrecords%')) > 0) / count(*), 1) AS pct_csw_records,
       round(100.0 * count(*) FILTER (WHERE len(list_filter(et, lambda x: x LIKE '%sdmx%')) > 0) / count(*), 1) AS pct_sdmx,
       round(100.0 * count(*) FILTER (WHERE doi) / count(*), 1) AS pct_doi
FROM t
WHERE ct IN ('Open data portal', 'Science', 'Geoportal', 'Indicators catalog')
GROUP BY 1
ORDER BY n DESC;
```

DCAT at open data portals by platform: Socrata 239 of 245, OpenDataSoft 348 of 454, DKAN 103 of 161, CKAN 633 of 1,906, in-house development 24 of 1,144:

```sql
SELECT software.id AS sid, count(*) AS n,
       count(*) FILTER (WHERE len(list_filter(
         list_transform(coalesce(endpoints, []), lambda e: lower(e.type)),
         lambda x: x LIKE 'dcat%' OR x LIKE '%:dcatus11')) > 0) AS with_dcat
FROM catalogs
WHERE catalog_type = 'Open data portal'
GROUP BY 1
ORDER BY n DESC
LIMIT 10;
```

DOIs and OAI-PMH at research repositories by platform: Figshare 266 DOIs of 288, Dataverse 172 DOIs and 177 OAI-PMH of 257, DSpace 218 DOIs and 665 OAI-PMH of 829, in-house development 158 DOIs and 19 OAI-PMH of 2,840 (research repositories together with four general-purpose ones; research repositories alone number 2,836, of which 157 have DOIs):

```sql
SELECT software.id AS sid, count(*) AS n,
       count(*) FILTER (WHERE properties.has_doi) AS with_doi,
       count(*) FILTER (WHERE len(list_filter(
         list_transform(coalesce(endpoints, []), lambda e: lower(e.type)),
         lambda x: x LIKE 'oai%')) > 0) AS with_oai
FROM catalogs
WHERE catalog_type IN ('Scientific data repository', 'General research repository')
GROUP BY 1
ORDER BY n DESC
LIMIT 10;
```

A catalog service at geoportals by platform: ArcGIS Hub 3,257 of 3,464, GeoNetwork 686 of 762, GeoNode 628 of 770, ArcGIS Server 1 of 4,674, e-mapa 0 of 1,927, in-house development 4 of 1,043:

```sql
SELECT software.id AS sid, count(*) AS n,
       count(*) FILTER (WHERE len(list_filter(
         list_transform(coalesce(endpoints, []), lambda e: lower(e.type)),
         lambda x: x LIKE 'csw%' OR x LIKE 'ogcrecords%')) > 0) AS with_catalog_service
FROM catalogs
WHERE catalog_type = 'Geoportal'
GROUP BY 1
ORDER BY n DESC
LIMIT 10;
```

SDMX at indicator catalogs by platform: of 177 catalogs, 113 on Knoema:

```sql
SELECT software.id AS sid, count(*) AS n
FROM catalogs
WHERE catalog_type = 'Indicators catalog'
  AND len(list_filter(
        list_transform(coalesce(endpoints, []), lambda e: lower(e.type)),
        lambda x: x LIKE '%sdmx%')) > 0
GROUP BY 1
ORDER BY n DESC;
```

## Metadata export

The chapter "Metadata Export", queries of 15 October 2026. At least one standard way to serve descriptions (DCAT, OAI-PMH, CSW, OGC API Records, SDMX or STAC) at 9,330 of 43,614 catalogs. A DCAT dump at 5,233, both profiles, DCAT-US and DCAT-AP, at 3,152. The registry hardly records schema.org markup: there are 38 such endpoints:

```sql
WITH f AS (
  SELECT list_transform(coalesce(endpoints, []), lambda e: lower(e.type)) AS et
  FROM catalogs
)
SELECT count(*) AS n,
       count(*) FILTER (WHERE len(list_filter(et, lambda x: x LIKE 'dcat%' OR x LIKE '%dcatus11'
                        OR x = 'dcat-us')) > 0) AS dcat,
       count(*) FILTER (WHERE len(list_filter(et, lambda x: x LIKE 'dcatus11' OR x LIKE '%:dcatus11'
                        OR x = 'dcat-us')) > 0
                        AND len(list_filter(et, lambda x: x LIKE 'dcatap%')) > 0) AS both_profiles,
       count(*) FILTER (WHERE len(list_filter(et, lambda x: x LIKE 'dcat%' OR x LIKE '%dcatus11'
                        OR x = 'dcat-us' OR x LIKE 'oai%' OR x LIKE 'csw%' OR x LIKE 'ogcrecords%'
                        OR x LIKE '%sdmx%' OR x LIKE 'stac%')) > 0) AS any_standard,
       count(*) FILTER (WHERE len(list_filter(et, lambda x: x LIKE 'schemaorg%')) > 0) AS schemaorg
FROM f;
```

DCAT at open data portals by platform: Socrata 239 of 245, OpenDataSoft 348 of 454, DKAN 103 of 161, CKAN 633 of 1,906, in-house development 24 of 1,144. The query is in the section ["Capability map"](#capability-map).

## API and bulk download

The chapter "API and Bulk Download", queries of 15 October 2026. The "has a programmatic entry point" flag in the registry coincides with a non-empty `endpoints` list: 28,471 of 43,614. A standard way to take all descriptions (DCAT, OAI-PMH, CSW or OGC API Records) at 8,894 catalogs. Shares by type: 70% of geoportals, 69% of open data portals, 63% of research repositories, 37% of indicator catalogs, 23% of ML catalogs:

```sql
WITH t AS (
  SELECT catalog_type,
         list_transform(coalesce(endpoints, []), lambda e: lower(e.type)) AS et
  FROM catalogs
), f AS (
  SELECT catalog_type,
         len(et) > 0 AS any_ep,
         len(list_filter(et, lambda x: x LIKE 'dcat%' OR x LIKE '%dcatus11' OR x LIKE 'oai%'
                                    OR x LIKE 'csw%' OR x LIKE 'ogcrecords%')) > 0 AS all_desc,
         len(list_filter(et, lambda x: x LIKE '%sitemap%')) > 0 AS sitemap
  FROM t
)
SELECT coalesce(catalog_type, 'total') AS catalog_type, count(*) AS n,
       count(*) FILTER (WHERE any_ep) AS any_ep,
       round(100.0 * count(*) FILTER (WHERE any_ep) / count(*), 0) AS pct_any,
       count(*) FILTER (WHERE all_desc) AS all_desc,
       round(100.0 * count(*) FILTER (WHERE all_desc) / count(*), 0) AS pct_all_desc,
       round(100.0 * count(*) FILTER (WHERE sitemap) / count(*), 0) AS pct_sitemap
FROM f
GROUP BY ROLLUP (catalog_type)
ORDER BY n DESC;
```

In-house development versus ready-made platforms: 697 of 7,034 with a programmatic entry point and 58 with a standard description dump for in-house builds, 76% with a programmatic entry point for the rest:

```sql
WITH t AS (
  SELECT software.id = 'custom' AS is_custom,
         list_transform(coalesce(endpoints, []), lambda e: lower(e.type)) AS et
  FROM catalogs
)
SELECT is_custom, count(*) AS n,
       count(*) FILTER (WHERE len(et) > 0) AS any_ep,
       round(100.0 * count(*) FILTER (WHERE len(et) > 0) / count(*), 0) AS pct_any,
       count(*) FILTER (WHERE len(list_filter(et, lambda x: x LIKE 'dcat%' OR x LIKE '%dcatus11'
                        OR x LIKE 'oai%' OR x LIKE 'csw%' OR x LIKE 'ogcrecords%')) > 0) AS all_desc
FROM t
GROUP BY 1;
```

The registry records RSS and Atom feeds mainly at geoportals and research repositories; CKAN portals hardly have them recorded, although a feed is in the CKAN core. So the chapter does not give a registry-based share of feeds.

## Identifiers and DOIs

The chapter "Persistent Identifiers, DOIs and Versions", queries of 15 October 2026. A DOI flag at 2,008 of 43,614 catalogs: 1,396 research repositories and 8 generalist ones, 584 geoportals, the rest isolated cases:

```sql
SELECT catalog_type,
       count(*) FILTER (WHERE properties.has_doi) AS with_doi,
       count(*) AS n
FROM catalogs
GROUP BY 1
HAVING with_doi > 0
ORDER BY with_doi DESC;
```

The flag is mostly inherited from the platform record (`software.pid_support.has_doi`), so it should be read as "the platform can". GeoNetwork's platform is marked "Yes", and 555 of 764 installations got the flag; in-house development is marked "No", and 175 flags were set manually:

```sql
SELECT c.software.id AS sid,
       s.pid_support.has_doi AS platform_flag,
       count(*) FILTER (WHERE c.properties.has_doi) AS with_doi,
       count(*) AS n
FROM catalogs c
LEFT JOIN software s ON s.id = c.software.id
GROUP BY 1, 2
HAVING with_doi > 0
ORDER BY with_doi DESC
LIMIT 10;
```

The sample for the Handle check: 120 of 782 OAI-PMH endpoints at active DSpace installations, in a reproducible random order. For each, the Handle of the first record from `ListIdentifiers` is taken and checked via `https://hdl.handle.net/api/handles/…`:

```sql
SELECT e.url
FROM (SELECT unnest(endpoints) AS e
      FROM catalogs
      WHERE software.id = 'dspace' AND status = 'active')
WHERE lower(e.type) LIKE 'oai%'
ORDER BY hash(e.url)
LIMIT 120;
```

## Access, roles and workflows

The chapter "Access, Roles and Publishing Workflows", queries of 15 October 2026. Restricted access to at least part of the data at 1,131 of 43,614 catalogs: 537 restricted only, 594 together with open:

```sql
SELECT count(*) AS total,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted,
       count(*) FILTER (WHERE access_mode = ['restricted']) AS only_restricted,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')
                          AND list_contains(access_mode, 'open')) AS mixed
FROM catalogs;
```

The share by platform: DHIS2 97%, NADA 72%, Pure 36% against CKAN 0.6% and Dataverse 1.9%:

```sql
SELECT software.id AS platform,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted,
       count(*) AS n,
       round(100.0 * restricted / n, 1) AS pct
FROM catalogs
WHERE software.id IN ('nada', 'dhis2', 'gen3', 'redivis', 'pure', 'ckan', 'dataverse',
                      'dspace', 'inveniordm', 'geonetwork', 'opendatasoft', 'socrata', 'arcgishub')
GROUP BY 1
ORDER BY pct DESC;
```

The list for measuring registration on CKAN portals: 1,839 active catalogs. For each, the API address is taken from the `ckan` endpoint, or, if there is none, the site address with `/api/3`:

```sql
SELECT id, link, catalog_type, owner.type AS otype,
       coverage[1].location.country.id AS country,
       [x.url for x in endpoints if x.type = 'ckan'][1] AS api
FROM catalogs
WHERE software.id = 'ckan' AND status = 'active'
ORDER BY id;
```

## Microdata catalogs

The chapter "Microdata Catalogs". 326 in total, 59 not working, 159 with restricted access, 13% custom-built, 70% with an API:

```sql
SELECT count(*) AS n,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api
FROM catalogs
WHERE catalog_type = 'Microdata catalog';
```

Owners and the NADA share for each: 55% central government, 59% of them on NADA; international organisations 90% on NADA:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct,
       round(100.0 * count(*) FILTER (WHERE software.id = 'nada') / count(*), 0) AS pct_nada
FROM catalogs
WHERE catalog_type = 'Microdata catalog'
GROUP BY 1
ORDER BY n DESC;
```

Platforms with the API share and number not working: NADA 158 and 47 not working, in-house development 43 and 12% with an API:

```sql
SELECT software.id AS sid, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted
FROM catalogs
WHERE catalog_type = 'Microdata catalog'
GROUP BY 1
ORDER BY n DESC;
```

Countries: 139 countries and 27 worldwide catalogs; US 18, Canada 12, Germany 11:

```sql
SELECT country_id, count(*) AS n
FROM (
  SELECT unnest(list_transform(coverage, lambda x: x.location.country.id)) AS country_id
  FROM catalogs
  WHERE catalog_type = 'Microdata catalog'
)
GROUP BY 1
ORDER BY n DESC;
```

Non-working catalogs without HTTPS and on IP addresses: 38 of 58 without HTTPS, 7 of 10 on IP addresses:

```sql
SELECT count(*) FILTER (WHERE link LIKE 'http://%') AS http,
       count(*) FILTER (WHERE link LIKE 'http://%' AND status = 'inactive') AS http_dead,
       count(*) FILTER (WHERE regexp_matches(link, '^https?://[0-9.]+')) AS ip,
       count(*) FILTER (WHERE regexp_matches(link, '^https?://[0-9.]+') AND status = 'inactive') AS ip_dead
FROM catalogs
WHERE catalog_type = 'Microdata catalog';
```

Countries with a non-working NADA and no other active microdata catalog: 18 of 38:

```sql
WITH c AS (
  SELECT status, software.id AS sid,
         unnest(list_transform(coverage, lambda x: x.location.country.id)) AS cc
  FROM catalogs
  WHERE catalog_type = 'Microdata catalog'
),
dead AS (SELECT DISTINCT cc FROM c WHERE status = 'inactive' AND sid = 'nada' AND length(cc) = 2)
SELECT count(*) AS countries,
       count(*) FILTER (WHERE NOT EXISTS (
         SELECT 1 FROM c WHERE c.cc = dead.cc AND c.status = 'active')) AS without_active
FROM dead;
```

## Comparing types and hybrids

The chapter "Comparing Types and Hybrids". The summary table: count and the shares of in-house development, API, non-working and restricted access by type:

```sql
SELECT catalog_type, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       round(100.0 * count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) / count(*), 1) AS pct_dead,
       round(100.0 * count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) / count(*), 0) AS pct_restricted
FROM catalogs
GROUP BY 1
ORDER BY n DESC;
```

The main owner and the top four platforms of each type, excluding in-house development:

```sql
SELECT catalog_type, owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (PARTITION BY catalog_type), 0) AS pct
FROM catalogs
GROUP BY 1, 2
QUALIFY row_number() OVER (PARTITION BY catalog_type ORDER BY count(*) DESC) = 1;

SELECT catalog_type, string_agg(sid || ' ' || n, ', ' ORDER BY n DESC) AS top
FROM (
  SELECT catalog_type, software.id AS sid, count(*) AS n
  FROM catalogs
  WHERE software.id <> 'custom'
  GROUP BY 1, 2
  QUALIFY row_number() OVER (PARTITION BY catalog_type ORDER BY count(*) DESC) <= 4
)
GROUP BY 1;
```

In how many types a platform appears: WordPress in nine, CKAN in five, GeoNode, Dataverse and PxWeb in one:

```sql
SELECT software.id AS sid, count(DISTINCT catalog_type) AS n_types, count(*) AS n,
       string_agg(DISTINCT catalog_type, ', ') AS types
FROM catalogs
WHERE catalog_type NOT IN ('Other', 'General research repository')
  AND software.id <> 'custom'
GROUP BY 1
ORDER BY n_types DESC, n DESC
LIMIT 30;
```

Owners with catalogs of several types: 2,203 of 32,595, of which 254 with three or more, accounting for 7,358 catalogs; 118 make do with one program. An owner here is an organisation name within one country, so the count is approximate:

```sql
CREATE TEMP TABLE o AS
SELECT lower(trim(owner.name)) AS oname, owner.location.country.id AS cc,
       owner.type AS otype, catalog_type, software.id AS sid
FROM catalogs
WHERE coalesce(trim(owner.name), '') <> ''
  AND catalog_type NOT IN ('Other', 'General research repository');

CREATE TEMP TABLE g AS
SELECT oname, cc, any_value(otype) AS otype,
       count(DISTINCT catalog_type) AS nt, count(*) AS n, count(DISTINCT sid) AS ns,
       string_agg(DISTINCT catalog_type, ' | ' ORDER BY catalog_type) AS type_list
FROM o
GROUP BY 1, 2;

SELECT count(*) AS owners,
       count(*) FILTER (WHERE nt > 1) AS multi,
       count(*) FILTER (WHERE nt > 2) AS multi3,
       sum(n) FILTER (WHERE nt > 1) AS catalogs,
       count(*) FILTER (WHERE nt > 1 AND ns = 1) AS one_software
FROM g;
```

The share of such owners by owner type, and the most frequent pairs of types: geoportal and open data portal at 953:

```sql
SELECT otype, count(*) AS owners,
       round(100.0 * count(*) FILTER (WHERE nt > 1) / count(*), 0) AS pct_multi
FROM g
GROUP BY 1
ORDER BY owners DESC;

SELECT type_list, count(*) AS owners
FROM g
WHERE nt = 2
GROUP BY 1
ORDER BY owners DESC
LIMIT 15;
```

The "geoportal and open data portal" pair: 1,120 owners, combinations of programs (ArcGIS Server and CKAN: 101), and one program on both sides at 44 of 953, of which 39 are in-house builds:

```sql
CREATE TEMP TABLE pair AS
SELECT oname, cc, any_value(otype) AS otype
FROM o
GROUP BY 1, 2
HAVING bool_or(catalog_type = 'Geoportal') AND bool_or(catalog_type = 'Open data portal');

SELECT g.sid AS geo, d.sid AS odp, count(DISTINCT oname || cc) AS owners
FROM (SELECT DISTINCT oname, cc, sid FROM o JOIN pair USING (oname, cc) WHERE catalog_type = 'Geoportal') g
JOIN (SELECT DISTINCT oname, cc, sid FROM o JOIN pair USING (oname, cc) WHERE catalog_type = 'Open data portal') d
  USING (oname, cc)
GROUP BY 1, 2
ORDER BY owners DESC
LIMIT 12;

SELECT shared_sid, count(*) AS owners
FROM (
  SELECT oname, cc,
         unnest(list_intersect(
           list(DISTINCT sid) FILTER (WHERE catalog_type = 'Geoportal'),
           list(DISTINCT sid) FILTER (WHERE catalog_type = 'Open data portal'))) AS shared_sid
  FROM o JOIN g USING (oname, cc)
  WHERE g.nt = 2 AND g.type_list = 'Geoportal | Open data portal'
  GROUP BY 1, 2
)
GROUP BY 1
ORDER BY owners DESC;
```

Catalogs of one organisation: this shows the line-ups of the Pacific Community, the World Bank, FAO and INEGI:

```sql
SELECT owner.name, catalog_type, software.id AS sid, status, link
FROM catalogs
WHERE owner.name IN ('Pacific Community (SPC)', 'World Bank',
                     'Food and Agriculture Organization of the United Nations',
                     'Instituto Nacional de Estadística y Geografía (INEGI)')
ORDER BY 1, 2, 3;
```

## When you don't need a portal

The chapter "When You Don't Need a Portal", queries of 15 October 2026 against the same export. Dataset lists: 107, a programmatic interface at 15, in-house development at 95, inactive and withdrawn: 7:

```sql
SELECT
  count(*) AS n,
  count(*) FILTER (WHERE api) AS with_api,
  count(*) FILTER (WHERE software.id = 'custom') AS custom,
  count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead
FROM catalogs
WHERE catalog_type = 'Datasets list';
```

A sitemap at 12. The other page engines: Drupal, WordPress, TYPO3, Jekyll, SharePoint, Liferay:

```sql
SELECT count(DISTINCT id) AS with_sitemap
FROM (
  SELECT id, unnest(endpoints) AS e
  FROM catalogs
  WHERE catalog_type = 'Datasets list'
)
WHERE e.type = 'sitemap';

SELECT software.id AS sid, count(*) AS n
FROM catalogs
WHERE catalog_type = 'Datasets list'
GROUP BY 1
ORDER BY n DESC;
```

## Innovative catalogs

The chapter "What Innovative Catalogs Can Already Do", queries of 15 October 2026 against the same export. ERDDAP: 175 records, one inactive. Datasette: 45, one inactive. Redivis: 13, DataLad: 10, DANDI: 3. Datadex: 3, none with a programmatic interface recorded:

```sql
SELECT software.id AS sid, count(*) AS n,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead,
       count(*) FILTER (WHERE api) AS with_api
FROM catalogs
WHERE software.id IN ('erddap', 'datasette', 'redivis', 'datalad', 'dandi', 'datadex')
GROUP BY 1
ORDER BY n DESC;
```

Records with openEO in the endpoint address or type: 12, of which 3 at Copernicus Data Space Ecosystem. Catalogs with a GA4GH DRS interface: 27:

```sql
SELECT count(DISTINCT id) AS with_openeo,
       count(DISTINCT id) FILTER (WHERE e.url ILIKE '%dataspace.copernicus.eu%') AS cdse
FROM (SELECT id, unnest(endpoints) AS e FROM catalogs)
WHERE e.url ILIKE '%openeo%' OR e.type ILIKE 'openeo%';

SELECT count(DISTINCT id) AS with_drs
FROM (SELECT id, unnest(endpoints) AS e FROM catalogs)
WHERE e.type = 'ga4gh:drs';
```

The openEO count also includes two community sites with only a sitemap: the address contains the word, but there is no openEO server behind it. Records for checking against the chapter: Source Cooperative, Data Commons, Our World in Data, DoltHub:

```sql
SELECT id, catalog_type, software.id AS sid, api, link
FROM catalogs
WHERE link ILIKE '%source.coop%' OR link ILIKE '%datacommons.org%'
   OR link ILIKE '%ourworldindata.org%' OR link ILIKE '%dolthub.com%';
```

That day, only a sitemap was recorded among the endpoints for DoltHub and Our World in Data, although both have APIs. Data Commons has no endpoints at all and no programmatic interface recorded, although it has REST, SDMX and an MCP server. The main Source Cooperative record has a single STAC interface; the `beta.source.coop` record has no endpoints.

## Further reading

- [Query examples in the registry documentation](https://datenoio.github.io/dataportals-registry/docs/query-examples/)
- [Data model](https://datenoio.github.io/dataportals-registry/docs/data-model/)
