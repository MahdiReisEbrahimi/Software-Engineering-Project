<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBlogById } from '@/services/blog.service'
import type { BlogArticle } from '@/Types/blog'

/* ======================
   Router
====================== */
const route = useRoute()
const router = useRouter()

const blogId = Number(route.params.id)

/* ======================
   State
====================== */
const blog = ref<BlogArticle | null>(null)
const loading = ref(true)
const error = ref('')

/* ======================
   Lifecycle
====================== */
onMounted(async () => {
  if (isNaN(blogId)) {
    error.value = 'مقاله نامعتبر است'
    loading.value = false
    return
  }

  try {
    const result = await getBlogById(blogId)
    if (!result) {
      error.value = 'مقاله مورد نظر یافت نشد'
    } else {
      blog.value = result
    }
  } catch (e) {
    error.value = 'خطا در دریافت مقاله'
  } finally {
    loading.value = false
  }
})

/* ======================
   Actions
====================== */
function goToPayment() {
  router.push({
    path: '/payment',
    query: {
      type: 'subscription',
      reason: 'blog',
    },
  })
}
</script>

<template>
  <section class="max-w-3xl mx-auto p-6">

    <!-- Loading -->
    <p v-if="loading" class="text-gray-500">
      در حال بارگذاری مقاله...
    </p>

    <!-- Error -->
    <p v-else-if="error" class="text-red-600">
      {{ error }}
    </p>

    <!-- Article -->
    <article v-else class="space-y-4">
      <h1 class="text-2xl font-bold">
        {{ blog?.title }}
      </h1>

      <div class="text-sm text-gray-400 flex gap-4">
        <span>{{ blog?.author }}</span>
        <span>{{ blog?.publishedAt }}</span>
      </div>

      <!-- Premium Gate -->
      <div
        v-if="blog?.isPremium"
        class="border border-yellow-300 bg-yellow-50 p-4 rounded"
      >
        <p class="text-yellow-800 font-semibold mb-2">
          این مقاله ویژه است
        </p>
        <p class="text-sm mb-3">
          برای مشاهده کامل، اشتراک تهیه کنید.
        </p>

        <button
          @click="goToPayment"
          class="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          ارتقا اشتراک
        </button>
      </div>

      <!-- Content -->
      <p
        v-else
        class="leading-7 text-gray-800 whitespace-pre-line"
      >
        {{ blog?.content }}
      </p>
    </article>

  </section>
</template>
