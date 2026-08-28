import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "admin_session";
const MAX_AGE_S = 60 * 60 * 24 * 7; // 7 days

// Demo fallback so the admin area works with zero env setup (no DB required).
// Set ADMIN_EMAIL / ADMIN_PASSWORD / SESSION_SECRET to switch to real creds.
const DEMO = {
  email: "admin@demo.com",
  password: "demo1234",
  secret: "demo-session-secret-change-in-production",
};

export const DEMO_CREDENTIALS = {
  email: DEMO.email,
  password: DEMO.password,
};

export function isDemoMode(): boolean {
  return !(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
}

function secret(): string {
  return process.env.SESSION_SECRET || DEMO.secret;
}

function hmac(value: string): string {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function verifyCredentials(email: string, password: string): boolean {
  const adminEmail = (process.env.ADMIN_EMAIL || DEMO.email).trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || DEMO.password;
  const emailOk = safeEqual(email.trim().toLowerCase(), adminEmail);
  const passOk = safeEqual(password, adminPassword);
  return emailOk && passOk;
}

export function createSession(email: string): void {
  const exp = Date.now() + MAX_AGE_S * 1000;
  const value = `${email}|${exp}`;
  const token = `${Buffer.from(value).toString("base64url")}.${hmac(value)}`;
  cookies().set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_S,
  });
}

export function destroySession(): void {
  cookies().delete(COOKIE);
}

export function isAuthenticated(): boolean {
  try {
    const token = cookies().get(COOKIE)?.value;
    if (!token) return false;
    const dot = token.lastIndexOf(".");
    if (dot < 0) return false;
    const value = Buffer.from(token.slice(0, dot), "base64url").toString("utf8");
    const sig = token.slice(dot + 1);
    if (!safeEqual(sig, hmac(value))) return false;
    const exp = Number(value.split("|")[1]);
    return Number.isFinite(exp) && Date.now() < exp;
  } catch {
    return false;
  }
}
