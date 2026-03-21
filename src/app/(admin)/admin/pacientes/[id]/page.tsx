export const dynamic = "force-dynamic";

import Topbar from "@/components/admin/Topbar";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import SessionNoteEditor from "@/components/admin/SessionNoteEditor";
import SessionNoteList from "@/components/admin/SessionNoteList";
import PatientNotesTabs from "./PatientNotesTabs";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
  RESCHEDULED: "Reprogramada",
};

export default async function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
    include: {
      appointments: { orderBy: { startsAt: "desc" }, include: { sessionNote: true } },
      sessionNotes: { orderBy: { createdAt: "desc" }, include: { appointment: { select: { startsAt: true, type: true } } } },
    },
  });

  if (!patient) notFound();

  const appointmentsForNotes = patient.appointments.map((a: any) => ({
    id: a.id,
    startsAt: a.startsAt.toISOString(),
  }));

  const notesJson = JSON.parse(JSON.stringify(patient.sessionNotes));

  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Ficha de paciente" />
      <main className="flex-1 p-4 sm:p-6 max-w-4xl">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/pacientes">← Volver</Link>
          </Button>
        </div>

        {/* Header */}
        <div className="bg-white border border-brand-lavender rounded-xl p-6 mb-4">
          <h2 className="text-xl font-bold text-brand-dark mb-1">
            {patient.firstName} {patient.lastName}
          </h2>
          <p className="text-brand-dark/50 text-sm">{patient.email}</p>
          {patient.phone && <p className="text-brand-dark/50 text-sm">{patient.phone}</p>}
          <div className="flex gap-2 mt-3">
            <Badge variant="outline">
              {patient.appointments.length} citas
            </Badge>
            {patient.isFirstConsult && (
              <Badge className="bg-brand-lavender text-brand-dark border-brand-lavender">
                Primera consulta
              </Badge>
            )}
          </div>
        </div>

        <PatientNotesTabs
          appointments={patient.appointments as any}
          notes={notesJson}
          patientId={patient.id}
          appointmentsForNotes={appointmentsForNotes}
        />
      </main>
    </div>
  );
}
