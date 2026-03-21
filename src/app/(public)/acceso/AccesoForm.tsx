"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AccesoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/reservar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push(next);
    } else {
      toast.error("Email o contraseña incorrectos");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-blue hover:bg-brand-accent text-white"
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <p className="text-center text-sm text-brand-dark/60 mt-5">
        ¿No tienes cuenta?{" "}
        <Link
          href={`/registro?next=${next}`}
          className="text-brand-blue hover:underline font-medium"
        >
          Regístrate
        </Link>
      </p>
    </>
  );
}
