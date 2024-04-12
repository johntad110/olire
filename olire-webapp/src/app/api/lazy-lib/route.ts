import { getLibs } from "@/lib/actions/read_libs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json()
    const { project } = body;

    // Craft a prompt that makes gemini chose a tag and a proramming language 
    // from a list and assign it's coice to projData.

    const {tag, progLang} = {
        tag: "Computer Vision",
        progLang: "Python",
    }

    if (tag !== undefined && progLang !== undefined) {
        const lib_result = await getLibs([tag], [progLang])
        const libraries = lib_result;

        return new Response(JSON.stringify(libraries))
    } else {
        const libraries = [
            {
                name: "Library Name",
                description: "Describe the goddamn library yourself",
                url: "https://example.com",
            }
        ]

        return new Response(JSON.stringify(libraries))
    }
}