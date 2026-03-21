import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white/70 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-bold text-lg mb-2">MenteClara</p>
          <p className="text-sm">Tu bienestar mental, con claridad.</p>
        </div>
        <div>
          <p className="text-white font-semibold mb-2 text-sm">Navegación</p>
          <ul className="space-y-1 text-sm">
            <li><Link href="/como-funciona" className="hover:text-white transition-colors">Cómo funciona</Link></li>
            <li><Link href="/precios" className="hover:text-white transition-colors">Tarifas</Link></li>
            <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            <li><Link href="/reservar" className="hover:text-white transition-colors">Reservar cita</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-2 text-sm">Contacto</p>
          <p className="text-sm">citas@menteclara.es</p>
          <p className="text-sm mt-1">Lunes–Viernes 9:00–19:00</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/10 text-sm text-center">
        © {new Date().getFullYear()} MenteClara. Todos los derechos reservados.
      </div>
    </footer>
  );
}
