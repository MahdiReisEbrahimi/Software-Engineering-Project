<template>
  <!-- Email -->
  <el-form-item
    :label="t('auth.email')"
    prop="email"
    :rules="[{ validator: emailValidator, trigger: 'blur' }]"
  >
    <el-input
      v-model="model.email"
      placeholder="ex@example.com"
      class="rounded-lg"
      @keydown.enter.prevent="onEnter"
    />
  </el-form-item>

  <!-- Password -->
  <el-form-item
    :label="t('auth.password')"
    prop="password"
    :rules="[{ validator: passwordValidator, trigger: 'blur' }]"
  >
    <el-input
      v-model="model.password"
      type="password"
      show-password
      :placeholder="t('auth.hints.password')"
      class="rounded-lg"
      @keydown.enter.prevent="onEnter"
    />
  </el-form-item>

  <!-- Confirm Password -->
  <el-form-item
    :label="t('auth.passwordConfirm')"
    prop="confirmPassword"
    :rules="[{ validator: confirmPasswordValidator, trigger: 'blur' }]"
  >
    <el-input
      v-model="model.confirmPassword"
      type="password"
      :placeholder="t('auth.hints.passwordConfirm')"
      class="rounded-lg"
      @keydown.enter.prevent="onEnter"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import type { FormItemRule } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const props = defineProps<{
  modelValue: {
    email: string
    password: string
    confirmPassword: string
  }
  emailValidator: FormItemRule['validator']
  passwordValidator: FormItemRule['validator']
  confirmPasswordValidator: FormItemRule['validator']
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
  (e: 'enter'): void
}>()

const onEnter = () => emit('enter')
</script>
