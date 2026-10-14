---
title: Как работать с реестром
description: Запросы к DuckDB-выгрузке dataportals-registry, которыми получены цифры книги.
---

Цифры книги получены из выгрузки [dataportals-registry](https://github.com/datenoio/dataportals-registry) в DuckDB (`data/datasets/datasets.duckdb`), выпуск 1.26.0 от 6 октября 2026 года, запросы от 9 октября 2026 года. Таблица `catalogs` — одна строка на каталог, таблица `software` — одна строка на платформу. Более новый выпуск даст другие числа. Имена типов ниже — как в схеме реестра, не как заголовки глав.

```bash
duckdb -readonly data/datasets/datasets.duckdb
```

## Каталоги по типам

```sql
SELECT catalog_type, count(*) AS n
FROM catalogs
GROUP BY 1
ORDER BY 2 DESC;
```

## Платформы внутри каждого типа

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

## Доли самописных решений, API и закрытых каталогов по типам

```sql
SELECT catalog_type,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       round(100.0 * count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) / count(*), 1) AS pct_dead
FROM catalogs
GROUP BY 1
ORDER BY count(*) DESC;
```

## Владельцы

```sql
SELECT owner.type, count(*) AS n
FROM catalogs
GROUP BY 1
ORDER BY 2 DESC;
```

## Распространённость интерфейсов

```sql
SELECT e.type, count(*) AS n
FROM (SELECT unnest(endpoints) AS e FROM catalogs)
GROUP BY 1
ORDER BY 2 DESC
LIMIT 30;
```

## Лицензии, национальные каталоги, DOI

Около 420 каталогов с текстом или ссылкой на лицензию, около 2 тысяч с DOI и 613 национальных — этот запрос. Глава о лицензиях.

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

17 тысяч с определённой моделью лицензии и 5,6 тысячи с явной пометкой «неизвестно» — строки следующего запроса, не сумма с 420. Пустое значение — записи, которые глава не относит ни к одному варианту. Срезы не складываются в общее число каталогов: текст лицензии и модель лицензии — разные поля.

```sql
SELECT rights.rights_type AS model, count(*) AS n
FROM catalogs
GROUP BY 1
ORDER BY n DESC;
```

Ограниченный доступ, около 1,1 тысячи в той же главе, — значение `restricted` в списке `access_mode`.

```sql
SELECT mode, count(*) AS n
FROM (SELECT unnest(access_mode) AS mode FROM catalogs)
GROUP BY 1
ORDER BY n DESC;
```

## Статусы и программный интерфейс

868 недействующих и 98 выведенных из эксплуатации — строки `inactive` и `deprecated`. 66% и 33% с интерфейсом и без него — доли `api`.

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

Доля интерфейса у списков наборов, около 13%, — тип `Datasets list`.

```sql
SELECT
  count(*) AS n,
  round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api
FROM catalogs
WHERE catalog_type = 'Datasets list';
```

Карта сайта, около 7 тысяч, — среди типов в запросе «Распространённость интерфейсов». Если нужно только её:

```sql
SELECT e.type, count(*) AS n
FROM (SELECT unnest(endpoints) AS e FROM catalogs)
WHERE lower(e.type) LIKE '%sitemap%'
GROUP BY 1
ORDER BY n DESC;
```

## Владельцы, страны, состав

Местные органы, около 17,6 тысячи, и геопорталы среди них, около 14,4 тысячи:

```sql
SELECT catalog_type, count(*) AS n
FROM catalogs
WHERE owner.type = 'Local government'
GROUP BY 1
ORDER BY n DESC;
```

Страны в главе о цифрах. Каталог с несколькими странами попадёт в каждую. Записи без одной страны — отдельная строка с пустым или неоднозначным покрытием; в главе их около 1,8 тысячи.

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

Состав содержимого в главе «Что публикуют»: один каталог может дать несколько строк.

```sql
SELECT t AS content_type, count(*) AS n
FROM (SELECT unnest(content_types) AS t FROM catalogs)
GROUP BY 1
ORDER BY n DESC;
```

## Классификация: владельцы, доступ и классы ПО по типам

Глава «Как классифицировать каталоги». Владельцы внутри каждого типа — например, 58% геопорталов у местных органов власти и 85% научных репозиториев у университетов и научных организаций:

```sql
SELECT catalog_type, owner.type AS owner_type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (PARTITION BY catalog_type), 0) AS pct
FROM catalogs
GROUP BY 1, 2
ORDER BY catalog_type, n DESC;
```

Доля каталогов с ограниченным доступом хотя бы к части данных — 91% у маркетплейсов, 49% у каталогов микроданных:

```sql
SELECT catalog_type,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted,
       count(*) AS n,
       round(100.0 * restricted / n, 0) AS pct
FROM catalogs
GROUP BY 1
ORDER BY pct DESC;
```

Классы ПО — поле `subtype` в таблице `software`. В главе они сведены в пять групп: облачный сервис (`managed_saas_service`), готовая платформа (подтипы `*_platform`), сервер или отраслевая система (`geospatial_service_middleware`, `protocol_or_api_server`, `domain_data_infrastructure`), сайт на CMS (`cms_or_app_framework`) и своя разработка (`custom`).

```sql
SELECT CASE WHEN c.software.id = 'custom' THEN 'custom' ELSE s.subtype END AS class,
       count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 1) AS pct
FROM catalogs c
LEFT JOIN software s ON s.id = c.software.id
GROUP BY 1
ORDER BY n DESC;
```

## Платформы, которые книга называет по имени

Идентификатор — `software.id`. Около 1 900 CKAN считаются только среди порталов открытых данных, не среди всех записей с этим id.

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

## Порталы открытых данных

Глава «Порталы открытых данных». Владельцы — 48% у местных органов власти, 19% у центральных:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct
FROM catalogs
WHERE catalog_type = 'Open data portal'
GROUP BY 1
ORDER BY n DESC;
```

Страны — Россия 572, США 565, Испания 486. Каталог с несколькими странами попадёт в каждую:

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

Платформы с долей API и недействующих — CKAN 1905 и 95% с API, своя разработка 1144 и 19%:

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

Платформы у центральных и у местных органов власти — CKAN 419 и 707, Gosweb 421 только у местных:

```sql
SELECT owner.type, software.id AS sid, count(*) AS n
FROM catalogs
WHERE catalog_type = 'Open data portal'
  AND owner.type IN ('Central government', 'Local government')
GROUP BY 1, 2
QUALIFY row_number() OVER (PARTITION BY owner.type ORDER BY count(*) DESC) <= 10
ORDER BY 1, n DESC;
```

Три главные платформы в каждой стране — так видно, что в России счёт дают разделы на Gosweb, в Италии — Municipium, в Японии — BODIK ODCS:

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

## Геопорталы

Глава «Геопорталы». Владельцы — 58% у местных органов власти. В главе центральные органы сложены с федеральными (`Federal government`), а «Прочие» — это `Other` и `Community`:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct
FROM catalogs
WHERE catalog_type = 'Geoportal'
GROUP BY 1
ORDER BY n DESC;
```

Страны — США 5050, Польша 2303, Чехия 1408. Три главные платформы в каждой стране — так видны местные поставщики (GISPLAN в Чехии, iObčina в Словении, わが街ガイド в Японии):

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

Платформы с долей API и недействующих — ArcGIS Server 4674, своя разработка 1042 и 11% с API, GeoNode 11,2% недействующих. Российские геопорталы (286) считаются по стране владельца: добавьте `AND owner.location.country.id = 'RU'`.

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

Облачные сервисы местных поставщиков без ArcGIS Hub и e-mapa — 132 сервиса, около 5,3 тысячи геопорталов, API у 21%; у 104 сервисов API не отмечен ни на одном сайте:

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

Интерфейсы каталога у геопорталов — около 3,2 тысячи выгрузок DCAT-US и DCAT-AP у сайтов ArcGIS Hub, CSW у GeoNetwork и GeoNode, около 140 серверов STAC:

```sql
SELECT c.software.id AS sid, e.type, count(DISTINCT c.id) AS n
FROM (SELECT id, software, unnest(endpoints) AS e FROM catalogs WHERE catalog_type = 'Geoportal') c
WHERE e.type IN ('dcatus11', 'dcatap201', 'ogcrecordsapi', 'csw202', 'stacserverapi', 'oaipmh20')
GROUP BY 1, 2
HAVING n > 20
ORDER BY 2, n DESC;
```

## Научные репозитории

Глава «Научные репозитории данных». Всего 8403, недействующих и выведенных 119, с ограниченным доступом 527:

```sql
SELECT count(*) AS n,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted
FROM catalogs
WHERE catalog_type = 'Scientific data repository';
```

Владельцы — 85% у университетов и научных организаций:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct
FROM catalogs
WHERE catalog_type = 'Scientific data repository'
GROUP BY 1
ORDER BY n DESC;
```

Страны — США 2018, Германия 764, Великобритания 503; международные записаны как `World`:

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

Платформы с долей API и недействующих — своя разработка 2835 и 5% с API, IPT 361 и 12% недействующих:

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

Главные платформы по странам — так видно WEKO3 в Японии, DABAR в Хорватии, OPUS в Германии:

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

Интерфейсы — OAI-PMH у 2068, карта сайта у 2029, DCAT около 200:

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

Темы — окружающая среда около 2,3 тысячи, живые организмы около 1,6 тысячи. Один репозиторий даёт несколько строк, темы взяты из двух справочников:

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

## Каталоги показателей

Глава «Каталоги показателей». Число, доля самописных, доля API и недействующие — 3228, 42%, 38% и 29:

```sql
SELECT count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead
FROM catalogs
WHERE catalog_type = 'Indicators catalog';
```

Владельцы — 46% у центральных органов власти; доля самописных и API внутри каждой группы:

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

Платформы с долей API — Swing 201, Knoema 125, PxWeb 107, DHIS2 72. У WordPress и Drupal поле `api` отмечает API самой CMS, а не рядов:

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

Страны у каждой платформы — так видно, что Swing — это Нидерланды и Бельгия, HCI — США, Géoclip — Франция, Knoema — Африка:

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

Каталоги с адресами SDMX — 170; адреса DCAT встречаются меньше чем у десятка:

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

## Поисковики и агрегаторы

Глава «Поисковики и агрегаторы». Владельцы — 68% у университетов и научных организаций. В главе «Сообщества и общественные организации» — это `Community` и `Civil society`, «Прочие» — `Regional government` и `Other`:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct
FROM catalogs
WHERE catalog_type = 'Data search engine'
GROUP BY 1
ORDER BY n DESC;
```

Территории — Евросоюз целиком 37, Италия 23, весь мир 21:

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

Платформы с долей API и недействующих — OpenAIRE 50, своя разработка 35 и 20% с API, VIVO 28, Idra 6 и все недействующие:

```sql
SELECT software.id AS sid, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead
FROM catalogs
WHERE catalog_type = 'Data search engine'
GROUP BY 1
ORDER BY n DESC;
```

Полный список — так видны 17 итальянских UNIFIND на VIVO и демонстрационные стенды Idra:

```sql
SELECT software.id AS sid, owner.type AS owner_type, status, name, link
FROM catalogs
WHERE catalog_type = 'Data search engine'
ORDER BY sid, name;
```

Крупные поисковики, записанные другими типами, — Dateno, NIAID Discovery Portal, Research Data Australia, GESIS Search, DataONE, B2FIND, Earthdata Search, OmicsDI:

```sql
SELECT catalog_type, software.id AS sid, status, name, link
FROM catalogs
WHERE regexp_matches(lower(link),
  '(dateno\.io|//data\.niaid|researchdata\.edu\.au|search\.gesis|//www\.dataone\.org|b2find|search\.earthdata|omicsdi)')
ORDER BY catalog_type, name;
```

## Каталоги метаданных

Глава «Каталоги метаданных и реестры». Число, доля самописных, доля API, недействующие и с ограниченным доступом — 172, 38%, 67%, 0 и 18:

```sql
SELECT count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted
FROM catalogs
WHERE catalog_type = 'Metadata catalog';
```

Владельцы — 31% у университетов и научных организаций, 30% у международных организаций. В главе `Community` и `Other` сложены в «Сообщества и прочие»:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct
FROM catalogs
WHERE catalog_type = 'Metadata catalog'
GROUP BY 1
ORDER BY n DESC;
```

Платформы с долей API — своя разработка 65 и 17%, FAIR Data Point 47, Metadata Browser (`mwmb`) 16, Skosmos 10:

```sql
SELECT software.id AS sid, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api
FROM catalogs
WHERE catalog_type = 'Metadata catalog'
GROUP BY 1
ORDER BY n DESC;
```

Платформы по странам — так видно, что Нидерланды — это точки FAIR Data Point, Великобритания — Metadata Browser, Австралия — Aristotle:

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

Интерфейсы — DCAT в Turtle у 47 точек FAIR Data Point, REST API Skosmos у 9 установок, адреса SDMX у реестров на Fusion Metadata Registry:

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

## ML-каталоги

Глава «ML-каталоги». Всего 100, недействующих 2, с ограниченным доступом 5, самописных 78%, с API 23%:

```sql
SELECT count(*) AS n,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api
FROM catalogs
WHERE catalog_type = 'Machine learning catalog';
```

Владельцы — 37 у университетов и научных организаций, 31 у компаний:

```sql
SELECT owner.type, count(*) AS n
FROM catalogs
WHERE catalog_type = 'Machine learning catalog'
GROUP BY 1
ORDER BY n DESC;
```

Страны — международные 34, США 19, Китай 12, Россия 6:

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

Платформы и доля API — своя разработка 78 и 13 с API, Jekyll 9:

```sql
SELECT software.id AS sid, count(*) AS n,
       count(*) FILTER (WHERE api) AS with_api
FROM catalogs
WHERE catalog_type = 'Machine learning catalog'
GROUP BY 1
ORDER BY n DESC;
```

Полный список записей. По нему в главе записи вручную разложены на восемь видов — хабы, площадки соревнований, коллекции, сайты бенчмарков и другие; такого поля в реестре нет:

```sql
SELECT name, link, software.id AS sid, owner.type AS owner_type, api, status
FROM catalogs
WHERE catalog_type = 'Machine learning catalog'
ORDER BY sid, name;
```

## Каталоги API, маркетплейсы и списки наборов

Глава «Каталоги API, маркетплейсы и списки наборов». Число, доля своих разработок, API и ограниченного доступа — 115, 74%, 51% и 14% у каталогов API; 56, 98%, 21% и 91% у маркетплейсов; 107, 89%, 13% и 1% у списков:

```sql
SELECT catalog_type, count(*) AS n,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api,
       round(100.0 * count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) / count(*), 0) AS pct_restricted
