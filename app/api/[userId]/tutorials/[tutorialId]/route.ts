import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { string } from "zod";

export async function GET(
    req: Request,
    { params }: { params: { userId: string, tutorialId: string } }
) {
    try {

        if (!params.tutorialId) {
            return new NextResponse("Tutorial ID is Required", { status: 400 })
        }

        const tutorial = await prismadb.tutorial.findUnique({
            where: {
                id: params.tutorialId,
            },
        });

        return NextResponse.json(tutorial);

    } catch (error) {
        console.log('[INDIVIDUAL_TUTORIAL_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string, tutorialId: string } }
) {
    try {
        const body = await req.json();

        const { label, ytUrl, editingToolId, categoryId, isFeatured, isApproved } = body;

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!label) {
            return new NextResponse("Tutorial Name is Required", { status: 400 })
        }

        if (!ytUrl) {
            return new NextResponse("Youtube URL is Required", { status: 400 })
        }

        if (!params.tutorialId) {
            return new NextResponse("Tutorial ID is Required", { status: 400 })
        }

        const tutorial = await prismadb.tutorial.updateMany({
            where: {
                id: params.tutorialId
            },
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
        console.log('[TUTORIAL_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, tutorialId: string } }
) {
    try {

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.tutorialId) {
            return new NextResponse("Tutorial ID is Required", { status: 400 })
        }

        const tutorial = await prismadb.tutorial.deleteMany({
            where: {
                id: params.tutorialId,
            },
        });

        return NextResponse.json(tutorial);

    } catch (error) {
        console.log('[INDIVIDUAL_TUTORIAL_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}