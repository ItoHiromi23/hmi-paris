<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    eyebrow?: string
    image: string
    compact?: boolean
    priority?: boolean
    centered?: boolean
  }>(),
  {
    eyebrow: '',
    compact: false,
    priority: true,
    centered: false,
  },
)

const image = computed(() => props.image || '/images/paris-placeholder.svg')
const src = computed(() => optimizeImageUrl(image.value, props.compact ? 1400 : 1800, 68))
const srcset = computed(() =>
  imageSrcSet(image.value, props.compact ? [800, 1200, 1600] : [960, 1280, 1600, 2000]),
)

if (props.priority) {
  useHead({
    link: [
      {
        rel: 'preload',
        as: 'image',
        href: src.value,
        imageSrcset: srcset.value,
        imageSizes: '100vw',
        fetchpriority: 'high',
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
      :srcset="srcset"
      sizes="100vw"
      :alt="title"
      width="1800"
      height="1200"
      class="absolute inset-0 h-full w-full object-cover ken-burns opacity-60"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
    />
    <div class="absolute inset-0 bg-[var(--void)]/40" />
    <div
      class="absolute inset-0 bg-gradient-to-b from-[var(--void)]/65 via-[var(--void)]/25 to-[var(--bg)]"
    />

    <div
      class="relative container-wide flex h-full min-h-[inherit] flex-col pb-16 pt-28 sm:pb-20 sm:pt-32"
      :class="centered ? 'items-center justify-center text-center' : 'justify-end'"
    >
      <p v-if="eyebrow" class="section-label !text-[var(--teal-bright)] hero-animate drop-shadow">
        {{ eyebrow }}
      </p>
      <h1
        class="font-display hero-animate hero-animate-delay-1 mt-4 max-w-4xl text-[clamp(2.8rem,7.5vw,5.25rem)] leading-[0.95] tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
      >
        {{ title }}
      </h1>
      <div
        class="hero-animate hero-animate-delay-2 mt-6 max-w-2xl text-white/95"
        :class="centered && 'mx-auto'"
      >
        <slot />
      </div>
      <div
        class="hero-animate hero-animate-delay-3 mt-10 flex flex-wrap gap-4"
        :class="centered && 'justify-center'"
      >
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>
