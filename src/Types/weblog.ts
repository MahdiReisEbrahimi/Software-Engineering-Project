export interface WeblogPost {
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
  author?: {
    id: number;
    name: string;
    email?: string;
    avatar?: string;
  };
  category?: WeblogCategory;
  tags?: string[];
}

export interface WeblogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  postCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateWeblogPostDto {
  categoryId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  isPublished: boolean;
}

export interface UpdateWeblogPostDto extends Partial<CreateWeblogPostDto> {}

export interface WeblogFilters {
  skip?: number;
  limit?: number;
  published_only?: boolean;
  category_id?: number;
  search?: string;
}

export interface WeblogPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface WeblogStats {
  totalPosts: number;
  publishedPosts: number;
  totalViews: number;
  categoriesCount: number;
}
