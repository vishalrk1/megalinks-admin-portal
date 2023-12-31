"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import * as z from "zod";
import axios from "axios";

import { useCategoryModel } from "@/hooks/use-cat-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(1),
});

const CategoryModal = () => {
  const catModal = useCategoryModel();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const responce = await axios.post("/api/stores", values);
      toast.success("Store Created :)");
      window.location.assign(`/${responce.data.id}`);
    } catch (error) {
      toast.error("Something Went Wrong !!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={catModal.isOpen}
      title="Add Category"
      description="Create Categories for megalinks homepage"
      onClose={catModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a Category Name"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={catModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryModal;
