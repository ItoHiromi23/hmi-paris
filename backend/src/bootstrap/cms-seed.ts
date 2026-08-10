/**
 * CMS seed content: English is the default/source locale; Japanese is a linked localization.
 * Shared (non-localized) fields live alongside locale-specific copy.
 */

export type LocaleCopy = Record<string, unknown>

/** Shared booking/payment/cancellation copy used across day tours (override per package if needed). */
const POLICY_EN = {
  paymentDeadline: 'Within 72 hours of the time the booking confirmation email was sent.',
  paymentMethods: 'Credit card (Visa, Mastercard), bank transfer',
  reservationConfirmation:
    'After payment is confirmed, a voucher will be sent by email. Please print it or take a screenshot — this serves as your participation ticket on the day.',
  cancellationConditions:
    '* If you are more than 30 minutes late for the meeting time without prior notice, your reservation will be considered cancelled.\n\nUp to 30 days before the participation date: 0%\nUp to 29 to 14 days before the participation date: 50%\n13 days before the event date to the day of the event: 100%\nIf a ticket fee is required: 100%',
} as const

const POLICY_JA = {
  paymentDeadline: '予約確定メール送信時点から72時間以内。',
  paymentMethods: 'クレジットカード（Visa、Mastercard）、銀行振込',
  reservationConfirmation:
    'お支払い確認後、バウチャーをメールでお送りします。印刷またはスクリーンショットをご用意ください。当日は参加証としてご提示ください。',
  cancellationConditions:
    '※集合時間に事前連絡なく30分以上遅れた場合、キャンセル扱いとなります。\n\n参加日の30日前まで：0%\n参加日の29〜14日前：50%\n参加日の13日前〜当日：100%\nチケット料金が必要な場合：100%',
} as const

