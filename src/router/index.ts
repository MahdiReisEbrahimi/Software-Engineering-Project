import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AI Chat',
      component: () => import('@/views/chatbot/ChatBot.vue'),
      meta: {
        icon: 'HeFilledArtificialIntelligence',
      },
    },
    {
      path: '/map',
      name: 'Map',
      component: () => import('@/views/map/Map.vue'),
      meta: {
        icon: 'FaMapLocationDot',
      },
    },
    {
      path: '/lowyers',
      name: 'Lowyers',
      component: import('@/views/lowyers/Lowyers.vue'),
      meta: {
        icon: 'HeOutlineCityWorker',
      },
    },
    {
      path: '/weblog',
      name: 'Weblog',
      component: () => import('@/views/weblog/Weblog.vue'),
      meta: {
        icon: 'MiSolidArticle',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/profile/Profile.vue'),
      meta: {
        icon: 'CaUserAvatarFilled',
      },
    },
    {
      path: '/Auth',
      name: 'Login',
      component: () => import('@/views/Auth/Login.vue'),
      meta: {
        icon: 'BsPersonFillAdd',
      },
    },
    {
      path: '/about',
      name: 'About us',
      component: () => import('@/views/aboutUs/About.vue'),
      meta: {
        icon: 'CoBrandAboutMe',
      },
    },
  ],
})

export default router
