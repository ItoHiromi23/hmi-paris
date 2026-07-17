<script setup lang="ts">
const icons: Record<string, string> = {
  star: 'M12 3l2.09 6.26L20.5 10l-5 4.1L17.18 21 12 17.77 6.82 21 8.5 14.1 3.5 10l6.41-.74L12 3z',
  car: 'M5 16l1.5-4.5h11L19 16M7 16v2m10-2v2M6.5 11.5l1-3h9l1 3M4 16h16',
  plane: 'M10.5 12.5L3 10l1-2 7.5 1.5L20 4l1 1-5.5 9.5L18 21l-2 1-2.5-6.5-6 2.5-1-1 4-5z',
  chat: 'M8 10h.01M12 10h.01M16 10h.01M4 19l2-2H19a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12z',
  plus: 'M12 8v8m-4-4h8m8 0a9 9 0 11-18 0 9 9 0 0118 0z',
}

defineProps<{ name: string }>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.25"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-8 w-8"
    aria-hidden="true"
  >
    <path :d="icons[name] || icons.star" />
  </svg>
</template>
