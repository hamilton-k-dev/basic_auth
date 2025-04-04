"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/login";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { LoginSchema } from "@/schemas";
import { isRedirectError } from "next/dist/client/components/redirect-error";

/**
 * LoginForm Component
 * Handles user authentication by submitting login data to the server.
 */
export const LoginForm = () => {
  // Manages loading state while submitting form
  const [isPending, startTransition] = useTransition();

  // State for error and success messages
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  // State for toggling password visibility
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  /**
   * Handles form submission.
   * @param values - Form data containing username and password.
   */
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // Clear previous error/success messages
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      login(values)
        .then((data) => {
          if ("error" in data) {
            setError(data.error); // Set error message if login fails
            console.error("Login Error:", data.error);
          } else if ("success" in data) {
            setSuccess(data.success); // Set success message on successful login
            console.log("Login Success:", data.success);
          }
        })
        .catch((err) => {
          if (!isRedirectError(err)) {
            setError("An unexpected error occurred.");
            console.error("Unexpected Login Error:", err);
          }
        });
    });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[400px] shadow-lg p-6 bg-white rounded border"
          noValidate
        >
          {/* Title */}
          <div>
            <div className="flex flex-row mb-4 items-center justify-between">
              <div className="text-xl font-bold">Login</div>
              <h1 className="text-3xl font-bold text-center">Basic-Auth! 🔐</h1>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter your username"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="">Password</div>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter your password"
                          type={passwordVisible ? "text" : "password"}
                        />
                        {/* Toggle Password Visibility */}
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          {passwordVisible ? (
                            <EyeOff
                              className="text-muted-foreground cursor-pointer"
                              size={18}
                            />
                          ) : (
                            <Eye
                              className="text-muted-foreground cursor-pointer"
                              size={18}
                            />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Display Error or Success Messages */}
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}

          {/* Submit Button */}
          <Button type="submit" className="w-full" loading={isPending}>
            Login
          </Button>

          {/* Register Redirect */}
          <p className="text-center">
            {"Don't have an account? "}
            <Link href="/register" className="text-primary text-sm">
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};
