<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'contact' | 'reservation'
  }>(),
  { variant: 'contact' },
)

const { t } = useI18n()
const localePath = useLocalePath()
const { cms, cmsLocale, sync } = useCmsBundle()
const { locale } = useI18n()

await sync()

const s = computed(() =>
  cmsLocale.value === locale.value ? cms.value?.settings : null,
)

const title = computed(
  () =>
    (s.value?.contactCtaTitle || '').trim() || t('contact.ctaTitle'),
)
const subtitle = computed(
  () =>
    (s.value?.contactCtaSubtitle || '').trim() || t('contact.ctaSubtitle'),
)
const button = computed(
  () =>
    (s.value?.contactCtaButton || '').trim() || t('contact.ctaButton'),
)

const reservationEyebrow = computed(
  () => (s.value?.reservationEyebrow || '').trim() || t('contact.reservationEyebrow'),
)
const reservationTitle = computed(
  () => (s.value?.reservationTitle || '').trim() || t('contact.reservationTitle'),
)
const reservationSubtitle = computed(
  () => (s.value?.reservationSubtitle || '').trim() || t('contact.reservationSubtitle'),
)
const reservationButton = computed(
  () => (s.value?.reservationButton || '').trim() || t('contact.ctaButton'),
)
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
      <!-- No .reveal here: opacity:0 after locale toggle was leaving a blank navy gap above the footer -->
      <div :key="locale" class="mx-auto max-w-3xl">
        <template v-if="variant === 'reservation'">
          <p class="section-label !text-[#5eead4]">
            {{ reservationEyebrow }}
          </p>
          <h2 class="font-display mt-3 text-3xl sm:text-5xl">
            {{ reservationTitle }}
          </h2>
          <span class="mx-auto mt-5 block h-px w-14 bg-[var(--sun)]" />
          <p class="mx-auto mt-5 max-w-xl text-white/90">
            {{ reservationSubtitle }}
          </p>
          <NuxtLink :to="localePath('/contact')" class="btn-primary mt-10 inline-flex">
            {{ reservationButton }}
          </NuxtLink>
        </template>
        <template v-else>
          <h2 class="font-display text-3xl leading-snug sm:text-4xl lg:text-5xl">
            {{ title }}
          </h2>
          <p class="mx-auto mt-6 max-w-xl text-white/90">
            {{ subtitle }}
          </p>
          <NuxtLink :to="localePath('/contact')" class="btn-primary mt-10 inline-flex">
            {{ button }}
          </NuxtLink>
        </template>
      </div>
    </div>
  </section>
</template>
