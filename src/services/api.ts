import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/authStore'

// انواع خطاهای API
export interface ApiError {
  message: string
  status?: number
  code?: string
  details?: any
}

// پاسخ استاندارد API
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
  meta?: {
    total?: number
    page?: number
    limit?: number
    pages?: number
  }
}

// پیکربندی Axios
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 30000, // 30 ثانیه
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor برای افزودن token
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const authStore = useAuthStore()

    if (authStore.token && config.headers) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }

    // برای درخواست‌های multipart/form-data
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    // افزودن timestamp برای جلوگیری از کش
    if (config.params) {
      config.params._t = Date.now()
    } else {
      config.params = { _t: Date.now() }
    }

    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor برای مدیریت خطاها
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // پردازش پاسخ موفق
    return {
      ...response,
      data: {
        success: true,
        data: response.data,
        message: response.data?.message || 'عملیات موفقیت‌آمیز بود',
        meta: response.data?.meta,
      }
    }
  },
  (error) => {
    // پردازش خطا
    console.error('API Error:', error)

    const authStore = useAuthStore()

    if (error.response) {
      // خطا از سمت سرور
      const status = error.response.status
      const data = error.response.data

      switch (status) {
        case 401:
          // Unauthorized - احراز هویت ناموفق
          authStore.logout()
          window.location.href = '/login?error=unauthorized'
          break

        case 403:
          // Forbidden - دسترسی غیرمجاز
          // می‌توانید کاربر را به صفحه‌ای مناسب هدایت کنید
          break

        case 404:
          // Not Found - منبع یافت نشد
          break

        case 422:
          // Validation Error - خطای اعتبارسنجی
          break

        case 429:
          // Too Many Requests - محدودیت نرخ درخواست
          break

        case 500:
          // Internal Server Error - خطای سرور
          break
      }

      // ساخت error object استاندارد
      const apiError: ApiError = {
        message: data?.detail || data?.message || 'خطای سرور',
        status: status,
        code: data?.code || 'UNKNOWN_ERROR',
        details: data?.errors || data?.detail,
      }

      return Promise.reject({
        success: false,
        error: apiError,
        message: apiError.message,
      })

    } else if (error.request) {
      // خطای شبکه (سرور پاسخ نداده)
      return Promise.reject({
        success: false,
        error: {
          message: 'خطای اتصال به سرور',
          status: 0,
          code: 'NETWORK_ERROR',
        },
        message: 'خطای اتصال به سرور',
      })
    } else {
      // خطای دیگر
      return Promise.reject({
        success: false,
        error: {
          message: error.message,
          code: 'CLIENT_ERROR',
        },
        message: error.message,
      })
    }
  }
)

// helper functions
export const apiGet = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get(url, config)
    return response.data
  } catch (error: any) {
    return {
      success: false,
      error: error.error || {
        message: 'خطای نامشخص',
        code: 'UNKNOWN',
      },
      message: error.message || 'خطای نامشخص',
    }
  }
}

export const apiPost = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await api.post(url, data, config)
    return response.data
  } catch (error: any) {
    return {
      success: false,
      error: error.error || {
        message: 'خطای نامشخص',
        code: 'UNKNOWN',
      },
      message: error.message || 'خطای نامشخص',
    }
  }
}

export const apiPut = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await api.put(url, data, config)
    return response.data
  } catch (error: any) {
    return {
      success: false,
      error: error.error || {
        message: 'خطای نامشخص',
        code: 'UNKNOWN',
      },
      message: error.message || 'خطای نامشخص',
    }
  }
}

export const apiPatch = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await api.patch(url, data, config)
    return response.data
  } catch (error: any) {
    return {
      success: false,
      error: error.error || {
        message: 'خطای نامشخص',
        code: 'UNKNOWN',
      },
      message: error.message || 'خطای نامشخص',
    }
  }
}

export const apiDelete = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await api.delete(url, config)
    return response.data
  } catch (error: any) {
    return {
      success: false,
      error: error.error || {
        message: 'خطای نامشخص',
        code: 'UNKNOWN',
      },
      message: error.message || 'خطای نامشخص',
    }
  }
}

// اکسپورت پیش‌فرض
export default api
export { api }
