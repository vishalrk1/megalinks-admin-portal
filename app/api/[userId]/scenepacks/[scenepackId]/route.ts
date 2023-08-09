import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { string } from "zod";

export async function GET(
    req: Request,
    { params }: { params: { userId: string, scenepackId: string } }
) {
    try {

        if (!params.scenepackId) {
            return new NextResponse("Scenepack ID is Required", { status: 400 })
        }

        const scenepack = await prismadb.scenepack.findUnique({
            where: {
                id: params.scenepackId,
            },
        });

        return NextResponse.json(scenepack);

    } catch (error) {
        console.log('[INDIVIDUAL_SCENEPACK_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string, scenepackId: string } }
) {
    try {
        const body = await req.json();

        const { label, imageUrl, packUrl, credit, categoryId, isApproved, isFeatured } = body;

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!label) {
            return new NextResponse("Scenepack Name is Required", { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is Required", { status: 400 })
        }

        if (!params.scenepackId) {
            return new NextResponse("Scenepack ID is Required", { status: 400 })
        }

        const scenepack = await prismadb.scenepack.updateMany({
            where: {
                id: params.scenepackId
            },
            data: {
                label, 
                imageUrl, 
                packUrl, 
                credit,
                categoryId, 
                isApproved, 
                isFeatured
            }
        });

        return NextResponse.json(scenepack);

    } catch (error) {
        console.log('[SCENEPACK_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, scenepackId: string } }
) {
    try {

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.scenepackId) {
            return new NextResponse("Scenepack ID is Required", { status: 400 })
        }

        const scenepack = await prismadb.scenepack.deleteMany({
            where: {
                id: params.scenepackId,
            },
        });

        return NextResponse.json(scenepack);

    } catch (error) {
        console.log('[INDIVIDUAL_SCENEPACK_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}