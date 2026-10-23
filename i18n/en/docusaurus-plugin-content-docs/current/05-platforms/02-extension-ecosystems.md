---
title: Extension Ecosystems
description: How to tell core configuration from someone else's module, check the maintainer and compatibility, and read the plugin list of a live portal.
---

# Extension Ecosystems

The feature you need often lives not in the platform itself but in a separate module. A module has its own author, its own releases and its own compatibility with the core version. Comparing platforms by the list of "what the box can do" means seeing neither the capabilities nor the cost of maintenance.

The practical conclusion is this. For each mandatory feature, record where it lives: in the platform distribution, in a named extension, or nowhere. An extension without which a feature does not work is checked before the shortlist, by its repository, tests and branches, not by its marketing description. If the only route to a mandatory feature is a module that is not tested on your core version, the platform does not make the shortlist. The cost of an accepted extension is a check at every core upgrade.

The full table of CKAN extensions is in the chapter ["CKAN: Core and Extensions"](./03-ckan-and-extensions.md). Here: how ecosystems work in general and how to read one before installing.

## What counts as an extension

The single word "plugin" covers five different things. The kind determines whom to ask at upgrade time.

**Distribution configuration.** A file or switch that comes with the platform. InvenioRDM's custom fields are set in the installation configuration. DKAN's dataset schema is a JSON Schema file in DKAN itself. The author is the same as the platform's, and there is one upgrade.

**A module from the same distribution that is enabled.** In CKAN the table store, text view and statistics are plugins: their names are written into the `ckan.plugins` setting. They are released together with the core and have no separate repository. In GeoNetwork the ISO 19139, ISO 19115-3, Dublin Core and ISO 19110 feature catalogue schemas are part of the release. This is core. They have no outside maintainer.

**A separate extension.** Its own repository, its own release, its own table of core versions. ckanext-* packages and country schema plugins for GeoNetwork work this way. You may end up maintaining them, even if the author is the platform's community.

**An external program.** The catalog does not contain its code but opens it by address. In Dataverse a file viewer is a separate application: a JSON manifest with the address is placed in the installation, and the application itself can run on another site. A core upgrade does not overwrite it. What changes instead is the agreement on how the application gets the file.

**A cloud service.** You cannot install your own module on an ArcGIS Hub, Huwise or Socrata server. What is left is a widget on the page and the API. The provider does the upgrades. You cannot adapt the service to your metadata profile: if the profile you need is not there, that means another platform or your own program alongside.

The InvenioRDM documentation explicitly ranks customisations from cheap to expensive. First configuration. Then files in expected places: your own template, your own image. Then a ready-made module. Then your own package in the installation folder. Then a change to the core with the change contributed back to the project. At the end, your own copy of someone else's repository, a fork, which you maintain yourself. A logo is changed by configuration. A fork for the sake of a logo means you carry every upstream update over by hand.

## How ecosystems differ

<div className="wide-table">

| Platform | How a capability is added | Who usually maintains it | What to check at upgrade |
|-----------|----------------------------|------------------|------------------------------|
| CKAN | a Python package; the plugin name is added to `ckan.plugins` | the CKAN community or a separate organisation | your core version is in the package's automated tests |
| DKAN | a Drupal module; DKAN itself is also a Drupal module | CivicActions maintains DKAN, the rest are Drupal modules | two lines: Drupal and DKAN. DKAN release 4.1.5 of 7 October 2026 is declared for Drupal 10 from 10.2 and for Drupal 11 |
| Dataverse | an external program via a manifest, or a format exporter JAR file | the GDCC consortium and separate projects | the manifest and the way the file is accessed. Since version 6.1 a short signed URL is recommended for viewers |
| GeoNetwork | a schema plugin: a folder of XML schemas and transformations, sometimes a separate JAR | national communities and companies | the plugin branch is named after your GeoNetwork line |
| InvenioRDM | configuration, files in expected places, then your own `site` package | you yourself, inside the installation | compare your templates with the new version's templates |
| DSpace | your own code in the `additions` module on top of core classes | you yourself | there is no third-party plugin catalog; your change is reapplied to the new version |
| GeoServer | an official extension or a community module | OSGeo; community modules are shipped "as is" | a community module is built from the tag of the same version. A build from a nightly snapshot often does not fit an official release |
| ArcGIS Hub, Huwise, Socrata | you cannot install your own module | the provider | a full dump of descriptions and files in case you leave |

</div>

DKAN has two update calendars. A hole in Drupal and a hole in DKAN are closed by different releases. The module's page on Drupal.org was updated on 8 October 2026: about 164 sites report using the module. This is a report from Drupal installations themselves, not a count from the catalog registry. Release 4.1.5 is declared for Drupal 10 from 10.2 and for Drupal 11.

