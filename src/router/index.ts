import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'aiChat',
      component: () => import('@/views/chatbot/ChatBot.vue'),
      meta: {
        icon: 'HeFilledArtificialIntelligence',
      },
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/map/Map.vue'),
      meta: {
        icon: 'FaMapLocationDot',
      },
    },
    {
      path: '/lowyers',
      name: 'lowyers',
      component: import('@/views/lowyers/Lowyers.vue'),
      meta: {
        icon: 'HeOutlineCityWorker',
      },
    },
    {
      path: '/weblog',
      name: 'weblog',
      component: () => import('@/views/weblog/Weblog.vue'),
      meta: {
        icon: 'MiSolidArticle',
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/Profile.vue'),
      meta: {
        icon: 'CaUserAvatarFilled',
      },
    },
    {
      path: '/Auth',
      name: 'login',
      component: () => import('@/views/Auth/Login.vue'),
      meta: {
        icon: 'BsPersonFillAdd',
      },
    },
    {
      path: '/about',
      name: 'aboutUs',
      component: () => import('@/views/aboutUs/About.vue'),
      meta: {
        icon: 'CoBrandAboutMe',
      },
    },
  ],
})

export default router
