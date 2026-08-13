<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    class="h-full w-full"
    aria-hidden="true"
  >
    <template v-if="name === 'car'">
      <path d="M8 30v6m32-6v6M7 30l3-10c.7-2 2-3 4-3h20c2 0 3.3 1 4 3l3 10v4H7z" />
      <circle cx="14" cy="34" r="2.5" />
      <circle cx="34" cy="34" r="2.5" />
    </template>
    <template v-else-if="name === 'chat'">
      <path d="M6 12h24v16H16l-6 6v-6H6z" />
      <path d="M22 20h20v12h-6v6l-6-6h-6" />
    </template>
    <template v-else-if="name === 'plus'">
      <circle cx="24" cy="24" r="17" />
      <path d="M24 16v16M16 24h16" />
    </template>
    <template v-else>
      <path d="M24 5l3.4 11.5L39 17l-9 7.4L33 36 24 29l-9 7 3-11.6L9 17l11.6-.5z" />
      <circle cx="24" cy="22" r="3" />
    </template>
  </svg>
</template>
