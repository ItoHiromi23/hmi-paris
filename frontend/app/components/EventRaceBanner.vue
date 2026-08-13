<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const tag = computed(() => s.value?.raceBannerTag?.trim() || '')
const main = computed(() => s.value?.raceBannerText?.trim() || '')
const cta = computed(() => s.value?.raceBannerCta?.trim() || '')
const hasContent = computed(() => Boolean(tag.value || main.value || cta.value))
const href = '/#event'
</script>

<template>
  <NuxtLink
    v-if="hasContent"
    :to="href"
    class="flex items-center justify-center gap-4 border-b border-[var(--brass)] bg-[var(--ink)] px-5 py-2.5 text-[13px] tracking-[0.04em] text-[var(--paper)] transition hover:bg-[var(--ink-2)] max-sm:gap-2.5 max-sm:px-3 max-sm:text-[11.5px]"
  >
    <span
      v-if="tag"
      class="shrink-0 whitespace-nowrap rounded-[2px] bg-[var(--brass-2)] px-2.5 py-0.5 font-display text-[11px] font-bold tracking-[0.14em] text-[var(--ink)]"
    >
      {{ tag }}
    </span>
    <span v-if="main" class="min-w-0 truncate text-[#e9e3d6]">{{ main }}</span>
    <span
      v-if="cta"
      class="hidden shrink-0 whitespace-nowrap font-serif-latin italic tracking-[0.1em] text-[var(--brass-2)] sm:inline"
    >
      {{ cta }}
    </span>
  </NuxtLink>
</template>
