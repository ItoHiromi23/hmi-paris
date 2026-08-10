<script setup lang="ts">
import { homeContent as c } from '~/data/homeContent'

useReveal()

useSeoMeta({
  title: c.meta.title,
  description: c.meta.description,
  ogLocale: 'ja_JP',
})
</script>

<template>
  <div>
    <section
      class="relative flex min-h-[clamp(560px,82vh,780px)] items-center overflow-hidden bg-[var(--ink)] text-[var(--paper)]"
    >
      <img
        :src="c.hero.image"
        :alt="`${c.hero.titleLine1}${c.hero.titleLine2}`"
        class="absolute inset-0 h-full w-full object-cover"
        width="1800"
        height="1200"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <div
        class="absolute inset-0 bg-gradient-to-l from-[rgba(11,17,30,0.93)] via-[rgba(13,20,36,0.70)] to-[rgba(13,20,36,0.30)] max-md:bg-gradient-to-b max-md:from-[rgba(11,17,30,0.82)] max-md:to-[rgba(11,17,30,0.9)]"
      />

      <div class="wrap relative grid w-full justify-items-end">
        <div class="max-w-[34em] py-14 text-right max-md:py-10 max-md:text-left">
          <p
            class="fade-up d1 font-serif-latin text-[20px] italic tracking-[0.05em] text-[var(--brass-2)]"
          >
            {{ c.hero.eyebrow }}
          </p>
          <h1
            class="fade-up d2 mt-[18px] font-display text-[clamp(28px,4.3vw,48px)] font-bold leading-[1.35] tracking-[0.04em] text-[#fbf7ee]"
          >
            {{ c.hero.titleLine1 }}<br />{{ c.hero.titleLine2 }}
          </h1>
          <p
            class="fade-up d3 mt-6 font-serif-latin text-[17px] uppercase tracking-[0.22em] text-[#cdbd9a]"
          >
            {{ c.hero.latin }}
          </p>
          <p
            class="fade-up d4 mt-6 max-w-[30em] text-[15.5px] text-[#dcd7cc] md:ml-auto"
          >
            {{ c.hero.lead }}
          </p>
          <div
            class="fade-up d5 mt-8 flex flex-wrap justify-end gap-4 max-md:justify-start"
          >
            <NuxtLink to="/#services" class="btn-solid">{{ c.hero.ctaPrivate }}</NuxtLink>
            <NuxtLink to="/contact" class="btn-ghost">{{ c.hero.ctaGroup }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <MainEventsSection />
    <HomeGreet />
    <DestinationStrip />
    <TravelStyles />
    <WhyHmi />
    <NewsSection />
    <ContactBanner />
  </div>
</template>
