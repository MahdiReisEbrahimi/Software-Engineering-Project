import { api } from '@/services/api/axiosConfig';
import type { Lawyer, LawyerCreate, LawyerUpdate, LawyerFilters } from '@/Types/lawyer.types';

export const lawyersApi = {
  // دریافت لیست وکلا با فیلتر
  async getAll(filters?: LawyerFilters): Promise<Lawyer[]> {
    const params = {
      skip: filters?.skip || 0,
      limit: filters?.limit || 100,
      verified_only: filters?.verified_only || false,
      ...filters,
    };
    const response = await api.get('/lawyers/', { params });
    return response.data;
  },

  // دریافت یک وکیل با ID
  async getById(id: number): Promise<Lawyer> {
    const response = await api.get(`/lawyers/${id}`);
    return response.data;
  },

  // ایجاد پروفایل وکیل (برای وکلا)
  async createProfile(data: LawyerCreate): Promise<Lawyer> {
    const response = await api.post('/lawyers/profile', data);
    return response.data;
  },

  // به‌روزرسانی پروفایل وکیل جاری
  async updateProfile(data: LawyerUpdate): Promise<Lawyer> {
    const response = await api.put('/lawyers/profile/me', data);
    return response.data;
  },

  // دریافت پروفایل وکیل جاری
  async getMyProfile(): Promise<Lawyer> {
    const response = await api.get('/lawyers/profile/me');
    return response.data;
  },

  // دریافت اطلاعات کاربر مرتبط با وکیل
  async getUserInfo(userId: number): Promise<any> {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  }
};
