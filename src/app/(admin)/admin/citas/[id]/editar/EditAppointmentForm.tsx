"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAppointmentSchema, UpdateAppointmentInput } from "@/lib/validations/appointment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface Props {
  appointment: {
    id: string;
    startsAt: string;
    endsAt: string;
    type: string;
    status: string;
    meetLink?: string;
    notes?: string;
  };
}

export default function EditAppointmentForm({ appointment }: Props) {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<UpdateAppointmentInput>({
    resolver: zodResolver(updateAppointmentSchema),
    defaultValues: {
      startsAt: format(new Date(appointment.startsAt), "yyyy-MM-dd'T'HH:mm"),
      endsAt: format(new Date(appointment.endsAt), "yyyy-MM-dd'T'HH:mm"),
      status: appointment.status as any,
      meetLink: appointment.meetLink ?? "",
      notes: appointment.notes ?? "",
    },
  });

  const onSubmit = async (data: UpdateAppointmentInput) => {
    const res = await fetch(`/api/appointments/${appointment.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        startsAt: data.startsAt ? new Date(data.startsAt).toISOString() : undefined,
        endsAt: data.endsAt ? new Date(data.endsAt).toISOString() : undefined,
        status: "RESCHEDULED",
      }),
    });

    if (res.ok) {
      toast.success("Cita actualizada");
      router.push(`/admin/citas/${appointment.id}`);
    } else {
      toast.error("Error al actualizar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="startsAt">Fecha y hora inicio *</Label>
        <Input id="startsAt" type="datetime-local" {...register("startsAt")} className="mt-1" />
        {errors.startsAt && <p className="text-red-500 text-xs mt-1">{errors.startsAt.message}</p>}
      </div>
      <div>
        <Label htmlFor="endsAt">Fecha y hora fin *</Label>
        <Input id="endsAt" type="datetime-local" {...register("endsAt")} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="meetLink">Link videollamada</Label>
        <Input id="meetLink" type="url" {...register("meetLink")} className="mt-1" placeholder="https://..." />
      </div>
      <div>
        <Label htmlFor="notes">Notas internas</Label>
        <Textarea id="notes" {...register("notes")} className="mt-1" rows={3} />
      </div>
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-brand-blue hover:bg-brand-accent text-white">
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}
