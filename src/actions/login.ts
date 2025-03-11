"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserByUsername } from "@/data/user";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from 'next/navigation'

/**
 * Defines the expected return type for the `login` function.
 */
type LoginResponse =
  | { success: string } // Indicates a successful login.
  | { error: string | undefined | "INVALID_FIELDS" | "USER_NOT_FOUND" | "INVALID_CREDENTIALS" | "UNKNOWN_ERROR" | "Invalid credentials." | "Something went wrong." };

/**
 * Handles user authentication using credentials.
 * @param values - The login credentials provided by the user.
 * @returns A response object indicating success or the type of error.
 */
export const login = async (values: z.infer<typeof LoginSchema>): Promise<LoginResponse> => {
  // Validate the input fields based on the defined schema.
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "INVALID_FIELDS" }; // Invalid input data.
  }

  const { username, password } = validatedFields.data;

  // Check if the user exists in the database.
  const existingUser = await getUserByUsername(username);
  if (!existingUser) {
    return { error: "USER_NOT_FOUND" }; // No user found with the provided username.
  }

  try {
    // Attempt to authenticate the user with credentials.
    await signIn("credentials", { username, password, redirectTo: "/app" });
    return { success: "LOGIN_SUCCESS" }; // Successful login.
  } catch (error) {

    if (isRedirectError(error)) {
      console.error("isRedirectError:", error);
      redirect(`/app`)
    }
    else if (error instanceof AuthError) {
      console.error("isAuthError:", error);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "INVALID_CREDENTIALS" }; // Incorrect username or password.
        default:
          return { error: "UNKNOWN_ERROR" }; // Unexpected authentication error.
      }
    }
    return { success: "UNKNOWN_ERROR" }
    throw error; // Re-throw any unexpected errors.
  }
};
