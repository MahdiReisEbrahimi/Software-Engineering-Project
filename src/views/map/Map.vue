<template>
  <div class="flex items-center text-lg my-4 justify-center text-white overflow-y-auto">
    <h1 class="font-bold">{{ $t('mapPage.findYourNearLoawyer') }}</h1>
    <BxSearchAlt class="text-xl mr-2" />
  </div>
  <div id="map" class="relative h-1/2 m-2">
    <button
      class="absolute z-10 top-20 left-3.5 border-1 border-black cursor-pointer bg-white p-1 text-xl"
      @click="locateMe"
    >
      <BxCurrentLocation />
    </button>
  </div>

  <div v-if="showDetails" class="flex py-4 mx-2 w-90vw justify-between">
    <NextLastBtn direction="right" @click="(direction) => nextLastBtnHandler(direction)" />
    <LowyerDetails :lowyerInfo="focusedLowyer!" />
    <NextLastBtn direction="left" @click="(direction) => nextLastBtnHandler(direction)" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet.markercluster'
import { BxSearchAlt, BxCurrentLocation } from '@kalimahapps/vue-icons'
import LowyerDetails from './components/LowyerDetails.vue'
import NextLastBtn from '@/components/reusable/NextLastBtn.vue'
import type { LowyerInfoType } from '@/Types/User.ts'

const showDetails = ref(false)
const focusedLowyer = ref<LowyerInfoType>()
const allLowyers = ref<LowyerInfoType[]>([])
const userLocation = ref<[number, number] | null>(null)

function locateMe() {
  if (!navigator.geolocation) {
    alert('مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      userLocation.value = [lat, lng]

      map.value?.flyTo([lat, lng], 14)

      L.circleMarker([lat, lng], {
        radius: 8,
        color: '#2563eb',
        fillColor: '#3b82f6',
        fillOpacity: 0.9,
      })
        .addTo(map.value!)
        .bindPopup('موقعیت شما')
        .openPopup()
    },
    () => {
      alert('دسترسی به موقعیت مکانی داده نشد')
    },
    {
      enableHighAccuracy: true,
    },
  )
}

const markers = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 15,
})

const map = ref<L.Map>()

onMounted(() => {
  map.value = L.map('map').setView([35.67, 51.471], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map.value)

  fetch('/assets/lawyers.geojson')
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
          const properties: LowyerInfoType = {
            ...feature.properties,
            coordinates: [latlng.lat, latlng.lng],
          }
          allLowyers.value.push(properties)

          const imgLink = properties.imgLink

          const lowyerImg = L.icon({
            iconUrl: `/assets/img/${imgLink}`,
            iconSize: [46, 46],
            iconAnchor: [23, 23],
            className: 'markerrrr',
          })
          const marker = L.marker(latlng, { icon: lowyerImg })

          marker.on('mouseover', () => marker.openPopup())
          marker.on('mouseout', () => marker.closePopup())
          marker.on('click', () => {
            showDetails.value = false
            focusedLowyer.value = {
              id: properties.id,
              name: properties.name,
              experience: properties.experience,
              imgLink: properties.imgLink,
              ratingScore: properties.ratingScore,
              reviews: properties.reviews,
              services: properties.services,
              coordinates: [feature.geometry.coordinates[1]!, feature.geometry.coordinates[0]!],
            }
            map.value?.flyTo(focusedLowyer.value?.coordinates, 14)
            showDetails.value = true
          })

          markers.addLayer(marker)
          return marker
        },
      })

      map.value?.addLayer(markers)
    })
})

function nextLastBtnHandler(direction: string) {
  if (!focusedLowyer.value || allLowyers.value.length === 0) return

  const id = focusedLowyer.value.id
  let index = allLowyers.value.findIndex((l) => l.id === id)

  if (direction === 'right') index++
  if (direction === 'left') index--

  if (index < 0) index = allLowyers.value.length - 1
  index %= allLowyers.value.length

  focusedLowyer.value = allLowyers.value[index]

  if (map.value && focusedLowyer.value?.coordinates) {
    const [lat, lng] = focusedLowyer.value.coordinates
    map.value.flyTo([lat, lng], 14)
  }

  showDetails.value = true
}
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
