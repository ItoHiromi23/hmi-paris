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

  async function load(code: string) {
    const target = code === 'ja' ? 'ja' : 'en'
    pending.value = true
    try {
      const bundle = await fetchCms(target)
      cms.value = bundle
      cmsLocale.value = target
      return bundle
    } finally {
      pending.value = false
    }
  }

  async function sync() {
    if (cms.value && cmsLocale.value === locale.value) {
      return cms.value
    }
    return load(locale.value)
  }

  return { cms, cmsLocale, pending, load, sync }
}
