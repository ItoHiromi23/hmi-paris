<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const eyebrow = computed(() => s.value?.servicesEyebrow?.trim() || '')
const title = computed(() => s.value?.servicesTitle?.trim() || '')
const latin = computed(() => s.value?.servicesLatin?.trim() || '')
const items = computed(() => cms.value?.services || [])
const hasContent = computed(
  () => Boolean(eyebrow.value || title.value || latin.value || items.value.length),
)
</script>

<template>
  <section v-if="hasContent" id="services" class="bg-[var(--paper)] py-[88px]">
    <div class="wrap">
      <p v-if="eyebrow" class="sec-eyebrow">{{ eyebrow }}</p>
      <h2 v-if="title" class="sec-title mt-2.5">{{ title }}</h2>
      <p v-if="latin" class="sec-latin mt-2 mb-[38px]">{{ latin }}</p>

      <div
        v-if="items.length"
        class="mx-auto grid max-w-[860px] grid-cols-1 gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2"
      >
        <article
          v-for="service in items"
          :key="service.id"
          class="bg-[var(--panel)] px-8 py-[38px] text-center transition hover:bg-[#fffefb]"
        >
          <div class="mx-auto mb-[22px] h-[46px] w-[46px] text-[var(--brass)]">
            <ServiceIcon :name="service.icon" />
          </div>
          <h3 class="font-display text-[20px] font-bold tracking-[0.04em] text-[var(--ink)]">
            {{ service.title }}
          </h3>
          <p
            v-if="service.category"
            class="mt-1 mb-4 font-serif-latin text-[11px] uppercase tracking-[0.18em] text-[var(--brass-text)]"
          >
            {{ service.category }}
          </p>
          <p v-if="service.description" class="m-0 text-[14px] leading-[1.85] text-[#54534b]">
            {{ service.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
