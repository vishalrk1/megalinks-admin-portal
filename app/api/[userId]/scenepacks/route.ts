import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const body = await req.json();

        const { label, imageUrl, packUrl, credit, categoryId, isApproved, isFeatured } = body;

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!label) {
            return new NextResponse("Pack Name is Required", { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is Required", { status: 400 })
        }

        const scenepack = await prismadb.scenepack.create({
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
        console.log('[SCENEPACK_POST]', error);
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

        const scenepacks = await prismadb.scenepack.findMany();

        return NextResponse.json(scenepacks);
    } catch (error) {
        console.log('[SCENEPACK_GET]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}