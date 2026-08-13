<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const eyebrow = computed(() => s.value?.destinationsEyebrow?.trim() || '')
const title = computed(() => s.value?.destinationsTitle?.trim() || '')
const latin = computed(() => s.value?.destinationsLatin?.trim() || '')
const items = computed(() => cms.value?.destinations || [])
const hasContent = computed(
  () => Boolean(eyebrow.value || title.value || latin.value || items.value.length),
)
const destWidths = [400, 640, 800]

function destOptName(url: string) {
  return (url.split('/').pop() || '').replace(/\.[^.]+$/, '')
}
</script>

<template>
  <section v-if="hasContent" class="bg-[var(--paper)] py-[88px]">
    <div class="wrap">
      <p v-if="eyebrow" class="sec-eyebrow">{{ eyebrow }}</p>
      <h2 v-if="title" class="sec-title mt-2.5">{{ title }}</h2>
      <p v-if="latin" class="sec-latin mt-2 mb-[38px]">{{ latin }}</p>

      <div v-if="items.length" class="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="dest in items"
          :key="dest.id"
          :to="dest.href || '/contact'"
          class="group relative block aspect-[3/4] overflow-hidden rounded-[2px] bg-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brass-2)] max-md:aspect-[16/10]"
        >
          <img
            v-if="dest.imageUrl"
            :src="optSrc(destOptName(dest.imageUrl), 640)"
            :srcset="optSrcSet(destOptName(dest.imageUrl), destWidths)"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            :alt="dest.name"
            class="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:scale-[1.07]"
            width="800"
            height="1067"
            loading="lazy"
            decoding="async"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[rgba(11,17,30,0.86)] via-[rgba(11,17,30,0.08)] via-[58%] to-transparent"
          />
          <div class="absolute inset-x-0 bottom-0 z-[2] p-6 text-[#fbf7ee] sm:px-6 sm:pb-7">
            <p
              v-if="dest.nameEn"
              class="font-serif-latin text-[11px] uppercase tracking-[0.18em] text-[var(--brass-2)]"
            >
              {{ dest.nameEn }}
            </p>
            <h3 class="mt-1.5 font-display text-[22px] font-bold tracking-[0.03em]">
              {{ dest.name }}
            </h3>
            <p v-if="dest.description" class="mt-2 text-[13px] leading-[1.7] text-[#dad5c9]">
              {{ dest.description }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
