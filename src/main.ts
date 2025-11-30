import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import App from './App.vue'
import router from './router'

import './index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
