"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlockSchema, CreateBlockInput } from "@/lib/validations/availability";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function CreateBlockForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateBlockInput>({
    resolver: zodResolver(createBlockSchema),
    defaultValues: {
      startsAt: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endsAt: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    },
  });

  const onSubmit = async (data: CreateBlockInput) => {
    const res = await fetch("/api/availability/blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startsAt: new Date(data.startsAt).toISOString(),
        endsAt: new Date(data.endsAt).toISOString(),
        reason: data.reason,
      }),
    });

    if (res.ok) {
      toast.success("Bloqueo creado");
      router.push("/admin/disponibilidad");
    } else {
      toast.error("Error al crear bloqueo");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="startsAt">Inicio *</Label>
        <Input id="startsAt" type="datetime-local" {...register("startsAt")} className="mt-1" />
        {errors.startsAt && <p className="text-red-500 text-xs mt-1">{errors.startsAt.message}</p>}
      </div>
      <div>
        <Label htmlFor="endsAt">Fin *</Label>
        <Input id="endsAt" type="datetime-local" {...register("endsAt")} className="mt-1" />
        {errors.endsAt && <p className="text-red-500 text-xs mt-1">{errors.endsAt.message}</p>}
      </div>
      <div>
        <Label htmlFor="reason">Motivo (opcional)</Label>
        <Textarea id="reason" {...register("reason")} className="mt-1" rows={2} placeholder="Vacaciones, formación..." />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-brand-blue hover:bg-brand-accent text-white">
          {isSubmitting ? "Guardando..." : "Crear bloqueo"}
        </Button>
      </div>
    </form>
  );
}
