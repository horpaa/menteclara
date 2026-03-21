export const dynamic = "force-dynamic";

import Topbar from "@/components/admin/Topbar";
import { prisma } from "@/lib/prisma";
import AdminCalendarWrapper from "./AdminCalendarWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Calendario — MenteClara Admin" };

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#F59E0B",
  CONFIRMED: "#5B8DB8",
  COMPLETED: "#10B981",
  CANCELLED: "#EF4444",
  RESCHEDULED: "#8B5CF6",
};

export default async function CalendarioPage() {
  const appointments = await prisma.appointment.findMany({
    include: { patient: true },
    orderBy: { startsAt: "asc" },
  });

  const events = appointments.map((apt: any) => ({
    id: apt.id,
    title: `${apt.patient.firstName} ${apt.patient.lastName}`,
    start: apt.startsAt.toISOString(),
    end: apt.endsAt.toISOString(),
    color: STATUS_COLORS[apt.status] ?? "#5B8DB8",
  }));

  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Calendario" />
      <main className="flex-1 p-4 sm:p-6">
        <AdminCalendarWrapper events={events} />
      </main>
    </div>
  );
}
