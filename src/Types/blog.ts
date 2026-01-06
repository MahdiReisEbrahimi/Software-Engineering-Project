// src/types/blog.ts

export interface BlogPost {
  id: number;
  categoryId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  isPublished: boolean;
  authorId: number;
  publishedAt: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  // Optional fields from relations
  author?: {
    id: number;
    name: string;
    email?: string;
    avatar?: string;
  };
  category?: BlogCategory;
  tags?: string[];
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  postCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBlogPostDto {
  categoryId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  isPublished: boolean;
}

export interface UpdateBlogPostDto extends Partial<CreateBlogPostDto> {}

export interface BlogFilters {
  skip?: number;
  limit?: number;
  published_only?: boolean;
  category_id?: number;
  search?: string;
}

export interface BlogPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  totalViews: number;
  categoriesCount: number;
}
