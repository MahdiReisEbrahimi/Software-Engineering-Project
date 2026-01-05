<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBlogs } from '@/services/blog.service'
import type { BlogArticle } from '@/Types/blog'
import { useRouter } from 'vue-router'

/* ======================
   State
====================== */
const blogs = ref<BlogArticle[]>([])
const loading = ref(true)
const error = ref('')

const router = useRouter()

/* ======================
   Lifecycle
====================== */
onMounted(async () => {
  try {
    blogs.value = await getBlogs()
  } catch (e) {
    error.value = 'خطا در دریافت مقالات'
  } finally {
    loading.value = false
  }
})

/* ======================
   Methods
====================== */
function goToDetail(id: number) {
  router.push({
    name: 'blogDetail',
    params: { id },
  })
}
</script>

<template>
  <section class="p-6 max-w-5xl mx-auto">

    <!-- Page Title -->
    <h1 class="text-2xl font-bold mb-6">
      وبلاگ
    </h1>

    <!-- Loading -->
    <p v-if="loading" class="text-gray-500">
      در حال بارگذاری مقالات...
    </p>

    <!-- Error -->
    <p v-else-if="error" class="text-red-600">
      {{ error }}
    </p>

    <!-- Blog List -->
    <div v-else class="grid md:grid-cols-2 gap-6">
      <article
        v-for="blog in blogs"
        :key="blog.id"
        class="border rounded-xl p-4 hover:shadow transition cursor-pointer bg-white"
        @click="goToDetail(blog.id)"
      >
        <h2 class="text-lg font-semibold mb-2">
          {{ blog.title }}
        </h2>

        <p class="text-gray-600 text-sm mb-4">
          {{ blog.summary }}
        </p>

        <div class="flex justify-between text-xs text-gray-400">
          <span>{{ blog.author }}</span>
          <span>{{ blog.publishedAt }}</span>
        </div>

        <!-- Premium badge (future-ready) -->
        <span
          v-if="blog.isPremium"
          class="inline-block mt-3 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
        >
          ویژه
        </span>
      </article>
    </div>

  </section>
</template>
