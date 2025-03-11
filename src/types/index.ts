/**
 * Defines the expected return type for the `login` function.
 */

export type LoginResponse =
    | { success: string } // Indicates a successful login.
    | { error: string | undefined | "INVALID_FIELDS" | "USER_NOT_FOUND" | "INVALID_CREDENTIALS" | "UNKNOWN_ERROR" };


/**
 * Defines the expected return type for the `register` function.
 */

export type RegisterResponse =
    | { success: "ACCOUNT_CREATED" }
    | { error: "INVALID_FIELDS" | "USERNAME_TAKEN" | "UNKNOWN_ERROR" };