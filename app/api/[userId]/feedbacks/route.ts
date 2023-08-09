import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {

        if (!params.userId) {
            return new NextResponse("User ID is Required", { status: 400 })
        }

        const feedbacks = await prismadb.feedback.findMany();

        return NextResponse.json(feedbacks);
    } catch (error) {
        console.log('[FEEDBACK_GET]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}