import type { AvailabilityInfo, ProductType } from '~/types/package'

function resolveStrapiUrl(strapiBase?: string) {
  let strapiUrl = strapiBase
  if (!strapiUrl) {
    try {
      const config = useRuntimeConfig()
      strapiUrl = String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    } catch {
      strapiUrl = 'http://127.0.0.1:1337'
    }
  }
  return strapiUrl.replace(/\/$/, '').replace('://localhost', '://127.0.0.1')
}

export async function fetchAvailability(
  productType: ProductType,
  slug: string,
  strapiBase?: string,
): Promise<AvailabilityInfo | null> {
  const strapiUrl = resolveStrapiUrl(strapiBase)
  try {
    const res = await $fetch<{ data: AvailabilityInfo }>(`${strapiUrl}/api/inventory/availability`, {
      query: { productType, slug },
    })
    return res?.data || null
  } catch {
    return null
  }
}

export function slotsLabel(info: {
  bookingUnlimited?: boolean
  available?: number | null
  soldOut?: boolean
  usesSessions?: boolean
  nextSessionAt?: string | null
}) {
  if (info.bookingUnlimited || info.available == null) return 'Open'
  if (info.soldOut || (info.available != null && info.available <= 0)) return 'Sold out'
  if (info.usesSessions) {
    return `${info.available} seats open`
  }
  return `${info.available} slots left`
}

export function useAvailability() {
  return {
    fetchAvailability,
    slotsLabel,
  }
}