export const SEED_PACKAGES = [
  {
    slug: 'classic-paris-essentials',
    durationDays: 3,
    priceFrom: 890,
    currency: 'EUR',
    featured: true,
    difficulty: 'easy',
    enquiryEmail: 'classic@hmiparis.com',
    en: {
      title: 'Classic Paris essentials',
      summary: 'A Louvre morning, Île de la Cité, and an easy afternoon by the Seine.',
      description:
        'Three unhurried days: timed Louvre entry, a guided walk on Île de la Cité, and café time by the river.',
      destination: 'Louvre & Île de la Cité',
      region: 'Paris',
      highlights: ['Timed Louvre entry', 'Île de la Cité walk', 'Seine-side café'],
      groupSize: '1 to 6 people (1 group)',
      durationLabel: '3 days',
      departureTime: 'By arrangement (typically 9:00 / 10:00)',
      meetingPlace: 'Hotel lobbies (limited to hotels in Paris)',
      feeNote: 'From €890',
      included: ['Private car (including highway tolls)', 'Japanese-speaking guide', 'Timed Louvre entry'],
      notIncluded: ['Museum tickets beyond timed Louvre entry', 'Meals'],
      ...POLICY_EN,
    },
    ja: {
      title: 'クラシック・パリ入門',
      summary: 'ルーヴルの朝、シテ島、セーヌ河畔で過ごすゆとりの午後。',
      description:
        '慌ただしさのない3日間。時間指定のルーヴル入場、シテ島のガイド散策、河畔カフェでの休息も。',
      destination: 'ルーヴル＆シテ島',
      region: 'パリ',
      highlights: ['ルーヴル時間指定入場', 'シテ島ウォーキング', 'セーヌ河畔カフェ'],
      groupSize: '1〜6名（1グループ）',
      durationLabel: '3日間',
      departureTime: 'ご相談のうえ決定（目安 9:00 / 10:00）',
      meetingPlace: 'ホテルロビー（パリ市内ホテルに限る）',
      feeNote: '€890〜',
      included: ['専用車（高速道路料金含む）', '日本語ガイド', 'ルーヴル時間指定入場'],
      notIncluded: ['ルーヴル以外の美術館チケット', '食事代'],
      ...POLICY_JA,
    },
  },
  {
    slug: 'montmartre-after-dark',
    durationDays: 1,
    priceFrom: 280,
    currency: 'EUR',
    featured: true,
    difficulty: 'easy',
    enquiryEmail: 'montmartre@hmiparis.com',
    en: {
      title: 'Montmartre after dark',
      summary: 'Village lanes, Sacré-Cœur at sunset, and a rooftop dinner with city lights.',
      description:
        'A twilight walk through quiet Montmartre streets, golden hour at Sacré-Cœur, then rooftop dining.',
      destination: 'Montmartre',
      region: 'Paris',
      highlights: ['Sacré-Cœur sunset', 'Hidden stairways', 'Rooftop dinner'],
      groupSize: '1 to 6 people (1 group)',
      durationLabel: '4 hours',
      departureTime: '16:00 / 17:00',
      meetingPlace: 'Hotel lobbies (limited to hotels in Paris) or Abbesses',
      feeNote: 'From €280',
      included: ['Japanese-speaking guide', 'Walking route planning'],
      notIncluded: ['Rooftop dinner', 'Drinks'],
      ...POLICY_EN,
    },
    ja: {
      title: 'モンマルトル・アフターダーク',
      summary: '村のような路地、サクレ・クールの夕景、屋上からの夜景ディナー。',
      description:
        'モンマルトルの静かな路地をたそがれに歩くプラン。サクレ・クールのゴールデンアワーの後は屋上ディナー。',
      destination: 'モンマルトル',
      region: 'パリ',
      highlights: ['サクレ・クール夕景', '隠れた階段散策', '屋上ディナー'],
      groupSize: '1〜6名（1グループ）',
      durationLabel: '約4時間',
      departureTime: '16:00 / 17:00',
      meetingPlace: 'ホテルロビー（パリ市内）またはアベス',
      feeNote: '€280〜',
      included: ['日本語ガイド', 'ルート案内'],
      notIncluded: ['屋上ディナー', '飲み物'],
      ...POLICY_JA,
    },
  },
  {
    slug: 'le-marais-private-walk',
    durationDays: 1,
    priceFrom: 195,
    currency: 'EUR',
    featured: true,
    difficulty: 'easy',
    enquiryEmail: 'marais@hmiparis.com',
    en: {
      title: 'Le Marais private walk',
      summary: 'Hôtels particuliers, Place des Vosges, and local sweet stops.',
      description:
        'A half-day private guide through Le Marais: courtyards, Place des Vosges, and favourite tasting spots.',
      destination: 'Le Marais',
      region: 'Paris',
      highlights: ['Place des Vosges', 'Courtyard access', 'Sweets & falafel'],
      groupSize: '1 to 6 people (1 group)',
      durationLabel: '4 hours',
      departureTime: '9:00 / 10:00 / 14:00',
      meetingPlace: 'Hotel lobbies (limited to hotels in Paris)',
      feeNote: 'From €195',
      included: ['Japanese-speaking guide', 'Walking tour'],
      notIncluded: ['Food tastings', 'Shopping'],
      ...POLICY_EN,
    },
    ja: {
      title: 'マレ地区プライベートウォーク',
      summary: 'オテル・パルティキュリエ、ヴォージュ広場、話題のスイーツ巡り。',
      description: 'マレ地区を半日プライベートガイド。中庭、ヴォージュ広場、地元おすすめの試食スポットへ。',
      destination: 'マレ地区',
      region: 'パリ',
      highlights: ['ヴォージュ広場', '中庭アクセス', 'スイーツ＆ファラフェル'],
      groupSize: '1〜6名（1グループ）',
      durationLabel: '約4時間',
      departureTime: '9:00 / 10:00 / 14:00',
      meetingPlace: 'ホテルロビー（パリ市内ホテルに限る）',
      feeNote: '€195〜',
      included: ['日本語ガイド', 'ウォーキングツアー'],
      notIncluded: ['試食・食事代', 'お買い物'],
      ...POLICY_JA,
    },
  },
  {
    slug: 'versailles-royal-day',
    durationDays: 1,
    priceFrom: 1620,
    currency: 'EUR',
    featured: false,
    difficulty: 'moderate',
    enquiryEmail: 'versailles@hmiparis.com',
    en: {
      title: 'Versailles royal day',
      summary: 'Palace, gardens and Trianon — with return transfers from Paris.',
      description:
        'Skip-the-line palace entry, garden guiding, free time at Marie Antoinette’s hamlet, transfers included.',
      destination: 'Versailles',
      region: 'Paris',
      highlights: ['Priority entry', 'Gardens & Trianon', 'Paris transfers'],
      groupSize: '1 to 6 people (1 group)',
      durationLabel: '8 hours',
      departureTime: '8:00 / 9:00 / 10:00',
      meetingPlace: 'Hotel lobbies (limited to hotels in Paris)',
      feeNote: 'From €1,620',
      included: [
        'Private car (including highway tolls)',
        'Japanese assistant guide',
      ],
      notIncluded: [
        'Palace entrance ticket (prices vary depending on the maison or course)',
        'Meal expenses',
      ],
      ...POLICY_EN,
    },
    ja: {
      title: 'ヴェルサイユ・ロイヤルデー',
      summary: '宮殿・庭園・トリアノン。パリ市内からの往復送迎付き。',
      description:
        'スキップ・ザ・ラインで宮殿へ。庭園ガイド、マリー・アントワネットの集落で自由時間。送迎込み。',
      destination: 'ヴェルサイユ',
      region: 'パリ',
      highlights: ['優先入場', '庭園＆トリアノン', 'パリ送迎'],
      groupSize: '1〜6名（1グループ）',
      durationLabel: '8時間',
      departureTime: '8:00 / 9:00 / 10:00',
      meetingPlace: 'ホテルロビー（パリ市内ホテルに限る）',
      feeNote: '€1,620〜',
      included: ['専用車（高速道路料金含む）', '日本語アシスタントガイド'],
      notIncluded: ['宮殿入場チケット（メゾン・コースにより料金が異なります）', '食事代'],
      ...POLICY_JA,
    },
  },
  {
    slug: 'left-bank-literary-trail',
    durationDays: 1,
    priceFrom: 165,
    currency: 'EUR',
    featured: false,
    difficulty: 'easy',
    enquiryEmail: 'leftbank@hmiparis.com',
    en: {
      title: 'Left Bank literary trail',
      summary: 'Saint-Germain bookshops, café culture, and dusk in the Luxembourg Gardens.',
      description:
        'A gentle route via Shakespeare and Company, Saint-Germain cafés and the Luxembourg Gardens.',
      destination: 'Saint-Germain & Latin Quarter',
      region: 'Paris',
      highlights: ['Shakespeare and Company', 'Café terraces', 'Luxembourg Gardens'],
      groupSize: '1 to 6 people (1 group)',
      durationLabel: '3 hours',
      departureTime: '10:00 / 14:00',
      meetingPlace: 'Hotel lobbies (limited to hotels in Paris) or Saint-Michel',
      feeNote: 'From €165',
      included: ['Japanese-speaking guide'],
      notIncluded: ['Café / bookshop purchases', 'Meals'],
      ...POLICY_EN,
    },
    ja: {
      title: '左岸文学散策',
      summary: 'サン＝ジェルマンの本屋、カフェ文化、黄昏のリュクサンブール。',
      description:
        'シェイクスピア・アンド・カンパニー、サン＝ジェルマンのカフェ、リュクサンブール公園をゆるやかに巡ります。',
      destination: 'サン＝ジェルマン＆カルチエ・ラタン',
      region: 'パリ',
      highlights: ['シェイクスピア・アンド・カンパニー', 'カフェテラス', 'リュクサンブール公園'],
      groupSize: '1〜6名（1グループ）',
      durationLabel: '約3時間',
      departureTime: '10:00 / 14:00',
      meetingPlace: 'ホテルロビー（パリ市内）またはサン＝ミシェル',
      feeNote: '€165〜',
      included: ['日本語ガイド'],
      notIncluded: ['カフェ・書店でのお買い物', '食事代'],
      ...POLICY_JA,
    },
  },
  {
    slug: 'seine-twilight-cruise',
    durationDays: 1,
    priceFrom: 320,
    currency: 'EUR',
    featured: false,
    difficulty: 'easy',
    enquiryEmail: 'seine@hmiparis.com',
    en: {
      title: 'Seine twilight cruise',
      summary: 'The Eiffel Tower, Musée d’Orsay and Notre-Dame from the river at night.',
      description:
        'Evening boarding, champagne on board, landmarks from the water. Riverside dinner optional.',
      destination: 'River Seine',
      region: 'Paris',
      highlights: ['Twilight departure', 'Champagne on board', 'Optional riverside dinner'],
      groupSize: '1 to 6 people (1 group)',
      durationLabel: '2.5 hours',
      departureTime: '18:00 / 19:00',
      meetingPlace: 'Pier meeting point (details sent after booking)',
      feeNote: 'From €320',
      included: ['Cruise ticket', 'Champagne on board', 'Japanese-speaking host'],
      notIncluded: ['Riverside dinner (optional)', 'Transfer to pier'],
      ...POLICY_EN,
    },
    ja: {
      title: 'セーヌ夕暮れクルーズ',
      summary: 'エッフェル塔、オルセー、ノートルダムを川から眺める夜。',
      description: '夕暮れの乗船。船上シャンパン、川面からの名所巡り。河岸ディナーはオプション。',
      destination: 'セーヌ川',
      region: 'パリ',
      highlights: ['夕暮れ出発', '船上シャンパン', '河岸ディナー（任意）'],
      groupSize: '1〜6名（1グループ）',
      durationLabel: '約2.5時間',
      departureTime: '18:00 / 19:00',
      meetingPlace: '乗船桟橋（予約後にご案内）',
      feeNote: '€320〜',
      included: ['クルーズチケット', '船上シャンパン', '日本語ホスト'],
      notIncluded: ['河岸ディナー（任意）', '桟橋までの送迎'],
      ...POLICY_JA,
    },
  },
] as const

