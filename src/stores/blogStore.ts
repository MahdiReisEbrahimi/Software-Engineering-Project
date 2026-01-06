import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BlogPost, BlogCategory, CreateBlogPostDto, UpdateBlogPostDto, BlogFilters } from '@/Types/blog'
import api from '@/services/api'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([])
  const categories = ref<BlogCategory[]>([])
  const currentPost = ref<BlogPost | null>(null)
  const currentCategory = ref<BlogCategory | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // دریافت همه مقالات
  const fetchPosts = async (params?: BlogFilters) => {
    loading.value = true
    try {
      const response = await api.get('/blog-posts/', { params })
      posts.value = response.data
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching posts:', err)
    } finally {
      loading.value = false
    }
  }

  // دریافت مقاله بر اساس ID
  const fetchPostById = async (postId: number) => {
    loading.value = true
    try {
      const response = await api.get(`/blog-posts/${postId}`)
      currentPost.value = response.data
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching post:', err)
    } finally {
      loading.value = false
    }
  }

  // دریافت مقاله بر اساس Slug
  const fetchPostBySlug = async (slug: string) => {
    loading.value = true
    try {
      const response = await api.get(`/blog-posts/slug/${slug}`)
      currentPost.value = response.data
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching post by slug:', err)
    } finally {
      loading.value = false
    }
  }

  // ایجاد مقاله جدید
  const createPost = async (postData: CreateBlogPostDto) => {
    loading.value = true
    try {
      const response = await api.post('/blog-posts/', postData)
      posts.value.unshift(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.message
      console.error('Error creating post:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // به‌روزرسانی مقاله
  const updatePost = async (postId: number, postData: UpdateBlogPostDto) => {
    loading.value = true
    try {
      const response = await api.put(`/blog-posts/${postId}`, postData)
      const index = posts.value.findIndex(p => p.id === postId)
      if (index !== -1) {
        posts.value[index] = response.data
      }
      if (currentPost.value?.id === postId) {
        currentPost.value = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message
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
      await api.delete(`/blog-posts/${postId}`)
      posts.value = posts.value.filter(p => p.id !== postId)
      if (currentPost.value?.id === postId) {
        currentPost.value = null
      }
    } catch (err: any) {
      error.value = err.message
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
      const response = await api.get('/blog-posts/my-posts/', { params })
      return response.data
    } catch (err: any) {
      error.value = err.message
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
      // فرض کنید endpoint دسته‌بندی‌ها وجود دارد
      // const response = await api.get('/blog-categories/')
      // categories.value = response.data

      // Mock data تا زمانی که API آماده شود
      categories.value = [
        { id: 1, name: 'حقوق خانواده', slug: 'family-law', postCount: 12 },
        { id: 2, name: 'حقوق تجارت', slug: 'commercial-law', postCount: 8 },
        { id: 3, name: 'حقوق کیفری', slug: 'criminal-law', postCount: 15 },
        { id: 4, name: 'حقوق مدنی', slug: 'civil-law', postCount: 10 },
        { id: 5, name: 'حقوق کار', slug: 'labor-law', postCount: 6 },
        { id: 6, name: 'حقوق مالکیت', slug: 'property-law', postCount: 7 },
      ]
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching categories:', err)
    } finally {
      loading.value = false
    }
  }

  // ایجاد دسته‌بندی جدید
  const createCategory = async (categoryData: Partial<BlogCategory>) => {
    loading.value = true
    try {
      // const response = await api.post('/blog-categories/', categoryData)
      // categories.value.push(response.data)

      // Mock response
      const newCategory: BlogCategory = {
        id: categories.value.length + 1,
        name: categoryData.name || 'New Category',
        slug: categoryData.name?.replace(/\s+/g, '-').toLowerCase() || 'new-category',
        description: categoryData.description,
        postCount: 0
      }
      categories.value.push(newCategory)
      return newCategory
    } catch (err: any) {
      error.value = err.message
      console.error('Error creating category:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // stateها
    posts,
    categories,
    currentPost,
    currentCategory,
    loading,
    error,

    // actions
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
