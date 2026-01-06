<template>
  <div class="blog-list-view container mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- سایدبار با دسته‌بندی‌ها -->
      <aside class="lg:w-1/4">
        <BlogCategories
          :categories="categories"
          :selectedCategoryId="selectedCategoryId"
          :totalPosts="filteredPosts.length"
          :loading="loading"
          @update:selectedCategoryId="selectedCategoryId = $event"
          @category-selected="handleCategorySelected"
          @category-created="handleCategoryCreated"
        />
      </aside>

      <!-- محتوای اصلی -->
      <main class="lg:w-3/4">
        <!-- هدر -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">وبلاگ حقوقی</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            مقالات آموزشی حقوقی برای افزایش آگاهی عمومی در زمینه‌های مختلف قانونی
          </p>
        </div>

        <!-- فیلترها و جستجو -->
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

        <!-- وضعیت لودینگ -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p class="mt-4 text-gray-600">در حال دریافت مقالات...</p>
        </div>

        <!-- خطا -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-600">
            <p class="text-xl">خطا در دریافت مقالات</p>
            <p class="mt-2">{{ error }}</p>
          </div>
        </div>

        <!-- لیست مقالات -->
        <div v-else>
          <!-- حالت خالی -->
          <div v-if="filteredPosts.length === 0" class="text-center py-12">
            <p class="text-gray-500 text-lg">مقاله‌ای یافت نشد.</p>
          </div>

          <!-- نمایش مقالات -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogPostCard
              v-for="post in paginatedPosts"
              :key="post.id"
              :post="post"
              @click="viewPost(post)"
            />
          </div>

          <!-- صفحه‌بندی -->
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
import { useBlogStore } from '@/stores/blogStore'
import { useAuthStore } from '@/stores/authStore'
import BlogPostCard from '@/components/reusable/blog/BlogPostCard.vue'
import BlogCategories from '@/components/reusable/blog/BlogCategories.vue'

const router = useRouter()
const blogStore = useBlogStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const selectedCategoryId = ref<number | null>(null)
const currentPage = ref(1)
const postsPerPage = 9

// محاسبه‌های reactive
const isAdminOrLawyer = computed(() => {
  const user = authStore.user
  return user && (user.role === 'admin' || user.role === 'lawyer')
})

const categories = computed(() => blogStore.categories)
const loading = computed(() => blogStore.loading)
const error = computed(() => blogStore.error)

const filteredPosts = computed(() => {
  let posts = blogStore.posts.filter(post => post.isPublished)

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    )
  }

  if (selectedCategoryId.value) {
    posts = posts.filter(post => post.categoryId === selectedCategoryId.value)
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

// توابع
const viewPost = (post: any) => {
  router.push({ name: 'blog-post', params: { slug: post.slug } })
}

const goToManage = () => {
  router.push({ name: 'blog-manage' })
}

const handleCategorySelected = (categoryId: number | null) => {
  currentPage.value = 1
  // می‌توانید عملیات اضافی انجام دهید
}

const handleCategoryCreated = (category: any) => {
  // اضافه کردن دسته‌بندی جدید به لیست
  // در واقعیت، این باید از طریق store انجام شود
  categories.value.push(category)
}

// lifecycle
onMounted(() => {
  blogStore.fetchPosts({ published_only: true })
  blogStore.fetchCategories()
})

// واکنش به تغییر فیلترها
watch([searchQuery, selectedCategoryId], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.blog-list-view {
  min-height: 70vh;
}
</style>
