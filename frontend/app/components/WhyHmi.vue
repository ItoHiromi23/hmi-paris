<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'
import { TRUST_POINTS } from '~/data/destinations'
import { HMI_REASONS } from '~/data/hmiContent'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))

const reasons = computed(() =>
  cms.value?.reasons?.length
    ? cms.value.reasons
    : HMI_REASONS.map((r, i) => ({ ...r, id: i, sortOrder: i })),
)

const title = computed(
  () => cms.value?.settings.whyTitle || 'HMI Parisを選ぶ理由',
)
const italic = computed(() => cms.value?.settings.whyItalic || '選ばれるポイント')
</script>

<template>
  <section id="why" class="py-16 sm:py-24">
    <div class="container-wide">
      <div class="reveal flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-2xl">
          <p class="section-label">{{ italic }}</p>
          <h2 class="font-display mt-3 text-3xl text-[var(--heading)] sm:text-5xl">
            {{ title }}
          </h2>
        </div>
        <NuxtLink to="/about" class="btn-ghost-dark !py-3">詳しく見る</NuxtLink>
      </div>

      <div class="reveal mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(point, i) in TRUST_POINTS"
          :key="point.title"
          class="rounded-[1.25rem] border border-[var(--line)] bg-white p-6 shadow-sm sm:p-7"
        >
          <p class="font-display text-4xl text-[var(--teal)]">0{{ i + 1 }}</p>
          <h3 class="mt-4 text-lg font-semibold text-[var(--heading)]">{{ point.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-[var(--muted-fg)]">{{ point.text }}</p>
        </article>
      </div>

      <div class="reveal mt-6 grid gap-4 sm:grid-cols-2">
        <article
          v-for="reason in reasons.slice(0, 4)"
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
