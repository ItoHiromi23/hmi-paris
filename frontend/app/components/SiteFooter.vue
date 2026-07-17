<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { t } = useI18n()
const localePath = useLocalePath()
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-[var(--void)] text-white">
    <div class="container-site grid gap-12 py-16 md:grid-cols-3 md:gap-10">
      <div>
        <p class="text-2xl font-semibold tracking-[0.12em]">{{ s?.brandName }}</p>
        <p class="font-display mt-1 text-lg italic text-[#5eead4]">
          {{ s?.brandTagline }}
        </p>
        <p class="mt-5 max-w-sm text-sm leading-relaxed text-white/85">
          {{ s?.footerBlurb }}
        </p>
      </div>

      <div>
        <p class="font-display text-xl">{{ t('footer.services') }}</p>
        <ul class="mt-5 space-y-3 text-sm text-white/85">
          <li>
            <NuxtLink :to="localePath('/#services')" class="hover:text-white">
              {{ t('footer.dayTours') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/#services')" class="hover:text-white">
              {{ t('footer.carGuide') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/#services')" class="hover:text-white">
              {{ t('footer.airport') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/packages')" class="hover:text-white">
              {{ t('footer.tourList') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/events')" class="hover:text-white">
              {{ t('footer.specialEvents') }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <p class="font-display text-xl">{{ t('footer.company') }}</p>
        <ul class="mt-5 space-y-3 text-sm text-white/85">
          <li>
            <NuxtLink :to="localePath('/about')" class="hover:text-white">
              {{ t('footer.about') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/contact')" class="hover:text-white">
              {{ t('footer.contact') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/privacy')" class="hover:text-white">
              {{ t('footer.privacy') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/cookies')" class="hover:text-white">
              {{ t('footer.cookies') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/legal')" class="hover:text-white">
              {{ t('footer.legal') }}
            </NuxtLink>
          </li>
          <li>
            <a
              :href="`mailto:${s?.contactEmail || 'info@hmiparis.com'}`"
              class="hover:text-white"
            >
              {{ t('footer.email') }}: {{ s?.contactEmail || 'info@hmiparis.com' }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div
        class="container-site flex flex-col gap-3 py-6 text-xs tracking-wide text-white/75 sm:flex-row sm:items-center sm:justify-between"
      >
        <span>{{ t('footer.rights', { year }) }}</span>
        <div class="flex flex-wrap gap-x-4 gap-y-1">
          <NuxtLink :to="localePath('/privacy')" class="hover:text-white">
            {{ t('footer.privacy') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/cookies')" class="hover:text-white">
            {{ t('footer.cookies') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/legal')" class="hover:text-white">
            {{ t('footer.legal') }}
          </NuxtLink>
          <span>{{ t('footer.tagline') }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>
