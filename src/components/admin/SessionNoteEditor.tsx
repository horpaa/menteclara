"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";

const schema = z.object({
  content: z.string().min(1, "El contenido es requerido"),
  objectives: z.string().optional(),
  nextSteps: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  patientId: string;
  appointments: { id: string; startsAt: string }[];
  onSaved?: () => void;
}

export default function SessionNoteEditor({ patientId, appointments, onSaved }: Props) {
  const [appointmentId, setAppointmentId] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!appointmentId) {
      toast.error("Selecciona una cita");
      return;
    }

    const res = await fetch(`/api/patients/${patientId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, appointmentId }),
    });

    if (res.ok) {
      toast.success("Nota guardada");
      reset();
      setAppointmentId("");
      onSaved?.();
    } else {
      toast.error("Error al guardar la nota");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Cita asociada *</Label>
        <Select onValueChange={(v) => setAppointmentId(v ?? "")} value={appointmentId}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Selecciona una cita" />
          </SelectTrigger>
          <SelectContent>
            {appointments.map((apt) => (
              <SelectItem key={apt.id} value={apt.id}>
                {new Date(apt.startsAt).toLocaleDateString("es-ES", {
                  weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="content">Contenido de la sesión *</Label>
        <Textarea id="content" rows={5} {...register("content")} className="mt-1"
          placeholder="Temas tratados, observaciones clínicas..." />
        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
      </div>

      <div>
        <Label htmlFor="objectives">Objetivos trabajados</Label>
        <Textarea id="objectives" rows={2} {...register("objectives")} className="mt-1" />
      </div>

      <div>
        <Label htmlFor="nextSteps">Próximos pasos</Label>
        <Textarea id="nextSteps" rows={2} {...register("nextSteps")} className="mt-1" />
      </div>

      <Button type="submit" disabled={isSubmitting} className="bg-brand-blue hover:bg-brand-accent text-white">
        {isSubmitting ? "Guardando..." : "Guardar nota"}
      </Button>
    </form>
  );
}
