/** Exact copy from HOME PAGE_v2.html — Japanese-only homepage. */
export const homeContent = {
  meta: {
    title: 'トップ｜HMI PARIS',
    description:
      'パリ発の日本語 旅行・コンシェルジュサービス HMI PARIS。観光ツアー、専用車＆ガイド、通訳・アテンド。',
  },
  topbar: {
    tag: '季節限定',
    main: '凱旋門賞 2026 観戦バスツアー ― 10.4（日）パリ・ロンシャン競馬場',
    cta: '詳細を見る →',
  },
  nav: {
    home: 'トップ',
    event: '凱旋門賞 2026',
    services: 'サービス',
    about: '会社案内',
    contact: 'お問い合わせ',
    menu: 'メニュー',
  },
  hero: {
    eyebrow: 'Bonjour, et bienvenue.',
    titleLine1: 'パリでの時間に、',
    titleLine2: '日本のおもてなしを。',
    latin: 'HMI Paris — Concierge & Travel Guide, in Japanese',
    lead: '観光ツアーから専用車まで。パリに精通した日本語スタッフが、お客様一人ひとりの滞在に寄り添います。',
    ctaPrivate: 'プライベートサービス',
    ctaGroup: 'グループツアー',
    image: '/images/home/hero.jpg',
  },
  event: {
    label: '混乗バスツアー',
    overlay: "Qatar Prix de l'Arc de Triomphe",
    eyebrow: '季節限定・特別イベント',
    titleLine1: '凱旋門賞 2026',
    titleLine2: '観戦バスツアー',
    lead: '第105回目を迎える凱旋門賞。今年もトップジョッキーと名馬がパリ・ロンシャン競馬場に集結し世界一を競います。最高峰のレースをこの目で！欧州セレブの社交場でもある、気品溢れるヨーロッパ競馬の独特な雰囲気もお楽しみ頂けます。',
    points: [
      'ロンシャン競馬場への往復送迎バス',
      "立ち見自由席チケット（Pelouse de l'Arrivée）",
      'パドックへのアクセス',
      '競馬場内マップ＆賭け方・馬券購入方法の資料付き',
      '日本語ガイド同行',
    ],
    cta: '詳細を見る',
    slug: 'arc-de-triomphe-2026',
    image: '/images/home/event-poster.jpg',
    imageAlt: '凱旋門賞 2026 観戦バスツアー — 2026年10月4日（日）パリ・ロンシャン競馬場',
  },
  greet: {
    vertical: '言葉の不安を、\n旅の自由に。',
    eyebrow: 'ごあいさつ',
    title: 'はじめてのパリも、何度目かのパリも。',
    lead: 'HMI Paris は、現地に暮らす日本語スタッフが、移動・観光・ビジネスのあらゆる場面をサポートする、パリ発の旅行・コンシェルジュサービスです。言葉の不安をなくし、安心して「自分だけのパリ」を楽しんでいただくこと。快適で上質な旅行体験をお届けします。',
  },
  destinations: {
    eyebrow: '人気の行き先',
    title: 'パリから、忘れられない一日へ。',
    latin: 'Popular Destinations',
    items: [
      {
        en: 'Mont-Saint-Michel',
        name: 'モンサンミッシェル',
        text: '海に浮かぶ神秘的な島へ。ノルマンディの素敵な村にも訪れます。',
        image: '/images/home/dest-mont-saint-michel.jpg',
      },
      {
        en: 'Paris',
        name: 'パリ',
        text: 'エッフェル塔から情緒あふれるモンマルトルまで。華と光の都を日本語ガイドがご案内します。',
        image: '/images/home/dest-paris.jpg',
      },
      {
        en: 'Giverny',
        name: 'ジヴェルニー',
        text: 'モネが愛した「睡蓮」の庭へ。ヴェトゥイユにも立ち寄り、美しい田園風景をお楽しみ頂けます。',
        image: '/images/home/dest-giverny.jpg',
      },
      {
        en: 'Auvers-sur-Oise',
        name: 'オーヴェル＝シュル＝オワーズ',
        text: 'ゴッホが最期を過ごした村。麦畑と教会、画家の足跡を日本語ガイドとたどります。',
        image: '/images/home/dest-auvers.jpg',
      },
      {
        en: 'Château de Versailles',
        name: 'ヴェルサイユ宮殿',
        text: '黄金の門と鏡の間、そして大庭園へ。王たちの暮らしを日本語ガイドとめぐります。',
        image: '/images/home/dest-versailles.jpg',
      },
      {
        en: 'Champagne',
        name: 'シャンパーニュ地方',
        text: 'ブドウ畑とセラーをめぐる、シャンパーニュの丘へ。本場の一杯を味わう旅。',
        image: '/images/home/dest-champagne.jpg',
      },
    ],
  },
  services: {
    eyebrow: 'サービス',
    title: 'パリ滞在を支える、4つのサービス',
    latin: 'Our Services',
    items: [
      {
        icon: 'star' as const,
        title: 'パリ発 観光ツアー',
        en: 'Day Tours',
        text: 'モンサンミッシェル、ヴェルサイユ宮殿、ルーヴル美術館など、人気の行き先へ。少人数・プライベートで、日本語ガイドがご案内します。',
      },
      {
        icon: 'car' as const,
        title: '専用車 ＆ 日本語ガイド',
        en: 'Private Car & Guide',
        text: '専用車と日本語ガイドで、行きたい場所をご自身のペースで。市内観光から近郊への小旅行まで、自由に組み立てられます。',
      },
      {
        icon: 'chat' as const,
        title: '通訳・アテンド・視察同行',
        en: 'Interpretation & Attend',
        text: '商談、視察、展示会、買い付けなど。ビジネスシーンの通訳・同行を、目的に合わせて承ります。',
      },
      {
        icon: 'plus' as const,
        title: 'オーダーメイド手配',
        en: 'Tailor-made',
        text: '上記にないご要望も、まずはご相談ください。お客様だけのプランを、一からお作りします。',
      },
    ],
  },
  why: {
    eyebrow: '選ばれる理由',
    title: '「日本語で、安心して」を、すべての場面で。',
    latin: 'Why HMI Paris',
    items: [
      {
        n: '01',
        title: 'パリ在住の日本語スタッフ',
        text: '現地での「困った」に、その場で日本語で対応します。',
      },
      {
        n: '02',
        title: '完全プライベート対応',
        text: '乗り合いなし。お客様のグループだけの貸切でご案内します。',
      },
      {
        n: '03',
        title: '確かな現地ネットワーク',
        text: '長年培ったパリの人脈と知見で、質の高い手配を実現します。',
      },
      {
        n: '04',
        title: '滞在中の安心サポート',
        text: 'ご出発からご帰国まで、滞在中の連絡体制を整えています。',
      },
    ],
  },
  news: {
    eyebrow: 'お知らせ',
    title: '新着情報',
    latin: 'News',
    items: [
      { date: '2026.06.01', title: 'ホームページを公開しました。' },
      { date: '2026.05.20', title: '夏季の観光ツアーのご予約受付を開始しました。' },
    ],
  },
  cta: {
    title: 'パリ滞在のご相談は、お気軽に。',
    subtitle: 'お見積り・ご相談はすべて無料です。日本語でお問い合わせください。',
    button: 'お問い合わせはこちら',
  },
  footer: {
    blurb:
      '観光ツアー・専用車・通訳アテンドまで。パリに暮らす日本語スタッフが、お客様の滞在に寄り添います。',
    servicesTitle: 'サービス',
    services: ['パリ発 観光ツアー', '専用車 ＆ 日本語ガイド', '通訳・アテンド'],
    companyTitle: '会社情報',
    about: '会社案内',
    contact: 'お問い合わせ',
    copy: '© 2026 HMI PARIS — Concierge & Travel in Paris',
    photoCredit: 'Photos : Unsplash（フリー素材・差し替え可）',
  },
} as const
