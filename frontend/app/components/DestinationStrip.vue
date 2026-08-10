<script setup lang="ts">
import { homeContent as c } from '~/data/homeContent'
</script>

<template>
  <section class="bg-[var(--paper)] py-[88px]">
    <div class="wrap">
      <p class="sec-eyebrow">{{ c.destinations.eyebrow }}</p>
      <h2 class="sec-title mt-2.5">{{ c.destinations.title }}</h2>
      <p class="sec-latin mt-2 mb-[38px]">{{ c.destinations.latin }}</p>

      <div class="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="dest in c.destinations.items"
          :key="dest.name"
          to="/contact"
          class="group relative block aspect-[3/4] overflow-hidden rounded-[2px] bg-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brass-2)] max-md:aspect-[16/10]"
        >
          <img
            :src="dest.image"
            :alt="dest.name"
            class="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:scale-[1.07]"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[rgba(11,17,30,0.86)] via-[rgba(11,17,30,0.08)] via-[58%] to-transparent"
          />
          <div class="absolute inset-x-0 bottom-0 z-[2] p-6 text-[#fbf7ee] sm:px-6 sm:pb-7">
            <p class="font-serif-latin text-[11px] uppercase tracking-[0.18em] text-[var(--brass-2)]">
              {{ dest.en }}
            </p>
            <h3 class="mt-1.5 font-display text-[22px] font-bold tracking-[0.03em]">
              {{ dest.name }}
            </h3>
            <p class="mt-2 text-[13px] leading-[1.7] text-[#dad5c9]">{{ dest.text }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
