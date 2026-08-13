<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const eyebrow = computed(() => s.value?.whyEyebrow?.trim() || '')
const title = computed(() => s.value?.whyTitle?.trim() || '')
const latin = computed(() => s.value?.whyLatin?.trim() || '')
const items = computed(() => cms.value?.reasons || [])
const hasContent = computed(
  () => Boolean(eyebrow.value || title.value || latin.value || items.value.length),
)
</script>

<template>
  <section v-if="hasContent" id="why" class="bg-[var(--paper-2)] py-[88px]">
    <div class="wrap">
      <p v-if="eyebrow" class="sec-eyebrow">{{ eyebrow }}</p>
      <h2 v-if="title" class="sec-title mt-2.5">{{ title }}</h2>
      <p v-if="latin" class="sec-latin mt-2 mb-[38px]">{{ latin }}</p>

      <div v-if="items.length" class="grid grid-cols-1 sm:grid-cols-2">
        <article
          v-for="(reason, index) in items"
          :key="reason.id"
          class="border-t border-[var(--line)] px-9 py-8"
          :class="index < 2 ? 'sm:border-t-0' : ''"
        >
          <div
            v-if="reason.number"
            class="mb-3 flex items-center gap-3 font-serif-latin text-[15px] tracking-[0.2em] text-[var(--brass-text)] before:block before:h-px before:w-[26px] before:bg-[var(--brass-text)]"
          >
            {{ reason.number }}
          </div>
          <h3 class="font-display text-[18px] font-bold tracking-[0.03em] text-[var(--ink)]">
            {{ reason.title }}
          </h3>
          <p v-if="reason.description" class="mt-2 text-[14px] text-[#54534b]">
            {{ reason.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
