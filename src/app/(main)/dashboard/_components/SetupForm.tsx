"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import FileUploader from "@/components/FileUploader";

const setupFormSchema = z.object({
  title: z.string().min(3).max(255),
  image: z.instanceof(File),
});

type SetupFormType = z.infer<typeof setupFormSchema>;

export function SetupForm() {
  const form = useForm<SetupFormType>({
    resolver: zodResolver(setupFormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: SetupFormType) {
    console.log("submitData", data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Workspace title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full p-6" size="lg">
          Create Workspace
        </Button>
      </form>
    </Form>
  );
}
