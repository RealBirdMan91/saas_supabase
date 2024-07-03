"use server";
import { createId } from "@paralleldrive/cuid2";
import { createServerAction } from "zsa";
import { workspaceSchema, workspaceFormSchema } from "../types/workspace-types";
import { createClient } from "../supabase/server";
import { createWorkspace } from "../queries/workspaceQueries";
import { redirect } from "next/navigation";

export const createWorkspaceAction = createServerAction()
  .input(workspaceFormSchema, {
    type: "formData",
  })
  .output(workspaceSchema)
  .handler(async ({ input }) => {
    const supabase = createClient();
    const fileId = createId();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (!userData || userError) return redirect("/login");

    const { data, error } = await supabase.storage
      .from("workspace-logos")
      .upload(`${fileId}-${input.logo[0].name}`, input.logo[0], {
        contentType: input.logo[0].type,
      });

    if (error) {
      throw new Error("file upload failed, please try again.");
    }

    const [newWorkspace] = await createWorkspace({
      workspaceName: input.workspaceName,
      emoji: input.emoji,
      logo: data.path,
      workspaceOwner: userData.user.id,
    });

    return newWorkspace;
  });
