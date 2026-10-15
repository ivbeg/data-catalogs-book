export type QuestionId =
  | 'content'
  | 'owner'
  | 'obligations'
  | 'capabilities'
  | 'access'
  | 'resources'
  | 'existing'
  | 'scale';

export type Answers = Partial<Record<QuestionId, string[]>>;

export interface Option {
  id: string;
  label: string;
  hint?: string;
}

export interface Question {
  id: QuestionId;
  title: string;
  help?: string;
  multiple?: boolean;
  /** Option that clears all others when selected in a multiple-choice question. */
  exclusive?: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 'content',
    title: 'Что главное в данных, которые вы будете публиковать?',
    help: 'Выберите основной продукт. Если данных несколько видов, выберите тот, ради которого создаётся каталог.',
    options: [
      {id: 'opendata', label: 'Таблицы, файлы, реестры, ссылки на API', hint: 'бюджеты, транспорт, реестры организаций'},
      {id: 'geo', label: 'Слои карт и картографические сервисы', hint: 'кадастр, планирование, снимки'},
      {id: 'scientific', label: 'Результаты исследований, которые нужно цитировать', hint: 'данные к статьям, наблюдения'},
      {id: 'indicators', label: 'Статистические показатели и временные ряды', hint: 'таблицы с разрезами по времени и территории'},
      {id: 'microdata', label: 'Обезличенные данные переписей и обследований', hint: 'записи о респондентах'},
      {id: 'ml', label: 'Датасеты и модели для машинного обучения'},
      {id: 'metadata', label: 'Только описания чужих данных или каталогов', hint: 'агрегатор, реестр, федеративный поиск'},
    ],
  },
  {
    id: 'owner',
    title: 'Кто владелец каталога?',
    options: [
      {id: 'national', label: 'Центральный орган власти'},
      {id: 'regional', label: 'Региональный орган власти'},
      {id: 'municipal', label: 'Муниципалитет'},
      {id: 'nso', label: 'Статистическая служба или центральный банк'},
      {id: 'research', label: 'Университет или научная организация'},
      {id: 'international', label: 'Международная организация'},
      {id: 'ngo', label: 'НКО, медиа или сообщество'},
      {id: 'business', label: 'Компания'},
    ],
  },
  {
    id: 'obligations',
    title: 'Какие у вас есть обязательства?',
    help: 'Можно выбрать несколько вариантов.',
    multiple: true,
    exclusive: 'none',
    options: [
      {id: 'inspire', label: 'INSPIRE или национальная инфраструктура пространственных данных'},
      {id: 'federation', label: 'Метаданные должен собирать вышестоящий портал', hint: 'национальный портал, data.europa.eu, data.gov'},
      {id: 'doi', label: 'Грантодатель или журнал требует DOI и соответствия FAIR'},
      {id: 'sdmx', label: 'Обмен статистикой с международными организациями', hint: 'SDMX, стандарты распространения данных МВФ'},
      {id: 'personal', label: 'В данных есть персональные или чувствительные сведения'},
      {id: 'regulation', label: 'Нормативные требования к публикации открытых данных'},
      {id: 'none', label: 'Ничего из этого'},
    ],
  },
  {
    id: 'capabilities',
    title: 'Какие возможности обязательны?',
    help: 'Можно выбрать несколько. От этого зависит, хватит ли ядра платформы или понадобится расширение.',
    multiple: true,
    exclusive: 'minimum',
    options: [
      {id: 'dcat', label: 'Выгрузка описаний в DCAT', hint: 'чтобы каталог забрал вышестоящий портал или агрегатор'},
      {id: 'schemaorg', label: 'Разметка schema.org для поисковиков'},
      {id: 'storage', label: 'Хранить файлы у себя, а не только ссылаться'},
      {id: 'tables', label: 'Программный доступ к строкам таблиц'},
      {id: 'doi', label: 'DOI и версии'},
      {id: 'citation', label: 'Готовая ссылка для цитирования'},
      {id: 'restricted', label: 'Часть файлов только по запросу, описания открыты'},
      {id: 'harvest', label: 'Забирать описания из других каталогов'},
      {id: 'multilingual', label: 'Описания на нескольких языках'},
      {id: 'bespoke', label: 'Логика, которой нет в готовых платформах', hint: 'свой процесс, которого не даёт ни ядро, ни расширение'},
      {id: 'minimum', label: 'Достаточно минимума: адрес, лицензия, страница набора'},
    ],
  },
  {
    id: 'access',
    title: 'Как будет устроен доступ к данным?',
    options: [
      {id: 'open', label: 'Открыто для всех, без регистрации'},
      {id: 'restricted', label: 'Часть данных — по регистрации или согласованию'},
      {id: 'paid', label: 'Платно'},
    ],
  },
  {
    id: 'resources',
    title: 'Какие у вас ресурсы на создание и поддержку?',
    options: [
      {id: 'none', label: 'Нет ИТ-специалистов и почти нет бюджета'},
      {id: 'budget', label: 'Есть бюджет, но нет своих разработчиков'},
      {id: 'team', label: 'Есть своя команда разработки и эксплуатации'},
    ],
  },
  {
    id: 'existing',
    title: 'Что у вас уже есть?',
    options: [
      {id: 'arcgis', label: 'ArcGIS'},
      {id: 'gis_oss', label: 'GeoServer, QGIS Server или другие открытые ГИС'},
      {id: 'repo', label: 'Институциональный репозиторий (DSpace, Pure, EPrints и т. п.)'},
      {id: 'cms', label: 'Сайт на CMS (WordPress, Drupal и т. п.)'},
      {id: 'none', label: 'Ничего из этого'},
    ],
  },
  {
    id: 'scale',
    title: 'Сколько данных и как часто они обновляются?',
    options: [
      {id: 'small', label: 'До сотни наборов, обновления редкие'},
      {id: 'medium', label: 'От сотен до нескольких тысяч наборов, регулярные обновления'},
      {id: 'large', label: 'Десятки тысяч наборов или частые автоматические обновления'},
    ],
  },
];

