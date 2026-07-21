<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { fetchCms } = useCmsContent()
const { locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const { data: cms } = await useLocaleAsyncData('cms-bundle', (code) => fetchCms(code))

// Always provide a ref the page can mutate-watch; single-type fields live here
const cmsRef = shallowRef<CmsBundle | null>(cms.value)
watch(
  cms,
  (value) => {
    cmsRef.value = value
  },
  { immediate: true },
)
provide('cms', cmsRef)

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
