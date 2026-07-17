<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { fetchPackages } = useTourPackages()
const { data: packages } = await useAsyncData(
  'home-packages-ja',
  () => fetchPackages(),
  freshOnNavigate(),
)
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))

const featured = computed(() => (packages.value || []).slice(0, 3))
const moreTrips = computed(() => (packages.value || []).slice(3, 6))
const s = computed(() => cms.value?.settings)

useReveal()

useSeoMeta({
  title: 'HMI Paris — パリ観光・専用車・空港送迎（日本語サポート）',
  description:
    'パリ在住日本人スタッフによるプライベートツアー、専用車ガイド、空港送迎、通訳同行、オーダーメイド手配。',
})
</script>

<template>
  <div>
    <PageHero
      centered
      :title="s?.heroTitle || ''"
      :eyebrow="s?.heroEyebrow || ''"
      :image="s?.heroImageUrl || ''"
    >
      <div class="space-y-3 text-base text-white sm:text-lg">
        <p>{{ s?.heroSubtitle }}</p>
      </div>
      <template #actions>
        <NuxtLink to="/packages" class="btn-primary">ツアーを探す</NuxtLink>
        <NuxtLink to="/#services" class="btn-ghost">旅行スタイル</NuxtLink>
      </template>
    </PageHero>

    <OmotenashiStrip />
    <StatsBar />
    <DestinationStrip />
    <MainEventsSection />

    <section v-if="featured.length" id="trips" class="py-8 sm:py-12">
      <div class="container-wide">
        <div class="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="section-label">{{ s?.packagesEyebrow }}</p>
            <h2 class="font-display mt-3 text-3xl text-[var(--heading)] sm:text-5xl">
              {{ s?.packagesTitle }}
            </h2>
            <p class="mt-3 max-w-xl text-[var(--muted-fg)]">
              {{ s?.packagesIntro }}
            </p>
          </div>
          <NuxtLink to="/packages" class="btn-ghost-dark !py-3">すべてのツアー</NuxtLink>
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
