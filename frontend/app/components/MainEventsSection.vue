<script setup lang="ts">
import { homeContent as c } from '~/data/homeContent'
</script>

<template>
  <section id="event" class="bg-[var(--paper)] py-[84px]">
    <div class="wrap">
      <div class="grid items-center gap-[46px] lg:grid-cols-[1.1fr_0.9fr]">
        <div class="relative">
          <span
            class="mb-3.5 inline-block rounded-[2px] border border-[var(--brass)] bg-[#e0cd8f] px-4 py-1.5 text-[12.5px] font-medium tracking-[0.16em] text-[#111]"
          >
            {{ c.event.label }}
          </span>
          <img
            :src="c.event.image"
            :alt="c.event.imageAlt"
            class="block w-full rounded-[2px] border border-[var(--brass)] shadow-[0_18px_50px_rgba(21,34,59,0.18)]"
            loading="lazy"
            decoding="async"
          />
          <span
            class="pointer-events-none absolute inset-x-0 bottom-[5%] text-center font-serif-latin text-[clamp(17px,2.6vw,27px)] uppercase tracking-[0.12em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]"
          >
            {{ c.event.overlay }}
          </span>
        </div>

        <div>
          <p class="font-serif-latin text-[18px] italic tracking-[0.04em] text-[var(--brass)]">
            {{ c.event.eyebrow }}
          </p>
          <h2
            class="mt-2.5 font-display text-[clamp(25px,3.1vw,34px)] font-bold leading-[1.45] tracking-[0.05em] text-[var(--ink)]"
          >
            {{ c.event.titleLine1 }}<br />{{ c.event.titleLine2 }}
          </h2>
          <p class="mt-4 max-w-[34em] text-[15px] text-[#3a3a34]">{{ c.event.lead }}</p>
          <ul class="mt-5 mb-7 flex flex-col gap-2.5">
            <li
              v-for="item in c.event.points"
              :key="item"
              class="relative pl-5 text-[14px] text-[#48473f] before:absolute before:left-0 before:top-[10px] before:h-px before:w-[9px] before:bg-[var(--brass)]"
            >
              {{ item }}
            </li>
          </ul>
          <NuxtLink :to="`/events/${c.event.slug}`" class="btn-solid">{{ c.event.cta }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
