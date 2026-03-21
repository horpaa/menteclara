"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface Block {
  id: string;
  startsAt: string;
  endsAt: string;
  reason?: string;
}

export default function BlocksList() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlocks = () => {
    setLoading(true);
    fetch("/api/availability/blocks")
      .then((r) => r.json())
      .then(setBlocks)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBlocks(); }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/availability/blocks?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Bloqueo eliminado");
      fetchBlocks();
    } else {
      toast.error("Error al eliminar");
    }
  };

  if (loading) {
    return <div className="space-y-2">{[0, 1].map((i) => <Skeleton key={i} className="h-14 rounded-lg" />)}</div>;
  }

  if (blocks.length === 0) {
    return <p className="text-brand-dark/40 text-sm">No hay bloqueos activos.</p>;
  }

  return (
    <div className="space-y-3">
      {blocks.map((block) => (
        <div key={block.id} className="bg-white border border-brand-lavender rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-brand-dark">
              {format(new Date(block.startsAt), "EEE d MMM 'a las' HH:mm", { locale: es })}
              {" — "}
              {format(new Date(block.endsAt), "HH:mm")}
            </p>
            {block.reason && (
              <p className="text-xs text-brand-dark/50">{block.reason}</p>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDelete(block.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
}
