<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
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
      <p class="section-label">{{ t('cookies.label') }}</p>
      <h2
        id="cookie-banner-title"
        class="font-display mt-2 text-xl text-[var(--heading)] sm:text-2xl"
      >
        {{ t('cookies.title') }}
      </h2>
      <p id="cookie-banner-desc" class="mt-3 text-sm leading-relaxed text-[var(--body)]">
        {{ t('cookies.body') }}
        <NuxtLink
          :to="localePath('/cookies')"
          class="text-[var(--teal)] underline underline-offset-2"
        >
          {{ t('cookies.policy') }}
        </NuxtLink>
        {{ t('cookies.and') }}
        <NuxtLink
          :to="localePath('/privacy')"
          class="text-[var(--teal)] underline underline-offset-2"
        >
          {{ t('cookies.privacy') }}
        </NuxtLink>
        .
      </p>
      <p class="mt-2 text-xs leading-relaxed text-[var(--muted-fg)]">
        {{ t('cookies.frNote') }}
      </p>

      <div class="mt-5 grid gap-3 sm:grid-cols-2">
        <button type="button" class="btn-ghost-dark !rounded-sm !py-3" @click="refuseAll">
          {{ t('cookies.refuse') }}
        </button>
        <button type="button" class="btn-primary !rounded-sm !py-3" @click="acceptAll">
          {{ t('cookies.accept') }}
        </button>
      </div>
      <p class="mt-3 text-center text-xs text-[var(--muted-fg)]">
        <NuxtLink
          :to="localePath('/cookies')"
          class="underline underline-offset-2 hover:text-[var(--teal)]"
        >
          {{ t('cookies.more') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
