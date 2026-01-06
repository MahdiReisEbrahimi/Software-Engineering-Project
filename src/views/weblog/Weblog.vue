<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAllBlogs } from '@/services/blog.service'
import type { BlogArticle } from '@/Types/blog'
import BlogCard from '@/components/reusable/weblog/BlogCard.vue'

const blogs = ref<BlogArticle[]>([])
const loading = ref(true)

onMounted(async () => {
  blogs.value = await getAllBlogs()
  loading.value = false
})
</script>

<template>
  <section class="p-10 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">
      وبلاگ حقوقی
    </h1>

    <div v-if="loading" class="text-center">
      در حال بارگذاری...
    </div>

    <div
      v-else
      class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <BlogCard
        v-for="article in blogs"
        :key="article.id"
        :article="article"
      />
    </div>
  </section>
</template>
