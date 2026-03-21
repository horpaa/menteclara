"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  appointmentId: string;
  status: string;
}

export default function AppointmentActions({ appointmentId, status }: Props) {
  const router = useRouter();

  const update = async (newStatus: string) => {
    const res = await fetch(`/api/appointments/${appointmentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      toast.success("Estado actualizado");
      router.refresh();
    } else {
      toast.error("Error al actualizar");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {(status === "PENDING" || status === "RESCHEDULED") && (
        <>
          <Button onClick={() => update("CONFIRMED")} className="bg-green-600 hover:bg-green-700 text-white">
            Confirmar y enviar email
          </Button>
          <Button variant="outline" onClick={() => update("CANCELLED")} className="text-red-600 border-red-200 hover:bg-red-50">
            Rechazar cita
          </Button>
        </>
      )}
      {status === "CONFIRMED" && (
        <Button onClick={() => update("COMPLETED")} className="bg-brand-blue hover:bg-brand-accent text-white">
          Marcar como completada
        </Button>
      )}
      {(status === "PENDING" || status === "CONFIRMED" || status === "RESCHEDULED") && (
        <Button variant="outline" onClick={() => update("CANCELLED")}>
          Cancelar
        </Button>
      )}
    </div>
  );
}
