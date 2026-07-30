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
  groupSize: string
  durationLabel: string
  departureTime: string
  meetingPlace: string
  feeNote: string
  included: string[]
  notIncluded: string[]
  paymentDeadline: string
  paymentMethods: string
  reservationConfirmation: string
  cancellationConditions: string
  enquiryEmail: string
  heroImageUrl: string | null
  gallery: Array<{ url: string; alt: string }>
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
  groupSize?: string | null
  durationLabel?: string | null
  departureTime?: string | null
  meetingPlace?: string | null
  feeNote?: string | null
  included?: string[] | null
  notIncluded?: string[] | null
  paymentDeadline?: string | null
  paymentMethods?: string | null
  reservationConfirmation?: string | null
  cancellationConditions?: string | null
  enquiryEmail?: string | null
  heroImage?: StrapiMedia | null
  gallery?: StrapiMedia[] | { data?: StrapiMedia[] | null } | null
}
