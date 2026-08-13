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

export interface CmsAboutProfile {
  id: string | number
  label: string
  value: string
  isEmail: boolean
  sortOrder: number
}

export interface CmsDestination {
  id: string | number
  name: string
  nameEn: string
  description: string
  imageUrl: string
  href: string
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
  heroLatin: string
  heroCtaPrimary: string
  heroCtaSecondary: string
  greetVertical: string
  greetEyebrow: string
  greetTitle: string
  greetLead: string
  destinationsEyebrow: string
  destinationsTitle: string
  destinationsLatin: string
  servicesEyebrow: string
  servicesTitle: string
  servicesLatin: string
  whyEyebrow: string
  whyItalic: string
  whyTitle: string
  whyLatin: string
  feesEyebrow: string
  feesTitle: string
  packagesEyebrow: string
  packagesTitle: string
  packagesIntro: string
  newsEyebrow: string
  newsTitle: string
  newsLatin: string
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
  aboutEyebrow: string
  aboutTitle: string
  aboutLatin: string
  aboutHeroImageUrl: string
  aboutPhiloBefore: string
  aboutPhiloAccent: string
  aboutPhiloAfter: string
  aboutPhiloLine2: string
  aboutSectionEyebrow: string
  aboutSectionTitle: string
  aboutP1: string
  aboutP2: string
  aboutP3: string
  aboutProfileEyebrow: string
  aboutProfileTitle: string
  aboutCtaTitle: string
  aboutCtaSubtitle: string
  aboutCtaButton: string
  navHome: string
  navEvent: string
  navServices: string
  navAbout: string
  navContact: string
  navMenu: string
  footerServicesTitle: string
  footerCompanyTitle: string
  footerAbout: string
  footerContact: string
  footerCopy: string
  footerPhotoCredit: string
  metaTitle: string
  metaDescription: string
  raceBannerTag: string
  raceBannerText: string
  raceBannerCta: string
}

export interface CmsBundle {
  settings: CmsSiteSettings
  services: CmsService[]
  reasons: CmsWhyReason[]
  fees: CmsFeeTier[]
  news: CmsNewsItem[]
  tourDetails: CmsTourDetail[]
  aboutProfiles: CmsAboutProfile[]
  destinations: CmsDestination[]
  cancellation: CmsCancellationRule[]
  feeNotes: string[]
  importantNotes: string[]
  cancellationNotes: string[]
}
