export const dynamic = "force-dynamic";

import Topbar from "@/components/admin/Topbar";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EditAppointmentForm from "./EditAppointmentForm";

export default async function EditarCitaPage({ params }: { params: { id: string } }) {
  const apt = await prisma.appointment.findUnique({
    where: { id: params.id },
    include: { patient: true },
  });

  if (!apt) notFound();

  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Editar cita" />
      <main className="flex-1 p-4 sm:p-6 max-w-xl">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/citas/${params.id}`}>← Volver</Link>
          </Button>
        </div>
        <div className="bg-white border border-brand-lavender rounded-xl p-6">
          <h2 className="font-bold text-brand-dark text-lg mb-4">
            Editar cita — {apt.patient.firstName} {apt.patient.lastName}
          </h2>
          <EditAppointmentForm appointment={apt as any} />
        </div>
      </main>
    </div>
  );
}
