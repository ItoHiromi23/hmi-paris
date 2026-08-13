<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

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

const title = computed(() => {
  if (props.title != null) return props.title
  if (props.variant === 'reservation') {
    return s.value?.reservationTitle?.trim() || ''
  }
  return s.value?.contactCtaTitle?.trim() || ''
})
const subtitle = computed(() => {
  if (props.subtitle != null) return props.subtitle
  if (props.variant === 'reservation') {
    return s.value?.reservationSubtitle?.trim() || ''
  }
  return s.value?.contactCtaSubtitle?.trim() || ''
})
const button = computed(() => {
  if (props.button != null) return props.button
  if (props.variant === 'reservation') {
    return s.value?.reservationButton?.trim() || ''
  }
  return s.value?.contactCtaButton?.trim() || ''
})

const hasContent = computed(() => Boolean(title.value || subtitle.value || button.value))
</script>

<template>
  <section
    v-if="hasContent"
    id="contact-cta"
    class="bg-[var(--ink)] py-[86px] text-center text-[var(--paper)]"
  >
    <div class="wrap">
      <h2
        v-if="title"
        class="font-display text-[clamp(24px,3.4vw,36px)] font-bold tracking-[0.06em] text-[#fbf7ee]"
      >
        {{ title }}
      </h2>
      <p v-if="subtitle" class="mx-auto mt-3.5 mb-8 max-w-xl text-[#cdc8bc]">{{ subtitle }}</p>
      <NuxtLink v-if="button" to="/contact" class="btn-solid">{{ button }}</NuxtLink>
    </div>
  </section>
</template>
