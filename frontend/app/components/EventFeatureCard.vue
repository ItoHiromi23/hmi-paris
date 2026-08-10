<script setup lang="ts">
import type { MainEvent } from '~/types/event'

const props = defineProps<{
  event: MainEvent
}>()

const { formatJaDate, formatPrice } = useMainEvents()
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const heroSrc = computed(() => props.event.heroImageUrl || '')

/** Sticky offset under fixed chrome (+ race banner on home). */
const stickyTop = computed(() => {
  const home = localePath('/')
  const isHome = route.path === home || route.path === `${home}/`
  return isHome ? '7.25rem' : '4.75rem'
})
</script>

<template>
  <article class="event-feature event-feature--parallax relative">
    <!-- 1) Text first — sticks while the image scrolls over it -->
    <div
      class="event-feature__copy relative z-0 flex flex-col justify-center bg-[var(--event-cream)] px-6 py-10 sm:px-10 sm:py-14 lg:px-12"
      :style="{ top: stickyTop }"
    >
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
        <div>
          <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              v-if="event.label"
              class="inline-block bg-[#e8dfd0] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--event-navy)]"
            >
              {{ event.label }}
            </span>
            <p class="font-display text-sm italic text-[var(--event-gold)] sm:text-base">
              {{ event.category }}
            </p>
          </div>
          <h3 class="font-display mt-3 text-2xl leading-snug text-[var(--event-navy)] sm:text-3xl lg:text-[2.1rem]">
            {{ event.title }}
          </h3>
          <p
            v-if="event.eventDate"
            class="mt-2 text-sm text-[var(--muted-fg)]"
          >
            {{ formatJaDate(event.eventDate) }}
            <span v-if="event.venue"> ／ {{ event.venue }}</span>
          </p>
          <p class="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--body)] sm:text-[15px]">
            {{ event.summary }}
          </p>
          <div class="mt-7 flex flex-wrap items-center gap-4">
            <NuxtLink :to="localePath(`/events/${event.slug}`)" class="btn-event">
              {{ event.ctaLabel || t('events.detailCta') }}
            </NuxtLink>
            <p
              v-if="event.priceFrom != null"
              class="text-sm text-[var(--muted-fg)]"
            >
              {{ t('events.fromPrice') }}
              <span class="font-display text-lg text-[var(--event-navy)]">
                {{ formatPrice(event.priceFrom, event.currency) }}
              </span>
              ~
            </p>
          </div>
        </div>

        <ul
          v-if="event.inclusions.length"
          class="space-y-2.5 border-t border-[var(--event-navy)]/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1"
        >
          <li
            v-for="item in event.inclusions"
            :key="item"
            class="flex items-start gap-2.5 text-sm text-[var(--event-navy)]"
          >
            <span class="mt-2 h-px w-3 shrink-0 bg-[var(--event-gold)]" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 2) Image scrolls up and covers the sticky text (wrapper from lg only) -->
    <div v-if="heroSrc" class="event-feature__media relative z-10 overflow-hidden rounded-md">
      <img
        :src="optimizeImageUrl(heroSrc, 1600, 72)"
        :srcset="imageSrcSet(heroSrc, [800, 1200, 1600, 2000], 72)"
        sizes="(max-width: 1024px) 100vw, min(1120px, 92vw)"
        :alt="event.title"
        class="event-feature__img absolute inset-0 h-full w-full max-lg:relative max-lg:inset-auto max-lg:h-auto max-lg:rounded-md max-lg:object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  </article>
</template>

<style scoped>
.event-feature--parallax {
  border: 1px solid rgba(26, 39, 68, 0.1);
  box-shadow: 0 18px 40px rgba(26, 39, 68, 0.08);
  background: var(--event-cream);
}

.event-feature__copy {
  position: sticky;
  min-height: min(72vh, 560px);
}

.event-feature__media {
  min-height: min(92vh, 820px);
  margin-top: -12vh;
  box-shadow: 0 -24px 48px rgba(18, 32, 51, 0.18);
}

.event-feature__img {
  object-fit: cover;
}

/* Stacked contain layout until desktop */
@media (max-width: 1023px) {
  .event-feature__copy {
    min-height: auto;
    position: relative;
    top: 0 !important;
  }

  .event-feature__media {
    display: contents;
    min-height: 0;
    margin-top: 0;
    box-shadow: none;
  }

  .event-feature__img {
    position: relative;
    inset: auto;
    height: auto;
    width: 100%;
    object-fit: contain;
  }
}

@media (prefers-reduced-motion: reduce) {
  .event-feature__copy {
    position: relative;
    top: 0 !important;
    min-height: auto;
  }

  .event-feature__media {
    margin-top: 0;
  }
}
</style>
