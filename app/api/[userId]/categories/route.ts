import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const body = await req.json();

        const { name, imageUrl, bannerImageName } = body;

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!name) {
            return new NextResponse(" is Required", { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is Required", { status: 400 })
        }

        const category = await prismadb.category.create({
            data: {
                name,
                imageUrl,
                bannerImageName,
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[BILLBOARDS_POST]', error);
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

        const categories = await prismadb.category.findMany();

        return NextResponse.json(categories);
    } catch (error) {
        console.log('[CATEGORY_GET]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}