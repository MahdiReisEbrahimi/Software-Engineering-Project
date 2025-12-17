<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    class="relative inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200text-gray-800 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    @click="emits('click')"
  >
    <slot />
    <span v-if="props.underline" class="absolute -bottom-1 left-0 h-0.5 w-full bg-current" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  underline?: boolean
  disabled?: boolean
}>()

const emits = defineEmits(['click'])
</script>
