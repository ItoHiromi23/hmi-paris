<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { fetchEvents, formatJaDate } = useMainEvents()

const { data: events } = await useLocaleAsyncData('home-race-banner', () => fetchEvents())

/** Lead with featured main event; fall back to first listed event. */
const event = computed(() => {
  const list = events.value || []
  return list.find((e) => e.featured) || list[0] || null
})

const headline = computed(() => event.value?.title?.trim() || '')
const dateLabel = computed(() => formatJaDate(event.value?.eventDate))
const to = computed(() =>
  event.value?.slug ? localePath(`/events/${event.value.slug}`) : localePath('/events'),
)

/** Units repeated inside each marquee half (halves duplicated for a seamless loop). */
const marqueeCopies = computed(() => {
  const title = headline.value
  if (!title) return []
  const bits = [title]
  if (dateLabel.value) bits.unshift(dateLabel.value)
  if (event.value?.badgeText) bits.push(event.value.badgeText)
  const unit = bits.join('  ·  ')
  return Array.from({ length: 3 }, () => unit)
})
</script>

<template>
  <div
    v-if="headline"
    class="event-race-banner relative z-[60] w-full"
  >
    <NuxtLink
      :to="to"
      class="group relative flex h-10 items-stretch overflow-hidden border-b border-[var(--event-gold)]/35 bg-[var(--event-navy)] text-[var(--event-cream)] sm:h-11"
      :aria-label="`${t('events.raceBannerLive')}: ${headline}`"
    >
      <!-- Live pill -->
      <span
        class="relative z-10 flex shrink-0 items-center gap-2 border-r border-[var(--event-gold)]/30 bg-[var(--event-maroon)] px-3 text-[10px] font-semibold uppercase tracking-[0.18em] sm:px-4 sm:text-[11px]"
      >
        <span class="event-race-banner__pulse h-1.5 w-1.5 rounded-full bg-[var(--event-cream)]" />
        {{ t('events.raceBannerLive') }}
      </span>

      <!-- Horse silhouette -->
      <span
        class="event-race-banner__horse relative z-10 hidden w-10 shrink-0 items-center justify-center border-r border-[var(--event-gold)]/20 text-[var(--event-gold)] sm:flex"
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 24" class="h-4 w-5" fill="currentColor">
          <path
            d="M2 16c1.5-3 4-5 7-5.5 1-.2 2.2.1 3 .8l1.2-2.2c.8-1.4 2.4-2 4-1.6l2.2.6c1.2.3 2.1 1.2 2.4 2.4l.4 1.6c1.8.2 3.4 1.2 4.4 2.8.4.6.1 1.4-.6 1.5l-2.2.3c-.7-1.2-1.8-2-3.2-2.2l-.5 2.4c-.1.6-.7 1-1.3.9l-2.4-.4c-.5-.1-.9-.5-.9-1l.1-1.4c-1.2.1-2.3.5-3.2 1.2-.6.5-1.5.4-2-.2L8.2 15c-1.3.4-2.5 1.2-3.4 2.3-.4.5-1.2.5-1.6 0L2 16z"
          />
        </svg>
      </span>

      <!-- Title marquee: right → left -->
      <span class="relative min-w-0 flex-1 overflow-hidden">
        <span
          class="event-race-banner__track absolute inset-y-0 left-0 flex items-center whitespace-nowrap font-display text-sm tracking-wide text-[var(--event-cream)] sm:text-base"
        >
          <span
            v-for="pass in 2"
            :key="pass"
            class="flex items-center"
            :aria-hidden="pass === 2 ? 'true' : undefined"
          >
            <span
              v-for="(copy, i) in marqueeCopies"
              :key="`${pass}-${i}`"
              class="mx-8 inline-flex items-center gap-3"
            >
              <span>{{ copy }}</span>
              <span class="text-[var(--event-gold)]/70" aria-hidden="true">◆</span>
            </span>
          </span>
        </span>
        <!-- Soft edge fades -->
        <span
          class="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[var(--event-navy)] to-transparent sm:w-10"
          aria-hidden="true"
        />
        <span
          class="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[var(--event-navy)] to-transparent sm:w-10"
          aria-hidden="true"
        />
      </span>

      <span
        class="relative z-10 hidden shrink-0 items-center border-l border-[var(--event-gold)]/30 px-4 text-[10px] uppercase tracking-[0.16em] text-[var(--event-gold)] transition group-hover:text-[var(--event-cream)] sm:flex"
      >
        {{ t('events.detailCta') }} →
      </span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.event-race-banner__track {
  animation: event-race-marquee 28s linear infinite;
  will-change: transform;
}

.event-race-banner__horse {
  animation: event-race-horse 1.1s ease-in-out infinite;
}

.event-race-banner__pulse {
  animation: event-race-pulse 1.4s ease-in-out infinite;
}

@keyframes event-race-marquee {
  from {
    transform: translateX(0);
  }
  to {
    /* Content is duplicated across the track — shift by half for a seamless loop */
    transform: translateX(-50%);
  }
}

@keyframes event-race-horse {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

@keyframes event-race-pulse {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--event-cream) 50%, transparent);
  }
  50% {
    opacity: 0.55;
    box-shadow: 0 0 0 5px transparent;
  }
}

@media (prefers-reduced-motion: reduce) {
  .event-race-banner__track,
  .event-race-banner__horse,
  .event-race-banner__pulse {
    animation: none;
  }

  .event-race-banner__track {
    position: relative;
    inset: auto;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    padding-inline: 1rem;
    transform: none;
  }

  .event-race-banner__track > span:not(:first-child),
  .event-race-banner__track > span:first-child > span:not(:first-child) {
    display: none;
  }
}
</style>
