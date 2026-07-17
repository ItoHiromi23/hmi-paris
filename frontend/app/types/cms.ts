export type ServiceIconName = 'star' | 'car' | 'plane' | 'chat' | 'plus'

export interface CmsService {
  id: string | number
  title: string
  category: string
  description: string
  icon: ServiceIconName
  sortOrder: number
}

export interface CmsWhyReason {
  id: string | number
  number: string
  title: string
  description: string
  sortOrder: number
}

export interface CmsFeeTier {
  id: string | number
  label: string
  price: string
  sortOrder: number
}

export interface CmsNewsItem {
  id: string | number
  dateLabel: string
  title: string
  sortOrder: number
}

export interface CmsTourDetail {
  id: string | number
  label: string
  value: string
  sortOrder: number
}

export interface CmsCancellationRule {
  id: string | number
  label: string
  fee: string
  alert: boolean
  sortOrder: number
}

export interface CmsSiteNote {
  id: string | number
  text: string
  kind: 'fee' | 'important' | 'cancellation'
  sortOrder: number
}

export interface CmsSiteSettings {
  brandName: string
  brandTagline: string
  contactEmail: string
  contactPhone: string
  studioLocation: string
  footerBlurb: string
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroImageUrl: string
  servicesEyebrow: string
  servicesTitle: string
  whyEyebrow: string
  whyItalic: string
  whyTitle: string
  feesEyebrow: string
  feesTitle: string
  packagesEyebrow: string
  packagesTitle: string
  packagesIntro: string
  newsEyebrow: string
  newsTitle: string
  contactCtaTitle: string
  contactCtaSubtitle: string
  contactCtaButton: string
  reservationEyebrow: string
  reservationTitle: string
  reservationSubtitle: string
  reservationButton: string
  tourDetailsEyebrow: string
  tourDetailsTitle: string
  cancellationEyebrow: string
  cancellationTitle: string
  notesEyebrow: string
  notesTitle: string
}

export interface CmsBundle {
  settings: CmsSiteSettings
  services: CmsService[]
  reasons: CmsWhyReason[]
  fees: CmsFeeTier[]
  news: CmsNewsItem[]
  tourDetails: CmsTourDetail[]
  cancellation: CmsCancellationRule[]
  feeNotes: string[]
  importantNotes: string[]
  cancellationNotes: string[]
}
