import Topbar from "@/components/admin/Topbar";
import PatientTable from "@/components/admin/PatientTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pacientes — MenteClara Admin" };

export default function PacientesPage() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Pacientes" />
      <main className="flex-1 p-4 sm:p-6">
        <PatientTable />
      </main>
    </div>
  );
}
