import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import DashboardSetup from "./_components/DashboardSetup";
import { getWorkspaceByOwner } from "@/lib/queries/workspaceQueries";

async function DashboardPage() {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return redirect("/login");
  }

  const workspace = await getWorkspaceByOwner(userData.user.id);

  if (!workspace)
    return (
      <div className="bg-background h-screen w-screen flex justify-center items-center">
        <DashboardSetup />
      </div>
    );

  return <div>DashboardPage</div>;
}

export default DashboardPage;
