<template>
    <div>
    <h2
      class="text-2xl font-bold text-center text-white mb-2 flex justify-center gap-2 items-center"
    >
      {{ $t('auth.login') }}
      <CaUserAvatarFilledAlt v-if="userType === 'user'" />
      <FaUserTie v-if="userType === 'lowyer'" />
      <MdSharpAdminPanelSettings v-if="userType === 'admin'" />
    </h2>
    <div class="flex gap-2 justify-between items-center my-8">
      <p class="text-center text-xs text-gray-300">
        {{ $t('auth.loginCartMessage') }}
      </p>
      <select v-model="userType" class="p-1 rounded-sm bg-gray-300 text-xs">
        <option value="user" class="">
          <span class="text-sm">👤</span>
          کاربر عادی
        </option>
        <option value="lowyer" class="text-xs">
          <span class="text-lg mx-3">⚖ </span>
          <span> وکیل </span>
        </option>
        <option value="admin">🔐 ادمین</option>
      </select>
    </div>

    <el-form
      ref="formRef"
      :model="numberValidateForm"
      label-width="auto"
      label-position="top"
      class="space-y-7"
    >
      <!-- Email Field -->
      <el-form-item
        :label="$t('auth.email')"
        prop="email"
        :rules="[{ validator: emailValidator, trigger: 'blur' }]"
      >
        <el-input
          v-model.number="numberValidateForm.email"
          type="text"
          autocomplete="off"
          placeholder="ex@example.com"
          class="rounded-lg"
          @keydown.enter.prevent="submitForm(formRef)"
        />
      </el-form-item>

      <!-- Password Field -->
      <el-form-item
        :label="$t('auth.password')"
        prop="password"
        :rules="[{ validator: passwordValidator, trigger: 'blur' }]"
      >
        <el-input
          v-model.number="numberValidateForm.password"
          type="password"
          autocomplete="off"
          placeholder="12345678"
          class="rounded-lg"
          show-password
          @keydown.enter.prevent="submitForm(formRef)"
        />
      </el-form-item>

      <!-- Buttons -->
      <div class="flex gap-2">
        <el-button type="primary" @click="submitForm(formRef)">
          {{ $t('auth.login') }}
        </el-button>
        <el-button @click="resetForm(formRef)"> {{ $t('auth.reset') }} </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance, FormItemRule } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { FaUserTie, CaUserAvatarFilledAlt, MdSharpAdminPanelSettings } from '@kalimahapps/vue-icons'

const { t } = useI18n()
const formRef = ref<FormInstance>()

const numberValidateForm = reactive({
  email: '',
  password: '',
})
const userType = ref<'user' | 'lowyer' | 'admin'>('user')

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

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!', numberValidateForm)
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
::v-deep .el-form .el-form-item__label {
  color: white;
}
</style>
