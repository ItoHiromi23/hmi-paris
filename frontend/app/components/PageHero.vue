<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    eyebrow?: string
    image: string
    compact?: boolean
    priority?: boolean
    centered?: boolean
    /** Extra top padding when the race banner sits above the header. */
    bannerOffset?: boolean
  }>(),
  {
    eyebrow: '',
    compact: false,
    priority: true,
    centered: false,
    bannerOffset: false,
  },
)

const image = computed(() => props.image || '/images/paris-placeholder.svg')
const skipOptimize = computed(
  () => image.value.endsWith('.svg') || image.value.startsWith('data:'),
)
const src = computed(() =>
  skipOptimize.value
    ? image.value
    : optimizeImageUrl(image.value, props.compact ? 1400 : 1800, 68),
)
const srcset = computed(() =>
  skipOptimize.value
    ? ''
    : imageSrcSet(
        image.value,
        props.compact ? [800, 1200, 1600] : [960, 1280, 1600, 2000],
        68,
      ),
)

if (props.priority && !skipOptimize.value) {
  useHead({
    link: [
      {
        rel: 'preload',
        as: 'image',
        href: src.value,
        imageSrcset: srcset.value || undefined,
        imageSizes: '100vw',
        fetchpriority: 'high',
        type: 'image/webp',
      },
    ],
  })
}
</script>

<template>
  <section
    class="relative overflow-hidden bg-[var(--void)]"
    :class="compact ? 'min-h-[48vh]' : 'min-h-[88svh]'"
  >
    <img
      :src="src"
      :srcset="srcset || undefined"
      sizes="100vw"
      :alt="title"
      width="1800"
      height="1200"
      class="absolute inset-0 h-full w-full object-cover opacity-60"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
    />
    <div class="absolute inset-0 bg-[var(--void)]/40" />
    <div
      class="absolute inset-0 bg-gradient-to-b from-[var(--void)]/70 via-[var(--void)]/50 to-[var(--void)]/75"
    />

    <div
      class="relative container-wide flex h-full min-h-[inherit] flex-col justify-end pb-16 pt-16 sm:pb-20 sm:pt-20"
      :class="[
        centered && 'items-center text-center',
      ]"
    >
      <p v-if="eyebrow" class="section-label !text-[#5eead4] drop-shadow">
        {{ eyebrow }}
      </p>
      <!-- LCP element: no fade/delay so paint is not deferred -->
      <h1
        class="font-display mt-4 max-w-4xl text-[clamp(2.4rem,6.5vw,4.75rem)] leading-[1.2] tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] sm:leading-[1.15]"
      >
        {{ title }}
      </h1>
      <div
        class="hero-animate mt-6 max-w-2xl text-white/95"
        :class="centered && 'mx-auto'"
      >
        <slot />
      </div>
      <div
        class="hero-animate hero-animate-delay-1 mt-10 flex flex-wrap gap-4"
        :class="centered && 'justify-center'"
      >
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>
