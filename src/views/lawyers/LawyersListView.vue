<template>
  <div class="lawyers-list-view ">
    <!-- هدر صفحه -->
    <div class="page-header">
      <h1 class="page-title">لیست وکلا</h1>
      <p class="page-subtitle">
        {{ totalLawyers }} وکیل در سیستم ثبت‌نام کرده‌اند
      </p>
    </div>

    <!-- فیلترها -->
    <LawyerFilter
      @update:filters="handleFilterUpdate"
      @reset="handleResetFilters"
    />

    <!-- محتوای اصلی -->
    <div class="content-container">
      <!-- حالت بارگذاری -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>در حال بارگذاری وکلا...</p>
      </div>

      <!-- حالت خطا -->
      <div v-else-if="error" class="error-state">
        <i class="error-icon">⚠️</i>
        <h3>خطا در بارگذاری داده‌ها</h3>
        <p>{{ error }}</p>
        <button @click="fetchLawyersData" class="btn-retry">
          تلاش مجدد
        </button>
      </div>

      <!-- حالت بدون نتیجه -->
      <div v-else-if="lawyersStore.filteredLawyers.length === 0" class="empty-state">
        <i class="empty-icon">🔍</i>
        <h3>هیچ وکیلی یافت نشد</h3>
        <p>با تغییر فیلترها دوباره امتحان کنید</p>
        <button @click="handleResetFilters" class="btn-reset-filters">
          حذف همه فیلترها
        </button>
      </div>

      <!-- نمایش وکلا -->
      <div v-else class="lawyers-grid">
        <div
          v-for="lawyer in lawyersStore.filteredLawyers"
          :key="lawyer.id"
          class="lawyer-grid-item"
        >
          <LawyerCard :lawyer="lawyer" />
        </div>
      </div>

      <!-- صفحه‌بندی -->
      <div v-if="totalLawyers > lawyersStore.filters.limit" class="pagination">
        <button
          @click="loadMore"
          class="btn-load-more"
          :disabled="loadingMore"
        >
          {{ loadingMore ? 'در حال بارگذاری...' : 'بارگذاری بیشتر' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useLawyersStore } from '@/stores/lawyersStore';
import LawyerFilter from '@/components/reusable/lawyer/LawyerFilter.vue';
import LawyerCard from '@/components/reusable/lawyer/LawyerCard.vue';
import type { LawyerFilters } from '@/Types/lawyer.types';

const lawyersStore = useLawyersStore();
const loading = ref(true);
const loadingMore = ref(false);
const error = ref<string | null>(null);

const totalLawyers = computed(() => lawyersStore.filteredLawyers.length);

onMounted(() => {
  fetchLawyersData();
});

const fetchLawyersData = async () => {
  try {
    loading.value = true;
    error.value = null;
    await lawyersStore.fetchLawyers();
  } catch (err: any) {
    error.value = err.message || 'خطا در دریافت داده‌ها';
    console.error('Error fetching lawyers:', err);
  } finally {
    loading.value = false;
  }
};

const handleFilterUpdate = async (filters: LawyerFilters) => {
  try {
    loading.value = true;
    await lawyersStore.fetchLawyers(filters);
  } catch (err: any) {
    error.value = err.message || 'خطا در اعمال فیلترها';
  } finally {
    loading.value = false;
  }
};

const handleResetFilters = async () => {
  lawyersStore.resetFilters();
  await fetchLawyersData();
};

const loadMore = async () => {
  try {
    loadingMore.value = true;
    const currentLimit = lawyersStore.filters.limit || 50;
    await lawyersStore.fetchLawyers({
      ...lawyersStore.filters,
      limit: currentLimit + 20,
    });
  } catch (err: any) {
    error.value = err.message || 'خطا در بارگذاری بیشتر';
  } finally {
    loadingMore.value = false;
  }
};
</script>

<style scoped>
.lawyers-list-view {
  padding: 24px;
  max-width: auto;
  margin: 0 auto;
  background-color: #dedede;
}

.page-header {
  margin-bottom: 32px;
  text-align: center;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.content-container {
  margin-top: 24px;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: #f9fafb;
  border-radius: 12px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-state {
  text-align: center;
  padding: 60px 20px;
  background: #fef2f2;
  border-radius: 12px;
  border: 1px solid #fecaca;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.error-state h3 {
  color: #dc2626;
  margin: 0 0 12px 0;
}

.error-state p {
  color: #7f1d1d;
  margin-bottom: 24px;
}

.btn-retry {
  padding: 10px 24px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-retry:hover {
  background: #b91c1c;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #f0f9ff;
  border-radius: 12px;
  border: 1px solid #bae6fd;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #0369a1;
  margin: 0 0 12px 0;
}

.empty-state p {
  color: #0c4a6e;
  margin-bottom: 24px;
}

.btn-reset-filters {
  padding: 10px 24px;
  background: #0ea5e9;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-reset-filters:hover {
  background: #0284c7;
}

/* Lawyers Grid */
.lawyers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.lawyer-grid-item {
  transition: transform 0.3s ease;
}

.lawyer-grid-item:hover {
  transform: translateY(-2px);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.btn-load-more {
  padding: 12px 32px;
  background: white;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-load-more:hover:not(:disabled) {
  background: #3b82f6;
  color: white;
}

.btn-load-more:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
