<script setup lang="ts">
import type { MainEvent } from '~/types/event'

const props = defineProps<{
  event: MainEvent
}>()

const { formatJaDate, formatPrice } = useMainEvents()
const { slotsLabel } = useAvailability()
const availabilityText = computed(() => slotsLabel(props.event))

const fallbackHero = '/images/paris-placeholder.svg'
const heroSrc = computed(() => props.event.heroImageUrl || fallbackHero)
</script>

<template>
  <article class="event-feature reveal overflow-hidden bg-[var(--event-cream)]">
    <div class="grid lg:grid-cols-2">
      <!-- Visual column -->
      <div class="relative">
        <span
          v-if="event.label"
          class="absolute left-0 top-0 z-10 bg-[#e8dfd0] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--event-navy)]"
        >
          {{ event.label }}
        </span>
        <div class="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[420px] lg:h-full">
          <img
            :src="optimizeImageUrl(heroSrc, 1200, 70)"
            :srcset="imageSrcSet(heroSrc, [640, 960, 1200, 1600], 70)"
            sizes="(max-width: 1024px) 100vw, 50vw"
            :alt="event.title"
            class="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--event-navy)]/80 via-[var(--event-navy)]/35 to-transparent"
          />
          <div
            v-if="event.badgeText"
            class="absolute left-0 top-10 max-w-[min(100%,16rem)] rounded-r-full bg-[var(--event-maroon)] px-5 py-3 text-[11px] leading-snug text-white sm:top-12 sm:text-xs"
          >
            {{ event.badgeText }}
          </div>
          <p
            class="font-display absolute bottom-5 left-5 right-5 text-lg tracking-wide text-white drop-shadow sm:text-xl"
          >
            {{ event.title }}
          </p>
        </div>
      </div>

      <!-- Info column -->
      <div class="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
        <p class="font-display text-sm italic text-[var(--event-gold)] sm:text-base">
          {{ event.category }}
        </p>
        <h3 class="font-display mt-2 text-2xl leading-snug text-[var(--event-navy)] sm:text-3xl">
          {{ event.title }}
        </h3>
        <p
          v-if="event.eventDate"
          class="mt-2 text-sm text-[var(--muted-fg)]"
        >
          {{ formatJaDate(event.eventDate) }}
          <span v-if="event.venue"> ／ {{ event.venue }}</span>
        </p>
        <p
          class="mt-2 text-sm font-semibold"
          :class="event.soldOut ? 'text-[var(--alert)]' : 'text-[var(--teal)]'"
        >
          {{ availabilityText }}
        </p>
        <p class="mt-4 text-sm leading-relaxed text-[var(--body)] sm:text-[15px]">
          {{ event.summary }}
        </p>
        <ul v-if="event.inclusions.length" class="mt-5 space-y-2">
          <li
            v-for="item in event.inclusions"
            :key="item"
            class="flex items-start gap-2 text-sm text-[var(--event-navy)]"
          >
            <span class="mt-2 h-px w-3 shrink-0 bg-[var(--event-gold)]" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <NuxtLink :to="`/events/${event.slug}`" class="btn-event">
            {{ event.ctaLabel || '詳細を見る' }}
          </NuxtLink>
          <p
            v-if="event.priceFrom != null"
            class="text-sm text-[var(--muted-fg)]"
          >
            参考料金
            <span class="font-display text-lg text-[var(--event-navy)]">
              {{ formatPrice(event.priceFrom, event.currency) }}
            </span>
            〜
          </p>
        </div>
      </div>
    </div>
  </article>
</template>
