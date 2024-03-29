import { BlogPost } from "@/models/blog-post";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import * as BlogApi from "@/network/api/blog";
import Head from "next/head";
import styles from "@/styles/BlogPostPage.module.css";
import Link from "next/link";
import { formatDate } from "@/utils/utils";
import { FiEdit } from "react-icons/fi";
import Markdown from "@/components/Markdown";

interface BlogPostPageProps {
  post: BlogPost;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug?.toString()!;
  if (!slug) throw Error("找不到标签");

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
          <Markdown>{body}</Markdown>
        </article>
      </div>
    </>
  );
};

export default BlogPostPage;
