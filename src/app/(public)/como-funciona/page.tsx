import HowItWorksSection from "@/components/public/HowItWorksSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cómo funciona — MenteClara",
  description: "Conoce el proceso de reserva y cómo funciona la terapia en MenteClara.",
};

export default function ComoFuncionaPage() {
  return (
    <>
      <div className="bg-brand-lavender py-14 px-4 text-center">
        <h1 className="text-4xl font-bold text-brand-dark mb-3">Cómo funciona</h1>
        <p className="text-brand-dark/60 max-w-xl mx-auto">
          Reservar tu cita es rápido y sencillo. Sin llamadas, sin esperas.
        </p>
      </div>

      <HowItWorksSection />

      <section className="py-16 px-4 sm:px-6 bg-brand-light">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-dark mb-6">Preguntas frecuentes del proceso</h2>
          <div className="space-y-6">
            {[
              {
                q: "¿Qué pasa después de reservar?",
                a: "Recibirás un email de confirmación. Revisaré tu solicitud y la confirmaré en las siguientes horas.",
              },
              {
                q: "¿Cuánto tardaré en obtener mi primera cita?",
                a: "Generalmente puedes reservar dentro de los próximos 7-10 días dependiendo de la disponibilidad.",
              },
              {
                q: "¿Puedo elegir entre presencial y online en cualquier momento?",
                a: "Sí, puedes elegir la modalidad en cada reserva.",
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-brand-lavender pb-6">
                <h3 className="font-semibold text-brand-dark mb-2">{item.q}</h3>
                <p className="text-brand-dark/60 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-12 text-center bg-white">
        <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-accent text-white px-10">
          <Link href="/reservar">Reservar cita ahora</Link>
        </Button>
      </div>
    </>
  );
}
