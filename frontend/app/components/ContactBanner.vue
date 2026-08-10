<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'
import { homeContent as c } from '~/data/homeContent'

const props = withDefaults(
  defineProps<{
    variant?: 'contact' | 'reservation'
    title?: string
    subtitle?: string
    button?: string
  }>(),
  { variant: 'contact' },
)

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const title = computed(() =>
  props.title != null
    ? props.title
    : s.value?.contactCtaTitle?.trim() || c.cta.title,
)
const subtitle = computed(() =>
  props.subtitle != null
    ? props.subtitle
    : s.value?.contactCtaSubtitle?.trim() || c.cta.subtitle,
)
const button = computed(() =>
  props.button != null
    ? props.button
    : s.value?.contactCtaButton?.trim() || c.cta.button,
)
</script>

<template>
  <section
    id="contact-cta"
    class="bg-[var(--ink)] py-[86px] text-center text-[var(--paper)]"
  >
    <div class="wrap">
      <h2
        class="font-display text-[clamp(24px,3.4vw,36px)] font-bold tracking-[0.06em] text-[#fbf7ee]"
      >
        {{ title }}
      </h2>
      <p class="mx-auto mt-3.5 mb-8 max-w-xl text-[#cdc8bc]">{{ subtitle }}</p>
      <NuxtLink to="/contact" class="btn-solid">{{ button }}</NuxtLink>
    </div>
  </section>
</template>
