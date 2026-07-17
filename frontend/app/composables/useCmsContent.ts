import type {
  CmsBundle,
  CmsCancellationRule,
  CmsFeeTier,
  CmsNewsItem,
  CmsService,
  CmsSiteNote,
  CmsSiteSettings,
  CmsTourDetail,
  CmsWhyReason,
  ServiceIconName,
} from '~/types/cms'
import {
  HMI_CANCELLATION,
  HMI_CANCELLATION_NOTES,
  HMI_FEE_NOTES,
  HMI_FEES,
  HMI_IMPORTANT_NOTES,
  HMI_NEWS,
  HMI_REASONS,
  HMI_SERVICES,
  HMI_TOUR_DETAILS,
} from '~/data/hmiContent'

const FALLBACK_SETTINGS: CmsSiteSettings = {
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
  packagesIntro:
    'モンマルトル、マレ、ルーヴル、ヴェルサイユ、セーヌなど、厳選した体験をご用意しています。',
  newsEyebrow: 'お知らせ',
  newsTitle: '新着情報',
  contactCtaTitle: 'パリ滞在に関するご相談は、お気軽にお問い合わせください。',
  contactCtaSubtitle: 'お見積り・ご相談は無料です。日本語でご連絡ください。',
  contactCtaButton: 'お問い合わせはこちら',
  reservationEyebrow: 'ご予約',
  reservationTitle: 'パリで、特別な一日を。',
  reservationSubtitle:
    'エリアやテーマ、日程が決まっていなくても大丈夫です。お気軽にご相談ください。',
  reservationButton: 'お問い合わせ',
  tourDetailsEyebrow: '実施詳細',
  tourDetailsTitle: 'ツアー詳細',
  cancellationEyebrow: 'キャンセルについて',
  cancellationTitle: 'キャンセルポリシー',
  notesEyebrow: 'ご注意事項',
  notesTitle: 'ご確認ください',
}

function sortByOrder<T extends { sortOrder: number }>(rows: T[]) {
  return [...rows].sort((a, b) => a.sortOrder - b.sortOrder)
}

async function fetchCollection<T>(path: string): Promise<T[]> {
  const config = useRuntimeConfig()
  const strapiUrl = config.public.strapiUrl as string
  try {
    const data = await $fetch<{ data: T[] }>(`${strapiUrl}/api/${path}`, {
      query: {
        'pagination[pageSize]': 100,
        sort: 'sortOrder:asc',
      },
    })
    return data?.data || []
  } catch {
    return []
  }
}

export function useCmsContent() {
  async function fetchCms(): Promise<CmsBundle> {
    const config = useRuntimeConfig()
    const strapiUrl = config.public.strapiUrl as string

    const [settingsRes, services, reasons, fees, news, tourDetails, cancellation, notes] =
      await Promise.all([
        $fetch<{ data: CmsSiteSettings | null }>(`${strapiUrl}/api/site-setting`).catch(() => null),
        fetchCollection<CmsService & { documentId?: string }>('services'),
        fetchCollection<CmsWhyReason & { documentId?: string }>('why-reasons'),
        fetchCollection<CmsFeeTier & { documentId?: string }>('fee-tiers'),
        fetchCollection<CmsNewsItem & { documentId?: string }>('news-items'),
        fetchCollection<CmsTourDetail & { documentId?: string }>('tour-details'),
        fetchCollection<CmsCancellationRule & { documentId?: string }>('cancellation-rules'),
        fetchCollection<CmsSiteNote & { documentId?: string }>('site-notes'),
      ])

    const settings: CmsSiteSettings = {
      ...FALLBACK_SETTINGS,
      ...(settingsRes?.data || {}),
    }

    const mappedServices: CmsService[] =
      services.length > 0
        ? sortByOrder(
            services.map((s, i) => ({
              id: s.documentId || s.id || i,
              title: s.title,
              category: s.category,
              description: s.description,
              icon: (s.icon || 'star') as ServiceIconName,
              sortOrder: s.sortOrder ?? i,
            })),
          )
        : HMI_SERVICES.map((s, i) => ({ ...s, id: i, sortOrder: i }))

    const mappedReasons: CmsWhyReason[] =
      reasons.length > 0
        ? sortByOrder(
            reasons.map((r, i) => ({
              id: r.documentId || r.id || i,
              number: r.number,
              title: r.title,
              description: r.description,
              sortOrder: r.sortOrder ?? i,
            })),
          )
        : HMI_REASONS.map((r, i) => ({ ...r, id: i, sortOrder: i }))

    const mappedFees: CmsFeeTier[] =
      fees.length > 0
        ? sortByOrder(
            fees.map((f, i) => ({
              id: f.documentId || f.id || i,
              label: f.label,
              price: f.price,
              sortOrder: f.sortOrder ?? i,
            })),
          )
        : HMI_FEES.map((f, i) => ({ ...f, id: i, sortOrder: i }))

    const mappedNews: CmsNewsItem[] =
      news.length > 0
        ? sortByOrder(
            news.map((n, i) => ({
              id: n.documentId || n.id || i,
              dateLabel: n.dateLabel,
              title: n.title,
              sortOrder: n.sortOrder ?? i,
            })),
          )
        : HMI_NEWS.map((n, i) => ({
            id: i,
            dateLabel: n.date,
            title: n.title,
            sortOrder: i,
          }))

    const mappedTourDetails: CmsTourDetail[] =
      tourDetails.length > 0
        ? sortByOrder(
            tourDetails.map((t, i) => ({
              id: t.documentId || t.id || i,
              label: t.label,
              value: t.value,
              sortOrder: t.sortOrder ?? i,
            })),
          )
        : HMI_TOUR_DETAILS.map((t, i) => ({ ...t, id: i, sortOrder: i }))

    const mappedCancel: CmsCancellationRule[] =
      cancellation.length > 0
        ? sortByOrder(
            cancellation.map((c, i) => ({
              id: c.documentId || c.id || i,
              label: c.label,
              fee: c.fee,
              alert: Boolean(c.alert),
              sortOrder: c.sortOrder ?? i,
            })),
          )
        : HMI_CANCELLATION.map((c, i) => ({ ...c, id: i, sortOrder: i }))

    const noteRows =
      notes.length > 0
        ? sortByOrder(
            notes.map((n, i) => ({
              id: n.documentId || n.id || i,
              text: n.text,
              kind: n.kind,
              sortOrder: n.sortOrder ?? i,
            })),
          )
        : [
            ...HMI_FEE_NOTES.map((text, i) => ({
              id: `fee-${i}`,
              text,
              kind: 'fee' as const,
              sortOrder: i,
            })),
            ...HMI_IMPORTANT_NOTES.map((text, i) => ({
              id: `imp-${i}`,
              text,
              kind: 'important' as const,
              sortOrder: i,
            })),
            ...HMI_CANCELLATION_NOTES.map((text, i) => ({
              id: `can-${i}`,
              text,
              kind: 'cancellation' as const,
              sortOrder: i,
            })),
          ]

    return {
      settings,
      services: mappedServices,
      reasons: mappedReasons,
      fees: mappedFees,
      news: mappedNews,
      tourDetails: mappedTourDetails,
      cancellation: mappedCancel,
      feeNotes: noteRows.filter((n) => n.kind === 'fee').map((n) => n.text),
      importantNotes: noteRows.filter((n) => n.kind === 'important').map((n) => n.text),
      cancellationNotes: noteRows.filter((n) => n.kind === 'cancellation').map((n) => n.text),
    }
  }

  return { fetchCms, FALLBACK_SETTINGS }
}
