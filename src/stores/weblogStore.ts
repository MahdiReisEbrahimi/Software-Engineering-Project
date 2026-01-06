import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WeblogPost, WeblogCategory, CreateWeblogPostDto, UpdateWeblogPostDto, WeblogFilters } from '@/Types/weblog'
import api from '@/services/api'

export const useWeblogStore = defineStore('weblog', () => {
  const posts = ref<WeblogPost[]>([])
  const categories = ref<WeblogCategory[]>([])
  const currentPost = ref<WeblogPost | null>(null)
  const currentCategory = ref<WeblogCategory | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // دریافت همه مقالات
  const fetchPosts = async (params?: WeblogFilters) => {
    loading.value = true
    try {
      const response = await api.get('/weblog-posts/', { params })
      posts.value = response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'خطای ناشناخته'
      console.error('Error fetching posts:', err)
    } finally {
      loading.value = false
    }
  }

  // دریافت مقاله بر اساس ID
  const fetchPostById = async (postId: number) => {
    loading.value = true
    try {
      const response = await api.get(`/weblog-posts/${postId}`)
      currentPost.value = response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'خطای ناشناخته'
      console.error('Error fetching post:', err)
    } finally {
      loading.value = false
    }
  }

  // دریافت مقاله بر اساس Slug
  const fetchPostBySlug = async (slug: string) => {
    loading.value = true
    try {
      const response = await api.get(`/weblog-posts/slug/${slug}`)
      currentPost.value = response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'خطای ناشناخته'
      console.error('Error fetching post by slug:', err)
    } finally {
      loading.value = false
    }
  }

  // ایجاد مقاله جدید
  const createPost = async (postData: CreateWeblogPostDto) => {
    loading.value = true
    try {
      const response = await api.post('/weblog-posts/', postData)
      posts.value.unshift(response.data)
      return response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'خطای ناشناخته'
      console.error('Error creating post:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // به‌روزرسانی مقاله
  const updatePost = async (postId: number, postData: UpdateWeblogPostDto) => {
    loading.value = true
    try {
      const response = await api.put(`/weblog-posts/${postId}`, postData)
      const index = posts.value.findIndex(p => p.id === postId)
      if (index !== -1) {
        posts.value[index] = response.data
      }
      if (currentPost.value?.id === postId) {
        currentPost.value = response.data
      }
      return response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'خطای ناشناخته'
      console.error('Error updating post:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // حذف مقاله
  const deletePost = async (postId: number) => {
    loading.value = true
    try {
      await api.delete(`/weblog-posts/${postId}`)
      posts.value = posts.value.filter(p => p.id !== postId)
      if (currentPost.value?.id === postId) {
        currentPost.value = null
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'خطای ناشناخته'
      console.error('Error deleting post:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // دریافت مقالات کاربر جاری
  const fetchMyPosts = async (params?: { skip?: number; limit?: number }) => {
    loading.value = true
    try {
      const response = await api.get('/weblog-posts/my-posts/', { params })
      return response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'خطای ناشناخته'
      console.error('Error fetching my posts:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // دریافت دسته‌بندی‌ها
  const fetchCategories = async () => {
    loading.value = true
    try {
      categories.value = [
        { id: 1, name: 'حقوق خانواده', slug: 'family-law', postCount: 12 },
        { id: 2, name: 'حقوق تجارت', slug: 'commercial-law', postCount: 8 },
        { id: 3, name: 'حقوق کیفری', slug: 'criminal-law', postCount: 15 },
        { id: 4, name: 'حقوق مدنی', slug: 'civil-law', postCount: 10 },
        { id: 5, name: 'حقوق کار', slug: 'labor-law', postCount: 6 },
        { id: 6, name: 'حقوق مالکیت', slug: 'property-law', postCount: 7 },
      ]
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'خطای ناشناخته'
      console.error('Error fetching categories:', err)
    } finally {
      loading.value = false
    }
  }

  // ایجاد دسته‌بندی جدید
  const createCategory = async (categoryData: Partial<WeblogCategory>) => {
    loading.value = true
    try {
      const newCategory: WeblogCategory = {
        id: categories.value.length + 1,
        name: categoryData.name || 'New Category',
        slug: categoryData.name?.replace(/\s+/g, '-').toLowerCase() || 'new-category',
        description: categoryData.description,
        postCount: 0
      }
      categories.value.push(newCategory)
      return newCategory
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'خطای ناشناخته'
      console.error('Error creating category:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    posts,
    categories,
    currentPost,
    currentCategory,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    fetchPostBySlug,
    createPost,
    updatePost,
    deletePost,
    fetchMyPosts,
    fetchCategories,
    createCategory,
  }
})
