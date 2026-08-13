<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const eyebrow = computed(() => s.value?.newsEyebrow?.trim() || '')
const title = computed(() => s.value?.newsTitle?.trim() || '')
const latin = computed(() => s.value?.newsLatin?.trim() || '')
const items = computed(() => cms.value?.news || [])
const hasContent = computed(
  () => Boolean(eyebrow.value || title.value || latin.value || items.value.length),
)
</script>

<template>
  <section v-if="hasContent" id="news" class="bg-[var(--paper)] py-[88px]">
    <div class="wrap">
      <p v-if="eyebrow" class="sec-eyebrow">{{ eyebrow }}</p>
      <h2 v-if="title" class="sec-title mt-2.5">{{ title }}</h2>
      <p v-if="latin" class="sec-latin mt-2 mb-[38px]">{{ latin }}</p>

      <div v-if="items.length" class="max-w-[760px] border-t border-[var(--line)]">
        <div
          v-for="item in items"
          :key="item.id"
          class="flex flex-wrap items-baseline gap-7 border-b border-[var(--line)] px-1 py-5"
        >
          <time
            v-if="item.dateLabel"
            class="min-w-[96px] font-serif-latin text-[15px] tracking-[0.12em] text-[var(--brass-text)]"
          >
            {{ item.dateLabel }}
          </time>
          <p class="m-0 text-[15px] text-[#3a3a34]">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
