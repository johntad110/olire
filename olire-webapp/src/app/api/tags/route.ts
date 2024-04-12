import { getAllTags } from "@/lib/actions/read_tags";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const tags = await getAllTags()

    return new Response(JSON.stringify(tags))
}