<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const email = computed(() => cms.value?.settings?.contactEmail || 'info@hmiparis.com')
const phone = computed(() => cms.value?.settings?.contactPhone || '+33 1 84 00 00 00')
const location = computed(() => cms.value?.settings?.studioLocation || 'Paris, France')
const updated = '2026年7月16日 / 16 juillet 2026'

useSeoMeta({
  title: 'プライバシーポリシー｜Politique de confidentialité — HMI Paris',
  description:
    'HMI Parisの個人情報保護方針（RGPD / フランスCNIL準拠）。Politique de confidentialité conforme au RGPD.',
})
</script>

<template>
  <div>
    <PageHero
      title="プライバシーポリシー"
      eyebrow="Politique de confidentialité · RGPD"
      image="/images/paris-placeholder.svg"
    >
      <p class="text-lg text-white/95">
        個人データの取扱いについて（日仏バイリンガル）。最終更新：{{ updated }}
      </p>
    </PageHero>

    <article class="container-site max-w-3xl py-16 sm:py-20">
      <p class="text-sm leading-relaxed text-[var(--muted-fg)]">
        本方針は、フランスにおける適用法令（特に<strong>Règlement (UE) 2016/679 — RGPD</strong>および
        <strong>loi Informatique et Libertés</strong>）ならびにCNILの指針に沿って作成しています。
        サイト表示言語は主に日本語ですが、法的義務に関する説明はフランス語でも記載します。
      </p>

      <div class="wa-divider my-10" />

      <section class="space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">1. 管理者 / Responsable du traitement</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          個人データの管理者は <strong>HMI Paris</strong>（以下「当社」）です。
        </p>
        <ul class="list-disc space-y-1 pl-5 text-sm text-[var(--body)]">
          <li>所在地 / Adresse : {{ location }}</li>
          <li>メール / E-mail : <a :href="`mailto:${email}`" class="text-[var(--teal)]">{{ email }}</a></li>
          <li>電話 / Téléphone : {{ phone }}</li>
        </ul>
        <p class="text-xs text-[var(--muted-fg)]">
          Mentions à compléter : forme juridique, SIRET, numéro de TVA intracommunautaire le cas échéant.
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">2. 収集するデータ / Données collectées</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          当社は、サービス提供に必要な範囲で次のデータを処理することがあります。
        </p>
        <ul class="list-disc space-y-2 pl-5 text-sm text-[var(--body)]">
          <li>氏名、メールアドレス、電話番号（お問い合わせ・予約・決済時）</li>
          <li>旅行希望・メッセージ内容</li>
          <li>支払い関連情報（Stripe経由。カード番号は当社サーバーに保存しません）</li>
          <li>技術データ（IPアドレス、ブラウザ情報、クッキー同意の選択など）</li>
        </ul>
        <p class="text-sm leading-relaxed text-[var(--muted-fg)]">
          Nous ne collectons que les données nécessaires à la finalité poursuivie (minimisation des données).
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">3. 利用目的と根拠 / Finalités et bases légales</h2>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr class="border-b border-[var(--line)] text-[var(--muted-fg)]">
                <th class="py-3 pr-4 font-medium">目的</th>
                <th class="py-3 pr-4 font-medium">法的根拠 (RGPD)</th>
              </tr>
            </thead>
            <tbody class="text-[var(--body)]">
              <tr class="border-b border-[var(--line)]">
                <td class="py-3 pr-4">お問い合わせ・見積り対応</td>
                <td class="py-3 pr-4">正当な利益 / 契約前の措置 (art. 6.1.b / f)</td>
              </tr>
              <tr class="border-b border-[var(--line)]">
                <td class="py-3 pr-4">ツアー予約・パッケージ販売・決済</td>
                <td class="py-3 pr-4">契約の履行 (art. 6.1.b)</td>
              </tr>
              <tr class="border-b border-[var(--line)]">
                <td class="py-3 pr-4">会計・税務上の記録保持</td>
                <td class="py-3 pr-4">法的義務 (art. 6.1.c)</td>
              </tr>
              <tr class="border-b border-[var(--line)]">
                <td class="py-3 pr-4">サイト改善のための統計（同意時のみ）</td>
                <td class="py-3 pr-4">同意 (art. 6.1.a)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">4. 保存期間 / Durées de conservation</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-[var(--body)]">
          <li>お問い合わせ：対応完了後、最大3年（再連絡の可能性を考慮）</li>
          <li>契約・請求関連：会計義務に従い、原則10年</li>
          <li>決済記録（Order）：会計・顧客対応に必要な期間</li>
          <li>クッキー同意の記録：最大13か月（CNIL推奨に準拠）</li>
        </ul>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">5. 共有先 / Destinataires</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          データは、上記目的のために必要な場合に限り、次の者と共有されることがあります。
        </p>
        <ul class="list-disc space-y-2 pl-5 text-sm text-[var(--body)]">
          <li>決済代行：<strong>Stripe</strong>（カード決済処理）</li>
          <li>ホスティング・CMS運用に必要な技術提供者</li>
          <li>法令に基づく公的機関からの正当な要請がある場合</li>
        </ul>
        <p class="text-sm text-[var(--muted-fg)]">
          当社は、マーケティング目的で個人データを第三者に販売しません。
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">6. 国外移転 / Transferts hors UE</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          一部のサービス提供者（例：Stripe）はEU域外でデータを処理する場合があります。
          その場合、標準契約条項（SCC）など、RGPDが認める適切な保護措置に依拠します。
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">7. あなたの権利 / Vos droits</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          RGPDに基づき、アクセス、訂正、削除、処理の制限、異議、データポータビリティ、
          同意の撤回（同意に基づく処理の場合）を請求できます。
        </p>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          請求先：
          <a :href="`mailto:${email}`" class="text-[var(--teal)]">{{ email }}</a>
        </p>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          不服がある場合、フランス監督機関
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--teal)] underline underline-offset-2"
          >CNIL</a>
          （Commission Nationale de l’Informatique et des Libertés）へ申立を行う権利があります。
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">8. クッキー / Cookies</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          クッキーの種類・保存期間・管理方法は、
          <NuxtLink to="/cookies" class="text-[var(--teal)] underline underline-offset-2">クッキーポリシー</NuxtLink>
          をご参照ください。必須クッキー以外は、同意がある場合にのみ使用します。
        </p>
      </section>

      <section class="mt-12 space-y-4">
        <h2 class="font-display text-2xl text-[var(--heading)]">9. 本方針の更新</h2>
        <p class="text-sm leading-relaxed text-[var(--body)]">
          法令やサービス内容の変更に応じて本方針を更新することがあります。重要な変更がある場合は、本ページにてお知らせします。
        </p>
      </section>

      <p class="mt-14 text-xs text-[var(--muted-fg)]">
        Dernière mise à jour : {{ updated }}
      </p>
    </article>
  </div>
</template>
