import { BlogPostPage } from "@/models/blog-post";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import * as BlogApi from "@/network/api/blog";
import BlogPostsGrid from "@/components/BlogPostsGrid";
import { stringify } from "querystring";
import PaginationBar from "@/components/PaginationBar";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async ({
  query,
}) => {
  const page = parseInt(query.page?.toString() || "1");

  if (page < 1) {
    query.page = "1";
    return {
      redirect: {
        destination: "/blog?" + stringify(query),
        permanent: false,
      },
    };
  }

  const data = await BlogApi.getBlogPosts(page);

  if (data.totalPages > 0 && page > data.totalPages) {
    query.page = data.totalPages.toString();
    return {
      redirect: {
        destination: "/blog?" + stringify(query),
        permanent: false,
      },
    };
  }
  return { props: { data } };
};

interface BlogPageProps {
  data: BlogPostPage;
}

export default function BlogPage({
  data: { blogPosts, page, totalPages },
}: BlogPageProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>我的博客 -- 时光印迹</title>
        <meta name="description" content="write your time" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>我的博客</h1>
        {blogPosts.length > 0 && <BlogPostsGrid posts={blogPosts} />}
        <div className="d-flex flex-column align-items-center">
          {blogPosts.length === 0 && <p>没有博客</p>}
          {blogPosts.length > 0 && (
            <PaginationBar
              className="mt-4 "
              currentPage={page}
              pageCount={totalPages}
              onPageItemClicked={(page) => {
                router.push({ query: { ...router.query, page } });
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
