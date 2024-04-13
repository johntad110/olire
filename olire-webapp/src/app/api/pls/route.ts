export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5


import { getAllPls } from "@/lib/actions/read_pls";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const pls = await getAllPls()

    return new Response(JSON.stringify(pls))
}