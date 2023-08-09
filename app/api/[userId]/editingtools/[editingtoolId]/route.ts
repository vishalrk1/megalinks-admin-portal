import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { string } from "zod";

export async function GET(
    req: Request,
    { params }: { params: { userId: string, editingtoolId: string } }
) {
    try {

        if (!params.editingtoolId) {
            return new NextResponse("Scenepack ID is Required", { status: 400 })
        }

        const editingTool = await prismadb.editingTool.findUnique({
            where: {
                id: params.editingtoolId,
            },
        });

        return NextResponse.json(editingTool);

    } catch (error) {
        console.log('[INDIVIDUAL_EDITINGTOOL_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string, editingtoolId: string } }
) {
    try {
        const body = await req.json();

        const { title } = body;

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!title) {
            return new NextResponse("Animepack Name is Required", { status: 400 })
        }

        if (!params.editingtoolId) {
            return new NextResponse("Animepack ID is Required", { status: 400 })
        }

        const editingTool = await prismadb.editingTool.updateMany({
            where: {
                id: params.editingtoolId
            },
            data: {
                title
            }
        });

        return NextResponse.json(editingTool);

    } catch (error) {
        console.log('[EDITINGTOOL_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, editingtoolId: string } }
) {
    try {

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.editingtoolId) {
            return new NextResponse("Scenepack ID is Required", { status: 400 })
        }

        const editingTool = await prismadb.editingTool.deleteMany({
            where: {
                id: params.editingtoolId,
            },
        });

        return NextResponse.json(editingTool);

    } catch (error) {
        console.log('[INDIVIDUAL_EDITINGTOOL_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}