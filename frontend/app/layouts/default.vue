<script setup lang="ts">
const { cms, sync } = useCmsBundle()
const route = useRoute()

await sync()
provide('cms', cms)

const isHome = computed(() => route.path === '/' || route.path === '')
</script>

<template>
  <div class="flex min-h-screen flex-col bg-[var(--paper)]">
    <div class="fixed inset-x-0 top-0 z-50 flex flex-col">
      <EventRaceBanner v-if="isHome" />
      <SiteHeader embedded />
    </div>
    <main class="flex-1" :class="isHome ? 'pt-[calc(74px+2.75rem)]' : 'pt-[74px]'">
      <slot />
    </main>
    <SiteFooter />
    <CookieConsentBanner />
  </div>
</template>
