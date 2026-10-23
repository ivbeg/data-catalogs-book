---
title: Git Repositories
description: When a small dataset is published in Git, what to put next to the file, where GitHub and GitLab limits end, and how a release gets a DOI.
---

# Git Repositories

A repository is needed when several people edit a small table and it matters who changed what. Git shows the history by itself. A dataset becomes a publication when a description of the columns, a licence and a page with a persistent address sit alongside it. If the table will be cited in a text, a release is fixed and gets a DOI. A file larger than the platform's limit is not put into Git itself: it is attached to a release or moved to storage, and the repository keeps its address.

The platforms are GitHub, GitLab and others. The figures below were taken from the GitHub.com and GitLab.com documentation on 14 October 2026. On your own server the administrator sets the limits, and they are checked again before publishing a large file.

## When a repository is enough

| Situation | Where to go |
|----------|------|
| A table of up to a few tens of megabytes, edited by two or three people, row history needed | a repository and a page built from the same files |
| An annual snapshot will be cited in a report or article | the same repository plus a release with a DOI |
| The file is larger than the Git limit | cloud storage or a release attachment, with the description staying in the repository. See the chapter [on cloud and hubs](./04-cloud-storage-and-hubs.md) |
| Many publishers, and they do not work with Git | a portal or an existing catalog. See ["When You Don't Need a Portal"](./01-when-portal-not-needed.md) |
| Only a DOI is needed, and nobody looks at the edit history | a general repository such as Zenodo, without your own Git |

This chapter does not assemble the page, schema.org markup and a record in someone else's catalog step by step. The order is in the chapter ["Making a Publication Findable"](./05-making-it-findable.md).

## What to put in the repository

