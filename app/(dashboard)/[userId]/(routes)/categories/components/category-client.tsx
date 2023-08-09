"use client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Plus } from "lucide-react";

interface CategoryClientProps {
    data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title="Megalink Categories" description="All categories displayed on megalinks website"/>
                <Button onClick={() => router.push(`/${params.userId}/categories/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};