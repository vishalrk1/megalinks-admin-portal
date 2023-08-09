import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { string } from "zod";

export async function GET(
    req: Request,
    { params }: { params: { userId: string, categoryId: string } }
) {
    try {

        if (!params.categoryId) {
            return new NextResponse("Category ID is Required", { status: 400 })
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
        });

        return NextResponse.json(category);

    } catch (error) {
        console.log('[INDIVIDUAL_CATEGORY_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string, categoryId: string } }
) {
    try {
        const body = await req.json();

        const { name, imageUrl, bannerImageName } = body;

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!name) {
            return new NextResponse("Category Name is Required", { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is Required", { status: 400 })
        }

        if (!params.categoryId) {
            return new NextResponse("Billboard ID is Required", { status: 400 })
        }

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId
            },
            data: {
                name,
                imageUrl,
                bannerImageName
            }
        });

        return NextResponse.json(category);

    } catch (error) {
        console.log('[CATEGORY_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, categoryId: string } }
) {
    try {

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.categoryId) {
            return new NextResponse("Category ID is Required", { status: 400 })
        }

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,
            },
        });

        return NextResponse.json(category);

    } catch (error) {
        console.log('[INDIVIDUAL_CATEGORY_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}