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
      component: import('@/views/lowyers/Lowyers.vue'),
      meta: {
        icon: 'HeOutlineCityWorker',
      },
    },
  {
      path: '/blog',
      name: 'blog-list',
      component: () => import('@/views/blog/BlogListView.vue'),
      meta: { title: 'وبلاگ حقوقی', icon:'MiSolidArticle'}
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: () => import('@/views/blog/BlogPostView.vue'),
      meta: { title: 'مقاله' }
    },
    {
      path: '/blog/manage',
      name: 'blog-manage',
      component: () => import('@/views/blog/BlogManageView.vue'),
      meta: {
        title: 'مدیریت مقالات',
        requiresAuth: true,
        roles: ['admin', 'lawyer']
      }
    },
    {
      path: '/blog/edit/:id',
      name: 'blog-edit',
      component: () => import('@/views/blog/BlogManageView.vue'),
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


// Navigation Guard برای بررسی دسترسی
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.meta.roles) {
    const userRole = authStore.user?.role
    if (!userRole || !to.meta.roles.includes(userRole)) {
      next({ name: 'forbidden' })
      return
    }
  }

  next()
})
export default router
