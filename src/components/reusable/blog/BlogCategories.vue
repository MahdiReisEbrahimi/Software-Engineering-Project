<template>
  <div class="blog-categories bg-white rounded-xl shadow p-6">
    <!-- عنوان -->
    <h3 class="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
      دسته‌بندی‌ها
    </h3>

    <!-- جستجو در دسته‌بندی‌ها -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="جستجو در دسته‌بندی‌ها..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <!-- لیست دسته‌بندی‌ها -->
    <ul class="space-y-2 max-h-96 overflow-y-auto">
      <!-- گزینه همه دسته‌بندی‌ها -->
      <li>
        <button
          @click="selectCategory(null)"
          :class="[
            'w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200',
            selectedCategoryId === null
              ? 'bg-blue-50 border border-blue-200 text-blue-700'
              : 'hover:bg-gray-50 border border-transparent text-gray-700'
          ]"
        >
          <span class="font-medium">همه مقالات</span>
          <span class="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1">
            {{ totalPosts }}
          </span>
        </button>
      </li>

      <!-- دسته‌بندی‌ها -->
      <li v-for="category in filteredCategories" :key="category.id">
        <button
          @click="selectCategory(category.id)"
          :class="[
            'w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200',
            selectedCategoryId === category.id
              ? 'bg-blue-50 border border-blue-200 text-blue-700'
              : 'hover:bg-gray-50 border border-transparent text-gray-700'
          ]"
        >
          <div class="flex items-center">
            <!-- آیکون دسته‌بندی -->
            <div class="ml-3 w-2 h-2 rounded-full bg-blue-500"></div>
            <span class="font-medium text-right">{{ category.name }}</span>
          </div>
          <span class="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1">
            {{ category.postCount || 0 }}
          </span>
        </button>
      </li>

      <!-- حالت خالی -->
      <li v-if="filteredCategories.length === 0 && searchQuery" class="text-center py-4">
        <p class="text-gray-500 text-sm">دسته‌بندی یافت نشد</p>
      </li>

      <!-- لودینگ -->
      <li v-if="loading" class="text-center py-4">
        <div class="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
      </li>
    </ul>

    <!-- ایجاد دسته‌بندی جدید (برای ادمین) -->
    <div v-if="showAddCategory && (isAdmin || isLawyer)" class="mt-6 pt-6 border-t border-gray-200">
      <h4 class="text-lg font-semibold text-gray-900 mb-3">ایجاد دسته‌بندی جدید</h4>
      <form @submit.prevent="handleAddCategory" class="space-y-3">
        <input
          v-model="newCategory.name"
          type="text"
          placeholder="نام دسته‌بندی"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <textarea
          v-model="newCategory.description"
          placeholder="توضیحات (اختیاری)"
          rows="2"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <div class="flex gap-2">
          <button
            type="button"
            @click="showAddCategory = false"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            انصراف
          </button>
          <button
            type="submit"
            :disabled="addingCategory"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ addingCategory ? 'در حال ایجاد...' : 'ایجاد' }}
          </button>
        </div>
      </form>
    </div>

    <!-- دکمه ایجاد دسته‌بندی -->
    <div v-if="(isAdmin || isLawyer) && !showAddCategory" class="mt-6 pt-6 border-t border-gray-200">
      <button
        @click="showAddCategory = true"
        class="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
      >
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        ایجاد دسته‌بندی جدید
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import type { BlogCategory } from '@/Types/blog'

const props = defineProps<{
  categories: BlogCategory[]
  selectedCategoryId: number | null
  totalPosts: number
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:selectedCategoryId': [id: number | null]
  'category-selected': [id: number | null]
  'category-created': [category: BlogCategory]
}>()

const authStore = useAuthStore()
const searchQuery = ref('')
const showAddCategory = ref(false)
const addingCategory = ref(false)

const newCategory = ref({
  name: '',
  description: ''
})

// computed properties
const isAdmin = computed(() => authStore.user?.role === 'admin')
const isLawyer = computed(() => authStore.user?.role === 'lawyer')

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return props.categories
  }

  const query = searchQuery.value.toLowerCase()
  return props.categories.filter(category =>
    category.name.toLowerCase().includes(query) ||
    (category.description && category.description.toLowerCase().includes(query))
  )
})

// methods
const selectCategory = (id: number | null) => {
  emit('update:selectedCategoryId', id)
  emit('category-selected', id)
}

const handleAddCategory = async () => {
  if (!newCategory.value.name.trim()) return

  addingCategory.value = true
  try {
    // در اینجا باید API call برای ایجاد دسته‌بندی جدید انجام شود
    // const response = await api.post('/blog-categories/', newCategory.value)

    // فعلاً به صورت mock داده ایجاد می‌کنیم
    const mockCategory: BlogCategory = {
      id: Math.floor(Math.random() * 1000) + 100,
      name: newCategory.value.name,
      description: newCategory.value.description,
      slug: newCategory.value.name.replace(/\s+/g, '-').toLowerCase(),
      postCount: 0
    }

    emit('category-created', mockCategory)

    // ریست فرم
    newCategory.value = { name: '', description: '' }
    showAddCategory.value = false
    searchQuery.value = ''
  } catch (error) {
    console.error('Error creating category:', error)
  } finally {
    addingCategory.value = false
  }
}

// lifecycle
onMounted(() => {
  // اگر دسته‌بندی‌ها خالی هستند، می‌توانیم از API دریافت کنیم
  if (props.categories.length === 0) {
    // اینجا می‌توانید fetch categories را فراخوانی کنید
  }
})
</script>

<style scoped>
.blog-categories {
  position: sticky;
  top: 2rem;
}

/* استایل اسکرول بار */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
