"use client";
import { useState, useEffect } from "react";
import { TimeSlot } from "@/types";

export function useAvailability(from?: string, to?: string) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!from || !to) return;
    setIsLoading(true);
    setError(null);
    fetch(`/api/availability?from=${from}&to=${to}`)
      .then((r) => {
        if (!r.ok) throw new Error("Error al cargar disponibilidad");
        return r.json();
      })
      .then(setSlots)
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [from, to]);

  return { slots, isLoading, error };
}
