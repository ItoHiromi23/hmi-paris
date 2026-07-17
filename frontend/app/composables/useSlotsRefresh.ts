const SLOTS_DIRTY_KEY = 'hmi-slots-dirty'

const LIST_DATA_KEYS = [
  'home-packages-ja',
  'all-packages',
  'main-events',
  'events-index',
] as const

/** Mark inventory as changed (after checkout start / payment). */
export function markSlotsDirty() {
  if (!import.meta.client) return
  try {
    sessionStorage.setItem(SLOTS_DIRTY_KEY, '1')
  } catch {
    /* ignore */
  }
  // Drop cached card lists so home / packages refetch on next visit
  clearNuxtData([...LIST_DATA_KEYS])
}

/**
 * Refresh package/event detail only when returning from Stripe checkout,
 * not on every new-tab page load (SSR already fetches live slots).
 */
export function refreshSlotsIfDirty(refresh: () => Promise<unknown>) {
  if (!import.meta.client) return
  try {
    if (sessionStorage.getItem(SLOTS_DIRTY_KEY) !== '1') return
    sessionStorage.removeItem(SLOTS_DIRTY_KEY)
  } catch {
    return
  }
  void refresh()
}
