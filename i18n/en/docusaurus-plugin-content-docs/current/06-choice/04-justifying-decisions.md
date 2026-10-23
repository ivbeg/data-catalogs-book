---
title: Justifying a Decision
description: How to record a fork in the road (a platform, an extension or a rejected feature) so that years later it is clear why that choice was made and which event reopens it.
---

# Justifying a Decision

A catalog lives longer than the people who chose it. A decision record is one or two pages about one fork in the road: what the surroundings were, which options were really considered, which criteria they were compared on, what was chosen, why the choice beats the rest, what it will cost and which event reopens the choice. From it, the next employee sees which obligation the platform covers.

Without a record they have two blind moves. The first is not to touch the platform, because it is unclear what will break. The second is to replace it and drop an obligation they did not know about: the dump the national portal harvests, or the login staff use to publish.

In brief:

- A record is written for a fork in the road, not for every item of the specification and not for the colour of the theme.
- A requirement says what is needed. A record says which approach was chosen and why the others were rejected.
- In the "why" section, each rejected option loses on a named criterion. "Popular" and "best" are not such criteria.
- Rejecting a feature that someone has already asked for is recorded in the same kind of record as choosing a platform.
- "When to review" is an event the organisation will notice. A calendar date is not such an event.
- An empty "why" cell when the others are filled means the decision has not yet been made.
- A superseded record is not deleted: it is marked "superseded" and links to the new one.

## Requirement and record

In the chapter [on selecting features](./02-feature-selection.md), a list of tasks turns into requirements. A good requirement says what is needed and can be checked: "the national portal harvests descriptions in the DCAT-AP profile". A platform or extension name in a requirement is already a decision, made at the next step.

The record is that step. To the same requirement it answers: "we install ckanext-dcat with the DCAT-AP 3 profile and do not write our own export". The full record on the dump is in the chapter [on metadata export](../04-features/02-metadata-export.md). Chains from task to platform are in the [worked examples](./08-worked-examples.md).

One requirement can give several records: a platform, an extension, a rejection of a neighbouring feature. One record can close several requirements if one choice covers them. How one record ends often becomes the context of the next: CKAN was chosen, and now there is a separate decision on which extension covers login.

## Which forks it is written for

