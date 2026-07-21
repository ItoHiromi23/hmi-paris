<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { cms, cmsLocale, sync } = useCmsBundle()

await sync()

const s = computed(() =>
  cmsLocale.value === locale.value ? cms.value?.settings : null,
)

const brandName = computed(() => (s.value?.brandName || '').trim() || 'HMI')
const brandTagline = computed(() => (s.value?.brandTagline || '').trim() || 'paris')
const footerBlurb = computed(
  () => (s.value?.footerBlurb || '').trim() || t('footer.blurb'),
)
const email = computed(() => s.value?.contactEmail || 'info@hmiparis.com')
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-[var(--void)] text-white">
    <div class="container-site grid gap-12 py-16 md:grid-cols-3 md:gap-10">
      <div>
        <p class="text-2xl font-semibold tracking-[0.12em]">{{ brandName }}</p>
        <p class="font-display mt-1 text-lg italic text-[#5eead4]">
          {{ brandTagline }}
        </p>
        <p class="mt-5 max-w-sm text-sm leading-relaxed text-white/85">
          {{ footerBlurb }}
        </p>
      </div>

      <div>
        <p class="font-display text-xl">{{ t('footer.services') }}</p>
        <ul class="mt-4 space-y-1 text-sm text-white/85">
          <li>
            <NuxtLink :to="localePath('/#services')" class="footer-link">
              {{ t('footer.dayTours') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/#services')" class="footer-link">
              {{ t('footer.carGuide') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/#services')" class="footer-link">
              {{ t('footer.airport') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/packages')" class="footer-link">
              {{ t('footer.tourList') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/events')" class="footer-link">
              {{ t('footer.specialEvents') }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <p class="font-display text-xl">{{ t('footer.company') }}</p>
        <ul class="mt-4 space-y-1 text-sm text-white/85">
          <li>
            <NuxtLink :to="localePath('/about')" class="footer-link">
              {{ t('footer.about') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/contact')" class="footer-link">
              {{ t('footer.contact') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/privacy')" class="footer-link">
              {{ t('footer.privacy') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/cookies')" class="footer-link">
              {{ t('footer.cookies') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/legal')" class="footer-link">
              {{ t('footer.legal') }}
            </NuxtLink>
          </li>
          <li>
            <a :href="`mailto:${email}`" class="footer-link">
              {{ t('footer.email') }}: {{ email }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div
        class="container-site flex flex-col gap-3 py-4 text-xs tracking-wide text-white/75 sm:flex-row sm:items-center sm:justify-between"
      >
        <span class="py-2">{{ t('footer.rights', { year }) }}</span>
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
          <NuxtLink :to="localePath('/privacy')" class="footer-link-bar">
            {{ t('footer.privacy') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/cookies')" class="footer-link-bar">
            {{ t('footer.cookies') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/legal')" class="footer-link-bar">
            {{ t('footer.legal') }}
          </NuxtLink>
          <span class="px-2 py-3">{{ t('footer.tagline') }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  @apply inline-flex min-h-12 items-center py-3 transition hover:text-white;
}

.footer-link-bar {
  @apply inline-flex min-h-12 items-center px-3 py-3 transition hover:text-white;
}
</style>
