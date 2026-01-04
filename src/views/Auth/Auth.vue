<template>
  <div
    class="min-h-screen bg-cover flex items-center justify-center flex-col"
    style="background-image: url('/assets/img/background.jpg')"
  >
    <div class="w-5/6 m-auto mt-10 max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg lg:mr-20">
      <LoginForm v-show="!showSignup && !showLowyerSignupForm" class="hard-comming-Down-animation" />
      <SignupForm
        v-show="showSignup && !showLowyerSignupForm"
        @lowyerSingupClick="lowyerSingupClickHandle"
        class="hard-comming-Down-animation"
      />
      <LowyerSignupPage v-show="showLowyerSignupForm" class="hard-comming-Down-animation" />
      <div class="flex items-center justify-center mt-3">
        <button @click="toggleSignupLogin" class="text-gray-400 text-xs">
          <u v-if="!showSignup">ثبت نام نکرده اید؟</u>
          <u v-if="showSignup">از قبل ثبت نام کرده‌اید؟</u>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import SignupForm from './components/signup/UserSignupForm.vue'
import LowyerSignupPage from './components/signup/lowyer/LowyerSignupPage.vue'

const showSignup = ref(true)
const showLowyerSignupForm = ref(true)

function lowyerSingupClickHandle() {
  showLowyerSignupForm.value = true
}

function toggleSignupLogin() {
  showSignup.value = showSignup.value === true ? false : true
}
</script>
