import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden bg-brand-light">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
