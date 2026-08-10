<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

useReveal()

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const title = computed(() => s.value?.aboutTitle?.trim() || '')
const eyebrow = computed(() => s.value?.aboutEyebrow?.trim() || '')
const latin = computed(() => s.value?.aboutLatin?.trim() || '')
const heroImage = computed(
  () => s.value?.aboutHeroImageUrl?.trim() || s.value?.heroImageUrl?.trim() || '',
)

const philo = computed(() => ({
  before: s.value?.aboutPhiloBefore?.trim() || '',
  accent: s.value?.aboutPhiloAccent?.trim() || '',
  after: s.value?.aboutPhiloAfter?.trim() || '',
  line2: s.value?.aboutPhiloLine2?.trim() || '',
}))
const hasPhilo = computed(
  () => Boolean(philo.value.before || philo.value.accent || philo.value.after || philo.value.line2),
)

const bodyEyebrow = computed(() => s.value?.aboutSectionEyebrow?.trim() || '')
const bodyTitle = computed(() => s.value?.aboutSectionTitle?.trim() || '')
const paragraphs = computed(() =>
  [s.value?.aboutP1, s.value?.aboutP2, s.value?.aboutP3]
    .map((p) => p?.trim())
    .filter((p): p is string => Boolean(p)),
)
const hasBody = computed(
  () => Boolean(bodyEyebrow.value || bodyTitle.value || paragraphs.value.length),
)

const profileEyebrow = computed(() => s.value?.aboutProfileEyebrow?.trim() || '')
const profileTitle = computed(() => s.value?.aboutProfileTitle?.trim() || '')
const email = computed(() => s.value?.contactEmail?.trim() || '')

const profileRows = computed(() =>
  (cms.value?.aboutProfiles || []).map((row) => {
    if (row.isEmail) {
      const value = email.value || row.value
      return {
        label: row.label,
        value,
        href: value ? `mailto:${value}` : null,
      }
    }
    return { label: row.label, value: row.value, href: null as string | null }
  }),
)
const hasProfile = computed(
  () => Boolean(profileEyebrow.value || profileTitle.value || profileRows.value.length),
)

const ctaTitle = computed(() => s.value?.aboutCtaTitle?.trim() || '')
const ctaSubtitle = computed(() => s.value?.aboutCtaSubtitle?.trim() || '')
const ctaButton = computed(() => s.value?.aboutCtaButton?.trim() || '')
const hasCta = computed(() => Boolean(ctaTitle.value || ctaSubtitle.value || ctaButton.value))

useSeoMeta({
  title: () => (title.value ? `${title.value}｜HMI PARIS` : 'HMI PARIS'),
  description: () => s.value?.footerBlurb?.trim() || '',
  ogLocale: 'ja_JP',
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-[var(--ink)] py-6 text-[var(--paper)]">
      <img
        v-if="heroImage"
        :src="heroImage"
        :alt="title"
        class="absolute inset-0 h-full w-full object-cover"
        width="1700"
        height="900"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-[rgba(13,20,36,0.86)] to-[rgba(13,20,36,0.72)]"
      />
      <div class="wa-divider absolute inset-x-0 bottom-0" />
      <div class="wrap relative z-[2]">
        <p
          v-if="eyebrow"
          class="font-serif-latin text-[18px] italic tracking-[0.04em] text-[var(--brass-2)]"
        >
          {{ eyebrow }}
        </p>
        <h1
          v-if="title"
          class="mt-2.5 font-display text-[clamp(23px,3.1vw,32px)] font-bold tracking-[0.08em] text-[#fbf7ee]"
        >
          {{ title }}
        </h1>
        <p
          v-if="latin"
          class="mt-2 font-serif-latin text-[12px] uppercase tracking-[0.24em] text-[#b9aa88]"
        >
          {{ latin }}
        </p>
      </div>
    </section>

    <section
      v-if="hasPhilo"
      class="border-b border-[var(--line)] bg-[var(--panel)] py-[88px]"
    >
      <div class="wrap">
        <p
          class="reveal mx-auto max-w-[24em] text-center font-display text-[clamp(22px,3vw,30px)] font-bold leading-[2] tracking-[0.05em] text-[var(--ink)]"
        >
          {{ philo.before }}<span
            v-if="philo.accent"
            class="text-[var(--brass)]"
          >{{ philo.accent }}</span>{{ philo.after }}
          <template v-if="philo.line2">
            <br />
            {{ philo.line2 }}
          </template>
        </p>
      </div>
    </section>

    <section v-if="hasBody" class="about-body py-[88px] text-center">
      <div class="wrap">
        <p v-if="bodyEyebrow" class="sec-eyebrow reveal">{{ bodyEyebrow }}</p>
        <h2 v-if="bodyTitle" class="sec-title reveal mt-2.5">{{ bodyTitle }}</h2>
        <p
          v-for="(paragraph, i) in paragraphs"
          :key="i"
          class="reveal mx-auto mb-[18px] max-w-[42em] text-left text-[16px] text-[#3a3a34]"
        >
          {{ paragraph }}
        </p>
      </div>
    </section>

    <section v-if="hasProfile" class="bg-[var(--paper-2)] pb-[88px] pt-0">
      <div class="wrap">
        <p v-if="profileEyebrow" class="sec-eyebrow reveal">{{ profileEyebrow }}</p>
        <h2 v-if="profileTitle" class="sec-title reveal mt-2.5 mb-8">{{ profileTitle }}</h2>
        <table
          v-if="profileRows.length"
          class="reveal w-full max-w-[760px] border-collapse text-left text-[15px]"
        >
          <tbody>
            <tr
              v-for="row in profileRows"
              :key="row.label"
              class="border-b border-[var(--line)]"
            >
              <th
                class="w-[170px] py-[18px] pr-2 align-top font-display font-bold tracking-[0.06em] text-[var(--ink)]"
              >
                {{ row.label }}
              </th>
              <td class="py-[18px] pl-2 align-top text-[#48473f]">
                <a
                  v-if="row.href"
                  :href="row.href"
                  class="border-b border-[var(--brass)] text-[var(--ink)]"
                >
                  {{ row.value }}
                </a>
                <template v-else>{{ row.value }}</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <ContactBanner
      v-if="hasCta"
      :title="ctaTitle"
      :subtitle="ctaSubtitle"
      :button="ctaButton"
    />
  </div>
</template>
