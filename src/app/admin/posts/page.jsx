"use client";

import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [searchQuery]);

  const fetchPosts = async () => {
    setLoading(true);
    const url = `/api/posts?search=${searchQuery}`;
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data.data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
    const result = await response.json();

    if (result.success) {
      fetchPosts();
      toast.success(result.message || "Post deleted successfully.", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error(result.message || "Post deleted unsuccessfully.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        const { id, title } = params.row;
        return (
          <a
            href={`posts/${id}/preview`}
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            {title} - Preview
          </a>
        );
      },
    },
    {
      field: "slug",
      headerName: "Slug",
      width: 200,
      sortable: false,
    },
    {
      field: "published",
      headerName: "Published",
      width: 100,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      sortable: false,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 200,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Link href={`/admin/posts/create-update?id=${params.row.id}`}>
            <Button variant="contained" size="small">
              Edit
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
            sx={{ ml: 1 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}
      >
        Posts Management
      </Typography>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <TextField
            label="Search Posts"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
          />
          <Link href="/admin/posts/create-update">
            <Button variant="contained" sx={{ textTransform: "none" }}>
              Create New Post
            </Button>
          </Link>
        </Box>
        {loading ? (
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
        ) : (
          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={posts}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableColumnMenu
              autoHeight
            />
          </Box>
        )}
      </Paper>
      <ToastContainer/>
    </Box>
  );
}
