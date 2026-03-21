import { create } from "zustand";
import { AppointmentType, TimeSlot } from "@/types";

interface BookingState {
  step: number;
  type: AppointmentType | null;
  slot: TimeSlot | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isFirstConsult: boolean;
  welcomeForm: {
    mainConcern?: string;
    previousTherapy?: boolean;
    howDidYouHear?: string;
  };
  setStep: (step: number) => void;
  setType: (type: AppointmentType) => void;
  setSlot: (slot: TimeSlot) => void;
  setPatientInfo: (info: { firstName: string; lastName: string; email: string; phone?: string; isFirstConsult: boolean }) => void;
  setWelcomeForm: (form: { mainConcern?: string; previousTherapy?: boolean; howDidYouHear?: string }) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 0,
  type: null,
  slot: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  isFirstConsult: false,
  welcomeForm: {},
  setStep: (step) => set({ step }),
  setType: (type) => set({ type }),
  setSlot: (slot) => set({ slot }),
  setPatientInfo: (info) => set(info),
  setWelcomeForm: (form) => set({ welcomeForm: form }),
  reset: () =>
    set({
      step: 0,
      type: null,
      slot: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      isFirstConsult: false,
      welcomeForm: {},
    }),
}));
