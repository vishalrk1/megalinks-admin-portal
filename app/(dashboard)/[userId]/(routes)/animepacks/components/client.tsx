"use client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { AnimepackColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Plus } from "lucide-react";

interface AnimepacksClientProps {
    data: AnimepackColumn[]
}

export const AnimepacksClient: React.FC<AnimepacksClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`AnimePacks (${data.length})`} description="All anime packs displayed on megalinks website"/>
                <Button onClick={() => router.push(`/${params.userId}/animepacks/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="label" columns={columns} data={data} />
        </>
    );
};