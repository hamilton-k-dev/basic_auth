import * as z from "zod";

export const LoginSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(4),
});
export const RegistrationSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(4),
});