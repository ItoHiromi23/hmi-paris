<script setup lang="ts">
import { homeContent as c } from '~/data/homeContent'
</script>

<template>
  <section id="services" class="bg-[var(--paper)] py-[88px]">
    <div class="wrap">
      <p class="sec-eyebrow">{{ c.services.eyebrow }}</p>
      <h2 class="sec-title mt-2.5">{{ c.services.title }}</h2>
      <p class="sec-latin mt-2 mb-[38px]">{{ c.services.latin }}</p>

      <div
        class="grid grid-cols-1 gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3"
      >
        <NuxtLink
          v-for="service in c.services.items"
          :key="service.title"
          to="/contact"
          class="group relative bg-[var(--panel)] px-8 py-[38px] transition hover:bg-[#fffefb]"
        >
          <div class="mb-[22px] h-[46px] w-[46px] text-[var(--brass)]">
            <ServiceIcon :name="service.icon" class="!h-full !w-full" />
          </div>
          <h3 class="font-display text-[20px] font-bold tracking-[0.04em] text-[var(--ink)]">
            {{ service.title }}
          </h3>
          <p class="mt-1 mb-4 font-serif-latin text-[11px] uppercase tracking-[0.18em] text-[var(--brass)]">
            {{ service.en }}
          </p>
          <p class="m-0 text-[14px] leading-[1.85] text-[#54534b]">{{ service.text }}</p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
