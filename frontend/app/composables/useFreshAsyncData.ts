/**
 * useAsyncData option: keep SSR payload on first hydration (no flash),
 * but refetch whenever the user navigates back to this page on the client.
 * Fixes stale slot counts on home/package/event cards.
 */
export function freshOnNavigate() {
  const nuxtApp = useNuxtApp()
  // Always refetch in dev so Strapi edits show up immediately
  if (import.meta.dev) {
    return {
      getCachedData: () => undefined,
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
