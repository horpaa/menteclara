import Topbar from "@/components/admin/Topbar";
import ContactoList from "./ContactoList";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mensajes de contacto — MenteClara Admin" };

export default function ContactoPage() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Mensajes de contacto" />
      <main className="flex-1 p-4 sm:p-6">
        <ContactoList />
      </main>
    </div>
  );
}
