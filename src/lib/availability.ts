import { prisma } from "@/lib/prisma";
import { addMinutes, isWithinInterval, parseISO, setHours, setMinutes, startOfDay, format } from "date-fns";

const SLOT_DURATION = 50; // minutes
const BUFFER = 10; // minutes
const TOTAL = SLOT_DURATION + BUFFER; // 60 minutes per slot

function parseTime(timeStr: string, baseDate: Date): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function slotsOverlap(
  slotStart: Date,
  slotEnd: Date,
  blockStart: Date,
  blockEnd: Date
): boolean {
  return slotStart < blockEnd && slotEnd > blockStart;
}

export async function getAvailableSlots(from: Date, to: Date) {
  const schedules = await prisma.weeklySchedule.findMany({
    where: { isActive: true },
  });

  const appointments = await prisma.appointment.findMany({
    where: {
      startsAt: { gte: from, lte: to },
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });

  const blocks = await prisma.availabilityBlock.findMany({
    where: {
      startsAt: { lte: to },
      endsAt: { gte: from },
    },
  });

  const slots: { startsAt: string; endsAt: string }[] = [];

  const current = new Date(from);
  current.setHours(0, 0, 0, 0);

  while (current <= to) {
    const dayOfWeek = current.getDay();
    const daySchedules = schedules.filter((s) => s.dayOfWeek === dayOfWeek);

    for (const schedule of daySchedules) {
      const scheduleStart = parseTime(schedule.startTime, current);
      const scheduleEnd = parseTime(schedule.endTime, current);

      let slotStart = new Date(scheduleStart);

      while (addMinutes(slotStart, SLOT_DURATION) <= scheduleEnd) {
        const slotEnd = addMinutes(slotStart, SLOT_DURATION);

        const hasConflict =
          appointments.some((apt) =>
            slotsOverlap(slotStart, slotEnd, new Date(apt.startsAt), new Date(apt.endsAt))
          ) ||
          blocks.some((block) =>
            slotsOverlap(slotStart, slotEnd, new Date(block.startsAt), new Date(block.endsAt))
          );

        if (!hasConflict && slotStart > new Date()) {
          slots.push({
            startsAt: slotStart.toISOString(),
            endsAt: slotEnd.toISOString(),
          });
        }

        slotStart = addMinutes(slotStart, TOTAL);
      }
    }

    current.setDate(current.getDate() + 1);
  }

  return slots;
}
