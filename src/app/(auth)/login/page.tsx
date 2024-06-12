import React from "react";
import { LoginForm } from "../_components/LoginForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  if (data.session?.user) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}

export default LoginPage;
