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

## Дальше

- [Примеры запросов в документации реестра](https://datenoio.github.io/dataportals-registry/docs/query-examples/)
- [Модель данных](https://datenoio.github.io/dataportals-registry/docs/data-model/)
