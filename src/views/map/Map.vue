<template>
  <div id="map" class="h-2/3 m-2"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet.markercluster'

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
          })
        .setContent(`
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
              ${feature.properties.services
                ? feature.properties.services.map(s => `<li>${s}</li>`).join('')
                : `<li>Expert in</li>`}
            </ul>

            <!-- توضیح کوتاه -->
            <p class="text-xs text-gray-600 text-center">${feature.properties.description || 'با بیش از 3 سال سابقه درخشان'}</p>
          </div>
        `)

          const marker = L.marker(latlng).bindPopup(lowyerPopup)

          marker.on('mouseover', () => marker.openPopup())
          marker.on('mouseout', () => marker.closePopup())

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
