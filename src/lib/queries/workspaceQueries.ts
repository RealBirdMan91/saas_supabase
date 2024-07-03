"use server";

import db from "@/lib/db";
import { NewWorkspace, workspaces } from "../supabase/schema";

export async function getWorkspaceByOwner(userId: string) {
  return await db.query.workspaces.findFirst({
    where: (workspaces, { eq }) => eq(workspaces.workspaceOwner, userId),
  });
}

export async function createWorkspace(data: NewWorkspace) {
  return await db.insert(workspaces).values(data).returning();
}
