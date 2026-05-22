# **Basic Auth System for Next.js** 🚀

**A lightweight authentication module built with Next.js 15, designed for easy integration into any project.**

<p align="center">
  <img src="https://github.com/user-attachments/assets/540787cb-c74c-4f4d-a023-efe077cd58bb" alt="Basic Auth Logo">
</p>

**for demo purposes, use `demo` as password and as username, use `admin` to log in as administrator or `user` to log in as user**

<div align="center">
<a target="_blank" href="https://basic-auth-puce.vercel.app/">View Demo</a>
<span>
</div>

---

## **🔹 Overview**

This project provides a **ready-to-use authentication system** for Next.js applications. It includes:

✅ **User Registration & Login**  
✅ **Session Management** with `Auth.js`  
✅ **Password Hashing** using `bcryptjs`  
✅ **Form Validation** with `Zod` + `React Hook Form`  
✅ **Database Integration** with `Prisma ORM`  
✅ **Global State Management** using `Zustand`  
✅ **Fully Typed with TypeScript**

This system is **modular** and can be **easily integrated** into any Next.js app.

---

## **📌 Tech Stack**

| Category              | Technology                                                                |
| --------------------- | ------------------------------------------------------------------------- |
| **Framework**         | [Next.js 15](https://nextjs.org/)                                         |
| **Language**          | [TypeScript](https://www.typescriptlang.org/)                             |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com/)                                  |
| **Components**        | [Shadcn-ui](https://ui.shadcn.com/)                                       |
| **Authentication**    | [Auth.js](https://authjs.dev/)                                            |
| **Database**          | [Prisma ORM](https://www.prisma.io/) + PostgreSQL                         |
| **State Management**  | [Zustand](https://zustand-demo.pmnd.rs/)                                  |
| **Schema Validation** | [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) |
| **Security**          | [bcryptjs](https://www.npmjs.com/package/bcryptjs)                        |
| **Middleware**        | Custom authentication guards for protected routes                         |

---

## **📂 Folder Structure**

```plaintext
src/
├── actions/              # Server actions for auth
│   ├── login.ts         # Login logic
│   ├── register.ts      # Registration logic
│
├── app/
│   ├── (auth)/          # Authentication pages
│   │   ├── login/       # Login page
│   │   │   ├── page.tsx
│   │   ├── register/    # Registration page
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│
│   ├── app/     # Protected app route
│   │   ├── @admin/
│   │   │   ├── page.tsx
│   │   ├── @user/
│   │   │   ├── page.tsx
│
│   ├── api/     # API routes
│   │   ├── auth/ # AUTH routes
│   │   │   ├── [...nextauth]/
│   │   │   │   ├── route.ts
│
├── components/           # Shared UI components
│   ├── auth/            # Authentication components
│   │   ├── login-form.tsx
│   │   ├── registration-form.tsx
│   │   ├── logout-button.tsx
│   ├── ui/              # Reusable UI elements
│   │   ├── form-error.tsx
│   │   ├── form-success.tsx
│
├── lib/                  # Core utilities and database
│   ├── db.ts            # Prisma database connection
│   ├── utils.ts         # Shared utility functions
│
├── schemas/              # Zod validation schemas
│
├── utils/                # Auth & middleware
│   ├── auth.config.ts   # Auth.js configuration
│   ├── auth.ts          # Auth helpers
│   ├── middleware.ts    # Middleware for protected routes
│   ├── routes.ts        # Route constants
│
├── prisma/               # Prisma ORM setup
│   ├── schema.prisma
│
├── .env.example          # Environment variables template
├── README.md             # Project documentation
├── package.json          # Dependencies
```

---

## 🎨 UI Preview

### Registration Page

![Registration Page](https://github.com/user-attachments/assets/02b5a7a4-b380-4bd1-b59a-c108ceeb9706)

### Login Page

![Login Page](https://github.com/user-attachments/assets/c17654e6-8e17-43df-a45b-efe4507ea0f9)

## Getting Started

> [!NOTE]  
> We are using **Next 15** with **React 19**, follow these steps:

**1️⃣ Clone the Repository**

```sh
   git clone https://github.com/hamilton-k-dev/basic-auth-nextjs.git
```

**2️⃣ Install Dependencies**

```sh
npm install
```

**3️⃣ Set Up Environment Variables**
Copy the .env.example file and rename it to .env

```sh
cp .env.example .env
```

Add the required database connection and authentication secrets.

**4️⃣ Set Up Prisma Database**

```sh
npx prisma generate
```

```sh
npx prisma db push
```

**5️⃣ Start the Development Server**

```sh
npm run dev
```

Your app will be running at [http://localhost:3000](http://localhost:3000).

## 🛠️ Integration Guide

🔗 Add Authentication to Your App
Install Dependencies

```sh
npm install next-auth bcryptjs prisma @prisma/client zustand zod react-hook-form
```

Import Components in your app:

```sh
import LoginForm from "@/components/auth/login-form";
import RegistrationForm from "@/components/auth/registration-form";
```

Wrap Your App with Auth Provider

```sh
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

function AuthLayout({ Component, pageProps }) {
   const session = await auth();
return (
   <SessionProvider session={session}>
      <Component {...pageProps} />
   </SessionProvider>
   );
}

export default AuthLayout;
```

Protect Pages using Middleware (middleware.ts)

```sh
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { NextResponse } from "next/server";

import {
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "./routes";
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
    const { nextUrl } = req
    const { pathname } = nextUrl
    const isLoggedIn = !!req.auth;

    const isPublicRoute = pathname === "/" || publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname)
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    if (isApiAuthRoute) {
        return
    }

    if (!isPublicRoute && !isAuthRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }
    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/app", nextUrl));
    }
})
export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/",
        "/(api|trpc)(.*)",
    ],
};
```

## **🔐 Authentication Features :**

✅ **Session-based Authentication using Auth.js**

✅ **Encrypted Passwords with bcryptjs**

✅ **Client & Server-Side Validation using Zod**

✅ **Middleware for Route Protection**

✅ **Fully Typed with TypeScript**

## 💡 Contributors

Built with ❤️ by [Hamilton KENFACK](https://github.com/hamilton-k-dev). Contributions welcome! 🚀

## 💬 Feedback & Support

If you have any issues, feel free to open an issue or reach out via [GitHub Discussions](https://github.com/hamilton-k-dev/basic-auth/discussions).

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/hamilton-k-dev/basic-auth/discussions) file for details.
