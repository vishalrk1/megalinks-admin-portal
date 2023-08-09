import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const body = await req.json();

        const { label, ytUrl, editingToolId, categoryId, isFeatured, isApproved } = body;

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!label) {
            return new NextResponse("Pack Name is Required", { status: 400 })
        }

        if (!ytUrl) {
            return new NextResponse("Youtube URL is Required", { status: 400 })
        }

        const tutorial = await prismadb.tutorial.create({
            data: {
                label, 
                ytUrl, 
                editingToolId, 
                categoryId, 
                isFeatured, 
                isApproved
            }
        });

        return NextResponse.json(tutorial);
    } catch (error) {
        console.log('[TUTORIAL_POST]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {

        if (!params.userId) {
            return new NextResponse("Store ID is Required", { status: 400 })
        }

        const tutorial = await prismadb.tutorial.findMany();

        return NextResponse.json(tutorial);
    } catch (error) {
        console.log('[TUTORIAL_GET]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}