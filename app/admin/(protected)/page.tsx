import { Clock, Inbox, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getDemoMessages } from "@/lib/demoMessages";
import { deleteMessage } from "./actions";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Msg = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
};

export default async function AdminDashboard() {
  let messages: Msg[] = [];
  let demo = false;
  try {
    messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    // No database connected yet — show sample data so the dashboard is usable.
    messages = getDemoMessages();
    demo = true;
  }

  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const last24 = messages.filter((m) => m.createdAt >= dayAgo).length;

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#D2FFE4] px-5 sm:px-8 md:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="hero-heading font-black uppercase leading-none tracking-tight text-4xl sm:text-5xl">
              Dashboard
            </h1>
            <p className="text-[#5E8A73] uppercase tracking-widest text-xs mt-2">
              Contact messages
            </p>
          </div>
          <LogoutButton />
        </header>

        {demo && (
          <div className="mb-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/5 px-5 py-4 text-yellow-200/80 text-sm">
            Showing <strong>sample data</strong>. Connect a database
            (<code>DATABASE_URL</code> / <code>DIRECT_URL</code> +{" "}
            <code>prisma migrate</code>) to see real contact submissions.
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-10">
          <Stat
            icon={<Inbox size={18} />}
            label="Total messages"
            value={messages.length}
          />
          <Stat
            icon={<Clock size={18} />}
            label="Last 24 hours"
            value={last24}
          />
        </div>

        {messages.length === 0 ? (
          <p className="text-[#5E8A73] text-center py-20">No messages yet.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {messages.map((m) => (
              <li
                key={m.id}
                className="rounded-2xl border border-[#D2FFE4]/15 bg-white/[0.03] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <a
                      href={`mailto:${m.email}`}
                      className="text-[#5E8A73] text-sm hover:text-[#D2FFE4] inline-flex items-center gap-1 transition-colors"
                    >
                      <Mail size={13} /> {m.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <time className="text-[#5E8A73] text-xs">
                      {m.createdAt.toLocaleString()}
                    </time>
                    {!demo && (
                      <form action={deleteMessage}>
                        <input type="hidden" name="id" value={m.id} />
                        <button className="text-red-400/70 hover:text-red-400 text-xs uppercase tracking-widest transition-colors">
                          Delete
                        </button>
                      </form>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-[#D2FFE4]/80 leading-relaxed whitespace-pre-wrap">
                  {m.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-[#D2FFE4]/15 bg-white/[0.03] p-5">
      <div className="flex items-center gap-2 text-[#5E8A73] uppercase tracking-widest text-xs">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}
