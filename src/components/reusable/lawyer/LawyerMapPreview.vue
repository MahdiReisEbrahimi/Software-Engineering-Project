<template>
  <div class="lawyer-map-preview">
    <div v-if="loading" class="map-loading">
      در حال بارگذاری نقشه...
    </div>
    <div v-else>
      <div ref="mapContainer" class="map-container"></div>
      <div class="map-info">
        <p><strong>آدرس:</strong> {{ lawyer.address }}</p>
        <button @click="goToFullMap" class="btn-view-map">
          نمایش روی نقشه اصلی
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { Lawyer } from '@/Types/lawyer.types';

interface Props {
  lawyer: Lawyer;
}

const props = defineProps<Props>();

const router = useRouter();
const mapContainer = ref<HTMLElement | null>(null);
const loading = ref(true);

onMounted(() => {
  initializeMap();
});

watch(() => props.lawyer, () => {
  initializeMap();
}, { deep: true });

const initializeMap = () => {
  loading.value = true;

  // از سرویس نقشه همکارتان استفاده کنید
  // این یک نمونه ساده است
  setTimeout(() => {
    if (mapContainer.value) {
      // کد واقعی نقشه را اینجا اضافه کنید
      mapContainer.value.innerHTML = `
        <div style="
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        ">
          نقشه موقعیت وکیل
          <br/>
          (مختصات: ${props.lawyer.latitude}, ${props.lawyer.longitude})
        </div>
      `;
    }
    loading.value = false;
  }, 500);
};

const goToFullMap = () => {
  router.push({
    name: 'map',
    query: { lawyerId: props.lawyer.id.toString() }
  });
};
</script>

<style scoped>
.lawyer-map-preview {
  margin-top: 20px;
}

.map-loading {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 8px;
  color: #64748b;
}

.map-container {
  height: 200px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.map-info {
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}

.map-info p {
  margin: 0 0 12px 0;
  color: #475569;
}

.btn-view-map {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-view-map:hover {
  background: #2563eb;
}
</style>
