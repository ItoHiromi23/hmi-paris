import type { Core } from '@strapi/strapi'

export type ProductType = 'package' | 'event'

const UID = {
  package: 'api::tour-package.tour-package',
  event: 'api::main-event.main-event',
  order: 'api::order.order',
  session: 'api::tour-session.tour-session',
} as const

function productUid(type: ProductType) {
  return type === 'event' ? UID.event : UID.package
}

async function pendingSlotsFor(
  strapi: Core.Strapi,
  where: Record<string, unknown>,
) {
  const pendingCutoff = new Date(Date.now() - 45 * 60 * 1000)
  const pendingOrders = await strapi.db.query(UID.order).findMany({
    where: {
      ...where,
      status: 'pending',
      createdAt: { $gte: pendingCutoff.toISOString() },
    },
  })
  return pendingOrders.reduce(
    (sum: number, row: { slotsReserved?: number }) => sum + Number(row.slotsReserved || 1),
    0,
  )
}

export function sessionAvailabilityFromRow(session: {
  capacity?: number
  sold?: number
  sessionStatus?: string
  status?: string
  pending?: number
}) {
  const capacity = Number(session.capacity ?? 0)
  const sold = Number(session.sold ?? 0)
  const pending = Number(session.pending ?? 0)
  const available = Math.max(0, capacity - sold - pending)
  const open = (session.sessionStatus || session.status) === 'open'
  return {
    capacity,
    sold,
    pending,
    available: open ? available : 0,
    soldOut: !open || available <= 0,
  }
}

export async function getSessionByDocumentId(
  strapi: Core.Strapi,
  documentId: string,
) {
  return strapi.db.query(UID.session).findOne({
    where: { documentId },
    populate: ['tourPackage'],
  })
}

export async function getSessionAvailability(
  strapi: Core.Strapi,
  sessionDocumentId: string,
) {
  const session = await getSessionByDocumentId(strapi, sessionDocumentId)
  if (!session) return null

  const pending = await pendingSlotsFor(strapi, { sessionDocumentId })
  const caps = sessionAvailabilityFromRow({ ...session, pending })

  return {
    sessionDocumentId: session.documentId as string,
    packageSlug: session.packageSlug as string,
    startsAt: session.startsAt as string,
    endsAt: session.endsAt as string,
    status: (session.sessionStatus || session.status) as string,
    label: (session.label as string) || null,
    ...caps,
  }
}

/** Upcoming open sessions for a package, with live availability */
export async function listSessionsForPackage(
  strapi: Core.Strapi,
  slug: string,
  opts?: { from?: string; to?: string },
) {
  const from = opts?.from ? new Date(opts.from) : new Date()
  const to = opts?.to
    ? new Date(opts.to)
    : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)

  const sessions = await strapi.db.query(UID.session).findMany({
    where: {
      packageSlug: slug,
      sessionStatus: 'open',
      startsAt: {
        $gte: from.toISOString(),
        $lte: to.toISOString(),
      },
    },
    orderBy: { startsAt: 'asc' },
  })

  const results = []
  const seen = new Set<string>()
  for (const session of sessions) {
    const key = `${session.packageSlug}|${session.startsAt}`
    if (seen.has(key)) continue
    seen.add(key)
    const pending = await pendingSlotsFor(strapi, {
      sessionDocumentId: session.documentId,
    })
    const caps = sessionAvailabilityFromRow({ ...session, pending })
    results.push({
      sessionDocumentId: session.documentId as string,
      packageSlug: session.packageSlug as string,
      startsAt: session.startsAt as string,
      endsAt: session.endsAt as string,
      status: (session.sessionStatus || session.status) as string,
      label: (session.label as string) || null,
      ...caps,
    })
  }
  return results
}

export async function getAvailability(
  strapi: Core.Strapi,
  productType: ProductType,
  slug: string,
) {
  const uid = productUid(productType)
  const product = await strapi.db.query(uid).findOne({
    where: { slug },
  })

  if (!product) {
    return null
  }

  // Packages with calendar sessions: availability is based on upcoming sessions
  if (productType === 'package') {
    const upcoming = await listSessionsForPackage(strapi, slug)
    if (upcoming.length > 0) {
      const openWithSeats = upcoming.filter((s) => !s.soldOut)
      const available = openWithSeats.reduce((sum, s) => sum + s.available, 0)
      return {
        productType,
        slug,
        title: product.title as string,
        bookingUnlimited: false,
        usesSessions: true,
        slotsTotal: upcoming.reduce((sum, s) => sum + s.capacity, 0),
        slotsSold: upcoming.reduce((sum, s) => sum + s.sold, 0),
        pending: upcoming.reduce((sum, s) => sum + s.pending, 0),
        available,
        soldOut: openWithSeats.length === 0,
        nextSessionAt: openWithSeats[0]?.startsAt || null,
        sessionCount: upcoming.length,
      }
    }
  }

  const bookingUnlimited = Boolean(product.bookingUnlimited)
  const slotsTotal = Number(product.slotsTotal ?? 0)
  const slotsSold = Number(product.slotsSold ?? 0)

  const pending = await pendingSlotsFor(strapi, {
    packageSlug: slug,
    productType,
    sessionDocumentId: { $null: true },
  })

  const available = bookingUnlimited
    ? null
    : Math.max(0, slotsTotal - slotsSold - pending)

  return {
    productType,
    slug,
    title: product.title as string,
    bookingUnlimited,
    usesSessions: false,
    slotsTotal: bookingUnlimited ? null : slotsTotal,
    slotsSold,
    pending,
    available,
    soldOut: bookingUnlimited ? false : (available ?? 0) <= 0,
    nextSessionAt: null,
    sessionCount: 0,
  }
}

