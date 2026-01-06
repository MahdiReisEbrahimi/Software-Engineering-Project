import type { BlogArticle } from '@/Types/blog'

const articles: BlogArticle[] = [
  {
    id: 1,
    title: 'آشنایی با حقوق شهروندی',
    excerpt: 'در این مقاله با حقوق اساسی شهروندان آشنا می‌شوید...',
    content: `
      <p>
        حقوق شهروندی مجموعه‌ای از حقوق و آزادی‌هاست که
        هر فرد در جامعه از آن برخوردار است.
      </p>
      <p>
        این حقوق شامل حق آزادی بیان، حق دادخواهی،
        و حق امنیت اجتماعی می‌شود.
      </p>
    `,
    author: 'تیم حقوقی',
    createdAt: '2024-01-10',
    isPremium: false,
  },
  {
    id: 2,
    title: 'قراردادهای کاری و نکات حقوقی',
    excerpt: 'قبل از امضای قرارداد کاری این نکات را بدانید...',
    content: `
      <p>
        قرارداد کاری یکی از مهم‌ترین اسناد حقوقی
        بین کارفرما و کارمند است.
      </p>
      <p>
        آگاهی از بندهای آن می‌تواند از اختلافات
        آینده جلوگیری کند.
      </p>
    `,
    author: 'وکیل پایه یک',
    createdAt: '2024-01-15',
    isPremium: true,
  },
]

export function getAllBlogs(): Promise<BlogArticle[]> {
  return Promise.resolve(articles)
}

export function getBlogById(id: number): Promise<BlogArticle | undefined> {
  return Promise.resolve(articles.find(a => a.id === id))
}
