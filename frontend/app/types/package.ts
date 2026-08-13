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
