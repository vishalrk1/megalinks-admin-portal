"use client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { EditingToolColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Plus } from "lucide-react";

interface EditingtoolClientProps {
    data: EditingToolColumn[]
}

export const EditingtoolClient: React.FC<EditingtoolClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title="Editing Software" description="All softwares available for filters on megalinks website"/>
                <Button onClick={() => router.push(`/${params.userId}/editingtools/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="title" columns={columns} data={data} />
        </>
    );
};