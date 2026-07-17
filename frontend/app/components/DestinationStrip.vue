<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { fetchPackages } = useTourPackages()
const { data: packages } = await useAsyncData(
  () => `dest-packages-${locale.value}`,
  () => fetchPackages(),
  { ...freshOnNavigate(), watch: [locale] },
)

const destinations = computed(() => {
  const seen = new Set<string>()
  const rows: Array<{
    name: string
    tagline: string
    href: string
    image: string
  }> = []

  for (const pkg of packages.value || []) {
    const name = pkg.destination || pkg.title
    if (!name || seen.has(name)) continue
    seen.add(name)
    rows.push({
      name,
      tagline: pkg.summary || pkg.region || '',
      href: localePath(`/packages/${pkg.slug}`),
      image: pkg.heroImageUrl || '/images/paris-placeholder.svg',
    })
  }

  return rows
})

const count = computed(() => destinations.value.length)

const gridClass = computed(() => {
  if (count.value <= 1) return 'mx-auto grid max-w-md grid-cols-1'
  if (count.value === 2) return 'mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2'
  return 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
})
</script>

<template>
  <section v-if="destinations.length" class="py-16 sm:py-20">
    <div class="container-wide">
      <div class="reveal flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="section-label">{{ t('destinations.eyebrow') }}</p>
          <h2 class="font-display mt-3 text-3xl text-[var(--heading)] sm:text-5xl">
            {{ t('destinations.title') }}
          </h2>
        </div>
        <NuxtLink
          :to="localePath('/packages')"
          class="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--teal)] hover:text-[var(--heading)]"
        >
          {{ t('destinations.allTours') }}
        </NuxtLink>
      </div>

      <div class="reveal mt-10" :class="gridClass">
        <NuxtLink
          v-for="dest in destinations"
          :key="dest.name"
          :to="dest.href"
          class="group relative overflow-hidden rounded-[1.25rem] shadow-md"
        >
          <div class="relative aspect-[4/5]">
            <img
              :src="optimizeImageUrl(dest.image, 900, 68)"
              :alt="dest.name"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[var(--void)]/80 via-[var(--void)]/20 to-transparent"
            />
            <div class="absolute inset-x-0 bottom-0 p-6">
              <h3 class="font-display text-3xl text-white">{{ dest.name }}</h3>
              <p class="mt-2 line-clamp-2 text-sm text-white/85">{{ dest.tagline }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
