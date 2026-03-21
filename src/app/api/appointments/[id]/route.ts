import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateAppointmentSchema } from "@/lib/validations/appointment";
import { confirmAppointment, cancelAppointment } from "@/lib/appointments";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const appointment = await prisma.appointment.findUnique({
    where: { id: params.id },
    include: { patient: true, sessionNote: true },
  });

  if (!appointment) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  return NextResponse.json(appointment);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const parsed = updateAppointmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { status, ...rest } = parsed.data;

  try {
    if (status === "CONFIRMED") {
      const appointment = await confirmAppointment(params.id);
      return NextResponse.json(appointment);
    }

    if (status === "CANCELLED") {
      const appointment = await cancelAppointment(params.id, rest.notes);
      return NextResponse.json(appointment);
    }

    const data: any = { ...rest };
    if (status) data.status = status;
    if (rest.startsAt) data.startsAt = new Date(rest.startsAt);
    if (rest.endsAt) data.endsAt = new Date(rest.endsAt);

    const appointment = await prisma.appointment.update({
      where: { id: params.id },
      data,
      include: { patient: true },
    });

    return NextResponse.json(appointment);
  } catch {
    return NextResponse.json({ error: "Error al actualizar cita" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  await prisma.appointment.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
