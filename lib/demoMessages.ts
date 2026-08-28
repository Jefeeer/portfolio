export interface DemoMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

// Sample submissions shown when no database is connected yet.
export function getDemoMessages(): DemoMessage[] {
  const now = Date.now();
  const h = 3_600_000;
  const d = 24 * h;
  return [
    {
      id: "demo-1",
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      message:
        "Hi Mark! We loved your MediScript AI project. We're building a healthcare scheduling platform and would like to discuss a contract role. Are you available for a quick call next week?",
      createdAt: new Date(now - 2 * h),
    },
    {
      id: "demo-2",
      name: "David Okafor",
      email: "david@brightlabs.io",
      message:
        "Your portfolio is impressive — especially the full-stack work. We need help shipping a Next.js + Supabase MVP. What's your availability and rate?",
      createdAt: new Date(now - 26 * h),
    },
    {
      id: "demo-3",
      name: "Queen's Banquets Team",
      email: "events@queensbanquet.example.com",
      message:
        "Thanks again for the admin dashboard — it's working great. Could we add a reporting/export feature in the next phase?",
      createdAt: new Date(now - 3 * d),
    },
    {
      id: "demo-4",
      name: "Recruiter — Nimbus",
      email: "talent@nimbus.example.com",
      message:
        "We're hiring a senior full-stack developer (remote). Your AI-powered app experience is a strong match. Interested in learning more?",
      createdAt: new Date(now - 9 * d),
    },
  ];
}
