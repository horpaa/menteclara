import Topbar from "@/components/admin/Topbar";
import RemindersButton from "./RemindersButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Configuración — MenteClara Admin" };

export default function ConfiguracionPage() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Topbar title="Configuración" />
      <main className="flex-1 p-4 sm:p-6 max-w-2xl">
        <div className="bg-white border border-brand-lavender rounded-xl p-6 space-y-6">
          <div>
            <h2 className="font-bold text-brand-dark text-lg mb-1">Perfil</h2>
            <p className="text-brand-dark/60 text-sm mb-4">Información del consultorio.</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-brand-lavender">
                <span className="text-brand-dark/60">Nombre</span>
                <span className="font-medium text-brand-dark">Dra. Azucena Ramos</span>
              </div>
              <div className="flex justify-between py-2 border-b border-brand-lavender">
                <span className="text-brand-dark/60">Email</span>
                <span className="font-medium text-brand-dark">admin@menteclara.es</span>
              </div>
              <div className="flex justify-between py-2 border-b border-brand-lavender">
                <span className="text-brand-dark/60">Núm. colegiada</span>
                <span className="font-medium text-brand-dark">M-12345</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-brand-dark text-lg mb-1">Recordatorios</h2>
            <p className="text-brand-dark/60 text-sm mb-4">
              Envía recordatorios a los pacientes con citas confirmadas en las próximas 24 horas.
              Solo se envía una vez por cita.
            </p>
            <RemindersButton />
          </div>

          <div>
            <h2 className="font-bold text-brand-dark text-lg mb-1">Variables de entorno</h2>
            <div className="bg-brand-light rounded-lg p-4 text-xs font-mono text-brand-dark/60 space-y-1">
              <p>DATABASE_URL</p>
              <p>NEXTAUTH_SECRET</p>
              <p>RESEND_API_KEY</p>
              <p>RESEND_FROM_EMAIL</p>
              <p>WHATSAPP_NUMBER</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
