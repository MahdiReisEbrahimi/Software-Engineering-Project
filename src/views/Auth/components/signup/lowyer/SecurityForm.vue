<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    label-position="top"
    dir="rtl"
  >
    <el-form-item :label="$t('auth.password')" prop="password">
      <el-input v-model="ruleForm.password" type="password" show-password />
    </el-form-item>

    <el-form-item :label="$t('auth.acceptPassword')" prop="acceptPassword">
      <el-input v-model="ruleForm.acceptPassword" type="password" show-password />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        {{ $t('auth.submit') }}
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">
        {{ $t('auth.reset') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

interface RuleForm {
password  : string
  acceptPassword: string
}

const authStore = useAuthStore()
const { setLowyerSignupSecurityInfo } = authStore

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive<RuleForm>({
  password: '',
  acceptPassword: '',
})

const passwordStrengthValidator = (_: any, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    callback(new Error('رمز عبور الزامی است'))
    return
  }

  if (value.length < 8) {
    callback(new Error('رمز عبور باید حداقل ۸ کاراکتر باشد'))
    return
  }

  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
    callback(new Error('رمز عبور باید شامل حروف و عدد باشد'))
    return
  }

  callback()
}

const confirmPasswordValidator = (_: any, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    callback(new Error('تکرار رمز عبور الزامی است'))
    return
  }

  if (value !== ruleForm.password) {
    callback(new Error('رمز عبور و تکرار آن یکسان نیستند'))
    return
  }

  callback()
}

const rules: FormRules<RuleForm> = {
  password: [{ validator: passwordStrengthValidator, trigger: 'blur' }],
  acceptPassword: [{ validator: confirmPasswordValidator, trigger: 'blur' }],
}

const submitForm = async (formEl?: FormInstance) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (!valid) return

    setLowyerSignupSecurityInfo(ruleForm.password)
  })
}

const resetForm = (formEl?: FormInstance) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
