<template>
  <div class="blog-post-view container mx-auto px-4 py-8 max-w-4xl">
    <!-- دکمه بازگشت -->
    <button
      @click="goBack"
      class="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
    >
      <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      بازگشت به مقالات
    </button>

    <!-- لودینگ -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p class="mt-4 text-gray-600">در حال دریافت مقاله...</p>
    </div>

    <!-- خطا -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-600">
        <p class="text-xl">خطا در دریافت مقاله</p>
        <p class="mt-2">{{ error }}</p>
      </div>
    </div>

    <!-- محتوای مقاله -->
    <article v-else-if="post" class="bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- تصویر اصلی -->
      <img
        v-if="post.featuredImage"
        :src="post.featuredImage"
        :alt="post.title"
        class="w-full h-64 md:h-96 object-cover"
      />

      <div class="p-6 md:p-8">
        <!-- اطلاعات مقاله -->
        <div class="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            {{ getCategoryName(post.categoryId) }}
          </span>
          <span>{{ formatDate(post.publishedAt) }}</span>
          <span>👁️ {{ post.viewCount }} بازدید</span>
          <span v-if="post.author">✍️ {{ post.author.name }}</span>
        </div>

        <!-- عنوان -->
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ post.title }}
        </h1>

        <!-- خلاصه -->
        <p class="text-lg text-gray-600 mb-8">
          {{ post.excerpt }}
        </p>

        <!-- محتوای اصلی -->
        <div class="prose prose-lg max-w-none" v-html="post.content"></div>

        <!-- تگ‌ها -->
        <div v-if="post.tags && post.tags.length > 0" class="mt-8 pt-8 border-t border-gray-200">
          <h3 class="text-lg font-semibold mb-3">برچسب‌ها:</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- اقدامات -->
        <div class="mt-8 pt-8 border-t border-gray-200 flex justify-between items-center">
          <button
            @click="goBack"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            بازگشت
          </button>
          <div class="flex gap-3">
            <button
              v-if="canEditPost"
              @click="editPost"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              ویرایش
            </button>
            <button
              v-if="canDeletePost"
              @click="deletePost"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blogStore'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const authStore = useAuthStore()

const slug = computed(() => route.params.slug as string)

const loading = computed(() => blogStore.loading)
const error = computed(() => blogStore.error)
const post = computed(() => blogStore.currentPost)

const canEditPost = computed(() => {
  if (!post.value || !authStore.user) return false
  return authStore.user.role === 'admin' || authStore.user.id === post.value.authorId
})

const canDeletePost = computed(() => {
  return authStore.user?.role === 'admin'
})

// توابع
const goBack = () => {
  router.push({ name: 'blog-list' })
}

const editPost = () => {
  if (post.value) {
    router.push({ name: 'blog-edit', params: { id: post.value.id } })
  }
}

const deletePost = async () => {
  if (!post.value) return

  if (!confirm('آیا از حذف این مقاله اطمینان دارید؟')) return

  try {
    await blogStore.deletePost(post.value.id)
    router.push({ name: 'blog-list' })
  } catch (err) {
    console.error('Error deleting post:', err)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fa-IR')
}

const getCategoryName = (categoryId: number) => {
  const category = blogStore.categories.find(c => c.id === categoryId)
  return category?.name || 'بدون دسته‌بندی'
}

// lifecycle
onMounted(() => {
  blogStore.fetchPostBySlug(slug.value)
})
</script>

<style scoped>
.blog-post-view {
  min-height: 70vh;
}
</style>
