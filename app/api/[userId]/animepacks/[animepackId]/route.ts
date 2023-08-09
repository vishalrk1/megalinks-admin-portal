import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { string } from "zod";

export async function GET(
    req: Request,
    { params }: { params: { userId: string, animepackId: string } }
) {
    try {

        if (!params.animepackId) {
            return new NextResponse("Scenepack ID is Required", { status: 400 })
        }

        const animepack = await prismadb.animepack.findUnique({
            where: {
                id: params.animepackId,
            },
        });

        return NextResponse.json(animepack);

    } catch (error) {
        console.log('[INDIVIDUAL_ANIMEPACK_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string, animepackId: string } }
) {
    try {
        const body = await req.json();

        const { label, description, packUrl, categoryId, isApproved, isFeatured } = body;

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!label) {
            return new NextResponse("Animepack Name is Required", { status: 400 })
        }

        if (!packUrl) {
            return new NextResponse("Pack URL is Required", { status: 400 })
        }

        if (!params.animepackId) {
            return new NextResponse("Animepack ID is Required", { status: 400 })
        }

        const animepack = await prismadb.animepack.updateMany({
            where: {
                id: params.animepackId
            },
            data: {
                label, 
                description, 
                packUrl,
                categoryId, 
                isApproved, 
                isFeatured
            }
        });

        return NextResponse.json(animepack);

    } catch (error) {
        console.log('[SCENEPACK_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, animepackId: string } }
) {
    try {

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.animepackId) {
            return new NextResponse("Scenepack ID is Required", { status: 400 })
        }

        const animepack = await prismadb.animepack.deleteMany({
            where: {
                id: params.animepackId,
            },
        });

        return NextResponse.json(animepack);

    } catch (error) {
        console.log('[INDIVIDUAL_ANIMEPACK_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}