In GeoServer the STAC module ships as a pending community module: it is in the release, but without official support. More on the role of GeoServer in the chapter [on geoportals](../03-types/03-geoportals.md).

In Dataverse since version 5.14, a third-party export format is connected as a JAR file inside the installation. This is already a module that is checked at a core upgrade, unlike a viewer on another site.

## How to assess an extension before installing

Work through the repository page. A marketing description and the phrase "it worked for the neighbours" do not count.

A fresh release does not by itself prove compatibility. ckanext-doi release 4.0.4 came out on 22 September 2025, while the test images in the repository have not changed since 20 September 2023: the instructions still name CKAN 2.9 and 2.10. The absence of a release is not a verdict either. In the table in the CKAN chapter, ckanext-pages has had no releases since 2023; it is installed from the main branch, and tests run on CKAN 2.10, 2.11 and 2.12. A strong sign is automated tests on exactly your core version. A branch named `4.4.x` on a GeoNetwork plugin is the same sign, if such a branch exists in the repository.

| Question | Where to look | What counts as an answer |
|--------|--------------|------------------------|
| Who releases it | the organisation in the repository address, the maintainers file | the platform team or an organisation that responds to issues. One person with no response for two years and no tests is a reason to look for another module |
| Which core version it works with | the compatibility table, the automated tests file, the branch name | your version is named there. A release newer than the core whose tests are older than your version does not count |
| Whether it is alive | the date of the last fix and responses to issues about the new core version | tests run on the current line, even if there has been no separate release for a long time |
| How to install it | documentation in the same repository | the install command points to this repository and to a branch that exists in it |
| What licence | the licence file | there is a licence, and it permits your installation |
| Who else installed it | the ecosystem catalog, the API response of a live portal | the module is installed on portals running your core version |

