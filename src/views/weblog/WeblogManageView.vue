<template>
  <div class="weblog-manage-view container mx-auto px-4 py-8">
    <!-- هدر -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">مدیریت مقالات</h1>
      <button
        @click="showCreateForm = true"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        مقاله جدید
      </button>
    </div>

    <!-- فرم ایجاد مقاله -->
    <WeblogPostForm
      v-if="showCreateForm"
      @submit="handleCreatePost"
      @cancel="showCreateForm = false"
    />

    <!-- فرم ویرایش -->
    <WeblogPostForm
      v-if="editingPost"
      :post="editingPost"
      @submit="handleUpdatePost"
      @cancel="editingPost = null"
    />

    <!-- لیست مقالات -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <!-- جدول -->
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              عنوان
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              وضعیت
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              تاریخ انتشار
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              بازدید
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              اقدامات
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="post in myPosts" :key="post.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <img
                  v-if="post.featuredImage"
                  :src="post.featuredImage"
                  :alt="post.title"
                  class="h-10 w-10 rounded-full object-cover ml-3"
                />
                <div class="text-sm font-medium text-gray-900">
                  {{ post.title }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  post.isPublished
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                ]"
              >
                {{ post.isPublished ? 'منتشر شده' : 'پیش‌نویس' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(post.publishedAt) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ post.viewCount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="viewPost(post)"
                class="text-blue-600 hover:text-blue-900 ml-3"
              >
                مشاهده
              </button>
              <button
                @click="editPost(post)"
                class="text-green-600 hover:text-green-900 ml-3"
              >
                ویرایش
              </button>
              <button
                @click="deletePost(post)"
                class="text-red-600 hover:text-red-900 ml-3"
              >
                حذف
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- حالت خالی -->
      <div v-if="myPosts.length === 0 && !loading" class="text-center py-12">
        <p class="text-gray-500">مقاله‌ای یافت نشد.</p>
      </div>

      <!-- لودینگ -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWeblogStore } from '@/stores/weblogStore'
import WeblogPostForm from '@/components/reusable/weblog/WeblogPostForm.vue'
import type { WeblogPost, CreateWeblogPostDto } from '@/Types/weblog'

const router = useRouter()
const weblogStore = useWeblogStore()

const showCreateForm = ref(false)
const editingPost = ref<WeblogPost | null>(null)
const myPosts = ref<WeblogPost[]>([])
const loading = ref(false)

// توابع
const loadMyPosts = async () => {
  loading.value = true
  try {
    const posts = await weblogStore.fetchMyPosts()
    myPosts.value = posts
  } catch (err) {
    console.error('Error loading posts:', err)
  } finally {
    loading.value = false
  }
}

const handleCreatePost = async (postData: CreateWeblogPostDto) => {
  try {
    await weblogStore.createPost(postData)
    showCreateForm.value = false
    await loadMyPosts()
  } catch (err) {
    console.error('Error creating post:', err)
  }
}

const handleUpdatePost = async (postData: Partial<WeblogPost>) => {
  if (!editingPost.value) return

  try {
    await weblogStore.updatePost(editingPost.value.id, postData)
    editingPost.value = null
    await loadMyPosts()
  } catch (err) {
    console.error('Error updating post:', err)
  }
}

const viewPost = (post: WeblogPost) => {
  router.push({ name: 'weblog-post', params: { slug: post.slug } })
}

const editPost = (post: WeblogPost) => {
  editingPost.value = { ...post }
}

const deletePost = async (post: WeblogPost) => {
  if (!confirm('آیا از حذف این مقاله اطمینان دارید؟')) return

  try {
    await weblogStore.deletePost(post.id)
    await loadMyPosts()
  } catch (err) {
    console.error('Error deleting post:', err)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fa-IR')
}

// lifecycle
onMounted(() => {
  loadMyPosts()
})
</script>

<style scoped>
.weblog-manage-view {
  min-height: 70vh;
}
</style>
