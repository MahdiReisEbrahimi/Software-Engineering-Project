<template>
  <div id="map" class="h-2/3 m-2"></div>
  <div
    v-if="showDetails"
    class="bg-white shadow-lg p-6 w-9/10 mx-2 max-w-full font-sans text-gray-800"
  >
    <div>
      <div class="flex">
        <div class="flex flex-col items-center mb-4">
          <h2 class="text-xl font-bold">مهدی ابراهیمی</h2>
        </div>

        <ul class="text-right list-disc list-inside mb-4 space-y-1 text-sm">
          <li>اختلافات خانوادگی</li>
          <li>مشکلات سیاسی</li>
          <li>ورشکستگی</li>
        </ul>

        <p class="text-center text-gray-600 text-sm">با بیش از 3 سال سابقه درخشان</p>
      </div>
      <div>
        <img src="" alt="lawyerPic" class="w-20 h-20 rounded-full mb-2 border-2 border-blue-400" />
        <div class="flex items-center mt-1">
          <span class="text-yellow-400">★★★★☆</span>
          <span class="text-gray-500 text-sm ml-2">(12 نظر)</span>
        </div>
      </div>
    </div>
    <button
      @click="showDetails = false"
      class="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
    >
      دریافت مشاوره
    </button>
  </div>

  <div v-if="showDetails" class="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet.markercluster'

const showDetails = ref(false)

const markers = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 40,
})

onMounted(() => {
  const map = L.map('map').setView([35.6892, 51.389], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map)

  fetch('/assets/lawyers.geojson')
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
          const lowyerPopup = L.popup({
            closeButton: false,
            autoClose: false,
          }).setContent(`
          <div class="bg-white shadow-lg rounded-xl w-64 p-4 font-sans text-gray-800">

            <div class="flex flex-col items-center">
              <img src="${feature.properties.imgLink}" alt="lawyerPic" class="w-16 h-16 rounded-full mb-3 border-2 border-blue-400" />
              <h3 class="font-bold text-lg mb-1">${feature.properties.name}</h3>

              <div class="flex items-center mb-3">
                ${'★'.repeat(feature.properties.rating || 0)}
                ${'☆'.repeat(5 - (feature.properties.rating || 0))}
                <span class="ml-2 text-sm text-gray-500">(${feature.properties.reviews || 0} نظر)</span>
              </div>
            </div>

            <ul class="list-disc list-inside mb-2 text-sm text-right space-y-1">
              ${
                feature.properties.services
                  ? feature.properties.services.map((s) => `<li>${s}</li>`).join('')
                  : `<li>Expert in</li>`
              }
            </ul>

            <!-- توضیح کوتاه -->
            <p class="text-xs text-gray-600 text-center">${feature.properties.description || 'با بیش از 3 سال سابقه درخشان'}</p>
          </div>
        `)

          const marker = L.marker(latlng).bindPopup(lowyerPopup)

          marker.on('mouseover', () => marker.openPopup())
          marker.on('mouseout', () => marker.closePopup())
          marker.on('click', () => (showDetails.value = true))

          markers.addLayer(marker)
          return marker
        },
      })

      map.addLayer(markers)
    })
})
</script>
<style scoped>
::v-deep .leaflet-popup-content-wrapper,
.leaflet-popup-content {
  padding: 0 !important;
  margin: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

::v-deep .leaflet-popup-tip {
  display: none !important;
}

::v-deep .leaflet-popup-content-wrapper {
  border-radius: 0 !important;
}

::v-deep .leaflet-popup-tip-container {
  margin: 0 !important;
}
</style>
