"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const schema = z.object({
  firstName: z.string().min(1, "Requerido"),
  lastName: z.string().min(1, "Requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  isFirstConsult: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function StepPatientInfo() {
  const { data: session } = useSession();
  const { firstName, lastName, email, phone, isFirstConsult, setPatientInfo, setStep } =
    useBookingStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { firstName, lastName, email, phone, isFirstConsult },
  });

  // Pre-fill from session if store is empty
  useEffect(() => {
    if (session?.user && !firstName) {
      const nameParts = (session.user.name ?? "").split(" ");
      reset({
        firstName: nameParts[0] ?? "",
        lastName: nameParts.slice(1).join(" ") ?? "",
        email: session.user.email ?? "",
        phone: phone ?? "",
        isFirstConsult,
      });
    }
  }, [session, firstName]);

  const onSubmit = (data: FormData) => {
    setPatientInfo(data);
    if (data.isFirstConsult) {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-brand-dark mb-1">Tus datos</h2>
        <p className="text-brand-dark/60 text-sm">Para confirmar tu reserva.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Nombre *</Label>
          <Input id="firstName" {...register("firstName")} className="mt-1" />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Apellidos *</Label>
          <Input id="lastName" {...register("lastName")} className="mt-1" />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" {...register("email")} className="mt-1" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Teléfono (opcional)</Label>
        <Input id="phone" {...register("phone")} className="mt-1" />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="isFirstConsult" {...register("isFirstConsult")} className="w-4 h-4 accent-brand-blue" />
        <Label htmlFor="isFirstConsult">Es mi primera consulta</Label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" type="button" onClick={() => setStep(1)}>
          Atrás
        </Button>
        <Button type="submit" className="bg-brand-blue hover:bg-brand-accent text-white">
          Continuar
        </Button>
      </div>
    </form>
  );
}
