<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { fetchPackages } = useTourPackages()
const { data: packages } = await useLocaleAsyncData('home-packages', (code) => fetchPackages(code))

// Same shared CMS state as the language toggle (do not inject a stale copy)
const { cms, cmsLocale, sync, heroImageUrl } = useCmsBundle()
await sync()

const featured = computed(() => (packages.value || []).slice(0, 3))
const moreTrips = computed(() => (packages.value || []).slice(3, 6))

/** CMS settings only when they match the active UI locale; otherwise i18n. */
const settingsReady = computed(() => cmsLocale.value === locale.value && cms.value?.settings)

const heroTitle = computed(
  () => settingsReady.value?.heroTitle?.trim() || t('home.heroTitle'),
)
const heroEyebrow = computed(
  () => settingsReady.value?.heroEyebrow?.trim() || t('home.heroEyebrow'),
)
const heroSubtitle = computed(
  () => settingsReady.value?.heroSubtitle?.trim() || t('home.heroSubtitle'),
)
/** Shared (non-localized) field — never blank out during EN↔JA toggle. */
const heroImage = computed(
  () =>
    heroImageUrl.value ||
    cms.value?.settings?.heroImageUrl?.trim() ||
    '',
)

const packagesEyebrow = computed(
  () => settingsReady.value?.packagesEyebrow?.trim() || '',
)
const packagesTitle = computed(() => settingsReady.value?.packagesTitle?.trim() || '')
const packagesIntro = computed(() => settingsReady.value?.packagesIntro?.trim() || '')

useReveal()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogLocale: () => (locale.value === 'ja' ? 'ja_JP' : 'en_US'),
})
</script>

<template>
  <div>
    <PageHero
      centered
      banner-offset
      :title="heroTitle"
      :eyebrow="heroEyebrow"
      :image="heroImage"
    >
      <div class="space-y-3 text-base text-white sm:text-lg">
        <p>{{ heroSubtitle }}</p>
      </div>
      <template #actions>
        <NuxtLink :to="localePath('/packages')" class="btn-primary">
          {{ t('home.findTours') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/#services')" class="btn-ghost">
          {{ t('home.travelStyles') }}
        </NuxtLink>
      </template>
    </PageHero>

    <MainEventsSection />
    <OmotenashiStrip />

    <section v-if="featured.length" id="trips" class="py-8 sm:py-12">
      <div class="container-wide">
        <div class="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="section-label">{{ packagesEyebrow }}</p>
            <h2 class="font-display mt-3 text-3xl text-[var(--heading)] sm:text-5xl">
              {{ packagesTitle }}
            </h2>
            <p class="mt-3 max-w-xl text-[var(--muted-fg)]">
              {{ packagesIntro }}
            </p>
          </div>
          <NuxtLink :to="localePath('/packages')" class="btn-ghost-dark !py-3">
            {{ t('home.allTours') }}
          </NuxtLink>
        </div>

        <div class="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PackageCard
            v-for="(pkg, index) in featured"
            :key="pkg.slug"
            :package="pkg"
            :index="index"
          />
        </div>

        <div v-if="moreTrips.length" class="mt-6 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PackageCard
            v-for="(pkg, index) in moreTrips"
            :key="pkg.slug"
            :package="pkg"
            :index="index + 3"
          />
        </div>
      </div>
    </section>

    <TravelStyles />
    <WhyHmi />
    <FeesSection />
    <ImportantNotes />
    <NewsSection />
    <ContactBanner />
  </div>
</template>
