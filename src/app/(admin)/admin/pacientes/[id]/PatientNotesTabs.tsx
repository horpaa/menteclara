"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import SessionNoteEditor from "@/components/admin/SessionNoteEditor";
import SessionNoteList from "@/components/admin/SessionNoteList";
import { useState } from "react";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
  RESCHEDULED: "Reprogramada",
};

interface Props {
  appointments: any[];
  notes: any[];
  patientId: string;
  appointmentsForNotes: { id: string; startsAt: string }[];
}

export default function PatientNotesTabs({ appointments, notes, patientId, appointmentsForNotes }: Props) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Tabs defaultValue="citas">
      <TabsList className="mb-4">
        <TabsTrigger value="citas">Historial de citas</TabsTrigger>
        <TabsTrigger value="notas">Notas de sesión</TabsTrigger>
        <TabsTrigger value="nueva-nota">Nueva nota</TabsTrigger>
      </TabsList>

      <TabsContent value="citas">
        <div className="space-y-3">
          {appointments.length === 0 ? (
            <p className="text-brand-dark/40 text-sm">No hay citas.</p>
          ) : (
            appointments.map((apt: any) => (
              <div key={apt.id} className="bg-white border border-brand-lavender rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-dark">
                    {format(new Date(apt.startsAt), "EEEE d 'de' MMMM yyyy 'a las' HH:mm", { locale: es })}
                  </p>
                  <p className="text-xs text-brand-dark/50">
                    {apt.type === "VIDEO_CALL" ? "Videollamada" : "Presencial"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {STATUS_LABELS[apt.status]}
                  </Badge>
                  <Link href={`/admin/citas/${apt.id}`} className="text-xs text-brand-blue hover:underline">
                    Ver
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="notas">
        <SessionNoteList notes={notes} />
      </TabsContent>

      <TabsContent value="nueva-nota">
        <div className="bg-white border border-brand-lavender rounded-xl p-6">
          <SessionNoteEditor
            patientId={patientId}
            appointments={appointmentsForNotes}
            onSaved={() => setRefreshKey((k) => k + 1)}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
