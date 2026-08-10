import type { Core } from '@strapi/strapi'
import { translateFields, type Lang } from './auto-translate'

/** Editorial types that sync EN ↔ JA automatically after save. */
export const AUTO_TRANSLATE_UIDS = [
  'api::tour-package.tour-package',
  'api::main-event.main-event',
  'api::service.service',
  'api::why-reason.why-reason',
  'api::fee-tier.fee-tier',
  'api::news-item.news-item',
  'api::tour-detail.tour-detail',
  'api::cancellation-rule.cancellation-rule',
  'api::site-note.site-note',
  // Site Setting EN/JA stay curated (seed + manual locale edits) — not machine-synced
] as const

/** Localized copy fields per content type (non-localized fields are shared automatically). */
export const LOCALIZED_FIELDS: Record<string, string[]> = {
  'api::tour-package.tour-package': [
    'title',
    'summary',
    'description',
    'destination',
    'region',
    'highlights',
    'groupSize',
    'durationLabel',
    'departureTime',
    'meetingPlace',
    'feeNote',
    'included',
    'notIncluded',
    'paymentDeadline',
    'paymentMethods',
    'reservationConfirmation',
    'cancellationConditions',
  ],
  'api::main-event.main-event': [
    'title',
    'label',
    'badgeText',
    'category',
    'summary',
    'description',
    'venue',
    'ctaLabel',
    'notes',
    'inclusions',
    'subLatin',
    'edition',
    'guideLabel',
    'navLinks',
    'aboutKicker',
    'aboutTitle',
    'aboutLead',
    'aboutBody',
    'aboutImageCaption',
    'highlightsKicker',
    'highlightsTitle',
    'highlights',
    'highlightsImageCaption',
    'tourKicker',
    'tourTitle',
    'exclusions',
    'exclusionsTitle',
    'tourNote',
    'flowKicker',
    'flowTitle',
    'schedule',
    'meetingTitle',
    'meetingBody',
    'meetingCaveat',
    'meetingImageCaption',
    'flowNote',
    'detailsKicker',
    'detailsTitle',
    'detailRows',
    'cancellationTitle',
    'cancellationHeaderWhen',
    'cancellationHeaderFee',
    'cancellationRows',
    'detailsNote',
    'bookingKicker',
    'bookingTitle',
    'bookingSteps',
    'notesKicker',
    'notesTitle',
    'notesList',
    'ctaKicker',
    'ctaTitle',
    'ctaButton',
    'ctaScarce',
  ],
  'api::service.service': ['title', 'category', 'description'],
  'api::why-reason.why-reason': ['title', 'description'],
  'api::fee-tier.fee-tier': ['label'],
  'api::news-item.news-item': ['title'],
  'api::tour-detail.tour-detail': ['label', 'value'],
  'api::cancellation-rule.cancellation-rule': ['label'],
  'api::site-note.site-note': ['text'],
  'api::site-setting.site-setting': [
    'studioLocation',
    'footerBlurb',
    'heroEyebrow',
    'heroTitle',
    'heroSubtitle',
    'servicesEyebrow',
    'servicesTitle',
    'whyEyebrow',
    'whyItalic',
    'whyTitle',
    'feesEyebrow',
    'feesTitle',
    'packagesEyebrow',
    'packagesTitle',
    'packagesIntro',
    'newsEyebrow',
    'newsTitle',
    'contactCtaTitle',
    'contactCtaSubtitle',
    'contactCtaButton',
    'reservationEyebrow',
    'reservationTitle',
    'reservationSubtitle',
    'reservationButton',
    'tourDetailsEyebrow',
    'tourDetailsTitle',
    'cancellationEyebrow',
    'cancellationTitle',
    'notesEyebrow',
    'notesTitle',
    'aboutEyebrow',
    'aboutTitle',
    'aboutLatin',
    'aboutPhiloBefore',
    'aboutPhiloAccent',
    'aboutPhiloAfter',
    'aboutPhiloLine2',
    'aboutSectionEyebrow',
    'aboutSectionTitle',
    'aboutP1',
    'aboutP2',
    'aboutP3',
    'aboutProfileEyebrow',
    'aboutProfileTitle',
    'aboutCtaTitle',
    'aboutCtaSubtitle',
    'aboutCtaButton',
  ],
  'api::about-profile.about-profile': ['label', 'value'],
}

const syncingDocs = new Set<string>()

function otherLocale(locale: string): Lang | null {
  if (locale === 'en') return 'ja'
  if (locale === 'ja') return 'en'
  return null
}

function pickFields(source: Record<string, unknown>, fields: string[]) {
  const out: Record<string, unknown> = {}
  for (const field of fields) {
    if (field in source && source[field] != null) out[field] = source[field]
  }
  return out
}

/**
 * After creating/updating a document in one locale, mirror translated copy into the other.
 * Editors only write once; the twin locale is filled automatically.
 */
export async function syncTwinLocale(
  strapi: Core.Strapi,
  uid: string,
  documentId: string,
  sourceLocale: string,
  sourceData: Record<string, unknown>,
) {
  if (process.env.AUTO_TRANSLATE === 'false' || process.env.AUTO_TRANSLATE === '0') return
  // @ts-expect-error runtime flag set during bootstrap seeding
  if (strapi.autoTranslateDisabled) return

  const target = otherLocale(sourceLocale)
  if (!target) return

  const fields = LOCALIZED_FIELDS[uid]
  if (!fields?.length) return

  const docKey = `${uid}:${documentId}`
  if (syncingDocs.has(docKey)) return
  syncingDocs.add(docKey)

  try {
    const toTranslate = pickFields(sourceData, fields)
    if (!Object.keys(toTranslate).length) return

    const translated = await translateFields(
      toTranslate,
      fields,
      sourceLocale as Lang,
      target,
    )

    // Include slug / required shared identifiers when present so JA create validation passes
    const shared: Record<string, unknown> = {}
    for (const f of [
      'slug',
      'kind',
      'number',
      'icon',
      'sortOrder',
      'dateLabel',
      'price',
      'fee',
      'alert',
    ]) {
      if (sourceData[f] != null) shared[f] = sourceData[f]
    }

    await strapi.documents(uid as any).update({
      documentId,
      locale: target,
      data: { ...shared, ...translated },
      status: 'published',
    })

    strapi.log.info(`[auto-translate] ${uid} ${documentId}: ${sourceLocale} → ${target}`)
  } catch (err) {
    strapi.log.warn(`[auto-translate] failed for ${uid} ${documentId}: ${err}`)
  } finally {
    syncingDocs.delete(docKey)
  }
}

export function registerAutoTranslateMiddleware(strapi: Core.Strapi) {
  strapi.documents.use(async (context, next) => {
    const result = await next()

    if (!AUTO_TRANSLATE_UIDS.includes(context.uid as (typeof AUTO_TRANSLATE_UIDS)[number])) {
      return result
    }
    if (!['create', 'update', 'publish'].includes(context.action)) {
      return result
    }

    const documentId = (result as { documentId?: string } | null)?.documentId
    if (!documentId) return result

    // params shape differs by action (publish has no `data`) — read loosely
    const params = context.params as {
      locale?: string
      data?: Record<string, unknown>
    }
    const locale = String(params.locale || (result as { locale?: string })?.locale || 'en')
    const data = {
      ...((result as Record<string, unknown>) || {}),
      ...(params.data || {}),
    }

    // Fire-and-forget so admin save stays fast; errors are logged inside
    void syncTwinLocale(strapi, context.uid, documentId, locale, data)

    return result
  })
}
