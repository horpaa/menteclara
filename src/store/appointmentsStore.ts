import { create } from "zustand";
import { Appointment } from "@/types";

interface AppointmentsState {
  appointments: Appointment[];
  isLoading: boolean;
  setAppointments: (appointments: Appointment[]) => void;
  updateAppointment: (id: string, data: Partial<Appointment>) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAppointmentsStore = create<AppointmentsState>((set) => ({
  appointments: [],
  isLoading: false,
  setAppointments: (appointments) => set({ appointments }),
  updateAppointment: (id, data) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id ? { ...a, ...data } : a
      ),
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));
