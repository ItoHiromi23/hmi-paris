export interface OrderSyncPayload {
  orderNumber: string
  productType?: 'package' | 'event'
  packageSlug: string
  packageTitle: string
  slotsReserved?: number
  sessionDocumentId?: string | null
  sessionStartsAt?: string | null
  sessionEndsAt?: string | null
  amount: number
  currency: string
  customerName?: string | null
  customerEmail?: string | null
  customerPhone?: string | null
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled'
  stripeSessionId?: string | null
  stripePaymentIntentId?: string | null
  paidAt?: string | null
  notes?: string | null
}

function strapiBaseUrl() {
  const config = useRuntimeConfig()
  return String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')
}

export async function syncOrderToStrapi(payload: OrderSyncPayload) {
  const config = useRuntimeConfig()
  const strapiUrl = strapiBaseUrl()
  const secret = config.ordersSharedSecret as string

  if (!secret) {
    console.warn('[orders] ORDERS_SHARED_SECRET missing — order not saved to Strapi')
    return null
  }

  try {
    return await $fetch(`${strapiUrl}/api/orders/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Orders-Secret': secret,
      },
      body: { data: payload },
    })
  } catch (err) {
    console.error('[orders] Failed to sync order to Strapi', err)
    throw err
  }
}

export function makeOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `HMI-${stamp}-${rand}`
}
