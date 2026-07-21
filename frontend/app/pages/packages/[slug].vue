<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { fetchPackageBySlug, formatPrice } = useTourPackages()
const { data: pkg } = await useAsyncData(
  () => `package-${slug.value}-${locale.value}`,
  () => fetchPackageBySlug(slug.value),
  { ...freshOnNavigate(), watch: [slug, locale] },
)

if (!pkg.value) {
  throw createError({ statusCode: 404, statusMessage: t('packages.notFound') })
}

useReveal()

useSeoMeta({
  title: `${pkg.value.title} — HMI Paris`,
  description: pkg.value.summary,
})
</script>

<template>
  <div v-if="pkg">
    <PageHero
      :title="pkg.title"
      :eyebrow="`${pkg.region} · ${t('packages.days', { n: pkg.durationDays })}`"
      :image="pkg.heroImageUrl || '/images/paris-placeholder.svg'"
    >
      <p class="text-lg text-white/95">{{ pkg.summary }}</p>
      <template #actions>
        <NuxtLink :to="localePath('/contact')" class="btn-primary">
          {{ t('nav.contact') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/packages')" class="btn-ghost">{{ t('packages.allTours') }}</NuxtLink>
      </template>
    </PageHero>

    <section class="py-20 sm:py-24">
      <div class="container-site grid gap-14 lg:grid-cols-[1.4fr_0.8fr] lg:gap-20">
        <div class="reveal">
          <SectionHeading :eyebrow="t('packages.itinerary')" :title="t('packages.overview')" />
          <p class="mt-6 text-base leading-relaxed text-[var(--muted-fg)] whitespace-pre-line">
            {{ pkg.description }}
          </p>

          <ul v-if="pkg.highlights?.length" class="mt-10 space-y-4">
            <li
              v-for="item in pkg.highlights"
              :key="item"
              class="flex items-start gap-3 border-b border-[var(--line)] pb-4 text-[var(--heading)]"
            >
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--teal)]" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <aside class="reveal glass-panel h-fit p-8 sm:p-10">
          <p class="section-label">{{ t('packages.priceLabel') }}</p>
          <p class="font-display mt-2 text-5xl text-[var(--teal)]">
            {{ formatPrice(pkg.priceFrom, pkg.currency) }}
          </p>
          <p class="mt-2 text-sm text-[var(--muted-fg)]">
            {{ t('packages.priceHint') }}
          </p>
          <dl class="mt-10 space-y-5 text-sm text-[var(--heading)]">
            <div class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">{{ t('packages.destination') }}</dt>
              <dd>{{ pkg.destination }}</dd>
            </div>
            <div class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">{{ t('packages.region') }}</dt>
              <dd>{{ pkg.region }}</dd>
            </div>
            <div class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">{{ t('packages.duration') }}</dt>
              <dd>{{ t('packages.days', { n: pkg.durationDays }) }}</dd>
            </div>
          </dl>
          <div class="mt-10">
            <NuxtLink :to="localePath('/contact')" class="btn-primary w-full">
              {{ t('nav.contact') }}
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <FeesSection />
    <TourDetails />
    <CancellationPolicy />
    <ImportantNotes />
    <ContactBanner variant="reservation" />
  </div>
</template>
