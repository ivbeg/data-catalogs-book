---
title: Platform Comparison Tables
description: "A summary of platform capabilities: in the core, through an extension, or absent."
---

# Platform Comparison Tables

How to read the cells. Each cell has one of four marks. Text in brackets is not a fifth mark but a module name or a caveat.

- **core**: the capability is in the platform itself;
- **extension**: a separate module is needed; who maintains it and which core version it works with is written in the [profile](../05-platforms/04-platform-profiles.md);
- **no**: the platform does not do this;
- **not checked**: the cell could not be filled from the October 2026 documentation. Check it yourself before choosing the platform.

Cloud services do not accept third-party extensions, so they have no "extension" cell. The "own extensions" row answers a different question: whether a module can be added at all. Details are in the [profiles](../05-platforms/04-platform-profiles.md). The same four marks are used in the chapters on capabilities. The words "customisation" and "impossible" appear only in the [shortlist comparison](../06-choice/03-from-features-to-platform.md): they mean "we will have to write it ourselves" and "the path is closed on this platform".

## Open data and lightweight catalogs

In the registry, Huwise is recorded under its old name, OpenDataSoft. Here the new name is used, with the old one in brackets. Harvesting for Huwise and Socrata was checked against the vendors' documentation on 14 October 2026. The other cells are from the chapters on capabilities.

<div className="wide-table">

