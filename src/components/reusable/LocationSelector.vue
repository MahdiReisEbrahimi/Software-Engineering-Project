<template>
  <el-form-item label="محل دفتر">
    <div id="map" class="h-64 rounded-lg"></div>
  </el-form-item>
</template>

<script setup lang="ts">
import L from 'leaflet'
import { onMounted } from 'vue'

const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  const map = L.map('map').setView([35.6892, 51.3890], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

  let marker: L.Marker

  map.on('click', e => {
    if (marker) marker.remove()
    marker = L.marker(e.latlng).addTo(map)
    emit('update:modelValue', [e.latlng.lat, e.latlng.lng])
  })
})
</script>
