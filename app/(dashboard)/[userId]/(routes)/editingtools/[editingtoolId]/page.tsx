import prismadb from '@/lib/prismadb'
import React from 'react'
import EditingToolForm from './components/editingtool-form';

const EditingtoolPage = async ({
    params,
}: {params: {userId: string, editingtoolId: string}}) => {
    const editingtool = await prismadb.editingTool.findUnique({
        where: {
            id: params.editingtoolId,
        }
    });

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-5'>
                <EditingToolForm initialData={editingtool}/>
            </div>
        </div>
    );
};

export default EditingtoolPage;