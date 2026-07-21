<script setup lang="ts">
const { choice, openSettings, acceptAll, refuseAll, load } = useCookieConsent()

onMounted(() => {
  load()
})

const currentLabel = computed(() => {
  if (choice.value === 'accepted') return '同意済み / Consentement donné'
  if (choice.value === 'refused') return '拒否済み / Refus enregistré'
  return '未選択 / Non choisi'
})

useSeoMeta({
  title: 'クッキーポリシー｜Politique cookies — HMI Paris',
  description:
    'HMI Parisのクッキー利用方針（CNIL準拠）。Politique relative aux cookies conforme aux recommandations de la CNIL.',
})
</script>

<template>
  <div>
    <PageHero
      title="クッキーポリシー"
      eyebrow="Politique cookies · CNIL"
      image="/images/paris-placeholder.svg"
    >
      <p class="text-lg text-white/95">
        クッキーの種類、目的、同意の管理方法について説明します。
      </p>
    </PageHero>

    <article class="container-site max-w-3xl py-16 sm:py-20">
      <p class="text-sm leading-relaxed text-[var(--muted-fg)]">
        フランスCNILの勧告に従い、サイトの動作に<strong>厳密に必要なクッキー</strong>以外は、
        事前の同意なく設置しません。同意と拒否は同等の選択肢として提示します。
      </p>

      <section class="mt-10 rounded-[1.25rem] border border-[var(--line)] bg-[var(--event-cream)] p-6 sm:p-8">
        <p class="section-label !text-[var(--event-maroon)]">現在の選択</p>
        <p class="font-display mt-2 text-xl text-[var(--event-navy)]">{{ currentLabel }}</p>
        <div class="mt-5 flex flex-wrap gap-3">
          <button type="button" class="btn-ghost-dark !rounded-sm !px-5 !py-2.5" @click="refuseAll">
            すべて拒否
          </button>
          <button type="button" class="btn-primary !rounded-sm !px-5 !py-2.5" @click="acceptAll">
            すべて同意
          </button>
          <button
            type="button"
            class="text-sm text-[var(--teal)] underline underline-offset-2"
            @click="openSettings"
          >
            バナーを再表示
          </button>
        </div>
      </section>

      <div class="wa-divider my-10" />

      <section class="space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">1. クッキーとは</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          クッキーは、ウェブサイトが端末（ブラウザ）に保存する小さなテキストファイルです。
          サイトの動作、利便性の向上、（同意がある場合）利用状況の測定などに用いられます。
        </p>
        <p class="text-sm leading-relaxed text-[var(--muted-fg)]">
          Un cookie est un petit fichier déposé sur votre terminal. Certains sont strictement nécessaires
          au fonctionnement du site ; d’autres requièrent votre consentement préalable.
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">2. 使用するクッキー</h2>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr class="border-b border-[var(--line)] text-[var(--muted-fg)]">
                <th class="py-3 pr-3 font-medium">名称 / 区分</th>
                <th class="py-3 pr-3 font-medium">目的</th>
                <th class="py-3 pr-3 font-medium">期間</th>
                <th class="py-3 font-medium">同意</th>
              </tr>
            </thead>
            <tbody class="text-[var(--body)]">
              <tr class="border-b border-[var(--line)] align-top">
                <td class="py-3 pr-3">
                  <span class="font-medium">hmi_cookie_consent_v1</span>
                  <br />
                  <span class="text-xs text-[var(--muted-fg)]">必須</span>
                </td>
                <td class="py-3 pr-3">クッキー同意の選択を記憶する</td>
                <td class="py-3 pr-3">最大13か月</td>
                <td class="py-3">不要</td>
              </tr>
              <tr class="border-b border-[var(--line)] align-top">
                <td class="py-3 pr-3">
                  <span class="font-medium">セッション / セキュリティ</span>
                  <br />
                  <span class="text-xs text-[var(--muted-fg)]">必須</span>
                </td>
                <td class="py-3 pr-3">サイト表示・不正利用防止に必要な技術情報</td>
                <td class="py-3 pr-3">セッション</td>
                <td class="py-3">不要</td>
              </tr>
              <tr class="border-b border-[var(--line)] align-top">
                <td class="py-3 pr-3">
                  <span class="font-medium">統計・マーケティング</span>
                  <br />
                  <span class="text-xs text-[var(--muted-fg)]">任意</span>
                </td>
                <td class="py-3 pr-3">
                  現状、第三者トラッキングは未導入。将来導入する場合は同意後のみ有効化します。
                </td>
                <td class="py-3 pr-3">最大13か月</td>
                <td class="py-3">必要</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">3. 同意の管理</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-[var(--body)]">
          <li>初回訪問時にバナーで同意または拒否を選択できます（同等の操作で選択可能）。</li>
          <li>本ページ上部からいつでも選択を変更できます。</li>
          <li>拒否しても、サイトの閲覧および必須機能は引き続きご利用いただけます。</li>
          <li>ブラウザ設定からクッキーを削除することもできます。</li>
        </ul>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">4. 詳細情報</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          個人データの取扱い全般については
          <NuxtLink to="/privacy" class="text-[var(--teal)] underline underline-offset-2">プライバシーポリシー</NuxtLink>
          をご覧ください。CNILのクッキーに関する情報：
          <a
            href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--teal)] underline underline-offset-2"
          >cnil.fr</a>
        </p>
      </section>
    </article>
  </div>
</template>
