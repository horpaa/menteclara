import Topbar from "@/components/admin/Topbar";
import AvailabilityGrid from "@/components/admin/AvailabilityGrid";
import BlocksList from "./BlocksList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Disponibilidad — MenteClara Admin" };

export default function DisponibilidadPage() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Disponibilidad" />
      <main className="flex-1 p-4 sm:p-6 space-y-8">
        <div>
          <h2 className="font-semibold text-brand-dark mb-4">Horario semanal</h2>
          <AvailabilityGrid />
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-brand-dark">Bloqueos de horario</h2>
            <Button asChild size="sm" className="bg-brand-blue hover:bg-brand-accent text-white">
              <Link href="/admin/disponibilidad/bloquear">+ Añadir bloqueo</Link>
            </Button>
          </div>
          <BlocksList />
        </div>
      </main>
    </div>
  );
}
