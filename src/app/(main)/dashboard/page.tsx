import db from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import DashboardSetup from "./_components/DashboardSetup";

async function DashboardPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const { data: userData } = await supabase.auth.getUser();
  if (!data.session || !userData.user) {
    redirect("/login");
  }

  const workspace = await db.query.workspaces.findFirst({
    where: (workspaces, { eq }) =>
      eq(workspaces.workspaceOwner, userData.user.id),
  });

  if (!workspace) {
    if (!workspace)
      return (
        <div className="bg-background h-screen w-screen flex justify-center items-center">
          <DashboardSetup user={userData.user} />
        </div>
      );
  }

  return <div>DashboardPage</div>;
}

export default DashboardPage;
