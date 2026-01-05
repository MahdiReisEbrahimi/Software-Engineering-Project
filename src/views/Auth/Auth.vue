<template>
  <div
    class="min-h-screen bg-cover flex items-center justify-center flex-col"
    style="background-image: url('/assets/img/background.jpg')"
  >
    <div class="w-5/6 m-auto mt-10 max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg lg:mr-20">
      <LoginForm v-if="currentForm === 'login'" class="hard-comming-Down-animation" />
      <SignupForm
        v-if="currentForm === 'userSignup'"
        class="hard-comming-Down-animation"
      />
      <LowyerSignupPage v-if="currentForm === 'lowyerSignup'" class="hard-comming-Down-animation" />
      <div class="flex items-center justify-center mt-3">
        <button @click="toggleSignupLogin" class="text-gray-400 text-xs">
          <u v-if="currentForm === 'login'">ثبت نام نکرده اید؟</u>
          <u v-if="currentForm !== 'login'">از قبل ثبت نام کرده‌اید؟</u>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './components/LoginForm.vue'
import SignupForm from './components/signup/UserSignupForm.vue'
import LowyerSignupPage from './components/signup/lowyer/LowyerSignupPage.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { currentForm } = storeToRefs(authStore)
const { changeAuthPage } = authStore

function toggleSignupLogin() {
  if(currentForm.value === 'login') changeAuthPage('userSignup')
  else changeAuthPage('login')
}
</script>
