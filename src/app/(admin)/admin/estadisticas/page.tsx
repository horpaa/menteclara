import Topbar from "@/components/admin/Topbar";
import StatsCharts from "@/components/admin/StatsCharts";
import DashboardStats from "@/components/admin/DashboardStats";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Estadísticas — MenteClara Admin" };

export default function EstadisticasPage() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Estadísticas" />
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        <DashboardStats />
        <StatsCharts />
      </main>
    </div>
  );
}
