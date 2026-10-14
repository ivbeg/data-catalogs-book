import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const REGISTRY_DOCS = 'https://datenoio.github.io/dataportals-registry/docs';

const config: Config = {
  title: 'Каталоги данных',
  tagline:
    'Как устроены порталы открытых данных, геопорталы и репозитории — и как выбрать свой',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://ivbeg.github.io',
  baseUrl: '/data-catalogs-book/',
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
  themes: ['@docusaurus/theme-mermaid'],

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
          to: '/choice/route-map/',
          label: 'Маршрутная карта',
          position: 'left',
        },
        {
          href: 'https://github.com/datenoio/dataportals-registry',
          label: 'Реестр каталогов',
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
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} «Каталоги данных». Текст доступен по лицензии <a href="https://creativecommons.org/licenses/by/4.0/deed.ru">CC BY 4.0</a>.`,
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
