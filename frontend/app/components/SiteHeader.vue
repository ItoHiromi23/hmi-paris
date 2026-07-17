<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)
const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))

const brand = computed(() => cms.value?.settings.brandName || 'HMI')
const tagline = computed(() => cms.value?.settings.brandTagline || 'paris')
const solid = computed(() => scrolled.value || menuOpen.value)

const links = computed(() => [
  { to: localePath('/packages'), label: t('nav.tours') },
  { to: localePath('/events'), label: t('nav.events') },
  { to: localePath('/#services'), label: t('nav.styles') },
  { to: localePath('/#why'), label: t('nav.why') },
  { to: localePath('/about'), label: t('nav.about') },
  { to: localePath('/contact'), label: t('nav.contact') },
])

const availableLocales = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).map((l) => ({
    code: l.code,
    name: l.code === 'en' ? t('lang.en') : t('lang.ja'),
  })),
)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-400"
    :class="
      solid
        ? 'border-b border-[var(--line)] bg-white/95 shadow-lg shadow-[var(--void)]/5 backdrop-blur-xl'
        : 'bg-transparent'
    "
  >
    <div class="container-wide flex h-[4.5rem] items-center justify-between lg:h-20">
      <NuxtLink :to="localePath('/')" class="relative z-10 flex items-baseline gap-2">
        <span
          class="text-xl font-bold tracking-[0.08em] sm:text-2xl"
          :class="solid ? 'text-[var(--heading)]' : 'text-white'"
        >
          {{ brand }}
        </span>
        <span
          class="font-display text-base italic"
          :class="solid ? 'text-[var(--teal)]' : 'text-[var(--teal-bright)]'"
        >
          {{ tagline }}
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-6 xl:gap-8 lg:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-[12px] font-semibold uppercase tracking-[0.16em] transition"
          :class="
            solid
              ? 'text-[var(--body)] hover:text-[var(--teal)]'
              : 'text-white/95 hover:text-white'
          "
        >
          {{ link.label }}
        </NuxtLink>

        <div
          class="flex items-center overflow-hidden rounded-full border text-[11px] font-semibold uppercase tracking-[0.14em]"
          :class="
            solid
              ? 'border-[var(--line)] bg-white text-[var(--heading)]'
              : 'border-white/40 bg-[var(--void)]/25 text-white'
          "
          role="group"
          :aria-label="t('lang.label')"
        >
          <NuxtLink
            v-for="item in availableLocales"
            :key="item.code"
            :to="switchLocalePath(item.code)"
            class="px-3 py-1.5 transition"
            :class="
              locale === item.code
                ? solid
                  ? 'bg-[var(--teal)] text-white'
                  : 'bg-white text-[var(--heading)]'
                : solid
                  ? 'hover:bg-[var(--paper)]'
                  : 'hover:bg-white/10'
            "
            :aria-current="locale === item.code ? 'true' : undefined"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <NuxtLink :to="localePath('/packages')" class="btn-primary !px-5 !py-2.5 text-[11px]">
          {{ t('nav.findTours') }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2 lg:hidden">
        <div
          class="flex items-center overflow-hidden rounded-full border text-[10px] font-semibold uppercase tracking-[0.12em]"
          :class="
            solid
              ? 'border-[var(--line)] bg-white text-[var(--heading)]'
              : 'border-white/40 bg-[var(--void)]/25 text-white'
          "
          role="group"
          :aria-label="t('lang.label')"
        >
          <NuxtLink
            v-for="item in availableLocales"
            :key="item.code"
            :to="switchLocalePath(item.code)"
            class="px-2.5 py-1.5 transition"
            :class="
              locale === item.code
                ? solid
                  ? 'bg-[var(--teal)] text-white'
                  : 'bg-white text-[var(--heading)]'
                : ''
            "
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <button
          type="button"
          class="relative z-10 flex h-11 w-11 items-center justify-center"
          :aria-expanded="menuOpen"
          :aria-label="t('nav.toggleMenu')"
          @click="menuOpen = !menuOpen"
        >
          <div class="flex w-6 flex-col gap-1.5">
            <span
              class="block h-px w-full transition"
              :class="[solid ? 'bg-[var(--heading)]' : 'bg-white', menuOpen && 'translate-y-[7px] rotate-45']"
            />
            <span
              class="block h-px w-full transition"
              :class="[solid ? 'bg-[var(--heading)]' : 'bg-white', menuOpen && 'opacity-0']"
            />
            <span
              class="block h-px w-full transition"
              :class="[solid ? 'bg-[var(--heading)]' : 'bg-white', menuOpen && '-translate-y-[7px] -rotate-45']"
            />
          </div>
        </button>
      </div>
    </div>

    <div
      v-if="menuOpen"
      class="border-t border-[var(--line)] bg-white lg:hidden"
    >
      <nav class="container-wide flex flex-col gap-1 py-5">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--heading)]"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink :to="localePath('/packages')" class="btn-primary mt-3 w-full">
          {{ t('nav.findTours') }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
