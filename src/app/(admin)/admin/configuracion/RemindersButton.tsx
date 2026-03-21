"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertCircle } from "lucide-react";

export default function RemindersButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number } | null>(null);
  const [error, setError] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setResult(null);
    setError(false);

    const res = await fetch("/api/reminders", { method: "POST" });

    setLoading(false);

    if (res.ok) {
      setResult(await res.json());
    } else {
      setError(true);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handleSend}
        disabled={loading}
        className="bg-brand-blue hover:bg-brand-accent text-white gap-2"
      >
        <Bell size={16} />
        {loading ? "Enviando recordatorios..." : "Enviar recordatorios ahora"}
      </Button>

      {result && (
        <div className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
          result.sent > 0 ? "bg-green-50 text-green-700" : "bg-brand-light text-brand-dark/60"
        }`}>
          <CheckCircle size={16} className="mt-0.5 shrink-0" />
          <span>
            {result.sent === 0
              ? "No hay citas pendientes de recordatorio en las próximas 24 horas."
              : `${result.sent} recordatorio${result.sent > 1 ? "s" : ""} enviado${result.sent > 1 ? "s" : ""} correctamente.`}
            {result.failed > 0 && ` ${result.failed} fallaron.`}
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg p-3 text-sm bg-red-50 text-red-600">
          <AlertCircle size={16} className="shrink-0" />
          Error al enviar recordatorios. Revisa la configuración de Resend.
        </div>
      )}
    </div>
  );
}
