---
title: Build, Open Source or SaaS
description: Six ways to set up a catalog, from someone else's portal to a custom build, and what it costs to leave each of them later.
---

# Build, Open Source or SaaS

The build approach is chosen before the brand. A platform that covers the features perfectly is useless if nobody is there to update it.

## Six approaches

1. **Publish in an existing catalog**: a regional, national or university one, or a general one such as Zenodo.
2. **A static site or a Git repository**: JKAN, PortalJS, OpenSDG, a static STAC catalog, a repository on GitHub. Details in the part ["Publishing Without a Portal"](../08-beyond-portals/01-when-portal-not-needed.md).
3. **A section of an existing website**, if the site's engine can serve descriptions to machines, not just draw a table.
4. **A cloud service**: Huwise (formerly OpenDataSoft), Socrata, ArcGIS Hub, Figshare.
5. **An open source platform on your own infrastructure**, with the extensions that cover the mandatory features: CKAN, Dataverse, GeoNetwork, NADA, PxWeb.
6. **A custom build.**

Launch and maintenance timelines are in the chapter [on deployment](../04-features/09-deployment-and-operations.md).

## What to compare on

- Whether mandatory features are covered by the core or by a living extension.
- How many people and how much money per year, including checking extensions at upgrades.
- Where the data is stored, and whether the organisation's rules allow it.
- What happens if the provider, the contractor or the only administrator disappears.

## When each approach fits

| Approach | Fits when |
|--------|----------------|
| Someone else's catalog | there is little data, no team of your own, and a suitable catalog already accepts your datasets |
| Static site or repository | dozens of datasets, rare edits, someone who can work with Git |
| A section of a site | the catalog is small and the site can serve DCAT or at least schema.org |
| Cloud service | a launch in weeks is needed, there is no operations team, the data may be hosted by the provider |
| Open source platform | there is a team or contractor for years, custom fields and independence from a pricing plan are needed |
| Custom build | a mandatory feature is not covered by any platform even with an extension, and there is a team for the whole term |

## What a cloud service costs

Almost nobody publishes cloud portal prices, so reference points have to be gathered from public procurement. What could be found as of October 2026:

| Service | What is known about the price | Where it can be seen |
|--------|--------------------|---------------|
| PortalJS (Datopian) | the open source version is free; cloud plans are 1,188, 3,588 and 14,990 dollars a year, large projects by arrangement | the vendor's pricing page |
| ArcGIS Hub (Esri) | the basic version is included in paid ArcGIS Online licences; Premium is a separate annual subscription, priced by the sales team | the purchase options page |
| Huwise (formerly OpenDataSoft) | no price list. The Grand Paris Seine Ouest territorial authority signed a 600,000-euro contract in 2025 for hosting, maintenance and services; the UK's West of England Combined Authority paid 42,000 pounds for a year of portal operation in 2026–2027 | procurement notices |
| Socrata (Tyler Technologies) | no price list. In 2024 Austin approved a contract for the Data & Insights platform that runs the city portal, for up to five years and up to 5 million dollars | city council materials |

