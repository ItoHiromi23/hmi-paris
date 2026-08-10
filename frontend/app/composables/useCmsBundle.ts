import type { CmsBundle } from '~/types/cms'

/** Strapi content is authored in Japanese — always load `ja`. */
const CMS_LOCALE = 'ja' as const

/**
 * Shared CMS bundle (Japanese Strapi content).
 * UI locale toggle only affects i18n chrome, not CMS copy.
 */
export function useCmsBundle() {
  const { fetchCms } = useCmsContent()

  const cms = useState<CmsBundle | null>('cms-active', () => null)
  const cmsLocale = useState<string | null>('cms-loaded-locale', () => null)
  const pending = useState('cms-pending', () => false)
  const heroImageUrl = useState('cms-hero-image-url', () => '')

  async function load(_code?: string) {
    pending.value = true
    try {
      const bundle = await fetchCms(CMS_LOCALE)
      const nextHero = bundle.settings?.heroImageUrl?.trim() || ''
      if (nextHero) {
        heroImageUrl.value = nextHero
      } else if (heroImageUrl.value) {
        bundle.settings.heroImageUrl = heroImageUrl.value
      }
      cms.value = bundle
      cmsLocale.value = CMS_LOCALE
      return bundle
    } finally {
      pending.value = false
    }
  }

  async function sync() {
    if (cms.value && cmsLocale.value === CMS_LOCALE) {
      const existing = cms.value.settings?.heroImageUrl?.trim()
      if (existing) heroImageUrl.value = existing
      return cms.value
    }
    return load(CMS_LOCALE)
  }

  return { cms, cmsLocale, pending, heroImageUrl, load, sync }
}
