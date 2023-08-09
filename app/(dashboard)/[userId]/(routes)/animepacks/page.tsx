import { AnimepacksClient } from './components/client';
import prismadb from "@/lib/prismadb";
import { format } from 'date-fns';

const AnimepacksPage = async () => {
    const animepacks = await prismadb.animepack.findMany({
        orderBy: {
            isFeatured: 'desc',
        }
    });

    const formattedAnimepacks = animepacks.map((item) => ({
        id: item.id,
        label: item.label,
        description: item.description,
        isFeatured: item.isFeatured,
        isApproved: item.isApproved,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <AnimepacksClient data={formattedAnimepacks}/>
            </div>
        </div>
    );
};

export default AnimepacksPage;