import type { Core } from '@strapi/strapi'
import {
  SEED_CANCEL,
  SEED_EVENTS,
  SEED_FEES,
  SEED_NEWS,
  SEED_NOTES,
  SEED_PACKAGES,
  SEED_REASONS,
  SEED_SERVICES,
  SEED_SETTINGS_EN,
  SEED_SETTINGS_JA,
  SEED_SETTINGS_SHARED,
  SEED_TOUR_DETAILS,
} from './bootstrap/cms-seed'
import { registerAutoTranslateMiddleware } from './services/sync-locale'

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
} as const

const EDITORIAL_UIDS = [
  UID.package,
  UID.event,
  UID.service,
  UID.why,
  UID.fee,
  UID.news,
  UID.tourDetail,
  UID.cancel,
  UID.note,
  UID.settings,
] as const

const HAS_JP = /[\u3040-\u30ff\u4e00-\u9faf]/

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

async function ensureLocales(strapi: Core.Strapi) {
  const localesService = strapi.plugin('i18n').service('locales')
  const existing = await localesService.find()
  const byCode = new Map(
    (existing as Array<{ code: string; name?: string }>).map((l) => [l.code, l]),
  )

  if (!byCode.has('en')) {
    await localesService.create({ code: 'en', name: 'English' })
    strapi.log.info('Created locale: en')
  }
  if (!byCode.has('ja')) {
    await localesService.create({ code: 'ja', name: 'Japanese (ja)' })
    strapi.log.info('Created locale: ja')
  }

  const currentDefault = await localesService.getDefaultLocale()
  if (currentDefault !== 'en') {
    await localesService.setDefaultLocale({ code: 'en' })
    strapi.log.info('Set default locale → en')
  }
}

/** Create EN entry, then attach JA as a linked localization of the same document. */
async function createLocalized(
  strapi: Core.Strapi,
  uid: string,
  shared: Record<string, unknown>,
  en: Record<string, unknown>,
  ja: Record<string, unknown>,
) {
  const created = await strapi.documents(uid as any).create({
    data: { ...shared, ...en },
    locale: 'en',
    status: 'published',
  })
  // Include shared fields when creating the JA locale — Strapi requires non-null
  // required attributes (e.g. slug) even when they are marked non-localized.
  await strapi.documents(uid as any).update({
    documentId: created.documentId,
    locale: 'ja',
    data: { ...shared, ...ja },
    status: 'published',
  })
  return created.documentId as string
}

async function updateLocalized(
  strapi: Core.Strapi,
  uid: string,
  documentId: string,
  shared: Record<string, unknown>,
  en: Record<string, unknown>,
  ja: Record<string, unknown>,
) {
  await strapi.documents(uid as any).update({
    documentId,
    locale: 'en',
    data: { ...shared, ...en },
    status: 'published',
  })
  await strapi.documents(uid as any).update({
    documentId,
    locale: 'ja',
    data: { ...shared, ...ja },
    status: 'published',
  })
}

async function clearEditorial(strapi: Core.Strapi) {
  for (const uid of EDITORIAL_UIDS) {
    const rows = await strapi.documents(uid as any).findMany({ locale: 'en', limit: 200 })
    const seen = new Set<string>()
    for (const row of rows as Array<{ documentId?: string }>) {
      if (!row.documentId || seen.has(row.documentId)) continue
      seen.add(row.documentId)
      await strapi.documents(uid as any).delete({
        documentId: row.documentId,
        locale: '*',
      })
    }
    // Also wipe any JA-only leftovers
    const jaRows = await strapi.documents(uid as any).findMany({ locale: 'ja', limit: 200 })
    for (const row of jaRows as Array<{ documentId?: string }>) {
      if (!row.documentId || seen.has(row.documentId)) continue
      seen.add(row.documentId)
      await strapi.documents(uid as any).delete({
        documentId: row.documentId,
        locale: '*',
      })
    }
  }
  strapi.log.info('Cleared editorial CMS content for i18n reseed')
}