FROM catalogs
WHERE catalog_type IN ('API Catalog', 'Data marketplace', 'Datasets list')
GROUP BY 1;
```

Владельцы — 45% каталогов API у центральных органов власти, 70% маркетплейсов у компаний:

```sql
SELECT catalog_type, owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (PARTITION BY catalog_type), 0) AS pct
FROM catalogs
WHERE catalog_type IN ('API Catalog', 'Data marketplace', 'Datasets list')
GROUP BY 1, 2
ORDER BY 1, n DESC;
```

Страны — у маркетплейсов Южная Корея 16, США 12, Китай 6:

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

Платформы — у каталогов API Azure API Management 22, WSO2 API Manager 2:

```sql
SELECT catalog_type, software.id AS sid, count(*) AS n,
       count(*) FILTER (WHERE api) AS with_api
FROM catalogs
WHERE catalog_type IN ('API Catalog', 'Data marketplace', 'Datasets list')
GROUP BY 1, 2
ORDER BY 1, n DESC;
```

Транспортные порталы разработчиков, около 35 из 115, отобраны по названию и адресу; список стоит просмотреть глазами, потому что шаблон ловит и лишнее (Metropolia, gov.br/conecta):

```sql
SELECT name, link
FROM catalogs
WHERE catalog_type = 'API Catalog'
  AND regexp_matches(lower(name || ' ' || link),
      'transit|transport|metro|\bbus\b|rail|traffic|trafik|tmb|mta|bart|cta|marta|wmata|trimet|translink|entur|waltti|föli|foli|metlink|511|digitraffic|tdx|koroad|apiportal.ns|sptrans|oc transpo|skåne|cumtd|cota|deutschebahn');
