/**
 * CMS seed content: English is the default/source locale; Japanese is a linked localization.
 * Shared (non-localized) fields live alongside locale-specific copy.
 */

export type LocaleCopy = Record<string, unknown>

export const SEED_PACKAGES = [
  {
    slug: 'classic-paris-essentials',
    durationDays: 3,
    priceFrom: 890,
    currency: 'EUR',
    featured: true,
    difficulty: 'easy',
    en: {
      title: 'Classic Paris essentials',
      summary: 'A Louvre morning, Île de la Cité, and an easy afternoon by the Seine.',
      description:
        'Three unhurried days: timed Louvre entry, a guided walk on Île de la Cité, and café time by the river.',
      destination: 'Louvre & Île de la Cité',
      region: 'Paris',
      highlights: ['Timed Louvre entry', 'Île de la Cité walk', 'Seine-side café'],
    },
    ja: {
      title: 'クラシック・パリ入門',
      summary: 'ルーヴルの朝、シテ島、セーヌ河畔で過ごすゆとりの午後。',
      description:
        '慌ただしさのない3日間。時間指定のルーヴル入場、シテ島のガイド散策、河畔カフェでの休息も。',
      destination: 'ルーヴル＆シテ島',
      region: 'パリ',
      highlights: ['ルーヴル時間指定入場', 'シテ島ウォーキング', 'セーヌ河畔カフェ'],
    },
  },
  {
    slug: 'montmartre-after-dark',
    durationDays: 1,
    priceFrom: 280,
    currency: 'EUR',
    featured: true,
    difficulty: 'easy',
    en: {
      title: 'Montmartre after dark',
      summary: 'Village lanes, Sacré-Cœur at sunset, and a rooftop dinner with city lights.',
      description:
        'A twilight walk through quiet Montmartre streets, golden hour at Sacré-Cœur, then rooftop dining.',
      destination: 'Montmartre',
      region: 'Paris',
      highlights: ['Sacré-Cœur sunset', 'Hidden stairways', 'Rooftop dinner'],
    },
    ja: {
      title: 'モンマルトル・アフターダーク',
      summary: '村のような路地、サクレ・クールの夕景、屋上からの夜景ディナー。',
      description:
        'モンマルトルの静かな路地をたそがれに歩くプラン。サクレ・クールのゴールデンアワーの後は屋上ディナー。',
      destination: 'モンマルトル',
      region: 'パリ',
      highlights: ['サクレ・クール夕景', '隠れた階段散策', '屋上ディナー'],
    },
  },
  {
    slug: 'le-marais-private-walk',
    durationDays: 1,
    priceFrom: 195,
    currency: 'EUR',
    featured: true,
    difficulty: 'easy',
    en: {
      title: 'Le Marais private walk',
      summary: 'Hôtels particuliers, Place des Vosges, and local sweet stops.',
      description:
        'A half-day private guide through Le Marais: courtyards, Place des Vosges, and favourite tasting spots.',
      destination: 'Le Marais',
      region: 'Paris',
      highlights: ['Place des Vosges', 'Courtyard access', 'Sweets & falafel'],
    },
    ja: {
      title: 'マレ地区プライベートウォーク',
      summary: 'オテル・パルティキュリエ、ヴォージュ広場、話題のスイーツ巡り。',
      description: 'マレ地区を半日プライベートガイド。中庭、ヴォージュ広場、地元おすすめの試食スポットへ。',
      destination: 'マレ地区',
      region: 'パリ',
      highlights: ['ヴォージュ広場', '中庭アクセス', 'スイーツ＆ファラフェル'],
    },
  },
  {
    slug: 'versailles-royal-day',
    durationDays: 1,
    priceFrom: 245,
    currency: 'EUR',
    featured: false,
    difficulty: 'moderate',
    en: {
      title: 'Versailles royal day',
      summary: 'Palace, gardens and Trianon — with return transfers from Paris.',
      description:
        'Skip-the-line palace entry, garden guiding, free time at Marie Antoinette’s hamlet, transfers included.',
      destination: 'Versailles',
      region: 'Paris',
      highlights: ['Priority entry', 'Gardens & Trianon', 'Paris transfers'],
    },
    ja: {
      title: 'ヴェルサイユ・ロイヤルデー',
      summary: '宮殿・庭園・トリアノン。パリ市内からの往復送迎付き。',
      description:
        'スキップ・ザ・ラインで宮殿へ。庭園ガイド、マリー・アントワネットの集落で自由時間。送迎込み。',
      destination: 'ヴェルサイユ',
      region: 'パリ',
      highlights: ['優先入場', '庭園＆トリアノン', 'パリ送迎'],
    },
  },
  {
    slug: 'left-bank-literary-trail',
    durationDays: 1,
    priceFrom: 165,
    currency: 'EUR',
    featured: false,
    difficulty: 'easy',
    en: {
      title: 'Left Bank literary trail',
      summary: 'Saint-Germain bookshops, café culture, and dusk in the Luxembourg Gardens.',
      description:
        'A gentle route via Shakespeare and Company, Saint-Germain cafés and the Luxembourg Gardens.',
      destination: 'Saint-Germain & Latin Quarter',
      region: 'Paris',
      highlights: ['Shakespeare and Company', 'Café terraces', 'Luxembourg Gardens'],
    },
    ja: {
      title: '左岸文学散策',
      summary: 'サン＝ジェルマンの本屋、カフェ文化、黄昏のリュクサンブール。',
      description:
        'シェイクスピア・アンド・カンパニー、サン＝ジェルマンのカフェ、リュクサンブール公園をゆるやかに巡ります。',
      destination: 'サン＝ジェルマン＆カルチエ・ラタン',
      region: 'パリ',
      highlights: ['シェイクスピア・アンド・カンパニー', 'カフェテラス', 'リュクサンブール公園'],
    },
  },
  {
    slug: 'seine-twilight-cruise',
    durationDays: 1,
    priceFrom: 320,
    currency: 'EUR',
    featured: false,
    difficulty: 'easy',
    en: {
      title: 'Seine twilight cruise',
      summary: 'The Eiffel Tower, Musée d’Orsay and Notre-Dame from the river at night.',
      description:
        'Evening boarding, champagne on board, landmarks from the water. Riverside dinner optional.',
      destination: 'River Seine',
      region: 'Paris',
      highlights: ['Twilight departure', 'Champagne on board', 'Optional riverside dinner'],
    },
    ja: {
      title: 'セーヌ夕暮れクルーズ',
      summary: 'エッフェル塔、オルセー、ノートルダムを川から眺める夜。',
      description: '夕暮れの乗船。船上シャンパン、川面からの名所巡り。河岸ディナーはオプション。',
      destination: 'セーヌ川',
      region: 'パリ',
      highlights: ['夕暮れ出発', '船上シャンパン', '河岸ディナー（任意）'],
    },
  },
] as const

