"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Mensaje enviado correctamente");
      setSent(true);
      reset();
    } else {
      toast.error("Error al enviar el mensaje. Inténtalo de nuevo.");
    }
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <p className="text-2xl mb-2">✅</p>
        <p className="font-semibold text-brand-dark">¡Mensaje recibido!</p>
        <p className="text-brand-dark/60 text-sm mt-1">Te responderemos en menos de 24 horas.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="name">Nombre *</Label>
        <Input id="name" {...register("name")} className="mt-1" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
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
      <div>
        <Label htmlFor="message">Mensaje *</Label>
        <Textarea id="message" rows={4} {...register("message")} className="mt-1" />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-blue hover:bg-brand-accent text-white"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  );
}
