import { z } from "zod";

export const createAppointmentSchema = z.object({
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  type: z.enum(["IN_PERSON", "VIDEO_CALL"]),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  isFirstConsult: z.boolean(),
  welcomeForm: z
    .object({
      mainConcern: z.string().optional(),
      previousTherapy: z.boolean().optional(),
      howDidYouHear: z.string().optional(),
    })
    .optional(),
});

export const updateAppointmentSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "RESCHEDULED"]).optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
  meetLink: z.string().url().optional().or(z.literal("")),
  notes: z.string().optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
