"use client"
import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';
import { Heading } from "@/components/ui/heading";

const SettingsPage = ({
    params
}: {params: {userId: string}}) => {
    const origin = useOrigin();
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <Heading title="Dashboard Settings" description=""/>
                <ApiAlert title='MEGALINKS_NEXT_PUBLIC_API_URL' description={`${origin}/api/${params.userId}`} variant='public' />
            </div>
        </div>
    );
};

export default SettingsPage;