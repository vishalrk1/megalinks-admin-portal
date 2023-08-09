"use client"
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Category, Feedback } from '@prisma/client';
import { Trash, Image as Imageicon } from 'lucide-react';

import React, { useState } from 'react';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface FeedbackFormProps {
    initialData: Feedback | null;
    categories: Category[]
}

const formSchema = z.object({
    userName: z.string().min(1),
    categoryId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional()
});

type FeedbackFormValues = z.infer<typeof formSchema>;

const FeedbackForm: React.FC<FeedbackFormProps> = ({
    initialData,
    categories
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit Feedback' : 'Create Feedback';
    const description = !initialData ? 'Edit a Feedback' : 'Create a New Feedback';
    const toastMessage = !initialData ? 'Feedback Created' : 'Feedback Updated';
    const action = initialData ? 'Save Changes' : 'Create';

    const form = useForm<FeedbackFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData
        } : {
            userName: '',
            categoryId: '',
            isFeatured: false,
        }
    })

    const onSubmit = async (data: FeedbackFormValues) => {
        try {

            setLoading(true);

            if (initialData) {
                await axios.patch(`/api/${params.userId}/feedbacks/${params.feedbackId}`, data);
            } else {
                await axios.post(`/api/${params.userId}/feedbacks`, data);
            }

            router.refresh();
            router.push(`/${params.userId}/feedbacks`);
            toast.success(toastMessage);

        } catch (error) {
            toast.error('Somethin Went Wrong');
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {

            setLoading(true);
            await axios.delete(`/api/${params.userId}/feedbacks/${params.feedbackId}`);
            router.refresh();
            router.push(`/${params.userId}/feedbacks`);
            toast.success('Feedback Deleated Sucessfully');

        } catch (error) {
            toast.error('Make sure you remove categories first');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className='flex items-center justify-between'>
                <Heading title={title} description={description} />
                {
                    initialData && (
                        <Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
                            <Trash className='h-4 w-4' />
                        </Button>
                    )
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid grid-cols-3  gap-8'>
                        <FormField control={form.control} name='userName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='User Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name='categoryId'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select disabled={loading} defaultValue={field.value} onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Category" />
                                                    <SelectContent>
                                                        {
                                                            categories.map((item) => (
                                                                <SelectItem key={item.id} value={item.id}>
                                                                    {item.name}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </SelectTrigger>
                                            </FormControl>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name='isFeatured'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 '>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            // @ts-ignore
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            Featured
                                        </FormLabel>
                                        <FormDescription>
                                            This product will appear on homepage.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    );
};

export default FeedbackForm; 