```

Списки наборов на GitHub и GitLab — 16, история торгов криптобирж — 13:

```sql
SELECT
  count(*) FILTER (WHERE regexp_matches(lower(name || ' ' || link), 'github.io|github.com|gitlab')) AS on_git,
  count(*) FILTER (WHERE regexp_matches(lower(name || ' ' || link),
      'binance|bybit|okx|kucoin|mexc|bitget|kraken|gatedata|bitmex|crypto|polymarket|paradigm')) AS crypto
FROM catalogs
WHERE catalog_type = 'Datasets list';
```

Карта сайта у каталогов API — 26 из 115:

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

## Карта возможностей

Глава «Карта возможностей», запросы 12 октября 2026 года. Интерфейсы — по списку `endpoints`, DOI — по признаку `has_doi`; научные репозитории посчитаны вместе с универсальными. Разметку schema.org реестр почти не записывает, поэтому её доля не считается.

Доли по типам — DCAT у 26% порталов открытых данных, OAI-PMH у 25% и DOI у 17% научных репозиториев, CSW или OGC API Records у 20% геопорталов, SDMX у 5,5% каталогов показателей:

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

DCAT у порталов открытых данных по платформам — Socrata 239 из 245, OpenDataSoft 348 из 454, DKAN 103 из 161, CKAN 633 из 1905, своя разработка 24 из 1144:

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

DOI и OAI-PMH у научных репозиториев по платформам — Figshare 266 DOI из 288, Dataverse 172 DOI и 177 OAI-PMH из 257, DSpace 218 DOI и 665 OAI-PMH из 829, своя разработка 158 DOI и 19 OAI-PMH из 2839:

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

Каталожный сервис у геопорталов по платформам — ArcGIS Hub 3257 из 3464, GeoNetwork 686 из 762, GeoNode 628 из 770, ArcGIS Server 1 из 4674, e-mapa 0 из 1927, своя разработка 4 из 1042:

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

SDMX у каталогов показателей по платформам — из 177 каталогов 113 на Knoema:

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

## Экспорт метаданных

Глава «Экспорт метаданных», запросы 13 октября 2026 года. Хотя бы один стандартный способ отдать описания — DCAT, OAI-PMH, CSW, OGC API Records, SDMX или STAC — у 9 330 каталогов из 43 415. Выгрузка DCAT есть у 5 233, сразу оба профиля, DCAT-US и DCAT-AP, — у 3 152. Разметку schema.org реестр почти не записывает, таких адресов 38:

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

DCAT у порталов открытых данных по платформам — Socrata 239 из 245, OpenDataSoft 348 из 454, DKAN 103 из 161, CKAN 633 из 1905, своя разработка 24 из 1144. Запрос приведён в разделе [«Карта возможностей»](#карта-возможностей).

## API и массовая выгрузка

Глава «API и массовая выгрузка», запросы 12 октября 2026 года. Признак «есть программный вход» в реестре совпадает с непустым списком `endpoints`: 28 467 из 43 415. Стандартный способ забрать все описания — DCAT, OAI-PMH, CSW или OGC API Records — у 8 894 каталогов. Доли по типам — 70% геопорталов, 69% порталов открытых данных, 63% научных репозиториев, 38% каталогов показателей, 23% ML-каталогов:

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
SELECT coalesce(catalog_type, 'всего') AS catalog_type, count(*) AS n,
       count(*) FILTER (WHERE any_ep) AS any_ep,
       round(100.0 * count(*) FILTER (WHERE any_ep) / count(*), 0) AS pct_any,
       count(*) FILTER (WHERE all_desc) AS all_desc,
       round(100.0 * count(*) FILTER (WHERE all_desc) / count(*), 0) AS pct_all_desc,
       round(100.0 * count(*) FILTER (WHERE sitemap) / count(*), 0) AS pct_sitemap
FROM f
GROUP BY ROLLUP (catalog_type)
ORDER BY n DESC;
```

