<template>
  <div class="weblog-list-view container mx-auto px-4 py-8 bg-gray-100">
    <div class="flex flex-col lg:flex-row gap-8">
      <aside class="lg:w-1/4">
        <WeblogCategories
          :categories="categories"
          :selectedCategoryId="selectedCategoryId"
          :totalPosts="filteredPosts.length"
          :loading="loading"
          @update:selectedCategoryId="selectedCategoryId = $event"
          @category-selected="handleCategorySelected"
          @category-created="handleCategoryCreated"
        />
      </aside>

      <main class="lg:w-3/4">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">وبلاگ حقوقی</h1>
          <p class="text-lg text-gray-700 max-w-2xl mx-auto">
            مقالات آموزشی حقوقی برای افزایش آگاهی عمومی در زمینه‌های مختلف قانونی
          </p>
        </div>

        <div class="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="flex-1 max-w-md">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="جستجو در مقالات..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              />
              <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex gap-4">
            <button
              v-if="isAdminOrLawyer"
              @click="goToManage"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              مدیریت مقالات
            </button>
          </div>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p class="mt-4 text-gray-600">در حال دریافت مقالات...</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-600">
            <p class="text-xl">خطا در دریافت مقالات</p>
            <p class="mt-2">{{ error }}</p>
          </div>
        </div>

        <div v-else>
          <div v-if="filteredPosts.length === 0" class="text-center py-12">
            <p class="text-gray-500 text-lg">مقاله‌ای یافت نشد.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WeblogPostCard
              v-for="post in paginatedPosts"
              :key="post.id"
              :post="post"
              @click="viewPost(post)"
            />
          </div>

          <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-4 py-2 rounded-lg transition-colors',
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useWeblogStore } from '@/stores/weblogStore'
import { useAuthStore } from '@/stores/authStore'
import WeblogPostCard from '@/components/reusable/weblog/WeblogPostCard.vue'
import WeblogCategories from '@/components/reusable/weblog/WeblogCategories.vue'
import type { WeblogCategory, WeblogPost } from '@/Types/weblog'

const router = useRouter()
const weblogStore = useWeblogStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const selectedCategoryId = ref<number | null>(null)
const currentPage = ref(1)
const postsPerPage = 9

const isAdminOrLawyer = computed(() => {
  const user = authStore.user
  return user && (user.role === 'admin' || user.role === 'lawyer')
})

const categories = computed(() => weblogStore.categories)
const loading = computed(() => weblogStore.loading)
const error = computed(() => weblogStore.error)

const filteredPosts = computed(() => {
  let posts = weblogStore.posts.filter((post: WeblogPost) => post.isPublished)

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter((post: WeblogPost) =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    )
  }

  if (selectedCategoryId.value) {
    posts = posts.filter((post: WeblogPost) => post.categoryId === selectedCategoryId.value)
  }

  return posts
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage)
})

const viewPost = (post: WeblogPost) => {
  router.push({ name: 'weblog-post', params: { slug: post.slug } })
}

const goToManage = () => {
  router.push({ name: 'weblog-manage' })
}

const handleCategorySelected = (categoryId: number | null) => {
  currentPage.value = 1
  // استفاده از پارامتر
  console.log('Selected category:', categoryId)
}

const handleCategoryCreated = (category: WeblogCategory) => {
  categories.value.push(category)
}

onMounted(() => {
  weblogStore.fetchPosts({ published_only: true })
  weblogStore.fetchCategories()
})

watch([searchQuery, selectedCategoryId], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.weblog-list-view {
  min-height: 70vh;
}
</style>
