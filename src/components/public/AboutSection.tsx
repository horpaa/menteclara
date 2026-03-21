export default function AboutSection() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-brand-lavender rounded-2xl h-64 md:h-80 flex items-center justify-center">
          <span className="text-6xl">🧠</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-brand-dark mb-4">
            Hola, soy la Dra. Azucena Ramos
          </h2>
          <p className="text-brand-dark/70 mb-3">
            Psicóloga colegiada con más de 10 años de experiencia en terapia
            cognitivo-conductual. Especializada en ansiedad, depresión,
            autoestima y transiciones vitales.
          </p>
          <p className="text-brand-dark/70 mb-3">
            Mi enfoque es colaborativo: trabajamos juntos a tu ritmo, con
            herramientas prácticas y sin juicios.
          </p>
          <p className="text-sm text-brand-blue font-medium">
            Núm. colegiada: M-12345
          </p>
        </div>
      </div>
    </section>
  );
}
