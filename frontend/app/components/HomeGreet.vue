<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const vertical = computed(() => s.value?.greetVertical?.trim() || '')
const eyebrow = computed(() => s.value?.greetEyebrow?.trim() || '')
const title = computed(() => s.value?.greetTitle?.trim() || '')
const lead = computed(() => s.value?.greetLead?.trim() || '')
const hasContent = computed(() => Boolean(vertical.value || eyebrow.value || title.value || lead.value))

function linesOf(value: string) {
  return value
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

const verticalLines = computed(() => linesOf(vertical.value))
const titleLines = computed(() => linesOf(title.value))
</script>

<template>
  <section
    v-if="hasContent"
    class="greet border-y border-[var(--line)] bg-[var(--panel)] py-[88px]"
    :aria-label="eyebrow || undefined"
  >
    <div class="wrap greet-inner">
      <div v-if="verticalLines.length" class="jp-vert">
        <template v-for="(line, i) in verticalLines" :key="i">
          <span>{{ line }}</span>
          <br v-if="i < verticalLines.length - 1" />
        </template>
      </div>
      <div>
        <p v-if="eyebrow" class="sec-eyebrow">{{ eyebrow }}</p>
        <h2 v-if="titleLines.length" class="sec-title mt-2.5">
          <template v-for="(line, i) in titleLines" :key="i">
            <span>{{ line }}</span>
            <br v-if="i < titleLines.length - 1" />
          </template>
        </h2>
        <p v-if="lead" class="lead-text mt-4 max-w-[42em] text-[16px] text-[#3a3a34]">
          {{ lead }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.greet-inner {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  gap: 48px;
  align-items: start;
}
.jp-vert {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: var(--mincho);
  font-size: 22px;
  letter-spacing: 0.34em;
  color: var(--ink);
  line-height: 2.1;
  height: 100%;
  border-right: 1px solid var(--line);
  padding-right: 30px;
}
@media (max-width: 767px) {
  .greet-inner {
    grid-template-columns: 1fr;
  }
  .jp-vert {
    writing-mode: horizontal-tb;
    border-right: none;
    border-left: 2px solid var(--brass);
    padding: 0 0 0 18px;
    font-size: 18px;
    line-height: 2;
  }
}
</style>
