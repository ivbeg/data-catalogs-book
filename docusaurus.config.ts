import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const REGISTRY_DOCS = 'https://datenoio.github.io/dataportals-registry/docs';
// Поисковик по наборам данных, для которого создавался реестр: он индексирует порталы по описаниям из реестра.
const DATENO_URL = 'https://dateno.io/';
// Год текущей редакции книги: в строке © подвала, не год сборки.
const EDITION_YEAR = 2026;

const config: Config = {
  title: 'Каталоги данных',
  tagline:
    'Как устроены порталы открытых данных, геопорталы и репозитории — и как выбрать свой',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  // Сайт книги живёт на поддомене личного сайта автора: static/CNAME, DNS — CNAME на ivbeg.github.io.
  url: 'https://datacatalogs.begtin.tech',
  baseUrl: '/',
  organizationName: 'ivbeg',
  projectName: 'data-catalogs-book',
  trailingSlash: true,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['ru', 'en'],
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/publishing/access-interfaces',
            to: '/features/access-interfaces',
          },
          {
            from: '/publishing/identifiers-and-persistence',
            to: '/features/identifiers-and-doi',
          },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: 'Каталоги данных',
      logo: {
        alt: 'Каталоги данных',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'bookSidebar',
          position: 'left',
          label: 'Книга',
        },
        {
          to: '/#с-чего-начать',
          label: 'С чего начать',
          position: 'left',
          // Ссылка на раздел главной: без этого Docusaurus считает её активной на любой странице,
          // потому что путь «/» — префикс всех адресов книги. Пустой путь не встречается, подсветки нет.
          activeBaseRegex: '^$',
        },
        {
          to: '/choice/route-map/',
          label: 'Маршрутная карта',
          position: 'left',
        },
        {
          to: '/appendices/checklists/',
          label: 'Чек-листы',
          position: 'left',
          // На экранах 997–1299 px пункт скрыт, чтобы меню поместилось (src/css/custom.css).
          className: 'navbar-item--wide-only',
        },
        {
          to: '/appendices/glossary/',
          label: 'Глоссарий',
          position: 'left',
          className: 'navbar-item--wide-only',
        },
        {
          href: 'https://github.com/datenoio/dataportals-registry',
          label: 'Реестр каталогов',
          position: 'right',
        },
        {
          href: DATENO_URL,
          label: 'Поиск Dateno',
          title: 'Dateno — поисковик по наборам данных, который индексирует порталы по описаниям из реестра',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Книга',
          items: [
            {label: 'О книге', to: '/'},
            {label: 'Типы каталогов', to: '/types/classification/'},
            {label: 'Возможности каталогов', to: '/features/capability-map/'},
            {label: 'Маршрутная карта выбора', to: '/choice/route-map/'},
            {label: 'Публикация без портала', to: '/beyond-portals/when-portal-not-needed/'},
            {label: 'Качество каталогов', to: '/quality/quality-levels/'},
            {label: 'Об авторе', to: '/about-the-author/'},
            {label: 'Сайт автора', href: 'https://begtin.tech/ru/'},
          ],
        },
        {
          title: 'Справочник',
          items: [
            {label: 'Глоссарий', to: '/appendices/glossary/'},
            {label: 'Чек-листы', to: '/appendices/checklists/'},
            {label: 'Таблицы платформ', to: '/appendices/platform-tables/'},
            {label: 'Шаблоны файлов', to: 'pathname:///templates/README.md'},
            {label: 'Как цитировать книгу', to: '/#об-издании'},
          ],
        },
        {
          title: 'Реестр каталогов данных',
          items: [
            {
              label: 'dataportals-registry на GitHub',
              href: 'https://github.com/datenoio/dataportals-registry',
            },
            {label: 'Документация реестра', href: `${REGISTRY_DOCS}/getting-started/`},
            {label: 'Типы каталогов в реестре', href: `${REGISTRY_DOCS}/catalog-types/`},
            {label: 'Поиск данных Dateno', href: DATENO_URL},
          ],
        },
      ],
      copyright: `© ${EDITION_YEAR} Иван Бегтин, «Каталоги данных», редакция октября ${EDITION_YEAR} года. Текст доступен по лицензии <a href="https://creativecommons.org/licenses/by/4.0/deed.ru">CC BY 4.0</a>.`,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash', 'yaml', 'sql', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
