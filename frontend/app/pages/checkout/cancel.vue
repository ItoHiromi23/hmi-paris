<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.query.slug || ''))
const isEvent = computed(() => String(route.query.type || '') === 'event')

const backLink = computed(() => {
  if (!slug.value) return '/packages'
  return isEvent.value ? `/events/${slug.value}` : `/packages/${slug.value}`
})

useSeoMeta({
  title: 'Payment cancelled — HMI Paris',
})
</script>

<template>
  <div class="container-site py-28 sm:py-36">
    <div class="mx-auto max-w-xl text-center">
      <p class="section-label">Payment cancelled</p>
      <h1 class="font-display mt-3 text-4xl text-[var(--heading)] sm:text-5xl">
        Payment was not completed
      </h1>
      <p class="mt-4 text-[var(--muted-fg)]">
        Checkout was cancelled. You can try again anytime from the product page.
      </p>
      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <NuxtLink v-if="slug" :to="backLink" class="btn-primary">
          Back to product
        </NuxtLink>
        <NuxtLink to="/packages" class="btn-ghost-dark">All tours</NuxtLink>
        <NuxtLink to="/contact" class="btn-ghost-dark">Contact</NuxtLink>
      </div>
    </div>
  </div>
</template>
