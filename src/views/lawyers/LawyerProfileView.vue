<template>
  <div class="lawyer-profile-view">
    <!-- نوار بارگذاری -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
      <p>در حال بارگذاری پروفایل...</p>
    </div>

    <!-- محتوای اصلی -->
    <div v-else-if="lawyer" class="profile-container">
      <!-- هدر پروفایل -->
      <div class="profile-header">
        <div class="profile-image-section">
          <img
            :src="lawyer.profileImage || '/default-lawyer.jpg'"
            :alt="lawyer.specialization"
            class="profile-image"
          />
          <div v-if="lawyer.isVerified" class="verification-badge">
            <span>✓</span>
            تأیید شده
          </div>
        </div>

        <div class="profile-info">
          <h1 class="profile-name">{{ lawyer.specialization }}</h1>
          <p class="profile-license">پروانه وکالت: {{ lawyer.licenseNumber }}</p>

          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-value">{{ lawyer.experienceYears }}</span>
              <span class="stat-label">سال تجربه</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ formatDate(lawyer.createdAt) }}</span>
              <span class="stat-label">عضویت در سیستم</span>
            </div>
          </div>
        </div>
      </div>

      <!-- اطلاعات تماس -->
      <div class="contact-section">
        <h2 class="section-title">اطلاعات تماس</h2>
        <div class="contact-grid">
          <div class="contact-item">
            <i class="icon">📞</i>
            <div>
              <h4>شماره تماس</h4>
              <p>{{ lawyer.phoneNumber }}</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="icon">📍</i>
            <div>
              <h4>آدرس دفتر</h4>
              <p>{{ lawyer.address }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- بیوگرافی -->
      <div class="bio-section">
        <h2 class="section-title">درباره وکیل</h2>
        <div class="bio-content">
          <p>{{ lawyer.bio || 'توضیحاتی ثبت نشده است.' }}</p>
        </div>
      </div>

      <!-- نقشه موقعیت -->
      <div class="map-section">
        <h2 class="section-title">موقعیت دفتر وکیل</h2>
        <LawyerMapPreview :lawyer="lawyer" />
      </div>

      <!-- دکمه‌های اقدام -->
      <div class="action-buttons">
        <button @click="goToMap" class="btn-map">
          <i>🗺️</i>
          نمایش روی نقشه اصلی
        </button>
        <button @click="contactLawyer" class="btn-contact">
          <i>📱</i>
          تماس با وکیل
        </button>
        <button v-if="isMyProfile" @click="goToEdit" class="btn-edit">
          <i>✏️</i>
          ویرایش پروفایل
        </button>
      </div>
    </div>

    <!-- حالت وکیل پیدا نشد -->
    <div v-else class="not-found">
      <i class="not-found-icon">👤</i>
      <h2>وکیل مورد نظر یافت نشد</h2>
      <p>این پروفایل ممکن است حذف شده یا وجود نداشته باشد.</p>
      <router-link to="/lawyers" class="btn-back">
        بازگشت به لیست وکلا
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useLawyersStore } from '@/stores/lawyersStore';
import LawyerMapPreview from '@/components/reusable/lawyer/LawyerMapPreview.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const lawyersStore = useLawyersStore();

const loading = ref(true);
const lawyer = ref(lawyersStore.currentLawyer);

// بررسی آیا این پروفایل متعلق به کاربر جاری است
const isMyProfile = computed(() => {
  if (!authStore.user || !lawyer.value) return false;
  return authStore.user.id === lawyer.value.userId;
});

onMounted(async () => {
  try {
    const lawyerId = Number(route.params.id);
    if (lawyerId) {
      await lawyersStore.fetchLawyerById(lawyerId);
      lawyer.value = lawyersStore.currentLawyer;
    }
  } catch (error) {
    console.error('Error loading lawyer profile:', error);
  } finally {
    loading.value = false;
  }
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fa-IR');
};

const goToMap = () => {
  if (lawyer.value) {
    router.push({
      name: 'map',
      query: { lawyerId: lawyer.value.id.toString() }
    });
  }
};

const contactLawyer = () => {
  if (lawyer.value) {
    // در نسخه‌های بعدی می‌تواند به صفحه تماس هدایت شود
    window.location.href = `tel:${lawyer.value.phoneNumber}`;
  }
};

const goToEdit = () => {
  router.push({ name: 'lawyer-profile-manage' });
};
</script>

<style scoped>
.lawyer-profile-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

/* Loading State */
.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-overlay .spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

/* Profile Header */
.profile-header {
  display: flex;
  gap: 32px;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e5e7eb;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.profile-image-section {
  position: relative;
  flex-shrink: 0;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.verification-badge {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 32px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.profile-license {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 24px 0;
}

.profile-stats {
  display: flex;
  gap: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  background: #f8fafc;
  border-radius: 12px;
  min-width: 120px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
}

/* Sections */
.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
}

.contact-section,
.bio-section,
.map-section {
  margin-bottom: 40px;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  transition: transform 0.3s;
}

.contact-item:hover {
  transform: translateY(-2px);
  background: #f1f5f9;
}

.contact-item .icon {
  font-size: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.contact-item h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #4b5563;
}

.contact-item p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

/* Bio Section */
.bio-content {
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  line-height: 1.8;
  color: #4b5563;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
}

.action-buttons button {
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
}

.btn-map {
  background: #f0f9ff;
  color: #0369a1;
}

.btn-map:hover {
  background: #e0f2fe;
}

.btn-contact {
  background: #dbeafe;
  color: #1d4ed8;
}

.btn-contact:hover {
  background: #bfdbfe;
}

.btn-edit {
  background: #fef3c7;
  color: #92400e;
}

.btn-edit:hover {
  background: #fde68a;
}

/* Not Found State */
.not-found {
  text-align: center;
  padding: 80px 20px;
}

.not-found-icon {
  font-size: 64px;
  margin-bottom: 24px;
  display: block;
}

.not-found h2 {
  font-size: 24px;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.not-found p {
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
</style>
