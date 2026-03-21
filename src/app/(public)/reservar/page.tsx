import BookingWizard from "@/components/public/BookingWizard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservar cita — MenteClara",
  description: "Reserva tu cita de psicología online o presencial en MenteClara.",
};

export default function ReservarPage() {
  return (
    <section className="py-12 px-4 sm:px-6 bg-brand-light min-h-[calc(100vh-160px)]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-brand-dark mb-2">Reservar cita</h1>
        <p className="text-brand-dark/60">Completa los pasos para reservar tu sesión.</p>
      </div>
      <BookingWizard />
    </section>
  );
}
