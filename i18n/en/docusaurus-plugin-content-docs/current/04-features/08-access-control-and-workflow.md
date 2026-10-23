---
title: Access Control, Roles and Publishing Workflow
description: Who publishes and who reviews, how roles, drafts and moderation work, how to open a description without opening the file, who can create an account, and how CKAN, Dataverse, InvenioRDM, DSpace, NADA, GeoNetwork, cloud services and publishing without a portal handle it.
---

# Access, Roles and Workflows

A catalog with one publisher lives without roles: there is a person who uploads files. An organisation's catalog becomes shared almost immediately. Then you need to agree who creates a dataset, who reviews it, who sees the file and who can create an account at all.

The practical conclusion of the chapter is this. Most government portals need two roles (administrator and organisation editor) and a draft that is not visible in search. Review before publication is needed when the publishers are people you do not trust to publish data straight away: external authors of a research repository, hundreds of municipalities, users of a hub. Restricted access is needed for personal, licensed and sensitive data, and the dataset description stays open even then. Open registration is needed only where outside people publish, and then with an invitation or a check, not for everyone. Reading descriptions and downloading open files should not require an account at all.

At the end of the chapter there is a measurement of 1,125 CKAN portals on 12 October 2026: how many have open registration, how many of them are already filled with spam accounts, and which login and access extensions are actually installed.

## What it is

The words "access and roles" hide five different questions. The re3data registry of research repositories separates at least three of them: who can enter the repository, who can download data and who can upload it. The answers do not have to match: in Zenodo any registered user can upload, while a restricted file can be downloaded only with the author's permission.

**Who publishes.** The publishing organisation, an editor, a curator, an administrator. A **role** is a set of permissions given to a person within an organisation or collection: "editor of organisation A" can edit A's datasets and cannot touch B's. Permissions are given to roles, not to individuals, so that a change of staff does not mean going through a hundred checkboxes.

**What happens before publication.** A **draft** is a dataset that has been created but is not visible in search or in the dump. **Moderation**, or review before publication, is a step at which another person (a curator, a moderator, an organisation administrator) looks at the dataset and releases it or returns it to the author. An **activity log** records who changed what in the description and when.

**Who sees the data.** An open file, a file after accepting terms, after registration, after an approved request, after an embargo date, only in a secure environment, or not at all, description only. You can restrict a whole record, only the files, or an individual file, and in cloud services even individual columns and rows of a table.

**How people log in.** Two terms here are often confused. **Authentication** is checking who you are: a password, a second factor, a government account. **Authorisation** is checking what you are allowed to do: a role, permissions on a dataset, an approved request. **Single sign-on** (SSO) moves authentication from the catalog to an external organisational system: an employee logs in with the same account as for email. Two standards are used for this. **SAML 2.0** is a 2005 OASIS standard on which university federations and enterprise user directories run. **OpenID Connect** is an identity layer on top of the OAuth 2.0 protocol; it is supported by Keycloak, cloud identity providers and many government login systems.

**Who can create an account.** Registration can be closed (accounts are created by an administrator or by email invitation), open with a check (an administrator approves the application, or only addresses from certain domains are allowed), open with a CAPTCHA, or open to all.

## Why it is needed

**So that agencies do not edit each other's data, and it is clear who is responsible.** When twenty organisations publish on a portal, each must see and change only its own datasets. A role also answers the user's question "who is responsible for this": a dataset shows an organisation and a contact, not just the site name. The publisher and organisation in the description are covered in the chapter ["Anatomy of a Catalog"](../01-basics/03-anatomy.md).

**So that an error is caught before publication.** A published dataset is picked up within hours by harvesters, search engines and web archives. A file with non-anonymised personal data published by mistake is then almost impossible to remove from all copies. A draft and a second look before publication are cheaper than dealing with a leak.

**To show data that cannot be opened.** Survey microdata, medical records and licensed databases cannot be made available to everyone, but people need to know they exist. In the EU this is already an obligation. Under the Data Governance Act (Regulation 2022/868, applicable since 24 September 2023), each country maintains a single information point with a list of protected public-sector data: format, size and conditions for reuse. The data itself is provided on request, including only in a secure processing environment. The countries' lists are collected by the European Register for Protected Data (ERPD) on data.europa.eu. The European Health Data Space Regulation (2025/327) requires health data access bodies to maintain an open machine-readable catalog of datasets with access conditions; this part applies from 26 March 2029.

**So that robots do not take over the portal.** Open registration on a public site is an invitation to spam. Robots create accounts and, in their name, create organisations, groups, datasets and data requests advertising casinos and fraudulent links. This is why registration on DataHub.io had to be closed in 2013; in 2021 demo.ckan.org was clogged with spam; and in 2025 the portal of Tunisia's meteorological service had more than 1.3 million accounts and more than 45 thousand spam texts in its data requests section. The CKAN developers therefore turned open registration off by default: in 2.9.8, and in the 2.10 line only from 2.10.4. In 2.10.0–2.10.3 it is open by default again. The measurement at the end of the chapter shows that the problem is not historical.

**To know the publisher.** On government portals publishers often log in through the government identity system, and this is not a formality: this way the portal knows on behalf of which agency a dataset was published. On data.gov.ru, under the 2024 guidelines, a provider (a public authority or local government) logs in through ESIA, the Russian government identity system; an administrator verifies its profile, only a verified provider can publish, and datasets go through moderation. On Norway's data.norge.no, descriptions are registered after logging in through the national ID-porten system and only with a role in the Altinn authorisation register. On data.gouv.fr, organisation staff log in through ProConnect, the government login for professionals built on OpenID Connect, alongside ordinary email registration.

