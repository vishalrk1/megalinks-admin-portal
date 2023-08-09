import prismadb from '@/lib/prismadb'
import React from 'react'
import ScenepackForm from './components/scenepack-form';

const ScenepackPage = async ({
    params,
}: {params: {userId: string, scenepackId: string}}) => {
    const categories = await prismadb.category.findMany();
    const scenepack = await prismadb.scenepack.findUnique({
        where: {
            id: params.scenepackId,
        }
    });

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-5'>
                <ScenepackForm initialData={scenepack} categories={categories}/>
            </div>
        </div>
    );
};

export default ScenepackPage;