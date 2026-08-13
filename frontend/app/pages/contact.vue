<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { t } = useI18n()
useReveal()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

useSeoMeta({
  title: () => `${t('contact.eyebrow')} — HMI Paris`,
  description: () => t('contact.intro'),
})
</script>

<template>
  <div>
    <PageHero
      compact
      :title="t('contact.title')"
      :eyebrow="t('contact.eyebrow')"
      image="/images/paris-placeholder.svg"
    >
      <p class="text-white/95">
        {{ s?.contactCtaSubtitle }}
      </p>
    </PageHero>

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