async function needsI18nReseed(strapi: Core.Strapi) {
  const flag = String(process.env.CMS_RESEED || '').toLowerCase()
  if (flag === '1' || flag === 'true' || flag === 'yes') return true

  const enPkg = await strapi.documents(UID.package).findFirst({ locale: 'en' })
  const jaPkg = await strapi.documents(UID.package).findFirst({ locale: 'ja' })

  if (!enPkg && !jaPkg) return false // empty → normal seed
  if (enPkg && jaPkg) {
    // Old JA-only rows may have been assigned to default `en` after enabling i18n
    if (enPkg.title && HAS_JP.test(String(enPkg.title))) return true
    return false
  }
  // One locale missing → migrate
  return true
}

async function findBySlug(strapi: Core.Strapi, uid: string, slug: string) {
  const rows = (await strapi.documents(uid as any).findMany({
    locale: 'en',
    filters: { slug: { $eq: slug } },
    limit: 1,
  })) as unknown as Array<{ documentId: string }>
  return rows[0]?.documentId || null
}

async function findBySortOrder(strapi: Core.Strapi, uid: string, sortOrder: number) {
  const rows = (await strapi.documents(uid as any).findMany({
    locale: 'en',
    filters: { sortOrder: { $eq: sortOrder } },
    limit: 1,
  })) as unknown as Array<{ documentId: string }>
  return rows[0]?.documentId || null
}

async function findByKindAndSortOrder(
  strapi: Core.Strapi,
  uid: string,
  kind: string,
  sortOrder: number,
) {
  const rows = (await strapi.documents(uid as any).findMany({
    locale: 'en',
    filters: {
      kind: { $eq: kind },
      sortOrder: { $eq: sortOrder },
    },
    limit: 1,
  })) as unknown as Array<{ documentId: string }>
  return rows[0]?.documentId || null
}

async function upsertLocalized(
  strapi: Core.Strapi,
  uid: string,
  documentId: string | null,
  shared: Record<string, unknown>,
  en: Record<string, unknown>,
  ja: Record<string, unknown>,
) {
  if (documentId) {
    await updateLocalized(strapi, uid, documentId, shared, en, ja)
    return documentId
  }
  return createLocalized(strapi, uid, shared, en, ja)
}

async function seedPackages(strapi: Core.Strapi, force: boolean) {
  if (!force) {
    const count = await strapi.documents(UID.package).count({ locale: 'en' })
    if (count > 0) {
      strapi.log.info(`Skip seed (${count} existing) → ${UID.package}`)
      return
    }
  }

  for (const pkg of SEED_PACKAGES) {
    const { en, ja, slug, ...shared } = pkg
    const existingId = force ? await findBySlug(strapi, UID.package, slug) : null
    await upsertLocalized(
      strapi,
      UID.package,
      existingId,
      {
        ...shared,
        slug,
        highlights: [...en.highlights],
      },
      { ...en, highlights: [...en.highlights] },
      { ...ja, highlights: [...ja.highlights] },
    )
  }
  strapi.log.info(`Seeded ${SEED_PACKAGES.length} tour packages (EN + JA)`)
}

async function seedEvents(strapi: Core.Strapi, force: boolean) {
  if (!force) {
    const count = await strapi.documents(UID.event).count({ locale: 'en' })
    if (count > 0) {
      strapi.log.info(`Skip seed (${count} existing) → ${UID.event}`)
      return
    }
  }

  for (const event of SEED_EVENTS) {
    const { en, ja, slug, ...shared } = event
    const existingId = force ? await findBySlug(strapi, UID.event, slug) : null
    await upsertLocalized(
      strapi,
      UID.event,
      existingId,
      {
        ...shared,
        slug,
        inclusions: [...en.inclusions],
      },
      { ...en, inclusions: [...en.inclusions] },
      { ...ja, inclusions: [...ja.inclusions] },
    )
  }
  strapi.log.info(`Seeded ${SEED_EVENTS.length} main events (EN + JA)`)
}

