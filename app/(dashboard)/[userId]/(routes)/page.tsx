import { ApiAlert } from "@/components/ui/api-alert";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const DashboardPage = () => {
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <Heading title="Website Analytics" description=""/>
                <Separator />
                <ApiAlert title='Will Work on this section' description="Nothin to display yet XD" variant='public' />
            </div>
        </div>
    );
};

export default DashboardPage;