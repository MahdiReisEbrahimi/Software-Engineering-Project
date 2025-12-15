<template>
  <div
    class="h-full bg-cover bg-center flex items-center"
    style="background-image: url('/assets/img/background.jpg')"
  >
    <div class="w-5/6 m-auto max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg lg:mr-20">
      <h2 class="text-2xl font-bold text-center text-white mb-2">{{ $t('auth.login') }}</h2>
      <p class="text-center text-sm text-gray-300 mb-8">
        {{ $t('auth.loginCartMessage') }}
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Email -->
        <div>
          <label class="block text-white font-medium">{{ $t('auth.email') }}</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="email@example.com"
            class="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-orange-400"
          />
          <p v-if="errors.email" class="text-sm text-red-400 mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-white font-medium">{{ $t('auth.password') }}</label>

          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="****"
              class="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-orange-400"
            />

            <!-- Toggle password visibility -->
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute left-2 top-3.5 p-1 text-white"
            >
              <CgEye v-if="showPassword" />
              <AkEyeSlashed v-else />
            </button>
          </div>

          <p v-if="errors.password" class="text-sm text-red-400 mt-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 rounded-lg text-white font-semibold bg-orange-600 hover:bg-orange-500 disabled:bg-gray-600 transition-all duration-300"
        >
          <span v-if="!loading">{{ $t('auth.login') }}</span>
          <span v-else>{{ $t('auth.loading') }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AkEyeSlashed, CgEye } from '@kalimahapps/vue-icons'

interface LoginForm {
  email: string
  password: string
}

const form = reactive<LoginForm>({
  email: '',
  password: '',
})

const errors = reactive<Partial<LoginForm>>({})
const loading = ref(false)
const showPassword = ref(false)

function validate(): boolean {
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return !errors.email && !errors.password
}

async function handleSubmit() {
  if (!validate()) return

  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 1500))
  loading.value = false

  console.log('Logged in:', form)
}
</script>
