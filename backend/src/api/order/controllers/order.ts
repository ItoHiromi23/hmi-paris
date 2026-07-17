import { factories } from '@strapi/strapi'
import type { Core } from '@strapi/strapi'
import {
  applyInventoryForOrderStatus,
  getAvailability,
  getSessionAvailability,
  listSessionsForPackage,
  type ProductType,
} from '../services/inventory'

const UID = 'api::order.order' as const

function assertSecret(ctx: any) {
  const expected = process.env.ORDERS_SHARED_SECRET
  const provided = ctx.request.header['x-orders-secret']
  if (!expected || !provided || provided !== expected) {
    return false
  }
  return true
}

function normalizeProductType(value: unknown): ProductType {
  return value === 'event' ? 'event' : 'package'
}

export default factories.createCoreController('api::order.order', ({ strapi }: { strapi: Core.Strapi }) => ({
  async availability(ctx) {
    const productType = normalizeProductType(ctx.query.productType || ctx.query.type)
    const slug = String(ctx.query.slug || '').trim()
    if (!slug) {
      return ctx.badRequest('slug is required')
    }

    const data = await getAvailability(strapi, productType, slug)
    if (!data) {
      return ctx.notFound('Product not found')
    }
    ctx.body = { data }
  },

  async sessions(ctx) {
    const slug = String(ctx.query.slug || '').trim()
    if (!slug) {
      return ctx.badRequest('slug is required')
    }
    const from = ctx.query.from ? String(ctx.query.from) : undefined
    const to = ctx.query.to ? String(ctx.query.to) : undefined
    const data = await listSessionsForPackage(strapi, slug, { from, to })
    ctx.body = { data }
  },

  async sessionAvailability(ctx) {
    const sessionDocumentId = String(
      ctx.query.sessionDocumentId || ctx.query.sessionId || '',
    ).trim()
    if (!sessionDocumentId) {
      return ctx.badRequest('sessionDocumentId is required')
    }
    const data = await getSessionAvailability(strapi, sessionDocumentId)
    if (!data) {
      return ctx.notFound('Session not found')
    }
    ctx.body = { data }
  },

  async sync(ctx) {
    if (!assertSecret(ctx)) {
      return ctx.unauthorized('Invalid orders secret')
    }

    const body = ctx.request.body?.data || ctx.request.body || {}
    const {
      orderNumber,
      packageSlug,
      packageTitle,
      amount,
      currency,
      customerName,
      customerEmail,
      customerPhone,
      status,
      stripeSessionId,
      stripePaymentIntentId,
      paidAt,
      notes,
      productType: rawType,
      slotsReserved: rawSlots,
      sessionDocumentId: rawSessionId,
      sessionStartsAt,
      sessionEndsAt,
    } = body

    if (!orderNumber || !packageSlug || !packageTitle || amount == null || !currency) {
      return ctx.badRequest('Missing required order fields')
    }

    const productType = normalizeProductType(rawType)
    const slotsReserved = Math.max(1, Number(rawSlots || 1))
    const nextStatus = status || 'pending'
    const sessionDocumentId = rawSessionId ? String(rawSessionId) : null

    if (nextStatus === 'pending') {
      if (sessionDocumentId) {
        const sessionAvail = await getSessionAvailability(strapi, sessionDocumentId)
        if (!sessionAvail) {
          return ctx.notFound('Session not found')
        }
        if (sessionAvail.packageSlug !== packageSlug) {
          return ctx.badRequest('Session does not belong to this package')
        }
        if (sessionAvail.soldOut) {
          return ctx.conflict('Sold out — no seats left for this date/time')
        }

        let existingPendingSlots = 0
        if (stripeSessionId || orderNumber) {
          const existingPending = await strapi.db.query(UID).findOne({
            where: stripeSessionId ? { stripeSessionId } : { orderNumber },
          })
          if (existingPending?.status === 'pending') {
            existingPendingSlots = Number(existingPending.slotsReserved || 1)
          }
        }

        if (sessionAvail.available + existingPendingSlots < slotsReserved) {
          return ctx.conflict('Not enough seats left for this date/time')
        }
      } else {
        const availability = await getAvailability(strapi, productType, packageSlug)
        if (availability?.usesSessions) {
          return ctx.badRequest('sessionDocumentId is required for this package')
        }
        if (availability?.soldOut) {
          return ctx.conflict('Sold out — no booking slots remaining')
        }

        let existingPendingSlots = 0
        if (stripeSessionId || orderNumber) {
          const existingPending = await strapi.db.query(UID).findOne({
            where: stripeSessionId ? { stripeSessionId } : { orderNumber },
          })
          if (existingPending?.status === 'pending') {
            existingPendingSlots = Number(existingPending.slotsReserved || 1)
          }
        }

        if (
          availability &&
          !availability.bookingUnlimited &&
          availability.available != null &&
          availability.available + existingPendingSlots < slotsReserved
        ) {
          return ctx.conflict('Not enough booking slots remaining')
        }
      }
    }

    let existing = null as {
      documentId: string
      status?: string
    } | null

    if (stripeSessionId) {
      existing = await strapi.db.query(UID).findOne({ where: { stripeSessionId } })
    }
    if (!existing && orderNumber) {
      existing = await strapi.db.query(UID).findOne({ where: { orderNumber } })
    }

    const payload = {
      orderNumber,
      productType,
      packageSlug,
      packageTitle,
      slotsReserved,
      sessionDocumentId: sessionDocumentId || undefined,
      sessionStartsAt: sessionStartsAt || undefined,
      sessionEndsAt: sessionEndsAt || undefined,
      amount,
      currency: String(currency).toUpperCase(),
      customerName: customerName || undefined,
      customerEmail: customerEmail || undefined,
      customerPhone: customerPhone || undefined,
      status: nextStatus,
      stripeSessionId: stripeSessionId || undefined,
      stripePaymentIntentId: stripePaymentIntentId || undefined,
      paidAt: paidAt || undefined,
      notes: notes || undefined,
    }

    const previousStatus = existing?.status || null
    let saved

    if (existing?.documentId) {
      saved = await strapi.documents(UID).update({
        documentId: existing.documentId,
        data: payload,
      })
    } else {
      saved = await strapi.documents(UID).create({
        data: payload,
      })
    }

    await applyInventoryForOrderStatus(strapi, {
      productType,
      slug: packageSlug,
      slots: slotsReserved,
      previousStatus,
      nextStatus,
      sessionDocumentId,
    })

    ctx.body = { data: saved }
  },
}))
