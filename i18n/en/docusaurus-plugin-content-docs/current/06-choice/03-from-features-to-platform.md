---
title: From Features to a Platform
description: How to choose a build model and a specific platform from a feature list, noting where a feature is in the core and where it is in an extension.
---

# From Features to a Platform

A shortlist of two to four platforms is compared on mandatory features. A platform for which a mandatory feature is impossible drops out before any talk of price or the number of ticks.

By this point the feature list already exists: it is built in the chapter ["Selecting Features"](./02-feature-selection.md). Here it is applied to platforms.

## Step 1. The approach, then the brand

First not CKAN or Dataverse, but the approach: someone else's catalog, a static site, a cloud service, open source, a custom build. The criteria and the cost of leaving are in the chapter ["Build, Open Source or SaaS"](./05-build-or-buy.md). If there is little data and no team, a comparison of CKAN with Dataverse is not needed: publish in an existing catalog.

## Step 2. The shortlist

Two to four platforms of the class that matched the data type and the approach. Guidance: [classes of software](../05-platforms/01-software-classes.md) and [profiles](../05-platforms/04-platform-profiles.md).

| What you publish | Usual shortlist |
|----------------|-------------------------|
| A public authority's datasets, with its own team | CKAN, DKAN, udata |
| A public authority's datasets, no team | Huwise, Socrata, publishing in a regional or national portal |
| Research data with DOIs | Dataverse, InvenioRDM, publishing in Zenodo |
| Map layers and services | GeoNetwork, ArcGIS Hub |
| Indicators | PxWeb, .Stat Suite, OpenSDG |
| Survey microdata | NADA, Dataverse |
| A dozen files, no team | a static site or a Git repository |

A platform from the neighbouring row does not get on this list. A research repository does not cover a daily open data portal, and CKAN with an untested DOI extension does not replace Dataverse.

## Step 3. The matrix

For each mandatory and desirable feature, put one of four marks:

- **core**: present in the platform itself;
- **extension**: present in a named module, and you have checked who maintains it and which core version it works with;
- **customisation**: the platform has a place to build it in, and a developer estimates the effort;
- **impossible**: the platform cannot do it and cannot be extended to.

A platform with "impossible" on a mandatory feature drops out. The rest are compared on launch and maintenance cost, not on the number of ticks.

"Customisation" and "impossible" belong only to this comparison. The platform summary in the [appendix](../12-appendices/03-platform-tables.md) uses different words: core, extension, no, not checked. A "no" cell goes into the matrix as "impossible" only if the feature cannot be added. A "not checked" cell does not go into the matrix: it is closed from the documentation before the platform gets on the shortlist.

An example for a region that needs a DCAT dump for the national portal, harvesting of municipal catalogs and staff login through the organisation's accounts. A DOI is not mandatory for the region.

<div className="wide-table">

| Feature | CKAN | Huwise | Socrata | Your own site on a generator |
|---------|------|--------|---------|-------------------------|
| DCAT dump | the ckanext-dcat extension, DCAT-AP 3 by default | core; the national profile is not available on every installation and has to be checked | core: a `data.json` file per DCAT-US, not DCAT-AP | template customisation |
| Search API | core | core | core | impossible without a separate program |
| Custom fields required by law | the ckanext-scheming extension | core (field templates) | core (fieldsets) | customisation |
| Harvesting municipal catalogs | the ckanext-harvest extension | core: harvesters for CKAN, Socrata, ArcGIS, `data.json` and other Huwise portals; CSW enabled on request through support | core: the Catalog Connector takes `data.json` and a public ArcGIS Server | impossible |
| Login through the organisation's accounts | extension (SAML or OpenID Connect) | core: SAML and OpenID Connect | core: OpenID Connect; SAML through support | no |
| DOI | extension; not tested on CKAN 2.11 and 2.12 | no | no | no |

</div>

A cloud service sets up custom fields in templates without a programmer, but they reach the DCAT dump only if the provider has provided a mapping. In Socrata, fields with names known in advance go into the `data.json` file.

If the national portal expects DCAT-AP, Socrata drops out of this list: its standard file is DCAT-US. Huwise stays until the pilot shows whether the needed profile is there. CKAN stays if ckanext-dcat and the login extension have been checked on the core version that is going to be installed. If a DOI suddenly becomes mandatory, nobody in this four remains: a research repository is taken, not "CKAN plus an unknown extension".

## Step 4. Testing on real data

Set up a pilot or open a demo instance and publish five to ten real datasets, including an awkward one: without a licence in the source, with a large file, with daily updates. Then check as described in the chapters on capabilities.

- The DCAT dump opens without a login and passes the validator of the profile the higher-level portal expects.
- The dataset page has schema.org markup, if search engines are supposed to find the dataset.
- The dataset address does not change when the title is corrected.
- The file downloads via a direct link.
- If the matrix says "extension", exactly that extension is installed on the instance, and its version is visible.

A pilot on the provider's demo data does not replace this check. For a cloud service, the pilot also covers the question of leaving: all descriptions and files can be exported in full.

## When a custom build is justified

All four statements are true at the same time:

- no platform on the shortlist covers a mandatory feature, even with a living extension;
- the feature does not go away if the task is narrowed (for example, publishing research data in Dataverse and operational data on the portal);
- there is a team not only for the launch but for five years of maintenance;
- your own system will still have persistent addresses, a licence per dataset, a metadata dump and schema.org.

If the fourth is "we'll do it later", the custom build will repeat the most common problem of custom-built catalogs: people use the site, but programs cannot see it. According to the dataportals-registry export (release 1.27.0 of 15 October 2026), among indicator catalogs, where custom builds are most common, only 37% have an API.

## Step 5. Record the decision

Every fork in the road (platform, extension, rejecting a feature, custom build) is set out as a [decision record](./04-justifying-decisions.md). Four complete examples of such a chain are in the chapter ["Worked Examples"](./08-worked-examples.md).

## Common mistakes

- **Eight platforms in one table.** A shortlist longer than four can no longer be compared: the differences drown. First the class is cut off, then brands are compared.
- **A "not checked" cell rewritten as "no".** In an earlier version of this chapter, Huwise's harvesting was listed as not checked, although the service's documentation has harvesters. An open cell is closed from the documentation, not by crossing out the platform.
- **An extension recorded as a weakness.** ckanext-dcat is an ordinary part of a mature CKAN portal. It becomes a weakness when it has not been tested on the needed core version.
- **A pilot on the provider's data.** Ten demo datasets from someone else do not show your large file, your DCAT profile and your login.

## Sources

- [Platform Comparison Tables](../12-appendices/03-platform-tables.md)
- [CKAN: Core and Extensions](../05-platforms/03-ckan-and-extensions.md)
- [Huwise harvesters](https://userguide.huwise.com/en/categories/480514), checked 14 October 2026
- [Socrata's Catalog Connector (Tyler Data & Insights)](https://support.socrata.com/hc/en-us/articles/223722647-Using-the-Catalog-Connector-to-Federate-and-Connect-External-Assets)
- Share of indicator catalogs with an API: the dataportals-registry export, release 1.27.0 of 15 October 2026.
