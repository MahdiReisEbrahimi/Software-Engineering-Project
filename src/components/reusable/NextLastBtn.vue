<template>
  <div class="flex items-center">
    <button
      @click="handleClick"
      :disabled="props.disabled"
      :class="
        props.disabled
          ? 'text-gray-500 cursor-not-allowed'
          : 'text-white hover:bg-gray-600 duration-500'
      "
      class="rounded-lg p-2 mx-1 mt-1"
    >
      <BsChevronLeft v-if="props.direction === 'left'" class="text-3xl" />
      <BsChevronRight v-if="props.direction === 'right'" class="text-3xl" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { BsChevronLeft, BsChevronRight } from '@kalimahapps/vue-icons'
const props = defineProps({
  direction: {
    required: true,
    type: String,
  },
  disabled: {
    type: Boolean,
  },
})

const emit = defineEmits<{
  (e: 'click', direction: string): void
}>()

const handleClick = () => {
  emit('click', props.direction)
}
</script>
