<script setup lang="ts">
const { cms, cmsLocale, sync, load } = useCmsBundle()
const { locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

await sync()

watch(
  () => locale.value,
  async (code, prev) => {
    if (code === prev) return
    if (cmsLocale.value !== code) {
      await load(code)
    }
  },
)

provide('cms', cms)

const isHome = computed(() => {
  const home = localePath('/')
  return route.path === home || route.path === `${home}/`
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="fixed inset-x-0 top-0 z-50 flex flex-col">
      <EventRaceBanner v-if="isHome" />
      <SiteHeader embedded />
    </div>
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <CookieConsentBanner />
  </div>
</template>