/** Idempotent slot adjust when order becomes paid / refunded */
export async function applyInventoryForOrderStatus(
  strapi: Core.Strapi,
  opts: {
    productType: ProductType
    slug: string
    slots: number
    previousStatus?: string | null
    nextStatus: string
    sessionDocumentId?: string | null
  },
) {
  const { productType, slug, slots, previousStatus, nextStatus, sessionDocumentId } = opts

  const wasPaid = previousStatus === 'paid'
  const isPaid = nextStatus === 'paid'
  const isRefunded = nextStatus === 'refunded'

  let delta = 0
  if (!wasPaid && isPaid) delta = slots
  if (wasPaid && isRefunded) delta = -slots
  if (delta === 0) return

  if (sessionDocumentId) {
    const session = await getSessionByDocumentId(strapi, sessionDocumentId)
    if (!session) return
    const nextSold = Math.max(0, Number(session.sold || 0) + delta)
    await strapi.documents(UID.session as any).update({
      documentId: session.documentId,
      data: { sold: nextSold },
      status: 'published',
    })
    return
  }

  const uid = productUid(productType)
  const product = await strapi.db.query(uid).findOne({ where: { slug } })
  if (!product || product.bookingUnlimited) return

  const nextSold = Math.max(0, Number(product.slotsSold || 0) + delta)
  await strapi.documents(uid as any).update({
    documentId: product.documentId,
    data: { slotsSold: nextSold },
    status: 'published',
  })
}

export async function ensureCapacityDefaults(strapi: Core.Strapi) {
  for (const [uid, defaults] of [
    [UID.package, { slotsTotal: 10, slotsSold: 0, bookingUnlimited: false }],
    [UID.event, { slotsTotal: 20, slotsSold: 0, bookingUnlimited: false }],
  ] as const) {
    const rows = await strapi.documents(uid as any).findMany({ locale: 'en', limit: 200 })
    const seen = new Set<string>()
    for (const row of rows as Array<{
      documentId?: string
      slotsTotal?: number | null
      slotsSold?: number | null
      bookingUnlimited?: boolean | null
    }>) {
      if (!row.documentId || seen.has(row.documentId)) continue
      seen.add(row.documentId)
      if (row.slotsTotal != null) continue
      await strapi.documents(uid as any).update({
        documentId: row.documentId,
        locale: 'en',
        data: {
          slotsTotal: defaults.slotsTotal,
          slotsSold: row.slotsSold ?? defaults.slotsSold,
          bookingUnlimited: row.bookingUnlimited ?? defaults.bookingUnlimited,
        },
        status: 'published',
      })
    }
  }
}

function sessionSlotKey(packageSlug: string, startsAt: string | Date) {
  return `${packageSlug}|${new Date(startsAt).toISOString()}`
}

/**
 * Ensure upcoming bookable slots exist without wiping reservations.
 * Never deletes sessions. Only creates missing packageSlug+startsAt rows,
 * then reconciles sold counters from paid orders (survives redeploys).
 */
