<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { fetchEventBySlug, formatJaDate, formatPrice } = useMainEvents()
const { slotsLabel } = useAvailability()
const { data: event, refresh: refreshEvent } = await useAsyncData(
  () => `event-${slug.value}`,
  () => fetchEventBySlug(slug.value),
  { watch: [slug] },
)

onMounted(() => {
  refreshSlotsIfDirty(refreshEvent)
})

if (!event.value) {
  throw createError({ statusCode: 404, statusMessage: 'イベントが見つかりません' })
}

const availabilityText = computed(() => (event.value ? slotsLabel(event.value) : ''))
const canPurchase = computed(
  () => event.value?.priceFrom != null && Number(event.value.priceFrom) > 0,
)

useReveal()

useSeoMeta({
  title: `${event.value.title} — HMI Paris`,
  description: event.value.summary,
})
</script>

<template>
  <div v-if="event">
    <PageHero
      :title="event.title"
      :eyebrow="event.category || '特別イベント'"
      :image="
        event.heroImageUrl ||
        '/images/paris-placeholder.svg'
      "
    >
      <p class="text-lg text-white/95">{{ event.summary }}</p>
      <template #actions>
        <a href="#buy-panel" class="btn-primary">{{ availabilityText }} — 予約へ</a>
        <NuxtLink to="/events" class="btn-ghost">イベント一覧</NuxtLink>
      </template>
    </PageHero>

    <OmotenashiStrip />

    <section class="pattern-asanoha py-16 sm:py-24">
      <div class="container-site grid gap-14 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">
        <div class="reveal">
          <p v-if="event.label" class="inline-block bg-[#e8dfd0] px-3 py-1 text-xs text-[var(--event-navy)]">
            {{ event.label }}
          </p>
          <SectionHeading
            class="mt-4"
            eyebrow="イベント詳細"
            :title="event.title"
          />
          <p
            v-if="event.eventDate"
            class="mt-4 text-sm text-[var(--muted-fg)]"
          >
            開催日：{{ formatJaDate(event.eventDate) }}
            <span v-if="event.venue"> ／ 会場：{{ event.venue }}</span>
          </p>
          <p class="mt-6 whitespace-pre-line text-base leading-relaxed text-[var(--muted-fg)]">
            {{ event.description }}
          </p>

          <h3 class="font-display mt-12 text-2xl text-[var(--event-navy)]">含まれるもの</h3>
          <ul v-if="event.inclusions.length" class="mt-6 space-y-4">
            <li
              v-for="item in event.inclusions"
              :key="item"
              class="flex items-start gap-3 border-b border-[var(--line)] pb-4 text-[var(--heading)]"
            >
              <span class="mt-2 h-px w-4 shrink-0 bg-[var(--event-gold)]" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <p
            v-if="event.notes"
            class="mt-10 rounded-lg border border-[var(--event-gold)]/30 bg-[var(--event-cream)] p-5 text-sm leading-relaxed text-[var(--body)]"
          >
            <span class="font-semibold text-[var(--event-navy)]">ご注意：</span>
            {{ event.notes }}
          </p>
        </div>

        <aside
          id="buy-panel"
          class="reveal glass-panel h-fit border-[var(--event-gold)]/20 p-8 sm:p-10"
        >
          <p class="section-label !text-[var(--event-maroon)]">参考料金</p>
          <p
            v-if="event.priceFrom != null"
            class="font-display mt-2 text-5xl text-[var(--event-navy)]"
          >
            {{ formatPrice(event.priceFrom, event.currency) }}
          </p>
          <p v-else class="mt-2 text-[var(--muted-fg)]">お問い合わせください</p>
          <p class="mt-2 text-sm text-[var(--muted-fg)]">
            オンライン決済で1枠を確保できます
          </p>
          <dl class="mt-10 space-y-5 text-sm text-[var(--heading)]">
            <div class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">予約枠</dt>
              <dd :class="event.soldOut ? 'text-[var(--alert)]' : 'text-[var(--teal)]'">
                {{ availabilityText }}
                <span
                  v-if="!event.bookingUnlimited && event.slotsTotal != null"
                  class="text-[var(--muted-fg)]"
                >
                  （全{{ event.slotsTotal }}枠）
                </span>
              </dd>
            </div>
            <div v-if="event.eventDate" class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">開催日</dt>
              <dd>{{ formatJaDate(event.eventDate) }}</dd>
            </div>
            <div v-if="event.venue" class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">会場</dt>
              <dd class="text-right">{{ event.venue }}</dd>
            </div>
            <div v-if="event.label" class="flex justify-between border-t border-[var(--line)] pt-4">
              <dt class="text-[var(--muted-fg)]">形態</dt>
              <dd>{{ event.label }}</dd>
            </div>
          </dl>
          <div class="mt-10">
            <PackageBuyButton
              v-if="canPurchase"
              product-type="event"
              :package-slug="event.slug"
              :package-title="event.title"
              :price-label="formatPrice(event.priceFrom!, event.currency)"
              :sold-out="event.soldOut"
              :available-label="availabilityText"
            />
            <NuxtLink
              to="/contact"
              class="mt-3 w-full"
              :class="canPurchase ? 'btn-ghost-dark' : 'btn-event'"
            >
              お問い合わせ
            </NuxtLink>
          </div>
          <NuxtLink
            to="/events"
            class="mt-4 block text-center text-sm text-[var(--teal)] hover:text-[var(--heading)]"
          >
            ← イベント一覧へ
          </NuxtLink>
        </aside>
      </div>
    </section>

    <ContactBanner />
  </div>
</template>
