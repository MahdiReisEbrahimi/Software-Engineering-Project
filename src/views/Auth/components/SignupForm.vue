<template>
  <div>
    <h2
      class="text-2xl font-bold text-center text-white mb-2 flex justify-center gap-2 items-center"
    >
      {{ $t('auth.signup') }}
      <CaUserAvatarFilledAlt v-if="userType === 'user'" />
      <FaUserTie v-if="userType === 'lowyer'" />
      <MdSharpAdminPanelSettings v-if="userType === 'admin'" />
    </h2>
    <div class="flex gap-2 justify-between items-center my-8">
      <p class="text-center text-xs text-gray-300">
        {{ $t('auth.loginCartMessage') }}
      </p>
      <ReusableSelect v-model="userType" :options="options" rtl width="w-28" />
    </div>

    <el-form ref="formRef" :model="numberValidateForm" label-position="top" class="space-y-7">
      <UserFields
        v-model="numberValidateForm"
        :email-validator="emailValidator"
        :password-validator="passwordValidator"
        :confirm-password-validator="confirmPasswordValidator"
        @enter="submitForm(formRef)"
      />

      <div class="flex gap-2">
        <el-button type="primary" @click="submitForm(formRef)">
          {{ $t('auth.login') }}
        </el-button>
        <el-button @click="resetForm(formRef)">
          {{ $t('auth.reset') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance, FormItemRule } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { FaUserTie, CaUserAvatarFilledAlt, MdSharpAdminPanelSettings } from '@kalimahapps/vue-icons'
import ReusableSelect from '@/components/reusable/ReusableSelect.vue'
import type { SelectOption } from '@/components/reusable/ReusableSelect.vue'
import UserFields from './signup/UserFields.vue'

const { t } = useI18n()
const formRef = ref<FormInstance>()

const numberValidateForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})
const userType = ref<'user' | 'lowyer' | 'admin'>('user')

const options: SelectOption[] = [
  { label: 'کاربر عادی', value: 'user', icon: '👤' },
  { label: 'وکیل', value: 'lowyer', icon: '⚖️' },
  { label: 'ادمین', value: 'admin', icon: '🔐' },
]

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

::v-deep .el-input__inner::placeholder {
  font-size: smaller;
}
</style>
