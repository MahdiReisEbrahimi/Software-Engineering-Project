<template>
  <div class="lawyer-profile-manage-view">
    <!-- دسترسی ممنوع -->
    <div v-if="!isLawyer" class="access-denied">
      <i class="denied-icon">🚫</i>
      <h2>دسترسی محدود</h2>
      <p>این صفحه فقط برای وکلای ثبت‌نام شده قابل دسترسی است.</p>
      <router-link to="/lawyers" class="btn-back">
        بازگشت به لیست وکلا
      </router-link>
    </div>

    <!-- محتوای اصلی -->
    <div v-else>
      <div class="page-header">
        <h1 class="page-title">مدیریت پروفایل وکیل</h1>
        <p class="page-subtitle">
          اطلاعات پروفایل خود را به‌روز کنید
        </p>
      </div>

      <!-- حالت بارگذاری -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>در حال بارگذاری اطلاعات...</p>
      </div>

      <!-- فرم ویرایش -->
      <form v-else @submit.prevent="handleSubmit" class="profile-form">
        <div class="form-grid">
          <!-- اطلاعات اصلی -->
          <div class="form-section">
            <h3 class="section-title">اطلاعات اصلی</h3>

            <div class="form-group">
              <label for="licenseNumber" class="form-label">
                شماره پروانه وکالت *
              </label>
              <input
                id="licenseNumber"
                v-model="formData.licenseNumber"
                type="text"
                class="form-input"
                required
                placeholder="مثال: ۱۲۳۴۵"
              />
              <small class="form-hint">شماره پروانه رسمی خود را وارد کنید</small>
            </div>

            <div class="form-group">
              <label for="specialization" class="form-label">
                تخصص اصلی *
              </label>
              <select
                id="specialization"
                v-model="formData.specialization"
                class="form-select"
                required
              >
                <option value="">انتخاب تخصص</option>
                <option value="خانواده">خانواده</option>
                <option value="کیفری">کیفری</option>
                <option value="مالی">مالی</option>
                <option value="تجاری">تجاری</option>
                <option value="ملکی">ملکی</option>
                <option value="بین‌الملل">بین‌الملل</option>
                <option value="سایر">سایر</option>
              </select>
            </div>

            <div class="form-group">
              <label for="experienceYears" class="form-label">
                سال‌های تجربه *
              </label>
              <input
                id="experienceYears"
                v-model.number="formData.experienceYears"
                type="number"
                min="0"
                max="50"
                class="form-input"
                required
              />
            </div>
          </div>

          <!-- اطلاعات تماس -->
          <div class="form-section">
            <h3 class="section-title">اطلاعات تماس</h3>

            <div class="form-group">
              <label for="phoneNumber" class="form-label">
                شماره تماس *
              </label>
              <input
                id="phoneNumber"
                v-model="formData.phoneNumber"
                type="tel"
                class="form-input"
                required
                placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
              />
            </div>

            <div class="form-group">
              <label for="address" class="form-label">
                آدرس دفتر *
              </label>
              <input
                id="address"
                v-model="formData.address"
                type="text"
                class="form-input"
                required
                placeholder="آدرس کامل دفتر وکالت"
              />
            </div>

            <div class="form-group">
              <label for="profileImage" class="form-label">
                آدرس تصویر پروفایل
              </label>
              <input
                id="profileImage"
                v-model="formData.profileImage"
                type="url"
                class="form-input"
                placeholder="https://example.com/image.jpg"
              />
              <small class="form-hint">
                می‌توانید از سرویس‌های میزبانی تصویر استفاده کنید
              </small>
            </div>
          </div>

          <!-- موقعیت مکانی -->
          <div class="form-section full-width">
            <h3 class="section-title">موقعیت مکانی دفتر</h3>
            <div class="location-instruction">
              <p>لطفاً موقعیت دقیق دفتر خود را روی نقشه انتخاب کنید:</p>
            </div>

            <!-- کامپوننت انتخاب موقعیت -->
            <LocationSelector
              v-if="showLocationSelector"
              v-model:latitude="formData.latitude"
              v-model:longitude="formData.longitude"
              class="location-selector"
            />

            <div v-else class="location-placeholder">
              <p>کامپوننت انتخاب موقعیت در دسترس نیست</p>
              <div class="coordinate-inputs">
                <div class="form-group">
                  <label class="form-label">عرض جغرافیایی</label>
                  <input
                    v-model.number="formData.latitude"
                    type="number"
                    step="0.000001"
                    class="form-input"
                    placeholder="35.6892"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">طول جغرافیایی</label>
                  <input
                    v-model.number="formData.longitude"
                    type="number"
                    step="0.000001"
                    class="form-input"
                    placeholder="51.3890"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- بیوگرافی -->
          <div class="form-section full-width">
            <h3 class="section-title">بیوگرافی</h3>
            <div class="form-group">
              <label for="bio" class="form-label">
                معرفی خود و خدمات شما
              </label>
              <textarea
                id="bio"
                v-model="formData.bio"
                class="form-textarea"
                rows="6"
                placeholder="در این بخش می‌توانید تجربیات، تخصص‌ها و خدمات خود را معرفی کنید..."
              ></textarea>
              <small class="form-hint">
                {{ formData.bio?.length || 0 }} / 1000 کاراکتر
              </small>
            </div>
          </div>
        </div>

        <!-- دکمه‌های اقدام -->
        <div class="form-actions">
          <button
            type="button"
            @click="handleCancel"
            class="btn-cancel"
          >
            انصراف
          </button>
          <button
            type="submit"
            class="btn-submit"
            :disabled="submitting"
          >
            <span v-if="submitting">
              <span class="spinner-small"></span>
              در حال ذخیره...
            </span>
            <span v-else>ذخیره تغییرات</span>
          </button>
        </div>

        <!-- وضعیت ذخیره -->
        <div v-if="saveStatus" class="save-status" :class="saveStatus.type">
          <i v-if="saveStatus.type === 'success'" class="status-icon">✓</i>
          <i v-else class="status-icon">⚠️</i>
          <span>{{ saveStatus.message }}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useLawyersStore } from '@/stores/lawyersStore';
