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
  const { t } = useI18n()
  if (info.bookingUnlimited || info.available == null) return t('common.open')
  if (info.soldOut || (info.available != null && info.available <= 0)) return t('common.soldOut')
  if (info.usesSessions) {
    return t('common.seatsOpen', { n: info.available })
  }
  return t('common.slotsLeft', { n: info.available })
}

export function useAvailability() {
  return {
    fetchAvailability,
    slotsLabel,
  }
}
