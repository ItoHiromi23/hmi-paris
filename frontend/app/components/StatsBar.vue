<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="bg-[var(--teal)] py-10 text-white sm:py-12">
    <div class="container-wide">
      <div class="reveal grid gap-8 sm:grid-cols-3 sm:gap-6">
        <div>
          <p class="text-3xl font-semibold tracking-tight sm:text-4xl">{{ t('stats.groupSize') }}</p>
          <p class="mt-2 text-sm font-medium text-white/90">{{ t('stats.private') }}</p>
        </div>
        <div>
          <p class="text-3xl font-semibold tracking-tight sm:text-4xl">{{ t('stats.langs') }}</p>
          <p class="mt-2 text-sm font-medium text-white/90">{{ t('stats.staff') }}</p>
        </div>
        <div>
          <p class="text-3xl font-semibold tracking-tight sm:text-4xl">{{ t('stats.airports') }}</p>
          <p class="mt-2 text-sm font-medium text-white/90">{{ t('stats.transfer') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
