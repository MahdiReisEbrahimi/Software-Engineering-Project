import { icon } from 'leaflet'
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
      component: () => import('@/views/lowyers/Lowyers.vue'),
      meta: {
        icon: 'HeOutlineCityWorker',
      },
    },
    {
      path: '/weblog',
      name: 'weblog-list',
      component: () => import('@/views/weblog/WeblogListView.vue'),
      meta: { title: 'وبلاگ حقوقی', icon:'MiSolidArticle'}
    },
    {
      path: '/weblog/:slug',
      name: 'weblog-post',
      component: () => import('@/views/weblog/WeblogPostView.vue'),
      meta: { title: 'مقاله' }
    },
    {
      path: '/weblog/manage',
      name: 'weblog-manage',
      component: () => import('@/views/weblog/WeblogManageView.vue'),
      meta: {
        title: 'مدیریت مقالات',
        requiresAuth: true,
        roles: ['admin', 'lawyer']
      }
    },
    {
      path: '/weblog/edit/:id',
      name: 'weblog-edit',
      component: () => import('@/views/weblog/WeblogManageView.vue'),
      meta: {
        title: 'ویرایش مقاله',
        requiresAuth: true,
        roles: ['admin', 'lawyer']
      }
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
      component: () => import('@/views/Auth/Auth.vue'),
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


// // Navigation Guard برای بررسی دسترسی
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()

//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next({ name: 'login', query: { redirect: to.fullPath } })
//     return
//   }

//   if (to.meta.roles) {
//     const userRole = authStore.user?.role
//     if (!userRole || !to.meta.roles.includes(userRole)) {
//       next({ name: 'forbidden' })
//       return
//     }
//   }

//   next()
// })

export default router
