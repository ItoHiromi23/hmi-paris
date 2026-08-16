<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

useReveal()

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const heroImage = computed(() => s.value?.heroImageUrl?.trim() || '')
const eyebrow = computed(() => s.value?.heroEyebrow?.trim() || '')
const title = computed(() => s.value?.heroTitle?.trim() || '')
const latin = computed(() => s.value?.heroLatin?.trim() || '')
const lead = computed(() => s.value?.heroSubtitle?.trim() || '')
const heroWidths = [640, 750, 960, 1280, 1600]
const heroSrc = optSrc('hero', 960)
const heroSrcset = optSrcSet('hero', heroWidths)
const heroAvifSrc = optSrc('hero', 1280, 'avif')
const heroAvifSrcset = optSrcSet('hero', heroWidths, 'avif')

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: heroAvifSrc,
      imageSrcset: heroAvifSrcset,
      imageSizes: '100vw',
      fetchpriority: 'high',
      type: 'image/avif',
    },
  ],
})

useSeoMeta({
  title: () => s.value?.metaTitle?.trim() || '',
  description: () => s.value?.metaDescription?.trim() || '',
  ogLocale: 'ja_JP',
})
</script>

<template>
  <div>
    <section
      v-if="title || heroImage"
      class="relative flex h-[calc(100svh-74px-2.75rem)] min-h-[32rem] items-center overflow-hidden bg-[var(--ink)] text-[var(--paper)]"
    >
      <picture v-if="heroImage" class="contents">
        <source
          type="image/avif"
          :srcset="heroAvifSrcset"
          sizes="100vw"
        />
        <img
          :src="heroSrc"
          :srcset="heroSrcset"
          sizes="100vw"
          :alt="title"
          class="absolute inset-0 h-full w-full object-cover"
          width="1800"
          height="1200"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
      <div
        class="absolute inset-0 bg-gradient-to-l from-[rgba(11,17,30,0.93)] via-[rgba(13,20,36,0.70)] to-[rgba(13,20,36,0.30)] max-md:bg-gradient-to-b max-md:from-[rgba(11,17,30,0.82)] max-md:to-[rgba(11,17,30,0.9)]"
      />

      <div class="wrap relative grid w-full justify-items-end">
        <div class="max-w-[34em] py-14 text-right max-md:py-10 max-md:text-left">
          <p
            v-if="eyebrow"
            class="fade-up d1 font-serif-latin text-[20px] italic tracking-[0.05em] text-[var(--brass-2)]"
          >
            {{ eyebrow }}
          </p>
          <h1
            v-if="title"
            class="mt-[18px] whitespace-pre-line font-display text-[clamp(28px,4.3vw,48px)] font-bold leading-[1.35] tracking-[0.04em] text-[#fbf7ee]"
          >
            {{ title }}
          </h1>
          <p
            v-if="latin"
            class="fade-up d3 mt-6 font-serif-latin text-[17px] uppercase tracking-[0.22em] text-[#cdbd9a]"
          >
            {{ latin }}
          </p>
          <p
            v-if="lead"
            class="fade-up d4 mt-6 max-w-[30em] text-[15.5px] text-[#dcd7cc] md:ml-auto"
          >
            {{ lead }}
          </p>
        </div>
      </div>
    </section>

    <MainEventsSection />
    <HomeGreet />
    <DestinationStrip />
    <TravelStyles />
    <WhyHmi />
    <ContactBanner />
  </div>
</template>
