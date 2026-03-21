"use client";
import { useForm } from "react-hook-form";
import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function StepWelcomeForm() {
  const { welcomeForm, setWelcomeForm, setStep } = useBookingStore();
  const [previousTherapy, setPreviousTherapy] = useState<boolean | undefined>(welcomeForm?.previousTherapy);
  const [howDidYouHear, setHowDidYouHear] = useState(welcomeForm?.howDidYouHear ?? "");
  const { register, handleSubmit } = useForm({
    defaultValues: { mainConcern: welcomeForm?.mainConcern ?? "" },
  });

  const onSubmit = (data: any) => {
    setWelcomeForm({ ...data, previousTherapy, howDidYouHear });
    setStep(4);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-brand-dark mb-1">Formulario de bienvenida</h2>
        <p className="text-brand-dark/60 text-sm">
          Esto me ayuda a preparar mejor nuestra primera sesión. Todo es confidencial.
        </p>
      </div>

      <div>
        <Label htmlFor="mainConcern">¿Qué te trae a consulta? (opcional)</Label>
        <Textarea id="mainConcern" rows={4} {...register("mainConcern")} className="mt-1"
          placeholder="Cuéntame brevemente qué te gustaría trabajar..." />
      </div>

      <div>
        <Label>¿Has hecho terapia antes?</Label>
        <div className="flex gap-4 mt-2">
          {[{ label: "Sí", val: true }, { label: "No", val: false }].map(({ label, val }) => (
            <button
              key={label}
              type="button"
              onClick={() => setPreviousTherapy(val)}
              className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                previousTherapy === val
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white border-brand-lavender text-brand-dark hover:border-brand-blue"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>¿Cómo nos encontraste?</Label>
        <Select onValueChange={(v) => setHowDidYouHear(v ?? "")} defaultValue={howDidYouHear}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="rrss">Redes sociales</SelectItem>
            <SelectItem value="recomendacion">Recomendación</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" type="button" onClick={() => setStep(2)}>
          Atrás
        </Button>
        <Button type="submit" className="bg-brand-blue hover:bg-brand-accent text-white">
          Continuar
        </Button>
      </div>
    </form>
  );
}
