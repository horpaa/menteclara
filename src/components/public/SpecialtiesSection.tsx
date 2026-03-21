const specialties = [
  { icon: "😰", title: "Ansiedad y estrés", desc: "Técnicas para gestionar la preocupación y los síntomas físicos del estrés." },
  { icon: "😔", title: "Depresión", desc: "Tratamiento basado en evidencia para recuperar el ánimo y la motivación." },
  { icon: "💪", title: "Autoestima", desc: "Trabajamos tus creencias limitantes y fortalecemos tu seguridad." },
  { icon: "💔", title: "Duelo y pérdidas", desc: "Acompañamiento en procesos de pérdida, separaciones y cambios vitales." },
  { icon: "🤝", title: "Relaciones", desc: "Mejorar la comunicación y los vínculos en pareja, familia o trabajo." },
  { icon: "🌱", title: "Crecimiento personal", desc: "Claridad sobre tus metas, valores y el tipo de vida que quieres vivir." },
];

export default function SpecialtiesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-brand-light">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-brand-dark text-center mb-3">Áreas de trabajo</h2>
        <p className="text-center text-brand-dark/60 mb-10">
          Cada persona es única. Adaptamos el proceso a tus necesidades.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-xl p-6 border border-brand-lavender hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-semibold text-brand-dark mb-1">{s.title}</h3>
              <p className="text-sm text-brand-dark/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