Своя разработка против готовых платформ — 696 из 6 895 с программным входом и 58 со стандартной выгрузкой описаний у своих разработок, 76% с программным входом у остальных:

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

Ленты RSS и Atom реестр записывает в основном у геопорталов и научных репозиториев, у порталов на CKAN их почти нет, хотя лента в ядре CKAN. Поэтому доля лент по реестру в главе не приводится.

## Идентификаторы и DOI

Глава «Постоянные идентификаторы, DOI и версии», запросы 12 октября 2026 года. Пометка DOI — у 2008 каталогов из 43 415: 1396 научных репозиториев и 8 универсальных, 584 геопортала, остальные единичны:

```sql
SELECT catalog_type,
       count(*) FILTER (WHERE properties.has_doi) AS with_doi,
       count(*) AS n
FROM catalogs
GROUP BY 1
HAVING with_doi > 0
ORDER BY with_doi DESC;
```

Пометку в основном наследуют от карточки платформы (`software.pid_support.has_doi`), поэтому её надо читать как «платформа умеет». У GeoNetwork платформа отмечена «Yes», и пометку получили 555 установок из 764; у своих разработок платформа отмечена «No», и 175 пометок поставлены вручную:

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

Выборка для проверки Handle — 120 действующих установок DSpace с OAI-PMH из 782, в воспроизводимом случайном порядке. Для каждой у первой записи из `ListIdentifiers` берут Handle и проверяют его через `https://hdl.handle.net/api/handles/…`:

