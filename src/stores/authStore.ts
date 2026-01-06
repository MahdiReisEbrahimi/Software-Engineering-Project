import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
  role: 'user' | 'lawyer' | 'admin'
  avatar?: string
  phone?: string
  createdAt?: string
  updatedAt?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

// این یک store موقت است تا زمانی که همکارتان store واقعی را بنویسد
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // برای تست: کاربر admin تنظیم می‌کنیم
  // برای تست نقش‌های مختلف، مقدار role را تغییر دهید:
  // 'admin' - 'lawyer' - 'user'
  user.value = {
    id: 1,
    name: 'ادمین تست',
    email: 'admin@test.com',
    role: 'admin', // تغییر این مقدار برای تست نقش‌های مختلف
    phone: '09123456789',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  }

  token.value = 'mock-token-for-testing'

  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isLawyer = computed(() => user.value?.role === 'lawyer')
  const isUser = computed(() => user.value?.role === 'user')

  // توابع mock
  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true
    try {
      console.log('Mock login called with:', credentials)
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 1000))

      // برای تست، یک کاربر admin تنظیم می‌کنیم
      user.value = {
        id: 1,
        name: 'ادمین تست',
        email: credentials.email,
        role: 'admin',
        phone: '09123456789',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
      }

      token.value = 'mock-jwt-token-' + Date.now()
      error.value = null

      return { success: true, user: user.value }
    } catch (err: any) {
      error.value = err.message || 'خطا در ورود'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: any) => {
    loading.value = true
    try {
      console.log('Mock register called with:', userData)
      await new Promise(resolve => setTimeout(resolve, 1000))

      user.value = {
        id: 2,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'user',
        phone: userData.phone,
        avatar: userData.avatar
      }

      token.value = 'mock-jwt-token-' + Date.now()
      error.value = null

      return { success: true, user: user.value }
    } catch (err: any) {
      error.value = err.message || 'خطا در ثبت‌نام'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      user.value = null
      token.value = null
      error.value = null
      return { success: true }
    } catch (err: any) {
      error.value = err.message || 'خطا در خروج'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const checkAuth = async () => {
    loading.value = true
    try {
      // در حالت واقعی، token را بررسی می‌کند
      await new Promise(resolve => setTimeout(resolve, 300))
      return !!user.value && !!token.value
    } catch (err: any) {
      error.value = err.message || 'خطا در بررسی احراز هویت'
      return false
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (profileData: Partial<User>) => {
    loading.value = true
    try {
      console.log('Mock updateProfile called with:', profileData)
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (user.value) {
        user.value = { ...user.value, ...profileData }
      }

      error.value = null
      return { success: true, user: user.value }
    } catch (err: any) {
      error.value = err.message || 'خطا در به‌روزرسانی پروفایل'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const changePassword = async (passwordData: {
    currentPassword: string
    newPassword: string
  }) => {
    loading.value = true
    try {
      console.log('Mock changePassword called')
      await new Promise(resolve => setTimeout(resolve, 1000))
      error.value = null
      return { success: true }
    } catch (err: any) {
      error.value = err.message || 'خطا در تغییر رمز عبور'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (email: string) => {
    loading.value = true
    try {
      console.log('Mock resetPassword called for:', email)
      await new Promise(resolve => setTimeout(resolve, 1000))
      error.value = null
      return { success: true }
    } catch (err: any) {
      error.value = err.message || 'خطا در بازیابی رمز عبور'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    // state
    user,
    token,
    loading,
    error,

    // getters
    isAuthenticated,
    isAdmin,
    isLawyer,
    isUser,

    // actions
    login,
    register,
    logout,
    checkAuth,
    updateProfile,
    changePassword,
    resetPassword,
  }
})
