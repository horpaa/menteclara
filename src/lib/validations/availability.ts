import { z } from "zod";

export const createBlockSchema = z.object({
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  reason: z.string().optional(),
});

export const updateScheduleSchema = z.object({
  schedules: z.array(
    z.object({
      dayOfWeek: z.number().min(0).max(6),
      startTime: z.string().regex(/^\d{2}:\d{2}$/),
      endTime: z.string().regex(/^\d{2}:\d{2}$/),
      isActive: z.boolean(),
    })
  ),
});

export type CreateBlockInput = z.infer<typeof createBlockSchema>;
export type UpdateScheduleInput = z.infer<typeof updateScheduleSchema>;
