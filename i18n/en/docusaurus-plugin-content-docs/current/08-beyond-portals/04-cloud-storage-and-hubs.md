---
title: Cloud Storage and Shared Hubs
description: When to publish data in an open bucket or on a shared hub, and how not to be left without a copy if the platform closes.
---

# Cloud Storage and Shared Hubs

A large file can be published without a portal of your own. For this, two tasks are separated: where the bytes live and where the page through which the file is found lives. An open bucket solves the first. A shared hub often solves both, but by its own rules and up to its own limit. A shared folder behind a link solves neither.

You need your own portal when there are many publishers or the higher-level catalog requires roles and harvesting of other descriptions. As long as there is one dataset and one group publishes it, a page, a bucket or a hub is enough. In any of these cases you need a persistent address, a licence and a copy outside the platform people will cite. If a hub is the only place where the dataset lives, its closure equals deletion.

## Three places that get confused

A **bucket** is a container in object storage: Amazon S3, Azure Blob Storage, Google Cloud Storage or a similar system on your own server (MinIO, Ceph). Each file has its own key and an HTTP address. Space is almost unlimited. A bucket has no catalog: a list of keys is not a set of dataset pages.

A **shared hub** is someone else's platform where the author puts their dataset: Zenodo, Figshare, Hugging Face, Kaggle, Source Cooperative. A dataset page and search already exist. A data hub means something else: several catalogs of one organisation under a common sign. An ML hub is a kind of shared hub where models sit next to datasets. Zenodo accepts data from any discipline.

A **shared folder** is Google Drive, Dropbox, Yandex Disk and similar drives. The link lives as long as the account of whoever issued it. There is no licence and no persistent page address, and a dataset search engine usually does not see the folder. This is not how data is published.

| | Open bucket | Shared hub | Shared folder |
|--|----------------|-----------|-------------|
| What the reader gets | a file at an address | a dataset page and a file | a file, if the link is still alive |
| Who pays for space and downloads | the bucket owner, unless the dataset is in a sponsorship programme | the platform, as long as the dataset is within its rules | the account owner |
| DOI | no, it is issued separately | at Zenodo, Figshare, Kaggle, and with a button at Hugging Face | no |
| Download without login | yes, if the bucket is open for public reading | usually yes; Kaggle serves the file after login | often only after login |
| If this place closes | the files disappear | the files and the dataset page disappear | it disappears with the account |

When a portal itself keeps files in the cloud, the reader does not see it: they click "Download" on the portal page. This is different. A bucket or a hub is enough instead of a portal, but a description page is still needed. How storage works inside a portal is in the chapter [on storage](../04-features/05-data-storage.md).

## Open bucket

A bucket suits satellite images, dumps and models that do not fit into Git or a general repository. Next to the files you put what keeps the folder from being a dump:

