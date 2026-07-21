<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { fetchEventBySlug, formatJaDate, formatPrice } = useMainEvents()
const { data: event } = await useLocaleAsyncData(
  () => `event-${slug.value}`,
  () => fetchEventBySlug(slug.value),
  { watch: [slug] },
)

if (!event.value) {
  throw createError({ statusCode: 404, statusMessage: t('events.empty') })
}

useReveal()

useSeoMeta({
  title: `${event.value.title} — HMI Paris`,
  description: event.value.summary,
})
</script>

<template>
  <div v-if="event">
    <PageHero
      :title="event.title"
      :eyebrow="event.category || t('nav.events')"
      :image="event.heroImageUrl || '/images/paris-placeholder.svg'"
    >
      <p class="text-lg text-white/95">{{ event.summary }}</p>
      <template #actions>
        <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ t('nav.contact') }}</NuxtLink>
        <NuxtLink :to="localePath('/events')" class="btn-ghost">{{ t('events.all') }}</NuxtLink>
      </template>
    </PageHero>

    <OmotenashiStrip />

    <section class="pattern-asanoha py-16 sm:py-24">
      <div class="container-site grid gap-14 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">
        <div class="reveal">
          <p
            v-if="event.label"
            class="inline-block bg-[#e8dfd0] px-3 py-1 text-xs text-[var(--event-navy)]"
          >
            {{ event.label }}
          </p>
          <SectionHeading
            class="mt-4"
            :eyebrow="t('events.detailEyebrow')"
            :title="event.title"
          />
          <p v-if="event.eventDate" class="mt-4 text-sm text-[var(--muted-fg)]">
            {{ t('events.date') }}: {{ formatJaDate(event.eventDate) }}
            <span v-if="event.venue"> · {{ t('events.venue') }}: {{ event.venue }}</span>
          </p>
          <p class="mt-6 whitespace-pre-line text-base leading-relaxed text-[var(--muted-fg)]">
            {{ event.description }}
          </p>

          <h3 class="font-display mt-12 text-2xl text-[var(--event-navy)]">
            {{ t('events.inclusions') }}
          </h3>
          <ul v-if="event.inclusions.length" class="mt-6 space-y-4">
            <li
              v-for="item in event.inclusions"
              :key="item"
              class="flex items-start gap-3 border-b border-[var(--line)] pb-4 text-[var(--heading)]"
            >
              <span class="mt-2 h-px w-4 shrink-0 bg-[var(--event-gold)]" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <p
            v-if="event.notes"
            class="mt-10 rounded-lg border border-[var(--event-gold)]/30 bg-[var(--event-cream)] p-5 text-sm leading-relaxed text-[var(--body)]"
          >
            <span class="font-semibold text-[var(--event-navy)]">{{ t('events.notes') }}</span>
            {{ event.notes }}
          </p>
        </div>

        <aside
          class="reveal glass-panel h-fit border-[var(--event-gold)]/20 p-8 sm:p-10"
        >
          <p class="section-label !text-[var(--event-maroon)]">{{ t('events.refPrice') }}</p>
          <p
            v-if="event.priceFrom != null"
            class="font-display mt-2 text-5xl text-[var(--event-navy)]"
          >
            {{ formatPrice(event.priceFrom, event.currency) }}
          </p>
          <p v-else class="mt-2 text-[var(--muted-fg)]">{{ t('events.askContact') }}</p>
          <dl class="mt-10 space-y-5 text-sm text-[var(--heading)]">
            <div
              v-if="event.eventDate"
              class="flex justify-between border-t border-[var(--line)] pt-4"
            >
              <dt class="text-[var(--muted-fg)]">{{ t('events.date') }}</dt>
              <dd>{{ formatJaDate(event.eventDate) }}</dd>
            </div>
            <div
              v-if="event.venue"
              class="flex justify-between border-t border-[var(--line)] pt-4"
            >
              <dt class="text-[var(--muted-fg)]">{{ t('events.venue') }}</dt>
              <dd class="text-right">{{ event.venue }}</dd>
            </div>
            <div
              v-if="event.label"
              class="flex justify-between border-t border-[var(--line)] pt-4"
            >
              <dt class="text-[var(--muted-fg)]">{{ t('events.format') }}</dt>
              <dd>{{ event.label }}</dd>
            </div>
          </dl>
          <div class="mt-10">
            <NuxtLink :to="localePath('/contact')" class="btn-event w-full">
              {{ t('nav.contact') }}
            </NuxtLink>
          </div>
          <NuxtLink
            :to="localePath('/events')"
            class="mt-4 block text-center text-sm text-[var(--teal)] hover:text-[var(--heading)]"
          >
            {{ t('events.back') }}
          </NuxtLink>
        </aside>
      </div>
    </section>

    <ContactBanner />
  </div>
</template>
