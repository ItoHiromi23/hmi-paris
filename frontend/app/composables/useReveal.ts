export function useReveal() {
  let observer: IntersectionObserver | null = null

  const revealInView = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    return rect.top < vh * 0.92 && rect.bottom > 0
  }

  const observe = () => {
    observer?.disconnect()
    const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
    if (!elements.length) return

    // Immediately show anything already on screen (locale toggles often remount in-view nodes)
    elements.forEach((el) => {
      if (revealInView(el)) {
        el.classList.add('is-visible')
      }
    })

    const pending = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
    if (!pending.length) return

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

    pending.forEach((el) => observer?.observe(el))
  }

  const { locale } = useI18n()

  onMounted(() => {
    nextTick(observe)
  })

  onUpdated(() => {
    nextTick(observe)
  })

  watch(locale, () => {
    nextTick(() => {
      // Fresh DOM nodes after CMS/i18n swap — reveal anything in view right away
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        if (revealInView(el)) el.classList.add('is-visible')
      })
      observe()
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