export const SEED_EVENTS = [
  {
    slug: 'arc-de-triomphe-2026',
    heroImageUrl: '',
    eventDate: '2026-10-04',
    priceFrom: 180,
    currency: 'EUR',
    featured: true,
    sortOrder: 1,
    en: {
      title: 'Prix de l’Arc de Triomphe 2026 viewing bus tour',
      label: 'Shared bus tour',
      badgeText: '2026 10.4 SUN Arc de Triomphe viewing bus tour',
      category: 'Seasonal special event',
      summary:
        'The 105th Prix de l’Arc de Triomphe at Longchamp — top jockeys and horses, with a Japanese-speaking guide.',
      description:
        'A special bus tour to watch the Qatar Prix de l’Arc de Triomphe at Longchamp. Experience European racing atmosphere up close, with Japanese guidance even if it’s your first race day.',
      venue: 'Longchamp Racecourse (Paris)',
      ctaLabel: 'View details',
      notes: 'Programme may change with weather or race conditions. Details are confirmed at booking.',
      inclusions: [
        'Round-trip bus to Longchamp',
        'Standing ticket (Pelouse de l’Arrivée)',
        'Paddock access',
        'Course map & betting guide',
        'Japanese-speaking guide',
      ],
    },
    ja: {
      title: '凱旋門賞 2026 観戦バスツアー',
      label: '混乗バスツアー',
      badgeText: '2026 10.4 SUN 凱旋門賞観戦バスツアー',
      category: '季節限定・特別イベント',
      summary:
        'パリ・ロンシャン競馬場で開催される第105回凱旋門賞。世界トップクラスの騎手と名馬が競うヨーロッパ競馬の華やかな一日を、日本語ガイドとともに。',
      description:
        'パリ郊外のロンシャン競馬場で開催される凱旋門賞（Qatar Prix de l’Arc de Triomphe）を観戦する特別バスツアーです。ヨーロッパ競馬ならではの格式ある雰囲気と、出走馬・騎手の迫力を間近で体験できます。初めての競馬観戦でも安心の日本語ガイド同行付きです。',
      venue: 'ロンシャン競馬場（パリ）',
      ctaLabel: '詳細を見る',
      notes: '天候・出走状況により内容が変更となる場合があります。詳細はお申し込み時にご案内します。',
      inclusions: [
        'ロンシャン競馬場までの往復送迎バス',
        '立ち見チケット（Pelouse de l’Arrivée）',
        'パドック入場',
        '競馬場マップ・投票方法の説明資料',
        '日本語ガイド同行',
      ],
    },
  },
  {
    slug: 'paris-christmas-lights-2026',
    heroImageUrl: '',
    eventDate: '2026-12-15',
    priceFrom: 95,
    currency: 'EUR',
    featured: true,
    sortOrder: 2,
    en: {
      title: 'Paris Christmas lights evening stroll',
      label: 'Seasonal tour',
      badgeText: 'December 2026 Christmas season',
      category: 'Seasonal special event',
      summary: 'Champs-Élysées, Opéra and other winter light spots with a Japanese-speaking guide.',
      description:
        'Paris wrapped in lights at year-end. Enjoy markets and window displays on a safe evening walk — private or small group.',
      venue: 'Central Paris',
      ctaLabel: 'View details',
      notes: 'Dates may adjust for weather or crowds.',
      inclusions: [
        'Japanese-speaking guide',
        'Champs-Élysées & Opéra highlights',
        'Hot-drink break (venue dependent)',
        'Meeting-point guide',
      ],
    },
    ja: {
      title: 'パリ・クリスマスイルミネーション 夜の散策',
      label: '季節限定ツアー',
      badgeText: '2026 12月 クリスマスシーズン',
      category: '季節限定・特別イベント',
      summary:
        'シャンゼリゼ通りやオペラ座周辺など、パリの冬を彩る光の名所を日本語ガイドとゆっくり巡ります。',
      description:
        '年末のパリは街全体が光で包まれます。クリスマスマーケットやショーウィンドウを楽しみながら、安全に夜の散策をご案内します。少人数のプライベート／混乗いずれもご相談いただけます。',
      venue: 'パリ市内',
      ctaLabel: '詳細を見る',
      notes: '開催日は天候・混雑状況により調整する場合があります。',
      inclusions: [
        '日本語ガイド同行',
        'シャンゼリゼ・オペラ周辺の名所巡り',
        'ホットドリンクご休憩（店舗による）',
        '集合場所までのご案内資料',
      ],
    },
  },
] as const

