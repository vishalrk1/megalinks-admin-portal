"use client"
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Category, Tutorial, EditingTool } from '@prisma/client';
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

interface TutorialFormProps {
  initialData: Tutorial | null;
  categories: Category[],
  editingtools: EditingTool[],
}

const formSchema = z.object({
  label: z.string().min(1),
  ytUrl: z.string().min(1),
  editingToolId: z.string().min(1),
  categoryId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isApproved: z.boolean().default(false).optional(),
});

type TutorialFormValues = z.infer<typeof formSchema>;

const TutorialForm: React.FC<TutorialFormProps> = ({
  initialData,
  categories,
  editingtools
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Tutorial' : 'Create Tutorial';
  const description = !initialData ? 'Edit a Tutorial' : 'Create a New Tutorial';
  const toastMessage = !initialData ? 'Tutorial Created' : 'Tutorial Updated';
  const action = !initialData ? 'Save Changes' : 'Create';

  const form = useForm<TutorialFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData
    } : {
      label: '',
      ytUrl: '',
      editingToolId: '',
      categoryId: '',
      isFeatured: false,
      isApproved: false,
    }
  })

  const onSubmit = async (data: TutorialFormValues) => {
    try {

      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/${params.userId}/tutorials/${params.tutorialId}`, data);
      } else {
        await axios.post(`/api/${params.userId}/tutorials`, data);
      }

      router.refresh();
      router.push(`/${params.userId}/tutorials`);
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
      await axios.delete(`/api/${params.userId}/tutorials/${params.tutorialId}`);
      router.refresh();
      router.push(`/${params.userId}/tutorials`);
      toast.success('Product Deleated Sucessfully');

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
            <FormField control={form.control} name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Scenepack Title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name='ytUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube Video Link</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='enter youtube link' {...field} />
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
            <FormField control={form.control} name='editingToolId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Editing Software</FormLabel>
                  <FormControl>
                    <Select disabled={loading} defaultValue={field.value} onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                          <SelectContent>
                            {
                              editingtools.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.title}
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
            <FormField control={form.control} name='isApproved'
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
                      Approve
                    </FormLabel>
                    <FormDescription>
                      Is this scenepack okay to display on website.
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

export default TutorialForm; 