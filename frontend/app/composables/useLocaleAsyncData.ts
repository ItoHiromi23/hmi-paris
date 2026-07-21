/**
 * Locale-aware async data for EN↔JA toggles.
 * Keeps the last successful payload visible while the next locale loads
 * (prevents blank titles/sections during the switch).
 */
export async function useLocaleAsyncData<T>(
  key: string | (() => string),
  handler: (locale: string) => Promise<T>,
  options: { watch?: Array<Ref | ComputedRef | (() => unknown)> } = {},
) {
  const { locale } = useI18n()
  const resolveKey = () => (typeof key === 'function' ? key() : key)
  const held = shallowRef<T | null>(null)

  const { data, pending, refresh } = await useAsyncData(
    () => `${resolveKey()}:${locale.value}`,
    () => handler(locale.value),
    {
      watch: [locale, ...(options.watch || [])],
    },
  )

  if (data.value != null) {
    held.value = data.value as T
  }

  watch(data, (value) => {
    if (value != null) {
      held.value = value as T
    }
  })

  return {
    data: held,
    pending,
    refresh,
  }
}
