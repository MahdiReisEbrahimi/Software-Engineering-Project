<script setup lang="ts">
import type { BlogArticle } from '@/Types/blog'
import BlogMeta from './BlogMeta.vue'

defineProps<{
  article: BlogArticle
}>()
</script>

<template>
  <div
    class="border rounded-xl p-4 hover:shadow transition bg-white flex flex-col justify-between"
  >
    <div>
      <h2 class="text-lg font-bold mb-2">
        {{ article.title }}
      </h2>

      <BlogMeta
        :author="article.author"
        :date="article.createdAt"
      />

      <p class="text-gray-600 mt-3">
        {{ article.excerpt }}
      </p>
    </div>

    <router-link
      :to="`/weblog/${article.id}`"
      class="mt-4 text-blue-600 font-semibold"
    >
      ادامه مطلب ←
    </router-link>
  </div>
</template>
