"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
        router.refresh();
      }}
      className="inline-flex items-center gap-2 rounded-full border border-[#D2FFE4]/30 px-5 py-2 text-xs uppercase tracking-widest text-[#D2FFE4] hover:bg-[#D2FFE4]/10 transition-colors"
    >
      <LogOut size={14} /> Log out
    </button>
  );
}
