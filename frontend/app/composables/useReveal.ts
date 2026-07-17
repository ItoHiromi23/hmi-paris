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
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
    )

    elements.forEach((el) => observer?.observe(el))
  }

  onMounted(() => {
    nextTick(observe)
  })

  onUpdated(() => {
    nextTick(observe)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
