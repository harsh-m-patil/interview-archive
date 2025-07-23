import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await db.tag.findMany();

    return NextResponse.json(tags);
  } catch (error) {
    console.error("[TAGS_GET]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
