<script setup lang="ts">
defineProps<{
  author: string
  date: string
}>()
</script>

<template>
  <div class="text-sm text-gray-500 flex gap-2">
    <span>{{ author }}</span>
    <span>•</span>
    <span>{{ new Date(date).toLocaleDateString('fa-IR') }}</span>
  </div>
</template>
