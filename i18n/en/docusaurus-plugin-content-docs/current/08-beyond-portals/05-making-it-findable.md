---
title: Making a Publication Findable
description: One primary page address through which people, dataset search and a harvester find the dataset, and how to link a repository and a DOI to it.
---

# Making a Publication Findable

A dataset is found through a page with a persistent address. A person reads the description and licence on it, dataset search reads the markup, a catalog harvester takes a separate file, and a link from a report leads to a release with a DOI. The repository, the Zenodo record and the record in someone else's catalog name the same dataset and point to this page.

Below is the order of work for one medium-sized dataset. How the platforms themselves work is in the chapters [on static sites](./02-static-sites.md), [on Git](./03-git-repositories.md) and [on cloud and hubs](./04-cloud-storage-and-hubs.md). How a platform does the same for thousands of pages is in the chapter [on catalog discoverability](../07-publishing/05-discoverability.md).

## Who searches and what they read

One openly available file is not enough: each reader has their own way in.

| Who searches | What they open | What is prepared for them |
|----------|---------------|----------------------|
| A person with a link | the page | description, licence, file, date, contact |
| An ordinary search engine | HTML and links from other sites | text on the page and a sitemap |
| Dataset search, e.g. Google Dataset Search | markup on the page | schema.org of type Dataset that can be run through a test |
| A harvester of a national or agency catalog | a file in the profile you agreed on | `data.json` or DCAT-AP, with that profile's fields filled in |
| The author of a report or article | a release that does not change retroactively | a version tag and the DOI of that release |

