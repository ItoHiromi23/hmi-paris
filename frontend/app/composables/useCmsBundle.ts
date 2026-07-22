import type { CmsBundle } from '~/types/cms'

/**
 * Shared CMS bundle for the active UI locale.
 * Language toggles call `load(code)` so hero copy swaps with the locale.
 */
export function useCmsBundle() {
  const { locale } = useI18n()
  const { fetchCms } = useCmsContent()

  const cms = useState<CmsBundle | null>('cms-active', () => null)
  const cmsLocale = useState<string | null>('cms-loaded-locale', () => null)
  const pending = useState('cms-pending', () => false)
  /** heroImageUrl is non-localized in Strapi — keep last good URL across EN↔JA toggles. */
  const heroImageUrl = useState('cms-hero-image-url', () => '')

  async function load(code: string) {
    const target = code === 'ja' ? 'ja' : 'en'
    pending.value = true
    try {
      const bundle = await fetchCms(target)
      const nextHero = bundle.settings?.heroImageUrl?.trim() || ''
      if (nextHero) {
        heroImageUrl.value = nextHero
      } else if (heroImageUrl.value) {
        // Secondary locale payloads sometimes omit shared fields — keep prior hero
        bundle.settings.heroImageUrl = heroImageUrl.value
      } else if (target !== 'en') {
        // Cold load of JA with empty shared field: pull from EN once
        const en = await fetchCms('en')
        const enHero = en.settings?.heroImageUrl?.trim() || ''
        if (enHero) {
          heroImageUrl.value = enHero
          bundle.settings.heroImageUrl = enHero
        }
      }
      cms.value = bundle
      cmsLocale.value = target
      return bundle
    } finally {
      pending.value = false
    }
  }

  async function sync() {
    if (cms.value && cmsLocale.value === locale.value) {
      const existing = cms.value.settings?.heroImageUrl?.trim()
      if (existing) heroImageUrl.value = existing
      return cms.value
    }
    return load(locale.value)
  }

  return { cms, cmsLocale, pending, heroImageUrl, load, sync }
}