async function seedOrderedCollection(
  strapi: Core.Strapi,
  uid: string,
  rows: ReadonlyArray<{
    en: Record<string, unknown>
    ja: Record<string, unknown>
    sortOrder?: number
    kind?: string
    [key: string]: unknown
  }>,
  opts: { force: boolean; createOnly?: boolean },
) {
  const { force, createOnly = false } = opts
  if (!force) {
    const count = await strapi.documents(uid as any).count({ locale: 'en' })
    if (count > 0) {
      strapi.log.info(`Skip seed (${count} existing) → ${uid}`)
      return
    }
  }

  for (const row of rows) {
    const { en, ja, ...shared } = row
    const sortOrder = typeof shared.sortOrder === 'number' ? shared.sortOrder : undefined
    const kind = typeof shared.kind === 'string' ? shared.kind : undefined

    let existingId: string | null = null
    // After a wipe, always create — looking up by sortOrder mid-seed would
    // collide when several rows share the same sortOrder (e.g. site-notes by kind).
    if (force && !createOnly && sortOrder != null) {
      existingId = kind
        ? await findByKindAndSortOrder(strapi, uid, kind, sortOrder)
        : await findBySortOrder(strapi, uid, sortOrder)
    }

    await upsertLocalized(strapi, uid, existingId, shared as Record<string, unknown>, en, ja)
  }
  strapi.log.info(`Seeded ${rows.length} → ${uid} (EN + JA)`)
}

async function seedSettings(strapi: Core.Strapi, force: boolean) {
  const existingEn = await strapi.documents(UID.settings).findFirst({ locale: 'en' })
  const existingJa = await strapi.documents(UID.settings).findFirst({ locale: 'ja' })

  if (!existingEn?.documentId) {
    await upsertLocalized(
      strapi,
      UID.settings,
      null,
      { ...SEED_SETTINGS_SHARED },
      { ...SEED_SETTINGS_EN },
      { ...SEED_SETTINGS_JA },
    )
    strapi.log.info('Seeded site settings (EN + JA)')
    return
  }

  if (force) {
    await upsertLocalized(
      strapi,
      UID.settings,
      existingEn.documentId,
      { ...SEED_SETTINGS_SHARED },
      { ...SEED_SETTINGS_EN },
      { ...SEED_SETTINGS_JA },
    )
    strapi.log.info('Reseeded site settings (EN + JA)')
    return
  }

  // Repair polluted EN titles (e.g. accidental "123" edits) without wiping editor copy otherwise
  const enTitle = String((existingEn as { heroTitle?: string }).heroTitle || '')
  if (enTitle.includes('123')) {
    await strapi.documents(UID.settings).update({
      documentId: existingEn.documentId,
      locale: 'en',
      data: { ...SEED_SETTINGS_SHARED, ...SEED_SETTINGS_EN },
      status: 'published',
    })
    strapi.log.info('Repaired polluted English site settings (single type)')
  }

  // Single type: keep editor EN; repair JA when missing or polluted by bad auto-translate
  const jaTitle = String((existingJa as { heroTitle?: string } | null)?.heroTitle || '')
  const needsCuratedJa = !existingJa || !HAS_JP.test(jaTitle) || jaTitle.includes('123')

  if (needsCuratedJa) {
    await strapi.documents(UID.settings).update({
      documentId: existingEn.documentId,
      locale: 'ja',
      data: { ...SEED_SETTINGS_SHARED, ...SEED_SETTINGS_JA },
      status: 'published',
    })
    strapi.log.info('Applied curated Japanese translations → site settings (single type)')
  } else {
    strapi.log.info('Skip seed (settings EN + JA ok) → site settings')
  }
}

