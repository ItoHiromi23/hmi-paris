import type { StrapiMedia, StrapiTourPackage, TourPackage } from '~/types/package'
import { computeAvailability } from '~/types/package'
import { FALLBACK_PACKAGES } from '~/composables/useFallbackPackages'
import { fetchAvailability } from '~/composables/useAvailability'

function mediaUrl(strapiUrl: string, media?: StrapiMedia | null): string | null {
  if (!media?.url) return null
  if (media.url.startsWith('http')) return media.url
  return `${strapiUrl}${media.url}`
}

function mapPackage(strapiUrl: string, item: StrapiTourPackage): TourPackage {
  const capacity = computeAvailability({
    bookingUnlimited: item.bookingUnlimited,
    slotsTotal: item.slotsTotal ?? 10,
    slotsSold: item.slotsSold ?? 0,
  })

  return {
    id: item.documentId || item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    summary: item.summary || '',
    description: item.description || '',
    destination: item.destination,
    region: item.region || '',
    durationDays: item.durationDays,
    priceFrom: Number(item.priceFrom),
    currency: item.currency || 'EUR',
    featured: Boolean(item.featured),
    difficulty: item.difficulty || 'moderate',
    highlights: Array.isArray(item.highlights) ? item.highlights : [],
    heroImageUrl: mediaUrl(strapiUrl, item.heroImage),
    bookingUnlimited: capacity.bookingUnlimited,
    slotsTotal: capacity.slotsTotal,
    slotsSold: capacity.slotsSold,
    available: capacity.available,
    soldOut: capacity.soldOut,
  }
}

export function formatPrice(amount: number, currency = 'EUR') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function useTourPackages() {
  const config = useRuntimeConfig()
  // Prefer 127.0.0.1 — Node often resolves "localhost" to ::1 while Strapi may listen on IPv4 only
  const strapiUrl = String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')

  async function fetchPackages(): Promise<TourPackage[]> {
    try {
      const data = await $fetch<{ data: StrapiTourPackage[] }>(
        `${strapiUrl}/api/tour-packages`,
        {
          query: {
            populate: 'heroImage',
            'filters[publishedAt][$notNull]': 'true',
            sort: 'featured:desc,title:asc',
          },
        },
      )

      if (!data?.data?.length) return FALLBACK_PACKAGES

      // Enrich with live availability (pending holds + sold) so UI matches checkout
      const mapped = await Promise.all(
        data.data.map(async (item) => {
          const base = mapPackage(strapiUrl, item)
          const fallback = FALLBACK_PACKAGES.find((p) => p.slug === base.slug)
          const live = await fetchAvailability('package', base.slug, strapiUrl)
          return {
            ...base,
            heroImageUrl: base.heroImageUrl || fallback?.heroImageUrl || null,
            ...(live
              ? {
                  bookingUnlimited: live.bookingUnlimited,
                  slotsTotal: live.slotsTotal,
                  slotsSold: live.slotsSold,
                  available: live.available,
                  soldOut: live.soldOut,
                  usesSessions: live.usesSessions,
                  nextSessionAt: live.nextSessionAt,
                }
              : {}),
          }
        }),
      )
      return mapped
    } catch (err) {
      console.error('[packages] Failed to load from Strapi — using fallback', err)
      return FALLBACK_PACKAGES
    }
  }

  async function fetchPackageBySlug(slug: string): Promise<TourPackage | null> {
    try {
      const data = await $fetch<{ data: StrapiTourPackage[] }>(
        `${strapiUrl}/api/tour-packages`,
        {
          query: {
            'filters[slug][$eq]': slug,
            populate: '*',
          },
        },
      )

      const item = data?.data?.[0]
      if (!item) {
        return FALLBACK_PACKAGES.find((p) => p.slug === slug) || null
      }

      const mapped = mapPackage(strapiUrl, item)
      const live = await fetchAvailability('package', slug, strapiUrl)
      const fallback = FALLBACK_PACKAGES.find((p) => p.slug === mapped.slug)
      return {
        ...mapped,
        heroImageUrl: mapped.heroImageUrl || fallback?.heroImageUrl || null,
        description: mapped.description || fallback?.description || '',
        ...(live
          ? {
              bookingUnlimited: live.bookingUnlimited,
              slotsTotal: live.slotsTotal,
              slotsSold: live.slotsSold,
              available: live.available,
              soldOut: live.soldOut,
              usesSessions: live.usesSessions,
              nextSessionAt: live.nextSessionAt,
            }
          : {}),
      }
    } catch (err) {
      console.error('[packages] Failed to load package from Strapi', slug, err)
      return FALLBACK_PACKAGES.find((p) => p.slug === slug) || null
    }
  }

  return {
    fetchPackages,
    fetchPackageBySlug,
    formatPrice,
  }
}
