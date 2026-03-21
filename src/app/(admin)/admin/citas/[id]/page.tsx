export const dynamic = "force-dynamic";

import Topbar from "@/components/admin/Topbar";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AppointmentActions from "./AppointmentActions";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
  RESCHEDULED: "Reprogramada",
};

export default async function CitaDetailPage({ params }: { params: { id: string } }) {
  const apt = await prisma.appointment.findUnique({
    where: { id: params.id },
    include: { patient: true, sessionNote: true },
  });

  if (!apt) notFound();

  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Detalle de cita" />
      <main className="flex-1 p-4 sm:p-6 max-w-3xl">
        <div className="mb-4 flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/citas">← Volver</Link>
          </Button>
        </div>

        <div className="bg-white border border-brand-lavender rounded-xl p-6 space-y-4 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-brand-dark text-lg">
              {apt.patient.firstName} {apt.patient.lastName}
            </h2>
            <span className="text-sm font-medium text-brand-blue">{STATUS_LABELS[apt.status]}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-brand-dark/50 text-xs mb-0.5">Fecha y hora</p>
              <p className="text-brand-dark">{format(apt.startsAt, "EEEE d 'de' MMMM yyyy 'a las' HH:mm", { locale: es })}</p>
            </div>
            <div>
              <p className="text-brand-dark/50 text-xs mb-0.5">Modalidad</p>
              <p className="text-brand-dark">{apt.type === "VIDEO_CALL" ? "Videollamada" : "Presencial"}</p>
            </div>
            <div>
              <p className="text-brand-dark/50 text-xs mb-0.5">Email</p>
              <p className="text-brand-dark">{apt.patient.email}</p>
            </div>
            <div>
              <p className="text-brand-dark/50 text-xs mb-0.5">Teléfono</p>
              <p className="text-brand-dark">{apt.patient.phone ?? "—"}</p>
            </div>
            {apt.meetLink && (
              <div className="col-span-2">
                <p className="text-brand-dark/50 text-xs mb-0.5">Link videollamada</p>
                <a href={apt.meetLink} className="text-brand-blue hover:underline text-sm break-all">{apt.meetLink}</a>
              </div>
            )}
            {apt.notes && (
              <div className="col-span-2">
                <p className="text-brand-dark/50 text-xs mb-0.5">Notas</p>
                <p className="text-brand-dark">{apt.notes}</p>
              </div>
            )}
          </div>
        </div>

        <AppointmentActions appointmentId={apt.id} status={apt.status} />

        <div className="mt-4 flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/citas/${apt.id}/editar`}>Editar / Reprogramar</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/admin/pacientes/${apt.patientId}`}>Ver ficha del paciente</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