export type CatalogTypeId =
  | 'opendata'
  | 'geo'
  | 'scientific'
  | 'indicators'
  | 'microdata'
  | 'ml'
  | 'metadata';

export type DeliveryId = 'join' | 'static' | 'cms' | 'saas' | 'oss' | 'extend' | 'custom';

export interface ChapterLink {
  label: string;
  to: string;
}

interface CatalogTypeInfo {
  label: string;
  chapters: ChapterLink[];
  standards: string[];
  interfaces: string[];
  platforms: Partial<Record<DeliveryId, string[]>>;
  warnings?: string[];
}

const catalogTypes: Record<CatalogTypeId, CatalogTypeInfo> = {
  opendata: {
    label: 'Портал открытых данных',
    chapters: [{label: 'Порталы открытых данных', to: '/types/open-data-portals/'}],
    standards: ['DCAT (в ЕС — DCAT-AP, в США — DCAT-US)', 'schema.org/Dataset для поисковиков'],
    interfaces: ['API каталога (например, CKAN Action API)', 'Выгрузка всех метаданных в DCAT (data.json, catalog.rdf)'],
    platforms: {
      oss: ['CKAN', 'DKAN', 'uData', 'Piveau'],
      saas: ['OpenDataSoft (Huwise)', 'Socrata (Tyler Data & Insights)', 'ArcGIS Hub'],
      static: ['JKAN', 'PortalJS', 'Datasette'],
      cms: ['DKAN (на Drupal)', 'Модули каталога для вашей CMS с выгрузкой в DCAT'],
      join: ['Региональный или национальный портал открытых данных, если он принимает публикации организаций'],
    },
  },
  geo: {
    label: 'Геопортал',
    chapters: [{label: 'Геопорталы и ИПД', to: '/types/geoportals/'}],
    standards: ['ISO 19115 / ISO 19139', 'OGC WMS / WMTS для просмотра', 'OGC WFS или OGC API Features для скачивания'],
    interfaces: ['OGC CSW или OGC API Records для метаданных', 'Картографические сервисы с документированными адресами'],
    platforms: {
      oss: ['GeoNetwork + GeoServer', 'GeoNode', 'Lizmap (публикация проектов QGIS)', 'pycsw + QGIS Server'],
      saas: ['ArcGIS Online и ArcGIS Hub'],
      static: ['Статический STAC-каталог (для снимков и растров)'],
      join: ['Национальная или региональная инфраструктура пространственных данных'],
    },
  },
  scientific: {
    label: 'Научный репозиторий данных',
    chapters: [{label: 'Научные репозитории данных', to: '/types/scientific-repositories/'}],
    standards: ['DataCite Metadata Schema', 'Dublin Core', 'schema.org/Dataset'],
    interfaces: ['OAI-PMH', 'REST API репозитория', 'DOI через DataCite'],
    platforms: {
      oss: ['Dataverse', 'InvenioRDM', 'DSpace 7+'],
      saas: ['Figshare', 'Dataverse или InvenioRDM у хостинг-провайдера'],
      join: ['Zenodo', 'Профильный репозиторий из re3data', 'Репозиторий университета или консорциума'],
      extend: ['Модуль данных в существующем DSpace или Pure', 'Dataverse рядом с репозиторием публикаций'],
    },
  },
  indicators: {
    label: 'Каталог индикаторов',
    chapters: [{label: 'Каталоги показателей', to: '/types/indicator-catalogs/'}],
    standards: ['SDMX', 'JSON-stat'],
    interfaces: ['SDMX REST API', 'Выгрузка таблиц в CSV с метаданными показателей'],
    platforms: {
      oss: ['.Stat Suite', 'PxWeb', 'OpenSDG (для целей устойчивого развития)'],
      saas: ['.Stat Suite или PxWeb у подрядчика', 'Облачная платформа показателей с полной выгрузкой базы в договоре'],
      static: ['OpenSDG (статический сайт)'],
      join: ['Передача данных в национальную статслужбу и международные базы (UNdata, базы Всемирного банка и МВФ)'],
    },
  },
  microdata: {
    label: 'Каталог микроданных',
    chapters: [{label: 'Каталоги микроданных', to: '/types/microdata-catalogs/'}],
    standards: ['DDI Codebook или DDI Lifecycle', 'Dublin Core'],
    interfaces: ['Каталог исследований с API', 'OAI-PMH или выгрузка DDI'],
    platforms: {
      oss: ['NADA', 'Dataverse (архив с DOI и OAI-PMH)', 'OBiBa Mica (эпидемиологические исследования)'],
      saas: ['NADA у хостинг-провайдера', 'Redivis'],
      join: ['Microdata Library Всемирного банка', 'IHSN', 'Национальный архив социальных данных', 'ICPSR'],
    },
    warnings: ['Nesstar больше не развивается: не выбирайте его для нового каталога.'],
  },
  ml: {
    label: 'ML-каталог',
    chapters: [{label: 'ML-каталоги', to: '/types/ml-catalogs/'}],
    standards: ['Croissant (MLCommons) с полями RAI', 'Карточки датасетов (dataset cards)'],
    interfaces: ['API хаба', 'Загрузка через стандартные библиотеки (datasets, kagglehub, openml)'],
    platforms: {
      join: ['Hugging Face Hub', 'Kaggle', 'OpenML', 'Zenodo для копии выпуска с DOI'],
      oss: ['Dataverse с экспортёром Croissant', 'CKAN с плагином croissant из ckanext-dcat', 'Codabench для соревнований'],
      saas: ['Организационный аккаунт на Hugging Face Hub'],
    },
    warnings: ['InvenioRDM и Zenodo не отдают Croissant. Трек данных NeurIPS (Evaluations & Datasets) требует его у каждой подачи с новым набором.'],
  },
  metadata: {
    label: 'Каталог метаданных или агрегатор',
    chapters: [
      {label: 'Поисковики и агрегаторы', to: '/types/search-engines-aggregators/'},
      {label: 'Каталоги метаданных и реестры', to: '/types/metadata-catalogs/'},
    ],
    standards: ['DCAT и DCAT-AP', 'SKOS (для словарей)'],
    interfaces: [
      'Сбор метаданных из DCAT, CKAN API, CSW и OAI-PMH',
      'Собственная выгрузка в DCAT',
      'SPARQL, если нужен граф знаний',
    ],
    platforms: {
      oss: [
        'CKAN с расширением ckanext-harvest',
        'Piveau',
        'FAIR Data Point',
        'Idra',
        'Skosmos (словари SKOS)',
        'Fusion Metadata Registry (структуры SDMX)',
      ],
      join: ['Регистрация каталогов и словарей в существующих реестрах: re3data, FAIRsharing, BARTOC, dataportals-registry'],
    },
  },
};

