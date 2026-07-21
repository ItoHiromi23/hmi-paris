export function useReveal() {
  let observer: IntersectionObserver | null = null

  const observe = () => {
    observer?.disconnect()
    const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
    if (!elements.length) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -8px 0px' },
    )

    elements.forEach((el) => observer?.observe(el))
  }

  const { locale } = useI18n()

  onMounted(() => {
    nextTick(observe)
  })

  onUpdated(() => {
    nextTick(observe)
  })

  // Locale toggles swap CMS copy without always remounting — re-bind reveals
  watch(locale, () => {
    nextTick(observe)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
