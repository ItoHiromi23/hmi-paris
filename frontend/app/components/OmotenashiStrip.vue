<script setup lang="ts">
/** Soft omotenashi welcome strip — Japanese cultural familiarity */
</script>

<template>
  <aside
    class="border-y border-[var(--line)] bg-white/80"
    aria-label="おもてなしのご案内"
  >
    <div
      class="container-wide flex flex-col items-center justify-between gap-3 py-3 text-center sm:flex-row sm:text-left"
    >
      <p class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-[var(--heading)]">
        <span class="font-display text-[var(--teal)]">いらっしゃいませ</span>
        <span class="hidden text-[var(--line-strong)] sm:inline" aria-hidden="true">｜</span>
        <span class="text-[var(--muted-fg)]">
          パリ在住の日本人スタッフが、心を込めてお迎えします
        </span>
      </p>
      <p class="text-[11px] tracking-[0.18em] text-[var(--muted-fg)]">
        日本語対応 ・ 安心サポート ・ おもてなし
      </p>
    </div>
  </aside>
</template>
