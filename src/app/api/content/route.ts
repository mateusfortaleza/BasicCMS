import { getAllContentWithFields } from "@/dal/ContentDTO";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // const expectedToken = process.env.CONTENT_API_KEY;

    // if (!expectedToken) {
    //     return NextResponse.json(
    //         {message: "Access restricted. Go back now"},
    //         {status: 500}
    //     )
    // }

    // const auth = request.headers.get("authorization");
    // const [scheme, token] = auth?.split(" ") ?? [];

    // if (scheme?.toLowerCase() !== "bearer" || token !== expectedToken) {
    //     return NextResponse.json({message: "Unauthorized"}, {status: 401})
    // }

    const content = await getAllContentWithFields()
    return NextResponse.json({ content })
}