const deliveryLabels: Record<DeliveryId, string> = {
  join: 'Не создавать свой каталог, а публиковать в существующем',
  static: 'Статический каталог (генератор сайтов и Git)',
  cms: 'Модуль к существующему сайту',
  saas: 'Облачный сервис (SaaS)',
  oss: 'Свободное ПО на своей инфраструктуре',
  extend: 'Развить то, что уже есть',
  custom: 'Своя разработка',
};

export interface Explained {
  text: string;
  why: string;
}

const commonInterfaces = [
  'Постоянные URL для каждого набора данных',
  'sitemap.xml и разметка schema.org/Dataset',
];

export interface Recommendation {
  catalogType: string;
  typeChapters: ChapterLink[];
  delivery: string;
  deliveryWhy: string;
  platforms: Explained[];
  alternatives: string[];
  standards: Explained[];
  interfacesTitle: string;
  interfaces: Explained[];
  capabilityNotes: Explained[];
  warnings: string[];
  readNext: ChapterLink[];
}

function one(answers: Answers, id: QuestionId): string | undefined {
  return answers[id]?.[0];
}

function chooseDelivery(
  type: CatalogTypeId,
  answers: Answers,
): {id: DeliveryId; why: string; alternatives: DeliveryId[]} {
  const resources = one(answers, 'resources');
  const existing = one(answers, 'existing');
  const scale = one(answers, 'scale');
  const owner = one(answers, 'owner');
  const capabilities = new Set(answers.capabilities ?? []);

  if (capabilities.has('bespoke') && resources === 'team') {
    return {
      id: 'custom',
      why: 'Вы отметили логику, которой нет в готовых платформах, и у вас есть своя команда. Сначала назовите конкретную функцию, которую не закрывают ни ядро, ни живое расширение. Затем запишите, кто сопровождает систему через пять лет, как будут устроены постоянные адреса, лицензии и выгрузка описаний, и сколько стоит уйти, если команда исчезнет.',
      alternatives: ['oss'],
    };
  }

  if (existing === 'arcgis' && (type === 'geo' || type === 'opendata')) {
    return {
      id: 'extend',
      why: 'ArcGIS Hub публикует уже существующие слои и таблицы как каталог без новой инфраструктуры. Учтите зависимость от лицензий Esri и проверьте, что наборы можно скачать, а не только посмотреть на карте.',
      alternatives: ['oss'],
    };
  }
  if (existing === 'gis_oss' && type === 'geo') {
    return {
      id: 'oss',
      why: 'Сервисы у вас уже есть, не хватает каталога метаданных поверх них. GeoNetwork или pycsw подключаются к GeoServer и QGIS Server.',
      alternatives: ['join'],
    };
  }
  if (existing === 'repo' && type === 'scientific') {
    return {
      id: 'extend',
      why: 'Репозиторий публикаций можно расширить до репозитория данных или поставить рядом специализированную платформу. Главное — общая авторизация, DOI и связи статья ↔ данные.',
      alternatives: ['join', 'oss'],
    };
  }
  if (type === 'ml' && resources !== 'team') {
    return {
      id: 'join',
      why: 'ML-датасеты ищут на крупных хабах. Публикация там даёт аудиторию и инструменты загрузки, которые трудно воспроизвести самостоятельно.',
      alternatives: ['saas'],
    };
  }

  if (resources === 'none') {
    if (scale === 'small') {
      const why =
        owner === 'municipal'
          ? 'Небольшому муниципалитету без ИТ-команды обычно выгоднее публиковать на региональном или национальном портале: своему каталогу нужна постоянная поддержка, иначе он быстро устаревает.'
          : 'Без ИТ-команды и при небольшом объёме данных свой каталог быстро устареет. Надёжнее публиковать в существующем каталоге.';
      return {id: 'join', why, alternatives: ['static', 'saas']};
    }
    return {
      id: 'saas',
      why: 'Без своей команды каталог такого объёма реалистично вести только как облачный сервис, где обновления и безопасность — забота поставщика.',
      alternatives: ['join'],
    };
  }

  if (resources === 'budget') {
    if (existing === 'cms' && scale === 'small') {
      return {
        id: 'cms',
        why: 'Для небольшого объёма достаточно раздела на существующем сайте, если он отдаёт метаданные в машиночитаемом виде.',
        alternatives: ['saas', 'static'],
      };
    }
    return {
      id: 'saas',
      why: 'При бюджете без своих разработчиков облачный сервис снимает вопросы эксплуатации. Альтернатива — свободное ПО с договором поддержки у подрядчика.',
      alternatives: ['oss'],
    };
  }

  if (scale === 'small' && (type === 'opendata' || type === 'indicators')) {
    return {
      id: 'oss',
      why: 'Своя команда позволяет развернуть и адаптировать свободное ПО. При небольшом объёме стоит рассмотреть и статический каталог: его почти не нужно сопровождать.',
      alternatives: ['static'],
    };
  }
  return {
    id: 'oss',
    why: 'Своя команда позволяет развернуть свободное ПО, адаптировать его и не зависеть от поставщика.',
    alternatives: ['saas'],
  };
}

