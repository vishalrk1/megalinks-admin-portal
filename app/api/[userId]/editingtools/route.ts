import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const body = await req.json();

        const { title } = body;

        if (!params.userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!title) {
            return new NextResponse("Pack Name is Required", { status: 400 })
        }

        const editingTool = await prismadb.editingTool.create({
            data: {
                title,
            }
        });

        return NextResponse.json(editingTool);
    } catch (error) {
        console.log('[EDITINGTOOL_POST]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {

        if (!params.userId) {
            return new NextResponse("User ID is Required", { status: 400 })
        }

        const editingTool = await prismadb.editingTool.findMany();

        return NextResponse.json(editingTool);
    } catch (error) {
        console.log('[EDITINGTOOL_GET]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}