// انواع TypeScript برای وکلا
export interface Lawyer {
  id: number;
  userId: number;
  licenseNumber: string;
  specialization: string;
  experienceYears: number;
  bio: string;
  phoneNumber: string;
  address: string;
  profileImage: string;
  latitude: string;
  longitude: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LawyerCreate {
  licenseNumber: string;
  specialization: string;
  experienceYears: number;
  bio: string;
  phoneNumber: string;
  address: string;
  profileImage: string;
  latitude: number;
  longitude: number;
}

export interface LawyerUpdate {
  licenseNumber?: string;
  specialization?: string;
  experienceYears?: number;
  bio?: string;
  phoneNumber?: string;
  address?: string;
  profileImage?: string;
  latitude?: number;
  longitude?: number;
}

export interface LawyerFilters {
  skip?: number;
  limit?: number;
  verified_only?: boolean;
  search?: string;
  city?: string;
  specialization?: string;
  maxPrice?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'lawyer' | 'admin';
}
