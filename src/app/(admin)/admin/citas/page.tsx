import Topbar from "@/components/admin/Topbar";
import AppointmentListClient from "./AppointmentListClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Citas — MenteClara Admin" };

export default function CitasPage() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Citas" />
      <main className="flex-1 p-4 sm:p-6">
        <AppointmentListClient />
      </main>
    </div>
  );
}
