import Topbar from "@/components/admin/Topbar";
import DashboardStats from "@/components/admin/DashboardStats";
import PendingAppointments from "@/components/admin/PendingAppointments";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard — MenteClara Admin" };

export default function AdminDashboard() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Dashboard" />
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        <DashboardStats />
        <div>
          <h2 className="font-semibold text-brand-dark mb-3">Citas pendientes de confirmación</h2>
          <PendingAppointments />
        </div>
      </main>
    </div>
  );
}
