/**
 * useAsyncData option: keep SSR payload on first hydration (no flash),
 * but refetch whenever the user navigates back to this page on the client.
 * Fixes stale slot counts on home/package/event cards.
 *
 * Important: do not force-clear cache on every read in a way that drops the
 * previous locale while the next one loads — keep a stable useAsyncData key
 * and `watch: [locale]` so UI stays populated during EN↔JA toggles.
 */
export function freshOnNavigate() {
  const nuxtApp = useNuxtApp()
  if (import.meta.dev) {
    // Dev: skip long-lived cache after hydration so Strapi edits show up,
    // but still use the SSR payload for the first paint.
    return {
      getCachedData(key: string) {
        if (nuxtApp.isHydrating) {
          return nuxtApp.payload.data[key]
        }
        return undefined
      },
    }
  }
  return {
    getCachedData(key: string) {
      if (nuxtApp.isHydrating) {
        return nuxtApp.payload.data[key]
      }
      return undefined
    },
  }
}