The repository topics `dataset` and `open-data` help those who search for repositories on the platform itself. Dataset search does not read them. Why GitHub works this way is in the chapter [on repositories](./03-git-repositories.md#why-repositories-are-hardly-ever-found).

## One primary address

When there are several places, the dataset still has one primary address: the page you run. The other addresses rely on it.

| Markup field | What it points to |
|---------------|--------------|
| `url` | the primary page |
| `identifier` | the release DOI, once the number is issued |
| `sameAs` | another page for the same dataset, e.g. the Zenodo record |
| `includedInDataCatalog` | a catalog in which the record has already appeared |

Google asks for full markup on the primary page. If markup is on a copy too, the copy's `sameAs` holds the primary page's address. The same `sameAs` value on two different datasets glues them into one. Search addresses, the `main` branch and file listings are not put in `sameAs`: they are not a dataset page.

The page address is not built from the title. The title gets edited; the path stays: `…/bus-stops`. Old links from articles and the search engine's index remember the path, not today's name.

The `includedInDataCatalog` field is filled in after the harvester has published the record. A catalog name in the markup before that promises a record that does not exist.

## What to put on the page

The markup is an `application/ld+json` block in the page HTML. Ready text is in [schema-dataset.jsonld](pathname:///templates/schema-dataset.jsonld). It is inserted into the page template. In a README on github.com, the same text remains a paragraph for people: there is no `script` tag there, and dataset search does not read it.

Google's documentation, checked on 14 October 2026, requires two fields for the Dataset type: `name` and `description`. The description is 50 to 5,000 characters. Longer text is cut off at 5,000. A single short sentence often falls short of 50. The description says what is in the table, for what period and territory, who collected it and how often the file changes.

Google calls the other fields recommended. The test may pass without them, but the dataset cannot be used. The licence, publisher and a direct file link are also asked for because the Dataset type gets put on junk too: see the chapter [on catalog discoverability](../07-publishing/05-discoverability.md#spam-has-markup-too).

| Field | What to write |
|------|------------|
| `name` | a title that distinguishes this dataset from its neighbour |
| `description` | 50 to 5,000 characters, the same meaning as the page text |
| `license` | a link to a specific version, e.g. CC BY 4.0. A link to CC BY without a version number is weaker for Google |
| `distribution` with `contentUrl` | a direct link to the file and its `encodingFormat`. A link to a section of the site is not a file |
| `creator`, `publisher` | who collected it and who publishes it |
| `dateModified` | the file date. It is changed on the day the file changes |
| `temporalCoverage`, `spatialCoverage` | a period as `2020-01-01/2025-12-31` and a territory. If there is no period or territory, delete those lines from the template |
| `identifier` | the DOI. The book's template does not have this field: it is added once the number is issued |
| `sameAs` | the second page for the same dataset |

Google says it understands both schema.org and DCAT on a page. The Rich Results Test accepts schema.org. The DCAT example in the same documentation is marked as not supported by the test. So JSON-LD goes on your own page: it can be checked before you give the link to people. The `dcat:Dataset` attributes on a JKAN page are not confirmed by this test. A `data.json` file for a harvester is a separate document; Google does not read it from the page.

A column dictionary for people and programs lives in `datapackage.json`. Google separately calls CSVW markup directly on the page experimental and warns that the test complains about such a block. For a table, a CSV via a direct link and a package descriptor are enough.

The page serves this HTML by itself, without a login and without a captcha. A shell that a script fills in the browser is empty for a robot. What this looks like on large sites is in the chapter [on catalog discoverability](../07-publishing/05-discoverability.md#what-a-search-engine-does-not-see).

## Sitemap

Google asks for a sitemap to find dataset addresses, and for `sameAs` to understand where the copies are. One dataset is one line in the sitemap. In a catalog of dozens of pages without a sitemap, the robot may not reach every one.

A search engine reads `robots.txt` only from the root of the site's host name. This is what [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309) says, and the same limitation is analysed for geoportals in the chapter [on catalog discoverability](../07-publishing/05-discoverability.md#what-a-search-engine-does-not-see). For the address `https://name.github.io/bus-stops/` the root is `https://name.github.io/robots.txt`. A `robots.txt` file inside the `bus-stops` folder is not covered by this rule. If you do not control the root, no separate directive will come from your folder. Then the sitemap is submitted to [Google Search Console](https://search.google.com/search-console/about) using the full `sitemap.xml` address.

GitHub Pages does not write Dataset markup or a sitemap by itself. Both files are put into the site build. Hosting limits and ready-made generators are in the chapter [on static sites](./02-static-sites.md).

## A file for the harvester

One page's markup does not get into the national catalog. A harvester takes a file in the profile it accepts now, not in the newest edition of the schema. data.gov still harvests DCAT-US 1.1, although version 3.0 has been published. Which language is served to whom is in the chapter [on standards](../07-publishing/02-metadata-standards.md).

The file is prepared when there is a harvester and you have given it the address. Registering the site in Search Console does not tell the harvester this address. How to submit a catalog for harvesting is in the chapter [on federations](../07-publishing/03-federation-and-harvesting.md).

A file that declares a schema and is silent about mandatory fields may be harvested as it is. JKAN's short `data.json` and a small agency's records without a licence are analysed in the chapters [on static sites](./02-static-sites.md#jkan) and ["When You Don't Need a Portal"](./01-when-portal-not-needed.md#a-file-on-your-own-website-instead-of-a-portal). If there is no harvester, a separate file is not set up just for the sake of a `conformsTo` line: the page with markup already describes the dataset.

## A second page with a DOI

A DOI is needed when a release is cited in a text. It is not set up for an internal table. How to link a GitHub repository to Zenodo, and why `.zenodo.json` overrides `CITATION.cff`, is in the chapter [on repositories](./03-git-repositories.md#release-and-doi). Until there is a number, the `identifiers` block is removed from the `CITATION.cff` template.

A Zenodo record of type "dataset" itself becomes a page with Dataset markup. DataCite says that landing pages with the Dataset class get into Google Dataset Search, and content negotiation by DOI does only if the record is in the Findable state and the resource type is Dataset. DataCite has no control over when Google gets to the page. The "software" type does not get this class: for data, `.zenodo.json` sets `upload_type` to `dataset`.

A live record shows that the Zenodo page and the DOI response are two different documents. On 14 October 2026 the Cantometrics release, DOI [10.5281/zenodo.4898406](https://doi.org/10.5281/zenodo.4898406), served one JSON-LD block in its HTML. An ordinary page request returned code 200. The same address with a `Mozilla/5.0` browser header returned 403: the refusal relates to that header, not to the page being missing.

- The type in the page markup is `https://schema.org/Dataset`. The short word `Dataset` right after the quotation mark is not there.
- The visible description text is "The data repository for the Cantometrics dataset", 48 characters. The string in the markup is longer, 56 characters, only because of paragraph tags. Google's threshold is 50 characters of the description itself.
- `license` points to the CC BY-NC 4.0 text. In the repository at the same tag, the licence file is CC BY 4.0. The divergence is already analysed in the chapter ["When You Don't Need a Portal"](./01-when-portal-not-needed.md#three-places-at-once).
- `url` is `https://zenodo.org/records/4898406`. There is no `sameAs` field.
- `contentUrl` points to the release ZIP. A header request for this address returned code 200 and the type `application/octet-stream`. The markup gives the file as `application/zip`.

A JSON-LD request by the same DOI returned a different document that day: type Dataset, a 48-character description, no file link. Its `url` field is the old path `/record/4898406`, which answers with code 301 and redirects to `/records/4898406`. This response calls the GitHub tag address the article the dataset is based on, not a second page for the dataset.

The practical conclusion follows. The DOI and the Zenodo page cover the link from a report and give dataset search one more page. The description text, licence and direct link are kept on your own page and copied unchanged into the Zenodo record. Your markup's `identifier` gets the release DOI. `sameAs` gets the Zenodo record address. Citations use the release DOI, and the concept DOI for all versions is left for those who need the latest.

## The order for one dataset

The example is a district bus timetable. The names are invented, and the files are [this book's templates](pathname:///templates/README.md). Alongside, you can open the live [Country Codes](https://github.com/datasets/country-codes) repository: it has a different subject, its descriptor is called `datapackage.yml`, and on 14 October 2026 the repository page HTML had no JSON-LD block.

1. **Repository.** Put in the templates: README, `datapackage.json`, `LICENSE`, the table in `data/`. In `CITATION.cff` keep `type: dataset` and delete the `identifiers` block until there is a DOI. In the README write what timetable this is, for which season, who is responsible and how often the file changes. Set the `dataset` and `open-data` topics: they mark the repository on the platform. What else goes into the package and where Git's limits end is in the chapter [on repositories](./03-git-repositories.md).

2. **Page.** Build a site from this repository or put a page on an existing site. The path `…/bus-stops` does not change along with the title. Insert the block from the markup template into the HTML. Make the description longer than 50 characters, for example: "Stop and departure times for district buses for the season: stop, route and time. The file is updated once a season." The licence is a link to CC BY 4.0. `contentUrl` is a direct link to the CSV. Do not add the `identifier` field yet.

3. **Markup check.** Paste the page address into the [Rich Results Test](https://search.google.com/test/rich-results). Fix Dataset errors before giving out the link. The page must open without a login: otherwise the test and the search engine see a placeholder.

4. **Sitemap.** Put a `sitemap.xml` with this page's address. If you control the root of the site's host name, list the sitemap in that root's `robots.txt`. Otherwise submit the full sitemap address in Search Console.

5. **Version and DOI.** If the timetable will be cited, set a tag, for example `v2026.1`, and get a release DOI. Write the number into `CITATION.cff` on the branch and into the markup's `identifier`. Put the Zenodo record address in `sameAs`. The licence in `LICENSE`, in the descriptor, on the page and in the Zenodo record is one and the same. For a table nobody cites, skip this step.

6. **Harvester.** If a regional or national catalog takes a file, put it in the profile the catalog accepts and submit the address. Fill in the fields the profile considers mandatory before applying.

7. **After a few days, and again after a few weeks.** Search for the title in [Google Dataset Search](https://datasetsearch.research.google.com/). Google says crawling takes a few days, and dropping out of results takes days or weeks. Do not change platforms before then. First recheck the markup test and that the page opens without a login.

## Example: the primary address on your own page

**Context.** Two people already run a quarterly table in a repository. Once a year they make a release and get a DOI. The national catalog does not harvest the organisation. A month later the table cannot be found by title in dataset search. One person suggests giving the repository link, another only the DOI, a third installing a portal.

**Options.** The repository tab on github.com. Only the Zenodo record. Your own page with markup, the DOI in `identifier` and the Zenodo address in `sameAs`. A portal.

**Criteria.** The markup can be checked before indexing. The link from the report opens an unchanging release. A person without the DOI opens the description and the file. Maintenance stays with these two people.

**Decision.** The primary address is your own page. The release DOI is in the report and in the `identifier` field. The Zenodo record is a second page for the same dataset.

**Why.** The github.com tab of a repository with a column dictionary contains no Dataset: on 14 October 2026 the Country Codes page opened that way. A Zenodo record sets the Dataset type itself, but takes the description and licence from what was sent to it. For Cantometrics the visible text is shorter than Google's threshold, and the licence on the Zenodo page diverged from the file in the repository. A portal adds a server for one dataset and two publishers.

**Consequences.** The sitemap and markup are updated together with the file. An empty DOI is not published. Dataset search may first show the Zenodo page: it has the Dataset type too. Once your own page is indexed, the two pages are linked through `identifier` and `sameAs`.

**When to review.** There are more datasets than the two can mark up. A harvester appears and names the file profile. The description or licence on your own page and in Zenodo diverge.

How to write such a record for yourself is in the chapter ["Justifying a Decision"](../06-choice/04-justifying-decisions.md). The choice of repository for this table is in the chapter [on Git](./03-git-repositories.md#example-a-quarterly-table-for-two).

## How to check

Checking your own page takes a few minutes. Substitute its address.

```bash
PAGE=https://example.org/bus-stops

# The page opens without a login
curl -sI -o /dev/null -w "%{http_code}\n" -L "$PAGE"

# The HTML has the Dataset type: either the short name or the full schema.org address
curl -sL "$PAGE" | grep -o '"@type"[[:space:]]*:[[:space:]]*"[^"]*Dataset"' | head -1
```

Code 200 and a line with `Dataset` mean the page serves the markup. Then paste the address into the Rich Results Test: Google's documentation requires a description of 50 to 5,000 characters, and the test checks the markup against these rules. There must be no empty `identifier` in the block.

The commands below were taken on 14 October 2026 from other people's publications. They show the gap, not a model.

```bash
# The repository page opens. It has no JSON-LD block: the output is empty
curl -sL -o /dev/null -w "%{http_code}\n" "https://github.com/datasets/country-codes"
curl -sL "https://github.com/datasets/country-codes" | grep -o 'application/ld+json' | head

# JSON-LD by DOI: type Dataset, the old /record/ path, no distribution
curl -sL -H "Accept: application/ld+json" "https://doi.org/10.5281/zenodo.4898406"

# The old path redirects to /records/
curl -sI -o /dev/null -w "%{http_code}\n" "https://zenodo.org/record/4898406"

# The Zenodo page: code and Dataset type in the HTML
curl -sL -o /dev/null -w "%{http_code}\n" "https://zenodo.org/records/4898406"
curl -sL "https://zenodo.org/records/4898406" | grep -o '"@type"[[:space:]]*:[[:space:]]*"[^"]*Dataset"' | head -1

# The record API and the file from contentUrl
curl -sL "https://zenodo.org/api/records/4898406"
curl -sI -L -o /dev/null -w "%{http_code}\n" \
  "https://zenodo.org/api/records/4898406/files/theglobaljukebox/cantometrics-v0.1-alpha.zip/content"
```

That day the Country Codes page returned 200, and a search for `application/ld+json` found nothing. The DOI response was of type Dataset. The `/record/4898406` path returned 301. The `/records/4898406` page returned 200, and the type search found `"@type": "https://schema.org/Dataset"`. The record API returned 200 and type `dataset`. The headers of the file from `contentUrl` returned 200 and type `application/octet-stream`. A request for the same page with a `Mozilla/5.0` header returned 403.

## Where the path breaks

- **A repository tab instead of a page.** The file and README are in place, but there is no Dataset type in the HTML. Ordinary search may find the README. Dataset search looks for markup.
- **A description shorter than 50 characters.** The Dataset type is declared, but a mandatory field is not filled in by Google's rules. Tags around a short phrase do not make up for the length of the text.
- **An empty or invented DOI.** A placeholder number from `CITATION.cff` gets into other people's citations. Until there is a number, there is no `identifiers` block and no `identifier` field.
- **One `sameAs` for two datasets.** Search glues different tables into one record.
- **`contentUrl` points to a section of the site.** There is nothing to download. The field holds a file address.
- **The file declares a profile and skips its fields.** The harvester publishes a holey record. Without a harvester, such a file is not set up.
- **Three places with three licences.** A person via the DOI and a person via the repository get different terms. The licence is written once and copied.
- **A captcha, a login or a script-built page.** The markup test and the robot see a placeholder. A month later the index will be empty for the same reason.

## How this path differs from a portal

A portal builds the dump, the sitemap and often the markup for every page by itself. Here the page author does it, one dataset at a time. The check is the same as in the chapter [on catalog discoverability](../07-publishing/05-discoverability.md): the address is open, the markup passes the test, the search engine knows the sitemap, and the harvester has been given the right profile. When there are more datasets than one person can describe, or harvesting runs on a schedule from many organisations, return to the chapter ["When You Don't Need a Portal"](./01-when-portal-not-needed.md): the threshold is written there in advance.

## Sources

- [Dataset markup in Google's documentation](https://developers.google.com/search/docs/appearance/structured-data/dataset): `name` and `description` of 50 to 5,000 characters are mandatory; schema.org and DCAT on the page; the Rich Results Test does not accept the DCAT example; `sameAs`, sitemap, `contentUrl`. Checked 14 October 2026
- [DataCite: landing pages and Google Dataset Search](https://support.datacite.org/docs/how-do-i-expose-my-datasets-to-google-dataset-search): the Dataset class on the page, a sitemap or links, the Findable state and the Dataset resource type for content negotiation. DataCite's help still names the old Structured Data Testing Tool. The current test in Google's documentation is the [Rich Results Test](https://search.google.com/test/rich-results)
- [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309): `robots.txt` is read from the root of the host name
- [Google Search Console](https://search.google.com/search-console/about), [Google Dataset Search](https://datasetsearch.research.google.com/)
- [Country Codes](https://github.com/datasets/country-codes): on 14 October 2026 the page answered with code 200, and there was no `application/ld+json` block. The `datapackage.yml` descriptor name is analysed in the chapter [on Git repositories](./03-git-repositories.md)
- Cantometrics, DOI [10.5281/zenodo.4898406](https://doi.org/10.5281/zenodo.4898406), 14 October 2026. The page HTML has JSON-LD of type `https://schema.org/Dataset`, a 48-character visible description, the CC BY-NC 4.0 licence, `contentUrl` to a ZIP, and no `sameAs`. An ordinary page request: 200. A request with a `Mozilla/5.0` header: 403. The record API: 200, type `dataset`. JSON-LD by DOI: no `distribution`, a `url` with the `/record/` path, which answers 301. The headers of the file from `contentUrl`: 200, `application/octet-stream`
- Templates: [/templates/README.md](pathname:///templates/README.md), [/templates/datapackage.json](pathname:///templates/datapackage.json), [/templates/CITATION.cff](pathname:///templates/CITATION.cff), [/templates/schema-dataset.jsonld](pathname:///templates/schema-dataset.jsonld)
- [Metadata export](../04-features/02-metadata-export.md), [catalog discoverability](../07-publishing/05-discoverability.md), [GitHub and Zenodo](https://help.zenodo.org/docs/github/)
