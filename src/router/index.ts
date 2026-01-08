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
    // {
    //   path: '/lowyers',
    //   name: 'lowyers',
    //   component: import('@/views/lawyers/Lowyers.vue'),
    //   meta: {
    //     icon: 'HeOutlineCityWorker',
    //   },
    // },

 // لیست وکلا
      {
        path: '/lawyers',
        name: 'lawyers-list',
        component: () => import('@/views/lawyers/LawyersListView.vue'),
        meta: {
          title: 'لیست وکلا',
          requiresAuth: false,
           icon: 'HeOutlineCityWorker'
        }
      },

      // پروفایل وکیل
      {
        path: '/lawyers/:id',
        name: 'lawyer-profile',
        component: () => import('@/views/lawyers/LawyerProfileView.vue'),
        props: true,
        meta: {
          title: 'پروفایل وکیل',
          requiresAuth: false
        }
      },

      // مدیریت پروفایل وکیل
      {
        path: '/lawyers/profile/me',
        name: 'lawyer-profile-manage',
        component:() => import('@/views/lawyers/LawyerProfileManageView.vue'),
        meta: {
          title: 'مدیریت پروفایل وکیل',
          requiresAuth: true,
          requiresLawyer: true
        }
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


// Navigation Guard برای بررسی نقش وکیل
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();

//   // اگر صفحه نیاز به احراز هویت دارد
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next('/auth/login');
//     return;
//   }

//   // اگر صفحه فقط برای وکلا قابل دسترسی است
//   if (to.meta.requiresLawyer && authStore.user?.role !== 'lawyer') {
//     next('/lawyers');
//     return;
//   }

//   // تغییر عنوان صفحه
//   if (to.meta.title) {
//     document.title = `${to.meta.title} - دستیار حقوقی`;
//   }

//   next();
// });


export default router
