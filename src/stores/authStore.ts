import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '@/services/api/axiosConfig';
import type { User } from '@/types/lawyer.types';

// انواع TypeScript برای auth
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'user' | 'lawyer';
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('auth_token'));
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const userRole = computed(() => user.value?.role || null);
  const userId = computed(() => user.value?.id || null);
  const isLawyer = computed(() => user.value?.role === 'lawyer');
  const isAdmin = computed(() => user.value?.role === 'admin');

  // Actions

  /**
   * ورود به سیستم
   */
  async function login(credentials: LoginCredentials): Promise<void> {
    try {
      loading.value = true;
      error.value = null;

      const response = await api.post<AuthResponse>('/auth/login', credentials);

      // ذخیره توکن و اطلاعات کاربر
      token.value = response.data.access_token;
      user.value = response.data.user;

      // ذخیره در localStorage
      localStorage.setItem('auth_token', token.value);
      localStorage.setItem('user_data', JSON.stringify(user.value));

      // تنظیم هدر توکن برای درخواست‌های آینده
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

    } catch (err: any) {
      error.value = err.response?.data?.detail || 'خطا در ورود به سیستم';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  /**
   * ثبت‌نام کاربر جدید
   */
  async function register(data: RegisterData): Promise<void> {
    try {
      loading.value = true;
      error.value = null;

      const response = await api.post<AuthResponse>('/auth/register', data);

      // ذخیره توکن و اطلاعات کاربر
      token.value = response.data.access_token;
      user.value = response.data.user;

      localStorage.setItem('auth_token', token.value);
      localStorage.setItem('user_data', JSON.stringify(user.value));

      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

    } catch (err: any) {
      error.value = err.response?.data?.detail || 'خطا در ثبت‌نام';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  /**
   * خروج از سیستم
   */
  function logout(): void {
    // پاک کردن state
    user.value = null;
    token.value = null;

    // پاک کردن localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');

    // حذف هدر Authorization
    delete api.defaults.headers.common['Authorization'];

    // بازگرداندن به صفحه اصلی
    window.location.href = '/';
  }

  /**
   * دریافت اطلاعات کاربر از سرور
   */
  async function fetchUser(): Promise<void> {
    try {
      // اگر توکن وجود ندارد، از localStorage بخوان
      if (!token.value) {
        token.value = localStorage.getItem('auth_token');
      }

      if (!token.value) {
        return;
      }

      // تنظیم هدر توکن
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

      // درخواست اطلاعات کاربر
      const response = await api.get<User>('/auth/me');
      user.value = response.data;

      // ذخیره در localStorage
      localStorage.setItem('user_data', JSON.stringify(user.value));

    } catch (err: any) {
      console.error('Error fetching user:', err);

      // اگر توکن معتبر نیست، لاگ‌اوت کن
      if (err.response?.status === 401) {
        logout();
      }
    }
  }

  /**
   * به‌روزرسانی پروفایل کاربر
   */
  async function updateProfile(userData: Partial<User>): Promise<void> {
    try {
      loading.value = true;
      error.value = null;

      const response = await api.put<User>('/auth/profile', userData);
      user.value = response.data;

      // ذخیره در localStorage
      localStorage.setItem('user_data', JSON.stringify(user.value));

    } catch (err: any) {
      error.value = err.response?.data?.detail || 'خطا در به‌روزرسانی پروفایل';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  /**
   * تغییر رمز عبور
   */
  async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      loading.value = true;
      error.value = null;

      await api.post('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword
      });

    } catch (err: any) {
      error.value = err.response?.data?.detail || 'خطا در تغییر رمز عبور';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  /**
   * فراموشی رمز عبور
   */
  async function forgotPassword(data: ForgotPasswordData): Promise<void> {
    try {
      loading.value = true;
      error.value = null;

      await api.post('/auth/forgot-password', data);

    } catch (err: any) {
      error.value = err.response?.data?.detail || 'خطا در ارسال ایمیل بازیابی';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  /**
   * بازیابی رمز عبور
   */
  async function resetPassword(data: ResetPasswordData): Promise<void> {
    try {
      loading.value = true;
      error.value = null;

      await api.post('/auth/reset-password', data);

    } catch (err: any) {
      error.value = err.response?.data?.detail || 'خطا در بازیابی رمز عبور';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  /**
   * بارگذاری وضعیت کاربر از localStorage (در زمان لود اولیه)
   */
  function loadFromStorage(): void {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user_data');

    if (storedToken) {
      token.value = storedToken;
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }

    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser);
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('user_data');
      }
    }
  }

  /**
   * پاک کردن خطاها
   */
  function clearError(): void {
    error.value = null;
  }

  /**
   * بررسی وجود توکن معتبر
   */
  function hasValidToken(): boolean {
    if (!token.value) return false;

    // می‌توانید منطق بررسی انقضای توکن JWT را اینجا اضافه کنید
    // در حال حاضر فقط وجود توکن را بررسی می‌کنیم
    return true;
  }

  /**
   * گرفتن توکن برای استفاده در درخواست‌ها
   */
  function getToken(): string | null {
    return token.value;
  }

  // بارگذاری اولیه از localStorage
  loadFromStorage();

  return {
    // State
    user,
    token,
    loading,
    error,

    // Getters
    isAuthenticated,
    userRole,
    userId,
    isLawyer,
    isAdmin,

    // Actions
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    loadFromStorage,
    clearError,
    hasValidToken,
    getToken,
  };
});