function platformsFor(info: CatalogTypeInfo, delivery: DeliveryId, existing?: string): string[] {
  if (delivery === 'custom') {
    return [
      'Своя система — только после проверочных вопросов. Рядом всё равно сравните готовую платформу: часто «особая логика» оказывается расширением',
    ];
  }
  if (delivery === 'extend' && existing === 'arcgis') {
    return ['ArcGIS Hub'];
  }
  if (delivery === 'oss' && existing === 'gis_oss') {
    return ['GeoNetwork поверх существующих OGC-сервисов', 'pycsw'];
  }
  for (const id of [delivery, 'oss', 'saas', 'join'] as DeliveryId[]) {
    const list = info.platforms[id];
    if (list && list.length > 0) {
      return list;
    }
  }
  return [];
}

function uniq(items: string[]): string[] {
  return Array.from(new Set(items));
}

function explain(text: string, why: string): Explained {
  return {text, why};
}

function reasonForStandard(text: string): string {
  if (text.startsWith('Профиль') || text.includes('вышестоящего портала')) {
    return 'Вышестоящий портал заберёт только тот профиль, который сам понимает. Свой «почти DCAT» он пропустит.';
  }
  if (text.includes('DCAT')) {
    return 'По DCAT каталоги обмениваются описаниями. Без выгрузки портал виден только тем, кто открыл сайт.';
  }
  if (text.includes('schema.org')) {
    return 'По этой разметке набор находят обычные поисковики данных, в том числе Google Dataset Search.';
  }
  if (text.includes('DataCite') || text.includes('DOI')) {
    return 'DOI сохраняет ссылку, когда сайт переезжает. Для цитирования в статье это основной идентификатор.';
  }
  if (text.includes('Dublin')) {
    return 'Общий минимум описания, который понимают научные агрегаторы и протокол OAI-PMH.';
  }
  if (text.includes('ISO') || text.includes('INSPIRE')) {
    return 'Геоданные в инфраструктуре страны описывают так. Иной формат национальный геопортал не соберёт.';
  }
  if (text.includes('SDMX') || text.includes('JSON-stat')) {
    return 'Показатель с разрезами передают не файлом «на всякий случай», а в SDMX или JSON-stat.';
  }
  if (text.includes('DDI')) {
    return 'Обследование описывают вместе с переменными. Без этого файл микроданных нельзя интерпретировать.';
  }
  if (text.includes('Croissant')) {
    return 'Машиночитаемое описание ML-набора: по нему набор загружают в код, а поля RAI сообщают о перекосах и ограничениях. Hugging Face, Kaggle, OpenML и Dataverse создают основные поля сами.';
  }
  if (text.includes('SKOS')) {
    return 'Словари и классификаторы описывают отдельно от наборов, иначе агрегатор не склеит темы.';
  }
  return 'Так описание понимают другие системы, а не только ваш сайт.';
}

