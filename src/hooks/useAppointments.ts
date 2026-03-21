"use client";
import { useState, useEffect, useCallback } from "react";
import { Appointment } from "@/types";

export function useAppointments(params?: { status?: string; date?: string }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (params?.status) query.set("status", params.status);
      if (params?.date) query.set("date", params.date);
      const res = await fetch(`/api/appointments?${query}`);
      if (!res.ok) throw new Error("Error al cargar citas");
      const data = await res.json();
      setAppointments(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [params?.status, params?.date]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateStatus = async (id: string, status: string, extra?: Record<string, unknown>) => {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, ...extra }),
    });
    if (!res.ok) throw new Error("Error al actualizar cita");
    await fetchAppointments();
    return res.json();
  };

  return { appointments, isLoading, error, refetch: fetchAppointments, updateStatus };
}