The CKAN ecosystem catalog in October 2026 knows about 1.4 thousand extensions and 1.3 thousand portals with core versions. This is the best available approximation, not a full census: the number of portals grew when registry records were loaded into it. It is more reliable to ask the portal itself, as in the section [below](#how-to-see-what-is-installed-on-a-live-portal).

### Two extensions of one platform

**ckanext-dcat** is maintained by the CKAN community. The documentation, checked on 11 October 2026, names core versions 2.10 and 2.11. The tests file on the main branch on 13 October 2026 runs 2.10, 2.11 and 2.12. The latest release is 2.4.4 of 11 August 2026. For a portal that search engines and the national catalog must harvest, it is a normal part of a mature setup.

**ckanext-doi** is maintained by the Natural History Museum in London. The badge in the repository names CKAN 2.9.9 and 2.10.1, and the tests section the 2.9 and 2.10 lines. The latest release, 4.0.4, came out on 22 September 2025. The test images folder has not changed since: the last commit there is dated 20 September 2023, which is exactly when tests for 2.10 were added. The extension has not been tested on CKAN 2.11 and 2.12. If a DOI is mandatory, look at a platform where it is in the core: Dataverse or InvenioRDM. The requirement is analysed in the chapter [on identifiers](../04-features/06-identifiers-and-doi.md).

The other CKAN packages are summarised in the table in the chapter [on CKAN](./03-ckan-and-extensions.md): the documentation column and the tests column diverge in a few more rows.

### A fork

A fork is a copy of a repository maintained by another team. Copies diverge. Install the one whose tests run on your core version, and record its address in the decision record.

Two copies of table validation diverged this way. The original ckanext-validation is documented only for CKAN 2.9. The living copy is the [Queensland Government fork](https://github.com/qld-gov-au/ckanext-validation): tests on 2.10, 2.11 and 2.12. The Queensland Government maintains it. If you fix the module locally and do not contribute the fix back, a third copy appears, and its maintainer is you.

### Two copies of one schema plugin

The same thing on GeoNetwork. The British GEMINI 2.3 profile lives in two repositories.

[Astun Technology](https://github.com/AstunTechnology/iso19139.gemini23) has a `4.4.x` branch. On 6 October 2026 an update to the instructions went into it. The instructions name GeoNetwork 4.4 as the recommended version and the plugin file as a build for 4.4.12. This is the copy installed on the current GeoNetwork line.

In the shared [metadata101](https://github.com/metadata101/iso19139.gemini23) collection there is no `4.4.x` branch. The last commit on the main branch is from 14 February 2023. The `4.2.x` branch stopped on 27 June 2024 on a commit that itself is marked as work in progress.

The trap in Astun's instructions: the automatic install command points not to Astun's repository but to metadata101 and to the `4.4.x` branch, which does not exist there. The heading and the command beneath it disagree. Take the repository and branch you have opened and that have commits for your version. Double-check the command from the text.

Next to it is an example where there is only one copy. The Canadian HNAP profile in metadata101 is released with GeoNetwork version numbers: release 4.4.12 came out on 8 July 2026. The instructions say to install it on GeoNetwork 4.4 and state plainly that it has not been tested on earlier versions.

A bad schema plugin breaks the whole catalog, as the GeoNetwork administrator guide warns. It is checked on a test installation before the production catalog.

### An external program

Dataverse viewers work differently. They were developed by the Qualitative Data Repository, and the collection is now maintained by GDCC: version 1.5, 19 viewers, more than 40 file types. Their code is not placed in the Dataverse installation. The administrator registers a manifest, and the file page opens the application by address. The application can stay on github.io.

The risk here is different. A Dataverse upgrade does not hinge on a forgotten package inside the server. But the application gets access to the file. Since version 6.1 the documentation recommends a short signed URL: it is valid for a limited time and allows only the listed API calls. The documentation does not recommend a long-lived API key after Dataverse 6.0: the key acts like the user's password and allows everything that user is allowed.

Before enabling a viewer, record which of the two access methods has been chosen.

## Why an extension is dangerous later

- It stopped being released, and the new core version will not install without it. The portal is left without security fixes. In CKAN the latest minor version is fully supported, and the previous one gets only bug and security fixes. When the next minor version comes out, today's 2.11 will lose those too. One such extension holds back the whole portal.
- Two extensions modify the same form or the same template. Each installs on its own, but together they break the dataset page. The CKAN documentation asks extensions to prefix template, setting and API function names with the extension name so they do not collide.
- A fix was kept locally. From then on every upstream update is carried over by hand. This is now your program, with its own release and its own tests.
- Two calendars, as with DKAN and Drupal. One was patched and the other missed.
- A schema plugin was copied inside the application. When upgrading GeoNetwork, take the plugin branch of the same line, otherwise records in that profile stop opening.
- An external program was given a long-lived key. The key will outlive both the employee and the catalog upgrade.
- A GeoServer community module was taken from a nightly build and put on an official release. The documentation says that this way it often does not start: build it from the tag of the same version.

On the length of maintenance, see the chapter [on deployment speed](../04-features/09-deployment-and-operations.md).

## How many extensions is too many

Count not "how many plugins are fashionable" but how many separate packages you will have to check and how many of them you maintain yourself. Five tested community packages is an ordinary national setup, analysed in the CKAN chapter. One untested package on a mandatory feature costs more than ten tested ones.

A live portal is almost always longer than the short list in a profile. On 13 October 2026 the `status_show` address responded as follows:

| Portal | CKAN version | Names in the list | What the list shows |
|--------|-------------|---------------|--------------------|
| [data.gov.gr](https://data.gov.gr) | 2.11.3 | 66 | familiar community packages (dcat, scheming, harvest, fluent, showcase, pages, archiver) and the agencies' own harvesters, including those of Attica and the Bank of Greece |
| [data.humdata.org](https://data.humdata.org) | 2.11.4 | 34 | 18 names start with `hdx_`: this is the portal's own code, not the community catalog |

One package registers several names. On the Greek portal, `scheming_datasets` and `scheming_organizations` are one ckanext-scheming. The number in the API response is an upper estimate, not the number of repositories. Names from the CKAN distribution (`datastore`, `datatables_view`, `activity`, `text_view`, `stats`) are subtracted from this estimate: the core team updates them.

Names with the portal's prefix are subtracted in the other direction. No outside author will abandon them, because there is no outside author. Their maintainer is the portal team. For HDX there are 18 such names out of 34. This is a normal state for a large portal and at the same time a budget line: when moving to the next core version, these modules are checked by whoever wrote them.

The same address on [data.gov.au](https://data.gov.au) responded with code 403 on 13 October 2026. The list is closed from outside, and the installation's administrator has it.

## How to record this in the choice

In the platform table, each mandatory feature has three cells: in the core; through which extension and who maintains it; or your own customisation. The decision record contains the repository address, the branch, the core version the tests ran on, and what to do if maintenance stops: stay on the old core, take a named fork or change platform. The template is in the chapter ["Justifying a Decision"](../06-choice/04-justifying-decisions.md).

The decision is revisited when a new minor core version comes out, when the extension's tests stop including your version, when issues about the new version stop getting responses, or when a second extension starts modifying the same templates.

A platform on which a mandatory feature is reachable only through an abandoned extension does not make the shortlist. How the list comes out of features is covered in the chapter [on selecting features](../06-choice/02-feature-selection.md).

## How to see what is installed on a live portal

In CKAN the list of enabled plugins and the core version are open at `/api/3/action/status_show`. The names in the `extensions` field are plugins, not packages: one package can provide several names.

```bash
curl -s "https://data.gov.gr/api/3/action/status_show" \
  | jq '{version: .result.ckan_version, n: (.result.extensions | length), extensions: .result.extensions}'
```

Then each name that is not in the CKAN distribution is looked up in the ecosystem catalog or in the portal's repository and run through the table in the section ["How to assess an extension before installing"](#how-to-assess-an-extension-before-installing).

In GeoNetwork the full list of schemas is visible to the administrator: "Metadata and templates", then "Standards". From outside you see the schema of a particular record, not the set of installed plugins. In Dataverse, file view buttons are visible on the file page; the manifest with the application address and access method is seen by the administrator.

A summary of "core, extension or no" by platform is in the [profiles](./04-platform-profiles.md) and the [appendix](../12-appendices/03-platform-tables.md).

## Sources

- [Writing CKAN 2.12 extensions](https://docs.ckan.org/en/2.12/extensions/tutorial.html), [best practices for names and interfaces](https://docs.ckan.org/en/2.12/extensions/best-practices.html): an extension as a Python package, plugins enabled in `ckan.plugins`
- [CKAN release support policy](https://docs.ckan.org/en/2.12/maintaining/releases.html)
- [ckanext-dcat](https://docs.ckan.org/projects/ckanext-dcat/en/latest/), the tests file [test.yml](https://github.com/ckan/ckanext-dcat/blob/master/.github/workflows/test.yml): versions 2.10, 2.11 and 2.12, checked 13 October 2026; release 2.4.4 of 11 August 2026
- [ckanext-doi](https://github.com/NaturalHistoryMuseum/ckanext-doi): release 4.0.4 of 22 September 2025; compatibility badge 2.9.9 and 2.10.1; the last commit to the `docker/` folder on 20 September 2023
- [ckanext-validation](https://github.com/frictionlessdata/ckanext-validation) and [the qld-gov-au fork](https://github.com/qld-gov-au/ckanext-validation): diverging copies, checked in the CKAN chapter on 12 October 2026
- [CKAN ecosystem catalog](https://ecosystem.ckan.org/): about 1.4 thousand extensions and 1.3 thousand portals, October 2026
- `/api/3/action/status_show` responses from [data.gov.gr](https://data.gov.gr) (CKAN 2.11.3, 66 names) and [data.humdata.org](https://data.humdata.org) (CKAN 2.11.4, 34 names), 13 October 2026. The same address on [data.gov.au](https://data.gov.au) responded with code 403 that day
- [InvenioRDM customisation order](https://inveniordm.docs.cern.ch/operate/customize/), [custom code in the site folder](https://inveniordm.docs.cern.ch/operate/code/custom_code/)
- [Dataverse 6.12 external tools](https://guides.dataverse.org/en/6.12/api/external-tools.html), [GDCC previewers](https://gdcc.github.io/dataverse-previewers/): signed URLs since 6.1, API keys not recommended after 6.0
- [Dataverse metadata exporters](https://guides.dataverse.org/en/latest/developers/metadataexport.html): a third-party format as a JAR since 5.14
- [The DKAN module on Drupal.org](https://www.drupal.org/project/dkan): release 4.1.5 of 7 October 2026, Drupal 10.2 and later or Drupal 11; page updated 8 October 2026
- [GeoNetwork schema plugins](https://docs.geonetwork-opensource.org/latest/customizing-application/implementing-a-schema-plugin/), [the warning about breaking the catalog](https://docs.geonetwork-opensource.org/stable/administrator-guide/managing-metadata-standards/standards/)
- [GEMINI 2.3, Astun Technology's 4.4.x branch](https://github.com/AstunTechnology/iso19139.gemini23/tree/4.4.x): instructions commit of 6 October 2026; [the copy in metadata101](https://github.com/metadata101/iso19139.gemini23): no `4.4.x` branch, the last commit on the main branch 14 February 2023, on the `4.2.x` branch 27 June 2024
- [HNAP for GeoNetwork](https://github.com/metadata101/iso19139.ca.HNAP): release 4.4.12 of 8 July 2026
- [GeoServer community modules](https://docs.geoserver.org/latest/en/user/community/), [OpenSearch for EO and STAC](https://docs.geoserver.org/main/en/user/community/opensearch-eo/): shipped, not officially supported
- [The additions module in DSpace 10](https://wiki.lyrasis.org/spaces/DSDOC10x/pages/408945756/Advanced+Customisation)
