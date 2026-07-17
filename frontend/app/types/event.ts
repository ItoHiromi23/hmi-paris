import type { StrapiMedia } from '~/types/package'

export interface MainEvent {
  id: string | number
  documentId?: string
  title: string
  slug: string
  label: string
  badgeText: string
  category: string
  summary: string
  description: string
  inclusions: string[]
  heroImageUrl: string | null
  eventDate: string | null
  venue: string
  priceFrom: number | null
  currency: string
  ctaLabel: string
  featured: boolean
  sortOrder: number
  notes: string
  bookingUnlimited: boolean
  slotsTotal: number | null
  slotsSold: number
  available: number | null
  soldOut: boolean
}

export interface StrapiMainEvent {
  id: number
  documentId: string
  title: string
  slug: string
  label?: string | null
  badgeText?: string | null
  category?: string | null
  summary?: string | null
  description?: string | null
  inclusions?: string[] | null
  heroImageUrl?: string | null
  heroImage?: StrapiMedia | null
  eventDate?: string | null
  venue?: string | null
  priceFrom?: number | string | null
  currency?: string | null
  ctaLabel?: string | null
  featured?: boolean | null
  sortOrder?: number | null
  notes?: string | null
  bookingUnlimited?: boolean | null
  slotsTotal?: number | null
  slotsSold?: number | null
}
