import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import SpecialtiesSection from "@/components/public/SpecialtiesSection";
import HowItWorksSection from "@/components/public/HowItWorksSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const testimonials = [
  { name: "Ana M.", text: "Gracias a la terapia con Clara pude gestionar mi ansiedad y retomar mi vida. 100% recomendada." },
  { name: "Carlos R.", text: "La modalidad online me permitió llevar el proceso sin interrumpir mi trabajo. Muy profesional." },
  { name: "Lucía P.", text: "Un espacio seguro y sin juicios. Por fin encontré a alguien que me escucha de verdad." },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SpecialtiesSection />
      <HowItWorksSection />

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 bg-brand-lavender">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-dark text-center mb-10">Lo que dicen mis pacientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-brand-dark/70 text-sm mb-4 italic">"{t.text}"</p>
                <p className="font-semibold text-brand-dark text-sm">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-brand-blue text-white text-center">
        <h2 className="text-3xl font-bold mb-3">¿Lista/o para dar el primer paso?</h2>
        <p className="text-white/80 mb-8 max-w-md mx-auto">
          La primera cita es el inicio de un camino hacia el bienestar. Reserva ahora sin compromiso.
        </p>
        <Button asChild size="lg" className="bg-white text-brand-blue hover:bg-white/90 px-10">
          <Link href="/reservar">Reservar mi primera cita</Link>
        </Button>
      </section>
    </>
  );
}
