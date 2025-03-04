import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-emerald-500 to-emerald-900">
      <h1 className="font-bold text-6xl text-white">
        Hello From Basic-Auth! 🔐
      </h1>
      <p className="text-lg text-white">A basic authentication systeme</p>
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
    </main>
  );
}
