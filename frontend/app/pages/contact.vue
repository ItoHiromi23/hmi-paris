<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { t } = useI18n()
useReveal()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

useSeoMeta({
  title: () => `${t('contact.title')}｜HMI PARIS`,
  description: () => t('contact.intro'),
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-[var(--ink)] py-6 text-[var(--paper)]">
      <div
        class="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_28%,rgba(50,74,120,0.55),transparent_60%)]"
      />
      <div class="wa-divider absolute inset-x-0 bottom-0" />
      <div class="wrap relative z-[2]">
        <p
          class="font-serif-latin text-[18px] italic tracking-[0.04em] text-[var(--brass-2)]"
        >
          {{ t('contact.eyebrow') }}
        </p>
        <h1
          class="mt-2.5 font-display text-[clamp(23px,3.1vw,32px)] font-bold tracking-[0.08em] text-[#fbf7ee]"
        >
          {{ t('contact.title') }}
        </h1>
        <p
          class="mt-2 font-serif-latin text-[12px] uppercase tracking-[0.24em] text-[#b9aa88]"
        >
          {{ t('contact.latin') }}
        </p>
      </div>
    </section>

    <section class="py-20 sm:py-24">
      <div class="container-site grid gap-14 lg:grid-cols-2">
        <div class="reveal">
          <SectionHeading
            :eyebrow="t('contact.studio')"
            :title="s?.contactEmail || ''"
          />
          <p class="mt-6 max-w-md text-[var(--muted-fg)] leading-relaxed">
            {{ t('contact.intro') }}
          </p>
          <p class="mt-4 text-sm text-[var(--muted-fg)]">
            {{ s?.studioLocation }} · {{ s?.contactPhone }}
          </p>
        </div>

        <div class="reveal glass-panel relative p-8">
          <EnquiryForm />
        </div>
      </div>
    </section>
  </div>
</template>
