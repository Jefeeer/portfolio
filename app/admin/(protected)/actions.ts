"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function deleteMessage(formData: FormData) {
  if (!isAuthenticated()) return;
  const id = String(formData.get("id") ?? "");
  if (!id || id.startsWith("demo-")) return; // demo rows aren't persisted
  try {
    await prisma.message.delete({ where: { id } });
  } catch {
    // no DB / already gone — nothing to do
  }
  revalidatePath("/admin");
}
