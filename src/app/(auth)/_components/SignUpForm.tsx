"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Logo from "@/assets/cypresslogo.svg";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpType, signUpSchema } from "@/lib/types/auth-types";
import Link from "next/link";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";
import { signUpAction } from "@/lib/actions/auth-actions";

export function SignUpForm() {
  const [confirmation, setConfirmation] = useState(false);
  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpType) {
    const { type, message } = await signUpAction(data);
    if (type === "error") {
      return form.setError("root", {
        type: "manual",
        message: message,
      });
    }
    form.reset();
    setConfirmation(true);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <Link
          href="/"
          className="
          w-full
          flex
          justify-left
          items-center"
        >
          <Image src={Logo} alt="cypress Logo" width={50} height={50} />
          <span
            className="font-semibold
          dark:text-white text-4xl first-letter:ml-2"
          >
            cypress.
          </span>
        </Link>

        <FormDescription
          className="
        text-foreground/60"
        >
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>
        <FormField
          disabled={form.formState.isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={form.formState.isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={form.formState.isLoading}
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}
        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={form.formState.isLoading}
        >
          Sign Up
        </Button>
        <span className="self-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </span>
        {confirmation && (
          <Alert>
            <MailCheck className="h-4 w-4" />
            <AlertTitle>Check your email</AlertTitle>
            <AlertDescription>
              An email confirmation has been sent.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
