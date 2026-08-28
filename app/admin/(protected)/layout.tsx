import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAuthenticated()) redirect("/admin/login");
  return <>{children}</>;
}
