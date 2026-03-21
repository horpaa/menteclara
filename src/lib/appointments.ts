import { prisma } from "@/lib/prisma";
import {
  sendConfirmationToPatient,
  sendCancellationToPatient,
} from "@/lib/resend";

export async function confirmAppointment(id: string) {
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: "CONFIRMED" },
    include: { patient: true },
  });

  await sendConfirmationToPatient({
    patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
    patientEmail: appointment.patient.email,
    startsAt: appointment.startsAt,
    type: appointment.type,
    meetLink: appointment.meetLink,
  });

  return appointment;
}

export async function cancelAppointment(id: string, reason?: string) {
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: "CANCELLED", notes: reason },
    include: { patient: true },
  });

  await sendCancellationToPatient({
    patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
    patientEmail: appointment.patient.email,
    startsAt: appointment.startsAt,
    reason,
  });

  return appointment;
}
