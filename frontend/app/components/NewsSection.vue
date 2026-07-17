<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'
import { HMI_NEWS } from '~/data/hmiContent'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))

const news = computed(() =>
  cms.value?.news?.length
    ? cms.value.news
    : HMI_NEWS.map((n, i) => ({ id: i, dateLabel: n.date, title: n.title, sortOrder: i })),
)
const eyebrow = computed(() => cms.value?.settings.newsEyebrow || 'お知らせ')
const title = computed(() => cms.value?.settings.newsTitle || '新着情報')
</script>

<template>
  <section id="news" class="py-16 sm:py-20">
    <div class="container-wide">
      <div class="reveal flex flex-wrap items-end gap-4">
        <h2 class="font-display text-4xl text-[var(--heading)] sm:text-5xl">{{ title }}</h2>
        <p class="section-label mb-1.5">{{ eyebrow }}</p>
      </div>

      <ul class="reveal mt-10">
        <li
          v-for="item in news"
          :key="item.id"
          class="flex flex-col gap-2 border-t border-[var(--line)] py-6 sm:flex-row sm:items-baseline sm:gap-10"
        >
          <time class="font-display shrink-0 text-lg text-[var(--amber)]">{{ item.dateLabel }}</time>
          <p class="text-[var(--warm-muted)]">{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