- `README.md`: what this is, for what period, how it is updated, who is responsible;
- a licence file for the data itself, with the same text as on the page;
- checksums, in a `SHA256SUMS` file or in [`datapackage.json`](pathname:///templates/datapackage.json);
- a persistent HTTPS address. A temporary signed link is no good for an article: at the Humanitarian Data Exchange it lives for minutes; see the chapter [on storage](../04-features/05-data-storage.md).

Large files are stored in formats that can be read in parts without downloading them whole. A table in Parquet. An image in Cloud Optimized GeoTIFF: a program fetches the window it needs over the network. A multidimensional array, climate data or model output in Zarr, a set of chunks with the same property. For images, a static STAC catalog is also put in the bucket: JSON files through which a program finds the frame it needs. No separate catalog server is needed for this; see the chapter [on static sites](./02-static-sites.md).

The link from an article and from schema.org markup points to a page you run. The direct link field holds the file's address in the bucket. How to build the page is in the chapter ["Making a Publication Findable"](./05-making-it-findable.md).

### Who pays for downloads

While a bucket is simply open for reading, the owner pays for storage and outgoing traffic. A popular dataset of hundreds of gigabytes can cost noticeable money precisely because of downloads, not space. This is calculated before the announcement, not after the first bill.

Some providers take this cost on themselves, but on application and for a fixed term.

The **AWS Open Data Sponsorship Program** pays for S3 storage and data transfer for accepted datasets. Participation lasts two years from the start date and then ends unless AWS renews it. If participation ends for reasons other than a breach of terms, you get at least 90 days to take the data away. After that you pay. The terms allow the programme to be changed or closed. If the application does not specify a licence, the data is considered published under CC BY 4.0. The terms were last updated on 11 September 2025. An accepted dataset is described by a YAML file in the [Registry of Open Data on AWS](https://registry.opendata.aws/) repository: it is a list, not a portal with dataset pages. How such a list works is in the chapter [on dataset lists](../03-types/10-other-types.md#dataset-lists). On 14 October 2026 the repository held 1,241 such descriptions.

**Google Cloud** hosts a short showcase of public datasets itself and pays for their storage. You do not submit your own dataset through a form: the documentation asks you to email the programme. Google's console and command line require login even for someone else's public dataset, while a direct API link does not. In BigQuery Google also pays for storing public datasets, while queries beyond the first terabyte a month are paid by whoever runs them. It is a convenient way to read other people's data inside the cloud, not to publish your own.

**Requester Pays** mode shifts the download cost onto the reader. For open data it breaks publication: the file is not served without a cloud account. On 14 October 2026, of 1,241 descriptions in the AWS registry, six datasets had at least one bucket marked this way, among them Landsat and NAIP imagery, USGS lidar and some Sentinel-2 buckets. Two more datasets, Common Crawl and New York taxi trips, state in their description that an AWS account is required. Check both the registry field and a live request: the `sentinel-s2-l1c` bucket is marked Requester Pays in the file, but the `GENERAL_QUALITY.xml` file opened without a key the same day. The `usgs-landsat` bucket rejected an anonymous request.

The Copernicus digital elevation model on AWS opened without login the same day. The `readme.html` file in the `copernicus-dem-30m` bucket responded with code 200, and a chunk of an auxiliary file with code 206: the server can serve byte ranges. The dataset's licence is written in the registry file.

## Shared hubs

A platform fits when the audience you need is already there, when a DOI is needed and you have no repository of your own and no DataCite agreement, or when the file is larger than is sensible to keep on your own disk. The limits below are as of 14 October 2026. Research repositories with Dryad and Harvard Dataverse pricing are analysed separately, in the chapter [on research repositories](../03-types/04-scientific-repositories.md#how-much-you-can-put-in-a-generalist-repository). Dataset cards, Croissant and empty descriptions of datasets for models are in the chapter [on ML catalogs](../03-types/07-ml-catalogs.md).

| Platform | For which dataset | Limit | What it gives | What you will not have |
|----------|-------------------|--------|----------|-------------|
| Hugging Face | datasets and models whose readers are already on the hub | public space on a free account on a best-effort basis; private datasets 100 GB; one file no larger than 500 GB | a dataset card, loading from code, Croissant for some datasets, a DOI with a button | a guarantee of free terabytes; old files disappear if the history is squashed |
| Kaggle | the same, if the dataset fits the limit | 200 GB per dataset and the same for all private datasets on an account; no more than 50 files at the root | a dataset card, notebooks, Croissant, a DOI | downloads without login |
| Zenodo | data for an article and a repository release | 50 GB and 100 files per record; once, up to 200 GB on request | a DOI for every version | Croissant; acceptance of a dataset cut into records to get around the limit |
| Figshare | the same, when Zenodo is too small | 20 GB free per account, files up to 20 GB, no more than 500 records | a DOI | free space for hundreds of gigabytes |
| Source Cooperative | large open arrays, most often geodata | in the platform's documentation, hundreds of terabytes; publishing by application | a page from `README.md`, download without login | DOIs, versions for citation, closed files |

Beyond the first gigabytes of public space, Hugging Face asks for a paid plan or a storage grant: the platform says plainly that free space is given on a best-effort basis and that it protects itself from abuse. A file larger than 200 GB it asks you to split into parts; the hard ceiling for one file is 500 GB. The repository history is not an archive: space is freed by squashing history, and old files disappear. It makes sense to switch on a DOI before the dataset starts being cited: after that the record cannot simply be deleted. More in the chapter [on identifiers](../04-features/06-identifiers-and-doi.md).

The number of records on Zenodo is not limited. One large dataset cannot be cut into many records to get around 50 GB: the rules treat this as circumventing the limit. Search via the API does not return the whole catalog, no further than the 10,000th record of one query, and there is no full dump as a file. How to get the descriptions is in the chapter [on access interfaces](../04-features/04-access-interfaces.md).

Figshare+ charges a one-off fee for volume beyond the free 20 GB: 1,225 dollars for every 250 GB, with files up to 5 TB. Universities on their own Figshare have different limits, which the repository administrator states. For a lab without such an agreement, 500 free records are the ceiling of a showcase, not a replacement for a university repository.

### Source Cooperative as a model

Source Cooperative is a platform run by the non-profit Radiant Earth. It is worth looking at as a model of how to structure things. A dataset here is called a product: a folder in object storage, open for public reading, plus a `README.md` at the root that the site shows as the dataset page. The author decides what to write on the page. The platform advises including a description, a licence separately for the text and for the data, access examples, a contact and a DOI if one already exists. The platform itself does not issue DOIs.

A product can take up hundreds of terabytes. The platform's documentation names RapidAI4EO as an example over 100 TB, and Earth Genome as a publication of more than 60 TB of processed imagery. This cannot go on GitHub. On 14 October 2026 the platform was in beta: anyone can download without registering, and publishing is by application. The site's code is open. Radiant Earth runs the platform, Taylor Geospatial funds its development, and cloud space is contributed by AWS and Azure. New data is no longer put into Azure. Closing a file or charging for downloads is not yet possible: the documentation lists these as future features. A product can be removed from the site's search, but it stays open by direct link.

There are no versions for citation. Buckets keep previous copies of a file, but non-current copies are deleted after 90 days. This protects against accidental overwriting. These copies do not preserve the release cited in an article.

A file's address is persistent and opens without a key. For the data.gov archive published by the Harvard Law School Library Innovation Lab, the description is at `https://data.source.coop/harvard-lil/gov-data/README.md`: on 14 October 2026 it opened without login, and the response type was Markdown text. The collection itself and how it is packaged are analysed in the chapter [on archiving](../09-practices/04-archiving.md).

The weak point of this structure is that each product has its own folder structure and its own code examples. You read the documentation every time. For a dataset of hundreds of gigabytes you would read it anyway, and here at least it sits next to the data.

The **Internet Archive** keeps a copy of a site and a file for a long time, but it is an archive, not a catalog with field search. It preserves large files poorly. How to use it, and why a snapshot of pages is not enough, is in the chapter [on archiving](../09-practices/04-archiving.md).

## What to choose when

| Situation | Where to go |
|----------|------|
| A table under 100 MB, edit history matters | a Git repository, see [the chapter on Git](./03-git-repositories.md) |
| Data for an article, up to 50 GB, no repository of your own | Zenodo |
| A dataset for models, readers already on the hub | Hugging Face; Kaggle if the dataset is no larger than 200 GB |
| Hundreds of gigabytes and terabytes, files read in parts | Source Cooperative or a cloud sponsorship programme; the page on your own site |
| A DOI is needed for a whole large array, and the hub application was not accepted | Figshare+ or an organisational repository that takes such volume |
| Many publishers, roles, harvesting other catalogs | your own portal or an existing standard one, see ["When You Don't Need a Portal"](./01-when-portal-not-needed.md) |

## Example: an image archive without a portal of its own

**Context.** A research group. One dataset of derived imagery, about 400 GB, in Cloud Optimized GeoTIFF, updated once a year. Readers open the windows they need from code and do not download the whole archive. The data will be cited in an article. There is no server of its own, no librarian and no DataCite agreement. The national portal harvests agencies' descriptions and will not host such an array.

**Options.** Its own portal. The whole dataset in Zenodo. Kaggle. Hugging Face on a free account. Figshare+. Its own public bucket without sponsorship. An application to Source Cooperative or to the AWS sponsorship programme, with the page on the group's website.

**Criteria.** The file opens in parts without login and without a bill to the reader. The article has a DOI for something reproducible. The group can take the data away if the platform closes. The traffic fee does not become a surprise. Maintenance fits into one person's work.

**Decision.** An application to Source Cooperative: the array is open, it is geodata, and it is read in parts. In parallel, a page on the group's website with schema.org markup and a direct link to the product. A documented sample of up to 50 GB goes into Zenodo, and its description says plainly that it is a sample and that the full array is at the page's address. The sample gets the DOI the article cites.

**Why.** 400 GB does not fit into Zenodo: the ceiling for a one-off increase is 200 GB, and the rules forbid cutting one dataset into records to get around the limit. Kaggle is limited to 200 GB. Free space at Hugging Face is not promised for such volume, and the platform's audience is models; nobody looks for this imagery there. Figshare+ for 251–500 GB costs 2,450 dollars one-off at October 2026 prices. That is the fallback if a grant requires a DOI for every file. Its own bucket without sponsorship leaves the group paying for every download. Its own portal adds a server and adds neither a file format nor readers.

**When to review.** The application is not accepted: calculate the traffic and apply to the AWS programme, or pay Figshare+ if a DOI is needed for the whole array. A second group of publishers appears that is not ready to manage files in the cloud. If AWS was chosen, less than six months remain until the end of sponsorship and there is no renewal. Readers cannot open the file without a cloud account.

## What this risks

A platform changes its pricing, limits or rules, and sometimes closes. This has already happened.

- **QRI**, a public data catalog, announced its closure in January 2022. The qri.cloud site stopped accepting datasets, it was due to be switched off on 1 April 2022, and users were asked to take their data in advance.
- **data.world** started as an open cloud catalog. Then the company bet on an enterprise catalog, ServiceNow bought it in 2025, and on 13 July 2026 the open community was closed. Community datasets can no longer be downloaded, and members' data is being deleted. The enterprise catalog kept working.
- **Microsoft** closed the Planetary Computer Hub on 6 June 2024: an environment where researchers computed in notebooks on the project's infrastructure. The data catalog and programming interface remained. In the same discussion Microsoft wrote that it continues to host more than 50 PB. Notebooks and files from personal hub folders had to be taken away by users themselves: on 4 September 2024 the remaining user data was deleted.
- **Zenodo** did not close, but in 2024 it limited the depth of a single search query. For anyone who wants to take all descriptions at once, this is also a change of rules.

Four habits are set up before uploading:

- the licence is written on the dataset page and in a file next to the data, in the same text, not "as is customary on the site";
- the release that is cited has a DOI or another copy outside the platform;
- you yourself run the address of the page you consider persistent, and the hub is named as the download location;
- before uploading, it has been checked that your datasets can be exported in full, not one by one, and that a stranger downloads the file without login.

The description stays open even when the file itself is large and lives in the cloud. If a provider pays for the space, the sponsorship term is written into the decision record: AWS's two years end on a known day, not "some day".

## How to check

The check takes a few minutes and does not require a cloud account. The expected answers below were obtained on 14 October 2026.

```bash
# Open bucket: the description is readable without a key, response 200
curl -sI "https://copernicus-dem-30m.s3.eu-central-1.amazonaws.com/readme.html"

# The file is served in parts: response 206 and a Content-Range header
curl -sI -H "Range: bytes=0-100" \
  "https://copernicus-dem-30m.s3.eu-central-1.amazonaws.com/Copernicus_DSM_COG_10_N00_00_E006_00_DEM/AUXFILES/Copernicus_DSM_10_N00_00_E006_00_ACM.kml"

# Requester Pays: an anonymous request is rejected
curl -s "https://usgs-landsat.s3.us-west-2.amazonaws.com/?list-type=2&max-keys=1"

# The registry mark and live access can diverge: the file opened without a key
curl -sI "https://sentinel-s2-l1c.s3.eu-central-1.amazonaws.com/GENERAL_QUALITY.xml"

# On the hub the description sits next to the data and opens without login
curl -sI "https://data.source.coop/harvard-lil/gov-data/README.md"
```

In the first answer, look for code 200 and the content type. In the second, code 206: this is how formats read in parts work. In the third, the server refuses and says plainly that anonymous requests to a Requester Pays bucket are not accepted. The fourth request returned 200 that day, although the bucket is marked Requester Pays in the registry file: so trust a request without a key, not only a field in someone else's list. The fifth answer is Markdown text a few kilobytes long.

Then open the dataset page in a browser where you are not logged in to the platform. If the file did not download, for open data that is already the answer, even when the page looks good. The licence is checked in three places: the file next to the data, the hub's dataset page, and the page the link from the text points to. A divergence among these three has already broken a publication without a portal; the example is in the chapter ["When You Don't Need a Portal"](./01-when-portal-not-needed.md#three-places-at-once).

## Sources

- [Registry of Open Data on AWS](https://registry.opendata.aws/) and [the descriptions repository](https://github.com/awslabs/open-data-registry); on 14 October 2026 `datasets/` held 1,241 YAML files, and the Git API tree was not truncated. Requester Pays and AccountRequired marks were counted from these files the same day
- [AWS Open Data Sponsorship Program](https://aws.amazon.com/opendata/open-data-sponsorship-program/), [terms](https://aws.amazon.com/opendata/open-data-sponsorship-program/terms/) (updated 11 September 2025; participation term two years, and at least 90 days to take the data away) and [onboarding guidance](https://github.com/aws-samples/aws-opendata-samples/blob/main/guidances/onboard-to-the-open-data-program-and-set-up-update-notifications.md): the programme covers S3 storage and data transfer
- [Cloud Storage public datasets](https://docs.cloud.google.com/storage/docs/public-datasets) and [BigQuery public datasets](https://docs.cloud.google.com/bigquery/public-data): Google pays for storage, and you submit your own dataset by email, not by form
- [Requester Pays buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/RequesterPaysBuckets.html). Checked 14 October 2026: [Copernicus DEM](https://copernicus-dem-30m.s3.eu-central-1.amazonaws.com/readme.html) opens without a key and serves byte ranges; [usgs-landsat](https://usgs-landsat.s3.us-west-2.amazonaws.com/) rejects an anonymous request; [sentinel-s2-l1c](https://sentinel-s2-l1c.s3.eu-central-1.amazonaws.com/GENERAL_QUALITY.xml) is marked Requester Pays in the registry, but the file opened
- [Hugging Face storage limits](https://huggingface.co/docs/hub/storage-limits): free public space on a best-effort basis, private datasets 100 GB, files no larger than 500 GB; [Kaggle datasets documentation](https://www.kaggle.com/docs/datasets): 200 GB per dataset
- [Zenodo size limits](https://support.zenodo.org/help/en-gb/1-upload-deposit/80-what-are-the-size-limitations-of-zenodo), help article published 11 April 2026, checked 14 October 2026
- Figshare: [free account limits](https://info.figshare.com/user-guide/account-limits/) and [Figshare+](https://info.figshare.com/figshare-plus/): 1,225 dollars per 250 GB, checked 14 October 2026
- Source Cooperative: [documentation](https://docs.source.coop/): beta, application, run by Radiant Earth; [core concepts](https://docs.source.coop/core-concepts): product, `README.md`, RapidAI4EO over 100 TB; [infrastructure](https://docs.source.coop/infrastructure): open buckets and deletion of previous copies after 90 days. Checked 14 October 2026. The data.gov archive: the [harvard-lil/gov-data](https://source.coop/harvard-lil/gov-data) page and the [README.md](https://data.source.coop/harvard-lil/gov-data/README.md) file
- QRI, [Winding Qri Down](https://web.archive.org/web/20220120000000/https://qri.io/winding_down), January 2022 (web archive copy): dataset intake stopped, the site was due to be switched off on 1 April 2022
- data.world, [A fond farewell](https://data.world/community/goodbye/): the open community closed on 13 July 2026, checked 14 October 2026
- Microsoft, [Retiring the Hub on June 6th, 2024](https://github.com/microsoft/PlanetaryComputer/discussions/347): the hub closed on 6 June 2024, the data catalog remained, remaining user files deleted on 4 September 2024
- I. Begtin, Telegram (in Russian): [Source Cooperative and data products](https://t.me/begtin/7742), 25 August 2026; [the closure of QRI](https://t.me/begtin/3440), 19 January 2022; [data.world as a catalog behind a login](https://t.me/begtin/6944), 18 July 2025; [the closure of the Planetary Computer Hub](https://t.me/begtin/5649), 28 May 2024