function reasonForInterface(text: string): string {
  if (text.includes('CKAN')) {
    return 'По этому API программы ищут наборы. Вышестоящий портал часто умеет забирать именно его.';
  }
  if (text.includes('DCAT') || text.includes('data.json')) {
    return 'Один файл со всеми описаниями нужен сборщику. Поиска по странице результатов ему мало.';
  }
  if (text.includes('schema.org') || text.includes('sitemap')) {
    return 'Постоянный адрес и разметка страницы — способ попасть в поисковик, не дожидаясь ручной регистрации.';
  }
  if (text.includes('CSW') || text.includes('OGC')) {
    return 'Каталог слоёв отдают сервисом, который уже понимают геопорталы, а не только картой в браузере.';
  }
  if (text.includes('OAI-PMH') || text.includes('DataCite')) {
    return 'Научные агрегаторы забирают описания по протоколу. Страницы сайта они не разбирают.';
  }
  if (text.includes('SDMX') || text.includes('CSV')) {
    return 'Показатель должен забираться программой. Конструктор таблицы только в браузере этого не даёт.';
  }
  if (text.includes('сбор')) {
    return 'Чужие каталоги подключают к стабильному адресу выгрузки. Адрес, который меняется, ломает всю цепочку.';
  }
  return 'Без машинного доступа каталогом пользуются только люди в браузере.';
}

