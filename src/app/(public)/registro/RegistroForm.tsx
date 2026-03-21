"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function RegistroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/reservar";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (form.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone || undefined,
        password: form.password,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error ?? "Error al registrarse");
      setLoading(false);
      return;
    }

    // Auto-login after registration
    const loginRes = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (loginRes?.ok) {
      toast.success("Cuenta creada. ¡Bienvenida!");
      router.push(next);
    } else {
      toast.success("Cuenta creada. Ahora accede con tus credenciales.");
      router.push(`/acceso?next=${next}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="firstName">Nombre *</Label>
            <Input id="firstName" value={form.firstName} onChange={set("firstName")} required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="lastName">Apellidos *</Label>
            <Input id="lastName" value={form.lastName} onChange={set("lastName")} required className="mt-1" />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={form.email} onChange={set("email")} required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="phone">Teléfono (opcional)</Label>
          <Input id="phone" value={form.phone} onChange={set("phone")} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="password">Contraseña *</Label>
          <Input id="password" type="password" value={form.password} onChange={set("password")} required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={set("confirmPassword")}
            required
            className="mt-1"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-blue hover:bg-brand-accent text-white"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </form>

      <p className="text-center text-sm text-brand-dark/60 mt-5">
        ¿Ya tienes cuenta?{" "}
        <Link
          href={`/acceso?next=${next}`}
          className="text-brand-blue hover:underline font-medium"
        >
          Inicia sesión
        </Link>
      </p>
    </>
  );
}
