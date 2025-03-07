import NextAuth from "next-auth"
import type { Adapter } from 'next-auth/adapters';


import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "./lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"

export const {
    handlers: { GET, POST },
    auth,
    signIn, signOut
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/error/auth",
    },
    callbacks: {
        async signIn({ account }) {
            if (account?.provider !== "credentials") return true;
            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.username && session.user) {
                session.user.username = token.username as string;
            }
            if (token.role && session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            token.username = existingUser.username;
            token.role = existingUser.role;
            return token;
        },
    },
    adapter: PrismaAdapter(db) as Adapter,
    session: { strategy: "jwt" },
    ...authConfig
})
