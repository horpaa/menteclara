export type AppointmentType = "IN_PERSON" | "VIDEO_CALL";
export type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";
export type Role = "PSYCHOLOGIST" | "ADMIN";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  birthDate?: Date | null;
  isFirstConsult: boolean;
  welcomeForm?: Record<string, unknown> | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient?: Patient;
  startsAt: Date;
  endsAt: Date;
  type: AppointmentType;
  status: AppointmentStatus;
  meetLink?: string | null;
  notes?: string | null;
  reminderSentAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionNote {
  id: string;
  appointmentId: string;
  patientId: string;
  content: string;
  objectives?: string | null;
  nextSteps?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface WeeklySchedule {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface AvailabilityBlock {
  id: string;
  startsAt: Date;
  endsAt: Date;
  reason?: string | null;
  createdAt: Date;
}

export interface TimeSlot {
  startsAt: string;
  endsAt: string;
}

export interface BookingFormData {
  type: AppointmentType;
  slot: TimeSlot | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isFirstConsult: boolean;
  welcomeForm?: {
    mainConcern?: string;
    previousTherapy?: boolean;
    howDidYouHear?: string;
  };
}
