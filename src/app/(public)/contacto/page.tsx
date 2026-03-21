import ContactForm from "@/components/public/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — MenteClara",
  description: "Ponte en contacto con MenteClara para cualquier consulta.",
};

export default function ContactoPage() {
  return (
    <>
      <div className="bg-brand-lavender py-14 px-4 text-center">
        <h1 className="text-4xl font-bold text-brand-dark mb-3">Contacto</h1>
        <p className="text-brand-dark/60 max-w-md mx-auto">
          ¿Tienes alguna pregunta antes de reservar? Escríbeme y te respondo en menos de 24h.
        </p>
      </div>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-xl mx-auto bg-white border border-brand-lavender rounded-2xl p-8 shadow-sm">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
