<script setup lang="ts">
const { fetchEvents } = useMainEvents()
const { data: events } = await useLocaleAsyncData('home-featured-events', () => fetchEvents('ja'))

const featured = computed(
  () => events.value?.find((event) => event.featured) || events.value?.[0] || null,
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
            :src="featured.heroImageUrl"
            :alt="featured.title"
            class="block w-full rounded-[2px] border border-[var(--brass)] shadow-[0_18px_50px_rgba(21,34,59,0.18)]"
            loading="lazy"
            decoding="async"
          />
          <div
            v-else
            class="flex aspect-[4/3] w-full items-center justify-center rounded-[2px] border border-[var(--brass)] bg-[var(--paper-2)] font-serif-latin text-[clamp(17px,2.6vw,24px)] uppercase tracking-[0.12em] text-[var(--brass)]"
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
            v-if="featured.category"
            class="font-serif-latin text-[18px] italic tracking-[0.04em] text-[var(--brass)]"
          >
            {{ featured.category }}
          </p>
          <h2
            class="mt-2.5 font-display text-[clamp(25px,3.1vw,34px)] font-bold leading-[1.45] tracking-[0.05em] text-[var(--ink)]"
          >
            {{ featured.title }}
          </h2>
          <p v-if="featured.summary" class="mt-4 max-w-[34em] text-[15px] text-[#3a3a34]">
            {{ featured.summary }}
          </p>
          <ul v-if="featured.inclusions.length" class="mt-5 mb-7 flex flex-col gap-2.5">
            <li
              v-for="item in featured.inclusions"
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