```sql
SELECT e.url
FROM (SELECT unnest(endpoints) AS e
      FROM catalogs
      WHERE software.id = 'dspace' AND status = 'active')
WHERE lower(e.type) LIKE 'oai%'
ORDER BY hash(e.url)
LIMIT 120;
```

## Доступ, роли и процессы

Глава «Доступ, роли и процессы публикации», запросы 12 октября 2026 года. Ограниченный доступ хотя бы к части данных — у 1129 каталогов из 43 415: у 535 только ограниченный, у 594 вместе с открытым:

```sql
SELECT count(*) AS total,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted,
       count(*) FILTER (WHERE access_mode = ['restricted']) AS only_restricted,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')
                          AND list_contains(access_mode, 'open')) AS mixed
FROM catalogs;
```

Доля по платформам — DHIS2 97%, NADA 72%, Pure 36% против CKAN 0,6% и Dataverse 1,9%:

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

Список для замера регистрации на порталах CKAN — 1838 действующих каталогов. Для каждого берут адрес API из точки входа `ckan`, а если её нет — адрес сайта с `/api/3`:

```sql
SELECT id, link, catalog_type, owner.type AS otype,
       coverage[1].location.country.id AS country,
       [x.url for x in endpoints if x.type = 'ckan'][1] AS api
FROM catalogs
WHERE software.id = 'ckan' AND status = 'active'
ORDER BY id;
```

