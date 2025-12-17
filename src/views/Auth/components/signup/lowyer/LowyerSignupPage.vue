<template>
  <div class="flex justify-between text-xs">
    <NextLastBtn direction="right" />
    <ReusableButton :underline="true"> Click Me </ReusableButton>

    <ReusableButton :underline="false" :disabled="false"> Submit </ReusableButton>

    <NextLastBtn direction="left" />
  </div>
</template>

<script setup lang="ts">
import NextLastBtn from '@/components/reusable/NextLastBtn.vue'
import ReusableButton from '@/components/reusable/ReusableButton.vue'
import { ref } from 'vue'

const formType = ref<'identity' | 'job' | 'security'>('identity')
</script>
<style scoped>
.el-button {
  width: 40px;
}
</style>
