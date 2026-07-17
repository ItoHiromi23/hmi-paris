/**
 * Strapi currently stores Japanese content. Until Strapi i18n is enabled,
 * English UI uses message-file overlays for CMS fields; Japanese uses Strapi.
 */
export function useCmsLocale() {
  const { locale, t, te } = useI18n()

  function field(path: string, strapiValue?: string | null) {
    if (locale.value === 'ja') {
      return strapiValue || (te(path) ? String(t(path)) : '')
    }
    if (te(path)) return String(t(path))
    return strapiValue || ''
  }

  function listItem<T extends Record<string, unknown>>(
    basePath: string,
    index: number,
    item: T,
    keys: Array<keyof T & string>,
  ): T {
    if (locale.value === 'ja') return item
    const out = { ...item }
    for (const key of keys) {
      const path = `${basePath}.${index}.${key}`
      if (te(path)) {
        ;(out as Record<string, unknown>)[key] = t(path)
      }
    }
    return out
  }

  function bySlug<T extends { slug: string }>(
    basePath: string,
    item: T,
    keys: string[],
  ): T {
    if (locale.value === 'ja') return item
    const out = { ...item } as Record<string, unknown>
    for (const key of keys) {
      const path = `${basePath}.${item.slug}.${key}`
      if (te(path)) out[key] = t(path)
      if (key === 'highlights' || key === 'inclusions') {
        const arr: string[] = []
        for (let i = 0; i < 12; i++) {
          const p = `${basePath}.${item.slug}.${key}.${i}`
          if (!te(p)) break
          arr.push(String(t(p)))
        }
        if (arr.length) out[key] = arr
      }
    }
    return out as T
  }

  return { field, listItem, bySlug, locale }
}
