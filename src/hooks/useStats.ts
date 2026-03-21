"use client";
import { useState, useEffect } from "react";

export interface Stats {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  totalPatients: number;
  todayAppointments: number;
  monthlyData: { month: string; total: number; completed: number }[];
  statusDistribution: { name: string; value: number }[];
}

export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => {
        if (!r.ok) throw new Error("Error al cargar estadísticas");
        return r.json();
      })
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { stats, isLoading, error };
}
