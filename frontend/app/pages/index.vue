<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { fetchPackages } = useTourPackages()
const { data: packages } = await useLocaleAsyncData('home-packages', () => fetchPackages())
const cms = inject<Ref<CmsBundle | null> | ComputedRef<CmsBundle | null>>('cms', ref(null))

const featured = computed(() => (packages.value || []).slice(0, 3))
const moreTrips = computed(() => (packages.value || []).slice(3, 6))
const s = computed(() => cms.value?.settings)

const heroTitle = computed(() => s.value?.heroTitle || '')
const heroEyebrow = computed(() => s.value?.heroEyebrow || '')
const heroSubtitle = computed(() => s.value?.heroSubtitle || '')
const packagesEyebrow = computed(() => s.value?.packagesEyebrow || '')
const packagesTitle = computed(() => s.value?.packagesTitle || '')
const packagesIntro = computed(() => s.value?.packagesIntro || '')

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
      :key="locale"
      centered
      banner-offset
      :title="heroTitle"
      :eyebrow="heroEyebrow"
      :image="s?.heroImageUrl || ''"
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
    <DestinationStrip />

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
