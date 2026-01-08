<template>
  <div class="lawyer-filter">
    <div class="filter-section">
      <div class="search-box">
        <input
          v-model="localFilters.search"
          type="text"
          placeholder="جستجو در وکلا..."
          class="search-input"
          @input="handleSearch"
        />
        <button class="search-btn">
          <i>🔍</i>
        </button>
      </div>
    </div>

    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-group">
          <label class="filter-label">شهر</label>
          <select v-model="localFilters.city" class="filter-select" @change="applyFilters">
            <option value="">همه شهرها</option>
            <option value="تهران">تهران</option>
            <option value="مشهد">مشهد</option>
            <option value="اصفهان">اصفهان</option>
            <option value="شیراز">شیراز</option>
            <option value="تبریز">تبریز</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">تخصص</label>
          <select v-model="localFilters.specialization" class="filter-select" @change="applyFilters">
            <option value="">همه تخصص‌ها</option>
            <option value="خانواده">خانواده</option>
            <option value="کیفری">کیفری</option>
            <option value="مالی">مالی</option>
            <option value="تجاری">تجاری</option>
            <option value="ملکی">ملکی</option>
            <option value="بین‌الملل">بین‌الملل</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">
            <input
              v-model="localFilters.verified_only"
              type="checkbox"
              class="filter-checkbox"
              @change="applyFilters"
            />
            فقط وکلای تأیید شده
          </label>
        </div>
      </div>
    </div>

    <div class="filter-actions">
      <button @click="resetFilters" class="btn-reset">
        حذف فیلترها
      </button>
      <button @click="applyFilters" class="btn-apply">
        اعمال فیلتر
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { LawyerFilters } from '@/Types/lawyer.types';

interface Emits {
  (e: 'update:filters', filters: LawyerFilters): void;
  (e: 'reset'): void;
}

const emit = defineEmits<Emits>();

const localFilters = ref<LawyerFilters>({
  search: '',
  city: '',
  specialization: '',
  verified_only: false,
});

// Debounce برای جستجو
let searchTimeout: NodeJS.Timeout;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    applyFilters();
  }, 500);
};

const applyFilters = () => {
  emit('update:filters', { ...localFilters.value });
};

const resetFilters = () => {
  localFilters.value = {
    search: '',
    city: '',
    specialization: '',
    verified_only: false,
  };
  emit('reset');
  emit('update:filters', { ...localFilters.value });
};

// watch برای تغییرات real-time (اختیاری)
watch(() => localFilters.value, (newFilters) => {
  // اگر می‌خواهید فیلترها real-time اعمال شوند
}, { deep: true });
</script>

<style scoped>
.lawyer-filter {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.filter-section {
  margin-bottom: 20px;
}

.search-box {
  position: relative;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 12px 48px 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.search-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 18px;
  color: #6b7280;
  cursor: pointer;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-end;
}

.filter-group {
  flex: 1;
  min-width: 180px;
}

.filter-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.filter-select {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  color: #1f2937;
  cursor: pointer;
  transition: border-color 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
}

.filter-checkbox {
  margin-left: 8px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.btn-reset {
  padding: 10px 20px;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-reset:hover {
  background: #e5e7eb;
}

.btn-apply {
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-apply:hover {
  background: #2563eb;
}
</style>
