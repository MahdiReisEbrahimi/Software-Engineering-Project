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
          const marker = L.marker(latlng).bindPopup(`<b>${feature.properties.name}</b>`)
          markers.addLayer(marker)
          return marker
        },
      })

      map.addLayer(markers)
    })
})
</script>
