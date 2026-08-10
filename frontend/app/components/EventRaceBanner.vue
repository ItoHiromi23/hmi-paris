<script setup lang="ts">
import { homeContent as c } from '~/data/homeContent'
</script>

<template>
  <NuxtLink
    to="/#event"
    class="flex items-center justify-center gap-4 border-b border-[var(--brass)] bg-[var(--ink)] px-5 py-2.5 text-[13px] tracking-[0.04em] text-[var(--paper)] transition hover:bg-[var(--ink-2)] max-sm:gap-2.5 max-sm:px-3 max-sm:text-[11.5px]"
  >
    <span
      class="shrink-0 whitespace-nowrap rounded-[2px] bg-[var(--brass-2)] px-2.5 py-0.5 font-display text-[11px] font-bold tracking-[0.14em] text-[var(--ink)]"
    >
      {{ c.topbar.tag }}
    </span>
    <span class="min-w-0 truncate text-[#e9e3d6]">{{ c.topbar.main }}</span>
    <span
      class="hidden shrink-0 whitespace-nowrap font-serif-latin italic tracking-[0.1em] text-[var(--brass-2)] sm:inline"
    >
      {{ c.topbar.cta }}
    </span>
  </NuxtLink>
</template>
