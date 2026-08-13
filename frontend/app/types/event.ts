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
  homeEyebrow?: string
  homeTitle?: string
  homeSummary?: string
  homeInclusions?: string[]
}
