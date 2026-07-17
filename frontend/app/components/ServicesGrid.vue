<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))

const services = computed(() => cms.value?.services || [])
const eyebrow = computed(() => cms.value?.settings.servicesEyebrow || '')
const title = computed(() => cms.value?.settings.servicesTitle || '')
</script>

<template>
  <section v-if="services.length" id="services" class="py-20 sm:py-28">
    <div class="container-site">
      <div class="reveal">
        <SectionHeading :eyebrow="eyebrow" :title="title" />
      </div>

      <div class="reveal mt-14 grid border border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.id"
          class="border-[var(--line)] bg-[var(--surface)]/70 p-8 backdrop-blur-sm sm:border-r sm:border-b"
        >
          <div class="text-[var(--amber)]">
            <ServiceIcon :name="service.icon" />
          </div>
          <h3 class="font-display mt-6 text-xl text-[var(--warm-white)] sm:text-2xl">
            {{ service.title }}
          </h3>
          <p class="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--amber)]">
            {{ service.category }}
          </p>
          <p class="mt-4 text-sm leading-relaxed text-[var(--warm-muted)]">
            {{ service.description }}
          </p>
        </article>

        <div
          class="relative hidden min-h-[240px] overflow-hidden border-[var(--line)] sm:block"
          aria-hidden="true"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-[var(--copper)]/35 via-[var(--surface-2)] to-[var(--amber)]/20" />
          <div class="ambient-glow absolute inset-8 rounded-full bg-[var(--amber)]/20 blur-2xl" />
        </div>
      </div>
    </div>
  </section>
</template>
