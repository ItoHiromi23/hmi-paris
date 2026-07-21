/**
 * Locale-aware async data for EN↔JA toggles.
 * Caches each locale separately and always switches `data` to the active locale
 * (fixes Site Setting / single-type copy sticking on EN while the layout stays mounted).
 */
export async function useLocaleAsyncData<T>(
  key: string | (() => string),
  handler: (locale: string) => Promise<T>,
  options: { watch?: Array<Ref | ComputedRef | (() => unknown)> } = {},
) {
  const { locale } = useI18n()
  const resolveKey = () => (typeof key === 'function' ? key() : key)

  const cache = ref<Record<string, T>>({})
  const data = shallowRef<T | null>(null)
  const pending = ref(false)

  async function load(code: string) {
    pending.value = true
    try {
      const result = await handler(code)
      cache.value = { ...cache.value, [code]: result }
      if (code === locale.value) {
        data.value = result
      }
      return result
    } finally {
      pending.value = false
    }
  }

  // SSR + first client paint (keyed per locale for payload hydration)
  const { data: initial } = await useAsyncData(
    () => `${resolveKey()}:${locale.value}`,
    () => load(locale.value),
    {
      watch: [resolveKey, ...(options.watch || [])],
      ...freshOnNavigate(),
    },
  )

  if (initial.value != null && data.value == null) {
    data.value = initial.value as T
    cache.value[locale.value] = initial.value as T
  }

  watch(locale, async (code, prev) => {
    if (code === prev) return
    // Instant swap when this locale was loaded before
    if (cache.value[code] != null) {
      data.value = cache.value[code]
    }
    await load(code)
  })

  watch(resolveKey, async () => {
    await load(locale.value)
  })

  return {
    data,
    pending,
    refresh: () => load(locale.value),
  }
}
