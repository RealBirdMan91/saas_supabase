import db from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

async function DashboardPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    redirect("/login");
  }

  const workspace = await db.query.workspaces.findFirst({
    where: (workspaces, { eq }) =>
      eq(workspaces.workspaceOwner, data.session.user.id),
  });
  console.log(workspace);

  return <div>DashboardPage</div>;
}

export default DashboardPage;