Sums from procurement cannot be divided by each other: contracts include different services, terms and numbers of users, and the sum is often a ceiling rather than an actual payment. So the decision record contains not "what the neighbours pay" but a commercial offer for your volume. Where to look for comparable contracts: in the European Union, [TED](https://ted.europa.eu/); in France, contract data on [data.gouv.fr](https://www.data.gouv.fr/); in the UK, [Find a Tender](https://www.find-tender.service.gov.uk/); in the US, city council agendas and decisions; in Russia, the [Unified Procurement Information System](https://zakupki.gov.ru/).

The market for cloud portals exists mainly where paying for a subscription is customary. In other countries, open source is more often installed, or organisations live on the free version of ArcGIS Hub.

## A custom build: four questions before starting

The answers go into a [decision record](./04-justifying-decisions.md), not into correspondence.

- Which mandatory feature is provided by neither the core nor a living extension? Name the feature, not "we need something special".
- Who maintains the system in five years if the author leaves?
- How will persistent addresses, a dataset licence, a metadata dump and schema.org work in your system? Without them the catalog repeats the typical problem of custom-built sites.
- What does it cost to leave? See the section "What it costs to leave" at the end of the chapter.

According to the dataportals-registry export (release 1.27.0 of 15 October 2026), custom-built catalogs are about 16%. Among indicator catalogs they are 44%, and only 37% of those have an API. A custom build usually loses not on launch day but in the year it stops being developed.

## You usually don't need your own engine

The temptation to write the "right" catalog from scratch is understandable: ready-made platforms always have inconveniences. But there are dozens of catalog engines, and they have already solved most tasks. Two examples show the price of the temptation.

**The World Bank and the OECD.** The World Bank has several separate public data systems: an indicators portal, DataBank, a dataset catalog, a microdata library. In 2025 another portal joined them, Data360, with its own programming interface. As observed in May 2026, it publishes indicator data in SDMX format but does not offer an SDMX-compatible interface. The OECD took another path: its [Data Explorer](https://data-explorer.oecd.org/) runs on .Stat Suite, an open source platform developed jointly by statistical organisations. The OECD's new showcase is a new version of a shared product, not one more system to be maintained alone.

**Moldova's geoportal.** The national geodata portal [geodata.gov.md](https://geodata.gov.md/) showed 16 maps and layers in February 2024 and was built separately from ready-made geo platforms, although GeoNode would have given the same portal out of the box. In October 2026 its interface runs on MapStore on top of GeoServer, the very components GeoNode is made of, only without its catalog and layer pages. The catalog meanwhile is kept separately, on the national spatial data infrastructure geoportal. Assembling your own from ready parts is also a custom build: gluing, upgrading and describing the layers is up to you.

A custom build is justified when a feature is needed that no platform has and without which the catalog loses its purpose, and the answer to the first of the four questions above is named concretely.

## A middle path: a ready core and your own interface

Between "take the platform as it is" and "write everything ourselves" there is a stable middle option. Storage for descriptions and files, the programming interface and harvesting from other catalogs are taken ready-made, and the site for people is built separately. This setup is called "headless": the platform's own interface is cut off, and only the core works.

- The [Toronto](https://open.toronto.ca/) open data portal is a WordPress site, while datasets, their descriptions and the API live in CKAN. In 2023 the city showed the contents and structure of a dataset, a quality score and code examples on the site; the customisations are published as [open source](https://github.com/open-data-toronto/ckan-customization-open-data-toronto). As of 12 October 2026 CKAN holds about 550 datasets.
- The [Indian Data Portal](https://indiadataportal.com/) of the Bharti Institute of Public Policy is a Next.js site on top of [its own CKAN](https://ckan.indiadataportal.com/). Through the catalog API the site builds filters that CKAN does not have: granularity, sector, update frequency.
- Canada's national portal [open.canada.ca](https://open.canada.ca/) runs on CKAN with a large set of its own extensions, [ckanext-canada](https://github.com/open-data/ckanext-canada).

PortalJS is the same idea packaged as a product: a ready interface on top of CKAN or other storage, so you do not have to write your own. More in the chapter [on static sites](../08-beyond-portals/02-static-sites.md).

The upside is your own interface without losing the standard core: DCAT, harvesting and the API remain the same as on thousands of other portals. The downside is two systems instead of one. Your own site must itself keep persistent dataset addresses and schema.org markup, otherwise search engines will see only the core.

Another option is not to build a portal at all, but to assemble a national search engine over existing catalogs. This is what the Scottish Government did: instead of a common portal it built find.data.gov.scot, which harvests descriptions from dozens of local sources. The analysis is in the chapter [on search engines and aggregators](../03-types/09-search-engines-aggregators.md), and how harvesting works is in the chapter [on federation](../07-publishing/03-federation-and-harvesting.md).

## A contractor instead of a team

A government portal is often built not by its own team but by a contractor under a one-year contract. The risk of this model is that development ends along with the contract, and responsibility for quality gets blurred. Russia's data.gov.ru is a clear example.

- In 2020 the Ministry of Economic Development terminated a 21.8-million-rouble contract to maintain the portal: almost nothing in the specification had been delivered. The contractor was put on the register of unreliable suppliers. This was reported, citing the procurement system, by the Telegram channel "Akh, etot Minfin" in May 2020; the entries in the procurement system could not be checked from abroad in October 2026.
- In March 2023 the portal was closed "for review" to be moved to the "Gostech" platform. Work under the contract ran from August 2023 to December 2024 and cost 30.9 million roubles.
- The new version opened only on 15 July 2025, with 5,826 datasets compared with 26,490 in the last saved snapshot of the old version (February 2022). The old version was closed before the new one was ready, and for more than two years the country had no federal portal.

What follows for the client, whatever the country:

- the code, descriptions and files belong to the client, and a full dump of them is a mandatory deliverable of every stage;
- the old version keeps working until the new one is accepted; if a move is unavoidable, datasets are published as an archive and their addresses are kept;
- work is accepted against working features on the live site, not against a report;
- the portal has at least one person on the client's side who knows how it works and outlasts changes of contractor.

If there is no such person and there will not be, it is more honest to choose a cloud service or a ready platform with minimal customisation: the less of your own code, the less dependence on whoever wrote it.

## Example: your own data marketplace

The most common custom-build idea, one that fails not because of the code but because of the economics.

**Context.** An organisation buys data from several suppliers and wants to build a marketplace where suppliers list datasets and buyers find and pay for them. Ready-made open source catalog platforms do not accept payments.

**Options.** Your own marketplace. A cloud marketplace (AWS Data Exchange, Snowflake Marketplace), if the suppliers and buyers are already in that cloud. An open catalog of descriptions without payment: the contract and delivery go directly between the parties.

**Criteria.** Where suppliers and buyers will come from. Why the marketplace is better than a direct contract with the supplier. Who pays for promotion while the marketplace is empty.

**Decision.** An open catalog of descriptions, and a cloud marketplace for sales if one fits.

**Why.** Data marketplaces live where buyers already are: at cloud providers, at software vendors for traders, at a government that both promotes the marketplace and may be its regulator. An independent supplier showcase would have had to spend on promotion for years. Owners of valuable data are not looking for an intermediary, and buying data is rare and contract-based. Your own marketplace without a ready audience stays empty.

**Consequences.** No payment system of your own means no support for it. Descriptions are open, so buyers and search engines see that the data exists.

**When to review.** Suppliers and buyers have appeared who have agreed to work through you, and there is a budget for promotion.

## What it costs to leave

The cost of leaving is calculated before the contract is signed. Otherwise you learn it at the moment you already have to leave.

Add up four items:

1. **The dump.** All descriptions and all files, not a selection. Open source platforms and an honest cloud service have an API or a dump. If there is no dump, that is already the answer.
2. **Addresses.** A table of old and new addresses, and redirects. DOIs issued in advance reduce this item: the `doi.org` link moves together with the DataCite record.
3. **People and downtime.** Who moves things, how many weeks the catalog is read-only, who writes to users.
4. **Retraining publishers.** A new dataset form costs more than it seems from the specification.

A reference for comparison, not an estimate:

| Where you are leaving from | What is usually expensive |
|----------------|-------------------|
| Someone else's catalog or Zenodo | almost nothing to move, if you did not promise your own addresses |
| Static site | cheap: the files and pages are already yours |
| Cloud service | the dump and the change of addresses; read the contract before paying |
| Open source platform | your own extensions and your own field schema; the files themselves come out easily |
| Custom build | everything, if the author did not leave a dump and an address map |

Lock-in to a cloud service is visible in procurement too. In 2025 Grand Paris Seine Ouest signed a new contract to maintain its OpenDataSoft portal without a tender: the notice says only the vendor holds the rights to the product and its maintenance. This is legal and honestly recorded, but it means there is nobody left to negotiate the price with after implementation.

The closure of someone else's product hits everyone at once. Nesstar, which many microdata archives ran on, stopped being developed in 2015, and each archive moved its collections on its own; Canada's ODESI chose a new platform and started the move before the old one was switched off. The change of ownership of Socrata is the same class of risk for the cloud. A decision record for a cloud service without a paragraph on "how we will get the data out" is incomplete.

## Sources

- [Worked Examples](./08-worked-examples.md)
- Shares of custom-built catalogs: the dataportals-registry export, release 1.27.0 of 15 October 2026.
- I. Begtin, [On data markets and exchanges](https://begtin.substack.com/p/2da) (in Russian), September 2026: data marketplace models and why they rarely pay off
- Cloud service prices, checked 12 October 2026: [PortalJS pricing](https://www.portaljs.com/pricing); [ArcGIS Hub purchase options](https://www.esri.com/en-us/arcgis/products/arcgis-hub/purchase-options); TED, [notice 867108-2025](https://ted.europa.eu/en/notice/867108-2025/pdf): Grand Paris Seine Ouest and OpenDataSoft, 600,000 euros, without a tender due to exclusive rights; West of England Combined Authority, [Open Data Portal Contract](https://westofengland-ca.moderngov.co.uk/documents/s11428/Open%20Data%20Portal%20Contract.pdf), 2026; City of Austin, [Legislation Text 24-4611](https://services.austintexas.gov/edims/document.cfm?id=429255), 2024: Tyler Data & Insights
- I. Begtin, [the economics of open data portals](https://t.me/begtin/7483), Telegram (in Russian), 7 March 2026: a vendor overview; the prices given there were not confirmed by vendor sites and procurement, except for PortalJS
- The World Bank and the OECD: [Data360](https://data360.worldbank.org/) and [its API](https://data360api.worldbank.org/data360/indicators?datasetId=WB_WDI), [DataBank](https://databank.worldbank.org/), [the dataset catalog](https://datacatalog.worldbank.org/); [OECD Data Explorer](https://data-explorer.oecd.org/) and [the SIS-CC community](https://siscc.org/) that develops .Stat Suite; I. Begtin, [on Data360](https://t.me/begtin/7583), Telegram (in Russian), 15 May 2026
- Moldova: [geodata.gov.md](https://geodata.gov.md/), an interface on MapStore and GeoServer, checked 12 October 2026; [the national SDI geoportal](https://geoportalinds.gov.md/); I. Begtin, [on geodata.gov.md](https://t.me/begtin/5412), Telegram (in Russian), 7 February 2024
- A ready core and your own interface: [open.toronto.ca](https://open.toronto.ca/) and [its CKAN customisations](https://github.com/open-data-toronto/ckan-customization-open-data-toronto); [Indian Data Portal](https://indiadataportal.com/); [ckanext-canada](https://github.com/open-data/ckanext-canada): dataset counts and extensions from `status_show` and `package_search`, 12 October 2026; I. Begtin, Telegram (in Russian): [the Toronto portal](https://t.me/begtin/5203), 16 November 2023; [Indian Data Portal](https://t.me/begtin/6045), 20 September 2024; [CKAN as a data management system and PortalJS](https://t.me/begtin/4906), 26 May 2023
- data.gov.ru: "Esli byt tochnym" (To Be Precise), [The open data portal resumed work after a two-year break](https://tochno.st/materials/portal-otkrytyx-dannyx-vozobnovil-rabotu-posle-dvuxletnego-pereryva-80-datasetov-byli-vylozeny-do-2024-goda-i-s-tex-por-ne-obnovlialis) (in Russian), 16 July 2025: 30.9 million roubles, contract dates, number of datasets; Kommersant, [The Ministry of Economy is preparing to relaunch the data.gov.ru open data portal](https://www.kommersant.ru/doc/7869865) (in Russian), July 2025; GARANT.RU, [The open data portal started work after a major update](https://www.garant.ru/news/1830420/) (in Russian), 15 July 2025; "Akh, etot Minfin", [open data portal supplier added to the register of unreliable suppliers](https://t.me/begtin/1896) (in Russian; repost in the @begtin channel), 8 May 2020, and [on the contract to move the portal to Gostech](https://t.me/ahminfin/606) (in Russian), August 2023: 30.9 million roubles against a starting price of 50.7 million, termination of the 2019–2020 and 2020–2022 contracts; I. Begtin, [on the contract to move the portal](https://t.me/begtin/5076), Telegram (in Russian), 14 August 2023
