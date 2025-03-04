"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegistrationSchema } from "@/schemas";
import { getUserByUsername } from "@/data/user";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client"; // ✅ Import the enum from Prisma

/**
 * Defines the expected return type for the `register` function.
 */
type RegisterResponse =
    | { success: "ACCOUNT_CREATED" }
    | { error: "INVALID_FIELDS" | "USERNAME_TAKEN" | "UNKNOWN_ERROR" };

/**
 * Handles user registration.
 * @param values - The registration data provided by the user.
 * @returns A response object indicating success or the type of error.
 */
export const register = async (
    values: z.infer<typeof RegistrationSchema>
): Promise<RegisterResponse> => {
    try {
        // Validate input fields based on the defined schema.
        const validatedFields = RegistrationSchema.safeParse(values);
        if (!validatedFields.success) {
            return { error: "INVALID_FIELDS" }; // Invalid input data.
        }

        const { username, password } = validatedFields.data;

        // Check if the username is already taken.
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return { error: "USERNAME_TAKEN" }; // Username is already in use.
        }

        // Assign a role based on the username using the Prisma enum.
        const role: UserRole = username.includes("admin") ? UserRole.ADMIN : UserRole.USER;

        // Hash the user's password before saving.
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.user.create({
            data: {
                username,
                password: hashedPassword,
                role,
            },
        });

        return { success: "ACCOUNT_CREATED" };
    } catch (error) {
        console.error("Registration error:", error);
        return { error: "UNKNOWN_ERROR" }; // General error handling.
    }
};
