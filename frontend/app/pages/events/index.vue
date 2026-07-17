<script setup lang="ts">
const { fetchEvents, formatJaDate } = useMainEvents()
const { data: events } = await useAsyncData(
  'events-index',
  () => fetchEvents(),
  freshOnNavigate(),
)

useReveal()

useSeoMeta({
  title: '特別イベント — HMI Paris',
  description:
    '凱旋門賞観戦バスツアーなど、HMI Parisがご案内する季節限定・特別イベント一覧。日本語ガイド同行。',
})
</script>

<template>
  <div>
    <PageHero
      title="特別イベント"
      eyebrow="季節限定・特別催事"
      image="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80"
    >
      <p class="text-lg text-white/95">
        パリならではの行事を、日本語サポート付きでお楽しみください。掲載内容はStrapiから追加・削除できます。
      </p>
      <template #actions>
        <NuxtLink to="/contact" class="btn-primary">お問い合わせ</NuxtLink>
        <NuxtLink to="/packages" class="btn-ghost">ツアー一覧</NuxtLink>
      </template>
    </PageHero>

    <OmotenashiStrip />

    <section class="pattern-seigaiha py-14 sm:py-20">
      <div class="container-wide space-y-12">
        <template v-if="events?.length">
          <EventFeatureCard
            v-for="event in events"
            :key="event.slug"
            :event="event"
          />
        </template>
        <div v-else class="glass-panel p-10 text-center">
          <p class="font-display text-2xl text-[var(--heading)]">現在掲載中のイベントはありません</p>
          <p class="mt-3 text-[var(--muted-fg)]">
            新しい催事が決まり次第、こちらに掲載します。
          </p>
          <p class="mt-2 text-xs text-[var(--muted-fg)]">
            （{{ formatJaDate(new Date().toISOString().slice(0, 10)) }} 時点）
          </p>
        </div>
      </div>
    </section>

    <ContactBanner />
  </div>
</template>
