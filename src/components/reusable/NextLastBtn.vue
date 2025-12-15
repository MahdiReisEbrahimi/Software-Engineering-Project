<template>
  <div class="flex items-center">
    <button @click="handleClick" class="rounded-lg p-2 mx-1 mt-1 hover:bg-gray-600 duration-500">
      <BsChevronLeft v-if="props.direction === 'left'" class="text-3xl text-white" />
      <BsChevronRight v-if="props.direction === 'right'" class="text-3xl text-white" />
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
})

const emit = defineEmits<{
  (e: 'click', direction: string): void
}>()

const handleClick = () => {
  emit('click', props.direction)
}
</script>
