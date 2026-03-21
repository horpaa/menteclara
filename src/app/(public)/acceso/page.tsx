import { Suspense } from "react";
import AccesoForm from "./AccesoForm";

export default function AccesoPage() {
  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-brand-lavender p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-brand-dark">Accede a tu cuenta</h1>
          <p className="text-sm text-brand-dark/60 mt-1">Para continuar con tu reserva</p>
        </div>
        <Suspense>
          <AccesoForm />
        </Suspense>
      </div>
    </div>
  );
}
