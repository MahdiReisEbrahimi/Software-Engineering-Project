import type { BlogArticle } from '@/Types/blog'

const mockBlogs: BlogArticle[] = [
  {
    id: 1,
    title: 'حقوق دیجیتال چیست؟',
    summary: 'آشنایی با مفهوم حقوق دیجیتال و اهمیت آن',
    content: 'متن کامل مقاله حقوق دیجیتال...',
    publishedAt: '2024-01-10',
    author: 'تیم حقوقی',
    isPremium: false,
  },
  {
    id: 2,
    title: 'قراردادهای هوشمند و قانون',
    summary: 'بررسی جایگاه قراردادهای هوشمند در حقوق',
    content: 'متن کامل مقاله قراردادهای هوشمند...',
    publishedAt: '2024-02-05',
    author: 'وکیل ارشد',
    isPremium: true,
  },
]

export function getBlogs(): Promise<BlogArticle[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockBlogs)
    }, 300)
  })
}

export function getBlogById(id: number): Promise<BlogArticle | undefined> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockBlogs.find(blog => blog.id === id))
    }, 300)
  })
}