## Каталоги микроданных

Глава «Каталоги микроданных». Всего 326, неработающих 59, с ограниченным доступом 159, самописных 13%, с API 70%:

```sql
SELECT count(*) AS n,
       count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead,
       count(*) FILTER (WHERE list_contains(access_mode, 'restricted')) AS restricted,
       round(100.0 * count(*) FILTER (WHERE software.id = 'custom') / count(*), 0) AS pct_custom,
       round(100.0 * count(*) FILTER (WHERE api) / count(*), 0) AS pct_api
FROM catalogs
WHERE catalog_type = 'Microdata catalog';
```

Владельцы и доля NADA у каждого — 55% у центральных органов власти, из них 59% на NADA; у международных организаций 90% на NADA:

```sql
SELECT owner.type, count(*) AS n,
       round(100.0 * count(*) / sum(count(*)) OVER (), 0) AS pct,
       round(100.0 * count(*) FILTER (WHERE software.id = 'nada') / count(*), 0) AS pct_nada
FROM catalogs
WHERE catalog_type = 'Microdata catalog'
GROUP BY 1
ORDER BY n DESC;
```

Платформы с долей API и числом неработающих — NADA 158 и 47 неработающих, своя разработка 43 и 12% с API:

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

Страны — 139 стран и 27 общемировых каталогов; США 18, Канада 12, Германия 11:

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