export const SEED_SERVICES = [
  {
    icon: 'star',
    sortOrder: 1,
    en: {
      title: 'Paris day tours',
      category: 'Day tours',
      description:
        'Mont Saint-Michel, Versailles, the Louvre and more — small private groups with a Japanese-speaking guide.',
    },
    ja: {
      title: 'パリ発観光ツアー',
      category: '日帰りツアー',
      description: 'モン・サン・ミッシェル、ヴェルサイユ、ルーヴルなど。日本人ガイド付き少人数プライベートツアー。',
    },
  },
  {
    icon: 'car',
    sortOrder: 2,
    en: {
      title: 'Private car & Japanese guide',
      category: 'Car & guide',
      description: 'Explore Paris at your pace with a private car and Japanese-speaking guide.',
    },
    ja: {
      title: '専用車＆日本語ガイド',
      category: '専用車＆ガイド',
      description: '専用車と日本語ガイドで、ご自身のペースでパリを巡ります。',
    },
  },
  {
    icon: 'plane',
    sortOrder: 3,
    en: {
      title: 'Airport transfers',
      category: 'Airport transfer',
      description: 'Transfers between CDG / Orly and your hotel, with Japanese-language support.',
    },
    ja: {
      title: '空港送迎',
      category: '空港送迎',
      description: 'CDG／オルリーとホテル間の送迎。日本語サポート付き。',
    },
  },
  {
    icon: 'chat',
    sortOrder: 4,
    en: {
      title: 'Interpreting & escort',
      category: 'Interpreting',
      description: 'On-site support for meetings, inspections, trade shows and shopping trips.',
    },
    ja: {
      title: '通訳・エスコート・現地同行',
      category: '通訳・同行',
      description: '商談、視察、展示会、買い付けなど現地での同行サポート。',
    },
  },
  {
    icon: 'plus',
    sortOrder: 5,
    en: {
      title: 'Custom arrangements',
      category: 'Custom',
      description: 'Need something not listed? We’ll propose a plan tailored to your stay.',
    },
    ja: {
      title: 'オーダーメイド手配',
      category: 'オーダーメイド',
      description: '掲載以外のご希望も。パリ滞在に合わせたカスタムプランをご提案します。',
    },
  },
] as const

