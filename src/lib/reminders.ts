import { prisma } from "@/lib/prisma";
import { sendReminderToPatient } from "@/lib/resend";
import { addHours } from "date-fns";

export async function sendPendingReminders() {
  const now = new Date();
  const in23h = addHours(now, 23);
  const in25h = addHours(now, 25);

  const appointments = await prisma.appointment.findMany({
    where: {
      status: "CONFIRMED",
      reminderSentAt: null,
      startsAt: { gte: in23h, lte: in25h },
    },
    include: { patient: true },
  });

  const results = await Promise.allSettled(
    appointments.map(async (apt) => {
      await sendReminderToPatient({
        patientName: `${apt.patient.firstName} ${apt.patient.lastName}`,
        patientEmail: apt.patient.email,
        startsAt: apt.startsAt,
        type: apt.type,
        meetLink: apt.meetLink,
      });

      await prisma.appointment.update({
        where: { id: apt.id },
        data: { reminderSentAt: new Date() },
      });

      return apt.id;
    })
  );

  return results;
}
