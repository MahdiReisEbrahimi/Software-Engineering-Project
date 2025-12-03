<template>
  <div class="bg-pink-200 px-2 w-full flex items-center p-1.5 rounded-lg my-2">
    <!-- prefix icon -->
    <component v-if="props.prefixIcon" :is="icons[props.prefixIcon]" class="text-lg mr-3" />
    <input
      class="rounded-sm border-none bg-pink-200 blur:border-none border border-gray-300 focus:outline-none focus:border-gray-300"
      :type="inputType"
      :placeholder="props.placeHolder"
      v-model.trim="modelValue"
    />

    <!-- show and hide password button -->
    <div
      v-if="props.inputType === 'password'"
      @click="changeShowPassword"
      class="cursor-pointer p-1"
    >
      <BsEyeSlashFill v-show="!showPassword" />
      <BsEyeFill v-show="showPassword" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { MdRoundEmail, BsEyeSlashFill, BsEyeFill } from '@kalimahapps/vue-icons'
import { ref, defineProps } from 'vue'
import type { PropType } from 'vue'

type IconKeys = keyof typeof icons
const props = defineProps({
  inputType: {
    type: String,
    required: true,
  },
  placeHolder: {
    type: String,
    required: true,
  },
  prefixIcon: {
    type: String as PropType<'MdRoundEmail'>,
  },
  postfixIcon: {
    type: String as PropType<'MdRoundEmail'>,
  },
})
const showPassword = ref(false)
let inputType = ref(props.inputType)

const icons = {
  MdRoundEmail: MdRoundEmail,
}

function changeShowPassword() {
  showPassword.value = !showPassword.value
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}
</script>
