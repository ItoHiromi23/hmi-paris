<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { t } = useI18n()
useReveal()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const email = computed(() => cms.value?.settings.contactEmail || 'info@hmiparis.com')

useSeoMeta({
  title: () => `${t('about.title')} — HMI Paris`,
  description: () => t('meta.description'),
})
</script>

<template>
  <div>
    <PageHero
      compact
      :title="t('about.title')"
      :eyebrow="t('about.eyebrow')"
      image="/images/paris-placeholder.svg"
    >
      <p class="text-white/95">
        {{ t('about.hero') }}
      </p>
    </PageHero>

    <section class="py-20 sm:py-28">
      <div class="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div class="reveal">
          <SectionHeading
            :eyebrow="t('about.sectionEyebrow')"
            :title="t('about.sectionTitle')"
          />
        </div>
        <div class="reveal space-y-6 text-[var(--muted-fg)] leading-relaxed">
          <p>{{ t('about.p1') }}</p>
          <p>{{ t('about.p2') }}</p>
          <p>
            {{ t('about.p3') }}
            <a :href="`mailto:${email}`" class="text-[var(--teal)] hover:text-[var(--heading)]">
              {{ email }}
            </a>
            .
          </p>
        </div>
      </div>
    </section>

    <WhyHmi />
    <ContactBanner />
  </div>
</template>