export async function ensureTourSessions(strapi: Core.Strapi, weeks = 6) {
  const packageRows = await strapi.documents(UID.package as any).findMany({
    locale: 'en',
    limit: 200,
  })
  const packages = [
    ...new Map(
      (packageRows as unknown as Array<{ slug: string; documentId: string }>).map((p) => [
        p.slug,
        p,
      ]),
    ).values(),
  ]
  if (!packages.length) return

  // Private exclusive hours: same day OK at different times; same hour = only 1 booking
  const hours = [
    { hour: 9, label: 'Morning' },
    { hour: 12, label: 'Midday' },
    { hour: 15, label: 'Afternoon' },
    { hour: 17, label: 'Evening' },
  ]
  const weekdays = [2, 4, 6] // Tue, Thu, Sat
  const capacity = 1

  const existing = await strapi.db.query(UID.session).findMany()
  const byKey = new Map<string, { documentId: string; sold?: number }>()
  for (const row of existing) {
    if (!row.packageSlug || !row.startsAt) continue
    byKey.set(sessionSlotKey(String(row.packageSlug), row.startsAt as string), {
      documentId: row.documentId as string,
      sold: Number(row.sold || 0),
    })
  }

  const start = new Date()
  start.setUTCHours(0, 0, 0, 0)

  let created = 0

  for (const pkg of packages) {
    for (let day = 0; day < weeks * 7; day++) {
      const d = new Date(start)
      d.setUTCDate(start.getUTCDate() + day + 1)
      if (!weekdays.includes(d.getUTCDay())) continue

      for (const slot of hours) {
        // Paris summer UTC+2 wall time (seed approximation)
        const startsAt = new Date(
          Date.UTC(
            d.getUTCFullYear(),
            d.getUTCMonth(),
            d.getUTCDate(),
            slot.hour - 2,
            0,
            0,
          ),
        )
        const endsAt = new Date(startsAt.getTime() + 2 * 60 * 60 * 1000)
        const key = sessionSlotKey(pkg.slug, startsAt)
        if (byKey.has(key)) continue

        const createdRow = await strapi.documents(UID.session as any).create({
          data: {
            tourPackage: pkg.documentId,
            packageSlug: pkg.slug,
            startsAt: startsAt.toISOString(),
            endsAt: endsAt.toISOString(),
            capacity,
            sold: 0,
            sessionStatus: 'open',
            label: slot.label,
          },
          status: 'published',
        })
        byKey.set(key, {
          documentId: createdRow.documentId as string,
          sold: 0,
        })
        created++
      }
    }
  }

  if (created > 0) {
    strapi.log.info(
      `Added ${created} missing tour sessions (non-destructive, ${weeks} weeks ahead)`,
    )
  } else {
    strapi.log.info(
      `Tour sessions up to date (${byKey.size} existing) — no wipe, no create`,
    )
  }

  await ensurePrivateTourCapacity(strapi)
  await reconcileInventoryFromOrders(strapi)
}

/**
 * Rebuild session/product sold counters from paid orders so redeploys
 * cannot leave inventory empty while Order rows still exist.
 * Also recreates missing sessions referenced by paid bookings.
 */
