"use client";
import { useState, useEffect } from "react";
import { useBookingStore } from "@/store/bookingStore";
import { TimeSlot } from "@/types";
import { format, addDays, startOfDay, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function StepSelectSlot() {
  const { setSlot, setStep } = useBookingStore();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [allSlots, setAllSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  useEffect(() => {
    const from = startOfDay(new Date()).toISOString();
    const to = addDays(new Date(), 60).toISOString();
    setLoading(true);
    fetch(`/api/availability?from=${from}&to=${to}`)
      .then((r) => r.json())
      .then((data) => setAllSlots(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedDay) {
      const daySlots = allSlots.filter((s) =>
        isSameDay(new Date(s.startsAt), selectedDay)
      );
      setSlots(daySlots);
      setSelectedSlot(null);
    }
  }, [selectedDay, allSlots]);

  const availableDays = allSlots.map((s) => new Date(s.startsAt));

  const handleContinue = () => {
    if (!selectedSlot) return;
    setSlot(selectedSlot);
    setStep(2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-brand-dark mb-1">Elige fecha y hora</h2>
        <p className="text-brand-dark/60 text-sm">Selecciona un día y un horario disponible.</p>
      </div>

      {loading ? (
        <p className="text-brand-dark/60 text-sm">Cargando disponibilidad...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DayPicker
              mode="single"
              selected={selectedDay}
              onSelect={setSelectedDay}
              disabled={[
                { before: new Date() },
                (date) => !availableDays.some((d) => isSameDay(d, date)),
              ]}
              locale={es}
              classNames={{
                selected: "bg-brand-blue text-white rounded-full",
                today: "font-bold text-brand-blue",
              }}
            />
          </div>
          <div>
            {selectedDay ? (
              slots.length === 0 ? (
                <p className="text-brand-dark/60 text-sm mt-4">No hay horarios disponibles este día.</p>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.startsAt}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-lg text-sm border transition-all ${
                        selectedSlot?.startsAt === slot.startsAt
                          ? "bg-brand-blue text-white border-brand-blue"
                          : "bg-white border-brand-lavender hover:border-brand-blue text-brand-dark"
                      }`}
                    >
                      {format(new Date(slot.startsAt), "HH:mm")}
                    </button>
                  ))}
                </div>
              )
            ) : (
              <p className="text-brand-dark/60 text-sm mt-4">Selecciona un día para ver los horarios.</p>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={() => setStep(0)}>
          Atrás
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedSlot}
          className="bg-brand-blue hover:bg-brand-accent text-white"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
