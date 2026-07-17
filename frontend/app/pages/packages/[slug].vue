<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { fetchPackageBySlug, formatPrice } = useTourPackages()
const { slotsLabel } = useAvailability()
const { data: pkg, refresh: refreshPackage } = await useAsyncData(
  () => `package-${slug.value}`,
  () => fetchPackageBySlug(slug.value),
  { watch: [slug] },
)

// Only re-fetch after Stripe checkout — not on every new-tab open
onMounted(() => {
  refreshSlotsIfDirty(refreshPackage)
})

if (!pkg.value) {
  throw createError({ statusCode: 404, statusMessage: 'パッケージが見つかりません' })
}

const availabilityText = computed(() => (pkg.value ? slotsLabel(pkg.value) : ''))

useReveal()

useSeoMeta({
  title: `${pkg.value.title} — HMI Paris`,
  description: pkg.value.summary,
})

function scrollToBuy() {
  document.getElementById('buy-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div v-if="pkg">
    <PageHero
      :title="pkg.title"
      :eyebrow="`${pkg.region} · ${pkg.durationDays}日間`"
      :image="
        pkg.heroImageUrl ||
        '/images/paris-placeholder.svg'
      "
    >
      <p class="text-lg text-white/95">{{ pkg.summary }}</p>
      <template #actions>
        <button type="button" class="btn-primary" @click="scrollToBuy">
          このパッケージを購入
        </button>
        <NuxtLink to="/packages" class="btn-ghost">ツアー一覧</NuxtLink>
      </template>
    </PageHero>

    <section class="py-20 sm:py-24">
      <div class="container-site grid gap-14 lg:grid-cols-[1.4fr_0.8fr] lg:gap-20">
        <div class="reveal">
          <SectionHeading eyebrow="旅程" title="概要" />
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

        <aside id="buy-panel" class="reveal glass-panel h-fit p-8 sm:p-10">
          <p class="section-label">料金（目安）</p>
          <p class="font-display mt-2 text-5xl text-[var(--teal)]">
            {{ formatPrice(pkg.priceFrom, pkg.currency) }}
          </p>
          <p class="mt-2 text-sm text-[var(--muted-fg)]">
            Choose a date and time, then pay online (private tour — 1 booking reserves that slot).
          </p>
          <dl class="mt-10 space-y-5 text-sm text-[var(--heading)]">
            <div class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">Reservation</dt>
              <dd :class="pkg.soldOut ? 'text-[var(--alert)]' : 'text-[var(--teal)]'">
                {{ availabilityText }}
                <span
                  v-if="!pkg.bookingUnlimited && pkg.slotsTotal != null"
                  class="text-[var(--muted-fg)]"
                >
                  ({{ pkg.usesSessions ? 'upcoming seats' : `total ${pkg.slotsTotal}` }} /
                  {{ pkg.slotsSold }} booked)
                </span>
              </dd>
            </div>
            <div class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">目的地</dt>
              <dd>{{ pkg.destination }}</dd>
            </div>
            <div class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">エリア</dt>
              <dd>{{ pkg.region }}</dd>
            </div>
            <div class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">期間</dt>
              <dd>{{ pkg.durationDays }}日間</dd>
            </div>
          </dl>
          <div class="mt-10">
            <PackageBuyButton
              product-type="package"
              :package-slug="pkg.slug"
              :package-title="pkg.title"
              :price-label="formatPrice(pkg.priceFrom, pkg.currency)"
              :sold-out="pkg.soldOut"
              :available-label="availabilityText"
            />
            <NuxtLink to="/contact" class="btn-ghost-dark mt-3 w-full">お問い合わせ</NuxtLink>
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
