const steps = [
  { n: "1", title: "Elige tu modalidad", desc: "Presencial en consulta o videollamada desde casa. Tú decides." },
  { n: "2", title: "Selecciona fecha y hora", desc: "Ve los horarios disponibles en tiempo real y elige el que te venga mejor." },
  { n: "3", title: "Completa tu reserva", desc: "Datos básicos y, si es tu primera vez, un breve formulario de bienvenida." },
  { n: "4", title: "Confirmación inmediata", desc: "Recibirás un email de confirmación y recordatorio 24h antes de tu cita." },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-brand-dark text-center mb-3">Así de sencillo</h2>
        <p className="text-center text-brand-dark/60 mb-10">4 pasos para tener tu primera cita</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {s.n}
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">{s.title}</h3>
              <p className="text-sm text-brand-dark/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
