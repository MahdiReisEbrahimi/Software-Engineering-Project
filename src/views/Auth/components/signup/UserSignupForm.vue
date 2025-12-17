<template>
  <div>
    <h2
      class="text-2xl font-bold text-center text-white mb-5 flex justify-center gap-2 items-center"
    >
      {{ $t('auth.signup') }}
    </h2>

    <el-form ref="formRef" :model="numberValidateForm" label-position="top" class="space-y-7">
      <!-- Email -->
      <el-form-item
        :label="t('auth.email')"
        prop="email"
        :rules="[{ validator: emailValidator, trigger: 'blur' }]"
      >
        <el-input
          v-model="numberValidateForm.email"
          placeholder="ex@example.com"
          class="rounded-lg"
          @keydown.enter.prevent="submitForm(formRef)"
        />
      </el-form-item>

      <!-- Password -->
      <el-form-item
        :label="t('auth.password')"
        prop="password"
        :rules="[{ validator: passwordValidator, trigger: 'blur' }]"
      >
        <el-input
          v-model="numberValidateForm.password"
          type="password"
          show-password
          :placeholder="t('auth.hints.password')"
          class="rounded-lg"
          @keydown.enter.prevent="submitForm(formRef)"
        />
      </el-form-item>

      <!-- Confirm Password -->
      <el-form-item
        :label="t('auth.passwordConfirm')"
        prop="confirmPassword"
        :rules="[{ validator: confirmPasswordValidator, trigger: 'blur' }]"
      >
        <el-input
          v-model="numberValidateForm.confirmPassword"
          type="password"
          :placeholder="t('auth.hints.passwordConfirm')"
          class="rounded-lg"
          @keydown.enter.prevent="submitForm(formRef)"
        />
      </el-form-item>
      <!-- Buttons -->
      <div class="flex gap-2">
        <el-button type="primary" :loading="isLoading" @click="submitForm(formRef)">
          {{ $t('auth.login') }}
        </el-button>
        <el-button @click="resetForm(formRef)"> {{ $t('auth.reset') }} </el-button>
      </div>
    </el-form>
    <div class="flex items-center justify-center mt-3">
      <button @click="openLowyerSignupForm" class="text-gray-400 text-xs">
        <u>وکیل هستم</u>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance, FormItemRule } from 'element-plus'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['lowyerSingupClick'])

const { t } = useI18n()
const formRef = ref<FormInstance>()

const numberValidateForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})
const isLoading = ref(false)

const emailValidator: FormItemRule['validator'] = (rule, value, callback) => {
  if (!value) {
    callback(new Error(t('auth.errors.emailRequired')))
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    callback(new Error(t('auth.errors.enterValidEmail')))
  } else {
    callback()
  }
}

const passwordValidator: FormItemRule['validator'] = (rule, value, callback) => {
  if (!value) {
    callback(new Error(t('auth.errors.passRequired')))
  } else if (value.toString().length < 8) {
    callback(new Error(t('auth.errors.passLength')))
  } else {
    callback()
  }
}

const confirmPasswordValidator: FormItemRule['validator'] = (rule, value, callback) => {
  if (!value) {
    callback(new Error(t('auth.errors.confirmPassRequired')))
  } else if (value !== numberValidateForm.password) {
    callback(new Error(t('auth.errors.passwordsDoesNotMatch')))
  } else {
    callback()
  }
}

const submitForm = (formEl: FormInstance | undefined) => {
  isLoading.value = true
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!', numberValidateForm)
    } else {
      console.log('error submit!')
    }

    setTimeout(() => {
      isLoading.value = false
    }, 500)
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

function openLowyerSignupForm() {
  emit('lowyerSingupClick')
}
</script>

<style scoped>
::v-deep .el-form .el-form-item__label {
  color: white;
}

::v-deep .el-input__inner::placeholder {
  font-size: smaller;
}
</style>
