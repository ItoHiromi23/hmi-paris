<script setup lang="ts">
import type { CmsBundle } from '~/types/cms'

const props = defineProps<{
  embedded?: boolean
}>()

const cms = inject<Ref<CmsBundle | null>>('cms', ref(null))
const s = computed(() => cms.value?.settings)

const route = useRoute()
const menuOpen = ref(false)

const links = computed(() => {
  const rows = [
    { to: '/', label: s.value?.navHome?.trim() || '', home: true },
    { to: '/#event', label: s.value?.navEvent?.trim() || '' },
    { to: '/#services', label: s.value?.navServices?.trim() || '' },
    { to: '/about', label: s.value?.navAbout?.trim() || '' },
    { to: '/contact', label: s.value?.navContact?.trim() || '' },
  ]
  return rows.filter((link) => link.label)
})

const menuLabel = computed(() => s.value?.navMenu?.trim() || '')
const isHome = computed(() => route.path === '/' || route.path === '')

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header
    class="z-50 border-b border-[var(--line)] bg-[rgba(246,242,233,0.86)] backdrop-blur-[10px]"
    :class="props.embedded ? 'relative w-full' : 'sticky top-0'"
  >
    <div class="wrap flex h-[74px] items-center justify-between">
      <NuxtLink to="/" class="relative z-10 flex flex-col leading-none">
        <img
          :src="optSrc('logo-header', 200)"
          :srcset="optSrcSet('logo-header', [160, 200, 320])"
          sizes="160px"
          alt="HMI Paris"
          class="block h-7 w-auto md:h-[28px]"
          width="160"
          height="28"
          fetchpriority="low"
          decoding="async"
        />
      </NuxtLink>

      <nav v-if="links.length" class="hidden items-center gap-[34px] lg:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="relative px-0 py-1.5 text-[14px] tracking-[0.14em] text-[var(--ink)] transition after:absolute after:bottom-0 after:left-0 after:right-full after:h-px after:bg-[var(--brass)] after:transition-[right] after:duration-300 hover:after:right-0"
          :class="
            (link.home && isHome) || route.path === link.to
              ? 'text-[var(--brass-text)] after:!right-0'
              : link.to === '/#event'
                ? 'text-[var(--brass-text)]'
                : ''
          "
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <button
        v-if="menuLabel"
        type="button"
        class="relative z-10 flex h-11 w-[42px] flex-col items-center justify-center lg:hidden"
        :aria-expanded="menuOpen"
        :aria-label="menuLabel"
        @click="menuOpen = !menuOpen"
      >
        <span
          class="mb-1.5 block h-[1.5px] w-5 bg-[var(--ink)] transition"
          :class="menuOpen && 'translate-y-[7px] rotate-45'"
        />
        <span
          class="mb-1.5 block h-[1.5px] w-5 bg-[var(--ink)] transition"
          :class="menuOpen && 'opacity-0'"
        />
        <span
          class="block h-[1.5px] w-5 bg-[var(--ink)] transition"
          :class="menuOpen && '-translate-y-[7px] -rotate-45'"
        />
      </button>
    </div>

    <div v-if="menuOpen" class="border-t border-[var(--line)] bg-[var(--paper)] lg:hidden">
      <nav class="flex flex-col">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="border-b border-[var(--line)] px-7 py-4 text-[14px] tracking-[0.1em] text-[var(--ink)]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
