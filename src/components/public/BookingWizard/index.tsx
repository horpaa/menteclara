"use client";
import { useBookingStore } from "@/store/bookingStore";
import StepSelectType from "./StepSelectType";
import StepSelectSlot from "./StepSelectSlot";
import StepPatientInfo from "./StepPatientInfo";
import StepWelcomeForm from "./StepWelcomeForm";
import StepConfirmation from "./StepConfirmation";

const STEPS = ["Modalidad", "Fecha y hora", "Tus datos", "Bienvenida", "Confirmación"];

export default function BookingWizard() {
  const { step } = useBookingStore();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                  i < step
                    ? "bg-brand-blue text-white"
                    : i === step
                    ? "bg-brand-blue text-white ring-4 ring-brand-lavender"
                    : "bg-brand-lavender text-brand-dark/40"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? "text-brand-blue font-medium" : "text-brand-dark/40"}`}>
                {s}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-brand-lavender rounded-full h-1.5">
          <div
            className="bg-brand-blue h-1.5 rounded-full transition-all"
            style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white border border-brand-lavender rounded-2xl p-6 sm:p-8 shadow-sm">
        {step === 0 && <StepSelectType />}
        {step === 1 && <StepSelectSlot />}
        {step === 2 && <StepPatientInfo />}
        {step === 3 && <StepWelcomeForm />}
        {step === 4 && <StepConfirmation />}
      </div>
    </div>
  );
}
