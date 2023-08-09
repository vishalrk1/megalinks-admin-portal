
import { EditingtoolClient } from './components/client';
import prismadb from "@/lib/prismadb";
import { format } from 'date-fns';

const EditingToolsPage = async () => {
    const editingtools = await prismadb.editingTool.findMany();

    const formattedTools = editingtools.map((item) => ({
        id: item.id,
        title: item.title,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <EditingtoolClient data={formattedTools}/>
            </div>
        </div>
    );
};

export default EditingToolsPage;