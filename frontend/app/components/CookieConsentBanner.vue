<script setup lang="ts">
const { showBanner, ready, load, acceptAll, refuseAll } = useCookieConsent()

onMounted(() => {
  load()
})
</script>

<template>
  <div
    v-if="ready && showBanner"
    class="fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-6"
    role="dialog"
    aria-modal="false"
    aria-labelledby="cookie-banner-title"
    aria-describedby="cookie-banner-desc"
  >
    <div
      class="mx-auto max-w-3xl border border-[var(--line)] bg-white p-5 shadow-[0_20px_50px_rgba(18,32,51,0.18)] sm:p-7"
    >
      <p class="section-label">Cookies · クッキー</p>
      <h2
        id="cookie-banner-title"
        class="font-display mt-2 text-xl text-[var(--heading)] sm:text-2xl"
      >
        クッキーの利用について / Gestion des cookies
      </h2>
      <p id="cookie-banner-desc" class="mt-3 text-sm leading-relaxed text-[var(--body)]">
        当サイトでは、サイトの正常な動作に必要なクッキーを使用します。統計・マーケティング用クッキーは、
        フランスCNILの指針に従い、<strong class="font-semibold text-[var(--heading)]">同意いただいた場合のみ</strong>使用します。
        詳細は
        <NuxtLink to="/cookies" class="text-[var(--teal)] underline underline-offset-2">クッキーポリシー</NuxtLink>
        および
        <NuxtLink to="/privacy" class="text-[var(--teal)] underline underline-offset-2">プライバシーポリシー</NuxtLink>
        をご覧ください。
      </p>
      <p class="mt-2 text-xs leading-relaxed text-[var(--muted-fg)]">
        Conformément aux recommandations de la CNIL, vous pouvez accepter ou refuser les cookies non essentiels.
        Le refus n’empêche pas la navigation sur le site.
      </p>

      <!-- Equal prominence Accept / Refuse (CNIL) -->
      <div class="mt-5 grid gap-3 sm:grid-cols-2">
        <button type="button" class="btn-ghost-dark !rounded-sm !py-3" @click="refuseAll">
          すべて拒否 / Tout refuser
        </button>
        <button type="button" class="btn-primary !rounded-sm !py-3" @click="acceptAll">
          すべて同意 / Tout accepter
        </button>
      </div>
      <p class="mt-3 text-center text-xs text-[var(--muted-fg)]">
        <NuxtLink to="/cookies" class="underline underline-offset-2 hover:text-[var(--teal)]">
          設定の詳細を見る · En savoir plus
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
