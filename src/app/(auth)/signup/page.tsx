import React from "react";
import { SignUpForm } from "../_components/SignUpForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function SignupPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  if (data.session?.user) {
    redirect("/dashboard");
  }
  return <SignUpForm />;
}

export default SignupPage;
