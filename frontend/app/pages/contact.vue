<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { t } = useI18n()
useReveal()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const form = reactive({
  name: '',
  email: '',
  interest: '',
  message: '',
})
const sent = ref(false)
function onSubmit() {
  sent.value = true
}

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
            :title="s?.contactEmail || 'info@hmiparis.com'"
          />
          <p class="mt-6 max-w-md text-[var(--muted-fg)] leading-relaxed">
            {{ t('contact.intro') }}
          </p>
          <p class="mt-4 text-sm text-[var(--muted-fg)]">
            {{ s?.studioLocation }} · {{ s?.contactPhone }}
          </p>
        </div>

        <form class="reveal glass-panel space-y-6 p-8" @submit.prevent="onSubmit">
          <div v-if="sent" class="text-[var(--heading)]">
            <p class="font-display text-3xl text-[var(--teal)]">{{ t('contact.thanks') }}</p>
            <p class="mt-3 text-[var(--muted-fg)]">
              {{ t('contact.demoNote') }}
            </p>
          </div>
          <template v-else>
            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
                t('contact.name')
              }}</span>
              <input
                v-model="form.name"
                required
                type="text"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)]"
              />
            </label>
            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
                t('contact.email')
              }}</span>
              <input
                v-model="form.email"
                required
                type="email"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)]"
              />
            </label>
            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">
                {{ t('contact.interest') }}
              </span>
              <input
                v-model="form.interest"
                type="text"
                :placeholder="t('contact.interestPh')"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)] placeholder:text-[var(--muted-fg)]"
              />
            </label>
            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">{{
                t('contact.message')
              }}</span>
              <textarea
                v-model="form.message"
                rows="4"
                required
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)]"
              />
            </label>
            <button type="submit" class="btn-primary mt-4">{{ t('contact.submit') }}</button>
          </template>
        </form>
      </div>
    </section>
  </div>
</template>
