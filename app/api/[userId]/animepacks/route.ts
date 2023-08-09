import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const body = await req.json();

        const { label, description, packUrl, categoryId, isApproved, isFeatured } = body;

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!label) {
            return new NextResponse("Pack Name is Required", { status: 400 })
        }

        if (!packUrl) {
            return new NextResponse("Pack url is Required", { status: 400 })
        }

        const animepack = await prismadb.animepack.create({
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
        console.log('[ANIMEPACK_POST]', error);
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

        const animepacks = await prismadb.animepack.findMany();

        return NextResponse.json(animepacks);
    } catch (error) {
        console.log('[ANIMEPACK_GET]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}