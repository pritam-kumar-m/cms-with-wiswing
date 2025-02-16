import prisma from "@/utils/db";
import { handleSuccess, handleError } from "../../../services/commonService";

// GET /api/posts - Get all posts or search by title/content
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const posts = await prisma.post.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { content: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      orderBy: { createdAt: "desc" },
    });

    const message = posts.length
      ? "Posts fetched successfully."
      : "No posts found.";

    return handleSuccess(posts, message);
  } catch (error) {
    return handleError(error, "Error fetching posts.");
  }
}

// POST /api/posts - Create a new post
export async function POST(request) {
  try {
    const { title, slug, content } = await request.json();

    // Input validation
    if (!title || !slug) {
      return handleError(null, "Title and slug are required.", 400);
    }

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) {
      return handleError(
        null,
        "Slug already exists. Please use a unique slug.",
        409
      );
    }

    // Create new post
    const post = await prisma.post.create({
      data: { title, slug, content },
    });
    return handleSuccess(post, "Post created successfully.", 201);
  } catch (error) {
    return handleError(error, "Error creating post.");
  }
}

// PUT /api/posts - Update an existing post
export async function PUT(request) {
  try {
    const { id, title, slug, content } = await request.json();

    // Input validation
    if (!id || !title || !slug) {
      return handleError(null, "ID, title, and slug are required.", 400);
    }

    // Check if post exists
    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      return handleError(null, "Post not found. Unable to update.", 404);
    }

    // Update post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, slug, content },
    });
    return handleSuccess(updatedPost, "Post updated successfully.");
  } catch (error) {
    return handleError(error, "Error updating post.");
  }
}

// DELETE /api/posts/:id - Delete a post by ID
export async function DELETE(request) {
  try {
    const urlParts = request.url.split("=");
    const id = urlParts[urlParts.length - 1];

    // Input validation
    if (!id) {
      return handleError(null, "ID is required.", 400);
    }

    // Check if post exists
    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      return handleError(null, "Post not found. Unable to delete.", 404);
    }

    // Delete post
    await prisma.post.delete({ where: { id } });

    return handleSuccess(null, "Post deleted successfully.");
  } catch (error) {
    return handleError(error, "Error deleting post.");
  }
}
