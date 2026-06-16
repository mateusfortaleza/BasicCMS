import { getAllContent } from "@/dal/ContentDTO";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const auth = request.headers.get("authorization");
    const token = auth?.replace("Bearer ", "")

    if (token !== process.env.CONTENT_API_TOKEN) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const content = await getAllContent()
    return NextResponse.json({ content })
}