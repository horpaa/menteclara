import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAppointmentSchema } from "@/lib/validations/appointment";
import { sendNewAppointmentRequestToPsychologist } from "@/lib/resend";
import { addMinutes } from "date-fns";

// GET — admin only
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const date = searchParams.get("date");

  const where: any = {};
  if (status) where.status = status;
  if (date) {
    const d = new Date(date);
    const start = new Date(d);
    start.setHours(0, 0, 0, 0);
    const end = new Date(d);
    end.setHours(23, 59, 59, 999);
    where.startsAt = { gte: start, lte: end };
  }

  const appointments = await prisma.appointment.findMany({
    where,
    include: { patient: true },
    orderBy: { startsAt: "asc" },
  });

  return NextResponse.json(appointments);
}

// POST — public (booking)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createAppointmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { startsAt, endsAt, type, firstName, lastName, email, phone, isFirstConsult, welcomeForm } =
    parsed.data;

  // Upsert patient
  const patient = await prisma.patient.upsert({
    where: { email },
    create: { firstName, lastName, email, phone, isFirstConsult, welcomeForm },
    update: { firstName, lastName, phone },
  });

  const appointment = await prisma.appointment.create({
    data: {
      patientId: patient.id,
      startsAt: new Date(startsAt),
      endsAt: new Date(endsAt),
      type,
      status: "PENDING",
    },
  });

  await sendNewAppointmentRequestToPsychologist({
    patientName: `${firstName} ${lastName}`,
    patientEmail: email,
    patientPhone: phone,
    startsAt: new Date(startsAt),
    type,
    appointmentId: appointment.id,
    isFirstConsult,
  });

  return NextResponse.json(appointment, { status: 201 });
}
