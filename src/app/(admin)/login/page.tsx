"use client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setLoading(false);

    if (result?.error) {
      toast.error("Credenciales incorrectas");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
      <div className="bg-white border border-brand-lavender rounded-2xl p-8 w-full max-w-sm shadow-sm">
        <h1 className="text-2xl font-bold text-brand-dark mb-1">MenteClara</h1>
        <p className="text-brand-dark/60 text-sm mb-6">Acceso al panel de administración</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} className="mt-1" autoComplete="email" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" {...register("password")} className="mt-1" autoComplete="current-password" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue hover:bg-brand-accent text-white"
          >
            {loading ? "Entrando..." : "Iniciar sesión"}
          </Button>
        </form>
      </div>
    </div>
  );
}
