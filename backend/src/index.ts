import type { Core } from '@strapi/strapi'
import { ensureCapacityDefaults, ensureTourSessions } from './api/order/services/inventory'

const UID = {
  package: 'api::tour-package.tour-package',
  service: 'api::service.service',
  why: 'api::why-reason.why-reason',
  fee: 'api::fee-tier.fee-tier',
  news: 'api::news-item.news-item',
  tourDetail: 'api::tour-detail.tour-detail',
  cancel: 'api::cancellation-rule.cancellation-rule',
  note: 'api::site-note.site-note',
  settings: 'api::site-setting.site-setting',
  event: 'api::main-event.main-event',
  session: 'api::tour-session.tour-session',
} as const

const SEED_EVENTS = [
  {
    title: '凱旋門賞 2026 観戦バスツアー',
    slug: 'arc-de-triomphe-2026',
    label: '混乗バスツアー',
    badgeText: '2026 10.4 SUN 凱旋門賞観戦バスツアー',
    category: '季節限定・特別イベント',
    summary:
      'パリ・ロンシャン競馬場で開催される第105回凱旋門賞。世界トップクラスの騎手と名馬が競うヨーロッパ競馬の華やかな一日を、日本語ガイドとともに。',
    description:
      'パリ郊外のロンシャン競馬場で開催される凱旋門賞（Qatar Prix de l’Arc de Triomphe）を観戦する特別バスツアーです。ヨーロッパ競馬ならではの格式ある雰囲気と、出走馬・騎手の迫力を間近で体験できます。初めての競馬観戦でも安心の日本語ガイド同行付きです。',
    inclusions: [
      'ロンシャン競馬場までの往復送迎バス',
      '立ち見チケット（Pelouse de l’Arrivée）',
      'パドック入場',
      '競馬場マップ・投票方法の説明資料',
      '日本語ガイド同行',
    ],
    heroImageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80',
    eventDate: '2026-10-04',
    venue: 'ロンシャン競馬場（パリ）',
    priceFrom: 180,
    currency: 'EUR',
    ctaLabel: '詳細を見る',
    featured: true,
    sortOrder: 1,
    notes: '天候・出走状況により内容が変更となる場合があります。詳細はお申し込み時にご案内します。',
  },
  {
    title: 'パリ・クリスマスイルミネーション 夜の散策',
    slug: 'paris-christmas-lights-2026',
    label: '季節限定ツアー',
    badgeText: '2026 12月 クリスマスシーズン',
    category: '季節限定・特別イベント',
    summary:
      'シャンゼリゼ通りやオペラ座周辺など、パリの冬を彩る光の名所を日本語ガイドとゆっくり巡ります。',
    description:
      '年末のパリは街全体が光で包まれます。クリスマスマーケットやショーウィンドウを楽しみながら、安全に夜の散策をご案内します。少人数のプライベート／混乗いずれもご相談いただけます。',
    inclusions: [
      '日本語ガイド同行',
      'シャンゼリゼ・オペラ周辺の名所巡り',
      'ホットドリンクご休憩（店舗による）',
      '集合場所までのご案内資料',
    ],
    heroImageUrl:
      'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?auto=format&fit=crop&w=1600&q=80',
    eventDate: '2026-12-15',
    venue: 'パリ市内',
    priceFrom: 95,
    currency: 'EUR',
    ctaLabel: '詳細を見る',
    featured: true,
    sortOrder: 2,
    notes: '開催日は天候・混雑状況により調整する場合があります。',
  },
] as const

