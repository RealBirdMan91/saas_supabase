"use server";

import { createServerAction } from "zsa";
import { workspaceSchema, workspaceFormSchema } from "../types/workspace-types";

export const createWorkspace = createServerAction()
  .input(workspaceFormSchema, {
    type: "formData",
  })
  .output(workspaceSchema)
  .handler(async ({ input }) => {
    console.log(input);
    return {
      id: "1",
      workspaceName: "test workspace",
      emoji: "🚀",
      logo: "https://avatars.githubusercontent.com/u/44036562?s=200&v=4",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
