---
title: "CKAN: Core and Extensions"
description: What CKAN does by itself, what capabilities extensions add, and how to assemble a portal from them for a specific task.
---

# CKAN: Core and Extensions

CKAN is an open source platform for open data portals (AGPL-3.0 licence, the CKAN Association). According to the dataportals-registry export (release 1.27.0 of 15 October 2026), about 1,900 open data portals run on it. Almost none of them runs on the bare core: extensions are installed on top of it for specific tasks.

The current core version is CKAN 2.12, released on 26 August 2026. Under the project's rules the latest minor version is fully supported, while the previous one (currently 2.11) gets only bug and security fixes. The CKAN entry in the registry still shows version 2.11.4. The information on extensions below was checked on 11 October 2026 against their documentation and the automated tests in their repositories.

## What is in the core

This is enough to publish datasets, assign permissions and serve data to programs:

- datasets, files or links, organisations, groups, tags;
- the Action API for search and writing;
- file upload (FileStore) and a database for tables with an API (DataStore);
- roles and private datasets;
- search on Solr.

The core has no DCAT export, no schema.org markup, no custom fields beyond the standard schema, no harvesting of other catalogs, no spatial search and no DOIs. All of these are extensions.

**Open registration.** The `ckan.auth.create_user_via_web` parameter lets any visitor create an account. Before CKAN 2.9.7 it was on by default. In 2.9.8 it was turned off, in 2.10.0–2.10.3 it was on again, and it has been off for good since 2.10.4 and 2.11. Portals upgraded from older versions often kept the old setting. On such sites robots register hundreds of thousands of accounts and publish advertising and fraudulent pages in their name: the portal of Tunisia's meteorological service had more than 1.3 million accounts in 2025 and tens of thousands of spam texts in its data requests section. If only staff publish, registration is turned off, and an organisation administrator invites outside publishers.

**What changed in 2.12.** Files became separate objects: they can be uploaded and managed separately from a dataset's resources and kept in several stores at once. The DataStore got fast pagination for large tables and complex filters. There is also a new interface design that will become the default in CKAN 3.0. For a portal owner this means that moving to 2.12 requires a database upgrade and a check of the extensions that work with files. For example, ckanext-showcase on 2.12 requires storage to be configured separately. Only disk storage ships with 2.12: a portal that keeps files in the cloud changes its storage extension when it moves. More in the chapter [on storage](../04-features/05-data-storage.md#ckan-extensions-and-their-risks).

## Extensions that cover typical requirements

The "Tests" column shows which core versions an extension is automatically tested on with every change. This is a strong sign of compatibility even if the documentation text has not yet been updated. The "Documentation" column is what the extension declares itself.