function explainPlatform(name: string): Explained {
  if (name.includes('CKAN')) {
    return explain(name, 'API и файлы в ядре. DCAT, свои поля и сбор чужих каталогов — расширения сообщества CKAN.');
  }
  if (name.includes('DSpace')) {
    return explain(name, 'DOI и версии в ядре. Готовой ссылки с выгрузкой в BibTeX и RIS в ядре до 10.1 включительно нет, только метатеги для Google Scholar. Это репозиторий, а не портал открытых данных.');
  }
  if (name.includes('Dataverse') || name.includes('InvenioRDM')) {
    return explain(name, 'DOI, версии и цитирование в ядре. Это репозиторий, а не портал открытых данных.');
  }
  if (name.includes('GeoNetwork') || name.includes('pycsw')) {
    return explain(name, 'Каталог слоёв в ядре: ISO 19115 и CSW. Карту отдаёт отдельный сервер, не сам каталог.');
  }
  if (name.includes('ArcGIS')) {
    return explain(name, 'Каталог поверх уже купленного ArcGIS. Своё расширение не поставить, DOI нет.');
  }
  if (name.includes('Zenodo') || name.includes('Hugging Face') || name.includes('Kaggle') || name.includes('OpenML')) {
    return explain(name, 'Чужой хаб даёт аудиторию и DOI или загрузку в код. Своя модерация там ограничена.');
  }
  if (name.includes('Codabench')) {
    return explain(name, 'Скрытая тестовая часть и таблица результатов в ядре. Это площадка соревнований, а не каталог наборов: сами наборы публикуют рядом.');
  }
  if (name.includes('NADA')) {
    return explain(name, 'Семь типов доступа к файлам, заявки и выгрузка DDI в ядре. OAI-PMH нет, DOI регистрируют отдельно. Nesstar для нового каталога не берут.');
  }
  if (name.includes('Mica')) {
    return explain(name, 'Подробные словари переменных и заявки на доступ в ядре; данные почти всегда только по заявке, поэтому описание должно быть полным.');
  }
  if (name.includes('PxWeb') || name.includes('.Stat') || name.includes('OpenSDG')) {
    return explain(name, 'Платформа показателей. OpenSDG — лёгкая витрина, у PxWeb в ядре свой API и JSON-stat, у .Stat Suite — служба SDMX. Для обмена по SDMX к PxWeb добавляют второй продукт.');
  }
  if (name.includes('FAIR Data Point') || name.includes('Skosmos') || name.includes('Fusion Metadata Registry')) {
    return explain(name, 'Узкий инструмент для одного вида описаний: FAIR Data Point — наборы в DCAT, Skosmos — словари SKOS, Fusion Metadata Registry — структуры SDMX. Портал данных он не заменяет.');
  }
  if (name.includes('Своя система')) {
    return explain(name, 'Своя разработка дороже сопровождением. Сначала докажите, что расширения готовой платформы не хватает.');
  }
  return explain(name, 'Сверьте обязательные функции по карточке платформы: что в ядре, что расширением, чего нет.');
}

