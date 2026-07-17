<script setup lang="ts">
const { t } = useI18n()
const { locale } = useI18n()
const { fetchPackages } = useTourPackages()
const { data: packages, pending } = await useAsyncData(
  () => `all-packages-${locale.value}`,
  () => fetchPackages(),
  { ...freshOnNavigate(), watch: [locale] },
)

useReveal()

useSeoMeta({
  title: () => `${t('nav.findTours')} — HMI Paris`,
  description: () => t('packages.intro'),
})
</script>

<template>
  <div>
    <PageHero
      compact
      centered
      :title="t('packages.title')"
      :eyebrow="t('packages.eyebrow')"
      image="/images/paris-placeholder.svg"
    >
      <p class="text-white/95">
        {{ t('packages.intro') }}
      </p>
    </PageHero>

    <section class="py-16 sm:py-20">
      <div class="container-wide">
        <p v-if="pending" class="text-[var(--muted-fg)]">{{ t('common.loading') }}</p>
        <div v-else class="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PackageCard
            v-for="(pkg, index) in packages"
            :key="pkg.slug"
            :package="pkg"
            :index="index"
          />
        </div>
      </div>
    </section>
  </div>
</template>
