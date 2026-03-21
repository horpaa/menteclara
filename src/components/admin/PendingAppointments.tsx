"use client";
import { useAppointments } from "@/hooks/useAppointments";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function PendingAppointments() {
  const { appointments, isLoading, updateStatus } = useAppointments({ status: "PENDING" });

  const handleConfirm = async (id: string) => {
    try {
      await updateStatus(id, "CONFIRMED");
      toast.success("Cita confirmada");
    } catch {
      toast.error("Error al confirmar");
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await updateStatus(id, "CANCELLED");
      toast.success("Cita cancelada");
    } catch {
      toast.error("Error al cancelar");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
      </div>
    );
  }

  if (appointments.length === 0) {
    return <p className="text-brand-dark/50 text-sm py-4">No hay citas pendientes.</p>;
  }

  return (
    <div className="space-y-3">
      {appointments.slice(0, 5).map((apt) => (
        <div
          key={apt.id}
          className="bg-white border border-brand-lavender rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <p className="font-medium text-brand-dark text-sm">
              {(apt.patient as any)?.firstName} {(apt.patient as any)?.lastName}
            </p>
            <p className="text-xs text-brand-dark/50">
              {format(new Date(apt.startsAt), "EEE d MMM 'a las' HH:mm", { locale: es })}
            </p>
            <Badge variant="outline" className="text-xs mt-1">
              {apt.type === "VIDEO_CALL" ? "Videollamada" : "Presencial"}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => handleConfirm(apt.id)}
              className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
              Confirmar
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleCancel(apt.id)}
              className="text-red-600 border-red-200 hover:bg-red-50 text-xs h-8">
              Rechazar
            </Button>
            <Button size="sm" variant="ghost" asChild className="text-xs h-8">
              <Link href={`/admin/citas/${apt.id}`}>Ver</Link>
            </Button>
          </div>
        </div>
      ))}
      {appointments.length > 5 && (
        <Link href="/admin/citas" className="text-xs text-brand-blue hover:underline block text-center">
          Ver todas ({appointments.length})
        </Link>
      )}
    </div>
  );
}
