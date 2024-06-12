"use server";

import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";
import { LoginType, SignUpType } from "../types/auth-types";
import { ActionResponseType } from "../types/response";

export async function loginAction(
  data: LoginType
): Promise<ActionResponseType> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return { type: "error", message: error.message };
  }

  return {
    type: "success",
    data: null,
    message: "User logged in successfully",
  };
}

export async function signUpAction({
  email,
  password,
}: SignUpType): Promise<ActionResponseType> {
  const supabase = createClient();
  const { error, data } = await supabase.auth.signUp({ email, password });
  if (error) {
    return { type: "error", message: error.message };
  }

  return {
    type: "success",
    data: null,
    message: "User registered successfully",
  };
}
