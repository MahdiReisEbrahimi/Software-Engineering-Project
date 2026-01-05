<template>
  <el-form
    ref="jobFormRef"
    style="max-width: 600px"
    :model="jobForm"
    :rules="rules"
    label-width="auto"
    label-position="top"
    dir="rtl"
  >
    <el-form-item :label="$t('auth.experience')" prop="experience">
      <el-input v-model.number="jobForm.experience" type="number" min="0" />
    </el-form-item>

    <el-form-item :label="$t('auth.profileImage')" prop="profileImage">
      <el-upload
        class="avatar-uploader"
        action=""
        :auto-upload="false"
        :limit="1"
        list-type="picture-card"
        :file-list="fileList"
        :on-change="onImageChange"
        :on-remove="onRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>

    <el-form-item :label="$t('auth.services')" prop="services">
      <el-checkbox-group v-model="jobForm.services">
        <el-checkbox label="حقوقی" />
        <el-checkbox label="کیفری" />
        <el-checkbox label="خانواده" />
        <el-checkbox label="ملکی" />
        <el-checkbox label="تجاری" />
      </el-checkbox-group>
    </el-form-item>

    <!-- TODO: Mehdi should add map here... -->
    <el-form-item :label="$t('auth.locationInfo')">
      <el-input disabled :value="`${jobForm.coordinates[0]}, ${jobForm.coordinates[1]}`" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="openNextForm(jobFormRef)">
        {{ $t('auth.next') }}
      </el-button>
      <el-button @click="resetForm(jobFormRef)">
        {{ $t('auth.reset') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type {
  FormInstance,
  FormRules,
  UploadFile,
  UploadUserFile,
} from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import type { JobRuleForm } from '@/Types/User'


const authStore = useAuthStore()
const { changeLowyerSignupForm, setLowyerSignupJobInfo } = authStore

const jobFormRef = ref<FormInstance>()

const jobForm = reactive<JobRuleForm>({
  experience: 0,
  img: null,
  services: [],
  coordinates: [0, 0],
})

const fileList = ref<UploadUserFile[]>([])

const rules = reactive<FormRules<JobRuleForm>>({
  experience: [
    { required: true, message: 'سابقه کاری الزامی است', trigger: 'blur' },
    { type: 'number', min: 0, message: 'عدد معتبر وارد کنید', trigger: 'blur' },
  ],
  services: [
    {
      type: 'array',
      required: true,
      message: 'حداقل یک خدمت را انتخاب کنید',
      trigger: 'change',
    },
  ],
})

const onImageChange = (file: UploadFile) => {
  if (!file.raw) return

  fileList.value = [
    {
      name: file.name,
      url: URL.createObjectURL(file.raw),
    },
  ]

  jobForm.img = file.raw
}

const onRemove = () => {
  fileList.value = []
  jobForm.img = null
}

const openNextForm = async (formEl?: FormInstance) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      setLowyerSignupJobInfo(jobForm)
      changeLowyerSignupForm('security')
    }
  })
}

const resetForm = (formEl?: FormInstance) => {
  if (!formEl) return
  formEl.resetFields()

  fileList.value = []
  jobForm.img = null
  jobForm.coordinates = [0, 0]
}
</script>

