export type StrapiMedia = {
  url?: string | null
  alternativeText?: string | null
}

export type TourPackage = {
  id: string | number
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
  difficulty: string
  highlights: string[]
  heroImageUrl: string | null
}

export type StrapiTourPackage = {
  id: string | number
  documentId?: string
  title: string
  slug: string
  summary?: string | null
  description?: string | null
  destination: string
  region?: string | null
  durationDays: number
  priceFrom: number | string
  currency?: string | null
  featured?: boolean | null
  difficulty?: string | null
  highlights?: string[] | null
  heroImage?: StrapiMedia | null
}
