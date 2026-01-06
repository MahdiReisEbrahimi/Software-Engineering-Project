import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// این یک store موقت است تا زمانی که همکارتان store واقعی را بنویسد
export const useAuthStore = defineStore('auth', () => {
  const user = ref<{
    id?: number
    name?: string
    email?: string
    role: 'user' | 'lawyer' | 'admin'
  } | null>(null)

  // برای تست می‌توانید کاربر را به صورت دستی تنظیم کنید
  // user.value = { id: 1, name: 'Test User', email: 'test@example.com', role: 'admin' }

  const isAuthenticated = computed(() => !!user.value)

  // توابع mock
  const login = async (credentials: any) => {
    console.log('Mock login called with:', credentials)
    // برای تست، یک کاربر admin تنظیم می‌کنیم
    user.value = {
      id: 1,
      name: 'Test Admin',
      email: 'admin@example.com',
      role: 'admin'
    }
  }

  const logout = () => {
    user.value = null
  }

  const checkAuth = async () => {
    // در حالت واقعی، token را بررسی می‌کند
    return !!user.value
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
})
