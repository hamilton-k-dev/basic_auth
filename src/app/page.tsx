import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-emerald-500 to-emerald-900">
      <h1 className="font-bold text-6xl text-white">
        Hello From Basic-Auth! 🔐
      </h1>
      <p className="text-lg text-white">
        A lightweight authentication module built with Next.js 15
      </p>
      <div className="mt-4 flex flex-row items-center gap-4">
        <Link href="/login">
          <Button size={"lg"} className="w-full" variant={"secondary"}>
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button size={"lg"} className="w-full">
            Register
          </Button>
        </Link>
      </div>

      <div className="w-96 bg-white p-4 rounded-md text-center mt-6">
        <h1 className="text-lg font-bold">Demo Credentials</h1>
        username: user/admin <br /> password : demo
      </div>
    </main>
  );
}
