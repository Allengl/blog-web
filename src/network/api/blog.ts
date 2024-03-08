import { BlogPost, BlogPostPage } from "@/models/blog-post";
import api from "@/network/axiosInstance";

export async function getBlogPosts(page: number = 1) {
  const response = await api.get<BlogPostPage>("/posts?page=" + page);
  return response.data;
}

export async function getAllBlogPostSlugs() {
  const response = await api.get<string[]>("/posts/slugs");
  return response.data;
}

export async function getBlogPostBySlug(slug: string) {
  const response = await api.get<BlogPostPage>("/posts/post/" + slug);
  return response.data;
}

interface CreateBlogPostValues {
  slug: string;
  title: string;
  summary: string;
  body: string;
}

export async function createBlogPost(input: CreateBlogPostValues) {
  const response = await api.post<BlogPost>("/posts", input, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

interface UpdateBlogPostValues {
  slug: string;
  title: string;
  summary: string;
  body: string;
}

export async function updateBlogPost(
  blogPostId: string,
  input: UpdateBlogPostValues,
) {
  await api.patch<BlogPost>("/posts/" + blogPostId, input, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function deleteBlogPost(blogPostId: string) {
  await api.delete("/posts/" + blogPostId);
}
