<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

useReveal()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const form = reactive({
  name: '',
  email: '',
  interest: '',
  message: '',
})
const sent = ref(false)
function onSubmit() {
  sent.value = true
}

useSeoMeta({
  title: 'お問い合わせ — HMI Paris',
  description: 'お見積り・ご相談は無料。日本語でお気軽にご連絡ください。',
})
</script>

<template>
  <div>
    <PageHero
      compact
      title="お気軽にお問い合わせください"
      eyebrow="お問い合わせ"
      image="/images/paris-placeholder.svg"
    >
      <p class="text-white/95">
        {{ s?.contactCtaSubtitle }}
      </p>
    </PageHero>

    <section class="py-20 sm:py-24">
      <div class="container-site grid gap-14 lg:grid-cols-2">
        <div class="reveal">
          <SectionHeading eyebrow="パリ・スタジオ" :title="s?.contactEmail || 'info@hmiparis.com'" />
          <p class="mt-6 max-w-md text-[var(--muted-fg)] leading-relaxed">
            ご希望のサービス（観光・専用車・空港送迎・通訳・オーダーメイド）、希望日、人数（1〜6名）を
            あわせてお知らせください。
          </p>
          <p class="mt-4 text-sm text-[var(--muted-fg)]">
            {{ s?.studioLocation }} · {{ s?.contactPhone }}
          </p>
        </div>

        <form class="reveal glass-panel space-y-6 p-8" @submit.prevent="onSubmit">
          <div v-if="sent" class="text-[var(--heading)]">
            <p class="font-display text-3xl text-[var(--teal)]">ありがとうございます</p>
            <p class="mt-3 text-[var(--muted-fg)]">
              このデモフォームはまだ送信されません。Strapiまたはメール連携後に利用できます。
            </p>
          </div>
          <template v-else>
            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">お名前</span>
              <input
                v-model="form.name"
                required
                type="text"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)]"
              />
            </label>
            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">メール</span>
              <input
                v-model="form.email"
                required
                type="email"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)]"
              />
            </label>
            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">
                ご関心のサービス
              </span>
              <input
                v-model="form.interest"
                type="text"
                placeholder="例：空港送迎 / モンマルトル観光"
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)] placeholder:text-[var(--muted-fg)]/50"
              />
            </label>
            <label class="block">
              <span class="text-[11px] uppercase tracking-[0.2em] text-[var(--teal)]">メッセージ</span>
              <textarea
                v-model="form.message"
                rows="4"
                required
                class="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 text-[var(--heading)] outline-none transition focus:border-[var(--teal)]"
              />
            </label>
            <button type="submit" class="btn-primary mt-4">送信する</button>
          </template>
        </form>
      </div>
    </section>
  </div>
</template>