export const SEED_REASONS = [
  {
    number: '01',
    sortOrder: 1,
    en: {
      title: 'Paris-based Japanese staff',
      description: 'If something comes up on the ground, we support you on the spot — in Japanese or English.',
    },
    ja: {
      title: 'パリ在住の日本人スタッフ',
      description: '現地で困ったことがあっても、日本語でその場サポートいたします。',
    },
  },
  {
    number: '02',
    sortOrder: 2,
    en: {
      title: 'Fully private',
      description: 'No shared rides. Your booking is exclusive to your group.',
    },
    ja: {
      title: '完全プライベート',
      description: '相乗りなし。お客様のグループだけの貸切サービスです。',
    },
  },
  {
    number: '03',
    sortOrder: 3,
    en: {
      title: 'Trusted local network',
      description: 'Years of Paris know-how help us arrange high-quality experiences.',
    },
    ja: {
      title: '信頼できる現地ネットワーク',
      description: 'パリでの長年のネットワークと知見を活かし、質の高い手配を実現します。',
    },
  },
  {
    number: '04',
    sortOrder: 4,
    en: {
      title: 'Support during your stay',
      description: 'From arrival to departure, we stay in touch and help when you need us.',
    },
    ja: {
      title: '滞在中も安心のサポート',
      description: '出発から帰国まで、滞在中もこまめにご連絡・サポートします。',
    },
  },
] as const

export const SEED_FEES = [
  { price: '190€', sortOrder: 1, en: { label: '3 hours' }, ja: { label: '3時間' } },
  { price: '235€', sortOrder: 2, en: { label: '4 hours' }, ja: { label: '4時間' } },
  { price: '325€', sortOrder: 3, en: { label: '6 hours' }, ja: { label: '6時間' } },
  { price: '400€', sortOrder: 4, en: { label: '8 hours' }, ja: { label: '8時間' } },
  { price: '+45€', sortOrder: 5, en: { label: 'Each extra hour' }, ja: { label: '追加1時間ごと' } },
] as const

export const SEED_NEWS = [
  {
    dateLabel: '2026.06.01',
    sortOrder: 1,
    en: { title: 'Our website is now live.' },
    ja: { title: 'ウェブサイトを公開しました。' },
  },
  {
    dateLabel: '2026.05.20',
    sortOrder: 2,
    en: { title: 'Summer tour bookings are now open.' },
    ja: { title: '夏季観光ツアーの予約受付を開始しました。' },
  },
  {
    dateLabel: '2026.04.15',
    sortOrder: 3,
    en: { title: 'Airport transfer hours have been extended.' },
    ja: { title: '空港送迎サービスの営業時間を延長しました。' },
  },
] as const

