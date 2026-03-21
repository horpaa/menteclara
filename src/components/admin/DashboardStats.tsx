"use client";
import { useStats } from "@/hooks/useStats";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Users, Clock, CheckCircle } from "lucide-react";

const statCards = [
  { key: "todayAppointments", label: "Citas hoy", icon: Calendar, color: "text-brand-blue" },
  { key: "pendingAppointments", label: "Pendientes", icon: Clock, color: "text-amber-500" },
  { key: "confirmedAppointments", label: "Confirmadas", icon: CheckCircle, color: "text-green-600" },
  { key: "totalPatients", label: "Pacientes", icon: Users, color: "text-purple-600" },
];

export default function DashboardStats() {
  const { stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map(({ key, label, icon: Icon, color }) => (
        <div key={key} className="bg-white border border-brand-lavender rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-brand-dark/50 font-medium">{label}</span>
            <Icon size={18} className={color} />
          </div>
          <p className="text-3xl font-bold text-brand-dark">
            {stats ? (stats as any)[key] : 0}
          </p>
        </div>
      ))}
    </div>
  );
}
