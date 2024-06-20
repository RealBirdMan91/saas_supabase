import { z } from "zod";

export const workspaceFormSchema = z.object({
  workspaceName: z.string().min(3).max(255),
  logo: z.array(z.instanceof(File)).min(1, "At least one file is required"),
  emoji: z.string().emoji(),
});

export type WorkspaceFormType = z.infer<typeof workspaceFormSchema>;
