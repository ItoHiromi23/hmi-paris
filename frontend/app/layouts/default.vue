<script setup lang="ts">
const { fetchCms } = useCmsContent()
const { locale } = useI18n()
const { data: cms } = await useAsyncData(
  () => `cms-bundle-${locale.value}`,
  () => fetchCms(),
  { watch: [locale] },
)
provide('cms', cms)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <CookieConsentBanner />
  </div>
</template>
