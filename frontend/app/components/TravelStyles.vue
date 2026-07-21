<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const services = computed(() => cms.value?.services || [])

const title = computed(() => cms.value?.settings.servicesTitle || '')
const eyebrow = computed(() => cms.value?.settings.servicesEyebrow || '')

const serviceImages: Record<string, string> = {
  star: '/images/paris-placeholder.svg',
  car: '/images/paris-placeholder.svg',
  plane: '/images/paris-placeholder.svg',
  chat: '/images/paris-placeholder.svg',
  plus: '/images/paris-placeholder.svg',
}

function padIndex(i: number) {
  return String(i + 1).padStart(2, '0')
}

const isHome = computed(() => {
  const home = localePath('/')
  return route.path === home || route.path === `${home}/`
})

/** Sticky offset below fixed chrome (+ race banner on home) */
function stackTop(index: number) {
  const chrome = isHome.value ? 7.25 : 4.75
  return `calc(${chrome}rem + ${index * 0.55}rem)`
}
</script>

<template>
  <!-- overflow-x only — sticky stacking breaks with overflow-y:hidden -->
  <section v-if="services.length" id="services" class="relative overflow-x-clip bg-[var(--bg)] py-16 sm:py-24">
    <div
      class="pointer-events-none absolute inset-0 opacity-40"
      style="
        background:
          radial-gradient(ellipse 50% 40% at 10% 20%, rgba(184, 149, 106, 0.18), transparent 55%),
          radial-gradient(ellipse 40% 35% at 90% 80%, rgba(15, 118, 110, 0.12), transparent 50%);
      "
    />

    <div class="container-wide relative">
      <div class="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
        <div class="hidden lg:flex lg:flex-col lg:items-center lg:justify-start lg:pt-2">
          <p
            class="font-display text-[15px] leading-[1.9] tracking-[0.35em] text-[var(--event-navy)]"
            style="writing-mode: vertical-rl; text-orientation: mixed"
          >
            {{ t('styles.vertical') }}
          </p>
          <span class="mt-6 h-16 w-px bg-[var(--event-gold)]" aria-hidden="true" />
        </div>

        <div>
          <div class="max-w-2xl">
            <p class="section-label">{{ eyebrow }}</p>
            <h2 class="font-display mt-3 text-3xl text-[var(--heading)] sm:text-5xl">
              {{ title }}
            </h2>
            <p class="mt-4 text-[var(--muted-fg)]">
              {{ t('styles.intro') }}
            </p>
          </div>

          <!-- Mobile: sticky deck. sm+: normal grid -->
          <div
            class="mt-10 max-sm:pb-8 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 xl:grid-cols-3"
          >
            <NuxtLink
              v-for="(service, index) in services"
              :key="service.id"
              :to="localePath('/contact')"
              class="group flex flex-col overflow-hidden bg-[var(--event-cream)] shadow-[0_12px_28px_rgba(18,32,51,0.1)] transition duration-300 max-sm:sticky max-sm:mb-3 max-sm:min-h-[min(68vh,440px)] sm:hover:-translate-y-1"
              :class="index === 0 ? 'sm:col-span-2 xl:col-span-1' : ''"
              :style="{
                zIndex: index + 1,
                top: stackTop(index),
              }"
            >
              <div class="relative aspect-[16/9] shrink-0 overflow-hidden sm:aspect-[5/3]">
                <img
                  :src="optimizeImageUrl(serviceImages[service.icon] || serviceImages.star, 800, 65)"
                  :alt="service.title"
                  class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>

              <div class="flex flex-1 flex-col px-5 py-4 sm:px-6 sm:py-6">
                <div class="flex items-baseline justify-between gap-3">
                  <span class="font-display text-2xl text-[var(--event-gold)]">
                    {{ padIndex(index) }}
                  </span>
                  <span class="text-[11px] font-semibold tracking-[0.14em] text-[var(--teal)]">
                    {{ service.category }}
                  </span>
                </div>

                <div class="wa-divider my-3 sm:my-4" />

                <h3 class="font-display text-xl leading-snug text-[var(--event-navy)] sm:text-[1.35rem]">
                  {{ service.title }}
                </h3>
                <p class="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--body)] sm:mt-3 sm:line-clamp-none">
                  {{ service.description }}
                </p>

                <span
                  class="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em] text-[var(--event-maroon)] transition group-hover:gap-3 sm:mt-5"
                >
                  {{ t('styles.cta') }}
                  <span aria-hidden="true">›</span>
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
