
import { CategoryClient } from './components/category-client';
import prismadb from "@/lib/prismadb";
import { format } from 'date-fns';

const CategoriesPage = async () => {
    const categories = await prismadb.category.findMany();

    const formattedCategories = categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        imageDescription: cat.bannerImageName,
        createdAt: format(cat.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CategoryClient data={formattedCategories}/>
            </div>
        </div>
    );
};

export default CategoriesPage;