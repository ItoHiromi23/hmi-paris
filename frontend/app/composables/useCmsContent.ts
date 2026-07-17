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

const EMPTY_SETTINGS: CmsSiteSettings = {
  brandName: '',
  brandTagline: '',
  contactEmail: '',
  contactPhone: '',
  studioLocation: '',
  footerBlurb: '',
  heroEyebrow: '',
  heroTitle: '',
  heroSubtitle: '',
  heroImageUrl: '',
  servicesEyebrow: '',
  servicesTitle: '',
  whyEyebrow: '',
  whyItalic: '',
  whyTitle: '',
  feesEyebrow: '',
  feesTitle: '',
  packagesEyebrow: '',
  packagesTitle: '',
  packagesIntro: '',
  newsEyebrow: '',
  newsTitle: '',
  contactCtaTitle: '',
  contactCtaSubtitle: '',
  contactCtaButton: '',
  reservationEyebrow: '',
  reservationTitle: '',
  reservationSubtitle: '',
  reservationButton: '',
  tourDetailsEyebrow: '',
  tourDetailsTitle: '',
  cancellationEyebrow: '',
  cancellationTitle: '',
  notesEyebrow: '',
  notesTitle: '',
}

function sortByOrder<T extends { sortOrder: number }>(rows: T[]) {
  return [...rows].sort((a, b) => a.sortOrder - b.sortOrder)
}

async function fetchCollection<T>(path: string): Promise<T[]> {
  const config = useRuntimeConfig()
  const strapiUrl = String(config.public.strapiUrl || '')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')
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
    const strapiUrl = String(config.public.strapiUrl || '')
      .replace(/\/$/, '')
      .replace('://localhost', '://127.0.0.1')

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
      ...EMPTY_SETTINGS,
      ...(settingsRes?.data || {}),
    }

    const mappedServices: CmsService[] = sortByOrder(
      services.map((s, i) => ({
        id: s.documentId || s.id || i,
        title: s.title,
        category: s.category,
        description: s.description,
        icon: (s.icon || 'star') as ServiceIconName,
        sortOrder: s.sortOrder ?? i,
      })),
    )

    const mappedReasons: CmsWhyReason[] = sortByOrder(
      reasons.map((r, i) => ({
        id: r.documentId || r.id || i,
        number: r.number,
        title: r.title,
        description: r.description,
        sortOrder: r.sortOrder ?? i,
      })),
    )

    const mappedFees: CmsFeeTier[] = sortByOrder(
      fees.map((f, i) => ({
        id: f.documentId || f.id || i,
        label: f.label,
        price: f.price,
        sortOrder: f.sortOrder ?? i,
      })),
    )

    const mappedNews: CmsNewsItem[] = sortByOrder(
      news.map((n, i) => ({
        id: n.documentId || n.id || i,
        dateLabel: n.dateLabel,
        title: n.title,
        sortOrder: n.sortOrder ?? i,
      })),
    )

    const mappedTourDetails: CmsTourDetail[] = sortByOrder(
      tourDetails.map((t, i) => ({
        id: t.documentId || t.id || i,
        label: t.label,
        value: t.value,
        sortOrder: t.sortOrder ?? i,
      })),
    )

    const mappedCancel: CmsCancellationRule[] = sortByOrder(
      cancellation.map((c, i) => ({
        id: c.documentId || c.id || i,
        label: c.label,
        fee: c.fee,
        alert: Boolean(c.alert),
        sortOrder: c.sortOrder ?? i,
      })),
    )

    const noteRows = sortByOrder(
      notes.map((n, i) => ({
        id: n.documentId || n.id || i,
        text: n.text,
        kind: n.kind,
        sortOrder: n.sortOrder ?? i,
      })),
    )

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

  return { fetchCms }
}
