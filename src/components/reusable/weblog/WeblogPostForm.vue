<template>
  <div class="weblog-post-form fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-xl bg-white">
      <!-- هدر -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-gray-900">
          {{ isEditing ? 'ویرایش مقاله' : 'مقاله جدید' }}
        </h3>
        <button
          @click="$emit('cancel')"
          class="text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>
      </div>

      <!-- فرم -->
      <form @submit.prevent="handleSubmit">
        <!-- عنوان -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            عنوان مقاله *
          </label>
          <input
            v-model="form.title"
            id="title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="عنوان مقاله..."
          />
        </div>

        <!-- Slug -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="slug">
            Slug (نامک) *
          </label>
          <input
            v-model="form.slug"
            id="slug"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example-slug"
          />
        </div>

        <!-- دسته‌بندی -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
            دسته‌بندی *
          </label>
          <select
            v-model="form.categoryId"
            id="category"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">انتخاب دسته‌بندی</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- تصویر -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
            تصویر شاخص
          </label>
          <input
            v-model="form.featuredImage"
            id="image"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <!-- خلاصه -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="excerpt">
            خلاصه *
          </label>
          <textarea
            v-model="form.excerpt"
            id="excerpt"
            rows="3"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="خلاصه کوتاه از مقاله..."
          ></textarea>
        </div>

        <!-- محتوا -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
            محتوای مقاله *
          </label>
          <textarea
            v-model="form.content"
            id="content"
            rows="10"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            placeholder="محتوای مقاله..."
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">
            از HTML برای قالب‌بندی استفاده کنید.
          </p>
        </div>

        <!-- وضعیت انتشار -->
        <div class="mb-6 flex items-center">
          <input
            v-model="form.isPublished"
            id="published"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ml-2"
          />
          <label for="published" class="text-gray-700">
            انتشار فوری مقاله
          </label>
        </div>

        <!-- خطاها -->
        <div v-if="errors.length > 0" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <ul class="text-red-600 text-sm">
            <li v-for="error in errors" :key="error" class="mb-1">
              {{ error }}
            </li>
          </ul>
        </div>

        <!-- دکمه‌ها -->
        <div class="flex justify-end gap-3">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            انصراف
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <span v-if="submitting" class="ml-2">
              <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            </span>
            {{ submitting ? 'در حال ذخیره...' : isEditing ? 'ذخیره تغییرات' : 'ایجاد مقاله' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useWeblogStore } from '@/stores/weblogStore'
import type { WeblogPost, CreateWeblogPostDto, UpdateWeblogPostDto } from '@/types/weblog'

const props = defineProps<{
  post?: WeblogPost
}>()

const emit = defineEmits<{
  submit: [data: CreateWeblogPostDto | UpdateWeblogPostDto]
  cancel: []
}>()

const weblogStore = useWeblogStore()
const categories = ref<any[]>([])
const submitting = ref(false)
const errors = ref<string[]>([])

const isEditing = computed(() => !!props.post)

const form = ref({
  title: '',
  slug: '',
  categoryId: 0,
  featuredImage: '',
  excerpt: '',
  content: '',
  isPublished: false
})

// مقداردهی اولیه فرم در حالت ویرایش
onMounted(() => {
  if (props.post) {
    form.value = {
      title: props.post.title,
      slug: props.post.slug,
      categoryId: props.post.categoryId,
      featuredImage: props.post.featuredImage || '',
      excerpt: props.post.excerpt,
      content: props.post.content,
      isPublished: props.post.isPublished
    }
  }
  // دریافت دسته‌بندی‌ها
  categories.value = weblogStore.categories
})

const validateForm = (): boolean => {
  errors.value = []

  if (!form.value.title.trim()) {
    errors.value.push('عنوان الزامی است')
  }

  if (!form.value.slug.trim()) {
    errors.value.push('Slug الزامی است')
  }

  if (form.value.categoryId <= 0) {
    errors.value.push('دسته‌بندی الزامی است')
  }

  if (!form.value.excerpt.trim()) {
    errors.value.push('خلاصه الزامی است')
  }

  if (!form.value.content.trim()) {
    errors.value.push('محتوای مقاله الزامی است')
  }

  return errors.value.length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  submitting.value = true
  try {
    emit('submit', { ...form.value })
  } catch (err) {
    errors.value.push('خطا در ذخیره‌سازی')
    console.error('Form error:', err)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.weblog-post-form {
  font-family: system-ui, -apple-system, sans-serif;
}
</style>
