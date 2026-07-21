<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { fetchEvents } = useMainEvents()
const { data: events } = await useLocaleAsyncData('main-events-home', (code) => fetchEvents(code))

const featured = computed(() =>
  (events.value || []).filter((e) => e.featured).slice(0, 2),
)

const hasEvents = computed(() => (events.value || []).length > 0)
</script>

<template>
  <section
    v-if="hasEvents"
    id="events"
    class="pattern-seigaiha relative overflow-hidden py-14 sm:py-20"
  >
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--event-gold)]/40" />
    <div class="container-wide">
      <div class="reveal flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="section-label !text-[var(--event-maroon)]">{{ t('events.eyebrow') }}</p>
          <h2 class="font-display mt-3 text-3xl text-[var(--event-navy)] sm:text-5xl">
            {{ t('events.title') }}
          </h2>
          <p class="mt-3 max-w-xl text-[var(--muted-fg)]">
            {{ t('events.intro') }}
          </p>
        </div>
        <NuxtLink :to="localePath('/events')" class="btn-ghost-dark !py-3">
          {{ t('events.all') }}
        </NuxtLink>
      </div>

      <div class="mt-10 space-y-10">
        <EventFeatureCard
          v-for="event in featured.length ? featured : (events || []).slice(0, 2)"
          :key="event.slug"
          :event="event"
        />
      </div>
    </div>
  </section>
</template>