export const SEED_EVENTS = [
  {
    slug: 'arc-de-triomphe-2026',
    heroImageUrl: '',
    aboutImageUrl: '/images/events/arc-about.jpg',
    highlightsImageUrl: '/images/events/arc-highlights.jpg',
    meetingImageUrl: '/images/events/arc-meeting.jpg',
    eventDate: '2026-10-04',
    priceFrom: 160,
    currency: 'EUR',
    featured: true,
    sortOrder: 1,
    en: {
      title: 'Prix de l’Arc de Triomphe viewing tour',
      label: 'Shared bus tour',
      badgeText: '2026 10.4 SUN Arc de Triomphe viewing bus tour',
      category: 'Qatar Prix de l’Arc de Triomphe',
      summary:
        'Sunday 4 October 2026 at ParisLongchamp — the 105th Arc, with a Japanese-speaking guide and round-trip bus.',
      description:
        'A special bus tour to watch the Qatar Prix de l’Arc de Triomphe at Longchamp.',
      venue: 'ParisLongchamp Racecourse',
      ctaLabel: 'View details',
      notes: '',
      subLatin: 'ParisLongchamp — 4 October 2026',
      edition: '105th edition',
      guideLabel: 'Japanese-speaking guide',
      navLinks: [
        { href: '#about', label: 'The race' },
        { href: '#highlights', label: 'Highlights' },
        { href: '#tour', label: 'What’s included' },
        { href: '#flow', label: 'Programme' },
        { href: '#details', label: 'Price & details' },
        { href: '#booking', label: 'Booking' },
        { href: '#notes', label: 'Please note' },
      ],
      aboutKicker: 'The Race',
      aboutTitle: 'A Sunday in October when Paris holds its breath',
      aboutLead:
        'On the first weekend of October, the Bois de Boulogne comes alive. Thoroughbreds from France, Ireland, Britain, Germany and Japan gather at ParisLongchamp. Over 2,400 metres and roughly two and a half minutes, €5 million in prize money is on the line.',
      aboutBody:
        '4 October 2026 marks the memorable 105th running. As of May registration, last year’s winner Daryz and Japanese contenders including Forever Young are among seven Japanese horses listed. The final field is confirmed at the end of September.\n\nJoin the world’s premier race — also a stage for European high society. Elegant dresses and hats, champagne in hand: enjoy the unique atmosphere of a European racecourse.',
      aboutImageCaption:
        'The stands at ParisLongchamp and the lawn (Pelouse) spread out in front.',
      highlightsKicker: 'Highlights',
      highlightsTitle: 'What you will witness on the day',
      highlights: [
        {
          num: '①',
          title: 'The paddock, up close',
          body: 'Before the race, runners circle the paddock. Coat, presence, and the tension as jockeys mount — the power of a thoroughbred that television never fully conveys.',
          caveat: '',
        },
        {
          num: '②',
          title: 'The final straight from the lawn',
          body: 'Your viewing area is the standing general admission along the home straight (Pelouse de l’Arrivée). Horses thunder past; hoofbeats and cheers from every side. Feel the Arc’s climax in the most visceral place.',
          caveat: '※ Access to the enclosed OR enclosure (Pelouse de l’Arrivée OR) is not included.',
        },
        {
          num: '③',
          title: 'Betting made clear, in Japanese',
          body: 'French betting differs from Japan in system and terms. You receive a course map and a Japanese guide to wagering. Even first-timers may find one ticket changes how the race feels.',
          caveat: '',
        },
      ],
      highlightsImageCaption:
        'The paddock (ronde de présentation) — runners circle in front of the crowd before the race.',
      tourKicker: "What's Included",
      tourTitle: 'What’s included in the tour',
      inclusions: [
        'Round-trip bus from central Paris',
        'Standing ticket (Pelouse de l’Arrivée)',
        'Paddock access',
        'Japanese-speaking guide',
        'Racecourse map (Japanese)',
        'Betting & ticket-purchase guide (Japanese)',
      ],
      exclusionsTitle: 'Not included',
      exclusions: [
        'Food and drink (many food trucks, kiosks and bars on site)',
        'Betting stakes',
      ],
      tourNote:
        'Pelouse standing areas do not guarantee a seat. Expect long periods on your feet — wear comfortable shoes.',
      flowKicker: 'Programme',
      flowTitle: 'Day schedule',
      schedule: [
        { time: '10:30', what: 'Meet at Place Saint-Augustin, by the Jeanne d’Arc equestrian statue. Your guide will welcome you.' },
        { time: '10:40', what: 'Depart by bus for Longchamp.' },
        { time: '11:30', what: 'Arrive at the Longchamp bus parking. Enter after security checks.' },
        { time: '16:05', what: 'Arc de Triomphe off. Watch from the lawn.' },
        { time: '17:40', what: 'After the ceremony, regroup and return to central Paris by bus.' },
        { time: '18:30', what: 'Disband near Place Saint-Augustin.' },
      ],
      meetingTitle: 'Meeting-point landmark',
      meetingBody:
        'The Jeanne d’Arc equestrian statue on the square in front of Église Saint-Augustin. Your guide waits by the statue.',
      meetingCaveat:
        'Place Saint-Augustin, 75008 Paris / Métro line 9, Saint-Augustin — exit at the station.',
      meetingImageCaption: '',
      flowNote:
        'Start times and the day’s programme may change according to France Galop’s official announcements.',
      detailsKicker: 'Price & Practical',
      detailsTitle: 'Price & tour details',
      detailRows: [
        { label: 'Date', value: 'Sunday 4 October 2026' },
        { label: 'Price', value: '€160 per person' },
        { label: 'Minimum', value: '1 guest' },
        { label: 'Capacity', value: 'Places are limited' },
        {
          label: 'Meeting point',
          value:
            'Place Saint-Augustin, 75008 Paris / Métro line 9, Saint-Augustin\nNear the Jeanne d’Arc equestrian statue',
        },
        { label: 'Meeting time', value: '10:30' },
        { label: 'Disband', value: 'Near Place Saint-Augustin / around 18:30' },
        { label: 'Duration', value: 'About 8 hours' },
        { label: 'Language', value: 'Japanese' },
        { label: 'Payment', value: 'Credit card (Visa / Mastercard), bank transfer' },
        { label: 'Payment deadline', value: 'Within 3 days of confirmed booking' },
        { label: 'Booking deadline', value: '25 September 2026 (or when sold out)' },
        {
          label: 'Dress',
          value:
            'No formal code; smart casual recommended. You will be outdoors for long periods — comfortable shoes and weather-ready layers.',
        },
      ],
      cancellationTitle: 'Cancellation policy',
      cancellationHeaderWhen: 'When you cancel',
      cancellationHeaderFee: 'Fee',
      cancellationRows: [
        {
          when: 'From booking confirmation through race day',
          fee: '100% of the tour price (tickets non-refundable / non-changeable)',
        },
      ],
      detailsNote:
        'The Arc runs rain or shine. We do not cancel for weather. If the organiser cancels or postpones the race, no refund is given.',
      bookingKicker: 'How to Book',
      bookingTitle: 'How to book',
      bookingSteps: [
        { time: '01', what: 'Tell us your party size via the form or email.' },
        { time: '02', what: 'We check availability and reply within 48 hours.' },
        { time: '03', what: 'We send payment instructions. Booking is confirmed once payment is received.' },
        {
          time: '04',
          what: 'After payment, we email a voucher with meeting place, time and day-of notes. Show it on your phone on the day.',
        },
      ],
      notesKicker: 'Please Note',
      notesTitle: 'Please note',
      notesList: [
        'Some credit-card security settings may prevent use of on-site ticket machines.',
        'Some races after the Arc cannot be watched on this tour.',
        'This is a direct round-trip bus from Paris. Timing may shift with race progress or traffic.',
        'If the race is cancelled due to disaster, strike or organiser decision, the tour does not run.',
        'Cancellation fee is 100% of the product price from the moment booking is complete.',
        'Prohibited items at the racecourse include explosives, weapons, knives, bottles, balls, cans, spray cans, banners, plastic bottles (except ≤50cl with captive caps), drones, megaphones, horns, helmets, e-scooters, animals, and other items security may refuse on site.',
        'Buses are not wheelchair-accessible; wheelchair users cannot join.',
        'Large luggage such as suitcases cannot be brought.',
      ],
      ctaKicker: 'Reservation',
      ctaTitle: 'Spend that day with us',
      ctaButton: 'Book / enquire',
      ctaScarce: 'Places are limited.',
    },
    ja: {
      title: '凱旋門賞 観戦ツアー',
      label: '混乗バスツアー',
      badgeText: '2026 10.4 SUN 凱旋門賞観戦バスツアー',
      category: "Qatar Prix de l'Arc de Triomphe",
      summary:
        '2026年10月4日（日）パリロンシャン競馬場で開催される第105回凱旋門賞。日本語ガイド同行、往復送迎バス付きの観戦ツアー。',
      description:
        'パリ郊外のロンシャン競馬場で開催される凱旋門賞を観戦する特別バスツアーです。',
      venue: 'パリロンシャン競馬場',
      ctaLabel: '詳細を見る',
      notes: '',
      subLatin: 'ParisLongchamp — 4 October 2026',
      edition: '第105回',
      guideLabel: '日本語ガイド同行',
      navLinks: [
        { href: '#about', label: '凱旋門賞とは' },
        { href: '#highlights', label: '見どころ' },
        { href: '#tour', label: 'ツアー内容' },
        { href: '#flow', label: '当日の流れ' },
        { href: '#details', label: '料金・詳細' },
        { href: '#booking', label: 'ご予約' },
        { href: '#notes', label: '注意事項' },
      ],
      aboutKicker: 'The Race',
      aboutTitle: 'パリが息をのむ、10月の日曜日',
      aboutLead:
        '10月最初の週末、ブローニュの森が華やぎます。フランス、アイルランド、イギリス、ドイツ、そして日本から、世界最高峰のサラブレッドがパリロンシャン競馬場に集結。2,400メートル、およそ2分半の攻防に、総賞金500万ユーロが懸けられます。',
      aboutBody:
        '2026年10月4日に行われるのは、記念すべき第105回。5月の登録時点では、昨年の覇者ダリーズ（Daryz）や、フォーエバーヤング（Forever Young）をはじめとする日本馬7頭が名を連ねています。出走馬の確定は9月末です。\n\n世界最高峰のレース凱旋門賞へ！欧州セレブの社交場でもあり、優雅で華やかな空気に包まれます♪ 素敵なドレスや帽子を身につけたご婦人方や、シャンパンを片手に団欒を楽しむ紳士たち。気品溢れるヨーロッパ競馬場の独特な雰囲気をお楽しみください。',
      aboutImageCaption:
        'パリロンシャン競馬場のスタンドと、目の前に広がる芝生エリア（Pelouse）。',
      highlightsKicker: 'Highlights',
      highlightsTitle: 'この日、あなたが立ち会うもの',
      highlights: [
        {
          num: '①',
          title: '本場のパドックを、間近で',
          body: 'レース前、出走馬が周回するパドック。世界中から集まった名馬の毛艶、気配、そして騎手が跨がる瞬間の張り詰めた空気。テレビ画面では決して伝わらないサラブレッドの迫力がそこにあります。',
          caveat: '',
        },
        {
          num: '②',
          title: '芝生から見る、最後の直線',
          body: '本ツアーの観戦エリアは、最後の直線沿いに広がる立ち見自由席（Pelouse de l\'Arrivée）。目の前を馬群が駆け抜けます。地響きのような蹄の音と、四方から上がる歓声。凱旋門賞のクライマックスを、もっとも体感的な場所で。',
          caveat: '※ゴール前の囲われた客席（Pelouse de l\'Arrivée OR）へはアクセスできません。',
        },
        {
          num: '③',
          title: '日本語で安心、馬券の手引き',
          body: 'フランスの馬券は仕組みも用語も日本とは異なります。競馬場内マップと、賭け方・馬券購入方法をまとめた日本語資料をお渡しします。競馬が初めての方も一枚買えばレースの見え方が変わるかもしれません。',
          caveat: '',
        },
      ],
      highlightsImageCaption:
        'パドック（ronde de présentation）— レース前、出走馬が観客の目の前を周回します。',
      tourKicker: "What's Included",
      tourTitle: 'ツアーに含まれるもの',
      inclusions: [
        'パリ市内発着の往復送迎バス',
        '立ち見自由席チケット（Pelouse de l\'Arrivée）',
        'パドックへのアクセス',
        '日本語ガイド同行',
        '競馬場内マップ（日本語）',
        '賭け方・馬券購入方法の資料（日本語）',
      ],
      exclusionsTitle: '含まれないもの',
      exclusions: [
        '飲食代（競馬場内に多数のキッチンカー、売店、バーがございます）',
        '馬券の購入費用',
      ],
      tourNote:
        '立ち見自由席（Pelouse）は着席の保証がないエリアです。長時間の立ち歩きとなりますので、歩きやすい靴でお越しください。',
      flowKicker: 'Programme',
      flowTitle: '当日の流れ',
      schedule: [
        { time: '10:30', what: 'サントオギュスタン広場、ジャンヌダルク騎馬像前に集合。ガイドがお迎えします。' },
        { time: '10:40', what: 'バスにてロンシャン競馬場へ出発。' },
        { time: '11:30', what: 'ロンシャン競馬場のバスパーキングに到着。セキュリティチェックを経て入場します。' },
        { time: '16:05', what: '凱旋門賞、発走。芝生エリアにて観戦。' },
        { time: '17:40', what: '表彰式終了後、集合してバスにてパリ市内へ。' },
        { time: '18:30', what: 'サントオギュスタン広場付近にて解散。' },
      ],
      meetingTitle: '集合場所の目印',
      meetingBody:
        'サントオギュスタン教会前の広場に立つ、ジャンヌダルク騎馬像。この像の前でガイドがお待ちしております。',
      meetingCaveat:
        'サントオギュスタン広場（Place Saint-Augustin, 75008 Paris）／メトロ9号線 Saint-Augustin 駅下車すぐ',
      meetingImageCaption: '',
      flowNote:
        '発走時刻および当日のプログラムは、フランスギャロ（France Galop）の公式発表により変更となる場合がございます。',
      detailsKicker: 'Price & Practical',
      detailsTitle: '料金・ツアー詳細',
      detailRows: [
        { label: '開催日', value: '2026年10月4日（日）' },
        { label: '料金', value: 'お一人様 160 €' },
        { label: '最少催行人数', value: '1名' },
        { label: '定員', value: 'ご案内できる席には限りがございます' },
        {
          label: '集合場所',
          value:
            'サントオギュスタン広場（Place Saint-Augustin, 75008 Paris）／メトロ9号線 Saint-Augustin 駅\nジャンヌダルク騎馬像周辺',
        },
        { label: '集合時間', value: '10:30' },
        { label: '解散', value: 'サントオギュスタン広場付近／18:30 頃' },
        { label: '所要時間', value: '約8時間' },
        { label: '言語', value: '日本語' },
        { label: 'お支払い方法', value: 'クレジットカード（Visa / Mastercard）、銀行振込' },
        { label: 'お支払い期限', value: 'ご予約確定後 3日以内' },
        { label: '申込締切', value: '2026年9月25日（定員に達し次第、締切）' },
        {
          label: '服装',
          value:
            '特に規定はございませんが、スマートカジュアルをおすすめします。屋外で長時間過ごしますので、歩きやすい靴と、天候に応じた上着をご用意ください。',
        },
      ],
      cancellationTitle: 'キャンセル規定',
      cancellationHeaderWhen: 'キャンセルのお申し出',
      cancellationHeaderFee: '取消料',
      cancellationRows: [
        {
          when: 'お申し込み直後から当日まで',
          fee: 'ツアー料金の100%（チケット代を含め、返金・変更はできません）',
        },
      ],
      detailsNote:
        '凱旋門賞は雨天決行です。悪天候によるツアーの中止はございません。主催者側の判断によりレースが中止・順延となった場合も、ご返金はございません。あらかじめご了承ください。',
      bookingKicker: 'How to Book',
      bookingTitle: 'ご予約の流れ',
      bookingSteps: [
        { time: '01', what: '下記フォームまたはメールにて、ご希望の人数をお知らせください。' },
        { time: '02', what: '空席を確認のうえ、48時間以内にお返事いたします。' },
        { time: '03', what: 'お支払いのご案内をお送りします。ご入金の確認をもってご予約確定となります。' },
        {
          time: '04',
          what: 'お支払い確認後に、集合場所・時間・当日の注意事項を記載したバウチャーをメールでお送りします。当日はスマートフォンの画面でご提示ください。',
        },
      ],
      notesKicker: 'Please Note',
      notesTitle: '注意事項',
      notesList: [
        'クレジットカードの種類（セキュリティー）により、競馬場内の券売機がご利用いただけない場合があります。',
        '当日、凱旋門賞の後に行われるいくつかのレースは観戦いただけません。',
        'パリ発着の往復直行バスツアーです。行程は当日のレース進行、交通渋滞の有無など諸事情により前後する場合があります。',
        '天災、ストライキ、主催者側の都合などにより競馬レースが中止となった場合、当ツアーは不催行となります。',
        'キャンセル料は、ご予約完了直後より商品料金の100%です。',
        '競馬場へは、爆発物・武器・刃物・瓶・ボール・缶・スプレー缶・バンドロール・横断幕・プラスチックボトル（50cl以下で、キャップが本体から外れないタイプのペットボトルは可）・ドローン・メガホン・ラッパ・ヘルメット・電動キックボード・動物等の持ち込みが禁止されています。その他、セキュリティ上の理由により現地で持ち込みを拒否される物品がある可能性があります。',
        '使用するバスには車椅子の設備がないため、車椅子をご利用のお客様はご参加いただけません。',
        'スーツケースなど大きなお荷物の持ち込みはできません。',
      ],
      ctaKicker: 'Reservation',
      ctaTitle: 'その一日に、ご一緒します',
      ctaButton: 'ご予約・お問い合わせ',
      ctaScarce: 'ご案内できる席には限りがございます。',
    },
  },
  {
    slug: 'paris-christmas-lights-2026',
    heroImageUrl: '',
    aboutImageUrl: '',
    highlightsImageUrl: '',
    meetingImageUrl: '',
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
  aboutHeroImageUrl: '/images/home/dest-paris.jpg',
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
  aboutEyebrow: 'À propos',
  aboutTitle: 'About us',
  aboutLatin: 'About HMI Paris',
  aboutPhiloBefore: 'Even far from home, we want you to feel ',
  aboutPhiloAccent: 'the same sense of ease',
  aboutPhiloAfter: ' you know.',
  aboutPhiloLine2:
    'HMI Paris brings Japanese hospitality to every moment of your time in Paris.',
  aboutSectionEyebrow: 'About HMI Paris',
  aboutSectionTitle: 'Travel shaped by living in Paris.',
  aboutP1:
    'Based in Paris, we offer private tours and chauffeur services across the city and beyond — from Mont-Saint-Michel to Versailles and destinations throughout France. We craft each journey around your wishes, lifestyle, and purpose of stay.',
  aboutP2:
    'Flexible schedules, paces that match your interests, and coordination spanning history, art, cuisine, and shopping — all from the perspective of people who live here. With experienced drivers and guides, we keep travel effortless so you can enjoy refined sightseeing. Day trips, half-day tours, and more: we help make your valuable time richer.',
  aboutP3:
    'We want you to experience not only the classics, but the real France. First visits, honeymoons, anniversaries, family trips — we welcome every occasion with thoughtful hospitality, so your time in France becomes a lifelong memory.',
  aboutProfileEyebrow: 'Profile',
  aboutProfileTitle: 'Overview',
  aboutCtaTitle: 'We look forward to meeting you in Paris.',
  aboutCtaSubtitle: 'Once your travel or business plans are set, feel free to get in touch.',
  aboutCtaButton: 'Contact us',
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
  aboutEyebrow: 'À propos',
  aboutTitle: '会社案内',
  aboutLatin: 'About HMI Paris',
  aboutPhiloBefore: '遠く離れた異国でも、',
  aboutPhiloAccent: '「いつもの安心」',
  aboutPhiloAfter: 'のなかで過ごしてほしい。',
  aboutPhiloLine2:
    'HMI Paris は、日本のおもてなしの心を、パリでのひとときにお届けします。',
  aboutSectionEyebrow: 'HMI Paris について',
  aboutSectionTitle: 'パリで暮らすからこそ、ご案内できる旅を。',
  aboutP1:
    'パリを拠点に、パリ市内はもちろん、モンサンミッシェルやヴェルサイユをはじめとするフランス各地へのプライベートツアー・専用車サービスをご提供しています。お客様のご要望やライフスタイル、ご滞在の目的に寄り添いながら、一組さまごとにオーダーメイドの旅を作り上げます。',
  aboutP2:
    '柔軟なスケジュール調整はもちろん、ご興味やペースに合わせたプランを、歴史や芸術、グルメやショッピングまで、現地で暮らすからこその視点でコーディネート。経験豊富なドライバーやガイドとともに、移動の負担を最小限に抑えながら、快適で上質な観光をお楽しみいただけます。日帰り旅行や半日観光など、お客様の大切な時間をより豊かにするお手伝いをいたします。',
  aboutP3:
    '「定番の観光地はもちろん、本当のフランスを体験していただきたい」——そんな思いを胸に、一組一組のお客様との出会いを大切にし、安心と感動に満ちた旅づくりをお手伝いしています。初めてのフランス旅行、ハネムーン、記念日、家族旅行など、あらゆるシーンに寄り添い、フランスで過ごす時間が一生の思い出となるよう、心のこもった上質なおもてなしで皆様をお迎えいたします。',
  aboutProfileEyebrow: 'Profile',
  aboutProfileTitle: '概要',
  aboutCtaTitle: 'パリでお会いできるのを楽しみに。',
  aboutCtaSubtitle: 'ご旅行・ご出張の予定が決まったら、お気軽にご連絡ください。',
  aboutCtaButton: 'お問い合わせ',
}

export const SEED_ABOUT_PROFILES = [
  {
    sortOrder: 1,
    isEmail: false,
    en: { label: 'Trade name', value: 'HMI Paris' },
    ja: { label: '屋号', value: 'HMI Paris' },
  },
  {
    sortOrder: 2,
    isEmail: false,
    en: {
      label: 'Services',
      value: 'Private tours · chauffeur service · interpreting / attend',
    },
    ja: {
      label: '事業内容',
      value: 'プライベートツアー・専用車サービス・通訳／アテンド',
    },
  },
  {
    sortOrder: 3,
    isEmail: false,
    en: { label: 'Areas', value: 'Paris and destinations across France' },
    ja: { label: '対応エリア', value: 'パリおよびフランス各地' },
  },
  {
    sortOrder: 4,
    isEmail: false,
    en: { label: 'Languages', value: 'Japanese' },
    ja: { label: '対応言語', value: '日本語' },
  },
  {
    sortOrder: 5,
    isEmail: false,
    en: { label: 'Reservations', value: 'By reservation only' },
    ja: { label: 'ご予約', value: '完全予約制' },
  },
  {
    sortOrder: 6,
    isEmail: true,
    en: { label: 'Contact', value: 'info@hmiparis.com' },
    ja: { label: 'お問い合わせ', value: 'info@hmiparis.com' },
  },
] as const