import LocationSelector from '@/components/reusable/LocationSelector.vue';
import type { LawyerUpdate } from '@/Types/lawyer.types';

const router = useRouter();
const authStore = useAuthStore();
const lawyersStore = useLawyersStore();

const loading = ref(true);
const submitting = ref(false);
const showLocationSelector = ref(false); // اگر LocationSelector موجود باشد
const saveStatus = ref<{type: 'success' | 'error', message: string} | null>(null);

// بررسی آیا کاربر وکیل است
const isLawyer = computed(() => {
  return authStore.user?.role === 'lawyer';
});

// داده‌های فرم
const formData = ref<LawyerUpdate>({
  licenseNumber: '',
  specialization: '',
  experienceYears: 0,
  bio: '',
  phoneNumber: '',
  address: '',
  profileImage: '',
  latitude: 35.6892,
  longitude: 51.3890,
});

onMounted(async () => {
  if (!isLawyer.value) {
    loading.value = false;
    return;
  }

  try {
    await lawyersStore.fetchMyProfile();
    const current = lawyersStore.currentLawyer;

    if (current) {
      formData.value = {
        licenseNumber: current.licenseNumber,
        specialization: current.specialization,
        experienceYears: current.experienceYears,
        bio: current.bio,
        phoneNumber: current.phoneNumber,
        address: current.address,
        profileImage: current.profileImage,
        latitude: parseFloat(current.latitude) || 35.6892,
        longitude: parseFloat(current.longitude) || 51.3890,
      };
    } else {
      // اگر پروفایل وجود ندارد، فرم خالی نمایش داده می‌شود
    }
  } catch (error) {
    console.error('Error loading profile:', error);
  } finally {
    loading.value = false;
  }
});

const handleSubmit = async () => {
  if (!isLawyer.value) return;

  submitting.value = true;
  saveStatus.value = null;

  try {
    await lawyersStore.updateLawyerProfile(formData.value);

    saveStatus.value = {
      type: 'success',
      message: 'پروفایل شما با موفقیت به‌روزرسانی شد.'
    };

    // بازگشت به پروفایل بعد از 2 ثانیه
    setTimeout(() => {
      if (lawyersStore.currentLawyer) {
        router.push({
          name: 'lawyer-profile',
          params: { id: lawyersStore.currentLawyer.id }
        });
      }
    }, 2000);

  } catch (error: any) {
    saveStatus.value = {
      type: 'error',
      message: error.message || 'خطا در ذخیره تغییرات. لطفاً دوباره تلاش کنید.'
    };
  } finally {
    submitting.value = false;
  }
};

const handleCancel = () => {
  if (lawyersStore.currentLawyer) {
    router.push({
      name: 'lawyer-profile',
      params: { id: lawyersStore.currentLawyer.id }
    });
  } else {
    router.push('/lawyers');
  }
};
</script>

<style scoped>
.lawyer-profile-manage-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

/* Access Denied */
.access-denied {
  text-align: center;
  padding: 80px 20px;
}

.denied-icon {
  font-size: 64px;
  margin-bottom: 24px;
  display: block;
}

.access-denied h2 {
  font-size: 24px;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.access-denied p {
  color: #6b7280;
  margin-bottom: 32px;
}

.btn-back {
  display: inline-block;
  padding: 12px 32px;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-back:hover {
  background: #2563eb;
}

/* Page Header */
.page-header {
  margin-bottom: 40px;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.loading-state .spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

/* Form */
.profile-form {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-section {
  background: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.form-section.full-width {
  grid-column: 1 / -1;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  color: #1f2937;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-hint {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #6b7280;
}

/* Location Section */
.location-instruction {
  margin-bottom: 20px;
  padding: 12px 16px;
  background: #f0f9ff;
  border-radius: 8px;
  border: 1px solid #bae6fd;
}

.location-instruction p {
  margin: 0;
  color: #0369a1;
  font-size: 14px;
}

.location-selector {
  margin-top: 16px;
}

.location-placeholder {
  padding: 24px;
  background: #f1f5f9;
  border-radius: 8px;
  text-align: center;
}

.coordinate-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
}

.btn-cancel {
  padding: 12px 32px;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel:hover {
  background: #e5e7eb;
}

.btn-submit {
  padding: 12px 32px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s;
}

.btn-submit:hover:not(:disabled) {
  background: #059669;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}

/* Save Status */
.save-status {
  margin-top: 24px;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.save-status.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.save-status.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.status-icon {
  font-size: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
