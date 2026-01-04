<template>
  <h2 class="text-2xl font-bold text-center text-white mb-5 flex justify-center gap-2 items-center">
    {{ $t('auth.lowyersSingupForm') }}
  </h2>
  <hr class="mb-3" />
  <div class="flex justify-between text-xs w-full">
    <NextLastBtn direction="right" :disabled="formType === 'identity'" @click="nextLastBtnHandle" />
    <div class="flex justify-between">
      <ReusableButton :underline="formType === 'identity'" :label="$t('auth.identityInfo')" />
      <ReusableButton :underline="formType === 'job'" :label="$t('auth.jobInfo')" />
      <ReusableButton
        :underline="formType === 'security'"
        :disabled="false"
        :label="$t('auth.securityInfo')"
      />
    </div>
    <NextLastBtn direction="left" :disabled="formType === 'security'" @click="nextLastBtnHandle" />
  </div>
  <div class="p-2 m-3 rounded-lg">
    <keep-alive>
      <component :is="activeComponent" />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import NextLastBtn from '@/components/reusable/NextLastBtn.vue'
import ReusableButton from '@/components/reusable/ReusableButton.vue'
import { computed, ref, type Component } from 'vue'
import IdentityForm from './IdentityForm.vue'
import JobForm from './JobForm.vue'
import SecurityForm from './SecurityForm.vue'

// ===========types=============
type FormKeys = 'IdentityForm' | 'JobForm' | 'SecurityForm'

// ===========data=============
const formType = ref<'identity' | 'job' | 'security'>('identity')
const components = {
  IdentityForm,
  JobForm,
  SecurityForm,
}

const activeComponent = computed<Component>(() => {
  const key = (formType.value.charAt(0).toUpperCase() +
    formType.value.slice(1) +
    'Form') as FormKeys
  return components[key]
})

// ===========methods=============
function nextLastBtnHandle(direction: string) {
  if (direction === 'right') {
    if (formType.value === 'job') formType.value = 'identity'
    else if (formType.value === 'security') formType.value = 'job'
  } else {
    if (formType.value === 'job') formType.value = 'security'
    else if (formType.value === 'identity') formType.value = 'job'
  }
}
// ===========computed=============

// ============watch==============
</script>
<style scoped></style>
