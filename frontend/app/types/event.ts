import type { StrapiMedia } from '~/types/package'

export type EventNavLink = { href: string; label: string }
export type EventHighlight = { num: string; title: string; body: string; caveat?: string }
export type EventScheduleItem = { time: string; what: string }
export type EventDetailRow = { label: string; value: string }
export type EventCancellationRow = { when: string; fee: string }

export type MainEvent = {
  id: string | number
  documentId?: string
  title: string
  slug: string
  label: string
  badgeText: string
  category: string
  summary: string
  description: string
  subLatin: string
  edition: string
  guideLabel: string
  navLinks: EventNavLink[]
  aboutKicker: string
  aboutTitle: string
  aboutLead: string
  aboutBody: string
  aboutImageUrl: string | null
  aboutImageCaption: string
  highlightsKicker: string
  highlightsTitle: string
  highlights: EventHighlight[]
  highlightsImageUrl: string | null
  highlightsImageCaption: string
  tourKicker: string
  tourTitle: string
  inclusions: string[]
  exclusions: string[]
  exclusionsTitle: string
  tourNote: string
  flowKicker: string
  flowTitle: string
  schedule: EventScheduleItem[]
  meetingTitle: string
  meetingBody: string
  meetingCaveat: string
  meetingImageUrl: string | null
  meetingImageCaption: string
  flowNote: string
  detailsKicker: string
  detailsTitle: string
  detailRows: EventDetailRow[]
  cancellationTitle: string
  cancellationHeaderWhen: string
  cancellationHeaderFee: string
  cancellationRows: EventCancellationRow[]
  detailsNote: string
  bookingKicker: string
  bookingTitle: string
  bookingSteps: EventScheduleItem[]
  notesKicker: string
  notesTitle: string
  notesList: string[]
  ctaKicker: string
  ctaTitle: string
  ctaButton: string
  ctaScarce: string
  heroImageUrl: string | null
  eventDate: string | null
  venue: string
  priceFrom: number | null
  currency: string
  ctaLabel: string
  featured: boolean
  sortOrder: number
  notes: string
}

export type StrapiMainEvent = {
  id: string | number
  documentId?: string
  title: string
  slug: string
  label?: string | null
  badgeText?: string | null
  category?: string | null
  summary?: string | null
  description?: string | null
  subLatin?: string | null
  edition?: string | null
  guideLabel?: string | null
  navLinks?: EventNavLink[] | null
  aboutKicker?: string | null
  aboutTitle?: string | null
  aboutLead?: string | null
  aboutBody?: string | null
  aboutImageCaption?: string | null
  aboutImageUrl?: string | null
  aboutImage?: StrapiMedia | null
  highlightsKicker?: string | null
  highlightsTitle?: string | null
  highlights?: EventHighlight[] | null
  highlightsImageCaption?: string | null
  highlightsImageUrl?: string | null
  highlightsImage?: StrapiMedia | null
  tourKicker?: string | null
  tourTitle?: string | null
  inclusions?: string[] | null
  exclusions?: string[] | null
  exclusionsTitle?: string | null
  tourNote?: string | null
  flowKicker?: string | null
  flowTitle?: string | null
  schedule?: EventScheduleItem[] | null
  meetingTitle?: string | null
  meetingBody?: string | null
  meetingCaveat?: string | null
  meetingImageCaption?: string | null
  meetingImageUrl?: string | null
  meetingImage?: StrapiMedia | null
  flowNote?: string | null
  detailsKicker?: string | null
  detailsTitle?: string | null
  detailRows?: EventDetailRow[] | null
  cancellationTitle?: string | null
  cancellationHeaderWhen?: string | null
  cancellationHeaderFee?: string | null
  cancellationRows?: EventCancellationRow[] | null
  detailsNote?: string | null
  bookingKicker?: string | null
  bookingTitle?: string | null
  bookingSteps?: EventScheduleItem[] | null
  notesKicker?: string | null
  notesTitle?: string | null
  notesList?: string[] | null
  ctaKicker?: string | null
  ctaTitle?: string | null
  ctaButton?: string | null
  ctaScarce?: string | null
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
}
