import { getAllMenuWithFields } from "@/dal/ContentDTO";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const content = await getAllMenuWithFields()
    return NextResponse.json({ content })
}
