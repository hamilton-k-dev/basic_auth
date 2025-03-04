import { signOut } from "@/auth";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      {children}
    </form>
  );
};