The flip side is cost. Every role, review step and access type is a setting that has to be maintained, explained to new staff and checked when the platform is upgraded. Moderation that nobody has time for turns into a queue of a hundred datasets that do not come out for months.

## Implementation options

### Who publishes: five permission models

**No roles.** One person or one team with shared permissions. Static sites, Git repositories and small portals live this way. This is enough while one team publishes.

**Organisations with roles.** A dataset belongs to an organisation, and people in the organisation have roles. CKAN has three: a member sees the organisation's private datasets; an editor creates, edits and deletes datasets and switches them between public and private; an administrator also manages members. Above all of them is the sysadmin. udata, on which data.gouv.fr runs, has administrator and editor roles, and since version 15.4.0 (March 2026) also a partial editor. In Socrata, roles are given for the whole portal: administrator, publisher, editor, designer, viewer. This is the most common model on open data portals.

**Collections with inherited permissions.** Permissions are given on a collection and pass to everything inside. Dataverse (collections and the datasets in them), DSpace (communities, collections, items and files) and GeoNetwork work this way; in GeoNetwork each group has its own set of permissions on a record: view, download, show on the interactive map, edit, notifications. The model suits a university: a faculty is a collection, a department is a collection inside it.

**Communities with curators.** The author publishes on their own, and a community decides whether to include the record in its collection. InvenioRDM and Zenodo work this way: a community has an owner, managers, curators and readers, and a record enters the community after a curator's review.

**Permissions on an individual dataset.** Permissions are given not by organisation but per dataset: in Huwise (formerly OpenDataSoft), "view", "view and edit", "view, edit and publish" for a user or group; in ArcGIS Online, the access levels "owner only", groups, organisation and everyone. In CKAN a similar role is played by dataset collaborators: since version 2.9 an organisation administrator can give an individual member or editor permissions on one dataset. By default this feature is turned off.

The finer the permissions, the more expensive the maintenance. A matrix of twenty roles almost never pays off: a year later nobody remembers why it is set up that way, and permission errors are found through complaints.

### What happens before publication

**Immediate publication.** Save means publish. CKAN and DKAN 2.x work this way by default: a new dataset in DKAN immediately gets the "published" state unless the administrator has changed the setting. Fine if your own staff publish and an error can be fixed quickly.

**A draft.** The dataset is saved but not visible in search. In CKAN the multi-step creation form saves a dataset as a draft, and 2.12 added "Publish" and "Unpublish" buttons. In udata a draft is a private dataset; when working through the API, the private flag must be passed with every request, otherwise the dataset becomes public. In Huwise edits are saved separately and released by publishing again. A draft costs nothing and is needed by everyone except the simplest catalogs.

**A separate right to publish.** One person can prepare a dataset, another releases it. In Socrata an editor uploads data, but only an administrator, a publisher or the dataset owner publishes. In Huwise the rights "create datasets" and "edit all datasets" do not include the right to publish. This is not yet a review, but it is already a second person before a dataset goes out.

**Curator review.** The author submits a dataset for review, and a curator releases it or returns it with a comment. In Dataverse a contributor submits a dataset for review, and the collection curator publishes it or returns it to the author. In DSpace a collection can have a multi-step workflow: review, edit, final approval. In GeoNetwork 4.4 the workflow "draft → submitted → approved → retired" is enabled for the whole catalog or for individual groups, and editing an approved record creates a working copy that outsiders do not see until it is approved again. A GeoNetwork subtlety: by default, even with the workflow enabled, a record can be published without approval (the `allowPublishNonApprovedMd` parameter), and this has to be switched off separately. In Socrata, approval before publication is enabled in settings, automatic or manual. CKAN has no such step in the core, only extensions, covered below.

**An activity log.** Who changed what and when. In CKAN since version 2.10 the log has been moved to a separate `activity` module, which ships with CKAN but must be enabled. It stores a snapshot of a dataset on every edit and shows the difference between versions; by default outsiders do not see the details. In research repositories versions play the role of the log: editing a published dataset in Dataverse creates a new version, and the previous one remains. Versions are covered in the chapter ["Persistent Identifiers, DOIs and Versions"](./06-identifiers-and-doi.md).

Part of the review is better left to a program rather than a person: mandatory fields, a licence from a list, the file opens, the encoding is right. Then the curator looks at the content, not at typos. See the chapter ["Metadata Completeness and Depth"](./03-metadata-depth.md).

### Who sees the data: access levels

| Level | What the user does | Where it is found |
|---------|-------------------------|-----------------|
| Open | downloads without conditions | any catalog |
| Open after accepting terms | ticks "I agree" or fills in a short form | "direct access" in NADA, the guestbook in Dataverse, gated datasets with automatic approval on Hugging Face |
| After registration | logs in | public use files in NADA |
| On request | submits a request and waits for the owner's decision | Dataverse, InvenioRDM and Zenodo, DSpace (request a copy), Huwise, Hugging Face with manual approval, "licensed data" in NADA |
| Embargo | waits for the date after which the file opens | Dataverse, InvenioRDM and Zenodo, DSpace |
| Secure environment | works with data on someone else's server or in a special room, takes away only checked results | "data enclave" in NADA, trusted research environments, a Data Governance Act condition |
| Description only | learns that the data exists and whom to ask | "data not available" in NADA, the EU register of protected data |

