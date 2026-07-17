<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const email = computed(() => cms.value?.settings?.contactEmail || 'info@hmiparis.com')
const phone = computed(() => cms.value?.settings?.contactPhone || '+33 1 84 00 00 00')
const location = computed(() => cms.value?.settings?.studioLocation || 'Paris, France')

useSeoMeta({
  title: '特定商取引・サイト表記｜Mentions légales — HMI Paris',
  description:
    'HMI Parisのサイト表記（LCEN）。Mentions légales conformes à la législation française.',
})
</script>

<template>
  <div>
    <PageHero
      title="Mentions légales"
      eyebrow="サイト表記 · LCEN"
      image="https://images.unsplash.com/photo-1508050919630-b135583b29ab?auto=format&fit=crop&w=2000&q=80"
    >
      <p class="text-lg text-white/95">
        フランス法（loi pour la confiance dans l’économie numérique — LCEN）に基づくサイト表記です。
      </p>
    </PageHero>

    <article class="container-site max-w-3xl py-16 sm:py-20">
      <section class="space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">1. サイト運営者 / Éditeur du site</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-[var(--body)]">
          <li><strong>商号 / Raison sociale :</strong> HMI Paris</li>
          <li><strong>所在地 / Siège :</strong> {{ location }}</li>
          <li>
            <strong>メール / E-mail :</strong>
            <a :href="`mailto:${email}`" class="text-[var(--teal)]">{{ email }}</a>
          </li>
          <li><strong>電話 / Téléphone :</strong> {{ phone }}</li>
          <li>
            <strong>Directeur de la publication :</strong>
            （担当者名を記入してください）
          </li>
        </ul>
        <p class="rounded-lg border border-[var(--event-gold)]/30 bg-[var(--event-cream)] p-4 text-xs leading-relaxed text-[var(--body)]">
          À compléter : forme juridique (SAS, SARL…), capital social, SIRET / RCS, numéro de TVA
          intracommunautaire. Ces informations sont obligatoires pour un site commercial en France.
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">2. ホスティング / Hébergeur</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          本サイトのホスティング事業者名、住所、連絡先をここに記載してください
          （例：Vercel Inc.、OVHcloud、その他ご利用のプロバイダ）。
        </p>
        <p class="text-xs text-[var(--muted-fg)]">
          L’identification de l’hébergeur est une obligation légale (LCEN).
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">3. 知的財産 / Propriété intellectuelle</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          本サイト上のテキスト、画像、ロゴ、デザインその他の要素は、適用法令および権利者の権利により保護されています。
          事前の書面による許可なく複製・改変・配布することを禁じます。
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">4. 責任制限 / Responsabilité</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          掲載情報の正確性には努めますが、完全性・最新性を保証するものではありません。
          外部リンク先の内容については、当社の管理外であり責任を負いません。
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">5. 個人データ / Données personnelles</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          個人データの取扱いについては
          <NuxtLink to="/privacy" class="text-[var(--teal)] underline underline-offset-2">プライバシーポリシー</NuxtLink>、
          クッキーについては
          <NuxtLink to="/cookies" class="text-[var(--teal)] underline underline-offset-2">クッキーポリシー</NuxtLink>
          をご覧ください。
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">6. 準拠法 / Droit applicable</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          本サイトおよびこれらの表記はフランス法に準拠します。紛争が生じた場合、法令の強行規定を除き、
          パリ（France）の裁判所の管轄に服するものとします。
        </p>
      </section>
    </article>
  </div>
</template>
