export type PackageDifficulty = 'easy' | 'moderate' | 'challenging'
export type ProductType = 'package' | 'event'

export interface AvailabilityInfo {
  bookingUnlimited: boolean
  slotsTotal: number | null
  slotsSold: number
  pending?: number
  available: number | null
  soldOut: boolean
  usesSessions?: boolean
  nextSessionAt?: string | null
  sessionCount?: number
}

export interface TourPackage {
  id: number | string
  documentId?: string
  title: string
  slug: string
  summary: string
  description: string
  destination: string
  region: string
  durationDays: number
  priceFrom: number
  currency: string
  featured: boolean
  difficulty: PackageDifficulty
  highlights: string[]
  heroImageUrl?: string | null
  bookingUnlimited: boolean
  slotsTotal: number | null
  slotsSold: number
  available: number | null
  soldOut: boolean
  usesSessions?: boolean
  nextSessionAt?: string | null
}

export interface StrapiMedia {
  url?: string
  formats?: Record<string, { url?: string }>
}

export interface StrapiTourPackage {
  id: number
  documentId: string
  title: string
  slug: string
  summary?: string
  description?: string
  destination: string
  region?: string
  durationDays: number
  priceFrom: number
  currency?: string
  featured?: boolean
  difficulty?: PackageDifficulty
  highlights?: string[] | null
  heroImage?: StrapiMedia | null
  bookingUnlimited?: boolean | null
  slotsTotal?: number | null
  slotsSold?: number | null
}

export function computeAvailability(input: {
  bookingUnlimited?: boolean | null
  slotsTotal?: number | null
  slotsSold?: number | null
  pending?: number
}): AvailabilityInfo {
  const bookingUnlimited = Boolean(input.bookingUnlimited)
  const slotsSold = Number(input.slotsSold ?? 0)
  const pending = Number(input.pending ?? 0)

  if (bookingUnlimited || input.slotsTotal == null) {
    return {
      bookingUnlimited: bookingUnlimited || input.slotsTotal == null,
      slotsTotal: bookingUnlimited ? null : Number(input.slotsTotal ?? 0),
      slotsSold,
      pending,
      available: null,
      soldOut: false,
    }
  }

  const slotsTotal = Number(input.slotsTotal)
  const available = Math.max(0, slotsTotal - slotsSold - pending)
  return {
    bookingUnlimited: false,
    slotsTotal,
    slotsSold,
    pending,
    available,
    soldOut: available <= 0,
  }
}
