export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostPage {
  blogPosts: BlogPost[];
  page: number;
  totalPages: number;
}
