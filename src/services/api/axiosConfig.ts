import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// ایجاد instance از axios با config اولیه
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor برای درخواست‌ها
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // افزودن توکن به هدر در صورت وجود
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor برای پاسخ‌ها
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // مدیریت خطاهای سراسری
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // اگر توکن معتبر نیست، کاربر را به صفحه لاگین هدایت کنید
          console.error('دسترسی غیرمجاز - لطفاً دوباره وارد شوید');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          window.location.href = '/auth/login';
          break;

        case 403:
          console.error('دسترسی غیرمجاز - شما مجوز لازم را ندارید');
          break;

        case 404:
          console.error('منبع مورد نظر یافت نشد');
          break;

        case 422:
          console.error('داده‌های ارسالی نامعتبر هستند', data.detail);
          break;

        case 500:
          console.error('خطای سرور - لطفاً بعداً تلاش کنید');
          break;

        default:
          console.error('خطای ناشناخته:', data?.detail || error.message);
      }
    } else if (error.request) {
      console.error('عدم اتصال به سرور - لطفاً اتصال اینترنت خود را بررسی کنید');
    } else {
      console.error('خطا در تنظیم درخواست:', error.message);
    }

    return Promise.reject(error);
  }
);

export { api };
