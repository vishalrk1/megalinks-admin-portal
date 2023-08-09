"use client"
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Category, Scenepack } from '@prisma/client';
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

interface ScenepackFormProps {
  initialData: Scenepack | null;
  categories: Category[],
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
  packUrl: z.string().min(1),
  credit: z.string().min(1), 
  categoryId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isApproved: z.boolean().default(false).optional(),
});

type ScenepackFormValues = z.infer<typeof formSchema>;

const ScenepackForm: React.FC<ScenepackFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Scenepack' : 'Create Scenepack';
  const description = initialData ? 'Edit a Scenepack' : 'Create a New Scenepack';
  const toastMessage = initialData ? 'Scenepack Created' : 'Scenepack Updated';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<ScenepackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData
    } : {
      label: '',
      imageUrl: '',
      packUrl: '',
      credit: '',
      categoryId: '',
      isFeatured: false,
      isApproved: false,
    }
  })

  const onSubmit = async (data: ScenepackFormValues) => {
    try {

      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/${params.userId}/scenepacks/${params.scenepackId}`, data);
      } else {
        await axios.post(`/api/${params.userId}/scenepacks`, data);
      }

      router.refresh();
      router.push(`/${params.userId}/scenepacks`);
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
      await axios.delete(`/api/${params.userId}/scenepacks/${params.scenepackId}`);
      router.refresh();
      router.push(`/${params.userId}/scenepacks`);
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
            {
                initialData?.imageUrl && (
                    <div className="relative w-[250px] h-[250px] rounded-md overflow-hidden">
                            <div className="z-10 absolute top-2 right-2">
                                <Button onClick={() => {}} type="button" variant="outline" size="icon">
                                    <Imageicon className="h-4 w-4"/>
                                </Button>
                            </div>
                            <Image fill className="object-cover" alt="Image" src={initialData.imageUrl}/>
                        </div>
                )
            }
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
            <FormField control={form.control} name='imageUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Link</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Enter Image Url ' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name='packUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pack Link</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Link to access scenepack ' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name='credit'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credits for Scenepack</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Credits to who provided pack' {...field} />
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

export default ScenepackForm; 