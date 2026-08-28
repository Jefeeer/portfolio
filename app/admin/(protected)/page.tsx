import { prisma } from "@/lib/prisma";
import { getDemoMessages } from "@/lib/demoMessages";
import DashboardShell, { Msg } from "./DashboardShell";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminDashboard() {
  let raw: { id: string; name: string; email: string; message: string; createdAt: Date }[];
  let demo = false;
  try {
    raw = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    // No database connected yet — show sample data so the dashboard is usable.
    raw = getDemoMessages();
    demo = true;
  }

  const messages: Msg[] = raw.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    message: m.message,
    createdAt: m.createdAt.toISOString(),
  }));

  return <DashboardShell messages={messages} demo={demo} />;
}
