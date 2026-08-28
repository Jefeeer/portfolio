import { NextResponse } from "next/server";
import { createSession, verifyCredentials } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "");
  const password = String(body?.password ?? "");

  if (!verifyCredentials(email, password)) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  createSession(email.trim().toLowerCase());
  return NextResponse.json({ ok: true });
}
