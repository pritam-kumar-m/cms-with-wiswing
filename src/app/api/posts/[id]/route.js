import { NextResponse } from "next/server";
import prisma from "@/utils/db";

// GET /api/posts/[id] - Get a single post by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Fetch the post by ID
    const post = await prisma.post.findUnique({
      where: { id: String(id) },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
