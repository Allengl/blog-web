import { BlogPost } from "@/models/blog-post";
import { GetStaticPaths, GetStaticProps } from "next";
import * as BlogApi from "@/network/api/blog";
import Head from "next/head";
import styles from "@/styles/BlogPostPage.module.css";
import Link from "next/link";
import { formatDate } from "@/utils/utils";
import { FiEdit } from "react-icons/fi";

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await BlogApi.getAllBlogPostSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking", // auto generate slugs
  };
};

interface BlogPostPageProps {
  post: BlogPost;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug?.toString()!;
  if (!slug) throw Error("slug missing");

  const post = await BlogApi.getBlogPostBySlug(slug);
  return {
    props: {
      post,
    },
  };
};

const BlogPostPage = ({
  post: { _id, slug, title, summary, body, createdAt, updatedAt },
}: BlogPostPageProps) => {
  const createdUpdatedText =
    updatedAt > createdAt ? (
      <>
        updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
      </>
    ) : (
      <time dateTime={createdAt}>{formatDate(createdAt)}</time>
    );

  return (
    <>
      <Head>
        <title>{`${title} - 时光印迹`}</title>
        <meta name="description" content={summary} />
      </Head>

      <div className={styles.container}>
        <Link
          href={"/blog/edit-post/" + slug}
          className="btn btn-outline-primary d-inline-flex align-items-center mb-2 gap-1"
        >
          <FiEdit />
          编辑博客
        </Link>
        <div className="mb-4 text-center">
          <Link href="/blog">← 回到主页</Link>
        </div>

        <article>
          <div className="d-flex flex-column align-items-center">
            <h1 className="mb-3 text-center">{title}</h1>
            <p className="h5 mb-3 text-center">{summary}</p>
            <span className="text-muted">{createdUpdatedText}</span>
          </div>
          <div>{body}</div>
        </article>
      </div>
    </>
  );
};

export default BlogPostPage;
