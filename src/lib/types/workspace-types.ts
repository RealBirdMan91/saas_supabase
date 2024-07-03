import { create } from "domain";
import { z } from "zod";

export const workspaceFormSchema = z.object({
  workspaceName: z.string().min(3).max(255),
  logo: z
    .array(z.instanceof(File))
    .min(1, "At least one file is required")
    .max(1),
  emoji: z.string().emoji(),
});

export const workspaceSchema = workspaceFormSchema.extend({
  id: z.string(),
  data: z.string().nullable(),
  workspaceName: z.string(),
  logo: z.string().nullable(),
  emoji: z.string(),
  created_at: z.string(),
  workspaceOwner: z.string(),
  inTrash: z.string().nullable(),
  bannerUrl: z.string().nullable(),
});

export type WorkspaceFormType = z.infer<typeof workspaceFormSchema>;
