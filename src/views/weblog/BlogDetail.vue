<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBlogById } from '@/services/blog.service'
import type { BlogArticle } from '@/Types/blog'
import BlogMeta from '@/components/reusable/weblog/BlogMeta.vue'

const route = useRoute()
const router = useRouter()

const article = ref<BlogArticle | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  const data = await getBlogById(id)

  if (!data) {
    router.push('/weblog')
    return
  }

  article.value = data
})
</script>

<template>
  <section class="p-6 bg-gray-100 min-h-screen">
    <div
      v-if="article"
      class="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow"
    >
      <h1 class="text-2xl font-bold mb-2">
        {{ article.title }}
      </h1>

      <BlogMeta
        :author="article.author"
        :date="article.createdAt"
      />

      <div
        class="mt-6 prose prose-sm max-w-none"
        v-html="article.content"
      />

      <router-link
        to="/weblog"
        class="inline-block mt-6 text-blue-600 font-semibold"
      >
        → بازگشت به وبلاگ
      </router-link>
    </div>
  </section>
</template>
