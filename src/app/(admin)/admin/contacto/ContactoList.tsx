"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, CheckCheck } from "lucide-react";
import { toast } from "sonner";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function ContactoList() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/contact")
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const markRead = async (id: string) => {
    const res = await fetch(`/api/contact?id=${id}`, { method: "PATCH" });
    if (res.ok) {
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, isRead: true } : i));
      toast.success("Marcado como leído");
    }
  };

  const unreadCount = items.filter((i) => !i.isRead).length;

  if (loading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <p className="text-sm text-brand-dark/60">
          {items.length} mensajes
          {unreadCount > 0 && (
            <span className="ml-2 bg-brand-blue text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount} sin leer
            </span>
          )}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-brand-dark/40">
          <Mail size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No hay mensajes aún.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white border rounded-xl p-5 transition-all ${
                item.isRead ? "border-brand-lavender" : "border-brand-blue shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-brand-dark">{item.name}</p>
                    {!item.isRead && (
                      <Badge className="bg-brand-blue text-white text-xs border-0">Nuevo</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-brand-dark/50">
                    <a href={`mailto:${item.email}`} className="flex items-center gap-1 hover:text-brand-blue">
                      <Mail size={13} />
                      {item.email}
                    </a>
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="flex items-center gap-1 hover:text-brand-blue">
                        <Phone size={13} />
                        {item.phone}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <p className="text-xs text-brand-dark/40">
                    {format(new Date(item.createdAt), "d MMM yyyy HH:mm", { locale: es })}
                  </p>
                  {!item.isRead && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markRead(item.id)}
                      className="text-brand-blue hover:bg-brand-lavender h-7 gap-1 text-xs"
                    >
                      <CheckCheck size={14} />
                      Marcar leído
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-sm text-brand-dark/70 whitespace-pre-line bg-brand-light rounded-lg p-3">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
