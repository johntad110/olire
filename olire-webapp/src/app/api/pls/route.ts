import { getAllPls } from "@/lib/actions/read_pls";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const pls = await getAllPls()

    return new Response(JSON.stringify(pls))
}