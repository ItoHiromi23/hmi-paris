<script setup lang="ts">
const { getFeaturedEvent } = useMainEvents()
const featured = getFeaturedEvent()
const eyebrow = computed(() => featured?.homeEyebrow?.trim() || '')
const title = computed(() => featured?.homeTitle?.trim() || featured?.title || '')
const lead = computed(() => featured?.homeSummary?.trim() || featured?.summary || '')
const points = computed(() =>
  featured?.homeInclusions?.length ? featured.homeInclusions : featured?.inclusions || [],
)
</script>

<template>
  <section v-if="featured?.slug" id="event" class="bg-[var(--paper)] py-[84px]">
    <div class="wrap">
      <div class="grid items-center gap-[46px] lg:grid-cols-[1.1fr_0.9fr]">
        <div class="relative">
          <span
            v-if="featured.label"
            class="mb-3.5 inline-block rounded-[2px] border border-[var(--brass)] bg-[#e0cd8f] px-4 py-1.5 text-[12.5px] font-medium tracking-[0.16em] text-[#111]"
          >
            {{ featured.label }}
          </span>
          <img
            v-if="featured.heroImageUrl"
            :src="optSrc('event-poster', 740)"
            :srcset="optSrcSet('event-poster', [480, 640, 740, 900])"
            sizes="(max-width: 1024px) min(100vw - 40px, 740px), 55vw"
            :alt="featured.title"
            class="block w-full rounded-[2px] border border-[var(--brass)] shadow-[0_18px_50px_rgba(21,34,59,0.18)]"
            width="1100"
            height="825"
            loading="lazy"
            decoding="async"
          />
          <div
            v-else
            class="flex aspect-[4/3] w-full items-center justify-center rounded-[2px] border border-[var(--brass)] bg-[var(--paper-2)] font-serif-latin text-[clamp(17px,2.6vw,24px)] uppercase tracking-[0.12em] text-[var(--brass-text)]"
          >
            {{ featured.category || featured.title }}
          </div>
          <span
            v-if="featured.category && featured.heroImageUrl"
            class="pointer-events-none absolute inset-x-0 bottom-[5%] text-center font-serif-latin text-[clamp(17px,2.6vw,27px)] uppercase tracking-[0.12em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]"
          >
            {{ featured.category }}
          </span>
        </div>

        <div>
          <p
            v-if="eyebrow"
            class="font-serif-latin text-[18px] italic tracking-[0.04em] text-[var(--brass-text)]"
          >
            {{ eyebrow }}
          </p>
          <h2
            class="mt-2.5 whitespace-pre-line font-display text-[clamp(25px,3.1vw,34px)] font-bold leading-[1.45] tracking-[0.05em] text-[var(--ink)]"
          >
            {{ title }}
          </h2>
          <p v-if="lead" class="mt-4 max-w-[34em] text-[15px] text-[#3a3a34]">
            {{ lead }}
          </p>
          <ul v-if="points.length" class="mt-5 mb-7 flex flex-col gap-2.5">
            <li
              v-for="item in points"
              :key="item"
              class="relative pl-5 text-[14px] text-[#48473f] before:absolute before:left-0 before:top-[10px] before:h-px before:w-[9px] before:bg-[var(--brass)]"
            >
              {{ item }}
            </li>
          </ul>
          <NuxtLink
            v-if="featured.ctaLabel"
            :to="`/events/${featured.slug}`"
            class="btn-solid"
          >
            {{ featured.ctaLabel }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