function notesForCapabilities(
  capabilities: Set<string>,
  delivery: DeliveryId,
  type: CatalogTypeId,
): Explained[] {
  const notes: Explained[] = [];
  const has = (id: string) => capabilities.has(id);
  if (capabilities.size === 0 || capabilities.has('minimum')) {
    return notes;
  }
  if (has('dcat') || has('schemaorg')) {
    if (type === 'opendata' && (delivery === 'oss' || delivery === 'custom')) {
      notes.push(explain('DCAT и schema.org', 'У CKAN оба даёт расширение ckanext-dcat, не ядро. Поддержка заявлена для CKAN 2.10 и 2.11, тесты идут и на 2.12.'));
    } else if (delivery === 'saas') {
      notes.push(explain('DCAT и schema.org', 'У облачного портала выгрузка DCAT обычно входит в сервис. Разметку schema.org проверьте на странице набора: она бывает урезанной.'));
    } else {
      notes.push(explain('DCAT и schema.org', 'На своём статическом сайте файл описаний и разметку делаете вы. Чужой каталог должен уметь это без вашей разработки.'));
    }
  }
  if (has('doi') || has('citation')) {
    notes.push(
      type === 'scientific'
        ? explain('DOI и цитирование', 'У Dataverse и InvenioRDM это ядро. У CKAN DOI — расширение Музея естественной истории, и на CKAN 2.11 и 2.12 оно не тестировалось. У DSpace DOI в ядре, а готовой ссылки нет.')
        : explain('DOI и цитирование', 'Порталы открытых данных и типичные облачные сервисы DOI не выдают. Если это обязательно, смотрите Dataverse, InvenioRDM, Figshare или Zenodo. Если нужна только строка «Как цитировать», хватит шаблона страницы с постоянным адресом и датой обращения.'),
    );
  }
  if (has('storage')) {
    notes.push(explain('Своё хранилище', 'Научные репозитории и CKAN хранят файлы в ядре. Геокаталог чаще только ссылается на сервис. Статический сайт хранит файлы рядом со страницами.'));
  }
  if (has('tables')) {
    notes.push(explain('Доступ к строкам таблиц', 'У CKAN база для таблиц в ядре, заливка CSV — расширение XLoader (CKAN 2.10 и новее). У облачного портала это входит в сервис. У статического сайта этого нет.'));
  }
  if (has('harvest')) {
    notes.push(explain('Сбор чужих каталогов', 'У CKAN это расширение ckanext-harvest, оно тестируется на версиях 2.10–2.12. Статический сайт так не умеет. У облачного сервиса возможность зависит от тарифа.'));
  }
  if (has('restricted')) {
    notes.push(explain('Файлы по запросу', 'Описание оставьте открытым. Так умеют Dataverse, InvenioRDM и NADA в ядре. У CKAN закрытый набор тоже в ядре.'));
  }
  if (has('multilingual')) {
    notes.push(explain('Несколько языков', 'У CKAN многоязычные поля — расширение ckanext-fluent вместе со scheming. Перевод только кнопок не переводит описания наборов.'));
  }
  if (has('bespoke') && delivery !== 'custom') {
    notes.push(explain('Особая логика', 'Вы отметили функцию вне готовых платформ, но своей команды на разработку нет. Сузьте задачу или заложите команду. Иначе это пожелание, а не план.'));
  }
  return notes;
}

