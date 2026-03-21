import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-brand-lavender to-white py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-dark leading-tight mb-4">
          Tu bienestar mental,<br />
          <span className="text-brand-blue">con claridad</span>
        </h1>
        <p className="text-lg text-brand-dark/70 max-w-xl mx-auto mb-8">
          Psicología individual presencial y online. Un espacio seguro para
          entenderte mejor y avanzar hacia la vida que quieres.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-brand-blue hover:bg-brand-accent text-white px-8"
          >
            <Link href="/reservar">Reservar primera cita</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <Link href="/como-funciona">Cómo funciona</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