export async function reconcileInventoryFromOrders(strapi: Core.Strapi) {
  const paidOrders = await strapi.db.query(UID.order).findMany({
    where: { status: 'paid' },
  })
  if (!paidOrders.length) return

  type SessionAgg = {
    slots: number
    packageSlug: string
    startsAt?: string | null
    endsAt?: string | null
    orderDocumentIds: string[]
  }

  const bySessionId = new Map<string, SessionAgg>()
  const bySlotKey = new Map<string, SessionAgg>()
  const productSold = new Map<string, number>() // `${productType}|${slug}`

  for (const order of paidOrders) {
    const slots = Number(order.slotsReserved || 1)
    const packageSlug = String(order.packageSlug || '')
    const productType = (order.productType || 'package') as ProductType
    const sessionDocumentId = order.sessionDocumentId
      ? String(order.sessionDocumentId)
      : ''
    const startsAt = order.sessionStartsAt
      ? new Date(order.sessionStartsAt as string).toISOString()
      : null
    const endsAt = order.sessionEndsAt
      ? new Date(order.sessionEndsAt as string).toISOString()
      : null

    if (sessionDocumentId || (packageSlug && startsAt)) {
      const aggKey = sessionDocumentId || sessionSlotKey(packageSlug, startsAt!)
      const target = sessionDocumentId ? bySessionId : bySlotKey
      const prev = target.get(aggKey) || {
        slots: 0,
        packageSlug,
        startsAt,
        endsAt,
        orderDocumentIds: [],
      }
      prev.slots += slots
      if (packageSlug) prev.packageSlug = packageSlug
      if (startsAt) prev.startsAt = startsAt
      if (endsAt) prev.endsAt = endsAt
      if (order.documentId) prev.orderDocumentIds.push(String(order.documentId))
      target.set(aggKey, prev)
    } else if (packageSlug) {
      const key = `${productType}|${packageSlug}`
      productSold.set(key, (productSold.get(key) || 0) + slots)
    }
  }

  const allSessions = await strapi.db.query(UID.session).findMany()
  type SessionRow = {
    documentId: string
    packageSlug?: string
    startsAt?: string
    sold?: number
  }
  const sessionsByDocId = new Map<string, SessionRow>(
    allSessions.map((s: SessionRow) => [s.documentId, s]),
  )
  const sessionsBySlot = new Map<string, SessionRow>()
  for (const s of allSessions as SessionRow[]) {
    if (!s.packageSlug || !s.startsAt) continue
    sessionsBySlot.set(sessionSlotKey(String(s.packageSlug), s.startsAt), s)
  }

  const packageRowsForReconcile = (await strapi.documents(UID.package as any).findMany({
    locale: 'en',
    limit: 200,
  })) as unknown as Array<{ slug: string; documentId: string }>
  const packageBySlug = new Map(packageRowsForReconcile.map((p) => [p.slug, p]))

  let sessionsUpdated = 0
  let sessionsRestored = 0

  async function applySoldToSession(
    session: { documentId: string; sold?: number },
    slots: number,
  ) {
    if (Number(session.sold || 0) === slots) return
    await strapi.documents(UID.session as any).update({
      documentId: session.documentId,
      data: { sold: slots },
      status: 'published',
    })
    sessionsUpdated++
  }

  // Paid orders keyed by current session document id
  for (const [sessionDocumentId, agg] of bySessionId) {
    let session = sessionsByDocId.get(sessionDocumentId)
    if (!session && agg.packageSlug && agg.startsAt) {
      session = sessionsBySlot.get(sessionSlotKey(agg.packageSlug, agg.startsAt))
    }

    if (!session && agg.packageSlug && agg.startsAt) {
      const pkg = packageBySlug.get(agg.packageSlug)
      const endsAt =
        agg.endsAt ||
        new Date(new Date(agg.startsAt).getTime() + 2 * 60 * 60 * 1000).toISOString()
      const created = await strapi.documents(UID.session as any).create({
        data: {
          tourPackage: pkg?.documentId,
          packageSlug: agg.packageSlug,
          startsAt: agg.startsAt,
          endsAt,
          capacity: 1,
          sold: agg.slots,
          sessionStatus: 'open',
          label: 'Restored booking',
        },
        status: 'published',
      })
      session = { documentId: created.documentId, sold: agg.slots }
      sessionsRestored++

      // Point orders at the restored session id
      for (const orderDocumentId of agg.orderDocumentIds) {
        await strapi.documents(UID.order as any).update({
          documentId: orderDocumentId,
          data: { sessionDocumentId: created.documentId },
        })
      }
    }

    if (session) {
      await applySoldToSession(session, agg.slots)
    }
  }

  // Paid orders matched only by package + start time
  for (const [slotKey, agg] of bySlotKey) {
    let session = sessionsBySlot.get(slotKey)
    if (!session && agg.packageSlug && agg.startsAt) {
      const pkg = packageBySlug.get(agg.packageSlug)
      const endsAt =
        agg.endsAt ||
        new Date(new Date(agg.startsAt).getTime() + 2 * 60 * 60 * 1000).toISOString()
      const created = await strapi.documents(UID.session as any).create({
        data: {
          tourPackage: pkg?.documentId,
          packageSlug: agg.packageSlug,
          startsAt: agg.startsAt,
          endsAt,
          capacity: 1,
          sold: agg.slots,
          sessionStatus: 'open',
          label: 'Restored booking',
        },
        status: 'published',
      })
      session = { documentId: created.documentId, sold: agg.slots }
      sessionsBySlot.set(slotKey, session)
      sessionsRestored++

      for (const orderDocumentId of agg.orderDocumentIds) {
        await strapi.documents(UID.order as any).update({
          documentId: orderDocumentId,
          data: { sessionDocumentId: created.documentId },
        })
      }
    }
    if (session) {
      await applySoldToSession(session, agg.slots)
    }
  }

  // Event / package-level inventory (no session)
  let productsUpdated = 0
  for (const [key, slots] of productSold) {
    const [productType, slug] = key.split('|') as [ProductType, string]
    const uid = productUid(productType)
    const product = await strapi.db.query(uid).findOne({ where: { slug } })
    if (!product || product.bookingUnlimited) continue
    if (Number(product.slotsSold || 0) === slots) continue
    await strapi.documents(uid as any).update({
      documentId: product.documentId,
      data: { slotsSold: slots },
      status: 'published',
    })
    productsUpdated++
  }

  if (sessionsUpdated || sessionsRestored || productsUpdated) {
    strapi.log.info(
      `Reconciled inventory from paid orders (sessions updated=${sessionsUpdated}, restored=${sessionsRestored}, products=${productsUpdated})`,
    )
  }
}

/** Force private-tour mode: each date/time holds exactly 1 booking */
export async function ensurePrivateTourCapacity(strapi: Core.Strapi) {
  const rows = await strapi.db.query(UID.session).findMany()
  let updated = 0
  for (const row of rows) {
    if (Number(row.capacity) === 1) continue
    await strapi.documents(UID.session as any).update({
      documentId: row.documentId,
      data: { capacity: 1 },
      status: 'published',
    })
    updated++
  }
  if (updated > 0) {
    strapi.log.info(`Set capacity=1 on ${updated} tour sessions (private tours)`)
  }
}
