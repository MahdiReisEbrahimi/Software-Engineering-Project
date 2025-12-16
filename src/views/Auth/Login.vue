<template>
  <div
    class="h-full bg-cover bg-center flex items-center justify-center flex-col"
    style="background-image: url('/assets/img/background.jpg')"
  >
    <div class="w-5/6 m-auto max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg lg:mr-20">
      <LoginForm />
      <div class="flex items-center justify-center mt-3">
        <button class="text-gray-400 text-xs">
          <u>ثبت نام نکرده اید؟</u>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './components/LoginForm.vue'
</script>