| Task | Extension | Maintainer | Documentation | Tests |
|--------|------------|-----------|--------------|-------|
| DCAT, DCAT-AP, DCAT-US, schema.org, Croissant | [ckanext-dcat](https://docs.ckan.org/projects/ckanext-dcat/en/latest/) | CKAN community | 2.10 and 2.11 | 2.10, 2.11, 2.12 |
| Custom fields and forms | [ckanext-scheming](https://github.com/ckan/ckanext-scheming) | CKAN community | — | 2.10, 2.11, 2.12 |
| Descriptions in several languages | [ckanext-fluent](https://github.com/ckan/ckanext-fluent) | CKAN community | installed together with scheming | 2.10, 2.11, 2.12 |
| Harvesting datasets from other catalogs | [ckanext-harvest](https://github.com/ckan/ckanext-harvest) | CKAN community | — | 2.10, 2.11, 2.12; the latest release (1.6.2) is older than CKAN 2.12 |
| Spatial search and CSW harvesting | [ckanext-spatial](https://github.com/ckan/ckanext-spatial) | CKAN community | 2.10 and 2.11 | 2.10, 2.11, 2.12 |
| Loading CSV into the DataStore | [XLoader](https://github.com/ckan/ckanext-xloader) | CKAN community | 2.10, 2.11, 2.12 | 2.10, 2.11, 2.12 |
| Storing files in S3 and other clouds | [ckanext-file-keeper-cloud](https://github.com/ckan/ckanext-file-keeper-cloud) for 2.12; before 2.12, [ckanext-s3filestore](https://github.com/keitaroinc/ckanext-s3filestore) | CKAN community; s3filestore by Keitaro | file-keeper-cloud is named in the CKAN 2.12 documentation | file-keeper-cloud: 2.12 only, no releases; s3filestore: 2.10 and 2.11 |
| Checking links and keeping copies of files | [ckanext-archiver](https://github.com/ckan/ckanext-archiver) | CKAN community | — | 2.10, 2.11, 2.12 |
| Validating a table against a data dictionary (Table Schema) | [ckanext-validation](https://github.com/frictionlessdata/ckanext-validation) | Frictionless Data; the living branch is the [Queensland Government fork](https://github.com/qld-gov-au/ckanext-validation) | original repository: 2.9 only, "no" for 2.10 and 2.11 | original: 2.9; fork: 2.10, 2.11, 2.12 |
| "About the portal" pages | [ckanext-pages](https://github.com/ckan/ckanext-pages) | CKAN community | — | 2.10, 2.11, 2.12 on the main branch; the latest release, v0.5.2, is from 7 June 2023; 2.12 support was merged on 26 June 2026 without a new release |
| Dataset reuse showcase | [ckanext-showcase](https://github.com/ckan/ckanext-showcase) | CKAN community | 2.10–2.12 | 2.10, 2.11, 2.12 |
| Statistics via Google Analytics | [ckanext-googleanalytics](https://github.com/ckan/ckanext-googleanalytics) | CKAN community | up to 2.11 | 2.10, 2.11, 2.12 |
| SAML login | [ckanext-saml2auth](https://github.com/keitaroinc/ckanext-saml2auth) | Keitaro | 2.10 and 2.11 | 2.10, 2.11; the latest release is from 2022 |
| DOIs in DataCite | [ckanext-doi](https://github.com/NaturalHistoryMuseum/ckanext-doi) | Natural History Museum (London) | 2.9 and 2.10 | test images not updated since September 2023, before 2.11 came out; the latest release is from September 2025 |

Harvesting RDF from someone else's DCAT is done not by harvest itself but by a harvester inside ckanext-dcat. Harvest provides the queue, the schedule and the error screen.

## Three working setups

**A small portal that search engines and the national catalog must find.** The core, ckanext-dcat (the DCAT-AP or national profile), and ckanext-scheming if the standard fields are not enough. XLoader only if tables need to be viewed and queried through the API, not just downloaded.

**A regional portal that harvests municipalities.** The same setup plus ckanext-harvest. Municipalities then need not "an equally pretty site" but a stable DCAT export.

**A portal with many maps.** ckanext-spatial is added. If maps are the main product and tables are incidental, it is more honest to look at a geo platform than to keep building on CKAN. Types are compared in the chapter [on hybrids](../03-types/11-comparison-and-hybrids.md).

As of October 2026 all three setups can be installed on CKAN 2.12: their extensions are tested on that version.

DOIs are not part of these setups. An open data portal usually does not need them, and the ckanext-doi extension has not been tested on CKAN 2.11 and 2.12. Research data belongs in Dataverse or InvenioRDM, where DOIs are in the core.

## The cost of such a setup

Upgrading CKAN means upgrading the core and checking every extension in the table. A CKAN community extension that is tested on the new core version is predictable. An extension whose documentation and tests are both silent about the new version is a risk: either you stay on the old version or you take on the testing yourself.

Right now two extensions in the table carry such a risk. ckanext-doi has not been tested on 2.11 and 2.12 at all: its test images are older than CKAN 2.11. ckanext-saml2auth is not tested on 2.12. A portal that needs SAML login checks login on a test instance before moving to 2.12, or looks for another single sign-on extension.

Delaying an upgrade is also expensive. The project calls 2.12 the last release of the 2.x line, with CKAN 3.0 planned next. While 2.11 is the previous version in the supported pair, it gets bug and security fixes. When the pair moves on, 2.11 will lose them. After three skipped releases an upgrade turns into a re-implementation.

How to make this decision is described in the chapter [on ecosystems](./02-extension-ecosystems.md) and in the [example decision record on a core upgrade](../06-choice/04-justifying-decisions.md#example-a-core-upgrade).

Where to see who else installs an extension, and on which core version. The community maintains the [CKAN ecosystem catalog](https://ecosystem.ckan.org/), still in beta: in October 2026 it had about 1.4 thousand extensions and 1.3 thousand portals with core versions. The old extensions.ckan.org address redirects there too. The number of portals in the catalog doubled in autumn 2026, when records from the dataportals-registry were loaded into it, so it is not a full census but the best available approximation. The most reliable is to ask the portal itself: the `/api/3/action/status_show` address returns the core version and the list of enabled extensions.

## Sources

- [CKAN 2.12 documentation](https://docs.ckan.org/en/2.12/), [release support policy](https://docs.ckan.org/en/2.12/maintaining/releases.html), [2.12.0 changelog](https://docs.ckan.org/en/latest/changelog.html), [2.12 release announcement](https://ckan.org/blog/ckan-2-12-released): 2.12 is called the last release of the 2.x line
- [CKAN releases on GitHub](https://github.com/ckan/ckan/releases): 2.12.0, 2.11.6 and 2.10.11 of 26 August 2026
- [ckanext-dcat](https://docs.ckan.org/projects/ckanext-dcat/en/latest/), [ckanext-scheming](https://github.com/ckan/ckanext-scheming), [ckanext-fluent](https://github.com/ckan/ckanext-fluent), [ckanext-harvest](https://github.com/ckan/ckanext-harvest), [ckanext-spatial](https://github.com/ckan/ckanext-spatial), [XLoader](https://github.com/ckan/ckanext-xloader), [ckanext-pages](https://github.com/ckan/ckanext-pages), [ckanext-showcase](https://github.com/ckan/ckanext-showcase), [ckanext-googleanalytics](https://github.com/ckan/ckanext-googleanalytics), [ckanext-saml2auth](https://github.com/keitaroinc/ckanext-saml2auth), [ckanext-doi](https://github.com/NaturalHistoryMuseum/ckanext-doi): documentation and automated test files, checked 11 October 2026; ckanext-pages's release v0.5.2 of 7 June 2023 and the merge of CKAN 2.12 support on 26 June 2026 checked 14 October 2026
- [ckanext-validation](https://github.com/frictionlessdata/ckanext-validation) and [the qld-gov-au fork](https://github.com/qld-gov-au/ckanext-validation): compatibility table and automated test files, checked 12 October 2026
- [CKAN ecosystem catalog](https://ecosystem.ckan.org/): extensions and portals, checked 12 October 2026; I. Begtin, [on the ecosystem catalog](https://t.me/begtin/7419), Telegram (in Russian), 5 February 2026, and [on loading registry data into it](https://t.me/begtin/7820), 9 October 2026
- The `ckan.auth.create_user_via_web` parameter in the [2.9](https://docs.ckan.org/en/2.9/maintaining/configuration.html) documentation (on by default) and [2.12](https://docs.ckan.org/en/2.12/maintaining/configuration.html) (off); I. Begtin, [on the price of openness](https://t.me/begtin/7254), Telegram (in Russian), 25 November 2025: spam on open CKAN portals
- The number of portals and the version in the platform entry: a query to the dataportals-registry export, release 1.27.0 of 15 October 2026.
