<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

withDefaults(
  defineProps<{
    variant?: 'contact' | 'reservation'
  }>(),
  { variant: 'contact' },
)

const localePath = useLocalePath()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)
</script>

<template>
  <section
    class="relative overflow-hidden bg-[var(--void)] py-20 text-white sm:py-24"
    :id="variant === 'reservation' ? 'reservation' : 'contact-cta'"
  >
    <div
      class="pointer-events-none absolute left-1/2 top-0 h-40 w-[28rem] -translate-x-1/2 rounded-full bg-[var(--teal)]/30 blur-3xl"
    />
    <div class="container-site relative text-center">
      <div class="reveal mx-auto max-w-3xl">
        <template v-if="variant === 'reservation'">
          <p class="section-label !text-[#5eead4]">
            {{ s?.reservationEyebrow }}
          </p>
          <h2 class="font-display mt-3 text-3xl sm:text-5xl">
            {{ s?.reservationTitle }}
          </h2>
          <span class="mx-auto mt-5 block h-px w-14 bg-[var(--sun)]" />
          <p class="mx-auto mt-5 max-w-xl text-white/90">
            {{ s?.reservationSubtitle }}
          </p>
          <NuxtLink :to="localePath('/contact')" class="btn-primary mt-10 inline-flex">
            {{ s?.reservationButton }}
          </NuxtLink>
        </template>
        <template v-else>
          <h2 class="font-display text-3xl leading-snug sm:text-4xl lg:text-5xl">
            {{ s?.contactCtaTitle }}
          </h2>
          <p class="mx-auto mt-6 max-w-xl text-white/90">
            {{ s?.contactCtaSubtitle }}
          </p>
          <NuxtLink :to="localePath('/contact')" class="btn-primary mt-10 inline-flex">
            {{ s?.contactCtaButton }}
          </NuxtLink>
        </template>
      </div>
    </div>
  </section>
</template>