| Fork | Why a record | Where it is analysed |
|----------|----------------|---------------|
| Build approach: your own portal, someone else's catalog, a static site, a custom build | there are several approaches, and a mistake is expensive | [a municipality](./08-worked-examples.md), [an agency with twenty datasets](../08-beyond-portals/01-when-portal-not-needed.md#example-an-agency-with-twenty-datasets), [a quarterly table](../08-beyond-portals/03-git-repositories.md#example-a-quarterly-table-for-two), [the main address on your own page](../08-beyond-portals/05-making-it-findable.md#example-the-primary-address-on-your-own-page), [an image archive](../08-beyond-portals/04-cloud-storage-and-hubs.md#example-an-image-archive-without-a-portal-of-its-own), [a catalog run by two people](../08-beyond-portals/02-static-sites.md#example-a-catalog-run-by-two-people) |
| Platform | more than one on the shortlist | [a region and a university](./08-worked-examples.md) |
| An extension without which a mandatory feature does not work | the feature is not in the core | [DCAT dump](../04-features/02-metadata-export.md) |
| Rejecting a feature someone already asked for | otherwise in a year it will be installed as a forgotten one | [rejecting DOIs](#example-rejecting-dois), [a city copies a large portal](../04-features/10-other-capabilities.md#example-a-city-copies-a-large-portal) |
| A core upgrade when an extension is not checked on the new version | publishers' login and security fixes are at stake | [core upgrade](#example-a-core-upgrade) |
| Custom build | no ready platform covers a mandatory feature | [your own data marketplace](./05-build-or-buy.md#example-your-own-data-marketplace) |
| Two catalogs instead of one | two tasks do not live well in one program | [a statistical office](./08-worked-examples.md), [a region with maps](../03-types/11-comparison-and-hybrids.md) |
| Which quality level to fix first | otherwise the editors fill in pages for empty files | ["raise quality"](../10-quality/01-quality-levels.md#example-an-agency-was-told-to-raise-quality) |
| How to publish: a form, a script or a file for a harvester | the catalog lags behind the system where the data already lives | [datasets already sit in a system](../07-publishing/01-publishing-process.md#example-datasets-already-sit-in-a-system) |
| Which licence to put in the field | your own text and a well-known licence conflict, or a closed file is marked open | [your own text or a well-known licence](../07-publishing/04-licenses-and-access.md#example-your-own-text-or-a-well-known-licence) |

Small things do not need a record: the theme, colours, button labels. Nor do the items of the minimum that nobody argued against: a persistent address and the very habit of putting a licence on a dataset. A record appears when someone proposes doing without them or replacing a well-known licence with your own text.

A city often needs just one record. A region needs records on the platform, on the set of extensions and on rejections. Twenty records before launch mean that settings got into them.

## Template

The technique comes from software development. In 2011 Michael Nygard described a short decision record: context, the decision itself, consequences, including unpleasant ones, and a note if the decision was later superseded. The record is written for a person who comes later, one or two pages long, and kept next to what it is about. A superseded one is not erased.

For a catalog, a comparison and a review condition are added. The comparison is needed because the choice is between products: without rejected options the "why" section has nothing to apply to. The review condition is named in advance, because the trigger usually comes from outside (the country's profile, a grant or a core version changes), and waiting until someone notices in hindsight is too late.

| Section | What to write |
|--------|------------|
| Context | facts that pull in different directions: a task, a constraint, a system already in place |
| Options | two to four options that were really considered |
| Criteria | what they were compared on, and which criterion matters more if they conflict |
| Decision | what was chosen, in one sentence, with the names of the platform and extensions |
| Why | which criterion each rejected option lost on |
| Consequences | what we get and what we pay |
| When to review | the event after which the record is reopened |

In the chapters on capabilities the records are sometimes shorter: the surrounding text has already named the price. A record kept next to a contract includes all seven sections.

### What a verifiable section sounds like

The same choice: a dump for the national portal. On the left, a wording against which nothing can be checked. On the right, one that can be checked against a document, a validator or the extension's repository.

<div className="wide-table">

| Section | What people usually write | What can be checked |
|--------|------------------|---------------------|
| Context | We want a modern portal | The region is already on CKAN. The national portal harvests descriptions in DCAT-AP. There is no team of our own, there is a contractor |
| Options | Consider the best solutions | ckanext-dcat; our own export by the contractor; a manual dump once a quarter |
| Criteria | Popularity, convenience, price | The file matches the profile the national portal expects. Who fixes the export when the profile changes. Whether CKAN can be upgraded |
| Decision | A reliable open platform | ckanext-dcat with the DCAT-AP profile |
| Why | CKAN is popular | The extension is maintained by the CKAN community and already supports this profile. Our own export would become one more program on the contractor's books. A manual dump would fall behind in the first month |
| Consequences | The portal will get better | At every CKAN upgrade the contractor checks the extension. The CKAN core has no such dump, and this is a standard setup |
| When to review | In five years or when needed | The national portal changes its profile, or the extension stops being released for a new CKAN version |

</div>

Popularity sometimes hides a real criterion: "there are contractors in the country who already maintain the current version of CKAN and ckanext-dcat". Then that sentence goes into the record. The word "popular" on its own cannot be checked against anything.

Context is written as facts, without judgement. "The contractor can write an export, and the export will remain their program" is a fact. "Our own export is a bad idea" is a conclusion, and it belongs in the "why" section.

Options are named concretely: the name of an extension, someone else's catalog, a static site with a `data.json` file. "A simpler path" is not an option. A weak move that nobody proposed, inserted to make the winner look obvious, spoils the record: the next reader cannot tell it from a real rejection. If only one option was looked at, write that. The record then shows there was no comparison, and that too is a useful record.

Three criteria are enough. Each can be checked: the file passes the profile validator, the contractor is named, the extension's documentation lists core versions. If the criteria conflict, write which one you will not give up. For a region, matching the country's profile matters more than a pretty showcase.

The decision is one sentence with names. "CKAN with ckanext-dcat" is a decision. "A modern open platform" is a wish.

The "why" section compares. Each rejected option gets a sentence on which criterion it lost. Praise for the chosen option without that sentence repeats the decision in other words. An empty cell when the others are filled means the choice has not yet been made.

Consequences name the price: an extension checked at every upgrade; a second system at the library; the city's dependence on the regional portal; there will be no separate domain with a showcase. A section with only benefits advertises the decision. This is also where you write that the feature is not in the core. Otherwise the next employee will take the extension for something unfinished.

"When to review" is an event that will be noticed without rereading the justification. The national portal changed its profile. The extension was not released for a new core version. The number of datasets exceeded a figure named in advance. A maintenance position appeared. A grant required DOIs. Next to it, in one sentence, what is done then, if it is already clear: "we close our own CKAN and move the addresses". If the move is not yet clear, the record says to reopen the question. A new decision is a new record, not a retroactive edit.

"In five years", "when needed", "when technology changes" and "at the next procurement" are not events: nobody will notice them on the day. A calendar date is appropriate when it stands in someone else's document, and then the record names that document.

## Example: rejecting DOIs

This is the record for the "DOI: not needed" row in the requirements table of the [environmental agency](./02-feature-selection.md#what-comes-out). It is a model of the record, not an answer for every portal.

**Context.** The agency publishes hourly air quality measurements and emission permits. The boundaries of protected areas already sit on the regional geoportal. The national portal harvests descriptions in DCAT-AP. A researcher asks for DOIs "like research portals have". There is no agreement with DataCite. The portal is expected to run on CKAN.

**Options.** Issue a DOI for every dataset with the ckanext-doi extension. Issue a DOI only for a validated annual archive, if one starts being published, through Zenodo or the library. Make do with a persistent address for the dataset and the file.

**Criteria.** Whether the citation promise matches how the data changes. Whether the extension has been tested on the CKAN version that will be installed. Whether the agency needs an agreement with DataCite.

**Decision.** Do not issue DOIs. The dataset and the file have a persistent address and an update date.

**Why.** The measurements change every hour. A DOI promises a fixed state but would open today's data. ckanext-doi has not been tested on CKAN 2.11 and 2.12, as recorded in the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md). The agency does not need a DataCite agreement for operational series. An annual archive for articles is a different publication, in a research repository, and it will get a separate record when the archive appears.

**Consequences.** There is no DOI button on the portal. The researcher's email is answered with a persistent address and the date of the dump. The reply says plainly that this portal does not issue DOIs.

**When to review.** The agency starts releasing a validated annual archive that articles cite. Then it is decided where the archive gets its DOI, and it is not quietly switched on on this portal.

## Example: a core upgrade

A record for a situation from the chapter [on CKAN](../05-platforms/03-ckan-and-extensions.md): a new core version has come out, and the extension without which the portal does not let publishers in has not been checked on it. The facts about the extensions were checked on 13 October 2026. This is a model of the record, not a prescription for every ministry.

**Context.** A ministry portal on CKAN 2.11. Staff log in with their agency account through ckanext-saml2auth. The extension's latest release is 1.3.0 of 14 December 2022, which declares support for CKAN 2.10. Automated tests run on 2.10 and 2.11, not on 2.12. CKAN 2.12 came out on 26 August 2026, and the project calls it the last release of the 2.x line. Version 2.11 still gets bug and security fixes. When newer releases become the supported pair, 2.11 will lose these fixes. The contractor proposes upgrading.

**Options.** Stay on 2.11 until ckanext-saml2auth is checked on 2.12. Move to 2.12, checking login on a test instance first. Switch to the ckanext-saml extension: release 0.4.1 of 2 June 2026 includes a fix for the SQLAlchemy changes in CKAN 2.12; the extension has no automated tests.

**Criteria.** Publishers can log in on the day of the move. The portal is not left without security fixes for an indefinite period. Testing happens on a test instance, not on the production site.

**Decision.** The contractor sets up a CKAN 2.12 test instance with the current ckanext-saml2auth and checks a staff login. If login works, the production portal is moved. If not, ckanext-saml 0.4.1 is tried on the same instance. While neither option passes login, the production portal stays on 2.11.

**Why.** A line in a changelog does not replace a staff login: ckanext-saml fixed one incompatibility and shows no tests on 2.12. Staying on 2.11 indefinitely means missing security fixes once 2.11 drops out of the supported pair. Switching extensions on upgrade day without a test instance leaves the portal without publishers.

**Consequences.** The upgrade work includes a test instance. The record names the address of the repository being installed: ckanext-saml and ckanext-saml2auth have different teams and different evidence. If neither lets anyone in on the test instance, the upgrade is not quietly postponed: a new record on how to replace login is opened at once.

**When to review.** Login passed on the test instance: this record is marked superseded, and the new one records the move and which extension stayed. Neither extension lets anyone in: a new record on replacing login and on how much longer the portal can live on 2.11. A version came out after which 2.11 no longer gets security fixes: staying on it is not an option, even if the test instance is not ready, and for that period the portal is closed to writing.

## If an extension stops being released

This fork is recorded on the day the extension is installed, not on the day it goes silent. The "when to review" section or the consequences name one of three moves:

- stay on the last core version the extension was checked on, and write until which event this is tolerable: usually while that core version gets security fixes;
- replace the extension with another one, named in advance, and test the replacement on a test instance before the move;
- drop the feature, if it was desirable, and record the rejection in a separate record.

The move is chosen by whether the feature is mandatory. A dump harvested by the national portal cannot be dropped: a replacement is sought, or the portal stays on the old core while that is safe. A citation button can be dropped: the persistent address and access date remain. How to evaluate the extension itself is in the chapter [on ecosystems](../05-platforms/02-extension-ecosystems.md).

## Where the record lives and who writes it

The record is written by whoever makes the choice, before the contract is signed or before installation. A record written after launch usually defends what has already been done.

It is kept next to the specification, in the same folder. If the portal configuration lives in a repository, the records go there too. One file per decision, numbered in order, numbers never reused. At the top: the date, the status and the author's role, e.g. "accepted, October 2026, portal owner". There are three statuses: proposed, accepted, superseded. A superseded one gives the number of the record that replaced it.

No committee is needed for this. What is needed is one page that a person will open three years later.

## How to check your record

- [ ] The record covers one fork.
- [ ] The context has an obligation or task and a constraint: a team, a contractor, a system already in place.
- [ ] There are two to four options, each named concretely, and they are the options that were considered.
- [ ] The criteria can be checked, and it says which matters more if they conflict.
- [ ] The "why" section says which criterion each rejected option lost on.
- [ ] The consequences include a price, not only a benefit.
- [ ] "When to review" is an event. It makes clear what to do next, or says a new record will be opened.
- [ ] Rejecting a feature someone already asked for is recorded separately.
- [ ] For an extension without which a mandatory feature does not work, it says what to do if it stops being released.
- [ ] The record has a date, a number and a status. A superseded one stays in the folder.

## Common mistakes

- **One record for the whole procurement.** The platform, the header colour, DOIs and the contractor in one text. A year later one thing cannot be replaced without rewriting everything. Forks are separated.
- **Criteria from a brochure.** "Convenient, modern, scalable" is met by any participant in the comparison. A criterion is tied to your task: the profile the national portal expects, staff login, who fixes the extension.
- **Someone else's record.** The neighbours chose CKAN with three extensions because they harvest a hundred municipalities. For a city with thirty datasets that is someone else's obligation and someone else's price.
- **An option for show.** A deliberately weak move that nobody proposed is added to the list. The real rejected options disappear from the record.
- **Consequences only about benefits.** The price is discovered at the first core upgrade.
- **A date instead of an event.** "Return in 2031" does not say what changed. A calendar date is appropriate as the deadline of someone else's obligation, and then the record names the document.
- **A record after the fact.** It is written to justify a contract already signed. The options are chosen to fit the winner.
- **The old record was deleted.** A new employee sees the current portal and does not see which obligation was dropped in the replacement.

## Sources

- Michael Nygard, [Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions), 15 November 2011: a short decision record with context, decision and consequences, including unpleasant ones; a superseded record is kept and marked.
- [Selecting Features](./02-feature-selection.md): how a requirement differs from a decision.
- [From Features to a Platform](./03-from-features-to-platform.md), [worked examples](./08-worked-examples.md), [build, open source or SaaS](./05-build-or-buy.md).
- [Metadata Export](../04-features/02-metadata-export.md): the record on the DCAT dump.
- [CKAN: Core and Extensions](../05-platforms/03-ckan-and-extensions.md): core versions and ckanext-doi; [access, roles and workflows](../04-features/08-access-control-and-workflow.md): login extensions.
- [ckanext-dcat](https://docs.ckan.org/projects/ckanext-dcat/en/latest/).
- [ckanext-saml2auth release 1.3.0](https://github.com/keitaroinc/ckanext-saml2auth/releases/tag/v1.3.0) of 14 December 2022; [ckanext-saml changelog](https://github.com/DataShades/ckanext-saml/blob/master/CHANGELOG.md), release 0.4.1 of 2 June 2026. Checked 13 October 2026.
- [CKAN release policy](https://docs.ckan.org/en/2.12/maintaining/releases.html); [CKAN 2.12 announcement](https://ckan.org/blog/ckan-2-12-released) of 26 August 2026: 2.12 is called the last release of the 2.x line.
- [Extension Ecosystems](../05-platforms/02-extension-ecosystems.md): how to evaluate an extension before writing it into a record.
