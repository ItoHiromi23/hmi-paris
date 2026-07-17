<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))

const rows = computed(() => cms.value?.tourDetails || [])
const eyebrow = computed(() => cms.value?.settings.tourDetailsEyebrow || '')
const title = computed(() => cms.value?.settings.tourDetailsTitle || '')
</script>

<template>
  <section v-if="rows.length" class="py-16 sm:py-20">
    <div class="container-site">
      <div class="reveal">
        <SectionHeading :eyebrow="eyebrow" :title="title" />
      </div>

      <dl class="reveal glass-panel mt-12 px-6 sm:px-10">
        <div
          v-for="row in rows"
          :key="row.id"
          class="grid gap-3 border-t border-[var(--line)] py-7 first:border-t-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:gap-10"
        >
          <dt class="font-display text-lg text-[var(--teal)]">{{ row.label }}</dt>
          <dd class="whitespace-pre-line text-sm leading-relaxed text-[var(--warm-muted)] sm:text-base">
            {{ row.value }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
