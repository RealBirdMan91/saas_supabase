"use server";

import { WorkspaceFormType } from "../types/workspace-types";

export async function createWorkspaceAction(formData: FormData) {
  console.log("yay data", formData);
}