export const SEED_TOUR_DETAILS = [
  {
    sortOrder: 1,
    en: { label: 'Group size', value: '1–6 guests per group' },
    ja: { label: '参加人数', value: '1グループあたり1〜6名' },
  },
  {
    sortOrder: 2,
    en: { label: 'Included', value: 'Japanese-speaking assistant guide' },
    ja: { label: '含まれるもの', value: '日本語アシスタントガイド' },
  },
  {
    sortOrder: 3,
    en: { label: 'Not included', value: 'Transport, meals and tickets' },
    ja: { label: '含まれないもの', value: '交通費、飲食費、チケット代' },
  },
  {
    sortOrder: 4,
    en: { label: 'Meeting point', value: 'Hotel lobby, or a place you choose' },
    ja: { label: '集合場所', value: 'ご滞在ホテルのロビー、またはご指定の場所' },
  },
  {
    sortOrder: 5,
    en: {
      label: 'Start time',
      value: 'Choose a start between 09:00 and 16:00.\n€55/hour after 20:00. Tours end by 22:00.',
    },
    ja: {
      label: 'ツアー開始時間',
      value:
        '9:00〜16:00の間でご希望の時間をお選びください。\n※20:00以降は1時間あたり追加55€。終了は22:00まで。',
    },
  },
  {
    sortOrder: 6,
    en: { label: 'Payment deadline', value: 'Within 72 hours of the booking confirmation email' },
    ja: { label: 'お支払い期限', value: '予約確認メール送信後、72時間以内' },
  },
  {
    sortOrder: 7,
    en: { label: 'Payment methods', value: 'Credit card (Visa / Mastercard) or bank transfer' },
    ja: { label: 'お支払い方法', value: 'クレジットカード（Visa / Mastercard）、銀行振込' },
  },
  {
    sortOrder: 8,
    en: {
      label: 'Booking confirmation',
      value: 'After payment is confirmed, we email your voucher. Bring a printout or show it on your phone.',
    },
    ja: {
      label: '予約確認',
      value: 'お支払い確認後、バウチャーをメールでお送りします。当日はプリントまたは画面表示をご持参ください。',
    },
  },
  {
    sortOrder: 9,
    en: {
      label: 'What to wear / bring',
      value:
        'Comfortable shoes, weather-ready clothes, and water. Montmartre and Le Marais have hills and cobblestones.',
    },
    ja: {
      label: '服装・持ち物',
      value: '歩きやすい靴、天候に合わせた服装、飲み物を。モンマルトルやマレは坂道・石畳が多いです。',
    },
  },
] as const

export const SEED_CANCEL = [
  {
    fee: '0%',
    alert: false,
    sortOrder: 1,
    en: { label: 'Up to 30 days before' },
    ja: { label: '参加日の30日前まで' },
  },
  {
    fee: '50%',
    alert: false,
    sortOrder: 2,
    en: { label: 'Up to 14 days before' },
    ja: { label: '参加日の14日前まで' },
  },
  {
    fee: '100%',
    alert: true,
    sortOrder: 3,
    en: { label: '13 days before to the day' },
    ja: { label: '参加日の13日前〜当日' },
  },
  {
    fee: '100%',
    alert: true,
    sortOrder: 4,
    en: { label: 'When tickets are arranged' },
    ja: { label: 'チケット手配がある場合' },
  },
] as const

export const SEED_NOTES = [
  {
    kind: 'fee',
    sortOrder: 1,
    en: { text: 'After 20:00, €55 per hour applies.' },
    ja: { text: '20:00以降は1時間あたり55€です。' },
  },
  {
    kind: 'fee',
    sortOrder: 2,
    en: { text: 'Prices are per group (1–6 guests).' },
    ja: { text: '料金は1グループ（1〜6名）あたりです。' },
  },
  {
    kind: 'fee',
    sortOrder: 3,
    en: { text: 'Transport, meals and tickets are not included.' },
    ja: { text: '交通費・飲食費・チケット代は含まれません。' },
  },
  {
    kind: 'important',
    sortOrder: 1,
    en: {
      text: 'Transport, admission and meals are not included in course prices. We can arrange them on request.',
    },
    ja: {
      text: '交通費・入場料・お食事は各コース料金に含まれません。ご希望により手配も可能です。',
    },
  },
  {
    kind: 'important',
    sortOrder: 2,
    en: {
      text: 'Many museums and sights need timed tickets — we recommend booking ahead.',
    },
    ja: {
      text: '多くの美術館・名所は時間帯予約が必要なため、事前のご予約をおすすめします。',
    },
  },
  {
    kind: 'cancellation',
    sortOrder: 1,
    en: {
      text: 'Arriving more than 30 minutes late without notice is treated as a cancellation.',
    },
    ja: {
      text: '事前連絡なく集合時刻から30分以上遅刻された場合は、キャンセル扱いとなります。',
    },
  },
  {
    kind: 'cancellation',
    sortOrder: 2,
    en: {
      text: 'Tickets we arrange are non-refundable (100% fee from booking).',
    },
    ja: {
      text: '当社手配のチケットはキャンセル不可です。予約時点からキャンセル料100%が発生します。',
    },
  },
] as const

