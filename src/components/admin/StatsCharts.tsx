"use client";
import { useStats } from "@/hooks/useStats";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["#F59E0B", "#5B8DB8", "#10B981", "#EF4444"];

export default function StatsCharts() {
  const { stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border border-brand-lavender rounded-xl p-5">
        <h3 className="font-semibold text-brand-dark mb-4 text-sm">Citas por mes</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={stats.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E4F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="total" fill="#5B8DB8" name="Total" radius={4} />
            <Bar dataKey="completed" fill="#10B981" name="Completadas" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white border border-brand-lavender rounded-xl p-5">
        <h3 className="font-semibold text-brand-dark mb-4 text-sm">Distribución por estado</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={stats.statusDistribution.filter((d) => d.value > 0)}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {stats.statusDistribution.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
