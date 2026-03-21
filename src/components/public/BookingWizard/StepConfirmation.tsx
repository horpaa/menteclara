"use client";
import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function StepConfirmation() {
  const store = useBookingStore();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const dateStr = store.slot
    ? format(new Date(store.slot.startsAt), "EEEE d 'de' MMMM 'a las' HH:mm", { locale: es })
    : "";

  const handleSubmit = async () => {
    if (!store.slot || !store.type) return;
    setSubmitting(true);

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startsAt: store.slot.startsAt,
        endsAt: store.slot.endsAt,
        type: store.type,
        firstName: store.firstName,
        lastName: store.lastName,
        email: store.email,
        phone: store.phone,
        isFirstConsult: store.isFirstConsult,
        welcomeForm: store.welcomeForm,
      }),
    });

    setSubmitting(false);

    if (res.ok) {
      store.reset();
      router.push("/reservar/confirmacion");
    } else {
      toast.error("Error al enviar la reserva. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-brand-dark mb-1">Confirma tu reserva</h2>
        <p className="text-brand-dark/60 text-sm">Revisa los datos antes de enviar.</p>
      </div>

      <div className="bg-brand-light rounded-xl p-6 space-y-3 text-sm">
        <Row label="Modalidad" value={store.type === "VIDEO_CALL" ? "Videollamada" : "Presencial"} />
        <Row label="Fecha y hora" value={dateStr} />
        <Row label="Nombre" value={`${store.firstName} ${store.lastName}`} />
        <Row label="Email" value={store.email} />
        {store.phone && <Row label="Teléfono" value={store.phone} />}
        <Row label="Primera consulta" value={store.isFirstConsult ? "Sí" : "No"} />
      </div>

      <p className="text-xs text-brand-dark/50">
        Al confirmar, aceptas que tus datos sean tratados para gestionar tu cita de acuerdo con nuestra política de privacidad.
      </p>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={() => store.setStep(store.isFirstConsult ? 3 : 2)}>
          Atrás
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-brand-blue hover:bg-brand-accent text-white"
        >
          {submitting ? "Enviando..." : "Confirmar reserva"}
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-brand-dark/60 shrink-0">{label}</span>
      <span className="font-medium text-brand-dark text-right">{value}</span>
    </div>
  );
}
