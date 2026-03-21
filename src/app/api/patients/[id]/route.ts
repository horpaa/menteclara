import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updatePatientSchema } from "@/lib/validations/patient";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
    include: {
      appointments: { orderBy: { startsAt: "desc" }, include: { sessionNote: true } },
      sessionNotes: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!patient) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  return NextResponse.json(patient);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const parsed = updatePatientSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const patient = await prisma.patient.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return NextResponse.json(patient);
}
