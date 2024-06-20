"use server";

import db from "@/lib/db";

export async function getWorkspaceByOwner(userId: string) {
  return await db.query.workspaces.findFirst({
    where: (workspaces, { eq }) => eq(workspaces.workspaceOwner, userId),
  });
}
