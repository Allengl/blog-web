import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as BlogApi from "@/network/api/blog";
import FormInputField from "@/components/form/FormInputField";
import MarkdownEditor from "@/components/form/MarkdownEditor";
import LoadingButton from "@/components/LoadingButton";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface CreatePostFormData {
  slug: string;
  title: string;
  summary: string;
  body: string;
}

const CreateBlogPostPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>();

  const onSubmit = async ({
    title,
    slug,
    summary,
    body,
  }: CreatePostFormData) => {
    try {
      await BlogApi.createBlogPost({
        slug,
        title,
        summary,
        body,
      });
      await router.push("/blog/" + slug);
    } catch (error) {
      console.error(error);

      alert(error);
    }
  };

  return (
    <div>
      <h1>创建博客</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          label="标题"
          register={register("title", { required: "required" })}
          placeholder="标题"
          maxLength={100}
          error={errors.title}
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

        <MarkdownEditor
          label="正文"
          register={register("body", { required: "required" })}
          watch={watch}
          setValue={setValue}
          error={errors.body}
        />
        <LoadingButton type="submit" isLoading={isSubmitting}>
          发布
        </LoadingButton>
      </Form>
    </div>
  );
};

export default CreateBlogPostPage;
