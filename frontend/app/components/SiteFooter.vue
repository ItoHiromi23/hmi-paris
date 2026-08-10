<script setup lang="ts">
import { homeContent as c } from '~/data/homeContent'
</script>

<template>
  <footer class="bg-[#11192b] pb-7 pt-[60px] text-[13.5px] text-[#b9b4a7]">
    <div class="wrap">
      <div class="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img
            src="/images/home/logo-foot.png"
            alt="HMI Paris"
            class="mb-2 block h-6 w-auto"
            width="140"
            height="24"
          />
          <p class="m-0 mt-4 max-w-[24em] leading-[1.9]">{{ c.footer.blurb }}</p>
        </div>

        <div>
          <h5 class="mb-4 font-display text-[13px] font-bold tracking-[0.1em] text-[var(--paper)]">
            {{ c.footer.servicesTitle }}
          </h5>
          <NuxtLink
            v-for="item in c.footer.services"
            :key="item"
            to="/#services"
            class="mb-2.5 block transition hover:text-[var(--brass-2)]"
          >
            {{ item }}
          </NuxtLink>
        </div>

        <div>
          <h5 class="mb-4 font-display text-[13px] font-bold tracking-[0.1em] text-[var(--paper)]">
            {{ c.footer.companyTitle }}
          </h5>
          <NuxtLink to="/about" class="mb-2.5 block transition hover:text-[var(--brass-2)]">
            {{ c.footer.about }}
          </NuxtLink>
          <NuxtLink to="/contact" class="mb-2.5 block transition hover:text-[var(--brass-2)]">
            {{ c.footer.contact }}
          </NuxtLink>
        </div>
      </div>

      <div class="pt-6 text-center font-serif-latin text-[12px] tracking-[0.16em] text-[#7d796f]">
        {{ c.footer.copy }}
        <div class="mt-1.5 text-[11px] tracking-[0.1em] text-[#6b6757]">
          {{ c.footer.photoCredit }}
        </div>
      </div>
    </div>
  </footer>
</template>