const SEED_PACKAGES = [
  {
    title: 'クラシック・パリ入門',
    slug: 'classic-paris-essentials',
    summary: 'ルーヴルの朝、シテ島、セーヌ河畔で過ごすゆとりの午後。',
    description: '慌ただしさのない3日間。時間指定のルーヴル入場、シテ島のガイド散策、河畔カフェでの休息も。',
    destination: 'ルーヴル＆シテ島',
    region: 'パリ',
    durationDays: 3,
    priceFrom: 890,
    currency: 'EUR',
    featured: true,
    difficulty: 'easy',
    highlights: ['ルーヴル時間指定入場', 'シテ島ウォーキング', 'セーヌ河畔カフェ'],
  },
  {
    title: 'モンマルトル・アフターダーク',
    slug: 'montmartre-after-dark',
    summary: '村のような路地、サクレ・クールの夕景、屋上からの夜景ディナー。',
    description: 'モンマルトルの静かな路地をたそがれに歩くプラン。サクレ・クールのゴールデンアワーの後は屋上ディナー。',
    destination: 'モンマルトル',
    region: 'パリ',
    durationDays: 1,
    priceFrom: 280,
    currency: 'EUR',
    featured: true,
    difficulty: 'easy',
    highlights: ['サクレ・クール夕景', '隠れた階段散策', '屋上ディナー'],
  },
  {
    title: 'マレ地区プライベートウォーク',
    slug: 'le-marais-private-walk',
    summary: 'オテル・パルティキュリエ、ヴォージュ広場、話題のスイーツ巡り。',
    description: 'マレ地区を半日プライベートガイド。中庭、ヴォージュ広場、地元おすすめの試食スポットへ。',
    destination: 'マレ地区',
    region: 'パリ',
    durationDays: 1,
    priceFrom: 195,
    currency: 'EUR',
    featured: true,
    difficulty: 'easy',
    highlights: ['ヴォージュ広場', '中庭アクセス', 'スイーツ＆ファラフェル'],
  },
  {
    title: 'ヴェルサイユ・ロイヤルデー',
    slug: 'versailles-royal-day',
    summary: '宮殿・庭園・トリアノン。パリ市内からの往復送迎付き。',
    description: 'スキップ・ザ・ラインで宮殿へ。庭園ガイド、マリー・アントワネットの集落で自由時間。送迎込み。',
    destination: 'ヴェルサイユ',
    region: 'パリ',
    durationDays: 1,
    priceFrom: 245,
    currency: 'EUR',
    featured: false,
    difficulty: 'moderate',
    highlights: ['優先入場', '庭園＆トリアノン', 'パリ送迎'],
  },
  {
    title: '左岸文学散策',
    slug: 'left-bank-literary-trail',
    summary: 'サン＝ジェルマンの本屋、カフェ文化、黄昏のリュクサンブール。',
    description: 'シェイクスピア・アンド・カンパニー、サン＝ジェルマンのカフェ、リュクサンブール公園をゆるやかに巡ります。',
    destination: 'サン＝ジェルマン＆カルチエ・ラタン',
    region: 'パリ',
    durationDays: 1,
    priceFrom: 165,
    currency: 'EUR',
    featured: false,
    difficulty: 'easy',
    highlights: ['シェイクスピア・アンド・カンパニー', 'カフェテラス', 'リュクサンブール公園'],
  },
  {
    title: 'セーヌ夕暮れクルーズ',
    slug: 'seine-twilight-cruise',
    summary: 'エッフェル塔、オルセー、ノートルダムを川から眺める夜。',
    description: '夕暮れの乗船。船上シャンパン、川面からの名所巡り。河岸ディナーはオプション。',
    destination: 'セーヌ川',
    region: 'パリ',
    durationDays: 1,
    priceFrom: 320,
    currency: 'EUR',
    featured: false,
    difficulty: 'easy',
    highlights: ['夕暮れ出発', '船上シャンパン', '河岸ディナー（任意）'],
  },
] as const

const SEED_SERVICES = [
  { title: 'パリ発観光ツアー', category: '日帰りツアー', description: 'モン・サン・ミッシェル、ヴェルサイユ、ルーヴルなど。日本人ガイド付き少人数プライベートツアー。', icon: 'star', sortOrder: 1 },
  { title: '専用車＆日本語ガイド', category: '専用車＆ガイド', description: '専用車と日本語ガイドで、ご自身のペースでパリを巡ります。', icon: 'car', sortOrder: 2 },
  { title: '空港送迎', category: '空港送迎', description: 'CDG／オルリーとホテル間の送迎。日本語サポート付き。', icon: 'plane', sortOrder: 3 },
  { title: '通訳・エスコート・現地同行', category: '通訳・同行', description: '商談、視察、展示会、買い付けなど現地での同行サポート。', icon: 'chat', sortOrder: 4 },
  { title: 'オーダーメイド手配', category: 'オーダーメイド', description: '掲載以外のご希望も。パリ滞在に合わせたカスタムプランをご提案します。', icon: 'plus', sortOrder: 5 },
] as const

