import Topbar from "@/components/admin/Topbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CreateBlockForm from "./CreateBlockForm";

export default function BloquearPage() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Añadir bloqueo" />
      <main className="flex-1 p-4 sm:p-6 max-w-lg">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/disponibilidad">← Volver</Link>
          </Button>
        </div>
        <div className="bg-white border border-brand-lavender rounded-xl p-6">
          <h2 className="font-bold text-brand-dark text-lg mb-4">Bloquear horario</h2>
          <CreateBlockForm />
        </div>
      </main>
    </div>
  );
}
