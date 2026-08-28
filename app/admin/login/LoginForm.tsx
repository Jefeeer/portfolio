"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

const inputClass =
  "w-full rounded-2xl bg-white/5 border border-[#D2FFE4]/20 text-[#D2FFE4] placeholder:text-[#5E8A73] px-5 py-4 outline-none focus:border-[#D2FFE4]/60 transition-colors";

export default function LoginForm({
  demo,
  demoEmail,
  demoPassword,
}: {
  demo: boolean;
  demoEmail: string;
  demoPassword: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed.");
      }
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="rounded-full border border-[#D2FFE4]/20 p-4 text-[#D2FFE4]">
            <Lock size={22} />
          </div>
          <h1 className="hero-heading font-black uppercase tracking-tight text-3xl">
            Admin
          </h1>
          <p className="text-[#5E8A73] uppercase tracking-widest text-xs">
            Restricted access
          </p>
        </div>

        {demo && (
          <div className="mb-6 rounded-2xl border border-[#D2FFE4]/15 bg-white/[0.03] px-5 py-4 text-sm">
            <p className="text-[#D2FFE4] font-medium uppercase tracking-widest text-xs mb-2">
              Demo mode
            </p>
            <p className="text-[#5E8A73] leading-relaxed">
              Email <span className="text-[#D2FFE4]">{demoEmail}</span>
              <br />
              Password <span className="text-[#D2FFE4]">{demoPassword}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                setEmail(demoEmail);
                setPassword(demoPassword);
              }}
              className="mt-3 text-[#D2FFE4] underline underline-offset-4 hover:opacity-70 transition-opacity text-xs uppercase tracking-widest"
            >
              Fill demo credentials
            </button>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            required
            type="email"
            placeholder="Email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <input
            required
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full text-white font-medium uppercase tracking-widest px-10 py-4 text-sm transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
            style={{
              background:
                "linear-gradient(123deg, #04140b 7%, #0c7a42 37%, #14b85f 72%, #22ff88 100%)",
              boxShadow:
                "0px 4px 4px rgba(34, 255, 136, 0.25), 4px 4px 12px #0c7a42 inset",
              outline: "2px solid #FFFFFF",
              outlineOffset: "-3px",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </form>
      </div>
    </main>
  );
}
