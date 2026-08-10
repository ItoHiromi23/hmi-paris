<script setup lang="ts">
import { homeContent as c } from '~/data/homeContent'
</script>

<template>
  <section id="why" class="bg-[var(--paper-2)] py-[88px]">
    <div class="wrap">
      <p class="sec-eyebrow">{{ c.why.eyebrow }}</p>
      <h2 class="sec-title mt-2.5">{{ c.why.title }}</h2>
      <p class="sec-latin mt-2 mb-[38px]">{{ c.why.latin }}</p>

      <div class="grid grid-cols-1 sm:grid-cols-2">
        <article
          v-for="(reason, index) in c.why.items"
          :key="reason.n"
          class="border-t border-[var(--line)] px-9 py-8"
          :class="index < 2 ? 'sm:border-t-0' : ''"
        >
          <div
            class="mb-3 flex items-center gap-3 font-serif-latin text-[15px] tracking-[0.2em] text-[var(--brass)] before:block before:h-px before:w-[26px] before:bg-[var(--brass)]"
          >
            {{ reason.n }}
          </div>
          <h3 class="font-display text-[18px] font-bold tracking-[0.03em] text-[var(--ink)]">
            {{ reason.title }}
          </h3>
          <p class="mt-2 text-[14px] text-[#54534b]">{{ reason.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
