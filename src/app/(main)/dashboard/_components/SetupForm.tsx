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
import { useServerAction } from "zsa-react";
import { createWorkspaceAction } from "@/lib/actions/workspace-actions";
import { toast } from "sonner";

export function SetupForm() {
  const { isPending, isSuccess, data, execute, error, isError } =
    useServerAction(createWorkspaceAction);

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
    formData.append("workspaceName", data.workspaceName);
    formData.append("emoji", data.emoji);
    for (const file of data.logo) {
      formData.append("logo", file);
    }
    const [response, error] = await execute(formData);
    if (error) {
      return toast.error("Failed to create workspace, please try again.");
    }
    toast.success("Workspace created successfully");
    console.log(response);
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
