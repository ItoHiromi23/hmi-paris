<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <aside
    class="border-y border-[var(--line)] bg-white/80"
    :aria-label="t('omotenashi.aria')"
  >
    <div
      class="container-wide flex flex-col items-center justify-between gap-3 py-3 text-center sm:flex-row sm:text-left"
    >
      <p class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-[var(--heading)]">
        <span class="font-display text-[var(--teal)]">{{ t('omotenashi.welcome') }}</span>
        <span class="hidden text-[var(--line-strong)] sm:inline" aria-hidden="true">｜</span>
        <span class="text-[var(--muted-fg)]">
          {{ t('omotenashi.message') }}
        </span>
      </p>
      <p class="text-[11px] tracking-[0.18em] text-[var(--muted-fg)]">
        {{ t('omotenashi.tags') }}
      </p>
    </div>
  </aside>
</template>
