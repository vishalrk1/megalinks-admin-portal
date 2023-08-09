"use client"
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Category } from '@prisma/client';
import { Trash } from 'lucide-react';

import React, { useState } from 'react';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

interface CategoryFormProps {
  initialData: Category | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
  bannerImageName: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Category' : 'Create Category';
  const description = initialData ? 'Edit a Category' : 'Create a New Category';
  const toastMessage = initialData ? 'Category Updated' : 'Category Created';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      imageUrl: '',
      bannerImageName: ''
    }
  })

  const onSubmit = async (data: CategoryFormValues) => {
    try {

      setLoading(true);
      
      if(initialData){
        await axios.patch(`/api/${params.userId}/categories/${params.categoryId}`, data);
      } else {
        await axios.post(`/api/${params.userId}/categories`, data);
      }

      router.refresh();
      router.push(`/${params.userId}/categories`);
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
      await axios.delete(`/api/${params.userId}/categories/${params.categoryId}`);
      router.refresh();
      router.push(`/${params.userId}/categories`);
      toast.success('Category Deleated Sucessfully');

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
          <FormField control={form.control} name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Banner Image</FormLabel>
                <FormControl>
                  <ImageUpload 
                    value={field.value ? [field.value]: [] } 
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3  gap-8'>
            <FormField control={form.control} name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Enter the category title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name='bannerImageName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Title</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Text to be displayed on banner' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm; 