| Capability | CKAN | DKAN | Huwise (OpenDataSoft) | Socrata | ArcGIS Hub | JKAN |
|-------------|------|------|------------------------|---------|------------|------|
| Search API | core | core | core | core | core | no |
| Dump of all descriptions | extension (ckanext-dcat) | core | core | core | core | core (data.json file) |
| Change feed and changed-since query | core (Atom feed, filter by modification date) | not checked | core (RSS feed, filter by date) | not checked | core (RSS feed) | no (the repository's change feed, if the site is in Git) |
| DCAT | extension (ckanext-dcat, DCAT-AP 3 profile by default) | core (data.json file; the core schema is DCAT-US 1.1) | core (RDF, Turtle and DCAT; a national profile is not always available) | core (data.json file per DCAT-US) | core (DCAT-US 1.1 and DCAT-AP 2.1.1; DCAT-US 3.0 and DCAT-AP 3.0.0 are enabled separately) | core (the data.json file declares DCAT-US 1.1; the template fills a short list of fields) |
| schema.org | extension (structured data plugin in ckanext-dcat) | not checked | core, enabled by the administrator | core (JSON-LD on the dataset page) | no | no (the page template adds no markup) |
| Files hosted locally | core | core | core | core | core | core (files next to the site) |
| Cloud file storage | extension (in 2.12, ckanext-file-keeper-cloud; earlier, ckanext-s3filestore) | not checked | core (stored by the vendor) | core (stored by the vendor) | core (stored by the vendor) | no (files next to the site or by link) |
| External link checking | extension (ckanext-archiver, also keeps copies) | not checked | not checked | not checked | not checked | no |
| Table API | core; CSV loading via the XLoader extension | core | core | core | core (ArcGIS services) | no |
| Custom fields | extension (ckanext-scheming) | core (replacing the JSON Schema file) | core (field templates) | core (fieldsets) | no (one style from ready standards per organisation) | no (template editing) |
| Table data dictionary | core (for tables in DataStore) | not checked | core | core | core (layer field descriptions) | no |
| DOI | extension (ckanext-doi; not tested on CKAN 2.11 and 2.12) | no | no | no | no | no |
| Citation | extension (ckanext-doi only with a DOI; ckanext-citeproc) | no | no | no | no | no |
| Roles | core (organisations, three roles) | core (Drupal permissions) | service core | service core (five portal roles, three dataset roles) | service core | no |
| Review before publication | draft: core; curator review: extension | core (states); by default a dataset is published immediately | no (there is a separate permission to publish) | core (automatic or manual approval) | no | no |
| Single sign-on | extension (SAML, OpenID Connect, LDAP) | not checked | core (SAML, OpenID Connect) | core (OpenID Connect; SAML through support) | core (SAML, OpenID Connect) | no |
| Harvesting other catalogs | extension (ckanext-harvest; RDF harvesting via ckanext-dcat, geocatalogs via ckanext-spatial) | not checked | core (CKAN, Socrata, ArcGIS, ArcGIS Hub, data.json, data.gouv.fr and other Huwise portals; CSW enabled on request to support) | core (Catalog Connector: data.json and public ArcGIS Server; exchange between Data & Insights domains) | not checked | no |
| Own extensions | yes | yes, through Drupal | no | no | no | template editing |

</div>

## Science and geodata

| Capability | Dataverse | InvenioRDM | DSpace | GeoNetwork | NADA | PxWeb |
|-------------|-----------|------------|--------|------------|------|-------|
| API | core | core | core | core | core | core |
| Description dump | core (OAI-PMH) | core (OAI-PMH) | core (OAI-PMH) | core (CSW and OAI-PMH) | core (own API and DDI Codebook; no OAI-PMH) | core (table API, not a file catalog) |
| Changed-since query | core (OAI-PMH by date) | core (OAI-PMH by date) | core (OAI-PMH by date, OpenSearch feeds) | core (OAI-PMH by date) | not checked | core (PxWebApi 2: tables changed in the last N days) |
| DCAT | not in core (third-party DCAT 3 exporter) | core | no | core | no | no |
| schema.org | core (since version 6.10 a brief Croissant markup is embedded in the page) | core | no | core | core (JSON-LD) | no |
| Files hosted locally | core | core | core | core (more often a link to a service) | core | no |
| Cloud file storage | core (S3, Swift, Globus; several stores) | core (S3 since v13) | core (S3; several stores) | core (S3, JCloud and CMIS modules in the distribution) | not checked | no |
| DOI | core | core | core | core (must be enabled and connected to DataCite) | only a field for a DOI issued separately | no |
| Citation | core | core | no (only meta tags for Google Scholar; the port from DSpace-CRIS is not finished) | core (HTML, text, RIS, BibTeX) | core via DataCite, if there is a DOI | no |
| Custom fields | core | core (configuration) | core (configuration) | core (ISO 19139, ISO 19115-3, Dublin Core); a national profile is an extension (schema plugin) | not checked | no |
| Table data dictionary | core (variables of uploaded tables) | no | no | core (ISO 19110 feature catalogue) | core (DDI variables) | core (table variables and values) |
| Restricted file access | core | core | core | core (a separate permission to download files uploaded to GeoNetwork) | core | no |
| Roles | core | core | core | core | core | not checked |
| Review before publication | core | core | core | core (by default approval can be bypassed) | not checked | not checked |
| Single sign-on | core (SAML, OpenID Connect, ORCID) | core (ORCID, OpenID Connect, SAML) | core | core | not checked | not checked |
| Harvesting other catalogs | core (OAI-PMH client; the record links to the original) | not checked | not checked | core (CSW, OAI-PMH, OGC services, STAC) | not checked | not checked |
| Own extensions | external tools and previewers | platform modules | extensions | schema plugins; OGC API Records is an extension | few | few |

## udata, Piveau and GeoNode

These three platforms are not in the tables above, but they have already been checked in the chapters on capabilities. A "not checked" cell here means that those chapters had no answer.

| Capability | udata | Piveau | GeoNode 5.1 |
|-------------|------------------------|---------|-------------|
| DCAT | core: paginated and as a file per dataset | core: several formats and SPARQL | no: the catalog serves an API and CSW, not DCAT |
| schema.org | no: the page HTML has no markup | no: the dataset page on data.europa.eu is rendered by a script | no |
| Catalog protocol | core (DCAT); a nightly dump of the whole catalog to CSV is a core task | core (DCAT and SPARQL) | core (CSW and ISO 19115, via pycsw inside) |
| Roles | core: administrator, editor, partial editor | not checked | not checked |
| Review before publication | draft: core; no curator review | not checked | not checked |
| Harvesting other catalogs | core (DCAT, CSW, CKAN, DKAN and others; disabled by default; the search index is rebuilt after harvesting) | core | not checked |

## What the table does not replace

A "core" cell does not mean "switched on with a tick in an hour". A DOI in GeoNetwork and Dataverse requires a contract with DataCite. An "extension" cell does not mean "do not take it": ckanext-dcat is an ordinary part of a mature CKAN portal, not something exotic. A "no" cell means this function will have to be covered by another platform or in-house development.

## Sources

- [Platform profiles](../05-platforms/04-platform-profiles.md)
- [ckanext-dcat](https://docs.ckan.org/projects/ckanext-dcat/en/latest/), [Dataverse features](https://guides.dataverse.org/en/latest/admin/features.html)
- Harvesting: [Huwise harvesters](https://userguide.huwise.com/en/categories/480514), checked 14 October 2026; [Socrata Catalog Connector](https://support.socrata.com/hc/en-us/articles/223722647-Using-the-Catalog-Connector-to-Federate-and-Connect-External-Assets). Datasets connected to Socrata through `data.json` become public after synchronisation. Dataverse's OAI-PMH client and udata's six harvesters: the chapter [on other capabilities](../04-features/10-other-capabilities.md), checked 14 October 2026
- Roles, review before publication and single sign-on: the chapter [on access and roles](../04-features/08-access-control-and-workflow.md), checked 12 October 2026
- Software records in the dataportals-registry, release 1.27.0 of 15 October 2026. Notes such as "plugin only" were used as a hint of what to check in the documentation, not as the sole source.