export function recommend(answers: Answers): Recommendation {
  const type = (one(answers, 'content') ?? 'opendata') as CatalogTypeId;
  const info = catalogTypes[type];
  const obligations = new Set(answers.obligations ?? []);
  const access = one(answers, 'access');
  const owner = one(answers, 'owner');
  const existing = one(answers, 'existing');

  const delivery = chooseDelivery(type, answers);
  const standards = [...info.standards];
  const interfaces = [...info.interfaces, ...commonInterfaces];
  const warnings = [...(info.warnings ?? [])];
  const readNext: ChapterLink[] = [
    {label: 'Карта возможностей каталогов', to: '/features/capability-map/'},
    {label: 'Принципы выбора набора функций', to: '/choice/feature-selection/'},
    {label: 'От функций к платформе', to: '/choice/from-features-to-platform/'},
    {label: 'Экспорт метаданных в DCAT и schema.org', to: '/features/metadata-export/'},
    {label: 'API и массовая выгрузка', to: '/features/access-interfaces/'},
    {label: 'Свои силы, свободное ПО или облачный сервис', to: '/choice/build-or-buy/'},
  ];
  if (delivery.id === 'join' || delivery.id === 'static') {
    readNext.unshift({label: 'Публикация без портала', to: '/beyond-portals/when-portal-not-needed/'});
  }

  if (obligations.has('inspire')) {
    standards.push('Профили INSPIRE для метаданных и сетевых сервисов');
    if (type !== 'geo') {
      warnings.push('Даже если основной продукт — не геопортал, пространственные наборы нужно описать по ISO 19115 и отдать через CSW, чтобы их собрал национальный геопортал.');
    }
  }
  if (obligations.has('federation')) {
    standards.push('Профиль DCAT вышестоящего портала (DCAT-AP, DCAT-US или национальный)');
    interfaces.push('Стабильная точка сбора метаданных для вышестоящего портала');
    readNext.push({label: 'Федерации и агрегация', to: '/publishing/federation-and-harvesting/'});
  }
  if (obligations.has('doi')) {
    standards.push('DataCite и DOI');
    if (type !== 'scientific') {
      warnings.push('Нужна платформа, которая выдаёт DOI: Dataverse, InvenioRDM, Figshare, Zenodo — или членство в DataCite.');
    }
    readNext.push({label: 'Постоянные идентификаторы, DOI и версии', to: '/features/identifiers-and-doi/'});
    readNext.push({label: 'Экспорт цитирования', to: '/features/citation/'});
  }
  if (obligations.has('sdmx')) {
    standards.push('SDMX');
    if (type !== 'indicators') {
      warnings.push('Обмен статистикой с международными организациями идёт через SDMX. Для этой части нужен отдельный каталог индикаторов (.Stat Suite, Fusion Registry).');
    }
  }
  if (obligations.has('personal')) {
    warnings.push('Нужны обезличивание и уровни доступа. Метаданные публикуйте открыто, а доступ к файлам ограничивайте: так данные можно найти, не раскрывая их.');
    readNext.push({label: 'Лицензии и условия доступа', to: '/publishing/licenses-and-access/'});
  }
  if (obligations.has('regulation')) {
    warnings.push('Сверьтесь с нормативными требованиями: они могут задавать обязательный состав метаданных, формат и даже платформу.');
  }

  if (access === 'restricted') {
    warnings.push('Оставьте метаданные открытыми и доступными для сборщиков, даже если сами данные выдаются по запросу. Нужна платформа с уровнями доступа: NADA, Dataverse (файлы с ограниченным доступом), CKAN (закрытые наборы).');
  }
  if (access === 'paid') {
    warnings.push('Платный доступ — это модель маркетплейса. Открытые платформы почти не поддерживают продажу данных: описания публикуйте открыто, а оплату и выдачу ведите отдельной системой.');
    readNext.push({label: 'Маркетплейсы данных', to: '/types/other-types/'});
  }
  if (owner === 'municipal' && delivery.id !== 'join') {
    warnings.push('Проверьте, собирает ли региональный или национальный портал данные муниципалитетов: тогда важнее совместимость с ним, чем собственные функции.');
  }
  if (existing === 'cms' && delivery.id !== 'cms') {
    warnings.push('Каталог на CMS часто не отдаёт метаданные машинам. Если всё же делаете его на CMS, проверьте, что есть выгрузка в DCAT и постоянные URL.');
  }

  readNext.push({label: 'Типовые сценарии выбора', to: '/choice/scenarios/'});
  readNext.push({label: 'Разобранные примеры', to: '/choice/worked-examples/'});
  readNext.push({label: 'Чек-лист требований', to: '/choice/requirements-checklist/'});
  if (delivery.id === 'custom') {
    readNext.push({label: 'Как обосновать свою разработку', to: '/choice/build-or-buy/'});
  }

  const capabilities = new Set(answers.capabilities ?? []);

  return {
    catalogType: info.label,
    typeChapters: info.chapters,
    delivery: deliveryLabels[delivery.id],
    deliveryWhy: delivery.why,
    platforms: platformsFor(info, delivery.id, existing).map(explainPlatform),
    alternatives: delivery.alternatives.map((id) => deliveryLabels[id]),
    standards: uniq(standards).map((text) => explain(text, reasonForStandard(text))),
    interfacesTitle:
      delivery.id === 'join'
        ? 'Что должен уметь каталог, в котором вы публикуете'
        : 'Что обязательно отдавать машинам',
    interfaces: uniq(interfaces).map((text) => explain(text, reasonForInterface(text))),
    capabilityNotes: notesForCapabilities(capabilities, delivery.id, type),
    warnings,
    readNext,
  };
}
