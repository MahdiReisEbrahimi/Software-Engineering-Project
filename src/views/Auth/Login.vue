<template>
  <div
    class="h-full bg-cover bg-center flex items-center justify-center flex-col"
    style="background-image: url('/assets/img/background.jpg')"
  >
    <div class="w-5/6 m-auto max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg lg:mr-20">
      <LoginForm v-if="!showSignup" />
      <SignupForm v-if="showSignup" />
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
import SignupForm from './components/SignupForm.vue'

const showSignup = ref(false)

function toggleSignupLogin() {
  showSignup.value = !showSignup.value
}
</script>