const SEED_REASONS = [
  { number: '01', title: 'パリ在住の日本人スタッフ', description: '現地で困ったことがあっても、日本語でその場サポートいたします。', sortOrder: 1 },
  { number: '02', title: '完全プライベート', description: '相乗りなし。お客様のグループだけの貸切サービスです。', sortOrder: 2 },
  { number: '03', title: '信頼できる現地ネットワーク', description: 'パリでの長年のネットワークと知見を活かし、質の高い手配を実現します。', sortOrder: 3 },
  { number: '04', title: '滞在中も安心のサポート', description: '出発から帰国まで、滞在中もこまめにご連絡・サポートします。', sortOrder: 4 },
] as const

const SEED_FEES = [
  { label: '3時間', price: '190€', sortOrder: 1 },
  { label: '4時間', price: '235€', sortOrder: 2 },
  { label: '6時間', price: '325€', sortOrder: 3 },
  { label: '8時間', price: '400€', sortOrder: 4 },
  { label: '追加1時間ごと', price: '+45€', sortOrder: 5 },
] as const

const SEED_NEWS = [
  { dateLabel: '2026.06.01', title: 'ウェブサイトを公開しました。', sortOrder: 1 },
  { dateLabel: '2026.05.20', title: '夏季観光ツアーの予約受付を開始しました。', sortOrder: 2 },
  { dateLabel: '2026.04.15', title: '空港送迎サービスの営業時間を延長しました。', sortOrder: 3 },
] as const

const SEED_TOUR_DETAILS = [
  { label: '参加人数', value: '1グループあたり1〜6名', sortOrder: 1 },
  { label: '含まれるもの', value: '日本語アシスタントガイド', sortOrder: 2 },
  { label: '含まれないもの', value: '交通費、飲食費、チケット代', sortOrder: 3 },
  { label: '集合場所', value: 'ご滞在ホテルのロビー、またはご指定の場所', sortOrder: 4 },
  { label: 'ツアー開始時間', value: '9:00〜16:00の間でご希望の時間をお選びください。\n※20:00以降は1時間あたり追加55€。終了は22:00まで。', sortOrder: 5 },
  { label: 'お支払い期限', value: '予約確認メール送信後、72時間以内', sortOrder: 6 },
  { label: 'お支払い方法', value: 'クレジットカード（Visa / Mastercard）、銀行振込', sortOrder: 7 },
  { label: '予約確認', value: 'お支払い確認後、バウチャーをメールでお送りします。当日はプリントまたは画面表示をご持参ください。', sortOrder: 8 },
  { label: '服装・持ち物', value: '歩きやすい靴、天候に合わせた服装、飲み物を。モンマルトルやマレは坂道・石畳が多いです。', sortOrder: 9 },
] as const

const SEED_CANCEL = [
  { label: '参加日の30日前まで', fee: '0%', alert: false, sortOrder: 1 },
  { label: '参加日の14日前まで', fee: '50%', alert: false, sortOrder: 2 },
  { label: '参加日の13日前〜当日', fee: '100%', alert: true, sortOrder: 3 },
  { label: 'チケット手配がある場合', fee: '100%', alert: true, sortOrder: 4 },
] as const

const SEED_NOTES = [
  { kind: 'fee', text: '20:00以降は1時間あたり55€です。', sortOrder: 1 },
  { kind: 'fee', text: '料金は1グループ（1〜6名）あたりです。', sortOrder: 2 },
  { kind: 'fee', text: '交通費・飲食費・チケット代は含まれません。', sortOrder: 3 },
  { kind: 'important', text: '交通費・入場料・お食事は各コース料金に含まれません。ご希望により手配も可能です。', sortOrder: 1 },
  { kind: 'important', text: '多くの美術館・名所は時間帯予約が必要なため、事前のご予約をおすすめします。', sortOrder: 2 },
  { kind: 'cancellation', text: '事前連絡なく集合時刻から30分以上遅刻された場合は、キャンセル扱いとなります。', sortOrder: 1 },
  { kind: 'cancellation', text: '当社手配のチケットはキャンセル不可です。予約時点からキャンセル料100%が発生します。', sortOrder: 2 },
] as const

