<template>
  <div class="flex items-center text-lg my-4 justify-center text-white overflow-y-auto">
    <h1 class="font-bold">{{ $t('mapPage.findYourNearLoawyer') }}</h1>
    <BxSearchAlt class="text-xl mr-2" />
  </div>
  <div id="map" class="h-1/2 m-2"></div>
  <LowyerDetails :lowyerInfo="openLowyerDetails" :newClick="showDetails" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet.markercluster'
import { BxSearchAlt } from '@kalimahapps/vue-icons'
import LowyerDetails from './components/LowyerDetails.vue'

const showDetails = ref(false)
const openLowyerDetails = ref({
  name: 'Mahdi',
  experience: 10,
  imgLink: '',
  ratingScore: 0,
  reviews: [],
  services: [],
})
const markers = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 40,
})

onMounted(() => {
  const map = L.map('map').setView([35.67, 51.471], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map)

  fetch('/assets/lawyers.geojson')
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
          const properties = feature.properties
          const name = properties.name
          const experience = properties.age
          const imgLink = properties.imgLink
          const ratingScore = properties.ratingScore
          const reviews = properties.reviews
          const services = properties.services

          const lowyerImg = L.icon({
            iconUrl: `/assets/img/${imgLink}`,
            iconSize: [40, 40],
            iconAnchor: [40, 40],
            className: 'markerrrr',
          })
          const marker = L.marker(latlng, { icon: lowyerImg })

          marker.on('mouseover', () => marker.openPopup())
          marker.on('mouseout', () => marker.closePopup())
          marker.on('click', () => {
            showDetails.value = false
            openLowyerDetails.value = {
              name,
              experience,
              imgLink,
              ratingScore,
              reviews,
              services,
            }
            showDetails.value = true
          })

          markers.addLayer(marker)
          return marker
        },
      })

      map.addLayer(markers)
    })
})
</script>
<style scoped>
::v-deep .leaflet-marker-icon {
  border-radius: 50%;
  border: 3px solid #000000;
  overflow: hidden;
  width: 40px !important;
  height: 40px !important;
  object-fit: cover;
}

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
