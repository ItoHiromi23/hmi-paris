<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const blurb = computed(() => s.value?.footerBlurb?.trim() || '')
const servicesTitle = computed(() => s.value?.footerServicesTitle?.trim() || '')
const companyTitle = computed(() => s.value?.footerCompanyTitle?.trim() || '')
const aboutLabel = computed(() => s.value?.footerAbout?.trim() || '')
const contactLabel = computed(() => s.value?.footerContact?.trim() || '')
const copy = computed(() => s.value?.footerCopy?.trim() || '')

const serviceLinks = [
  'パリ発 観光ツアー',
  '専用車 ＆ 日本語ガイド',
  '通訳・アテンド',
]
</script>

<template>
  <footer class="bg-[#11192b] pb-7 pt-[60px] text-[13.5px] text-[#b9b4a7]">
    <div class="wrap">
      <div class="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img
            :src="optSrc('logo-foot', 180)"
            :srcset="optSrcSet('logo-foot', [140, 180, 280])"
            sizes="140px"
            alt="HMI Paris"
            class="mb-2 block h-6 w-auto"
            width="140"
            height="24"
            loading="lazy"
            decoding="async"
          />
          <p v-if="blurb" class="m-0 mt-4 max-w-[24em] leading-[1.9]">{{ blurb }}</p>
        </div>

        <div v-if="servicesTitle || serviceLinks.length">
          <h2
            v-if="servicesTitle"
            class="mb-4 font-display text-[13px] font-bold tracking-[0.1em] text-[var(--paper)]"
          >
            {{ servicesTitle }}
          </h2>
          <NuxtLink
            v-for="item in serviceLinks"
            :key="item"
            to="/#services"
            class="mb-2.5 block transition hover:text-[var(--brass-2)]"
          >
            {{ item }}
          </NuxtLink>
        </div>

        <div v-if="companyTitle || aboutLabel || contactLabel">
          <h2
            v-if="companyTitle"
            class="mb-4 font-display text-[13px] font-bold tracking-[0.1em] text-[var(--paper)]"
          >
            {{ companyTitle }}
          </h2>
          <NuxtLink
            v-if="aboutLabel"
            to="/about"
            class="mb-2.5 block transition hover:text-[var(--brass-2)]"
          >
            {{ aboutLabel }}
          </NuxtLink>
          <NuxtLink
            v-if="contactLabel"
            to="/contact"
            class="mb-2.5 block transition hover:text-[var(--brass-2)]"
          >
            {{ contactLabel }}
          </NuxtLink>
        </div>
      </div>

      <div
        v-if="copy"
        class="pt-6 text-center font-serif-latin text-[12px] tracking-[0.16em] text-[#c4bfb3]"
      >
        {{ copy }}
      </div>
    </div>
  </footer>
</template>
