"use client";

// react**
import { useState, useEffect, Suspense } from "react";

// next **
import { useRouter, useSearchParams } from "next/navigation";

// 3rd party packages
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// custom component
import SunEditorComponent from "../../../../components/Editor/SunEditorComponent";

// mui **
import { TextField, Button, Box, Typography, Grid } from "@mui/material";

function PostFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEdit = !!id;

  // use state
  const [content, setcontent] = useState();

  // Function to generate slug from title
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    slug: Yup.string().required("Slug is required"),
    content: Yup.string().required("Content is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
    },
  });

  // Fetch post data if in edit mode
  useEffect(() => {
    if (isEdit) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setValue("title", data.title);
          setValue("slug", data.slug);
          setValue("content", data.content || "");
          setcontent(data.content);
        })
        .catch((error) => {
          console.error("Error fetching post data:", error);
        });
    }
  }, [id, isEdit, setValue]);

  // Auto-generate slug when title changes
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;

    const newSlug = generateSlug(newTitle);
    const currentSlug = getValues("slug");
    setValue("slug", newSlug);
  };

  const onSubmit = async (data) => {
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/posts` : "/api/posts";
    const payload = {
      ...data,
      id: isEdit ? id : "",
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("result----Content-Type", result);
      if (result.success) {
        toast.success(
          isEdit ? "Post updated successfully!" : "Post added successfully!",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        setTimeout(() => {
          router.push("/admin/posts");
        }, 3000);
      } else {
        toast.error("Failed to save post. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Typography variant="h4">
        {isEdit ? "Edit Post" : "Create Post"}
      </Typography>

      {/* Title Field */}
      <TextField
        label="Title"
        {...register("title")}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ shrink: true }}
      />
      {errors.title && (
        <Typography color="error">{errors.title.message}</Typography>
      )}

      {/* Slug Field */}
      <TextField
        label="Slug"
        {...register("slug")}
        fullWidth
        margin="normal"
        required
        helperText="Slug is auto-generated from the title but can be edited."
        InputLabelProps={{ shrink: true }}
      />
      {errors.slug && (
        <Typography color="error">{errors.slug.message}</Typography>
      )}

      {/* SunEditor Component */}
      <Box sx={{ mt: 2, mb: 2 }}>
        <SunEditorComponent
          key={getValues("content")}
          value={content}
          onChange={(content) => setValue("content", content)}
        />
      </Box>
      {errors.content && (
        <Typography color="error">{errors.content.message}</Typography>
      )}

      <Grid>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
        {isEdit && (
          <Button
            variant="outlined"
            onClick={() => router.push(`/admin/posts/${id}/preview`)}
            sx={{ mt: 2, ml: 2 }}
          >
            Preview
          </Button>
        )}
      </Grid>
      <ToastContainer />
    </Box>
  );
}

export default function PostForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostFormContent />
    </Suspense>
  );
}