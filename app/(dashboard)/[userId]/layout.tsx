import Navbar from "@/components/nav-bar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: {userId: string}
}) {

    if (!params.userId) {
        redirect('/sign-in');
    }

    const categories = await prismadb.category.findMany();

    if (!categories) {
        redirect(`/${params.userId}`);
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
};