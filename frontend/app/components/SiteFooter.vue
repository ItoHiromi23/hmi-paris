<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)
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
        <p class="font-display text-xl">サービス</p>
        <ul class="mt-5 space-y-3 text-sm text-white/85">
          <li><a href="/#services" class="hover:text-white">観光ツアー</a></li>
          <li><a href="/#services" class="hover:text-white">専用車＆ガイド</a></li>
          <li><a href="/#services" class="hover:text-white">空港送迎</a></li>
          <li><NuxtLink to="/packages" class="hover:text-white">ツアー一覧</NuxtLink></li>
          <li><NuxtLink to="/events" class="hover:text-white">特別イベント</NuxtLink></li>
        </ul>
      </div>

      <div>
        <p class="font-display text-xl">会社情報</p>
        <ul class="mt-5 space-y-3 text-sm text-white/85">
          <li><NuxtLink to="/about" class="hover:text-white">会社概要</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-white">お問い合わせ</NuxtLink></li>
          <li><NuxtLink to="/privacy" class="hover:text-white">プライバシーポリシー</NuxtLink></li>
          <li><NuxtLink to="/cookies" class="hover:text-white">クッキーポリシー</NuxtLink></li>
          <li><NuxtLink to="/legal" class="hover:text-white">Mentions légales</NuxtLink></li>
          <li>
            <a
              :href="`mailto:${s?.contactEmail || 'info@hmiparis.com'}`"
              class="hover:text-white"
            >
              メール: {{ s?.contactEmail || 'info@hmiparis.com' }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div
        class="container-site flex flex-col gap-3 py-6 text-xs tracking-wide text-white/75 sm:flex-row sm:items-center sm:justify-between"
      >
        <span>© {{ new Date().getFullYear() }} HMI Paris. Tous droits réservés.</span>
        <div class="flex flex-wrap gap-x-4 gap-y-1">
          <NuxtLink to="/privacy" class="hover:text-white">Confidentialité</NuxtLink>
          <NuxtLink to="/cookies" class="hover:text-white">Cookies</NuxtLink>
          <NuxtLink to="/legal" class="hover:text-white">Mentions légales</NuxtLink>
          <span>心を込めたおもてなし ・ パリ在住日本人スタッフ</span>
        </div>
      </div>
    </div>
  </footer>
</template>
