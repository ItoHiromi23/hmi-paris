import type { StrapiMedia, StrapiTourPackage, TourPackage } from '~/types/package'
import { computeAvailability } from '~/types/package'
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
  const { bySlug } = useCmsLocale()
  const strapiUrl = String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')

  function localize(pkg: TourPackage): TourPackage {
    return bySlug('cms.packages', pkg, [
      'title',
      'summary',
      'description',
      'destination',
      'region',
      'highlights',
    ])
  }

  async function fetchPackages(options: { liveAvailability?: boolean } = {}): Promise<TourPackage[]> {
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

      if (!data?.data?.length) return []

      const mapped = data.data.map((item) => localize(mapPackage(strapiUrl, item)))

      // Skip N+1 availability calls on list/home SSR — use Strapi fields; detail pages enrich live.
      if (!options.liveAvailability) return mapped

      return Promise.all(
        mapped.map(async (base) => {
          const live = await fetchAvailability('package', base.slug, strapiUrl)
          return {
            ...base,
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
    } catch (err) {
      console.error('[packages] Failed to load from Strapi', err)
      return []
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
      if (!item) return null

      const mapped = mapPackage(strapiUrl, item)
      const live = await fetchAvailability('package', slug, strapiUrl)
      return localize({
        ...mapped,
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
      })
    } catch (err) {
      console.error('[packages] Failed to load package from Strapi', slug, err)
      return null
    }
  }

  return {
    fetchPackages,
    fetchPackageBySlug,
    formatPrice,
  }
}
