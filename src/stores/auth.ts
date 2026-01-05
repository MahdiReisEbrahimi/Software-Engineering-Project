import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IdentityRuleForm, JobRuleForm, LowyerSignupForm } from '@/Types/User'

export const useAuthStore = defineStore('auth', () => {
  // --- STATE ---
  const currentForm = ref<'login' | 'userSignup' | 'lowyerSignup'>('login')
  const currentLowyerSignupForm = ref<'identity' | 'job' | 'security'>('identity')

  const isLoading = ref(false)

  const lowyerSignupFormData = ref<LowyerSignupForm>({
    name: null,
    fatherName: null,
    nationalityCode: null,
    birthDate: null,
    sex: null,
    experience: null,
    img: null,
    services: [],
    coordinates: null,
    password: null,
  })

  // --- ACTIONS ---
  function changeAuthPage(val: 'login' | 'userSignup' | 'lowyerSignup') {
    currentForm.value = val
  }

  function changeLowyerSignupForm(val: 'identity' | 'job' | 'security') {
    currentLowyerSignupForm.value = val
  }

  function setLowyerSignupIdentityInfo(info: IdentityRuleForm) {
    lowyerSignupFormData.value = { ...lowyerSignupFormData.value, ...info }
    console.log(lowyerSignupFormData.value);
  }

  function setLowyerSignupJobInfo(info: JobRuleForm) {
    lowyerSignupFormData.value.experience = info.experience
    lowyerSignupFormData.value.img = info.img
    lowyerSignupFormData.value.services = info.services
    lowyerSignupFormData.value.coordinates = info.coordinates
  }

  function setLowyerSignupSecurityInfo(password: string) {
    lowyerSignupFormData.value.password = password
    console.log(lowyerSignupFormData.value)
  }

  //send data to server
  async function submitLowyerSignup() {
    isLoading.value = true
    try {
      console.log('در حال ارسال داده‌ها به سرور...', lowyerSignupFormData.value)
    } catch (error) {
      console.error('خطا در ثبت نام:', error)
    } finally {
      isLoading.value = false
    }
  }

  function resetLawyerForm() {
    lowyerSignupFormData.value = {
        name: null, fatherName: null, nationalityCode: null, birthDate: null,
        sex: null, experience: null, img: null , services: [], coordinates: null, password: null
    }
  }

  return {
    currentForm,
    currentLowyerSignupForm,
    lowyerSignupFormData,
    isLoading,
    changeAuthPage,
    changeLowyerSignupForm,
    setLowyerSignupIdentityInfo,
    setLowyerSignupJobInfo,
    setLowyerSignupSecurityInfo,
    submitLowyerSignup,
    resetLawyerForm
  }
})
