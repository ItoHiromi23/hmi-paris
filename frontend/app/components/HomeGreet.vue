<script setup lang="ts">
import { homeContent as c } from '~/data/homeContent'
</script>

<template>
  <section class="border-y border-[var(--line)] bg-[var(--panel)] py-[88px]" :aria-label="c.greet.eyebrow">
    <div class="wrap grid items-start gap-12 md:grid-cols-[0.5fr_1fr]">
      <div
        class="border-[var(--brass)] font-display text-[22px] leading-[2.1] tracking-[0.34em] text-[var(--ink)] max-md:border-l-2 max-md:pl-[18px] max-md:text-[18px] max-md:leading-[2] md:h-full md:border-r md:border-[var(--line)] md:border-l-0 md:pr-[30px] md:[writing-mode:vertical-rl] md:[text-orientation:mixed]"
      >
        <span class="whitespace-pre-line">{{ c.greet.vertical }}</span>
      </div>
      <div>
        <p class="sec-eyebrow">{{ c.greet.eyebrow }}</p>
        <h2 class="sec-title mt-2.5">{{ c.greet.title }}</h2>
        <p class="mt-4 max-w-[42em] text-[16px] text-[#3a3a34]">{{ c.greet.lead }}</p>
      </div>
    </div>
  </section>
</template>
