import prismadb from '@/lib/prismadb'
import React from 'react'
import AnimepackForm from './components/animepack-form';

const ScenepackPage = async ({
    params,
}: {params: {userId: string, animepackId: string}}) => {
    const categories = await prismadb.category.findMany();
    const animepack = await prismadb.animepack.findUnique({
        where: {
            id: params.animepackId,
        }
    });

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-5'>
                <AnimepackForm initialData={animepack} categories={categories}/>
            </div>
        </div>
    );
};

export default ScenepackPage;