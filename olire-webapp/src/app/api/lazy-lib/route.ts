export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

import { getLibs } from "@/lib/actions/read_libs";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAllTags } from "@/lib/actions/read_tags";
import { getAllPls } from "@/lib/actions/read_pls";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json()
    const { project } = body;

    // Craft a prompt that makes gemini chose a tag and a proramming language 
    // from a list and assign it's coice to projData.
    const genAI = new GoogleGenerativeAI(process.env.GGI_API_KEY ?? '');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const tags = await getAllTags()
    const pls = await getAllPls()

    const tagNames = tags.map((tag: any) => tag.name)
    const plsNames = pls.map((pl) => pl.name)

    const prompt = `
        From the following tags "${tagNames.join(', ')}" and the follwoing programming languages "${plsNames.join(', ')}"
        which one is perfect for the project """${project}""". Return your answer in the
        following json format:
        {
            "tag": "<TAG_HERE>",
            "progLang": "<PROGRAMMIG_LANGUAGE_HERE>"
        }
        Rememebr the project is the one in triple quotes.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text()
    const tagAndPl = extractJSON(text) ?? '{}'

    const { tag, progLang } = JSON.parse(tagAndPl)

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

function extractJSON(text: string): string | null {
    const regex = /{[^{}]*"tag"[^{}]*"progLang"[^{}]*}/
    const match = text.match(regex)
    return match ? match[0] : null;
}