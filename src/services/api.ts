import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/authStore'

export interface ApiError {
  message: string
  status?: number
  code?: string
  details?: unknown
}

export interface ApiResponse<T = unknown> {
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

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore()

    if (authStore.token && config.headers) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

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

api.interceptors.response.use(
  (response: AxiosResponse) => {
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
    console.error('API Error:', error)

    const authStore = useAuthStore()

    if (error.response) {
      const status = error.response.status
      const data = error.response.data

      switch (status) {
        case 401:
          authStore.logout()
          window.location.href = '/login?error=unauthorized'
          break
        case 403:
          break
        case 404:
          break
        case 422:
          break
        case 429:
          break
        case 500:
          break
      }

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

export const apiGet = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get(url, config)
    return response.data
  } catch (error: unknown) {
    const apiError = error as { error?: ApiError; message?: string }
    return {
      success: false,
      error: apiError.error || {
        message: 'خطای نامشخص',
        code: 'UNKNOWN',
      },
      message: apiError.message || 'خطای نامشخص',
    }
  }
}

export const apiPost = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await api.post(url, data, config)
    return response.data
  } catch (error: unknown) {
    const apiError = error as { error?: ApiError; message?: string }
    return {
      success: false,
      error: apiError.error || {
        message: 'خطای نامشخص',
        code: 'UNKNOWN',
      },
      message: apiError.message || 'خطای نامشخص',
    }
  }
}

export const apiPut = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await api.put(url, data, config)
    return response.data
  } catch (error: unknown) {
    const apiError = error as { error?: ApiError; message?: string }
    return {
      success: false,
      error: apiError.error || {
        message: 'خطای نامشخص',
        code: 'UNKNOWN',
      },
      message: apiError.message || 'خطای نامشخص',
    }
  }
}

export const apiPatch = async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await api.patch(url, data, config)
    return response.data
  } catch (error: unknown) {
    const apiError = error as { error?: ApiError; message?: string }
    return {
      success: false,
      error: apiError.error || {
        message: 'خطای نامشخص',
        code: 'UNKNOWN',
      },
      message: apiError.message || 'خطای نامشخص',
    }
  }
}

export const apiDelete = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await api.delete(url, config)
    return response.data
  } catch (error: unknown) {
    const apiError = error as { error?: ApiError; message?: string }
    return {
      success: false,
      error: apiError.error || {
        message: 'خطای نامشخص',
        code: 'UNKNOWN',
      },
      message: apiError.message || 'خطای نامشخص',
    }
  }
}

export default api
export { api }
