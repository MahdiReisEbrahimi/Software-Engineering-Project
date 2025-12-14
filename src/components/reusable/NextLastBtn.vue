<template>
  <div class="flex items-center justify-center flex-col mx-1">
    <button class="">
      <AkCircleChevronLeftFill v-if="props.direction === 'left'" class="text-3xl" />
      <AkCircleChevronRightFill v-if="props.direction === 'right'" class="text-3xl" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { AkCircleChevronLeftFill , AkCircleChevronRightFill } from '@kalimahapps/vue-icons'

const props = defineProps({
  direction: {
    required: true,
    type: String,
  },
})
</script>
