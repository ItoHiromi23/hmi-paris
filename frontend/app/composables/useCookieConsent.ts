export type CookieConsentChoice = 'accepted' | 'refused'

const STORAGE_KEY = 'hmi_cookie_consent_v1'

export function useCookieConsent() {
  const choice = useState<CookieConsentChoice | null>('cookie-consent', () => null)
  const ready = useState('cookie-consent-ready', () => false)

  function load() {
    if (!import.meta.client) return
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'accepted' || saved === 'refused') {
        choice.value = saved
      }
    } catch {
      /* private mode */
    }
    ready.value = true
  }

  function save(value: CookieConsentChoice) {
    choice.value = value
    if (!import.meta.client) return
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
  }

  function acceptAll() {
    save('accepted')
  }

  function refuseAll() {
    save('refused')
  }

  function openSettings() {
    choice.value = null
    if (import.meta.client) {
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
    }
  }

  const showBanner = computed(() => ready.value && choice.value === null)
  const analyticsAllowed = computed(() => choice.value === 'accepted')

  return {
    choice,
    ready,
    showBanner,
    analyticsAllowed,
    load,
    acceptAll,
    refuseAll,
    openSettings,
  }
}
