export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5


import { getAllTags } from "@/lib/actions/read_tags";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const tags = await getAllTags()

    return new Response(JSON.stringify(tags))
}