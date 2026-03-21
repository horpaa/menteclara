"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Users,
  Clock,
  BarChart2,
  Settings,
  MessageSquare,
  X,
} from "lucide-react";
import { useUiStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/calendario", label: "Calendario", icon: Calendar },
  { href: "/admin/citas", label: "Citas", icon: ClipboardList },
  { href: "/admin/pacientes", label: "Pacientes", icon: Users },
  { href: "/admin/disponibilidad", label: "Disponibilidad", icon: Clock },
  { href: "/admin/estadisticas", label: "Estadísticas", icon: BarChart2 },
  { href: "/admin/contacto", label: "Mensajes", icon: MessageSquare },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-60 bg-brand-dark text-white z-30 flex flex-col transition-transform duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:static md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="font-bold text-lg text-white">MenteClara</span>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} className="text-white/60" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors",
                  active
                    ? "bg-brand-blue text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
