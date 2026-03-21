"use client";
import { useState, useEffect, useCallback } from "react";
import { Patient } from "@/types";

export function usePatients(search?: string) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const query = search ? `?search=${encodeURIComponent(search)}` : "";
      const res = await fetch(`/api/patients${query}`);
      if (!res.ok) throw new Error("Error al cargar pacientes");
      setPatients(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return { patients, isLoading, error, refetch: fetchPatients };
}