async function clearCollection(strapi: Core.Strapi, uid: string) {
  const seen = new Set<string>()
  for (const locale of ['en', 'ja'] as const) {
    const rows = await strapi.documents(uid as any).findMany({ locale, limit: 200 })
    for (const row of rows as Array<{ documentId?: string }>) {
      if (!row.documentId || seen.has(row.documentId)) continue
      seen.add(row.documentId)
      await strapi.documents(uid as any).delete({
        documentId: row.documentId,
        locale: '*',
      })
    }
  }
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    registerAutoTranslateMiddleware(strapi)
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPermissions(strapi)
    await ensureLocales(strapi)

    // Seeds already ship both locales — don't call external translate APIs on boot
    ;(strapi as Core.Strapi & { autoTranslateDisabled?: boolean }).autoTranslateDisabled = true

    const wipe = ['1', 'true', 'yes'].includes(String(process.env.CMS_RESEED || '').toLowerCase())
    const force = wipe || (await needsI18nReseed(strapi))
    if (wipe) {
      strapi.log.warn('CMS_RESEED set — wiping editorial CMS before EN + JA seed')
      await clearEditorial(strapi)
    } else if (force) {
      strapi.log.warn('CMS i18n migrate — writing EN source + JA translations onto existing entries')
    }

    const orderedOpts = { force, createOnly: wipe }

    await seedPackages(strapi, force)
    await seedEvents(strapi, force)
    await seedOrderedCollection(strapi, UID.service, [...SEED_SERVICES], orderedOpts)
    await seedOrderedCollection(strapi, UID.why, [...SEED_REASONS], orderedOpts)
    await seedOrderedCollection(strapi, UID.fee, [...SEED_FEES], orderedOpts)
    await seedOrderedCollection(strapi, UID.news, [...SEED_NEWS], orderedOpts)
    await seedOrderedCollection(strapi, UID.tourDetail, [...SEED_TOUR_DETAILS], orderedOpts)
    await seedOrderedCollection(strapi, UID.cancel, [...SEED_CANCEL], orderedOpts)

    // Repair incomplete site-notes (older seed collapsed rows that share sortOrder)
    const noteCount = await strapi.documents(UID.note).count({ locale: 'en' })
    if (noteCount < SEED_NOTES.length) {
      strapi.log.warn(
        `Site notes incomplete (${noteCount}/${SEED_NOTES.length}) — clearing and reseeding`,
      )
      await clearCollection(strapi, UID.note)
      await seedOrderedCollection(strapi, UID.note, [...SEED_NOTES], {
        force: true,
        createOnly: true,
      })
    } else {
      await seedOrderedCollection(strapi, UID.note, [...SEED_NOTES], orderedOpts)
    }

    await seedSettings(strapi, force)

    ;(strapi as Core.Strapi & { autoTranslateDisabled?: boolean }).autoTranslateDisabled = false

    const usingObjectStorage = Boolean(
      process.env.AWS_BUCKET || process.env.R2_BUCKET,
    )
    const hasRailwayVolume = Boolean(process.env.RAILWAY_VOLUME_MOUNT_PATH)
    const usingSqlite =
      (process.env.DATABASE_CLIENT || (process.env.DATABASE_URL ? 'postgres' : 'sqlite')) ===
      'sqlite'

    if (usingSqlite && process.env.NODE_ENV === 'production') {
      strapi.log.warn(
        'DATABASE is sqlite on an ephemeral disk — CMS content will reset on Railway redeploy. Set DATABASE_URL to Postgres.',
      )
    }
    if (process.env.NODE_ENV === 'production' && !usingObjectStorage && !hasRailwayVolume) {
      strapi.log.warn(
        'Media uploads are on ephemeral disk — files disappear on redeploy. Mount a Railway volume at /app/public/uploads, or set R2_/AWS_ S3 credentials (see .env.example).',
      )
    }

    strapi.log.info(
      'Auto-translate EN ↔ JA enabled (edit once in either locale; twin locale updates automatically)',
    )
  },
}
