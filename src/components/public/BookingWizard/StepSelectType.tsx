"use client";
import { useBookingStore } from "@/store/bookingStore";
import { AppointmentType } from "@/types";
import { Button } from "@/components/ui/button";
import { Monitor, MapPin } from "lucide-react";

export default function StepSelectType() {
  const { type, setType, setStep } = useBookingStore();

  const handleSelect = (t: AppointmentType) => {
    setType(t);
    setStep(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-brand-dark mb-1">Elige la modalidad</h2>
        <p className="text-brand-dark/60 text-sm">¿Prefieres venir en persona o conectarte desde casa?</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => handleSelect("IN_PERSON")}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            type === "IN_PERSON"
              ? "border-brand-blue bg-brand-lavender"
              : "border-brand-lavender hover:border-brand-blue bg-white"
          }`}
        >
          <MapPin className="text-brand-blue mb-3" size={28} />
          <h3 className="font-semibold text-brand-dark mb-1">Presencial</h3>
          <p className="text-sm text-brand-dark/60">Sesión en el consultorio</p>
        </button>
        <button
          onClick={() => handleSelect("VIDEO_CALL")}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            type === "VIDEO_CALL"
              ? "border-brand-blue bg-brand-lavender"
              : "border-brand-lavender hover:border-brand-blue bg-white"
          }`}
        >
          <Monitor className="text-brand-blue mb-3" size={28} />
          <h3 className="font-semibold text-brand-dark mb-1">Videollamada</h3>
          <p className="text-sm text-brand-dark/60">Sesión online desde casa</p>
        </button>
      </div>
    </div>
  );
}
