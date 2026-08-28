import { DEMO_CREDENTIALS, isDemoMode } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <LoginForm
      demo={isDemoMode()}
      demoEmail={DEMO_CREDENTIALS.email}
      demoPassword={DEMO_CREDENTIALS.password}
    />
  );
}