How these levels work in microdata catalogs is covered in detail in the chapter [on microdata catalogs](../03-types/06-microdata-catalogs.md#access-levels).

Two clarifications. Registration is not yet restricted access. The EU Publications Office access-right vocabulary considers a dataset behind registration or an API key public, too, if anyone can get them. For open data in this book's sense, registration is already a barrier, but that is a separate discussion: see the glossary entry "Publicly available and open data". And "on request" without a response deadline and without conditions written in advance is not an access level but a refusal stretched out in time.

### Description open, file closed

Closing the description together with the file is a bad trade. A hidden dataset cannot be found or cited, and there is no one to send an access request to. The FAIR principles explicitly separate these things: a dataset with restricted files can be findable and accessible through a clear procedure if its description is open and it has a persistent identifier.

Platforms behave very differently here, and this is worth checking before choosing.

- **Can do it in the core:** Dataverse, InvenioRDM and Zenodo, DSpace, NADA: the description is open, the files are restricted, and the user sees how to get them. In GeoNetwork, download is a separate permission that can be withheld from guests; it protects files uploaded into GeoNetwork itself, but not external links. Huwise shows the dataset in the catalog to everyone, and the contents only to selected users and groups, with a "Request access" button; the button works only if marketplace mode is enabled on the portal.
- **Cannot:** in CKAN a private dataset is hidden entirely, together with its description. Only the ckanext-restricted extension lets you open the description and restrict an individual file. In Socrata a private dataset does not appear in the public catalog at all; you can only hide individual description fields of a public dataset.

For a restricted dataset to be found not only on the site, the access conditions must get into the metadata dump.

- **DCAT.** The `dct:accessRights` property with a value from the EU Publications Office vocabulary: PUBLIC, RESTRICTED, NON_PUBLIC (the vocabulary also has the refinements SENSITIVE and CONFIDENTIAL within NON_PUBLIC). In DCAT-AP 3.0.1 the property is optional, but the European Register for Protected Data requires it for every dataset and forbids the value "public", and in HealthDCAT-AP it is mandatory together with the health data access body.
- **DataCite and OpenAIRE.** A rights field with a value from the COAR vocabulary: open access, embargoed, restricted access, metadata only. This is how OpenAIRE and research data harvesters see the access mode.
- **schema.org.** The `isAccessibleForFree` property and the free-text `conditionsOfAccess`. Google Dataset Search reads the first and does not require the data to be open: it needs an open page with a description, without a login and without a robots block.

Export formats are covered in the chapter ["Metadata Export"](./02-metadata-export.md), and the licence alongside access conditions in the chapter ["Licences and Access Conditions"](../07-publishing/04-licenses-and-access.md).

How common restricted access is at all is shown by two large repositories. On 12 October 2026, of 726,858 datasets in Zenodo, 680,981 (94%) were open, 41,715 (5.7%) had restricted files, and 4,162 (0.6%) were under embargo. In Harvard Dataverse, of 5.55 million files, 76,579 (1.4%) were restricted and another 1,513 were under embargo. Restricted files are the exception even where they are easy to set up.

### How people log in

**A password on the portal.** Works everywhere and is fine for a small editorial team. The weak spot is passwords guessed by brute force. A second factor protects: a one-time code from an app. In CKAN it comes from the ckanext-security extension; in Huwise and ArcGIS Online it can be made mandatory in the settings. Thailand put two-factor login into its standard portal build: in the measurement, the `thaigdc2fa` extension is installed on 160 of 250 Thai CKAN servers.

**Single sign-on through the organisation's system.** The publisher logs in with an agency or university account via SAML or OpenID Connect. Needed when there are many publishers who come and go, and nobody is available to create and disable separate passwords for them. A departing employee loses access to the portal along with email. Dataverse, InvenioRDM, DSpace, GeoNetwork, Huwise, Socrata and ArcGIS Online have single sign-on in the core or in the service settings; CKAN only through extensions.

**A government login system.** ESIA in Russia, ID-porten in Norway, ProConnect in France. The portal gets a verified identity and organisation for the publisher but becomes tied to someone else's system: if it fails, no publisher can log in.

**A research account.** ORCID is a researcher identifier that research repositories also accept as a login method. Convenient for a repository to which authors come from different organisations.

**A key for programs.** Publishing through the API uses not a password but a key (token) issued for a program and revoked separately. CKAN has had tokens since version 2.9, and the shipped `expire_api_token` module limits their lifetime.

A login is needed by the publisher, not the reader. If a portal requires an account to view descriptions or download open files, this is no longer a security question but [a door closed to programs](../09-practices/02-anti-patterns.md#the-door-is-closed-to-programs).

### Who can create an account

| Option | How it works | When it fits |
|---------|--------------|---------------|
| Closed registration | accounts are created by an administrator or by an organisation administrator's email invitation | only staff of known organisations publish; the usual case for a government portal |
| Open with a check | an administrator approves the application, or registration is allowed only from the right domains | there are outside publishers, but not many |
| Open with a CAPTCHA | anyone can register; the CAPTCHA filters out simple robots | a research repository, a hub, a site with discussions, together with checks on what is published |
| Open to all | anyone registers and can publish immediately | almost never for a public catalog |

A spammer does not need to be able to publish datasets. Any place where text and a link appear on a public page is enough: a user profile, a new organisation or group, a data request, a comment. So what matters is not only registration but also what a new account can do. In CKAN any logged-in user can by default create groups and organisations (the `ckan.auth.user_create_groups` and `ckan.auth.user_create_organizations` parameters), and in the data requests extension create requests and comments without review. In ArcGIS Hub Premium, community accounts created through open registration get the publisher role by default. In Socrata, by contrast, a self-registered account gets no role on the portal.

A CAPTCHA helps but does not solve the problem. CKAN supports Google reCAPTCHA v2: at registration, and since version 2.11 also at login and password reset. Automatic content checking works better: udata flags suspicious datasets, organisations, profiles, reuses and discussions by a word list and sends them to a moderator.

## How common it is

According to registry export 1.27.0, restricted access to at least part of the data is recorded for 1,131 of 43,614 catalogs, or 2.6%. 537 of them have no open data at all; in 594 open and restricted data live side by side. The queries are in the [appendix](../12-appendices/02-using-the-registry.md#access-roles-and-workflows).

More interesting is which platforms these catalogs run on.

| Platform | Catalogs with restricted access | Total in the registry, all types | Share |
|-----------|-----------------------------------|-----------------|------|
| DHIS2 (a health information system) | 72 | 74 | 97% |
| Gen3 (a biomedical data platform) | 29 | 30 | 97% |
| Redivis (a research data platform) | 12 | 13 | 92% |
| NADA | 114 | 159 | 72% |
| Pure (a research information system) | 133 | 369 | 36% |
| InvenioRDM | 4 | 76 | 5% |
| Dataverse | 5 | 257 | 1.9% |
| DSpace | 10 | 830 | 1.2% |
| CKAN | 12 | 1,951 | 0.6% |
| GeoNetwork | 1 | 764 | 0.1% |

This counts all catalogs on a platform, whatever their type. The [platform profiles](../05-platforms/04-platform-profiles.md) show smaller numbers because they count only the main type: for example, CKAN has 1,951 catalogs in total and 1,906 open data portals, DSpace 830 and 829 research repositories, NADA 159 and 158 microdata catalogs.

Dataverse, DSpace and InvenioRDM can all restrict a file while keeping the description open in the core, but catalogs where restricted access is a noticeable part of the content are rare on them. Catalogs with restricted data run on platforms where restriction is the norm: health systems, biomedical platforms, microdata catalogs. The conclusion for choosing: if restricted access is the main task rather than a rare exception, look at platforms built for it, not at an open data portal with an extension. The mark in the registry refers to the catalog as a whole: Harvard Dataverse is open in the registry, although one and a half percent of its files are restricted.

## When it is needed and when not

| Situation | What is needed | What is not needed |
|----------|-----------|----------------|
| One team publishes its own data | a draft, closed registration | roles and moderation |
| An agency and its subordinate bodies; a regional portal with municipalities | organisations with administrator and editor roles, a draft, an activity log, closed registration with invitations | multi-step moderation: each organisation is responsible for its own data |
| A national portal harvesting descriptions from other catalogs | permissions only for its own editorial team; publishers work in their own catalogs | accounts for hundreds of publishers on the national portal |
| A university repository where staff upload | faculty collections, library curator review, university single sign-on, embargo | registration open to all |
| A general research repository or hub for outside authors | open registration with a CAPTCHA, community curators, spam checks on content, restricted files on request | manual approval of every account |
| A microdata catalog | several levels of file access, requests with a decision log, a description always open | closing the description together with the file |
| Protected public-sector data under the Data Governance Act | an open description with `dct:accessRights`, conditions and request procedure, a response deadline | storing the data itself in the catalog |
| A portal with discussions, data requests, reuses | moderation of user texts, restricted permissions for new accounts | open registration without content checks |

Roles are needed as soon as more than one team publishes. Moderation is needed if the circle of publishers is wider than the circle of those you trust to publish data straight away. Restricted access is needed for personal, licensed and sensitive data. It is not needed "to see who downloads": statistics are for that, not closing the file.

In brief, this is what a justification looks like using the [decision record](../06-choice/04-justifying-decisions.md) template:

- **Context.** A ministry portal on CKAN was upgraded from 2.8 to 2.11. Fourteen subordinate organisations publish, about 60 staff. Registration has been open since the early years; there are tens of thousands of accounts, and the user list and data requests section contain advertising. The ministry asks to "turn on moderation for all datasets".
- **Options.** Leave things as they are; close registration and invite publishers; install a review-before-publication extension; move login to the agency's single sign-on.
- **Criteria.** How many people publish and who is responsible for them; who will do moderation and how much time they have for it; compatibility of extensions with the core version; what the portal user will see.
- **Decision.** Close registration, close the user list (`ckan.auth.public_user_details = false`), delete spam accounts, forbid ordinary users from creating organisations and groups. Organisation administrators invite publishers. Roles are administrator and organisation editor; the draft and activity log are enabled. Do not introduce moderation of all datasets; moderate only the data requests section.
- **Why.** Staff of known organisations publish, and the organisation itself is responsible for the datasets. Moderating 14 organisations falls on one person in the ministry and will become a queue. The review-before-publication extension is tested only on 2.10 and 2.11, and when moving to 2.12 the portal would get an unnecessary obstacle.
- **When to revisit.** If outside organisations or citizens start publishing datasets, if errors in published datasets keep recurring, or if the number of publishers grows so much that nobody is available to create and disable them manually; then move to single sign-on.

## How it is done in platforms

The marks are core, extension, no, not checked, as in the [summary table](../12-appendices/03-platform-tables.md). Checked against documentation and repositories on 12 October 2026.

| Platform | Roles | Review before publication | Description open, file closed | Access requests, embargo | Single sign-on | Registration |
|-----------|------|----------------------------|-------------------------------|-------------------------|-------------|-------------|
| CKAN 2.12 | core: organisations, three roles, dataset collaborators | draft in the core; curator review is an extension | no: a private dataset is hidden entirely; the ckanext-restricted extension | extension (ckanext-restricted); no embargo | extension: SAML, OpenID Connect, LDAP | closed by default since 2.9.8 and 2.10.4; email invitation in the core |
| Dataverse | core: roles on collection and dataset, groups | core: submission for curator review | core | core: access requests, terms, guestbook, embargo | core: Shibboleth (SAML), OpenID Connect, ORCID | configurable |
| InvenioRDM, Zenodo | core: communities with owner, managers, curators | core: review on inclusion in a community | core: the whole record or only the files restricted | core: access requests, embargo | core: ORCID, OpenID Connect, SAML | open on Zenodo |
| DSpace 10.1 | core: groups, permissions on community, collection, item and file | core: configurable multi-step workflow | core | core: embargo, Request a Copy | core: Shibboleth, LDAP, ORCID, OpenID Connect | configurable |
| NADA | core | not checked | core: seven types of file access | core: requests for licensed data | not checked | open: needed for requests |
| GeoNetwork 4.4 | core: five roles in groups, group permissions on a record | core: draft, review, approval; by default approval can be bypassed | core: a separate permission to download uploaded files | no | core: LDAP, CAS, OpenID Connect, Keycloak, Shibboleth, EU Login | closed by default; can be enabled with a CAPTCHA and a domain list |
| udata (data.gouv.fr) | core: administrator, editor, partial editor | draft in the core; no curator review | not checked | not checked | ProConnect on OpenID Connect at data.gouv.fr | open; automatic spam flagging |
| DKAN 2.x | core: Drupal permissions | core: states "draft", "published", "hidden", "archived"; by default a dataset is published immediately | not checked | not checked | Drupal modules, not checked | not checked |
| Huwise (OpenDataSoft) | service core: dataset permissions for users and groups | a separate right to publish; no curator review | core: the dataset is visible in the catalog, the contents to selected users | core: access requests on portals with marketplace mode | core: SAML, OpenID Connect | closed, open, open with approval; CAPTCHA |
| Socrata (Tyler Data & Insights) | service core: five portal roles, three dataset roles | core: approval automatic or manual | no: a private dataset is not visible in the catalog | no | core: OpenID Connect, SAML through support | open, with no role on the portal |
| ArcGIS Online, Hub | service core: roles and item access levels | no | partly: a public item over a secured service requires a login | joining a group on request | core: SAML, OpenID Connect | open for the community on Hub Premium, publisher role by default |
| Hugging Face | core: organisation roles, resource groups on paid plans | discussions and pull requests | core: gated dataset | core: automatic or manual approval, a custom form | on Team and Enterprise plans: SAML, OpenID Connect | open |
| A static site, Git | repository permissions | a pull request with required review | no | no | GitHub or GitLab login | — |

### CKAN extensions and their risks

The CKAN core has no single sign-on, no review before publication, no per-file access and no spam protection beyond a CAPTCHA. All of this is covered by extensions, and this part of the ecosystem has the weakest maintenance. The method for evaluating an extension is in the chapter [on extension ecosystems](../05-platforms/02-extension-ecosystems.md); here is what turned up during the check.

| Task | Extension | Maintainer | Tests on CKAN versions | What is important to know |
|--------|------------|-----------|------------------------|-----------------|
| SAML login | [ckanext-saml2auth](https://github.com/keitaroinc/ckanext-saml2auth) | Keitaro | 2.10, 2.11 | last release December 2022; changes go to the main branch |
| SAML login | [ckanext-saml](https://github.com/DataShades/ckanext-saml) | Link Digital (DataShades) | no automated tests | the changelog mentions 2.12 support (June 2026) |
| OpenID Connect login | [ckanext-oidc-pkce](https://github.com/DataShades/ckanext-oidc-pkce) | Link Digital | 2.9, 2.10, 2.11 | by its description built for Okta and not tested with other providers |
| LDAP login | [ckanext-ldap](https://github.com/NaturalHistoryMuseum/ckanext-ldap) | Natural History Museum (London) | test images not updated since September 2023 | release 4.1.3 on 28 September 2026; 2.9 and 2.10 declared |
| Login protection: brute-force lockout, second factor, password rules | [ckanext-security](https://github.com/data-govt-nz/ckanext-security) | data.govt.nz (New Zealand) | no automated tests | version 4.2.0 of 5 October 2026 is for 2.11; needs a separate Redis; the second factor is on by default for everyone |
| Open description, restricted file, access request | [ckanext-restricted](https://github.com/EnviDat/ckanext-restricted) | EnviDat (Switzerland) | no working tests | compatibility declared up to 2.11; requires ckanext-scheming and two more extensions |
| Review before publication | [ckanext-approvalworkflow](https://github.com/keitaroinc/ckanext-approvalworkflow) | Keitaro | 2.10, 2.11 | release 2.0.0 in March 2026; enabled for the whole portal or for individual organisations; needs email |
| Configurable workflow with steps and approvals | [ckanext-workflow](https://github.com/DataShades/ckanext-workflow) | Link Digital | no automated tests | the new version was rewritten in summer 2026 and has not been released |
| Data requests | [ckanext-datarequests](https://github.com/qld-gov-au/ckanext-datarequests), the Queensland Government branch | Queensland Government | 2.10, 2.11, 2.12 | the original CoNWeT Lab repository was abandoned in 2019; no CAPTCHA or moderation queue, but requests can be limited to organisation members |
| CAPTCHA on any form | [ckanext-recaptcha](https://github.com/DataShades/ckanext-recaptcha) | Link Digital | 2.9 | the only extension found against spam beyond the core CAPTCHA |

Three practical conclusions follow from the table. A login extension is the riskiest at upgrade time: if it does not work on the new core version, no publisher can log in to the portal, so login is tested on a test instance before the move. Review before publication in CKAN is someone else's extension, and before requiring it, it is worth asking whether a draft and roles would do. CKAN handles a restricted file with an open description worse than research platforms: if this is the main task, choose a platform built for it.

## Publishing without a portal

Without a portal there are fewer roles and reviews, but they exist.

- **A Git repository.** Changes to data and descriptions arrive as a pull request (GitHub) or merge request (GitLab), and review can be made mandatory. In GitHub, branch protection requires approval before merging, and a `CODEOWNERS` file assigns required reviewers for folders: for example, the statistics department reviews everything in `statistics/`. On GitHub's free plan this works in public repositories. On GitLab's free plan approval is optional and does not block merging; mandatory approval rules and code owners are on paid plans. Git history also serves as the activity log. More in the chapter [on Git repositories](../08-beyond-portals/03-git-repositories.md).
- **A private repository** hides both data and description. If the data is restricted but needs to be described, the description goes into a public repository or onto a site, and the data where access can be configured.
- **Zenodo and Hugging Face** give "description open, file closed" without a portal of your own. In Zenodo a record's files are restricted and access requests are accepted; in Hugging Face a dataset is made gated with automatic or manual approval and a custom form.
- **A static site** has no built-in "on request": it is for publishing open data. For restricted data the site can honestly describe the dataset, the procedure and the response time for a request, and give an address to write to. In schema.org markup you then set `isAccessibleForFree` and describe the conditions in `conditionsOfAccess`. More in the chapter [on static sites](../08-beyond-portals/02-static-sites.md).

## How to check a live portal

A manual check takes fifteen minutes.

1. Open five datasets from different organisations. Each shows an organisation and a contact, not just the site name.
2. Open the portal without logging in. Descriptions can be read and open files downloaded. If the portal promises restricted data, its descriptions are visible too, while downloading is not, and next to it is written how to get access and how long the answer takes.
3. Find the metadata dump (DCAT, OAI-PMH) and see whether it includes access conditions: `dct:accessRights` in DCAT, the rights field in DataCite.
4. Open the registration page (`/user/register` on CKAN). It is either closed or leads to an invitation or a check.
5. Open the user list, the data requests section, comments. There is no advertising or fraudulent links there.
6. If you have a test editor account, check that only your organisation's datasets are visible and that a new dataset does not appear in search until it is published.

### Commands

For a CKAN portal. The core version and extensions related to login, access and moderation:

```bash
PORTAL=https://data.gov.kg
curl -s "$PORTAL/api/3/action/status_show" \
  | jq '{ckan_version: .result.ckan_version,
         access: [.result.extensions[] | select(test("saml|oidc|oauth|ldap|keycloak|sso|security|2fa|restricted|approval|workflow|datarequest|captcha"))]}'
```

Whether registration is open. When it is closed CKAN returns code 403; when open it shows a form with a password field:

```bash
curl -s -o /tmp/register.html -w "%{http_code}\n" "$PORTAL/user/register"
grep -c 'name="password1"' /tmp/register.html
```

Whether the user list is open and whether it contains obvious spam. A 403 response means the list is closed. The search word is common in the names of spam accounts:

```bash
curl -s "$PORTAL/api/3/action/user_list?q=gacor" | jq '.result | length'
```

For Zenodo and InvenioRDM, how many records are open, restricted and under embargo:

```bash
for s in open restricted embargoed; do
  curl -s "https://zenodo.org/api/records?q=access.status:$s&type=dataset&size=1" \
    | jq --arg s "$s" '{status: $s, records: .hits.total}'
done
```

For Dataverse, how many files are open, restricted and under embargo:

```bash
curl -s "https://dataverse.harvard.edu/api/search?q=*&type=file&per_page=0&show_facets=true" \
  | jq '.data.facets[0].fileAccess.labels'
```

Run checks slowly: one request at a time to a site, not dozens in parallel.

### Measurement on 1,125 CKAN portals

On 12 October 2026 all 1,839 active CKAN catalogs from registry release 1.27.0 were checked. The `status_show` service address answered for 1,136 of them, which is 1,125 distinct servers; the rest had closed it, hidden CKAN behind their own site or did not respond. For each server the core version and extensions were recorded, along with whether the registration form is open to an anonymous visitor, whether the user list is open, and how many accounts in it contain the word "gacor". This word comes from Indonesian online casino advertising and does not occur in the names of ordinary users.

**Registration is open on 123 servers out of 1,125, or 11%.** 29 of them have a CAPTCHA.

| CKAN version | Servers | With open registration |
|-------------|----------|-------------------------|
| older than 2.9 | 206 | 58 (28%) |
| 2.9 | 247 | 19 (8%) |
| 2.10 | 411 | 16 (4%) |
| 2.11 | 243 | 28 (12%) |
| 2.12 and later | 18 | 2 |

In older versions registration is open by default, and almost a third of installations older than 2.9 still run that way. Upgrading by itself does not help: on 2.11 registration is open on 12% of servers, meaning it was enabled deliberately or the setting was carried over during the upgrade. Among them is Kyrgyzstan's national portal data.gov.kg on CKAN 2.11.0.

**The user list is open on 547 servers, almost half.** In CKAN it is open by default (`ckan.auth.public_user_details`) even when registration is closed, and the documentation advises closing it together with registration.

**Spam is where registration is open.** Among the 547 servers with an open list, accounts with the word "gacor" were found on 38, 337 accounts in total. Of the 81 servers where both registration and the list are open, 31, or 38%, have spam. Of the 466 servers with closed registration, 7 do: these are traces of the time when registration was open. On the portal of Portugal's Ministry of Justice, dados.justica.gov.pt (CKAN 2.7.2), there are 91 such accounts. On data.gov.kg there are 19, with names like `agenslotgacorslotgacor`, created in 2026. One word gives a lower bound: spammers have many other names.

**Login and access extensions are installed on few portals.** On 1,125 servers: ckanext-security on 47, SAML login on 27, LDAP on 23, OAuth2 on 21, OpenID Connect with PKCE on 10, Keycloak on 7, ckanext-restricted restricted files on 13, data requests on 19, moderation on 3. Separately, two-factor login in the Thai standard build on 160 servers. The names in the `status_show` response are module names, not repositories, so one name can mean different branches of one extension. Of the 19 portals with data requests, 12 have open registration: exactly the combination on which spam grew on the Tunisian meteorological service portal.

What follows from the measurement. The first thing a CKAN portal owner should do is open their own `/user/register` page and user list without logging in. If registration is open and outside people do not publish, close it, and delete spam accounts together with their organisations, groups and requests. CKAN has the `ckan clean users` command for this, which deletes accounts with invalid avatar files; the rest has to be found by name and content.

## What follows from this

- Start with two roles (administrator and organisation editor) and a draft. Introduce moderation only when people you do not trust to publish data straight away are publishing, and when someone is available to do it.
- Keep the dataset description open at any level of file access. Write access conditions, procedure and response time on the dataset page and in the dump: `dct:accessRights` in DCAT, the access right from the COAR vocabulary in DataCite, `isAccessibleForFree` in schema.org.
- If restricted access is the catalog's main task, choose a platform where it is in the core: Dataverse, InvenioRDM, DSpace, NADA. In CKAN a private dataset is hidden together with its description, and a restricted file is someone else's extension.
- Close registration if outside people do not publish, and close the user list. If they do publish, you need an invitation or a check, a CAPTCHA and restricted permissions for new accounts. Check this on your portal today: one in nine CKAN portals is open for registration, and a third of those already have spam.
- Set up single sign-on when there are many publishers and nobody to create and disable them manually. In CKAN it is an extension: test it on a test instance before every core upgrade.
- A reader does not need an account. Descriptions and open files without a login, a key or a CAPTCHA.

## Sources

- re3data, [repository description schema 4.0](https://doi.org/10.48440/re3.014) and [XSD](https://schema.re3data.org/4-0/re3dataV4-0.xsd): access to the repository, to data and to upload as separate questions
- CKAN 2.12: [organisations, roles and collaborators](https://docs.ckan.org/en/2.12/maintaining/authorization.html), [configuration options](https://docs.ckan.org/en/2.12/maintaining/configuration.html): `ckan.auth.create_user_via_web`, `ckan.auth.public_user_details`, `ckan.auth.user_create_organizations`, `ckan.auth.allow_dataset_collaborators`, reCAPTCHA; [API and tokens](https://docs.ckan.org/en/2.12/api/index.html); [CKAN changelog](https://github.com/ckan/ckan/blob/master/CHANGELOG.rst) and [PR 7208](https://github.com/ckan/ckan/pull/7208): registration closed by default "so as not to open the site to spam"; the default value checked in the code of tags 2.9.7, 2.9.8, 2.10.3 and 2.10.4; source code of tag [ckan-2.12.0](https://github.com/ckan/ckan/tree/ckan-2.12.0): drafts, the `activity` module, `user_invite`, `expire_api_token`
- Spam on CKAN portals: [registration closed on DataHub.io](https://lists-archive.okfn.org/pipermail/ckan-dev/2013-May/028312.html), May 2013; [demo.ckan.org filled with spam](https://github.com/ckan/ckan/issues/5858), 2021; [the account clean-up command](https://github.com/ckan/ckan/pull/7241); I. Begtin, [on the price of openness](https://t.me/begtin/7254), Telegram (in Russian), 25 November 2025: the Tunisian meteorological service portal
- CKAN extensions: [ckanext-saml2auth](https://github.com/keitaroinc/ckanext-saml2auth), [ckanext-saml](https://github.com/DataShades/ckanext-saml), [ckanext-oidc-pkce](https://github.com/DataShades/ckanext-oidc-pkce), [ckanext-ldap](https://github.com/NaturalHistoryMuseum/ckanext-ldap), [ckanext-security](https://github.com/data-govt-nz/ckanext-security), [ckanext-restricted](https://github.com/EnviDat/ckanext-restricted), [ckanext-approvalworkflow](https://github.com/keitaroinc/ckanext-approvalworkflow), [ckanext-workflow](https://github.com/DataShades/ckanext-workflow), [ckanext-datarequests](https://github.com/qld-gov-au/ckanext-datarequests), [ckanext-recaptcha](https://github.com/DataShades/ckanext-recaptcha): automated test files, releases and change dates, checked 12 October 2026
- Dataverse: [roles and permissions](https://guides.dataverse.org/en/latest/user/dataverse-management.html), [restricted files, terms of access, guestbook, embargo, review before publication](https://guides.dataverse.org/en/latest/user/dataset-management.html), [login methods](https://guides.dataverse.org/en/latest/installation/config.html)
- InvenioRDM: [restricted records and access requests](https://inveniordm.docs.cern.ch/use/records/), [communities](https://inveniordm.docs.cern.ch/use/communities/); Zenodo: [access to records](https://help.zenodo.org/docs/deposit/manage-files/)
- DSpace (documentation for the 9.x line; the same mechanisms in 10.x): [item and file permissions](https://wiki.lyrasis.org/spaces/DSDOC9x/pages/379126414/Authorizations+Manage+access+to+an+item), [embargo](https://wiki.lyrasis.org/spaces/DSDOC9x/pages/379125850/Embargo), [authentication and authorisation](https://wiki.lyrasis.org/spaces/DSDOC9x/pages/379125842/Authentication+and+Authorization)
- [Data access types in NADA](https://ihsn.github.io/nada-documentation/admin-guide/content/data-access-types.html)
- GeoNetwork 4.4: [users and groups](https://docs.geonetwork-opensource.org/4.4/administrator-guide/managing-users-and-groups/), [record privileges](https://docs.geonetwork-opensource.org/4.4/user-guide/publishing/managing-privileges/), [record life cycle](https://docs.geonetwork-opensource.org/4.4/user-guide/workflow/life-cycle/), [self-registration](https://docs.geonetwork-opensource.org/4.4/administrator-guide/managing-users-and-groups/user-self-registration/), [authentication modes](https://docs.geonetwork-opensource.org/4.4/administrator-guide/managing-users-and-groups/authentication-mode/); default values in [data-db-default.sql](https://github.com/geonetwork/core-geonetwork/blob/main/web/src/main/webapp/WEB-INF/classes/setup/sql/data/data-db-default.sql)
- udata: [organisation roles](https://github.com/opendatateam/udata/blob/main/udata/core/organization/constants.py), [changelog](https://github.com/opendatateam/udata/blob/main/CHANGELOG.md) (the partial editor in 15.4.0), [spam flagging](https://github.com/opendatateam/udata/blob/main/udata/core/spam/models.py); data.gouv.fr: [publishing a dataset and drafts](https://guides.data.gouv.fr/jeux-de-donnees/publier-un-jeu-de-donnees), [user accounts and ProConnect](https://guides.data.gouv.fr/compte-utilisateur/creer-un-compte-utilisateur)
- DKAN: [the dkan_publishing workflow](https://github.com/GetDKAN/dkan/blob/2.x/modules/metastore/config/install/workflows.workflow.dkan_publishing.yml), [roles and permissions](https://dkan.readthedocs.io/en/latest/user-guide/guide_roles_permissions.html)
- Huwise (OpenDataSoft): [dataset permissions and access requests](https://userguide.huwise.com/en/articles/5868994), [portal security settings](https://userguide.huwise.com/en/articles/2043394), [workspace permissions](https://userguide.huwise.com/en/articles/2041602)
- Socrata (Tyler Data & Insights): [roles](https://support.socrata.com/hc/en-us/articles/202950278-Understanding-User-Roles), [approvals before publication](https://support.socrata.com/hc/en-us/articles/360021671013-Configuring-Approvals), [single sign-on](https://support.socrata.com/hc/en-us/articles/115008846527-Setting-Up-Single-Sign-On-SSO), [catalog and private datasets](https://support.socrata.com/hc/en-us/articles/218053527-Asset-List-and-Asset-Inventory-Dataset-Overview)
- ArcGIS: [item sharing levels](https://doc.arcgis.com/en/arcgis-online/share-maps/share-items.htm), [roles](https://doc.arcgis.com/en/arcgis-online/administer/member-roles.htm), [secured services](https://doc.arcgis.com/en/arcgis-online/manage-data/add-item-from-url.htm), [Hub Premium community accounts](https://doc.esri.com/en/arcgis-hub/latest/administer/configure-community-sign-in.html)
- Hugging Face: [gated datasets](https://huggingface.co/docs/hub/datasets-gated), [organisation roles](https://huggingface.co/docs/hub/organizations-security), [single sign-on](https://huggingface.co/docs/hub/security-sso)
- GitHub: [code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches); GitLab: [merge request approvals](https://docs.gitlab.com/user/project/merge_requests/approvals/)
- Access conditions in metadata: [DCAT 3](https://www.w3.org/TR/vocab-dcat-3/#license-rights), [DCAT-AP 3.0.1](https://semiceu.github.io/DCAT-AP/releases/3.0.1/), [the EU Publications Office access-right vocabulary](https://op.europa.eu/en/web/eu-vocabularies/concept-scheme/-/resource?uri=http://publications.europa.eu/resource/authority/access-right), [HealthDCAT-AP](https://data.health.europa.eu/healthdcat-ap/releases/release-8/), [the COAR access rights vocabulary](https://vocabularies.coar-repositories.org/access_rights/), [OpenAIRE guidelines](https://openaire-guidelines-for-literature-repository-managers.readthedocs.io/en/v4.0.0/field_accessrights.html), [schema.org conditionsOfAccess](https://schema.org/conditionsOfAccess), [dataset markup for Google](https://developers.google.com/search/docs/appearance/structured-data/dataset)
- The Data Governance Act, [Regulation (EU) 2022/868](https://eur-lex.europa.eu/eli/reg/2022/868/oj): Articles 5 and 8; [the European Register for Protected Data](https://data.europa.eu/data/datasets?locale=en&superCatalog=erpd) and [its harvesting requirements](https://data.europa.eu/sites/default/files/course/v1.3_ERPD_Technical%20recommendations%20for%20member%20states_Harvesting%20guidelines.pdf); the European Health Data Space, [Regulation (EU) 2025/327](https://eur-lex.europa.eu/eli/reg/2025/327/oj): Articles 77 and 105
- Publisher login: [guidelines on publishing open data, version 4.0](https://data.gov.ru/portal-back/api/v1/storage?id=2f13ba60-554a-4629-b1f2-59b8491c2dd5) (in Russian), December 2024; [publishing descriptions on data.norge.no](https://data.norge.no/en/docs/sharing-data/publishing-data-descriptions); [ProConnect](https://www.proconnect.gouv.fr/)
- Login standards: [SAML 2.0](https://docs.oasis-open.org/security/saml/v2.0/), [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html), [OAuth 2.0, RFC 6749](https://www.rfc-editor.org/rfc/rfc6749)
- Measurement on 12 October 2026: the search APIs of [Zenodo](https://zenodo.org/api/records) and [Harvard Dataverse](https://dataverse.harvard.edu/api/search); 1,839 active CKAN catalogs from registry release 1.27.0, the `status_show`, `/user/register` and `user_list` addresses
- The dataportals-registry export, release 1.27.0 of 15 October 2026: queries in the [appendix](../12-appendices/02-using-the-registry.md#access-roles-and-workflows)
- [Licences and Access Conditions](../07-publishing/04-licenses-and-access.md), [Microdata Catalogs](../03-types/06-microdata-catalogs.md), [CKAN: Core and Extensions](../05-platforms/03-ckan-and-extensions.md)
