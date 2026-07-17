<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { t } = useI18n()
const localePath = useLocalePath()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))

const reasons = computed(() => cms.value?.reasons || [])
const title = computed(() => cms.value?.settings.whyTitle || '')
const italic = computed(() => cms.value?.settings.whyItalic || '')
</script>

<template>
  <section v-if="reasons.length" id="why" class="py-16 sm:py-24">
    <div class="container-wide">
      <div class="reveal flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-2xl">
          <p v-if="italic" class="section-label">{{ italic }}</p>
          <h2 v-if="title" class="font-display mt-3 text-3xl text-[var(--heading)] sm:text-5xl">
            {{ title }}
          </h2>
        </div>
        <NuxtLink :to="localePath('/about')" class="btn-ghost-dark !py-3">{{ t('why.cta') }}</NuxtLink>
      </div>

      <div class="reveal mt-12 grid gap-4 sm:grid-cols-2">
        <article
          v-for="reason in reasons"
          :key="reason.id"
          class="flex gap-5 rounded-[1.25rem] border border-[var(--line)] bg-[var(--surface-2)] p-6"
        >
          <span class="font-display text-2xl text-[var(--teal)]">{{ reason.number }}</span>
          <div>
            <h3 class="font-display text-xl text-[var(--heading)]">{{ reason.title }}</h3>
            <p class="mt-2 text-sm text-[var(--muted-fg)]">{{ reason.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
