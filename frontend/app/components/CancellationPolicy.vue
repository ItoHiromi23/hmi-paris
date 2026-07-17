<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'
import { HMI_CANCELLATION, HMI_CANCELLATION_NOTES } from '~/data/hmiContent'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const rows = computed(() =>
  cms.value?.cancellation?.length
    ? cms.value.cancellation
    : HMI_CANCELLATION.map((c, i) => ({ ...c, id: i, sortOrder: i })),
)
const notes = computed(() =>
  cms.value?.cancellationNotes?.length
    ? cms.value.cancellationNotes
    : [...HMI_CANCELLATION_NOTES],
)
const eyebrow = computed(() => cms.value?.settings.cancellationEyebrow || 'キャンセルについて')
const title = computed(() => cms.value?.settings.cancellationTitle || 'キャンセルポリシー')
</script>

<template>
  <section class="border-y border-[var(--line)] bg-[var(--surface)]/60 py-16 sm:py-20">
    <div class="container-site max-w-4xl">
      <div class="reveal">
        <SectionHeading :eyebrow="eyebrow" :title="title" />
      </div>

      <ul class="reveal mt-12">
        <li
          v-for="row in rows"
          :key="row.id"
          class="flex items-baseline justify-between gap-6 border-t border-[var(--line)] py-6"
        >
          <span class="font-display text-[var(--heading)] sm:text-lg">{{ row.label }}</span>
          <span
            class="font-display shrink-0 text-xl sm:text-2xl"
            :class="row.alert ? 'text-[var(--alert)]' : 'text-[var(--teal)]'"
          >
            {{ row.fee }}
          </span>
        </li>
      </ul>

      <div class="reveal mt-10 space-y-4 border border-[var(--line)] bg-[var(--surface-2)] px-6 py-7 text-sm leading-relaxed text-[var(--warm-muted)] sm:px-8">
        <p v-for="note in notes" :key="note">
          <span class="text-[var(--amber)]" aria-hidden="true">※ </span>{{ note }}
        </p>
      </div>
    </div>
  </section>
</template>
