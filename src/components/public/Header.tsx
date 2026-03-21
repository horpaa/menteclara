"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/precios", label: "Tarifas" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, status } = useSession();
  const isPatient = (session?.user as any)?.role === "PATIENT";
  const isLoggedIn = !!session?.user;

  return (
    <header className="bg-white border-b border-brand-lavender sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-brand-blue">
          MenteClara
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-brand-dark/70 hover:text-brand-blue transition-colors"
            >
              {l.label}
            </Link>
          ))}

          {status === "loading" ? null : isLoggedIn && isPatient ? (
            <>
              <span className="text-sm text-brand-dark/60 flex items-center gap-1">
                <User size={14} />
                {session?.user?.name?.split(" ")[0]}
              </span>
              <Button asChild size="sm" className="bg-brand-blue hover:bg-brand-accent text-white">
                <Link href="/reservar">Reservar cita</Link>
              </Button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-brand-dark/50 hover:text-brand-dark flex items-center gap-1"
              >
                <LogOut size={14} />
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/acceso" className="text-sm text-brand-dark/70 hover:text-brand-blue transition-colors">
                Acceder
              </Link>
              <Button asChild size="sm" className="bg-brand-blue hover:bg-brand-accent text-white">
                <Link href="/reservar">Reservar cita</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-brand-lavender px-4 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-brand-dark/70 hover:text-brand-blue"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          {isLoggedIn && isPatient ? (
            <>
              <Button asChild size="sm" className="bg-brand-blue hover:bg-brand-accent text-white w-full">
                <Link href="/reservar" onClick={() => setMobileOpen(false)}>
                  Reservar cita
                </Link>
              </Button>
              <button
                onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/" }); }}
                className="text-sm text-brand-dark/50 text-left flex items-center gap-1"
              >
                <LogOut size={14} />
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/acceso"
                className="text-sm text-brand-dark/70 hover:text-brand-blue"
                onClick={() => setMobileOpen(false)}
              >
                Acceder
              </Link>
              <Button asChild size="sm" className="bg-brand-blue hover:bg-brand-accent text-white w-full">
                <Link href="/reservar" onClick={() => setMobileOpen(false)}>
                  Reservar cita
                </Link>
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
