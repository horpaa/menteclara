import PricingCard from "@/components/public/PricingCard";
import FaqAccordion from "@/components/public/FaqAccordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifas — MenteClara",
  description: "Consulta las tarifas de las sesiones de psicología en MenteClara.",
};

const plans = [
  {
    title: "Sesión individual",
    price: "70",
    duration: "50 min · Presencial u online",
    features: [
      "Evaluación personalizada",
      "Herramientas prácticas",
      "Sin compromiso de permanencia",
      "Recordatorio por email",
    ],
  },
  {
    title: "Bono 5 sesiones",
    price: "320",
    duration: "5 × 50 min · Ahorra 30€",
    features: [
      "Todo lo del plan individual",
      "Ahorro de 30€",
      "Seguimiento entre sesiones",
      "Acceso prioritario a agenda",
    ],
    featured: true,
  },
  {
    title: "Bono 10 sesiones",
    price: "600",
    duration: "10 × 50 min · Ahorra 100€",
    features: [
      "Todo lo del bono 5",
      "Ahorro de 100€",
      "Plan de trabajo personalizado",
      "Email de seguimiento semanal",
    ],
  },
];

export default function PreciosPage() {
  return (
    <>
      <div className="bg-brand-lavender py-14 px-4 text-center">
        <h1 className="text-4xl font-bold text-brand-dark mb-3">Tarifas</h1>
        <p className="text-brand-dark/60 max-w-lg mx-auto">
          Precios claros, sin sorpresas. Invierte en tu bienestar.
        </p>
      </div>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((p) => (
            <PricingCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-brand-light">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-dark mb-8 text-center">Preguntas frecuentes</h2>
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
