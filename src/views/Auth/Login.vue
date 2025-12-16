<template>
  <div
    class="h-full bg-cover bg-center flex items-center"
    style="background-image: url('/assets/img/background.jpg')"
  >
    <div class="w-5/6 m-auto max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg lg:mr-20">
      <h2
        class="text-2xl font-bold text-center text-white mb-2 flex justify-center gap-2 items-center"
      >
        {{ $t('auth.login') }}
        <CaUserAvatarFilledAlt v-if="userType === 'user'" />
        <FaUserTie v-if="userType === 'lowyer'" />
        <MdSharpAdminPanelSettings v-if="userType === 'admin'" />
      </h2>
      <div class="flex gap-2 justify-between items-center my-8">
        <p class="text-center text-xs text-gray-300">
          {{ $t('auth.loginCartMessage') }}
        </p>
        <select v-model="userType" class="p-1 rounded-sm bg-gray-300 text-xs">
          <option value="user" class="">
            <span class="text-sm">👤</span>
            کاربر معمولی
          </option>
          <option value="lowyer" class="text-xs">
            <span class="text-lg mx-3">⚖ </span>
            <span> وکیل </span>
          </option>
          <option value="admin">🔐 ادمین</option>
        </select>
      </div>

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
          <p v-if="errors.email" class="slow-comming-Down-animation absolute text-xs text-red-400 mt-1">
            {{ $t(`auth.errors.${errors.email}`) }}
          </p>
        </div>

        <!-- Password -->
        <div class="pb-2">
          <label class="block text-white font-medium">{{ $t('auth.password') }}</label>

          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              @input="form.password.length === 0 ? (showPassword = false) : ''"
              placeholder="12345678"
              class="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-orange-400"
            />
            <el-button type="primary">
              hello baby
            </el-button>
            
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
          <p
            v-if="errors.password"
            class="slow-comming-Down-animation text-xs absolute top-200 text-red-400 mt-1"
          >
            {{ $t(`auth.errors.${errors.password}`) }}
          </p>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 mt-4 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-500 transition-all duration-300"
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
import { FaUserTie, CaUserAvatarFilledAlt, MdSharpAdminPanelSettings } from '@kalimahapps/vue-icons'

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
const userType = ref<'user' | 'lowyer' | 'admin'>('user')

function validate(): boolean {
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'emailRequired'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'enterValidEmail'
  }

  if (!form.password) {
    errors.password = 'passRequired'
  } else if (form.password.length < 6) {
    errors.password = 'passLength'
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
