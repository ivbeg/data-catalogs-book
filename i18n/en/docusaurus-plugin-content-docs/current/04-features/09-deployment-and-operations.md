---
title: Deployment Speed and Maintenance
description: How long it takes to launch a catalog and how much effort it takes to keep it alive for years.
---

# Deployment Speed and Maintenance

A fast launch and a cheap ten years are different answers, and they are recorded separately. Catalogs are shut down when there is nobody to update them, not when the platform is "bad".

The launch is visible in the first week: a page and the first dataset have appeared. Maintenance is visible three years later, when the project has ended but the catalog still has to open, accept edits and install security fixes.

## What exactly is assessed

Two quantities.

**Time to the first real dataset.** Not to a slide and not to the vendor's demo data. The dataset is yours: with a licence, a file and a description that gets into the dump.

**The cost of the next year.** Who upgrades the version, who checks extensions, who answers the "the link does not open" email, where the backups are, what happens if the subscription or the contractor runs out.

A platform with a short installation and expensive maintenance is fine for a pilot. A platform nobody is available to update is not fine for a catalog that must outlive a grant.

## Rough timelines

The timelines are orders of magnitude for a team that already knows how to administer servers. A pilot with ten datasets is shorter. A catalog with customisations and migration of old data is longer.

| Method | To the first dataset | Who updates afterwards |
|--------|-------------------|---------------------|
| Publishing in someone else's catalog | hours | your own descriptions and files; the server is someone else's |
| A static site or repository | hours or days | files and pages; a server is hardly needed |
| A cloud service | days | the provider; you pay the subscription |
| Open source software in a ready-made container | days or weeks | your own team: server, backups, version |
| Open source software with extensions and a custom schema | weeks or months | the same, plus checking every extension |
| A custom build | months | everything, including security and other people's formats |

The figures are not a contractor's promise. They are for comparing methods with each other, not for putting a deadline in an order.

## What eats time after launch

- **Security updates.** A platform that has not been updated for two years can no longer simply "bump the version": along the way the extensions, the schema and the way files are stored have changed.
- **Extensions.** Each is checked on the new core version. One abandoned extension keeps the whole portal on an old version. How to assess this is covered in the chapter [on extension ecosystems](../05-platforms/02-extension-ecosystems.md).
- **Backups and space.** Your own file storage grows unnoticed. A backup nobody has tried to restore does not count as a backup.
- **People.** You need at least one person who answers emails and releases updates. Without this even a successful launch turns into an abandoned site. What to do when a catalog is shut down after all is covered in the chapters [on the lifecycle](../09-practices/03-lifecycle.md) and [on archiving](../09-practices/04-archiving.md).

A fast launch matters more for a pilot and a one-off publication. A low maintenance cost matters more for a catalog that must live ten years. How to record such a choice is covered in the chapter ["Justifying a Decision"](../06-choice/04-justifying-decisions.md).

## What to choose when

| Situation | What matters more |
|----------|------------|
| Ten datasets must be shown by the end of the quarter, and a team is not promised for a year | someone else's catalog, a static site or the cloud |
| The catalog will be written into law or a multi-year grant, and there is an administrator post | an open source platform; launch time is secondary |
| Mandatory features exist only in extensions not tested on the current core | a different method: a cloud service where the feature is built in, or another platform |
| A contractor delivered the portal and leaves with the acceptance certificate | the contract includes a year of maintenance and a dump of all descriptions and files; otherwise the launch was someone else's |

## How it is done in platforms

Checked against platform documentation in October 2026. The timeline in a cell is the same order of magnitude as in the methods table, not a promise.

| Platform | To a pilot | How versions live | What to check before installing |
|-----------|-----------|------------------|----------------------------|
| CKAN | days or weeks: there is an official Docker setup | the latest minor version is fully supported (since August 2026, 2.12); the previous one gets bug and security fixes | every extension on this core version; see [CKAN: Core and Extensions](../05-platforms/03-ckan-and-extensions.md) |
| InvenioRDM | the first installation is heavier than a static site | one major version a year; fixes for at least a year and another six months after the next one. v14 came out on 7 August 2026, v13 is supported until 7 February 2027 | whether you can keep up with yearly upgrades |
| Dataverse | there are installation and upgrade instructions | since version 6.8 containers are considered ready for production; several application servers in containers are not supported | the DataCite agreement is separate from installation. The current release is 6.12.1; live sites lag behind |
| DSpace | like other research repositories | official upgrade instructions; the current release is 10.1, and the registry still shows 8.x and 9.x | for a library that already has DSpace, upgrading is cheaper than a new installation |
| GeoNetwork | official instructions, including Docker | country profiles are schema plugins, checked at upgrade | a map server is usually needed alongside: GeoNetwork describes a layer, the server serves it |
| Huwise, Socrata, ArcGIS Hub | days | the provider does the updates | how to take out all descriptions and files if the subscription ends |
| A static site | hours or days | nothing to crash in the usual sense | who will build the site when the only person who knew how leaves |

Research platforms are heavier to install than a static site, but DOIs, protocols and roles are already in the core. The cloud has a short launch time as long as the subscription and hosting location suit you. Leaving later costs as much as the dump and the address migration. The cost of leaving is analysed in the chapter [on build models](../06-choice/05-build-or-buy.md).

## How to assess before buying or installing

- Is there an official container and a short upgrade guide?
- How many recent versions are still supported, and how often do they come out?
- How many extensions are needed for mandatory features, and who releases them?
- Who will be on duty two years from now: your own staff post, a contractor or the service provider?
- Can all descriptions and all files be exported? If not, a short launch is paid for with an expensive exit.

If there is no answer to the question of who will be on duty, a simpler publishing method is usually more honest than a beautiful portal.

## How to check a live portal

Not every platform shows its version from outside. Where it does, compare it with the supported version, not with "the newest one in general".

In CKAN the version and the list of plugins are served by a service address:

```bash
curl -s "https://portal.example/api/3/action/status_show"
```

In the response look at `ckan_version` and `extensions`. A version two generations older than the supported one is a reason to ask who updated the portal and when. An extension in the list that is not in your matrix is a reason to ask why it is installed.

A cloud service often has no version visible from outside. Then check something else: whether the full metadata dump opens and whether a file can be downloaded without logging in. That is exactly what you will take with you.

A footer date of "updated in 2019" on a live site means little by itself: footers get forgotten. The date of the most recently changed dataset and the age of the version say more.

## Sources

- [Installing CKAN with Docker](https://docs.ckan.org/en/2.12/maintaining/installing/install-from-docker-compose.html), [upgrading CKAN](https://docs.ckan.org/en/2.12/maintaining/upgrading/index.html), [CKAN release support policy](https://docs.ckan.org/en/2.12/maintaining/releases.html)
- [InvenioRDM maintenance policy](https://inveniordm.docs.cern.ch/releases/maintenance-policy/): v13 and v14 support periods, checked 11 October 2026
- [Installing Dataverse](https://guides.dataverse.org/en/latest/installation/), [upgrading](https://guides.dataverse.org/en/latest/installation/upgrading.html), [containers in production](https://guides.dataverse.org/en/latest/container/running/production.html)
- [Installing GeoNetwork](https://docs.geonetwork-opensource.org/latest/install-guide/), [with Docker](https://docs.geonetwork-opensource.org/latest/install-guide/installing-with-docker/)
- [Extension Ecosystems](../05-platforms/02-extension-ecosystems.md)
- [Build, Open Source or SaaS](../06-choice/05-build-or-buy.md)