Ready-made files are in the [templates](pathname:///templates/README.md). They are copied, and your own names are substituted.

| File | Why |
|------|--------|
| `README.md` | what this is, for what period, how it is updated, who is responsible |
| `LICENSE` | the licence specifically for the data |
| `datapackage.json` | the list of files and the meaning of the columns |
| `data/` | the files themselves in open formats: CSV, JSON, Parquet |
| `CITATION.cff` | how to cite. On GitHub it produces a "Cite this repository" button |

One dataset, one package. A package is a folder with a descriptor and files. The folder can be the whole repository or a directory inside it, if there are several datasets and each has its own descriptor. Ten unrelated tables in one repository without a descriptor are the same sheet of links, only in Git.

The descriptor is called `datapackage.json` and sits at the root of the package. This is what the Data Package 2.0 standard requires: the standard's page was updated on 25 August 2026. Another name is allowed inside your own system, but the standard advises against publishing a package under another name. In the book's template the file already has this name, and it has a `$schema` line with the value `https://datapackage.org/profiles/2.0/datapackage.json`. Without this line the descriptor is validated against profile 1.0. The `created` field in profile 2.0 is a date and time per RFC 3339, not just a calendar date. The template writes it that way.

The live [Country Codes](https://github.com/datasets/country-codes) repository does not follow this rule: on 14 October 2026 the descriptor sat at the root as `datapackage.yml`. The columns are described in it and the CSV file is in place, but the published name is not the one the standard asks of a package. It can be seen as a model of a data dictionary and as a reminder to check the file name.

If a script sits next to the table, the code and the data often have different licences. They are written explicitly: the data's in `LICENSE` and `datapackage.json`, the code's in the script header or in a second file the README links to. A single phrase "licence in the root" leaves the reader guessing what it covers.

The script that builds the table also goes into the repository. Updates can be run automatically: on GitHub this is Actions, on GitLab it is CI. A missed quarter then shows up as a failed run.

## Platforms and limits

Git stores text and small tables. A large file bloats the history: it is copied with every clone, even if it is no longer needed. Hence the limits.

| | GitHub.com, free plan | GitLab.com, free plan |
|--|------------------------------|------------------------------|
| A file in ordinary Git | a warning if the file is larger than 50 MiB; rejection if larger than 100 MiB. Through the website, no more than 25 MiB. Separately, they advise keeping one object within 1 MB: a table of a few megabytes will go through, but cloning and viewing a change will get heavier | a new file of 100 MiB or more is not accepted. Through the website, no more than 100 MiB |
| The whole repository | better under 1 GB, strongly advised under 5 GB. They recommend keeping the `.git` folder within 10 GB. One push is no more than 2 GB | 10 GiB per project, including Git LFS. One push is no more than 5 GiB. On a paid plan the project limit is 500 GiB |
| Git LFS | a file up to 2 GB. The month includes 10 GiB of storage and 10 GiB of downloads per account, not per repository. If the quota runs out and the overage budget is zero, LFS use is blocked until the next month | LFS space is part of the same 10 GiB per project. Beyond that the project becomes read-only until the size is brought back within the limit or space is bought |
| Release attachment | total volume and traffic are not limited. Each file is no larger than the LFS limit for the plan; on the free plan that is 2 GB | the GitLab.com settings table does not name a separate limit for release attachments. A file that does not fit into the project's 10 GiB is not put into this project |

MiB and GiB are units from the platforms' documentation: 1 MiB = 1024 × 1024 bytes. The GitLab.com quotas page says 10 GiB, and the same site's settings table says "10 GB" for the same limit, the repository size including LFS.

Git LFS is an add-on to Git. A short pointer stays in the history, and the file itself is stored separately. It is used when a file must come along with a clone and does not fit into ordinary Git. Two caveats. GitHub Pages does not serve LFS files: a page built from the same repository will not show the large file. The download quota on free GitHub is 10 GiB a month for the whole account. A popular dataset can exhaust it, and a stranger will not get the file.

This is how [geoBoundaries](https://github.com/wmgeolab/geoBoundaries) works: administrative unit boundaries are stored in Git LFS, which shows in the `.gitattributes` file (the `releaseData` and `sourceData` folders). The site and the API are separate repositories of the same project. On 14 October 2026 the `LICENSE` file named the CC BY 4.0 licence, the README next to it said "CC BY 4.0 / ODbL", and the GitHub card marked the licence as Other. Read the text in the file; the badge on the card does not replace it.

For a file that is downloaded whole once a quarter, a release attachment is simpler: on GitHub it has no monthly traffic quota. The repository then keeps the README, the descriptor and the attachment's address. Larger still means cloud storage; see the chapter [on cloud and hubs](./04-cloud-storage-and-hubs.md).

A platform may change its rules or become inconvenient in your country. A copy of the release in Zenodo reduces this dependency. On GitHub the integration makes the copy by itself. GitLab.com has no such button: the release archive is uploaded to Zenodo by hand or by a script.

## Why repositories are hardly ever found

A repository has no "data here" marker. To the platform it is the same as a code repository. In 2022, a file name search run from a logged-in account found tens of millions of CSV, JSON, XML and SQLite files on GitHub. That does not make it a catalog.

On 14 October 2026 code search without a token answered `401` with the text "Requires authentication". Repository search by topic, meanwhile, is open. A topic is a label the author sets themselves. That day the search counted 19,595 repositories with the `dataset` topic and 10,590 with `open-data` (the `incomplete_results` field was `false`). These are only the repositories whose author set the label.

People and programs tell a data repository apart by indirect signs: the `README.md` text, files at the root, `datapackage.json`. The `dataset` and `open-data` topics are still worth setting: it is free and helps those who search by topic. A page with schema.org markup is needed separately. Without it, a dataset search engine hardly sees the repository.

## Release and DOI

A link to a file on the `main` branch opens today's state. Tomorrow the same link will have different rows. A release fixes the state. In practice it is a version tag, for example `v2026.1`, with an archive attached to it. A report cites the release, not the branch. How addresses and DOIs work is in the chapter [on identifiers](../04-features/06-identifiers-and-doi.md).

On GitHub, a repository is linked to Zenodo in the Zenodo profile. The integration takes releases created after it was switched on and gives each a DOI. A series of releases also has a concept DOI: it opens the latest version. A text cites the DOI of a specific release. Until the integration is set up, the `identifiers` block with an empty DOI is removed from the `CITATION.cff` template, so that nobody cites a non-existent number. The DOI that Zenodo issued is written into `CITATION.cff` on the branch, for the GitHub button. There is no need to rewrite the release archive itself for this: the number is visible on the Zenodo page anyway, and a new release would become a new version.

`CITATION.cff` for data needs the line `type: dataset`. Without it GitHub will format the citation as a citation of software. The button reads exactly `CITATION.cff`.

The Zenodo record works separately. The integration's documentation sits in the section on software, and the supported `CITATION.cff` example is marked `type: software`. If there is a `.zenodo.json` at the root, Zenodo reads only that and ignores `CITATION.cff` for the record. The help article with this rule was published on 30 January 2026. For a dataset, `.zenodo.json` sets `upload_type` to `dataset` and the same title, authors and licence as in `CITATION.cff`. The licence code is written the way Zenodo knows it: `cc-by-4.0`, not the SPDX string `CC-BY-4.0` from the citation file. The meaning of the licence must match, not the spelling. A divergence between CC BY and CC BY-NC has already broken a publication without a portal; the example is in the chapter ["When You Don't Need a Portal"](./01-when-portal-not-needed.md#three-places-at-once).

```json
{
  "title": "Dataset title",
  "upload_type": "dataset",
  "license": "cc-by-4.0",
  "version": "2026.1",
  "creators": [
    {"name": "Surname, Given name", "affiliation": "Organisation"}
  ]
}
```

After the first release, open the record and check three things: the type is dataset, the licence matches the `LICENSE` file, and the DOI points to this release. A DOI is needed if the data is cited in text. It is not set up for an internal table.

GitLab has no automatic integration. The tag and archive are made there, the file is uploaded to Zenodo as a separate step, and the same three things are checked.

## Formats for those who will use the data

In a repository it is easy to publish several formats of the same list. Whether the data gets used depends on this. Two repositories with a list of countries show the difference. [Country Codes](https://github.com/datasets/country-codes) serves one CSV and a column dictionary. [Country List](https://github.com/umpirsky/country-list) serves an equivalent list in many languages, straight away in files a program can include without conversion. On 14 October 2026 the `data/ru` folder contained eleven files: CSV, JSON, YAML, XML, HTML, plain text, XLIFF, PHP and three SQL variants (MySQL, PostgreSQL and SQLite). The README lists the same formats. That day the first repository had 981 stars, the second 5,253.

Stars are not a licence assessment. Country List's `LICENSE` file is the MIT text, which speaks about software. Country Codes' descriptor states the ODC-PDDL-1.0 public domain dedication, and its README asks you to check ISO's restrictions on the country codes the list is built from. Someone who needs a file for a database looks at the format. Someone who puts the list into a product reads the licence in the file.

The conclusion is the same as before. A column dictionary is needed, and it is supplemented with the formats in which the data is actually used. First find out who those people are. An analyst expects CSV or Parquet, a developer JSON or SQL. How to choose a format, and why GitHub shows only CSV and TSV of up to 512 KB as a table, is in the chapter [on formats](../02-data/02-formats-and-units.md).

## Build code instead of data

Sometimes what is published is not a table but the program that builds it. This is done when the source publishes Excel, changes files without warning or gives no direct link. A ready table goes stale at the next update; a script can be run again.

In 2022 harvesters for the registers of accredited IT companies and domestic software from the website of Russia's Ministry of Digital Development were published this way. On 14 October 2026 the [repository](https://github.com/apicrafter/datacrafter-examples) still holds build descriptions, not the datasets themselves: the `itregistry` folder has one file, `datacrafter.yml`, which says where to get the Excel file and how to name the columns. The repository's README is one line: "Datacrafter examples".

The script lives as long as the source lives. If the agency removes the file or changes the address, the code will stop building the table, and you will be left without a copy. So the result is published next to the code: a release with ready files or a copy in Zenodo. How to preserve data that may disappear at the source is in the chapter [on archiving](../09-practices/04-archiving.md).

## Collaborative editing

An edit is accepted through a merge request. On GitHub it is called a pull request, on GitLab a merge request: it is a proposal to change files that a second person reviews before it reaches the main branch. In a public repository on free GitHub you can make approval mandatory and assign reviewers with a `CODEOWNERS` file, for example for the `data/` folder. On GitLab.com's free plan, approval does not block a merge. How roles work and how plans differ is in the chapter [on access](../04-features/08-access-control-and-workflow.md#publishing-without-a-portal). The commit history is the change log.

A large table cannot be read in the request window. GitHub shows a diff for one file up to 500 KB or 20,000 lines, and the whole request up to 1 MB or 20,000 lines. The check is then done by a program that validates the CSV against the column dictionary:

```bash
frictionless validate datapackage.json
```

The command is added to an automatic run on every change. On GitHub this is Actions. What exactly such a check catches is in the chapter [on metadata completeness](../04-features/03-metadata-depth.md).

## Versions of a table, not a file

Git compares lines of text. For a table of hundreds of thousands of rows this is not enough: a reviewer wants to see which cells changed, not two 50 MB files.

**Dolt** is a SQL database, compatible with MySQL, that you clone, branch, merge and push just like a Git repository. **DoltHub** hosts public databases free of charge. An edit goes through a pull request, and the difference is shown by rows and cells. The history can be queried with ordinary SQL: the `dolt_log` table is the commit log. DoltLab is the same platform for self-hosting.

```bash
# The last two commits of a public database, without logging in
curl -s "https://www.dolthub.com/api/v1alpha1/dolthub/ip-to-country/master?q=SELECT%20commit_hash%2C%20committer%2C%20date%20FROM%20dolt_log%20LIMIT%202"
```

On 15 October 2026 the answer began with `"query_execution_status":"Success"`. The branch in this database is called `master`. At the address with `main` the server answered "branch not found".

This is a step between a repository and a portal. Edit history as in Git, but for a table that no longer fits into a CSV of a couple of megabytes. The risk is the same as with any single-operator platform: in 2022 the QRI catalog, with a similar idea, closed down this way. So check in advance that the database can be taken home together with its history with the `dolt clone` command. Other innovations of the same kind are in the chapter [on leading catalogs](../11-trends/02-innovative-catalogs.md#table-versions-as-in-git).

## Example: a quarterly table for two

**Context.** Two agency staff edit an expenditure table once a quarter. The file is a CSV of about 2 MB. It must be visible who changed a row. Once a year the table is cited in a report. The national catalog does not harvest this organisation. There is no server of its own and no DataCite agreement.

**Options.** Its own portal. The file only in Zenodo, without a repository. A repository with a README and no column dictionary. A repository with `datapackage.json`, a licence and a page; the annual release goes to Zenodo.

**Criteria.** Edit history is visible without a server. The columns have names and types. The annual file the report cites does not change retroactively. Maintenance fits into these two people's work.

**Decision.** A repository on GitHub or GitLab, with files from the book's templates. The page is built from the same repository. Once a year a release tag is set. On GitHub, Zenodo takes the release. On GitLab, the archive is uploaded to Zenodo by hand. In both cases the record's type is dataset.

**Why.** A portal adds a server while there are still only two publishers. Zenodo alone does not show who changed a cell in March. A repository without `datapackage.json` leaves the table without the meaning of its fields. The `main` branch is no good for a footnote in a report: next quarter the same link will show different numbers.

**Consequences.** The DOI points to the copy of the release in Zenodo. A "table as of today" link goes to the page, and the report's link goes to this year's DOI. A file larger than the limit is not put into this repository. The licence in `LICENSE`, in the descriptor and in the Zenodo record is one and the same.

**When to review.** The file hits the platform's warning (on GitHub, from 50 MiB) or a rejection. The diff in a merge request can no longer be read: then look at Dolt. A third group appears that does not work with Git. The national catalog starts requiring a description file: it is put alongside, and a portal does not yet become mandatory because of it. The annual snapshot is cited more often than it is released.

## How to check

The check takes a few minutes and does not require logging in to the platform. The expected answers below were obtained on 14 October 2026.

```bash
# The file opens without a login: code 200, length 133966 bytes
curl -sI "https://raw.githubusercontent.com/datasets/country-codes/main/data/country-codes.csv"

# The descriptor is in place. In this repository it is YAML; the standard asks for datapackage.json
curl -sI "https://raw.githubusercontent.com/datasets/country-codes/main/datapackage.yml"

# Search over file contents is closed without a token
curl -s "https://api.github.com/search/code?q=filename:datapackage.json"

# Repository topics are visible without a login. Look at the total_count field
curl -s "https://api.github.com/search/repositories?q=topic:dataset&per_page=1"
```

The first two answers are code 200. The third is code 401 with a message that authentication is required. In the fourth, `total_count` was 19,595 that day. The `last_modified` field in the Country Codes descriptor says `2023-09-25`, while the repository's last push as of that day was 1 October 2026. Check both the date in the descriptor and the file date: they have already diverged.

Then open your own repository. The package root has `datapackage.json`, `LICENSE` and `CITATION.cff` with the line `type: dataset` and no empty DOI. The file that will be cited opens at the release tag's address, not only at the branch's address. If Zenodo is switched on, the record's type is dataset and it has the same licence as `LICENSE`.

## Sources

- [Data Package 2.0](https://datapackage.org/standard/data-package/): the `datapackage.json` name, the `$schema` property, page updated 25 August 2026. Profile: [datapackage.org/profiles/2.0/datapackage.json](https://datapackage.org/profiles/2.0/datapackage.json). Validation: [Frictionless, validating data](https://framework.frictionlessdata.io/docs/guides/validating-data.html)
- [About large files on GitHub](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github): 50 MiB, 100 MiB, the advice on 1 GB and 5 GB, release attachments. [Repository limits](https://docs.github.com/en/repositories/creating-and-managing-repositories/repository-limits): 10 GB for the `.git` folder, 2 GB push, 1 MB / 100 MB object, the diff in a pull request. [Git LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage): file size by plan, LFS does not work with GitHub Pages. [LFS quotas](https://docs.github.com/en/billing/concepts/product-billing/git-lfs): 10 GiB of storage and 10 GiB of downloads on the free plan. Checked 14 October 2026
- [GitLab.com storage quotas](https://docs.gitlab.com/user/storage_usage_quotas/): 10 GiB per project on the free plan, 500 GiB on a paid plan, including LFS. [GitLab.com settings](https://docs.gitlab.com/user/gitlab_com/): the table gives the same limit as 10 GB, a 5 GiB push. [The free plan file limit](https://docs.gitlab.com/user/free_push_limit/): 100 MiB. Checked 14 October 2026
- [CITATION.cff on GitHub](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files): `type: dataset`. [The Citation File Format specification](https://citation-file-format.github.io/)
- Zenodo: [enabling a GitHub repository](https://help.zenodo.org/docs/github/enable-repository/), [CITATION.cff](https://help.zenodo.org/docs/github/describe-software/citation-file/), [`.zenodo.json`](https://help.zenodo.org/docs/github/describe-software/zenodo-json/). [Help article](https://support.zenodo.org/help/en-gb/24-github-integration/96-how-does-a-citation-cff-file-affect-metadata-of-my-github-release): when `.zenodo.json` is present, `CITATION.cff` does not affect the record; published 30 January 2026
- [Rendering CSV and TSV on GitHub](https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files): 512 KB, comma and tab
- [Code search on GitHub](https://docs.github.com/en/search-github/searching-on-github/searching-code): login required. On 14 October 2026 an API request without a token returned 401. Topics: `dataset`, 19,595 repositories; `open-data`, 10,590; `incomplete_results: false`
- [Country Codes](https://github.com/datasets/country-codes): `datapackage.yml`, the ODC-PDDL-1.0 licence in the descriptor, the ISO caveat in the README, 981 stars, CSV of 133,966 bytes. [Country List](https://github.com/umpirsky/country-list): eleven formats in `data/ru`, LICENSE is MIT, 5,253 stars. Checked 14 October 2026. The format comparison was suggested in I. Begtin's post [Open data as a data product](https://begtin.substack.com/p/7c4) (in Russian), November 2024
- [geoBoundaries](https://www.geoboundaries.org/) and [repository](https://github.com/wmgeolab/geoBoundaries): Git LFS in `.gitattributes`, LICENSE is CC BY 4.0, the README says "CC BY 4.0 / ODbL", the GitHub card says Other. Checked 14 October 2026
- [datacrafter-examples](https://github.com/apicrafter/datacrafter-examples): on 14 October 2026 `itregistry` contains `datacrafter.yml`, not a dataset
- I. Begtin, Telegram (in Russian): [GitHub as a data source](https://t.me/begtin/3994), 24 June 2022; [GitHub, the largest but poorly structured catalog](https://t.me/begtin/5572), 8 April 2024; [what GitHub lacks to become a data repository](https://t.me/begtin/5748), 11 July 2024; [how to tell a data repository apart](https://t.me/begtin/7067), 16 September 2025; [build code instead of data](https://t.me/begtin/4043), 7 July 2022
- This book's templates: [README](pathname:///templates/README.md), [datapackage.json](pathname:///templates/datapackage.json), [CITATION.cff](pathname:///templates/CITATION.cff)
- DoltHub, [What is Dolt?](https://docs.dolthub.com/introduction/what-is-dolt): SQL, MySQL compatibility, cloning, branches and merging; [SQL API](https://docs.dolthub.com/products/dolthub/api/sql). Checked 15 October 2026
