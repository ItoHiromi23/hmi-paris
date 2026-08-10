/**
 * Async data for Strapi collections.
 * Content is always fetched in Japanese (`ja`), regardless of UI locale.
 */
export async function useLocaleAsyncData<T>(
  key: string | (() => string),
  handler: (locale: string) => Promise<T>,
  _options: { watch?: Array<Ref | ComputedRef | (() => unknown)> } = {},
) {
  const resolveKey = () => (typeof key === 'function' ? key() : key)
  const held = shallowRef<T | null>(null)

  const { data, pending, refresh } = await useAsyncData(
    () => `${resolveKey()}:ja`,
    () => handler('ja'),
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
