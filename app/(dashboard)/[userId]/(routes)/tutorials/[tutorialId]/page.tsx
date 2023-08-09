import prismadb from '@/lib/prismadb'
import React from 'react'
import TutorialForm from './components/tutorial-form';

const TutorialPage = async ({
    params,
}: {params: {userId: string, tutorialId: string}}) => {
    const categories = await prismadb.category.findMany();
    const editingtools = await prismadb.editingTool.findMany();
    const tutorial = await prismadb.tutorial.findUnique({
        where: {
            id: params.tutorialId,
        }
    });

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-5'>
                <TutorialForm initialData={tutorial} categories={categories} editingtools={editingtools}/>
            </div>
        </div>
    );
};

export default TutorialPage;