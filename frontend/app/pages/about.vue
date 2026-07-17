<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

useReveal()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const email = computed(() => cms.value?.settings.contactEmail || 'info@hmiparis.com')

useSeoMeta({
  title: '会社概要 — HMI Paris',
  description: 'パリ在住日本人スタッフによる観光・送迎・通訳・オーダーメイドサポート。',
})
</script>

<template>
  <div>
    <PageHero
      compact
      title="会社概要"
      eyebrow="HMI Parisについて"
      image="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2000&q=80"
    >
      <p class="text-white/95">
        パリでの滞在を、日本語で安心してお過ごしいただけるようサポートします。
      </p>
    </PageHero>

    <section class="py-20 sm:py-28">
      <div class="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div class="reveal">
          <SectionHeading
            eyebrow="私たちについて"
            title="日本人旅行者のためのパリ・スタジオ"
          />
        </div>
        <div class="reveal space-y-6 text-[var(--muted-fg)] leading-relaxed">
          <p>
            HMI Parisは、安心してパリを楽しみたい方のためのサポートデスクです。
            パリ在住の日本人スタッフが、観光ツアー、専用車、空港送迎、通訳同行、オーダーメイド手配を行います。
          </p>
          <p>
            サービス内容、料金、お知らせ、ポリシーなど、ほぼすべての文言はStrapiから編集可能です。
            フロントを触らずに運用できます。
          </p>
          <p>
            ご連絡は
            <a :href="`mailto:${email}`" class="text-[var(--teal)] hover:text-[var(--teal-bright)]">
              {{ email }}
            </a>
            まで。
          </p>
        </div>
      </div>
    </section>

    <WhyHmi />
    <ContactBanner />
  </div>
</template>
