# **Basic Auth System for Next.js** 🚀

**A lightweight authentication module built with Next.js 15, designed for easy integration into any project.**

<p align="center">
  <img src="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png" alt="Basic Auth Logo">
</p>

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
│   ├── (dashboard)/     # Protected dashboard route
│   │   ├── page.tsx
│
│   ├── api/             # API routes
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

1️⃣ Clone the Repository

```sh
   git clone https://github.com/yourusername/basic-auth-nextjs.git
```

2️⃣ Install Dependencies

```sh
npm install
```

3️⃣ Set Up Environment Variables
Copy the .env.example file and rename it to .env

```sh
cp .env.example .env
```

Add the required database connection and authentication secrets.
4️⃣ Set Up Prisma Database

```sh
npm prisma migrate dev
```

5️⃣ Start the Development Server

```sh
npm run dev
```

Your app will be running at [http://localhost:3000](http://localhost:3000).

## 🛠️ Integration Guide

🔗 Add Authentication to Your App
Install Dependencies

```sh
pnpm install next-auth bcryptjs prisma @prisma/client zustand zod react-hook-form
```

Import Components in your app:

```sh
import LoginForm from "@/components/auth/login-form";
import RegistrationForm from "@/components/auth/registration-form";
```

Wrap Your App with Auth Provider

```sh
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
return (
<SessionProvider session={pageProps.session}>
<Component {...pageProps} />
</SessionProvider>
);
}

export default MyApp;
```

Protect Pages using Middleware (middleware.ts)

```sh
import { withAuth } from "next-auth/middleware";

export default withAuth({
pages: {
signIn: "/auth/login",
},
});
export const config = { matcher: ["/dashboard/:path*"] };
```

🔐 Authentication Features
✅ Session-based Authentication using Auth.js
✅ Encrypted Passwords with bcryptjs
✅ Client & Server-Side Validation using Zod
✅ Middleware for Route Protection
✅ Fully Typed with TypeScript

💡 Contributors
Built with ❤️ by [hamilton-k-dev](https://github.com/hamilton-k-dev). Contributions welcome! 🚀

💬 Feedback & Support
If you have any issues, feel free to open an issue or reach out via [GitHub Discussions](https://github.com/hamilton-k-dev/basic-auth/discussions).

```

```

```

```
