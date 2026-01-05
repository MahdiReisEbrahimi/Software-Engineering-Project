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
    <el-form-item :label="$t('auth.name')" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item :label="$t('auth.fatherName')" prop="fatherName">
      <el-input v-model="ruleForm.fatherName" />
    </el-form-item>
    <el-form-item :label="$t('auth.nationalityCode')" prop="nationalityCode">
      <el-input type="text" v-model="ruleForm.nationalityCode" />
    </el-form-item>
    <el-form-item :label="$t('auth.birthDate')" required prop="birthDate">
      <el-date-picker
        v-model="ruleForm.birthDate"
        type="date"
        aria-label="Pick a date"
        placeholder="Pick a date"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item :label="$t('auth.sex')" prop="sex">
      <el-radio-group v-model="ruleForm.sex">
        <el-radio value="man">{{ $t('auth.man') }}</el-radio>
        <el-radio value="woman">{{ $t('auth.woman') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="openNextForm(ruleFormRef)">
        {{ $t('auth.next') }}
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">{{ $t('auth.reset') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { FormInstance, FormRules } from 'element-plus'
import type { IdentityRuleForm } from '@/Types/User'

const authStore = useAuthStore()
const { changeLowyerSignupForm, setLowyerSignupIdentityInfo } = authStore
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<IdentityRuleForm>({
  name: '',
  fatherName: '',
  nationalityCode: null,
  birthDate: null,
  sex: 'man',
})

const rules = reactive<FormRules<IdentityRuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  fatherName: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, message: 'Length should have more than 3 charachters.', trigger: 'blur' },
  ],
  nationalityCode: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
    { min: 10, max: 10, message: 'Wrong nationality code.', trigger: 'blur' },
  ],
  birthDate: [
    {
      type: 'date',
      required: true,
      message: 'Please pick your BirthDate a date',
      trigger: 'change',
    },
  ],
  sex: [
    {
      required: true,
      message: 'Please select your gender',
      trigger: 'change',
    },
  ],
})

const openNextForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      console.log('submit')
      setLowyerSignupIdentityInfo(ruleForm)
      changeLowyerSignupForm('job')
    } else {
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped></style>
