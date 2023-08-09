import { TutorialsClient } from './components/client';
import prismadb from "@/lib/prismadb";
import { format } from 'date-fns';

const TutorialsPage = async () => {
    const tutorials = await prismadb.tutorial.findMany({
        include: {
            Category: true,
            EditingTool: true,
        },
        orderBy: {
            isFeatured: 'desc',
        }
    });

    const formattedTutorials = tutorials.map((item) => ({
        id: item.id,
        label: item.label,
        editingtool: item.EditingTool.title,
        isFeatured: item.isFeatured,
        isApproved: item.isApproved,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <TutorialsClient data={formattedTutorials}/>
            </div>
        </div>
    );
};

export default TutorialsPage;