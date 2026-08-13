<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const vertical = computed(() => s.value?.greetVertical?.trim() || '')
const eyebrow = computed(() => s.value?.greetEyebrow?.trim() || '')
const title = computed(() => s.value?.greetTitle?.trim() || '')
const lead = computed(() => s.value?.greetLead?.trim() || '')
const hasContent = computed(() => Boolean(vertical.value || eyebrow.value || title.value || lead.value))
</script>

<template>
  <section
    v-if="hasContent"
    class="border-y border-[var(--line)] bg-[var(--panel)] py-[88px]"
    :aria-label="eyebrow || undefined"
  >
    <div class="wrap grid items-start gap-12 md:grid-cols-[0.5fr_1fr]">
      <div
        v-if="vertical"
        class="border-[var(--brass)] font-display text-[22px] leading-[2.1] tracking-[0.34em] text-[var(--ink)] max-md:border-l-2 max-md:pl-[18px] max-md:text-[18px] max-md:leading-[2] md:h-full md:border-r md:border-[var(--line)] md:border-l-0 md:pr-[30px] md:[writing-mode:vertical-rl] md:[text-orientation:mixed]"
      >
        <span class="whitespace-pre-line">{{ vertical }}</span>
      </div>
      <div>
        <p v-if="eyebrow" class="sec-eyebrow">{{ eyebrow }}</p>
        <h2 v-if="title" class="sec-title mt-2.5">{{ title }}</h2>
        <p v-if="lead" class="mt-4 max-w-[42em] text-[16px] text-[#3a3a34]">{{ lead }}</p>
      </div>
    </div>
  </section>
</template>
