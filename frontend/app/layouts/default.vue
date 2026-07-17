<script setup lang="ts">
const { fetchCms } = useCmsContent()
const { data: cms } = await useAsyncData('cms-bundle-ja', () => fetchCms())
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
