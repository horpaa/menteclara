import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserva confirmada — MenteClara",
};

export default function ConfirmacionPage() {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-brand-dark mb-3">¡Solicitud recibida!</h1>
        <p className="text-brand-dark/60 mb-2">
          Tu solicitud de cita ha sido enviada correctamente. La confirmaré en las próximas horas y recibirás un email.
        </p>
        <p className="text-brand-dark/60 mb-8 text-sm">
          Revisa tu bandeja de entrada (y la carpeta de spam).
        </p>
        <Button asChild className="bg-brand-blue hover:bg-brand-accent text-white">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </section>
  );
}
