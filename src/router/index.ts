import { createRouter, createWebHistory } from 'vue-router'
import LowyersView from '@/views/lowyers/lowyersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/lowyers',
      name: 'lowyers',
      component: LowyersView,
    },
  ],
})

export default router
