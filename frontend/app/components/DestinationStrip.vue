<script setup lang="ts">
const { fetchPackages } = useTourPackages()
const { data: packages } = await useAsyncData(
  'destination-strip-packages',
  () => fetchPackages(),
  freshOnNavigate(),
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
      href: `/packages/${pkg.slug}`,
      image:
        pkg.heroImageUrl ||
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=70',
    })
  }

  return rows
})
</script>

<template>
  <section v-if="destinations.length" class="py-16 sm:py-20">
    <div class="container-wide">
      <div class="reveal flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="section-label">人気のエリア</p>
          <h2 class="font-display mt-3 text-3xl text-[var(--heading)] sm:text-5xl">
            パリの名所を、エリアごとに
          </h2>
        </div>
        <NuxtLink
          to="/packages"
          class="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--teal)] hover:text-[#0d9488]"
        >
          すべてのツアー →
        </NuxtLink>
      </div>
    </div>

    <div class="container-wide mt-10">
      <div class="snap-x-row reveal -mx-1 flex gap-4 overflow-x-auto pb-4 sm:gap-5">
        <NuxtLink
          v-for="dest in destinations"
          :key="dest.name"
          :to="dest.href"
          class="group relative min-w-[78%] overflow-hidden rounded-[1.25rem] shadow-md sm:min-w-[42%] lg:min-w-[30%]"
        >
          <div class="relative aspect-[4/5]">
            <img
              :src="optimizeImageUrl(dest.image, 900, 68)"
              :alt="dest.name"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[var(--void)]/80 via-[var(--void)]/20 to-transparent" />
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
