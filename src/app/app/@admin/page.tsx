import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/utils/user";
import React from "react";

export default async function AdminDashboard() {
  const user = await getUserInfo();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <p className="mb-2">username : {user.username}</p>
      <LogoutButton>
        <Button>Logout</Button>
      </LogoutButton>
    </div>
  );
}
