import prismadb from '@/lib/prismadb'
import React from 'react'
import FeedbackForm from './components/feedback-form';

const FeedbackPage = async ({
    params,
}: {params: {userId: string, feedbackid: string}}) => {
    const categories = await prismadb.category.findMany();
    const feedback = await prismadb.feedback.findUnique({
        where: {
            id: params.feedbackid,
        }
    });

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-5'>
                <FeedbackForm initialData={feedback} categories={categories}/>
            </div>
        </div>
    );
};

export default FeedbackPage;