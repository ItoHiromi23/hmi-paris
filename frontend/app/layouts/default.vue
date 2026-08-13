<script setup lang="ts">
const { cms } = useCmsBundle()
const route = useRoute()

provide('cms', cms)

const isHome = computed(() => route.path === '/' || route.path === '')
const isDestinationPage = computed(() => route.path.startsWith('/destinations/'))
const isIvoryDestinationPage = computed(
  () =>
    route.path.startsWith('/destinations/champagne') ||
    route.path.startsWith('/destinations/versailles') ||
    route.path.startsWith('/destinations/auvers-sur-oise') ||
    route.path.startsWith('/destinations/giverny'),
)
</script>

<template>
  <div
    class="flex min-h-screen flex-col"
    :class="isDestinationPage && !isIvoryDestinationPage ? 'bg-[#0b1220]' : 'bg-[var(--paper)]'"
  >
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
