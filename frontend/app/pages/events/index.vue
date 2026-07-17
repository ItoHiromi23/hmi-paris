<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { fetchEvents, formatJaDate } = useMainEvents()
const { data: events } = await useAsyncData(
  () => `events-index-${locale.value}`,
  () => fetchEvents(),
  { ...freshOnNavigate(), watch: [locale] },
)

useReveal()

useSeoMeta({
  title: () => `${t('nav.events')} — HMI Paris`,
  description: () => t('events.intro'),
})
</script>

<template>
  <div>
    <PageHero
      :title="t('nav.events')"
      :eyebrow="t('events.eyebrow')"
      image="/images/paris-placeholder.svg"
    >
      <p class="text-lg text-white/95">
        {{ t('events.intro') }}
      </p>
      <template #actions>
        <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ t('nav.contact') }}</NuxtLink>
        <NuxtLink :to="localePath('/packages')" class="btn-ghost">{{ t('packages.allTours') }}</NuxtLink>
      </template>
    </PageHero>

    <OmotenashiStrip />

    <section class="pattern-seigaiha py-14 sm:py-20">
      <div class="container-wide space-y-12">
        <template v-if="events?.length">
          <EventFeatureCard
            v-for="event in events"
            :key="event.slug"
            :event="event"
          />
        </template>
        <div v-else class="glass-panel p-10 text-center">
          <p class="font-display text-2xl text-[var(--heading)]">{{ t('events.empty') }}</p>
          <p class="mt-2 text-xs text-[var(--muted-fg)]">
            ({{ formatJaDate(new Date().toISOString().slice(0, 10)) }})
          </p>
        </div>
      </div>
    </section>

    <ContactBanner />
  </div>
</template>
