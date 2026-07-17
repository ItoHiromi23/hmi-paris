export const HMI_SERVICES = [
  {
    id: 'sightseeing',
    icon: 'star',
    title: 'パリ発観光ツアー',
    category: '日帰りツアー',
    description:
      'モン・サン・ミッシェル、ヴェルサイユ宮殿、ルーヴル美術館など。日本人ガイド付きの少人数プライベートツアーです。',
  },
  {
    id: 'private-car',
    icon: 'car',
    title: '専用車＆日本語ガイド',
    category: '専用車＆ガイド',
    description:
      '専用車と日本語ガイドで、ご自身のペースでパリを巡ります。市内観光や近郊へのカスタム行程にも対応します。',
  },
  {
    id: 'airport',
    icon: 'plane',
    title: '空港送迎',
    category: '空港送迎',
    description:
      'シャルル・ド・ゴール（CDG）またはオルリー空港とホテル間の快適な送迎。言語の不安も日本語サポートで安心です。',
  },
  {
    id: 'interpretation',
    icon: 'chat',
    title: '通訳・エスコート・現地同行',
    category: '通訳・同行',
    description:
      '商談、視察、展示会、買い付けなど。現地での日本語通訳・エスコート同行に対応します。',
  },
  {
    id: 'tailor',
    icon: 'plus',
    title: 'オーダーメイド手配',
    category: 'オーダーメイド',
    description:
      '掲載以外のご希望もお気軽に。パリ滞在に合わせたカスタムプランをご提案します。',
  },
] as const

export const HMI_REASONS = [
  {
    number: '01',
    title: 'パリ在住の日本人スタッフ',
    description: '現地で困ったことがあっても、日本語でその場サポートいたします。',
  },
  {
    number: '02',
    title: '完全プライベート',
    description: '相乗りなし。お客様のグループだけの貸切サービスです。',
  },
  {
    number: '03',
    title: '信頼できる現地ネットワーク',
    description: 'パリでの長年のネットワークと知見を活かし、質の高い手配を実現します。',
  },
  {
    number: '04',
    title: '滞在中も安心のサポート',
    description: '出発から帰国まで、滞在中もこまめにご連絡・サポートします。',
  },
] as const

export const HMI_FEES = [
  { label: '3時間', price: '190€' },
  { label: '4時間', price: '235€' },
  { label: '6時間', price: '325€' },
  { label: '8時間', price: '400€' },
  { label: '追加1時間ごと', price: '+45€' },
] as const

export const HMI_FEE_NOTES = [
  '20:00以降は1時間あたり55€です。',
  '料金は1グループ（1〜6名）あたりです。',
  '交通費・飲食費・チケット代は含まれません。',
] as const

export const HMI_NEWS = [
  {
    date: '2026.06.01',
    title: 'ウェブサイトを公開しました。',
  },
  {
    date: '2026.05.20',
    title: '夏季観光ツアーの予約受付を開始しました。',
  },
  {
    date: '2026.04.15',
    title: '空港送迎サービスの営業時間を延長しました。',
  },
] as const

export const HMI_TOUR_DETAILS = [
  {
    label: '参加人数',
    value: '1グループあたり1〜6名',
  },
  {
    label: '含まれるもの',
    value: '日本語アシスタントガイド',
  },
  {
    label: '含まれないもの',
    value: '交通費、飲食費、チケット代',
  },
  {
    label: '集合場所',
    value: 'ご滞在ホテルのロビー、またはご指定の場所',
  },
  {
    label: 'ツアー開始時間',
    value:
      '9:00〜16:00の間でご希望の時間をお選びください。\n※20:00以降は1時間あたり追加55€。終了は22:00まで。',
  },
  {
    label: 'お支払い期限',
    value: '予約確認メール送信後、72時間以内',
  },
  {
    label: 'お支払い方法',
    value: 'クレジットカード（Visa / Mastercard）、銀行振込',
  },
  {
    label: '予約確認',
    value:
      'お支払い確認後、バウチャーをメールでお送りします。当日はプリントまたは画面表示をご持参ください。これが参加証となります。',
  },
  {
    label: '服装・持ち物',
    value:
      '歩きやすい靴、天候に合わせた服装、飲み物をご用意ください。モンマルトルやマレ地区は坂道・石畳が多いです。',
  },
] as const

export const HMI_CANCELLATION = [
  { label: '参加日の30日前まで', fee: '0%', alert: false },
  { label: '参加日の14日前まで', fee: '50%', alert: false },
  { label: '参加日の13日前〜当日', fee: '100%', alert: true },
  { label: 'チケット手配がある場合', fee: '100%', alert: true },
] as const

export const HMI_CANCELLATION_NOTES = [
  '事前連絡なく集合時刻から30分以上遅刻された場合は、キャンセル扱いとなります。',
  '当社手配のチケットはキャンセル不可です。予約時点からキャンセル料100%が発生します。',
] as const

export const HMI_IMPORTANT_NOTES = [
  '交通費・入場料・お食事は各コース料金に含まれません。ご希望により手配も可能です。',
  '多くの美術館・名所は時間帯予約が必要なため、事前のご予約をおすすめします。',
] as const
