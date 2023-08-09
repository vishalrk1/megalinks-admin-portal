import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { string } from "zod";

export async function GET(
    req: Request,
    { params }: { params: { userId: string, feedbackId: string } }
) {
    try {

        if (!params.feedbackId) {
            return new NextResponse("Feedback ID is Required", { status: 400 })
        }

        const feedback = await prismadb.feedback.findUnique({
            where: {
                id: params.feedbackId,
            },
        });

        return NextResponse.json(feedback);

    } catch (error) {
        console.log('[INDIVIDUAL_feedback_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string, feedbackId: string } }
) {
    try {
        const body = await req.json();

        const { userName, categoryId, isFeatured } = body;

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.feedbackId) {
            return new NextResponse("feedback ID is Required", { status: 400 })
        }

        const feedback = await prismadb.feedback.updateMany({
            where: {
                id: params.feedbackId
            },
            data: {
                userName,
                categoryId,
                isFeatured
            }
        });

        return NextResponse.json(feedback);

    } catch (error) {
        console.log('[feedback_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, feedbackId: string } }
) {
    try {

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.feedbackId) {
            return new NextResponse("feedback ID is Required", { status: 400 })
        }

        const feedback = await prismadb.feedback.deleteMany({
            where: {
                id: params.feedbackId,
            },
        });

        return NextResponse.json(feedback);

    } catch (error) {
        console.log('[INDIVIDUAL_SCENEPACK_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}