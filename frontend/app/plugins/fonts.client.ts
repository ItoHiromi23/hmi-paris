export default defineNuxtPlugin(() => {
  const el = document.querySelector('link[data-hmi-fonts]') as HTMLLinkElement | null
  if (!el || el.media === 'all') return
  const apply = () => {
    el.media = 'all'
  }
  if (el.sheet) apply()
  else el.addEventListener('load', apply, { once: true })
})
