import { BlogPost } from "@/models/blog-post";
import { GetServerSideProps } from "next";
import * as BlogApi from "@/network/api/blog";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import FormInputField from "@/components/form/FormInputField";
import MarkdownEditor from "@/components/form/MarkdownEditor";
import LoadingButton from "@/components/LoadingButton";
import { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";

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

interface EditBlogPostPageProps {
  post: BlogPost;
}

interface EditPostFormData {
  slug: string;
  title: string;
  summary: string;
  body: string;
  featuredImage: FileList;
}

export default function EditBlogPostPage({ post }: EditBlogPostPageProps) {
  const router = useRouter();

  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);
  const [deletePending, setDeletePending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditPostFormData>({
    defaultValues: {
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      body: post.body,
    },
  });

  async function onSubmit({
    slug,
    title,
    summary,
    body,
    // featuredImage,
  }: EditPostFormData) {
    try {
      await BlogApi.updateBlogPost(post._id, {
        slug,
        title,
        summary,
        body,
        // featuredImage: featuredImage?.item(0) as File,
      });

      await router.push("/blog/" + slug);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // const generateSlugFromTitle = () => {
  //   if (getValues("slug")) return;
  //   const slug = generateSlug(getValues("title"));
  //   setValue("slug", slug, { shouldValidate: true });
  // };

  async function onDeleteConfirmed() {
    setShowDeleteConfirmationDialog(false);
    setDeletePending(true);
    try {
      await BlogApi.deleteBlogPost(post._id);
      await router.push("/blog");
    } catch (error) {
      console.error(error);
      alert(error);
      setDeletePending(false);
    }
  }

  return (
    <div>
      <h1>编辑博客</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          label="标题"
          register={register("title", { required: "required" })}
          placeholder="标题"
          maxLength={100}
          error={errors.title}
          // onBlur={generateSlugFromTitle}
        />
        <FormInputField
          label="标签"
          register={register("slug", { required: "required" })}
          placeholder="标签"
          maxLength={100}
          error={errors.slug}
        />
        <FormInputField
          label="摘要"
          register={register("summary", { required: "required" })}
          placeholder="摘要"
          maxLength={300}
          as="textarea"
          error={errors.summary}
        />
        {/* <FormInputField
          label="图片"
          register={register("featuredImage", { required: "required" })}
          type="file"
          accept="image/png, image/jpeg"
          error={errors.featuredImage}
        /> */}
        <MarkdownEditor
          label="正文"
          register={register("body", { required: "required" })}
          watch={watch}
          setValue={setValue}
          error={errors.body}
        />
        <div className="d-flex justify-content-between">
          <LoadingButton type="submit" isLoading={isSubmitting}>
            提交
          </LoadingButton>
          <Button
            variant="outline-danger"
            onClick={() => setShowDeleteConfirmationDialog(true)}
          >
            删除
          </Button>
        </div>
      </Form>

      <ConfirmationModal
        show={showDeleteConfirmationDialog}
        title="删除博客"
        message="确定要删除吗？"
        confirmButtonText="删除"
        onCancel={() => setShowDeleteConfirmationDialog(false)}
        onConfirm={onDeleteConfirmed}
        variant="danger"
      ></ConfirmationModal>
    </div>
  );
}
