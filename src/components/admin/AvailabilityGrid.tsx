"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

interface Schedule {
  id?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export default function AvailabilityGrid() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/availability/schedule")
      .then((r) => r.json())
      .then((data) => {
        if (data.length === 0) {
          // Default empty grid
          const defaultSchedules: Schedule[] = [];
          for (let d = 0; d <= 6; d++) {
            defaultSchedules.push({ dayOfWeek: d, startTime: "09:00", endTime: "14:00", isActive: d >= 1 && d <= 5 });
          }
          setSchedules(defaultSchedules);
        } else {
          setSchedules(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const update = (index: number, field: keyof Schedule, value: any) => {
    setSchedules((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/availability/schedule", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedules }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Horario guardado");
    } else {
      toast.error("Error al guardar");
    }
  };

  if (loading) return <p className="text-brand-dark/50 text-sm">Cargando horario...</p>;

  const grouped = Array.from({ length: 7 }, (_, day) => ({
    day,
    slots: schedules.filter((s) => s.dayOfWeek === day),
  }));

  return (
    <div className="space-y-4">
      <div className="bg-white border border-brand-lavender rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-brand-dark/60">Día</th>
              <th className="text-left px-4 py-3 font-medium text-brand-dark/60">Activo</th>
              <th className="text-left px-4 py-3 font-medium text-brand-dark/60">Inicio</th>
              <th className="text-left px-4 py-3 font-medium text-brand-dark/60">Fin</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s, i) => (
              <tr key={i} className="border-t border-brand-lavender">
                <td className="px-4 py-3 font-medium text-brand-dark">{DAYS[s.dayOfWeek]}</td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={s.isActive}
                    onChange={(e) => update(i, "isActive", e.target.checked)}
                    className="w-4 h-4 accent-brand-blue"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="time"
                    value={s.startTime}
                    onChange={(e) => update(i, "startTime", e.target.value)}
                    disabled={!s.isActive}
                    className="border border-brand-lavender rounded px-2 py-1 text-sm disabled:opacity-40"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="time"
                    value={s.endTime}
                    onChange={(e) => update(i, "endTime", e.target.value)}
                    disabled={!s.isActive}
                    className="border border-brand-lavender rounded px-2 py-1 text-sm disabled:opacity-40"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        onClick={handleSave}
        disabled={saving}
        className="bg-brand-blue hover:bg-brand-accent text-white"
      >
        {saving ? "Guardando..." : "Guardar horario"}
      </Button>
    </div>
  );
}
