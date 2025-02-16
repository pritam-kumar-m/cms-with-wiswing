"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import { Box, CircularProgress, Typography } from "@mui/material";

// custom components
import ContentBlock from "../../../../../components/ContentBlock";

// import static data
import { SLIDER_STATIC_DATA } from "../../../../../../static/static.json";

export default function PreviewPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
          animation: "fadeIn 0.5s",
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Box mt={2}>
          <Typography variant="h6" color="textSecondary">
            Loading, please wait...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div>
      <h1>{post.title}</h1>
      <div>
        {SLIDER_STATIC_DATA.map((block, index) => (
          <ContentBlock key={index} type={block.type} props={block.props} />
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
}
