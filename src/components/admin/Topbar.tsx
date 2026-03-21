"use client";
import { Menu, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useUiStore } from "@/store/uiStore";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  title?: string;
}

export default function Topbar({ title }: TopbarProps) {
  const { toggleSidebar } = useUiStore();

  return (
    <header className="h-14 border-b border-brand-lavender bg-white flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="md:hidden p-1.5 rounded hover:bg-brand-light">
          <Menu size={20} className="text-brand-dark" />
        </button>
        {title && <h1 className="text-brand-dark font-semibold text-base hidden sm:block">{title}</h1>}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="text-brand-dark/60 hover:text-brand-dark gap-1.5"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Cerrar sesión</span>
      </Button>
    </header>
  );
}
