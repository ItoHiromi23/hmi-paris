<script setup lang="ts">
import type { TourPackage } from '~/types/package'

const props = defineProps<{
  package: TourPackage
  index?: number
}>()

const { t } = useI18n()
const localePath = useLocalePath()
const { formatPrice } = useTourPackages()
const src = computed(() => optimizeImageUrl(props.package.heroImageUrl, 900, 68))
const srcset = computed(() => imageSrcSet(props.package.heroImageUrl, [400, 640, 900, 1200]))
const imageError = ref(false)

watch(
  () => props.package.heroImageUrl,
  () => {
    imageError.value = false
  },
)
</script>

<template>
  <NuxtLink
    :to="localePath(`/packages/${package.slug}`)"
    class="group block h-full reveal"
    :style="index != null ? { transitionDelay: `${index * 70}ms` } : undefined"
  >
    <article
      class="flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[var(--line)] bg-white shadow-md shadow-[var(--void)]/5 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div class="relative aspect-[16/11] shrink-0 overflow-hidden bg-[var(--paper)]">
        <img
          v-if="src && !imageError"
          :src="src"
          :srcset="srcset"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          :alt="package.title"
          width="900"
          height="620"
          class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          @error="imageError = true"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--teal)]/10 to-[var(--paper)] px-6 text-center"
        >
          <span class="font-display text-lg text-[var(--muted-fg)]">{{ package.title }}</span>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-[var(--void)]/50 via-transparent to-transparent" />
        <div class="absolute left-4 top-4 flex flex-wrap gap-2">
          <span class="trip-chip">{{ package.durationDays }} days</span>
          <span class="trip-chip">{{ package.region }}</span>
        </div>
        <p
          class="absolute bottom-4 right-4 rounded-full bg-[var(--sun)] px-4 py-1.5 text-sm font-semibold text-white shadow"
        >
          From {{ formatPrice(package.priceFrom, package.currency) }}
        </p>
      </div>
      <div class="flex flex-1 flex-col p-5 sm:p-6">
        <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--teal)]">
          {{ package.destination }}
        </p>
        <h3 class="font-display mt-2 line-clamp-2 min-h-[3.25rem] text-2xl leading-tight text-[var(--heading)] sm:min-h-[3.5rem] sm:text-[1.7rem]">
          {{ package.title }}
        </h3>
        <p class="mt-3 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-[var(--muted-fg)]">
          {{ package.summary }}
        </p>
        <p
          class="mt-auto pt-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--heading)] transition group-hover:text-[var(--teal)]"
        >
          {{ t('packages.viewDetails') }}
        </p>
      </div>
    </article>
  </NuxtLink>
</template>
