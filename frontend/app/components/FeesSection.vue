<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))

const fees = computed(() => cms.value?.fees || [])
const notes = computed(() => cms.value?.feeNotes || [])
const eyebrow = computed(() => cms.value?.settings.feesEyebrow || '')
const title = computed(() => cms.value?.settings.feesTitle || '')
</script>

<template>
  <section v-if="fees.length" id="fees" class="py-16 sm:py-24">
    <div class="container-wide">
      <div class="reveal">
        <SectionHeading :eyebrow="eyebrow" :title="title" />
      </div>

      <div class="reveal glass-panel mt-12 px-6 py-10 sm:px-12 sm:py-14">
        <ul>
          <li
            v-for="row in fees"
            :key="row.id"
            class="font-display flex items-baseline justify-between gap-6 border-b border-[var(--line)] py-5 text-xl sm:text-2xl"
          >
            <span class="text-[var(--heading)]">{{ row.label }}</span>
            <span class="text-[var(--teal)]">{{ row.price }}</span>
          </li>
        </ul>
        <div class="mt-10 space-y-2 text-center text-sm text-[var(--muted-fg)]">
          <p v-for="note in notes" :key="note">{{ note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