const SEED_SETTINGS = {
  brandName: 'HMI',
  brandTagline: 'paris',
  contactEmail: 'info@hmiparis.com',
  contactPhone: '+33 1 84 00 00 00',
  studioLocation: 'マレ地区・パリ4区',
  footerBlurb:
    '観光ツアー、専用車サービスから通訳同行・空港送迎まで。パリ在住の日本人スタッフが、滞在全体を丁寧にサポートします。',
  heroEyebrow: 'HMI Paris ・ 日本語サポート',
  heroTitle: 'どんな場面でも、日本語で安心を。',
  heroSubtitle:
    '観光ツアー、専用車、通訳同行、空港送迎まで。パリ在住の日本人スタッフが、あなたの滞在を支えます。',
  heroImageUrl:
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80',
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

const PUBLIC_ACTIONS = [
  `${UID.package}.find`,
  `${UID.package}.findOne`,
  `${UID.service}.find`,
  `${UID.service}.findOne`,
  `${UID.why}.find`,
  `${UID.why}.findOne`,
  `${UID.fee}.find`,
  `${UID.fee}.findOne`,
  `${UID.news}.find`,
  `${UID.news}.findOne`,
  `${UID.tourDetail}.find`,
  `${UID.tourDetail}.findOne`,
  `${UID.cancel}.find`,
  `${UID.cancel}.findOne`,
  `${UID.note}.find`,
  `${UID.note}.findOne`,
  `${UID.settings}.find`,
  `${UID.event}.find`,
  `${UID.event}.findOne`,
  `${UID.session}.find`,
  `${UID.session}.findOne`,
]

async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  })
  if (!publicRole) return

  for (const action of PUBLIC_ACTIONS) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: { action, role: publicRole.id },
    })
    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      })
    }
  }
}

async function clearCollection(strapi: Core.Strapi, uid: string) {
  const entries = await strapi.db.query(uid).findMany()
  for (const entry of entries) {
    await strapi.documents(uid as any).delete({ documentId: entry.documentId })
  }
}

async function seedCollection(strapi: Core.Strapi, uid: string, rows: Record<string, unknown>[]) {
  await clearCollection(strapi, uid)
  for (const row of rows) {
    await strapi.documents(uid as any).create({
      data: row,
      status: 'published',
    })
  }
  strapi.log.info(`Seeded ${rows.length} → ${uid}`)
}

async function seedPackages(strapi: Core.Strapi) {
  await clearCollection(strapi, UID.package)
  for (const pkg of SEED_PACKAGES) {
    await strapi.documents(UID.package).create({
      data: {
        ...pkg,
        highlights: [...pkg.highlights],
        slotsTotal: 10,
        slotsSold: 0,
        bookingUnlimited: false,
      },
      status: 'published',
    })
  }
  strapi.log.info(`Seeded ${SEED_PACKAGES.length} tour packages (JA)`)
}

async function seedSettings(strapi: Core.Strapi) {
  const existing = await strapi.documents(UID.settings).findFirst({})
  if (existing?.documentId) {
    await strapi.documents(UID.settings).update({
      documentId: existing.documentId,
      data: SEED_SETTINGS,
      status: 'published',
    })
  } else {
    await strapi.documents(UID.settings).create({
      data: SEED_SETTINGS,
      status: 'published',
    })
  }
  strapi.log.info('Seeded site settings (JA)')
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPermissions(strapi)

    const settings = await strapi.documents(UID.settings).findFirst({})
    const needsJapanese = !settings?.heroTitle?.includes('日本語')

    if (needsJapanese) {
      await seedPackages(strapi)
      await seedCollection(strapi, UID.service, [...SEED_SERVICES])
      await seedCollection(strapi, UID.why, [...SEED_REASONS])
      await seedCollection(strapi, UID.fee, [...SEED_FEES])
      await seedCollection(strapi, UID.news, [...SEED_NEWS])
      await seedCollection(strapi, UID.tourDetail, [...SEED_TOUR_DETAILS])
      await seedCollection(strapi, UID.cancel, [...SEED_CANCEL])
      await seedCollection(strapi, UID.note, [...SEED_NOTES])
      await seedSettings(strapi)
    } else {
      strapi.log.info('Japanese content already present — skip reseed')
    }

    // Main events: seed only when empty (admin can add/delete freely)
    const eventCount = await strapi.db.query(UID.event).count()
    if (eventCount === 0) {
      for (const event of SEED_EVENTS) {
        await strapi.documents(UID.event).create({
          data: {
            ...event,
            inclusions: [...event.inclusions],
            slotsTotal: 20,
            slotsSold: 0,
            bookingUnlimited: false,
          },
          status: 'published',
        })
      }
      strapi.log.info(`Seeded ${SEED_EVENTS.length} main events`)
    }

    await ensureCapacityDefaults(strapi)
    await ensureTourSessions(strapi, 6)
  },
}