Неработающие каталоги без HTTPS и на IP-адресах — 38 из 58 без HTTPS, 7 из 10 на IP-адресах:

```sql
SELECT count(*) FILTER (WHERE link LIKE 'http://%') AS http,
       count(*) FILTER (WHERE link LIKE 'http://%' AND status = 'inactive') AS http_dead,
       count(*) FILTER (WHERE regexp_matches(link, '^https?://[0-9.]+')) AS ip,
       count(*) FILTER (WHERE regexp_matches(link, '^https?://[0-9.]+') AND status = 'inactive') AS ip_dead
FROM catalogs
WHERE catalog_type = 'Microdata catalog';
```

Страны с неработающей NADA и без другого действующего каталога микроданных — 18 из 38:

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

## Сравнение типов и гибриды

Глава «Сравнение типов и гибриды». Сводная таблица — число, доли своих разработок, API, неработающих и ограниченного доступа по типам:

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

Главный владелец и четыре главные платформы каждого типа, без своих разработок:

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

В скольких типах встречается платформа — WordPress в девяти, CKAN в пяти, GeoNode, Dataverse и PxWeb в одном:

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

Владельцы с каталогами нескольких типов — 2 176 из 32 452, из них 250 с тремя и более, за ними 7 275 каталогов; одной программой обходятся 117. Владелец здесь — название организации в одной стране, поэтому подсчёт приблизительный:

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

Доля таких владельцев по виду владельца и самые частые пары типов — геопортал и портал открытых данных у 948:

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

Пара «геопортал и портал открытых данных»: 1 120 владельцев, сочетания программ (ArcGIS Server и CKAN — 101) и одна программа на обеих сторонах — у 44 из 948, из них 39 своих разработок:

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

Каталоги одной организации — так видны составы Тихоокеанского сообщества, Всемирного банка, ФАО и INEGI:

```sql
SELECT owner.name, catalog_type, software.id AS sid, status, link
FROM catalogs
WHERE owner.name IN ('Pacific Community (SPC)', 'World Bank',
                     'Food and Agriculture Organization of the United Nations',
                     'Instituto Nacional de Estadística y Geografía (INEGI)')
ORDER BY 1, 2, 3;
```

## Когда портал не нужен

Глава «Когда портал не нужен», запросы 13 октября 2026 года к той же выгрузке. Списки наборов — 107, программный интерфейс у 14, своя разработка у 95, недействующие и снятые — 7:

```sql
SELECT
  count(*) AS n,
  count(*) FILTER (WHERE api) AS with_api,
  count(*) FILTER (WHERE software.id = 'custom') AS custom,
  count(*) FILTER (WHERE status IN ('inactive', 'deprecated')) AS dead
FROM catalogs
WHERE catalog_type = 'Datasets list';
```

Карта сайта — у 12. Остальные движки страниц — Drupal, WordPress, TYPO3, Jekyll, SharePoint, Liferay:

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

## Дальше

- [Примеры запросов в документации реестра](https://datenoio.github.io/dataportals-registry/docs/query-examples/)
- [Модель данных](https://datenoio.github.io/dataportals-registry/docs/data-model/)
