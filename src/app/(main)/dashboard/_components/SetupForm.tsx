"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUploader from "@/components/FileUploader";
import EmojiPicker from "@/components/EmojiPicker";
import {
  WorkspaceFormType,
  workspaceFormSchema,
} from "@/lib/types/workspace-types";
import { createWorkspaceAction } from "@/lib/actions/workspace-actions";

export function SetupForm() {
  const form = useForm<WorkspaceFormType>({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      workspaceName: "",
      logo: [],
      emoji: "",
    },
  });

  async function onSubmit(data: WorkspaceFormType) {
    var formData = new FormData();

    for (const key of Object.keys(data) as (keyof WorkspaceFormType)[]) {
      formData.append(key, data[key] as string);
    }

    const response = await createWorkspaceAction(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="emoji"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Workspace emoji</FormLabel>
              <FormControl>
                <EmojiPicker
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workspaceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Workspace title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo Upload</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  maxSize={1024 * 1024 * 0.5}
                  maxFiles={1}
                  accept={{ "image/*": [] }}
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