export const SEED_SETTINGS_SHARED = {
  brandName: 'HMI',
  brandTagline: 'paris',
  contactEmail: 'info@hmiparis.com',
  contactPhone: '+33 1 84 00 00 00',
  heroImageUrl: '',
}

export const SEED_SETTINGS_EN = {
  studioLocation: 'Le Marais · 4th arrondissement, Paris',
  footerBlurb:
    'From sightseeing tours and private cars to interpreting and airport transfers — Paris-based Japanese staff support your whole stay.',
  heroEyebrow: 'HMI Paris · English & Japanese support',
  heroTitle: 'Feel at ease in Paris — in your language.',
  heroSubtitle:
    'Tours, private cars, interpreting and airport transfers. Paris-based Japanese staff support your stay.',
  servicesEyebrow: 'Our services',
  servicesTitle: 'Five ways we support your Paris stay',
  whyEyebrow: 'Why HMI Paris',
  whyItalic: 'What guests value',
  whyTitle: 'Clear support, every step of the way.',
  feesEyebrow: 'Pricing',
  feesTitle: 'Fee guide',
  packagesEyebrow: 'Featured experiences',
  packagesTitle: 'Paris packages by area',
  packagesIntro:
    'Montmartre, Le Marais, the Louvre, Versailles, the Seine — carefully chosen private experiences.',
  newsEyebrow: 'News',
  newsTitle: 'Updates',
  contactCtaTitle: 'Questions about your Paris stay? We’re happy to help.',
  contactCtaSubtitle: 'Quotes and consultations are free. Contact us in English or Japanese.',
  contactCtaButton: 'Contact us',
  reservationEyebrow: 'Booking',
  reservationTitle: 'Make your day in Paris special.',
  reservationSubtitle: 'Even if dates or themes are still open, feel free to ask.',
  reservationButton: 'Contact us',
  tourDetailsEyebrow: 'Practical details',
  tourDetailsTitle: 'Tour details',
  cancellationEyebrow: 'Cancellations',
  cancellationTitle: 'Cancellation policy',
  notesEyebrow: 'Please note',
  notesTitle: 'Before you book',
}

export const SEED_SETTINGS_JA = {
  studioLocation: 'マレ地区・パリ4区',
  footerBlurb:
    '観光ツアー、専用車サービスから通訳同行・空港送迎まで。パリ在住の日本人スタッフが、滞在全体を丁寧にサポートします。',
  heroEyebrow: 'HMI Paris ・ 日本語サポート',
  heroTitle: 'どんな場面でも、日本語で安心を。',
  heroSubtitle:
    '観光ツアー、専用車、通訳同行、空港送迎まで。パリ在住の日本人スタッフが、あなたの滞在を支えます。',
  servicesEyebrow: 'サービス一覧',
  servicesTitle: 'パリ滞在を支える5つのサービス',
  whyEyebrow: 'HMI Parisを選ぶ理由',
  whyItalic: '選ばれるポイント',
  whyTitle: '「日本語で安心」を、あらゆる場面で。',
  feesEyebrow: '料金について',
  feesTitle: '料金のご案内',
  packagesEyebrow: 'おすすめ体験',
  packagesTitle: 'パリのエリア別パッケージ',
  packagesIntro: 'モンマルトル、マレ、ルーヴル、ヴェルサイユ、セーヌなど、厳選した体験をご用意しています。',
  newsEyebrow: 'お知らせ',
  newsTitle: '新着情報',
  contactCtaTitle: 'パリ滞在に関するご相談は、お気軽にお問い合わせください。',
  contactCtaSubtitle: 'お見積り・ご相談は無料です。日本語でご連絡ください。',
  contactCtaButton: 'お問い合わせはこちら',
  reservationEyebrow: 'ご予約',
  reservationTitle: 'パリで、特別な一日を。',
  reservationSubtitle: 'エリアやテーマ、日程が決まっていなくても大丈夫です。お気軽にご相談ください。',
  reservationButton: 'お問い合わせ',
  tourDetailsEyebrow: '実施詳細',
  tourDetailsTitle: 'ツアー詳細',
  cancellationEyebrow: 'キャンセルについて',
  cancellationTitle: 'キャンセルポリシー',
  notesEyebrow: 'ご注意事項',
  notesTitle: 'ご確認ください',
}
