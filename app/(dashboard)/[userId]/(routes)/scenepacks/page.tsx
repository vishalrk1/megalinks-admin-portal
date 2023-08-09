import { ScenepacksClient } from './components/client';
import prismadb from "@/lib/prismadb";
import { format } from 'date-fns';

const ScenePacksPage = async () => {
    const scenepacks = await prismadb.scenepack.findMany({
        include: {
            Category: true,
        },
        orderBy: {
            isFeatured: 'desc',
        }
    });

    const formattedScenepacks = scenepacks.map((item) => ({
        id: item.id,
        label: item.label,
        credit: item.credit,
        isFeatured: item.isFeatured,
        isApproved: item.isApproved,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ScenepacksClient data={formattedScenepacks}/>
            </div>
        </div>
    );
};

export default ScenePacksPage;