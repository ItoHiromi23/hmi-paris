<script setup lang="ts">
import { homeContent as c } from '~/data/homeContent'
</script>

<template>
  <section id="news" class="bg-[var(--paper)] py-[88px]">
    <div class="wrap">
      <p class="sec-eyebrow">{{ c.news.eyebrow }}</p>
      <h2 class="sec-title mt-2.5">{{ c.news.title }}</h2>
      <p class="sec-latin mt-2 mb-[38px]">{{ c.news.latin }}</p>

      <div class="max-w-[760px] border-t border-[var(--line)]">
        <div
          v-for="item in c.news.items"
          :key="item.date"
          class="flex flex-wrap items-baseline gap-7 border-b border-[var(--line)] px-1 py-5"
        >
          <time class="min-w-[96px] font-serif-latin text-[15px] tracking-[0.12em] text-[var(--brass)]">
            {{ item.date }}
          </time>
          <p class="m-0 text-[15px] text-[#3a3a34]">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
