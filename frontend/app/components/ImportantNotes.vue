<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'
import { HMI_IMPORTANT_NOTES } from '~/data/hmiContent'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const notes = computed(() =>
  cms.value?.importantNotes?.length ? cms.value.importantNotes : [...HMI_IMPORTANT_NOTES],
)
const eyebrow = computed(() => cms.value?.settings.notesEyebrow || 'ご注意事項')
const title = computed(() => cms.value?.settings.notesTitle || 'ご確認ください')
</script>

<template>
  <section class="py-16 sm:py-20">
    <div class="container-site max-w-4xl">
      <div class="reveal">
        <SectionHeading :eyebrow="eyebrow" :title="title" />
      </div>

      <div
        class="reveal glass-panel mt-10 space-y-5 px-6 py-8 text-sm leading-relaxed text-[var(--warm-muted)] sm:px-8 sm:text-base"
      >
        <p v-for="note in notes" :key="note">
          <span class="text-[var(--amber)]" aria-hidden="true">※ </span>{{ note }}
        </p>
      </div>
    </div>
  </section>
</template>
