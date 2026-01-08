<template>
  <div class="lawyer-card" @click="goToProfile">
    <div class="lawyer-card__image">
      <img
        :src="lawyer.profileImage || '/default-lawyer.jpg'"
        :alt="lawyer.specialization"
        class="profile-image"
      />
      <div v-if="lawyer.isVerified" class="verified-badge">
        <span>✓</span>
      </div>
    </div>

    <div class="lawyer-card__content">
      <h3 class="lawyer-card__title">{{ lawyer.specialization }}</h3>
      <p class="lawyer-card__license">پروانه: {{ lawyer.licenseNumber }}</p>

      <div class="lawyer-card__details">
        <div class="detail-item">
          <i class="icon experience">⏳</i>
          <span>{{ lawyer.experienceYears }} سال تجربه</span>
        </div>
        <div class="detail-item">
          <i class="icon location">📍</i>
          <span>{{ lawyer.address }}</span>
        </div>
        <div class="detail-item">
          <i class="icon phone">📞</i>
          <span>{{ lawyer.phoneNumber }}</span>
        </div>
      </div>

      <div class="lawyer-card__bio">
        <p>{{ truncateText(lawyer.bio, 100) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Lawyer } from '@/Types/lawyer.types';

interface Props {
  lawyer: Lawyer;
}

const props = defineProps<Props>();
const router = useRouter();

const goToProfile = () => {
  router.push({
    name: 'lawyer-profile',
    params: { id: props.lawyer.id }
  });
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
</script>

<style scoped>
.lawyer-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e9ecef;
}

.lawyer-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.lawyer-card__image {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.verified-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #10b981;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.lawyer-card__content {
  padding: 20px;
}

.lawyer-card__title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.lawyer-card__license {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #6b7280;
}

.lawyer-card__details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4b5563;
}

.icon {
  font-size: 16px;
}

.lawyer-card__bio {
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.lawyer-card__bio p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
}
</style>
