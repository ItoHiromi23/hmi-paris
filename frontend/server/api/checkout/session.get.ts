/**
 * Confirm Stripe Checkout + mark order paid in Strapi (decrements available slots)
 * and send the booking confirmation email.
 * Works without Stripe CLI webhooks — critical for local/test setups.
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sessionId = String(query.session_id || '')
  if (!sessionId) {
    throw createError({ statusCode: 400, statusMessage: 'session_id is required' })
  }

  const stripe = useStripe()
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  const meta = session.metadata || {}
  const productType = meta.productType === 'event' ? 'event' : 'package'
  const paid =
    session.payment_status === 'paid' || session.status === 'complete'

  let emailSent = false
  let emailReason: string | undefined
  let orderNumber = meta.orderNumber || null
  let packageSlug = meta.packageSlug || null
  let packageTitle = meta.packageTitle || null
  let customerEmail =
    session.customer_details?.email || session.customer_email || null
  const amountTotal = session.amount_total != null ? session.amount_total / 100 : 0
  const currency = (session.currency || 'eur').toUpperCase()

  if (paid && meta.packageSlug) {
    const fulfilled = await fulfillPaidCheckoutSession(
      session,
      'Paid via Stripe Checkout (confirmed on success page)',
    )
    orderNumber = fulfilled.orderNumber
    packageSlug = fulfilled.packageSlug
    packageTitle = fulfilled.packageTitle
    customerEmail = fulfilled.customerEmail
    emailSent = fulfilled.emailSent
    emailReason = fulfilled.emailReason
  }

  // Fresh availability after inventory update
  const config = useRuntimeConfig()
  const strapiUrl = String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')
  let available: number | null = null
  let soldOut = false
  let slotsSold: number | null = null
  let slotsTotal: number | null = null

  if (packageSlug) {
    const avail = await $fetch<{
      data: {
        available: number | null
        soldOut: boolean
        slotsSold: number
        slotsTotal: number | null
      }
    }>(`${strapiUrl}/api/inventory/availability`, {
      query: { productType, slug: packageSlug },
    }).catch(() => null)

    if (avail?.data) {
      available = avail.data.available
      soldOut = avail.data.soldOut
      slotsSold = avail.data.slotsSold
      slotsTotal = avail.data.slotsTotal
    }
  }

  return {
    orderNumber,
    packageSlug,
    packageTitle,
    productType,
    status: paid ? 'paid' : session.payment_status,
    customerEmail,
    amountTotal,
    currency,
    available,
    soldOut,
    slotsSold,
    slotsTotal,
    sessionLabel: meta.sessionLabel || null,
    sessionStartsAt: meta.sessionStartsAt || null,
    emailSent,
    emailReason,
  }
})
