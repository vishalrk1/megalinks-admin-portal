"use client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { FeedbackColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Plus } from "lucide-react";

interface FeedbackClientProps {
    data: FeedbackColumn[]
}

export const FeedbackClient: React.FC<FeedbackClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`User Reviews (${data.length})`} description="All User reviews of megalinks"/>
            </div>
            <Separator />
            <DataTable searchKey="message" columns={columns} data={data} />
        </>
    );
};