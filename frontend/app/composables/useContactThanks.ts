export function useContactThanks() {
  const thanksShown = useState('contact-thanks-shown', () => false)

  function showThanks() {
    thanksShown.value = true
    if (import.meta.client) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }

  return { thanksShown, showThanks }
}
