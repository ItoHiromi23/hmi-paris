interface CheckoutBody {
  productType?: 'package' | 'event'
  packageSlug: string
  sessionDocumentId?: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
}

function strapiBaseUrl() {
  const config = useRuntimeConfig()
  return String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')
}

function formatSessionLabel(startsAt: string, endsAt?: string | null) {
  try {
    const start = new Date(startsAt)
    const date = new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'Europe/Paris',
    }).format(start)
    const time = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris',
    }).format(start)
    if (!endsAt) return `${date} · ${time}`
    const endTime = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris',
    }).format(new Date(endsAt))
    return `${date} · ${time}–${endTime}`
  } catch {
    return startsAt
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CheckoutBody>(event)
  const slug = body?.packageSlug?.trim()
  const productType = body?.productType === 'event' ? 'event' : 'package'
  const sessionDocumentId = body?.sessionDocumentId?.trim() || ''

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'packageSlug is required' })
  }

  const config = useRuntimeConfig()
  const strapiUrl = strapiBaseUrl()
  const siteUrl = (config.public.siteUrl as string).replace(/\/$/, '')

  const collection = productType === 'event' ? 'main-events' : 'tour-packages'
  const productRes = await $fetch<{ data: Array<Record<string, unknown>> }>(
    `${strapiUrl}/api/${collection}`,
    {
      query: {
        'filters[slug][$eq]': slug,
        'filters[publishedAt][$notNull]': 'true',
      },
    },
  ).catch(() => null)

  const raw = productRes?.data?.[0]
  if (!raw) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  const title = String(raw.title || '')
  const amount = Number(raw.priceFrom)
  const currency = String(raw.currency || 'EUR').toLowerCase()

  if (!title || !Number.isFinite(amount) || amount <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Product is not purchasable' })
  }

  let sessionStartsAt: string | null = null
  let sessionEndsAt: string | null = null
  let sessionLabel = ''

  if (productType === 'package') {
    if (!sessionDocumentId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Please select a date and time',
      })
    }

    const sessionAvail = await $fetch<{
      data: {
        soldOut: boolean
        available: number
        packageSlug: string
        startsAt: string
        endsAt: string
        label: string | null
      }
    }>(`${strapiUrl}/api/inventory/session`, {
      query: { sessionDocumentId },
    }).catch(() => null)

    if (!sessionAvail?.data) {
      throw createError({ statusCode: 404, statusMessage: 'Selected session not found' })
    }
    if (sessionAvail.data.packageSlug !== slug) {
      throw createError({ statusCode: 400, statusMessage: 'Session does not match this package' })
    }
    if (sessionAvail.data.soldOut) {
      throw createError({
        statusCode: 409,
        statusMessage: 'That date/time is sold out. Please choose another.',
      })
    }

    sessionStartsAt = sessionAvail.data.startsAt
    sessionEndsAt = sessionAvail.data.endsAt
    sessionLabel = formatSessionLabel(sessionStartsAt, sessionEndsAt)
  } else {
    const availability = await $fetch<{
      data: { soldOut: boolean; available: number | null; bookingUnlimited: boolean }
    }>(`${strapiUrl}/api/inventory/availability`, {
      query: { productType, slug },
    }).catch(() => null)

    if (availability?.data?.soldOut) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Sold out. No booking slots are currently available.',
      })
    }
  }

  const orderNumber = makeOrderNumber()
  const stripe = useStripe()

  const unitAmount = Math.round(amount * 100)
  if (unitAmount < 50) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Amount too small for card payment',
    })
  }

  const cancelPath =
    productType === 'event'
      ? `/checkout/cancel?type=event&slug=${encodeURIComponent(slug)}`
      : `/checkout/cancel?slug=${encodeURIComponent(slug)}`

  const customerEmail = body.customerEmail?.trim() || undefined
  const productDescription =
    productType === 'event'
      ? `HMI Paris event (${slug})`
      : `HMI Paris package (${slug})${sessionLabel ? ` — ${sessionLabel}` : ''}`

  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: 'en',
    customer_email: customerEmail,
    ...(customerEmail
      ? {
          payment_intent_data: {
            receipt_email: customerEmail,
          },
        }
      : {}),
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount: unitAmount,
          product_data: {
            name: sessionLabel ? `${title} · ${sessionLabel}` : title,
            description: productDescription,
            metadata: {
              packageSlug: slug,
              productType,
              ...(sessionDocumentId ? { sessionDocumentId } : {}),
            },
          },
        },
      },
    ],
    metadata: {
      orderNumber,
      productType,
      packageSlug: slug,
      packageTitle: title,
      customerName: body.customerName || '',
      customerPhone: body.customerPhone || '',
      slotsReserved: '1',
      confirmationEmailSent: 'false',
      sessionDocumentId: sessionDocumentId || '',
      sessionStartsAt: sessionStartsAt || '',
      sessionEndsAt: sessionEndsAt || '',
      sessionLabel: sessionLabel || '',
    },
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}${cancelPath}`,
  })

  try {
    await syncOrderToStrapi({
      orderNumber,
      productType,
      packageSlug: slug,
      packageTitle: title,
      slotsReserved: 1,
      sessionDocumentId: sessionDocumentId || null,
      sessionStartsAt,
      sessionEndsAt,
      amount,
      currency: currency.toUpperCase(),
      customerName: body.customerName || null,
      customerEmail: body.customerEmail || null,
      customerPhone: body.customerPhone || null,
      status: 'pending',
      stripeSessionId: stripeSession.id,
      notes: sessionLabel
        ? `Created from Nuxt checkout · ${sessionLabel}`
        : 'Created from Nuxt checkout',
    })
  } catch (err: unknown) {
    const statusMessage =
      err && typeof err === 'object' && 'data' in err
        ? String((err as { data?: { error?: { message?: string } } }).data?.error?.message || '')
        : ''
    if (
      statusMessage.toLowerCase().includes('sold out') ||
      statusMessage.toLowerCase().includes('seats') ||
      statusMessage.includes('slots')
    ) {
      throw createError({
        statusCode: 409,
        statusMessage: statusMessage || 'Sold out. No booking slots are currently available.',
      })
    }
    throw err
  }

  return {
    url: stripeSession.url,
    sessionId: stripeSession.id,
    orderNumber,
  }
})
