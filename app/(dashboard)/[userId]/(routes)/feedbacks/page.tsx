
import { FeedbackClient } from './components/client';
import prismadb from "@/lib/prismadb";
import { format } from 'date-fns';

const FeedbacksPage = async () => {
    const feedbacks = await prismadb.feedback.findMany({
        orderBy: {
            isFeatured: 'desc',
        }
    });

    const formattedFeedbacks = feedbacks.map((item) => ({
        id: item.id,
        userName: item.userName,
        message: item.message,
        isFeatured: item.isFeatured,
    }));

    return (
        <div className="flex-col">
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <FeedbackClient data={formattedFeedbacks}/>
            </div>
        </div>
    );
};

export default FeedbacksPage;