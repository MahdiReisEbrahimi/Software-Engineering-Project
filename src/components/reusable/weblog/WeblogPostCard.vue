<template>
  <article
    @click="$emit('click', post)"
    class="weblog-post-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col"
  >
    <div class="relative h-48 overflow-hidden">
      <img
        :src="post.featuredImage || '/images/weblog-default.jpg'"
        :alt="post.title"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
      <span class="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
        {{ categoryName }}
      </span>
    </div>

    <div class="p-6 flex-grow flex flex-col">
      <div class="flex items-center text-sm text-gray-500 mb-3">
        <span class="ml-3">{{ formatDate(post.publishedAt) }}</span>
        <span class="flex items-center">
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {{ post.viewCount }}
        </span>
      </div>

      <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
        {{ post.title }}
      </h3>

      <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">
        {{ post.excerpt }}
      </p>

      <button
        class="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors mt-auto"
        @click.stop="$emit('read-more', post)"
      >
        مطالعه مقاله
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import { useWeblogStore } from '@/stores/weblogStore'
import type { WeblogPost } from '@/types/weblog'

const props = defineProps<{
  post: WeblogPost
}>()

defineEmits<{
  click: [post: WeblogPost]
  'read-more': [post: WeblogPost]
}>()

const weblogStore = useWeblogStore()

const categoryName = computed(() => {
  const category = weblogStore.categories.find(c => c.id === props.post.categoryId)
  return category?.name || 'حقوقی'
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fa-IR')
}
</script>

<style scoped>
.weblog-post-card {
  height: 100%;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
