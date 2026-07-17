/**
 * useAsyncData option: keep SSR payload on first hydration (no flash),
 * but refetch whenever the user navigates back to this page on the client.
 * Fixes stale slot counts on home/package/event cards.
 */
export function freshOnNavigate() {
  const nuxtApp = useNuxtApp()
  return {
    getCachedData(key: string) {
      if (nuxtApp.isHydrating) {
        return nuxtApp.payload.data[key]
      }
      return undefined
    },
  }
}
