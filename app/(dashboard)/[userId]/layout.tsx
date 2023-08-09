import Navbar from "@/components/nav-bar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const categories = await prismadb.category.findMany();

    if (!categories) {
        redirect(`/${userId}`);
    }

    return (
        <>
            <div>
                <Navbar />
            </div>
            {children}
        </>
    );
};