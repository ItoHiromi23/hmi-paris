<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    light?: boolean
    center?: boolean
  }>(),
  { light: false, center: false },
)
</script>

<template>
  <div :class="center ? 'text-center' : ''">
    <p class="section-label" :class="light && '!text-[var(--teal-bright)]'">
      {{ eyebrow }}
    </p>
    <h2
      class="font-display mt-3 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]"
      :class="light ? 'text-white' : 'text-[var(--heading)]'"
    >
      {{ title }}
    </h2>
    <span
      class="mt-5 inline-block h-px w-14"
      :class="light ? 'bg-[var(--sun)]' : 'bg-[var(--teal)]'"
      aria-hidden="true"
    />
    <div v-if="$slots.default" class="mt-5" :class="center ? 'mx-auto max-w-2xl' : 'max-w-2xl'">
      <slot />
    </div>
  </div>
</template>
