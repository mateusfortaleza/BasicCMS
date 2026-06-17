import { getAllHeroCardsWithFields } from "@/dal/ContentDTO";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const content = await getAllHeroCardsWithFields()
    return NextResponse.json({ content })
}
