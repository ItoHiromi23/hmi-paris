<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const { field } = useCmsLocale()

const notes = computed(() =>
  (cms.value?.importantNotes || []).map(
    (note, index) => field(`cms.importantNotes.${index}`, note) || note,
  ),
)
const eyebrow = computed(() => field('cms.settings.notesEyebrow', cms.value?.settings.notesEyebrow))
const title = computed(() => field('cms.settings.notesTitle', cms.value?.settings.notesTitle))
</script>

<template>
  <section v-if="notes.length" class="py-16 sm:py-20">
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
