<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    class="relative inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="props.underline ? 'text-white' : 'text-gray-400'"
    @click="emits('click')"
  >
    {{ label }}
    <span v-if="props.underline" class="absolute bottom-1 left-3 h-0.5 w-4/5 bg-current" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  underline?: boolean
  disabled?: boolean
  label: string
}>()

const emits = defineEmits(['click'])
</script>
