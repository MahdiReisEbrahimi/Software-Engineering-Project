import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { lawyersApi } from '@/services/api/lawyersApi';
import type { Lawyer, LawyerCreate, LawyerUpdate, LawyerFilters } from '@/Types/lawyer.types';

export const useLawyersStore = defineStore('lawyers', () => {
  // State
  const lawyers = ref<Lawyer[]>([]);
  const currentLawyer = ref<Lawyer | null>(null);
  const filters = ref<LawyerFilters>({
    skip: 0,
    limit: 50,
    verified_only: false,
    search: '',
    city: '',
    specialization: '',
  });

  // Getters
  const filteredLawyers = computed(() => {
    let result = lawyers.value;

    // فیلتر جستجو
    if (filters.value.search) {
      const search = filters.value.search.toLowerCase();
      result = result.filter(
        (lawyer) =>
          lawyer.specialization.toLowerCase().includes(search) ||
          lawyer.address.toLowerCase().includes(search) ||
          lawyer.bio.toLowerCase().includes(search)
      );
    }

    // فیلتر شهر
    if (filters.value.city) {
      result = result.filter((lawyer) =>
        lawyer.address.includes(filters.value.city!)
      );
    }

    // فیلتر تخصص
    if (filters.value.specialization) {
      result = result.filter((lawyer) =>
        lawyer.specialization === filters.value.specialization
      );
    }

    // فیلتر تایید شده‌ها
    if (filters.value.verified_only) {
      result = result.filter((lawyer) => lawyer.isVerified);
    }

    return result;
  });

  // Actions
  async function fetchLawyers(newFilters?: LawyerFilters) {
    try {
      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters };
      }
      lawyers.value = await lawyersApi.getAll(filters.value);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      throw error;
    }
  }

  async function fetchLawyerById(id: number) {
    try {
      currentLawyer.value = await lawyersApi.getById(id);
    } catch (error) {
      console.error('Error fetching lawyer:', error);
      throw error;
    }
  }

  async function createLawyerProfile(data: LawyerCreate) {
    try {
      const lawyer = await lawyersApi.createProfile(data);
      lawyers.value.push(lawyer);
      return lawyer;
    } catch (error) {
      console.error('Error creating lawyer profile:', error);
      throw error;
    }
  }

  async function updateLawyerProfile(data: LawyerUpdate) {
    try {
      const updatedLawyer = await lawyersApi.updateProfile(data);

      // Update in currentLawyer if it's the same
      if (currentLawyer.value && currentLawyer.value.id === updatedLawyer.id) {
        currentLawyer.value = updatedLawyer;
      }

      // Update in lawyers list
      const index = lawyers.value.findIndex(l => l.id === updatedLawyer.id);
      if (index !== -1) {
        lawyers.value[index] = updatedLawyer;
      }

      return updatedLawyer;
    } catch (error) {
      console.error('Error updating lawyer profile:', error);
      throw error;
    }
  }

  async function fetchMyProfile() {
    try {
      currentLawyer.value = await lawyersApi.getMyProfile();
    } catch (error) {
      console.error('Error fetching my profile:', error);
      throw error;
    }
  }

  // Reset filters
  function resetFilters() {
    filters.value = {
      skip: 0,
      limit: 50,
      verified_only: false,
      search: '',
      city: '',
      specialization: '',
    };
  }

  return {
    // State
    lawyers,
    currentLawyer,
    filters,

    // Getters
    filteredLawyers,

    // Actions
    fetchLawyers,
    fetchLawyerById,
    createLawyerProfile,
    updateLawyerProfile,
    fetchMyProfile,
    resetFilters,
  };
});
