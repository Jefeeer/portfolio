"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  Clock,
  Globe,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Users,
} from "lucide-react";
import {
  SidebarNav,
  NavGroupData,
  NavItemData,
} from "@/components/ui/dashboard-sidebar";
import { deleteMessage } from "./actions";

export type Msg = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string; // ISO
};

export default function DashboardShell({
  messages,
  demo,
}: {
  messages: Msg[];
  demo: boolean;
}) {
  const router = useRouter();
  const [activeId, setActiveId] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("admin-theme", theme);
  }, [theme]);

  const now = Date.now();
  const dayAgo = now - 24 * 3600 * 1000;
  const weekAgo = now - 7 * 24 * 3600 * 1000;
  const last24 = messages.filter((m) => +new Date(m.createdAt) >= dayAgo).length;
  const last7 = messages.filter((m) => +new Date(m.createdAt) >= weekAgo).length;
  const uniqueSenders = new Set(messages.map((m) => m.email.toLowerCase())).size;

  const groups: NavGroupData[] = [
    {
      items: [
        { id: "overview", title: "Overview", icon: LayoutDashboard },
        {
          id: "messages",
          title: "Messages",
          icon: Inbox,
          badge: messages.length || undefined,
        },
        { id: "analytics", title: "Analytics", icon: Activity },
      ],
    },
  ];
  const bottomItems: NavItemData[] = [
    { id: "site", title: "View Site", icon: Globe },
    { id: "logout", title: "Log out", icon: LogOut },
  ];

  const onSelect = async (id: string) => {
    if (id === "logout") {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
      return;
    }
    if (id === "site") {
      router.push("/");
      return;
    }
    setActiveId(id);
  };

  const title =
    activeId === "analytics"
      ? "Analytics"
      : activeId === "messages"
      ? "Messages"
      : "Overview";

  return (
    <div
      className={`${theme === "dark" ? "dark" : ""} flex h-screen bg-background text-foreground overflow-hidden`}
    >
      <div
        className={`h-full transition-all duration-300 ease-in-out shrink-0 overflow-hidden ${
          sidebarOpen ? "w-[260px]" : "w-0"
        }`}
      >
        <SidebarNav
          groups={groups}
          bottomItems={bottomItems}
          activeId={activeId}
          onSelect={onSelect}
          brandName="Mark Manalo"
          brandSub="Admin"
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border/50 flex items-center px-4 justify-between bg-card shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-[18px] h-[18px]" strokeWidth={1.5} />
              ) : (
                <PanelLeftOpen className="w-[18px] h-[18px]" strokeWidth={1.5} />
              )}
            </button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Admin</span>
              <span>/</span>
              <span className="font-medium text-foreground">{title}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {demo && (
              <span className="text-[11px] uppercase tracking-widest text-yellow-600 dark:text-yellow-300/80 border border-yellow-500/30 rounded-full px-3 py-1">
                Demo data
              </span>
            )}
            <button
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-[18px] h-[18px]" strokeWidth={1.5} />
              ) : (
                <Moon className="w-[18px] h-[18px]" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeId === "analytics" ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Stat icon={<Inbox size={18} />} label="Total" value={messages.length} />
              <Stat icon={<Clock size={18} />} label="Last 24h" value={last24} />
              <Stat icon={<Activity size={18} />} label="Last 7 days" value={last7} />
              <Stat
                icon={<Users size={18} />}
                label="Unique senders"
                value={uniqueSenders}
              />
            </div>
          ) : (
            <>
              {activeId === "overview" && (
                <div className="grid grid-cols-2 gap-4 mb-8">
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
              )}
              <MessageList messages={messages} demo={demo} />
            </>
          )}
        </div>
      </div>
    </div>
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
    <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground uppercase tracking-widest text-xs">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-3xl font-black text-foreground">{value}</p>
    </div>
  );
}

function MessageList({ messages, demo }: { messages: Msg[]; demo: boolean }) {
  if (messages.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-20">No messages yet.</p>
    );
  }
  return (
    <ul className="flex flex-col gap-4">
      {messages.map((m) => (
        <li
          key={m.id}
          className="rounded-xl border border-border/50 bg-card p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">{m.name}</p>
              <a
                href={`mailto:${m.email}`}
                className="text-muted-foreground text-sm hover:text-foreground inline-flex items-center gap-1 transition-colors"
              >
                <Mail size={13} /> {m.email}
              </a>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <time className="text-muted-foreground text-xs">
                {new Date(m.createdAt).toLocaleString()}
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
          <p className="mt-3 text-foreground/80 leading-relaxed whitespace-pre-wrap">
            {m.message}
          </p>
        </li>
      ))}
    </ul>
  );
}
