<script setup lang="ts">
const { fetchPackages } = useTourPackages()
const { data: packages, pending } = await useAsyncData(
  'all-packages',
  () => fetchPackages(),
  freshOnNavigate(),
)

useReveal()

useSeoMeta({
  title: 'ツアーを探す — HMI Paris',
  description: 'モンマルトル、マレ、ルーヴル、ヴェルサイユ、セーヌなど、パリのプライベートツアー一覧。',
})
</script>

<template>
  <div>
    <PageHero
      compact
      centered
      title="あなたに合うパリの旅を"
      eyebrow="ツアー一覧"
      image="/images/paris-placeholder.svg"
    >
      <p class="text-white/95">
        人気エリアのプライベート体験からお選びください。ご予約・ご相談もお気軽に。
      </p>
    </PageHero>

    <section class="py-16 sm:py-20">
      <div class="container-wide">
        <p v-if="pending" class="text-[var(--muted-fg)]">読み込み中…</p>
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

    <ContactBanner />
  </div>
</template>
