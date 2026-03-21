"use client";
import { useAppointments } from "@/hooks/useAppointments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
  RESCHEDULED: "Reprogramada",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200",
  COMPLETED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
  RESCHEDULED: "bg-purple-100 text-purple-700 border-purple-200",
};

export default function AppointmentListClient() {
  const [statusFilter, setStatusFilter] = useState("all");
  const { appointments, isLoading, updateStatus } = useAppointments(
    statusFilter !== "all" ? { status: statusFilter } : {}
  );

  const handleAction = async (id: string, status: string) => {
    try {
      await updateStatus(id, status);
      toast.success(`Cita ${STATUS_LABELS[status].toLowerCase()}`);
    } catch {
      toast.error("Error al actualizar cita");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)
        ) : appointments.length === 0 ? (
          <p className="text-brand-dark/40 text-sm py-8 text-center">No hay citas con ese filtro.</p>
        ) : (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white border border-brand-lavender rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-brand-dark text-sm">
                    {(apt.patient as any)?.firstName} {(apt.patient as any)?.lastName}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[apt.status]}`}>
                    {STATUS_LABELS[apt.status]}
                  </span>
                </div>
                <p className="text-xs text-brand-dark/50">
                  {format(new Date(apt.startsAt), "EEEE d MMM yyyy 'a las' HH:mm", { locale: es })}
                  {" · "}{apt.type === "VIDEO_CALL" ? "Videollamada" : "Presencial"}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {(apt.status === "PENDING" || apt.status === "RESCHEDULED") && (
                  <>
                    <Button size="sm" onClick={() => handleAction(apt.id, "CONFIRMED")}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs h-7">
                      Confirmar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAction(apt.id, "CANCELLED")}
                      className="text-red-600 border-red-200 text-xs h-7">
                      Rechazar
                    </Button>
                  </>
                )}
                {apt.status === "CONFIRMED" && (
                  <Button size="sm" onClick={() => handleAction(apt.id, "COMPLETED")}
                    className="bg-brand-blue hover:bg-brand-accent text-white text-xs h-7">
                    Completar
                  </Button>
                )}
                <Button size="sm" variant="ghost" asChild className="text-xs h-7">
                  <Link href={`/admin/citas/${apt.id}`}>Ver detalle</Link>
                </Button>
                <Button size="sm" variant="ghost" asChild className="text-xs h-7">
                  <Link href={`/admin/citas/${apt.id}/editar`}>Editar</Link>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
